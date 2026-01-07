"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";

export default function Error({
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
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
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
                            <div className="relative w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center border-2 border-destructive/20">
                                <AlertTriangle className="w-12 h-12 text-destructive animate-pulse" />
                            </div>
                        </div>
                    </div>

                    {/* Error message */}
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                            Something went wrong
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-md mx-auto">
                            We encountered an unexpected error. Don't worry, we're on it.
                        </p>
                        
                        {/* Error details (only in development) */}
                        {process.env.NODE_ENV === "development" && error.message && (
                            <div className="mt-6 p-4 bg-destructive/5 border border-destructive/20 rounded-lg text-left">
                                <p className="text-sm font-mono text-destructive break-all">
                                    {error.message}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <button
                            onClick={reset}
                            className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium tracking-wide hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                            Try Again
                        </button>
                        
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground font-medium tracking-wide hover:bg-secondary/80 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            <Home className="w-4 h-4" />
                            Go Home
                        </Link>
                    </div>

                    {/* Decorative line */}
                    <div className="pt-8">
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                    </div>

                    {/* Additional help text */}
                    <p className="text-sm text-muted-foreground">
                        If this problem persists, please{" "}
                        <Link
                            href="mailto:rokyuddin.dev@gmail.com?subject=Error Report"
                            className="text-primary hover:underline font-medium"
                        >
                            email us
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
