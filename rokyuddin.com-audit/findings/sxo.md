# Search Experience (SXO) Findings

**Site:** https://www.rokyuddin.com (canonical https://rokyuddin.com) — personal portfolio of Md Rokyuddin, Frontend Developer.
**Pages analyzed (10 crawled):** homepage, blog-index, blog-modern-web-design-trends-2024, blog-nextjs-performance-optimization, blog-typescript-best-practices, case-studies-index, case-studies-altseo, case-studies-rydr, case-studies-skinsight, playground.

---

## Intent vs Page Mapping

| Page | URL | Target Intent | User Story Served | Intent Fit |
|---|---|---|---|---|
| Homepage | `/` | Navigational (brand) + transactional (hire) | Recruiter/founder lands on brand search, wants quick proof of skill, experience, and a contact route | Mixed. Strong brand identity; weak commercial framing |
| Blog index | `/blog` | Navigational hub | Peer explores what the author writes about | Partial. Positioned as "insights & ideas," not as an authority play |
| Blog: Next.js performance | `/blog/...nextjs-performance` | Informational | Developer researching techniques wants depth, code, and recency | **Mismatch** — thin body (~135 words), 2024 date in 2026 |
| Blog: TypeScript best practices | `/blog/...typescript-best-practices` | Informational | Developer wants actionable type-safety patterns | **Mismatch** — same thinness (~135 words), stale |
| Blog: Modern web design trends 2024 | `/blog/...modern-web-design-trends-2024` | Informational (trend, time-sensitive) | Designer/developer wants current trends | **Critical mismatch** — "trends" content hard-coded to 2024, now 2 years old; will never rank/retain |
| Case studies index | `/case-studies` | Commercial / portfolio | Founder/recruiter browses proof of shipped work | **Aligned** — good hub |
| Case study: AltSEO | `/case-studies/altseo` | Commercial | Founder wants outcome evidence for an AI/SaaS build | **Aligned** but proof is directional, not dollar-denominated |
| Case study: Rydr | `/case-studies/rydr` | Commercial | Founder/recruiter wants scale & reliability proof | **Aligned** — strongest metrics (99.9% uptime, 95+ Lighthouse) |
| Case study: Skinsight | `/case-studies/skinsight` | Commercial | Founder wants AI/personalization proof | **Aligned** — decent engagement metrics |
| Playground | `/playground` | Off-quota / interactive | Searcher wants to interact with code | **Unclear SERP role** — exists for engagement, low search value |

### Headline intent analysis

- **"Frontend developer portfolio" / "hire react developer":** A searcher with this commercial intent expects to land on a page that quickly proves *what this person can build*, *for whom*, *how well*, and *how to engage them*. The homepage delivers a polished identity ("Md Rokyuddin – Frontend Developer, 3+ years, Next.js & TypeScript") but buries commercial triggers: there is **no standalone services/hire page, no process, no rates or engagement model, no visible testimonials** (the testimonials section renders empty), and the CTAs ("VIEW WORK", "VIEW RESUME", "Let's work together") are generic. The commercial value proposition is implied rather than stated.
- **Brand queries ("Rokyuddin", "MD Rokyuddin"):** Homepage is the correct inbound target and delivers a consistent entity. Strong points: Person schema, consistent name, single positioning. Weaker: the homepage copy over-indexes on aesthetics over "here is what I can do for your business."
- **Blog posts (informational):** The posts target informational keywords but do **not** satisfy that intent at the depth the SERP demands. A 2026 searcher for "Next.js performance optimization" expects a current (2025–2026), deep, code-dense guide — these are ~135-word stubs published Nov 2024, with no `dateModified` signals and no refresh. "Modern web design trends 2024" is structurally dated and cannot satisfy a trends query in 2026. The blog adds credibility to the personal brand but actively undercuts E-E-A-T recency.

---

## Persona Scores (table)

Scoring on 1–10 for whether the page satisfies each persona's core need (0 = fails, 10 = fully satisfies). Averages weighted across the pages that persona actually uses.

