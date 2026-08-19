import { Suspense } from "react";
import type { Metadata } from "next";
import { Nav } from "@/components/organisms/nav";
import {
  CachedHero,
  CachedTechStack,
  CachedProjects,
  CachedAbout,
  CachedExperience,
  CachedTestimonials,
  CachedContact,
} from "@/features/landing/cached-sections";
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION, socialMetadata } from "@/lib/site";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  ...socialMetadata({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  }),
};

export default function Portfolio() {
  return (
    <div className="bg-background selection:bg-primary min-h-screen font-sans text-foreground selection:text-primary-foreground transition-colors duration-500">
      <Nav />
      <Suspense fallback={null}>
        <CachedHero />
      </Suspense>
      <Suspense fallback={null}>
        <CachedTechStack />
      </Suspense>
      <Suspense fallback={null}>
        <CachedProjects />
      </Suspense>
      <Suspense fallback={null}>
        <CachedAbout />
      </Suspense>
      <Suspense fallback={null}>
        <CachedExperience />
      </Suspense>
      <Suspense fallback={null}>
        <CachedTestimonials />
      </Suspense>
      <Suspense fallback={null}>
        <CachedContact />
      </Suspense>
    </div>
  );
}
