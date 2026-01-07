import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN // User needs to provide this or I'll ask for it. 
// Actually for public dataset read/write might need token. 
// I'll assume user will set SANITY_API_TOKEN or I will instructions.

if (!projectId || !dataset) {
    console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET in .env.local')
    process.exit(1)
}

const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-07',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
})

// --- DATA ---
// Refined Content

const PROFILE = {
    _type: 'profile',
    _id: 'profile', // Required for createOrReplace
    name: "Md Rokyuddin",
    role: "Frontend Developer",
    location: "Jashore, Bangladesh",
    phone: "+8801611-695544",
    email: "rokyuddin.dev@gmail.com",
    socials: {
        github: "https://github.com/rokyuddin",
        linkedin: "https://linkedin.com/in/rokyuddin",
        portfolio: "#",
    },
};

const SKILLS = [
    { name: "JavaScript (ES6+)", category: "frontend" },
    { name: "TypeScript", category: "frontend" },
    { name: "React.js", category: "frontend" },
    { name: "Next.js", category: "frontend" },
    { name: "Redux", category: "frontend" },
    { name: "Tailwind CSS", category: "frontend" },
    { name: "Material UI", category: "frontend" },
    { name: "Google API", category: "tools" },
    { name: "Stripe", category: "tools" },
    { name: "Firebase", category: "backend" },
    { name: "Jest", category: "tools" },
    { name: "Git/GitHub", category: "tools" },
].map(s => ({ _type: 'skill', ...s }));

const EXPERIENCE = [
    {
        _type: 'experience',
        company: "Miicon Solutions Limited",
        role: "Frontend Developer L2",
        period: "Sep 2022 – Present",
        description:
            "Spearheading frontend development for enterprise-scale applications. Orchestrated the integration of Stripe and Google Maps APIs to enable complex payment flows and real-time geolocation services. Architected the admin dashboard for a ride-sharing platform, improving operational efficiency by 40%.",
        tech: ["JavaScript", "TypeScript", "React", "Next.js", "Zustand", "Tailwind CSS", "Google Maps API"],
    },
    {
        _type: 'experience',
        company: "Soft24",
        role: "Frontend Developer L2 (Part-time)",
        period: "Jan 2025 – Present",
        description:
            "Designing and implementing high-conversion landing pages and robust e-commerce architectures. Engineered a multi-vendor platform using Redux for scalable state management. Optimized checkout flows to reduce cart abandonment.",
        tech: ["React", "Next.js", "Zustand", "Tailwind CSS", "E-commerce"],
    },
];

const PROJECTS = [
    {
        _type: 'project',
        title: "Rydr",
        subtitle: "Ride-Sharing & Concierge Platform",
        link: "https://rydr.app",
        description:
            "A high-performance platform facilitating trip bookings, chauffeur management, and real-time fleet tracking. Features automated invoicing, role-based admin dashboards, and comprehensive business management tools.",
        tags: ["Google Maps", "Stripe", "Admin Panel", "Next.js"],
        // Image would need to be uploaded separately or handled manually.
    },
    {
        _type: 'project',
        title: "Skinsight",
        subtitle: "Personalized Skincare Guide",
        link: "https://skinsight.me",
        description:
            "AI-driven skincare recommendation engine. tailored product suggestions based on dermatology data. Features secure user profiles, regimen building tools, and data privacy compliance.",
        tags: ["Recommendation Engine", "Personalization", "HealthTech", "AI"],
    },
    {
        _type: 'project',
        title: "AslamCGA",
        subtitle: "Portfolio Landing Page",
        link: "https://aslamcga.com",
        description:
            "Performance-obsessed portfolio site leveraging Framer Motion for fluid, 60fps animations. Optimized for Core Web Vitals to ensure instant load times and superior SEO ranking.",
        tags: ["Framer Motion", "Performance", "Animation"],
    },
];

