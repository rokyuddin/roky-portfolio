import React from "react";
import { Briefcase, ExternalLink } from "lucide-react";
import { SectionHeader } from "./section-header";
import { PROJECTS } from "@/lib/data";

export function Projects() {
    return (
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
                            className="group block bg-card border border-border p-8 hover:shadow-xl hover:shadow-muted/50 transition-all duration-500 flex flex-col h-full"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className="p-3 bg-secondary border border-border group-hover:border-muted-foreground transition-colors">
                                    <Briefcase
                                        size={24}
                                        className="text-muted-foreground group-hover:text-primary"
                                    />
                                </div>
                                <ExternalLink
                                    size={20}
                                    className="text-muted-foreground group-hover:text-primary transition-colors"
                                />
                            </div>

                            <h3 className="text-2xl text-primary font-serif mb-2 group-hover:translate-x-2 transition-transform duration-300">
                                {project.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-6 uppercase tracking-wider group-hover:text-foreground transition-colors">
                                {project.subtitle}
                            </p>

                            <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="text-xs text-muted-foreground font-mono"
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
    );
}
