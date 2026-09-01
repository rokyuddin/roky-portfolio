export const portfolioContext = {
  name: "Md Rokyuddin",
  nickname: "Roky",
  role: "Frontend Developer",
  experience: "3+ years",
  tagline: "Frontend Developer with 3+ years of experience building production apps with Next.js & TypeScript.",

  about: {
    summary: "I've spent 3+ years building frontends for production apps, mostly with React and Next.js. I care about two things: code that holds up as the product grows, and interfaces people can actually use. I work closely with designers and backend engineers to ship features end to end, and I've integrated payments, maps, and admin tooling along the way.",
    coreFocus: [
      {
        area: "Architecture",
        description: "Component-driven design using React & Next.js"
      },
      {
        area: "State Management",
        description: "Complex data flows with Redux, Zustand & Context API"
      },
      {
        area: "User Experience",
        description: "Responsive interfaces with Tailwind CSS & Material UI"
      },
      {
        area: "Performance",
        description: "Core Web Vitals work: lazy loading, code splitting, render tuning"
      }
    ]
  },

  techStack: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Material UI",
    "Redux",
    "Zustand",
    "Context API",
    "Framer Motion",
    "Node.js",
    "Git"
  ],

  workExperience: [
    {
      position: "Frontend Developer L2",
      company: "Miicon Solutions Limited",
      type: "Full-time",
      description: "Work with UX/UI and backend teams to turn designs into working features. Integrated Stripe and Google APIs. Built a ride-sharing platform with admin dashboards.",
      technologies: ["React", "Next.js", "Stripe", "Google APIs", "Admin Dashboards"]
    },
    {
      position: "Frontend Developer L2",
      company: "Soft24",
      type: "Part-time",
      description: "Design custom landing pages and e-commerce features: product listings, checkout flows, Redux for state management. Currently building a multi-vendor e-commerce platform.",
      technologies: ["React", "Next.js", "Redux", "E-commerce", "Landing Pages"]
    }
  ],

  projects: [
    {
      name: "Rydr",
      category: "Ride-Sharing & Concierge Platform",
      description: "A platform for trip booking, chauffeur services, and real-time tracking. Handles automated invoices, admin dashboards, and business management for third-party organizations.",
      techStack: ["Google Maps", "Stripe", "Admin Panel"],
      url: "https://rydr.app",
      highlights: ["Real-time tracking", "Automated invoices", "Business management systems", "Third-party integrations"]
    },
    {
      name: "Skinsight",
      category: "Personalized Skincare Guide",
      description: "A skincare recommendation app. Users get product suggestions based on skin type, build regimens, and manage profiles. Includes account deletion and data management.",
      techStack: ["Recommendation Engine", "Personalization", "HealthTech"],
      url: "https://skinsight.me",
      highlights: ["Recommendations by skin type", "Personalized regimens", "Profile management", "Data privacy features"]
    },
    {
      name: "AslamCGA",
      category: "Portfolio Landing Page",
      description: "A portfolio site with Framer Motion animations, tuned to load fast on slow connections.",
      techStack: ["Framer Motion", "Performance", "Animation"],
      url: "https://aslamcga.com",
      highlights: ["Framer Motion animations", "Performance tuning", "Fast content delivery"]
    }
  ],

  contact: {
    email: "rokyuddin.dev@gmail.com",
    phone: "+8801611-695544",
    location: "Jashore, Bangladesh",
    website: "https://rokyuddin.com",
    resume: "https://drive.google.com/file/d/1CicoWtA6dflZz6hErdzGjboKsgvXzCy9/view"
  }
};
