import { Nav } from "@/components/nav";
import { notFound } from "next/navigation";
import { fetchCaseStudyBySlug, getAllCaseStudySlugs } from "@/lib/api/case-studies-api";
import { 
  Code2,
  Layers,
  Wrench,
  Users,
  CheckCircle2,
  Calendar,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { HeroSection } from "@/components/case-study/hero-section";
import { ChallengeSection } from "@/components/case-study/challenge-section";
import { SolutionSection } from "@/components/case-study/solution-section";
import { FeaturesSection } from "@/components/case-study/features-section";
import { GallerySection } from "@/components/case-study/gallery-section";

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await fetchCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${caseStudy.title} Case Study | Md Rokyuddin - Frontend Developer`,
    description: caseStudy.overview.description,
    keywords: [
      caseStudy.title,
      caseStudy.category,
      ...caseStudy.techStack.frontend,
      "case study",
      "web development",
      "frontend development"
    ],
    openGraph: {
      title: `${caseStudy.title} - ${caseStudy.subtitle}`,
      description: caseStudy.overview.description,
      type: "article",
      images: [
        {
          url: caseStudy.heroImage,
          alt: `${caseStudy.title} preview`,
        },
      ],
    },
  };
}

// Generate static params for all case studies
export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = await fetchCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground font-sans transition-colors duration-500">
      <Nav />
      
      {/* Hero Section */}
      <HeroSection
        title={caseStudy.title}
        subtitle={caseStudy.subtitle}
        category={caseStudy.category}
        role={caseStudy.overview.role}
        duration={caseStudy.overview.duration}
        team={caseStudy.overview.team}
        liveUrl={caseStudy.overview.liveUrl}
        heroImage={caseStudy.heroImage}
      />

      {/* Overview */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div>
            <h2 className="text-3xl font-serif text-primary mb-6">Project Overview</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {caseStudy.overview.description}
            </p>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <ChallengeSection
        title={caseStudy.challenge.title}
        description={caseStudy.challenge.description}
        problems={caseStudy.challenge.problems}
      />

      {/* Solution */}
      <SolutionSection
        title={caseStudy.solution.title}
        description={caseStudy.solution.description}
        approach={caseStudy.solution.approach}
      />

      {/* Key Features */}
      <FeaturesSection
        title={caseStudy.features.title}
        items={caseStudy.features.items}
      />

      {/* Tech Stack */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div>
            <h2 className="text-3xl font-serif text-primary mb-8">Technology Stack</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-primary" />
                  Frontend
                </h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.techStack.frontend.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-primary" />
                  Backend & APIs
                </h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.techStack.backend.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-primary" />
                  Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.techStack.tools.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 px-6 bg-muted/20 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <div>
            <h2 className="text-3xl font-serif text-primary mb-6">{caseStudy.results.title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {caseStudy.results.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {caseStudy.results.metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-card border border-border p-6 rounded-lg text-center"
                >
                  <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                  <div className="text-sm font-semibold text-foreground mb-1">{metric.label}</div>
                  <div className="text-xs text-muted-foreground">{metric.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <GallerySection items={caseStudy.gallery} />

      {/* CTA */}
      <section className="py-16 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div>
            <h2 className="text-3xl font-serif text-primary mb-4">Interested in Working Together?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              I'm always open to discussing new projects and opportunities.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Get in Touch
              </Link>
              
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground border border-border rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                View All Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
