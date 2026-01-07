import { fetchCaseStudies } from "@/features/case-studies";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const caseStudies = await fetchCaseStudies();

    return NextResponse.json({
      success: true,
      data: caseStudies,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error fetching case studies from API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
