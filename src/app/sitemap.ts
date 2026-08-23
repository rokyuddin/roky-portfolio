import type { MetadataRoute } from "next";
import { getAllPosts } from "@/features/blogs";
import { fetchCaseStudies } from "@/features/case-studies/lib";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, caseStudies] = await Promise.all([getAllPosts(), fetchCaseStudies()]);

  const blogUrls = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.date),
  }));

  const caseStudyUrls = caseStudies.map((caseStudy) => ({
    url: `${SITE_URL}/case-studies/${caseStudy.slug}`,
    ...(caseStudy.updatedAt ? { lastModified: new Date(caseStudy.updatedAt) } : {}),
  }));

  return [
    { url: SITE_URL },
    { url: `${SITE_URL}/blog` },
    ...blogUrls,
    { url: `${SITE_URL}/case-studies` },
    ...caseStudyUrls,
  ];
}