| Page | Hiring Manager / Recruiter | Client / Startup Founder (contractor) | Technical Peer |
|---|---|---|---|
| Homepage | 7 | 5 | 6 |
| Blog index | 5 | 4 | 5 |
| Blog: Next.js performance | 4 | 4 | 3 |
| Blog: TypeScript best practices | 4 | 4 | 3 |
| Blog: Modern web design trends 2024 | 3 | 3 | 2 |
| Case studies index | 7 | 8 | 6 |
| Case study: AltSEO | 6 | 7 | 8 |
| Case study: Rydr | 7 | 8 | 7 |
| Case study: Skinsight | 6 | 7 | 7 |
| Playground | 3 | 2 | 6 |
| **Average** | **5.2** | **5.2** | **5.3** |

### Persona reasoning

- **(a) Hiring manager / recruiter (5.2):** Strong, consistent brand and decent project/professional history on the homepage (experience section with concrete impact numbers). Teased down by thin blog content and the empty testimonials section, which a recruiter treats as a trust gap.
- **(b) Client / startup founder (5.2):** Best served by the case studies (concrete outcomes: 99.9% uptime, 95+ Lighthouse, 100% WCAG, 92% accuracy) — but founder intent is only partially met because there is no explicit "how we'd work together / what it costs / what you get" conversion path. The homepage's generic CTA and missing social proof weaken the commercial case.
- **(c) Technical peer (5.3):** Strong on case studies (real architecture: Next.js 16, Supabase, React 19, Tanstack). Weakened by stub blog posts that would be the peer's primary content destination; peers instantly recognize thin/outdated technical writing.

---

## Page-Type Mismatches

1. **Blog posts = informational stubs pretending to be long-form (HIGH / CRITICAL).** The three posts are branded and titled as authoritative ("A Complete Guide") with "8 min read" badges, but render only ~135–173 words of article body. The page type *claims* long-form informational; the content delivers an outline. This is a classic page-type-vs-content conspiracy for "Next.js performance optimization" and "TypeScript best practices," where Google rewards deep, current, code-heavy content. Combined with the **2024 date** in a 2026 context, these pages cannot win their target SERPs — and worse, an outdated "trends 2024" post signals staleness that can leak negative brand/recency signals to the domain.
2. **Homepage loads as a portfolio but serves a commercial query without a commercial page (MEDIUM–HIGH).** There is no `/services`, `/hire`, or `/contact` standalone page; contact exists only as an anchor on the homepage. For "hire react developer" and similar, the correct page type is a services/offer page — currently absent. The homepage is asked to be portfolio + hiring pitch + contact + social proof at once, and does none decisively.
3. **Case studies are typed as `Article` schema (MEDIUM).** Each case study emits `@type: "Article"` rather than a more specific `CreativeWork`/`CaseStudy`/`Project` type. For a portfolio/portfolio-type SERP, `Article` is a weak, generic signal and doesn't semantically register the page's commercial/portfolio role. The case-studies index page emits **no schema at all**.
4. **Blog index recency/consistency gap (LOW–MEDIUM).** Blog index headline promises "Deep dives" but lists three 2024 stub posts — the index's own description ("exploring the intersection of design, development...") is a soft narrative page, but its promise mismatches the thin articles beneath it.
5. **Playground page type (LOW).** A functional/interactive page with strong appeal to technical peers but no realistic SERP-intent target; its lazy-loaded editor and "Loading Editor..." shell mean the crawl captures almost no content. It serves off-search engagement, not ranking.

---

## Brand Entity Readiness

**Strong brand foundation, with clear consistency gaps that undercut a "brand-search-ready" entity.**

