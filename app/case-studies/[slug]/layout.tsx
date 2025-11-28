import { getAllCaseStudySlugs } from "@/lib/data/case-studies-data";

export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs();
  
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
