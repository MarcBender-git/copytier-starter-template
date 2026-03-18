# JSON-LD Schema Templates

## Implementation Pattern

All schema is delivered as a React Server Component. One component per schema type. Compose them per page.

```tsx
// src/components/schema/SchemaScript.tsx
interface SchemaScriptProps {
  schema: Record<string, unknown> | Record<string, unknown>[]
}

export function SchemaScript({ schema }: SchemaScriptProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

For pages with multiple schema types, use `@graph`:

```tsx
// Compose in page.tsx
import { SchemaScript } from '@/components/schema/SchemaScript'
import { buildLocalBusinessSchema } from '@/lib/schema'

export default function ServicePage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      localBusinessSchema,
      serviceSchema,
      faqPageSchema,
      breadcrumbSchema
    ]
  }
  return (
    <>
      <SchemaScript schema={schema} />
      {/* page content */}
    </>
  )
}
```

---

## Template 1 — LocalBusiness

Use on: every page of every contractor website.

The `@type` field uses Google's supported subtypes. Map via `siteConfig.schemaType`.

### Niche → Schema Type Mapping

| Niche | @type | Subtype Used |
|-------|-------|-------------|
| plumber | Plumber | — (Plumber is the type) |
| hvac | HVACBusiness | — |
| electrician | Electrician | — |
| roofer | RoofingContractor | — |
| landscaper | LandscapeService | — |
| handyman | HomeAndConstructionBusiness | use with additionalType |
| cleaner | HousePainter | use: `"@type": ["LocalBusiness", "ProfessionalService"]` |
| general contractor | GeneralContractor | — |

```json
{
  "@context": "https://schema.org",
  "@type": "[siteConfig.schemaType]",
  "@id": "https://[siteConfig.domain]/#business",
  "name": "[siteConfig.business.name]",
  "url": "https://[siteConfig.domain]",
  "telephone": "[siteConfig.business.phone]",
  "email": "[siteConfig.business.email]",
  "description": "[siteConfig.business.tagline or valueProposition]",
  "foundingDate": "[siteConfig.business.foundedYear]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[siteConfig.business.address.street]",
    "addressLocality": "[siteConfig.business.address.city]",
    "addressRegion": "[siteConfig.business.address.state]",
    "postalCode": "[siteConfig.business.address.zip]",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[siteConfig.business.geo.lat]",
    "longitude": "[siteConfig.business.geo.lng]"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "[siteConfig.business.city]"
    }
    // repeat for each siteConfig.serviceAreas[] entry
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "[siteConfig.business.hours.weekday.open]",
      "closes": "[siteConfig.business.hours.weekday.close]"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday"],
      "opens": "[siteConfig.business.hours.saturday.open]",
      "closes": "[siteConfig.business.hours.saturday.close]"
    }
    // Add Sunday if applicable; omit if closed
  ],
  "hasMap": "https://maps.google.com/?cid=[siteConfig.business.googleCID]",
  "sameAs": [
    "[siteConfig.social.google]",
    "[siteConfig.social.yelp]",
    "[siteConfig.social.facebook]"
  ],
  "image": {
    "@type": "ImageObject",
    "url": "https://[siteConfig.domain]/images/og/homepage.jpg",
    "width": 1200,
    "height": 630
  },
  "logo": {
    "@type": "ImageObject",
    "url": "https://[siteConfig.domain]/images/logo.png",
    "width": 400,
    "height": 120
  },
  "priceRange": "[siteConfig.business.priceRange]"
}
```

**Notes:**
- `@id` uses a fragment identifier (`#business`) so it can be referenced by other schema objects on the same page
- `areaServed` array should include all cities from `siteConfig.serviceAreas[]`
- `sameAs` should include the canonical URL of every external profile: Google Business Profile, Yelp, Facebook, BBB, HomeAdvisor/Angi if applicable
- `priceRange` uses Google-accepted values: `$`, `$$`, `$$$`, `$$$$`

---

## Template 2 — AggregateRating

Use on: Homepage (and optionally service pages if reviews are service-specific).
Add as a property inside LocalBusiness or as a sibling in `@graph`.

```json
{
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  "itemReviewed": {
    "@id": "https://[siteConfig.domain]/#business"
  },
  "ratingValue": "[siteConfig.reviews.rating]",
  "reviewCount": "[siteConfig.reviews.count]",
  "bestRating": "5",
  "worstRating": "1"
}
```

**When to include:** Only when you have real, verifiable review data from Google, Yelp, or another public platform. Never fabricate `ratingValue` or `reviewCount`.

**Implementation note:** If using as a property within LocalBusiness, nest it:
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.9",
  "reviewCount": "347",
  "bestRating": "5",
  "worstRating": "1"
}
```

---

## Template 3 — Service

Use on: every service page and every service area page.

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://[siteConfig.domain]/services/[service-slug]/#service",
  "name": "[siteConfig.services[i].name]",
  "description": "[siteConfig.services[i].description]",
  "url": "https://[siteConfig.domain]/services/[service-slug]",
  "provider": {
    "@id": "https://[siteConfig.domain]/#business"
  },
  "areaServed": {
    "@type": "City",
    "name": "[siteConfig.business.city]"
  },
  "serviceType": "[siteConfig.services[i].name]",
  "category": "[siteConfig.niche]",
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://[siteConfig.domain]/contact",
    "servicePhone": "[siteConfig.business.phone]",
    "availableLanguage": "English"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://[siteConfig.domain]/services/[service-slug]",
    "priceCurrency": "USD",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "description": "Free estimates. Pricing provided before work begins."
    },
    "availability": "https://schema.org/InStock",
    "areaServed": {
      "@type": "City",
      "name": "[siteConfig.business.city]"
    }
  }
}
```

