# 90-day tracking framework

This framework measures whether the custom ecommerce development cluster is working on rokyuddin.com. It starts the day the /services page ships. There is no contact form on the site, so conversions are defined as click events in GA4.

## Prerequisite: environment setup

Tracking does not work until these are set:

- `GOOGLE_ANALYTICS_ID` must exist in `.env.local` locally and in Vercel project environment variables for production. The site reads it in `src/lib/site.ts`.
- `GOOGLE_SITE_VERIFICATION` must be set the same way so the site can be verified in Google Search Console.

If either variable is missing, GA4 records nothing and GSC shows no data for the domain. Check both before day 1. This is the most common reason a 90-day framework produces no conclusions.

## Conversions: GA4 click events

Because there is no contact form, every meaningful action is a click. Configure these as events in GA4 and mark them as key events (conversions):

| Event name | Fires when | Signal |
|---|---|---|
| email_click | Visitor clicks an email link | Direct work inquiry intent |
| phone_click | Visitor clicks a phone link | High-intent BD-market inquiry |
| resume_click | Visitor downloads or opens the resume | Recruiter interest, secondary |
| cta_services_click | Visitor clicks a CTA linking to /services | Cluster funnel movement |
| case_study_live_click | Visitor opens a live project from a case study | Proof engagement |

Implementation note: these are click handlers on existing links, sent with `gtag('event', ...)`. The site is server-component first, so the handlers live in small client components where the links already render. No new pages needed.

## Weekly checks (15 minutes)

Every week, same weekday:

1. Ahrefs free tools: check rank for "custom ecommerce development" and "custom ecommerce website cost". Log the position, even if it is "not in top 100".
2. Manual SERP check with gl=bd for the same terms: note whether rokyuddin.com appears, and which competitor types occupy the top 10 (agencies, directories, marketplaces).
3. GSC: check impressions and clicks for queries containing "custom ecommerce". Early impressions with zero clicks are a good sign; they mean Google is testing the page.
4. GA4: count the week's conversion events.

Log all four in a simple sheet. Weeks 1 to 4 will likely show nothing for the primary keyword. That is expected for a new page.

## Monthly checklist

Once a month, deeper review:

1. GSC queries containing "custom ecommerce": record impressions, clicks, CTR, and average position for the whole query group, not just one query.
2. Landing page engagement for /, /services, and case-study pages: engagement rate, average engagement time, and bounce rate as a proxy. A services page with high impressions but under 30 seconds average engagement time has a content problem, not a ranking problem.
3. Conversion counts per event, month over month. The only number that ultimately matters is email and phone clicks.
4. Indexing: confirm /services is in the GSC pages report and the sitemap was picked up.

## Metrics snapshot table

Copy this row each month:

| Month | Primary kw position (gl=bd) | Cost post position | "custom ecommerce" impressions | Clicks | CTR | Avg position | Engagement time (/services) | email_click | phone_click | cta_services_click |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | | | | | | | | | | |
| 2 | | | | | | | | | | |
| 3 | | | | | | | | | | |

## 90-day decision gate

At day 60 and again at day 90, evaluate one question: is the primary keyword position improving?

- Improving means: the query group shows growing impressions month over month, and the best position for the primary keyword or its close variants has moved into the top 50 and is still trending down.
- If position is improving at day 60: stay the course, publish the month 2 blog post on schedule.
- If position is not improving by day 60: double down on long-tail blog content and internal links. Specifically: publish the two planned posts back to back, add a third long-tail post ("ai automation services for ecommerce"), and add one more internal link to /services from every published blog post. Long-tails convert faster for a new domain and build the authority the primary keyword needs.
- If at day 90 the cluster still shows under roughly 100 monthly impressions despite the long-tail work, treat the validation step in the keyword report as failed: the cluster volume is too low or competition too entrenched. Keep /services as a conversion page for direct and referral traffic, and shift SEO effort to the next-best cluster identified from real GSC query data.

## What success looks like at day 90

Honest expectations for a new domain against agency SERPs:

- /services indexed and earning impressions for the query group.
- At least one long-tail ("custom ecommerce website cost" or "headless ecommerce with Next.js") ranking in the top 30.
- At least one tracked email or phone click attributable to organic search.
- A clear trend line, up or down, that makes the next 90-day decision easy.
