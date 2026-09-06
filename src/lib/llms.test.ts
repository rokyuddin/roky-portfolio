import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { buildLlmsTxt, buildLlmsFullTxt } from "@/lib/llms";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/site";
import type { BlogPost } from "@/features/blogs/types";
import type { CaseStudy } from "@/features/case-studies/types";

const posts: BlogPost[] = [
  {
    slug: "react-server-components",
    title: "React Server Components in Practice",
    excerpt: "What changed when we moved a production app to RSC.",
    content:
      "# Intro\nServer Components moved the hard parts out of the client bundle.\n\n## Result\nIt got faster.",
    date: "2026-01-15",
    author: { name: "Md Rokyuddin", avatar: "👨💻" },
    tags: ["React", "Next.js", "Performance"],
    coverImage: "/placeholder-blog.jpg",
    readTime: "5 min read",
  },
];

const caseStudies: CaseStudy[] = [
  {
    slug: "rydr",
    title: "Rydr",
    subtitle: "Ride-sharing platform",
    category: "Web App",
    heroImage: "https://cdn.sanity.io/hero.png",
    overview: {
      description: "A platform for trip booking and real-time tracking.",
      role: "Frontend Developer",
      duration: "6 months",
      team: "2 engineers",
      liveUrl: "https://rydr.app",
    },
    challenge: {
      title: "Challenge",
      description: "Real-time tracking",
      problems: ["Sync", "Invoices"],
    },
    solution: {
      title: "Solution",
      description: "Admin dashboards",
      approach: ["Maps", "Stripe"],
    },
    features: {
      title: "Features",
      items: [{ name: "Tracking", description: "Live", icon: "map" }],
    },
    techStack: {
      frontend: ["React", "Next.js"],
      backend: ["Node.js"],
      tools: ["Stripe"],
    },
    results: {
      title: "Results",
      description: "Shipped.",
      metrics: [{ label: "Load time", value: "-40%", description: "faster" }],
    },
    gallery: [],
    relatedProjects: [],
    publishedDate: "2026-01-10T08:00:00Z",
  },
];

const base = {
  siteName: SITE_NAME,
  siteUrl: SITE_URL,
  description: SITE_DESCRIPTION,
  posts,
  caseStudies,
};

describe("buildLlmsTxt", () => {
  it("includes every mandatory section", () => {
    const text = buildLlmsTxt(base);
    for (const section of ["## People", "## Key pages", "## Blog", "## Case Studies", "## Contact", "## Technology"]) {
      assert.ok(text.includes(section), `missing section ${section}`);
    }
  });

  it("uses only absolute URLs in markdown links", () => {
    const text = buildLlmsTxt(base);
    const links = text.match(/\[[^\]]+\]\(([^)]+)\)/g) || [];
    for (const link of links) {
      const url = link.match(/\(([^)]+)\)/)![1];
      assert.ok(url.startsWith("http"), `relative URL: ${url}`);
    }
    assert.ok(text.includes(`(${SITE_URL}/)`), "missing homepage absolute URL");
  });

  it("includes blog and case-study summaries as links", () => {
    const text = buildLlmsTxt(base);
    assert.ok(text.includes(`blog/${posts[0].slug}`));
    assert.ok(text.includes(`case-studies/${caseStudies[0].slug}`));
    assert.ok(text.includes(caseStudies[0].subtitle));
  });

  it("contains no raw < characters that could confuse consumers", () => {
    const text = buildLlmsTxt(base);
    assert.ok(!text.includes("<"), "raw < found");
  });
});

describe("buildLlmsFullTxt", () => {
  it("includes every mandatory section", () => {
    const text = buildLlmsFullTxt(base);
    for (const section of ["## People", "## Key pages", "## Blog", "## Case Studies", "## Contact", "## Technology"]) {
      assert.ok(text.includes(section), `missing section ${section}`);
    }
  });

  it("is strictly more complete than the compact llms.txt", () => {
    const compact = buildLlmsTxt(base);
    const full = buildLlmsFullTxt(base);
    assert.ok(full.length > compact.length, "full must be longer than compact");
    assert.ok(full.includes("React Server Components in Practice"));
    assert.ok(full.includes("Load time: -40%"), "case-study metrics missing");
  });

  it("uses only absolute URLs", () => {
    const text = buildLlmsFullTxt(base);
    const links = text.match(/\[[^\]]+\]\(([^)]+)\)/g) || [];
    for (const link of links) {
      const url = link.match(/\(([^)]+)\)/)![1];
      assert.ok(url.startsWith("http"), `relative URL: ${url}`);
    }
  });

  it("contains no raw < characters that could confuse consumers", () => {
    const text = buildLlmsFullTxt(base);
    assert.ok(!text.includes("<"), "raw < found");
  });
});