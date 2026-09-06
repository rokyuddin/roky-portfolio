# ADR 0002: SEO Strategy — Personal Portfolio

- **Status:** Proposed
- **Date:** 2026-09-06
- **Related:** ADR 0001 (www canonical host), `rokyuddin-audit/` artifacts

## Context

An SEO audit of `rokyuddin.com` produced a "68/100" report (`rokyuddin-audit/`). A follow-up reconciliation against the actual codebase and 2025–2026 SEO best practices revealed that several audit findings were **false negatives** caused by fetching rendered pages (which strips `<head>` output):

| Audit claimed missing | Actually implemented |
|-----------------------|----------------------|
| Canonical tags | `socialMetadata()` in `src/lib/site.ts` sets `alternates.canonical` on every page |
| JSON-LD structured data | `src/lib/schema.ts` emits Person, WebSite, BlogPosting, Article, BreadcrumbList, FAQPage, rendered in `src/app/layout.tsx` |
| OG/Twitter images | `twitter-image.tsx` / `opengraph-image.tsx` generate dynamic 1200×630 cards |
| Testimonials | Sanity testimonial schema + `Testimonials` section exist (auto-hide when empty) |

The real health score is therefore meaningfully higher than 68; the audit is directionally useful but must be reconciled against verified reality.

### Objectives (balanced)

1. **Hiring & leads now** — recruiters, hiring managers, freelance clients find and convert.
2. **Topical authority over time** — rank for frontend topics (React, Next.js, TypeScript).
3. **AI search / GEO** — be citable by ChatGPT, Perplexity, Google AI Overviews.

## Decisions

### D1 — Treat the audit as "true gaps only"
Only findings that are verified real gaps are in scope. Items already correctly implemented (canonical tags, basic JSON-LD, non-www redirect, dynamic OG) are **not** re-done.

### D2 — Structured data (Recommended schema set)
- **Add `ProfilePage`** wrapping `personJsonLd` on `/about` — the structured-data feature Google still actively documents for personal sites.
- **Fix `BlogPosting` / `Article`** so `datePublished` is always emitted (case studies currently only emit optional `dateModified`).
- **Add `Organization`** alongside Person to strengthen the entity graph.
- **Keep FAQPage.** Visually deprecated as a rich result (May 2026) but Google still uses it for page understanding and it correlates with ~3.2× AI Overview presence.
- Existing Person/WebSite/BreadcrumbList/CollectionPage stay as-is.

### D3 — Blog content strategy
Four content types, in priority order:
1. **Refresh existing 3 articles** — remove stale "2024" references, deepen with real project examples (AltSEO, Rydr, Skinsight, Soft24), refresh dates.
2. **Real-project case posts** — tie to verifiable outcomes (strongest first-hand Experience/E-E-A-T signal).
3. **Tutorials with code** — e.g. Stripe in Next.js App Router, rendering patterns in Next.js 16.
4. **Opinion pieces** (1 per quarter) — non-commodity takes AI can't summarize away.

Cadence: **1 deep article per quarter + supporting case study** over mass shallow publishing. Interlink case studies ↔ blog posts (entity graph + topical authority).

### D4 — Per-post dynamic OG images
Generate per-post `/opengraph-image.tsx`-style cards showing article/project titles (via file-convention route, reuse current Satori `ImageResponse`). Current shared card remains the fallback. Per-page cards lift CTR on shared links (~40% per Twitter research).

### D5 — LLM / GEO files
- Enhance existing `llms.txt` with blog summaries + case-study highlights.
- Add **`llms-full.txt`** per the [llmstxt.org](https://llmstxt.org/) spec.
- Include only active public pages in both generated documents.

### D6 — Explicitly NOT in scope
- Canonical tags / redirects (already correct; verified only)
- Basic JSON-LD (already correct; only upgrades per D2)
- Retrospective audit artifact cleanup.
- robots.txt `Host:` directive (left as-is)
- New SEO libraries (hand-rolled Next metadata + schema.ts is sufficient)

### D7 — Verification standard
For any implementation: `npx tsc --noEmit` + `pnpm test`, then live verification of `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`, and JSON-LD in rendered blog/case-study HTML.

## Consequences

- Structured data: richer entity association and the currently-supported ProfilePage feature; no risk from keeping FAQPage.
- Content: higher E-E-A-T/Experience signals; better topical clusters; more first-hand evidence AI systems can cite.
- OG: better social CTR; slightly more build/route surface.
- GEO: better agent discovery without chasing ranking hacks (Google guidance: no special AI optimization needed).
- Ongoing cost: content cadence (1 deep post/quarter) is the main recurring investment.

## References
- Google Search Central: structured data (ProfilePage), AI optimization guide (May 2026), core web vitals
- llmstxt.org spec
- Next.js docs: `generate-metadata`, `ImageResponse` / `opengraph-image`