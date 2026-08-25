import type { MetadataRoute } from "next";
import { getAllPosts } from "@/features/blogs";
import { fetchCaseStudies } from "@/features/case-studies/lib";
import { SITE_URL } from "@/lib/site";

// Build-time date used for static pages that have no CMS-driven lastModified.
// Update this when you make significant changes to static page content.
const STATIC_PAGE_DATE = new Date("2026-08-25");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, caseStudies] = await Promise.all([getAllPosts(), fetchCaseStudies()]);

  const blogUrls = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const caseStudyUrls = caseStudies.map((caseStudy) => ({
    url: `${SITE_URL}/case-studies/${caseStudy.slug}`,
    lastModified: caseStudy.updatedAt ? new Date(caseStudy.updatedAt) : STATIC_PAGE_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: SITE_URL, lastModified: STATIC_PAGE_DATE, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: STATIC_PAGE_DATE, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: STATIC_PAGE_DATE, changeFrequency: "yearly" as const, priority: 0.6 },
    { url: `${SITE_URL}/blog`, lastModified: STATIC_PAGE_DATE, changeFrequency: "weekly" as const, priority: 0.9 },
    ...blogUrls,
    { url: `${SITE_URL}/case-studies`, lastModified: STATIC_PAGE_DATE, changeFrequency: "weekly" as const, priority: 0.9 },
    ...caseStudyUrls,
  ];
}
