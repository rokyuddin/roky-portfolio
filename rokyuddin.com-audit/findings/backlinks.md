# Backlink Findings

**Target:** rokyuddin.com (and www.rokyuddin.com) — Md Rokyuddin, frontend developer portfolio
**Audit date:** 2026-08-25
**Credential tier:** Tier 0 (Common Crawl web graph + backlink verification crawler only; no Moz/Bing API)

## Data Available (note limitations)

**What I could retrieve (Tier 0 sources):**

| Source | Method | Result |
|---|---|---|
| Common Crawl web graph, release `cc-main-2026-jan-feb-mar` (latest) | `commoncrawl_graph.py` (streamed rankings + vertices index) | `rokyuddin.com`: **not found** in crawl, not in rankings, PageRank = null |
| Common Crawl web graph, same release | `commoncrawl_graph.py` | `rokyuddin.vercel.app`: **also not found** in crawl, not in rankings, PageRank = null |
| Domain registration | WHOIS (Cloudflare registrar) | `rokyuddin.com` **created 2026-08-19** — ~6 days old at audit time |
| Live HTTP behavior | curl -I/-L | `https://rokyuddin.com` → **308** → `https://www.rokyuddin.com` → **200** (Vercel + Cloudflare edge) |
| Old domain live check | curl -I | `https://rokyuddin.vercel.app` → **404 `DEPLOYMENT_NOT_FOUND`** (Vercel server header), no redirect anywhere |
| Archive of old domain | Wayback Machine CDX | Last good snapshot **2025-07-16** (status 200). No snapshots since → old deployment removed sometime after mid-July 2025 |
| Archive of new domain | Wayback Machine availability API | **Zero snapshots** for rokyuddin.com |
| GitHub profile (`rokyuddin`) | GitHub REST API | Confirmed **live backlink**: profile `blog` field = `https://rokyuddin.com` (link equity from github.com). Also: 42 public repos, `twitter: itsrokyuddin`, location Jessore, `velora-ui` open-source UI library repo |
| Organic web presence | Exa + WebSearch | New domain surfaced only on `websitelaunches.com` launch tracker. No blog/directory/forum/third-party links found. Old domain: no third-party backlinks found either (only Vercel preview URLs tied to the `velora` project) |

**What I could NOT retrieve / limitations:**

- **No Moz Domain Authority/Page Authority** (API not available in Tier 0). DA is estimated, not measured.
- **No exact referring-domain count.** Common Crawl's web graph gives only a binary "was the domain crawled / is it in the ranking index" signal — it does **not** enumerate which sites link to it. The `top-referrers` flag is a no-op in this version. So I cannot produce a backlink list beyond what I could confirm by direct lookup (GitHub profile).
- **No live verification of inbound anchor text / nofollow status** on the handful of plausible sources beyond GitHub's profile link.
- **No historical link velocity** — without Moz/Ahrefs/DataForSEO history, I can only infer the timeline from registration date + Wayback.
- Common Crawl's latest index (`cc-main-2026-jan-feb-mar`) is a quarterly crawl; a domain registered 2026-08-19 is **not yet expected** to appear in any CC release for months. Its absence is consistent with "too new," not necessarily "no links."

**Bottom line on data:** Both domains are invisible to Common Crawl's authority graph and have essentially zero third-party web presence. The only verifiable inbound link is github.com → rokyuddin.com. This is an extremely new, authority-poor domain — which is normal and expected for a personal portfolio.

## Domain Authority Estimate

- **Common Crawl PageRank: not ranked / null** (domain absent from ranking index).
- **Estimated Moz DA (extrapolated, not measured): ~1–5** — a brand-new .com with one referring domain (github.com) and no other third-party links will register in the bottom of the DA scale. DA on a 6-day-old domain is typically 0 until Google indexes and backlinks accumulate.
- **Referring domains (est.): 1 confirmed** (github.com). Possibly 2–3 more if LinkedIn profile field / Twitter bio link to it (LinkedIn/Twitter profile links are largely nofollow and carry little SEO weight).
- **Page-level authority:** every page on the site inherits the near-zero domain authority. No page has meaningful standalone authority yet.

This is the **norm** for a small personal portfolio — not a red flag. Portfolio sites almost never win rankings on backlinks alone; they rank on (a) being a low-competition personal brand and (b) direct/branded traffic. DA here matters far less than it does for a commercial site.

## Domain-Migration Risk (vercel.app -> com)

**This is the single most important finding of the backlink audit.**

