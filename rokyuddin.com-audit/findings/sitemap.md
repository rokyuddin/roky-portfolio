# Sitemap Findings

Site: rokyuddin.com (serves/308s to www.rokyuddin.com) · Date audited: 2026-08-25

## Structure & Validity

- Accessible and valid at both `https://www.rokyuddin.com/sitemap.xml` and `https://rokyuddin.com/sitemap.xml` (both return HTTP 200; the non-www host first issues a 308 to www, then serves the identical file).
- XML is well-formed. Declares the correct namespace `xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`. UTF-8 encoding is clean; no encoding errors.
- Total 10 `<url>` entries, all unique — no duplicate `<loc>`.
- Contains: `/` (home), `/blog`, 3 blog posts, `/case-studies`, 3 case studies, `/playground`.
- robots.txt (`https://www.rokyuddin.com/robots.txt`) correctly points `Sitemap: https://rokyuddin.com/sitemap.xml`. This URL resolves correctly (308 -> www -> 200). No robots misconfiguration in the sitemap path.
- Every sitemap URL resolves to HTTP 200 when followed (each 308-redirects non-www -> www, then serves 200). Verified individually for all 10 URLs.

## URL Issues (host mismatch, trailing slashes, duplicates)

**CRITICAL — www vs non-www host mismatch (canonical fork).**
- All 10 `<loc>` values use the NON-www host: `https://rokyuddin.com/...` (`SITE_URL` in `src/lib/site.ts` is `https://rokyuddin.com`).
- But the site physically serves on and 308-redirects every request to `https://www.rokyuddin.com/...`.
- Consequence: every sitemap `<loc>` URL is a redirect (308) rather than a final URL. Crawlers normally follow this; it's functional but suboptimal — for a small portfolio the final `loc` should point directly at the canonical (www) host.
- Worse, the on-page `<link rel="canonical">` (generated from the same `SITE_URL`) points BACK to non-www while the page actually renders on www. E.g. page physically at `https://www.rokyuddin.com/blog` declares `canonical: https://rokyuddin.com/blog`, which itself 308s back to www. This is a canonical↔redirect contradiction: the declared canonical is not the serving URL and loops back to it. Google is usually lenient here, but it fragments signals and risks the canonical being ignored on a strict re-crawl.
- Root cause is a single source-of-truth variable (`SITE_URL`) that is hardcoded to non-www while the hosting/edge redirects to www. Pick ONE host and make everything — sitemap, robots, canonical, OG, redirect — agree. Recommend standardizing on `https://www.rokyuddin.com` (or whichever is preferred) and setting `NEXT_PUBLIC_SITE_URL` at deploy time rather than hardcoding.

**Trailing slashes — consistent (all present).**
- All 10 URLs omit the trailing slash (`/blog`, not `/blog/`) — internally consistent. Good.
- `/blog/` with a trailing slash 308s to `/blog`, so no soft-404s or loops; consistent canonical.

**No duplicate URLs.** Unique loc across the file. Host uses are uniform (all non-www), only the pattern above applies.

## lastmod Accuracy

**CRITICAL — static/listing pages get a bogus "now" lastmod on every request.**
- The home (`/`), `/blog`, `/case-studies` and `/case-studies/*` (×3), and `/playground` entries all report the current request time. Verified by fetching twice ~9 minutes apart: the values changed from `2026-08-25T07:12:37.308Z` to `2026-08-25T07:21:19.065Z` for ALL six static entries, identical to the millisecond across entries.
- This is Next.js auto-filling `lastModified` with "now" for sitemap entries that don't set it (`src/app/sitemap.ts` only sets `lastModified` for blog posts). A lastmod equal to "now" on every crawl falsely signals constant change, causes unnecessary re-crawls, and provides no useful freshness signal.
- It also masks a data gap: the case-study entries were expected to read `caseStudy.updatedAt`, but every case study shows the fallback "now" — meaning `updatedAt` is undefined for all case studies in the data source. The `...(caseStudy.updatedAt ? { lastModified: ... } : {})` guard suppresses the field rather than surfacing missing data.

**Blog post lastmods — realistic.**
- The three blog posts carry genuine editorial dates: `2024-11-15`, `2024-11-10`, `2024-11-05` (from `post.updatedAt || post.date`). These are plausible and stable. No future dates, no drift.

