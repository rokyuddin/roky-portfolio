# Schema Findings

Audit of `https://rokyuddin.com` (10 crawled pages per `crawl/*.html`, cross-checked against current source in `src/`).

---

## Current Implementation (detected types, pages)

### What exists in the crawled (served) HTML — verified by `grep` for `<script type="application/ld+json">`

| Page | Real server-rendered JSON-LD `<script>` tags | Types actually emitted |
|------|----------------------------------------------|------------------------|
| `/` (homepage) | **0** | *none* — Person + WebSite exist only in the RSC flight payload (client-injected) |
| `/blog` (index) | **0** | *none* |
| `/case-studies` (index) | **0** | *none* |
| `/playground` | **0** | *none* |
| `/blog/modern-web-design-trends-2024` | 1 | `BlogPosting` |
| `/blog/nextjs-performance-optimization` | 1 | `BlogPosting` |
| `/blog/typescript-best-practices` | 1 | `BlogPosting` |
| `/case-studies/altseo` | 1 | `Article` |
| `/case-studies/rydr` | 1 | `Article` |
| `/case-studies/skinsight` | 1 | `Article` |

**Bottom line:** Schema exists on the site, but **only on the 6 detail pages** (blog posts + case studies), and only one block each. The three entry/index pages (homepage, blog index, case-studies index) plus playground emit **zero** server-rendered JSON-LD.

### Person + WebSite are client-rendered only (present in EVERY page's RSC payload, never static tags)

Every crawled page carries JSON-LD *inside the React Server Components flight payload* (`"type":"application/ld+json","dangerouslySetInnerHTML":{...}`), which is **not** executable structured data for crawlers. The two site-wide entities:

```json
{"@type":"Person","name":"Md Rokyuddin","jobTitle":"Frontend Developer","url":"https://rokyuddin.com",
 "email":"rokyuddin.dev@gmail.com","address":{"@type":"PostalAddress","addressLocality":"Jashore","addressCountry":"BD"},
 "sameAs":["https://github.com/rokyuddin","https://linkedin.com/in/rokyuddin"]}

{"@type":"WebSite","name":"Md Rokyuddin","url":"https://rokyuddin.com",
 "description":"Frontend Developer specializing in React, Next.js, and TypeScript."}
```

### Detail-page blocks actually emitted (from crawl)

**Blog post** (`<script type="application/ld+json">`):
```json
{"@type":"BlogPosting","headline":"Next.js Performance Optimization: A Complete Guide",...,
 "datePublished":"2024-11-05","author":{"@type":"Person","name":"Md Rokyuddin"},
 "keywords":["Next.js","Performance","React"]}
```

**Case study** (`<script type="application/ld+json">`):
```json
{"@type":"Article","headline":"Ride-Sharing & Concierge Platform","name":"Rydr",
 "description":"...","author":{"@type":"Person","name":"Md Rokyuddin"},
 "articleSection":"Transportation & Logistics",
 "image":"https://cdn.sanity.io/images/..."}
```

---

## Validation / Gaps

### Critical: server-vs-client rendering — JSON-LD invisible to non-JS crawlers

**Root cause (verified in source):** `src/app/layout.tsx` renders Person + WebSite via the `next/script` `Script` component (default `afterInteractive` strategy), **not** a plain `<script>` element:

```tsx
import Script from "next/script";
<Script id="ld-person" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(personJsonLd()) }} />
<Script id="ld-website" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(websiteJsonLd()) }} />
```

`next/script` does **not** emit inline JSON-LD into the server HTML — data is serialized into `self.__next_f.push(...)` (the RSC payload) and rendered client-side after hydration. Google/Bing/LinkedIn/preview crawlers that read raw HTML do not reliably execute this. Introduced by commit `e8972a1` ("migrate to Next.js Script component") — it regressed previously-working plain `<script>` tags. This bug is **still present in current source** and is the single highest-impact fix.

