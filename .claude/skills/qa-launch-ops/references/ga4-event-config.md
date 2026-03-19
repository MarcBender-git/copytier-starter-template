# GA4 Event Configuration Reference

## Why GA4 Matters for Contractor Sites

Google Analytics 4 answers the one question every contractor cares about:
"Is my website bringing me leads?" Without conversion tracking, GA4 is just
a vanity metrics dashboard. With it, we can prove ROI.

**The three GA4 questions that matter:**
1. Which pages are generating form submissions and phone calls? (conversion by page)
2. Where are leads coming from? (source/medium — Google Search vs. Maps vs. Direct)
3. Are mobile users converting? (device breakdown on conversions)

---

## GA4 Property Setup

### Step 1: Create GA4 Property

1. Go to analytics.google.com → Admin → Create Property
2. Property name: `[Company Name] — Website`
3. Reporting time zone: `(GMT-08:00) Pacific Time` (California)
4. Currency: `United States Dollar`
5. Industry category: Match to contractor niche (Home Services)
6. Business size: Small

### Step 2: Configure Data Retention

GA4 Admin → Data Settings → Data Retention:
- Event data retention: **14 months** (maximum on free plan)
- Reset on new activity: **On** (extends retention for returning users)

### Step 3: Enable Google Signals

GA4 Admin → Data Settings → Google Signals:
- Toggle ON (enables cross-device reporting and demographics)
- Acknowledge the dialog

### Step 4: Link to Google Search Console

GA4 Admin → Product Links → Search Console Links:
- Connect the Search Console property for the site's domain
- This enables organic search data in GA4 Acquisition reports

### Step 5: Set Up Measurement ID

Copy the Measurement ID (format: `G-XXXXXXXXXX`) into:
```
.env.local → NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
```

Verify in `siteConfig.integrations.googleAnalyticsId` that it matches.

---

## Custom Event Specifications

All five events are fired client-side via `gtag()` after the user has accepted
cookie consent. The `CookieConsent` component manages consent state — do not
fire any `gtag()` calls outside of components that check consent.

**Helper function (add to `src/lib/analytics.ts`):**

```typescript
// src/lib/analytics.ts
export function trackEvent(
  name: string,
  params: Record<string, string | number | boolean> = {}
): void {
  if (typeof window === 'undefined') return
  if (!window.gtag) return // GA4 not loaded (consent declined)
  window.gtag('event', name, params)
}
```

---

### Event 1: `phone_click`

**Trigger:** User clicks any phone number link (`<a href="tel:...">`)

**Why it matters:** Phone calls are often the highest-converting lead action.
Tracks intent without requiring the user to fill out a form.

**Implementation — wrap all `tel:` links:**

```tsx
// src/components/layout/Header.tsx and any other phone link component
import { trackEvent } from '@/lib/analytics'

function PhoneLink({ phone }: { phone: string }) {
  return (
    <a
      href={`tel:${phone.replace(/\D/g, '')}`}
      onClick={() =>
        trackEvent('phone_click', {
          phone_number: phone,
          location: 'header', // or 'footer', 'sticky_cta', 'hero', 'contact_page'
        })
      }
      className="..."
    >
      {phone}
    </a>
  )
}
```

**GA4 parameters:**
| Parameter | Type | Value |
|-----------|------|-------|
| `phone_number` | string | Formatted phone (e.g. "(555) 867-5309") |
| `location` | string | Where on the page the link is ("header", "footer", "sticky_cta") |

**Mark as conversion:** Yes. In GA4 Admin → Events → toggle "Mark as conversion."

---

### Event 2: `form_start`

**Trigger:** User focuses the first field in the contact form

**Why it matters:** Measures how many users begin the form vs. abandon it.
High starts + low submissions = form UX problem.

**Implementation — add to `ContactForm.tsx`:**

```tsx
// src/components/forms/ContactForm.tsx
import { trackEvent } from '@/lib/analytics'
import { useRef } from 'react'

export function ContactForm() {
  const hasTrackedStart = useRef(false)

  function handleFirstFocus() {
    if (hasTrackedStart.current) return // track only once per page load
    hasTrackedStart.current = true
    trackEvent('form_start', { form_id: 'contact_form' })
  }

  return (
    <form>
      <input
        name="name"
        onFocus={handleFirstFocus}
        // ... other props
      />
      {/* ... rest of form */}
    </form>
  )
}
```

**GA4 parameters:**
| Parameter | Type | Value |
|-----------|------|-------|
| `form_id` | string | `"contact_form"` or `"booking_form"` |

**Mark as conversion:** No. This is a micro-conversion.

---

### Event 3: `form_submit`

**Trigger:** Contact form submitted successfully (server confirmed, success state shown)

**Why it matters:** This is the primary conversion. Every form submission is
a potential paying customer. This is the metric the contractor cares about most.

**Implementation — fire after successful Server Action response:**

```tsx
// src/components/forms/ContactForm.tsx
import { trackEvent } from '@/lib/analytics'

async function handleSubmit(formData: FormData) {
  const result = await submitContactAction(formData)

  if (result.success) {
    setStatus('success')
    trackEvent('form_submit', {
      form_id: 'contact_form',
      service_type: formData.get('service')?.toString() ?? 'unknown',
    })
  }
}
```

