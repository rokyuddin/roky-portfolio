"use client"
import { SectionHeader } from "./section-header";
import { EXPERIENCE } from "@/lib/data";

export function Experience() {
    return (
        <section
            id="experience"
            className="scroll-mt-28 py-24 px-6 bg-secondary/50 transition-colors duration-500"
        >
            <div className="max-w-4xl mx-auto">
                <SectionHeader title="Trajectory" number="02" />

                <div className="space-y-12">
                    {EXPERIENCE.map((job, idx) => (
                        <div
                            key={idx}
                            className="group relative pl-8 border-l border-border hover:border-primary transition-colors duration-500"
                        >
                            <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] bg-background border border-muted-foreground group-hover:border-primary rounded-full transition-colors"></div>

                            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-4">
                                <h3 className="text-2xl text-primary font-light transition-colors duration-500">
                                    {job.role}{" "}
                                    <span className="text-muted-foreground mx-2">
                                        @
                                    </span>{" "}
                                    <span className="font-serif italic">{job.company}</span>
                                </h3>
                                <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-2 md:mt-0">
                                    {job.period}
                                </span>
                            </div>

                            <p className="text-muted-foreground leading-relaxed max-w-2xl mb-6 transition-colors duration-500">
                                {job.description}
                            </p>

                            <div className="flex flex-wrap gap-4 text-xs font-mono text-muted-foreground uppercase tracking-wider">
                                {job.tech.map((t, i) => (
                                    <span
                                        key={i}
                                        className="border-b border-border pb-1"
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
    );
}
