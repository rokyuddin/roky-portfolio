import React from "react";
import { Github, Linkedin, Mail, MapPin, Smartphone } from "lucide-react";
import { PROFILE } from "@/lib/data";

export function Contact() {
    return (
        <section
            id="contact"
            className="scroll-mt-28 py-32 px-6 bg-secondary/50 relative overflow-hidden transition-colors duration-500"
        >
            {/* Background Texture */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute right-0 bottom-0 w-96 h-96 bg-primary rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <p className="text-muted-foreground font-mono mb-8 tracking-widest text-sm">
                    WHAT'S NEXT?
                </p>
                <h2 className="text-5xl md:text-7xl font-serif text-primary mb-12 tracking-tight transition-colors duration-500">
                    Let's work together.
                </h2>

                <div className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto mb-16">
                    <div className="flex flex-col items-center gap-4 p-6 border border-border hover:border-primary transition-colors">
                        <Mail className="text-muted-foreground" size={28} />
                        <span className="text-sm text-muted-foreground">
                            {PROFILE.email}
                        </span>
                    </div>
                    <div className="flex flex-col items-center gap-4 p-6 border border-border hover:border-primary transition-colors">
                        <Smartphone className="text-muted-foreground" size={28} />
                        <span className="text-sm text-muted-foreground">
                            {PROFILE.phone}
                        </span>
                    </div>
                    <div className="flex flex-col items-center gap-4 p-6 border border-border hover:border-primary transition-colors">
                        <MapPin className="text-muted-foreground" size={28} />
                        <span className="text-sm text-muted-foreground text-center">
                            {PROFILE.location}
                        </span>
                    </div>
                </div>

                <div className="flex justify-center gap-8">
                    <a
                        href={PROFILE.socials.github}
                        className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110 duration-300"
                    >
                        <Github size={24} />
                    </a>
                    <a
                        href={PROFILE.socials.linkedin}
                        className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110 duration-300"
                    >
                        <Linkedin size={24} />
                    </a>
                </div>

                <footer className="mt-24 text-muted-foreground text-xs tracking-widest uppercase">
                    © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
                </footer>
            </div>
        </section>
    );
}
