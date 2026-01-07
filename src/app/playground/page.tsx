import { Metadata } from "next";
import { PlaygroundClient } from "@/features/playground";

export const metadata: Metadata = {
  title: "Interactive Code Playground | Md Rokyuddin",
  description: "Experiment with React, Algorithms, and DOM manipulation in a safe, sandboxed environment. Get AI-powered hints and explanations.",
  openGraph: {
    title: "Interactive Code Playground | Md Rokyuddin",
    description: "Experiment with React, Algorithms, and DOM manipulation in a safe, sandboxed environment.",
    type: "website",
  },
};

export default function PlaygroundPage() {
  return <PlaygroundClient />;
}
