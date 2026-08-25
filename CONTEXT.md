# Context

## Product

Roky Portfolio is the personal portfolio of Md Rokyuddin, a frontend developer. It presents portfolio work, case studies, blog posts, skills, experience, and contact paths for recruiters and prospective clients.

## Core terms

- **Landing page**: The portfolio home page and its sections.
- **Case study**: A detailed account of a project, including its challenge, solution, features, and media.
- **Blog post**: An authored article published from Sanity.
- **Sanity**: The CMS and source of truth for published profile, portfolio, blog, and case-study content.
- **Playground**: An interactive AI/code tooling area. It is not a primary acquisition page.
- **Revalidation webhook**: The Sanity-triggered `POST /api/revalidate` endpoint that invalidates tagged cached content.
- **Canonical host**: The single host the site standardizes on, `https://www.rokyuddin.com`. All canonicals, sitemap, robots and schema URLs use it; `SITE_URL` is its source of truth.
- **About page**: The `/about` route presenting Md Rokyuddin's background, credentials, tools, and approach (a trust/E-E-A-T surface for recruiters and clients).
- **Contact page**: The `/contact` route giving a contact form, email, phone, socials, and NAP. Distinct from the landing page's `#contact` anchor.
- **Site footer**: The persistent footer rendered on every route (including content pages) carrying contact + social links.

## Technical constraints

- Next.js 16 App Router with strict TypeScript, Tailwind CSS 4, and pnpm.
- Published content is fetched from Sanity and cached with Cache Components and cache tags.
- User interface components follow the Atomic Design directories under `src/components`; domain code follows Feature-Sliced Design under `src/features`.
- The `@/` path alias is required for application imports.

## Delivery workflow

- Work items are tracked locally as Markdown files in `.scratch/<feature>/issues/`.
- Keep implementation decisions and context aligned with this document and the ADRs in `docs/adr/`.
- Treat the existing `AGENTS.md` as the repository’s primary implementation guide.
