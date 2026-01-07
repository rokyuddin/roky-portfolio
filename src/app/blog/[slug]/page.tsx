import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/organisms/nav";
import { BackButton, getAllPosts, getPostBySlug } from "@/features/blogs";
import { BlogHeader } from "@/features/blogs";
import { BlogContent } from "@/features/blogs";
import { ScrollProgress } from "@/components/atoms/scroll-progress";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

type Props = {
    params: Promise<{ slug: string }> | { slug: string };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await Promise.resolve(props.params);
    const post = await getPostBySlug(params.slug);

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
    const post = await getPostBySlug(params.slug);


    if (!post) {
        notFound();
    }

    return (
        <div className="bg-background selection:bg-primary min-h-screen font-sans text-foreground selection:text-primary-foreground transition-colors duration-500">
            <ScrollProgress />
            <Nav />

            <article className="px-6 pt-32 pb-20">
                <div className="mx-auto max-w-4xl">
                    <BackButton />
                    <BlogHeader post={post} />
                    <BlogContent content={post.content} />

                    {/* Divider */}
                    <div className="bg-gradient-to-r from-transparent to-transparent my-8 md:my-16 via-border w-full h-px" />

                    {/* Back to Blog Footer */}
                    <div className="text-center">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 shadow-border shadow-lg px-6 sm:px-8 py-3 sm:py-4 font-medium text-primary-foreground text-sm sm:text-base tracking-wide transition-colors"
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
