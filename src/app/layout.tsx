import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/organisms/theme-provider";
import { SmoothScroll } from "@/components/organisms/smoth-scroll";
import { ChatWidget } from "@/components/organisms/chat-widget";
import { Toaster } from "sonner";

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
  title: "Md Rokyuddin | Frontend Developer",
  description: "Frontend Developer specializing in React, Next.js, and TypeScript.",
  metadataBase: new URL("https://rokyuddin.vercel.app"),
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
        {/* </SmoothScroll> */}
      </body>
    </html>
  );
}

