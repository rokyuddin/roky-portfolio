import { Nav } from "@/components/organisms/nav";
import { notFound } from "next/navigation";
import {
  Code2,
  Layers,
  Wrench,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllCaseStudySlugs, HeroSection } from "@/features/case-studies"
import { ChallengeSection } from "@/features/case-studies"
import { SolutionSection } from "@/features/case-studies"
import { FeaturesSection } from "@/features/case-studies"
import { GallerySection } from "@/features/case-studies"
import { fetchCaseStudyBySlug } from "@/features/case-studies/lib";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, socialMetadata } from "@/lib/site";
import { articleJsonLd, breadcrumbJsonLd, jsonLd } from "@/lib/schema";

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await fetchCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
      robots: { index: false },
    };
  }

  const title = caseStudy.seo?.title
    ? `${caseStudy.seo.title} | ${SITE_NAME}`
    : `${caseStudy.title} Frontend Case Study | ${SITE_NAME}`;
  const description =
    caseStudy.seo?.description || caseStudy.overview.description || SITE_DESCRIPTION;

  return {
    title,
    description,
    keywords: [
      caseStudy.title,
      caseStudy.category,
      ...caseStudy.techStack.frontend,
    ].filter(Boolean),
    ...socialMetadata({
      title,
      description,
      url: `${SITE_URL}/case-studies/${caseStudy.slug}`,
      type: "article",
      image: caseStudy.heroImage
        ? { url: caseStudy.heroImage, alt: `${caseStudy.title} preview` }
        : undefined,
      openGraphExtras: caseStudy.updatedAt
        ? { modifiedTime: caseStudy.updatedAt }
        : undefined,
    }),
  };
}

// Generate static params for all case studies
export async function generateStaticParams() {
  const slugs = await getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = await fetchCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="bg-background selection:bg-primary min-h-screen font-sans text-foreground selection:text-primary-foreground transition-colors duration-500">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            articleJsonLd({
              slug: caseStudy.slug,
              title: caseStudy.title,
              subtitle: caseStudy.subtitle,
              description:
                caseStudy.seo?.description || caseStudy.overview.description,
              category: caseStudy.category,
              heroImage: caseStudy.heroImage || undefined,
              updatedAt: caseStudy.updatedAt,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbJsonLd([
              { name: "Home", url: SITE_URL },
              { name: "Case Studies", url: `${SITE_URL}/case-studies` },
              {
                name: caseStudy.title,
                url: `${SITE_URL}/case-studies/${caseStudy.slug}`,
              },
            ]),
          ),
        }}
      />
      <Nav />

      {/* Hero Section */}
      <HeroSection
        title={caseStudy?.title}
        subtitle={caseStudy?.subtitle}
        category={caseStudy?.category}
        role={caseStudy?.overview.role}
        duration={caseStudy?.overview.duration}
        team={caseStudy?.overview.team}
        liveUrl={caseStudy?.overview.liveUrl}
        heroImage={caseStudy?.heroImage}
      />

      {/* Overview */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div>
            <h2 className="mb-6 font-serif text-primary text-3xl">Project Overview</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {caseStudy?.overview.description}
            </p>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <ChallengeSection
        title={caseStudy?.challenge?.title}
        description={caseStudy?.challenge?.description}
        problems={caseStudy?.challenge?.problems}
      />

      {/* Solution */}
      <SolutionSection
        title={caseStudy?.solution?.title}
        description={caseStudy?.solution?.description}
        approach={caseStudy?.solution?.approach}
      />

      {/* Key Features */}
      <FeaturesSection
        title={caseStudy?.features?.title}
        items={caseStudy?.features?.items}
      />

      {/* Tech Stack */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div>
            <h2 className="mb-8 font-serif text-primary text-3xl">Technology Stack</h2>

            <div className="gap-8 grid md:grid-cols-3">
              <div>
                <h3 className="flex items-center gap-2 mb-4 font-semibold text-foreground text-lg">
                  <Code2 className="w-5 h-5 text-primary" />
                  Frontend
                </h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy?.techStack.frontend.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-secondary px-3 py-1.5 border border-border rounded-full text-secondary-foreground text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="flex items-center gap-2 mb-4 font-semibold text-foreground text-lg">
                  <Layers className="w-5 h-5 text-primary" />
                  Backend & APIs
                </h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy?.techStack.backend.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-secondary px-3 py-1.5 border border-border rounded-full text-secondary-foreground text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="flex items-center gap-2 mb-4 font-semibold text-foreground text-lg">
                  <Wrench className="w-5 h-5 text-primary" />
                  Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy?.techStack.tools.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-secondary px-3 py-1.5 border border-border rounded-full text-secondary-foreground text-sm"
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
      <section className="bg-muted/20 px-6 py-16 border-border border-y">
        <div className="mx-auto max-w-4xl">
          <div>
            <h2 className="mb-6 font-serif text-primary text-3xl">{caseStudy?.results?.title}</h2>
            <p className="mb-8 text-muted-foreground text-lg leading-relaxed">
              {caseStudy?.results?.description}
            </p>

            <div className="gap-6 grid grid-cols-2 md:grid-cols-4">
              {caseStudy?.results?.metrics?.map((metric, index) => (
                <div
                  key={index}
                  className="bg-card p-6 border border-border rounded-lg text-center"
                >
                  <div className="mb-2 font-bold text-primary text-3xl">{metric?.value}</div>
                  <div className="mb-1 font-semibold text-foreground text-sm">{metric?.label}</div>
                  <div className="text-muted-foreground text-xs">{metric?.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {caseStudy?.gallery.length > 0 && <GallerySection items={caseStudy?.gallery} />}

      {/* CTA */}
      <section className="px-6 py-16 border-border border-t">
        <div className="mx-auto max-w-4xl text-center">
          <div>
            <h2 className="mb-4 font-serif text-primary text-3xl">Interested in Working Together?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
              I&apos;m always open to discussing new projects and opportunities.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 px-6 py-3 rounded-lg text-primary-foreground transition-colors"
              >
                Get in Touch
              </Link>

              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/80 px-6 py-3 border border-border rounded-lg text-secondary-foreground transition-colors"
              >
                Explore More Case Studies
              </Link>

              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/80 px-6 py-3 border border-border rounded-lg text-secondary-foreground transition-colors"
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
