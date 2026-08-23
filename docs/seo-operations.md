# SEO Content & Measurement Operations

A simple monthly operating loop for publishing useful portfolio content and evaluating organic-search progress. No ranking or traffic guarantees here — just a repeatable process so changes can be judged over real data.

## Audiences and intent

Every published piece should serve at least one of these readers:

- **Recruiters/hiring managers** evaluating Md Rokyuddin for remote frontend roles.
- **Prospective clients** evaluating him for frontend project work.

Write for a question they actually have. Do not keyword-stuff, do not claim outcomes that are not demonstrated in published case studies, and do not create city/country-targeted pages — the positioning is global and remote.

## Monthly cadence

Publish **one substantial piece per month** from Sanity (embedded Studio at `/sanity`). Alternate between:

1. **A case study** (`_type: "caseStudy"`) when project work can be shown truthfully: role, challenge, solution, tech decisions, results.
2. **An article** (`_type: "post"`) on one of the recurring themes below.

### Content themes

- React / Next.js engineering decisions (rendering strategy, caching, data fetching)
- TypeScript & frontend architecture (patterns, module boundaries, strictness trade-offs)
- Performance & accessibility work (Core Web Vitals, rendering behavior, a11y wins)
- Delivery lessons (scoping, collaboration, shipping under constraints)
- Project outcomes (told through case studies where the data exists)

## Pre-publish checklist

Complete all of this inside Sanity before hitting Publish:

- [ ] Title states the topic plainly; slug is short, lowercase, hyphenated.
- [ ] Excerpt/description is 1–2 sentences a reader would actually click on.
- [ ] Headings follow a logical order (one H1 is rendered by the page template; start content at H2).
- [ ] Claims are accurate and supported by shipped work; no invented metrics.
- [ ] At least one genuinely relevant internal link (a related case study, the portfolio contact section) — skip it if nothing is truly relevant.
- [ ] Images have alt text; cover image chosen where available.
- [ ] Tags reflect the real topics; author and date are correct.
- [ ] Preview renders correctly (`pnpm dev`) before publishing.

## After each publish

1. Confirm the affected routes refreshed: Sanity publishes trigger the revalidation webhook (`POST /api/revalidate`, signed with `SANITY_REVALIDATE_SECRET`), which invalidates cache tags such as `posts`, `post-${slug}`, `case-studies`, and `case-study-${slug}`.
2. Spot-check the live page's title/description and JSON-LD with the [Schema Markup Validator](https://validator.schema.org/) or Google's [Rich Results Test](https://search.google.com/test/rich-results).
3. In Google Search Console, use **URL Inspection → Request Indexing** for the new URL.
4. If a new section/route type was added, confirm `/sitemap.xml` includes it and `/robots.txt` still blocks `/sanity`.

## Search Console setup (one-time)

- Verify ownership of the production domain (DNS token recommended). Set the verification token via the optional `GOOGLE_SITE_VERIFICATION` environment variable at deploy time — never commit secret values.
- Submit `https://<production-domain>/sitemap.xml` under **Sitemaps**.
- The site URL itself is controlled by `NEXT_PUBLIC_SITE_URL`; keep it pointed at the canonical production domain.

## Monthly measurement review (~20 minutes)

In Google Search Console (Performance report), record in your notes:

- Total impressions and average position trend
- Top queries driving impressions — do they match intended frontend topics?
- Indexed-pages count (Pages report) — unexpected drops deserve investigation
- Click-through rate on the queries you care about — weak CTR usually means the title/excerpt promise doesn't match the query

Pair this with your own conversion signal: organic contacts (email/calls mentioning how they found you). If analytics is configured (`GOOGLE_ANALYTICS_ID` environment variable), review landing-page sessions for organic traffic as context — Search Console remains the source of truth for search behavior.

Judge progress over quarters, not weeks. If a theme repeatedly earns impressions but weak clicks, improve titles/excerpts rather than adding new pages.

## Where things live

| What | Where |
| --- | --- |
| Content source of truth | Sanity (Studio embedded at `/sanity`) |
| Metadata/social/JSON-LD builders | `src/lib/site.ts`, `src/lib/schema.ts` (+ tests alongside) |
| Sitemap / robots | `src/app/sitemap.ts`, `src/app/robots.ts` |
| Cache/revalidation | `next.config.ts`, `src/app/api/revalidate/route.ts` |
| Verification commands | `pnpm lint && npx tsc --noEmit && pnpm test && pnpm build` |
