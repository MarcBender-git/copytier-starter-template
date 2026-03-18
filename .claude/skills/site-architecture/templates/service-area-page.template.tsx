/**
 * PACK 3: Service Area Page Template
 * =====================================
 * Target path: src/app/service-areas/[areaSlug]/page.tsx
 *
 * Renders one page per city/area in siteConfig.serviceAreas[].
 * These pages are core local SEO assets — they capture "[service] in [city]"
 * search queries that drive high-intent local traffic.
 *
 * ⚠️  CITY-SWAP WARNING ⚠️
 * Sections 2, 4, and 6 MUST have unique content per city.
 * Identical content with city names swapped = thin content penalty risk.
 * Pack 5 (Content & SEO) writes the unique copy.
 * Pack 3 marks those slots clearly so Pack 5 knows where to work.
 *
 * CONVERSION SEQUENCE (do not reorder):
 *   1. PageHeroSection          — "[Service] in [City]" as H1, CTA
 *   2. LocalIntroSection        — UNIQUE city-specific intro paragraph
 *   3. ServicesInAreaSection    — services available at this location
 *   4. LocalWhyChooseUsSection  — UNIQUE local trust signals
 *   5. LocalTestimonialsSection — reviews mentioning this city
 *   6. AreaFaqSection           — UNIQUE location-specific FAQ
 *   7. NearbyAreasSection       — internal links to adjacent city pages
 *   8. CtaSection               — local urgency CTA
 *
 * SEO requirements:
 *   ✓ generateMetadata with unique title per city
 *   ✓ Canonical = this page's URL (not a redirect to homepage)
 *   ✓ LocalBusiness schema with areaServed = this specific city
 *   ✓ BreadcrumbList schema
 *   ✓ H1 = "[Primary Service] in [City]"
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { siteConfig } from '@/lib/site-config'
import { JsonLd } from '@/components/seo/JsonLd'
import type { AreaPageProps } from '@/types/page-props'

// Section components — built by Pack 4
// UNIQUE CONTENT sections marked with comments below
import { PageHeroSection } from '@/components/sections/PageHeroSection'
import { LocalIntroSection } from '@/components/sections/LocalIntroSection'
import { ServicesInAreaSection } from '@/components/sections/ServicesInAreaSection'
import { LocalWhyChooseUsSection } from '@/components/sections/LocalWhyChooseUsSection'
import { LocalTestimonialsSection } from '@/components/sections/LocalTestimonialsSection'
import { AreaFaqSection } from '@/components/sections/AreaFaqSection'
import { NearbyAreasSection } from '@/components/sections/NearbyAreasSection'
import { CtaSection } from '@/components/sections/CtaSection'

// ─── Static Params ────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return siteConfig.serviceAreas.map((area) => ({
    areaSlug: area.slug,
  }))
}

export const dynamicParams = false

// ─── Metadata ─────────────────────────────────────────────────────────────────
// Title pattern: "[Primary Service] in [City], CA | [Business Name]"
// Pack 5 refines with target keyword research per city.
export async function generateMetadata(
  { params }: AreaPageProps
): Promise<Metadata> {
  const area = siteConfig.serviceAreas.find((a) => a.slug === params.areaSlug)
  if (!area) return {}

  const pageUrl = `${siteConfig.siteUrl}/service-areas/${area.slug}`
  const pageTitle = `${siteConfig.primaryService} in ${area.city}, ${area.state} | ${siteConfig.businessName}`

  // Use area-specific meta description if provided by Pack 5, else build template
  // PACK 5: Replace area.metaDescription with unique city-specific copy
  const pageDescription =
    area.metaDescription ??
    `Looking for ${siteConfig.primaryService} in ${area.city}? ${siteConfig.businessName} serves ${area.city} and nearby areas. Licensed, insured. Call ${siteConfig.contact.phone} for a free estimate.`

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      // Canonical must point to THIS page — not the homepage
      // These are independent pages, not duplicates of the homepage
      canonical: pageUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: siteConfig.businessName,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: `${siteConfig.siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${siteConfig.primaryService} in ${area.city} — ${siteConfig.businessName}`,
        },
      ],
    },
  }
}

// ─── Schema Builders ──────────────────────────────────────────────────────────

function buildLocalBusinessAreaSchema(area: typeof siteConfig.serviceAreas[number]) {
  return {
    '@context': 'https://schema.org',
    // LocalBusiness with location-specific areaServed
    '@type': [siteConfig.schemaType, 'LocalBusiness'],
    '@id': `${siteConfig.siteUrl}/service-areas/${area.slug}/#business-${area.slug}`,
    name: siteConfig.businessName,
    url: `${siteConfig.siteUrl}/service-areas/${area.slug}`,
    telephone: siteConfig.contact.phone,
    // areaServed scoped to THIS city for this page
    areaServed: {
      '@type': 'City',
      name: area.city,
      containedInPlace: {
        '@type': 'State',
        name: area.state,
      },
    },
    address: {
      '@type': 'PostalAddress',
      // Business physical address — NOT the city page's city
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.state,
      postalCode: siteConfig.contact.address.zip,
      addressCountry: 'US',
    },
    // Pack 5 adds: aggregateRating, openingHoursSpecification
  }
}

function buildBreadcrumbSchema(area: typeof siteConfig.serviceAreas[number]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteConfig.siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${siteConfig.primaryService} in ${area.city}`,
        item: `${siteConfig.siteUrl}/service-areas/${area.slug}`,
      },
    ],
  }
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function ServiceAreaPage({ params }: AreaPageProps) {
  const area = siteConfig.serviceAreas.find((a) => a.slug === params.areaSlug)
  if (!area) notFound()

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    {
      label: `${siteConfig.primaryService} in ${area.city}`,
      href: `/service-areas/${area.slug}`,
    },
  ]

  return (
    <>
      {/* LocalBusiness schema with city-specific areaServed */}
      <JsonLd schema={buildLocalBusinessAreaSchema(area)} />
      {/* BreadcrumbList schema */}
      <JsonLd schema={buildBreadcrumbSchema(area)} />

      <main id="main-content" tabIndex={-1}>

        {/*
         * SECTION 1: PAGE HERO
         * ──────────────────────
         * H1 = "[Primary Service] in [City]" — the target search query verbatim.
         * This is the most important on-page SEO signal for local ranking.
         * Must be visible above fold on 375px:
         *   ✓ "[Service] in [City]" as H1
         *   ✓ Phone number (tap-to-call)
         *   ✓ CTA button ("Get a Free Estimate in [City]")
         */}
        <PageHeroSection
          headline={`${siteConfig.primaryService} in ${area.city}, ${area.state}`}
          subheadline={`Serving ${area.city} and surrounding areas. Licensed & insured.`}
          breadcrumbs={breadcrumbItems}
          ctaLabel={`Get a Free Estimate in ${area.city}`}
          backgroundVariant="brand"
        />

        {/*
         * SECTION 2: LOCAL INTRO — ⚠️ UNIQUE CONTENT REQUIRED
         * ──────────────────────────────────────────────────────
         * A paragraph or two that is genuinely specific to this city.
         * NOT: "We serve [City] with the same great service we provide everywhere."
         * YES: Local landmarks, neighborhoods, why this city specifically,
         *      common local issues (e.g., "San Jose's older homes often need..."),
         *      local community ties.
         *
         * PACK 5: area.intro must contain city-specific copy.
         * If area.intro is undefined or identical across cities, STOP and flag it.
         * area.intro is set in siteConfig.serviceAreas[].intro by Pack 5.
         */}
        <LocalIntroSection
          area={area}
          // UNIQUE CONTENT REQUIRED — Pack 5 populates area.intro
        />

        {/*
         * SECTION 3: SERVICES IN THIS AREA
         * ───────────────────────────────────
         * Which services are available in this city.
         * For most clients: all services are available everywhere.
         * If area.availableServiceSlugs[] is defined, filter to those only.
         * Each service links to /services/[slug] for internal link equity.
         */}
        <ServicesInAreaSection area={area} />

        {/*
         * SECTION 4: LOCAL WHY CHOOSE US — ⚠️ UNIQUE CONTENT REQUIRED
         * ──────────────────────────────────────────────────────────────
         * Local trust signals — not the generic homepage differentiators.
         * Mention years serving this specific city.
         * Include local reviews from this city if available.
         * Reference specific neighborhoods or service response times.
         *
         * PACK 5: area.localWhyChooseUs[] must be city-specific.
         */}
        <LocalWhyChooseUsSection
          area={area}
          // UNIQUE CONTENT REQUIRED — Pack 5 provides area.localDifferentiators
        />

        {/*
         * SECTION 5: LOCAL TESTIMONIALS
         * ───────────────────────────────
         * Reviews from customers in this city, filtered by area.slug tag.
         * Falls back to unfiltered testimonials if no city-tagged reviews exist.
         * Do not show 0 testimonials — if none are tagged for this city, show all.
         */}
        <LocalTestimonialsSection
          area={area}
          limit={3}
        />

        {/*
         * SECTION 6: AREA FAQ — ⚠️ UNIQUE CONTENT REQUIRED
         * ──────────────────────────────────────────────────
         * Questions specific to this location:
         *   "How fast can you respond to [City]?"
         *   "Do you service all of [City], including [Neighborhood]?"
         *   "Are you familiar with [City]'s permit requirements?"
         *
         * PACK 5: area.faq[] must contain city-specific Q&A.
         * FAQPage schema injected inside AreaFaqSection component.
         */}
        <AreaFaqSection
          area={area}
          // UNIQUE CONTENT REQUIRED — Pack 5 provides area.faq[]
        />

        {/*
         * SECTION 7: NEARBY AREAS
         * ─────────────────────────
         * Internal links to adjacent city pages.
         * Critical for creating a local SEO "hub and spoke" structure.
         * area.nearbyAreas[] contains slugs of adjacent service area pages.
         * If not defined, shows the 3 nearest areas by geographic proximity
         * (Pack 5 populates nearbyAreas[] from siteConfig).
         */}
        <NearbyAreasSection area={area} />

        {/*
         * SECTION 8: FINAL CTA
         * ──────────────────────
         * Local urgency. Repeat the city name in the CTA headline.
         * "Ready to Book [Service] in [City]? Call Us Now."
         * Phone number visible. Emergency badge if applicable.
         */}
        <CtaSection
          headline={`Ready for ${siteConfig.primaryService} in ${area.city}?`}
          subtext={`We serve ${area.city} and the surrounding area. Call or request a free estimate online.`}
          showEmergency={siteConfig.features.emergency}
        />

      </main>
    </>
  )
}
