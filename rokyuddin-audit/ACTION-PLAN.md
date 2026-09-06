# SEO Action Plan — rokyuddin.com

**Priority:** Critical > High > Medium > Low
**Generated:** September 6, 2026

---

## Phase 1: Critical Fixes (Week 1)

### 1. Add JSON-LD Structured Data
- **What:** Add `Person` schema to homepage, `BlogPosting` to blog articles, `CreativeWork` to case studies
- **Why:** Zero structured data means no rich results in Google. Competitors with schemas get featured snippets and knowledge panels.
- **How:** Add JSON-LD `<script type="application/ld+json">` blocks to each page layout component.

### 2. Fix Canonical Tags
- **What:** Add `<link rel="canonical" href="https://www.rokyuddin.com/...">` to every page
- **Why:** Without canonical tags, `rokyuddin.com` and `www.rokyuddin.com` may be treated as duplicate content, diluting ranking signals.
- **How:** Add in `src/app/layout.tsx` or per-page metadata exports.

### 3. Set Up Non-www to www Redirect
- **What:** Ensure `rokyuddin.com` → `www.rokyuddin.com` (301 redirect)
- **Why:** Combined with canonical tags, this eliminates any duplicate content issues.
- **How:** Configure in Vercel project settings or `next.config.ts` redirects.

---

## Phase 2: High-Impact Improvements (Weeks 2-3)

### 4. Update Blog Content
- **What:** Remove "2024" from article titles, update content to reflect current practices (2026)
- **Why:** Stale dates signal outdated content. Google favors fresh, relevant content.
- **How:** Update title metadata and article body text.

### 5. Expand Blog to 10+ Articles
- **What:** Publish 7-8 new articles targeting long-tail keywords
- **Target topics:**
  - "Building a SaaS with Next.js 16 and Supabase"
  - "Stripe Integration in Next.js: Complete Guide"
  - "Google Maps API for Ride-Sharing Apps"
  - "Tailwind CSS 4 Migration: What Changed"
  - "Zustand vs Redux in 2026: When to Use Which"
  - "Building Accessible Forms with React and TypeScript"
  - "Real-Time Features with WebSockets in Next.js"
- **Why:** 3 articles is critically thin. 10+ articles build topical authority.

### 6. Improve Blog Article Depth
- **What:** Rewrite existing 3 articles with project-specific examples and deeper analysis
- **Why:** Current articles are generic and ~500-800 words. Deep, specific content ranks better and earns backlinks.
- **How:** Use real code from AltSEO, Skinsight, Rydr as examples. Aim for 1500-3000 words per article.

### 7. Add Open Graph & Twitter Card Meta Tags
- **What:** Ensure every page has complete OG and Twitter meta tags with custom images
- **Why:** Social sharing is a major backlink and traffic source for portfolio sites.
- **How:** Use Next.js `metadata` exports with `openGraph` and `twitter` objects.

---

## Phase 3: Content & Authority (Month 2)

### 8. Add Client Testimonials
- **What:** Add 2-3 testimonials from real clients/team members on the homepage
- **Why:** Social proof is the strongest trust signal for hiring managers. The Sanity schema already supports testimonials.
- **How:** Fetch from Sanity and display in a dedicated section.

### 9. Improve Image Alt Text
- **What:** Replace category labels with descriptive alt text on all case study images
- **Why:** Better accessibility (WCAG compliance) and image search rankings.
- **How:** Update Sanity image metadata or override in the rendering components.

### 10. Create Custom OG Images
- **What:** Design page-specific social preview images
- **Why:** Compelling preview images increase click-through rates on social shares and search results.
- **How:** Use `next/og` or static image generation.

### 11. Add Breadcrumb Navigation
- **What:** Add breadcrumbs to case studies and blog posts with `BreadcrumbList` schema
- **Why:** Improves navigation UX and enables breadcrumb rich results in Google.
- **How:** Add breadcrumb component + JSON-LD schema.

### 12. Enhance Contact Page
- **What:** Add availability status, timezone info, response time, and a simple form
- **Why:** Thin contact pages have high bounce rates and low conversion.
- **How:** Add form component + availability indicator.

---

## Phase 4: Monitoring & Iteration (Ongoing)

### 13. Publish Consistently
- **What:** Publish 1-2 blog articles per month
- **Why:** Consistent publishing signals an active, authoritative site.
- **How:** Content calendar targeting frontend development topics.

### 14. Create `llms-full.txt`
- **What:** Extended AI-readable document with full project descriptions and blog summaries
- **Why:** Better AI search citations and brand mentions.
- **How:** Add to public directory alongside existing `llms.txt`.

### 15. Build Topical Clusters
- **What:** Create tag/category pages for blog topics (React, Next.js, TypeScript, etc.)
- **Why:** Topical authority signals help Google understand your expertise areas.
- **How:** Add dynamic route pages and internal linking between related articles.

### 16. Monitor Search Performance
- **What:** Set up Google Search Console and track keyword rankings
- **Why:** You can't improve what you don't measure.
- **How:** Verify site in GSC, submit sitemap, monitor impressions and clicks.

---

## Estimated Impact

| Action | Difficulty | Impact |
|--------|-----------|--------|
| Add JSON-LD schemas | Low | High |
| Fix canonical tags | Low | High |
| Set up redirects | Low | Medium |
| Update blog titles | Low | Medium |
| Expand blog content | High | Very High |
| Add OG images | Medium | Medium |
| Add testimonials | Low | High |
| Fix alt text | Low | Medium |

**Projected Score After Fixes:** 82-88/100 (up from 68/100)
