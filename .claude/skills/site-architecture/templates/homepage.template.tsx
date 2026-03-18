/**
 * PACK 3: Homepage Template
 * =========================
 * Target path: src/app/page.tsx
 *
 * This is a React Server Component (RSC) — no 'use client' directive.
 * All section components are imported from @/components/sections/.
 * Pack 4 (Component Library) builds the actual section implementations.
 * Pack 5 (Content & SEO) fills in copy, meta descriptions, and schema details.
 *
 * CONVERSION SEQUENCE (do not reorder):
 *   1. HeroSection          — above-fold: headline, CTA, trust signal
 *   2. TrustBarSection      — rating, years, license, guarantee
 *   3. ServicesGridSection  — all services, links to service pages
 *   4. WhyChooseUsSection   — differentiators, credentials
 *   5. TestimonialsSection  — Google reviews, star ratings
 *   6. ProcessSection       — How It Works (removes friction)
 *   7. ServiceAreaSection   — cities served
 *   8. FaqSection           — common questions + FAQPage schema
 *   9. CtaSection           — final conversion block
 *
 * NEVER reorder these sections without a documented conversion reason.
 * NEVER animate the HeroSection — it contains the LCP element.
 */

import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import { JsonLd } from '@/components/seo/JsonLd'

// Section components — built by Pack 4
import { HeroSection } from '@/components/sections/HeroSection'
import { TrustBarSection } from '@/components/sections/TrustBarSection'
import { ServicesGridSection } from '@/components/sections/ServicesGridSection'
import { WhyChooseUsSection } from '@/components/sections/WhyChooseUsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { ServiceAreaSection } from '@/components/sections/ServiceAreaSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { CtaSection } from '@/components/sections/CtaSection'

