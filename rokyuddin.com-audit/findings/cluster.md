# Semantic Cluster Findings

Target: https://www.rokyuddin.com (Md Rokyuddin — Frontend Developer, React/Next.js/TypeScript)
Blog: https://www.rokyuddin.com/blog (3 posts) | Case studies: /case-studies (AltSEO, Skinsight, Rydr)

## Existing Post Analysis

The blog currently has only 3 posts, all published in November 2024, with no internal links
between them (each post only links "Back to Blog").

| Post | URL | Tags (Schema/BlogPosting) | Read time | Topic / Intent | Seed keyword | Competition |
|------|-----|--------------------------|-----------|----------------|--------------|-------------|
| **Modern Web Design Trends Shaping 2024** | `/blog/modern-web-design-trends-2024` | Design, UI/UX, Web Development | 5 min | Design trends (minimalism, dark mode, micro-interactions, glassmorphism) — editorial/"what's new" intent, informational | "web design trends 2024" | Medium (time-decaying, dated title) |
| **TypeScript Best Practices for Scalable Applications** | `/blog/typescript-best-practices` | TypeScript, Best Practices, Development | 7 min | TypeScript fundamentals (type safety, utility types, strict mode) — how-to/intent, informational | "typescript best practices" | **HIGH** (dominated by Microsoft, large dev blogs, official docs) |
| **Next.js Performance Optimization: A Complete Guide** | `/blog/nextjs-performance-optimization` | Next.js, Performance, React | 8 min | Next.js image optimization, code splitting, RSC/streaming, caching — how-to guide | "nextjs performance optimization" | **HIGH** (Vercel, official docs, large content sites) |

**Topic classification / coherency verdict:** The posts are **disconnected one-off posts, not a
coherent cluster.** They span three unrelated topical regions:
1. **Design/UI** (trends post) — no sibling supporting posts exist.
2. **TypeScript** — a head-term post with no supporting subtopic content.
3. **Next.js performance** — arguably the best-structured single post, but it is orphaned with no
   supporting "spoke" posts and no link out to relevant case studies.

There is **no pillar page** for any topic, and each post is a self-contained head-term attempt
rather than a spoke pointing to a pillar. The three posts don't reinforce one another, share no
cross-links, and don't build topical authority toward a single professional positioning.

**Content depth note:** All three are shallow for their target terms. The Next.js and TypeScript
posts are ~300–450 words of body copy despite the head terms they target; the design trends post
is 5 short sections. Depth is insufficient to out-rank authoritative competition.

## Cluster Opportunity

The site's **core professional positioning** (confirmed by the world-wide WebSite schema:
"Frontend Developer specializing in React, Next.js, and TypeScript", plus all three case studies
built on Next.js/TypeScript) gives a clear, defensible topical ownership theme:

> **Modern frontend engineering — React, Next.js, TypeScript, performance, and design engineering.**

The case studies give the single biggest credibility advantage competitors lack:
**proof (Rydr: Lighthouse 95+, load <2s, real-time tracking; AltSEO: Next.js 16 + AI/Supabase;
Skinsight: Next.js/TS recommendation engine).** Cluster architecture should route this authority
to both blog pillars and case studies — a hub-and-spoke that turns "I write tutorials" into
"frontend engineer who ships and documents real performance/product wins."

