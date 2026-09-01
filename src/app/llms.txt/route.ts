import { SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * llms.txt — a machine-readable summary for LLM crawlers (ChatGPT, Perplexity,
 * Bing Copilot, etc.) to accurately represent this site.
 * Spec: https://llmstxt.org/
 */
export async function GET() {
  const body = `# ${SITE_NAME}

> ${SITE_NAME} is a personal portfolio and development project by Md Rokyuddin, a frontend developer specializing in React, Next.js, and TypeScript, based in Jashore, Bangladesh.

## People

- Md Rokyuddin (author): Frontend developer. Builds performant, accessible web apps with React, Next.js, and TypeScript. Available for freelance and full-time roles.

## Key pages

- [Homepage](${SITE_URL}/): Portfolio landing — hero, tech stack, projects, about, experience, testimonials, and contact.
- [Projects](${SITE_URL}/#projects): Selected frontend projects.
- [Case Studies](${SITE_URL}/case-studies): In-depth write-ups of projects including challenges, solutions, and results.
- [Blog](${SITE_URL}/blog): Technical articles on web design trends, TypeScript, and Next.js performance.
- [Playground](${SITE_URL}/playground): Interactive code playground for experimenting with snippets.

## Contact

- Email: rokyuddin.dev@gmail.com
- GitHub: https://github.com/rokyuddin
- LinkedIn: https://linkedin.com/in/itsrokyuddin

## Technology

Md Rokyuddin works with React, Next.js (App Router), TypeScript, Tailwind CSS, Sanity CMS, and the Vercel AI SDK.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
