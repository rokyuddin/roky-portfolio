import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/organisms/theme-provider";
import { Toaster } from "sonner";
import {
  SITE_URL,
  SITE_TITLE,
  SITE_DESCRIPTION,
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
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
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
        {/* Analytics: Google Analytics 4 only. The @next/third-parties
            <GoogleAnalytics> component loads gtag.js asynchronously (not
            preloaded at high priority), so it doesn't steal the early
            connection from the LCP hero image — see
            docs/adr/0002-ga4-single-analytics. Cloudflare Web Analytics is
            disabled in the Cloudflare dashboard (edge-injected, not repo code). */}
        {GOOGLE_ANALYTICS_ID && (
          <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
        )}
        {/* </SmoothScroll> */}
      </body>
    </html>
  );
}

