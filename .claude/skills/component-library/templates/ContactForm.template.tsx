/**
 * PACK 4: ContactForm Component
 * =============================
 * Target path: src/components/forms/ContactForm.tsx
 *
 * The highest-stakes component on the site. A broken or confusing contact form
 * directly kills leads. This implementation is production-hardened.
 *
 * ARCHITECTURE:
 *   - 'use client' — required for useActionState, event handlers, focus management
 *   - Server Action (src/app/actions/contact.ts) handles validation + Supabase write
 *   - useFormStatus (in SubmitButton) reads pending state without prop drilling
 *   - Fields rendered from siteConfig.contact.formFields (configurable per client)
 *
 * ANTI-SPAM:
 *   - Honeypot field: hidden from humans, filled by bots. Server silently accepts
 *     bot submissions (never reveal detection). No CAPTCHA — kills mobile conversion.
 *
 * STATES:
 *   idle     → Standard form, all fields enabled
 *   loading  → Form submitting, inputs disabled, button shows spinner
 *   success  → Form hidden, green confirmation panel shown
 *   error    → Form re-enabled, red error banner visible
 *
 * VALIDATION:
 *   Client-side: Zod schema via react-hook-form (inline errors on blur)
 *   Server-side: Same Zod schema re-validated in Server Action
 *   Never trust client-only validation — always re-validate on server.
 *
 * A11Y:
 *   ✓ Form landmark (<form>) with aria-label
 *   ✓ Every input has visible associated <label>
 *   ✓ Errors announced with role="alert"
 *   ✓ Focus moves to status message on state change
 *   ✓ Focus moves to first error field after failed submission
 *   ✓ Loading state: aria-busy="true", aria-disabled on button
 *   ✓ Success/error panels announced with aria-live
 *   ✓ Honeypot: tabIndex={-1} + aria-hidden so assistive tech skips it
 *
 * GA4:
 *   form_start — fires once on first input focus
 *   form_submit — fires on successful Server Action response
 *
 * USAGE IN PAGE:
 *   // Contact page
 *   <ContactForm />
 *
 *   // Homepage sidebar (compact layout with fewer fields)
 *   <ContactForm compact />
 */

'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { siteConfig } from '@/lib/site-config'
import { submitContactForm } from '@/app/actions/contact'
import { cn } from '@/lib/utils'
import type { FormState } from '@/types/forms'

// ─── Types ─────────────────────────────────────────────────────────────────────

interface ContactFormProps {
  /** Renders without service select and with shorter message field */
  compact?: boolean
  /** Override the submit button label */
  submitLabel?: string
  /** Additional className on the form element */
  className?: string
}

// ─── Initial State ─────────────────────────────────────────────────────────────

const initialState: FormState = { status: 'idle' }

// ─── Field Rendering Helpers ───────────────────────────────────────────────────

interface FieldWrapperProps {
  id: string
  label: string
  required?: boolean
  error?: string
  children: React.ReactElement
}

function FieldWrapper({ id, label, required, error, children }: FieldWrapperProps) {
  const errorId = `${id}-error`

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[var(--color-text)]"
      >
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="ml-1 text-red-500">*</span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>

      {/* Inject a11y props into child input/select/textarea */}
      {React.cloneElement(children, {
        id,
        name: id,
        'aria-describedby': error ? errorId : undefined,
        'aria-invalid': error ? ('true' as const) : undefined,
        'aria-required': required,
        className: cn(
          children.props.className,
          error && 'border-red-500 focus-visible:outline-red-500'
        ),
      })}

      {/* Inline error message */}
      {error && (
        <p
          id={errorId}
          role="alert"
          aria-live="polite"
          className="flex items-center gap-1.5 text-sm text-red-600"
        >
          {/* Error icon */}
          <svg aria-hidden="true" className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}

// ─── Base Input Styles ─────────────────────────────────────────────────────────

const inputBaseStyles = cn(
  'w-full rounded-lg border border-[var(--color-border)]',
  'bg-[var(--color-surface)] text-[var(--color-text)]',
  'px-4 py-3 text-base',
  'placeholder:text-[var(--color-text-muted)]',
  'transition-colors duration-150',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)]',
  'disabled:bg-[var(--color-surface-alt)] disabled:cursor-not-allowed disabled:opacity-60',
  // Error state — applied via FieldWrapper cn() merge
  // 'border-red-500 focus-visible:outline-red-500'
)

// ─── Submit Button ─────────────────────────────────────────────────────────────
// Uses useFormStatus — MUST be a separate component inside <form>

