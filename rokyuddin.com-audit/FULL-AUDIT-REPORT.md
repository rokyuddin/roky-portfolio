# Full Website SEO Audit — rokyuddin.com

**Domain:** https://rokyuddin.com (served on **www.rokyuddin.com**; non-www 308-redirects to www)
**Business type:** Personal portfolio — Md Rokyuddin, Frontend Developer (React / Next.js / TypeScript)
**Stack:** Next.js 16 (App Router), React 19, Sanity CMS, Tailwind CSS 4, Vercel + Cloudflare
**Audit date:** 2026-08-25
**Pages crawled:** 10 (100% of sitemap)
**Method:** full crawl + 12 parallel specialist analyses (technical, content, schema, sitemap, performance/CWV, visual, GEO, SXO, backlinks, Google/CrUX, cluster) + source-level verification

---

## Executive Summary

### SEO HEALTH SCORE: 61 / 100

> **Needs improvement.** The site has genuinely strong fundamentals — a polished, fast-on-desktop Next.js portfolio with correct on-page basics, good E-E-A-T signals, real case studies, and clean layout — but it is held back by **two critical defects** (a self-contradicting www/non-www canonical setup and structured data that never reaches the served HTML), plus a broken social image, a slow mobile LCP, a dormant thin blog, and a brand-new domain with no backlink authority.

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Technical SEO | 62 | 22% | 13.6 |
| Content Quality | 60 | 23% | 13.8 |
| On-Page SEO | 72 | 20% | 14.4 |
| Schema / Structured Data | 40 | 10% | 4.0 |
| Performance (CWV) | 55 | 10% | 5.5 |
| AI Search Readiness | 68 | 10% | 6.8 |
| Images | 70 | 5% | 3.5 |
| **TOTAL** | | | **61.6 → 61** |

### Top 5 Critical Issues
1. **www/non-www canonical conflict (self-contradicting):** the site serves on `www.rokyuddin.com`, but every canonical, sitemap `<loc>`, robots `Host:`, OG URL, and schema URL declares non-www `https://rokyuddin.com` — which itself 308-redirects back to www. Origin: `SITE_URL` default in `src/lib/site.ts`.
2. **Site-wide Person + WebSite schema is invisible to crawlers:** rendered via `next/script` and RSC flight payload, so the homepage and both index pages serve **zero** `<script type="application/ld+json">` tags. Only detail pages emit real schema.
3. **Broken default social image:** `/twitter-image.jpg` returns 404, breaking `og:image`/`twitter:image` on 6 pages.
4. **Mobile LCP 4.7s (POOR):** 424KB of JS + GA4 (167KB, 42% unused) preloaded at high priority; hero image lacks `fetchpriority=high`.
5. **Brand-new domain with zero authority:** `rokyuddin.com` created 2026-08-19; the old `rokyuddin.vercel.app` now 404s with no redirect, so no link equity transfers.

### Top 5 Quick Wins
1. Fix `layout.tsx`: replace `next/script` `<Script>` with plain `<script type="application/ld+json">` (5-minute fix, makes site-wide schema visible).
2. Set `NEXT_PUBLIC_SITE_URL=https://www.rokyuddin.com` to resolve the canonical/www conflict across all channels.
3. Fix `DEFAULT_SOCIAL_IMAGE` from `/twitter-image.jpg` (404) to `/twitter-image`.
4. Add `priority` to the hero `<Image>` and stop high-priority-preloading GA4.
5. Fill or remove the empty "Client Testimonials" section.

---

## 1. Technical SEO (62/100)

**What works:** All 10 pages return 200 and are indexable; HTTPS enforced on both hosts; HSTS present; valid XML sitemap; `/sanity` correctly Disallowed + noindexed; viewport + `lang="en"` everywhere; trailing-slash normalization correct; no dead links; single-host responsive (no `m.` duplication).

### Crawlability & Indexability
- All 10 sitemap URLs reachable (HTTP 200 on www). No 404/5xx.
- No `X-Robots-Tag: noindex` or `<meta name="robots" content="noindex">` on any main page.
- `/sanity` (Sanity CMS) correctly returns 200 + `noindex`, paired with `Disallow: /sanity`. No content leak.
- `/blog/` → `/blog`, `/playground/` → `/playground` (correct slash normalization).

