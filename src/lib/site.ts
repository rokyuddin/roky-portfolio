/**
 * Central site-wide constants.
 * SITE_URL drives canonical/OG/sitemap/robots metadata.
 * Override at deploy time via NEXT_PUBLIC_SITE_URL (e.g. a custom domain).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://rokyuddin.vercel.app"
).replace(/\/+$/, "");

export const SITE_NAME = "Md Rokyuddin";
export const SITE_TITLE = `${SITE_NAME} | Frontend Developer`;
export const SITE_DESCRIPTION =
  "Frontend Developer specializing in React, Next.js, and TypeScript.";

export const DEFAULT_SOCIAL_IMAGE = "/twitter-image.jpg";

/**
 * Builds per-page social + canonical metadata.
 *
 * Declared per-page (NOT in the root layout) because rich metadata in the
 * root layout breaks static prerendering of the embedded Sanity Studio route
 * (`/sanity/[[...tool]]`) under Cache Components — the studio's
 * cookie-dependent `generateMetadata` conflicts with inherited layout
 * metadata.
 */
export function socialMetadata(params: {
  title: string;
  description: string;
  url: string;
  type?: "website" | "article";
  image?: string;
  /** Extra Open Graph fields (publishedTime, authors, tags, ...). */
  openGraphExtras?: Record<string, unknown>;
}) {
  const {
    title,
    description,
    url,
    type = "website",
    image = DEFAULT_SOCIAL_IMAGE,
    openGraphExtras,
  } = params;

  return {
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      siteName: SITE_NAME,
      type,
      url,
      locale: "en_US",
      images: [{ url: image }],
      ...openGraphExtras,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

