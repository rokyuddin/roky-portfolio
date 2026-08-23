# Context Map

A starting map for navigating Roky Portfolio. Update this when a structural change makes it stale.

| Area | Responsibility | Key paths |
| --- | --- | --- |
| App routes | Next.js App Router pages, layouts, metadata, and API routes | `src/app/` |
| Landing feature | Portfolio home-page feature code | `src/features/landing/`, `src/app/(landing)/` |
| Blog feature | Blog listing and detail presentation | `src/features/blogs/`, `src/app/blog/` |
| Case-study feature | Case-study listing and detail presentation | `src/features/case-studies/`, `src/app/case-studies/` |
| Playground feature | Interactive playground UI and logic | `src/features/playground/`, `src/app/playground/`, `src/app/api/playground/` |
| Shared UI | Atomic and composite UI components | `src/components/atoms/`, `src/components/molecules/`, `src/components/organisms/` |
| Sanity integration | Schemas, typed GROQ queries, client, and image URL helpers | `src/sanity/` |
| Shared utilities | Framework-independent shared helpers and legacy context data | `src/lib/` |
| Cache invalidation | Sanity webhook and cache-tag revalidation | `src/app/api/revalidate/route.ts` |
| Configuration | Next, TypeScript, ESLint, Tailwind, and Sanity configuration | `next.config.ts`, `tsconfig.json`, `eslint.config.*`, `sanity.config.ts`, `sanity.cli.ts` |
| Content migration | One-off migration for Sanity content changes | `scripts/migrate-content.ts` |
| Agent workflow | Project guide, shared context, decision records, and local issues | `AGENTS.md`, `CONTEXT.md`, `docs/adr/`, `.scratch/` |