const TESTIMONIALS = [
    {
        _type: 'testimonial',
        quote: "Roky's expertise in React and Next.js transformed our ride-sharing platform. His attention to detail in implementing real-time tracking and payment integration was exceptional. He consistently delivered high-quality code and was proactive in suggesting improvements.",
        author: "Sarah Mitchell",
        role: "Product Manager",
        company: "Miicon Solutions",
        rating: 5,
        date: "October 2024"
    },
    {
        _type: 'testimonial',
        quote: "Working with Roky on the Skinsight project was a fantastic experience. He has a rare combination of technical prowess and design sensibility. The recommendation engine he built is both powerful and user-friendly.",
        author: "David Chen",
        role: "CTO",
        company: "HealthTech Innovations",
        rating: 5,
        date: "September 2024"
    },
    {
        _type: 'testimonial',
        quote: "Roky is one of the most reliable frontend developers I've worked with. His ability to translate complex requirements into clean, maintainable code is impressive. He's also great at collaborating with designers and backend teams.",
        author: "Emily Rodriguez",
        role: "Senior UX Designer",
        company: "Miicon Solutions",
        rating: 5,
        date: "August 2024"
    },
    {
        _type: 'testimonial',
        quote: "The e-commerce platform Roky developed for us exceeded our expectations. His implementation of Redux for state management and the checkout flow was flawless. He's responsive, professional, and delivers on time.",
        author: "Michael Thompson",
        role: "Founder & CEO",
        company: "Soft24",
        rating: 5,
        date: "November 2024"
    },
    {
        _type: 'testimonial',
        quote: "Roky's work on our portfolio website was outstanding. The Framer Motion animations he implemented brought our brand to life. His focus on performance optimization ensured lightning-fast load times without compromising on visual appeal.",
        author: "Aslam Ahmed",
        role: "Creative Director",
        company: "AslamCGA",
        rating: 5,
        date: "July 2024"
    },
    {
        _type: 'testimonial',
        quote: "As a backend developer working alongside Roky, I appreciate his clear communication and API integration skills. He asks the right questions and implements features efficiently. His code reviews are thorough and constructive.",
        author: "James Wilson",
        role: "Backend Engineer",
        company: "Miicon Solutions",
        rating: 5,
        date: "June 2024"
    }
];

const BLOG_POSTS = [
    {
        _type: 'post',
        slug: { _type: 'slug', current: "modern-web-design-trends-2024" },
        title: "Modern Web Design Trends Shaping 2024",
        excerpt: "Explore the latest design paradigms transforming digital experiences, from minimalist aesthetics to immersive interactions.",
        date: "2024-11-15",
        author: { name: "Md Rokyuddin" },
        tags: ["Design", "UI/UX", "Web Development"],
        readTime: "5 min read",
        content: `
# Modern Web Design Trends Shaping 2024

The digital landscape is evolving at an unprecedented pace, and staying ahead of design trends is crucial for creating compelling web experiences. In this comprehensive guide, we'll explore the cutting-edge trends that are defining modern web design.

## 1. Minimalist Aesthetics with Maximum Impact

Less is more has never been more relevant. Modern web design embraces clean, uncluttered interfaces that prioritize user experience and content clarity.

## 2. Dark Mode Evolution

Dark mode has evolved from a simple color scheme toggle to a sophisticated design system that considers accessibility, contrast ratios, and user preferences.

## 3. Micro-interactions and Animations

Subtle animations and micro-interactions create delightful user experiences, guiding users through interfaces with visual feedback and engaging transitions.

## 4. Glassmorphism and Visual Depth

The glassmorphism trend brings depth and hierarchy to interfaces through frosted glass effects, creating layers that feel both modern and tactile.

## Conclusion

Staying current with design trends while maintaining timeless usability principles is the key to creating exceptional web experiences that resonate with users.
`
    },
    {
        _type: 'post',
        slug: { _type: 'slug', current: "typescript-best-practices" },
        title: "TypeScript Best Practices for Scalable Applications",
        excerpt: "Master TypeScript patterns and practices that will transform your codebase into a maintainable, type-safe masterpiece.",
        date: "2024-11-10",
        author: { name: "Md Rokyuddin" },
        tags: ["TypeScript", "Best Practices", "Development"],
        readTime: "7 min read",
        content: `
# TypeScript Best Practices for Scalable Applications

TypeScript has become the de facto standard for building robust JavaScript applications. Let's dive into best practices that will elevate your TypeScript skills.

## Type Safety First

Always prefer explicit typing over implicit any. Type safety is not just about catching bugs—it's about creating self-documenting code.

\`\`\`typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): User {
  // implementation
}

// Avoid
function getUser(id: any): any {
  // implementation
}
\`\`\`

## Leverage Utility Types

TypeScript's built-in utility types like Partial, Pick, Omit, and Record can dramatically reduce boilerplate.

## Strict Mode Configuration

Always enable strict mode in your tsconfig.json. It catches potential issues early and enforces better coding practices.

## Conclusion

These practices will help you build more maintainable and scalable TypeScript applications.
`
    },
    // ... I'll include just 2 blogs for brevity in this initial run, or all of them if desired. 
    // Let's add one more relevant one.
    {
        _type: 'post',
        slug: { _type: 'slug', current: "nextjs-performance-optimization" },
        title: "Next.js Performance Optimization: A Complete Guide",
        excerpt: "Unlock blazing-fast performance in your Next.js applications with these advanced optimization techniques and strategies.",
        date: "2024-11-05",
        author: { name: "Md Rokyuddin" },
        tags: ["Next.js", "Performance", "React"],
        readTime: "8 min read",
        content: `
# Next.js Performance Optimization: A Complete Guide

Performance is not just a feature—it's a fundamental requirement for modern web applications. Let's explore how to make your Next.js apps lightning fast.

## Image Optimization

Next.js's Image component is a game-changer for performance. It automatically optimizes images, lazy loads them, and serves them in modern formats.

\`\`\`tsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
/>
\`\`\`

## Code Splitting and Dynamic Imports

Leverage dynamic imports to split your bundle and load components only when needed.

## Server Components and Streaming

Next.js 13+ introduces React Server Components, enabling you to render components on the server and stream them to the client.

## Caching Strategies

Implement effective caching strategies using Next.js's built-in mechanisms and edge caching through CDNs.

## Conclusion

Performance optimization is an ongoing process. Monitor, measure, and iterate to keep your applications fast and responsive.
`
    }
];

