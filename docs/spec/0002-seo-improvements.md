# Spec: SEO Improvements — rokyuddin.com (Freshness, Entities, AI Discovery)

- **Status:** Ready for agent
- **Date:** 2026-09-06
- **Related ADRs:** `docs/adr/0002-seo-strategy.md` (decisions). Note: the non-www → www canonical-host decision referenced in earlier conversation has no ADR file on disk; that behavior is already correctly implemented and is out of scope (verified, not re-done).
- **Glossary:** `docs/seo-glossary.md`
- **Prior audit:** `rokyuddin-audit/` (reconciled — see Problem Statement)

## Problem Statement

An SEO audit of rokyuddin.com returned a 68/100 health score, but several of its headline findings (missing canonical tags, missing JSON-LD, missing OG images, missing testimonials) are **false negatives** — the audit crawled rendered pages, which strip `<head>` output. Those capabilities already exist in the codebase.

After reconciliation against the real codebase and 2025–2026 best practices, the *actual* remaining gaps are narrower and more precise:

1. **Structured data is incomplete at the entity level.** Person, WebSite, BlogPosting, Article, BreadcrumbList, and FAQPage all exist, but there is no `ProfilePage` (the one personal-site schema Google still actively documents), no `Organization` entity in the graph, and the case-study `Article` markup never emits `datePublished` (only optional `dateModified`).
2. **Blog content is thin and stale.** Three articles from Nov 2024 with "2024" in titles. They are ~500–800-word generic advice, below the depth needed to demonstrate the author's first-hand Experience — the primary E-E-A-T differentiator for personal brands in 2026.
3. **OG images are one-size-fits-all.** One shared dynamic card; no per-post/per-project cards showing titles.
4. **AI-search files are incomplete.** `llms.txt` exists but omits blog/case-study summaries, there is no `llms-full.txt`, and the route's content is hand-written rather than derived from the same data sources as the site.

The balanced objective (agreed): **hiring/leads now, topical authority over time, and AI-search discoverability.**

## Solution

A small, well-seamed improvement set — no new SEO libraries, no re-doing implemented work:

- **Entity-grade structured data**: add a `ProfilePage` (wrapping the existing `Person` via `@id` reference) to `/about`; add an `Organization` reference to the entity graph; make the case-study `Article` always emit `datePublished`. Keep FAQPage (rich-result deprecated May 2026, but Google still uses it for understanding and it correlates with AI-Overview presence).
- **Blog content direction** (strategy artifact only — not authoring in this spec): refresh the existing 3 posts; publish real-project case posts, tutorials with code, and quarterly opinion pieces; interlink case studies ↔ blog posts; cadence of 1 deep post per quarter.
- **Per-post OG/Twitter cards** for blog and case-study detail pages, reusing the existing Satori `ImageResponse` route pattern, falling back to the current shared card.
- **AI-discovery files**: refactor llms-txt generation into a pure, tested module; enrich `llms.txt` with blog + case-study summaries; add `llms-full.txt` per llmstxt.org.

## User Stories

1. As a search engine, I want valid `ProfilePage` markup on the /about page, so that I can associate the site with the real person and surface profile/author information.
2. As a search engine, I want an `Organization` entity referenced from the person graph, so that employer/work relationships are recognized.
3. As a search engine, I want case studies to always carry a `datePublished`, so that I can display accurate dates and treat them as fresh content.
4. As a search engine, I want `dateModified` to still fall back to `datePublished`, so that freshness metadata is never missing.
5. As a hiring manager landing on /about, I want the markup to clearly identify who owns the site, so that I trust the author and contact them.
6. As a social sharer of a blog post, I want the link card to show that post's title, so that my network clicks through.
7. As a social sharer of a case study, I want the link card to show the project title, so that the project is recognizable before clicking.
8. As an author, I want one shared OG fallback card, so that any page without a custom card still gets a branded preview.
9. As an LLM crawler (ChatGPT, Perplexity, Claude), I want `llms.txt` with accurate blog and case-study summaries, so that I cite the site correctly.
10. As an LLM crawler, I want an `llms-full.txt` with more complete summaries, so that I can represent the site deeply.
11. As a developer, I want the llms-txt content generated from the same source data as the site, so that it never drifts from what the site actually says.
12. As an SEO-optimized site owner, I want stale "2024" titles refreshed and the posts deepened with real project examples, so that content reflects current expertise.
13. As an SEO-optimized site owner, I want case studies and blog posts interlinked, so that topical authority and the entity knowledge graph grow.
14. As an SEO-optimized site owner, I want FAQPage retained, so that the page understanding and AI-Overview relevance benefits are kept.
15. As a developer, I want every new JSON-LD builder covered by a unit test, so that markup regressions are caught.
16. As a developer, I want the llms-txt builders covered by a unit test, so that text-route output is verified without a server harness.
17. As a developer, I want `npx tsc --noEmit`, `pnpm test`, and a live verify (curl), so that changes are proven before deploy.

## Implementation Decisions

