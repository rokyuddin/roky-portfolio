"use client"
import { Briefcase, ExternalLink } from "lucide-react";
import { SectionHeader } from "./section-header";
import { PROJECTS } from "@/lib/data";
import Link from "next/link";

export function Projects() {
    return (
        <section
            id="projects"
            className="scroll-mt-28 py-24 px-6 transition-colors duration-500"
        >
            <div className="max-w-4xl mx-auto">
                <SectionHeader title="Selected Works" number="03" />

                <div className="flex flex-col gap-6">
                    {PROJECTS.map((project, idx) => (
                        <Link
                            href={`https://${project.link}`}
                            target="_blank"
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
                                        <ExternalLink
                                            size={20}
                                            className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0"
                                        />
                                    </div>

                                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="text-xs text-muted-foreground font-mono"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
