# Pre-Launch Checklist — 70 Items

Run this checklist in full before every production deploy. Every item is
pass/fail. No item is optional. Group FAIL items by category and fix them
all before re-running the relevant section.

**How to use:** Work top to bottom. Check off each item. If an item fails, note
it in the "Issues" column and continue — do not stop mid-checklist. Fix all
issues after the full checklist is complete, then re-run only the failed sections.

---

## 1. Content & Copy (12 items)

- [ ] **No placeholder text** — Search for `[`, `TODO`, `PLACEHOLDER`, `Lorem ipsum`
  across all `.tsx` files. Zero matches required.
  ```bash
  grep -rn "\[COMPANY\]\|TODO\|PLACEHOLDER\|Lorem ipsum" src/
  ```
- [ ] **Business name consistent** — Same spelling and capitalization everywhere:
  header, footer, page titles, schema markup, and contact form confirmation email.
- [ ] **Phone number consistent** — Same formatted number in header, footer, contact
  page, schema markup, and NAP block. Matches Google Business Profile exactly.
- [ ] **Address consistent** — Same formatted address in footer, contact page,
  schema markup. Matches Google Business Profile exactly.
- [ ] **Service descriptions are real** — Not generic AI filler. Each service page
  describes what the contractor actually does, in their voice.
- [ ] **All testimonials are real** — Named individuals, real quotes. No invented
  reviews.
- [ ] **License number visible** — Contractor's license number appears on at least
  the homepage and contact page.
- [ ] **Years in business accurate** — If "serving [City] since [YEAR]" appears,
  the year is correct.
- [ ] **Review count is current** — Star rating and review count match Google
  Business Profile as of this week.
- [ ] **Service areas are accurate** — City list matches where the contractor
  actually operates.
- [ ] **CTAs are specific** — Not "Learn More" — specific calls like "Get a Free
  Estimate" or "Call for Same-Day Service".
- [ ] **Emergency/24-hour claim is accurate** — Only present if contractor actually
  offers 24/7 service.

---

## 2. SEO (13 items)

- [ ] **Homepage title tag** — `[Primary Service] in [City] | [Company Name]` format.
  50–60 characters. Unique.
- [ ] **Homepage meta description** — Action-oriented CTA. 150–160 characters.
  Includes primary service and city.
- [ ] **Every page has unique title** — No two pages share the same title tag.
  ```bash
  grep -rn "title:" src/app --include="*.tsx" | grep -v "generateMetadata"
  ```
- [ ] **Every page has unique meta description** — No duplicate descriptions.
- [ ] **Single H1 per page** — No page has 0 or 2+ H1 tags.
- [ ] **Sequential heading hierarchy** — H1 → H2 → H3, never skipping levels.
- [ ] **Self-referencing canonical** — Every page's canonical points to its own URL.
- [ ] **Open Graph tags** — `og:title`, `og:description`, `og:image` (1200×630px)
  on every page.
- [ ] **LocalBusiness schema** — JSON-LD on homepage with correct `@type` matching
  `siteConfig.schemaType` (e.g. `Plumber`, `HVACBusiness`, `Electrician`).
- [ ] **Service schema** — JSON-LD on each service page with `name`, `description`,
  `provider`, `areaServed`.
- [ ] **FAQPage schema** — JSON-LD on FAQ page (if present). Questions and answers
  match visible content exactly.
- [ ] **Sitemap accessible** — `/sitemap.xml` returns 200 with all pages listed.
- [ ] **Robots.txt** — `/robots.txt` returns 200. Does not block `Googlebot`.
  Privacy policy page has `noindex` via meta tag (not robots.txt).

---

## 3. Accessibility (11 items)

- [ ] **All images have alt text** — No `alt=""` except for purely decorative images
  that should be `alt=""`. Hero image has descriptive alt text.
- [ ] **Color contrast passes** — All body text ≥ 4.5:1 contrast ratio against
  background. All large text ≥ 3:1. Test with browser DevTools or axe extension.
