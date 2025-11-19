"use client";

import { useParams, useRouter } from "next/navigation";
import { Nav } from "@/components/nav";
import { getPostBySlug } from "@/lib/blog-data";
import { ArrowLeft } from "lucide-react";

export default function BlogDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const post = getPostBySlug(slug);

    if (!post) {
        return (
            <div className="bg-background min-h-screen text-foreground flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h1 className="text-4xl font-serif font-bold mb-4">Post Not Found</h1>
                    <p className="text-muted-foreground mb-8">
                        The blog post you&apos;re looking for doesn&apos;t exist.
                    </p>
                    <button
                        onClick={() => router.push("/blog")}
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Back to Blog
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground font-sans transition-colors duration-500">
            <Nav />

            <article className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <button
                        onClick={() => router.push("/blog")}
                        className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 mb-8"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                        <span className="text-sm font-medium">Back to Blog</span>
                    </button>

                    {/* Cover Image Section with Gradient */}
                    <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden mb-8 md:mb-12 bg-gradient-to-br from-primary/20 via-accent/30 to-secondary/20">
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

                        {/* Decorative gradient orbs */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/30 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/40 rounded-full blur-3xl" />

                        {/* Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl">📝</div>
                        </div>

                        {/* Glassmorphism overlay at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 backdrop-blur-sm bg-background/30 border-t border-border/50">
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium rounded-full bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Article Header */}
                    <header className="mb-8 md:mb-12 space-y-4 md:space-y-6">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight">
                            {post.title}
                        </h1>

                        <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                            {post.excerpt}
                        </p>

                        {/* Meta Information */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 md:py-6 border-y border-border">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl sm:text-2xl">
                                    {post.author.avatar}
                                </div>
                                <div>
                                    <p className="text-sm sm:text-base font-semibold text-foreground">
                                        {post.author.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(post.date).toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>
                            <div className="text-sm font-medium text-muted-foreground">
                                {post.readTime}
                            </div>
                        </div>
                    </header>

                    {/* Article Content */}
                    <div className="prose prose-lg prose-zinc dark:prose-invert max-w-none">
                        <div
                            className="article-content space-y-6 leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: post.content
                                    .split("\n")
                                    .map((line) => {
                                        // Convert markdown headings to HTML
                                        if (line.startsWith("# ")) {
                                            return `<h1 class="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mt-8 md:mt-12 mb-4 md:mb-6">${line.replace("# ", "")}</h1>`;
                                        }
                                        if (line.startsWith("## ")) {
                                            return `<h2 class="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-foreground mt-6 md:mt-10 mb-3 md:mb-4">${line.replace("## ", "")}</h2>`;
                                        }
                                        if (line.startsWith("### ")) {
                                            return `<h3 class="text-lg sm:text-xl md:text-2xl font-serif font-bold text-foreground mt-4 md:mt-8 mb-2 md:mb-3">${line.replace("### ", "")}</h3>`;
                                        }
                                        // Convert code blocks
                                        if (line.startsWith("```")) {
                                            return line.replace("```", "<pre class='bg-muted p-4 rounded-lg overflow-x-auto my-6'><code>");
                                        }
                                        // Paragraphs
                                        if (line.trim() && !line.startsWith("<")) {
                                            return `<p class="text-sm sm:text-base text-foreground/90 mb-4">${line}</p>`;
                                        }
                                        return line;
                                    })
                                    .join("\n")
                                    .replace(/<\/code><\/pre>/g, "</code></pre>"),
                            }}
                        />
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-8 md:my-16" />

                    {/* Back to Blog Footer */}
                    <div className="text-center">
                        <button
                            onClick={() => router.push("/blog")}
                            className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-primary text-primary-foreground text-sm sm:text-base font-medium tracking-wide hover:bg-primary/90 transition-colors shadow-lg shadow-border"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            BACK TO ALL POSTS
                        </button>
                    </div>
                </div>
            </article>

            {/* Custom styles for article content */}
            <style jsx global>{`
        .article-content pre {
          background: var(--muted);
          padding: 1rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          margin: 1rem 0;
          border: 1px solid var(--border);
          max-width: 100%;
        }
        
        @media (min-width: 640px) {
          .article-content pre {
            padding: 1.5rem;
            margin: 1.5rem 0;
          }
        }
        
        .article-content code {
          font-family: var(--font-mono);
          font-size: 0.8em;
          color: var(--foreground);
          word-break: break-word;
        }
        
        @media (min-width: 640px) {
          .article-content code {
            font-size: 0.9em;
          }
        }
        
        .article-content h1,
        .article-content h2,
        .article-content h3 {
          scroll-margin-top: 6rem;
        }
      `}</style>
        </div>
    );
}
