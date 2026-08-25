# Technical SEO Findings

Audit target: https://rokyuddin.com (served at https://www.rokyuddin.com; non-www 308-redirects to www)
Date: 2026-08-25
Method: Live curl of www + non-www hosts (headers, redirect chains, robots.txt, sitemap.xml) + inspection of 10 crawled HTML files at `rokyuddin.com-audit/crawl/*.html`.

## Crawlability & Indexability

- All 10 sitemap URLs are reachable and return HTTP 200 on the serving host (`www.rokyuddin.com`). No 404/5xx, no dead pages.
- No `X-Robots-Tag: noindex` header on any main page (homepage, blog, blog posts, case-studies, playground checked).
- No `<meta name="robots" content="noindex">` on any of the 10 crawable pages.
- The Sanity CMS route `/sanity` returns HTTP 200 but carries `<meta name="robots" content="noindex">` — correctly paired with the `Disallow: /sanity` robots rule. Good: no content leak.
- Trailing-slash normalization is handled: `/blog/` and `/playground/` 308-redirect to `/blog` and `/playground` (no trailing slash). No duplicate-URL issue from slash variants on www.
- Mobile: `<meta name="viewport" content="width=device-width, initial-scale=1"/>` present on all 10 pages; `<html lang="en">` correct. Site is responsive.
- Single language, no `hreflang` (correct — not needed for a single-locale personal site).
- XML sitemap (`/sitemap.xml`) is valid: `<?xml version="1.0"?>` + `<urlset xmlns=...>` namespace + exactly 10 `<loc>` entries, all 200 after redirect.
- **Duplicate-content risk:** Non-www and www both serve identical content (non-www via 308). This is managed by the redirect, but the conflicting canonical below undermines the consolidation.

## Canonical/URL Standardization (CRITICAL)

**Root cause — host mismatch between declared canonical URL and actual serving host.**

Config in `src/lib/site.ts`:
```ts
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://rokyuddin.com"
).replace(/\/+$/, "");
```
`SITE_URL` defaults to the **non-www** host (`https://rokyuddin.com`) and drives every canonical channel:
- `<link rel="canonical">` via `alternates.canonical` (all 10 pages declare non-www)
- OpenGraph `og:url`, `og:locale="en_US"`, `og:type`
- Twitter card
- `metadataBase` (Next.js)
- `robots.txt` `Host:` directive + `Sitemap:` directive
- `sitemap.xml` `<loc>` (all 10 entries non-www)
- Schema.org `@id` / `url` fields (Person, WebSite, breadcrumbs, BlogPosting, CaseStudy)

**But the live serving host is `www.rokyuddin.com`.** Verified:
- `https://rokyuddin.com/` → HTTP 308 → `location: https://www.rokyuddin.com/`
- Every non-www page path 308-redirects to the identical www path (e.g. `/blog` → www `/blog`, `/case-studies/altseo` → www `...`, `/playground` → www `...`).
- The redirect is configured at the platform/DNS layer (not in `next.config.ts` or `vercel.json` — neither file contains a www redirect rule), i.e. Vercel project settings or Cloudflare.

**Consequence:** Every canonical, sitemap `<loc>`, OG URL, robots `Host:`, and schema URL points at a URL that 308-redirects to the www host. Search engines following the canonical from a www-served page will hit `https://rokyuddin.com/...`, receive a 308, and re-resolve to `https://www.rokyuddin.com/...` — creating an extra redirect hop, contradicting the self-declared canonical, and weakening the consolidated ranking host. This is a self-conflicting canonical/redirect setup.

**Recommended fixes (choose ONE target host; www is recommended since it already physically serves traffic):**

1. **Preferred — canonicalize everything to `www` (recommended):** Set `NEXT_PUBLIC_SITE_URL=https://www.rokyuddin.com` at deploy time (or change the default in `src/lib/site.ts` to `"https://www.rokyuddin.com"`). Keep the existing non-www → www 308 redirect. All canonicals, sitemap `<loc>`, robots `Host:`, and schema URLs then point at the actual serving host. Optionally also add a `www → non-www` redirect for the opposite, but do not adopt both canonicals.
2. **Alternative — serve on non-www:** Remove/disable the non-www → www 308 (make `rokyuddin.com` serve directly) and keep `SITE_URL=https://rokyuddin.com`. Add a `www → non-www` 301 instead.

Do NOT leave it in the current state where canonicals declare non-www but content only fully serves on www. After changing the host, resubmit the sitemap in Google Search Console and confirm GSC ownership for the canonical host.

## Security

- **HSTS:** Present on both hosts — `strict-transport-security: max-age=63072000` (2 years). However it lacks `includeSubDomains` and `preload` directives.
- **Missing headers (none of the following are set):**
  - `Content-Security-Policy` — no CSP on any page.
  - `X-Content-Type-Options: nosniff` — absent.
  - `Referrer-Policy` — absent.
  - `X-Frame-Options` / `frame-ancestors` — absent (site is a portfolio; would benefit from clickjacking protection).
  - `Permissions-Policy` — absent.
- **HTTPS enforcement:** Correct. `http://www.rokyuddin.com/` → HTTP 308 → `https://www.rokyuddin.com/`; `http://rokyuddin.com/` → 308 → `https://rokyuddin.com/` (then → www). HTTP→HTTPS forced.
- Transport is via Cloudflare edge; `HTTP/2` and `HTTP/3` (`alt-svc: h3=":443"`) available. `server: cloudflare`.
- No notable security-header leakage; site is a static portfolio served over HTTPS only.

## Mobile

- Responsive viewport meta on all pages; single-column mobile layout; `<meta name="viewport" ... initial-scale=1>`.
- No separate mobile host (no `m.` duplication) — good.
- (Note: actual Core Web Vitals / CrUX field data are out of scope for this technical crawl; RUM/CWV belong to the performance sub-audit.)

## Recommendations (priority order)

- **CRITICAL — Resolve the www/non-www canonical conflict.** Standardize on `www.rokyuddin.com` as the canonical host: set `NEXT_PUBLIC_SITE_URL=https://www.rokyuddin.com` (or change the default in `src/lib/site.ts`), keep the non-www → www 308, resubmit the sitemap in GSC, and confirm GSC property ownership for `www.rokyuddin.com`. This fixes canonicals, OG URLs, sitemap `<loc>`, robots `Host:`, and schema URLs all at once. Root cause file: `src/lib/site.ts`.
- **HIGH — Fix the broken default social image URL.** `DEFAULT_SOCIAL_IMAGE = "/twitter-image.jpg"` in `src/lib/site.ts` points to a URL that returns HTTP 404 (`https://www.rokyuddin.com/twitter-image.jpg` → 404; full chain `https://rokyuddin.com/twitter-image.jpg` → 404). The real dynamic route is `/twitter-image` (HTTP 200, `image/png`). Affects 6 pages that rely on the default (blog index, 3 blog posts, case-studies index, playground) — their `og:image`/`twitter:image` will fail when fetched by social/link-preview scrapers. Change to `/twitter-image` (no extension) or the static asset path that actually exists.
- **MEDIUM — Add missing security headers.** Implement `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and `Permissions-Policy` (e.g. via `next.config.ts` headers or Cloudflare). Also strengthen HSTS with `includeSubDomains` and `preload` if the www-only host is finalized.
- **LOW — No other crawlability issues found.** All pages indexable, sitemap valid, /sanity correctly noindexed, no dead links within the crawled set. Trailing-slash normalization already correct.