**Secondary risk — index pages:** `src/app/blog/page.tsx` and `src/app/case-studies/page.tsx` *do* use plain `<script>` for their `CollectionPage` JSON-LD, yet the served crawl shows 0 tags on those pages. Under Next.js 16 Cache Components / streaming (`'use cache'` + `cacheLife` per AGENTS.md) the element is serialized into the flight payload and not flushed to static HTML the way it is on the (non-cached) detail pages. **Note:** the crawled index HTML predates the `dd3c7e6` CollectionPage commit, so a fresh deploy may improve this — must be re-verified post-fix with `curl | grep`.

### Schema correctness gaps (crawled detail blocks)

1. **No `BreadcrumbList` on any page.** Detail pages in source *do* add it (`breadcrumbJsonLd`), but the served crawl lacks it — stale deploy. Add to all blog/case-study detail pages + index pages.
2. **`BlogPosting` is missing** `dateModified`, `image`, `mainEntityOfPage`, `publisher`, and `@id`. Current source's `blogPostingJsonLd()` now adds these — confirms crawl is partially stale; re-verify after deploy.
3. **Case-study `Article` has no `datePublished`** (only `dateModified`); lacks `mainEntityOfPage`/`publisher`. Case studies are better typed as `TechArticle` or `Article` with full dates and `author` → `@id`.
4. **`Person` author is declared inline on every detail block** (`{"@type":"Person","name":...}`) with **no `@id`** tying it to the global Person node. Should reference `{ "@id": "https://rokyuddin.com/#person" }` so Google collapses all pages to one entity.
5. **`sameAs` missing Twitter/X and, if applicable, other profiles** — currently only GitHub + LinkedIn; add X/Twitter, Dev.to, etc. for stronger entity authority.
6. **No `ItemList`/`CollectionPage`** on `/blog` or `/case-studies` indexes in served HTML (important for crawl structure and rich content discovery).
7. **Homepage lacks a unifying `WebPage`/`AboutPage` assertion with `mainEntity` → Person**, and has no `ProfilePage` semantics; a `Person` on its own page with `mainEntity` is the ideal entity hub.
8. **`description` carries non-property keywords** (case-study headline is all-caps ACII, e.g. "AI-POWERED ALT TEXT GENERATOR") which reads poorly in rich results; prefer title case.
9. No `dateModified` emitted for blog posts without explicit `updatedAt` even though content may change.
10. No `Organization`/`address` reuse; `email` + physical `address` on a public `Person` node can invite spam — acceptable but worth noting.

### Rendering decision (schema is server-vs-JS rendered)

- **Server-rendered (good):** `BlogPosting` (blog detail), `Article` (case-study detail) — real static `<script type="application/ld+json">` tags.
- **Client/JS-only (broken):** `Person` + `WebSite` on every page via `next/script`; and (in current source) `CollectionPage` on indexes may collapse to flight payload under cache components.
- **Correct target:** **all** schema must be server-rendered plain `<script>` elements so it is present in raw HTML without JavaScript.

---

## Recommended JSON-LD (ready to paste)

Recommended architecture: a **`@graph` of `Person` + `WebSite`** on the homepage (site-wide entity hub), `CollectionPage`/`ItemList` on the two indexes, and `BlogPosting` / `TechArticle` + `BreadcrumbList` on detail pages — all referencing a single `Person` via `@id`. Implementation note: render each with a **plain `<script type="application/ld+json">`** inside a Server Component (never `next/script`).

