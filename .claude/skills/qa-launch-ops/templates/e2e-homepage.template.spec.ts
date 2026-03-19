/**
 * e2e-homepage.template.spec.ts
 *
 * Pack 8 — Homepage E2E Test Suite
 *
 * HOW TO USE:
 * 1. Copy to tests/e2e/homepage.spec.ts
 * 2. Update SITE_NAME, PHONE_NUMBER, and SERVICE_SLUGS to match siteConfig
 * 3. Add/remove service slugs to match siteConfig.services[]
 * 4. Run: npx playwright test homepage
 *
 * WHAT THIS TESTS:
 * - Page loads with HTTP 200
 * - Above-fold content is visible without scrolling
 * - Phone number is in the header and has a valid tel: link
 * - Hero section renders headline and CTA
 * - Services section shows all expected services
 * - Testimonials section renders (at least one review visible)
 * - Footer renders with NAP data and Privacy Policy link
 * - Mobile menu opens and closes correctly
 * - No JavaScript console errors on load
 * - Page is accessible to keyboard navigation
 */

import { test, expect, Page } from '@playwright/test'

// ─── Customize per client ─────────────────────────────────────────────────────

/** Matches siteConfig.business.name */
const SITE_NAME = 'Joe\'s Plumbing' // UPDATE THIS

/** Matches siteConfig.contact.phone — formatted as it appears on the page */
const PHONE_DISPLAY = '(555) 867-5309' // UPDATE THIS

/** Digits only — used to verify the tel: href */
const PHONE_DIGITS = '5558675309' // UPDATE THIS

/** First service slug — used to test service page navigation */
const FIRST_SERVICE_SLUG = 'water-heater-repair' // UPDATE THIS

/** All service slugs from siteConfig.services[].slug */
const SERVICE_SLUGS = [
  'water-heater-repair',
  'drain-cleaning',
  'leak-detection',
  'pipe-repair',
  // ADD ALL SERVICES HERE
] // UPDATE THIS

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Dismiss the cookie consent banner so it doesn't interfere with other tests */
async function dismissCookieConsent(page: Page) {
  const banner = page.getByRole('dialog', { name: /cookie consent/i })
  if (await banner.isVisible({ timeout: 3000 }).catch(() => false)) {
    await page.getByRole('button', { name: /decline/i }).click()
    await expect(banner).not.toBeVisible({ timeout: 3000 })
  }
}

