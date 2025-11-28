import { Nav } from "@/components/nav";
import { Code2, Layers, Mail, FileText, Briefcase } from "lucide-react";
import Link from "next/link";
import { SKILLS } from "@/lib/data";
import type { Metadata } from "next";
import { CoreValuesSection } from "@/components/about/core-values-section";
import { CareerTimelineSection } from "@/components/about/career-timeline-section";
import { ApproachSection } from "@/components/about/approach-section";

export const metadata: Metadata = {
  title: "About Me | Md Rokyuddin - Frontend Developer",
  description: "Learn about my journey as a frontend developer with 3+ years of experience specializing in React, Next.js, and TypeScript. Discover my core values, technical expertise, and approach to building exceptional web applications.",
  keywords: [
    "frontend developer",
    "React developer",
    "Next.js expert",
    "TypeScript",
    "web development",
    "UI/UX",
    "Md Rokyuddin",
    "portfolio",
    "about me"
  ],
  openGraph: {
    title: "About Md Rokyuddin - Frontend Developer",
    description: "3+ years of experience crafting refined digital experiences with Next.js & TypeScript",
    type: "profile",
  },
};

export default function AboutPage() {
  const coreCompetencies = [
    "Component-driven architecture with React & Next.js",
    "State management (Redux, Zustand, Context API)",
    "Responsive design with Tailwind CSS & Material UI",
    "RESTful API integration & data fetching",
    "Performance optimization & Core Web Vitals",
    "TypeScript for type-safe development"
  ];

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground font-sans transition-colors duration-500">
      <Nav />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div>
            <h1 className="text-5xl md:text-6xl font-serif mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              About Me
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A passionate frontend developer dedicated to crafting exceptional digital experiences
              that combine technical excellence with intuitive design.
            </p>
          </div>
        </div>
      </section>

      {/* Professional Background */}
      <section className="py-16 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div>
            <h2 className="text-3xl font-serif text-primary mb-8">Professional Background</h2>
            
            <div className="space-y-6 text-muted-foreground leading-loose">
              <p>
                With over <span className="text-primary font-semibold">3+ years of hands-on experience</span> in frontend development,
                I specialize in building high-performance web applications that prioritize both user experience and code quality.
                My journey in web development has been driven by a passion for creating digital solutions that make a real impact.
              </p>
              
              <p>
                Throughout my career, I've had the privilege of working with diverse teams and clients, from innovative startups
                to established companies. Each project has been an opportunity to push the boundaries of what's possible with
                modern web technologies, particularly in the <span className="text-foreground font-medium">React and Next.js ecosystem</span>.
              </p>
              
              <p>
                My approach combines <span className="text-foreground font-medium">technical excellence</span> with a keen eye for design,
                ensuring every project delivers seamless functionality wrapped in intuitive, accessible interfaces. I believe that
                great software is not just about writing code—it's about solving real problems and creating delightful experiences
                for users.
              </p>

              <p>
                I thrive in collaborative environments where <span className="text-foreground font-medium">clean code</span>,{" "}
                <span className="text-foreground font-medium">scalable architecture</span>, and{" "}
                <span className="text-foreground font-medium">continuous learning</span> drive innovation. Whether it's integrating
                complex APIs, optimizing performance, or implementing pixel-perfect designs, I approach each challenge with
                enthusiasm and attention to detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <CoreValuesSection />

      {/* Technical Expertise */}
      <section className="py-16 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div>
            <h2 className="text-3xl font-serif text-primary mb-8">Technical Expertise</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-primary" />
                  Core Competencies
                </h3>
                <ul className="space-y-3">
                  {coreCompetencies.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-primary mt-1.5">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-primary" />
                  Technologies & Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm border border-border hover:border-primary/50 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Timeline */}
      <CareerTimelineSection />

      {/* Approach & Methodology */}
      <ApproachSection />

      {/* CTA Section */}
      <section className="py-16 px-6 border-t border-border bg-muted/20">
        <div className="max-w-4xl mx-auto text-center">
          <div>
            <h2 className="text-3xl font-serif text-primary mb-4">Let's Work Together</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              I'm always interested in hearing about new projects and opportunities.
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Get in Touch
              </Link>
              
              <Link
                href="https://drive.google.com/file/d/1CicoWtA6dflZz6hErdzGjboKsgvXzCy9/view"
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground border border-border rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <FileText className="w-4 h-4" />
                View Resume
              </Link>
              
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground border border-border rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <Briefcase className="w-4 h-4" />
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