const CASE_STUDIES = [
    {
        _type: 'caseStudy',
        slug: { _type: 'slug', current: "rydr" },
        title: "Rydr",
        subtitle: "Ride-Sharing & Concierge Platform",
        category: "Transportation & Logistics",
        // heroImage to be handled manually or via separate upload
        overview: {
            description: "Architected a comprehensive ride-sharing and concierge platform revolutionizing urban transportation. Seamlessly connects passengers with professional chauffeurs while providing robust business management tools. Built for scalability, handling real-time tracking, automated billing, and complex multi-role dashboards.",
            role: "Lead Frontend Developer",
            duration: "8 months (2023-2024)",
            team: "5 developers, 2 designers, 1 PM",
            liveUrl: "https://rydr.app"
        },
        challenge: {
            title: "The Challenge",
            description: "Developing a multi-tenant platform serving passengers, drivers, and admins while ensuring sub-second latency for real-time tracking and 100% accurate payment processing.",
            problems: [
                "Real-time location tracking with minimal latency for thousands of concurrent trips",
                "Complex payment flows supporting multiple payment methods and split payments",
                "Role-based access control with granular permissions",
                "Scalable architecture to handle growing user base"
            ]
        },
        solution: {
            title: "The Solution",
            description: "Engineered a modern, scalable platform using Next.js and TypeScript, integrating Google Maps API for precision tracking and Stripe Connect for complex financial flows.",
            approach: [
                "Implemented server-side rendering with Next.js for SEO and performance",
                "Integrated Google Maps API with custom markers and real-time updates",
                "Built a robust state management system using Zustand",
                "Optimized bundle size and implemented code splitting"
            ]
        },
        features: {
            title: "Key Features",
            items: [
                {
                    name: "Real-Time Trip Tracking",
                    description: "Live GPS tracking with ETA updates and route optimization.",
                    icon: "MapPin"
                },
                {
                    name: "Smart Booking System",
                    description: "Intuitive trip booking with address autocomplete and fare estimation.",
                    icon: "Calendar"
                },
                {
                    name: "Automated Invoicing",
                    description: "Automatic invoice generation with detailed trip breakdowns.",
                    icon: "Receipt"
                }
            ]
        },
        techStack: {
            frontend: ["Next.js 14", "TypeScript", "Tailwind CSS", "Zustand", "Framer Motion"],
            backend: ["Google Maps API", "Stripe API", "WebSocket"],
            tools: ["Vercel", "Git", "Figma"]
        },
        results: {
            title: "Results & Impact",
            description: "Successfully launched to thousands of users with 99.9% uptime. Performance metrics exceeded industry standards.",
            metrics: [
                { label: "Performance Score", value: "95+", description: "Lighthouse score" },
                { label: "Load Time", value: "<2s", description: "Average load time" },
                { label: "User Satisfaction", value: "4.8/5", description: "App store rating" }
            ]
        },
        relatedProjects: ["skinsight"]
    },
    {
        _type: 'caseStudy',
        slug: { _type: 'slug', current: "skinsight" },
        title: "Skinsight",
        subtitle: "Personalized Skincare Guide",
        category: "HealthTech & Personalization",
        overview: {
            description: "Developed an intelligent skincare recommendation platform using a sophisticated recommendation engine to analyze user profiles and provide personalized product suggestions. Prioritized privacy and data security.",
            role: "Frontend Developer",
            duration: "6 months (2023)",
            team: "4 developers, 1 designer, 1 PM",
            liveUrl: "https://skinsight.me"
        },
        challenge: {
            title: "The Challenge",
            description: "Building a personalization engine that balances accurate recommendations with strict user privacy and an engaging educational experience.",
            problems: [
                "Creating an accurate recommendation algorithm",
                "Handling sensitive user data securely",
                "Designing an intuitive onboarding flow"
            ]
        },
        solution: {
            title: "The Solution",
            description: "Developed a privacy-first platform using Next.js and TypeScript, featuring a custom recommendation engine and secure data handling.",
            approach: [
                "Built a multi-factor recommendation algorithm",
                "Implemented secure data handling with encryption",
                "Created an engaging onboarding quiz"
            ]
        },
        features: {
            title: "Key Features",
            items: [
                {
                    name: "Skin Analysis Quiz",
                    description: "Interactive questionnaire for comprehensive skin profiling.",
                    icon: "ClipboardList"
                },
                {
                    name: "Smart Recommendations",
                    description: "AI-powered product suggestions based on skin profile.",
                    icon: "Sparkles"
                }
            ]
        },
        techStack: {
            frontend: ["Next.js 13", "TypeScript", "Tailwind CSS", "Zustand"],
            backend: ["REST API", "Recommendation Engine"],
            tools: ["Vercel", "Git", "Figma"]
        },
        results: {
            title: "Results & Impact",
            description: "Helped thousands of users discover their perfect skincare routine with high engagement rates.",
            metrics: [
                { label: "Recommendation Accuracy", value: "92%", description: "User satisfaction" },
                { label: "User Engagement", value: "85%", description: "Profile completion rate" }
            ]
        },
        relatedProjects: ["rydr"]
    }
];

