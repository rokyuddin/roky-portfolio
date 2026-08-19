import { Metadata } from "next";
import { Nav } from "@/components/organisms/nav";
import { BlogHero } from "@/features/blogs/components/blog-hero";
import { BlogList } from "@/features/blogs/components/blog-list";
import { getAllPosts } from "@/features/blogs";
import { SITE_NAME, SITE_URL, socialMetadata } from "@/lib/site";

export const metadata: Metadata = {
    title: `Blog - ${SITE_NAME}`,
    description: "Exploring the intersection of design, development, and digital innovation. Deep dives into web technologies, best practices, and creative insights.",
    ...socialMetadata({
        title: `Blog - ${SITE_NAME}`,
        description: "Exploring the intersection of design, development, and digital innovation.",
        url: `${SITE_URL}/blog`,
    }),
};

export default async function BlogPage() {
    const posts = await getAllPosts()

    return (
        <div className="bg-background selection:bg-primary min-h-screen font-sans text-foreground selection:text-primary-foreground transition-colors duration-500">
            <Nav />
            <BlogHero />

            <section className="px-6 py-16">
                <div className="mx-auto max-w-4xl">
                    <BlogList posts={posts} />
                </div>
            </section>
        </div>
    );
}
