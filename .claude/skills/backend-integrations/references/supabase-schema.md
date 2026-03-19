# Supabase Schema Reference
## Pack 6: Backend, Data & Integrations

---

## Three Tables. That's It.

Contractor websites are not SaaS apps. The backend has exactly one job at MVP:
**capture the lead and get it to the contractor's phone in 30 seconds.** The schema is
deliberately minimal. Phase 2 adds CRM views, booking, and review imports — but don't
build phase 2 during Pack 6.

| Table | Purpose | Who writes | Who reads |
|-------|---------|-----------|----------|
| `contact_submissions` | Every form lead | Server Action (anon) | Admin (authenticated) |
| `services` | Dynamic service catalog (phase 2) | Admin | Public |
| `testimonials` | CMS-managed reviews (phase 2) | Admin | Public |

---

## contact_submissions — Full Schema

```sql
create table public.contact_submissions (
  -- Identity
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),

  -- Contact info
  name            text not null,           -- min 2, max 100 chars
  email           text not null,           -- validated format
  phone           text not null,           -- digits only after transform

  -- Request
  service_needed  text,                    -- from service dropdown
  message         text,                    -- max 2000 chars
  is_emergency    boolean not null default false,

  -- Tracking
  source_page     text,                    -- pathname form was submitted from
  honeypot_value  text,                    -- must be empty for real users
  ip_hash         text,                    -- SHA-256(ip + salt) — not PII

  -- CRM (phase 2)
  status          text not null default 'new',
  notes           text,
  responded_at    timestamptz
);
```

### Column notes

**`phone`** — Store digits only (Server Action strips non-digits before insert). This
makes `tel:` links trivial: `tel:+1${phone}`. Display formatting happens at render time.

**`ip_hash`** — Never store raw IPs. Hash with `SHA-256(ip + IP_HASH_SALT)` and keep
only the first 16 hex chars. This gives you rate-limit identity without storing PII.
CCPA compliant.

**`honeypot_value`** — The form has a hidden `website` field. Real browsers leave it
empty. Bots fill it. The RLS policy blocks non-empty values at the database level as
a second line of defense (Server Action catches them first and silently "succeeds"
so bots don't retry).

**`status`** — Values: `new` | `contacted` | `quoted` | `booked` | `closed` | `spam`.
MVP only uses `new`. Phase 2 adds a simple pipeline view.

---

## Row Level Security

```
Public (anon)       → INSERT only, honeypot_value must be empty
Authenticated       → SELECT, UPDATE (for contractor dashboard)
Service role        → All (for Supabase Edge Functions, if added later)
```

**Never disable RLS.** Never use the service role key client-side. The anon key is
safe for public INSERT because RLS restricts what gets written.

### RLS in plain English

1. Anyone with the anon key can submit a row IF `honeypot_value` is empty.
2. Only logged-in users (the contractor) can view submissions.
3. No one can delete submissions through the API (protect audit trail).

---

## services — Full Schema

```sql
create table public.services (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  slug            text not null unique,    -- url slug, e.g. "water-heater-repair"
  title           text not null,
  short_desc      text,                   -- used in service cards
  full_desc       text,                   -- used on service detail page
  icon_name       text,                   -- Lucide icon name
  image_path      text,                   -- Supabase storage path
  is_featured     boolean not null default false,
  sort_order      int not null default 0,
  is_active       boolean not null default true,

  -- SEO overrides
  meta_title      text,                   -- null = auto-generated
  meta_desc       text
);
```

**MVP note:** `site.config.ts` is the source of truth for services at build time.
The `services` table enables a phase-2 admin UI where the contractor can add/edit
services without a code deploy. For MVP, populate from `siteConfig.services[]` via
a seed script or leave empty.

---

## testimonials — Full Schema

```sql
create table public.testimonials (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  author_name     text not null,
  author_location text,                   -- "San Jose, CA"
  rating          smallint not null default 5,  -- 1–5
  review_text     text not null,          -- min 20 chars
  service_used    text,

  -- Source
  source          text not null default 'manual',  -- google|yelp|facebook|angi|manual
  external_id     text,                   -- platform review ID
  review_url      text,                   -- link to original

  -- Display control
  is_featured     boolean not null default false,
  is_active       boolean not null default true,
  sort_order      int not null default 0,
  photo_url       text
);
```

**MVP note:** Use `siteConfig.testimonials.manual[]` at build time (static). The DB
table enables ISR-refreshed testimonials in phase 2. Populate with the same data
from the Build Brief's Trust & Social Proof Assets section.

---

## TypeScript Types

After running the migration, generate types with the Supabase MCP:

```
generate_typescript_types → save to src/types/database.types.ts
```

Then create convenience types in `src/types/index.ts`:

```typescript
import type { Database } from './database.types'

export type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row']
export type ContactSubmissionInsert = Database['public']['Tables']['contact_submissions']['Insert']
export type Service = Database['public']['Tables']['services']['Row']
export type Testimonial = Database['public']['Tables']['testimonials']['Row']
```

---

## Supabase Client Setup

### Server client (for Server Actions and server components)

```typescript
// src/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database.types'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch { /* Server component — ignore */ }
        },
      },
    }
  )
}
```

### Browser client (for client components, if needed)

```typescript
// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database.types'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

---

## Environment Variables Required

```bash
# .env.local (never commit)
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...        # safe for browser
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...             # server only — never expose

# For Server Action rate limiting
IP_HASH_SALT=random-32-char-string-here

# For Resend email
RESEND_API_KEY=re_xxxx
RESEND_DOMAIN=yourdomain.com                     # domain verified in Resend
LEAD_NOTIFICATION_EMAIL=contractor@email.com     # where leads are sent
```

Add to Vercel: `vercel env add RESEND_API_KEY production`

---

## Indexes

```sql
-- contact_submissions
create index contact_submissions_created_at_idx on contact_submissions (created_at desc);
create index contact_submissions_status_idx on contact_submissions (status);

-- services
create index services_slug_idx on services (slug);
create index services_sort_order_idx on services (sort_order, is_active);

-- testimonials
create index testimonials_display_idx on testimonials (is_active, is_featured, sort_order);
```

---

## Running Migrations

```bash
# Push to dev/staging Supabase project
supabase db push

# Or via Supabase MCP
# Use execute_sql with the migration content
```

**Never run migrations against the production Supabase project directly.**
Always push to staging first, verify, then promote.
