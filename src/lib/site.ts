/**
 * Central site-wide constants.
 * SITE_URL drives canonical/OG/sitemap/robots metadata.
 * Override at deploy time via NEXT_PUBLIC_SITE_URL (e.g. a custom domain).
 *
 * Canonical host is `www.rokyuddin.com` (the host that serves traffic; the bare
 * host 308-redirects to www). See docs/adr/0001-www-canonical-host.md.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.rokyuddin.com"
).replace(/\/+$/, "");

export const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID;

export const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION;

export const SITE_NAME = "Md Rokyuddin";
export const SITE_TITLE = `${SITE_NAME} | Frontend Developer`;
export const SITE_DESCRIPTION =
  "Frontend Developer specializing in React, Next.js, and TypeScript.";

// `/twitter-image` is the dynamic route (Next.js file-convention route),
// returns image/png; `/twitter-image.jpg` (with extension) 404s.
export const DEFAULT_SOCIAL_IMAGE = "/twitter-image";

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
  image?: string | { url: string; alt?: string };
  /** Extra Open Graph fields (publishedTime, authors, tags, ...). */
  openGraphExtras?: Record<string, unknown>;
}) {
  const {
    title,
    description,
    url,
    type = "website",
    image: imageInput = DEFAULT_SOCIAL_IMAGE,
    openGraphExtras,
  } = params;

  const image =
    typeof imageInput === "string" ? { url: imageInput } : imageInput;

  return {
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      siteName: SITE_NAME,
      type,
      url,
      locale: "en_US",
      images: [image],
      ...openGraphExtras,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}

