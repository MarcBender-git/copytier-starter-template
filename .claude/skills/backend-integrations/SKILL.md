---
name: backend-integrations
description: >
  Use when setting up the database, form submission pipeline, email notifications,
  data fetching strategy, third-party integrations, or any server-side functionality
  for contractor websites. This covers Supabase schema, RLS policies, Server Actions,
  Resend email notifications, GA4 embed, Google Maps embed, booking widget embedding,
  and CRM integration patterns. One critical job: every lead reaches the contractor's
  phone within 30 seconds. Reads siteConfig.stack, .contact, .integrations, .features.
---

# Pack 6: Backend, Data & Integrations

## Overview

**One critical job: every lead reaches the contractor's phone within 30 seconds.**

A contractor's website is a lead capture machine. Its backend exists to move a form
submission from the browser to the contractor's inbox (and ideally their SMS) before
they have time to forget to check. Everything in this pack is designed around that
constraint. If the form submits successfully but the contractor doesn't know about
it for 4 hours, the site failed — even if the code is perfect.

This pack runs after Pack 5 (Content & SEO) and before Pack 7 (Security & Performance).
It reads `site.config.ts` and the Pack 4 ContactForm component's props interface.

---

## The Contractor Backend Reality

Deliberately simple. Deliberately boring. That is the goal.

**What contractor sites need:**
- A way to receive leads (contact form → database → email notification)
- A way to display dynamic content at scale (ISR for testimonials)
- A way to embed third-party tools (GA4, Maps, booking widgets)

