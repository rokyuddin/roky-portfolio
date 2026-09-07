# SEO Action Plan — rokyuddin.com

**Generated:** 2026-09-02
**Current Health Score:** 68/100
**Target:** 85+/100

---

## Phase 1: Critical Fixes (Week 1)

### 1.1 Fix Title Tag Duplication — All Pages — 15 min
**Issue:** Every page title appends "| Md Rokyuddin" twice due to per-page titles including `SITE_NAME` while the layout template also adds it.
**Files to change:**
- `src/app/(landing)/page.tsx:21` — Use `title: { absolute: SITE_TITLE }` for the homepage to bypass the template, OR set `title` to just the profile name + role without `SITE_NAME`
- `src/app/about/page.tsx:9` — Change `ABOUT_TITLE` from `"About | ${SITE_NAME}"` to `"About"`
- `src/app/contact/page.tsx` — Remove `| ${SITE_NAME}` from the title
- `src/app/blog/page.tsx` — Remove `| ${SITE_NAME}` from the title
- `src/app/blog/[slug]/page.tsx:38` — Change `const title = \`${post.title} | ${SITE_NAME}\`` to `const title = post.title`
- `src/app/case-studies/page.tsx` — Remove `| ${SITE_NAME}` from the title
- `src/app/case-studies/[slug]/page.tsx:34-35` — Remove `| ${SITE_NAME}` from both branches

**Expected result:** Titles like "About | Md Rokyuddin" instead of "About | Md Rokyuddin | Md Rokyuddin"

### 1.2 Fix Duplicate H1 on Blog Posts — 10 min
**Issue:** `BlogHeader` renders `<h1>{post.title}</h1>` and `BlogContent` also converts `# ` markdown to `<h1>`.
**File:** `src/features/blogs/components/blog-content.tsx:24-25`
**Fix:** Change `# ` rendering from `<h1>` to `<h2>` (since `BlogHeader` already provides the `<h1>`):
```tsx
if (line.startsWith("# ")) {
    return `<h2 class="mt-8 md:mt-12 mb-4 md:mb-6 font-serif font-bold text-foreground text-2xl sm:text-3xl md:text-4xl">${line.replace("# ", "")}</h2>`;
}
```
**Alternative:** Strip the first `# ` line from content if it matches the title.

### 1.3 Add Security Headers — 15 min
**Issue:** No CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, or Permissions-Policy.
**File:** `next.config.ts`
**Fix:** Add `headers()` function (see FULL-AUDIT-REPORT.md F1 for exact code).

---

## Phase 2: High-Impact Improvements (Weeks 2-3)

### 2.1 Create llms.txt — 10 min
Create `/public/llms.txt` with site summary and key page URLs (see F23 in full report).

### 2.2 Add Preconnect Tags — 5 min
Add `<link rel="preconnect" href="https://cdn.sanity.io" />` and `<link rel="dns-prefetch" href="https://www.googletagmanager.com" />` to `src/app/layout.tsx`.

### 2.3 Expand Blog Posts — 3-5 hours
- Expand each blog post to 800-1200+ words
- Add code examples and real metrics from case studies
- Link to related case studies using `relatedCaseStudies` field
- Update `lastmod` in sitemap after content changes

### 2.4 Enrich Contact Page — 30 min
- Add H2 section (e.g., "What I Can Help With")
- Add response time expectation
- Add FAQ section with 3-5 questions
- Target 300+ words

### 2.5 Add H2 to Blog Listing Page — 15 min
Add descriptive H2 heading before the article cards (e.g., "Frontend Articles & Tutorials").

### 2.6 Add OG Image Dimensions to socialMetadata() — 5 min
Add `width: 1200, height: 630` to the image object in `src/lib/site.ts` `socialMetadata()`.

### 2.7 Add image to BlogPosting Schema — 10 min
Add `image` field to BlogPosting JSON-LD in `src/lib/schema.ts`.

### 2.8 Add image to Person Schema — 10 min
Add `image` field pointing to profile photo from Sanity in `src/lib/schema.ts`.

---

## Phase 3: Content & Authority (Month 2)

### 3.1 Publish New Blog Content
- 1-2 new posts per month targeting frontend keywords
- Topics: Next.js 16 features, Cache Components, TypeScript patterns
- 1000+ words with code examples

### 3.2 Add FAQ Schema
- Add FAQPage JSON-LD to About or Contact page
- 3-5 questions targeting "frontend developer Bangladesh", "hire React developer"

### 3.3 Create .well-known/security.txt
- Add vulnerability reporting contact

### 3.4 Add Related Blog Posts to Case Studies
- Bidirectional linking between case studies and blog posts
- "Related articles" section on case study pages

### 3.5 Monitor and Iterate
- Submit sitemap to Google Search Console
- Monitor Core Web Vitals via CrUX
- Track keyword rankings for target terms
- Set up Google Search Console and GA4 for the www domain

---

## Phase 4: Monitoring & Iteration (Ongoing)

### 4.1 Set Up SEO Monitoring
- Google Search Console: monitor indexation, clicks, CTR
- GA4: track organic traffic, engagement metrics
- Set up alerts for crawl errors

### 4.2 Content Calendar
- Publish 1-2 blog posts per month
- Update existing posts quarterly
- Monitor SERP changes for target keywords

### 4.3 Performance Monitoring
- Monitor LCP, INP, CLS in field data
- Audit script loading strategy quarterly
- Review Vercel cache hit rates

### 4.4 Schema Maintenance
- Validate JSON-LD quarterly with Schema.org validator
- Add new schema types as content grows (FAQPage, HowTo)
- Monitor for rich result eligibility in GSC

---

## Priority Summary

| Priority | Item | Effort | Impact |
|----------|------|--------|--------|
| Critical | Fix title duplication | 15 min | All pages — better SERP appearance |
| Critical | Fix duplicate H1 on blog | 10 min | 3 pages — correct heading hierarchy |
| Critical | Add security headers | 15 min | Security + minor ranking signal |
| High | Create llms.txt | 10 min | AI search visibility |
| High | Add preconnect tags | 5 min | Performance — faster image/analytics loads |
| High | Expand blog posts | 3-5 hrs | Content depth — keyword ranking |
| High | Enrich contact page | 30 min | Content depth |
| High | Add H2 to blog listing | 15 min | Heading hierarchy |
| Medium | OG image dimensions | 5 min | Social sharing |
| Medium | BlogPosting image schema | 10 min | Rich results |
| Medium | Person schema image | 10 min | Entity recognition |
| Low | FAQPage schema | 1 hr | Rich results |
| Low | security.txt | 5 min | Trust signal |
| Low | Related posts on case studies | 1 hr | Internal linking |
