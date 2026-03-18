# Form System — ContactForm Implementation Reference

Complete specification for the ContactForm system: Server Action, validation,
honeypot, field configuration, and all state transitions.

---

## File Locations

```
src/
  app/
    actions/
      contact.ts          ← Server Action (runs on server, never in browser)
  components/
    forms/
      ContactForm.tsx     ← Client component ('use client')
      FormField.tsx       ← Reusable field wrapper
      FormSelect.tsx      ← Select field
      SubmitButton.tsx    ← Submit button with useFormStatus
  lib/
    validations/
      contact.schema.ts   ← Zod validation schema
```

---

## FormState Type

Shared between Server Action and ContactForm component:

```typescript
// src/types/forms.ts
export type FormState = {
  status: 'idle' | 'loading' | 'success' | 'error'
  message?: string
  errors?: {
    name?: string[]
    phone?: string[]
    email?: string[]
    service?: string[]
    message?: string[]
  }
  submittedName?: string   // Used in success message: "Thank you, [name]!"
}
```

---

## Zod Validation Schema

```typescript
// src/lib/validations/contact.schema.ts
import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),

  phone: z
    .string()
    .regex(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/,
      'Please enter a valid 10-digit US phone number'
    ),

  email: z
    .string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),

  service: z
    .string()
    .min(1, 'Please select a service'),

  message: z
    .string()
    .min(10, 'Please describe your issue in a few words')
    .max(1000, 'Message is too long'),

  // Honeypot — must be empty
  website: z.literal('').optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
```

---

## Server Action

```typescript
// src/app/actions/contact.ts
'use server'

import { contactSchema } from '@/lib/validations/contact.schema'
import { siteConfig } from '@/lib/site-config'
import type { FormState } from '@/types/forms'

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {

  // ── 1. Honeypot check ─────────────────────────────────────────────────────
  // If the 'website' field is filled, it's a bot. Silently succeed to avoid
  // revealing our anti-spam detection.
  const honeypot = formData.get('website')
  if (honeypot && honeypot !== '') {
    // Fake success — bot thinks it worked
    return {
      status: 'success',
      message: 'Thank you! We will be in touch soon.',
      submittedName: String(formData.get('name') ?? ''),
    }
  }

  // ── 2. Parse and validate ─────────────────────────────────────────────────
  const rawData = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    service: formData.get('service'),
    message: formData.get('message'),
    website: formData.get('website'),
  }

  const result = contactSchema.safeParse(rawData)

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors
    return {
      status: 'error',
      message: 'Please fix the errors below.',
      errors: {
        name: fieldErrors.name,
        phone: fieldErrors.phone,
        email: fieldErrors.email,
        service: fieldErrors.service,
        message: fieldErrors.message,
      },
    }
  }

  const data = result.data

  // ── 3. Submit to Supabase ─────────────────────────────────────────────────
  try {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = createClient()

    const { error: dbError } = await supabase
      .from('leads')
      .insert({
        business_slug: siteConfig.slug,
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        service: data.service,
        message: data.message,
        source_url: formData.get('_sourceUrl') as string || null,
        created_at: new Date().toISOString(),
      })

    if (dbError) throw dbError

    // ── 4. Send notification email ─────────────────────────────────────────
    // Pack 6 implements the email pipeline (Resend or Supabase Edge Function)
    // For now, the Supabase insert triggers a database webhook to send email

    return {
      status: 'success',
      message: siteConfig.contact.responseTime
        ? `Thank you! We'll contact you within ${siteConfig.contact.responseTime}.`
        : 'Thank you! We will be in touch shortly.',
      submittedName: data.name,
    }

  } catch (err) {
    console.error('[ContactForm] Server Action error:', err)

    return {
      status: 'error',
      message: `Something went wrong. Please call us at ${siteConfig.contact.phone} to reach us directly.`,
    }
  }
}
```

---

## ContactForm Client Component (Structure)

```typescript
// src/components/forms/ContactForm.tsx
'use client'

import { useActionState, useEffect, useRef } from 'react'
import { submitContactForm } from '@/app/actions/contact'
import { siteConfig } from '@/lib/site-config'
import type { FormState } from '@/types/forms'