- **Old domain is dead with NO redirect.** `https://rokyuddin.vercel.app` returns HTTP 404 (`DEPLOYMENT_NOT_FOUND` from Vercel's edge). It does **not** 301-redirect to `https://rokyuddin.com`. Any link, bookmark, or crawler path that still points at the old Vercel URL lands on a dead page.
- **No 301 means no authority transfer.** Whatever equity the old domain had (per Common Crawl, it was also never ranked, so minimal) cannot flow to the new domain. Google cannot consolidate the two properties because there is no redirect signal connecting them.
- **The migration was done "clean break," not "redirect."** The old Vercel deployment was deleted (404) and the new `.com` was registered fresh on 2026-08-19. The two are treated as unrelated by search engines.

**Impact assessment — mostly low, but with real cost:**
- **Authority loss: LOW.** Common Crawl shows the old domain was never in the ranking graph, so it never held significant PageRank to lose. This is the good news — the "damage" of a hard break is small because there was little to transfer.
- **Lost indexation & crawl history: MODERATE.** The old domain had Wayback activity (last 2025-07-16) and was deployed on Vercel. Any indexing Google/Bing had of the old site is now orphaned and will decay to 404s. Fresh start = fresh indexing latency.
- **Broken inbound links: MODERATE for personal profile.** The old URL may be embedded in:
  - Old Vercel preview URLs (e.g., `velora-git-...-rokyuddin.vercel.app` PR preview links) — these are ephemeral, low value.
  - The `velora-ui` repo's homepage field, which currently points to `velora-ui.vercel.app` (a *different* old subdomain) — that repo link does **not** point to the portfolio.
  - Any old LinkedIn post, GitHub contribution, or DM where Roky shared `rokyuddin.vercel.app`.
- **No 301 = users and crawlers who hit the old URL get a 404 and bounce.** For a personal portfolio, a few stale links are not catastrophic, but it's sloppy and loses the small bit of equity that did exist.

**Recommendation (mitigation):** Because Vercel's `*.vercel.app` deployment is gone, a true 301 from `rokyuddin.vercel.app` → `rokyuddin.com` can no longer be configured on the old Vercel project (the project is deleted). However:
1. **Reclaim/redirect if at all possible** — re-create a minimal Vercel project at `rokyuddin.vercel.app` (or a domain-forward) that issues a 301 to `https://rokyuddin.com`. Even a stub project that only returns a 301 recovers stale links and sends the "same site" signal. If Vercel no longer allows taking over the subdomain, this path is closed.
2. **Proactively replace the old URL everywhere it still exists:** the `velora-ui` repo homepage (`velora-ui.vercel.app`), GitHub profile (already updated — good), LinkedIn, Twitter (`@itsrokyuddin` bio), and any past LinkedIn posts/mentions that contain `rokyuddin.vercel.app`.
3. **Accept the loss where irrecoverable.** Since the old domain had negligible authority, the practical priority is fixing *user-facing* stale links (repo, socials), not chasing PageRank.

**Secondary technical note (not migration, but adjacent):** the new site's `<link rel="canonical">` points to `https://rokyuddin.com` (non-www) and `robots.txt` uses a non-www `Host:`/sitemap, yet the server 308-redirects `rokyuddin.com` → `www.rokyuddin.com`. Pages are *served* on `www` but *declare* canonical to non-www. This is a mild self-inconsistency: the canonical target immediately redirects back to www. It won't block indexing, but it's a crawl/consistency smell worth resolving — pick ONE canonical host (recommend **www**, matching where content actually serves) and make canonical, robots, sitemap, and the 301/308 all agree.

## Competitive Landscape

- **No SEO competitors for "personal portfolio" rankings** in the traditional sense — the search intent for a specific individual's name/alias is near-unique (brand query), not competitive commercial SERP.
- **The real competition is "noise," not competitors:** a name like "Rokyuddin" and the common name "Roky" collide with many unrelated people (Mohammed Ruknuddin, Md Rukhnuddin, other developers) in web search. Brand-search results can be diluted by similarly-named people and unrelated Vercel `.vercel.app` portfolio deployments of the same name.
- **The developer does have genuine authority assets to leverage (currently under-used for the portfolio):**
  - **GitHub (`rokyuddin`):** 42 public repos including `velora-ui`, an open-source Next.js/TypeScript/Tailwind UI component library with docs. GitHub is a high-authority domain and **already links to the portfolio** (the one confirmed backlink).
  - **Open-source presence (`velora-ui`):** a real, linkable asset. Open-source projects and "best of Next.js / React component library" roundups, dev.to writeups, and npm/package-directory listings are high-value backlink opportunities for a frontend developer.
  - **LinkedIn (`/in/rokyuddin`):** the primary professional profile; social profile, but drives brand awareness and referral traffic more than SEO equity.

**Takeaway:** the competitive bar for a personal portfolio is low, and the developer has one strong linkable asset (the open-source UI library) that is not yet being pointed at the portfolio. The opportunity is not "out-rank competitors" — it's "make the brand-query SERP unmistakably Roky's."

## Link-Building Roadmap

Realistic, portfolio-appropriate. Prioritize **high-authority domains that a developer naturally owns or can earn**, not link-farm spam.

**Phase 1 — Foundation & hygiene (weeks 1–2):**
1. **Fix the canonical/redirect consistency** (pick www as canonical, align robots/sitemap/308). Cheap, removes a crawl inconsistency.
2. **Redirect/replace the old `rokyuddin.vercel.app`:** if re-claimable, stub a 301 → `rokyuddin.com`. Update the `velora-ui` repo homepage away from `velora-ui.vercel.app` to point at the portfolio or the current project home.
3. **Point every profile bio at the one canonical URL** (`https://rokyuddin.com`): GitHub (done), LinkedIn, Twitter/X (`@itsrokyuddin`), dev.to, npm, stackoverflow profile, any freelance/profile sites (Upwork/Toptal/Fiverr if present).
4. **Set up monitoring:** add the site to Google Search Console (verify + submit sitemap), and if possible Bing Webmaster. Track indexing of the new domain.

**Phase 2 — Leverage existing high-authority assets (weeks 3–6):**
5. **Open-source / `velora-ui`:**
   - List the library on **npm** (if not already) → npmjs.com link (high-authority).
   - Submit to curated lists: "Awesome Next.js", "React component library" lists, dev.to / Hashnode "I built a UI library" post (blog with the repo linked back to the portfolio).
   - A dev.to / personal-blog post about building `velora-ui` that links `rokyuddin.com` is a genuine, relevant, high-value editorial backlink.
6. **Guest posts / dev blog:** write 1–2 solid technical posts (the existing blog pages — Next.js performance, TypeScript best practices, modern web design — are the raw material) on dev.to, Hashnode, or a relevant company blog. Each links the portfolio. This is the highest-ROI link type for a frontend developer.
7. **Conference/talk & podcast:** if Roky has given any talks/workshops, the event page + podcast episode page are durable, relevant backlinks.

**Phase 3 — Brand consolidation & long-tail (weeks 6–12):**
8. **Fix stale old-domain links** found via search (search `rokyuddin.vercel.app` to find any lingering external references and request replacements).
9. **Testimonials / client case-study pages:** the site has case studies (altseo, rydr, skinsight). Ask each project/client to link back from their site or LinkedIn — relevant, dofollow, and high-trust.
10. **Local/community:** Jessore-based; any local dev community, university, or meetup that lists members is a small but relevant link.
11. **Ongoing:** each new case study or published tool should get at least one relevant outbound-referencing mention (own blog + one external).

**What NOT to do:** paid link farms, PBNs, mass directory submission with thin pages, buying backlinks. For a personal portfolio these add risk (penalty/spam signals) with negligible upside. Quality and relevance > quantity.

## Priority

1. **HIGHEST — Fix the migration break (old 404 + no 301).** Reclaim/redirect `rokyuddin.vercel.app` → `rokyuddin.com` if possible, and replace the old URL in the `velora-ui` repo homepage and all social bios. *Rationale: it's the only active "leak" of existing authority/links, and it's user-visible (stale links 404). The authority at stake is small (old domain was never ranked), so this is about not leaving equity and trust on the table, not about rescuing a large DA.*
2. **HIGH — Canonical consistency on the new domain.** Align canonical/robots/sitemap/308 to a single host (recommend www). Cheap, removes a crawl inconsistency before the domain gains any weight.
3. **HIGH — Point all high-authority profiles at the canonical URL** and submit the site to Search Console. Establishes the index and the one confirmed strong backlink (GitHub) stays pointed at the right place.
4. **MEDIUM — Leverage `velora-ui` + blog for genuine editorial links** (npm listing, dev.to/Hashnode post, curated repo lists). Best long-term ROI for a frontend developer.
5. **LOW — Ongoing brand/link hygiene:** case-study client links, stale old-domain reference cleanup, community listings.

---

## Summary

`rokyuddin.com` is a ~6-day-old personal-portfolio domain with effectively **zero indexed authority**: both it and its predecessor `rokyuddin.vercel.app` are **absent from the latest Common Crawl web graph** (no crawl, no PageRank, no rankings), the old domain has **no Wayback history past mid-July 2025**, and the new domain has **no search presence, no Wayback snapshot, and no Wayback/archive footprint**. The only verifiable inbound link is the GitHub profile (`rokyuddin` → `rokyuddin.com`, a high-authority domain). **The headline risk is the migration itself:** the old Vercel deployment was deleted and now **404s with no 301 redirect**, so the two domains are treated as unrelated and any stale links to `rokyuddin.vercel.app` bounce. The practical downside is small (the old domain was never ranked, so little authority was lost), but it's a visible leak and a missed authority-transfer that should be closed by re-claiming/redirecting the old subdomain or at minimum replacing the old URL in the `velora-ui` repo and social profiles. The estimated DA is ~1–5 (unmeasured — no Moz API in this tier), which is normal for a new personal portfolio. The realistic path forward is not chasing PageRank but **making the brand query unmistakably Roky's**: fix the canonical/redirect hygiene, point every high-authority profile (GitHub, npm, LinkedIn, dev.to) at `https://rokyuddin.com`, and turn the existing open-source `velora-ui` library and technical blog into 1–2 genuine editorial backlinks.
