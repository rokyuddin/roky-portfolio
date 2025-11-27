"use client";

import { Search } from "lucide-react";

interface BlogSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function BlogSearch({ searchQuery, setSearchQuery }: BlogSearchProps) {
  return (
    <div className="relative mb-8">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
      <input
        type="text"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
      />
    </div>
  );
}
