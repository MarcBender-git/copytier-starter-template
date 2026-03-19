# Integration Patterns Reference
## Pack 6: Backend, Data & Integrations

---

## Reading siteConfig.integrations

All third-party integrations are gated by `siteConfig.integrations`. Only embed what is
explicitly configured. Never add integrations speculatively.

```typescript
// Example siteConfig.integrations shape
integrations: {
  ga4MeasurementId: 'G-XXXXXXXXXX',   // Google Analytics 4
  googleMapsEmbedKey: 'AIza...',       // Maps embed API key
  googleMapsPlaceId: 'ChIJ...',        // Business Place ID for reviews widget
  bookingWidget: {
    provider: 'housecall_pro',         // 'housecall_pro' | 'jobber' | 'servicetitan' | 'custom' | null
    embedCode: '<script>...</script>', // Raw embed code from provider
    embedUrl: 'https://...',           // iFrame URL alternative
  },
  chatWidget: {
    provider: 'tidio',                 // 'tidio' | 'crisp' | 'intercom' | null
    publicKey: 'xxxx',
  },
  crmWebhook: 'https://hooks.zapier.com/...',  // Zapier/Make.com webhook URL
}
```

---

## Google Analytics 4

### Install pattern

```bash
pnpm add @next/third-parties
```

```typescript
// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'
import { siteConfig } from '@/config/site.config'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* GA4 loads after CCPA cookie consent — see Pack 7 */}
        {siteConfig.integrations.ga4MeasurementId && (
          <GoogleAnalytics gaId={siteConfig.integrations.ga4MeasurementId} />
        )}
      </body>
    </html>
  )
}
```

**CCPA note:** GA4 must NOT load before cookie consent is given. Pack 7 wraps
GA4 in a cookie consent check. At Pack 6, just add it to `layout.tsx` — Pack 7
will gate it properly.

### Key events to track (add in components)

```typescript
// Track form submission success
import { sendGAEvent } from '@next/third-parties/google'

// In ContactForm success handler:
sendGAEvent('event', 'generate_lead', {
  event_category: 'contact_form',
  event_label: formData.service_needed,
  value: 1,
})

// Track click-to-call
sendGAEvent('event', 'phone_call', {
  event_category: 'contact',
  event_label: 'sticky_mobile_cta',
})
```

---

## Google Maps Embed

Two options depending on what siteConfig provides:

### Option A: Simple embed (no API key required)

```typescript
// components/sections/MapSection.tsx
export function MapSection() {
  const { business } = siteConfig
  const query = encodeURIComponent(
    `${business.name} ${business.address} ${business.city} ${business.state}`
  )

  return (
    <section aria-label={`Map showing ${business.name} location`}>
      <iframe
        src={`https://www.google.com/maps/embed/v1/place?q=${query}&key=${siteConfig.integrations.googleMapsEmbedKey}`}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`${business.name} location map`}
      />
    </section>
  )
}
```

### Option B: Place ID embed (shows reviews, directions, photos)

```typescript
src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&place_id=${placeId}`}
```

### No API key available?

```typescript
// Fallback: link to Google Maps search
<a
  href={`https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 text-primary underline"
>
  <MapPin className="h-4 w-4" />
  Get Directions
</a>
```

---

## Booking Widget Embeds

Booking widgets vary by provider. All follow the same pattern: check
`siteConfig.integrations.bookingWidget.provider`, render accordingly.

### Housecall Pro

```typescript
// components/sections/BookingWidget.tsx
'use client'

import { useEffect } from 'react'

export function HousecallProWidget() {
  useEffect(() => {
    // HCP injects via their embed script
    const script = document.createElement('script')
    script.src = 'https://app.housecallpro.com/consumer/widgets/booking_widget/...'
    script.async = true
    document.body.appendChild(script)
    return () => document.body.removeChild(script)
  }, [])

  return <div id="hcp-booking-widget" />
}
```

### Jobber

Jobber provides an iFrame URL:

```typescript
export function JobberWidget({ embedUrl }: { embedUrl: string }) {
  return (
    <iframe
      src={embedUrl}
      width="100%"
      height="600"
      frameBorder="0"
      title="Online Booking"
      aria-label="Book a service appointment online"
    />
  )
}
```

### Generic / Raw embed code

When `provider === 'custom'` and `embedCode` is provided:

```typescript
'use client'
import { useEffect, useRef } from 'react'

