# Server Actions Reference
## Pack 6: Backend, Data & Integrations

---

## Why Server Actions (Not API Routes)

Next.js 15 Server Actions are the right choice for contractor contact forms:

| Concern | Server Actions | API Routes |
|---------|---------------|-----------|
| Type safety | End-to-end, no `fetch()` | Manual type casting |
| Progressive enhancement | Works without JS | Requires JS |
| CSRF protection | Built-in | Must implement |
| File location | Colocated with use | Separate `/api/` dir |
| Revalidation | `revalidatePath()` built-in | Extra fetch needed |

---

## File Location

```
src/app/actions/
├── submitContact.ts     → Contact form submission (primary action)
├── submitBooking.ts     → Booking widget fallback (if no third-party)
└── index.ts             → Re-exports for clean imports
```

Always keep Server Actions in dedicated files under `src/app/actions/`.
Mark each file with `'use server'` at the top. Never mix `'use server'` and
`'use client'` in the same file.

---

## The submitContact Pipeline

```
FormData arrives
    ↓
1. Zod validation (schema-first, not hand-rolled)
    ↓  fail → return { success: false, fieldErrors }
2. Honeypot check
    ↓  bot → return { success: true } (silent drop)
3. Rate limit check (IP hash, 5/10min)
    ↓  blocked → return { success: false, error: "Too many..." }
4. Supabase INSERT
    ↓  db error → return { success: false, error: "Something went wrong..." }
5. Resend email notification (fire-and-forget, non-blocking)
    ↓
6. return { success: true, submissionId }
```

**Critical:** Steps 4 and 5 are decoupled. If email delivery fails, the lead is
still saved in the database. Never let email errors surface to the user as a
form failure.

---

## Zod Schema Design Rules

```typescript
const ContactSchema = z.object({
  // Text fields: always .trim() to kill whitespace-only submissions
  name: z.string().min(2).max(100).trim(),

  // Email: always .toLowerCase() before storage
  email: z.string().email().toLowerCase().trim(),

  // Phone: .transform() to strip formatting for clean storage
  phone: z.string().min(10).transform(v => v.replace(/\D/g, '')),

  // Honeypot: must be empty — max(0) elegantly rejects anything filled
  website: z.string().max(0).optional(),

  // Booleans from FormData come as strings — handle both
  is_emergency: z.union([z.boolean(), z.string()])
    .transform(v => v === true || v === 'true')
    .default(false),
})
```

**Never** build custom validation loops. Let Zod's `safeParse()` do the work.
Use `.flatten().fieldErrors` to get per-field error maps for the client.

---

## Return Type Contract

The Server Action always returns a discriminated union — never throws.

```typescript
type ContactFormResult =
  | { success: true; submissionId: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> }
```

The client component maps this directly to UI state:

```typescript
const [state, action, isPending] = useActionState(submitContact, null)

// state?.success === true  → show success message
// state?.success === false → show error, populate field errors
// isPending === true       → disable button, show "Sending..."
```

---

## Rate Limiting

For MVP, use an in-memory Map. For high-traffic sites, replace with Upstash Redis.

```typescript
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const LIMIT = 5
const WINDOW_MS = 10 * 60 * 1000  // 10 minutes

function checkRateLimit(ipHash: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ipHash)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ipHash, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }
  if (entry.count >= LIMIT) return false
  entry.count++
  return true
}
```

**Note:** In-memory rate limiting resets on server restart and doesn't work across
multiple Vercel serverless instances. Good enough for MVP contractor sites with
dozens of submissions per day. Upgrade to Upstash Redis if you see abuse.

---

## IP Extraction in Next.js 15

```typescript
import { headers } from 'next/headers'

const headersList = await headers()
const rawIp =
  headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
  headersList.get('x-real-ip') ??
  '0.0.0.0'
```

`x-forwarded-for` may contain a comma-separated list (proxy chain). Always take
only the first value. Vercel sets this header reliably.

---

## Connecting the Action to the Form Component

The ContactForm is a `'use client'` component built in Pack 4. Connect it to the
Server Action without prop drilling:

```typescript
// src/components/forms/ContactForm.tsx
'use client'

import { useActionState } from 'react'
import { submitContact } from '@/app/actions/submitContact'

export function ContactForm() {
  const [state, action, isPending] = useActionState(submitContact, null)

  if (state?.success) {
    return <SuccessMessage />  // "We'll call you within 30 minutes!"
  }

  return (
    <form action={action}>
      <input type="text" name="name" required />
      {state?.fieldErrors?.name && (
        <p role="alert">{state.fieldErrors.name[0]}</p>
      )}

      {/* Honeypot — visually hidden, not just display:none */}
      <input
        type="text"
        name="website"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
      />

      <input type="hidden" name="source_page" value={usePathname()} />

      <button type="submit" disabled={isPending}>
        {isPending ? 'Sending...' : 'Send Message'}
      </button>

      {state?.success === false && !state.fieldErrors && (
        <p role="alert">{state.error}</p>
      )}
    </form>
  )
}
```

---

## Success Message Copy

The success state is a conversion moment. Use it well:

```typescript
function SuccessMessage() {
  return (
    <div role="status" aria-live="polite">
      <h3>Message Received!</h3>
      <p>
        We'll call you within 30 minutes during business hours.
        For faster service, call us directly:
      </p>
      <a href={`tel:${siteConfig.contact.phone}`}>
        {siteConfig.contact.phone}
      </a>
    </div>
  )
}
```

**Never** say "Your message has been sent." It's passive and weak.
**Say:** "We'll call you within 30 minutes." Set an expectation and create urgency.

---

## Error Messages to Use

| Scenario | Message |
|----------|---------|
| Rate limited | "Too many submissions. Please wait a few minutes or call us directly." |
| DB error | "Something went wrong. Please call us directly — we're standing by." |
| Field validation | Inline per-field messages from Zod |
| Network error | "Connection issue. Please try again or call us." |

Always include the phone number in error states. If the form fails, the lead
must still be capturable by phone.

---

## Testing the Server Action

```bash
# 1. Start dev server
pnpm dev

# 2. Open browser DevTools → Network tab
# 3. Submit the form
# 4. Verify: POST to /contact (or the page URL)
# 5. Check Response payload → { success: true, submissionId: "uuid" }
# 6. Check Supabase dashboard → new row in contact_submissions
# 7. Check contractor email inbox → lead notification received

# 8. Test honeypot: manually set website field value in DevTools
#    → form appears to succeed, no DB row created

# 9. Test rate limit: submit 6 times rapidly
#    → 6th submission returns error message
```
