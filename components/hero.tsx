"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { PROFILE } from "@/lib/data";
import Image from "next/image";

export function Hero() {
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.replace("#", "");
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            id="home"
            className="min-h-screen flex flex-col justify-center px-6 relative pt-20"
        >
            <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 flex flex-col justify-center">
                    <p className="text-muted-foreground font-mono mb-6 tracking-widest text-sm animate-fade-in-up">
                        HELLO, I AM
                    </p>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-primary mb-8 sm:leading-[0.9] tracking-tight animate-fade-in-up delay-100 transition-colors duration-500">
                        {PROFILE.name.split(" ")[0]} <br />
                        <span className="text-muted-foreground italic font-light">
                            {PROFILE.name.split(" ")[1]}
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light leading-relaxed mb-10 animate-fade-in-up delay-200 transition-colors duration-500">
                        A specialized{" "}
                        <span className="text-primary font-normal">
                            Frontend Developer
                        </span>{" "}
                        with <span className="text-primary font-normal">3+ years of experience</span>, crafting refined digital experiences with Next.js & TypeScript.
                    </p>
                    <div className="flex gap-6 animate-fade-in-up delay-300">
                        <a
                            href="#contact"
                            onClick={(e) => handleScroll(e, "#contact")}
                            className="px-8 py-4 bg-primary text-primary-foreground font-medium tracking-wide hover:bg-primary/90 transition-colors shadow-lg shadow-border"
                        >
                            GET IN TOUCH
                        </a>
                        <a
                            href="#projects"
                            onClick={(e) => handleScroll(e, "#projects")}
                            className="px-8 py-4 border border-border text-primary font-medium tracking-wide hover:border-primary transition-colors"
                        >
                            VIEW WORK
                        </a>
                    </div>
                </div>

                {/* Premium Profile Image */}
                <div className="hidden lg:flex lg:col-span-4 items-center justify-center">
                    <div className="relative group">
                        {/* Decorative Background Elements */}
                        <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-transparent rounded-lg blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                        <div className="absolute -top-3 -right-3 w-24 h-24 border-t-2 border-r-2 border-primary"></div>
                        <div className="absolute -bottom-3 -left-3 w-24 h-24 border-b-2 border-l-2 border-primary"></div>

                        {/* Image Container */}
                        <div className="relative w-[350px] h-[450px] overflow-hidden">
                            {/* Border Frame */}
                            <div className="absolute inset-0 border-2 border-primary/30 z-10"></div>
                            <div className="absolute inset-3 border border-primary/20 z-10"></div>

                            {/* Image */}
                            <Image
                                src="/profile.jpg"
                                alt="Roky Uddin - Frontend Developer"
                                width={350}
                                height={450}
                                className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                priority
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce duration-[2000ms] opacity-50 text-primary">
                <ChevronDown size={24} />
            </div>
        </section>
    );
}
