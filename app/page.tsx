"use client";
import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Briefcase,
  Layers,
  User,
  ChevronDown,
  MapPin,
  Smartphone,
  Moon,
  Sun,
} from "lucide-react";

/**
 * DATA SOURCE
 * Extracted from: md-rokyuddin.pdf
 */

const PROFILE = {
  name: "Md Rokyuddin",
  role: "Frontend Developer",
  location: "Jashore, Bangladesh",
  phone: "+8801611-695544",
  email: "rokyuddin.dev@gmail.com",
  socials: {
    github: "#", // Placeholder
    linkedin: "#", // Placeholder
    portfolio: "#", // Placeholder
  },
};

const SKILLS = [
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

const EXPERIENCE = [
  {
    company: "Miicon Solutions Limited",
    role: "Frontend Developer L2",
    period: "Sep 2022 – Present",
    description:
      "Collaborating with UX/UI and backend teams to translate designs into functional applications. Integrated Stripe and Google APIs. Built a ride-sharing platform with admin dashboards.",
    tech: ["React", "Google Maps API", "Stripe"],
  },
  {
    company: "Soft24",
    role: "Frontend Developer L2 (Part-time)",
    period: "Jan 2025 – Present",
    description:
      "Designing custom landing pages and e-commerce features including product listings and checkout flows. Integrated Redux for state management.",
    tech: ["Next.js", "Redux", "E-commerce"],
  },
];

const PROJECTS = [
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

/**
 * COMPONENTS
 */

const SectionHeader = ({
  title,
  number,
}: {
  title: string;
  number: string;
}) => (
  <div className="flex items-center gap-4 mb-12 group">
    <span className="text-zinc-400 dark:text-zinc-600 font-mono text-sm tracking-widest group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">
      {number}
    </span>
    <h2 className="text-2xl md:text-3xl font-light tracking-tight text-zinc-900 dark:text-zinc-100 uppercase">
      {title}
    </h2>
    <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-grow max-w-xs ml-4 group-hover:max-w-md transition-all duration-500"></div>
  </div>
);

const SkillTag = ({ name }: { name: string }) => (
  <span className="px-4 py-2 bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 text-sm hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-200 transition-all duration-300 cursor-default">
    {name}
  </span>
);

const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  const targetId = href.replace("#", "");
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const NavItem = ({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) => (
  <a
    href={href}
    onClick={(e) => handleScroll(e, href)}
    className={`text-sm uppercase tracking-widest transition-all duration-300 ${
      active
        ? "text-zinc-900 dark:text-white border-b border-zinc-900 dark:border-white pb-1"
        : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
    }`}
  >
    {label}
  </a>
);

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple scroll spy
      const sections = ["home", "experience", "projects", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen text-zinc-800 dark:text-zinc-200 selection:bg-zinc-900 dark:selection:bg-white selection:text-white dark:selection:text-black font-sans transition-colors duration-500">
        {/* Navigation */}
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled
              ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md py-4 border-b border-zinc-200 dark:border-zinc-900"
              : "bg-transparent py-8"
          }`}
        >
          <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
            <div className="text-xl font-serif tracking-tighter text-zinc-900 dark:text-white border-2 border-zinc-900 dark:border-white w-10 h-10 flex items-center justify-center transition-colors duration-500">
              M
            </div>
            <div className="flex items-center gap-8">
              <div className="hidden md:flex gap-8">
                <NavItem
                  href="#home"
                  label="Start"
                  active={activeSection === "home"}
                />
                <NavItem
                  href="#about"
                  label="Profile"
                  active={activeSection === "about"}
                />
                <NavItem
                  href="#experience"
                  label="Work"
                  active={activeSection === "experience"}
                />
                <NavItem
                  href="#projects"
                  label="Creation"
                  active={activeSection === "projects"}
                />
                <NavItem
                  href="#contact"
                  label="Connect"
                  active={activeSection === "contact"}
                />
              </div>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex flex-col justify-center px-6 relative pt-20"
        >
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 flex flex-col justify-center">
              <p className="text-zinc-500 font-mono mb-6 tracking-widest text-sm animate-fade-in-up">
                HELLO, I AM
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-zinc-900 dark:text-white mb-8 leading-[0.9] tracking-tight animate-fade-in-up delay-100 transition-colors duration-500">
                {PROFILE.name.split(" ")[0]} <br />
                <span className="text-zinc-400 dark:text-zinc-500 italic font-light">
                  {PROFILE.name.split(" ")[1]}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl font-light leading-relaxed mb-10 animate-fade-in-up delay-200 transition-colors duration-500">
                A specialized{" "}
                <span className="text-zinc-900 dark:text-white font-normal">
                  Frontend Developer
                </span>{" "}
                crafting refined digital experiences with Next.js & TypeScript.
              </p>
              <div className="flex gap-6 animate-fade-in-up delay-300">
                <a
                  href="#contact"
                  onClick={(e) => handleScroll(e, "#contact")}
                  className="px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-medium tracking-wide hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors shadow-lg shadow-zinc-200/50 dark:shadow-none"
                >
                  GET IN TOUCH
                </a>
                <a
                  href="#projects"
                  onClick={(e) => handleScroll(e, "#projects")}
                  className="px-8 py-4 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white font-medium tracking-wide hover:border-zinc-900 dark:hover:border-white transition-colors"
                >
                  VIEW WORK
                </a>
              </div>
            </div>

            {/* Decorative / Abstract visual for Posh feel */}
            <div className="hidden lg:flex lg:col-span-4 items-center justify-center opacity-30 dark:opacity-50 transition-opacity duration-500">
              <div className="relative w-64 h-64 border border-zinc-900 dark:border-zinc-800 rotate-45">
                <div className="absolute inset-0 border border-zinc-900 dark:border-zinc-800 -rotate-12 scale-90"></div>
                <div className="absolute inset-0 border border-zinc-900 dark:border-zinc-800 rotate-12 scale-75"></div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce duration-[2000ms] opacity-50 text-zinc-900 dark:text-white">
            <ChevronDown size={24} />
          </div>
        </section>

        {/* About / Skills Section */}
        <section
          id="about"
          className="scroll-mt-28 py-24 px-6 border-t border-zinc-200 dark:border-zinc-900/50 transition-colors duration-500"
        >
          <div className="max-w-4xl mx-auto">
            <SectionHeader title="Competencies" number="01" />

            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h3 className="text-xl text-zinc-900 dark:text-white mb-6 font-serif italic transition-colors duration-500">
                  Technical Arsenal
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-loose mb-8 transition-colors duration-500">
                  My development philosophy centers on precision and
                  performance. I leverage modern frameworks to build scalable,
                  type-safe applications that feel seamless to the user.
                </p>
                <div className="flex flex-wrap gap-3">
                  {SKILLS.map((skill) => (
                    <SkillTag key={skill} name={skill} />
                  ))}
                </div>
              </div>
              <div className="relative pl-8 border-l border-zinc-200 dark:border-zinc-800 transition-colors duration-500">
                <h3 className="text-xl text-zinc-900 dark:text-white mb-6 font-serif italic transition-colors duration-500">
                  Core Focus
                </h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="p-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-sm transition-colors duration-500">
                      <Code2 size={20} />
                    </div>
                    <div>
                      <h4 className="text-zinc-800 dark:text-zinc-200 font-medium mb-1 transition-colors duration-500">
                        Architecture
                      </h4>
                      <p className="text-sm text-zinc-500">
                        Component-driven design using React & Next.js.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="p-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-sm transition-colors duration-500">
                      <Layers size={20} />
                    </div>
                    <div>
                      <h4 className="text-zinc-800 dark:text-zinc-200 font-medium mb-1 transition-colors duration-500">
                        State Management
                      </h4>
                      <p className="text-sm text-zinc-500">
                        Complex data flows with Redux, Zustand & Context API.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="p-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-sm transition-colors duration-500">
                      <User size={20} />
                    </div>
                    <div>
                      <h4 className="text-zinc-800 dark:text-zinc-200 font-medium mb-1 transition-colors duration-500">
                        User Experience
                      </h4>
                      <p className="text-sm text-zinc-500">
                        Tailwind CSS & Material UI for bespoke, responsive
                        interfaces.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className="scroll-mt-28 py-24 px-6 bg-zinc-100 dark:bg-zinc-900/20 transition-colors duration-500"
        >
          <div className="max-w-4xl mx-auto">
            <SectionHeader title="Trajectory" number="02" />

            <div className="space-y-12">
              {EXPERIENCE.map((job, idx) => (
                <div
                  key={idx}
                  className="group relative pl-8 border-l border-zinc-300 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-white transition-colors duration-500"
                >
                  <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] bg-zinc-100 dark:bg-zinc-950 border border-zinc-400 dark:border-zinc-600 group-hover:border-zinc-900 dark:group-hover:border-white rounded-full transition-colors"></div>

                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-4">
                    <h3 className="text-2xl text-zinc-900 dark:text-white font-light transition-colors duration-500">
                      {job.role}{" "}
                      <span className="text-zinc-400 dark:text-zinc-500 mx-2">
                        @
                      </span>{" "}
                      <span className="font-serif italic">{job.company}</span>
                    </h3>
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mt-2 md:mt-0">
                      {job.period}
                    </span>
                  </div>

                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mb-6 transition-colors duration-500">
                    {job.description}
                  </p>

                  <div className="flex gap-4 text-xs font-mono text-zinc-500 uppercase tracking-wider">
                    {job.tech.map((t, i) => (
                      <span
                        key={i}
                        className="border-b border-zinc-300 dark:border-zinc-800 pb-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="scroll-mt-28 py-24 px-6 transition-colors duration-500"
        >
          <div className="max-w-6xl mx-auto">
            <SectionHeader title="Selected Works" number="03" />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROJECTS.map((project, idx) => (
                <a
                  href={`https://${project.link}`}
                  key={idx}
                  className="group block bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-900 p-8 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-none dark:hover:bg-zinc-900 dark:hover:border-zinc-700 transition-all duration-500 flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 transition-colors">
                      <Briefcase
                        size={24}
                        className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white"
                      />
                    </div>
                    <ExternalLink
                      size={20}
                      className="text-zinc-400 dark:text-zinc-700 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors"
                    />
                  </div>

                  <h3 className="text-2xl text-zinc-900 dark:text-white font-serif mb-2 group-hover:translate-x-2 transition-transform duration-300">
                    {project.title}
                  </h3>
                  <p className="text-zinc-500 text-sm mb-6 uppercase tracking-wider group-hover:text-zinc-400 transition-colors">
                    {project.subtitle}
                  </p>

                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-8 flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs text-zinc-500 dark:text-zinc-600 font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="scroll-mt-28 py-32 px-6 bg-zinc-100 dark:bg-zinc-900/30 relative overflow-hidden transition-colors duration-500"
        >
          {/* Background Texture */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute right-0 bottom-0 w-96 h-96 bg-zinc-900 dark:bg-white rounded-full blur-[120px]"></div>
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <p className="text-zinc-500 font-mono mb-8 tracking-widest text-sm">
              WHAT'S NEXT?
            </p>
            <h2 className="text-5xl md:text-7xl font-serif text-zinc-900 dark:text-white mb-12 tracking-tight transition-colors duration-500">
              Let's work together.
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto mb-16">
              <div className="flex flex-col items-center gap-4 p-6 border border-zinc-200 dark:border-zinc-800/50 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
                <Mail className="text-zinc-400" size={28} />
                <span className="text-sm text-zinc-600 dark:text-zinc-300">
                  {PROFILE.email}
                </span>
              </div>
              <div className="flex flex-col items-center gap-4 p-6 border border-zinc-200 dark:border-zinc-800/50 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
                <Smartphone className="text-zinc-400" size={28} />
                <span className="text-sm text-zinc-600 dark:text-zinc-300">
                  {PROFILE.phone}
                </span>
              </div>
              <div className="flex flex-col items-center gap-4 p-6 border border-zinc-200 dark:border-zinc-800/50 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
                <MapPin className="text-zinc-400" size={28} />
                <span className="text-sm text-zinc-600 dark:text-zinc-300 text-center">
                  {PROFILE.location}
                </span>
              </div>
            </div>

            <div className="flex justify-center gap-8">
              <a
                href={PROFILE.socials.github}
                className="text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white transition-colors transform hover:scale-110 duration-300"
              >
                <Github size={24} />
              </a>
              <a
                href={PROFILE.socials.linkedin}
                className="text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white transition-colors transform hover:scale-110 duration-300"
              >
                <Linkedin size={24} />
              </a>
            </div>

            <footer className="mt-24 text-zinc-500 dark:text-zinc-600 text-xs tracking-widest uppercase">
              © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
            </footer>
          </div>
        </section>
      </div>
    </div>
  );
}
