# Content Quality Findings

Site: rokyuddin.com (served on www.rokyuddin.com). Audited 10 crawled pages from `/home/roky/work/personal/roky-portfolio/rokyuddin.com-audit/crawl/`.

## E-E-A-T

**Experience (strong):**
- Homepage states "3+ years of experience" as a "specialized Frontend Developer" and lists two named employers with dates: "Frontend Developer L2 @ Miicon Solutions Limited, Sep 2022 – Present" and "Frontend Developer L2 (Part-time) @ Soft24, Jan 2025 – Present." Concrete, dated, verifiable-adjacent experience.
- A public resume is linked: `https://drive.google.com/file/d/1CicoWtA6dflZz6hErdzGjboKsgvXzCy9`.
- Case studies include role, explicit durations (Rydr 8 months 2023–2024; Skinsight 6 months 2024; AltSEO 1 month 2025–2026) and team size (e.g., "5 developers, 2 designers, 1 PM"). These specifics are strong experience signals.

**Expertise (moderate-good):**
- The tech stack is explicit and current (Next.js 14/16, React, TS, Supabase, Zustand, Redux, Groq AI, Stripe, Google Maps, Tailwind, shadcn).
- Case studies describe concrete technical decisions (RLS for multi-tenant privacy, Zustand state management, SSR for SEO, WebSockets). This is authentic engineering narrative, not filler.

**Authoritativeness (weak):**
- Author attribution exists on blog posts ("👨💻 Md Rokyuddin", `BlogPosting.author.name`) and homepage `Person` schema includes `sameAs` → GitHub + LinkedIn. However:
  - No author bio, no author headshot-to-name link on blog pages, and the blog `BlogPosting` schema has **no `author.url` / `author.sameAs`**, so an assistant/user cannot click through to verify the author.
  - No external citations, sources, or links to industry references anywhere on the site, so claims carry no external authority.
  - No proof-of-work links to live repos/metrics beyond a few "Source Code"/"Visit Site" buttons (GitHub profile is linked but individual projects are not all linked to their repos).

**Trustworthiness (moderate):**
- Homepage proves verifiable contact: email, phone (`+8801611-695544`), location (Jashore, Bangladesh), GitHub + LinkedIn.
- `Person` schema provides NAP (addressLocality Jashore, addressCountry BD, email).
- However there is **no dedicated Contact page and no About page**, and content pages (blog, case studies) carry **no global footer with contact/social info** — their "Get in Touch" button points to a homepage anchor (`/#contact`) that only exists on the homepage. A reader on a blog post or case study hits "Get in Touch" and lands on the homepage hero, not a contact form.

**Recency / staleness (flag):**
- **All 3 blog posts are from November 2024** — roughly 21 months stale as of the audit date (Aug 2026). The "Modern Web Design Trends Shaping 2024" post is doubly stale (topic is inherently time-bound). No posts since, and no `dateModified` in any BlogPosting schema.
- Homepage experience rows are current ("Present"), and AltSEO's case-study duration spans "2025-2026", which is current. Recency problem is isolated to the blog, but the blog is the site's primary publishing/E-E-A-T surface.

## Readability & Depth

- **Crawl is client-rendered for some content**: The playground renders "Loading Editor..." and its content is delivered via JS + a CSR preload payload; the dist/HTML text is minimal. The homepage body content is embedded in the Next.js flight payload rather than clean static HTML.
- **Homepage (depth: good for its purpose)** — ~480 words: strong value proposition ("A specialized Frontend Developer with 3+ years of experience, crafting refined digital experiences with Next.js & TypeScript"), the "04 Client Testimonials" block appears **empty** (no actual testimonial quotes extracted — only the "04"/heading label), tech-stack list, three project cards, competencies, and experience. The testimonials module is present but **empty of testimonials**, an E-E-A-T gap.
- **Case studies (depth: moderate-good)** — well-structured with Project Overview / The Challenge / The Solution / Key Features / Technology Stack / Results & Impact. But Results rely on **unverifiable, unlinked metrics** (AltSEO "<3s", "100%", "10x"; Rydr "99.9% uptime", "95+ Lighthouse", "4.8/5 App Store rating"; Skinsight "92% recommendation accuracy", "85% engagement") with no screenshot, analytics export, or source link to substantiate them.
- **Blog posts (depth: very thin)** — only ~170–200 body words each, yet labeled "5–8 min read." Each post is 3–5 bullet sections + a one-line conclusion. The TypeScript post, e.g., is ~170 words despite claiming "7 min read" (~280 wpm pacing needed). These are outline-level summaries, not "deep dives" as the blog tagline promises.

