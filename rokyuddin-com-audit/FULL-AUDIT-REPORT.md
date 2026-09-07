# SEO Audit Report — rokyuddin.com

**Date:** 2026-09-02
**Auditor:** Qoder SEO Audit
**Target:** https://www.rokyuddin.com
**Pages crawled:** 11 (full sitemap)
**Business type detected:** Personal Portfolio / Freelance Developer

---

## Executive Summary

**SEO Health Score: 68/100**

rokyuddin.com is a well-architected Next.js 16 portfolio with solid technical fundamentals — SSR/SSG, proper canonical tags, comprehensive JSON-LD, and a clean sitemap. However, a systemic title tag duplication bug, duplicate H1 tags on blog posts, missing security headers, and thin blog content are holding back search performance.

### Top 5 Critical Issues
1. **Title tag duplication on all 11 pages** — every title appends "| Md Rokyuddin" twice
2. **Duplicate H1 tags on all 3 blog posts** — blog header and markdown renderer both emit `<h1>`
3. **Missing security headers** — no CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, or Permissions-Policy
4. **Thin blog content** — 271–310 words per post, well below the 600+ word SEO minimum
5. **No llms.txt** — missing AI crawler guidance file

### Top 5 Quick Wins
1. Fix title template — remove `| SITE_NAME` from per-page title strings (15 min)
2. Fix duplicate H1 — change `# ` to `## ` in blog markdown or in the renderer (10 min)
3. Add security headers in `next.config.ts` (15 min)
4. Create `/public/llms.txt` (10 min)
5. Add `preconnect` to `cdn.sanity.io` and `googletagmanager.com` (5 min)

---

## Technical SEO — Score: 72/100

### What Works
- Clean URL structure: `/about`, `/blog`, `/case-studies/altseo` — no query params, no trailing slashes
- Bare domain `rokyuddin.com` properly 308-redirects to `www.rokyuddin.com`
- `robots.txt` allows all crawlers, blocks `/sanity` (admin route), declares sitemap
- XML sitemap at `/sitemap.xml` lists all 11 pages with `lastmod`, `changefreq`, `priority`
- All 11 sitemap URLs return HTTP 200
- HTTPS enforced with HSTS (`max-age=63072000`)
- Vercel + Cloudflare CDN with prerendered HTML (`x-nextjs-prerender: 1`)
- 404 returns correct HTTP 404 status (not soft 404)
- Google Analytics 4 loaded with `lazyOnload` strategy — doesn't block render

### Findings

#### F1: Missing Security Headers — Severity: High
**Evidence:** `curl -sI` response contains only `strict-transport-security`. No `content-security-policy`, `x-content-type-options`, `x-frame-options`, `referrer-policy`, or `permissions-policy`.
**Impact:** Vulnerable to clickjacking, MIME-type sniffing, and injection attacks. Google considers security a ranking signal.
**Recommendation:** Add a `headers()` function to `next.config.ts`:
```ts
async headers() {
  return [{
    source: '/(.*)',
    headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; img-src 'self' https://cdn.sanity.io data:; style-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self' https://www.google-analytics.com; frame-ancestors 'none'" },
    ],
  }];
}
```

#### F2: No llms.txt — Severity: Medium
**Evidence:** `GET /llms.txt` returns 404.
**Impact:** AI crawlers (GPTBot, Claude, Perplexity) have no structured guidance about the site. Limits AI search visibility.
**Recommendation:** Create `/public/llms.txt` with site summary, key pages, and context for LLMs.

#### F3: Static Asset Caching Suboptimal — Severity: Medium
**Evidence:** `/_next/static/chunks/*.js` served with `cache-control: public, max-age=14400, must-revalidate` (4 hours). Next.js static chunks are content-hashed and immutable.
**Impact:** Repeated downloads of unchanged assets, slower repeat visits.
**Recommendation:** Set longer `max-age` for `/_next/static/*` in `next.config.ts` headers. Vercel should set `immutable` for hashed assets automatically — verify the `Cache-Control` on the Vercel deployment settings.

