"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { ChevronDown } from "lucide-react";

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

// Nested Menu Component
const NestedMenu = ({ pathname }: { pathname: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        const id = setTimeout(() => {
            setIsOpen(false);
        }, 150);
        setTimeoutId(id);
    };

    const isActive = pathname.startsWith("/case-studies") ||
        pathname.startsWith("/blog") ||
        pathname.startsWith("/playground");

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                className={`text-sm uppercase tracking-widest transition-all duration-300 flex items-center gap-1 ${isActive
                    ? "text-primary border-b border-primary pb-1"
                    : "text-muted-foreground hover:text-primary"
                    }`}
            >
                Explore
                <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {/* Dropdown Menu */}
            <div
                className={`absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg overflow-hidden transition-all duration-300 origin-top ${isOpen
                    ? "opacity-100 scale-y-100 translate-y-0"
                    : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
                    }`}
            >
                <div className="py-2">
                    <Link
                        href="/case-studies"
                        className={`block px-4 py-2.5 text-sm transition-colors ${pathname.startsWith("/case-studies")
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                            }`}
                    >
                        Case Studies
                    </Link>
                    <Link
                        href="/blog"
                        className={`block px-4 py-2.5 text-sm transition-colors ${pathname.startsWith("/blog")
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                            }`}
                    >
                        Blog
                    </Link>
                    <Link
                        href="/playground"
                        className={`block px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${pathname.startsWith("/playground")
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                            }`}
                    >
                        Playground
                        <span className="flex bg-primary rounded-full w-1.5 h-1.5 animate-pulse"></span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

// Mobile Nested Menu Component
const MobileNestedMenu = ({ pathname, closeMobileMenu }: { pathname: string; closeMobileMenu: () => void }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 w-full text-muted-foreground hover:text-primary text-sm uppercase tracking-widest transition-all duration-300"
            >
                Explore
                <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                />
            </button>

            {/* Expandable Menu Items */}
            <div
                className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-40 mt-4" : "max-h-0"
                    }`}
            >
                <div className="flex flex-col gap-3 pl-4 border-border border-l-2">
                    <Link
                        href="/case-studies"
                        onClick={closeMobileMenu}
                        className={`text-sm transition-colors ${pathname.startsWith("/case-studies")
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary"
                            }`}
                    >
                        Case Studies
                    </Link>
                    <Link
                        href="/blog"
                        onClick={closeMobileMenu}
                        className={`text-sm transition-colors ${pathname.startsWith("/blog")
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary"
                            }`}
                    >
                        Blog
                    </Link>
                    <Link
                        href="/playground"
                        onClick={closeMobileMenu}
                        className={`text-sm transition-colors flex items-center gap-1 ${pathname.startsWith("/playground")
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary"
                            }`}
                    >
                        Playground
                        <span className="flex bg-primary rounded-full w-1.5 h-1.5 animate-pulse"></span>
                    </Link>
                </div>
            </div>
        </div>
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
                <div className="flex justify-between items-center mx-auto max-w-4xl">
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
                        className="group relative flex justify-center items-center w-10 h-10"
                        aria-label="Home"
                    >
                        <Image
                            src="/logo.png"
                            alt="Roky Portfolio Logo"
                            width={40}
                            height={40}
                            className="dark:invert object-contain group-hover:scale-110 transition-all duration-300"
                            priority
                        />
                    </Link>
                    <div className="flex items-center gap-4 md:gap-8">
                        <div className="hidden md:flex items-center gap-8">
                            <NavItem
                                href="#home"
                                label="Start"
                                active={activeSection === "home"}
                            />
                            <NavItem
                                href="#about"
                                label="About"
                                active={activeSection === "about"}
                            />
                            <NavItem
                                href="#projects"
                                label="Projects"
                                active={activeSection === "projects"}
                            />
                            <NestedMenu pathname={pathname} />
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
                            className="md:hidden z-50 flex flex-col justify-center items-center gap-1.5 w-6 h-6"
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
                <div className="flex flex-col p-6 h-full">
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
                                href="#about"
                                label="About"
                                active={activeSection === "about"}
                            />
                        </div>
                        <div onClick={closeMobileMenu}>
                            <NavItem
                                href="#projects"
                                label="Projects"
                                active={activeSection === "projects"}
                            />
                        </div>
                        <MobileNestedMenu pathname={pathname} closeMobileMenu={closeMobileMenu} />
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