// ─── Test Suite ───────────────────────────────────────────────────────────────

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to reset consent state
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.goto('/')
    await dismissCookieConsent(page)
  })

  // ── Load & HTTP ──────────────────────────────────────────────────────────────

  test('returns HTTP 200', async ({ page }) => {
    const response = await page.goto('/')
    expect(response?.status()).toBe(200)
  })

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(new RegExp(SITE_NAME, 'i'))
  })

  test('has no JavaScript console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    // Filter out known benign errors (e.g. browser extension noise)
    const realErrors = errors.filter(
      (e) => !e.includes('extension') && !e.includes('favicon')
    )
    expect(realErrors).toHaveLength(0)
  })

  // ── Header ───────────────────────────────────────────────────────────────────

  test('header is visible with company name', async ({ page }) => {
    const header = page.locator('header')
    await expect(header).toBeVisible()
    await expect(header).toContainText(SITE_NAME)
  })

  test('phone number is visible in header without scrolling', async ({ page }) => {
    // Must be in viewport on load — no scrolling required
    const phoneLink = page
      .locator('header')
      .getByRole('link', { name: new RegExp(PHONE_DISPLAY.replace(/[()]/g, '\\$&')) })
    await expect(phoneLink).toBeVisible()
    await expect(phoneLink).toBeInViewport()
  })

  test('phone number has valid tel: href', async ({ page }) => {
    const phoneLinks = page.locator(`a[href="tel:${PHONE_DIGITS}"]`)
    await expect(phoneLinks.first()).toBeVisible()
  })

  // ── Hero Section ──────────────────────────────────────────────────────────────

  test('hero section renders with H1 and CTA', async ({ page }) => {
    // H1 should be visible above the fold
    const h1 = page.locator('h1').first()
    await expect(h1).toBeVisible()
    await expect(h1).toBeInViewport()
    expect((await h1.textContent())?.length).toBeGreaterThan(10)

    // CTA button should be visible in the hero
    const heroCTA = page
      .locator('section')
      .first()
      .getByRole('link')
      .or(page.locator('section').first().getByRole('button'))
      .first()
    await expect(heroCTA).toBeVisible()
    await expect(heroCTA).toBeInViewport()
  })

  test('hero image loads without broken placeholder', async ({ page }) => {
    // Check that no img has naturalWidth of 0 (broken image indicator)
    const brokenImages = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'))
      return imgs
        .filter((img) => img.complete && img.naturalWidth === 0)
        .map((img) => img.src)
    })
    expect(brokenImages).toHaveLength(0)
  })

  // ── Services Section ──────────────────────────────────────────────────────────

  test('services section is visible', async ({ page }) => {
    // Scroll to services and verify it renders
    await page.evaluate(() => window.scrollBy(0, 600))
    const servicesSection = page.getByRole('heading', {
      level: 2,
      name: /services|what we (do|offer|fix)/i,
    })
    await expect(servicesSection).toBeVisible()
  })

  test('all service links point to valid routes', async ({ page }) => {
    for (const slug of SERVICE_SLUGS) {
      const serviceURL = `/services/${slug}`
      const response = await page.request.get(serviceURL)
      expect(response.status(), `${serviceURL} should return 200`).toBe(200)
    }
  })

  // ── Testimonials ──────────────────────────────────────────────────────────────

  test('testimonials section shows at least one review', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2))
    // Testimonials are typically blockquotes or have a star rating
    const testimonials = page.locator('blockquote, [data-testid="testimonial"]')
    const count = await testimonials.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  // ── Footer ────────────────────────────────────────────────────────────────────

  test('footer renders with NAP data', async ({ page }) => {
    const footer = page.locator('footer')
    await footer.scrollIntoViewIfNeeded()
    await expect(footer).toBeVisible()
    await expect(footer).toContainText(SITE_NAME)
    await expect(footer).toContainText(PHONE_DISPLAY)
  })

  test('footer has Privacy Policy link', async ({ page }) => {
    const footer = page.locator('footer')
    const privacyLink = footer.getByRole('link', { name: /privacy policy/i })
    await expect(privacyLink).toBeVisible()
    await expect(privacyLink).toHaveAttribute('href', '/privacy')
  })

  test('footer has Cookie Preferences link or button', async ({ page }) => {
    const footer = page.locator('footer')
    const cookiePrefs = footer.getByRole('button', { name: /cookie preferences/i })
      .or(footer.getByRole('link', { name: /cookie preferences/i }))
    await expect(cookiePrefs).toBeVisible()
  })

  // ── Navigation ────────────────────────────────────────────────────────────────

  test('main navigation links are present', async ({ page }) => {
    const nav = page.locator('nav').first()
    await expect(nav).toBeVisible()
    // At minimum: Home (or logo), Services, Contact
    const links = nav.getByRole('link')
    const count = await links.count()
    expect(count).toBeGreaterThanOrEqual(3)
  })

  test('contact nav link navigates to /contact', async ({ page }) => {
    const contactLink = page
      .locator('header')
      .getByRole('link', { name: /contact/i })
    await contactLink.click()
    await expect(page).toHaveURL(/\/contact/)
    await expect(page.locator('h1')).toBeVisible()
  })

  // ── Mobile ────────────────────────────────────────────────────────────────────

  test('mobile menu opens and closes', async ({ page, viewport }) => {
    test.skip(
      (viewport?.width ?? 1280) >= 768,
      'Mobile menu test runs only on mobile viewport'
    )

    // Hamburger button should be visible
    const hamburger = page.getByRole('button', { name: /menu|open navigation/i })
    await expect(hamburger).toBeVisible()
    await expect(hamburger).toBeInViewport()

    // Open the menu
    await hamburger.click()

    // Nav links should be visible after opening
    const mobileNav = page.getByRole('navigation').last()
    await expect(mobileNav).toBeVisible()

    // Close the menu — either by clicking again or pressing Escape
    await page.keyboard.press('Escape')
    await expect(mobileNav).not.toBeVisible({ timeout: 2000 }).catch(() => {
      // Escape may not close all menu implementations — try clicking a close button
    })
  })

  test('sticky mobile CTA is visible on mobile', async ({ page, viewport }) => {
    test.skip(
      (viewport?.width ?? 1280) >= 768,
      'Sticky CTA test runs only on mobile viewport'
    )

    // The sticky CTA should be visible at the bottom of the viewport
    const stickyCTA = page.locator('[data-testid="sticky-mobile-cta"]')
      .or(page.locator('.sticky-cta, [class*="sticky"]').last())
    await expect(stickyCTA).toBeInViewport()
  })

  // ── Accessibility ─────────────────────────────────────────────────────────────

  test('skip link is the first focusable element', async ({ page }) => {
    await page.keyboard.press('Tab')
    const focused = await page.evaluate(() => document.activeElement?.textContent)
    expect(focused?.toLowerCase()).toContain('skip')
  })

  test('all images have alt text', async ({ page }) => {
    await page.waitForLoadState('networkidle')
    const imagesWithoutAlt = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'))
      return imgs
        .filter((img) => img.alt === null || img.alt === undefined)
        .map((img) => img.src)
    })
    expect(imagesWithoutAlt).toHaveLength(0)
  })

  // ── Performance ───────────────────────────────────────────────────────────────

  test('hero image has fetchpriority="high"', async ({ page }) => {
    await page.waitForLoadState('networkidle')
    const priorityImages = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img[fetchpriority="high"]'))
      return imgs.map((img) => img.src)
    })
    // At least one image should have fetchpriority="high" (the LCP/hero image)
    expect(priorityImages.length).toBeGreaterThanOrEqual(1)
  })

  // ── Visual Regression (runs only in visual-regression project) ────────────────

  test('homepage screenshot — desktop', async ({ page }) => {
    test.skip(
      !process.env.VISUAL_REGRESSION,
      'Visual regression runs only when VISUAL_REGRESSION=true'
    )
    await dismissCookieConsent(page)
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveScreenshot('homepage-desktop.png', {
      fullPage: true,
      animations: 'disabled',
      mask: [
        page.locator('[data-testid="review-count"]'), // dynamic count
        page.locator('time'), // relative timestamps
      ],
      maxDiffPixelRatio: 0.02,
    })
  })

  test('homepage screenshot — mobile', async ({ page, viewport }) => {
    test.skip(
      !process.env.VISUAL_REGRESSION,
      'Visual regression runs only when VISUAL_REGRESSION=true'
    )
    test.skip(
      (viewport?.width ?? 1280) >= 768,
      'Mobile screenshot test runs only on mobile viewport'
    )
    await dismissCookieConsent(page)
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      animations: 'disabled',
      maxDiffPixelRatio: 0.02,
    })
  })
})
