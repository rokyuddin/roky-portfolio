import { Metadata } from "next";
import { Nav } from "@/components/nav";
import { BlogHero } from "@/components/blog-hero";
import { BlogList } from "@/components/blog-list";
import { getAllPosts } from "@/lib/blog-data";
import { use } from "react";

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
        <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground font-sans transition-colors duration-500">
            <Nav />
            <BlogHero />

            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <BlogList posts={posts} />
                </div>
            </section>
        </div>
    );
}