const initialState: FormState = { status: 'idle' }

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState)
  const statusRef = useRef<HTMLDivElement>(null)
  const firstErrorRef = useRef<HTMLInputElement>(null)
  const hasTrackedStart = useRef(false)

  // ── Focus management: move focus to status message on state change ─────
  useEffect(() => {
    if (state.status === 'success' || state.status === 'error') {
      statusRef.current?.focus()
    }
  }, [state.status])

  // ── Focus management: move to first error field after failed submit ────
  useEffect(() => {
    if (state.status === 'error' && state.errors) {
      firstErrorRef.current?.focus()
    }
  }, [state.errors])

  // ── GA4: form_start on first input focus ──────────────────────────────
  function handleFirstFocus() {
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'form_start', { form_name: 'contact' })
      }
    }
  }

  if (state.status === 'success') {
    return <FormSuccess state={state} />
  }

  return (
    <form action={formAction} noValidate onFocus={handleFirstFocus}>
      {/* Hidden source URL for lead tracking */}
      <input type="hidden" name="_sourceUrl" value={
        typeof window !== 'undefined' ? window.location.href : ''
      } />

      {/* Honeypot field — hidden from humans, filled by bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        className="sr-only"
        defaultValue=""
      />

      {/* Error banner (form-level) */}
      {state.status === 'error' && state.message && !state.errors && (
        <div
          ref={statusRef}
          role="alert"
          tabIndex={-1}
          className="..."
        >
          <p>{state.message}</p>
          <a href={`tel:${siteConfig.contact.phone}`}>
            Call {siteConfig.contact.phone}
          </a>
        </div>
      )}

      {/* Fields — rendered from siteConfig.contact.formFields */}
      {/* ... field rendering ... */}

      <SubmitButton />
    </form>
  )
}
```

---

## SubmitButton Component

Uses `useFormStatus` to detect pending state without prop drilling:

```typescript
// src/components/forms/SubmitButton.tsx
'use client'

import { useFormStatus } from 'react-dom'

interface SubmitButtonProps {
  label?: string
  loadingLabel?: string
}

export function SubmitButton({
  label = 'Send Message',
  loadingLabel = 'Sending...',
}: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      aria-disabled={pending}
      className="btn-primary w-full min-h-[48px] ..."
    >
      {pending ? (
        <>
          <span className="sr-only">{loadingLabel}</span>
          <span aria-hidden="true">
            <SpinnerIcon className="animate-spin" />
            {loadingLabel}
          </span>
        </>
      ) : (
        label
      )}
    </button>
  )
}
```

---

## FormSuccess Component

```typescript
function FormSuccess({ state }: { state: FormState }) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      tabIndex={-1}
      className="rounded-xl border border-green-200 bg-green-50 p-8 text-center"
    >
      <CheckCircleIcon className="mx-auto h-12 w-12 text-green-600" />
      <h3 className="mt-4 text-xl font-semibold text-green-900">
        Message Received{state.submittedName ? `, ${state.submittedName}!` : '!'}
      </h3>
      <p className="mt-2 text-green-700">{state.message}</p>
      <p className="mt-4 text-sm text-green-600">
        Need immediate help?{' '}
        <a
          href={`tel:${siteConfig.contact.phone}`}
          className="font-semibold underline"
        >
          Call {siteConfig.contact.phone}
        </a>
      </p>
    </div>
  )
}
```

---

## GA4 Event Tracking Reference

```typescript
// form_start: fired once on first input interaction
gtag('event', 'form_start', {
  form_name: 'contact',
  form_id: 'contact-form',
})

// form_submit: fired on successful Server Action response
gtag('event', 'form_submit', {
  form_name: 'contact',
  form_id: 'contact-form',
  service_requested: data.service,
})

// Always guard:
function trackEvent(eventName: string, params: Record<string, string>) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', eventName, params)
  }
}
```

---

## Field Configuration (siteConfig Schema)

```typescript
// In site.config.ts
contact: {
  phone: '(555) 123-4567',
  email: 'info@example.com',
  responseTime: '1 hour',
  formFields: [
    { name: 'name',    label: 'Your Name',       type: 'text',     required: true },
    { name: 'phone',   label: 'Phone Number',     type: 'tel',      required: true },
    { name: 'email',   label: 'Email (optional)', type: 'email',    required: false },
    { name: 'service', label: 'Service Needed',   type: 'select',   required: true },
    { name: 'message', label: 'Tell Us More',     type: 'textarea', required: true },
  ],
}
```

---

## Supabase Leads Table Schema

Pack 6 creates this migration, but Pack 4 writes to it:

```sql
CREATE TABLE leads (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_slug TEXT NOT NULL,
  name          TEXT NOT NULL,
  phone         TEXT NOT NULL,
  email         TEXT,
  service       TEXT NOT NULL,
  message       TEXT,
  source_url    TEXT,
  status        TEXT DEFAULT 'new',  -- new | contacted | converted | lost
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: only authenticated users (business owner) can read leads
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
```
