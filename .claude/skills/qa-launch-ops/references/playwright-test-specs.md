# Playwright E2E Test Specifications

## Philosophy

Tests prove that the site works for real users — not that the code compiles.
Every test simulates an action a real visitor or potential lead would take.
If a test is hard to write, it's because the user flow is complex — simplify
the flow, not the test.

**Rules:**
1. Never use `page.waitForTimeout()` — use `waitForSelector`, `waitForResponse`,
   or `waitForURL` instead. Time-based waits are flaky.
2. Test user behavior, not implementation details. Don't test class names.
3. Two failing tests block the deploy. Zero tolerance.
4. Tests run against the preview URL before production deploy.

---

## Playwright Configuration

```typescript
// playwright.config.ts (place in project root)
import { defineConfig, devices } from '@playwright/test'

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  projects: [
    // ── Functional tests ──────────────────────────────────────────────────
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] }, // 393×851, mobile Chrome
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 13'] }, // 390×844, WebKit
    },
    // ── Visual regression ─────────────────────────────────────────────────
    {
      name: 'visual-regression',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } },
      testMatch: '**/visual.spec.ts',
    },
    {
      name: 'visual-regression-mobile',
      use: { ...devices['iPhone SE'] }, // 375×667, closest to min supported
      testMatch: '**/visual.spec.ts',
    },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

---

## Test File Organization

```
tests/
  e2e/
    homepage.spec.ts          ← homepage load and content
    contact-form.spec.ts      ← form submission end-to-end
    navigation.spec.ts        ← nav links and routing
    service-pages.spec.ts     ← all service pages load
    cookie-consent.spec.ts    ← consent banner behavior
    mobile.spec.ts            ← mobile-specific flows
    visual.spec.ts            ← screenshot regression
