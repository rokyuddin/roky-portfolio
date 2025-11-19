import React from "react";
import { Code2, Layers, User } from "lucide-react";
import { SectionHeader } from "./section-header";
import { SkillTag } from "./skill-tag";
import { SKILLS } from "@/lib/data";

export function About() {
    return (
        <section
            id="about"
            className="scroll-mt-28 py-24 px-6 border-t border-border transition-colors duration-500"
        >
            <div className="max-w-4xl mx-auto">
                <SectionHeader title="Competencies" number="01" />

                <div className="grid md:grid-cols-2 gap-16">
                    <div>
                        <h3 className="text-xl text-primary mb-6 font-serif italic transition-colors duration-500">
                            Technical Arsenal
                        </h3>
                        <p className="text-muted-foreground leading-loose mb-8 transition-colors duration-500">
                            My development philosophy centers on precision and performance. I
                            leverage modern frameworks to build scalable, type-safe
                            applications that feel seamless to the user.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {SKILLS.map((skill) => (
                                <SkillTag key={skill} name={skill} />
                            ))}
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