## Thin Content

- **Blog index**: ~114 words; lists only 3 posts. No categories/filters, no newsletter CTA, no "more coming" signal. Discoverability dead-end.
- **Blog posts**: critical thinness (170–200 words each). Not viable as canonical ranking assets or citation sources as written.
- **Playground**: ~96 words of visible text; it's a functional code-challenge tool (9 challenges, AI assistant) with almost no surrounding explanatory/SEO content. Not a meaningful organic target — fine as a tool, but offers no content value to search or AI citation.
- **Homepage testimonials block**: present in markup but renders without testimonial content — an empty E-E-A-T section that should either be filled or removed.
- Blog "About" claims "Deep dives" and the case-study index tagline says "Deep dives into my most impactful projects. Explore the challenges, solutions, and results" — the depth does not yet match the marketing copy.

## Duplicate Content

- **Case-study description copy is duplicated verbatim across multiple indexed URLs.** The exact "A micro-SaaS platform that automatically generates SEO-friendly, accessible alt text..." sentence appears on: (1) the case-study page's Project Overview, (2) the homepage Selected Works card, (3) the case-studies index card — and is repeated as that page's **meta description**. Same pattern for Rydr and Skinsight (their meta description = their Project Overview paragraph = the homepage/index card text). At low volume this is cosmetic, but the exact-duplicate descriptions across 3 URLs each risk self-competition in SERPs.
- **Blog index cards and their meta descriptions share identical copy** (e.g., "Master TypeScript patterns and practices...") and each post's body repeats the meta description as its subtitle/intro, plus the title appears twice (second H1 in body).
- **Two H1 tags on every blog post** (the visible H1 plus a repeated H1 as the in-body heading) — heading-hierarchy duplicate.

## AI Citation Readiness

**Strengths:**
- Clear, flat H2/H3 headings throughout case studies and blog posts — scannable and quotable structure.
- Concrete, dated specifics in case studies that an assistant could cite: project durations (Rydr 2023–2024, AltSEO 2025–2026), team composition, named tech (Next.js 16 App Router, Supabase RLS, Groq AI vision, Stripe Connect, Zustand), and stated outcomes (WCAG compliance goal, sub-second processing claims).
- `Person` schema with `sameAs` (GitHub/LinkedIn) and WebSite schema on the homepage gives search engines/AI a clean entity definition.
- Blog posts expose `BlogPosting` with `author`, `datePublished`, `keywords` — machine-quotable.

**Weaknesses (reduce citability):**
- The headline "metrics" (3s/100%/10x/99.9%/95+/4.8-5/92%) are **self-reported with no underlying source link or screenshot**, so a careful assistant or fact-checker cannot confirm them — undercuts quotability.
- Blog posts have **no statistics, no dated facts, no external sources, and no author expertise credentials** — nothing concrete an AI would cite. They are generic.
- Blog `BlogPosting` schema lacks `dateModified`, `publisher`, and author links; blog content is stale (Nov 2024), so AI would rank fresher sources above it.
- No llms.txt (noted as a separate concern); body copy is buried in Next.js flight payload on some pages, which can impede clean extraction.

## Missing Opportunities

