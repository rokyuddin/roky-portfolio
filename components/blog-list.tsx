import { BlogCard } from "./blog-card";
import { BlogPost } from "@/lib/blog-data";

interface BlogListProps {
    posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
    if (posts.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                    No posts yet
                </h3>
                <p className="text-muted-foreground">
                    Check back soon for new content!
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
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
    );
}
