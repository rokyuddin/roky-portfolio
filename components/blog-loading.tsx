"use client";

export function BlogLoading() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
            <div className="relative">
                {/* Animated gradient orbs in background */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/10 rounded-full blur-2xl animate-pulse delay-75" />
                </div>

                {/* Main loading container */}
                <div className="flex flex-col items-center gap-8">
                    {/* Sophisticated spinner */}
                    <div className="relative w-20 h-20">
                        {/* Outer ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-border" />
                        
                        {/* Animated ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary animate-spin" />
                        
                        {/* Inner pulsing dot */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                        </div>
                        
                        {/* Subtle glow effect */}
                        <div className="absolute inset-0 rounded-full bg-primary/10 blur-md animate-pulse" />
                    </div>

                    {/* Loading text with elegant animation */}
                    <div className="flex flex-col items-center gap-3">
                        <p className="text-foreground font-medium text-lg tracking-wide">
                            Loading
                            <span className="inline-flex ml-1">
                                <span className="animate-bounce delay-0">.</span>
                                <span className="animate-bounce delay-100">.</span>
                                <span className="animate-bounce delay-200">.</span>
                            </span>
                        </p>
                        
                        {/* Subtle progress bar */}
                        <div className="w-48 h-1 bg-border rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary/50 via-primary to-primary/50 animate-shimmer" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

