# Performance Findings

**Target:** https://www.rokyuddin.com (homepage)
**Stack:** Next.js 16 (App Router, React 19) on Vercel, behind Cloudflare CDN.
**Method:** PageSpeed Insights v5 + CrUX (mobile, Lighthouse lab run, single mobile run). CrUX **returned no field data** — insufficient Chrome traffic volume for the origin to be eligible (see "Field data" note below). Lighthouse lab run succeeded on the 2nd attempt; the first returned `net::ERR_TIMED_OUT` (intermittent, not a real signal — Cloudflare/WAF throttling of the Lighthouse crawler on the first hit).

## Core Web Vitals (lab/field data)

### Lab (Lighthouse mobile, single run)

| Metric | Value | Rating (threshold) |
|--------|-------|--------------------|
| **LCP** | **4.7 s** (lab) — observed 2.8 s in trace | Poor (2.5 s) |
| **CLS** | **0** | Good (0.1) |
| **INP proxy (TBT)** | **310 ms** | Needs improvement (200 ms) |
| **Max Potential FID** | 230 ms | Needs improvement |
| FCP | 3.0 s | Poor (1.8 s) |
| Speed Index | 5.4 s | — |
| TTI | 4.7 s | — |
| Perf score | **68** | — |

**Field data (CrUX):** None. CrUX API returned *"No CrUX data for this origin. The site likely has insufficient Chrome traffic volume for eligibility."* and CrUX History returned the same. **There is no field CWV data for this origin yet** — typical for a young/low-traffic personal portfolio. This means there is no Google-indexed CWV signal to optimize or to risk; lab data is all we have. *Recommendation: once traffic grows past ~1k Chrome pageviews/28-day window, re-run CrUX to capture real INP/CLS field values (INP is not measurable in lab — only TBT proxy above).*

### LCP element

The LCP candidate is the **hero profile portrait** (`<img alt="Young professional man in black suit...">`, 350×450 portrait, served as `_next/image` at **w=750, transfer 33,399 B ≈ 33 KB**, from Sanity CDN). Findings:
- **It IS preloaded** (`<link rel="preload" as="image" imageSrcSet=...w=750...>`), so the LCP request starts early — good.
- **It is NOT prioritized:** no `fetchpriority="high"` on the `<img>`, and `decoding="async"`. On the lab run the LCP image finished around ~1.7 s but the *render* of the hero is gated behind JS hydration (React 19 RSC flight streaming — `__next_f` chunks arrive and evaluate before paint), so lab LCP was 4.7 s while the raw network LCP observed ~2.8 s. The gap = **JS evaluation / hydration delay pushing LCP**, not image download.
- Width/height are present (350/450) → no CLS from the LCP image.

### CLS status

**CLS = 0 (measured).** CLS risk is well-controlled:
- Every `next/image` has explicit `width`/`height`, or is `loading="lazy"` (below fold). The 3 case-study thumbnails use `sizes="100vw"` with **no explicit width/height**, but they are lazy-loaded and below the fold, so measured CLS stayed at 0. *Low risk* — if you ever make them eager, add `aspectRatio`/dimensions to avoid shift.
- Fonts use `next/font` with `font-display: swap` (default) — FOUT possible but the observed CLS of 0 means the swap is not causing measurable shift.
- The theme (light/dark) script runs inline in `<head>` and sets `colorScheme`/class synchronously before paint → no theme flash / no CLS.

### INP status (interaction)

No field INP available. Lab proxy: **TBT 310 ms**, **4 long tasks**, main-thread breakdown (mobile, ~3 s of work):
- Script Evaluation: **955 ms** (dominant)
- Style & Layout: 225 ms
- Script Parsing & Compilation: 154 ms
- Rendering: 67 ms, Parse HTML/CSS: 26 ms, GC: 25 ms

~1.24 MB of JS (resource) / 424 KB transferred. **INP risk is real**: the homepage hydrates a large React tree (skills, projects, experience, case studies, testimonials sections all streamed via RSC and then client-hydrated). The 955 ms of script evaluation and TBT of 310 ms mean the first user input after load is at risk of >200 ms on mobile. This is the metric to watch most as traffic grows.

## Resource Optimization

**Total: 731 KB transferred over 43 requests (mobile, lab).**

| Resource type | Requests | Transfer | % |
|---------------|----------|----------|---|
| **Script** | **18** | **424 KB** | **58%** |
| Image | 13 | 131 KB | 18% |
| **Font** | **3** | **130 KB** | **18%** |
| Document (HTML) | 1 | 17 KB | — |
| Stylesheet (CSS) | 1 | 15 KB | — |
| Other | 7 | 14 KB | — |
| Third-party | 3 | 180 KB | (subset) |

