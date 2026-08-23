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
import { SITE_URL, SITE_TITLE, socialMetadata } from "@/lib/site";
import { client } from "@/sanity/lib/client";
import { profileQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await client.fetch(profileQuery);
  const role = profile?.role || "Frontend Developer";
  const title = profile?.name ? `${profile.name} | ${role}` : SITE_TITLE;
  const description =
    "Portfolio of Md Rokyuddin, a frontend developer building fast, accessible web apps with React, Next.js, and TypeScript. Available for remote roles and client projects worldwide.";
  const imageUrl = profile?.profileImage
    ? urlFor(profile.profileImage).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title,
    description,
    ...socialMetadata({
      title,
      description,
      url: SITE_URL,
      image: imageUrl,
    }),
  };
}

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