**For service area pages**, modify `areaServed` to the specific area city:
```json
"areaServed": {
  "@type": "City",
  "name": "[areaCity]",
  "containedInPlace": {
    "@type": "State",
    "name": "California"
  }
}
```

---

## Template 4 — FAQPage

Use on: every page that has a FAQ section (homepage, service pages, service area pages, standalone FAQ page).

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://[siteConfig.domain]/[page-slug]/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[FAQ question text — exact match to visible H3 on page]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[FAQ answer text — exact match to visible answer on page]"
      }
    }
    // Repeat for each FAQ item on the page
  ]
}
```

**Critical rules:**
- `name` must match the visible question text exactly (or very closely — do not paraphrase)
- `text` must match the visible answer text exactly — Google validates this
- Include ALL FAQ items from the page, not a selection
- Do not include answers over 1,000 characters — Google truncates at ~300 words
- Questions should be complete, natural-language questions (not just keywords)

**Helper function pattern:**

```typescript
// src/lib/schema.ts
export function buildFAQSchema(faqs: FAQ[], pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}
```

---

## Template 5 — BreadcrumbList

Use on: all interior pages (every page except the homepage).

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://[siteConfig.domain]"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://[siteConfig.domain]/services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "[Current Page Name]",
      "item": "https://[siteConfig.domain]/[current-slug]"
    }
  ]
}
```

**Page-specific patterns:**

Service page breadcrumb:
```
Home → Services → [Service Name]
```

Service area page breadcrumb:
```
Home → Service Areas → [City Name]
```

Or if area page is service-specific:
```
Home → Services → [Service Name] → [City Name]
```

Contact / About breadcrumb:
```
Home → [Page Name]
```

**Helper function pattern:**

```typescript
// src/lib/schema.ts
export interface BreadcrumbItem {
  name: string
  url: string
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[], domain: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${domain}${item.url}`
    }))
  }
}
```

---

## Template 6 — Article (Blog Posts)

Use on: blog post pages only.

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://[siteConfig.domain]/blog/[post-slug]/#article",
  "headline": "[Post title — matches H1]",
  "description": "[Post meta description]",
  "url": "https://[siteConfig.domain]/blog/[post-slug]",
  "datePublished": "[ISO 8601 date: 2026-01-15]",
  "dateModified": "[ISO 8601 date: 2026-02-01]",
  "author": {
    "@type": "Person",
    "name": "[siteConfig.business.ownerName]",
    "url": "https://[siteConfig.domain]/about"
  },
  "publisher": {
    "@id": "https://[siteConfig.domain]/#business"
  },
  "image": {
    "@type": "ImageObject",
    "url": "https://[siteConfig.domain]/images/blog/[post-slug].jpg",
    "width": 1200,
    "height": 630
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://[siteConfig.domain]/blog/[post-slug]"
  }
}
```

---

## Complete Page-Level Examples

### Homepage Schema Composition

```typescript
// In src/app/page.tsx
const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": siteConfig.schemaType,
      "@id": `https://${siteConfig.domain}/#business`,
      "name": siteConfig.business.name,
      "url": `https://${siteConfig.domain}`,
      "telephone": siteConfig.business.phone,
      // ... full LocalBusiness properties
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": siteConfig.reviews.rating,
        "reviewCount": siteConfig.reviews.count,
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    buildFAQSchema(siteConfig.homepageFAQs, `https://${siteConfig.domain}`)
  ]
}
```

### Service Page Schema Composition

```typescript
// In src/app/services/[slug]/page.tsx
const serviceSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": siteConfig.schemaType,
      "@id": `https://${siteConfig.domain}/#business`,
      // minimal LocalBusiness reference
    },
    {
      "@type": "Service",
      "@id": `https://${siteConfig.domain}/services/${service.slug}/#service`,
      "name": service.name,
      "provider": { "@id": `https://${siteConfig.domain}/#business` },
      // ... full Service properties
    },
    buildFAQSchema(service.faqs, `https://${siteConfig.domain}/services/${service.slug}`),
    buildBreadcrumbSchema(
      [
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
        { name: service.name, url: `/services/${service.slug}` }
      ],
      `https://${siteConfig.domain}`
    )
  ]
}
```

---

## Validation

Before every deploy, validate all schema using:

1. **Google Rich Results Test:** https://search.google.com/test/rich-results
2. **Schema.org Validator:** https://validator.schema.org/
3. **Automated check** in Pack 8 QA: look for any remaining `[` characters in published JSON-LD (indicates unfilled placeholders)

```typescript
// src/lib/schema-validator.ts — runs in development only
export function validateSchemaForPlaceholders(schema: unknown): void {
  if (process.env.NODE_ENV !== 'development') return
  const jsonString = JSON.stringify(schema)
  if (jsonString.includes('[') && jsonString.includes(']')) {
    console.warn('[Schema Validator] Possible unfilled placeholder in schema:', jsonString)
  }
}
```
