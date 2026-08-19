import { client } from "@/sanity/lib/client";
import {
  profileQuery,
  skillsQuery,
  experienceQuery,
  projectsQuery,
  testimonialsQuery,
} from "@/sanity/lib/queries";
import { Hero, TechStack, Projects, About, Experience, Testimonials, Contact } from "./index";

import { cacheLife, cacheTag } from "next/cache";

/**
 * Server-side, individually cached section loaders.
 * Splitting the landing page into per-section "use cache" components lets the
 * static shell render immediately and each data-driven section stream in
 * independently (PPR), instead of one coarse fallback blocking the whole page.
 */

export async function CachedHero() {
  "use cache";
  cacheLife("minutes");
  cacheTag("landing-page");
  const profile = await client.fetch(profileQuery);
  return <Hero profile={profile} />;
}

export async function CachedTechStack() {
  "use cache";
  cacheLife("minutes");
  cacheTag("landing-page");
  const skills = await client.fetch(skillsQuery);
  return <TechStack skills={skills} />;
}

export async function CachedProjects() {
  "use cache";
  cacheLife("minutes");
  cacheTag("landing-page");
  const projects = await client.fetch(projectsQuery);
  return <Projects projects={projects} />;
}

export async function CachedAbout() {
  "use cache";
  cacheLife("minutes");
  cacheTag("landing-page");
  const profile = await client.fetch(profileQuery);
  return <About profile={profile} />;
}

export async function CachedExperience() {
  "use cache";
  cacheLife("minutes");
  cacheTag("landing-page");
  const experience = await client.fetch(experienceQuery);
  return <Experience experience={experience} />;
}

export async function CachedTestimonials() {
  "use cache";
  cacheLife("minutes");
  cacheTag("landing-page");
  const testimonials = await client.fetch(testimonialsQuery);
  return <Testimonials testimonials={testimonials} />;
}

export async function CachedContact() {
  "use cache";
  cacheLife("minutes");
  cacheTag("landing-page");
  const profile = await client.fetch(profileQuery);
  return <Contact profile={profile} />;
}
