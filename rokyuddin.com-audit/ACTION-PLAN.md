# SEO Action Plan — rokyuddin.com

**SEO Health Score:** 61/100 · **Audit date:** 2026-08-25 · **Business type:** Personal portfolio (Frontend Developer)
Priorities: **Critical** (fix immediately) → **High** (within 1 week) → **Medium** (within 1 month) → **Low** (backlog).
Approximate effort shown per item. All references to `src/` are relative to the repo at `/home/roky/work/personal/roky-portfolio`.

---

## 🔴 CRITICAL — Fix immediately

### C1. Make site-wide structured data visible (highest-impact fix, ~5–10 min)
`layout.tsx` renders Person + WebSite schema via `next/script` `<Script>`, which never emits server HTML — the JSON-LD only lives in the RSC flight payload. The homepage and both index pages serve **zero** `<script type="application/ld+json">` tags (verified live).
- **Action:** In `src/app/layout.tsx` (lines 54–63) replace the two `<Script id="ld-person">` / `<Script id="ld-website">` with plain `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(personJsonLd()) }} />` (and same for website). Remove `import Script from "next/script"`.
- **Verify:** `curl -s https://rokyuddin.com/ | grep -c 'script type="application/ld+json"'` → expect ≥2. Then Google Rich Results Test + Schema.org validator.
- **Also verify** `/blog` + `/case-studies` index `CollectionPage` schema flushes to static HTML (it uses plain `<script>` but collapsed under Next.js 16 Cache Components/streaming). If not, hoist the JSON-LD to static markup.

### C2. Resolve the www/non-www canonical conflict (~10 min + GSC)
The site serves on `www.rokyuddin.com`, but `SITE_URL` (default non-www in `src/lib/site.ts`) drives every canonical, sitemap `<loc>`, robots `Host:`, OG URL, and schema URL to `https://rokyuddin.com` — which **308-redirects back to www**. Self-contradicting.
- **Action:** Set `NEXT_PUBLIC_SITE_URL=https://www.rokyuddin.com` at deploy (or change the `site.ts` default), keep the non-www → www 308. This fixes canonicals, sitemap, robots, OG, and schema URLs in one move.
- **Follow-up:** Resubmit the sitemap in Search Console and confirm ownership of the `https://www.rokyuddin.com` property.

### C3. Fix the broken default social image (~5 min)
`DEFAULT_SOCIAL_IMAGE = "/twitter-image.jpg"` → 404 (real route is `/twitter-image`). Breaks `og:image`/`twitter:image` on 6 pages.
- **Action:** Change to `/twitter-image` (no extension) in the social-image config. Verify with a link-preview / `curl -I`.

---

## 🟠 HIGH — Within 1 week

### H1. Improve mobile LCP (4.7s POOR) — biggest performance win
- Add `priority` (→ `fetchpriority="high"`) to the hero `<Image>`; it's preloaded but not prioritized.
- Stop `gtag.js` being preloaded at High priority (defer it / load after idle), or **drop GA4 entirely** and keep the Cloudflare Web Analytics already present (double-analytics redundancy costs ~180KB + a connection slot).
- Trim ~116KB of flagged unused JS; lazy-load below-the-fold interactive sections with `next/dynamic` to cut TBT/INP (955ms script eval, 4 long tasks).

### H2. Add About + Contact pages and a persistent footer
Missing About/Contact pages + no footer on content pages means "Get in Touch" dead-ends on blog/case-study pages (links to a homepage-only `#contact` anchor). Foundational E-E-A-T/trust gap.
- Add `/about` (narrative, credentials, tools, resume, approach) + `/contact` (form, email, phone, socials, NAP).
- Add a **site-wide footer** with contact + social links on every page; fix "Get in Touch" links on content pages.

### H3. Refresh or honestly re-scope the blog
All 3 posts are Nov 2024 stubs (~135–200 words claiming "5–8 min read"); "Modern Web Design Trends 2024" is structurally obsolete.
- **Either** refresh to 2026-dated, deep (1,500–2,500 word) posts with real code + first-person data, **or** soft-remove the 2024 trends post and the two stubs from the visible blog until they meet depth.
- Retitle/deprecate the "2024" post; add `dateModified`; make posts citable (numbers, benchmarks, before/after).

