import { SITE_URL } from "./site";
import type { BlogPost } from "@/features/blogs/types";

/**
 * Structured data (JSON-LD) builders used across the app.
 * Return plain objects; render them in a <script type="application/ld+json"> tag.
 */

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Md Rokyuddin",
    jobTitle: "Frontend Developer",
    url: SITE_URL,
    email: "rokyuddin.dev@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jashore",
      addressCountry: "BD",
    },
    sameAs: [
      "https://github.com/rokyuddin",
      "https://linkedin.com/in/rokyuddin",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Md Rokyuddin",
    url: SITE_URL,
    description:
      "Frontend Developer specializing in React, Next.js, and TypeScript.",
  };
}

export function blogPostingJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author.name || "Md Rokyuddin",
    },
    ...(post.coverImage && post.coverImage !== "/placeholder-blog.jpg"
      ? { image: post.coverImage }
      : {}),
    ...(post.tags?.length ? { keywords: post.tags } : {}),
  };
}

export function articleJsonLd(caseStudy: {
  title: string;
  subtitle?: string;
  description?: string;
  category?: string;
  heroImage?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.subtitle || caseStudy.title,
    name: caseStudy.title,
    description: caseStudy.description || undefined,
    author: {
      "@type": "Person",
      name: "Md Rokyuddin",
    },
    ...(caseStudy.category ? { articleSection: caseStudy.category } : {}),
    ...(caseStudy.heroImage ? { image: caseStudy.heroImage } : {}),
  };
}

/** Render helper: serialize with JSON.stringify and minify safely for the DOM. */
export function jsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
