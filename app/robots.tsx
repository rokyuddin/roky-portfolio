import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: "https://rokyuddin.vercel.app/sitemap.xml",
    host: "https://rokyuddin.vercel.app",
  };
}