Strengths:
- Person schema (Person + WebSite) present and correct: name "Md Rokyuddin", jobTitle, email, address (Jashore, BD), GitHub + LinkedIn `sameAs`.
- Canonical domain is clean (https://rokyuddin.com), title/OG/Twitter consistent: "Md Rokyuddin | Frontend Developer".
- Consistent full-name usage "Md Rokyuddin" throughout (title, footer, author, schema, case studies).
- Real, reachable identity: GitHub/LinkedIn/X handles, email, phone, location all present.

Gaps / risks:
- **Testimonials section is empty** (`testimonials:[]`). The homepage renders a "Client Testimonials" section heading with zero content — a visible trust hole on the primary brand surface and a negative E-E-A-T signal.
- **Person schema omits `image`, `description`, `nationality`, `sameAs` for X and portfolio**, and there's no `ProfilePage`-level or Company/Organization markup bridging him to employers. A brand search surfaces a clean but shallow entity.
- **Blog authorship recency:** `BlogPosting` schema lacks `dateModified` and `wordCount`/`articleBody`; posts are 2024-only. Google's entity/recency evaluation for the author suffers.
- **Sub-brand assets (AltSEO, Skinsight, Rydr) are third-party** (altseo.vercel.app, skinsight.me, rydr.app) and not owned/linked to the rokyuddin.com entity in schema; on a brand search these could split the entity graph.
- **No LLM/AI-search-ready brand content** (e.g., explicit "who is Rokyuddin" statement on-page beyond a 15-word hero tagline); hero and about are brief.

---

## Recommendations

Highest-leverage first:

1. **Fix or remove the thin blogs (CRITICAL, quick win or kill).** Either (a) flesh each post to genuinely long-form depth (1,500–2,500 words, real code, updated for Next.js 16 / React 19 / TypeScript 5.x in 2026) and refresh dates, or (b) soft-remove the stale "trends 2024" post and the two stubs from the visible blog until they meet depth. Do not keep "A Complete Guide" pages that are 9 paragraphs — they harm E-E-A-T and can produce redundant thin pages.
2. **Add a standalone services/hire page (HIGH).** Create `/services` or `/hire` with: what he does, process, tech, engagement model, and a clear CTA form/email. Target "hire react developer" + contractor intent that the homepage can't serve. Link homepage CTAs to it.
3. **Correct case-study schema (MEDIUM, cheap).** Change `@type` from `Article` to a portfolio-specific type (e.g., `CreativeWork` with `about`, or `Project`/`CaseStudy` alongside `Person` author), add `dateCreated`, and add schema to the case-studies index page (e.g., `ItemList`/`CollectionPage`).
4. **Fill the testimonials hole (HIGH trust impact).** Add 2–3 real client/employer testimonials with names/roles to the homepage's empty "Client Testimonials" section — currently a visible red flag.
5. **Deepen a public bio** for brand-search and AI-citation readiness: a 50–100 word "who is Md Rokyuddin" passage, plus add `image`, `description`, and full `sameAs` (including X) to Person schema.
6. **Own the sub-brand graph (MEDIUM).** For the portfolio, keep case studies on rokyuddin.com; ensure each links back to the parent and the parent's schema references them, so brand searches resolve to one strong entity rather than scattered Vercel/app domains.
7. **Refresh the blog cadence (MEDIUM).** Commit to current-dated (2025–2026) posts aligned to the tech actually used (Next.js 16, React 19, Tanstack, RSC) and the active projects, so the blog supports — not contradicts — the "current, hireable specialist" story.

---

## Priority

| Priority | Action | Impact | Effort |
|---|---|---|---|
| P0 | Deepen or remove the three stale/thin blog posts | E-E-A-T, recency, brand quality | Medium |
| P0 | Add standalone services/hire page + link CTAs | Core commercial conversion | Medium |
| P1 | Fill empty testimonials section | Trust / hiring readiness | Low |
| P1 | Fix case-study + index schema (typed properly) | SERP role clarity | Low |
| P1 | Expand Person schema (image, description, full sameAs) & add public bio | Brand entity & AI citation | Low |
| P2 | Own sub-brand entity graph & refresh blog cadence | Long-term brand/authority | Medium |

---

**Summary.** The site has a clean, consistent personal brand (Md Rokyuddin, Frontend Developer) with the correct homepage as the brand-search landing page and genuinely strong, outcome-rich case studies that satisfy commercial/portfolio intent — but it is undermined in three ways. The blog, which should build authority and current-dated E-E-A-T, currently ships three ~135-word stubs dated Nov 2024 (including a hard-2024 "trends" post) that cannot win any informational SERP in 2026 and drag down overall recency/quality perception. The commercial intent that powers "hire react developer"-type searches is only implicitly served: there is no dedicated services/hire page, the homepage's testimonials section renders empty, and CTAs are generic rather than conversion-specific. Finally, the structured-data layer under-types the portfolio (case studies marked as generic `Article`, index page with no schema, Person schema missing image/description/full sameAs), weakening the entity and its SERP role. Fixing the blog depth/recency and adding a real hire/services page deliver the largest SXO lift; filling testimonials and correcting schema are low-effort, high-trust wins.
