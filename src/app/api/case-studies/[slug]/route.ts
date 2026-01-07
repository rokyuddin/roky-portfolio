import { fetchCaseStudyBySlug } from "@/features/case-studies";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const caseStudy = await fetchCaseStudyBySlug(slug);

    if (!caseStudy) {
      return NextResponse.json(
        { error: "Case study not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: caseStudy,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error(`Error fetching case study ${slug} from API:`, error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
