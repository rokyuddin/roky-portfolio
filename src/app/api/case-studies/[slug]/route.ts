import { NextResponse } from "next/server";
import { CASE_STUDIES } from "@/src/lib/data/case-studies-data";

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Simulate API delay of 1 second
    await delay(1000);

    const caseStudy = CASE_STUDIES.find((study) => study.slug === slug);

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
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
