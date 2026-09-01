import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/organisms/theme-provider";
import { Toaster } from "sonner";
import {
  SITE_URL,
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_NAME,
  DEFAULT_SOCIAL_IMAGE,
  GOOGLE_ANALYTICS_ID,
  GOOGLE_SITE_VERIFICATION,
} from "@/lib/site";
import { personJsonLd, websiteJsonLd, jsonLd } from "@/lib/schema";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  // Title template: child pages set title: "Page Name" and get "Page Name | Md Rokyuddin".
  // Use title: { absolute: "..." } to opt out of the template entirely.
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),

  // Root canonical — per-page metadata adds alternates.canonical via socialMetadata().
  alternates: {
    canonical: SITE_URL,
  },

  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "JavaScript",
    "UI Engineer",
    "Web Developer",
    "Portfolio",
    "Md Rokyuddin",
    "Rokyuddin",
  ],

  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",

  // Allow all crawlers by default; individual pages tighten via their own
  // metadata export (e.g. robots: { index: false } on /playground).
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Fallback OG/Twitter used by any route that does not define its own metadata
  // (error pages, the embedded Sanity Studio, etc.). Per-page generateMetadata
  // calls always override these, so landing/blog/case-study pages are unaffected.
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    type: "website",
    url: SITE_URL,
    locale: "en_US",
    images: [
      {
        url: DEFAULT_SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Frontend Developer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_SOCIAL_IMAGE],
    creator: "@itsrokyuddin",
  },
  ...(GOOGLE_SITE_VERIFICATION
    ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {/* Site-wide JSON-LD must be plain <script> elements rendered by this
            Server Component so it lands in static HTML. Using next/script
            <Script> (or RSC page elements) keeps it out of the served HTML —
            it only materialises client-side and is invisible to crawlers. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(personJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(websiteJsonLd()) }}
        />
        {/* <SmoothScroll> */}

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {/* <Suspense>
              <ChatWidget />
            </Suspense> */}
          <Toaster />
        </ThemeProvider>
        {/* Analytics: Google Analytics 4 only. Loads with the `lazyOnload`
            strategy — after the window load event and browser idle — so gtag.js
            (167 KiB, caused the two longest main-thread tasks in PageSpeed)
            never competes with hydration or the LCP image. */}
        {GOOGLE_ANALYTICS_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
              strategy="lazyOnload"
            />
            <Script id="ga4-init" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GOOGLE_ANALYTICS_ID}');
              `}
            </Script>
          </>
        )}
        {/* </SmoothScroll> */}
      </body>
    </html>
  );
}
