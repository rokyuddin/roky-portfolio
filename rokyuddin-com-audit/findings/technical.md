# Technical SEO Findings — rokyuddin.com

**Score: 72/100**

## What Works
- Clean URL structure: `/about`, `/blog`, `/case-studies/altseo` — no query params, no trailing slashes
- Bare domain `rokyuddin.com` properly 308-redirects to `www.rokyuddin.com`
- `robots.txt` allows all crawlers, blocks `/sanity`, declares sitemap
- XML sitemap at `/sitemap.xml` lists all 11 pages with `lastmod`, `changefreq`, `priority`
- All 11 sitemap URLs return HTTP 200
- HTTPS enforced with HSTS (`max-age=63072000`)
- Vercel + Cloudflare CDN with prerendered HTML (`x-nextjs-prerender: 1`)
- 404 returns correct HTTP 404 status (not soft 404)
- Google Analytics 4 loaded with `lazyOnload` strategy — doesn't block render

## Findings

### F1: Missing Security Headers — High
**Evidence:** `curl -sI` response contains only `strict-transport-security`. Missing: CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy.
**Impact:** Vulnerable to clickjacking, MIME-sniffing, injection. Google considers security a ranking signal.
**Fix:** Add `headers()` to `next.config.ts`:
```ts
async headers() {
  return [{
    source: '/(.*)',
    headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; img-src 'self' https://cdn.sanity.io data:; style-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self' https://www.google-analytics.com; frame-ancestors 'none'" },
    ],
  }];
}
```

### F2: No llms.txt — Medium
**Evidence:** `GET /llms.txt` returns 404.
**Fix:** Create `/public/llms.txt` with site summary and key URLs.

### F3: Static Asset Caching Suboptimal — Medium
**Evidence:** `/_next/static/chunks/*.js` cached for only 4h (`max-age=14400`). Content-hashed assets should be immutable.
**Fix:** Set `Cache-Control: public, max-age=31536000, immutable` for `/_next/static/*`.

### F4: No Preconnect/DNS-prefetch — Low
**Evidence:** No `<link rel="preconnect">` for `cdn.sanity.io` or `googletagmanager.com`.
**Fix:** Add to `app/layout.tsx`.

### F5: No .well-known/security.txt — Low
**Evidence:** Returns 404.
**Fix:** Create `/public/.well-known/security.txt`.
