import { CASE_STUDIES } from "@/features/case-studies";
import { NextResponse } from "next/server";

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET() {
  try {
    // Simulate API delay of 1 second
    await delay(1000);

    return NextResponse.json({
      success: true,
      data: CASE_STUDIES,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
