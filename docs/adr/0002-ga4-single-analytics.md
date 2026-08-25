# Single analytics provider: Google Analytics 4 (not Cloudflare)

Roky Portfolio previously had **two** analytics systems — Google Analytics 4 (via `next/script`, gated on the `GOOGLE_ANALYTICS_ID` env var) and Cloudflare Web Analytics (injected at the Cloudflare edge). A 2026-08-25 Core Web Vitals audit flagged that GA4's `gtag.js` was a notable third-party performance/INP cost. We evaluated cutting it in favor of Cloudflare alone, but the owner requires **GA4 as the single analytics source** (richer reporting and direct GA4–Search Console cross-referencing), so we instead keep GA4 and **disable Cloudflare Web Analytics**.

We decided:
- **Google Analytics 4 is the only analytics provider.**
- `gtag.js` loads via `next/script` with `strategy="afterInteractive"` — **deferred, not preloaded at high priority** — so it does not compete with the LCP hero image for the early connection (this preserves the Core Web Vitals win the audit wanted).
- `anonymize_ip: true` is set on the GA4 config.
- **Cloudflare Web Analytics is disabled in the Cloudflare dashboard** (it's edge-injected, not repo code, so there's nothing to remove from the repository).

**Consequences:** Enabling/disabling Cloudflare Web Analytics is a dashboard action outside this repo; if it ever needs to return, re-enable the Cloudflare site setting. GA4 replaces the Cloudflare-only setup, and the `GOOGLE_ANALYTICS_ID` env var must be set at deploy time for analytics to load.
