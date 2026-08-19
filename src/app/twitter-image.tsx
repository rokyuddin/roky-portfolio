import { ImageResponse } from "next/og";
import { client } from "@/sanity/lib/client";
import { profileQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const runtime = "nodejs";

export const alt = "Md Rokyuddin - Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const profile = await client.fetch(profileQuery);
  const imageUrl = profile?.profileImage
    ? urlFor(profile.profileImage).width(800).height(800).fit("crop").url()
    : null;

  const name = profile?.name || "Md Rokyuddin";
  const role = profile?.role || "Frontend Developer";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
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
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: "60%",
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: "#a1a1aa",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 16,
              fontWeight: 600,
            }}
          >
            Portfolio
          </div>
          <div
            style={{
              fontSize: 58,
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: 16,
              color: "#ffffff",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#a1a1aa",
              fontWeight: 500,
            }}
          >
            {role}
          </div>
        </div>
        {imageUrl ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 320,
              height: 320,
              borderRadius: 160,
              overflow: "hidden",
              border: "4px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        ) : null}
      </div>
    ),
    {
      ...size,
    }
  );
}
