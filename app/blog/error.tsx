"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, RefreshCcw } from "lucide-react";
import { Nav } from "@/components/nav";

export default function BlogError({
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
        <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground font-sans transition-colors duration-500">
            <Nav />
            
            <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 pt-20">
                <div className="relative max-w-2xl w-full">
                    {/* Animated gradient orbs in background */}
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-destructive/5 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-destructive/10 rounded-full blur-2xl animate-pulse delay-75" />
                    </div>

                    {/* Error content */}
                    <div className="text-center space-y-8">
                        {/* Icon with glow effect */}
                        <div className="flex justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-destructive/20 rounded-full blur-xl animate-pulse" />
                                <div className="relative w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center border-2 border-destructive/20">
                                    <AlertTriangle className="w-10 h-10 text-destructive animate-pulse" />
                                </div>
                            </div>
                        </div>

                        {/* Error message */}
                        <div className="space-y-4">
                            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                                Failed to Load Blog
                            </h1>
                            <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto">
                                We couldn't load the blog content. This might be a temporary issue.
                            </p>
                            
                            {/* Error details (only in development) */}
                            {process.env.NODE_ENV === "development" && error.message && (
                                <div className="mt-6 p-4 bg-destructive/5 border border-destructive/20 rounded-lg text-left max-w-lg mx-auto">
                                    <p className="text-xs md:text-sm font-mono text-destructive break-all">
                                        {error.message}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <button
                                onClick={reset}
                                className="group inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-primary text-primary-foreground text-sm sm:text-base font-medium tracking-wide hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                            >
                                <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                                Try Again
                            </button>
                            
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-secondary text-secondary-foreground text-sm sm:text-base font-medium tracking-wide hover:bg-secondary/80 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Blog
                            </Link>
                        </div>

                        {/* Decorative line */}
                        <div className="pt-8">
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                        </div>

                        {/* Additional help text */}
                        <p className="text-sm text-muted-foreground">
                            Still having issues?{" "}
                            <Link href="/" className="text-primary hover:underline font-medium">
                                Return home
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
