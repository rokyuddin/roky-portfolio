import { BlogPost } from "../types";

interface BlogHeaderProps {
    post: BlogPost;
}

export function BlogHeader({ post }: BlogHeaderProps) {
    return (
        <>
            {/* Cover Image Section with Gradient */}
            <div className="relative bg-gradient-to-br from-primary/20 via-accent/30 to-secondary/20 mb-8 md:mb-12 rounded-2xl h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

                {/* Decorative gradient orbs */}
                <div className="top-0 right-0 absolute bg-primary/30 blur-3xl rounded-full w-64 h-64" />
                <div className="bottom-0 left-0 absolute bg-accent/40 blur-3xl rounded-full w-72 h-72" />

                {/* Icon */}
                <div className="absolute inset-0 flex justify-center items-center">
                    <div className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl">📝</div>
                </div>

                {/* Glassmorphism overlay at bottom */}
                <div className="right-0 bottom-0 left-0 absolute bg-background/30 backdrop-blur-sm p-4 sm:p-6 md:p-8 border-border/50 border-t">
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="bg-primary/20 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 border border-primary/30 rounded-full font-medium text-primary text-xs sm:text-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Article Header */}
            <header className="space-y-4 md:space-y-6 mb-8 md:mb-12">
                <h1 className="font-serif font-bold text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                    {post.title}
                </h1>

                <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed">
                    {post.excerpt}
                </p>

                {/* Meta Information */}
                <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 py-4 md:py-6 border-border border-y">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex justify-center items-center bg-gradient-to-br from-primary to-accent rounded-full w-10 sm:w-12 h-10 sm:h-12 text-xl sm:text-2xl">
                            {post.author.avatar}
                        </div>
                        <div>
                            <p className="font-semibold text-foreground text-sm sm:text-base">
                                {post.author.name}
                            </p>
                            <p className="text-muted-foreground text-sm">
                                {new Date(post.date).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </p>
                        </div>
                    </div>
                    <div className="font-medium text-muted-foreground text-sm">
                        {post.readTime}
                    </div>
                </div>
            </header>
        </>
    );
}
