# On-Page SEO Findings — rokyuddin.com

**Score: 68/100**

## What Works
- Single H1 on most pages (homepage, about, contact, case studies)
- Meta descriptions present and unique on all 11 pages
- Canonical tags correctly set on all pages
- `robots: index, follow` on all indexable pages
- Viewport tag and charset correct
- Clean heading hierarchy on homepage (1 H1 → 4 H2 → 7 H3)
- 17 internal links on homepage
- Anchor text is descriptive (not "click here")

## Findings

### F11: Title Tag Duplication on ALL Pages — Critical
**Evidence:** Every page title has site name twice:
- Homepage: `Md Rokyuddin | Frontend Developer | Md Rokyuddin`
- About: `About | Md Rokyuddin | Md Rokyuddin`
- Blog post: `Modern Web Design Trends Shaping 2024 | Md Rokyuddin | Md Rokyuddin`

**Root cause:** `layout.tsx:38` template `'%s | ${SITE_NAME}'` + per-page titles that already include `| ${SITE_NAME}`.

**Fix:** Remove `| ${SITE_NAME}` from per-page title strings:
- `src/app/(landing)/page.tsx:21`
- `src/app/about/page.tsx:9`
- `src/app/contact/page.tsx`
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx:38`
- `src/app/case-studies/page.tsx`
- `src/app/case-studies/[slug]/page.tsx:34-35`

### F12: Duplicate H1 Tags on All Blog Posts — High
**Evidence:** All 3 blog posts have 2 identical `<h1>` tags.
**Root cause:** `blog-header.tsx:60` renders `<h1>` and `blog-content.tsx:24` converts `# ` to `<h1>`.
**Fix:** Change `# ` rendering in `blog-content.tsx:24` from `<h1>` to `<h2>`.

### F13: OG Images Not Unique — Medium
**Evidence:** Most pages use generic `/twitter-image`. Only homepage and case studies with covers have unique images.
**Fix:** Generate unique OG images per blog post or use cover images.