**Recommendation:** For listing/static pages, either omit `lastmod` entirely (Next/Google then derives from Last-Modified) or provide a real `lastModified` (e.g. git/commit/deploy date). For case studies, populate `updatedAt` on the CMS records, or drop the field. Static pages should never report the live request time.

## Missing Pages

- **No page is truly "missing" relative to the actual routes** — the sitemap covers every real page route: `/`, `/blog`, `/blog/[slug]` (3), `/case-studies`, `/case-studies/[slug]` (3), `/playground`. Verified against both the route tree and the live internal-link crawl (blog index exposes exactly the same 3 posts; case-studies index exactly the same 3 studies).
- **`/about` and `/contact` are NOT missing routes** — they do not exist as separate pages. About and Contact are sections on the homepage (`#about`, `#contact` anchors in `src/features/landing/components/`). No change needed, but note these anchor targets aren't independently crawlable entry points.
- `/sanity` (`/sanity/[[...tool]]`) exists but is intentionally excluded (disallowed in robots.txt). Correct.
- Optional improvement (not a gap): consider adding `<image:image>` or `<xhtml:link>` enrichment if desired, and any future dedicated pages (a standalone About/Work page) should be added when created.

## Recommendations

1. **Resolve the host conflict (highest priority).** Choose a canonical host — given the edge serves and redirects to www, standardize on `https://www.rokyuddin.com`. Set `NEXT_PUBLIC_SITE_URL=https://www.rokyuddin.com` at deploy time (the code already supports the env override in `src/lib/site.ts`) so sitemap `loc`, robots `Sitemap`/`Host`, canonical, and OG URLs all become www, eliminating all 308 hops and the canonical↔redirect contradiction in one change.
2. **Stop emitting "now" lastmod for static pages.** Omit `lastModified` (or set an explicit stable value such as last deploy timestamp) for `/`, `/blog`, `/case-studies`, `/playground`; remove reliance on Next.js auto-fill so index pages don't scream "changed just now" on every crawl.
3. **Fix case-study lastmod data.** Populate `updatedAt` on the case-study records (Sanity/API), or drop the field entirely rather than letting Next fill "now". Blog post lastmods are fine — leave them.
4. **Keep trailing-slash + non-www→www redirects consistent** — already consistent; no action beyond the host change in #1, which removes the redirect from sitemap URLs entirely.
5. **Minor:** after #1, re-verify robots.txt `Sitemap`/`Host` and confirm the deployed sitemap via both Search Console and a fetch of `https://www.rokyuddin.com/sitemap.xml`.

## Priority

- **P0 (blocker, fix first):** www/non-www canonical host mismatch — sitemap `loc`s + page canonicals (non-www) contradict the served host (www). Fix once via `NEXT_PUBLIC_SITE_URL`, unblocking canonical clarity and removing 308 hops from every sitemap URL.
- **P1 (high):** Dynamic "now" lastmod on 6 static entries (incl. case studies where `updatedAt` is missing) — implement #2 and #3.
- **P2 (low / hygiene):** trailing-slash and robots sitemap-path consistency — confirmed correct, no action needed; optional tag enrichment.

---

## Summary

The sitemap itself is structurally valid and fully discoverable: it parses cleanly, uses the correct schema namespace, contains 10 unique, non-duplicate URLs with internally consistent trailing-slash handling, matches every real page route (nothing missing — the blog and case-study indexes are fully covered), and all 10 URLs resolve to 200 (each via a 308 non-www→www redirect, and robots.txt's non-www sitemap pointer resolves correctly too). The two serious problems are canonical-architecture and freshness-related rather than crawlability-related. First, there is a host conflict: the sitemap and on-page canonicals are hardcoded to non-www `rokyuddin.com` while the site redirects to and serves on `www.rokyuddin.com`, so every sitemap URL is a redirect and the declared canonical points back at a URL that itself 308s to the serving host — a fixable by routing all host references through `NEXT_PUBLIC_SITE_URL` set to the www canonical at deploy time. Second, the six static/listing pages (and all case studies, whose `updatedAt` is missing) report a lastmod equal to the live request timestamp, which changes on every fetch and falsely signals perpetual freshness, whereas the three blog posts carry correct, stable 2024 lastmods. Priorities: P0 the host-mismatch fix, P1 stop emitting "now" lastmods / backfill case-study `updatedAt`, P2 optional hygiene. No crawl-blocking issues in robots.txt or the sitemap path.