### JS (18 requests, 424 KB transferred / 1,237 KB un-minified resource size)

- The largest chunks: `746899ab284645e9.js` (202 KB resource / 66 KB xfer), `65b6da59c2d18730.js` (116 KB / 42 KB), `00d0022bc271611d.js` (119 KB / 34 KB), `97b141ee54646077.js` (49 KB).
- **Largest single bundle is the React/Next.js framework chunk (506 KB un-minified, 168 KB transferred)** — this is the App Router + RSC runtime + React 19. Hard to shrink further without changing framework.
- **Lighthouse "unused JavaScript" = ~116 KB savings potential.** Top offenders:
  - `gtag.js` (Google Analytics): **167 KB transferred, 70 KB (42%) unused** — biggest single waste.
  - `746899ab284645e9.js`: 25.7 KB unused (40%).
  - `65b6da59c2d18730.js`: **23.2 KB unused (57% wasted)** — a large share of this chunk is dead code on this page.
- **All JS loads with `async`** (no parser-blocking scripts in the critical path except the one stylesheet) — good. `bootup-time` = 1.0 s total for JS execution.
- **Legacy-JS detected:** `bc0763628bb77eaa.js` uses `Array.prototype.at` and a transpile target that Lighthouse flags (~14 KB savings if you set `target: es2020`/bump `swc` target in `next.config`). Low impact but free.
- Render-blocking: only **1 CSS stylesheet** (`ee11d9e6db16bac5.css`, 15 KB) → **159 ms** render-blocking (the `render-blocking-insight` = 150 ms). This is the single biggest *above-the-fold* timing cost in the critical path.

## Images & Fonts

### Images

- **All images are `next/image`** (optimized via Vercel Image CDN / `/_next/image`). No raw `<img src>` — good.
- Responsive: hero served at `w=384`/`w=750` (2x DPR), case studies at `w=750`, skill icons at `w=96`/`w=384`. `next/image` emits proper `srcSet`/`sizes`.
- **LCP image is preloaded but not `fetchpriority=high`** (see above). Add `priority` (Next auto-adds both preload + high priority when set) to the hero `<Image>`.
- **Lighthouse "image delivery" = ~69 KB savings potential.** Specifically:
  - Case-study thumbnails source from Sanity at **1536×1024 PNG** but are displayed ~750px / 500px — e.g. `df19f4e157...1536x1024.png` (34,886 B total, 29 KB wasted) and `609fcfe917...1536x1024.png` (22,446 B, 18.8 KB wasted). One source 500×500 displayed at 247×165 (18 KB wasted). **Fix: request smaller `w=` / crop in Sanity, or serve the image at the actual displayed size.** These are PNGs; converting to WebP/AVIF would cut the ~131 KB image payload substantially (next/image already serves WebP where supported — verify the `accept` negotiation is hitting the Vercel edge).
- 13 image requests total; hero is `priority`-adjacent (preloaded). Below-fold icons/thumbnails are correctly `loading="lazy"`.

### Fonts