### 🔴 CRITICAL — www/non-www canonical conflict
The site **physically serves on `www.rokyuddin.com`** (non-www returns a 308 → www on the root and every path), but `SITE_URL` in `src/lib/site.ts` defaults to **non-www `https://rokyuddin.com`** and drives:
- all 10 `<link rel="canonical">`, OpenGraph `og:url`, Twitter card, `metadataBase`
- `robots.txt` `Host:` + `Sitemap:`
- all 10 sitemap `<loc>`
- all Schema.org `@id`/`url` fields

So every declared canonical points at a URL that **308-redirects back to www** — a self-conflicting, contradictory setup that adds redirect hops, contradicts the self-declared canonical, and weakens the consolidated ranking host.

**Fix (pick ONE host; www is recommended since it already serves):**
1. **Preferred:** `NEXT_PUBLIC_SITE_URL=https://www.rokyuddin.com` (or change the default in `src/lib/site.ts`); keep the non-www → www 308; resubmit the sitemap in GSC and confirm the `https://www.rokyuddin.com` property.
2. **Alternative:** serve on non-www (remove the 308, add `www → non-www` 301) and keep `SITE_URL=https://rokyuddin.com`.

### 🟠 HIGH — Broken default social image
`DEFAULT_SOCIAL_IMAGE = "/twitter-image.jpg"` → **404**; the real dynamic route is `/twitter-image` (200, PNG). Breaks `og:image`/`twitter:image` on **6 pages** (blog index, 3 posts, case-studies index, playground). Homepage sidesteps this with a Sanity OG image (~1MB, oversized).

### 🟡 MEDIUM — Security headers
Only HSTS set (no `includeSubDomains`/`preload`). Missing CSP, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`.

---

## 2. Content Quality (60/100)

**What works:** Strong homepage E-E-A-T (named employers with dates, 3+ years, public resume link, verifiable contact); case studies are genuine, dated engineering narratives (durations, team sizes, outcomes); clean H2/H3 passage structure; homepage value proposition is clear and hedge-free.

### E-E-A-T Assessment
- **Experience:** Strong — dated named employers, 3+ years, embedded resume, detailed case studies with durations/teams.
- **Expertise:** Moderate-good — explicit current stack, concrete technical decisions (RLS, Zustand, SSR, WebSockets).
- **Authoritativeness:** Weak — no external sources/citations anywhere; blog authors lack bio/url/sameAs; individual projects not fully linked to repos.
- **Trustworthiness:** Moderate — verifiable contact on homepage, but **no About page, no Contact page, no persistent footer** on content pages.

### 🟠 HIGH — Dormant, extremely thin blog
All 3 posts date **November 2024** (~21 months stale), run **~135–200 body words each** while claiming "5–8 min read". "Modern Web Design Trends **2024**" is structurally obsolete in 2026. These cannot win their target SERPs and undercut domain recency/quality perception. They are outline-level stubs, not the "deep dives" the blog tagline promises.

### 🟠 HIGH — Missing About / Contact / footer
- No About page (only a homepage section).
- No Contact page (contact is a homepage anchor only).
- **Content pages have no persistent footer** — the "Get in Touch" button on blog/case-study pages points to `/#contact`, which only exists on the homepage. Users and crawlers cannot reach contact/About from articles.

### 🟡 MEDIUM — Empty testimonials section
Homepage renders "04 Client Testimonials" with `testimonials:[]` — a visible trust hole.

### 🟡 MEDIUM — Unverifiable, duplicated case-study metrics
Results ("99.9% uptime", "100% accessibility", "10x") are self-reported with **no source/screenshot**. The exact same description is duplicated verbatim across the homepage card, index card, and page meta description (self-competition risk).

---

## 3. On-Page SEO (72/100)

**What works:** All 10 pages have unique titles + meta descriptions + canonicals; homepage H1 "Md Rokyuddin" is present **above the fold, server-rendered**; clean heading hierarchy.

### Issues
- **Duplicate H1 on every blog post** (visible H1 + repeated in-body H1). Keep one H1 per page.
- **Duplicate meta descriptions/copy across case-study URLs** (meta description = Project Overview paragraph = card text). Distinguish per URL.
- **Playground has no H1** and is a JS-driven tool page with minimal server-rendered content.

---

## 4. Schema & Structured Data (40/100) — 🔴 weakest category

