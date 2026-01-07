import { Metadata } from "next";
import { Nav } from "@/components/organisms/nav";
import { BlogHero } from "@/features/blogs/components/blog-hero";
import { BlogList } from "@/features/blogs/components/blog-list";
import { use } from "react";
import { getAllPosts } from "@/features/blogs";

export const metadata: Metadata = {
    title: "Blog - Roky Uddin",
    description: "Exploring the intersection of design, development, and digital innovation. Deep dives into web technologies, best practices, and creative insights.",
    openGraph: {
        title: "Blog - Roky Uddin",
        description: "Exploring the intersection of design, development, and digital innovation.",
        type: "website",
    },
};

export default function BlogPage() {
    const posts = use(getAllPosts())

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
