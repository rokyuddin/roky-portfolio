# AI Search / GEO Findings

Site: https://www.rokyuddin.com — Personal portfolio, "Md Rokyuddin — Frontend Developer"
Scope: robots.txt, llms.txt, crawlee HTML (9 pages), live spot-checks for AI-crawler visibility.

---

## AI Crawler Access

**Verdict: All major AI crawlers are ALLOWED (nothing is blocked).**

Live `robots.txt`:
```
User-Agent: *
Allow: /
Disallow: /sanity

Host: https://rokyuddin.com
Sitemap: https://rokyuddin.com/sitemap.xml
```

Interpretation:
- `User-Agent: *` + `Allow: /` is a **permissive default**. Every crawler — human, bot, or AI — is allowed to crawl everything except `/sanity` (the Sanity CMS admin API, correctly hidden).
- No AI crawler is individually declared, so none is opted in *or* opted out by name. By default, robots.txt **allows all** crawlers, including:

| Crawler | Allowed? | Notes |
|---|---|---|
| GPTBot (OpenAI) | Allowed | |
| OAI-SearchBot (OpenAI search) | Allowed | |
| PerplexityBot | Allowed | |
| ClaudeBot / anthropic-ai | Allowed | |
| Google-Extended | Allowed | |
| CCBot (Common Crawl) | Allowed | |

- The `Host:` and `Sitemap:` lines are non-standard directives (Yandex/Baidu heritage). They are **ignored by Google and by AI crawlers** and do nothing useful; `Sitemap:` is harmless. Recommend removing `Host:` and keeping `Sitemap:` (valid) if desired.
- **Risk / caveat:** `/sanity` is disallowed, which is correct. But if any user-facing content were served under a path that accidentally matches `/sanity`, it would be blocked — it does not, so this is fine.
- **Biggest GEO caveat is NOT robots.txt — it is rendering.** See Entity Clarity below: the homepage's structured data does not reach a non-JS AI crawler as a real `<script type="application/ld+json">` tag, even though robots.txt allows it to fetch. Accessibility of the *raw HTML* (what most AI crawlers read) is the limiting factor, not robots policy.

---

## llms.txt

- `https://www.rokyuddin.com/llms.txt` → **HTTP 200 (present, good quality).**
- `https://www.rokyuddin.com/llms-full.txt` → **HTTP 404 (missing).**

