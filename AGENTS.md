# AGENTS.md — Roky Portfolio

Personal portfolio for **Md Rokyuddin** (frontend dev). Built with **Next.js 16 (App Router)**, **TypeScript (strict)**, **Tailwind CSS 4**, and **Sanity CMS** as the content source of truth. Package manager is **pnpm**.

## Commands
- `pnpm dev` — dev server
- `pnpm build` — production build
- `pnpm start` — serve production build
- `pnpm lint` — ESLint (flat config, includes TS + core-web-vitals rules)
- `npx tsc --noEmit` — typecheck (strict; no dedicated typecheck script)
- There is **no test framework** in this repo.
- Sanity CLI available (`sanity`), config in `sanity.config.ts` / `sanity.cli.ts`.

## Project layout
- `src/app/` — App Router routes. Route groups/features: `(landing)/` (portfolio home), `blog/`, `case-studies/`, `playground/`, `api/`, and `sanity/[[...tool]]` (embedded Sanity Studio).
- `src/components/` — **Atomic Design** layers: `atoms/` (base UI primitives), `molecules/` (composite), `organisms/` (self-contained sections like `nav.tsx`).
- `src/features/` — **Feature-Sliced Design** per domain: `landing/`, `blogs/`, `case-studies/`, `playground/`. Each has `components/`, `lib/`, `types/`, `utils/`, re-exported via `index.ts`.
- `src/sanity/` — Sanity schemas (`schemaTypes/`), client (`lib/client.ts`), image helper (`lib/image.ts`), GROQ queries (`lib/queries.ts`).
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge) for combining classes.
- `scripts/migrate-content.ts` — one-off Sanity content migration (reads `.env.local`, needs `SANITY_API_TOKEN`).

## Path & import rules
- Path alias `@/*` → `./src/*` (configured in `tsconfig.json`). Use `@/` imports everywhere, never relative paths.
- Use `import type` for type-only imports (isolatedModules enabled).

## Data & caching (important)
- **Sanity is the source of truth** for profile, skills, experience, projects, testimonials, blog posts, and case studies. Query via GROQ in `src/sanity/lib/queries.ts` (typed with `defineQuery` from `next-sanity`).
- Client is `useCdn: false` (see `src/sanity/lib/client.ts`) and is meant for **ISR / tag-based revalidation**, not CDN caching.
- Data-fetching pages/functions use **Next.js 16 Cache Components**: `"use cache"` + `cacheLife(...)` + `cacheTag(...)`. Profiles are defined in `next.config.ts` (`'blog'` and `'case-studies'`) alongside `cacheComponents: true`.
- Landing page caches with tag `landing-page`; case studies with tags `case-studies` / `case-study-${slug}`.
- Revalidation is triggered by a **Sanity webhook** hitting `POST /api/revalidate` (defined in `src/app/api/revalidate/route.ts`), which validates `SANITY_REVALIDATE_SECRET` and calls `revalidateTag`. If editing data-fetching code, keep cache tags/lifetimes consistent with these.
- Images from Sanity must use `urlFor(...)` from `src/sanity/lib/image.ts`; only `cdn.sanity.io` is whitelisted in `next.config.ts` `images.remotePatterns`.

## Component & styling conventions
- Server components by default; add `'use client'` only for interactive/client-boundary pieces (e.g. `sanity.config.ts`, theme toggle, chat widget).
- Styling is **Tailwind CSS 4 CSS-first**: design tokens are CSS variables in `src/app/globals.css` (shadcn-style zinc theme: `--background`, `--foreground`, `--primary`, `--muted`, etc.). Use those tokens (e.g. `bg-background`, `text-foreground`, `selection:bg-primary`), don't hardcode hex colors.
- Dark/light mode via `next-themes` (`theme-provider.tsx`); motion via `motion` (Framer Motion); smooth scroll via `lenis`.
- Utils/shadcn-style components live in `src/components/atoms`/`organisms` (e.g. `button.tsx`, `input.tsx`).

## Gotchas
- `.env.local` is gitignored and contains secrets (`SANITY_API_TOKEN`, `SANITY_REVALIDATE_SECRET`, `NEXT_PUBLIC_SANITY_*`, `VERCEL_OIDC_TOKEN`, `GROQ_API_KEY`). Never commit or echo it.
- Case-study and blog data come from Sanity at runtime; the static `src/lib/data/portfolio-context.ts` holds legacy context data (some landing content may still reference it — check before assuming all data is CMS-driven).
- Sanity schema/image changes require content migration (`scripts/migrate-content.ts`) and Sanity Studio is embedded at `/sanity`.
- `src/app/api/chat` and `src/app/api/playground` use the Vercel AI SDK and external LLM keys (Groq/OpenAI/Google); API keys live in `.env.local`.
