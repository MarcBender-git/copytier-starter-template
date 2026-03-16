---
paths:
  - "src/app/**/page.tsx"
  - "src/app/**/layout.tsx"
---

# SEO & Metadata Rules

## Title Tags
- Format: `[Service] in [City] | [Company Name]`
- Length: 50-60 characters max
- Homepage: `[Trade] Services in [City] | [Company Name]`
- Service page: `[Service Name] in [City], CA | [Company Name]`

## Meta Descriptions
- Length: 150-160 characters with a call-to-action
- Template: "Need [service] in [city]? Our licensed [professionals] offer [benefit]. Call [phone] for a free estimate."
- Every page gets a UNIQUE description — no duplicates across pages

## Heading Hierarchy
- Single H1 per page — describes the primary topic
- Sequential headings: H1 → H2 → H3. Never skip levels (no H1 → H4)
- H1 on service pages includes the service name and city

## Canonical & Open Graph
- Self-referencing canonical tag on every page: `<link rel="canonical" href="[full URL]" />`
- Open Graph tags on every page: `og:title`, `og:description`, `og:image` (1200x630px), `og:type`
- Twitter card: `summary_large_image`

## JSON-LD Structured Data
Required schema types per page:
- **All pages**: `LocalBusiness` (with niche subtype from `siteConfig.schemaType` — Plumber, HVACBusiness, Electrician, RoofingContractor, etc.)
- **Service pages**: `Service` schema with name, description, provider, areaServed
- **FAQ sections**: `FAQPage` schema wrapping all Q&A pairs
- **Interior pages**: `BreadcrumbList` for navigation trail

The `siteConfig.schemaType` field drives the `@type` automatically — never hardcode the business type.

## NAP Consistency
- Name, Address, Phone must be IDENTICAL on every page (Header, Footer, Contact, schema markup)
- Must match the Google Business Profile exactly — same formatting, same abbreviations
- Pull all NAP data from `siteConfig` — single source of truth

## Service Area Pages
- Each city/area page needs unique, genuine content
- Reference local landmarks, neighborhoods, area-specific needs
- NEVER create pages that are just city-name swaps with identical content — Google penalizes this
- Include driving distance/time from contractor's base, local service considerations
