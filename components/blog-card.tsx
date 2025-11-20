"use client";

import Link from "next/link";
import { BlogPost } from "@/lib/blog-data";

interface BlogCardProps {
    post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
    return (
        <Link href={`/blog/${post.slug}`}>
            <article className="group block bg-card border border-border p-6 hover:shadow-xl hover:shadow-muted/50 hover:border-muted-foreground transition-all duration-500">
                <div className="flex items-start gap-6">
                    {/* Icon Section with decorative gradient */}
                    <div className="flex-shrink-0 p-4 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/5 border border-border group-hover:border-primary/30 transition-all duration-500 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative text-4xl group-hover:scale-110 transition-transform duration-500">
                            📝
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-grow min-w-0">
                        <div className="mb-3">
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-3">
                                {post.tags.slice(0, 3).map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs text-muted-foreground font-mono group-hover:text-primary transition-colors duration-300"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl text-primary font-serif mb-2 group-hover:translate-x-2 transition-transform duration-300">
                                {post.title}
                            </h3>
                        </div>

                        {/* Excerpt */}
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                            {post.excerpt}
                        </p>

                        {/* Meta information */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/60 to-accent/40 flex items-center justify-center text-sm">
                                    {post.author.avatar}
                                </div>
                                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                                    {post.author.name}
                                </span>
                            </div>
                            <span className="text-muted-foreground/60">•</span>
                            <time className="group-hover:text-foreground transition-colors">
                                {new Date(post.date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </time>
                            <span className="text-muted-foreground/60">•</span>
                            <span className="group-hover:text-foreground transition-colors">
                                {post.readTime}
                            </span>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}
