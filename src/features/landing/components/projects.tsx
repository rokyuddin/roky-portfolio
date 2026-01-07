"use client"
import { Briefcase, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SectionHeader } from "@/components/organisms/section-header";
import { PROJECTS } from "../utils";

export function Projects() {
    const [filter, setFilter] = useState("All");

    const categories = ["All", ...Array.from(new Set(PROJECTS.flatMap((p) => p.tags)))];

    const filteredProjects = filter === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.tags.includes(filter));

    return (
        <section
            id="projects"
            className="px-6 py-24 transition-colors duration-500 scroll-mt-28"
        >
            <div className="mx-auto max-w-4xl">
                <SectionHeader title="Selected Works" number="01" />

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setFilter(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === category
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
                                className="group block bg-card hover:shadow-muted/50 hover:shadow-xl p-6 border border-border hover:border-muted-foreground transition-all duration-500"
                            >
                                <div className="flex items-start gap-6">
                                    {/* Icon Section */}
                                    <div className="bg-secondary p-3 border border-border group-hover:border-muted-foreground transition-colors shrink-0">
                                        <Briefcase
                                            size={24}
                                            className="text-muted-foreground group-hover:text-primary transition-colors"
                                        />
                                    </div>

                                    {/* Content Section */}
                                    <div className="min-w-0 grow">
                                        <div className="flex justify-between items-start gap-4 mb-3">
                                            <div>
                                                <h3 className="mb-1 font-serif text-primary text-2xl transition-transform group-hover:translate-x-2 duration-300">
                                                    {project.title}
                                                </h3>
                                                <p className="text-muted-foreground group-hover:text-foreground text-xs uppercase tracking-wider transition-colors">
                                                    {project.subtitle}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="mb-4 text-muted-foreground text-sm leading-relaxed">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tags.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="font-mono text-muted-foreground text-xs"
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
                                                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/80 px-4 py-2 border border-border rounded-lg text-secondary-foreground text-sm transition-colors"
                                            >
                                                <ExternalLink size={14} />
                                                Visit Site
                                            </Link>

                                            {hasCaseStudy && (
                                                <Link
                                                    href={`/case-studies/${caseStudySlug}`}
                                                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 px-4 py-2 rounded-lg text-primary-foreground text-sm transition-colors"
                                                >
                                                    View Case Study
                                                </Link>
                                            )}
                                            <Link
                                                href={project.github}
                                                target="_blank"
                                                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/80 px-4 py-2 border border-border rounded-lg text-secondary-foreground text-sm transition-colors"
                                            >
                                                <Github size={14} />
                                                Source Code
                                            </Link>
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
