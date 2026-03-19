# Deployment Pipeline Reference

## Pipeline Overview

```
Local build check
      ↓
Commit to main branch
      ↓
Preview deploy (vercel)
      ↓
Manual preview verification (15-minute checklist)
      ↓
Automated tests against preview URL
      ↓
Production deploy (vercel --prod)
      ↓
Post-deploy health check (5 minutes)
      ↓
Domain + DNS verification
      ↓
Client notification
```

No step is skippable. If any step fails, fix it and restart from that step —
never skip ahead.

---

## Pre-Deploy Requirements

Before running `vercel` for the first time on a new client project:

### 1. Link the Project to Vercel

```bash
# From the project root
vercel link
# → Select the Copytier Vercel team/account
# → Link to existing project or create new one
# → Project name format: copytier-[client-slug] (e.g. copytier-joe-plumbing)
```

### 2. Set Environment Variables in Vercel Dashboard

Never pass environment variables via CLI. Set them in the Vercel dashboard so
they persist across all future deploys.

Navigate to: vercel.com → Project → Settings → Environment Variables

Add these for the appropriate environments (Production + Preview + Development):

```
NEXT_PUBLIC_SUPABASE_URL          → https://[ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY     → the anon/public key (safe to expose)
SUPABASE_SERVICE_ROLE_KEY         → admin key (Production + Preview ONLY, NOT Development)
RESEND_API_KEY                    → from resend.com dashboard
NEXT_PUBLIC_GA4_ID                → G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_MAPS_KEY       → only if Maps JS API used (not embed)
```

**Environment scope rules:**
| Variable | Production | Preview | Development |
|----------|-----------|---------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✓ | ✓ | ✓ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✓ | ✓ | ✓ |
| `SUPABASE_SERVICE_ROLE_KEY` | ✓ | ✓ | ✗ (use local .env.local) |
| `RESEND_API_KEY` | ✓ | ✓ | ✗ (test locally with .env.local) |
| `NEXT_PUBLIC_GA4_ID` | ✓ | ✓ | ✓ |

### 3. Connect GitHub Repository

In Vercel dashboard → Settings → Git:
- Connect to the GitHub repository
- Enables automatic preview deploys on every push to branches

### 4. Verify Build Succeeds Locally

```bash
pnpm build
# Must exit 0 with no TypeScript errors
# Must not show "Missing environment variable" warnings
```

---

## Preview Deploy

```bash
vercel
```

Vercel builds and deploys to a preview URL in ~60 seconds.

**Expected output:**
```
Vercel CLI X.X.X
✓ Linked to [org]/copytier-[client-slug]
✓ Deployed to https://copytier-[client-slug]-[hash].vercel.app [XX s]
```

Copy the preview URL. It looks like:
`https://copytier-joe-plumbing-abc123.vercel.app`

---

## Preview Verification (15-Minute Manual Checklist)

Open the preview URL in Chrome. Work through this list. Do not skip items.

**Homepage:**
- [ ] Page loads (no 500, no blank screen, no Next.js error overlay)
- [ ] Header visible with company name and phone number
- [ ] Phone number in header is a clickable `tel:` link
- [ ] Hero section renders — headline, subheadline, CTA button, hero image
- [ ] Hero image loads (no broken image placeholder)
- [ ] Scroll down — services grid, testimonials, FAQ all render
- [ ] Footer renders — NAP data, navigation links, Privacy Policy link

**Contact Form (critical path):**
- [ ] Navigate to /contact
- [ ] Fill out the form with YOUR name/phone so you can identify the test lead:
  - Name: `Copytier QA Test`
  - Phone: your actual phone number
  - Email: your email
  - Service: select any option
  - Message: `QA test submission — please ignore`
- [ ] Click submit
- [ ] Success message appears within 5 seconds
- [ ] Check your email — notification arrives within 60 seconds
- [ ] Check Supabase leads table — row exists with test data

**Mobile check (use Chrome DevTools responsive mode):**
- [ ] Set viewport to 375×667 (iPhone SE)
- [ ] Phone number visible in header without scrolling
- [ ] Sticky mobile CTA bar visible at bottom
- [ ] Mobile menu hamburger visible — tap it — nav links appear
- [ ] Tap a nav link — menu closes, page navigates correctly
- [ ] Contact form is usable on mobile (fields full-width, tap to focus works)

**Privacy and consent:**
- [ ] Open a new incognito window, navigate to homepage
- [ ] Cookie consent banner appears
- [ ] Check Network tab before clicking anything — NO gtag requests
- [ ] Click "Accept" — banner closes — gtag requests appear in Network tab
- [ ] Reload the page — no banner, gtag fires on load
- [ ] Click "Cookie Preferences" in footer — banner re-appears

**All pages:**
- [ ] Click every nav item and verify it loads (no 404s)
- [ ] Click every service page link (if not in nav, test from homepage services grid)
- [ ] Navigate to /privacy — page renders with all sections

