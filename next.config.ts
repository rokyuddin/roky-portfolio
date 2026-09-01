import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    landing: {
      stale: 86400, // 1 day — Sanity webhook revalidates `landing-page` tag on publish
      revalidate: 604800, // 1 week background refresh
      expire: 2592000, // 30 days hard expiry
    },
    blog: {
      stale: 3600, // 1 hour
      revalidate: 7200, // 2 hours
      expire: 86400, // 1 day
    },
    'case-studies': {
      stale: 3600, // 1 hour
      revalidate: 7200, // 2 hours
      expire: 86400, // 1 day
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
