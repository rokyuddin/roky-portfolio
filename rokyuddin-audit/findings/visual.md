# Visual / Images Findings — rokyuddin.com

**Score: 60/100**

## Findings

### 1. Case Study Images Have Non-Descriptive Alt Text [HIGH]
Current alt text is category labels instead of descriptive text:
- "Image Alt text generator" → should describe the screenshot
- "HealthTech & Personalization" → should describe the interface
- "Transportation & Logistics" → should describe the platform

**Fix:** Use descriptive alt text:
- "AltSEO dashboard showing AI-generated image alt text results with processing speed metrics"
- "Skinsight skincare recommendation engine displaying personalized product suggestions"
- "Rydr ride-sharing platform with real-time GPS tracking map and booking interface"

### 2. OG/Social Images Need Verification [MEDIUM]
Portfolio sites benefit enormously from shareable preview images. Custom OG images may be missing or generic.

**Fix:** Create page-specific OG images:
- Homepage: Professional headshot or branded graphic with name + role
- Blog articles: Article-specific graphics with title
- Case studies: Project screenshots with overlay text

### 3. Sanity Image Sizing [LOW]
Images served via cdn.sanity.io should use auto=format and appropriate dimensions.

**Fix:** Verify urlFor() helper applies proper transformations.
