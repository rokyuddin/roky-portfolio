"use client";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { TechStack } from "@/components/tech-stack";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Contact } from "@/components/contact";

export default function Portfolio() {
  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground font-sans transition-colors duration-500">
      <Nav />
      <Hero />
      <TechStack />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
}
