// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Import the actual data and types
import { CASE_STUDIES as REAL_CASE_STUDIES, type CaseStudy } from "../data/case-studies-data";

/**
 * Fetch all case studies with simulated API delay
 */
export async function fetchCaseStudies(): Promise<CaseStudy[]> {
  // Simulate API delay
  await delay(1000);
  
  return REAL_CASE_STUDIES;
}

/**
 * Fetch a single case study by slug with simulated API delay
 */
export async function fetchCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  // Simulate API delay
  await delay(1000);

  const caseStudy = REAL_CASE_STUDIES.find((study: CaseStudy) => study.slug === slug);
  return caseStudy || null;
}

/**
 * Get all case study slugs for static generation
 */
export function getAllCaseStudySlugs(): string[] {
  return REAL_CASE_STUDIES.map((study: CaseStudy) => study.slug);
}
