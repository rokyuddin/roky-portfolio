"use client";

import React from "react";
import { ChevronDown, FileText } from "lucide-react";
import Image from "next/image";
import { PROFILE } from "../utils";

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
            className="relative flex flex-col justify-center px-6 py-40"
        >
            <div className="gap-12 grid grid-cols-1 lg:grid-cols-12 mx-auto w-full max-w-4xl">
                <div className="flex flex-col justify-center lg:col-span-8">
                    <p className="mb-6 font-mono text-muted-foreground text-sm tracking-widest animate-fade-in-up">
                        HELLO, I AM
                    </p>
                    <h1 className="mb-8 font-serif font-medium text-primary text-5xl md:text-7xl lg:text-8xl sm:leading-[0.9] tracking-tight transition-colors animate-fade-in-up duration-500 delay-100">
                        {PROFILE.name.split(" ")[0]} <br />
                        <span className="font-light text-muted-foreground italic">
                            {PROFILE.name.split(" ")[1]}
                        </span>
                    </h1>
                    <p className="mb-10 max-w-2xl font-light text-muted-foreground text-xl md:text-2xl leading-relaxed transition-colors animate-fade-in-up duration-500 delay-200">
                        A specialized{" "}
                        <span className="font-normal text-primary">
                            Frontend Developer
                        </span>{" "}
                        with <span className="font-normal text-primary">3+ years of experience</span>, crafting refined digital experiences with Next.js & TypeScript.
                    </p>
                    <div className="flex sm:flex-row flex-col gap-4 animate-fade-in-up delay-300">
                        <a
                            href="#contact"
                            onClick={(e) => handleScroll(e, "#contact")}
                            className="bg-primary hover:bg-primary/90 shadow-border shadow-lg px-8 py-4 font-medium text-primary-foreground text-center tracking-wide transition-colors"
                        >
                            GET IN TOUCH
                        </a>
                        <a
                            href="https://drive.google.com/file/d/1CicoWtA6dflZz6hErdzGjboKsgvXzCy9/view"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex justify-center items-center gap-2 hover:bg-primary shadow-border shadow-lg px-8 py-4 border-2 border-primary font-medium text-primary hover:text-primary-foreground tracking-wide transition-colors"
                        >
                            <FileText size={20} />
                            VIEW RESUME
                        </a>
                    </div>
                </div>

                {/* Premium Profile Image */}
                <div className="hidden lg:flex justify-center items-center lg:col-span-4">
                    <div className="group relative">
                        {/* Decorative Background Elements */}
                        <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-transparent blur-2xl group-hover:blur-3xl rounded-lg transition-all duration-500"></div>
                        <div className="-top-3 -right-3 absolute border-primary border-t-2 border-r-2 w-24 h-24"></div>
                        <div className="-bottom-3 -left-3 absolute border-primary border-b-2 border-l-2 w-24 h-24"></div>

                        {/* Image Container */}
                        <div className="relative w-[350px] h-[450px] overflow-hidden">
                            {/* Border Frame */}
                            <div className="z-10 absolute inset-0 border-2 border-primary/30"></div>
                            <div className="z-10 absolute inset-3 border border-primary/20"></div>

                            {/* Image */}
                            <Image
                                src="/profile.jpg"
                                alt="Roky Uddin - Frontend Developer"
                                width={350}
                                height={450}
                                className="grayscale hover:grayscale-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                                priority
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent opacity-60"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bottom-10 left-1/2 absolute opacity-50 text-primary -translate-x-1/2 animate-bounce duration-2000">
                <ChevronDown size={24} />
            </div>
        </section>
    );
}