export function CustomBookingWidget({ embedCode }: { embedCode: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    // Safely inject third-party embed code
    const container = ref.current
    container.innerHTML = embedCode

    // Re-execute any script tags (innerHTML doesn't execute scripts)
    const scripts = container.querySelectorAll('script')
    scripts.forEach((oldScript) => {
      const newScript = document.createElement('script')
      Array.from(oldScript.attributes).forEach(attr =>
        newScript.setAttribute(attr.name, attr.value)
      )
      newScript.textContent = oldScript.textContent
      oldScript.parentNode?.replaceChild(newScript, oldScript)
    })
  }, [embedCode])

  return <div ref={ref} />
}
```

**Security note:** Only inject `embedCode` from `siteConfig` (trusted source).
Never inject user-supplied HTML. This is not an XSS risk because `siteConfig`
is a build-time config file, not user input.

### Booking Widget Orchestrator

```typescript
// components/sections/BookingSection.tsx
import { siteConfig } from '@/config/site.config'

export function BookingSection() {
  const { bookingWidget } = siteConfig.integrations

  if (!bookingWidget?.provider) return null

  return (
    <section id="book" aria-labelledby="booking-heading">
      <h2 id="booking-heading">Schedule Service Online</h2>
      {bookingWidget.provider === 'housecall_pro' && <HousecallProWidget />}
      {bookingWidget.provider === 'jobber' && bookingWidget.embedUrl && (
        <JobberWidget embedUrl={bookingWidget.embedUrl} />
      )}
      {bookingWidget.provider === 'custom' && bookingWidget.embedCode && (
        <CustomBookingWidget embedCode={bookingWidget.embedCode} />
      )}
    </section>
  )
}
```

---

## Chat Widget (Tidio / Crisp)

Chat widgets load as `'use client'` components with `useEffect`:

```typescript
// components/layout/ChatWidget.tsx
'use client'

import { useEffect } from 'react'
import { siteConfig } from '@/config/site.config'

export function ChatWidget() {
  const { chatWidget } = siteConfig.integrations

  useEffect(() => {
    if (!chatWidget?.publicKey) return

    if (chatWidget.provider === 'tidio') {
      const script = document.createElement('script')
      script.src = `//code.tidio.co/${chatWidget.publicKey}.js`
      script.async = true
      document.body.appendChild(script)
    }

    if (chatWidget.provider === 'crisp') {
      (window as any).$crisp = []
      ;(window as any).CRISP_WEBSITE_ID = chatWidget.publicKey
      const script = document.createElement('script')
      script.src = 'https://client.crisp.chat/l.js'
      script.async = true
      document.head.appendChild(script)
    }
  }, [])

  return null  // Renders nothing — widget injects itself
}
```

Add to `app/layout.tsx` at the bottom of `<body>`:

```typescript
{siteConfig.integrations.chatWidget && <ChatWidget />}
```

---

## CRM Webhook (Zapier / Make.com)

When a contractor wants leads forwarded to their CRM (HubSpot, Salesforce,
etc.) via Zapier or Make.com:

```typescript
// In submitContact.ts, after DB insert (also fire-and-forget):

if (process.env.CRM_WEBHOOK_URL) {
  fetch(process.env.CRM_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service_needed,
      message: data.message,
      is_emergency: data.is_emergency,
      source: data.source_page,
      submitted_at: new Date().toISOString(),
    }),
  }).catch(err => console.error('[CRM webhook] Failed:', err))
}
```

Store the webhook URL in Vercel env, not `siteConfig` (it's a secret):
`vercel env add CRM_WEBHOOK_URL production`

---

## Integration Decision Tree

```
siteConfig.integrations.ga4MeasurementId?
  YES → Add GoogleAnalytics to layout.tsx
  NO  → Skip

siteConfig.integrations.googleMapsEmbedKey OR googleMapsPlaceId?
  YES → Add MapSection to contact page
  NO  → Add "Get Directions" text link only

siteConfig.integrations.bookingWidget.provider?
  YES → Add BookingSection to homepage and contact page
  NO  → Contact form is the only lead capture

siteConfig.integrations.chatWidget?
  YES → Add ChatWidget to layout.tsx
  NO  → Skip

process.env.CRM_WEBHOOK_URL?
  YES → Add webhook call to submitContact.ts
  NO  → Skip
```

Never add integrations that aren't configured. Dead integration code
causes performance overhead and security surface area with zero benefit.
