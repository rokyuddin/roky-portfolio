export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  heroImage: string;
  overview: {
    description: string;
    role: string;
    duration: string;
    team: string;
    liveUrl: string;
  };
  challenge: {
    title: string;
    description: string;
    problems: string[];
  };
  solution: {
    title: string;
    description: string;
    approach: string[];
  };
  features: {
    title: string;
    items: {
      name: string;
      description: string;
      icon: string;
    }[];
  };
  techStack: {
    frontend: string[];
    backend: string[];
    tools: string[];
  };
  results: {
    title: string;
    description: string;
    metrics: {
      label: string;
      value: string;
      description: string;
    }[];
  };
  gallery: {
    image: string;
    caption: string;
  }[];
  relatedProjects: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "rydr",
    title: "Rydr",
    subtitle: "Ride-Sharing & Concierge Platform",
    category: "Transportation & Logistics",
    heroImage: "/case-studies/rydr-hero.png",
    overview: {
      description: "Rydr is a comprehensive ride-sharing and concierge platform that revolutionizes urban transportation. The platform seamlessly connects passengers with professional chauffeurs while providing robust business management tools for third-party organizations. Built with scalability and user experience at its core, Rydr handles real-time tracking, automated billing, and complex multi-role dashboards.",
      role: "Lead Frontend Developer",
      duration: "8 months (2023-2024)",
      team: "5 developers, 2 designers, 1 PM",
      liveUrl: "https://rydr.app"
    },
    challenge: {
      title: "The Challenge",
      description: "Creating a platform that serves multiple user types (passengers, drivers, admins, business partners) while maintaining real-time accuracy and seamless payment processing.",
      problems: [
        "Real-time location tracking with minimal latency for thousands of concurrent trips",
        "Complex payment flows supporting multiple payment methods, split payments, and automated invoicing",
        "Role-based access control with granular permissions for different user types",
        "Admin dashboards requiring real-time analytics and business intelligence",
        "Scalable architecture to handle growing user base and feature expansion",
        "Mobile-responsive design that works flawlessly across all devices"
      ]
    },
    solution: {
      title: "The Solution",
      description: "We built a modern, scalable platform using Next.js and TypeScript, leveraging Google Maps API for real-time tracking and Stripe for secure payment processing.",
      approach: [
        "Implemented server-side rendering with Next.js for optimal performance and SEO",
        "Integrated Google Maps API with custom markers and real-time location updates",
        "Built a robust state management system using Zustand for predictable data flow",
        "Created role-based routing and component rendering for different user types",
        "Designed a modular component architecture for easy feature additions",
        "Implemented Stripe Connect for complex payment flows and automated invoicing",
        "Built comprehensive admin dashboards with real-time analytics using Chart.js",
        "Optimized bundle size and implemented code splitting for faster load times"
      ]
    },
    features: {
      title: "Key Features",
      items: [
        {
          name: "Real-Time Trip Tracking",
          description: "Live GPS tracking with ETA updates, route optimization, and driver location sharing. Passengers can see their driver's exact location and estimated arrival time.",
          icon: "MapPin"
        },
        {
          name: "Smart Booking System",
          description: "Intuitive trip booking with address autocomplete, fare estimation, multiple vehicle types, and scheduled rides. Supports both immediate and advance bookings.",
          icon: "Calendar"
        },
        {
          name: "Automated Invoicing",
          description: "Automatic invoice generation with detailed trip breakdowns, tax calculations, and digital receipt delivery. Supports multiple payment methods and split payments.",
          icon: "Receipt"
        },
        {
          name: "Admin Dashboard",
          description: "Comprehensive analytics dashboard with real-time metrics, revenue tracking, driver performance, and business intelligence tools for data-driven decisions.",
          icon: "BarChart"
        },
        {
          name: "Business Management",
          description: "Third-party organization tools for managing corporate accounts, employee rides, budget controls, and detailed reporting for business clients.",
          icon: "Building"
        },
        {
          name: "Driver Portal",
          description: "Dedicated driver interface with earnings tracking, trip history, performance metrics, and instant payout options for professional chauffeurs.",
          icon: "User"
        }
      ]
    },
    techStack: {
      frontend: ["Next.js 14", "TypeScript", "Tailwind CSS", "Zustand", "React Hook Form", "Framer Motion"],
      backend: ["Google Maps API", "Stripe API", "WebSocket", "REST API"],
      tools: ["Vercel", "Git", "Figma", "Postman", "Chart.js"]
    },
    results: {
      title: "Results & Impact",
      description: "Rydr successfully launched and has been serving thousands of users with a seamless ride-sharing experience. The platform's performance and user satisfaction metrics exceed industry standards.",
      metrics: [
        {
          label: "Performance Score",
          value: "95+",
          description: "Lighthouse performance score across all pages"
        },
        {
          label: "Load Time",
          value: "<2s",
          description: "Average page load time on 4G connection"
        },
        {
          label: "User Satisfaction",
          value: "4.8/5",
          description: "Average user rating on app stores"
        },
        {
          label: "Uptime",
          value: "99.9%",
          description: "Platform availability and reliability"
        }
      ]
    },
    gallery: [
      {
        image: "/case-studies/rydr-hero.png",
        caption: "Rydr Homepage - Clean, modern interface with instant booking"
      },
      {
        image: "/case-studies/rydr-booking.png",
        caption: "Trip Booking Flow - Intuitive multi-step booking process"
      },
      {
        image: "/case-studies/rydr-admin.png",
        caption: "Admin Dashboard - Real-time analytics and business intelligence"
      }
    ],
    relatedProjects: ["skinsight"]
  },
  {
    slug: "skinsight",
    title: "Skinsight",
    subtitle: "Personalized Skincare Guide",
    category: "HealthTech & Personalization",
    heroImage: "/case-studies/skinsight-hero.png",
    overview: {
      description: "Skinsight is an intelligent skincare recommendation platform that helps users discover products perfectly suited to their unique skin type and concerns. Using a sophisticated recommendation engine, the platform analyzes user profiles and provides personalized product suggestions, regimen building tools, and comprehensive skincare education. Privacy and data security are at the core of the platform's design.",
      role: "Frontend Developer",
      duration: "6 months (2023)",
      team: "4 developers, 1 designer, 1 product manager",
      liveUrl: "https://skinsight.me"
    },
    challenge: {
      title: "The Challenge",
      description: "Building a personalization engine that provides accurate skincare recommendations while maintaining user privacy and creating an engaging, educational experience.",
      problems: [
        "Creating an accurate recommendation algorithm based on multiple skin factors",
        "Handling sensitive user data with strict privacy and security requirements",
        "Building an intuitive onboarding flow to collect necessary user information",
        "Designing a regimen builder that's both flexible and easy to use",
        "Presenting complex skincare information in an accessible, educational format",
        "Implementing account management with data export and deletion capabilities"
      ]
    },
    solution: {
      title: "The Solution",
      description: "We developed a privacy-first platform using Next.js and TypeScript, with a custom recommendation engine and intuitive user experience design.",
      approach: [
        "Built a multi-factor recommendation algorithm considering skin type, concerns, and preferences",
        "Implemented secure data handling with encryption and GDPR compliance",
        "Created an engaging onboarding quiz with progressive disclosure",
        "Designed a drag-and-drop regimen builder with morning/evening routines",
        "Developed a comprehensive product database with detailed ingredient information",
        "Built user profile management with data export and account deletion features",
        "Implemented responsive design optimized for mobile skincare routine tracking",
        "Added educational content sections with skincare tips and ingredient guides"
      ]
    },
    features: {
      title: "Key Features",
      items: [
        {
          name: "Skin Analysis Quiz",
          description: "Interactive questionnaire that analyzes skin type, concerns, goals, and lifestyle factors to create a comprehensive skin profile for accurate recommendations.",
          icon: "ClipboardList"
        },
        {
          name: "Smart Recommendations",
          description: "AI-powered product suggestions based on skin profile, ingredient preferences, budget, and user reviews. Continuously refined based on user feedback.",
          icon: "Sparkles"
        },
        {
          name: "Regimen Builder",
          description: "Visual routine creator for morning and evening skincare regimens. Drag-and-drop interface with product layering order and timing suggestions.",
          icon: "Layout"
        },
        {
          name: "Product Database",
          description: "Comprehensive catalog of skincare products with detailed ingredient lists, benefits, usage instructions, and user reviews for informed decisions.",
          icon: "Database"
        },
        {
          name: "Profile Management",
          description: "Secure user profiles with skin history tracking, product favorites, and complete data control including export and deletion options.",
          icon: "UserCircle"
        },
        {
          name: "Educational Hub",
          description: "Curated skincare content including ingredient guides, routine tips, and expert advice to help users make informed skincare decisions.",
          icon: "BookOpen"
        }
      ]
    },
    techStack: {
      frontend: ["Next.js 13", "TypeScript", "Tailwind CSS", "React Hook Form", "Zustand", "Framer Motion"],
      backend: ["REST API", "Recommendation Engine", "Secure Storage"],
      tools: ["Vercel", "Git", "Figma", "Postman"]
    },
    results: {
      title: "Results & Impact",
      description: "Skinsight has helped thousands of users discover their perfect skincare routine. The platform's recommendation accuracy and user engagement metrics demonstrate its value in the personalized healthcare space.",
      metrics: [
        {
          label: "Recommendation Accuracy",
          value: "92%",
          description: "Users satisfied with product recommendations"
        },
        {
          label: "User Engagement",
          value: "85%",
          description: "Users who complete their skin profile"
        },
        {
          label: "Return Rate",
          value: "68%",
          description: "Users who return to update their regimen"
        },
        {
          label: "Performance",
          value: "98",
          description: "Lighthouse performance score"
        }
      ]
    },
    gallery: [
      {
        image: "/case-studies/skinsight-hero.png",
        caption: "Skinsight Homepage - Welcoming interface with clear value proposition"
      },
      {
        image: "/case-studies/skinsight-recommendations.png",
        caption: "Recommendations Page - Personalized product suggestions with detailed information"
      },
      {
        image: "/case-studies/skinsight-regimen.png",
        caption: "Regimen Builder - Intuitive drag-and-drop routine creator"
      }
    ],
    relatedProjects: ["rydr"]
  }
];

// Helper function to get case study by slug
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find(study => study.slug === slug);
}

// Helper function to get all case study slugs
export function getAllCaseStudySlugs(): string[] {
  return CASE_STUDIES.map(study => study.slug);
}