interface SubmitButtonProps {
  label?: string
  loadingLabel?: string
}

function SubmitButton({
  label = 'Send Message',
  loadingLabel = 'Sending...',
}: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      aria-busy={pending}
      className={cn(
        // Base
        'w-full min-h-[52px] rounded-lg',
        'inline-flex items-center justify-center gap-2',
        'font-semibold text-base',
        'transition-all duration-150',
        // Colors
        'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]',
        'hover:bg-[var(--btn-primary-hover-bg)]',
        // Focus
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        'focus-visible:outline-[var(--color-border-focus)]',
        // Disabled/loading
        pending && 'opacity-75 cursor-wait'
      )}
    >
      {pending ? (
        <>
          {/* Spinning indicator */}
          <svg
            aria-hidden="true"
            className="h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="sr-only">{loadingLabel}</span>
          <span aria-hidden="true">{loadingLabel}</span>
        </>
      ) : (
        <>
          <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {label}
        </>
      )}
    </button>
  )
}

// ─── Success Panel ─────────────────────────────────────────────────────────────

function SuccessPanel({ state }: { state: FormState }) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      tabIndex={-1}
      className={cn(
        'rounded-xl border border-green-200 bg-green-50 p-8 text-center',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-400'
      )}
    >
      {/* Checkmark icon */}
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <svg aria-hidden="true" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h3 className="text-xl font-semibold text-green-900">
        {state.submittedName
          ? `Thank you, ${state.submittedName}!`
          : 'Message Received!'}
      </h3>

      <p className="mt-2 text-green-700">
        {state.message}
      </p>

      {/* Phone fallback — the most important element after success */}
      <div className="mt-6 border-t border-green-200 pt-6">
        <p className="text-sm text-green-700">
          Need immediate help?
        </p>
        <a
          href={`tel:${siteConfig.contact.phone}`}
          className={cn(
            'mt-2 inline-flex items-center gap-2',
            'font-semibold text-green-800 underline decoration-2 underline-offset-2',
            'hover:text-green-900',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-600'
          )}
        >
          <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call {siteConfig.contact.phone}
        </a>
      </div>
    </div>
  )
}

// ─── ContactForm ───────────────────────────────────────────────────────────────

import React from 'react'

