---
name: qa-launch-ops
description: >
  Use when running pre-launch quality assurance, deploying to Vercel,
  configuring GA4 analytics, setting up monitoring, creating E2E tests,
  generating client handoff documentation, or managing ongoing maintenance
  for contractor websites. This is the FINAL pack — nothing ships without
  passing every check. A single failing test blocks deploy. Covers GA4 events,
  Playwright E2E tests, visual regression, deployment pipeline, uptime
  monitoring, backup configuration, and client documentation.
---

# Pack 8 — QA, Launch & Ongoing Operations

## Overview

Pack 8 is the finish line. The site is built and hardened (Packs 1–7). Now we
verify everything works, launch it, and hand it off so the contractor can
actually run their business from it.

**Three phases — in order, no skipping:**

| Phase | Goal | Gate |
|-------|------|------|
| 1 — QA Gate | Prove the site works correctly | All tests pass, all audits green |
| 2 — Launch | Ship to production | Preview verified, prod deploy confirmed |
| 3 — Operations | Client can run the site | Handoff doc delivered, monitoring live |

**Reads from:** `site.config.ts`, all built pages, Pack 7 outputs (headers, consent).

**Produces:** Passing test suite, live production URL, GA4 events, uptime monitoring,
and a client handoff document the contractor can actually understand.

---

## The QA-to-Deploy Pipeline

Work every phase in order. No phase is optional.

---

### Phase 1 — QA Gate

**Step 1: Run the three audit commands**

```bash
# Each audit fixes FAIL items before reporting
/audit-seo
/audit-accessibility
/audit-performance
```

All three must report zero FAIL items. Fix every FAIL before proceeding.
Warnings are acceptable. FAIL items are not.

**Step 2: Run subagent reviews**

Invoke all three QA subagents (defined in the parent CLAUDE.md):

```
seo-reviewer      → checks titles, metas, schema, headings, canonicals, OG tags
a11y-checker      → checks contrast, labels, keyboard nav, ARIA, touch targets
copy-reviewer     → checks headlines, CTA text, reading level, trust signals, voice
```

Address any issues flagged before proceeding. Subagents return actionable items.

**Step 3: Run Playwright E2E tests**

```bash
npx playwright test
# Or with UI mode for debugging:
npx playwright test --ui
```

Critical flows that must pass (see `references/playwright-test-specs.md`):
- Homepage loads — all above-fold content visible in < 3 seconds
- Contact form — submits successfully, shows success state, lead arrives in Supabase
- Mobile click-to-call — `tel:` link present and tappable on 375px viewport
- Service page navigation — all service pages load without errors
- 404 page — custom 404 renders, has link back to homepage
- Cookie consent — banner appears, accept/decline both work
- Phone number — visible in header on desktop and mobile without scrolling

**Step 4: Visual regression screenshots**

Use Playwright to capture screenshots at two breakpoints for every page:

```bash
npx playwright test --project=visual-regression
```

Pages to screenshot:
- Homepage (375px + 1280px)
- Each service page (375px + 1280px)
- Contact page (375px + 1280px)
- About page (375px + 1280px)
- FAQ page if present (375px + 1280px)
- /privacy page (1280px)

Review all screenshots in `test-results/`. Look for:
- Layout breaks at mobile breakpoint
- Text overflow or truncation
- Missing images (broken image icons)
- Elements overlapping

**Step 5: Cross-browser smoke test**

Playwright runs Chromium, Firefox, and WebKit by default. Verify:
- Homepage and contact form work in all three engines
- No WebKit-specific layout bugs (Safari is the most restrictive)

**Step 6: Spell check**

```bash
npx cspell "src/**/*.tsx" "src/**/*.ts" --no-progress
```

Install if needed: `pnpm add -D cspell`. Fix all spelling errors in user-facing
copy. Technical terms (className, siteConfig) should be in `.cspell.json` ignore list.

---

### Phase 2 — Launch

**Step 7: Preview deploy**

```bash
vercel
```

This creates a preview URL (e.g. `https://client-name-abc123.vercel.app`).

Copy the preview URL. Do NOT proceed to production until preview passes.

**Step 8: Verify the preview**