### 1. Homepage — site-wide entities (`Person` + `WebSite` + `WebPage`)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://rokyuddin.com/#person",
      "name": "Md Rokyuddin",
      "givenName": "Rokyuddin",
      "jobTitle": "Frontend Developer",
      "url": "https://rokyuddin.com",
      "email": "rokyuddin.dev@gmail.com",
      "image": "https://rokyuddin.com/me.png",
      "sameAs": [
        "https://github.com/rokyuddin",
        "https://linkedin.com/in/rokyuddin",
        "https://x.com/rokyuddin",
        "https://dev.to/rokyuddin"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Jashore",
        "addressCountry": "BD"
      },
      "knowsAbout": ["React", "Next.js", "TypeScript", "Web Performance", "SEO", "UI/UX"]
    },
    {
      "@type": "WebSite",
      "@id": "https://rokyuddin.com/#website",
      "name": "Md Rokyuddin",
      "url": "https://rokyuddin.com",
      "description": "Frontend Developer specializing in React, Next.js, and TypeScript.",
      "inLanguage": "en",
      "publisher": { "@id": "https://rokyuddin.com/#person" }
    },
    {
      "@type": "WebPage",
      "@id": "https://rokyuddin.com/",
      "url": "https://rokyuddin.com/",
      "name": "Md Rokyuddin | Frontend Developer",
      "isPartOf": { "@id": "https://rokyuddin.com/#website" },
      "about": { "@id": "https://rokyuddin.com/#person" },
      "mainEntity": { "@id": "https://rokyuddin.com/#person" }
    }
  ]
}
```

### 2. `/blog` index — CollectionPage + ItemList

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://rokyuddin.com/blog",
  "name": "Blog | Md Rokyuddin",
  "url": "https://rokyuddin.com/blog",
  "description": "Practical frontend writing on React, Next.js, TypeScript, performance, and delivery.",
  "isPartOf": { "@id": "https://rokyuddin.com/#website" },
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Next.js Performance Optimization: A Complete Guide", "url": "https://rokyuddin.com/blog/nextjs-performance-optimization" },
      { "@type": "ListItem", "position": 2, "name": "TypeScript Best Practices for Scalable Applications", "url": "https://rokyuddin.com/blog/typescript-best-practices" },
      { "@type": "ListItem", "position": 3, "name": "Modern Web Design Trends Shaping 2024", "url": "https://rokyuddin.com/blog/modern-web-design-trends-2024" }
    ]
  }
}
```

### 3. `/case-studies` index — CollectionPage + ItemList

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://rokyuddin.com/case-studies",
  "name": "Case Studies | Md Rokyuddin",
  "url": "https://rokyuddin.com/case-studies",
  "description": "Frontend case studies covering real React, Next.js, and TypeScript projects.",
  "isPartOf": { "@id": "https://rokyuddin.com/#website" },
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Rydr — Ride-Sharing & Concierge Platform", "url": "https://rokyuddin.com/case-studies/rydr" },
      { "@type": "ListItem", "position": 2, "name": "Skinsight — Personalized Skincare Guide", "url": "https://rokyuddin.com/case-studies/skinsight" },
      { "@type": "ListItem", "position": 3, "name": "AltSEO — AI-Powered Alt Text Generator", "url": "https://rokyuddin.com/case-studies/altseo" }
    ]
  }
}
```

### 4. Blog post — BlogPosting + BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "@id": "https://rokyuddin.com/blog/nextjs-performance-optimization",
      "mainEntityOfPage": "https://rokyuddin.com/blog/nextjs-performance-optimization",
      "headline": "Next.js Performance Optimization: A Complete Guide",
      "description": "Unlock blazing-fast performance in your Next.js applications with these advanced optimization techniques and strategies.",
      "image": "https://cdn.sanity.io/images/<asset>-1536x1024.png",
      "datePublished": "2024-11-05",
      "dateModified": "2024-11-05",
      "author": { "@id": "https://rokyuddin.com/#person" },
      "publisher": { "@id": "https://rokyuddin.com/#person" },
      "inLanguage": "en",
      "keywords": ["Next.js", "Performance", "React"],
      "isPartOf": { "@type": "Blog", "@id": "https://rokyuddin.com/blog" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rokyuddin.com" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://rokyuddin.com/blog" },
        { "@type": "ListItem", "position": 3, "name": "Next.js Performance Optimization: A Complete Guide", "item": "https://rokyuddin.com/blog/nextjs-performance-optimization" }
      ]
    }
  ]
}
```

