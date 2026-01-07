"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, RefreshCcw } from "lucide-react";
import { Nav } from "@/components/organisms/nav";

export default function BlogPostError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="bg-background selection:bg-primary min-h-screen font-sans text-foreground selection:text-primary-foreground transition-colors duration-500">
            <Nav />

            <div className="flex justify-center items-center px-6 pt-20 min-h-[calc(100vh-80px)]">
                <div className="relative w-full max-w-2xl">
                    {/* Animated gradient orbs in background */}
                    <div className="-z-10 absolute inset-0">
                        <div className="top-1/2 left-1/2 absolute bg-destructive/5 blur-3xl rounded-full w-96 h-96 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                        <div className="top-1/2 left-1/2 absolute bg-destructive/10 blur-2xl rounded-full w-64 h-64 -translate-x-1/2 -translate-y-1/2 animate-pulse delay-75" />
                    </div>

                    {/* Error content */}
                    <div className="space-y-8 text-center">
                        {/* Icon with glow effect */}
                        <div className="flex justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-destructive/20 blur-xl rounded-full animate-pulse" />
                                <div className="relative flex justify-center items-center bg-destructive/10 border-2 border-destructive/20 rounded-full w-20 h-20">
                                    <AlertTriangle className="w-10 h-10 text-destructive animate-pulse" />
                                </div>
                            </div>
                        </div>

                        {/* Error message */}
                        <div className="space-y-4">
                            <h1 className="font-bold text-foreground text-3xl md:text-4xl tracking-tight">
                                Failed to Load Article
                            </h1>
                            <p className="mx-auto max-w-md text-muted-foreground text-base md:text-lg">
                                We couldn't load this blog post. It might have been moved or deleted.
                            </p>

                            {/* Error details (only in development) */}
                            {process.env.NODE_ENV === "development" && error.message && (
                                <div className="bg-destructive/5 mx-auto mt-6 p-4 border border-destructive/20 rounded-lg max-w-lg text-left">
                                    <p className="font-mono text-destructive text-xs md:text-sm break-all">
                                        {error.message}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex sm:flex-row flex-col justify-center items-center gap-4 pt-4">
                            <button
                                onClick={reset}
                                className="group inline-flex items-center gap-2 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl px-6 sm:px-8 py-3 sm:py-4 font-medium text-primary-foreground text-sm sm:text-base tracking-wide hover:scale-105 transition-all"
                            >
                                <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                                Try Again
                            </button>

                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/80 shadow-lg hover:shadow-xl px-6 sm:px-8 py-3 sm:py-4 font-medium text-secondary-foreground text-sm sm:text-base tracking-wide hover:scale-105 transition-all"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                All Posts
                            </Link>
                        </div>

                        {/* Decorative line */}
                        <div className="pt-8">
                            <div className="bg-gradient-to-r from-transparent to-transparent via-border w-full h-px" />
                        </div>

                        {/* Additional help text */}
                        <p className="text-muted-foreground text-sm">
                            Looking for something specific?{" "}
                            <Link href="/blog" className="font-medium text-primary hover:underline">
                                Browse all posts
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
