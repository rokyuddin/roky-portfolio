# Performance Findings — rokyuddin.com

**Score: 70/100**

## What Works
- Next.js SSR/SSG with prerendered HTML (`x-nextjs-prerender: 1`)
- Vercel CDN with cache HIT (`x-vercel-cache: HIT`)
- Google Analytics uses `lazyOnload` strategy
- Font preloading via Next.js font optimization (3 woff2 preloaded)
- Cloudflare HTTP/2 + HSTS
- Stale-while-revalidate cache strategy (`x-nextjs-stale-time: 86400`)

## Findings

### F19: 15 External Scripts + 42 Inline Scripts — Medium
**Evidence:** Homepage loads 15 external JS files and 42 inline script blocks (41,504 chars / ~41KB). Only 1 preload directive.
**Impact:** Excessive script loading can delay LCP and increase TBT/INP.
**Fix:** Audit Next.js chunk strategy. Use `dynamic()` imports for below-the-fold components. The 42 inline scripts are likely RSC payload + hydration data (normal for Next.js App Router).

### F20: Only 1 CSS File — Info
**Evidence:** 1 CSS file (`/_next/static/chunks/fe025121a3b7f81b.css`). Standard Next.js behavior.
**Fix:** No action needed.

### F21: Homepage HTML is 104KB — Low
**Evidence:** Raw HTML response is 104,289 bytes. Typical for Next.js App Router with RSC payload.
**Fix:** Monitor LCP in the field. If slow, reduce Suspense boundaries or lazy-load below-the-fold sections.
