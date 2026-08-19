# SEO Audit: rokyuddin.vercel.app

**Date:** 2026-08-19 | **Target:** `https://rokyuddin.vercel.app`
**Method:** Live PageSpeed Insights (mobile) + source-level analysis of the Next.js repo.
**Note:** Sandbox DNS blocked raw crawling; audit combines live PSI field data with static source review. CrUX field data unavailable (no traffic / API restricted).

## SEO Health Score: 84/100

| Category | Score | Weight |
|---|---|---|
| Technical SEO | 92 | 22% |
| On-Page SEO | 85 | 20% |
| Content Quality | 82 | 23% |
| Schema | 70 | 10% |
| Performance (CWV) | 75 | 10% |
| AI Search Readiness | 75 | 10% |
| Images | 85 | 5% |

## Business Type
**Developer Portfolio / Agency** — case studies, portfolio projects, blog, client-work signals.

---

## Executive Summary

Solid, well-engineered Next.js portfolio. Strong technical fundamentals (robots, sitemap, canonicals, JSON-LD, llms.txt aware). Headline issue is **LCP 3.0s (fails INP-era mobile CWV threshold)** and **missing Schema.org (WebSite + Person only)**.

### Top Critical / High Actions
1. **LCP 3.0s fails mobile threshold** — optimize the LCP image + minimize render-blocking CSS. (High)
2. **Schema brand/entity missing** — no `Organization`, `ProfilePage`, or author/`sitepage` graph. (High)
3. **Custom domain not wired to metadata** — everything hardcodes `rokyuddin.vercel.app`. (High)
4. **Image `localStorage` misuse** — `urlFor(...).url()` returns full Sanity CDN URL passed through Next `<Image>`; contradicts performance-virtualizer. (Medium, see below)

---

## Technical SEO — Score 92/100 ✅

**What works**
- `robots.ts` — allows `/`, disallows `/sanity`, declares sitemap + host. ✅
- `sitemap.ts` — includes home, blog index, all posts, case-studies index, all slugs, playground. ✅
- Per-page `canonical` via `socialMetadata({ alternates: { canonical } })`. ✅
- Static prerendering (`generateStaticParams`) for blog + case studies. ✅
- ISR/cache directives in `next.config.ts` (cacheComponents). ✅
- No crawl-blocking client-side rendering; content server-rendered. ✅

**Findings**
- **[Info]** `rokyuddin.vercel.app` is a temporary Vercel domain — likely consolidating to a custom domain. No `robots` violations.
- **[Low]** Playground is indexed; it is interactive JS tooling with minimal crawlable content — consider `noindex` unless it has SEO value.

---

## On-Page SEO — Score 85/100

**What works**
- Unique titles/descriptions per route (home, blog index, blog post, case studies list, case study detail, playground). ✅
- Semantic `H1` per page. ✅
- Per-page keywords (case studies). ✅

**Findings**
- **[High]** `SITE_DESCRIPTION` is generic ("Frontend Developer specializing in React, Next.js, and TypeScript"). Homepage meta could name specifics (Rydr, Skinsight, 6x+ years). Improve CTR.
- **[Medium]** Blog post titles use `post.title - Md Rokyuddin`; check for length cutoffs (>60 chars gets truncated in SERP).

---

## Content Quality — Score 82/100

**What works**
- Blog with authored posts, dates, excerpts. ✅
- Case studies with challenge/solution/features/gallery — strong E-E-A-T. ✅
- llms.txt route present (empty dir — see GEO).

**Findings**
- **[Medium]** Portfolio blog covers few topics; thin content risk if posts are short. Maintain 800+ word posts for topical authority.
- **[Low]** No author bio/`about` linkage in footer of posts for entity consistency (author name used, but page-level `sameAs` absent).

---

## Schema / Structured Data — Score 70/100

**Current:** `Person` + `WebSite` in layout; `BlogPosting` (blog detail); `Article` (case study detail). ✅

