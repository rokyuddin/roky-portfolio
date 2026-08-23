import { client } from "@/sanity/lib/client";
import { postsQuery, postBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { BlogPost } from "../types";

import { cacheLife, cacheTag } from "next/cache";
import { PLACEHOLDER_COVER_IMAGE } from "./cover";

/**
 * Get all blog posts from Sanity sorted by date (newest first)
 */
export async function getAllPosts(): Promise<BlogPost[]> {
    "use cache";
    cacheLife("blog");
    cacheTag("posts");
    const posts = await client.fetch(postsQuery);
    return posts.map(transformPost);
}

/**
 * Get a single blog post by slug from Sanity
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
    "use cache";
    cacheLife("blog");
    cacheTag("posts", `post-${slug}`);
    const post = await client.fetch(postBySlugQuery, { slug });
    if (!post) return undefined;
    return transformPost(post);
}

/**
 * Helper to transform Sanity post to frontend BlogPost type
 */
function transformPost(sanityPost: any): BlogPost {
    return {
        slug: sanityPost.slug?.current || "",
        title: sanityPost.title,
        excerpt: sanityPost.excerpt,
        content: sanityPost.content,
        date: sanityPost.date,
        author: {
            name: sanityPost.author?.name || "Md Rokyuddin",
            avatar: sanityPost.author?.avatar || "👨‍💻",
        },
        tags: sanityPost.tags || [],
        coverImage: sanityPost.coverImage?.asset
            ? urlFor(sanityPost.coverImage.asset).url()
            : PLACEHOLDER_COVER_IMAGE,
        readTime: sanityPost.readTime || "5 min read",
        relatedCaseStudies: sanityPost.relatedCaseStudies || [],
        updatedAt: sanityPost._updatedAt,
    };
}
