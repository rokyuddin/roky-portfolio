import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { ThemeProvider } from "@/components/organisms/theme-provider";
import { SmoothScroll } from "@/components/organisms/smoth-scroll";
import { ChatWidget } from "@/components/organisms/chat-widget";
import { Toaster } from "sonner";
import {
  SITE_URL,
  SITE_TITLE,
  SITE_DESCRIPTION,
  GOOGLE_ANALYTICS_ID,
  GOOGLE_SITE_VERIFICATION,
} from "@/lib/site";
import { personJsonLd, websiteJsonLd, jsonLd } from "@/lib/schema";
import Script from "next/script";

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
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(personJsonLd()) }}
        />
        <Script
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
        {GOOGLE_ANALYTICS_ID && (
          <Suspense>
            <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
          </Suspense>
        )}
        {/* </SmoothScroll> */}
      </body>
    </html>
  );
}