**GA4 parameters:**
| Parameter | Type | Value |
|-----------|------|-------|
| `form_id` | string | `"contact_form"` or `"booking_form"` |
| `service_type` | string | Selected service (e.g. "water_heater_repair") |

**Mark as conversion:** Yes — highest priority. In GA4 Admin → Events → toggle
"Mark as conversion." This becomes the primary goal metric.

---

### Event 4: `cta_click`

**Trigger:** User clicks any primary CTA button (Get a Quote, Request Service, etc.)

**Why it matters:** Measures which CTAs drive the most engagement. If the
hero CTA drives zero clicks, it's not compelling — rewrite it.

**Implementation — add to all primary Button components:**

```tsx
// src/components/ui/Button.tsx (or wherever CTAs are defined)
import { trackEvent } from '@/lib/analytics'

interface CTAButtonProps {
  label: string
  location: string // 'hero', 'services_section', 'sticky_cta', 'contact_page'
  href?: string
  onClick?: () => void
}

export function CTAButton({ label, location, href, onClick }: CTAButtonProps) {
  function handleClick() {
    trackEvent('cta_click', { cta_text: label, cta_location: location })
    onClick?.()
  }

  return href ? (
    <a href={href} onClick={handleClick} className="btn-primary">
      {label}
    </a>
  ) : (
    <button onClick={handleClick} className="btn-primary">
      {label}
    </button>
  )
}
```

**GA4 parameters:**
| Parameter | Type | Value |
|-----------|------|-------|
| `cta_text` | string | Button label text (e.g. "Get a Free Estimate") |
| `cta_location` | string | Where on the page ("hero", "services_section", "footer") |

**Mark as conversion:** No. Micro-conversion.

---

### Event 5: `scroll_depth`

**Trigger:** User scrolls past 25%, 50%, 75%, or 90% of the page height

**Why it matters:** Shows how far users read. Low scroll depth on a service
page means the content doesn't hook them. Helps prioritize content structure.

**Implementation — add to a `ScrollDepthTracker` component:**

```tsx
// src/components/analytics/ScrollDepthTracker.tsx
'use client'
import { useEffect, useRef } from 'react'
import { trackEvent } from '@/lib/analytics'

const THRESHOLDS = [25, 50, 75, 90]

export function ScrollDepthTracker({ pagePath }: { pagePath: string }) {
  const fired = useRef<Set<number>>(new Set())

  useEffect(() => {
    function handleScroll() {
      const scrolled =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100

      for (const threshold of THRESHOLDS) {
        if (scrolled >= threshold && !fired.current.has(threshold)) {
          fired.current.add(threshold)
          trackEvent('scroll_depth', {
            depth_percent: threshold,
            page_path: pagePath,
          })
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pagePath])

  return null
}
```

Add `<ScrollDepthTracker pagePath="/services/water-heater-repair" />` to each
page template. Pass the current route path.

**GA4 parameters:**
| Parameter | Type | Value |
|-----------|------|-------|
| `depth_percent` | number | 25, 50, 75, or 90 |
| `page_path` | string | The page path (e.g. "/services/plumbing") |

**Mark as conversion:** No.

---

## Marking Conversions in GA4

1. Navigate to GA4 Admin → Events (in the left sidebar under your property)
2. Find `form_submit` in the event list — toggle "Mark as conversion" to ON
3. Find `phone_click` in the event list — toggle "Mark as conversion" to ON
4. Wait 24–48 hours for conversion data to populate

**Conversion events appear in:**
- Reports → Engagement → Conversions
- Reports → Acquisition → Traffic Acquisition (shows which sources drive conversions)
- Explore → Funnel Exploration (set up form_start → form_submit funnel)

---

## Recommended GA4 Explorations to Set Up

### Funnel: Form Abandonment

Create a Funnel Exploration:
1. Step 1: Event = `form_start`
2. Step 2: Event = `form_submit`

This shows the percentage of users who start the form but don't complete it.
If abandonment > 40%, investigate form UX (too many fields, unclear labels,
slow submission, etc.).

### Report: Conversions by Page

In Reports → Engagement → Pages and Screens:
- Add secondary dimension: "Event name"
- Filter for conversion events only

This reveals which pages generate the most leads. Service pages that receive
traffic but generate zero conversions need better CTAs or copy.

### Report: Device Category Conversions

In Reports → User → Tech Detail → Device Category:
- Shows form_submit and phone_click split by mobile/desktop/tablet

If mobile conversion rate is <60% of desktop rate, mobile UX needs attention.

---

## GA4 Alerts to Configure

In GA4 Admin → Custom Insights → Create:

**Alert 1: Conversion drop**
- Condition: `form_submit` count drops > 50% week-over-week
- Action: Email notification to Marc

**Alert 2: Traffic spike (positive)**
- Condition: Sessions increase > 100% day-over-day
- Action: Email notification (potential viral moment or ad campaign)

**Alert 3: Traffic crash (negative)**
- Condition: Sessions drop > 50% week-over-week
- Action: Email notification (possible site down or manual action in Search Console)

---

## TypeScript Declaration for `window.gtag`

Add this to `src/types/global.d.ts` to eliminate TypeScript errors:

```typescript
// src/types/global.d.ts
declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'js' | 'set',
      action: string | Date,
      params?: Record<string, unknown>
    ) => void
    dataLayer: unknown[]
  }
}

export {}
```
