"use client";

import Link from "next/link";
import { BlogPost } from "../types";

interface BlogCardProps {
    post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
    return (
        <Link href={`/blog/${post.slug}`}>
            <article className="group block bg-card hover:shadow-muted/50 hover:shadow-xl p-6 border border-border hover:border-muted-foreground transition-all duration-500">
                <div className="flex items-start gap-6">
                    {/* Icon Section with decorative gradient */}
                    <div className="relative flex-shrink-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/5 p-4 border border-border group-hover:border-primary/30 overflow-hidden transition-all duration-500">
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
                                        className="font-mono text-muted-foreground group-hover:text-primary text-xs transition-colors duration-300"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {/* Title */}
                            <h3 className="mb-2 font-serif text-primary text-2xl transition-transform group-hover:translate-x-2 duration-300">
                                {post.title}
                            </h3>
                        </div>

                        {/* Excerpt */}
                        <p className="mb-4 text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                            {post.excerpt}
                        </p>

                        {/* Meta information */}
                        <div className="flex items-center gap-4 text-muted-foreground text-xs">
                            <div className="flex items-center gap-2">
                                <div className="flex justify-center items-center bg-gradient-to-br from-primary/60 to-accent/40 rounded-full w-6 h-6 text-sm">
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
