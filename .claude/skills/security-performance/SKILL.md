---
name: security-performance
description: >
  Use when hardening a contractor website for security, privacy compliance, and
  performance optimization. This is the hardening pass that runs AFTER all features
  are built (Packs 1-6 complete). Covers security headers in next.config.js,
  Core Web Vitals optimization, CCPA cookie consent, privacy policy page,
  dependency auditing, image optimization, font loading verification, and
  caching configuration. Nothing new is built — existing features are made
  faster, safer, and legally compliant.
---

# Pack 7 — Security, Privacy & Performance

## Overview

Pack 7 is the hardening pass. Packs 1–6 built the site. Pack 7 makes it
production-worthy. Nothing new is built here — every action in this pack
makes existing features faster, safer, or legally compliant.

**Three pillars:**

| Pillar | Goal | Primary Tool |
|--------|------|-------------|
| Security | Prevent XSS, clickjacking, MIME sniffing, data leakage | next.config.js headers |
| Privacy | CCPA compliance for California — consent before tracking | CookieConsent component |
| Performance | LCP < 2.5s, CLS < 0.1, INP < 200ms | Image, font, bundle, cache audits |

**When to run:** After Pack 6 is committed and verified. Before Pack 8 (QA & Launch).

**Reads from:** `site.config.ts` (contact info for privacy policy), `next.config.js`
(to extend, not replace), all pages in `src/app/`.

**Produces:** Updated `next.config.js`, `CookieConsent` component wired into
`layout.tsx`, `/privacy` page, verified CWV scores.

---

## Hardening Workflow

Work through each step in order. Do not skip steps. Each step has a verification
check — do not proceed until the check passes.

---

### Step 1 — Security Headers in next.config.js

Add HTTP security headers via the `headers()` function in `next.config.js`.
These are enforced at the CDN/server layer, not in JavaScript.

**Required headers (exact values):**

```
Content-Security-Policy    → see security-headers.md for per-niche CSP
Strict-Transport-Security  → max-age=31536000; includeSubDomains; preload
X-Content-Type-Options     → nosniff
X-Frame-Options            → DENY
X-DNS-Prefetch-Control     → on
Referrer-Policy            → strict-origin-when-cross-origin
Permissions-Policy         → camera=(), microphone=(), geolocation=(self)
```

**CSP strategy for contractor sites:**
Contractor sites embed Google Maps, GA4, and optionally a booking widget.
The CSP must allow these specific origins without using `unsafe-inline` for scripts.
Use nonces for inline scripts that cannot be eliminated.

See `templates/next.config.security.template.js` for working code.

**Verification:** Run `curl -I https://[preview-url]` and confirm all seven
headers appear in the response. Or use securityheaders.com after deploy.

---

### Step 2 — Core Web Vitals Optimization

Target scores (PageSpeed Insights mobile):

| Metric | Target | Fail Threshold |
|--------|--------|----------------|
| LCP (Largest Contentful Paint) | < 2.5s | > 4.0s |
| CLS (Cumulative Layout Shift) | < 0.1 | > 0.25 |
| INP (Interaction to Next Paint) | < 200ms | > 500ms |
| TTFB (Time to First Byte) | < 800ms | > 1800ms |
| FCP (First Contentful Paint) | < 1.8s | > 3.0s |

**CWV audit checklist** — check every item, fix every FAIL:

**LCP (Hero image is almost always the LCP element):**
- [ ] Hero image uses `<Image>` from `next/image` — never `<img>`
- [ ] Hero `<Image>` has `priority` prop (not lazy) — `fetchpriority="high"` in output HTML
- [ ] Hero image is correctly sized: `sizes="100vw"` for full-width heroes
- [ ] Hero image is WebP or AVIF — no PNG/JPEG originals above 200KB
- [ ] Hero image dimensions match the viewport it fills (no oversized images)
- [ ] No render-blocking resources above the fold
- [ ] Server response < 800ms (check Vercel Edge Network routing)

**CLS (layout stability):**
- [ ] All `<Image>` components have explicit `width` and `height` props
- [ ] Fonts loaded with `next/font` — no FOUT from external stylesheets
- [ ] No content that shifts after JS loads (check testimonials, reviews)
- [ ] Cookie consent banner does NOT shift layout — uses fixed positioning
- [ ] Skeleton loaders match exact dimensions of loaded content
- [ ] No ads or embeds without explicit dimensions

