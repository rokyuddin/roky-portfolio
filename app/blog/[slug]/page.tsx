import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { BackButton } from "@/components/back-button";
import { BlogHeader } from "@/components/blog-header";
import { BlogContent } from "@/components/blog-content";
import { getPostBySlug, getAllPosts } from "@/lib/blog-data";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

type Props = {
    params: Promise<{ slug: string }> | { slug: string };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await Promise.resolve(props.params);
    const post = getPostBySlug(params.slug);

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: `${post.title} - Roky Uddin`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.date,
            authors: [post.author.name],
            tags: post.tags,
        },
    };
}

export default async function BlogDetailPage(props: Props) {
    const params = await Promise.resolve(props.params);
    const post = getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground font-sans transition-colors duration-500">
            <Nav />

            <article className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <BackButton />
                    <BlogHeader post={post} />
                    <BlogContent content={post.content} />

                    {/* Divider */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-8 md:my-16" />

                    {/* Back to Blog Footer */}
                    <div className="text-center">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-primary text-primary-foreground text-sm sm:text-base font-medium tracking-wide hover:bg-primary/90 transition-colors shadow-lg shadow-border"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            BACK TO ALL POSTS
                        </Link>
                    </div>
                </div>
            </article>
        </div>
    );
}
