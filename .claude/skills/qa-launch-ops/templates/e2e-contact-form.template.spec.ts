/**
 * e2e-contact-form.template.spec.ts
 *
 * Pack 8 — Contact Form E2E Test Suite
 *
 * HOW TO USE:
 * 1. Copy to tests/e2e/contact-form.spec.ts
 * 2. Update SERVICE_OPTIONS to match siteConfig.services[] labels
 * 3. Update PHONE_DISPLAY to match siteConfig.contact.phone
 * 4. Set PLAYWRIGHT_TEST=true in your .env.local so Server Actions skip DB writes
 * 5. Run: npx playwright test contact-form
 *
 * WHAT THIS TESTS:
 * - Contact page loads correctly
 * - Form renders all required fields
 * - Client-side validation blocks empty / invalid submissions
 * - Honeypot field is hidden from users (not visible, not labeled)
 * - Successful form submission shows the success state
 * - Success state contains response time expectation and phone fallback
 * - Error state renders when server returns an error
 * - Form is usable on mobile (375px viewport)
 * - Re-submission is possible after a failed attempt
 *
 * WHAT THIS DOES NOT TEST (tested manually in preview verification):
 * - Actual Supabase write (mocked via PLAYWRIGHT_TEST=true)
 * - Email notification delivery (tested manually)
 * - End-to-end lead receipt by the contractor
 */

import { test, expect, Page } from '@playwright/test'

// ─── Customize per client ─────────────────────────────────────────────────────

/** Options in the service dropdown — must match siteConfig.services[].label */
const SERVICE_OPTIONS = [
  'Water Heater Repair',
  'Drain Cleaning',
  'Leak Detection',
  'Pipe Repair',
  // ADD ALL SERVICE OPTIONS HERE
] // UPDATE THIS

/** Phone number displayed as fallback in success/error state */
const PHONE_DISPLAY = '(555) 867-5309' // UPDATE THIS

