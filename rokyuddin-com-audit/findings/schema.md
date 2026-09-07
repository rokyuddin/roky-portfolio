# Schema & Structured Data Findings — rokyuddin.com

**Score: 85/100**

## What Works
- Person schema on all pages (name, jobTitle, email, address, knowsAbout, sameAs)
- WebSite schema on all pages
- BreadcrumbList schema on all subpages (correct hierarchy)
- BlogPosting schema (datePublished, dateModified, author, publisher, keywords)
- CollectionPage schema with ItemList on blog and case studies listing pages
- Article schema on case study detail pages
- Correct @context, @type, @id usage throughout
- Entity linking via @id references

## Findings

### F15: Person Schema Missing Fields — Low
**Evidence:** Missing `image`, `worksFor`, `alumniOf`, `award`.
**Fix:** Add `image` (profile photo from Sanity) and `worksFor` (current employer).

### F16: BlogPosting Missing image Field — Low
**Evidence:** No `image` in BlogPosting schema. Google recommends it for Article rich results.
**Fix:** Add `image` pointing to post cover image or default.

### F17: No FAQPage Schema — Low
**Fix:** Add FAQPage JSON-LD to About/Contact page.

### F18: WebSite Schema Missing SearchAction — Low
**Evidence:** No `potentialAction` for Sitelinks Search Box.
**Fix:** Add SearchAction if site gets search functionality.
