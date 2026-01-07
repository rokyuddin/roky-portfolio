import { client } from "@/sanity/lib/client";
import { caseStudiesQuery, caseStudyBySlugQuery } from "@/sanity/lib/queries";
import { CaseStudy } from "../types";
import { urlFor } from "@/sanity/lib/image";

import { cacheLife, cacheTag } from "next/cache";

/**
 * Fetch all case studies from Sanity
 */
export async function fetchCaseStudies(): Promise<CaseStudy[]> {
    "use cache";
    cacheLife("case-studies");
    cacheTag("case-studies");
    const studies = await client.fetch(caseStudiesQuery);
    return studies.map(transformCaseStudy);
}

/**
 * Fetch a single case study by slug from Sanity
 */
export async function fetchCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
    "use cache";
    cacheLife("case-studies");
    cacheTag("case-studies", `case-study-${slug}`);
    const study = await client.fetch(caseStudyBySlugQuery, { slug });
    if (!study) return null;
    return transformCaseStudy(study);
}

/**
 * Get all case study slugs for static generation
 */
export async function getAllCaseStudySlugs(): Promise<string[]> {
    const studies = await client.fetch(caseStudiesQuery);
    return studies.map((study: any) => study.slug?.current);
}

function transformCaseStudy(sanityStudy: any): CaseStudy {
    return {
        ...sanityStudy,
        slug: sanityStudy.slug?.current,
        heroImage: sanityStudy.heroImage?.asset ? urlFor(sanityStudy.heroImage.asset).url() : "",
        gallery: (sanityStudy.gallery || []).map((item: any) => ({
            image: item.image?.asset ? urlFor(item.image.asset).url() : "",
            caption: item.caption
        })),
        relatedProjects: sanityStudy.relatedProjects || []
    };
}
