"use client"
import { Briefcase, ExternalLink, Github, X } from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "@/components/organisms/section-header";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ProjectsProps {
    projects: any[];
}

export function Projects({ projects }: ProjectsProps) {
    const [selectedImage, setSelectedImage] = useState<any>(null);

    if (!projects) return null;

    return (
        <section
            id="projects"
            className="px-6 py-24 transition-colors duration-500 scroll-mt-28"
        >
            <div className="mx-auto max-w-4xl">
                <SectionHeader title="Selected Works" number="01" />

                <div className="flex flex-col gap-6">
                    {projects.map((project, idx) => {
                        const caseStudySlug = project.slug?.current || project.title?.toLowerCase();

                        return (
                            <div
                                key={idx}
                                className="group block bg-card hover:shadow-muted/50 hover:shadow-xl p-6 border border-border hover:border-muted-foreground transition-all duration-500"
                            >
                                <div className="flex items-start gap-6">
                                    {/* Icon Section */}
                                    {/* Image or Icon Section */}
                                    <div className="shrink-0">
                                        {project.image ? (
                                            <button
                                                onClick={() => setSelectedImage(project.image)}
                                                className="block relative bg-secondary border border-border group-hover:border-muted-foreground rounded-lg w-24 h-24 overflow-hidden transition-colors cursor-zoom-in"
                                            >
                                                <Image
                                                    src={urlFor(project.image).url()}
                                                    alt={project.image.alt || project.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </button>
                                        ) : (
                                            <div className="bg-secondary p-3 border border-border group-hover:border-muted-foreground rounded-lg transition-colors">
                                                <Briefcase
                                                    size={24}
                                                    className="text-muted-foreground group-hover:text-primary transition-colors"
                                                />
                                            </div>
                                        )}
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
                                            {project.tags?.map((tag: string, i: number) => (
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
                                            {project.link && (
                                                <Link
                                                    href={project.link}
                                                    target="_blank"
                                                    className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/80 px-4 py-2 border border-border rounded-lg text-secondary-foreground text-sm transition-colors"
                                                >
                                                    <ExternalLink size={14} />
                                                    Visit Site
                                                </Link>
                                            )}

                                            <Link
                                                href={`/case-studies/${caseStudySlug}`}
                                                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 px-4 py-2 rounded-lg text-primary-foreground text-sm transition-colors"
                                            >
                                                View Case Study
                                            </Link>

                                            {project.github && (
                                                <Link
                                                    href={project.github}
                                                    target="_blank"
                                                    className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/80 px-4 py-2 border border-border rounded-lg text-secondary-foreground text-sm transition-colors"
                                                >
                                                    <Github size={14} />
                                                    Source Code
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

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="z-100 fixed inset-0 flex justify-center items-center bg-background/80 backdrop-blur-md p-4 sm:p-8"
                    >
                        <button
                            className="top-4 right-4 z-50 absolute hover:bg-muted/20 p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={32} />
                        </button>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
                            className="relative shadow-2xl ring-border/50 rounded-xl ring-1 w-full max-w-5xl aspect-video overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={urlFor(selectedImage).url()}
                                alt={selectedImage.alt || "Project Preview"}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                quality={95}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
