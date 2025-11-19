import {
    Github,
    Linkedin,
} from "lucide-react";

export const PROFILE = {
    name: "Md Rokyuddin",
    role: "Frontend Developer",
    location: "Jashore, Bangladesh",
    phone: "+8801611-695544",
    email: "rokyuddin.dev@gmail.com",
    socials: {
        github: "https://github.com/rokyuddin",
        linkedin: "https://linkedin.com/in/rokyuddin",
        portfolio: "#", // Placeholder
    },
};

export const SKILLS = [
    "JavaScript (ES6+)",
    "TypeScript",
    "React.js",
    "Next.js",
    "Redux",
    "Tailwind CSS",
    "Material UI",
    "Google API",
    "Stripe",
    "Firebase",
    "Jest",
    "Git/GitHub",
];

export const EXPERIENCE = [
    {
        company: "Miicon Solutions Limited",
        role: "Frontend Developer L2",
        period: "Sep 2022 – Present",
        description:
            "Collaborating with UX/UI and backend teams to translate designs into functional applications. Integrated Stripe and Google APIs. Built a ride-sharing platform with admin dashboards.",
        tech: ["JavaScript", "TypeScript", "React", "Next.js", "Zustand", "Tailwind CSS", "Google Maps API"],
    },
    {
        company: "Soft24",
        role: "Frontend Developer L2 (Part-time)",
        period: "Jan 2025 – Present",
        description:
            "Designing custom landing pages and e-commerce features including product listings and checkout flows. Integrated Redux for state management. Currently working on a multi-vendor e-commerce platform.",
        tech: ["React", "Next.js", "Zustand", "Tailwind CSS", "E-commerce"],
    },
];

export const PROJECTS = [
    {
        title: "Rydr",
        subtitle: "Ride-Sharing & Concierge Platform",
        link: "rydr.app",
        description:
            "A comprehensive platform for trip booking, chauffeur services, and real-time tracking. Features include automated invoices, admin dashboards, and business management systems for third-party organizations.",
        tags: ["Google Maps", "Stripe", "Admin Panel"],
    },
    {
        title: "Skinsight",
        subtitle: "Personalized Skincare Guide",
        link: "skinsight.me",
        description:
            "An intelligent recommendation engine for skincare. Users get suggestions based on skin type, build regimens, and manage profiles. Features account deletion and data management.",
        tags: ["Recommendation Engine", "Personalization", "HealthTech"],
    },
    {
        title: "AslamCGA",
        subtitle: "Portfolio Landing Page",
        link: "aslamcga.com",
        description:
            "High-performance portfolio with dynamic Framer Motion animations. Optimized for speed and efficient content delivery.",
        tags: ["Framer Motion", "Performance", "Animation"],
    },
];
