import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { DEFAULT_SOCIAL_IMAGE, SITE_NAME, SITE_URL, socialMetadata } from "@/lib/site";

describe("socialMetadata", () => {
  it("aligns canonical, Open Graph, and Twitter fields around the same page", () => {
    const meta = socialMetadata({
      title: "Blog | Md Rokyuddin",
      description: "Frontend writing.",
      url: `${SITE_URL}/blog`,
    });

    assert.equal(meta.alternates.canonical, `${SITE_URL}/blog`);
    assert.equal(meta.openGraph.url, `${SITE_URL}/blog`);
    assert.equal(meta.openGraph.title, "Blog | Md Rokyuddin");
    assert.equal(meta.twitter.title, meta.openGraph.title);
    assert.equal(meta.twitter.description, meta.openGraph.description);
  });

  it("defaults to website type and the default social image", () => {
    const meta = socialMetadata({
      title: "t",
      description: "d",
      url: SITE_URL,
    });
    assert.equal(meta.openGraph.type, "website");
    assert.deepEqual(meta.openGraph.images, [{ url: DEFAULT_SOCIAL_IMAGE }]);
    assert.equal(meta.openGraph.siteName, SITE_NAME);
  });

  it("passes through article type, custom image, and extra Open Graph fields", () => {
    const meta = socialMetadata({
      title: "Post",
      description: "d",
      url: `${SITE_URL}/blog/x`,
      type: "article",
      image: "https://cdn.sanity.io/cover.jpg",
      openGraphExtras: { publishedTime: "2026-01-15", tags: ["React"] },
    });
    assert.equal(meta.openGraph.type, "article");
    assert.equal(meta.openGraph.images[0].url, "https://cdn.sanity.io/cover.jpg");
    const og = meta.openGraph as Record<string, unknown>;
    assert.equal(og.publishedTime, "2026-01-15");
    assert.deepEqual(meta.twitter.images, ["https://cdn.sanity.io/cover.jpg"]);
  });
});
