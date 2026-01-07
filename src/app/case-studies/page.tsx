import { Nav } from "@/components/organisms/nav";
import { CaseStudyCard } from "@/features/case-studies";
import Link from "next/link";
import type { Metadata } from "next";
import { fetchCaseStudies } from "@/features/case-studies/lib";


export const metadata: Metadata = {
  title: "Case Studies | Md Rokyuddin - Frontend Developer",
  description: "Explore detailed case studies of my best projects including Rydr (ride-sharing platform) and Skinsight (AI-powered skincare guide). See the challenges, solutions, and results.",
  keywords: ["case studies", "portfolio", "web development", "React", "Next.js", "frontend development", "Rydr", "Skinsight"],
  openGraph: {
    title: "Case Studies | Md Rokyuddin",
    description: "Deep dives into my most impactful projects. Explore the challenges, solutions, and results.",
    type: "website",
  },
};

export default async function CaseStudiesPage() {
  const caseStudies = await fetchCaseStudies();

  return (
    <div className="bg-background selection:bg-primary min-h-screen font-sans text-foreground selection:text-primary-foreground transition-colors duration-500">
      <Nav />

      {/* Hero Section */}
      <section className="px-6 pt-32 pb-16">
        <div className="mx-auto max-w-4xl">
          <div>
            <h1 className="bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/60 mb-6 font-serif text-transparent text-5xl md:text-6xl">
              Case Studies
            </h1>
            <p className="max-w-3xl text-muted-foreground text-xl leading-relaxed">
              Deep dives into my most impactful projects. Explore the challenges, solutions,
              and results that define my approach to frontend development.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="gap-8 grid md:grid-cols-2">
            {caseStudies.map((study, index) => (
              <CaseStudyCard key={study.slug} study={study} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 border-border border-t">
        <div className="mx-auto max-w-4xl text-center">
          <div>
            <h2 className="mb-4 font-serif text-primary text-3xl">Want to See More?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
              Check out my full portfolio or get in touch to discuss your next project.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 px-6 py-3 rounded-lg text-primary-foreground transition-colors"
              >
                View All Projects
              </Link>

              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/80 px-6 py-3 border border-border rounded-lg text-secondary-foreground transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
