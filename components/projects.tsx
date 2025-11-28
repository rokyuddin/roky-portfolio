"use client"
import { Briefcase, ExternalLink } from "lucide-react";
import { SectionHeader } from "./section-header";
import { PROJECTS } from "@/lib/data";
import Link from "next/link";
import { useState } from "react";

export function Projects() {
    const [filter, setFilter] = useState("All");

    const categories = ["All", ...Array.from(new Set(PROJECTS.flatMap((p) => p.tags)))];

    const filteredProjects = filter === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.tags.includes(filter));

    return (
        <section
            id="projects"
            className="scroll-mt-28 py-24 px-6 transition-colors duration-500"
        >
            <div className="max-w-4xl mx-auto">
                <SectionHeader title="Selected Works" number="03" />

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setFilter(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                filter === category
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col gap-6">
                    {PROJECTS.map((project, idx) => {
                        // Check if project has a case study
                        const hasCaseStudy = project.title === "Rydr" || project.title === "Skinsight";
                        const caseStudySlug = project.title.toLowerCase();

                        return (
                            <div
                                key={idx}
                                className="group block bg-card border border-border p-6 hover:shadow-xl hover:shadow-muted/50 hover:border-muted-foreground transition-all duration-500"
                            >
                                <div className="flex items-start gap-6">
                                    {/* Icon Section */}
                                    <div className="flex-shrink-0 p-3 bg-secondary border border-border group-hover:border-muted-foreground transition-colors">
                                        <Briefcase
                                            size={24}
                                            className="text-muted-foreground group-hover:text-primary transition-colors"
                                        />
                                    </div>

                                    {/* Content Section */}
                                    <div className="flex-grow min-w-0">
                                        <div className="flex items-start justify-between gap-4 mb-3">
                                            <div>
                                                <h3 className="text-2xl text-primary font-serif mb-1 group-hover:translate-x-2 transition-transform duration-300">
                                                    {project.title}
                                                </h3>
                                                <p className="text-muted-foreground text-xs uppercase tracking-wider group-hover:text-foreground transition-colors">
                                                    {project.subtitle}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tags.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs text-muted-foreground font-mono"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-wrap gap-3">
                                            <Link
                                                href={`https://${project.link}`}
                                                target="_blank"
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground border border-border rounded-lg hover:bg-secondary/80 transition-colors text-sm"
                                            >
                                                <ExternalLink size={14} />
                                                Visit Site
                                            </Link>
                                            
                                            {hasCaseStudy && (
                                                <Link
                                                    href={`/case-studies/${caseStudySlug}`}
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
                                                >
                                                    View Case Study
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
