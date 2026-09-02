import { Metadata } from "next";
import { Nav } from "@/components/organisms/nav";
import { SiteFooter } from "@/components/organisms/site-footer";
import { BlogHero } from "@/features/blogs/components/blog-hero";
import { BlogList } from "@/features/blogs/components/blog-list";
import { getAllPosts } from "@/features/blogs";
import { SITE_URL, socialMetadata } from "@/lib/site";
import { collectionPageJsonLd, breadcrumbJsonLd, jsonLd } from "@/lib/schema";

const BLOG_TITLE = "Blog";
const BLOG_DESCRIPTION =
    "Practical frontend writing on React, Next.js, TypeScript, performance, and delivery: lessons from real projects and production work.";

export const metadata: Metadata = {
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    ...socialMetadata({
        title: BLOG_TITLE,
        description: BLOG_DESCRIPTION,
        url: `${SITE_URL}/blog`,
    }),
};

export default async function BlogPage() {
    const posts = await getAllPosts()

    return (
        <div className="bg-background selection:bg-primary min-h-screen font-sans text-foreground selection:text-primary-foreground transition-colors duration-500">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: jsonLd(
                        collectionPageJsonLd({
                            name: "Blog",
                            description: BLOG_DESCRIPTION,
                            url: `${SITE_URL}/blog`,
                            items: posts.map((post) => ({
                                name: post.title,
                                url: `${SITE_URL}/blog/${post.slug}`,
                            })),
                        }),
                    ),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: jsonLd(
                        breadcrumbJsonLd([
                            { name: "Home", url: SITE_URL },
                            { name: "Blog", url: `${SITE_URL}/blog` },
                        ]),
                    ),
                }}
            />
            <Nav />
            <BlogHero />

            <section className="px-6 py-16">
                <div className="mx-auto max-w-4xl">
                    <h2 className="mb-8 font-serif text-2xl text-foreground">Frontend Articles &amp; Tutorials</h2>
                    <BlogList posts={posts} />
                </div>
            </section>
            <SiteFooter />
        </div>
    );
}
