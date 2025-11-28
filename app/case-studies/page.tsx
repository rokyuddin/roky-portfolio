import { Nav } from "@/components/nav";
import { CaseStudyCard } from "@/components/case-study-card";
import Link from "next/link";
import type { Metadata } from "next";
import { fetchCaseStudies } from "@/lib/api/case-studies-api";


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
  // Fetch case studies with simulated delay
  const caseStudies = await fetchCaseStudies();

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground font-sans transition-colors duration-500">
      <Nav />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div>
            <h1 className="text-5xl md:text-6xl font-serif mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Case Studies
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Deep dives into my most impactful projects. Explore the challenges, solutions,
              and results that define my approach to frontend development.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <CaseStudyCard key={study.slug} study={study} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div>
            <h2 className="text-3xl font-serif text-primary mb-4">Want to See More?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Check out my full portfolio or get in touch to discuss your next project.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                View All Projects
              </Link>
              
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground border border-border rounded-lg hover:bg-secondary/80 transition-colors"
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
