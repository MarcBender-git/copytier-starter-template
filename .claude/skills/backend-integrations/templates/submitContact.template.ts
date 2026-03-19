'use server'

/**
 * submitContact — Server Action
 * Pack 6: Backend, Data & Integrations
 *
 * Pipeline:
 *   1. Parse & validate with Zod (client + server both validate)
 *   2. Honeypot check (silent reject bots)
 *   3. Rate limit by IP hash (5 submissions / 10 minutes)
 *   4. Insert into contact_submissions
 *   5. Send email notification to contractor via Resend
 *   6. Return typed result to client
 *
 * The client sees: idle → loading → success | error
 * The contractor sees: instant email with lead details
 */

import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import { headers } from 'next/headers'
import { createHash } from 'crypto'
import { LeadNotificationEmail } from '@/components/emails/LeadNotificationEmail'
import { siteConfig } from '@/config/site.config'

// ---------------------------------------------------------------------------
// Validation schema — mirrors ContactForm field definitions exactly
// ---------------------------------------------------------------------------
const ContactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long')
    .trim(),

  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),

  phone: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .max(20)
    .transform((val) => val.replace(/\D/g, '')),  // strip non-digits for storage

  service_needed: z.string().optional(),

  message: z
    .string()
    .max(2000, 'Message is too long')
    .trim()
    .optional(),

  is_emergency: z
    .union([z.boolean(), z.string()])
    .transform((val) => val === true || val === 'true')
    .optional()
    .default(false),

  source_page: z.string().optional(),

  // Honeypot — must be empty. Real users never fill this.
  website: z.string().max(0, 'Bot detected').optional(),
})

export type ContactFormInput = z.input<typeof ContactSchema>

export type ContactFormResult =
  | { success: true; submissionId: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> }

// ---------------------------------------------------------------------------
// Rate limiting — simple in-memory map for edge compatibility
// For higher traffic sites, replace with Upstash Redis
// ---------------------------------------------------------------------------
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000  // 10 minutes

function checkRateLimit(ipHash: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ipHash)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ipHash, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true  // allowed
  }

  if (entry.count >= RATE_LIMIT_MAX) return false  // blocked

  entry.count++
  return true  // allowed
}

function hashIp(ip: string): string {
  return createHash('sha256').update(ip + process.env.IP_HASH_SALT!).digest('hex').slice(0, 16)
}

// ---------------------------------------------------------------------------
// Main Server Action
// ---------------------------------------------------------------------------
export async function submitContact(
  formData: ContactFormInput
): Promise<ContactFormResult> {

  // 1. Parse & validate
  const parsed = ContactSchema.safeParse(formData)

  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {}
    for (const [field, errors] of Object.entries(parsed.error.flatten().fieldErrors)) {
      fieldErrors[field] = errors as string[]
    }
    return {
      success: false,
      error: 'Please fix the errors below.',
      fieldErrors,
    }
  }

  const data = parsed.data

  // 2. Honeypot check — silently succeed so bots don't know they were blocked
  if (data.website && data.website.length > 0) {
    console.warn('[submitContact] Honeypot triggered — bot submission silently dropped')
    return { success: true, submissionId: 'honeypot' }
  }

  // 3. Rate limiting by IP hash
  const headersList = await headers()
  const rawIp =
    headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headersList.get('x-real-ip') ??
    '0.0.0.0'

  const ipHash = hashIp(rawIp)

  if (!checkRateLimit(ipHash)) {
    return {
      success: false,
      error: 'Too many submissions. Please wait a few minutes and try again, or call us directly.',
    }
  }

  // 4. Insert into Supabase
  const supabase = await createClient()

  const { data: inserted, error: dbError } = await supabase
    .from('contact_submissions')
    .insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      service_needed: data.service_needed ?? null,
      message: data.message ?? null,
      is_emergency: data.is_emergency,
      source_page: data.source_page ?? null,
      honeypot_value: data.website ?? '',
      ip_hash: ipHash,
      status: 'new',
    })
    .select('id')
    .single()

  if (dbError || !inserted) {
    console.error('[submitContact] DB insert error:', dbError)
    return {
      success: false,
      error: 'Something went wrong. Please call us directly — we\'re standing by.',
    }
  }

  const submissionId = inserted.id

  // 5. Send email notification to contractor
  // Fire-and-forget — we don't block the response on email delivery
  sendLeadNotification({
    submissionId,
    name: data.name,
    email: data.email,
    phone: data.phone,
    service_needed: data.service_needed,
    message: data.message,
    is_emergency: data.is_emergency ?? false,
    source_page: data.source_page,
    submitted_at: new Date().toISOString(),
  }).catch((err) => {
    console.error('[submitContact] Email notification failed:', err)
    // Don't fail the submission — lead is already saved in DB
  })

  return { success: true, submissionId }
}

// ---------------------------------------------------------------------------
// Email notification helper
// ---------------------------------------------------------------------------
interface LeadEmailPayload {
  submissionId: string
  name: string
  email: string
  phone: string
  service_needed?: string
  message?: string
  is_emergency: boolean
  source_page?: string
  submitted_at: string
}

async function sendLeadNotification(lead: LeadEmailPayload): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY!)

  const subjectPrefix = lead.is_emergency ? '🚨 EMERGENCY LEAD' : '📋 New Lead'
  const businessName = siteConfig.business.name
  const contractorEmail = siteConfig.contact.email
  const notificationEmail = process.env.LEAD_NOTIFICATION_EMAIL ?? contractorEmail

  const { error } = await resend.emails.send({
    from: `${businessName} Leads <leads@${process.env.RESEND_DOMAIN!}>`,
    to: [notificationEmail],
    replyTo: lead.email,
    subject: `${subjectPrefix}: ${lead.name} — ${lead.service_needed ?? 'General Inquiry'}`,
    react: LeadNotificationEmail({ lead, businessName }),
  })

  if (error) {
    throw new Error(`Resend error: ${JSON.stringify(error)}`)
  }
}