1. **No About page.** Only a homepage "About"/"Professional Background" section. A full About page (narrative, credentials, years, tools, approach, downloadable resume) would materially strengthen E-E-A-T and give AI/search a rich, citable profile page.
2. **No contact page.** Contact lives only in a homepage section. A `/contact` page (form + email + socials + NAP) is a trust and conversion gap, and content pages lack any persistent footer so users cannot reach contact from articles.
3. **No author bio / credentials on blog posts.** Blogger posts name the author but give no bio, link, or authority proof.
4. **Testimonials section is empty** — an E-E-A-T section exists but has no content.
5. **Blog is dormant** (nothing since Nov 2024). No content roadmap, no premium/content upgrade, no newsletter capture.
6. Case-study results are not ~backed by evidence assets (screenshots, Lighthouse reports, links); missing before/after or real dashboards.
7. No internal cross-linking between blog posts or from blog → case studies (discoverability + topical authority).

## Recommendations (priority: Critical/High/Medium/Low)

**Critical**
- C: Add an **About page** (credentials, experience, tools, resume, approach) and a **Contact page** (form, email, phone, socials, NAP). These are foundational E-E-A-T/trust pages currently missing.
- C: Add a **persistent site footer with contact + social links on every content page** (blog, case studies) so users and crawlers can reach contact/About from any URL. Today "Get in Touch" dead-ends on content pages.
- C: Back each case-study "Results & Impact" metric with a **source link or screenshot** (Lighthouse report, dashboard, analytics). Unverifiable "100%" / "99.9% uptime" claims actively hurt trustworthiness and AI citability.

**High**
- H: Refresh the blog or restructure its positioning. Either publish current-dated posts (2025–2026) or, if it's a portfolio artifact, add `dateModified` and re-scope the promise from "Deep dives" to what the posts actually deliver. Stale Nov-2024 posts on inherently time-bound topics ("2024 trends") read as abandoned.
- H: **Expand blog depth** — current ~170–200 words per post is not a "deep dive" and undercuts the "Deep dives" brand promise. Add real substance, concrete statistics, and external sources to make posts citable.
- H: **Fill or remove the empty testimonials module** on the homepage.
- H: **Eliminate duplicate copy**: differentiate case-study descriptions across homepage/index/detail and stop reusing the meta description as page intro; remove the duplicated H1 on blog posts (keep exactly one H1).

**Medium**
- M: Fix content extraction plumbing: ensure body content renders as static HTML (some pages rely on CSR/flight payload), which helps both crawlers and AI extractors.
- M: Add author bio + schema fields (`author.url`, `publisher`, `dateModified`) to blog posts to boost authoritativeness.
- M: Add internal cross-linking between posts and from blog to relevant case studies.
- M: Give the playground a short intro paragraph and page copy so it has *some* organic/citation value.

**Low**
- L: Add a newsletter/capture CTA on the blog index.
- L: Consider llms.txt (separate concern, but aligned with AI-citation readiness).
- L: Add `dateModified`/freshness signals to case studies and keep the 2025–2026 dates visible on homepage cards.

## Summary

The site has a strong, current E-E-A-T foundation from the homepage (dated, named employment; explicit 3+ years; resume; verifiable contact; `Person` schema with GitHub/LinkedIn) and the case studies are genuinely substantive engineering narratives with dated, specific detail — the strongest content on the property. But the audit surfaces three compounding weaknesses: missing About and Contact pages plus no persistent footer on content pages (so trust and contact are reachable only from the homepage); a dormant, extremely thin blog whose three posts date to November 2024 and run ~170–200 words while claiming "5–8 min reads"; and case-study "Results" built on unverifiable self-reported metrics with no source links. Duplicate case-study/meta descriptions across several URLs and repeated H1s add minor self-competition. Prioritizing the About/Contact pages, a persistent footer, evidence-backed case-study metrics, and either refreshing or honestly resizing the blog would turn solid craft into a site that both search engines and AI assistants can confidently find, verify, and cite.