llms.txt content (fetched live):
- Correct `# Md Rokyuddin` title.
- A clean one-paragraph identity summary: "a frontend developer specializing in React, Next.js, and TypeScript, based in Jashore, Bangladesh."
- Well-structured sections: People, Key pages (with anchors), Contact (email, GitHub, LinkedIn), Technology.
- Links use the **non-www** canonical host (`https://rokyuddin.com/`) while the site is served at `https://www.rokyuddin.com` — minor consistency gap (the site itself declares canonical `https://rokyuddin.com`, so this is internally consistent, but a consumer fetching the www URL won't find it at the non-www `llms.txt` path unless redirected; it is, per the 200 above).

Quality assessment: **Above average.** It is concise, factual, hedge-free, and gives a model exactly the entity-identifying facts (name, role, stack, location, contact) needed for citation. It correctly describes the site's pages.

Gaps:
1. **No `llms-full.txt`** (404). For a small personal site this is optional, but it would be a good place to put expanded bio, full experience history, and links to case studies/blog posts so a model can ingest deeper context in one fetch.
2. **No per-page summaries** of the case studies (AltSEO, Skinsight, Rydr) or blog posts — the most quotable content. Adding 1–2 lines per case study with the concrete metrics (e.g., AltSEO "AI alt-text generation, <5s processing, solo-built") would materially improve citability of the subpages.
3. Minor: it references `https://x.com/rokyuddin_dev` is NOT in the llms.txt (it is on the page) — add X/Twitter to the Contact block for completeness.

Note: Google Search does not consume llms.txt, but it is used by some AI products/agents and is a low-cost, high-signal win. Keep and extend it.

---

## Citability Score (0-100 with justification)

**Score: 68 / 100**

Rationale by surface:

**Homepage — Strong (drives the score up).** Contains concrete, quotable, verifiable-style claims in clear, hedge-free language:
- "A specialized Frontend Developer with **3+ years of experience**, crafting refined digital experiences with Next.js & TypeScript."
- "Architected the admin dashboard for a ride-sharing platform, **improving operational efficiency by 40%**."
- "Optimized checkout flows to reduce cart abandonment."
- Numbered social proof: "04 Client Testimonials," "01 Selected Works."
- Named employers with dates: "Miicon Solutions Limited — Sep 2022 – Present," "Soft24 — Jan 2025 – Present (Part-time)."
- Clear specialty enumeration (Architecture / State Management / UX / Performance).

Deductions on homepage: some phrases are still soft/marketing ("refined digital experiences," "seamless functionality wrapped in intuitive, accessible interfaces") rather than specific. A few hard facts (years, 40%) are not independently verifiable and would be stronger with a concrete case-study backlink.

**Case studies — Strong (best citable surface).** The AltSEO case study is exemplary:
- "Duration **1 Month (2025-2026)**," "Role Frontend Developer," "Team **Solo Developer**," live + source links.
- "Integrated Groq AI's vision models to achieve ultra-fast (**<5s**) processing speeds."
- "Built a robust, scalable architecture using **Next.js 16 (App Router) and Supabase**."
- "Delivers accurate results in **3–5 seconds**."
- "Reduced the time required to tag images **from minutes to seconds**, enabling ... **100% accessibility compliance**."
These are exactly the specific, dated, numeric, passage-structured claims an LLM wants to quote.

**Blog — Weakest (drives the score down).** The Next.js performance post is clear and well-structured but **thin on facts**: it reads as confident-but-generic ("game-changer," "lightning fast," "an ongoing process"). It has almost **no specific numbers, benchmarks, dates, or original data** — assertions like "It automatically optimizes images" are paraphrases of official Next.js docs, which means a model is more likely to cite the Next.js docs than this post. No Lighthouse/Core Web Vitals figures, no before/after metrics, no "I measured X." The other two posts (TypeScript best practices, 2024 design trends) follow the same pattern — topical and structured but not data-rich.

**Why not higher:** The blog (a large share of crawlable depth) is generic and not differentiated from canonical docs, and a portion of the homepage's distinguishing structured data is invisible to non-JS crawlers (see Entity Clarity). The case studies and homepage are strong, which caps the overall at a solid 68 rather than a higher band.

What would push this to 80+: (a) add 2–4 concrete, first-person, numbered data points to each blog post (a benchmark, a Lighthouse delta, a before/after), and (b) render the homepage Person/WebSite schema server-side so AI crawlers can bind the entity.

---

## Entity Clarity

**Overall: Clear to a human and to a JS-rendering model; degraded for a non-JS (raw-HTML) AI crawler.**

What makes entity resolution easy (positive):
- Consistent, prominent name: "Md Rokyuddin" is the H1, the `<title>`, `og:site_name`, and the Person schema value.
- Unambiguous single role: "Frontend Developer" everywhere (hero, schema, llms.txt, meta description).
- Clear specialty: React, Next.js, TypeScript (stated in 4+ independent places).
- Disambiguating attributes: location (Jashore, Bangladesh), email, and `sameAs` links (GitHub, LinkedIn, X) — exactly what a model needs to bind "Md Rokyuddin, the frontend developer" to the right entity.

**Critical caveat discovered during the audit (contradicts the task's premise that "raw HTML showed NO structured data"):**
- Structured data **does exist** — it was hiding in the **Next.js React Server Component (RSC) flight payload**, which is why a naive grep/`<script type="application/ld+json">` search missed it.
- **Homepage:** The `Person` + `WebSite` schemas are generated (verified present in the RSC stream with full data: `@type: Person`, `name: Md Rokyuddin`, `jobTitle: Frontend Developer`, `email`, `address`, `sameAs`, plus `WebSite` with name/url/description). **However, on the live, non-JS response there is NO rendered `<script type="application/ld+json">` tag for the homepage** — the schema only materializes after client hydration. A curl-as-GPTBot fetch of the homepage returns zero real JSON-LD script tags.
- **Blog posts & case studies:** Each has **1 real, server-rendered `<script type="application/ld+json">`** (verified live) with `Article`/`BlogPosting` + `Person` author. These ARE visible to non-JS AI crawlers.
- **Index pages (blog-index, case-studies-index) and playground:** **0** rendered JSON-LD.

Net effect: An AI crawler that only reads raw HTML (the common case for GPTBot/PerplexityBot/CCBot-style fetches) gets:
- Homepage → **no structured data** (the most important page for entity binding has the least crawlable structure).
- Blog/case-study article pages → solid `Article` + `Person` author schema (good).

This is a **self-inflicted gap**: the exact entity-identifying schema (Person/WebSite) lives on the page where it matters most and is invisible to non-JS crawlers, while subpages get generic Article schema. Fix: emit the homepage Person + WebSite JSON-LD as a **statically server-rendered** `<script type="application/ld+json">` (not via client `dangerouslySetInnerHTML` from async Sanity data), so it is in the first HTML response.

Secondary entity-clarity points:
- The `Person` schema on the homepage lacks `alumniOf`, `worksFor`, `knowsAbout` (skills), and `mainEntityOfPage`. Adding `knowsAbout` (React, Next.js, TypeScript) and `worksFor`/jobHistory (Miicon Solutions Limited, Soft24) would strengthen machine entity binding.
- The blog/case-study `Person` author schema is minimal (name only) — consider adding `@id` pointing to a canonical Person and `sameAs` so the author entity resolves to the same person across all pages.

---

## Authority Signals

Good, citation-worthy authority is surfaced:
- **Employer + tenure:** "Frontend Developer L2 @ Miicon Solutions Limited — Sep 2022 – Present" and "Frontend Developer L2 (Part-time) @ Soft24 — Jan 2025 – Present," with a quantified result ("improving operational efficiency by 40%").
- **Quantified outcome** on the homepage (40% efficiency gain) — a citation-worthy, specific claim.
- **Live, externally-verifiable project links** (altseo.vercel.app, skinsight.me, rydr.app) plus **source-code links** (github.com/rokyuddin/altseo) — strong E-E-A-T and verifiability for a model confirming the person actually built these.
- **Professional presence** (GitHub, LinkedIn, X) and a resume link ("VIEW RESUME").
- **Case studies with results** (AltSEO "reduced time from minutes to seconds," "100% accessibility compliance").

Gaps limiting authority:
- **No third-party corroboration on-page** (no notable client logos, awards, press, or verifiable external citations).
- **Testimonials are present ("04 Client Testimonials")** but the actual testimonial text is not clearly server-rendered in a quotable form in the crawled HTML — verify they render as named, attributed, specific quotes (named endorser + role + concrete statement) for maximum citation value.
- The quantified claims (40%, 3+ years) lack an on-page pointer to the supporting case study, so a model can't easily verify them; linking "40%" to the Rydr case study would help.
- No `worksFor`/`alumniOf`/`knowsAbout` in schema (see Entity Clarity).

---

## Passage-level Structure

**Good.** All key pages use a clean, predictable heading hierarchy that maps well to passage extraction:
- **Homepage:** `H1` (Md Rokyuddin) → `H2` (Client Testimonials, My Tech Stack, Selected Works, Competencies, Experiences, Let's work together.) → `H3`/`H4` (project names; Professional Background, Core Focus; Architecture, State Management, User Experience, Performance; role @ employer). Each H2/H3 scopes a self-contained, self-describing passage — ideal for RAG/quote extraction.
- **Case studies:** `H1` (project) → `H2` (Project Overview, The Challenge, The Solution, Key Features, Technology Stack, Results & Impact) → `H3` (feature names). The "Results & Impact" section is a clean, quotable passage with the strongest specific claims on the whole site.
- **Blog posts:** `H1` (title) → `H2` (Image Optimization, Code Splitting and Dynamic Imports, Server Components and Streaming, Caching Strategies, Conclusion). Good skeleton; each H2 is a natural passage, but the prose under each is thin (see Citability).

Minor structural issues:
- The homepage `H1` is the bare name "Md Rokyuddin"; the descriptive value ("Frontend Developer with 3+ years...") sits in the hero paragraph just below. An LLM extracting only the H1 gets less signal than if the H1 (or a single lead sentence directly under it) fused name + role + differentiator.
- A couple of blog paragraphs concatenate a code-block label into the prose ("...only when needed. import Image from 'next/image'; Code Splitting...") — code fences and heading labels should be separate elements, not inline-merged into `<p>`, to keep passages clean.
- No FAQ section (a high-value GEO pattern: "Who is Md Rokyuddin?", "What stack does he work with?") — adding 3–5 Q&A pairs with `FAQPage` schema would directly seed citable, question-shaped passages matching common AI queries.

---

## Recommendations

Prioritized, highest-leverage first:

1. **Render homepage structured data server-side (P0).** Emit the `Person` + `WebSite` JSON-LD as a real `<script type="application/ld+json">` in the static HTML response (not via client-side `dangerouslySetInnerHTML` from async data). This is the single highest-impact fix: the homepage is where entity binding happens and it currently sends zero schema to non-JS AI crawlers. Extend `Person` with `jobTitle`, `worksFor` (Miicon Solutions Limited), `knowsAbout` (React, Next.js, TypeScript, Tailwind), `sameAs`, and `address` — all already in the RSC payload, just make it static.

2. **Add an FAQ section + `FAQPage` schema to the homepage (P1).** 3–5 self-answering Q&A ("Who is Md Rokyuddin?", "What does he specialize in?", "Where is he based?", "Is he available for freelance?"). Question-shaped, first-person, hedge-free answers are exactly what AI Overviews / ChatGPT / Perplexity quote.

3. **Make the blog factual and original (P1).** Add 2–4 concrete, first-person data points per post: a Lighthouse/Core Web Vitals before-after, a bundle-size delta, a measured latency, a dated observation. Differentiate from official docs so a model cites *this* post instead. This is the weakest citable surface and the cheapest to fix.

4. **Surface and attribute the testimonials (P2).** Ensure the 4 testimonials render server-side as named, role-attributed, specific quotes (not just "04 Client Testimonials"). Named endorsement is a strong authority + citability signal.

5. **Backlink quantified claims to evidence (P2).** Connect "40% efficiency" → Rydr case study, and add `Results & Impact`-style numeric outcomes to the Skinsight and Rydr case studies (AltSEO already has them). Make every hard number point to a verifiable, linked source.

6. **Extend llms.txt + add llms-full.txt (P2).** (a) Add a short, metric-bearing summary per case study and per blog post to llms.txt. (b) Create `llms-full.txt` (currently 404) with full bio, experience history, and all page links. (c) Add the X/Twitter handle to the Contact block.

7. **Unify author entity across pages (P3).** Give every `Person`/author schema a canonical `@id` (e.g., `https://rokyuddin.com/#/schema/author`) and `sameAs` so all pages resolve the author to one entity.

8. **Clean up robots.txt (P3).** Remove the non-standard, ignored `Host:` line. Keep `Allow: /`, `Disallow: /sanity`, and `Sitemap:`. Optionally add explicit `User-Agent:` blocks for the AI bots you *want* cited (harmless but signals intent).

9. **Separate code fences from prose in blog posts (P3).** Keep code samples in `<pre>/<code>` blocks, not merged into `<p>` text, for clean passage extraction.

---

## Priority

| Priority | Item | Impact | Effort |
|---|---|---|---|
| **P0** | Render homepage `Person`+`WebSite` JSON-LD as static server HTML | Very high (entity binding for the #1 page) | Low |
| **P1** | Homepage FAQ section + `FAQPage` schema | High (seed citable question-shaped passages) | Low |
| **P1** | Add concrete, first-person data points to each blog post | High (blog is weakest surface) | Medium |
| **P2** | Server-render & attribute the 4 testimonials | Medium | Low |
| **P2** | Link quantified claims (40%, 3+) to case studies; add results to Rydr/Skinsight | Medium | Low |
| **P2** | Extend llms.txt + create llms-full.txt + add X handle | Medium | Low |
| **P3** | Canonical `@id` author entity across all pages | Low-medium | Low |
| **P3** | Remove non-standard `Host:` from robots.txt; (optional) explicit AI-bot blocks | Low | Trivial |
| **P3** | Separate code fences from prose in blog posts | Low | Low |

**Top 3 to do first:** (1) static homepage JSON-LD, (2) homepage FAQ + FAQPage schema, (3) data-enrich the blog posts.

---

## Summary

Rokyuddin.com is **well above average** for AI-search readiness, with two distinct strengths and one self-inflicted weakness. The content is clear, structured, and hedge-free: the homepage and (especially) the AltSEO case study carry the kind of specific, dated, numeric, passage-structured claims (3+ years, 40% efficiency, <5s processing, 1-month solo build, 100% accessibility compliance) that LLMs quote confidently, and the heading hierarchy on every page maps cleanly to passage extraction. robots.txt is permissive (`User-Agent: * / Allow: /`), so **every** major AI crawler — GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, CCBot — is allowed, and a quality `llms.txt` is present. The **critical problem** is a rendering, not a policy, issue: the homepage's `Person`/`WebSite` structured data exists only in the Next.js RSC flight payload and **never materializes into a real `<script type="application/ld+json">` tag in the raw HTML** that non-JS AI crawlers read — so the single most important page for entity binding sends zero schema to most crawlers, even though subpages do ship real Article/BlogPosting schema. Fixing that one gap (render the homepage schema statically), plus adding a self-answering FAQ section with `FAQPage` schema and injecting concrete first-person data into the currently generic blog posts, would move this site from a solid 68/100 citability baseline into the top of its class for AI Overviews, ChatGPT, and Perplexity citation.
