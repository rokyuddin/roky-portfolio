import { ImageResponse } from "next/og";
import { fetchCaseStudyBySlug } from "@/features/case-studies/lib";

export const runtime = "nodejs";

export const alt = "Case study";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = await fetchCaseStudyBySlug(slug);

  const title = caseStudy?.title ?? "Case Study";
  const category = caseStudy?.category ?? "Frontend Developer";
  const role = caseStudy?.overview.role ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #27272a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #27272a 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          color: "#fafafa",
          padding: "60px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 20,
            color: "#a1a1aa",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Case Study
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: "#a1a1aa",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            {category}
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#ffffff",
              maxWidth: "90%",
            }}
          >
            {title}
          </div>
          {role ? (
            <div style={{ display: "flex", marginTop: 12, fontSize: 24, color: "#a1a1aa", fontWeight: 500 }}>
              Role: {role}
            </div>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#a1a1aa",
            fontWeight: 500,
          }}
        >
          Md Rokyuddin · Frontend Developer
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}