// ─── Metadata ─────────────────────────────────────────────────────────────────
// Pack 5 refines title and description with keyword research.
// Pack 3 establishes the correct pattern and placeholder values.
export const metadata: Metadata = {
  title: `${siteConfig.niche} in ${siteConfig.primaryCity} | ${siteConfig.businessName}`,
  description: siteConfig.metaDescription.homepage,
  alternates: {
    // Self-referencing canonical — no trailing slash
    canonical: siteConfig.siteUrl,
  },
  openGraph: {
    title: `${siteConfig.businessName} | ${siteConfig.niche} in ${siteConfig.primaryCity}`,
    description: siteConfig.metaDescription.homepage,
    url: siteConfig.siteUrl,
    siteName: siteConfig.businessName,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${siteConfig.siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.businessName} — ${siteConfig.niche} in ${siteConfig.primaryCity}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.businessName} | ${siteConfig.niche}`,
    description: siteConfig.metaDescription.homepage,
  },
}

// ─── LocalBusiness Schema ─────────────────────────────────────────────────────
// Schema type comes from siteConfig.schemaType (e.g., 'Plumber', 'HVACBusiness')
// Pack 5 expands this with additional fields (openingHours, aggregateRating).
function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': [siteConfig.schemaType, 'LocalBusiness'],
    '@id': `${siteConfig.siteUrl}/#business`,
    name: siteConfig.businessName,
    url: siteConfig.siteUrl,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    description: siteConfig.metaDescription.homepage,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.state,
      postalCode: siteConfig.contact.address.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.contact.geo?.lat,
      longitude: siteConfig.contact.geo?.lng,
    },
    areaServed: siteConfig.serviceAreas.map((area) => ({
      '@type': 'City',
      name: area.city,
      containedInPlace: {
        '@type': 'State',
        name: area.state,
      },
    })),
    // aggregateRating added by Pack 5 when review data is finalized
    // openingHoursSpecification added by Pack 5 from siteConfig.hours
    sameAs: [
      siteConfig.social?.google,
      siteConfig.social?.facebook,
      siteConfig.social?.yelp,
    ].filter(Boolean),
    image: `${siteConfig.siteUrl}/images/logo.png`,
    priceRange: siteConfig.priceRange ?? '$$',
    currenciesAccepted: 'USD',
    paymentAccepted: siteConfig.paymentMethods?.join(', '),
  }
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* LocalBusiness structured data — page-level schema */}
      <JsonLd schema={buildLocalBusinessSchema()} />

      <main id="main-content" tabIndex={-1}>

        {/*
         * SECTION 1: HERO
         * ────────────────
         * The most critical section on the entire site.
         * Must be visible above the fold on 375px mobile without scrolling:
         *   ✓ H1 with primary service + city
         *   ✓ Subheadline with key differentiator
         *   ✓ Primary CTA button (Get Free Estimate / Call Now)
         *   ✓ Secondary CTA (phone number as tap-to-call)
         *   ✓ At least one trust signal (rating, years, or license)
         *
         * DO NOT animate this section. fetchpriority="high" on hero image.
         * Pack 4 builds the implementation. Pack 5 writes the H1 copy.
         */}
        <HeroSection />

        {/*
         * SECTION 2: TRUST BAR
         * ──────────────────────
         * Immediately reinforces credibility right after the CTA.
         * Renders as a horizontal strip of 4 metrics:
         *   • Star rating (e.g., "4.9 ★") sourced from siteConfig.trustSignals.rating
         *   • Review count (e.g., "200+ Reviews") from siteConfig.trustSignals.reviewCount
         *   • Years in business from siteConfig.trustSignals.yearsInBusiness
         *   • License number from siteConfig.trustSignals.licenseNumber
         * On mobile: 2×2 grid.
         */}
        <TrustBarSection />

        {/*
         * SECTION 3: SERVICES GRID
         * ──────────────────────────
         * Presents all services from siteConfig.services[].
         * Each service card links to its individual service page.
         * Grid: 1 col mobile → 2 col sm → 3 col lg.
         * This section serves double duty: UX navigation + internal link equity.
         */}
        <ServicesGridSection />

        {/*
         * SECTION 4: WHY CHOOSE US
         * ──────────────────────────
         * Differentiators from siteConfig.differentiators[].
         * Addresses the visitor's implicit question: "Why you and not someone else?"
         * Should include: guarantee, response time, years of experience,
         * license/insurance, family-owned if applicable.
         * NOT a generic "we're great" list — specific and verifiable claims only.
         */}
        <WhyChooseUsSection />

        {/*
         * SECTION 5: TESTIMONIALS
         * ─────────────────────────
         * Social proof. The single highest-trust conversion element after phone number.
         * Renders 3 testimonials from siteConfig.testimonials[] (highest-rated first).
         * Pack 5 adds Review schema inside TestimonialsSection component.
         * Minimum 3 testimonials. If fewer exist in siteConfig, flag for client.
         */}
        <TestimonialsSection limit={3} />

        {/*
         * SECTION 6: PROCESS
         * ────────────────────
         * "How It Works" — 3-4 steps from siteConfig.process[].
         * Reduces friction by showing the visitor exactly what happens next.
         * Typical flow: Call/Book → Assessment → Work Begins → Done & Guaranteed.
         * Dark brand background variant works well here for visual contrast rhythm.
         */}
        <ProcessSection />

        {/*
         * SECTION 7: SERVICE AREA
         * ─────────────────────────
         * Cities served from siteConfig.serviceAreas[].
         * Each city links to its service area page (internal link equity).
         * Default variant: badge grid. Map variant if siteConfig has geo coordinates.
         * Reinforces local relevance for Google's local search ranking signals.
         */}
        <ServiceAreaSection />

        {/*
         * SECTION 8: FAQ
         * ────────────────
         * 4-6 questions from siteConfig.faq.homepage[].
         * FAQPage schema is injected inside FaqSection (co-located with content).
         * Questions should address: pricing, response time, service area,
         * licensing, guarantees. Pack 5 writes the Q&A copy.
         */}
        <FaqSection />

        {/*
         * SECTION 9: FINAL CTA
         * ──────────────────────
         * Last section before footer. Restates the offer and removes final hesitation.
         * Shows emergency service availability if siteConfig.features.emergency = true.
         * High-contrast background (accent orange or brand dark) to signal importance.
         * The phone number here must match siteConfig.contact.phone exactly.
         */}
        <CtaSection showEmergency={siteConfig.features.emergency} />

      </main>
    </>
  )
}
