import { MetadataRoute } from "next";
import { getAllPosts } from "@/features/blogs";
import { getAllCaseStudySlugs } from "@/features/case-studies";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const caseStudySlugs = await getAllCaseStudySlugs();

  const blogUrls = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const caseStudyUrls = caseStudySlugs.map((slug) => ({
    url: `${SITE_URL}/case-studies/${slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/blog`, lastModified: new Date() },
    ...blogUrls,
    { url: `${SITE_URL}/case-studies`, lastModified: new Date() },
    ...caseStudyUrls,
    { url: `${SITE_URL}/playground`, lastModified: new Date() },
  ];
}
