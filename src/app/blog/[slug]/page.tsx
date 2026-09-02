import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/organisms/nav";
import { SiteFooter } from "@/components/organisms/site-footer";
import { BackButton, getAllPosts, getPostBySlug } from "@/features/blogs";
import { BlogHeader } from "@/features/blogs";
import { BlogContent } from "@/features/blogs";
import { ScrollProgress } from "@/components/atoms/scroll-progress";
import { ArrowLeft } from "lucide-react";
import { SITE_URL, socialMetadata } from "@/lib/site";
import { breadcrumbJsonLd, blogPostingJsonLd, jsonLd } from "@/lib/schema";
import { getCaseStudyRefsBySlugs } from "@/features/case-studies/lib";

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: "Post Not Found",
            robots: { index: false },
        };
    }

    const postUrl = `${SITE_URL}/blog/${post.slug}`;
    const title = post.title;
    const ogImage =
        post.coverImage && post.coverImage !== "/placeholder-blog.jpg"
            ? post.coverImage
            : undefined;

    return {
        title,
        description: post.excerpt,
        ...socialMetadata({
            title,
            description: post.excerpt,
            url: postUrl,
            type: "article",
            image: ogImage,
            openGraphExtras: {
                publishedTime: post.date,
                authors: [post.author.name],
                tags: post.tags,
                ...(post.updatedAt ? { modifiedTime: post.updatedAt } : {}),
            },
        }),
    };
}

export default async function BlogDetailPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);


    if (!post) {
        notFound();
    }

    const relatedCaseStudies = post.relatedCaseStudies?.length
        ? await getCaseStudyRefsBySlugs(post.relatedCaseStudies)
        : [];

    return (
        <div className="bg-background selection:bg-primary min-h-screen font-sans text-foreground selection:text-primary-foreground transition-colors duration-500">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: jsonLd(blogPostingJsonLd(post)) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: jsonLd(
                        breadcrumbJsonLd([
                            { name: "Home", url: SITE_URL },
                            { name: "Blog", url: `${SITE_URL}/blog` },
                            { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
                        ]),
                    ),
                }}
            />
            <ScrollProgress />
            <Nav />

            <article className="px-6 pt-32 pb-20">
                <div className="mx-auto max-w-4xl">
                    <BackButton />
                    <BlogHeader post={post} />
                    <BlogContent content={post.content} />

                    {relatedCaseStudies.length > 0 ? (
                        <aside className="bg-muted/30 mt-10 p-6 border border-border rounded-lg">
                            <h2 className="font-serif text-primary text-2xl">Explore the work behind this article</h2>
                            <p className="mt-2 text-muted-foreground">
                                These case studies cover the project this article draws on.
                            </p>
                            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
                                {relatedCaseStudies.map((study) => (
                                    <Link
                                        key={study.slug}
                                        href={`/case-studies/${study.slug}`}
                                        className="font-medium text-primary hover:underline"
                                    >
                                        {study.title}
                                    </Link>
                                ))}
                                <Link href="/#contact" className="font-medium text-primary hover:underline">
                                    Start a conversation
                                </Link>
                            </div>
                        </aside>
                    ) : (
                        <aside className="bg-muted/30 mt-10 p-6 border border-border rounded-lg">
                            <h2 className="font-serif text-primary text-2xl">Explore the work behind the writing</h2>
                            <p className="mt-2 text-muted-foreground">
                                Browse frontend case studies or get in touch to discuss a role or project.
                            </p>
                            <div className="flex flex-wrap gap-3 mt-4">
                                <Link href="/case-studies" className="font-medium text-primary hover:underline">
                                    View case studies
                                </Link>
                                <Link href="/#contact" className="font-medium text-primary hover:underline">
                                    Start a conversation
                                </Link>
                            </div>
                        </aside>
                    )}

                    {/* Divider */}
                    <div className="bg-linear-to-r from-transparent to-transparent my-8 md:my-16 via-border w-full h-px" />

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
            <SiteFooter />
        </div>
    );
}
