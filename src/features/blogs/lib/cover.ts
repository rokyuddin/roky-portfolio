/** Fallback cover used when a post has no Sanity cover image. */
export const PLACEHOLDER_COVER_IMAGE = "/placeholder-blog.jpg";

/** A post has a real, renderable cover image only if it is not the placeholder. */
export function hasCoverImage(coverImage: string): boolean {
    return Boolean(coverImage) && coverImage !== PLACEHOLDER_COVER_IMAGE;
}
