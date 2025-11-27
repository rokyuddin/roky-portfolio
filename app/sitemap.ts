import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://rokyuddin.vercel.app"; // Replace with actual domain
  const posts = await getAllPosts();

  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
    ...blogUrls,
  ];
}
