# Email Notification Reference
## Pack 6: Backend, Data & Integrations

---

## The 30-Second Rule

A contractor who gets a lead notification in 30 seconds will close significantly
more business than one who checks email hourly. The notification email is not a
receipt — it's an action trigger. Design everything in service of the contractor
calling the lead back within 5 minutes.

---

## Why Resend (Not Nodemailer, SendGrid, or AWS SES)

| Factor | Resend | Nodemailer | SendGrid |
|--------|--------|-----------|----------|
| React components | Native | No | No |
| Next.js 15 compatibility | First-class | Workarounds | Workarounds |
| Developer experience | Excellent | Complex | Verbose |
| Deliverability | High | Depends on SMTP | High |
| Free tier | 3,000/month | N/A | 100/day |
| Email testing | Preview UI | Local only | Sandbox |

Resend renders React components to HTML. The `LeadNotificationEmail` component is
a real React component — typed, testable, composable.

---

## Setup Checklist

1. **Create Resend account** at resend.com
2. **Add domain** — add the contractor's domain (e.g. `plumbingpros.com`) in Resend dashboard
3. **Add DNS records** — Resend provides 3 DNS records (SPF, DKIM, DMARC); add to domain registrar
4. **Wait for verification** — usually 5–15 minutes
5. **Create API key** — Resend dashboard → API Keys → Create Key
6. **Add to Vercel env** — `vercel env add RESEND_API_KEY production`
7. **Set sender address** — `leads@contractordomain.com` (verified domain required)

```bash
# Required env vars
RESEND_API_KEY=re_xxxx
RESEND_DOMAIN=plumbingpros.com          # verified in Resend
LEAD_NOTIFICATION_EMAIL=owner@email.com  # where leads land
```

---

## Install

```bash
pnpm add resend @react-email/components
```

---

## File Locations

```
src/components/emails/
└── LeadNotificationEmail.tsx    → The notification email component

src/app/actions/
└── submitContact.ts             → Calls Resend after DB insert (fire-and-forget)
```

---

## The sendLeadNotification Pattern

Always fire-and-forget. Never `await` inside the response path for email:

```typescript
// submitContact.ts
// After successful DB insert:

sendLeadNotification(payload).catch((err) => {
  console.error('[submitContact] Email notification failed:', err)
  // Lead is already in DB — don't surface email failure to user
})

return { success: true, submissionId }
```

If you `await` the email call, a slow mail server or Resend outage causes the
user's form to spin for 3–5 seconds and potentially time out. Unacceptable.

---

## Email Anatomy

The contractor notification email has five sections:

### 1. Emergency Banner (conditional)
Red bar at the top. Only shows when `is_emergency: true`. Impossible to miss.

### 2. Header
Dark background (business brand color). Shows the lead's name large. The first
thing the eye lands on after opening.

### 3. Phone CTA — the most important element
Green section with the phone number in 36px bold. Tap-to-call on mobile.
"CALL THIS LEAD NOW" in all-caps above it.
"Best response time within 30 minutes" below it.

### 4. Lead Details
Clean two-column table: label | value. Covers name, phone, email, service,
emergency status, source page. Nothing more — no clutter.

### 5. Response Tips
Yellow section. Three bullet points reminding the contractor what to do.
Emergency leads get a 4th bullet in red bold.

---

## Subject Line Patterns

```typescript
// Standard lead
`📋 New Lead: ${name} — ${service_needed ?? 'General Inquiry'} — ${phone}`

// Emergency lead
`🚨 EMERGENCY LEAD: ${name} needs help NOW — ${phone}`
```

Always include the phone number in the subject line. Some contractors respond
by calling directly from the notification without opening the email.

---

## Preview Text

```typescript
// Standard
`New lead from ${name}: ${service_needed} — ${displayPhone}`

// Emergency
`🚨 EMERGENCY: ${name} needs help NOW — ${displayPhone}`
```

Preview text shows in the inbox list before the email is opened. It's the
second-most-read piece of copy after the subject line.

---

## Reply-To Header

```typescript
await resend.emails.send({
  replyTo: lead.email,  // ← contractor can hit Reply to email the lead
  ...
})
```

Set `replyTo` to the lead's email. When the contractor hits Reply from their
email client, it opens a compose window pre-addressed to the lead.

---

## React Email Component Rules

- Use only `@react-email/components` — no HTML tags directly
- All styles must be inline objects (not Tailwind) — email clients strip `<style>`
- Use `const styles = {} as const` at the bottom of the file
- Test in React Email preview: `npx email dev`
- Test in real clients: Litmus or Email on Acid for production sites

```typescript
import {
  Body, Container, Heading, Hr, Html,
  Link, Preview, Row, Column, Section, Text
} from '@react-email/components'
```

---

## Inline Style Gotchas

Email clients are 1999-era browsers. Avoid:

- `margin` shorthand — use `marginTop`, `marginBottom`
- `border` shorthand — use `borderTop`, `borderColor`
- `font` shorthand — use `fontSize`, `fontWeight`, `fontFamily`
- `background` shorthand — use `backgroundColor`
- CSS variables — inline literal values only
- `flexbox` / `grid` — use `<Row>` / `<Column>` from @react-email
- `rem` / `em` — use `px` only

---

## Local Development Preview

```bash
# Preview email in browser without sending
npx email dev --dir src/components/emails

# This opens localhost:3000 with live reload
# Pass mock data to see real lead content
```

---

## Testing Email Delivery

1. Submit the contact form on `localhost:3000`
2. Server Action calls `sendLeadNotification`
3. Check Resend dashboard → Emails → should show delivery status
4. Check contractor email inbox
5. Check spam folder if not delivered (DNS verification may not be complete)

For staging: use a real email address you control as `LEAD_NOTIFICATION_EMAIL`.
For production: use the contractor's actual email.

---

## Future: SMS Notification (Phase 2)

Twilio SMS can deliver the lead to the contractor's phone as a text message.
Faster than email for contractors who don't check email constantly.

```typescript
// Phase 2 addition to sendLeadNotification
if (siteConfig.integrations.twilioEnabled) {
  await twilioClient.messages.create({
    to: siteConfig.contact.phone,
    from: process.env.TWILIO_FROM_NUMBER!,
    body: `New lead: ${name} · ${displayPhone} · ${service_needed ?? 'General inquiry'}`,
  })
}
```

Don't implement this at Pack 6 unless `siteConfig.integrations.smsNotifications` is
explicitly set to `true`.