- [ ] **Phone number link** — Telephone links use `<a href="tel:...">`. Screen
  readers announce them correctly.
- [ ] **Form labels** — Every input has an associated `<label>` or `aria-label`.
  No placeholder-as-label patterns.
- [ ] **Form error messages** — Connected to inputs via `aria-describedby`. Screen
  readers announce errors when they appear.
- [ ] **Focus indicators** — Tab through the entire page. Every focusable element
  has a visible focus ring. `outline: none` is never used without a custom replacement.
- [ ] **Skip link** — "Skip to main content" link appears as the first focusable
  element on all pages. Works when activated.
- [ ] **Keyboard navigation** — Mobile menu opens and closes with keyboard.
  Accordion FAQ (if present) opens with Enter/Space.
- [ ] **Touch targets** — All interactive elements are ≥ 48×48px on mobile.
  Test at 375px viewport.
- [ ] **Language attribute** — `<html lang="en">` present on every page.
- [ ] **No keyboard traps** — If a modal or drawer is present, Escape closes it
  and focus returns to the trigger.

---

## 4. Performance (10 items)

- [ ] **LCP < 2.5 seconds** — Test with PageSpeed Insights on mobile. Use the
  production or preview URL, not localhost.
- [ ] **CLS < 0.1** — No layout shift from fonts, images, or banners.
- [ ] **INP < 200ms** — Tested via PageSpeed Insights field data or lab data.
- [ ] **Hero image uses `priority`** — `<Image priority>` prop set on the
  above-fold hero image. Verified in HTML output: `fetchpriority="high"`.
- [ ] **No raw `<img>` tags** — All images use `next/image`. Zero matches:
  ```bash
  grep -rn "<img " src/ --include="*.tsx"
  ```
- [ ] **All fonts via next/font** — No Google Fonts `<link>` tags. Zero matches:
  ```bash
  grep -rn "fonts.googleapis.com" src/
  ```
- [ ] **`pnpm build` passes** — Production build exits 0. No TypeScript errors.
  No missing environment variable warnings.
- [ ] **No page > 100KB initial JS** — Verified with bundle analyzer.
- [ ] **No unused CSS in production** — Tailwind's purge is configured. Build
  output does not include utility classes not used in the source.
- [ ] **Compression enabled** — `compress: true` in next.config.js. Vercel
  applies Brotli/gzip automatically.

---

## 5. Security (8 items)

- [ ] **All 7 security headers present** — Test with `curl -I [preview-url]`.
  Verify: `X-Content-Type-Options`, `X-Frame-Options`, `Strict-Transport-Security`,
  `Referrer-Policy`, `Permissions-Policy`, `Content-Security-Policy`,
  `X-DNS-Prefetch-Control`.
- [ ] **No API keys in client code** — Zero matches:
  ```bash
  grep -rn "SUPABASE_SERVICE_ROLE\|sk_live_\|rk_live_" src/
  ```
- [ ] **`.env.local` in `.gitignore`** — Confirmed. Run: `git status .env.local`
  — must say "nothing to commit" or "untracked."
- [ ] **No secrets in git history** — Run:
  ```bash
  git log --all -p -- "*.env*" | grep -i "key\|secret\|token"
  ```
  Zero matches required.
- [ ] **`pnpm audit` passes** — Zero high or critical vulnerabilities.
- [ ] **CSP does not use `unsafe-eval`** — Verify in the Content-Security-Policy header.
- [ ] **Supabase RLS policies active** — Verify in Supabase dashboard that all
  tables have RLS enabled and policies applied.
- [ ] **No hardcoded domain in canonical URLs** — Canonicals use relative paths
  or the domain from `siteConfig`, not a hardcoded string.

---

## 6. Privacy & CCPA (8 items)

- [ ] **Cookie consent banner appears** — Open incognito tab, navigate to site.
  Banner must appear before any analytics scripts fire.
- [ ] **GA4 does not fire before consent** — Check Network tab in incognito before
  accepting. Zero requests to `googletagmanager.com` or `google-analytics.com`.