**What works:** `src/lib/schema.ts` has well-structured builders (Person, WebSite, BlogPosting, Article, BreadcrumbList, CollectionPage) with `@id`s, `publisher`, keywords. Detail pages (3 blog posts → BlogPosting, 3 case studies → Article) emit **real server-rendered** `<script type="application/ld+json">`.

### 🔴 CRITICAL — Site-wide schema is invisible to crawlers
`layout.tsx` renders the Person + WebSite schema via the **`next/script` `<Script>` component** (default `afterInteractive`). This does **not** emit inline JSON-LD into server HTML — the data is serialized into the React Server Components **flight payload** (`self.__next_f.push`) and injected client-side after hydration. Verified live:
- Homepage serves **0** real `<script type="application/ld+json">` tags.
- `/blog` and `/case-studies` indexes serve **0** real tags (their `CollectionPage` also collapses into the flight payload under Next.js 16 Cache Components/streaming).
- Only the 6 detail pages emit real schema — and they work only because they use plain `<script>` elements.

The single most important page for entity binding (homepage) sends **no structured data** to crawlers that read raw HTML (Google, Bing, LinkedIn, and most AI crawlers). **Root cause regression: commit `e8972a1` migrated plain `<script>` → `next/script`.**

**Fix (5 minutes):** in `src/app/layout.tsx`, replace the two `<Script>` components with plain `<script type="application/ld+json">` elements; remove the `next/script` import. Verify `/blog` + `/case-studies` `CollectionPage` flush to HTML. Re-test with `curl -s <url> | grep -c 'script type="application/ld+json"'` (expect ≥2 on homepage) and Google Rich Results Test.

### Other schema gaps
- Case studies typed as generic `Article` → use `TechArticle`/`CreativeWork`.
- No `BreadcrumbList` in served HTML.
- `Person` author declared inline without `@id` to a global Person node; `sameAs` missing X.
- Case studies lack `datePublished`.
- Paste-ready JSON-LD for Person+WebSite+WebPage `@graph`, CollectionPage/ItemList, BlogPosting+BreadcrumbList, and TechArticle+BreadcrumbList is provided in `findings/schema.md`.

---

## 5. Performance / Core Web Vitals (55/100)

**What works:** Desktop is excellent (Performance 91, LCP 1.3s good); **CLS = 0** on both (stable layout); all images `next/image`; fonts self-hosted via `next/font` (no Google Fonts dependency); correct preloads. No CrUX field data exists (traffic below eligibility — typical for a young portfolio).

### 🟠 HIGH — Mobile LCP 4.7s (POOR)
Measured via PageSpeed Insights lab (mobile): **Performance 68, LCP 4.7s, FCP 3.0s, TBT 310ms, Speed Index 5.4s**. Root causes:
- **424KB JS / 18 scripts** (1.2MB un-minified), ~116KB unused JS, 955ms script evaluation + 4 long tasks (INP risk).
- **GA4 `gtag.js` (167KB, 42% unused) preloaded at High priority** → steals the connection slot from the LCP image.
- **Hero profile image preloaded but no `fetchpriority="high"`**; its render is gated behind RSC hydration (lab 4.7s vs observed ~2.8s network).
- **Double analytics** (GA4 + Cloudflare Web Analytics) — redundant ~180KB third-party.
- Server response time negligible (TTFB not the issue).

**Top fixes:** add `priority` to hero `<Image>`; stop high-priority-preloading GA4 (or drop GA4, keep Cloudflare analytics); trim unused JS; lazy-load below-the-fold sections (`next/dynamic`); shrink oversized 1536×1024 case-study images (~69KB); `subset:['latin']` fonts; bump SWC target (~14KB legacy-JS).

---

## 6. AI Search Readiness / GEO (68/100)

**What works:** Citability **68/100**. **Every AI crawler is allowed** (robots.txt `User-Agent: *` / `Allow: /` — GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, CCBot none blocked). **llms.txt is present** with above-average quality (name, role, stack, location, contact). Homepage + AltSEO case study are strong, hedge-free, quotable (3+ years, 40% efficiency, <5s processing, 1-month solo build). Clean H1→H2→H3 passage structure.

