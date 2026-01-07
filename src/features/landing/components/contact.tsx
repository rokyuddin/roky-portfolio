"use client"
import { Copy, Github, Linkedin, Mail, MapPin, Smartphone, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type CopiedCard = "email" | "phone" | "location" | null;

interface ContactProps {
    profile: any;
}

function CopiedBadge() {
    return (
        <div className="top-3 right-3 absolute flex items-center gap-1.5 bg-primary/10 px-2 py-1 rounded-md text-primary text-xs animate-in duration-300 fade-in zoom-in">
            <Check size={14} />
            <span>Copied!</span>
        </div>
    );
}

export function Contact({ profile }: ContactProps) {
    const [copiedCard, setCopiedCard] = useState<CopiedCard>(null);

    if (!profile) return null;

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
            className="relative bg-secondary/50 px-6 py-32 overflow-hidden transition-colors duration-500 scroll-mt-28"
        >
            {/* Background Texture */}
            <div className="top-0 left-0 absolute opacity-5 w-full h-full pointer-events-none">
                <div className="right-0 bottom-0 absolute bg-primary blur-[120px] rounded-full w-96 h-96"></div>
            </div>

            <div className="z-10 relative mx-auto max-w-4xl text-center">
                <p className="mb-8 font-mono text-muted-foreground text-sm tracking-widest">
                    WHAT'S NEXT?
                </p>
                <h2 className="mb-12 font-serif text-primary text-5xl md:text-7xl tracking-tight transition-colors duration-500">
                    Let's work together.
                </h2>

                <div className="gap-8 grid md:grid-cols-3 mx-auto mb-16 max-w-2xl">
                    {/* Email Card */}
                    <div className="group relative flex flex-col items-center gap-4 p-6 border border-border hover:border-primary transition-colors">
                        {copiedCard === "email" && <CopiedBadge />}
                        {copiedCard !== "email" && (
                            <button
                                onClick={() => handleCopy(profile.email, "email")}
                                className="top-3 right-3 absolute bg-secondary/80 hover:bg-primary/10 opacity-0 group-hover:opacity-100 p-1.5 rounded-md text-muted-foreground hover:text-primary transition-all"
                                aria-label="Copy email"
                            >
                                <Copy size={16} />
                            </button>
                        )}
                        <Mail className="text-muted-foreground" size={28} />
                        <Link
                            href={`mailto:${profile.email}`}
                            className="text-muted-foreground hover:text-primary text-sm transition-colors"
                        >
                            {profile.email}
                        </Link>
                    </div>

                    {/* Phone Card */}
                    <div className="group relative flex flex-col items-center gap-4 p-6 border border-border hover:border-primary transition-colors">
                        {copiedCard === "phone" && <CopiedBadge />}
                        {copiedCard !== "phone" && (
                            <button
                                onClick={() => handleCopy(profile.phone, "phone")}
                                className="top-3 right-3 absolute bg-secondary/80 hover:bg-primary/10 opacity-0 group-hover:opacity-100 p-1.5 rounded-md text-muted-foreground hover:text-primary transition-all"
                                aria-label="Copy phone number"
                            >
                                <Copy size={16} />
                            </button>
                        )}
                        <Smartphone className="text-muted-foreground" size={28} />
                        <Link
                            href={`tel:${profile.phone}`}
                            className="text-muted-foreground hover:text-primary text-sm transition-colors"
                        >
                            {profile.phone}
                        </Link>
                    </div>

                    {/* Location Card */}
                    <div className="group relative flex flex-col items-center gap-4 p-6 border border-border hover:border-primary transition-colors">
                        {copiedCard === "location" && <CopiedBadge />}
                        {copiedCard !== "location" && (
                            <button
                                onClick={() => handleCopy(profile.location, "location")}
                                className="top-3 right-3 absolute bg-secondary/80 hover:bg-primary/10 opacity-0 group-hover:opacity-100 p-1.5 rounded-md text-muted-foreground hover:text-primary transition-all"
                                aria-label="Copy location"
                            >
                                <Copy size={16} />
                            </button>
                        )}
                        <MapPin className="text-muted-foreground" size={28} />
                        <Link
                            href={getGoogleMapsUrl(profile.location)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary text-sm text-center transition-colors"
                        >
                            {profile.location}
                        </Link>
                    </div>
                </div>

                <div className="flex justify-center gap-8">
                    <Link
                        href={profile.socials?.github || "#"}
                        target="_blank"
                        className="text-muted-foreground hover:text-primary hover:scale-110 transition-colors duration-300 transform"
                    >
                        <Github size={24} />
                    </Link>
                    <Link
                        href={profile.socials?.linkedin || "#"}
                        target="_blank"
                        className="text-muted-foreground hover:text-primary hover:scale-110 transition-colors duration-300 transform"
                    >
                        <Linkedin size={24} />
                    </Link>
                </div>

                <footer className="mt-24 text-muted-foreground text-xs uppercase tracking-widest">
                    © {new Date().getFullYear()} {profile.name}. All rights reserved.
                </footer>
            </div>
        </section>
    );
}