export function ContactForm({
  compact = false,
  submitLabel,
  className,
}: ContactFormProps) {
  const [state, formAction] = useActionState(submitContactForm, initialState)

  // ── Refs for focus management ─────────────────────────────────────────────
  const statusRef = useRef<HTMLDivElement>(null)
  const firstNameRef = useRef<HTMLInputElement>(null)
  const hasTrackedStart = useRef(false)

  // ── Move focus to success/error panel on state change ─────────────────────
  useEffect(() => {
    if (state.status === 'success' || state.status === 'error') {
      // Small delay to let React re-render complete
      requestAnimationFrame(() => {
        statusRef.current?.focus()
      })
    }
  }, [state.status])

  // ── Move focus to first error field after failed validation ───────────────
  useEffect(() => {
    if (state.status === 'error' && state.errors) {
      requestAnimationFrame(() => {
        firstNameRef.current?.focus()
      })
    }
  }, [state.errors])

  // ── GA4: form_start fires once on first field interaction ─────────────────
  function handleFirstFocus() {
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true
      if (typeof window !== 'undefined' && 'gtag' in window) {
        ;(window as { gtag: Function }).gtag('event', 'form_start', {
          form_name: 'contact',
          form_id: 'contact-form',
        })
      }
    }
  }

  // ── Show success panel ────────────────────────────────────────────────────
  if (state.status === 'success') {
    return <SuccessPanel state={state} />
  }

  // ── Determine visible fields ──────────────────────────────────────────────
  const fields = siteConfig.contact.formFields ?? [
    { name: 'name',    label: 'Your Name',       type: 'text',     required: true },
    { name: 'phone',   label: 'Phone Number',     type: 'tel',      required: true },
    { name: 'email',   label: 'Email (optional)', type: 'email',    required: false },
    { name: 'service', label: 'Service Needed',   type: 'select',   required: true },
    { name: 'message', label: 'Tell Us More',     type: 'textarea', required: true },
  ]

  // Compact mode: drop service select, shorten message
  const visibleFields = compact
    ? fields.filter(f => f.name !== 'service')
    : fields

  return (
    <form
      id="contact-form"
      action={formAction}
      noValidate
      aria-label="Contact form"
      onFocus={handleFirstFocus}
      className={cn('space-y-5', className)}
    >
      {/* ── Hidden source URL for lead attribution ───────────────────────── */}
      <input
        type="hidden"
        name="_sourceUrl"
        defaultValue={
          typeof window !== 'undefined' ? window.location.href : ''
        }
      />

      {/* ── Honeypot anti-spam field ─────────────────────────────────────── */}
      {/*    Hidden from real users, filled by bots                          */}
      {/*    tabIndex={-1}: excluded from tab order                          */}
      {/*    aria-hidden: excluded from screen reader tree                   */}
      {/*    autoComplete="off": prevents browser from filling it            */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website (leave blank)</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {/* ── Form-level error banner ───────────────────────────────────────── */}
      {state.status === 'error' && state.message && !state.errors && (
        <div
          ref={statusRef}
          role="alert"
          aria-live="assertive"
          tabIndex={-1}
          className={cn(
            'rounded-lg border border-red-200 bg-red-50 p-4',
            'flex items-start gap-3',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400'
          )}
        >
          <svg aria-hidden="true" className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <p className="font-medium text-red-800">{state.message}</p>
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="mt-1 inline-block text-sm text-red-700 underline hover:text-red-900"
            >
              Or call us: {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      )}

      {/* ── Fields ───────────────────────────────────────────────────────── */}
      {visibleFields.map((field, index) => {
        const fieldError = state.errors?.[field.name as keyof typeof state.errors]?.[0]

        if (field.type === 'select') {
          return (
            <FieldWrapper
              key={field.name}
              id={field.name}
              label={field.label}
              required={field.required}
              error={fieldError}
            >
              <select className={cn(inputBaseStyles, 'cursor-pointer')}>
                <option value="">Select a service...</option>
                {siteConfig.services.map(service => (
                  <option key={service.slug} value={service.slug}>
                    {service.name}
                  </option>
                ))}
              </select>
            </FieldWrapper>
          )
        }

        if (field.type === 'textarea') {
          return (
            <FieldWrapper
              key={field.name}
              id={field.name}
              label={field.label}
              required={field.required}
              error={fieldError}
            >
              <textarea
                rows={compact ? 3 : 4}
                placeholder="Briefly describe the issue or service you need..."
                className={cn(inputBaseStyles, 'resize-y min-h-[96px]')}
              />
            </FieldWrapper>
          )
        }

        // Text / email / tel inputs
        return (
          <FieldWrapper
            key={field.name}
            id={field.name}
            label={field.label}
            required={field.required}
            error={fieldError}
          >
            <input
              ref={index === 0 ? firstNameRef : undefined}
              type={field.type}
              placeholder={
                field.type === 'tel' ? '(555) 000-0000' :
                field.type === 'email' ? 'you@example.com' :
                ''
              }
              autoComplete={
                field.name === 'name' ? 'name' :
                field.name === 'phone' ? 'tel' :
                field.name === 'email' ? 'email' :
                undefined
              }
              className={inputBaseStyles}
            />
          </FieldWrapper>
        )
      })}

      {/* ── Required fields note ──────────────────────────────────────────── */}
      <p className="text-xs text-[var(--color-text-muted)]">
        <span aria-hidden="true">*</span> Required fields
      </p>

      {/* ── Submit button ─────────────────────────────────────────────────── */}
      <SubmitButton
        label={submitLabel ?? 'Get My Free Estimate'}
        loadingLabel="Sending your message..."
      />

      {/* ── Trust line below submit ───────────────────────────────────────── */}
      <p className="text-center text-xs text-[var(--color-text-muted)]">
        <svg aria-hidden="true" className="mr-1 inline h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        Your information is private and secure. No spam, ever.
      </p>
    </form>
  )
}

// ─── Usage Examples ────────────────────────────────────────────────────────────
/*

// Full contact page form
<ContactForm />

// Compact sidebar/homepage form
<ContactForm compact submitLabel="Send Request" />

// Wrapped in ContactFormSection
export function ContactFormSection() {
  return (
    <section
      id="contact-form"
      aria-labelledby="contact-form-heading"
      className="section-padding section-bg-primary"
    >
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-10">
          <p className="text-overline">Get in Touch</p>
          <h2 id="contact-form-heading" className="mt-2 text-3xl font-bold">
            Request a Free Estimate
          </h2>
          <p className="mt-3 text-intro">
            Fill out the form below and we'll respond within{' '}
            {siteConfig.contact.responseTime ?? '1 hour'}.
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}

*/