### H4. Fix or fill the empty Testimonials section
Homepage renders "04 Client Testimonials" with `testimonials:[]`. Either fill with 2–3 named, role-attributed testimonials, or remove the section.

---

## 🟡 MEDIUM — Within 1 month

### M1. On-page hygiene
- Remove duplicate H1 on each blog post (keep exactly one) and the duplicate in-body H1.
- Write distinct meta descriptions per URL (case-study pages currently duplicate the description across homepage card + index card + page).
- Add an H1 + short intro to the Playground page.

### M2. Correct + complete the schema layer (do after C1)
- Convert case-study `@type: Article` → `TechArticle` (+ `datePublished`).
- Add `BreadcrumbList` to detail + index pages (builders already exist in `src/lib/schema.ts`).
- Tie all `author`/`publisher` to a global `@id` (`https://rokyuddin.com/#person`); expand `Person.sameAs` (add X, dev.to); add `worksFor`, `knowsAbout`.
- Paste-ready JSON-LD is in `findings/schema.md`.

### M3. Back case-study metrics with evidence
Link/screenshot every "Results & Impact" metric (99.9% uptime, 100% accessibility, 10x) — Lighthouse reports, dashboards, analytics. Unverifiable claims hurt trust and AI citability.

### M4. Content architecture — hub-and-spoke clusters
Publish winnable long-tail **spokes before pillars** across 5 clusters (Next.js, TypeScript, Frontend Performance, React, Design Engineering). **Internal-link immediately** (zero content cost): Rydr/AltSEO/Skinsight case studies → relevant blog/pillars; add "Related reading" blocks. Full matrix + post titles: `findings/cluster.md`.

### M5. Add security headers
CSP, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy` (via `next.config.ts` headers or Cloudflare); add `includeSubDomains` + `preload` to HSTS once the www host is finalized.

### M6. AI-search readiness (GEO)
- Add homepage FAQ section + `FAQPage` schema (3–5 self-answering Q&A).
- Expand `llms.txt` with per-case-study metric summaries; **create `llms-full.txt`** (currently 404) with full bio + experience; add X to Contact.
- Extract blog code-fences from `<p>` into `<pre>/<code>`.

---

## 🟢 LOW — Backlog

- **Domain migration hygiene:** re-claim/redirect `rokyuddin.vercel.app` (now 404, no redirect), replace the old URL in the `velora-ui` repo + social bios, and point high-authority profiles (GitHub, npm, LinkedIn, dev.to) at the canonical URL.
- **Backlink building:** leverage the open-source `velora-ui` library + technical blog to earn 1–2 genuine editorial links; measure long-tail rankings first, then head terms over 6–12 months.
- **Image & font polish:** request smaller `w=`/crop from Sanity for case-study thumbs (~69KB); compress the ~1MB homepage OG image; confirm WebP/AVIF; `next/font` `subset:['latin']`; bump SWC `target` to kill legacy JS (~14KB).
- **Remove the `Host:` line** from robots.txt (ignored by Google/AI; keep `Sitemap:`).
- **Monitoring:** re-run CrUX once traffic exceeds eligibility (~1k Chrome pageviews/28 days); connect GSC when credentials are available; use this report as a drift baseline for re-auditing after the critical fixes ship.

---

## Suggested 4-phase rollout

| Phase | Timeframe | Focus |
|-------|-----------|-------|
| **1: Critical** | Week 1 | C1 schema fix, C2 canonical/www, C3 social image |
| **2: High-Impact** | Weeks 2–3 | H1 mobile LCP, H2 About/Contact/footer, H3 blog, H4 testimonials |
| **3: Content & Authority** | Month 2 | M-cluster build-out, schema completion, metrics sourcing, security headers, GEO |
| **4: Monitor & Iterate** | Ongoing | CrUX/GSC field data, link building, re-audit baseline |

*Effort/prices are estimates. This plan targets the two critical defects first because they each carry outsize SEO cost on a site whose experience/content fundamentals are otherwise strong.*
