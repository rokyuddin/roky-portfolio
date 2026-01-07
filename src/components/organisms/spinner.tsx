export function Spinner() {
    return (
        <div className="flex justify-center items-center bg-background px-6 min-h-screen">
            <div className="relative">
                {/* Animated gradient orbs in background */}
                <div className="-z-10 absolute inset-0">
                    <div className="top-1/2 left-1/2 absolute bg-primary/5 blur-3xl rounded-full w-64 h-64 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                    <div className="top-1/2 left-1/2 absolute bg-primary/10 blur-2xl rounded-full w-48 h-48 -translate-x-1/2 -translate-y-1/2 animate-pulse delay-75" />
                </div>

                {/* Main loading container */}
                <div className="flex flex-col items-center gap-8">
                    {/* Sophisticated spinner */}
                    <div className="relative w-20 h-20">
                        {/* Outer ring */}
                        <div className="absolute inset-0 border-2 border-border rounded-full" />

                        {/* Animated ring */}
                        <div className="absolute inset-0 border-2 border-transparent border-t-primary border-r-primary rounded-full animate-spin" />

                        {/* Inner pulsing dot */}
                        <div className="absolute inset-0 flex justify-center items-center">
                            <div className="bg-primary rounded-full w-3 h-3 animate-pulse" />
                        </div>

                        {/* Subtle glow effect */}
                        <div className="absolute inset-0 bg-primary/10 blur-md rounded-full animate-pulse" />
                    </div>

                    {/* Loading text with elegant animation */}
                    <div className="flex flex-col items-center gap-3">
                        <p className="font-medium text-foreground text-lg tracking-wide">
                            Loading
                            <span className="inline-flex ml-1">
                                <span className="animate-bounce delay-0">.</span>
                                <span className="animate-bounce delay-100">.</span>
                                <span className="animate-bounce delay-200">.</span>
                            </span>
                        </p>

                        {/* Subtle progress bar */}
                        <div className="bg-border rounded-full w-48 h-1 overflow-hidden">
                            <div className="bg-linear-to-r from-primary/50 via-primary to-primary/50 h-full animate-shimmer" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
