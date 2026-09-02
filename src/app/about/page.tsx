import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/organisms/nav";
import { SiteFooter } from "@/components/organisms/site-footer";
import { portfolioContext } from "@/lib/data/portfolio-context";
import { SITE_URL, socialMetadata } from "@/lib/site";
import { breadcrumbJsonLd, jsonLd } from "@/lib/schema";

const ABOUT_TITLE = "About";
const ABOUT_DESCRIPTION =
  "Frontend Developer based in Bangladesh, available for remote roles worldwide. 3+ years of experience building production React, Next.js, and TypeScript applications. Currently a Frontend Developer L2, open to new opportunities and client projects.";

export const metadata: Metadata = {
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  ...socialMetadata({
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
    url: `${SITE_URL}/about`,
  }),
};

export default function AboutPage() {
  const { about: aboutData, techStack, workExperience, contact } =
    portfolioContext;

  return (
    <div className="bg-background selection:bg-primary min-h-screen font-sans text-foreground selection:text-primary-foreground transition-colors duration-500">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "About", url: `${SITE_URL}/about` },
        ])) }}
      />
      <Nav />

      {/* Hero */}
      <section className="px-6 pt-32 pb-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="bg-clip-text bg-linear-to-r from-primary via-primary/80 to-primary/60 mb-6 font-serif text-transparent text-5xl md:text-6xl">
            About
          </h1>
          <p className="max-w-3xl text-muted-foreground text-xl leading-relaxed">
            {portfolioContext.tagline}
          </p>
          <p className="mt-4 max-w-3xl text-muted-foreground text-sm leading-relaxed">
            Frontend Developer based in Jashore, Bangladesh, available for
            remote roles and client projects worldwide. Open to full-time
            opportunities and freelance work in React, Next.js, and TypeScript.
          </p>
        </div>
      </section>

      {/* Summary */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <p className="text-foreground/90 text-[15px] leading-loose md:text-lg">
            {aboutData.summary}
          </p>
          <p className="mt-4 text-foreground/90 text-[15px] leading-loose md:text-lg">
            If you&apos;re looking to hire a remote React or Next.js developer
            for your team, I&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Core focus */}
      <section className="px-6 py-12 border-border border-t">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 font-serif text-primary text-3xl tracking-tight">
            Core Focus
          </h2>
          <div className="gap-6 grid md:grid-cols-2">
            {aboutData.coreFocus.map((focus) => (
              <div
                key={focus.area}
                className="p-6 border border-border hover:border-primary transition-colors"
              >
                <h3 className="mb-2 font-medium text-primary">{focus.area}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {focus.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="px-6 py-12 border-border border-t">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 font-serif text-primary text-3xl tracking-tight">
            Experience
          </h2>
          <div className="space-y-8">
            {workExperience.map((job) => (
              <div key={`${job.company}-${job.position}`}>
                <div className="flex flex-wrap justify-between items-baseline gap-2">
                  <h3 className="font-medium text-foreground">{job.position}</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">
                    {job.company} · {job.type}
                  </p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {job.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {job.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-primary/5 text-primary px-2 py-0.5 border border-primary/20 rounded-sm text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="px-6 py-12 border-border border-t">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 font-serif text-primary text-3xl tracking-tight">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="bg-muted/40 text-muted-foreground px-3 py-1.5 border border-border rounded-sm text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Resume CTA */}
      <section className="px-6 py-16 border-border border-t">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 font-serif text-primary text-3xl tracking-tight">
            Want to know more?
          </h2>
          <div className="flex justify-center gap-4">
            <Link
              href={contact.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary/90 px-8 py-3.5 font-medium text-primary-foreground transition-colors"
            >
              VIEW RESUME
            </Link>
            <Link
              href="/contact"
              className="hover:bg-primary px-8 py-3.5 border-2 border-primary font-medium text-primary hover:text-primary-foreground transition-colors"
            >
              CONTACT
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
