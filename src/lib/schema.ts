import type { BlogPost } from "@/features/blogs/types";
import { hasCoverImage } from "@/features/blogs/lib/cover";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * Structured data (JSON-LD) builders used across the app.
 * Return plain objects; render them in a <script type="application/ld+json"> tag.
 */

export function personJsonLd(image?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Md Rokyuddin",
    jobTitle: "Frontend Developer",
    url: SITE_URL,
    email: "rokyuddin.dev@gmail.com",
    ...(image ? { image } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jashore",
      addressCountry: "BD",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Frontend Development",
      "Web Performance",
      "Accessibility",
    ],
    sameAs: [
      "https://github.com/rokyuddin",
      "https://linkedin.com/in/itsrokyuddin",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: "Frontend Developer specializing in React, Next.js, and TypeScript.",
    publisher: { "@id": `${SITE_URL}/#person` },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function collectionPageJsonLd(params: {
  name: string;
  url: string;
  description?: string;
  items?: Array<{ name: string; url: string }>;
}) {
  const { name, url, description, items = [] } = params;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url,
    ...(description ? { description } : {}),
    ...(items.length
      ? {
          mainEntity: {
            "@type": "ItemList",
            itemListElement: items.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.name,
              item: item.url,
            })),
          },
        }
      : {}),
  };
}

export function blogPostingJsonLd(post: BlogPost) {
  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    // Always emit dateModified — fall back to datePublished when no updatedAt.
    dateModified: post.updatedAt ?? post.date,
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    ...(hasCoverImage(post.coverImage) ? { image: post.coverImage } : {}),
    ...(post.tags.length ? { keywords: post.tags.join(", ") } : {}),
  };
}

export function articleJsonLd(caseStudy: {
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  category?: string;
  heroImage?: string;
  updatedAt?: string;
}) {
  const url = `${SITE_URL}/case-studies/${caseStudy.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline: caseStudy.title,
    name: caseStudy.title,
    ...(caseStudy.subtitle ? { alternativeHeadline: caseStudy.subtitle } : {}),
    ...(caseStudy.description ? { description: caseStudy.description } : {}),
    ...(caseStudy.updatedAt ? { dateModified: caseStudy.updatedAt } : {}),
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    ...(caseStudy.category ? { articleSection: caseStudy.category } : {}),
    ...(caseStudy.heroImage ? { image: caseStudy.heroImage } : {}),
  };
}

export function faqPageJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

/** Render helper: serialize with JSON.stringify and minify safely for the DOM. */
export function jsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