### 5. Case study — TechArticle + BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": "https://rokyuddin.com/case-studies/rydr",
      "mainEntityOfPage": "https://rokyuddin.com/case-studies/rydr",
      "headline": "Ridr — Ride-Sharing & Concierge Platform",
      "name": "Rydr",
      "description": "Architected a comprehensive ride-sharing and concierge platform revolutionizing urban transportation.",
      "image": "https://cdn.sanity.io/images/<asset>-1536x1024.png",
      "datePublished": "2024-01-15",
      "dateModified": "2024-03-20",
      "author": { "@id": "https://rokyuddin.com/#person" },
      "publisher": { "@id": "https://rokyuddin.com/#person" },
      "articleSection": "Transportation & Logistics",
      "inLanguage": "en",
      "isPartOf": { "@id": "https://rokyuddin.com/#website" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rokyuddin.com" },
        { "@type": "ListItem", "position": 2, "name": "Case Studies", "item": "https://rokyuddin.com/case-studies" },
        { "@type": "ListItem", "position": 3, "name": "Rydr", "item": "https://rokyuddin.com/case-studies/rydr" }
      ]
    }
  ]
}
```

### Implementation note (converting source to server-rendered)

Replace all `next/script` `Script` tags with a plain `<script>` element inside a Server Component — this is what makes them appear in static HTML:

```tsx
{/* Server Component — plain element renders into SSR HTML */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: jsonLd(personJsonLd()) }}
/>
```

The existing `src/lib/schema.ts` builders are already well-structured (they add `@id`s, `mainEntityOfPage`, `publisher`, breadcrumbs). The fix is wiring them to plain `<script>` and confirming the Cache-Component path flushes index-page JSON-LD to HTML.

---

## Priority

| # | Action | Severity | Effort |
|---|--------|----------|--------|
| 1 | **layout.tsx: replace `next/script` `<Script>` with plain `<script>`** for Person + WebSite (fixes site-wide entity schema on every page) | **Critical** | Trivial (5 min) |
| 2 | **Verify `/blog` and `/case-studies` index `CollectionPage` reach static HTML** (Cache Components may collapse plain `<script>` into flight payload); hoist JSON-LD to static markup if needed | **High** | Low |
| 3 | Re-deploy & verify with `curl -s <url> \| grep -c 'script type="application/ld+json"'` (expect >= 2 on homepage) then Google Rich Results Test / Schema.org validator | **High** | Low |
| 4 | Add **BreadcrumbList** to every detail page (already in source, confirm it deploys) and to indexes | **Med** | Low |
| 5 | Tie detail-page `author`/`publisher` to global `@id` `https://rokyuddin.com/#person` | **Med** | Low |
| 6 | Add `dateModified` (and `datePublished` on case studies), `image`, `mainEntityOfPage` to all detail blocks | **Med** | Low |
| 7 | Expand `sameAs` (add X/Twitter, Dev.to) for entity authority | **Low** | Trivial |
| 8 | Convert case-study `Article` → `TechArticle` for relevance | **Low** | Trivial |

---

## Summary

The site has functional JSON-LD **only on its 6 detail pages** (BlogPosting for blog posts, Article for case studies), while the two most important site-wide entities — Person and WebSite — are defined in every page but trapped inside the `next/script` mechanism, which renders them client-side via the RSC flight payload rather than as static `<script type="application/ld+json">` tags, leaving the homepage and both index pages with zero crawler-visible structured data. The root cause is a single regression in `src/app/layout.tsx` (commit `e8972a1` migrated plain `<script>` to `next/script`), fixable in minutes by reverting to a plain `<script>` element; the index-page `CollectionPage` schema then needs verification under Next.js 16 Cache Components to confirm it flushes to HTML. Once person/website entities are server-rendered and the existing `src/lib/schema.ts` builders (BreadcrumbList, ItemList, CollectionPage, @id-linked authors/publishers) are confirmed live, the site will meet Schema.org best practice for a personal portfolio: an @id-linked Person+WebSite entity hub on the homepage, CollectionPage/ItemList on indexes, and BlogPosting/TechArticle + BreadcrumbList on detail pages — all machine-readable in raw HTML without JavaScript.