#### F4: No Preconnect/DNS-prefetch — Severity: Low
**Evidence:** No `<link rel="preconnect">` or `<link rel="dns-prefetch">` for `cdn.sanity.io` or `googletagmanager.com`.
**Impact:** Adds DNS resolution + TLS handshake latency to first image and analytics loads.
**Recommendation:** Add to `app/layout.tsx`:
```tsx
<link rel="preconnect" href="https://cdn.sanity.io" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
```

#### F5: No `.well-known/security.txt` — Severity: Low
**Evidence:** `GET /.well-known/security.txt` returns 404.
**Impact:** No vulnerability reporting channel. Minor trust signal for security-conscious visitors.
**Recommendation:** Create `/public/.well-known/security.txt` with contact info.

---

## Content Quality — Score: 55/100

### What Works
- Homepage copy is clear and well-structured (481 words, good for a portfolio)
- Case study pages are detailed (good heading structure, project context)
- Meta descriptions are unique per page and descriptive
- Author E-E-A-T signals present (Person schema, GitHub/LinkedIn links, job title)

### Findings

#### F6: Blog Posts Are Thin Content — Severity: High
**Evidence:** Word counts: blog1=310, blog2=273, blog3=271. Google's helpful content guidelines favor 600+ words. Posts are essentially listicles with 3–4 sections and no code examples.
**Impact:** Google may flag as thin content. Low keyword depth. Poor engagement metrics (high bounce, short dwell time). Won't rank for competitive terms.
**Recommendation:** Expand each post to 800–1200+ words. Add code examples, real-world case study references (the case studies on the site are perfect for this), performance benchmarks, and practical how-to sections. Link blog posts to related case studies (the code already supports `relatedCaseStudies`).

#### F7: Contact Page Very Thin — Severity: Medium
**Evidence:** 94 words, 0 H2 tags. No FAQ, no structured content.
**Impact:** Low keyword relevance signals. Limited crawl value.
**Recommendation:** Add an H2 section (e.g., "What I Can Help With"), brief service description, response time expectation, and FAQ section. Target 300+ words.

#### F8: Blog and Case Studies Listing Pages Have No H2 — Severity: Medium
**Evidence:** Blog listing: 0 H2s, 3 H3s. Case studies listing: 4 H2s (but case study names, not descriptive headings).
**Impact:** Flat heading hierarchy. Missing semantic structure for crawlers.
**Recommendation:** Blog listing should have an H2 like "Frontend Articles & Tutorials" before the article cards. Case study listing H2s should be descriptive (e.g., "AltSEO: AI-Powered Alt Text Generation") rather than just product names.

#### F9: No FAQ Section or FAQPage Schema — Severity: Low
**Evidence:** No FAQ content on any page. No FAQPage JSON-LD.
**Impact:** Misses rich result opportunity and long-tail keyword capture.
**Recommendation:** Add a FAQ section to the About or Contact page with 3–5 common questions (e.g., "What's your availability?", "Do you work with startups?"). Add FAQPage schema.

#### F10: Blog Content Not Fresh — Severity: Low
**Evidence:** Blog dates are Nov 2024. No recent posts. `lastmod` in sitemap is Jan 2026 but actual content hasn't changed.
**Impact:** Search engines may de-prioritize for queries that favor fresh content.
**Recommendation:** Publish new content regularly, or update existing posts with new sections/insights.

---

## On-Page SEO — Score: 68/100

### What Works
- Single H1 on most pages (homepage, about, contact, case studies listing, case study details)
- Meta descriptions present and unique on all 11 pages
- Canonical tags correctly set on all pages
- `robots: index, follow` on all indexable pages
- Robots meta properly blocks non-indexable routes (playground, 404s)
- Viewport tag correct
- Charset UTF-8 declared
- Internal linking is reasonable (17 internal links on homepage)
- Clean heading hierarchy on homepage (1 H1 → 4 H2 → 7 H3)

### Findings

#### F11: Title Tag Duplication on ALL Pages — Severity: Critical
**Evidence:** Every page's `<title>` contains the site name twice:
- Homepage: `Md Rokyuddin | Frontend Developer | Md Rokyuddin`
- About: `About | Md Rokyuddin | Md Rokyuddin`
- Blog post: `Modern Web Design Trends Shaping 2024 | Md Rokyuddin | Md Rokyuddin`
- Case study: `AltSEO Frontend Case Study | Md Rokyuddin | Md Rokyuddin`