### D1 — Modules to build/modify

- **Modify the JSON-LD builders** (the existing single seam for structured data):
  - Add `profilePageJsonLd()` returning a `ProfilePage` whose `mainEntity` is `{ "@id": SITE_URL + "/#person" }` (or the full Person object reference). It is a **decision, from the current architecture**, to reference by `@id` rather than embed a duplicate Person.
  - Add an `Organization` referenced from Person via `worksFor`, to strengthen the entity graph.
  - Fix `articleJsonLd()` to **always emit `datePublished`**, with `dateModified` still falling back to `datePublished` when no `updatedAt` is present (matching the existing `blogPostingJsonLd` behavior).
- **Render ProfilePage** on the /about page alongside the existing Breadcrumb and FAQPage scripts.
- **Modify the case-study data layer** so `Article` can emit `datePublished`: add a `publishedDate` (or `date`) field to the `CaseStudy` type, sourced from Sanity's `_createdAt` in the case-study transform, mapped through the GROQ-returned object. This is a **decision from the prototype**: `updatedAt` already maps from `_updatedAt`; `publishedDate` maps from `_createdAt`, so no new Sanity schema field or CMS migration is required.
- **New module `src/lib/llms.ts`** (the one new seam): pure builders `buildLlmsTxt(...)` and `buildLlmsFullTxt(...)` accepting the same data the site already fetches (site identity, blog posts, case studies) and returning `string`. Content must include People, Key pages, Blog summaries, Case-study highlights, Contact, and Technology sections; any URLs must be absolute.
- **Modify the llms.txt route** to consume the builders and also serve `llms-full.txt` (a second GET route), retaining the existing `Cache-Control` headers.
- **Add per-post OG/Twitter cards**: file-convention image-metadata entries for blog and case-study detail pages, reusing the existing `ImageResponse` pattern (1200×630, title rendered). When a route lacks custom metadata files, existing shared cards remain the fallback automatically.

### D2 — Keep it hand-rolled

No new SEO dependencies (`next-seo`, `sitemap` package, etc.). Next.js metadata exports + `src/lib/schema.ts` remain the mechanism, consistent with the existing repo.

### D3 — Content strategy artifact (not authoring)

The blog direction (refresh 3, case posts, tutorials, opinion pieces, interlink, cadence) is captured as **planning content** in the related ADR/glossary — this spec's code work is the scaffolding. Actual article authoring is out of scope for this spec.

### D4 — Verification standard

For any implementation: `npx tsc --noEmit` + `pnpm test`, then live verification of `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`, and JSON-LD in rendered blog/case-study HTML (via dev server + curl).

## Testing Decisions

- **Good test principle**: test external behavior — the JSON-LD objects and llms-txt strings a consumer (Google, an LLM crawler) would receive — not implementation internals. No browser/component tests (repo has no such infra; live verify covers rendered output).
- **Tested modules:**
  - `src/lib/schema.test.ts` (existing seam, extended): `profilePageJsonLd` emits `@type: "ProfilePage"` with `mainEntity` referencing `#person`; Organization is referenced from Person (`worksFor`); `articleJsonLd` **always** includes `datePublished` even when only `updatedAt` exists, and `dateModified` falls back to `datePublished` when `updatedAt` is absent.
  - New `src/lib/llms.test.ts`: `buildLlmsTxt`/`buildLlmsFullTxt` include mandatory sections (People, Key pages, Blog, Case Studies, Contact, Technology); contain only absolute URLs; `llms-full` is strictly longer or as complete as `llms`; no raw `<` characters that could break consumers.
- **Prior art**: the existing `src/lib/schema.test.ts` / `src/lib/site.test.ts` pattern — `node:test` + `assert`, `describe`/`it`, run via `pnpm test` (tsx loader). New tests follow exactly that.

## Out of Scope

- Canonical tags, basic JSON-LD, non-www redirect, robots `Host:` directive — already correctly implemented (verified, not re-done).
- Retrospective audit artifact cleanup.
- FAQPage removal — explicitly retained (see D2 in `docs/adr/0002-seo-strategy.md`).
- Actual blog article authoring and Sanity content migrations (content strategy only).
- Performance/CWV work (LCP/INP/CLS are green-leaning; audit noted Framer Motion bundle as low priority — deferred).
- New SEO libraries.

## Further Notes

- The audit's visual-metrics claims were unverifiable (PageSpeed quota exhausted during audit); verification is covered by the agreed live-verify standard instead.
- 2026 context encoded in the ADR: CWV thresholds unchanged (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1, 75th percentile); FAQ rich results deprecated May 2026 but markup retained for understanding/AI-Overview relevance; llms.txt is optional for Google but useful for other AI agents; Google's official AI-optimization guidance says no special schema/rewrites are needed.
- Issue-tracker publishing: this spec is written locally under `docs/spec/` because no tracker/triage-label config was available in the environment. To publish as a tracked issue with the `ready-for-agent` label, run `/setup-matt-pocock-skills` once.