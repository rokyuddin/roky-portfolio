"use client"
import { useState } from "react";
import { BlogCard } from "./blog-card";
import { BlogPost } from "@/lib/blog-data";
import { BlogSearch } from "./blog-search";

interface BlogListProps {
    posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div>
            <BlogSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            
            {filteredPosts.length === 0 ? (
                <div className="text-center py-20">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                        No posts found
                    </h3>
                    <p className="text-muted-foreground">
                        Try adjusting your search terms.
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    {filteredPosts.map((post, index) => (
                        <div
                            key={post.slug}
                            className="animate-fade-in"
                            style={{
                                animationDelay: `${index * 100}ms`,
                                animationFillMode: "both",
                            }}
                        >
                            <BlogCard post={post} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
