import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/site";
import { buildLlmsFullTxt } from "@/lib/llms";
import { getAllPosts } from "@/features/blogs";
import { fetchCaseStudies } from "@/features/case-studies/lib";

/**
 * llms-full.txt — long-form content summary for LLM crawlers, per
 * https://llmstxt.org/. Complements llms.txt with deeper per-resource details.
 */
export async function GET() {
  const [posts, caseStudies] = await Promise.all([
    getAllPosts(),
    fetchCaseStudies(),
  ]);

  const body = buildLlmsFullTxt({
    siteName: SITE_NAME,
    siteUrl: SITE_URL,
    description: SITE_DESCRIPTION,
    posts,
    caseStudies,
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}