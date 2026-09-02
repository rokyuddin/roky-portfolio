import { Nav } from "@/components/organisms/nav";
import { SiteFooter } from "@/components/organisms/site-footer";
import { CaseStudyCard } from "@/features/case-studies";
import Link from "next/link";
import type { Metadata } from "next";
import { fetchCaseStudies } from "@/features/case-studies/lib";
import { SITE_URL, socialMetadata } from "@/lib/site";
import { collectionPageJsonLd, breadcrumbJsonLd, jsonLd } from "@/lib/schema";

const CASE_STUDIES_TITLE = "Case Studies";
const CASE_STUDIES_DESCRIPTION =
  "Frontend case studies covering real React, Next.js, and TypeScript projects: the challenges, solutions, tech decisions, and results.";

export const metadata: Metadata = {
  title: CASE_STUDIES_TITLE,
  description: CASE_STUDIES_DESCRIPTION,
  ...socialMetadata({
    title: CASE_STUDIES_TITLE,
    description: CASE_STUDIES_DESCRIPTION,
    url: `${SITE_URL}/case-studies`,
  }),
};

export default async function CaseStudiesPage() {
  const caseStudies = await fetchCaseStudies();

  return (
    <div className="bg-background selection:bg-primary min-h-screen font-sans text-foreground selection:text-primary-foreground transition-colors duration-500">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            collectionPageJsonLd({
              name: "Case Studies",
              description: CASE_STUDIES_DESCRIPTION,
              url: `${SITE_URL}/case-studies`,
              items: caseStudies.map((study) => ({
                name: study.title,
                url: `${SITE_URL}/case-studies/${study.slug}`,
              })),
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
            ]),
          ),
        }}
      />
      <Nav />

      {/* Hero Section */}
      <section className="px-6 pt-32 pb-16">
        <div className="mx-auto max-w-4xl">
          <div>
            <h1 className="bg-clip-text bg-linear-to-r from-primary via-primary/80 to-primary/60 mb-6 font-serif text-transparent text-5xl md:text-6xl">
              Case Studies
            </h1>
            <p className="max-w-3xl text-muted-foreground text-xl leading-relaxed">
              Frontend case studies covering real-world React, Next.js, and TypeScript
              projects: the challenges, the solutions, and the results.
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
                href="/contact"
                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/80 px-6 py-3 border border-border rounded-lg text-secondary-foreground transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