**Root cause:** `app/layout.tsx:38` sets `template: '%s | ${SITE_NAME}'`. Individual pages set their title to include `| ${SITE_NAME}` (e.g., `about/page.tsx:9` → `About | Md Rokyuddin`, `blog/[slug]/page.tsx:38` → `${post.title} | ${SITE_NAME}`). The template then appends another `| Md Rokyuddin`.

**Impact:** Wastes ~15 characters of the 60-character title tag display limit. Looks unprofessional in SERPs. Google may truncate titles.

**Recommendation:** Remove `| ${SITE_NAME}` from per-page title strings. The template already handles it. Changes needed:
- `src/app/(landing)/page.tsx:21` — change to `const title = profile?.name ? \`${profile.name} | ${role}\` : SITE_TITLE;` → the profile name + role produces "Md Rokyuddin | Frontend Developer" which equals SITE_TITLE. For the default case, use `title: { absolute: SITE_TITLE }` to bypass the template.
- `src/app/about/page.tsx:9` — change to `const ABOUT_TITLE = "About";`
- `src/app/contact/page.tsx` — remove `| ${SITE_NAME}` from title
- `src/app/blog/page.tsx` — remove `| ${SITE_NAME}` from title
- `src/app/blog/[slug]/page.tsx:38` — change to `const title = post.title;`
- `src/app/case-studies/page.tsx` — remove `| ${SITE_NAME}` from title
- `src/app/case-studies/[slug]/page.tsx:34-35` — remove `| ${SITE_NAME}` from both branches

#### F12: Duplicate H1 Tags on All Blog Posts — Severity: High
**Evidence:** All 3 blog posts have 2 identical `<h1>` tags (e.g., "Modern Web Design Trends Shaping 2024" appears twice).
**Root cause:** `src/features/blogs/components/blog-header.tsx:60` renders `<h1>{post.title}</h1>`, and `src/features/blogs/components/blog-content.tsx:24-25` converts markdown `# ` lines to `<h1>` tags. Blog post content starts with `# Title`.
**Impact:** Google may get confused about the primary heading. Can dilute keyword signals.
**Recommendation:** Two options:
1. Change `blog-content.tsx:24` to render `# ` as `<h2>` instead of `<h1>` (quick fix, but changes semantic hierarchy)
2. Strip the first `# ` heading from blog content if it matches the title (best practice)
3. Change blog content to not start with `# ` and let `BlogHeader` handle the title

#### F13: OG Images Not Unique — Severity: Medium
**Evidence:** Blog posts and most pages use generic `/twitter-image` as OG image. Only the homepage and case studies with cover images have unique OG images.
**Impact:** Social shares look identical. No visual differentiation in feeds.
**Recommendation:** Generate unique OG images per blog post, or use the blog post cover image as the OG image (the code supports this but only when `coverImage` is not a placeholder).

#### F14: Keywords Meta Tag Present but Low Value — Severity: Info
**Evidence:** `<meta name="keywords">` exists with relevant terms on homepage.
**Impact:** Google ignores keywords meta tag. No SEO benefit, no harm.
**Recommendation:** Can leave as-is or remove — purely cosmetic.

---

## Schema & Structured Data — Score: 85/100

### What Works
- Person schema on all pages (name, jobTitle, email, address, knowsAbout, sameAs)
- WebSite schema on all pages
- BreadcrumbList schema on all subpages (correct hierarchy)
- BlogPosting schema on blog posts (datePublished, dateModified, author, publisher, keywords)
- CollectionPage schema with ItemList on blog and case studies listing pages
- Article schema on case study detail pages
- All JSON-LD uses `@context` and `@type` correctly
- `@id` references used properly for entity linking

### Findings

