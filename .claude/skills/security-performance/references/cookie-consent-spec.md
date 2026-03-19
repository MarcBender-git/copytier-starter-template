# Cookie Consent Component Specification

## Design Principles

1. **Consent gates analytics, not the site** — the site is fully usable without accepting cookies
2. **No dark patterns** — Accept and Decline are visually equal
3. **Zero layout shift** — fixed positioning, does not push content up
4. **Fast** — does not block page rendering; mounts after hydration
5. **Persistent** — one decision lasts 12 months
6. **Accessible** — keyboard navigable, screen reader announced, focus managed

---

## State Machine

```
Initial Visit (no localStorage key)
  → banner: VISIBLE
  → GA4: NOT LOADED

User clicks "Accept"
  → localStorage.setItem('copytier_consent', 'accepted')
  → localStorage.setItem('copytier_consent_ts', Date.now())
  → banner: HIDDEN (CSS transition out)
  → GA4: LOADED (dynamic <Script> injected)

User clicks "Decline"
  → localStorage.setItem('copytier_consent', 'declined')
  → localStorage.setItem('copytier_consent_ts', Date.now())
  → banner: HIDDEN
  → GA4: NOT LOADED (never fires this session)

Returning Visit (localStorage key exists, < 12 months old)
  → banner: NOT SHOWN
  → If 'accepted': GA4 LOADS on mount
  → If 'declined': GA4 NEVER LOADS

Returning Visit (localStorage key exists, > 12 months old)
  → banner: VISIBLE (re-prompt)
  → GA4: NOT LOADED until new decision

User clicks "Cookie Preferences" in footer
  → banner: VISIBLE (regardless of current preference)
  → Allows user to change their decision
```

---

## Component Props Interface

```tsx
interface CookieConsentProps {
  gaId: string        // GA4 measurement ID from siteConfig.integrations.googleAnalyticsId
  fbPixelId?: string  // optional Facebook Pixel ID
}
```

---

## Storage Schema

```
localStorage key: 'copytier_consent'
  Values: 'accepted' | 'declined' | undefined (key absent = first visit)

localStorage key: 'copytier_consent_ts'
  Value: Unix timestamp (milliseconds) of when decision was made
  Purpose: Detect 12-month expiry
```

**Why localStorage, not cookies:**
localStorage persists until cleared by user or the 12-month expiry logic.
Ironically, using a cookie to store cookie consent is circular and can be blocked
by cookie blockers. localStorage is more reliable and not blocked by default.

---

## Visual Design Specification

### Desktop (≥ 768px)

```
┌─────────────────────────────────────────────────────────────┐
│ 🍪  We use cookies to analyze site traffic. No personal     │
│     information is sold.  Privacy Policy              [Decline] [Accept] │
└─────────────────────────────────────────────────────────────┘
```

- Fixed to bottom of viewport
- Full-width background in `--color-surface-raised` (white or light gray)
- Top border in `--color-border`
- Padding: 16px vertical, 24px horizontal
- Max-width: 100% (full width)
- Z-index: 50 (above all content, below modals)
- Box shadow: `0 -4px 16px rgba(0,0,0,0.08)` (shadow up)

### Mobile (< 768px)

Same as desktop. Text wraps. Buttons stack below text or remain inline if space allows.
Touch targets: minimum 48×48px for both buttons.

### Buttons

```
[Decline]  → secondary/ghost style — border, transparent background, text color
[Accept]   → primary style — brand primary background, white text
```

Both buttons must be the same visual weight. Do not use gray/muted for Decline
and bright/bold for Accept — this is a dark pattern.

### Animation

```css
/* Entry — slides up from below */
.consent-enter { transform: translateY(100%); opacity: 0; }
.consent-enter-active { transform: translateY(0); opacity: 1; transition: all 300ms ease; }

/* Exit — slides down */
.consent-exit { transform: translateY(0); opacity: 1; }
.consent-exit-active { transform: translateY(100%); opacity: 0; transition: all 200ms ease; }
```

Use CSS transitions or Framer Motion `AnimatePresence`. Do not use JavaScript timers.