**Findings**
- **[High]** Missing `Organization` schema. Portfolio sites need `Organization` (name, url, logo, sameAs) for brand entity.
- **[High]** Missing `ProfilePage` schema with `mainEntity` = Person, author relationship, `knowsAbout`. Portfolio = primary entity case.
- **[Medium]** Blog posts: `BlogPosting` lacks `image`, `author.url`, `mainEntityOfPage`, `publisher`, `dateModified`. Add author URL + publisher for eligibility.
- **[Medium]** `Article` schema on case studies lacks `datePublished`, `publisher`, `mainEntityOfPage`.
- **[Info]** No required `@id`/`url` cross-references — entities not linked into one graph.

---

## Performance (CWV lab) — Score 75/100

Live PSI mobile: **Score 88**, FCP 0.9s, **LCP 3.0s ❌**, CLS 0 ✅, TBT 110ms.

**Findings**
- **[High]** **LCP 3.0s fails the <2.5s mobile threshold.** Cause: render-blocking CSS + LCP image timing. PSI top opportunities: render-blocking resources (~140ms), unused JS (48KiB), image delivery (69KiB).
- **[Medium]** Speed Index 6.2s — above fold slow to settle despite fast FCP.
- **[Medium]** Unused JS: 40% and 57% on two chunks (~48KiB).
- **[Low]** Legacy/polyfill module 13.4KiB wasted.
- **[Info]** No CrUX field data (low traffic / new domain) — lab numbers stand.

---

## AI Search Readiness (GEO) — Score 75/100

**What works**
- `llms.txt` route exists. ✅
- Clean server-rendered HTML, semantic sections, internal linking. ✅

**Findings**
- **[Medium]** `llms.txt` is an **empty directory**, not a reachable text file → returns 404. `/llms.txt` should serve plain text. Fix to feed AI crawlers.
- **[Medium]** Factual metadata lives only in Schema; add `rokyuddin.dev` canonical + `linkedin`/`github` as citation-ready `sameAs`.
- **[Low]** No `robots.txt` AI-crawler-specific allowance (GPTBot/PerplexityBot) — default is fine, but an explicit `llms.txt` pointer helps.

---

## Images — Score 85/100

**What works**
- Alt text on profile/project images. ✅
- `sizes` attribute + `fill` + `priority` on key images. ✅

**Findings**
- **[Medium]** Three project card images oversized: up to **84% savings (28.5KB, 18.4KB, 18.0KB)** each. Sanity CDN originals `1536x1024` served at large w — pass explicit smaller `width`/`sizes`.
- **[Medium]** Hero profile image: `urlFor(...).url()` bypasses Next Image optimizer sizing; fetch raw CDN at fixed 350x450 but with `priority` — consider a smaller width request to cut LCP bytes.

---

## Quick Wins (Low effort, high impact)
1. **Fix LCP image** — smaller hero image request width → biggest single LCP gain.
2. **Minify/dead-code CSS** — PSI flags reduce unused CSS (saves ~140ms LCP).
3. **Serve `/llms.txt`** — flip the empty dir to a real text file.
4. **Add `Organization` + `ProfilePage` JSON-LD** — two blocks, fixes top schema gap.
5. **Wire custom domain** into `SITE_URL` env once bought.

---

## Priority Action Plan

### Phase 1 — Critical (Week 1)
- (none barrier-level; no index-blocking issues found)

### Phase 2 — High Impact (Weeks 1–2)
- **[perf]** Cut LCP: optimize hero image width + remove render-blocking CSS. Target <2.5s.
- **[schema]** Add `Organization` + `ProfilePage` JSON-LD; link entities via `@id`.
- **[geo]** Serve real `/llms.txt` content (flip empty dir → plain-text at `/llms.txt`).
- **[meta]** Strengthen homepage description with concrete differentiators.

### Phase 3 — Medium (Weeks 2–4)
- **[img]** Compact 3 over-sized Sanity project images (84% savings).
- **[schema]** Enrich `BlogPosting` (publisher, mainEntityOfPage, dateModified) + `Article` (datePublished, publisher).
- **[perf]** Tree-shake 48KiB unused JS; drop legacy polyfill module.
- **[onpage]** Verify blog title lengths; add author entity links.

### Phase 4 — Ongoing
- **[domain]** Purchase + wire custom domain (sets canonical base). Add to GSC.
- **[content]** Publish 800+ word topical posts; internal links to case studies.
- **[monitor]** Re-run PSI after fixes; track via GSC once domain set.