/** Valid test data — use real-looking data to avoid triggering spam filters */
const VALID_FORM_DATA = {
  name: 'Alex Johnson',
  phone: '(555) 234-5678',
  email: 'alex.johnson@example.com',
  service: SERVICE_OPTIONS[0],
  message: 'I have a leaking pipe under the kitchen sink and need help ASAP.',
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function navigateToContactForm(page: Page) {
  await page.goto('/contact')
  // Dismiss cookie consent if present
  const banner = page.getByRole('dialog', { name: /cookie consent/i })
  if (await banner.isVisible({ timeout: 2000 }).catch(() => false)) {
    await page.getByRole('button', { name: /decline/i }).click()
    await expect(banner).not.toBeVisible({ timeout: 2000 })
  }
  // Wait for form to be ready
  await expect(page.locator('form')).toBeVisible()
}

async function fillForm(
  page: Page,
  data: Partial<typeof VALID_FORM_DATA> = VALID_FORM_DATA
) {
  if (data.name !== undefined) {
    await page.getByRole('textbox', { name: /name/i }).fill(data.name)
  }
  if (data.phone !== undefined) {
    await page.getByRole('textbox', { name: /phone/i }).fill(data.phone)
  }
  if (data.email !== undefined) {
    await page.getByRole('textbox', { name: /email/i }).fill(data.email)
  }
  if (data.service !== undefined) {
    const serviceSelect = page.getByRole('combobox', { name: /service/i })
    if (await serviceSelect.isVisible().catch(() => false)) {
      await serviceSelect.selectOption({ label: data.service })
    }
  }
  if (data.message !== undefined) {
    await page.getByRole('textbox', { name: /message|describe/i }).fill(data.message)
  }
}

// ─── Test Suite ───────────────────────────────────────────────────────────────

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => localStorage.clear())
    await navigateToContactForm(page)
  })

  // ── Page Load ────────────────────────────────────────────────────────────────

  test('contact page returns HTTP 200', async ({ page }) => {
    const response = await page.goto('/contact')
    expect(response?.status()).toBe(200)
  })

  test('contact page has correct H1', async ({ page }) => {
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
    expect((await h1.textContent())?.length).toBeGreaterThan(5)
  })

  // ── Form Renders ──────────────────────────────────────────────────────────────

  test('form renders all required fields', async ({ page }) => {
    await expect(page.getByRole('textbox', { name: /name/i })).toBeVisible()
    await expect(page.getByRole('textbox', { name: /phone/i })).toBeVisible()
    await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible()
    await expect(page.getByRole('textbox', { name: /message|describe/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /submit|send|request/i })).toBeVisible()
  })

  test('submit button is enabled on load', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /submit|send|request/i })
    await expect(submitButton).toBeEnabled()
  })

  // ── Honeypot Security ──────────────────────────────────────────────────────────

  test('honeypot field is not visible to users', async ({ page }) => {
    // Common honeypot field names
    const honeypotSelectors = [
      '[name="website"]',
      '[name="url"]',
      '[name="honeypot"]',
      '[name="bot_field"]',
      '[name="_gotcha"]',
    ]

    for (const selector of honeypotSelectors) {
      const honeypot = page.locator(selector)
      if (await honeypot.count() > 0) {
        // If found, it must not be visible to users
        await expect(honeypot).not.toBeVisible()
        // Verify it's truly hidden (not just off-screen via clip)
        const boundingBox = await honeypot.boundingBox()
        const isHidden =
          !boundingBox ||
          boundingBox.width === 0 ||
          boundingBox.height === 0
        expect(isHidden, `Honeypot field "${selector}" should be visually hidden`).toBe(true)
        break // Found and verified — stop checking
      }
    }
  })

  test('honeypot field has no visible label', async ({ page }) => {
    // Screen reader users should not see or hear the honeypot field label
    const hiddenInputs = page.locator('input[tabindex="-1"], input[style*="opacity: 0"], input[aria-hidden="true"]')
    const count = await hiddenInputs.count()
    if (count > 0) {
      // Verify the label for this input is also hidden
      for (let i = 0; i < count; i++) {
        const input = hiddenInputs.nth(i)
        const id = await input.getAttribute('id')
        if (id) {
          const label = page.locator(`label[for="${id}"]`)
          if (await label.count() > 0) {
            // Label exists — it should be visually hidden too
            await expect(label).not.toBeVisible()
          }
        }
      }
    }
  })

  // ── Validation ────────────────────────────────────────────────────────────────

  test('submitting empty form shows validation errors', async ({ page }) => {
    await page.getByRole('button', { name: /submit|send|request/i }).click()

    // At least one error message should appear
    const errors = page.locator('[role="alert"], [aria-live="polite"], .error, [class*="error"]')
    await expect(errors.first()).toBeVisible()
  })

  test('name field error appears for empty name', async ({ page }) => {
    // Fill other fields but leave name empty
    await fillForm(page, { ...VALID_FORM_DATA, name: '' })
    await page.getByRole('button', { name: /submit|send|request/i }).click()

    // Error message near the name field
    const nameField = page.getByRole('textbox', { name: /name/i })
    const nameFieldParent = nameField.locator('..')
    await expect(
      nameFieldParent.locator('[class*="error"], [role="alert"]').or(
        page.getByText(/name is required|enter your name/i)
      )
    ).toBeVisible()
  })

  test('invalid email address shows email error', async ({ page }) => {
    await fillForm(page, { ...VALID_FORM_DATA, email: 'not-an-email' })
    await page.getByRole('button', { name: /submit|send|request/i }).click()

    await expect(
      page.getByText(/valid email|email address|enter.*email/i)
    ).toBeVisible()
  })

  test('submit button shows loading state during submission', async ({ page }) => {
    await fillForm(page)
    const submitButton = page.getByRole('button', { name: /submit|send|request/i })

    // Mock the server action to add a deliberate delay
    await page.route('**/contact**', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      await route.continue()
    })

    await submitButton.click()

    // Button should be disabled while loading
    await expect(submitButton).toBeDisabled({ timeout: 1000 })
  })

  // ── Successful Submission ──────────────────────────────────────────────────────

  test('successful submission shows success state', async ({ page }) => {
    // Mock successful server response
    await page.route('**', async (route) => {
      if (route.request().method() === 'POST' && route.request().url().includes('contact')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true }),
        })
      } else {
        await route.continue()
      }
    })

    await fillForm(page)
    await page.getByRole('button', { name: /submit|send|request/i }).click()

    // Success state should appear
    const successState = page.getByRole('heading', { name: /thank you|we'll be in touch|request received/i })
      .or(page.locator('[data-testid="form-success"]'))
      .or(page.getByText(/thank you|we received your/i))
    await expect(successState).toBeVisible({ timeout: 10000 })
  })

  test('success state contains response time promise', async ({ page }) => {
    await page.route('**', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true }),
        })
      } else {
        await route.continue()
      }
    })

    await fillForm(page)
    await page.getByRole('button', { name: /submit|send|request/i }).click()
    await page.waitForSelector('[data-testid="form-success"], [class*="success"]', { timeout: 10000 })

    // Should mention response time (hour, minutes, day, etc.)
    const bodyText = await page.locator('main').textContent()
    expect(bodyText).toMatch(/hour|minute|day|shortly|soon|within/i)
  })

  test('success state shows phone number as fallback', async ({ page }) => {
    await page.route('**', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true }),
        })
      } else {
        await route.continue()
      }
    })

    await fillForm(page)
    await page.getByRole('button', { name: /submit|send|request/i }).click()
    await page.waitForSelector('[data-testid="form-success"], [class*="success"]', { timeout: 10000 })

    // Phone number should be visible in success state
    await expect(page.getByText(PHONE_DISPLAY)).toBeVisible()
  })

  // ── Error State ───────────────────────────────────────────────────────────────

  test('server error shows error state with phone fallback', async ({ page }) => {
    // Simulate server error
    await page.route('**', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ success: false, error: 'Server error' }),
        })
      } else {
        await route.continue()
      }
    })

    await fillForm(page)
    await page.getByRole('button', { name: /submit|send|request/i }).click()

    // Error state should mention the phone as a fallback
    await expect(
      page.getByText(/try again|call us|phone|error/i)
    ).toBeVisible({ timeout: 10000 })

    await expect(page.getByText(PHONE_DISPLAY)).toBeVisible()
  })

  test('submit button re-enables after server error', async ({ page }) => {
    await page.route('**', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({ status: 500, body: '{}' })
      } else {
        await route.continue()
      }
    })

    await fillForm(page)
    const submitButton = page.getByRole('button', { name: /submit|send|request|try again/i })
    await submitButton.click()

    // After error, user should be able to try again
    await expect(
      page.getByRole('button', { name: /try again|submit|send/i })
    ).toBeEnabled({ timeout: 10000 })
  })

  // ── Mobile ────────────────────────────────────────────────────────────────────

  test('form is usable on mobile viewport', async ({ page, viewport }) => {
    test.skip(
      (viewport?.width ?? 1280) >= 768,
      'Mobile form test runs only on mobile viewport'
    )

    // All fields should be full-width on mobile (not side-by-side)
    const nameField = page.getByRole('textbox', { name: /name/i })
    const emailField = page.getByRole('textbox', { name: /email/i })

    const nameBox = await nameField.boundingBox()
    const emailBox = await emailField.boundingBox()
    const viewportWidth = page.viewportSize()?.width ?? 375

    // Fields should take up most of the viewport width
    expect(nameBox?.width).toBeGreaterThan(viewportWidth * 0.7)
    expect(emailBox?.width).toBeGreaterThan(viewportWidth * 0.7)

    // Submit button should be at least 48px tall (tap target)
    const submitButton = page.getByRole('button', { name: /submit|send|request/i })
    const submitBox = await submitButton.boundingBox()
    expect(submitBox?.height).toBeGreaterThanOrEqual(48)
  })

  test('complete form submission works on mobile', async ({ page, viewport }) => {
    test.skip(
      (viewport?.width ?? 1280) >= 768,
      'Mobile submission test runs only on mobile viewport'
    )

    await page.route('**', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true }),
        })
      } else {
        await route.continue()
      }
    })

    await fillForm(page)
    await page.getByRole('button', { name: /submit|send|request/i }).tap()

    await expect(
      page.getByText(/thank you|we received|we'll be in touch/i)
    ).toBeVisible({ timeout: 10000 })
  })

  // ── Visual Regression ─────────────────────────────────────────────────────────

  test('contact form screenshot — idle state', async ({ page }) => {
    test.skip(
      !process.env.VISUAL_REGRESSION,
      'Visual regression runs only when VISUAL_REGRESSION=true'
    )
    await expect(page).toHaveScreenshot('contact-form-idle.png', {
      fullPage: true,
      animations: 'disabled',
      maxDiffPixelRatio: 0.02,
    })
  })

  test('contact form screenshot — validation error state', async ({ page }) => {
    test.skip(
      !process.env.VISUAL_REGRESSION,
      'Visual regression runs only when VISUAL_REGRESSION=true'
    )
    // Trigger validation errors
    await page.getByRole('button', { name: /submit|send|request/i }).click()
    await page.waitForTimeout(500) // let error messages render

    await expect(page).toHaveScreenshot('contact-form-errors.png', {
      fullPage: true,
      animations: 'disabled',
      maxDiffPixelRatio: 0.02,
    })
  })
})
