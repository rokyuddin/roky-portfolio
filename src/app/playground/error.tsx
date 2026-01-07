"use client";

import { useEffect } from "react";
import { Nav } from "@/components/organisms/nav";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col bg-background min-h-screen font-sans">
      <Nav />

      <main className="flex flex-col flex-1 justify-center items-center p-6 text-center">
        <div className="bg-destructive/10 mb-4 p-4 rounded-full">
          <AlertTriangle className="w-10 h-10 text-destructive" />
        </div>
        <h2 className="mb-2 font-bold text-2xl">Something went wrong!</h2>
        <p className="mb-6 max-w-md text-muted-foreground">
          We encountered an error while loading the playground. This might be due to a temporary glitch.
        </p>
        <button
          onClick={reset}
          className="inline-flex justify-center items-center bg-primary hover:bg-primary/90 disabled:opacity-50 px-4 py-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 h-10 font-medium text-primary-foreground text-sm transition-colors disabled:pointer-events-none"
        >
          <RefreshCcw className="mr-2 w-4 h-4" />
          Try again
        </button>
      </main>
    </div>
  );
}
