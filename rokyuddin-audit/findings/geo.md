# AI Search Readiness (GEO) Findings — rokyuddin.com

**Score: 82/100**

## What Works
- llms.txt file present and well-structured — ahead of most portfolio sites
- Well-structured: author info, key pages, contact, technology stack
- Server-rendered (Next.js SSR) — easily crawlable by LLMs
- Clear, semantic HTML structure
- GitHub profile links back to portfolio

## Findings

### 1. llms.txt Missing Blog Summaries [MEDIUM]
AI systems use blog summaries and project results to generate citations. Current llms.txt doesn't include these.

**Fix:** Add a "## Blog" section with one-line summaries and a "## Case Studies" section with key results.

### 2. No llms-full.txt Extended Document [MEDIUM]
Some AI crawlers (ChatGPT, Perplexity) look for an extended llms-full.txt document.

**Fix:** Create llms-full.txt with full content summaries, detailed project descriptions, and quantified achievements.

### 3. Generic Content Reduces Citability [LOW]
Content is often generic. AI systems prefer citing specific, data-backed claims.

**Fix:** Add specific metrics, tool versions, and quantifiable results to blog and case study content.
