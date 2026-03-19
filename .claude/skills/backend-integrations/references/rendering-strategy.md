# Rendering Strategy Reference
## Pack 6: Backend, Data & Integrations

---

## The Rule: Static by Default, Dynamic Only When Necessary

Contractor websites have very few pages that need real-time data.
Static generation (SSG) gives the fastest possible performance —
pre-rendered HTML served from a CDN, zero database calls at request time.

```
Static (SSG)     → Homepage, all service pages, all area pages, About, FAQ, Privacy
ISR (60s)        → Testimonials section (refreshes from DB periodically)
Dynamic          → Nothing at MVP. Contact page is static HTML — form uses Server Action
Server Action    → Contact form submission (always server-side, never cached)
```

---

## Page-by-Page Strategy

### Homepage `/`

```typescript
// app/page.tsx
// No 'export const dynamic' needed — SSG is the default

// Data comes from siteConfig at build time
import { siteConfig } from '@/config/site.config'

export default function HomePage() {
  return (
    <>
      <HeroSection data={siteConfig.hero} />
      <ServicesGrid services={siteConfig.services} />
      <TrustBar trustSignals={siteConfig.trustSignals} />
      <TestimonialsSection />  // ← uses ISR pattern below
      <CTASection />
      <FAQSection faqs={siteConfig.faq} />
    </>
  )
}
```

### Service Pages `/services/[slug]`

```typescript
// app/services/[slug]/page.tsx

export async function generateStaticParams() {
  // Build-time: generate one static page per service
  return siteConfig.services.map((service) => ({
    slug: service.slug,
  }))
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = siteConfig.services.find(s => s.slug === params.slug)
  if (!service) notFound()
  return <ServicePageTemplate service={service} />
}
```

**`generateStaticParams` is required** for `[slug]` routes to be statically generated.
Without it, Next.js renders them dynamically on first request (slower, higher cost).

### Service Area Pages `/areas/[city]`

Same pattern as service pages:

```typescript
export async function generateStaticParams() {
  return siteConfig.serviceAreas.map((area) => ({
    city: area.slug,
  }))
}
```

### Contact Page `/contact`

```typescript
// app/contact/page.tsx
// Static page. The form is a client component with a Server Action.
// No data fetching needed — all data comes from siteConfig.
export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />       {/* 'use client' — connects to submitContact Server Action */}
      <ContactSidebar />    {/* phone, hours, address from siteConfig */}
    </>
  )
}
```

### About Page `/about`

```typescript
// Pure SSG. Team members and company story from siteConfig.about
export default function AboutPage() {
  return <AboutTemplate data={siteConfig.about} />
}
```

---

## Testimonials: ISR Pattern

Testimonials are the one section that benefits from ISR — they update as new
reviews come in, but don't need real-time freshness.

```typescript
// app/api/testimonials/route.ts  (or fetch in server component)
export const revalidate = 60  // Re-fetch from DB every 60 seconds

async function getTestimonials() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('is_featured', { ascending: false })
    .order('sort_order')
    .limit(6)

  if (error || !data?.length) {
    // Graceful fallback to siteConfig static testimonials
    return siteConfig.testimonials.manual ?? []
  }
  return data
}
```

**MVP path:** If `testimonials` table is empty (common at launch), always fall
back to `siteConfig.testimonials.manual`. This means testimonials always work
even before the DB is populated.

```typescript
// TestimonialsSection.tsx (Server Component)
export async function TestimonialsSection() {
  const testimonials = await getTestimonials()
  return <TestimonialsGrid testimonials={testimonials} />
}
```

---

## Data Fetching Hierarchy (Read in Order)

1. **`siteConfig`** — static import, zero latency, build-time resolved
2. **Supabase static fetch** — `generateStaticParams` + build-time Supabase query (services, initial testimonials)
3. **ISR fetch** — Server Component with `revalidate = 60` (testimonials updates)
4. **Server Action** — form submission only, never for read queries

**Never fetch from Supabase in a client component.** All data access goes through
Server Components or Server Actions. The anon key is public but DB access patterns
should stay server-side.

---

## Caching Strategy

```typescript
// next.config.js additions for Pack 6
const nextConfig = {
  // Images from Supabase Storage
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}
```

### What Next.js caches automatically

- Static pages (SSG): forever, until `next build` is re-run
- ISR pages: until `revalidate` period expires, then serves stale while revalidating
- `fetch()` calls in Server Components: 1 hour by default (override with `{ next: { revalidate: N } }`)

### What is never cached

- Server Actions (always fresh, always server-side)
- `'use client'` components at runtime

---

## Skeleton Loading for Async Sections

Every async Server Component (like TestimonialsSection) needs a loading skeleton.
Use Next.js `loading.tsx` or React `Suspense`:

```typescript
// In the page file:
<Suspense fallback={<TestimonialsSkeleton />}>
  <TestimonialsSection />
</Suspense>
```

```typescript
// TestimonialsSkeleton.tsx — matches the shape of TestimonialsGrid
export function TestimonialsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-lg bg-muted animate-pulse h-48" />
      ))}
    </div>
  )
}
```

---

## generateMetadata for Dynamic Routes

```typescript
// app/services/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = siteConfig.services.find(s => s.slug === params.slug)
  if (!service) return {}

  return {
    title: `${service.title} in ${siteConfig.business.city} | ${siteConfig.business.name}`,
    description: service.metaDescription,
    alternates: {
      canonical: `${siteConfig.site.url}/services/${params.slug}`,
    },
    openGraph: {
      title: `${service.title} | ${siteConfig.business.name}`,
      description: service.metaDescription,
      url: `${siteConfig.site.url}/services/${params.slug}`,
    },
  }
}
```

---

## Common Mistakes to Avoid

| Mistake | Fix |
|---------|-----|
| Fetching Supabase in a client component | Move fetch to Server Component, pass data as props |
| No `generateStaticParams` on `[slug]` routes | Add it or pages render dynamically (slower) |
| Awaiting email in Server Action response path | Fire-and-forget with `.catch()` |
| No fallback when Supabase query returns empty | Always fall back to `siteConfig` static data |
| Using `export const dynamic = 'force-dynamic'` unnecessarily | Only needed for pages that read cookies/headers at request time |
| Hero image lazy-loaded | Hero must have `priority={true}` on `<Image>` — it's the LCP element |
