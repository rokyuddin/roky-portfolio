# Implementation plan: custom ecommerce development cluster

This plan turns the keyword report into concrete on-site work for rokyuddin.com. The site is a Next.js 16 App Router portfolio. Content comes from Sanity CMS. New routes follow the existing structure in `src/app/`.

## Page-by-page plan

### New page: /services

Status: planned. This is the money page for the primary keyword.

- Route: `src/app/services/page.tsx`, a server component with static metadata.
- H1: "Custom ecommerce development services" (carries the primary keyword plus the strongest supporting keyword in one honest phrase).
- Page sections, in order:
  1. Hero: one sentence stating the offer. Custom ecommerce builds on Next.js for businesses in Bangladesh and worldwide remote clients.
  2. What you get: custom storefront development, headless commerce with Next.js, payment gateway integration (bKash, Nagad, Rocket, SSLCommerz for BD clients), courier integration (Pathao, Steadfast, RedX), performance work.
  3. AI automation services section: its own H2 targeting "ai automation services". Two or three concrete examples tied to ecommerce (order-status automation, support triage, product description generation). The site already has a working AI chat API, so this is provable, not claimed.
  4. Process: discovery, build, launch, support. Short, plain.
  5. Proof: links to case studies with one-line outcomes.
  6. FAQ: 4 to 6 questions in FAQ-friendly phrasing, including one naturally containing "ecommerce website development company in Bangladesh" (see restrictions below) and one about typical cost that links to the cost blog post.
  7. CTA: contact links (email, phone if published) plus a link into case studies.
- FAQPage JSON-LD for the FAQ block, following the schema helpers pattern in `src/lib/schema.ts`.
- Add `/services` to `src/app/sitemap.ts` with priority 0.9.

### Homepage: src/app/(landing)/page.tsx

Status: existing, small edits only.

- The hero positioning line gains the phrase "custom ecommerce development" once, naturally. One occurrence is enough on a page that already ranks for the brand.
- The projects section intro gets one sentence linking to /services for businesses that want a custom build.
- Do not stuff the keyword. The homepage's job is authority flow to /services and case studies.

### Case studies

Status: existing content, light edits.

- Each case study gets one closing CTA block: "Want a custom ecommerce build like this? See services." linking to /services.
- Project visuals get descriptive alt text via the CMS data (see alt text plan below).
- Where a case study describes an ecommerce build, its intro paragraph should say so in plain words. Case studies are the trust engine for the services page.

### Contact page

Status: existing, minimal change.

- One added line under the main content: for custom ecommerce development work, email or call directly. This catches visitors who arrive on /contact from the services page.

### Metadata plan

Titles at or under 60 characters, descriptions 140 to 160 characters. Drafts:

- /services title: `Custom Ecommerce Development Services | Md Rokyuddin` (52 chars)
- /services description: `Custom ecommerce development on Next.js. Payment and courier integrations for Bangladesh, headless builds for worldwide clients. See case studies.` (147 chars)
- Homepage description stays close to the current one in `src/lib/site.ts` but may gain "custom ecommerce" once: `Frontend developer in Dhaka building custom ecommerce sites with Next.js, TypeScript, and AI automation.` (105 chars, on the short side, extend with a proof clause if edited)

Rule: one keyword variant per page title. Never repeat the same variant across two pages' titles.

### URL structure decisions

- New URL: /services. Short, stable, no date or category segments.
- Existing URLs stay unchanged: /, /about, /contact, /blog, /case-studies, and all content slugs. Renaming URLs to fit keywords is a net loss; internal links and any earned backlinks break.
- Blog posts go under /blog/[slug] as usual. Slug suggestions: `custom-ecommerce-website-cost-2026` and `headless-ecommerce-nextjs`.

### Heading hierarchy plan

- One H1 per page. /services H1 contains the primary keyword. Homepage keeps its existing H1 (name and role), which should not compete with /services.
- H2s on /services map to the sections above: "What you get", "AI automation services", "Process", "Case studies", "FAQ".
- H3s only inside those sections for individual items. No heading skips levels, no heading used purely for styling.

### Internal linking plan

- Site navigation: add /services to the main nav in `src/components/organisms/nav.tsx`, between about and case studies.
- Footer: add a Services link alongside existing links.
- Homepage: one contextual link in the projects section intro, as described above.
- Case studies: one CTA block per case study linking to /services.
- /services links out to: 2 to 3 case studies (most relevant), /contact, and later the two blog posts once published.
- Blog posts link back to /services in the intro or conclusion, and to each other where topically related.
- Target: every page in the cluster is reachable from the nav or footer, and /services is at most one click from anywhere.

### Image alt text plan

- Project and case-study visuals get descriptive alt text through the CMS fields that already exist. Alt pattern: what the image shows plus the project context, for example "Dashboard of a custom ecommerce storefront built with Next.js for [project name]".
- Where the CMS item lacks an alt field value, the rendering component should fall back to the project title rather than an empty alt.
- Avoid keyword-only alt text ("custom ecommerce development custom ecommerce development"). Alt text describes the image; keywords appear only where they genuinely describe it.

## Content calendar

Two blog posts targeting the lowest-competition long-tails. One post per month after /services ships.

### Month 1: "Custom ecommerce website cost in 2026"

- Target: "custom ecommerce website cost" (live autocomplete completion).
- Angle: honest price ranges by build type, what changes the price, Bangladesh versus worldwide rate context, when a template is actually enough. Being the page that answers the cost question directly is the play; most competitors hide pricing.
- Links to /services and one relevant case study.

### Month 2: "Headless ecommerce with Next.js"

- Target: "headless ecommerce with Next.js" and "custom ecommerce website development" variant searches.
- Angle: what headless means in practice, when it is worth it, how the build works with Sanity as the content layer, performance results from the author's own case studies.
- Links to /services, the cost post, and a case study.

### After month 2

Re-run the validation step from the keyword report with real Search Console data. Write post 3 only if the cluster is showing impressions. Candidate topics: "ai automation services for ecommerce", "custom ecommerce website design services".
