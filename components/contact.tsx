"use client"
import { Copy, Github, Linkedin, Mail, MapPin, Smartphone } from "lucide-react";
import { PROFILE } from "@/lib/data";
import Link from "next/link";
import { useState } from "react";

type CopiedCard = "email" | "phone" | "location" | null;

const CopiedBadge = () => (
    <div className="absolute top-3 right-3 px-1.5 py-0.5 text-[10px] font-medium text-green-600 border border-green-600 rounded-sm">
        Copied!
    </div>
);

export function Contact() {
    const [copiedCard, setCopiedCard] = useState<CopiedCard>(null);

    const handleCopy = (text: string, cardType: CopiedCard) => {
        navigator.clipboard.writeText(text);
        setCopiedCard(cardType);
        setTimeout(() => {
            setCopiedCard(null);
        }, 3000);
    };

    const getGoogleMapsUrl = (location: string) => {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    };

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
                    {/* Email Card */}
                    <div className="relative group flex flex-col items-center gap-4 p-6 border border-border hover:border-primary transition-colors">
                        {copiedCard === "email" && <CopiedBadge />}
                        {copiedCard !== "email" && (
                            <button
                                onClick={() => handleCopy(PROFILE.email, "email")}
                                className="absolute top-3 right-3 p-1.5 rounded-md bg-secondary/80 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all opacity-0 group-hover:opacity-100"
                                aria-label="Copy email"
                            >
                                <Copy size={16} />
                            </button>
                        )}
                        <Mail className="text-muted-foreground" size={28} />
                        <Link
                            href={`mailto:${PROFILE.email}`}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                            {PROFILE.email}
                        </Link>
                    </div>

                    {/* Phone Card */}
                    <div className="relative group flex flex-col items-center gap-4 p-6 border border-border hover:border-primary transition-colors">
                        {copiedCard === "phone" && <CopiedBadge />}
                        {copiedCard !== "phone" && (
                            <button
                                onClick={() => handleCopy(PROFILE.phone, "phone")}
                                className="absolute top-3 right-3 p-1.5 rounded-md bg-secondary/80 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all opacity-0 group-hover:opacity-100"
                                aria-label="Copy phone number"
                            >
                                <Copy size={16} />
                            </button>
                        )}
                        <Smartphone className="text-muted-foreground" size={28} />
                        <Link
                            href={`tel:${PROFILE.phone}`}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                            {PROFILE.phone}
                        </Link>
                    </div>

                    {/* Location Card */}
                    <div className="relative group flex flex-col items-center gap-4 p-6 border border-border hover:border-primary transition-colors">
                        {copiedCard === "location" && <CopiedBadge />}
                        {copiedCard !== "location" && (
                            <button
                                onClick={() => handleCopy(PROFILE.location, "location")}
                                className="absolute top-3 right-3 p-1.5 rounded-md bg-secondary/80 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all opacity-0 group-hover:opacity-100"
                                aria-label="Copy location"
                            >
                                <Copy size={16} />
                            </button>
                        )}
                        <MapPin className="text-muted-foreground" size={28} />
                        <Link
                            href={getGoogleMapsUrl(PROFILE.location)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors text-center"
                        >
                            {PROFILE.location}
                        </Link>
                    </div>
                </div>

                <div className="flex justify-center gap-8">
                    <Link
                        href={PROFILE.socials.github}
                        target="_blank"
                        className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110 duration-300"
                    >
                        <Github size={24} />
                    </Link>
                    <Link
                        href={PROFILE.socials.linkedin}
                        target="_blank"
                        className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110 duration-300"
                    >
                        <Linkedin size={24} />
                    </Link>
                </div>

                <footer className="mt-24 text-muted-foreground text-xs tracking-widest uppercase">
                    © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
                </footer>
            </div>
        </section>
    );
}
