# Canonical host is www.rokyuddin.com

Roky Portfolio physically serves on `www.rokyuddin.com` (the bare `rokyuddin.com` host issues a 308 redirect to `www.` on every path, configured at the Vercel/Cloudflare layer). After a full SEO audit (2026-08-25) exposed that `SITE_URL` in `src/lib/site.ts` defaulted to the non-www host so every canonical, `og:url`, sitemap `<loc>`, `robots.txt` `Host:`, and Schema.org URL pointed at a URL that 308-redirects back to www, we decided to **standardize on `https://www.rokyuddin.com`** as the single canonical host: the `SITE_URL` default becomes `https://www.rokyuddin.com`, and the existing non-www → www 308 stays.

We chose **www** (not bare) because it is the host that already serves traffic and holds the deployment; canonicalizing to the sibling that only redirects would leave every declared canonical resolving through an extra hop. The rejected alternative — serving on bare `rokyuddin.com` (making it 200 and adding a `www → bare` 301) — was dropped as a higher-touch change with no benefit for a site already consolidated under www.

**Consequences:** The Google Search Console property to claim and monitor is `https://www.rokyuddin.com`; the submitted sitemap host must be www; `NEXT_PUBLIC_SITE_URL` at deploy should be set to `https://www.rokyuddin.com` to match this default.