**INP (interaction responsiveness):**
- [ ] Contact form submit handler is not blocking the main thread
- [ ] No synchronous `localStorage` reads on render
- [ ] Navigation menu animations use CSS, not JS-driven repaints
- [ ] Mobile hamburger menu opens in < 100ms

**Font loading:**
- [ ] All fonts loaded via `next/font` — not Google Fonts `<link>` tags
- [ ] `display: 'swap'` on body font, `display: 'block'` only if fallback is invisible
- [ ] Font subset matches content language (latin for English-only sites)
- [ ] No more than 2 font families loaded (heading + body)
- [ ] Fallback font metrics match loaded font (use `adjustFontFallback: true`)

---

### Step 3 — Image Optimization Audit

Scan every `<img>` tag across the codebase. Replace with `next/image`.

```bash
# Find raw <img> tags that should be next/image
grep -rn "<img " src/ --include="*.tsx" --include="*.jsx"
```

**For each image found:**
1. Replace `<img src="..." alt="...">` with `<Image src="..." alt="..." width={} height={} />`
2. Add `priority` prop to the first above-fold image on each page
3. Add `sizes` prop for responsive images (see cwv-optimization.md for patterns)
4. Move images to `public/images/` with descriptive filenames (not `img1.jpg`)
5. Ensure alt text is descriptive — "Licensed plumber replacing water heater in San Jose home"

**OG images:** Each page's `generateMetadata()` must include `openGraph.images`
pointing to a 1200×630 static image in `public/images/og/`.

---

### Step 4 — Font Loading Verification

Open `src/app/layout.tsx`. Verify:

```tsx
// CORRECT — next/font/google
import { Montserrat, Lato } from 'next/font/google'
const heading = Montserrat({ subsets: ['latin'], display: 'swap', variable: '--font-heading' })
const body = Lato({ subsets: ['latin'], weight: ['400', '700'], display: 'swap', variable: '--font-body' })

// WRONG — external stylesheet (kills CWV)
// <link href="https://fonts.googleapis.com/css2?family=..." />
```

If a Google Fonts `<link>` tag exists anywhere in `layout.tsx` or `_document.tsx`,
remove it and replace with `next/font`. This is a critical CWV fix.

---

### Step 5 — Cookie Consent Component (CCPA)

California law requires that users can opt out of the "sale" or "sharing" of
personal data before analytics scripts fire. GA4 is a third-party that receives
personal data (IP address, browsing behavior). Therefore:

**Rule: GA4 (and all analytics) must not load until the user has been shown
the cookie consent banner and either accepted or declined.**

**Implementation pattern:**

1. `CookieConsent` client component stored in `src/components/layout/CookieConsent.tsx`
2. Uses `localStorage` to persist consent decision (`copytier_consent`)
3. On mount: check `localStorage` — if no decision, show banner
4. If user accepts: set flag, dynamically load GA4 script via `next/script`
5. If user declines: set flag, never load GA4 in this session
6. GA4 `<Script>` in `layout.tsx` must be INSIDE or controlled by `CookieConsent`
7. Banner is fixed-position, bottom of screen, does NOT shift layout

See `templates/CookieConsent.template.tsx` for working implementation.

**Wire into layout.tsx:**
```tsx
// layout.tsx — add after <body> opens, before </body> closes
import { CookieConsent } from '@/components/layout/CookieConsent'
// ...
<CookieConsent gaId={siteConfig.integrations.googleAnalyticsId} />
```

---

### Step 6 — Privacy Policy Page

Every contractor site collecting form submissions must have a privacy policy.
California requires disclosure of what data is collected, how it's used, and
users' CCPA rights (right to know, right to delete, right to opt out of sale).

**Generate from template:** `templates/privacy-policy.template.tsx`

Substitute from `siteConfig`:
- `siteConfig.business.name` → company name throughout
- `siteConfig.contact.email` → privacy contact email
- `siteConfig.contact.phone` → privacy contact phone
- `siteConfig.business.city` + `siteConfig.business.state` → business address state
- Today's date → "Last updated" date

**Route:** `/privacy` → `src/app/privacy/page.tsx`

