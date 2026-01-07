"use client"
import { SectionHeader } from "@/components/organisms/section-header";
import { Code2, Layers, User, Zap } from "lucide-react";

export function About() {
    return (
        <section
            id="about"
            className="px-6 py-24 border-border border-t transition-colors duration-500 scroll-mt-28"
        >
            <div className="mx-auto max-w-4xl">
                <SectionHeader title="Competencies" number="01" />

                <div className="gap-16 grid md:grid-cols-2">
                    <div className="group relative">
                        {/* Decorative Quote Mark with gradient */}
                        <div className="-top-3 -left-6 absolute bg-clip-text bg-gradient-to-br from-primary/30 to-primary/5 font-serif text-transparent text-7xl leading-none transition-opacity duration-500 select-none">"</div>

                        {/* Content Container with enhanced border */}
                        <div className="relative from-primary/40 via-primary/20 to-transparent py-2 pl-8 border-gradient-to-b border-l-2">
                            {/* Enhanced accent elements */}
                            <div className="top-0 -left-[5px] absolute bg-gradient-to-br from-primary to-primary/60 shadow-primary/20 shadow-sm rounded-full size-2.5 animate-pulse"></div>
                            <div className="top-0 -left-[9px] absolute bg-primary/10 blur-sm rounded-full size-4"></div>

                            <div className="space-y-7">
                                <div>
                                    <h3 className="flex items-center gap-3 group-hover:gap-4 mb-5 font-serif text-primary text-2xl italic transition-all transition-colors duration-500">
                                        Professional Background
                                        <span className="inline-block bg-gradient-to-r from-primary via-primary/50 to-transparent w-16 h-[2px] transition-all duration-500"></span>
                                    </h3>
                                </div>

                                <div className="space-y-5">
                                    <p className="text-[15px] text-muted-foreground leading-loose transition-colors duration-500">
                                        <span className="inline-flex items-center gap-1.5 bg-primary/5 px-2 py-0.5 border border-primary/20 rounded-sm font-semibold text-primary">
                                            <span className="bg-primary rounded-full size-1 animate-pulse"></span>
                                            3+ years
                                        </span> of hands-on experience in frontend development, specializing in high-performance web applications that prioritize both user experience and code quality.
                                    </p>

                                    <div className="relative bg-muted/20 hover:bg-muted/30 py-3 pl-5 border-border/50 hover:border-primary/30 border-l-2 rounded-r-sm transition-all duration-300">
                                        <div className="top-1/2 -left-[5px] absolute bg-border rounded-full size-2 -translate-y-1/2"></div>
                                        <p className="text-[15px] text-muted-foreground leading-loose transition-colors duration-500">
                                            My approach combines <span className="bg-foreground/5 px-1.5 py-0.5 rounded font-semibold text-foreground">technical excellence</span> with a keen eye for design, ensuring every project delivers seamless functionality wrapped in intuitive, accessible interfaces.
                                        </p>
                                    </div>

                                    <div className="flex items-start gap-3.5 pt-1">
                                        <div className="flex-shrink-0 bg-gradient-to-br from-primary to-primary/60 shadow-primary/20 shadow-sm mt-2.5 rounded-full size-2"></div>
                                        <p className="text-[15px] text-muted-foreground leading-loose transition-colors duration-500">
                                            I thrive in collaborative environments where <span className="font-medium text-foreground">clean code</span>, <span className="font-medium text-foreground">scalable architecture</span>, and <span className="font-medium text-foreground">continuous learning</span> drive innovation.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative pl-8 border-border border-l transition-colors duration-500">
                        <h3 className="mb-6 font-serif text-primary text-xl italic transition-colors duration-500">
                            Core Focus
                        </h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="bg-secondary p-2 rounded-sm text-secondary-foreground transition-colors duration-500">
                                    <Code2 size={20} />
                                </div>
                                <div>
                                    <h4 className="mb-1 font-medium text-foreground transition-colors duration-500">
                                        Architecture
                                    </h4>
                                    <p className="text-muted-foreground text-sm">
                                        Component-driven design using React & Next.js.
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="bg-secondary p-2 rounded-sm text-secondary-foreground transition-colors duration-500">
                                    <Layers size={20} />
                                </div>
                                <div>
                                    <h4 className="mb-1 font-medium text-foreground transition-colors duration-500">
                                        State Management
                                    </h4>
                                    <p className="text-muted-foreground text-sm">
                                        Complex data flows with Redux, Zustand & Context API.
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="bg-secondary p-2 rounded-sm text-secondary-foreground transition-colors duration-500">
                                    <User size={20} />
                                </div>
                                <div>
                                    <h4 className="mb-1 font-medium text-foreground transition-colors duration-500">
                                        User Experience
                                    </h4>
                                    <p className="text-muted-foreground text-sm">
                                        Tailwind CSS & Material UI for bespoke, responsive
                                        interfaces.
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="bg-secondary p-2 rounded-sm text-secondary-foreground transition-colors duration-500">
                                    <Zap size={20} />
                                </div>
                                <div>
                                    <h4 className="mb-1 font-medium text-foreground transition-colors duration-500">
                                        Performance
                                    </h4>
                                    <p className="text-muted-foreground text-sm">
                                        Core Web Vitals optimization & efficient rendering strategies.
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
