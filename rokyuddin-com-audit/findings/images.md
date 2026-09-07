# Image Findings — rokyuddin.com

**Score: 90/100**

## What Works
- All 13 images on homepage have alt text
- All images on case study pages have alt text
- Next.js Image component used for Sanity images (with width/height/optimization)
- Only `cdn.sanity.io` whitelisted in `next.config.ts` (good security)
- OG image has proper dimensions on homepage (1200x630)
- Image alt text is descriptive (e.g., "AltSEO preview")

## Findings

### F22: OG Image Missing Dimensions on Subpages — Low
**Evidence:** OG image on About, Contact, Blog, Case Studies pages uses `/twitter-image` without width/height. Only homepage OG image has explicit dimensions.
**Impact:** Some social platforms may not render preview card correctly.
**Fix:** Add `width: 1200, height: 630` to image object in `src/lib/site.ts` `socialMetadata()`:
```ts
images: [{ url: image.url, width: 1200, height: 630, ...(image.alt ? { alt: image.alt } : {}) }]
```