**Metadata:**
```tsx
export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.business.name}`,
  description: 'Our privacy policy and your California privacy rights.',
  robots: { index: false, follow: false }, // noindex — not a ranking page
}
```

**Link from footer:** Add "Privacy Policy" link to footer nav. Already in most
footer templates — verify it's wired to `/privacy`.

---

### Step 7 — Dependency Audit

Run before every production deploy. Zero tolerance for high or critical vulnerabilities.

```bash
pnpm audit
```

**If vulnerabilities found:**
1. `pnpm audit --fix` for auto-fixable issues
2. For breaking changes: read the advisory, test the upgrade, commit as `fix: upgrade [package] to resolve CVE-XXXX-XXXX`
3. If a dep cannot be upgraded (transitive dep): document in a comment and accept the risk consciously

**Check for unused dependencies:**
```bash
npx depcheck
```
Remove any unused packages. Smaller `node_modules` = faster builds = smaller attack surface.

**Lock file integrity:**
```bash
pnpm install --frozen-lockfile
```
Must succeed without modifying `pnpm-lock.yaml`. If it fails, the lock file is out of sync.

---

### Step 8 — JS Bundle Analysis

No page should require more than 100KB of JavaScript on initial load
(excluding React itself, which is shared across all pages).

```bash
ANALYZE=true pnpm build
```

Install `@next/bundle-analyzer` if not present:
```bash
pnpm add -D @next/bundle-analyzer
```

**Common over-size causes and fixes:**

| Cause | Fix |
|-------|-----|
| Importing all of a large library | Use named imports or dynamic `import()` |
| Date library (moment.js) | Replace with `date-fns` or native `Intl` |
| Icon library importing all icons | Import individual icons only |
| Client component that should be Server Component | Remove `'use client'`, fetch on server |
| Large JSON data in component | Move to `generateStaticParams` or API route |

**Dynamic imports for below-fold components:**
```tsx
import dynamic from 'next/dynamic'
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'))
const FAQ = dynamic(() => import('@/components/sections/FAQ'))
// Do NOT dynamically import Hero — it's the LCP element
```

---

### Step 9 — Caching Configuration

**Static assets** (images, fonts, JS, CSS) should be cached for 1 year.
Next.js handles this automatically for `/_next/static/` assets.

**ISR revalidation** for pages with dynamic data:
```tsx
// Testimonials page — refresh every 24 hours
export const revalidate = 86400

// Service pages — static (no dynamic data)
export const revalidate = false // or omit entirely for full SSG
```

**Vercel Edge Network:** All static assets are served from Vercel's CDN automatically.
No additional configuration required.

**Cache-Control for API routes:**
```tsx
// src/app/api/[route]/route.ts
export async function GET() {
  return Response.json(data, {
    headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' }
  })
}
```

---

### Step 10 — Run /audit-performance

After completing Steps 1–9, run the performance audit to verify:

```
/audit-performance
```

This runs PageSpeed Insights via Playwright, checks all CWV scores, and
reports pass/fail. Fix any FAIL items before handing off to Pack 8.

Target: All green on PageSpeed Insights mobile. Minimum: no red items.

---

## Security Headers — Exact Values

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-DNS-Prefetch-Control: on
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(self), payment=()
```

**Content-Security-Policy for contractor sites with GA4 + Google Maps:**
```
default-src 'self';
script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com 'nonce-{NONCE}';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https://maps.gstatic.com https://maps.googleapis.com https://www.google-analytics.com;
connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://[supabase-project].supabase.co;
frame-src https://www.google.com/maps/;
font-src 'self';
object-src 'none';
base-uri 'self';
form-action 'self';
upgrade-insecure-requests;
```

`'unsafe-inline'` for `style-src` is acceptable because CSS injection is low-risk for
contractor sites with no user-generated content. DO NOT use `'unsafe-inline'` for
`script-src` — use nonces or hashes instead.

---

## CCPA Cookie Consent Requirements

California contractor sites collect:
- Contact form data (name, email, phone, message) → stored in Supabase
- GA4 analytics (IP address, device, browsing behavior) → sent to Google
- Google Maps embeds → Google may set cookies

CCPA applies when a business collects personal data from California residents.
All contractor clients are in California. CCPA applies to all builds.

**Required disclosures:**
1. What personal information is collected
2. Why it's collected (business purpose)
3. Who it's shared with (Google Analytics, Supabase)
4. User's right to know what's been collected about them
5. User's right to delete their data
6. User's right to opt out of "sale or sharing" of personal data