### Gaps
- **`llms-full.txt` → 404** (missing); no per-page metric summaries of the most quotable case studies.
- **Blog posts not citable** — generic, fact-free ("game-changer", "lightning fast"); a model would cite Next.js docs instead. Inject 2–4 concrete first-person data points per post.
- **Homepage entity schema invisible to AI crawlers** (same RSC/next-script issue as §4) — the page that matters most for entity binding gives non-JS crawlers zero schema.
- Extend `Person` schema with `worksFor`, `knowsAbout`, full `sameAs` (add X); add homepage FAQ + `FAQPage` schema (high-value GEO pattern).
- Remove non-standard `Host:` line from robots.txt (ignored by Google/AI).
- Separate blog code fences from prose (code merged into `<p>` hurts passage extraction).

---

## 7. Images (70/100)

**What works:** All images use `next/image` with alt text (13 homepage images, **none** missing alt); CLS 0; responsive `srcset`/`sizes`; below-fold images lazy-loaded.

### Issues
- **Oversized case-study images**: 1536×1024 PNG sourced from Sanity but displayed ~500–750px (~69KB waste).
- **Homepage OG image ~1MB** (large for a social preview).
- Heroes: LCP image lacks `fetchpriority=high`.
- Verify WebP/AVIF negotiation at the Vercel/Cloudflare edge.

---

## 8. Backlinks & Authority

- **`rokyuddin.com` created 2026-08-19** (~6 days old) — DA estimated **~1–5** (unmeasured; Tier 0 Common Crawl found the domain absent from its index, which is expected for a brand-new domain).
- **Domain migration risk (critical):** the old `rokyuddin.vercel.app` now returns **404 `DEPLOYMENT_NOT_FOUND`** with **no 301 redirect** → no link equity or stale-link transfer, and the two properties are treated as unrelated by search engines. The old domain last archived 2025-07-16; zero WayBack snapshots of the new domain.
- Only substantive backlink found: GitHub profile (`blog` field = `https://rokyuddin.com`) + the `velora-ui` open-source repo.
- **Roadmap:** re-claim/redirect the old subdomain, replace the old URL in `velora-ui` + social bios, point high-authority profiles (GitHub, npm, LinkedIn, dev.to) at the canonical URL, and use the open-source library + technical blog to earn 1–2 genuine editorial links. No spam/link-farm tactics.

---

## 9. Search Experience (SXO) & Semantic Clusters

### Persona scores (1–10)
| Page | Hiring Mgr | Client/Founder | Technical Peer |
|------|-----------|----------------|----------------|
| Homepage | 7 | 5 | 6 |
| Blog index | 5 | 4 | 5 |
| Blog post (stubs) | 3–4 | 3–4 | 2–3 |
| Case studies index | 7 | 8 | 6 |
| Case study (Rydr) | 7 | 8 | 7 |
| **Average** | **5.2** | **5.2** | **5.3** |

**Key SXO issues:** no standalone services/hire page (commercial intent served poorly); homepage tries to be portfolio + hire + contact at once; blog "Complete Guide" pages are 135-word stubs; empty testimonials; case studies typed as generic `Article`.

### Content architecture (from cluster analysis)
The 3 blog posts are **disconnected one-off head-term attempts**, not a coherent cluster. Recommend a **hub-and-spoke architecture** around the site's clear ownership theme — *modern frontend engineering (React, Next.js, TypeScript, performance)* — with 5 clusters: **Next.js, TypeScript, Frontend Performance, React, Design Engineering**. Publish winnable long-tail **spokes before pillars** (e.g., "Next.js image optimization", "RSC vs Client Components", "TypeScript `satisfies`", typing React props). **Internal-link immediately:** route case-study authority (Rydr Lighthouse 95+, AltSEO Next.js 16) into the blog; "Next.js performance optimization" / "TypeScript best practices" are NOT realistic near-term ranking targets for a young domain.

---

## Recommendations — Full Priority List

See **`ACTION-PLAN.md`** for the phased, effort-estimated action plan.

---

## Appendix: Files Produced
- `FULL-AUDIT-REPORT.md` (this file)
- `ACTION-PLAN.md` — phased prioritized recommendations
- `audit-data.json` — structured audit envelope (for PDF report generation)
- `findings/` — 12 specialist reports + 1 source-level critical note
- `screenshots/` — desktop (1920×1080), laptop (1366×768), mobile (375×812) captures
- `crawl/` — server-rendered HTML of all 10 pages

*Data availability note:* No Google Search Console / GA4 / CrUX field data (API-key-only tier + traffic below CrUX eligibility), and no Moz/Bing backlink API. Lab CWV and Common Crawl-based backlink analysis used instead; limitations are noted inline.
