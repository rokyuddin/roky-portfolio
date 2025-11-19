"use client";

import Link from "next/link";
import { BlogPost } from "@/lib/blog-data";

interface BlogCardProps {
    post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
    return (
        <Link href={`/blog/${post.slug}`} className="h-full">
            <article className="h-full flex flex-col group relative overflow-hidden rounded-2xl bg-card border border-border transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                {/* Cover Image with Gradient Overlay */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/20 via-accent/30 to-secondary/20">
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                    {/* Decorative gradient orbs */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/30 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/40 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

                    {/* Image placeholder with icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl group-hover:scale-110 transition-transform duration-500">
                            📝
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 space-y-4 flex flex-col">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20 transition-colors duration-300 group-hover:bg-primary/20"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground leading-relaxed line-clamp-3">
                        {post.excerpt}
                    </p>

                    {/* Spacer to push meta info to bottom */}
                    <div className="flex-1" />

                    {/* Meta information */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lg">
                                {post.author.avatar}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground">
                                    {post.author.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {new Date(post.date).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>
                        <div className="text-sm text-muted-foreground font-medium">
                            {post.readTime}
                        </div>
                    </div>

                    {/* Read more indicator */}
                    <div className="flex items-center gap-2 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-sm">Read Article</span>
                        <svg
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </div>
                </div>

                {/* Glassmorphism shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                </div>
            </article>
        </Link>
    );
}