**Ranking reality check for the existing head terms:** "typescript best practices" and
"nextjs performance optimization" are **not realistic near-term ranking targets** for a small
portfolio site with minimal link authority. These should be treated as aspirational **pillar**
topics to build toward, NOT as first-mover content. Near-term wins come from **long-tail,
lower-competition spikes** (e.g., "next.js image optimization example", "react server components
vs client components", "typescript satisfies operator", "how to improve lighthouse score next.js").

## Recommended Content Architecture (hub-and-spoke)

Design 3–5 clusters mapped to the professional positioning. Each cluster = 1 pillar page
(broad, authoritative, internally linked) + 3–6 spoke posts (long-tail, winnable) that all link
up to the pillar. Spokes publish first (build topical authority), pillars later.

### Cluster 1 — Next.js (flagship, strongest authority via case studies)
- **Pillar:** `/blog/nextjs` — "The Complete Next.js Guide for Production Frontend Developers"
  (superset overview; eventually upgrade/promote the existing performance post into a dedicated
  performance pillar or fold it here).
- **Spokes (add):**
  - "How to Optimize Images in Next.js in 2025 (next/image practical guide)" — long-tail
  - "React Server Components vs Client Components: When to Use Which"
  - "Next.js App Router vs Pages Router: A Migration Guide"
  - "How We Scored 95+ on Lighthouse: A Real Next.js Performance Teardown" (links to Rydr + AltSEO)
  - "Next.js ISR and Caching Strategies Explained with Examples"
  - (Existing) "Next.js Performance Optimization: A Complete Guide" → refit as the performance
    pillar or fold tip-level detail into new spokes.
- **Case-study tie-ins:** Rydr (Next.js 14, Lighthouse 95+, <2s load) and AltSEO (Next.js 16).

### Cluster 2 — TypeScript
- **Pillar:** `/blog/typescript` — "TypeScript for React Developers: A Practical Guide".
- **Spokes (add):**
  - "TypeScript `satisfies` Operator Explained (with React examples)" — winnable long-tail
  - "How to Type React Props Like a Pro (Discriminated Unions)"
  - "TypeScript Utility Types Cheat Sheet: Pick, Omit, Partial, Record"
  - "TypeScript strict mode: what it actually enables and why it matters"
  - (Existing) "TypeScript Best Practices for Scalable Applications" → keep as a spoke/overview
    that links to the pillar.

### Cluster 3 — Frontend Performance (Core Web Vitals)
- **Pillar:** `/blog/frontend-performance` — "Web Performance Guide: Core Web Vitals, Metrics and
  How to Fix Them" (feeds powerfully off the Rydr Lighthouse 95+ result).
- **Spokes (add):**
  - "How to Improve Lighthouse Performance Score (A Checklist)"
  - "Largest Contentful Paint (LCP) — what it is and how to fix it"
  - "Bundle Size Optimization: code splitting and dynamic imports without the hype"
  - "CSS and Font Loading Performance: font-display, preloading, and layout shift"
  - (Existing) "Next.js Performance Optimization" could either live here or stay in Cluster 1.

### Cluster 4 — React
- **Pillar:** `/blog/react` — "Modern React: Hooks, Data Fetching, and Component Architecture".
- **Spokes (add):**
  - "React useEffect cleanup patterns (and when you don't need it)"
  - "React 19 Actions and Server Functions: what changed"
  - "React state management in 2025: Zustand vs Redux vs server state" (ties to Rydr using Zustand)
  - "useMemo vs useCallback: a practical, no-hype comparison"

### Cluster 5 — Design Engineering (differentiation; catches the existing design post)
- **Pillar:** `/blog/design-engineering` — "Design Engineering: Bridging UI Design and Frontend
  Development".
- **Spokes (add):**
  - (Existing) "Modern Web Design Trends Shaping 2024" → **retitle to remove "2024"** (time-decaying)
    and recast as a spoke, e.g. "Web Design Trends That Actually Matter for Frontend Engineers"
  - "Dark Mode Design: implementing accessible, theme-aware UI in React"
  - "Micro-interactions and Motion: when animation improves UX (and when it hurts)"
  - "Design Systems in Code: tokens, Tailwind, and shadcn/ui patterns"

## Internal Linking Strategy

Goal: distribute authority from the highest-authority pages (case studies + homepage) into the
blog cluster, and let the cluster concentrate relevance back on the pillar pages, which then
convert it into the professional positioning.

**1. Links you can build today (no new content needed):**
- From the **Rydr case study** → link to "Next.js Performance Optimization" and the future
  frontend-performance pillar (it already claims Lighthouse 95+ / <2s, a natural hook).
- From **AltSEO** → link to the Next.js cluster (it is Next.js 16 + App Router).
- From **Skinsight** → link to the TypeScript cluster (Next.js + TypeScript).
- Add a **"Related reading"** block to each blog post pointing to its pillar + 2 sibling spokes;
  add a **"Brødcrumb" / category** navigation on the blog index so clusters are visible.

**2. Hub-and-spoke link matrix (every spoke ↔ pillar, spokes → 2–3 related siblings):**
```
[Next.js pillar]     <—  all Next.js spokes link up
[TypeScript pillar]  <—  all TypeScript spokes link up
...and spokes cross-link between clusters where topics overlap
(e.g., "Next.js Performance" ↔ "Frontend Performance" pillar ↔ TypeScript when typing is involved).
```

**3. Homepage → blog / positioning:**
- The homepage currently links to `/blog`, `/case-studies`, `/playground` via nav only. Add
  context-rich links in the About/Projects section: e.g., the Rydr result ("95+ Lighthouse —
  see how I optimize Next.js" → performance pillar) and a "Latest from the blog" strip.
- Ensure the homepage's strongest internal-anchor text ("React", "Next.js", "TypeScript",
  "performance") links to the corresponding pillars, not just a generic "Blog".

**4. Anchor-text discipline:** use descriptive anchors ("Next.js performance optimization",
"TypeScript utility types", "Lighthouse performance") rather than "click here" / post titles
verbatim everywhere. Keep 1 pillar per cluster as the concentrated target (avoid splitting link
equity across near-duplicate sibling page targets).

**5. Future-proofing:** once spokes rank, link them into case studies' "related projects" and
promote spokes in the case-study "results" narrative (metrics as link-worthy proof).

## Recommendations

1. **Stop publishing isolated head-term posts.** Every new post belongs to one of the 5 clusters
   above and links to its pillar. Head terms on a young domain are wasted effort without spokes.
2. **Publish spokes before pillars.** Start with the 4–5 most winnable long-tail spokes across
   the Next.js and TypeScript clusters (image optimization, RSC vs Client, `satisfies`,
   typing React props). These can realistically rank and begin building the domain authority the
   head-term pillars will later need.
3. **Deepen the existing posts.** The Next.js and TypeScript posts are thin for their target
   terms — expand them with working code, real tradeoffs, and the case-study metrics, or fold
   them into the applicable pillar so they aren't competing with brand-new pillars.
4. **Fix the time-decaying title.** Retitle/deprecate "Modern Web Design Trends **2024**" — dated
   head terms die; the design conversation is better served as a design-engineering spoke.
5. **Wire internal links immediately** (Recommendation section 1) — zero-content-cost authority
   redistribution from the strongest pages (case studies, homepage) into the blog.
6. **Prioritize realistically.** Do NOT expect "typescript best practices"/"nextjs performance
   optimization" to rank in the near term. Measure progress via long-tail rankings, then earned
   links, then head terms over 6–12 months.

## Priority

1. (Now) Internal-link existing pages: case studies → blog/pillars, blog posts → related reading,
   homepage → topic pillars. Low cost, immediate authority flow.
2. (Now) Retitle/recast the 2024 design post and deepen the thin Next.js + TypeScript posts enough
   to be credible pillars/spokes.
3. (0–3 months) Publish 4–6 long-tail spokes: Next.js image optimization, RSC vs Client
   Components, App Router migration, TypeScript `satisfies`, typing React props, Lighthouse
   checklist. Each links to its pillar.
4. (3–6 months) Publish/promote the 5 pillar pages (Next.js, TypeScript, Frontend Performance,
   React, Design Engineering) once spokes give them link equity.
5. (Ongoing) Add spokes to the React/Design clusters for breadth; keep every post linked.

---

**Summary:** The blog's 3 posts (a 2024 design-trends editorial, a TypeScript head-term post, and a
Next.js performance guide) are disconnected one-off head-term attempts that form no pillar/spoke
structure and target terms a young domain cannot realistically win — holding back the site's
clearest topical ownership: modern frontend engineering with React, Next.js, and TypeScript, a
position backed by three real case studies (Rydr, Skinsight, AltSEO). The fix is a hub-and-spoke
architecture of 5 clusters (Next.js, TypeScript, Frontend Performance, React, Design Engineering),
with pillars built after winnable long-tail spokes, plus immediate internal linking that routes the
case studies' proven metrics (95+ Lighthouse, <2s load) and homepage authority into the cluster —
publishing spokes before pillars, deepening the thin existing posts, and retiring the dated 2024
design title — so that authority compounds instead of being diluted across isolated pages.
