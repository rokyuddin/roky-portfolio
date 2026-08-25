# Google Field Data Findings

Target: https://www.rokyuddin.com (homepage)
Audit date: 2026-08-25
Credential tier: Tier 0 (PageSpeed Insights v5 + CrUX API + CrUX History API; no GSC, no GA4)

## CrUX / Field CWV

**NO Chrome UX Report (CrUX) field data is available for this origin.**

Queried via the claude-seo `pagespeed_check.py` (CrUX API `queryRecord`) and
`crux_history.py` (CrUX History API `queryHistoryRecord`). Both returned the
same result:

- CrUX API: "No CrUX data for this origin. The site likely has insufficient Chrome traffic volume for eligibility."
- CrUX History API: "No CrUX history data for this origin. Insufficient Chrome traffic volume for eligibility."
- PSI `loadingExperience` block: present but empty (no `overall_category`, no metrics).

**What this means:** For a page/origin to appear in CrUX, Google needs enough
Chrome traffic within the rolling 28-day window (practical threshold is on the
order of a few hundred users per origin/month; there is no public minimum, but
small, low-traffic sites are routinely omitted). Absence of CrUX data almost
always indicates **low traffic volume** — i.e. the real-world "field" lens for
LCP / INP / CLS does not exist for this site. We therefore CANNOT report any
field-data CWV distribution (LCP, INP, CLS good / needs-improvement / poor
percentages). This is an honest data-availability limitation, not a
measurement error.

Precondition for actionable field data: once the site accumulates meaningful
Chrome traffic (typically thousands of page loads/month across the origin),
CrUX will populate and the real CWV distribution can be reported.

## PSI (Lighthouse Lab) Results

PageSpeed Insights v5 Lighthouse analysis succeeded (direct API via Google's
servers). Reported 2026-08-25:

| Metric | Mobile | Desktop | Rating |
|---|---|---|---|
| **Performance** | **68** | **91** | Mobile weak / Desktop good |
| First Contentful Paint (FCP) | 3.0 s | 0.8 s | Mobile poor |
| **Largest Contentful Paint (LCP)** | **4.7 s** | **1.3 s** | Mobile poor |
| Total Blocking Time (TBT) | 310 ms | 160 ms | Mobile needs-work |
| Cumulative Layout Shift (CLS) | 0 | 0 | Excellent (both) |
| Speed Index | 5.4 s | 1.4 s | Mobile weak |
| Main-thread work | 1.7 s (+ 1.0 s bootup, 4 long tasks) | — | JS-heavy |

(INP is not reported by PSI Lighthouse lab in this run; TBT 310 ms is the
proxy. CLS is a perfect 0 on both — the layout is stable.)

**Mobile is the bottleneck.** The site's CWV risk is concentrated on mobile
hardware:

- **LCP 4.7 s on mobile** (threshold "good" <= 2.5 s, "poor" > 4.0 s) is firmly
  in the POOR bucket.
- Desktop LCP 1.3 s is GOOD — so the page is fast on fast hardware and slow
  on constrained mobile CPUs.

Root causes visible in the lab profile (mobile resource summary):
- **414 KiB of JavaScript across 18 scripts** dominates the 714 KiB total page
  weight (58% of transfer). Main-thread 1.7 s + 4 long tasks delays LCP.
- `unused-javascript` audit flags ~116 KiB of unused JS.
- **176 KiB of third-party** requests (3 requests) — a meaningful share of the
  budget on a portfolio site.
- ~127 KB of fonts + ~128 KB of images; total page ~714 KiB is modest in
  absolute terms but heavy on JS for a static portfolio.

Server response time was negligible (0 ms) — backend/TTFB is not the issue.

## What Field Data Implies

Because there is **no CrUX field data**, we cannot quantify the real-world
impact. The honest interpretation for a small personal portfolio:

1. **Low traffic volume** — the site does not yet qualify for CrUX, which in
   itself is the primary finding. There is no actual-user CWV story to tell yet.
2. **Plausible real-world risk from lab data:** the mobile lab LCP of 4.7 s
   suggests that once CrUX does populate, mobile LCP would be at risk of the
   "poor" bucket (>4.0 s). Real users on mid-range phones will experience slow
   first paint. Desktop is fine (1.3 s good).
3. At this scale the absolute number of affected users is small, so the
   *business* impact of slow mobile LCP is limited — but it is a ranking and
   UX signal Google will evaluate, and the fix is cheap (trim JS).

## Recommendations

Priority-ordered:

1. **Reduce JavaScript on mobile (highest impact on LCP).**
   - Eliminate the ~116 KiB of unused JavaScript flagged by Lighthouse.
   - Audit the 18 scripts / 414 KiB JS budget — a static portfolio does not
     legitimately need this much JS on the critical path. Defer non-critical
     bundles, lazy-load below-the-fold components.
   - This is the single biggest lever to bring mobile LCP down from 4.7 s
     toward the 2.5 s "good" threshold.
2. **Cut third-party payload (~176 KiB).** Remove or lazy-load analytics /
   widget scripts not needed above the fold. Re-evaluate whether all third
   parties are essential on the homepage.
3. **Continue to optimize fonts/images** (127 KB fonts + 128 KB images) — use
   font subsetting / `font-display: swap`, preload the LCP image, ensure
   responsive image sizes (`srcset`/`sizes`).
4. **Remonitor after traffic grows.** With no CrUX data today, set a check-in
   to re-query CrUX (and ideally connect GSC / GA4 once credentials exist) so
   the field CWV distribution can be tracked once the site qualifies.

## Priority

**MEDIUM.** The site has a genuine mobile-lab issue (LCP 4.7 s = poor;
performance 68 mobile vs 91 desktop) driven by a heavy JS + third-party load,
which is worth fixing because the remedy (trim unused JS, cut third-party) is
inexpensive and low-risk on a portfolio. However, there is **no field (CrUX)
data** and traffic volume is low, so the real-user severity is currently
unquantified and the near-term impact is limited. Fixing mobile JS bloat is
recommended opportunistically rather than as an urgent rebuild. Re-verify with
CrUX once traffic grows.

---

**Summary:** This small personal portfolio has **no Chrome UX Report field
data** from either the CrUX API or CrUX History API — an honest signal that
Chrome traffic is too low to qualify, so no real-world LCP/INP/CLS
distribution can be reported. PageSpeed Insights lab data shows the site is
fast on desktop (perf 91, LCP 1.3 s good) but notably slow on mobile (perf 68,
LCP 4.7 s poor, FCP 3.0 s, TBT 310 ms) driven by 414 KiB of JavaScript across
18 scripts plus ~176 KiB of third-party payload; CLS is a perfect 0 on both.
Recommend opportunistically trimming unused/deferred JS and third-party code
to close the mobile gap, then re-checking CrUX periodically as traffic grows —
using this as a MEDIUM-priority optimization rather than an urgent concern.
