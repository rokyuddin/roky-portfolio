# Visual Findings

Target: https://www.rokyuddin.com (homepage)
Audit date: 2026-08-25
Method: Playwright headless Chromium screenshots (desktop, laptop, mobile) + static analysis of crawled HTML (`crawl/homepage.html`).

## Desktop Rendering

- Captured at 1920x1080 (1x). Rendered correctly. No horizontal overflow detected.
- Fixed top navbar present (`fixed top-0 left-0 right-0 z-50`) with brand logo, inline nav (Start, About, Projects, an "Explore" dropdown for Case Studies / Blog / Playground, Connect).
- Hero section fills the viewport (`py-40`, min-h-screen via flex-col justify-center). Content: eyebrow "HELLO, I AM", large serif H1 "Md Rokyuddin", intro paragraph, and two CTAs (VIEW WORK / VIEW RESUME).
- Right-hand profile portrait appears only on `lg:flex` screens (desktop). It is a 350x450px image with decorative corner brackets and a soft gradient; applies `grayscale` by default with a color hover.
- Below the fold: tech stack orbit graphic ("My Tech Stack"), Selected Works (AltSEO, Skinsight, Rydr), Competencies, Experiences, Testimonials (empty wrapper), Contact. Sections are laid out in a `max-w-4xl` centered column — a clean single-column editorial layout that scales well on wide screens.

## Mobile Rendering

- Captured at 375x812 device (rendered file 750x1624 at 2x). Rendered correctly, no horizontal scrolling observed.
- The dedicated portrait is hidden on mobile (`hidden lg:flex`); the hero becomes a single centered column of eyebrow / H1 / intro / stacked CTAs.
- Hero CTA buttons stack vertically (`flex sm:flex-row flex-col`), full-width tap targets with generous `px-8 py-4` padding — thumb-friendly.
- H1 scales down responsively (`text-5xl md:text-7xl lg:text-8xl`) and the line-height (`sm:leading-[0.9]`) keeps the split "Md" / "Rokyuddin" name compact on small widths.
- Section grids collapse to single column (`grid-cols-1 lg:grid-cols-12`, `md:grid-cols-2`, `md:grid-cols-3`); contact info cards stack cleanly.
- Font sizes are all responsive; body line lengths capped by `max-w-2xl` prose blocks.

## Above-the-Fold

- The H1 "Md Rokyuddin" IS present above the fold — it is server-rendered directly in the HTML (NOT delivered only via client-side streamed shells), which is correct and strong for SEO.
- Above-the-fold content block: eyebrow `HELLO, I AM` → H1 → intro paragraph ("A specialized Frontend Developer with 3+ years of experience...") → VIEW WORK / VIEW RESUME CTAs. Clear value proposition with a primary action and an immediately scannable role/experience signal.
- The profile image and logo are both `link rel="preload" as="image"` in `<head>`; neither is lazy-loaded (default/eager), which is appropriate because they are LCP-relevant.
- Minor note: the H1 renders the name across two lines via an explicit `<br/>`. Functionally fine, but a crawler/screen-reader sees the plain-text name "Md Rokyuddin" intact, so no SEO impact.

## Viewport/Meta

- `<meta name="viewport" content="width=device-width, initial-scale=1"/>` — present and correct in the head (the very first head element), enabling proper mobile scaling. No `user-scalable=no` / `maximum-scale` restrictions; users can pinch-zoom.
- `<meta name="next-size-adjust" content=""/>` (Next.js default) present — normal.
- `lang="en"` set on `<html>`; `meta charset="utf-8"` set.

## Screenshot Log

- Desktop (1920x1080): SUCCESS -> `screenshots/www_rokyuddin_com_desktop.png`
- Laptop (1366x768): SUCCESS -> `screenshots/www_rokyuddin_com_laptop.png`
- Mobile (375x812, 2x): SUCCESS -> `screenshots/www_rokyuddin_com_mobile.png` (rendered 750x1624)
- Tablet (768x1024): FAILED — page load timed out after 30,000ms (networkidle). This is a transient network/network-idle wait issue in the capture tool, not a layout defect; it was retried via the standalone script which still hit the 30s cap on tablet only. Desktop/laptop/mobile all captured cleanly on the same pass, so rendering is not viewport-dependent.
- Note: Playwright had to be installed ad-hoc (`pip install playwright` + `playwright install chromium`); the bundled `capture_screenshot.py` script was used successfully.

## Recommendations

- Retry/verify the 768x1024 tablet capture separately (e.g., with a longer timeout or `wait_until` other than `networkidle`), mainly to complete the screenshot set; no layout issue is suspected.
- Consider adding a visible `fetchpriority="high"` attribute on the LCP <img> (hero portrait and logo are preloaded, which is good; explicit fetch priority would reinforce the LCP).
- The fixed transparent navbar starts `bg-transparent` and only gains a background on scroll via JS. On a low-trust fetch where JS doesn't run, or at the very top over certain images, nav text contrast could be borderline. Recommend a subtle default background/blur or a CSS-only transition fallback for robustness.
- Testimonials section renders an empty wrapper (no entries in Sanity) — visually a blank "Client Testimonials" header with nothing under it. Either populate content or hide the section when the array is empty to avoid a sparse above/on-page visual.
- Mobile nav uses a proper slide-in drawer with `aria-label`s on the toggle and close buttons (good), but the drawer's open/close is driven by opacity/transform classes — ensure the drawer and its backdrop are keyboard-focusable and that focus is trapped/no background scroll occurs while open (client-side JS state; recommend a manual a11y pass).

## Priority

- High (visual/UX, not crawl-blocking): none urgent — the page renders correctly at desktop, laptop, and mobile with no overflow and a correct above-the-fold H1.
- Medium: transparent-nav contrast fallback; hide-or-fill empty Testimonials section; drawer focus/scroll-lock accessibility; tablet screenshot verification.
- Low: explicit `fetchpriority` on LCP image.

All captured screenshots are written to `/home/roky/work/personal/roky-portfolio/rokyuddin.com-audit/screenshots/`.