**What contractor sites do NOT need at MVP:**
- Authentication (the contractor doesn't log in to the site)
- Real-time features (WebSockets, Server-Sent Events)
- Complex caching layers (CDN + ISR is enough)
- Edge functions (Server Actions handle everything)
- CMS (siteConfig.ts IS the CMS)
- API routes (Server Actions replace them)

When in doubt, make it simpler. A contractor who calls a lead back is the only
metric that matters. The stack should disappear so that goal stays visible.

---

## Backend Build Workflow

### Step 1 — Create Supabase Migration

Read `references/supabase-schema.md` for column details and RLS policy rationale.
Use `templates/supabase-migration.template.sql` as the starting point.

Three tables: `contact_submissions`, `services`, `testimonials`.

```bash
# Create the migration file
supabase migration new initial_schema

# Paste template content into supabase/migrations/[timestamp]_initial_schema.sql
# Run against dev project
supabase db push
```

Verify in Supabase dashboard: all 3 tables exist, RLS is ON (shown as green shield),
all policies are visible under Authentication → Policies.

### Step 2 — Generate TypeScript Types

After migration runs successfully:

```bash
# Via Supabase MCP:
# generate_typescript_types → save to src/types/database.types.ts
```

Then add convenience type aliases in `src/types/index.ts`:

```typescript
export type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row']
export type ContactSubmissionInsert = Database['public']['Tables']['contact_submissions']['Insert']
export type Service = Database['public']['Tables']['services']['Row']
export type Testimonial = Database['public']['Tables']['testimonials']['Row']
```

### Step 3 — Build the ContactForm Server Action

Read `references/server-actions.md` for the full pipeline and validation rules.
Use `templates/submitContact.template.ts` as the starting point.

Place at: `src/app/actions/submitContact.ts`

The pipeline: validate → honeypot check → rate limit → DB insert → email notification → return result.

Email is fire-and-forget. DB failure is the only thing that returns `success: false`.

```typescript
// src/app/actions/index.ts — clean re-export
export { submitContact } from './submitContact'
export type { ContactFormResult, ContactFormInput } from './submitContact'
```

Connect to the Pack 4 ContactForm:

```typescript
// components/forms/ContactForm.tsx
const [state, action, isPending] = useActionState(submitContact, null)
```

### Step 4 — Set Up Email Notification

Read `references/email-notification.md` for Resend setup and DNS requirements.
Use `templates/email-template.template.tsx` as the starting point.

```bash
pnpm add resend @react-email/components
```

Place the email component at: `src/components/emails/LeadNotificationEmail.tsx`

Required env vars (set via `vercel env add`):

```
RESEND_API_KEY
RESEND_DOMAIN
LEAD_NOTIFICATION_EMAIL
IP_HASH_SALT
```

**Test locally:** Submit the form at localhost:3000/contact. Check Resend dashboard
→ Emails for delivery status. Check contractor email inbox.

### Step 5 — Configure Rendering Strategy

Read `references/rendering-strategy.md` for the full SSG/ISR decision tree.

```typescript
// Ensure these patterns are in place:

// Service pages: generateStaticParams (required for SSG)
// app/services/[slug]/page.tsx
export async function generateStaticParams() {
  return siteConfig.services.map(s => ({ slug: s.slug }))
}

// Area pages: same pattern
// app/areas/[city]/page.tsx
export async function generateStaticParams() {
  return siteConfig.serviceAreas.map(a => ({ city: a.slug }))
}

// Testimonials: ISR with fallback
// components/sections/TestimonialsSection.tsx (Server Component)
export const revalidate = 60
```

Wrap TestimonialsSection in Suspense with a skeleton fallback.

### Step 6 — Embed Third-Party Integrations

Read `references/integration-patterns.md` for provider-specific patterns.
Only embed what `siteConfig.integrations` explicitly configures.

Work through the integration decision tree:

1. `ga4MeasurementId` → `@next/third-parties/google` in `layout.tsx`
2. `googleMapsEmbedKey` or `googleMapsPlaceId` → MapSection on contact page
3. `bookingWidget.provider` → BookingSection on homepage and contact page
4. `chatWidget.provider` → ChatWidget component in `layout.tsx`
5. `CRM_WEBHOOK_URL` env var → fire-and-forget webhook in `submitContact.ts`

### Step 7 — End-to-End Verification

This is the most important step. Don't skip it.

```bash
# 1. Start dev server
pnpm dev

# 2. Go to /contact
# 3. Fill out form with real data (use your own email/phone)
# 4. Submit
# 5. Verify ALL of these:
```

| Check | What to Verify | Pass Criteria |
|-------|---------------|---------------|
| Form state | Button shows "Sending...", disabled | Correct |
| Success state | Shows response time message + phone number | Correct |
| Database | New row in contact_submissions | id, all fields populated |
| Email | Lead notification received | Within 30 seconds |
| Email content | Phone number, name, service, emergency status | All present |
| Honeypot | Set website field manually → submit | No DB row created |
| Rate limit | Submit 6 times rapidly | 6th shows error message |
| Mobile | Submit form on 375px viewport | Form works, success state readable |

---

## Supabase Schema Summary

Full detail in `references/supabase-schema.md`.

```
contact_submissions  → id, created_at, name, email, phone, service_needed,
                       message, is_emergency, source_page, honeypot_value,
                       ip_hash, status, notes, responded_at

services             → id, slug, title, short_desc, full_desc, is_featured,
                       sort_order, is_active, meta_title, meta_desc

testimonials         → id, author_name, author_location, rating, review_text,
                       service_used, source, is_featured, is_active, sort_order
```

RLS rules in one sentence: anyone can INSERT into `contact_submissions` with
an empty honeypot; only authenticated users can read or update anything.

---

## Server Action: Key Rules

Full detail in `references/server-actions.md`.

1. `'use server'` at the top of the file — never mixed with `'use client'`
2. Validate with Zod `safeParse()` — never hand-rolled validation
3. Honeypot: silent success on non-empty `website` field (bots don't retry)
4. Rate limit by `SHA-256(ip + salt)` hash — 5 requests per 10 minutes
5. DB failure → `success: false` with phone fallback message
6. Email: fire-and-forget with `.catch()` — never blocks the response
7. Return discriminated union: `{ success: true } | { success: false, error }`

---

## Email Notification: Key Rules

Full detail in `references/email-notification.md`.

- Provider: **Resend** with `@react-email/components`
- Phone number is the largest element in the email — 36px bold, tap-to-call
- Emergency leads get a red banner and 🚨 in the subject line
- Subject always includes the phone number (contractor can call from preview)
- `replyTo` set to lead's email (contractor can hit Reply to email the lead)
- Test with `npx email dev` locally before sending real emails

---

## Rendering Strategy: Quick Reference

Full detail in `references/rendering-strategy.md`.

| Page Type | Strategy | Why |
|-----------|----------|-----|
| Homepage | SSG | Never changes between builds |
| Service pages | SSG + `generateStaticParams` | Pre-rendered at build time |
| Area pages | SSG + `generateStaticParams` | Pre-rendered at build time |
| Contact page | SSG (form = Server Action) | Static HTML, dynamic behavior |
| About, FAQ, Privacy | SSG | Content from siteConfig |
| Testimonials section | ISR (60s) | Updates without rebuild |

---

## Third-Party Integrations: Quick Reference

Full detail in `references/integration-patterns.md`.

| Integration | Config Key | Implementation |
|-------------|-----------|----------------|
| GA4 | `ga4MeasurementId` | `@next/third-parties/google` in layout |
| Google Maps | `googleMapsEmbedKey` | iFrame in MapSection |
| Housecall Pro | `bookingWidget.provider` | Script injection in client component |
| Jobber | `bookingWidget.embedUrl` | iFrame in BookingSection |
| Tidio Chat | `chatWidget.publicKey` | Script injection in layout |
| CRM Webhook | `CRM_WEBHOOK_URL` env | Fire-and-forget fetch in Server Action |

---

## Dependencies to Install

```bash
pnpm add resend @react-email/components zod @supabase/ssr @next/third-parties
```

These should mostly be present from earlier packs. Confirm with `pnpm list`.

---

## Quality Checkpoints

Before marking Pack 6 complete:

- [ ] Migration ran successfully, 3 tables visible in Supabase dashboard
- [ ] RLS is ON for all tables (green shield icon in Supabase)
- [ ] TypeScript types generated and saved to `src/types/database.types.ts`
- [ ] Form submission creates row in contact_submissions (verified manually)
- [ ] Lead notification email received within 30 seconds of submission
- [ ] Emergency submissions show red banner in email
- [ ] Honeypot drops bot submissions silently (no DB row)
- [ ] Rate limiting blocks 6th submission with friendly error
- [ ] Error states show phone number as fallback
- [ ] `generateStaticParams` present on all `[slug]` and `[city]` routes
- [ ] TestimonialsSection wrapped in Suspense with skeleton
- [ ] Only integrations listed in siteConfig.integrations are embedded
- [ ] `pnpm build` passes with no TypeScript errors

---

## Anti-Patterns

**Do not build a CMS.** `site.config.ts` is the CMS. Phase 2 may add a simple
admin UI — that's a separate project, not a Pack 6 deliverable.

**Do not add authentication.** Contractors don't log in to their own site at MVP.
A Supabase Auth integration for a contractor dashboard is a phase 2 feature.

**Do not use API routes.** Server Actions replace `pages/api/` and `app/api/`
for all form submissions. API routes are only needed for webhooks coming IN
(e.g., a CRM pushing data back to the site — extremely rare at MVP).

**Do not await email in the response path.** The Resend API is fast but not
instant. Awaiting it adds 200–500ms to every form submission and creates a
single point of failure. Fire-and-forget is the correct pattern.

**Do not expose the service role key.** The service role key bypasses RLS.
It belongs in server-only code and Vercel's environment config. Never in
`NEXT_PUBLIC_` variables.

**Do not add integrations that aren't in siteConfig.** Every third-party script
is a performance cost and a security surface area. Only embed what the client
actually uses.

**Do not skip the end-to-end test.** A form that submits but doesn't email is
worthless. A database row without an email notification is a silent lead loss.
Test the complete pipeline before calling Pack 6 done.
