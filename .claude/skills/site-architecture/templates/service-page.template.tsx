/**
 * PACK 3: Service Page Template
 * ==============================
 * Target path: src/app/services/[serviceSlug]/page.tsx
 *
 * Renders one page per service defined in siteConfig.services[].
 * generateStaticParams() pre-renders all service slugs at build time.
 * dynamicParams = false — any slug not in siteConfig returns 404.
 *
 * CONVERSION SEQUENCE (do not reorder):
 *   1. PageHeroSection         — service name as H1, service CTA
 *   2. ServiceOverviewSection  — what this service includes
 *   3. ServiceBenefitsSection  — service-specific benefits (not generic)
 *   4. ServiceProcessSection   — how THIS service is delivered
 *   5. TestimonialsSection     — filtered to this service if possible
 *   6. ServiceFaqSection       — service-specific FAQ + FAQPage schema
 *   7. RelatedServicesSection  — internal links to other services
 *   8. CtaSection              — service-specific final CTA
 *
 * SEO requirements:
 *   ✓ generateMetadata with unique title and description per service
 *   ✓ Self-referencing canonical URL
 *   ✓ Service + LocalBusiness JSON-LD schema
 *   ✓ Breadcrumbs with BreadcrumbList schema
 *   ✓ H1 = service name (never generic "Welcome to" copy)
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { siteConfig } from '@/lib/site-config'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import type { ServicePageProps } from '@/types/page-props'

// Section components — built by Pack 4
import { PageHeroSection } from '@/components/sections/PageHeroSection'
import { ServiceOverviewSection } from '@/components/sections/ServiceOverviewSection'
import { ServiceBenefitsSection } from '@/components/sections/ServiceBenefitsSection'
import { ServiceProcessSection } from '@/components/sections/ServiceProcessSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { ServiceFaqSection } from '@/components/sections/ServiceFaqSection'
import { RelatedServicesSection } from '@/components/sections/RelatedServicesSection'
import { CtaSection } from '@/components/sections/CtaSection'

// ─── Static Params ────────────────────────────────────────────────────────────
// Pre-renders one page per service at build time.
// Required for reliable Googlebot crawling and indexing.
export async function generateStaticParams() {
  return siteConfig.services.map((service) => ({
    serviceSlug: service.slug,
  }))
}

// Prevents dynamic rendering for unknown slugs — returns 404 instead
export const dynamicParams = false

// ─── Metadata ─────────────────────────────────────────────────────────────────
// Unique title and description per service page.
// Pack 5 refines these with keyword research.
export async function generateMetadata(
  { params }: ServicePageProps
): Promise<Metadata> {
  const service = siteConfig.services.find((s) => s.slug === params.serviceSlug)

  // Shouldn't be reached due to dynamicParams = false, but TypeScript requires it
  if (!service) return {}

  const pageUrl = `${siteConfig.siteUrl}/services/${service.slug}`
  const pageTitle = `${service.name} in ${siteConfig.primaryCity} | ${siteConfig.businessName}`
  // Use service-specific meta description if available, else build from template
  const pageDescription =
    service.metaDescription ??
    `${siteConfig.businessName} offers professional ${service.name} in ${siteConfig.primaryCity} and surrounding areas. Licensed, insured. Call ${siteConfig.contact.phone} for a free estimate.`

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
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
          // Service-specific OG image if available, else site default
          url: service.ogImage ?? `${siteConfig.siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${service.name} — ${siteConfig.businessName}`,
        },
      ],
    },
  }
}

// ─── Schema Builders ──────────────────────────────────────────────────────────

function buildServiceSchema(service: typeof siteConfig.services[number]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteConfig.siteUrl}/services/${service.slug}/#service`,
    name: service.name,
    description: service.description,
    url: `${siteConfig.siteUrl}/services/${service.slug}`,
    provider: {
      '@type': siteConfig.schemaType,
      '@id': `${siteConfig.siteUrl}/#business`,
      name: siteConfig.businessName,
      telephone: siteConfig.contact.phone,
      url: siteConfig.siteUrl,
    },
    areaServed: siteConfig.serviceAreas.map((area) => ({
      '@type': 'City',
      name: area.city,
    })),
    // serviceType, offers, hoursAvailable added by Pack 5
  }
}

function buildBreadcrumbSchema(service: typeof siteConfig.services[number]) {
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
        name: service.name,
        item: `${siteConfig.siteUrl}/services/${service.slug}`,
      },
    ],
  }
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function ServicePage({ params }: ServicePageProps) {
  // Resolve service data from slug
  const service = siteConfig.services.find((s) => s.slug === params.serviceSlug)

  // Guard: dynamicParams = false should prevent this, but TypeScript safety
  if (!service) notFound()

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: service.name, href: `/services/${service.slug}` },
  ]

  return (
    <>
      {/* Service structured data */}
      <JsonLd schema={buildServiceSchema(service)} />
      {/* BreadcrumbList schema */}
      <JsonLd schema={buildBreadcrumbSchema(service)} />

      <main id="main-content" tabIndex={-1}>

        {/*
         * SECTION 1: PAGE HERO
         * ──────────────────────
         * service.name is the H1 — always. No "Welcome to" or marketing copy as H1.
         * Breadcrumbs sit above the hero headline per UX convention.
         * Must be visible above fold on 375px:
         *   ✓ Service name as H1
         *   ✓ Brief service tagline (service.tagline)
         *   ✓ Primary CTA: "Get Free Estimate" or "Call for [service.name]"
         *   ✓ Phone number as secondary CTA (tap-to-call)
         */}
        <PageHeroSection
          headline={service.name}
          subheadline={service.tagline}
          breadcrumbs={breadcrumbItems}
          ctaLabel={`Get Free ${service.name} Estimate`}
          backgroundVariant="brand"
        />

        {/*
         * SECTION 2: SERVICE OVERVIEW
         * ─────────────────────────────
         * What this service includes. H2 heading. 3-4 descriptive paragraphs.
         * 2-column layout on desktop: text left, service image right.
         * Content comes from service.description and service.includes[].
         * Pack 5 expands this to 200-400 words of unique copy.
         */}
        <ServiceOverviewSection service={service} />

        {/*
         * SECTION 3: SERVICE-SPECIFIC BENEFITS
         * ───────────────────────────────────────
         * NOT the generic homepage "why choose us" list.
         * These benefits are specific to THIS service.
         * e.g., Water Heater page: "Same-Day Installation", "All Brands Serviced",
         *        "10-Year Parts Warranty", "Energy-Efficient Upgrades Available"
         * Content comes from service.benefits[].
         */}
        <ServiceBenefitsSection service={service} />

        {/*
         * SECTION 4: SERVICE PROCESS
         * ────────────────────────────
         * Steps specific to how THIS service is delivered.
         * If service.process[] is defined, use it.
         * If not, fall back to siteConfig.process[] (generic steps).
         * Shows the visitor exactly what to expect — reduces call anxiety.
         */}
        <ServiceProcessSection service={service} />

        {/*
         * SECTION 5: TESTIMONIALS
         * ─────────────────────────
         * Filter to reviews mentioning this service if service.slug is in review tags.
         * Falls back to all reviews if no service-specific reviews exist.
         * Minimum 2 testimonials. Never show fewer — it looks worse than none.
         */}
        <TestimonialsSection
          filter={service.slug}
          limit={3}
          variant="grid"
        />

        {/*
         * SECTION 6: SERVICE FAQ
         * ───────────────────────
         * Questions specific to this service from service.faq[].
         * Falls back to siteConfig.faq.service[] generic service FAQ if not defined.
         * FAQPage JSON-LD schema is injected INSIDE ServiceFaqSection component
         * (co-located with content, not in the page head).
         * Pack 5 writes the Q&A copy. Pack 3 scaffolds the slot.
         */}
        <ServiceFaqSection service={service} />

        {/*
         * SECTION 7: RELATED SERVICES
         * ─────────────────────────────
         * Links to other service pages — critical for internal link equity.
         * Excludes the current service. Shows up to 3 related services.
         * If service.relatedSlugs[] is defined, use those; else show random 3.
         * Label: "Other Services We Offer" or "Explore Related Services"
         */}
        <RelatedServicesSection
          currentSlug={service.slug}
          limit={3}
        />

        {/*
         * SECTION 8: FINAL CTA
         * ──────────────────────
         * Service-specific final offer. Reinstate urgency.
         * If the service is emergency-capable, show "Available 24/7" here.
         * Headline can be service-specific: "Need [service.name]? We're Ready."
         * Phone number repeated — last chance to convert before the footer.
         */}
        <CtaSection
          headline={service.ctaHeadline ?? `Need ${service.name}? We're Ready.`}
          subtext={service.ctaSubtext}
          showEmergency={service.emergency ?? siteConfig.features.emergency}
        />

      </main>
    </>
  )
}
