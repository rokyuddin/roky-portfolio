import { Nav } from "@/components/nav";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Nav />
      
      <main className="flex-1 flex flex-col pt-24 pb-6 px-6 max-w-[1800px] mx-auto w-full h-[calc(100vh-2rem)]">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="w-full md:w-1/3 h-10 bg-muted/20 rounded-md animate-pulse" />
          
          <div className="flex items-center gap-2">
            <div className="h-9 w-20 bg-muted/20 rounded-md animate-pulse" />
            <div className="h-9 w-20 bg-muted/20 rounded-md animate-pulse" />
            <div className="h-9 w-28 bg-muted/20 rounded-md animate-pulse" />
          </div>
        </div>

        {/* Main Workspace Skeleton */}
        <div className="flex-1 flex gap-6 min-h-0">
          {/* Left Panel Skeleton */}
          <div className="flex-1 h-full bg-muted/10 rounded-lg border border-border animate-pulse flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="text-sm">Loading Editor...</span>
            </div>
          </div>

          {/* Right Panel Skeleton */}
          <div className="w-[30%] h-full flex flex-col gap-6">
            <div className="flex-1 bg-muted/10 rounded-lg border border-border animate-pulse" />
            <div className="h-[350px] bg-muted/10 rounded-lg border border-border animate-pulse" />
          </div>
        </div>
      </main>
    </div>
  );
}