#### F15: Person Schema Missing Fields — Severity: Low
**Evidence:** Person schema has `knowsAbout` and `sameAs` but is missing `image`, `telephone`, `worksFor`, `alumniOf`, `award`, `credential` fields.
**Recommendation:** Add `image` (profile photo URL from Sanity), and optionally `worksFor` with the current employer.

#### F16: BlogPosting Missing image Field — Severity: Low
**Evidence:** BlogPosting schema lacks `image` field. Google requires or strongly recommends `image` for Article rich results.
**Impact:** May miss out on Article rich results in SERPs.
**Recommendation:** Add `image` to BlogPosting schema pointing to the post's cover image or a default.

#### F17: No FAQPage Schema — Severity: Low
**Evidence:** No FAQPage schema anywhere on the site.
**Recommendation:** Add FAQ content to the About or Contact page and include FAQPage JSON-LD.

#### F18: WebSite Schema Missing SearchAction — Severity: Low
**Evidence:** WebSite schema lacks `potentialAction` for Sitelinks Search Box.
**Impact:** No sitelinks search box in Google results.
**Recommendation:** If the site gets a search feature, add `potentialAction` with SearchAction.

---

## Performance (CWV) — Score: 70/100

### What Works
- Next.js SSR/SSG with prerendered HTML
- Vercel CDN with cache HIT (`x-vercel-cache: HIT`)
- Google Analytics uses `lazyOnload` strategy (won't block render)
- Font preloading via Next.js font optimization
- Cloudflare HTTP/2 + HSTS

### Findings

#### F19: 15 External Script Tags + 42 Inline Scripts — Severity: Medium
**Evidence:** Homepage loads 15 external JS files and 42 inline script blocks (41.5KB of inline JS). Only 1 preload directive.
**Impact:** Excessive script loading can delay LCP and increase TBT/INP. 41KB of inline HTML is render-blocking.
**Recommendation:** Audit Next.js chunk strategy. Consider using `dynamic()` imports for below-the-fold components. The 42 inline scripts are likely Next.js RSC payload + hydration data — this is normal for Next.js SSR but verify no unnecessary inline scripts exist.

#### F20: Only 1 CSS File Preloaded — Severity: Info
**Evidence:** 1 CSS file (`/_next/static/chunks/fe025121a3b7f81b.css`) loaded via stylesheet link, not preloaded.
**Recommendation:** This is standard Next.js behavior. The CSS is small enough that it doesn't need preloading. No action needed.

#### F21: Homepage HTML is 104KB — Severity: Low
**Evidence:** Raw HTML response is 104,289 bytes. For a portfolio homepage with limited content, this is larger than expected — likely due to Next.js RSC payload and inline hydration data.
**Impact:** Slower TTFB on slow connections. More data to parse before render.
**Recommendation:** This is typical for Next.js App Router with RSC. Monitor LCP in the field. If it's slow, consider reducing the number of Suspense boundaries or lazy-loading below-the-fold sections.

---

## Images — Score: 90/100

### What Works
- All 13 images on homepage have alt text
- All images on case study pages have alt text
- Next.js Image component used for Sanity images
- Only `cdn.sanity.io` whitelisted in `next.config.ts` (good security)
- OG image has proper dimensions on homepage (1200x630)

### Findings

#### F22: OG Image Missing Dimensions on Subpages — Severity: Low
**Evidence:** OG image on About, Contact, Blog, Case Studies pages uses `/twitter-image` without width/height attributes. Only the homepage OG image has explicit dimensions.
**Impact:** Some social platforms may not render the preview card correctly without dimensions.
**Recommendation:** Add `width: 1200, height: 630` to OG image config in `socialMetadata()`.

---

## AI Search Readiness — Score: 55/100

### What Works
- Clean semantic HTML structure (proper headings, nav, footer)
- Server-rendered HTML (no SPA hydration required for content)
- Person schema provides strong author/entity signals
- Site is crawlable (robots.txt allows all)
- Clean internal linking structure

### Findings

#### F23: No llms.txt — Severity: Medium
**Evidence:** `/llms.txt` returns 404.
**Impact:** AI crawlers have no structured guidance about the site's content, purpose, or key pages.
**Recommendation:** Create `/public/llms.txt`:
```
# rokyuddin.com
> Portfolio of Md Rokyuddin, a frontend developer specializing in React, Next.js, and TypeScript.

## About
https://www.rokyuddin.com/about

## Blog
https://www.rokyuddin.com/blog
https://www.rokyuddin.com/blog/typescript-best-practices
https://www.rokyuddin.com/blog/nextjs-performance-optimization
https://www.rokyuddin.com/blog/modern-web-design-trends-2024

## Case Studies
https://www.rokyuddin.com/case-studies
https://www.rokyuddin.com/case-studies/altseo
https://www.rokyuddin.com/case-studies/skinsight
https://www.rokyuddin.com/case-studies/rydr

## Contact
https://www.rokyuddin.com/contact
```

#### F24: Thin Content Limits AI Citability — Severity: Medium
**Evidence:** Blog posts (271–310 words) lack depth for AI systems to extract and cite. No data, no benchmarks, no unique insights.
**Impact:** AI search results won't reference this content as a source. No "AI citation readiness."
**Recommendation:** Expand blog content with specific, citable information: code snippets, performance metrics, architecture diagrams, and unique insights from the case studies.

#### F25: No Structured Data for AI Consumption — Severity: Low
**Evidence:** While JSON-LD exists, there's no `Article` body structured data, no `HowTo` or `FAQPage` schema that AI systems prefer.
**Recommendation:** Add `FAQPage` and `HowTo` schema where applicable. Consider adding `description` to more schema elements.

---

## Sitemap Analysis

### Current Sitemap
```xml
11 URLs total:
- / (priority 1.0, weekly)
- /about (priority 0.7, monthly)
- /contact (priority 0.6, yearly)
- /blog (priority 0.9, weekly)
- /blog/modern-web-design-trends-2024 (priority 0.8, monthly)
- /blog/typescript-best-practices (priority 0.8, monthly)
- /blog/nextjs-performance-optimization (priority 0.8, monthly)
- /case-studies (priority 0.9, weekly)
- /case-studies/altseo (priority 0.8, monthly)
- /case-studies/skinsight (priority 0.8, monthly)
- /case-studies/rydr (priority 0.8, monthly)
```

### Findings
- Sitemap is well-structured with correct priorities
- `lastmod` dates are present (homepage Aug 2026, blog/case studies Jan 2026)
- `/playground` is correctly excluded from sitemap
- No missing pages — all navigable URLs are in the sitemap
- Consider adding a separate `sitemap-blog.xml` and `sitemap-case-studies.xml` if content grows

---

## Internal Linking

### Current Structure
```
Homepage links to: /about, /blog, /case-studies, /case-studies/*, /contact, /playground, /#contact, /#projects
Blog listing links to: 3 blog posts, /case-studies
Blog posts link to: /blog, /case-studies, /#contact
Case studies listing links to: 3 case studies, /contact
Case study pages link to: /case-studies, /#contact
```

### Findings
- Good cross-linking between blog and case studies (related content)
- `/playground` is linked from the homepage but not from other pages (intentional, as it's non-indexable)
- No orphan pages
- Anchor text is descriptive (e.g., "View case studies", not "click here")
- Consider adding "Related blog posts" section to case study pages for bidirectional linking

---

## Scoring Summary

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 72 | 15.8 |
| Content Quality | 23% | 55 | 12.7 |
| On-Page SEO | 20% | 68 | 13.6 |
| Schema / Structured Data | 10% | 85 | 8.5 |
| Performance (CWV) | 10% | 70 | 7.0 |
| AI Search Readiness | 10% | 55 | 5.5 |
| Images | 5% | 90 | 4.5 |
| **Total** | **100%** | — | **67.6 → 68** |

---

## Audit Artifacts

- `audit-data.json` — Structured audit envelope for report generation
- `findings/technical.md` — Technical SEO specialist findings
- `findings/content.md` — Content quality specialist findings
- `findings/schema.md` — Schema specialist findings
- `findings/performance.md` — Performance specialist findings
- `findings/ai-search.md` — AI search readiness findings
- `findings/on-page.md` — On-page SEO findings
- `findings/images.md` — Image optimization findings
