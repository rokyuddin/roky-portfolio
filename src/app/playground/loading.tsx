import { Nav } from "@/components/organisms/nav";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col bg-background min-h-screen font-sans">
      <Nav />

      <main className="flex flex-col flex-1 mx-auto px-6 pt-24 pb-6 w-full max-w-[1800px] h-[calc(100vh-2rem)]">
        {/* Header Skeleton */}
        <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-4 mb-6">
          <div className="bg-muted/20 rounded-md w-full md:w-1/3 h-10 animate-pulse" />

          <div className="flex items-center gap-2">
            <div className="bg-muted/20 rounded-md w-20 h-9 animate-pulse" />
            <div className="bg-muted/20 rounded-md w-20 h-9 animate-pulse" />
            <div className="bg-muted/20 rounded-md w-28 h-9 animate-pulse" />
          </div>
        </div>

        {/* Main Workspace Skeleton */}
        <div className="flex flex-1 gap-6 min-h-0">
          {/* Left Panel Skeleton */}
          <div className="flex flex-1 justify-center items-center bg-muted/10 border border-border rounded-lg h-full animate-pulse">
            <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="text-sm">Loading Editor...</span>
            </div>
          </div>

          {/* Right Panel Skeleton */}
          <div className="flex flex-col gap-6 w-[30%] h-full">
            <div className="flex-1 bg-muted/10 border border-border rounded-lg animate-pulse" />
            <div className="bg-muted/10 border border-border rounded-lg h-[350px] animate-pulse" />
          </div>
        </div>
      </main>
    </div>
  );
}
