# Monitoring Setup Reference

## What We Monitor and Why

A contractor website going down at 9pm on a Saturday is a disaster. A plumber
with a burst-pipe emergency can't reach the site, calls a competitor, and the
client loses a $2,000 job. Monitoring catches downtime before clients notice it.

**Three monitoring layers:**
1. **Uptime** — is the site responding? (Every 5 minutes)
2. **Errors** — are there JavaScript errors on the client? (Real-time)
3. **Analytics** — is traffic behaving normally? (Daily review)

---

## Layer 1: Uptime Monitoring

### Recommended Tool: UptimeRobot (Free tier is sufficient)

UptimeRobot checks the URL every 5 minutes and sends an email if it goes down.
Free tier covers up to 50 monitors — more than enough for all Copytier clients.

**Setup steps:**

1. Log in to uptimerobot.com (use the Copytier account)
2. Click "Add New Monitor"
3. Fill in:
   ```
   Monitor Type: HTTP(s)
   Friendly Name: [Company Name] — [domain.com]
   URL: https://www.[client-domain].com
   Monitoring Interval: 5 minutes
   ```
4. Alert contacts: Add BOTH Marc's email AND the client's email
   - Marc: to be aware of any issues
   - Client: so they know immediately and can call Marc
5. Alert threshold: Alert after **2 failures** (avoids false alarms from single blips)
6. Click "Create Monitor"

**What to also monitor:**
- `/contact` page (tests that the contact page route works)
- `/sitemap.xml` (tests that the server is generating the sitemap)

**Free tier limitations:**
- 5-minute check interval (paid = 1 minute)
- No status page (paid feature)
- Email alerts only (paid = SMS, Slack)

For high-priority clients (e.g. emergency plumbers), upgrade to pro for
1-minute intervals and SMS alerts.

### Alternative: Better Uptime (has a free status page)

Better Uptime also offers a public status page the client can share with
their customers ("Check our website status"). Slightly more polished UI.

Setup is similar to UptimeRobot. The public status page URL looks like:
`https://[company-name].betteruptime.com`

---

## Layer 2: Vercel Analytics (Built-In)

Vercel provides Web Analytics and Speed Insights for free. Enable them in the
Vercel dashboard for every project.

**Enable in Vercel Dashboard:**
1. Project → Analytics → Enable Web Analytics
2. Project → Speed Insights → Enable Speed Insights

**Add to the Next.js app:**

```bash
pnpm add @vercel/analytics @vercel/speed-insights
```

```tsx
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

**Note:** Vercel Analytics is privacy-friendly by default (no cookies, no GDPR
consent required). It can coexist with GA4 — they measure different things.
Vercel Analytics = pageview counting. GA4 = conversion tracking.

**What Vercel Analytics shows:**
- Visitors and pageviews (last 30 days)
- Top pages by traffic
- Referrer sources
- Countries and devices

**What Speed Insights shows:**
- Real User Monitoring (RUM) for Core Web Vitals
- LCP, CLS, INP from actual visitors
- Breakdown by device type and page

---

## Layer 3: Vercel Function Logs

When the contact form breaks, the first place to look is function logs.

**How to check:**

Vercel Dashboard → Project → Logs tab → Filter by:
- Function: `/api/` or your Server Action route
- Status: 500 (errors only)

**Common error patterns:**

| Log message | Cause | Fix |
|-------------|-------|-----|
| `SUPABASE_SERVICE_ROLE_KEY is not defined` | Missing env var | Add to Vercel dashboard |
| `relation "leads" does not exist` | Migration not run | Run Supabase migration |
| `RESEND_API_KEY is not defined` | Missing env var | Add to Vercel dashboard |
| `Invalid API Key` | Wrong key or expired | Rotate key in Resend dashboard |
| `Row-level security violation` | RLS policy too restrictive | Update Supabase RLS policy |
| Function timeout (10s) | Supabase query too slow | Check Supabase slow query log |

**Enable log draining (optional, for persistent logs):**

Vercel free tier only stores function logs for 1 hour. For persistent logging,
set up a log drain to a free tier of Better Uptime, Axiom, or Logtail.

---

## Layer 4: Google Search Console Alerts

Google Search Console sends email notifications when:
- A manual action is applied to the site (spam penalty)
- Coverage issues are detected (pages blocked from indexing)
- Security issues are detected (malware, hacking)

**Setup:**

1. Search Console → Settings → Email notifications → Enable all
2. Add the contractor's email as an additional owner (optional — some clients
   want to see these alerts directly)

These alerts are rare but critical. A manual action from Google can destroy
search rankings overnight. Early detection = faster recovery.

---

## Monitoring Dashboard for Clients

Some clients want a single URL they can bookmark to check on their site's
health. Options:

**Option A: UptimeRobot Status Page (free with UptimeRobot account)**
Create a public status page at UptimeRobot → Status Pages → Create. Shows
real-time uptime for the monitored URLs.

**Option B: Vercel Project Page (share with client)**
Add the client as a Vercel team member with "Viewer" role. They can see
deployment status, function logs (filtered), and analytics.

**Option C: Simple bookmarks document**
Include in the client handoff document:
```
Your website health links:
- Live site: https://www.[domain].com
- Vercel status: https://vercel-status.com (Vercel's own status page)
- GA4 dashboard: https://analytics.google.com
```

---

## Alert Escalation Plan

| Condition | Alert Recipient | Response Time |
|-----------|----------------|---------------|
| Site down > 2 checks (10 min) | Marc + Client | 15 minutes |
| Site down > 30 minutes | Marc + Client | Immediate phone call |
| Google Search Console manual action | Marc | 24 hours |
| `pnpm audit` finds critical vulnerability | Marc | 48 hours |
| GA4 traffic drops > 50% week-over-week | Marc | 72 hours |

---

## Monthly Monitoring Review

Every month, check these items as part of the maintenance schedule:

```
□ UptimeRobot — Were there any downtime incidents? (Dashboard → Logs)
□ Vercel Analytics — Is traffic trending up, flat, or down?
□ Speed Insights — Are Core Web Vitals still green?
□ Function Logs — Any recurring 500 errors in the last 30 days?
□ Google Search Console — Any coverage drops or new crawl errors?
□ Supabase — Is the leads table growing normally? (Form is working?)
□ pnpm audit — Any new vulnerabilities since last check?
```

Report the uptime number and any incidents to the client in the monthly
check-in email.

---

## Supabase Database Health

Supabase provides a dashboard for database health:

**Supabase Dashboard → Reports:**
- Database size (free tier: 500MB limit)
- API request rate
- Query performance

**Metrics to watch:**
- Database size should not exceed 80% of the limit before upgrading
- If `leads` table exceeds 10,000 rows, consider archiving older rows
- Slow queries (> 1 second) appear in the query performance report

**Backup verification:**
- Supabase Pro tier includes daily backups
- Free tier does NOT include point-in-time recovery
- For free-tier projects: monthly manual backup via Supabase → Backups → Create backup
- Store backup locally in `docs/db-backups/` (not in git — it's not code)

---

## Setting Up Alerts in GA4

See `ga4-event-config.md` for the three GA4 alerts to configure.

Quick reference:
1. GA4 → Admin → Insights → Create Custom Insight
2. Alert 1: `form_submit` drops > 50% week-over-week → email Marc
3. Alert 2: Sessions drop > 50% week-over-week → email Marc
4. Alert 3: Sessions spike > 100% day-over-day → email Marc (positive alert)