- **`next/font` with 2 families: Inter (sans) + Playfair Display (serif display).** Self-hosted (no Google Fonts `<link>` — I confirmed there are **no `fonts.googleapis.com`/`fonts.gstatic.com` refs**; fonts are `/_next/static/media/*.woff2`). This is the correct, performant setup.
- **3 woff2 files, 130 KB transferred** (39.5 KB + 41.5 KB + 49.4 KB). All 3 are **`High` priority** and one is `isLinkPreload: true` — fonts are preloaded, so no FOIT.
- `font-display: swap` (next/font default) → FOUT possible on first paint but measured CLS=0, so it's not a visible issue.
- **Savings opportunity:** 130 KB for 2 families on a homepage is on the high side. Consider:
  - Limiting `Playfair Display` to the weights you actually use (a display serif is the heaviest — 49 KB file is likely its heaviest weight) and/or using `display: swap` (already). 
  - `next/font` `subset: ['latin']` to drop non-Latin glyph ranges (verify it's on) — can shave several KB off Inter.

## Third-Party Impact

**3 third-party requests, 180 KB transferred (25% of the page), 2 third-party origins:**

| Origin | Resource | Transfer | Note |
|--------|----------|----------|------|
| `googletagmanager.com` | `gtag.js` (GA4, id `G-3FVR1D6DJC`) | **167 KB** | Preloaded with `as=script` + **High priority** → it competes with your LCP image for the early connection. **70 KB (42%) unused JS.** |
| `google-analytics.com` | `g/collect` (pageview hit) | — | Fired ~2.8 s in. |
| `cloudflareinsights.com` | `beacon.min.js` (Cloudflare Web Analytics) | 11.7 KB | **Cache lifetime only 24 h** (`wastedBytes 4,686 B`) — minor, but it re-downloads daily. |
| `cdn-cgi/.../email-decode.min.js` | Cloudflare email obfuscation | 1.2 KB | Tiny. |

**GA4 (`gtag.js`) is the single largest third-party cost and the #1 unused-JS offender.** It is preloaded High-priority, which means it loads *before* your critical resources finish and can steal a connection slot from the LCP image. Options:
1. Load GA with `defer`/after idle (don't preload High), or
2. Keep a single GA tag but ensure it doesn't block main thread (it's 167 KB, 42% unused).
- **Double analytics:** you have **both** GA4 (`gtag`) **and** Cloudflare Web Analytics (`beacon.min.js`). For a personal portfolio, **one analytics tool is enough** — dropping GA4 would remove ~167 KB of third-party JS and the biggest TBT/INP contributor.

## Recommendations

1. **Prioritize the LCP hero image.** Add `priority` to the hero `<Image>` (Next.js auto-emits `fetchpriority="high"` + preload). It's already preloaded; adding `priority` removes the remaining LCP delay and protects it from GA4's High-priority preload stealing a connection.
2. **Cut or defer GA4.** Either (a) stop preloading `gtag.js` at High priority (load it deferred/after-load), or (b) remove GA4 and rely on Cloudflare Web Analytics alone. This is the single biggest win for LCP/TBT/INP (~167 KB JS, 70 KB unused, 1 connection slot).
3. **Shrink the case-study images.** Request smaller `w=`/crop from Sanity so the 1536×1024 PNG sources match their ~500–750 px display size; confirm WebP/AVIF delivery. ~69 KB transfer savings.
4. **De-duplicate/trim the 57%-waste JS chunk** (`65b6da59c2d18730.js`) and `746899ab284645e9.js` — review what pulls those in (likely a heavy dependency like a chart/animation lib or an icon set) and lazy-load it.
5. **Make the one render-blocking stylesheet lighter / ensure it's the only critical CSS.** At 15 KB / 159 ms it's the main FCP gate. Consider `next/font` + critical inline; the rest is fine as-is.
6. **Lower INP risk:** the 955 ms of script evaluation + 4 long tasks come from hydrating a large RSC page. Consider `next/dynamic` (with `ssr:false`) for below-the-fold interactive sections (case studies, testimonials) so first input isn't delayed by hydrating the whole page. Bump SWC `target` (fix the legacy-JS `Array.prototype.at`) to cut ~14 KB.
7. **Verify `subset: ['latin']`** on `next/font` for Inter/Playfair to trim ~130 KB of fonts.
8. **Re-run CrUX once traffic crosses the eligibility threshold** to capture field INP/CLS/LCP (the metrics that actually gate Google's CWV report badge).

## Priority

- **P0 (do first, biggest impact / low effort):**
  - Add `priority` to the LCP hero `<Image>`.
  - Stop preloading GA4 at High (or remove GA4 entirely, keep Cloudflare analytics).
- **P1 (high impact, moderate effort):**
  - Trim case-study image sizes (~69 KB); confirm WebP/AVIF.
  - De-duplicate the 57%-waste JS chunk; lazy-load below-the-fold interactive sections to cut INP/TBT.
- **P2 (polish):**
  - Bump SWC target (kill legacy-JS, ~14 KB).
  - `subset: ['latin']` on fonts.
  - Re-run CrUX for field CWV once eligible.

**Summary:** The homepage is structurally well-optimized for a Next.js 16 portfolio — all images are `next/image`, fonts are self-hosted via `next/font` with preloads and no Google Fonts dependency, CLS measures 0, and there is no field CWV data yet (low traffic, so no Google CWV signal to worry about). The weak spots are **LCP (4.7 s lab; the LCP hero image isn't marked `priority`/high-priority)** and **INP/TBT (310 ms, 955 ms script eval, 4 long tasks)** — driven by a large React hydration payload and, notably, by **GA4 (`gtag.js`, 167 KB, 70% of it unused JS, preloaded at High priority) stealing a connection slot from the LCP image and inflating main-thread time**. The three highest-leverage, lowest-effort fixes are: mark the hero image `priority`, stop High-priority-preloading GA4 (or drop it in favor of the Cloudflare analytics already present), and shrink the oversized 1536×1024 case-study images — together these address the LCP delay and a large share of the JS/main-thread cost.
