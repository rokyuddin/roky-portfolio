import type { BlogPost } from "@/features/blogs/types";
import type { CaseStudy } from "@/features/case-studies/types";

/**
 * llms.txt / llms-full.txt content builders (spec: https://llmstxt.org/).
 *
 * Pure functions — the routes fetch the same data the site already uses and
 * pass it in, so these files can never drift from what the site actually says.
 * Kept free of HTML; markdown links use absolute URLs only.
 */

export interface LlmsData {
  siteName: string;
  siteUrl: string;
  description: string;
  posts: BlogPost[];
  caseStudies: CaseStudy[];
}

/** Strip stray HTML tags / code ticks so LLM consumers get clean plain text. */
function clean(text: string): string {
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/`/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function absoluteUrl(siteUrl: string, path = ""): string {
  const joined = `${siteUrl}/${path}`.replace(/\/+/g, "/");
  return path ? joined : siteUrl;
}

const PAGE_DESCRIPTIONS: Record<string, string> = {
  "/": "Portfolio landing — hero, tech stack, projects, testimonials, and contact.",
  "/about": "Profile — bio, core focus, experience, tech stack, and FAQ.",
  "/blog": "Frontend articles on React, TypeScript, Next.js, and production web work.",
  "/case-studies": "Detailed project write-ups: challenges, solutions, and results.",
  "/contact": "Contact page — reach Md Rokyuddin directly.",
};

const KEY_PAGES = ["/", "/about", "/blog", "/case-studies", "/contact"];

function keyPagesSection(siteUrl: string): string {
  return KEY_PAGES.map(
    (path) =>
      path === "/"
        ? `- [Homepage](${siteUrl}/): ${PAGE_DESCRIPTIONS[path]}`
        : `- [${path.slice(1)}](${siteUrl}${path}): ${PAGE_DESCRIPTIONS[path]}`,
  ).join("\n");
}

function blogSummaries(siteUrl: string, posts: BlogPost[]): string {
  if (!posts.length) return "_No posts yet._";
  return posts
    .map(
      (post) =>
        `- [${post.title}](${absoluteUrl(siteUrl, `blog/${post.slug}`)}): ${clean(post.excerpt)}`,
    )
    .join("\n");
}

function caseStudyHighlights(siteUrl: string, studies: CaseStudy[]): string {
  if (!studies.length) return "_No case studies yet._";
  return studies
    .map((study) => {
      const summary = clean(study.subtitle || study.overview.description || study.title);
      return `- [${study.title}](${absoluteUrl(siteUrl, `case-studies/${study.slug}`)}): ${summary}`;
    })
    .join("\n");
}

function contactSection(): string {
  return [
    "- Email: rokyuddin.dev@gmail.com",
    "- GitHub: https://github.com/rokyuddin",
    "- LinkedIn: https://linkedin.com/in/itsrokyuddin",
  ].join("\n");
}

function technologySection(): string {
  return "React, Next.js (App Router), TypeScript, Tailwind CSS, Sanity CMS, and the Vercel AI SDK.";
}

/** The compact, crawl-friendly file — one line per resource. */
export function buildLlmsTxt({ siteName, siteUrl, description, posts, caseStudies }: LlmsData): string {
  return [
    `# ${siteName}`,
    "",
    `> ${clean(description)}`,
    "",
    "## People",
    "",
    `- Md Rokyuddin (author): Frontend developer specializing in React, Next.js, and TypeScript, based in Jashore, Bangladesh. Available for freelance and full-time roles.`,
    "",
    "## Key pages",
    "",
    keyPagesSection(siteUrl),
    "",
    "## Blog",
    "",
    blogSummaries(siteUrl, posts),
    "",
    "## Case Studies",
    "",
    caseStudyHighlights(siteUrl, caseStudies),
    "",
    "## Contact",
    "",
    contactSection(),
    "",
    "## Technology",
    "",
    technologySection(),
    "",
  ].join("\n");
}

/** The long-form file — richer per-resource summaries for deep representation. */
export function buildLlmsFullTxt({ siteName, siteUrl, description, posts, caseStudies }: LlmsData): string {
  const postBlocks = posts
    .map(
      (post) => `### ${post.title}

- URL: ${absoluteUrl(siteUrl, `blog/${post.slug}`)}
- Published: ${post.date}
- Read time: ${post.readTime}
- Tags: ${post.tags.join(", ") || "—"}

${clean(post.excerpt)}

${clean(stripHeadings(post.content)).slice(0, 900)}`,
    )
    .join("\n\n");

  const caseStudyBlocks = caseStudies
    .map((study) => {
      const metrics = study.results?.metrics
        ?.map((m) => `${m.label}: ${m.value}`)
        .join(", ");
      return `### ${study.title}

- URL: ${absoluteUrl(siteUrl, `case-studies/${study.slug}`)}
- Category: ${study.category}
- Role: ${study.overview.role}
- Duration: ${study.overview.duration}
- Tech stack: ${[...study.techStack.frontend, ...study.techStack.backend].join(", ")}
- Results: ${metrics || "n/a"}

${clean(study.overview.description)}`;
    })
    .join("\n\n");

  return [
    `# ${siteName} — Full Site Details`,
    "",
    `> ${clean(description)}`,
    "",
    `This document provides a deeper, structured representation of ${siteName}'s content for LLM crawlers, supplementing the compact llms.txt file.`,
    "",
    "## People",
    "",
    `- Md Rokyuddin (author): Frontend developer specializing in React, Next.js, and TypeScript, based in Jashore, Bangladesh. Available for freelance and full-time roles.`,
    "",
    "## Key pages",
    "",
    keyPagesSection(siteUrl),
    "",
    "## Blog",
    "",
    posts.length ? postBlocks : "_No posts yet._",
    "",
    "## Case Studies",
    "",
    caseStudies.length ? caseStudyBlocks : "_No case studies yet._",
    "",
    "## Contact",
    "",
    contactSection(),
    "",
    "## Technology",
    "",
    technologySection(),
    "",
  ].join("\n");
}

/** Rough markdown-heading strip so blog content reads as prose, not source. */
function stripHeadings(markdown: string): string {
  return markdown.replace(/^#{1,6}\s+/gm, "").replace(/^[-*]\s+/gm, "");
}