"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { FileText } from "lucide-react";

const NavItem = ({
    href,
    label,
    active,
    isHashLink = true,
}: {
    href: string;
    label: string;
    active: boolean;
    isHashLink?: boolean;
}) => {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isHashLink) {
            e.preventDefault();
            // Check if we're already on the home page
            if (window.location.pathname !== "/") {
                // Navigate to home page first, then scroll
                router.push("/");
                setTimeout(() => {
                    const targetId = href.replace("#", "");
                    const element = document.getElementById(targetId);
                    if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                    }
                }, 100);
            } else {
                // Already on home page, just scroll
                const targetId = href.replace("#", "");
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }
        }
    };

    return (
        <Link
            href={href}
            onClick={handleClick}
            className={`text-sm uppercase tracking-widest transition-all duration-300 ${active
                ? "text-primary border-b border-primary pb-1"
                : "text-muted-foreground hover:text-primary"
                }`}
        >
            {label}
        </Link>
    );
};

export function Nav() {
    const [activeSection, setActiveSection] = useState("home");
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Only detect active sections when on the home page
            if (pathname === "/") {
                const sections = ["home", "about", "experience", "projects", "contact"];
                for (const section of sections) {
                    const element = document.getElementById(section);
                    if (element) {
                        const rect = element.getBoundingClientRect();
                        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                            setActiveSection(section);
                        }
                    }
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [pathname]);

    // Reset active section when navigating away from home page
    useEffect(() => {
        if (pathname !== "/") {
            setActiveSection("");
        } else {
            setActiveSection("home");
        }
    }, [pathname]);

    // Close mobile menu when clicking outside
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [mobileMenuOpen]);

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? "bg-background/80 backdrop-blur-md py-4 border-b border-border"
                    : "bg-transparent py-8"
                    }`}
            >
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <Link
                        href="#home"
                        onClick={(e) => {
                            e.preventDefault();
                            const targetId = "home";
                            if (pathname !== "/") {
                                router.push("/");
                                setTimeout(() => {
                                    const element = document.getElementById(targetId);
                                    if (element) {
                                        element.scrollIntoView({ behavior: "smooth" });
                                    }
                                }, 100);
                            } else {
                                const element = document.getElementById(targetId);
                                if (element) {
                                    element.scrollIntoView({ behavior: "smooth" });
                                }
                            }
                        }}
                        className="group relative flex items-center justify-center w-10 h-10"
                        aria-label="Home"
                    >
                        <Image
                            src="/logo.png"
                            alt="Roky Portfolio Logo"
                            width={40}
                            height={40}
                            className="object-contain transition-all duration-300 group-hover:scale-110 dark:invert"
                            priority
                        />
                    </Link>
                    <div className="flex items-center gap-4 md:gap-8">
                        <div className="hidden md:flex gap-8">
                        <NavItem
                            href="#home"
                            label="Start"
                            active={activeSection === "home"}
                        />
                        <NavItem
                            href="/about"
                            label="About"
                            active={pathname === "/about"}
                            isHashLink={false}
                        />
                        <NavItem
                            href="#projects"
                            label="Projects"
                            active={activeSection === "projects"}
                        />
                        <NavItem
                            href="/case-studies"
                            label="Case Studies"
                            active={pathname.startsWith("/case-studies")}
                            isHashLink={false}
                        />
                        <NavItem
                            href="/blog"
                            label="Blog"
                            active={pathname.startsWith("/blog")}
                            isHashLink={false}
                        />
                        <NavItem
                            href="#contact"
                            label="Connect"
                            active={activeSection === "contact"}
                        />
                    </div>

                        <ThemeToggle />

                        {/* Hamburger Button - Mobile Only */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden flex flex-col gap-1.5 w-6 h-6 justify-center items-center z-50"
                            aria-label="Toggle mobile menu"
                        >
                            <span
                                className={`w-6 h-0.5 bg-primary transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                                    }`}
                            />
                            <span
                                className={`w-6 h-0.5 bg-primary transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""
                                    }`}
                            />
                            <span
                                className={`w-6 h-0.5 bg-primary transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                                    }`}
                            />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Drawer */}
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={closeMobileMenu}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 bottom-0 w-64 bg-background border-l border-border z-50 transition-transform duration-300 md:hidden ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full p-6">
                    {/* Close button */}
                    <button
                        onClick={closeMobileMenu}
                        className="self-end mb-8 text-muted-foreground hover:text-primary transition-colors"
                        aria-label="Close menu"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    {/* Navigation Links */}
                    <div className="flex flex-col gap-6">
                        <div onClick={closeMobileMenu}>
                            <NavItem
                                href="#home"
                                label="Start"
                                active={activeSection === "home"}
                            />
                        </div>
                        <div onClick={closeMobileMenu}>
                            <NavItem
                                href="/about"
                                label="About"
                                active={pathname === "/about"}
                                isHashLink={false}
                            />
                        </div>
                        <div onClick={closeMobileMenu}>
                            <NavItem
                                href="#projects"
                                label="Projects"
                                active={activeSection === "projects"}
                            />
                        </div>
                        <div onClick={closeMobileMenu}>
                            <NavItem
                                href="/case-studies"
                                label="Case Studies"
                                active={pathname.startsWith("/case-studies")}
                                isHashLink={false}
                            />
                        </div>
                        <div onClick={closeMobileMenu}>
                            <NavItem
                                href="/blog"
                                label="Blog"
                                active={pathname.startsWith("/blog")}
                                isHashLink={false}
                            />
                        </div>
                        <div onClick={closeMobileMenu}>
                            <NavItem
                                href="#contact"
                                label="Connect"
                                active={activeSection === "contact"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
