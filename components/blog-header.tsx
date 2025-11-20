import { BlogPost } from "@/lib/blog-data";

interface BlogHeaderProps {
    post: BlogPost;
}

export function BlogHeader({ post }: BlogHeaderProps) {
    return (
        <>
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
        </>
    );
}