---

## GA4 Integration Pattern

GA4 must be loaded via `next/script` with `strategy="afterInteractive"` INSIDE
the consent component, not in `layout.tsx` at the top level.

**WRONG — fires before consent:**
```tsx
// layout.tsx
<Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
```

**CORRECT — fires only after consent:**
```tsx
// CookieConsent.tsx
{consent === 'accepted' && (
  <>
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      strategy="afterInteractive"
    />
    <Script id="ga4-init" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}', {
          anonymize_ip: true,
          cookie_flags: 'SameSite=None;Secure'
        });
      `}
    </Script>
  </>
)}
```

**`anonymize_ip: true`** — best practice even with consent. Reduces PII stored in GA4.

---

## Accessibility Requirements

- Banner uses `role="dialog"` and `aria-label="Cookie consent"`
- On banner mount: move focus to the "Decline" button (safer default)
- Both buttons have descriptive `aria-label` values:
  - "Decline cookies and analytics tracking"
  - "Accept cookies and analytics tracking"
- Banner is announced to screen readers via `aria-live="polite"` region
- After consent decision: focus returns to whatever the user was focused on before
- Keyboard: Tab navigates between Decline and Accept; Enter/Space activates

```tsx
useEffect(() => {
  if (showBanner) {
    declineButtonRef.current?.focus()
  }
}, [showBanner])
```

---

## "Cookie Preferences" Footer Link

Every site should have a "Cookie Preferences" link in the footer that re-opens
the consent banner regardless of the stored decision.

```tsx
// Footer.tsx
<button
  onClick={() => {
    // Dispatch custom event that CookieConsent listens for
    window.dispatchEvent(new CustomEvent('copytier:open-consent'))
  }}
  className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
>
  Cookie Preferences
</button>
```

```tsx
// CookieConsent.tsx — listen for the event
useEffect(() => {
  const handler = () => setShowBanner(true)
  window.addEventListener('copytier:open-consent', handler)
  return () => window.removeEventListener('copytier:open-consent', handler)
}, [])
```

---

## Testing Protocol

**Manual tests (run in incognito each time):**

1. **First visit:** Open incognito tab → navigate to site → banner must appear
   → check Network tab → no `gtag` or `google-analytics` requests
2. **Accept:** Click Accept → banner animates out → check Network tab →
   `googletagmanager.com` request appears → reload page → no banner → GA4 fires on load
3. **Decline:** Open new incognito tab → navigate → click Decline → check Network →
   no `gtag` requests → reload → no banner → no `gtag` requests
4. **Re-prompt after 12 months:** Manually set `copytier_consent_ts` in localStorage
   to a timestamp > 12 months ago → reload → banner appears
5. **Cookie Preferences link:** Accept consent → find footer link → click →
   banner reappears → change to Decline → verify GA4 stops firing

**Automated tests (Playwright):**

```typescript
// tests/e2e/cookie-consent.spec.ts
test('banner appears before GA4 fires', async ({ page, context }) => {
  await context.clearCookies()
  // also clear localStorage
  await page.goto('/')
  await expect(page.locator('[aria-label="Cookie consent"]')).toBeVisible()
  const requests = page.waitForRequest('**/gtag/**')
  await expect(requests).rejects.toThrow() // no gtag request before consent
})

test('GA4 fires after accepting', async ({ page, context }) => {
  await context.clearCookies()
  await page.goto('/')
  const gtagRequest = page.waitForRequest('**/gtag/**')
  await page.click('[aria-label="Accept cookies and analytics tracking"]')
  await expect(gtagRequest).resolves.toBeTruthy()
})
```

---

## Consent Banner Text

Adapt this text to match the client's site:

**Headline (optional):** "We Value Your Privacy"

**Body text:**
"We use cookies to understand how visitors use our site. This helps us improve
your experience. We do not sell your personal information."

**Link text:** "Privacy Policy" → `/privacy`

**Button labels:**
- "Decline" (left, secondary style)
- "Accept" (right, primary style)

Keep text short. Most users will not read it — the button labels must make the
choice completely clear without reading the body text.
