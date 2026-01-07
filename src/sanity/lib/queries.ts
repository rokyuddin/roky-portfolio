import { defineQuery } from "next-sanity";

// --- Profile ---
export const profileQuery = defineQuery(`*[_type == "profile"][0]`);

// --- Skills ---
export const skillsQuery = defineQuery(`*[_type == "skill"] | order(category asc, name asc)`);

// --- Experience ---
export const experienceQuery = defineQuery(`*[_type == "experience"] | order(period desc)`);

// --- Projects ---
export const projectsQuery = defineQuery(`*[_type == "project"] | order(_createdAt desc)`);

// --- Testimonials ---
export const testimonialsQuery = defineQuery(`*[_type == "testimonial"] | order(_createdAt desc)`);

// --- Blog Posts ---
export const postsQuery = defineQuery(`*[_type == "post"] | order(date desc)`);
export const postBySlugQuery = defineQuery(`*[_type == "post" && slug.current == $slug][0]`);

// --- Case Studies ---
export const caseStudiesQuery = defineQuery(`*[_type == "caseStudy"] | order(_createdAt desc)`);
export const caseStudyBySlugQuery = defineQuery(`*[_type == "caseStudy" && slug.current == $slug][0]`);
