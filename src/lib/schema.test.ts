import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  articleJsonLd,
  blogPostingJsonLd,
  breadcrumbJsonLd,
  collectionPageJsonLd,
  jsonLd,
  personJsonLd,
  websiteJsonLd,
} from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { BlogPost } from "@/features/blogs/types";

const post: BlogPost = {
  slug: "react-server-components",
  title: "React Server Components in Practice",
  excerpt: "What changed when we moved a production app to RSC.",
  content: "# Hello",
  date: "2026-01-15",
  author: { name: "Md Rokyuddin", avatar: "👨‍💻" },
  tags: ["React", "Next.js"],
  coverImage: "/placeholder-blog.jpg",
  readTime: "5 min read",
};

describe("personJsonLd", () => {
  it("uses a stable canonical @id", () => {
    const data = personJsonLd();
    assert.equal(data["@type"], "Person");
    assert.equal(data["@id"], `${SITE_URL}/#person`);
  });

  it("omits image when not provided", () => {
    const data = personJsonLd();
    assert.equal("image" in data, false);
  });

  it("includes image when provided", () => {
    const url = "https://cdn.sanity.io/profile.jpg";
    const data = personJsonLd(url);
    assert.equal(data.image, url);
  });

  it("includes knowsAbout with at least React and Next.js", () => {
    const data = personJsonLd();
    assert.ok(Array.isArray(data.knowsAbout));
    assert.ok((data.knowsAbout as string[]).includes("React"));
    assert.ok((data.knowsAbout as string[]).includes("Next.js"));
  });
});

describe("websiteJsonLd", () => {
  it("references the site name and the Person publisher", () => {
    const data = websiteJsonLd();
    assert.equal(data["@type"], "WebSite");
    assert.equal(data.name, SITE_NAME);
    assert.equal(data.url, SITE_URL);
    assert.deepEqual(data.publisher, { "@id": `${SITE_URL}/#person` });
  });
});

describe("breadcrumbJsonLd", () => {
  it("numbers items from 1 and keeps canonical names/urls", () => {
    const data = breadcrumbJsonLd([
      { name: "Home", url: SITE_URL },
      { name: "Blog", url: `${SITE_URL}/blog` },
    ]);
    assert.equal(data["@type"], "BreadcrumbList");
    assert.deepEqual(
      data.itemListElement.map((item: { position: number }) => item.position),
      [1, 2],
    );
    assert.equal(data.itemListElement[1].name, "Blog");
    assert.equal(data.itemListElement[1].item, `${SITE_URL}/blog`);
  });
});

describe("blogPostingJsonLd", () => {
  it("derives the canonical URL from the slug", () => {
    const data = blogPostingJsonLd(post);
    const url = `${SITE_URL}/blog/${post.slug}`;
    assert.equal(data.url, url);
    assert.deepEqual(data.mainEntityOfPage, { "@type": "WebPage", "@id": url });
    assert.equal(data.headline, post.title);
    assert.equal(data.datePublished, post.date);
  });

  it("always emits dateModified, falling back to datePublished", () => {
    const noUpdated = blogPostingJsonLd(post);
    assert.equal(noUpdated.dateModified, post.date);
    const updated = blogPostingJsonLd({ ...post, updatedAt: "2026-02-01T10:00:00Z" });
    assert.equal(updated.dateModified, "2026-02-01T10:00:00Z");
  });

  it("uses the site Person @id as author", () => {
    const data = blogPostingJsonLd(post);
    assert.deepEqual(data.author, { "@id": `${SITE_URL}/#person` });
  });

  it("omits placeholder cover images and joins tags into keywords", () => {
    const withoutImage = blogPostingJsonLd(post);
    assert.equal("image" in withoutImage, false);
    assert.equal(withoutImage.keywords, "React, Next.js");

    const withImage = blogPostingJsonLd({
      ...post,
      coverImage: "https://cdn.sanity.io/img.png",
      tags: [],
    });
    assert.equal(withImage.image, "https://cdn.sanity.io/img.png");
    assert.equal("keywords" in withImage, false);
  });
});

describe("articleJsonLd", () => {
  const caseStudy = {
    slug: "rydr",
    title: "Rydr",
    subtitle: "Ride-sharing platform",
    description: "A ride-sharing frontend.",
    category: "Web App",
    heroImage: "https://cdn.sanity.io/hero.png",
    updatedAt: "2026-03-01T09:00:00Z",
  };

  it("derives the canonical URL from the slug and keeps visible fields", () => {
    const data = articleJsonLd(caseStudy);
    const url = `${SITE_URL}/case-studies/${caseStudy.slug}`;
    assert.equal(data.url, url);
    assert.deepEqual(data.mainEntityOfPage, { "@type": "WebPage", "@id": url });
    assert.equal(data.headline, caseStudy.title);
    assert.equal(data.description, caseStudy.description);
    assert.equal(data.image, caseStudy.heroImage);
    assert.equal(data.articleSection, caseStudy.category);
    assert.deepEqual(data.author, { "@id": `${SITE_URL}/#person` });
  });

  it("falls back to the title for headline and omits absent optional fields", () => {
    const minimal = articleJsonLd({ slug: "skinsight", title: "Skinsight" });
    assert.equal(minimal.headline, "Skinsight");
    assert.equal("description" in minimal, false);
    assert.equal("dateModified" in minimal, false);
    assert.equal("image" in minimal, false);
  });

  it("emits dateModified only when an updatedAt date exists", () => {
    const data = articleJsonLd(caseStudy);
    assert.equal(data.dateModified, caseStudy.updatedAt);
  });
});

describe("collectionPageJsonLd", () => {
  it("lists visible items under the collection URL", () => {
    const data = collectionPageJsonLd({
      name: "Blog",
      description: "Frontend writing.",
      url: `${SITE_URL}/blog`,
      items: [
        { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
      ],
    });
    assert.equal(data["@type"], "CollectionPage");
    assert.equal(data.url, `${SITE_URL}/blog`);
    assert.equal(data.mainEntity?.itemListElement[0].name, post.title);
  });

  it("omits mainEntity when there are no items", () => {
    const data = collectionPageJsonLd({
      name: "Blog",
      url: `${SITE_URL}/blog`,
      items: [],
    });
    assert.equal("mainEntity" in data, false);
    assert.equal("description" in data, false);
  });
});

describe("jsonLd serialization", () => {
  it("escapes < so payloads cannot close the script tag", () => {
    const payload = jsonLd({ description: "</script><script>alert(1)</script>" });
    assert.ok(!payload.includes("</script>"));
    const parsed = JSON.parse(payload.replace(/\\u003c/g, "<"));
    assert.equal(parsed.description, "</script><script>alert(1)</script>");
  });
});