- [ ] **GA4 fires after accepting** — Accept consent. Verify `gtag` requests
  appear in Network tab.
- [ ] **Declining blocks GA4** — Open new incognito. Decline consent. Reload.
  Verify no `gtag` requests.
- [ ] **Privacy policy page exists** — `/privacy` returns 200 and renders content.
- [ ] **Privacy policy linked in footer** — "Privacy Policy" link visible and
  working on all pages.
- [ ] **"Cookie Preferences" in footer** — Link present. Clicking re-opens
  consent banner.
- [ ] **Privacy policy has "Last updated" date** — Date matches site launch date.

---

## 7. Forms & Integrations (8 items)

- [ ] **Contact form submits successfully** — End-to-end test: fill out the form,
  submit, verify success message appears.
- [ ] **Lead arrives in Supabase** — After test submission, check `leads` table
  in Supabase dashboard. Lead row exists with correct data.
- [ ] **Email notification delivered** — Contractor email receives the lead
  notification within 60 seconds of form submission.
- [ ] **Email contains all lead details** — Name, phone, email, service type,
  message, timestamp.
- [ ] **Form validation works** — Submit empty form → all required field errors
  appear. Submit with invalid email → email error appears.
- [ ] **Honeypot field invisible** — Honeypot input is not visible and has no
  label. CSS hides it completely (not just `display: none` which screen readers
  ignore — use `position: absolute; opacity: 0; pointer-events: none`).
- [ ] **Google Maps embed loads** — If Maps is embedded, the iframe renders the
  correct location. No "This page can't load Google Maps" error.
- [ ] **Booking widget loads** — If a booking widget is embedded, it renders
  correctly without console errors.

---

## 8. Mobile (5 items)

- [ ] **Phone number visible without scrolling** — At 375px viewport, the phone
  number must be visible in the header or sticky bar. No scrolling required.
- [ ] **Sticky mobile CTA visible** — The sticky "Call Now" or "Get a Quote" bar
  at the bottom of the viewport renders correctly at 375px.
- [ ] **Mobile menu works** — Hamburger opens navigation. All nav links work.
  Menu closes when a link is tapped or Escape is pressed.
- [ ] **Form is usable on mobile** — At 375px, all form fields are full-width,
  labels are visible, and the submit button is easy to tap.
- [ ] **No horizontal scroll** — At 375px, no element causes the page to scroll
  horizontally. Check with DevTools or on a real device.

---

## 9. Cross-Browser (5 items)

Test in Playwright's three engines (Chromium, Firefox, WebKit):

- [ ] **Homepage renders correctly in all three browsers**
- [ ] **Contact form submits in all three browsers**
- [ ] **Mobile menu works in all three browsers**
- [ ] **Fonts render correctly in Safari/WebKit** — No invisible text
- [ ] **CSS animations don't break in Firefox** — Especially scroll-triggered
  fade-ins and the cookie consent slide-up animation

---

## 10. Analytics & Monitoring (5 items)

- [ ] **GA4 property created** — Measurement ID matches `siteConfig.integrations.googleAnalyticsId`
- [ ] **GA4 receiving data** — After accepting consent, check GA4 Realtime view.
  Should see 1 active user (you).
- [ ] **`form_submit` marked as conversion** — In GA4 Admin → Events → toggle
  "Mark as conversion" for `form_submit`.
- [ ] **`phone_click` marked as conversion** — Same process.
- [ ] **Uptime monitor active** — UptimeRobot or equivalent is monitoring the
  production domain and will alert within 10 minutes of downtime.

---

## Final Sign-Off

Before handing off to the client, confirm:

- [ ] All 70 checklist items above are PASS
- [ ] `pnpm build` exits 0
- [ ] Preview URL verified manually (not just automated)
- [ ] Production deploy completed
- [ ] Production domain loads correctly
- [ ] Client handoff document drafted and ready to send
- [ ] Git tag `v1.0.0` created and pushed

**If any item above is FAIL:** Do not deploy. Fix it. The client's business
reputation depends on this site working correctly on day one.
