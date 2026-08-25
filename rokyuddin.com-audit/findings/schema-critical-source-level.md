# CONFIRMED CRITICAL FINDING — Source-Level Root Cause (Schema)

> Detected and verified by the orchestrator directly in the application source + served HTML.
> This supplements findings/schema.md produced by the schema specialist agent.

## Summary

Structured data is fragmented by page type. **Site-wide entity schema (Person + WebSite) AND collection-page schema (CollectionPage on `/blog` and `/case-studies`) never reach the served HTML** — they exist only in the React Server Components (RSC) flight payload and are injected client-side. Only **detail pages** (individual blog posts and case-study pages) emit real `<script type="application/ld+json">` tags into static HTML.

## Evidence (verified against live served HTML)

| Page | Real `<script type="application/ld+json">` in served HTML? | Schema in RSC flight payload only? |
|------|------|------|
| Homepage `/` (Person + WebSite from layout) | **0 tags** — ABSENT | Yes |
| `/blog` index (CollectionPage) | **0 tags** — ABSENT | Yes |
| `/case-studies` index (CollectionPage) | **0 tags** — ABSENT | Yes |
| `/blog/nextjs-performance-optimization` (BlogPosting) | **1 real tag** — PRESENT | No |
| `/case-studies/rydr` (Article + BreadcrumbList) | **1 real tag** — PRESENT | No |

## Root cause 1 — layout.tsx uses `next/script`

`src/app/layout.tsx` renders Person + WebSite via `<Script>` from `next/script` (client-injected), not a plain `<script>` element:

```tsx
import Script from "next/script";
<Script id="ld-person" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(personJsonLd()) }} />
<Script id="ld-website" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(websiteJsonLd()) }} />
```

`next/script` does not emit inline JSON-LD into SSR HTML. The data is serialized into `self.__next_f.push(...)` and rendered only after hydration.

## Root cause 2 — index pages stream via RSC (Cache Components) and collapse `<script>` into the flight payload

`src/app/blog/page.tsx` and `src/app/case-studies/page.tsx` correctly use a **plain `<script>` element**, yet the served HTML still has **0** real tags — the element is serialized into the RSC flight payload (`"type":"application/ld+json","dangerouslySetInnerHTML":{...}`) instead of being flushed to the document. Because these pages participate in Next.js 16 Cache Components / streaming (`'use cache'` + `cacheLife`, per AGENTS.md), the JSON-LD `<script>` does not get emitted into the static HTML the way it does on the detail pages.

## Fix

1. **layout.tsx**: replace the two `next/script` `<Script>` with plain `<script type="application/ld+json">` elements (server component), and remove the `next/script` import unless used elsewhere.
2. **blog/page.tsx + case-studies/page.tsx**: ensure the `CollectionPage` `<script>` is emitted into the served HTML — if the Cache-Component/streaming path is collapsing it into the RSC payload, hoist the JSON-LD to be rendered as static markup, or verify post-fix with `curl | grep 'application/ld+json'` to confirm real tags appear.

## Verification after fix

```bash
curl -s https://rokyuddin.com/ | grep -c 'script type="application/ld+json"'
# expect >= 2 (Person + WebSite) on the homepage
```

Then re-test with Google Rich Results Test.

**Severity: Critical** — site-wide and index-page structured data invisible to crawlers; blocks entity resolution, collection schema, and AI citation signals on all but the detail pages.