**"Sale or sharing" definition:** Sending data to Google Analytics constitutes
"sharing" under CPRA 2023. Therefore GA4 requires consent.

**Consent UX rules:**
- Banner must appear on first visit before GA4 fires
- "Accept" and "Decline" must be equal prominence (no dark patterns)
- User can change preference via footer link ("Cookie Preferences")
- Consent is stored in `localStorage` under key `copytier_consent`
- Consent expires after 12 months — re-prompt on expiry

---

## Privacy Policy Required Sections

1. **Information We Collect** — form fields (name, email, phone, message), GA4 data, IP address
2. **How We Use It** — respond to inquiries, send quotes, improve our services
3. **Who We Share It With** — Google Analytics, Supabase (infrastructure), Resend (email)
4. **How Long We Keep It** — form submissions: 2 years; analytics: GA4 retention setting
5. **Your CCPA Rights** — right to know, right to delete, right to opt out of sharing
6. **How to Exercise Your Rights** — email and phone contact for requests
7. **Do Not Sell or Share My Personal Information** — opt-out mechanism via cookie consent
8. **Contact Us** — company name, email, phone
9. **Changes to This Policy** — "last updated" date

---

## Quality Checkpoints

Before handing off to Pack 8, every item below must be PASS:

**Security:**
- [ ] All 7 security headers present in HTTP response
- [ ] CSP blocks `script-src: *` (wildcard)
- [ ] No API keys in client-side code (`grep -rn "NEXT_PUBLIC_.*KEY" src/`)
- [ ] `.env.local` is in `.gitignore`
- [ ] `pnpm audit` — zero high or critical vulnerabilities

**Privacy:**
- [ ] Cookie consent banner appears on first visit in incognito window
- [ ] GA4 does NOT fire before consent (check Network tab — no `gtag` requests)
- [ ] GA4 DOES fire after accepting consent
- [ ] Declining consent prevents GA4 from loading
- [ ] `/privacy` page exists and renders without errors
- [ ] Footer links to `/privacy`
- [ ] Privacy policy contains all 9 required sections

**Performance (mobile PageSpeed Insights):**
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] INP < 200ms
- [ ] No `<img>` tags that should be `<Image>` (next/image)
- [ ] Hero image has `priority` prop
- [ ] No Google Fonts `<link>` tags — all fonts via `next/font`
- [ ] No page > 100KB initial JS (bundle analysis)
- [ ] All pages build successfully (`pnpm build` exits 0)

---

## Anti-Patterns

**Security anti-patterns:**
- `X-Frame-Options: SAMEORIGIN` — use `DENY` for contractor sites (no legitimate iframe need)
- CSP with `'unsafe-eval'` — this defeats script injection protection entirely
- Storing Supabase service role key in `NEXT_PUBLIC_` env var — this exposes admin access
- Hardcoding GA4 measurement ID in source code vs. env var (low risk but bad practice)

**Privacy anti-patterns:**
- Loading GA4 `<Script>` unconditionally in `layout.tsx` — fires before consent
- Cookie consent with only an "Accept" button — dark pattern, CCPA violation
- Storing consent in a session cookie (expires on tab close) — re-prompts every session
- Noindexing the privacy policy via robots.txt instead of `<meta name="robots">` —
  robots.txt noindex is not standard

**Performance anti-patterns:**
- `<Image priority />` on every image — defeats the optimization (use only on LCP image)
- `loading="eager"` without `priority` — not equivalent to `priority` in Next.js
- Dynamic import on Hero section — delays LCP
- `suppressHydrationWarning` to hide CLS from SSR/CSR mismatch — fix the root cause
- `@import url('https://fonts.googleapis.com/...')` in CSS — render-blocking

---

## References

- `references/security-headers.md` — full CSP builder, header explanations
- `references/cwv-optimization.md` — CWV metrics deep-dive and fix patterns
- `references/ccpa-checklist.md` — California privacy law requirements
- `references/cookie-consent-spec.md` — consent component spec and state machine
- `references/dependency-audit.md` — vulnerability triage process
- `templates/next.config.security.template.js` — complete next.config.js with headers
- `templates/CookieConsent.template.tsx` — full consent component with GA4 integration
- `templates/privacy-policy.template.tsx` — privacy policy page with CCPA sections
