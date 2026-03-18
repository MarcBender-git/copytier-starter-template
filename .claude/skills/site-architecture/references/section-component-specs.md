# Section Component Specifications

## Purpose

This reference defines the **component contracts** for every section used in Pack 3 templates. Pack 4 (Component Library) builds the actual implementations — Pack 3 only places the import and JSX call with the correct props shape.

The contract specifies: component name, required props, optional props, and what the section must render above-the-fold on mobile.

---

## Global Props Available to All Sections

Every section component receives at minimum:

```typescript
// src/types/section-props.ts
import type { SiteConfig } from './site-config'

export type BaseSectionProps = {
  className?: string
  id?: string  // For anchor links and ADA skip-nav targets
}
```

The `siteConfig` object is imported directly in sections that need it — it is not passed as a prop (it's a static import, not dynamic data).

---

## Hero Sections

### `<HeroSection>` — Homepage hero

```typescript
type HeroSectionProps = BaseSectionProps & {
  // All content sourced from siteConfig inside the component
  // No props required — component reads siteConfig directly
}
```

**Must render above fold (375px):**
- H1 with primary headline (`siteConfig.hero.headline`)
- Subheadline (`siteConfig.hero.subheadline`)
- Primary CTA button → `/contact` or `tel:` (from `siteConfig.cta.primary`)
- Secondary CTA button → service page or `siteConfig.cta.secondary`
- At least one trust signal (rating, years, license)
- Hero image with `fetchpriority="high"` — never lazy-load

**NEVER animate the hero section.** No fade-in, no slide-in, no parallax. The LCP element must render immediately.

### `<PageHeroSection>` — Interior page hero

```typescript
type PageHeroSectionProps = BaseSectionProps & {
  headline: string        // Becomes H1 on the page
  subheadline?: string
  ctaLabel?: string       // Defaults to siteConfig.cta.primary.label
  ctaHref?: string        // Defaults to '/contact'
  breadcrumbs?: BreadcrumbItem[]  // Passed from page.tsx
  backgroundVariant?: 'brand' | 'image' | 'light'
}
```

Interior page heroes are shorter than the homepage hero (no full-bleed image required). They establish the H1 and repeat the phone/CTA.

---

## Trust & Social Proof Sections

### `<TrustBarSection>` — Metric strip

```typescript
type TrustBarSectionProps = BaseSectionProps & {
  variant?: 'light' | 'dark' | 'brand'  // background color variant
}
// Content from siteConfig.trustSignals: rating, reviewCount, yearsInBusiness, licenseNumber
```

Renders as a horizontal strip of 4 trust metrics with icons. On mobile: 2×2 grid.

### `<TestimonialsSection>` — Review cards

```typescript
type TestimonialsSectionProps = BaseSectionProps & {
  filter?: string          // Optional service slug to filter reviews
  limit?: number           // Default: 3
  variant?: 'grid' | 'carousel'  // Default: 'grid'
}
// Reviews from siteConfig.testimonials[]
```

Requires `itemReviewed` and `author` for Review schema (embedded in component).

### `<CredentialsSection>` — Licenses, certs, awards

```typescript
type CredentialsSectionProps = BaseSectionProps & {
  // All from siteConfig.credentials[]
}
```

---

## Service Sections

### `<ServicesGridSection>` — Homepage services overview

```typescript
type ServicesGridSectionProps = BaseSectionProps & {
  // All services from siteConfig.services[]
  // Shows name, short description, icon, link to service page
}
```

Grid: 1 col mobile → 2 col sm → 3 col lg. Each card links to `/services/[slug]`.

### `<ServiceOverviewSection>` — Service page detail

```typescript
type ServiceOverviewSectionProps = BaseSectionProps & {
  service: SiteConfigService  // Full service object from siteConfig
}
```

Renders service description with H2 heading. 2-column on desktop (text + image).

### `<ServiceBenefitsSection>` — Service-specific benefits

```typescript
type ServiceBenefitsSectionProps = BaseSectionProps & {
  service: SiteConfigService
}
// Renders service.benefits[] as icon + heading + text cards
```

### `<RelatedServicesSection>` — Internal links to other services

```typescript
type RelatedServicesSectionProps = BaseSectionProps & {
  currentSlug: string  // Excludes current service from the list
  limit?: number       // Default: 3
}
```

---

## Process & FAQ Sections

### `<ProcessSection>` — How It Works steps

```typescript
type ProcessSectionProps = BaseSectionProps & {
  steps?: ProcessStep[]  // If undefined, uses siteConfig.process[]
}
type ProcessStep = {
  step: number
  title: string
  description: string
}
```

3-4 step horizontal flow on desktop, vertical list on mobile.

### `<FaqSection>` — Accordion FAQ with schema

```typescript
type FaqSectionProps = BaseSectionProps & {
  items?: FaqItem[]  // If undefined, uses siteConfig.faq.homepage[]
  includeSchema?: boolean  // Default: true — injects FAQPage JSON-LD
}
type FaqItem = {
  question: string
  answer: string
}
```

FAQPage schema is injected as a `<script type="application/ld+json">` sibling inside this component — not in the page `<head>`. This co-locates the schema with the content it describes.

---

## Location Sections

### `<ServiceAreaSection>` — Cities served overview

```typescript
type ServiceAreaSectionProps = BaseSectionProps & {
  variant?: 'badges' | 'map' | 'grid'  // Default: 'badges'
}
// Cities from siteConfig.serviceAreas[]
```

### `<LocalIntroSection>` — Area page unique content block

```typescript
type LocalIntroSectionProps = BaseSectionProps & {
  area: SiteConfigArea  // Full area object
  // UNIQUE CONTENT REQUIRED — Pack 5 provides area.intro copy
}
```

### `<NearbyAreasSection>` — Adjacent city links

```typescript
type NearbyAreasSectionProps = BaseSectionProps & {
  area: SiteConfigArea  // Has area.nearbyAreas[] with slugs
}
```

---

## CTA Sections

### `<CtaSection>` — Final conversion block

```typescript
type CtaSectionProps = BaseSectionProps & {
  headline?: string     // Defaults to siteConfig.cta.final.headline
  subtext?: string      // Defaults to siteConfig.cta.final.subtext
  primaryLabel?: string // Defaults to siteConfig.cta.primary.label
  primaryHref?: string  // Defaults to '/contact'
  showEmergency?: boolean  // Shows "24/7 Emergency" if siteConfig.features.emergency
  variant?: 'brand' | 'accent' | 'dark'  // Background variant
}
```

Every page must end with a `<CtaSection>`. The Final CTA is the last section before `</main>`.

---

## Why/Differentiator Sections

### `<WhyChooseUsSection>` — Differentiators

```typescript
type WhyChooseUsSectionProps = BaseSectionProps & {
  items?: DifferentiatorItem[]  // If undefined, uses siteConfig.differentiators[]
  variant?: 'icons' | 'numbered' | 'split'
}
type DifferentiatorItem = {
  icon?: string  // icon name for icon library
  title: string
  description: string
}
```

---

## Schema Component

### `<JsonLd>` — Inline structured data

```typescript
// src/components/seo/JsonLd.tsx
type JsonLdProps = {
  schema: Record<string, unknown>  // The full schema object
}

export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

Used in `page.tsx` for page-level schemas (LocalBusiness, Service, BreadcrumbList). Used inside section components for content-level schemas (FAQPage, Review).
