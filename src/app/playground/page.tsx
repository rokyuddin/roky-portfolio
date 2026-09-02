import { Metadata } from "next";
import { PlaygroundClient } from "@/features/playground";
import { SITE_URL, socialMetadata } from "@/lib/site";

export const metadata: Metadata = {
  title: "Interactive Code Playground",
  description: "Experiment with React, Algorithms, and DOM manipulation in a safe, sandboxed environment. Get AI-powered hints and explanations.",
  robots: { index: false, follow: true },
  ...socialMetadata({
    title: "Interactive Code Playground",
    description: "Experiment with React, Algorithms, and DOM manipulation in a safe, sandboxed environment.",
    url: `${SITE_URL}/playground`,
  }),
};

export default function PlaygroundPage() {
  return <PlaygroundClient />;
}
