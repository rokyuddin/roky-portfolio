import { SectionHeader } from "@/components/organisms/section-header";

interface ExperienceProps {
    experience: any[];
}

export function Experience({ experience }: ExperienceProps) {
    if (!experience) return null;
    return (
        <section
            id="experience"
            className="bg-secondary/50 px-6 py-24 transition-colors duration-500 scroll-mt-28"
        >
            <div className="mx-auto max-w-4xl">
                <SectionHeader title="Trajectory" number="03" />

                <div className="space-y-12">
                    {experience.map((job, idx) => (
                        <div
                            key={idx}
                            className="group relative pl-8 border-border hover:border-primary border-l transition-colors duration-500"
                        >
                            <div className="top-0 -left-[5px] absolute bg-background border border-muted-foreground group-hover:border-primary rounded-full w-[9px] h-[9px] transition-colors"></div>

                            <div className="flex md:flex-row flex-col md:justify-between md:items-baseline mb-4">
                                <h3 className="font-light text-primary text-2xl transition-colors duration-500">
                                    {job.role}{" "}
                                    <span className="mx-2 text-muted-foreground">
                                        @
                                    </span>{" "}
                                    <span className="font-serif italic">{job.company}</span>
                                </h3>
                                <span className="mt-2 md:mt-0 font-mono text-muted-foreground text-xs uppercase tracking-widest">
                                    {job.period}
                                </span>
                            </div>

                            <p className="mb-6 max-w-2xl text-muted-foreground leading-relaxed transition-colors duration-500">
                                {job.description}
                            </p>

                            <div className="flex flex-wrap gap-4 font-mono text-muted-foreground text-xs uppercase tracking-wider">
                                {job.techStack?.map((t: string, i: number) => (
                                    <span
                                        key={i}
                                        className="pb-1 border-border border-b"
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
