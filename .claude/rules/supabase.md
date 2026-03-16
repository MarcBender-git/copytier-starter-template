---
paths:
  - "src/lib/**"
  - "supabase/**"
---

# Supabase & Backend Rules

## Standard Schema (Three Tables Minimum)

### contact_submissions
`name` (text), `email` (text), `phone` (text), `message` (text), `service_interested_in` (text), `source_page` (text), `created_at` (timestamptz, default now())

### services
`name` (text), `slug` (text, unique), `description` (text), `image_url` (text), `display_order` (int), `is_active` (boolean, default true)

### testimonials
`client_name` (text), `review_text` (text), `rating` (int, 1-5), `service` (text), `is_featured` (boolean, default false), `created_at` (timestamptz)

## Row Level Security (RLS)
- `contact_submissions`: public INSERT (no auth) — this is a lead form, anyone can submit
- `services` and `testimonials`: public SELECT for active/featured rows, admin auth for INSERT/UPDATE/DELETE
- Always enable RLS on every table — no exceptions

## Type Generation
- After ANY schema change: run `pnpm supabase gen types typescript --project-id <id> > src/types/supabase.ts`
- Import generated types in all Supabase queries — never use untyped `.from()` calls

## Migrations
- All schema changes go in `supabase/migrations/` with timestamp prefix: `20260315120000_create_contact_submissions.sql`
- Never modify existing migration files — create new ones for changes
- Never connect Supabase MCP to production databases — development/staging only

## Form Submission Notifications (NON-NEGOTIABLE)
Every contact form submission MUST trigger an email notification to the contractor containing:
- Submitter name, phone number, email
- Service requested, message content
- Timestamp and source page
- Use Supabase Edge Functions + Resend/SendGrid for email delivery
- Contractors must know when leads arrive — this is the entire point of the website

## Integration Embed Patterns
- **Booking widgets** (Housecall Pro, Jobber): iframe/script embed in hero-adjacent slot or contact page
- **Google review widgets**: Places API integration, cache reviews to avoid rate limits
- **Chat widgets** (Tidio, LiveChat): load async, position bottom-right, 48px+ touch target on mobile
- All third-party scripts load with `strategy="lazyOnload"` via `next/script` — never block page render
