import { Code2, Layers, User } from "lucide-react";
import { SectionHeader } from "./section-header";

export function About() {
    return (
        <section
            id="about"
            className="scroll-mt-28 py-24 px-6 border-t border-border transition-colors duration-500"
        >
            <div className="max-w-4xl mx-auto">
                <SectionHeader title="Competencies" number="01" />

                <div className="grid md:grid-cols-2 gap-16">
                    <div className="relative group">
                        {/* Decorative Quote Mark with gradient */}
                        <div className="absolute -left-6 -top-3 text-7xl font-serif leading-none select-none bg-gradient-to-br from-primary/30 to-primary/5 bg-clip-text text-transparent transition-opacity duration-500">"</div>

                        {/* Content Container with enhanced border */}
                        <div className="relative border-l-2 border-gradient-to-b from-primary/40 via-primary/20 to-transparent pl-8 py-2">
                            {/* Enhanced accent elements */}
                            <div className="absolute -left-[5px] top-0 size-2.5 rounded-full bg-gradient-to-br from-primary to-primary/60 shadow-sm shadow-primary/20 animate-pulse"></div>
                            <div className="absolute -left-[9px] top-0 size-4 rounded-full bg-primary/10 blur-sm"></div>

                            <div className="space-y-7">
                                <div>
                                    <h3 className="text-2xl text-primary mb-5 font-serif italic transition-colors duration-500 flex items-center gap-3 group-hover:gap-4 transition-all">
                                        Professional Background
                                        <span className="inline-block w-16 h-[2px] bg-gradient-to-r from-primary via-primary/50 to-transparent transition-all duration-500"></span>
                                    </h3>
                                </div>

                                <div className="space-y-5">
                                    <p className="text-muted-foreground leading-loose transition-colors duration-500 text-[15px]">
                                        <span className="inline-flex items-center gap-1.5 text-primary font-semibold bg-primary/5 px-2 py-0.5 rounded-sm border border-primary/20">
                                            <span className="size-1 rounded-full bg-primary animate-pulse"></span>
                                            3+ years
                                        </span> of hands-on experience in frontend development, specializing in high-performance web applications that prioritize both user experience and code quality.
                                    </p>

                                    <div className="relative pl-5 py-3 border-l-2 border-border/50 bg-muted/20 rounded-r-sm transition-all duration-300 hover:border-primary/30 hover:bg-muted/30">
                                        <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 size-2 rounded-full bg-border"></div>
                                        <p className="text-muted-foreground leading-loose transition-colors duration-500 text-[15px]">
                                            My approach combines <span className="text-foreground font-semibold bg-foreground/5 px-1.5 py-0.5 rounded">technical excellence</span> with a keen eye for design, ensuring every project delivers seamless functionality wrapped in intuitive, accessible interfaces.
                                        </p>
                                    </div>

                                    <div className="flex items-start gap-3.5 pt-1">
                                        <div className="mt-2.5 size-2 rounded-full bg-gradient-to-br from-primary to-primary/60 flex-shrink-0 shadow-sm shadow-primary/20"></div>
                                        <p className="text-muted-foreground leading-loose transition-colors duration-500 text-[15px]">
                                            I thrive in collaborative environments where <span className="text-foreground font-medium">clean code</span>, <span className="text-foreground font-medium">scalable architecture</span>, and <span className="text-foreground font-medium">continuous learning</span> drive innovation.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative pl-8 border-l border-border transition-colors duration-500">
                        <h3 className="text-xl text-primary mb-6 font-serif italic transition-colors duration-500">
                            Core Focus
                        </h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="p-2 bg-secondary text-secondary-foreground rounded-sm transition-colors duration-500">
                                    <Code2 size={20} />
                                </div>
                                <div>
                                    <h4 className="text-foreground font-medium mb-1 transition-colors duration-500">
                                        Architecture
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        Component-driven design using React & Next.js.
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-2 bg-secondary text-secondary-foreground rounded-sm transition-colors duration-500">
                                    <Layers size={20} />
                                </div>
                                <div>
                                    <h4 className="text-foreground font-medium mb-1 transition-colors duration-500">
                                        State Management
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        Complex data flows with Redux, Zustand & Context API.
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-2 bg-secondary text-secondary-foreground rounded-sm transition-colors duration-500">
                                    <User size={20} />
                                </div>
                                <div>
                                    <h4 className="text-foreground font-medium mb-1 transition-colors duration-500">
                                        User Experience
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
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
    );
}