Open the preview URL in a real browser (not Playwright). Check manually:
- [ ] Homepage loads and looks correct
- [ ] Phone number in header — click it, verify it calls
- [ ] Contact form — submit a real test lead, verify:
  - Success message displays
  - Email notification arrives (check contractor's inbox)
  - Lead appears in Supabase `leads` table
- [ ] Navigation — click every nav link, verify no 404s
- [ ] Mobile — open on actual phone or use DevTools responsive mode at 375px
- [ ] Cookie consent — open incognito, verify banner appears before GA4 fires
- [ ] Service pages — click through to 2–3 service pages, verify content loads
- [ ] Footer links — Privacy Policy, Cookie Preferences both work
- [ ] SSL — address bar shows padlock (no mixed content warnings)

**Step 9: Production deploy**

```bash
vercel --prod
```

This pushes to the live domain. Do this ONLY after preview passes Step 8.

**Step 10: Post-deploy health check**

Wait 60 seconds for CDN propagation. Then verify the production domain:

```bash
# Verify HTTP headers are present on production
curl -I https://[production-domain] | grep -i "x-content-type\|x-frame\|strict-transport\|content-security"

# Verify homepage returns 200
curl -o /dev/null -s -w "%{http_code}" https://[production-domain]
# Expected: 200

# Verify sitemap is accessible
curl -o /dev/null -s -w "%{http_code}" https://[production-domain]/sitemap.xml
# Expected: 200
```

If production health check fails: **rollback immediately** (see `references/deployment-pipeline.md`).

---

### Phase 3 — Operations

**Step 11: Configure GA4 events**

In GA4 Admin, mark these as conversion events (they track leads):
- `form_submit` — highest priority
- `phone_click` — second highest

Custom events are fired via the `CookieConsent` component after acceptance.
See `references/ga4-event-config.md` for the `gtag()` calls to add to components.

**Step 12: Set up uptime monitoring**

Create a free monitor at UptimeRobot or Better Uptime:
- URL: production domain homepage
- Check interval: every 5 minutes
- Alert: email to Marc + contractor's email
- Alert threshold: down for > 2 consecutive checks (avoid false alarms)

See `references/monitoring-setup.md` for full setup.

**Step 13: Generate client handoff documentation**

Fill in `templates/client-handoff.template.md` with the client's real data and
deliver it via email to the contractor. This document explains:
- How to log in to view leads in Supabase
- What happens when a lead comes in
- How to request content changes
- Monthly maintenance tasks they handle vs. Copytier handles
- Emergency contact information

**Step 14: Submit to Google Search Console**

- Add property for the production domain
- Verify via DNS TXT record or HTML tag
- Submit sitemap: `https://[production-domain]/sitemap.xml`
- Request indexing for the homepage

**Step 15: Commit and tag the release**

```bash
git add -A
git commit -m "feat: launch [client-name] — production deploy v1.0"
git tag v1.0.0
git push origin main --tags
```

---

## GA4 Event Configuration

Five custom events to track. Add these `gtag()` calls to the relevant components
after the user has accepted cookie consent. See `references/ga4-event-config.md`
for full implementation.

| Event Name | Trigger | What It Proves |
|-----------|---------|---------------|
| `phone_click` | User clicks any phone number link | Highest-intent lead action |
| `form_start` | User focuses first form field | Interest in contacting |
| `form_submit` | Form submitted successfully | Confirmed lead |
| `cta_click` | User clicks any primary CTA button | Engagement |
| `scroll_depth` | Page scrolled to 25/50/75/90% | Content engagement |

**Mark as conversions in GA4 Admin:**
`form_submit` and `phone_click` → toggle "Mark as conversion" in Events table.

---

## Playwright E2E Tests

Two test files — copy from templates and customize per client:

| File | Tests | Critical? |
|------|-------|----------|
| `e2e-homepage.spec.ts` | Load, content, navigation, phone, mobile menu | Yes |
| `e2e-contact-form.spec.ts` | Render, validation, submission, success state | Yes |

**Run command:**
```bash
npx playwright test --reporter=list
```

**Pass criteria:** 0 failures. Skipped tests are acceptable for features not
implemented. Flaky tests must be fixed or explicitly skipped with a comment.

See `templates/` for complete working test code.

---

## Deployment Pipeline

```
pnpm build → pass  →  vercel (preview)  →  manual verify  →  vercel --prod  →  health check
     ↓ fail              ↓ fail                ↓ fail              ↓ fail
  Fix errors         Fix errors           Fix then preview       Rollback
```

**Environment variables** must be set in Vercel dashboard before deploying:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY   (server-only)
RESEND_API_KEY              (server-only)
NEXT_PUBLIC_GA4_ID
NEXT_PUBLIC_GOOGLE_MAPS_KEY (if Maps JS API used)
```

**Rollback procedure:** If production deploy causes a visible breakage:
```bash
vercel rollback  # reverts to the previous deployment instantly
```

See `references/deployment-pipeline.md` for the complete pipeline with environment
variable management, custom domain setup, and rollback steps.

---

## Client Handoff

Deliver `templates/client-handoff.template.md` (filled in) to the contractor via email
within 24 hours of the production launch.

**What the handoff document covers:**
1. Your new website — what's live and where
2. How leads come in (email notification + Supabase log)
3. What to do with a lead (respond within 30 minutes for best conversion)
4. How to request changes (email Marc at Copytier)
5. Who handles what (contractor tasks vs. Copytier tasks)
6. Emergency contact (site down, form broken)
7. Monthly maintenance summary
8. Glossary of terms in plain English

See `references/client-handoff-template.md` for the full spec.

---

## Maintenance Schedule

### Monthly (Copytier handles)
- [ ] Run `pnpm audit` on the project — fix any high/critical vulnerabilities
- [ ] Check Vercel dashboard for deploy errors or function timeouts
- [ ] Review UptimeRobot report — note any downtime incidents
- [ ] Check GA4 for traffic anomalies (sudden drops could indicate a break)
- [ ] Verify contact form still working (submit a test lead)

### Quarterly (Copytier handles, client notified)
- [ ] Run all three audit commands and fix any new FAIL items
- [ ] Run `pnpm update` for minor/patch dependency updates
- [ ] Review GA4 conversion data — report to client
- [ ] Check Google Search Console for crawl errors or manual actions
- [ ] Verify SSL certificate expiry (Vercel auto-renews, but confirm)
- [ ] Update privacy policy "Last updated" date if any practices changed

### Annual (Copytier handles, client billed for time)
- [ ] Major dependency upgrades (Next.js major version, React, Tailwind)
- [ ] Accessibility re-audit against latest WCAG guidelines
- [ ] Performance re-audit — re-optimize images, re-analyze bundle
- [ ] Review and update content for freshness (service descriptions, prices if shown)
- [ ] Renew any API keys or tokens approaching expiry

### Contractor Handles (no Copytier involvement needed)
- Responding to leads within 30 minutes
- Keeping Google Business Profile updated
- Collecting new reviews and sending them to Copytier to add to the site
- Notifying Copytier of any business changes (new services, new phone number, etc.)

---

## Quality Checkpoints

Every item below must be PASS before handing off to the client:

**QA Gate:**
- [ ] `/audit-seo` — zero FAIL items
- [ ] `/audit-accessibility` — zero FAIL items
- [ ] `/audit-performance` — LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] All Playwright E2E tests pass
- [ ] Visual screenshots reviewed — no layout breaks
- [ ] Spell check passes — zero spelling errors in user-facing copy
- [ ] `pnpm build` exits 0 with no TypeScript errors

**Launch:**
- [ ] Preview deploy verified manually (form submission tested end-to-end)
- [ ] Test lead received by contractor email
- [ ] Test lead appears in Supabase `leads` table
- [ ] Production deploy completed
- [ ] Security headers present on production domain
- [ ] GA4 receiving data (verify in Realtime view)

**Operations:**
- [ ] `form_submit` and `phone_click` marked as conversions in GA4
- [ ] Uptime monitor active and alerting to correct email
- [ ] Google Search Console property created, sitemap submitted
- [ ] Client handoff document delivered via email
- [ ] Git tag `v1.0.0` pushed

---

## Anti-Patterns

**Deployment anti-patterns:**
- Deploying to production without a preview deploy first — always preview first
- Skipping the manual preview verification and relying only on automated tests
- Deploying with TypeScript errors suppressed (`ignoreBuildErrors: true` in next.config.js)
- Setting environment variables in code instead of Vercel dashboard
- Sharing the Supabase service role key with the client (they only need dashboard access)

**Testing anti-patterns:**
- Writing tests that test implementation details instead of user behavior
- Skipping contact form E2E test — this is the highest-value flow on the site
- Taking screenshots but not reviewing them — screenshots only help if you look at them
- Using `page.waitForTimeout()` for timing — use `page.waitForSelector()` instead
- Running tests against localhost instead of the preview URL for final QA

**Operations anti-patterns:**
- Handing off without a written document — contractors will forget everything
- Setting uptime monitoring to notify only Marc — contractor should know first
- Not marking `form_submit` as a conversion — GA4 is useless without conversion data
- Skipping Google Search Console submission — adds weeks before Google finds the site
- Launching without testing the email notification end-to-end

---

## References

- `references/pre-launch-checklist.md` — full 70-item pre-launch checklist
- `references/ga4-event-config.md` — GA4 event implementation and property settings
- `references/playwright-test-specs.md` — all test specifications and patterns
- `references/deployment-pipeline.md` — step-by-step deploy with rollback
- `references/monitoring-setup.md` — uptime monitoring and error tracking setup
- `references/client-handoff-template.md` — what to include in the handoff doc
- `templates/e2e-homepage.template.spec.ts` — complete homepage test file
- `templates/e2e-contact-form.template.spec.ts` — complete form test file
- `templates/client-handoff.template.md` — the document given to the contractor