---

## Production Deploy

Only after the preview verification checklist is complete with zero failures:

```bash
vercel --prod
```

**Expected output:**
```
Vercel CLI X.X.X
✓ Linked to [org]/copytier-[client-slug]
✓ Production: https://www.[client-domain].com [XX s]
```

Note the production URL. It should be the client's custom domain (configured
in Vercel dashboard → Settings → Domains).

---

## Custom Domain Setup

If the client has a domain that needs to be connected:

### Step 1: Add domain in Vercel

Vercel dashboard → Project → Settings → Domains → Add `www.clientdomain.com`
and `clientdomain.com` (both).

Configure `clientdomain.com` to redirect to `www.clientdomain.com` (canonical
www version is preferred for most contractor sites).

### Step 2: Update DNS at domain registrar

Vercel shows the required DNS records. Typically:

```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

DNS propagation: 15 minutes to 48 hours. Use `dig www.clientdomain.com` to check.

### Step 3: Verify SSL certificate

Vercel auto-provisions SSL via Let's Encrypt. After DNS propagates:
- `https://www.clientdomain.com` should show a padlock
- `http://www.clientdomain.com` should redirect to HTTPS

---

## Post-Deploy Health Check (5 Minutes)

Run these checks immediately after production deploy:

```bash
# 1. Homepage returns 200
curl -o /dev/null -s -w "HTTP Status: %{http_code}\nTime to first byte: %{time_starttransfer}s\n" \
  https://www.[client-domain].com

# Expected:
# HTTP Status: 200
# Time to first byte: < 0.8s

# 2. Security headers present
curl -sI https://www.[client-domain].com | grep -iE "x-content-type|x-frame|strict-transport|content-security|referrer-policy|permissions-policy"
# Expected: all 6 headers present

# 3. Sitemap accessible
curl -o /dev/null -s -w "%{http_code}" https://www.[client-domain].com/sitemap.xml
# Expected: 200

# 4. Robots.txt accessible
curl -o /dev/null -s -w "%{http_code}" https://www.[client-domain].com/robots.txt
# Expected: 200

# 5. Contact page accessible
curl -o /dev/null -s -w "%{http_code}" https://www.[client-domain].com/contact
# Expected: 200

# 6. Privacy page accessible
curl -o /dev/null -s -w "%{http_code}" https://www.[client-domain].com/privacy
# Expected: 200
```

If any check returns unexpected results: **do not tell the client until fixed.**
Rollback immediately if there is a visible breakage.

---

## Rollback Procedure

**When to rollback:**
- Production homepage returns 500
- Contact form broken on production (not just preview)
- Major visual breakage visible to users
- Security header check fails on production

**How to rollback:**

```bash
# Instant rollback to the previous deployment
vercel rollback

# Or via Vercel dashboard:
# Project → Deployments → find previous successful deploy → ⋯ → Promote to Production
```

Rollback is instant — Vercel just changes which deployment the production domain
points to. The previous deployment remains built; no rebuild required.

**After rollback:**
1. Note the error that caused the rollback
2. Fix it on a branch: `git checkout -b fix/production-issue`
3. Test the fix in a preview deploy
4. Verify the fix works in preview
5. Merge to main and re-deploy to production

---

## Deployment Log: Record of All Deploys

Maintain this log in the project repo at `docs/deployment-log.md`:

```markdown
# Deployment Log — [Client Name]

## v1.0.0 — Initial Launch
- Date: [YYYY-MM-DD]
- Preview URL: https://copytier-[slug]-[hash].vercel.app
- Production URL: https://www.[domain].com
- Deployed by: Marc Bender (Copytier)
- Status: ✓ Live
- Notes: Initial production launch.

## v1.0.1 — [Description]
- Date: [YYYY-MM-DD]
- Change: [What was changed]
- Status: ✓ Live
```

---

## Emergency Response Protocol

**Site is down (returns 500 or blank):**
1. Check Vercel dashboard for build/function errors
2. Check Supabase status page for outages
3. If Vercel issue: rollback to last good deploy
4. Notify Marc immediately
5. If down > 10 minutes, notify client: "We're investigating a technical issue
   and expect it resolved within the hour."

**Form is broken (submissions not arriving):**
1. Check Supabase → Table Editor → `leads` for recent rows
2. Check Resend dashboard for email delivery errors
3. Check Vercel Function logs for Server Action errors
4. Fix the root cause, test on preview, redeploy
5. If fix takes > 1 hour, add the contractor's email directly to the form's
   confirmation copy as a temporary workaround

**Site is slow (reports from client):**
1. Run PageSpeed Insights on the production URL
2. Check Vercel Analytics for function duration spikes
3. Check if a new dependency was recently added (bundle size regression)
4. Check Supabase for slow queries (Supabase → SQL Editor → slow query log)
