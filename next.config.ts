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
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
            "img-src 'self' https://cdn.sanity.io data:",
            "style-src 'self' 'unsafe-inline'",
            "font-src 'self'",
            "connect-src 'self' https://www.google-analytics.com",
            "manifest-src 'self'",
            "frame-ancestors 'none'",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
          ].join('; '),
        },
      ],
    }];
  },
};

export default nextConfig;
