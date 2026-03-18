# Page Template Specifications

## Per-Page Requirements

Every page template must include:
1. `generateMetadata()` export returning full `Metadata` object
2. `default export` function that is a React Server Component (no `'use client'`)
3. `<main id="main-content" tabIndex={-1}>` as the primary landmark
4. JSON-LD schema script (inline `<script type="application/ld+json">`)
5. Breadcrumbs on all pages except homepage
6. Final CTA section as last content block before `</main>`

---

## Homepage (`/`)

**Schema:** `LocalBusiness` (with niche subtype from `siteConfig.schemaType`)

**Metadata pattern:**
```typescript
title: `${siteConfig.niche} in ${siteConfig.primaryCity} | ${siteConfig.businessName}`
description: `${siteConfig.metaDescription.homepage}`  // 150-160 chars
```

**Required sections in order:**
1. `<HeroSection>` — headline, subheadline, CTA buttons (2: primary + secondary), hero image/video, trust bar inline
2. `<TrustBarSection>` — review count + rating, years in business, license number, guarantee
3. `<ServicesGridSection>` — all services from `siteConfig.services[]`, each links to service page
4. `<WhyChooseUsSection>` — differentiators from `siteConfig.differentiators[]`
5. `<TestimonialsSection>` — from `siteConfig.testimonials[]`, minimum 3
6. `<ProcessSection>` — from `siteConfig.process[]` (3-4 steps)
7. `<ServiceAreaSection>` — cities from `siteConfig.serviceAreas[]`
8. `<FaqSection>` — from `siteConfig.faq.homepage[]`, FAQPage schema embedded
9. `<CtaSection>` — final conversion block, emergency services callout if applicable

**Minimum content rule:** The homepage must not be shorter than 1,200 words of visible content when rendered. If `siteConfig` data produces less, flag for Pack 5 (Content & SEO) to expand.

---

## Service Page (`/services/[serviceSlug]`)

**Schema:** `Service` + `LocalBusiness` (nested), `FAQPage` (in FAQ section)

**Metadata pattern:**
```typescript
title: `${service.name} in ${siteConfig.primaryCity} | ${siteConfig.businessName}`
description: service.metaDescription  // from siteConfig.services[].metaDescription
```

**Data source:** Resolved by matching `params.serviceSlug` to `siteConfig.services[]`:
```typescript
const service = siteConfig.services.find(s => s.slug === params.serviceSlug)
if (!service) notFound()  // triggers not-found.tsx
```

**Required sections in order:**
1. `<PageHeroSection service={service}>` — service name as H1, service-specific CTA
2. `<ServiceOverviewSection service={service}>` — description, what's included, H2 heading
3. `<ServiceBenefitsSection service={service}>` — service-specific benefits (NOT generic why-choose-us)
4. `<ServiceProcessSection service={service}>` — service-specific steps if available, else generic
5. `<TestimonialsSection filter={service.slug}>` — reviews mentioning this service
6. `<ServiceFaqSection service={service}>` — FAQ specific to this service, FAQPage schema
7. `<RelatedServicesSection currentSlug={service.slug}>` — links to other services (internal links)
8. `<CtaSection service={service}>` — service-specific offer/CTA

**Minimum content rule:** Each service page must have at least 600 words of unique content. The `service.description` in `siteConfig` should be at minimum 200 words; Pack 5 expands to full page copy.

**H1 rule:** Service name is always H1. Never "Welcome to [Company]" or any non-service headline on a service page.

---

## Service Area Page (`/service-areas/[areaSlug]`)

**Schema:** `LocalBusiness` with `areaServed` pointing to this specific location

**Metadata pattern:**
```typescript
title: `${siteConfig.primaryService} in ${area.city}, ${area.state} | ${siteConfig.businessName}`
description: area.metaDescription  // from siteConfig.serviceAreas[].metaDescription
```

**Data source:**
```typescript
const area = siteConfig.serviceAreas.find(a => a.slug === params.areaSlug)
if (!area) notFound()
```

