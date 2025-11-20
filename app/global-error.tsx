"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
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
        <html>
            <body>
                <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
                    <div className="relative max-w-2xl w-full">
                        {/* Animated gradient orbs in background */}
                        <div className="absolute inset-0 -z-10">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "75ms" }} />
                        </div>

                        {/* Error content */}
                        <div className="text-center space-y-8">
                            {/* Icon with glow effect */}
                            <div className="flex justify-center">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse" />
                                    <div className="relative w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center border-2 border-red-500/20">
                                        <AlertTriangle className="w-12 h-12 text-red-500 animate-pulse" />
                                    </div>
                                </div>
                            </div>

                            {/* Error message */}
                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-5xl font-bold text-zinc-50 tracking-tight">
                                    Critical Error
                                </h1>
                                <p className="text-lg text-zinc-400 max-w-md mx-auto">
                                    A critical error occurred. Please try refreshing the page.
                                </p>
                                
                                {/* Error details (only in development) */}
                                {process.env.NODE_ENV === "development" && error.message && (
                                    <div className="mt-6 p-4 bg-red-500/5 border border-red-500/20 rounded-lg text-left">
                                        <p className="text-sm font-mono text-red-400 break-all">
                                            {error.message}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Action button */}
                            <div className="flex justify-center pt-4">
                                <button
                                    onClick={reset}
                                    className="group inline-flex items-center gap-2 px-8 py-4 bg-zinc-50 text-zinc-900 font-medium tracking-wide hover:bg-zinc-200 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                                >
                                    <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                                    Reload Page
                                </button>
                            </div>

                            {/* Decorative line */}
                            <div className="pt-8">
                                <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
                            </div>

                            {/* Additional help text */}
                            <p className="text-sm text-zinc-500">
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
            </body>
        </html>
    );
}
