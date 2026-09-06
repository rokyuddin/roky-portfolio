# SEO Glossary — rokyuddin.com

Working definitions used in the SEO strategy (see `docs/adr/0002-seo-strategy.md`).

## Core SEO concepts

- **Keyword targeting** — Choosing search queries a page should rank for; on a portfolio these are usually long-tail (e.g. "Next.js App Router performance guide").
- **On-page SEO** — Elements inside the page markup: `<title>`, meta description, headings, canonical, structured data, internal links.
- **Technical SEO** — Crawl/index plumbing: `robots.txt`, sitemap, HTTP status codes, redirects, rendering, security headers, performance.
- **Sitemap** — `sitemap.ts` generates `/sitemap.xml`, listing indexable URLs with priority/lastmod.
- **Canonical tag** — `<link rel="canonical">` declaring the preferred URL; on this site set via `socialMetadata()` `alternates.canonical`.
- **Indexability** — Whether a search engine may store a URL. Blocked by `noindex` meta or `Disallow` in robots.
- **noindex** — Directive telling search engines not to index a page when a route should remain accessible but out of search results.
- **robots.txt** — At `/robots.txt`; this repo blocks `/sanity`, lists sitemap, allows all other crawlers.

## Structured data

- **JSON-LD** — JSON-based linked-data format embedded as `<script type="application/ld+json">`; the recommended way to express Schema.org markup.
- **Schema.org** — Shared vocabulary of types/properties (Person, Organization, Article, etc.) used in structured data.
- **Person** — Schema for an individual: name, jobTitle, url, sameAs, knowsAbout, worksFor, address.
- **ProfilePage** — Google-documented page type for personal profiles; complements Person and is used for creator/entity identity.
- **Organization** — Schema for a company/institution (e.g. employer, client company); linked from Person via `worksFor`.
- **BlogPosting** — Schema for a blog article; includes headline, datePublished, dateModified, author, publisher, image.
- **Article** — Generic article schema; used here for case studies.
- **BreadcrumbList** — Schema for breadcrumb navigation breadcrumb rich results.
- **FAQPage** — Schema marking up Q&A; visual rich result deprecated May 2026, but Google still uses it for page understanding and AI-Overview relevance.
- **CollectionPage** — Schema for listing pages (e.g. `/blog`, `/case-studies`).
- **Entity graph / @id** — Referencing identities (e.g. `#{site}/#person`) so schema types connect to each other rather than duplicate.
- **Rich result** — Enhanced SERP display enabled by structured data.

## Performance (Core Web Vitals / CWV)

- **Core Web Vitals (CWV)** — Google's user-experience signals measured from field data (75th percentile over 28 days).
- **LCP (Largest Contentful Paint)** — Load; good ≤ 2.5s.
- **INP (Interaction to Next Paint)** — Responsiveness; replaced FID in March 2024. Good ≤ 200ms.
- **CLS (Cumulative Layout Shift)** — Visual stability; good ≤ 0.1.
- **Field data vs lab data** — Field = real-user (CrUX/Search Console); lab = Lighthouse. Google scores field data.
- **TTFB** — Time To First Byte; portfolio target < 0.8s.

## Content & authority

- **E-E-A-T** — Experience, Expertise, Authoritativeness, Trustworthiness. For personal brands, Experience (first-hand project outcomes) is the primary differentiator.
- **Experience signal** — Verified first-hand project work (case studies, metrics, screenshots) that algorithms/AI can't fake.
- **Topical authority / topical cluster** — Interlinked content around one subject (e.g. "Next.js performance") signaling depth and improving relevance.
- **Pillar page** — A hub page for a topic that links to and is linked from supporting posts.
- **Internal linking** — Links between pages of the same site; distributes authority and builds the entity graph.

## AI search / GEO (Generative Engine Optimization)

- **GEO** — Optimizing to be cited by AI systems (AI Overviews, ChatGPT, Perplexity, Claude).
- **AI Overviews** — Google's AI-generated answers atop results; built on core ranking + the existing index.
- **llms.txt** — Plain-text file (per llmstxt.org) summarizing a site for LLM crawlers; optional for Google, useful for other AI systems.
- **llms-full.txt** — Extended sibling document with more complete content summaries.
- **Citation unit** — A self-contained answer/chunk AI systems can extract and cite; favors direct answers (~60 words), named author, dates, matching schema.
- **Schema-content mismatch** — When markup says one thing and visible text another; now a major trust killer for both Google and AI systems.

## SXO (Search Experience Optimization)

- **SXO** — Read the SERP backwards: match your page type and content to the searcher's intent and user story.
- **Page-type mismatch** — Building the wrong type of page for a query's dominant intent.
- **User story** — Who searches, what they want, what satisfies them; used to score each page's fit.

## This repo's files

- `src/lib/site.ts` — SITE_URL, `socialMetadata()` (canonical, OG, Twitter).
- `src/lib/schema.ts` — JSON-LD builders (Person, WebSite, BlogPosting, Article, BreadcrumbList, FAQPage, ProfilePage-to-add).
- `src/app/layout.tsx` — Global metadata + site-wide Person/WebSite JSON-LD.
- `src/app/sitemap.ts` / `src/app/robots.ts` — Generated sitemap and robots.
- `src/app/llms.txt/route.ts` — Serves `/llms.txt`.
- `src/app/twitter-image.tsx` / `src/app/opengraph-image.tsx` — Dynamic OG/Twitter cards via `next/og` (Satori).
- `rokyuddin-audit/` — Original audit artifacts (report, action plan, data JSON, findings/).