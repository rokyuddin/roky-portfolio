"use client";

import { Nav } from "@/components/nav";
import { BlogCard } from "@/components/blog-card";
import { getAllPosts } from "@/lib/blog-data";

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground font-sans transition-colors duration-500">
            <Nav />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center space-y-6 mb-16">
                        {/* Decorative element */}
                        <div className="inline-block">
                            <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium tracking-wider uppercase">
                                Insights & Ideas
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground">
                            Blog
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Exploring the intersection of design, development, and digital innovation.
                            Deep dives into web technologies, best practices, and creative insights.
                        </p>
                    </div>

                    {/* Decorative gradient line */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-16" />

                    {/* Blog Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
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

                    {/* Empty state (if no posts) */}
                    {posts.length === 0 && (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">📝</div>
                            <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                                No posts yet
                            </h3>
                            <p className="text-muted-foreground">
                                Check back soon for new content!
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Add fade-in animation */}
            <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
        </div>
    );
}