```

---

## Critical Flow Specifications

### Flow 1: Homepage Load

**Test objective:** The homepage loads, renders above-fold content, and shows
the phone number — all within 3 seconds.

**Pass criteria:**
- HTTP 200
- H1 visible
- Phone number visible in header (without scrolling)
- Hero CTA button visible
- No JavaScript console errors
- Page loads in < 3 seconds (measured via `page.goto()` response time)

---

### Flow 2: Contact Form Submission

**Test objective:** A user can fill and submit the contact form, see a success
message, and the lead appears in Supabase (mocked in tests — end-to-end real
verification done manually in preview step).

**Pass criteria:**
- Form renders with all required fields
- Submitting empty form shows validation errors
- Submitting invalid email shows email-specific error
- Honeypot field is not visible (opacity: 0 or position: absolute off-screen)
- Submitting a complete valid form shows the success state
- Success state contains a response-time promise (e.g. "We'll call you within the hour")
- Phone number is visible in success state as a fallback

---

### Flow 3: Mobile Click-to-Call

**Test objective:** On a 375px viewport, the phone number is visible without
scrolling and the `tel:` link is tappable.

**Pass criteria:**
- Phone number is in the viewport at load (no scroll required)
- The phone link element is ≥ 48px in height
- `href` attribute starts with `tel:` and contains only digits after the colon
- Sticky mobile CTA bar (if present) is visible at bottom of viewport

---

### Flow 4: Service Page Navigation

**Test objective:** All service pages load correctly from the navigation menu.

**Pass criteria:**
- Each service link in nav resolves to a page that returns HTTP 200
- Each service page has an H1
- Each service page has a CTA (link or button with actionable text)
- No service page shows a 404 or error boundary
- Breadcrumb navigation is present and correct

---

### Flow 5: 404 Page

**Test objective:** Navigating to a non-existent URL shows the custom 404 page,
not a Vercel default error or blank page.

**Pass criteria:**
- HTTP 404 status
- Page renders custom content (not default Next.js 404 or Vercel error)
- "Go back home" link or equivalent is present and works
- Header and footer are present (user is not stranded)

---

### Flow 6: Cookie Consent

**Test objective:** The cookie consent banner appears on first visit and
correctly controls whether GA4 fires.

**Pass criteria:**
- Banner visible before GA4 network requests
- After declining: no `googletagmanager.com` or `google-analytics.com` requests
- After accepting: GA4 requests appear
- Accepting hides the banner
- Page reload after accepting: no banner, GA4 loads immediately
- "Cookie Preferences" footer link re-shows the banner

**Note:** This test runs in Chromium only. Cookie consent state must be cleared
between tests via `context.clearCookies()` + localStorage clear.

---

## Visual Regression Specification

Visual regression captures baseline screenshots and compares future runs.
On first run, screenshots are saved as baselines. Subsequent runs compare
against baselines and fail if pixel diff > threshold.

**Pages to screenshot:**
| Page | Viewports |
|------|-----------|
| `/` (homepage) | 375px, 1280px |
| `/services/[first-service]` | 375px, 1280px |
| `/contact` | 375px, 1280px |
| `/about` | 375px, 1280px |
| `/privacy` | 1280px only |
| 404 page (`/this-page-does-not-exist`) | 1280px only |

**Screenshot options:**
```typescript
await expect(page).toHaveScreenshot('homepage-desktop.png', {
  fullPage: true,
  animations: 'disabled', // freeze CSS animations
  mask: [page.locator('.testimonial-date')], // mask dynamic content
  maxDiffPixelRatio: 0.02, // allow 2% pixel difference
})
```

**Masking dynamic content:** Mask any content that changes each run:
- Dates (testimonial dates, "posted X days ago")
- Live review counts (if fetched from API)
- Cookie consent banner (mask it or dismiss it before screenshotting)

---

## Test Data Management

**Avoid real Supabase writes in tests.** The contact form test should either:

**Option A: Mock the Server Action (recommended for unit-level)**
```typescript
// In the test, intercept the Server Action call
await page.route('**/api/submit-contact', async (route) => {
  await route.fulfill({ status: 200, body: JSON.stringify({ success: true }) })
})
```

**Option B: Use a test-specific Supabase row with a `test_submission: true` flag**
```sql
-- In Supabase dashboard, create a cleanup job:
DELETE FROM leads WHERE metadata->>'source' = 'playwright_test';
```

**Option C: Use environment variable to skip DB write in test mode**
```typescript
// In Server Action:
if (process.env.PLAYWRIGHT_TEST === 'true') {
  return { success: true, message: 'Test mode — no DB write' }
}
```

For Pack 8 QA, use Option C during automated tests. The real end-to-end form
submission test is the **manual** verification step in Phase 2 (preview verify).

---

## Running Tests Against Preview URL

```bash
# Run full test suite against Vercel preview URL
PLAYWRIGHT_BASE_URL=https://client-name-abc123.vercel.app npx playwright test

# Run only critical flows (faster)
PLAYWRIGHT_BASE_URL=https://[preview-url] npx playwright test homepage contact-form mobile --project=chromium

# Run visual regression against preview
PLAYWRIGHT_BASE_URL=https://[preview-url] npx playwright test visual --project=visual-regression
```

---

## CI Integration (GitHub Actions)

If the client's repo uses GitHub Actions, add this workflow:

```yaml
# .github/workflows/playwright.yml
name: Playwright E2E Tests
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install pnpm
        run: npm install -g pnpm
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium firefox webkit
      - name: Run Playwright tests
        run: npx playwright test
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
          PLAYWRIGHT_TEST: 'true'
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7
```

---

## Common Test Failures and Fixes

| Failure | Likely Cause | Fix |
|---------|-------------|-----|
| `Element not found: [data-testid="hero-cta"]` | No `data-testid` attributes | Add `data-testid` to key elements |
| `Timeout: waiting for selector` | Slow server response in CI | Increase `timeout` in config to 30000ms |
| `Expected 200 but got 500` | Missing env vars in CI | Check GitHub Actions secrets |
| `Screenshot diff too large` | Cookie banner in screenshot | Dismiss banner before screenshotting |
| `net::ERR_NAME_NOT_RESOLVED` | Wrong BASE_URL | Verify `PLAYWRIGHT_BASE_URL` is set |
| Contact form test fails | Server Action requires real Supabase | Set `PLAYWRIGHT_TEST=true` |
| Flaky test: sometimes passes | Race condition with animation | Add `animations: 'disabled'` or await animation end |
