# Schema / Structured Data Findings — rokyuddin.com

**Score: 45/100**

## What Works
- llms.txt file present and well-structured

## Findings

### 1. No JSON-LD Structured Data [CRITICAL]
Zero structured data detected on any page. This is the lowest-scoring category. Competitors with proper schemas get rich results, knowledge panels, and featured snippets.

### 2. No Person Schema [HIGH]
Google cannot reliably associate the site with Md Rokyuddin as an entity.

**Recommended Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Md Rokyuddin",
  "jobTitle": "Frontend Developer",
  "url": "https://www.rokyuddin.com",
  "image": "https://www.rokyuddin.com/og-image.png",
  "sameAs": [
    "https://github.com/rokyuddin",
    "https://linkedin.com/in/itsrokyuddin",
    "https://x.com/itsrokyuddin"
  ],
  "knowsAbout": ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript"],
  "worksFor": {
    "@type": "Organization",
    "name": "Miicon Solutions Limited"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Jashore",
    "addressCountry": "BD"
  },
  "email": "rokyuddin.dev@gmail.com"
}
```

### 3. No BlogPosting Schema [HIGH]
Blog articles lack structured data. Adding BlogPosting with author, datePublished, dateModified, and publisher enables article rich results.

### 4. No Breadcrumb Schema [MEDIUM]
No breadcrumbs detected on case studies or blog posts. BreadcrumbList schema enables breadcrumb rich results in Google.

### 5. No Organization/Website Schema [MEDIUM]
Homepage lacks WebSite schema which enables site search box in Google results.