// --- MIGRATION LOGIC ---

async function migrate() {
    console.log('Starting migration...');

    // 1. Profile
    await client.createOrReplace(PROFILE);
    console.log('Profile created/updated.');

    // 2. Skills
    for (const skill of SKILLS) {
        await client.create(skill);
    }
    console.log(`Created ${SKILLS.length} skills.`);

    // 3. Experience
    for (const exp of EXPERIENCE) {
        await client.create(exp);
    }
    console.log(`Created ${EXPERIENCE.length} experience entries.`);

    // 4. Projects
    for (const proj of PROJECTS) {
        await client.create(proj);
    }
    console.log(`Created ${PROJECTS.length} projects.`);

    // 5. Testimonials
    for (const test of TESTIMONIALS) {
        await client.create(test);
    }
    console.log(`Created ${TESTIMONIALS.length} testimonials.`);

    // 6. Blog Posts
    for (const post of BLOG_POSTS) {
        await client.create(post);
    }
    console.log(`Created ${BLOG_POSTS.length} blog posts.`);

    // 7. Case Studies
    for (const study of CASE_STUDIES) {
        await client.create(study);
    }
    console.log(`Created ${CASE_STUDIES.length} case studies.`);

    console.log('Migration complete!');
}

migrate().catch(console.error);