**Required sections in order:**
1. `<PageHeroSection area={area}>` — "[Primary Service] in [City]" as H1
2. `<LocalIntroSection area={area}>` — city-specific intro paragraph (unique content, never city-swap)
3. `<ServicesInAreaSection area={area}>` — services available in this location
4. `<LocalWhyChooseUsSection area={area}>` — local trust: years serving city, local reviews
5. `<LocalTestimonialsSection area={area}>` — reviews mentioning this city if available
6. `<AreaFaqSection area={area}>` — location-specific FAQ (response time, service radius)
7. `<NearbyAreasSection area={area}>` — links to adjacent service area pages
8. `<CtaSection area={area}>` — local urgency CTA

**City-swap rule:** Sections 2, 4, and 6 MUST have unique content per city. Pack 5 writes this. Pack 3 scaffolds the component slots and marks them with `// UNIQUE CONTENT REQUIRED — see Pack 5` comments.

---

## Contact Page (`/contact`)

**Schema:** `LocalBusiness` (lightweight — name, address, phone, hours)

**Metadata pattern:**
```typescript
title: `Contact ${siteConfig.businessName} | ${siteConfig.primaryCity} ${siteConfig.niche}`
description: `Contact ${siteConfig.businessName}. Call ${siteConfig.contact.phone} or submit a request online. Serving ${siteConfig.primaryCity} and surrounding areas.`
```

**Required sections in order:**
1. `<ContactHeroSection>` — "Contact Us" H1, phone number large, brief trust statement
2. `<ContactFormSection>` — **the form must be visible at top of this section without scrolling on mobile**
3. `<ContactInfoSection>` — address, phone, email, hours of operation
4. `<ServiceAreaMapSection>` — map or city badge grid (same component as homepage if reused)

**Form placement rule:** The contact form is the primary purpose of this page. It must be the first interactive element after the page headline. Never push it below a map, testimonials, or other content.

**No Final CTA section** — the entire page is a CTA. Do not add a second CTA section at the bottom.

---

## About Page (`/about`)

**Schema:** `LocalBusiness` + `Person` (for owner/founder if in siteConfig)

**Metadata pattern:**
```typescript
title: `About ${siteConfig.businessName} | ${siteConfig.primaryCity} ${siteConfig.niche}`
description: `Learn about ${siteConfig.businessName}. ${siteConfig.about.tagline}`
```

**Required sections in order:**
1. `<AboutHeroSection>` — business name, tagline, hero photo (team or owner)
2. `<AboutStorySection>` — founding story, years in business, mission
3. `<TeamSection>` — team members from `siteConfig.team[]` (if populated)
4. `<CredentialsSection>` — licenses, certifications, awards, memberships
5. `<TestimonialsSection>` — reviews emphasizing trust and quality
6. `<CtaSection>` — "Ready to work with us?" final CTA

**Trust signal rule:** License number, years in business, and service area must all appear on this page. These are trust signals that help conversion even on the About page.

---

## FAQ Page (`/faq`)

Only created if `siteConfig.features.faq === true`.

**Schema:** `FAQPage` with all Q&A pairs

**Required sections:**
1. `<FaqHeroSection>` — "Frequently Asked Questions" H1
2. `<FaqListSection>` — all FAQ items from `siteConfig.faq.all[]`, expandable accordion
3. `<CtaSection>` — "Still have questions? Call us" CTA

---

## 404 Page (`/not-found.tsx`)

**No schema.** No `generateMetadata` needed — Next.js handles 404 status automatically.

**Required content:**
1. "Page Not Found" or friendly equivalent as H1
2. Short message: "We couldn't find that page."
3. Large phone number (highest converting element even on 404)
4. "Return to Homepage" button
5. List of popular service links (internal linking, keeps visitors on site)

**No analytics tracking needed** — 404s are tracked by default in Vercel Analytics.

---

## Privacy Policy Page (`/privacy`)

Generated from a standard CCPA-compliant template. See Pack 7 (Security & Performance) for the privacy policy content. Pack 3 only scaffolds the route:

```typescript
// src/app/privacy/page.tsx
// Content populated by Pack 7 — placeholder only
export default function PrivacyPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <div className="container py-16 lg:py-24 prose max-w-3xl">
        {/* PACK 7: Insert CCPA-compliant privacy policy content here */}
      </div>
    </main>
  )
}
```
