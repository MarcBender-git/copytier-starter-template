/**
 * PACK 3: About Page Template
 * =============================
 * Target path: src/app/about/page.tsx
 *
 * The About page is a trust-building page, not a conversion page.
 * Its job: make the visitor confident enough to call or fill the form.
 * Every section reinforces credibility, experience, and local roots.
 *
 * Visitors land here from:
 *   1. "Is this company real and trustworthy?" curiosity (direct navigation)
 *   2. Google search for "[Business Name] reviews" or "[Business Name] about"
 *   3. Internal links from service pages ("Learn about our team →")
 *
 * SECTION ORDER:
 *   1. AboutHeroSection      — headline, tagline, team/owner photo
 *   2. AboutStorySection     — founding story, mission, values
 *   3. TeamSection           — team members (if siteConfig.team[] populated)
 *   4. CredentialsSection    — licenses, certifications, awards, memberships
 *   5. TestimonialsSection   — reviews emphasizing trust and workmanship
 *   6. CtaSection            — "Ready to work with us?" final CTA
 *
 * Trust signals that MUST appear on this page:
 *   ✓ License number (siteConfig.trustSignals.licenseNumber)
 *   ✓ Years in business (siteConfig.trustSignals.yearsInBusiness)
 *   ✓ Service area (siteConfig.primaryCity + surrounding)
 *   ✓ Insurance confirmation
 *
 * SEO:
 *   ✓ generateMetadata with about-specific title/description
 *   ✓ Canonical = /about
 *   ✓ LocalBusiness + Person schema (for owner/founder)
 *   ✓ Breadcrumbs
 */

import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import { JsonLd } from '@/components/seo/JsonLd'

// Section components — built by Pack 4
import { AboutHeroSection } from '@/components/sections/AboutHeroSection'
import { AboutStorySection } from '@/components/sections/AboutStorySection'
import { TeamSection } from '@/components/sections/TeamSection'
import { CredentialsSection } from '@/components/sections/CredentialsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CtaSection } from '@/components/sections/CtaSection'

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: `About ${siteConfig.businessName} | ${siteConfig.primaryCity} ${siteConfig.niche}`,
  description:
    siteConfig.about?.metaDescription ??
    `Learn about ${siteConfig.businessName}, serving ${siteConfig.primaryCity} since ${siteConfig.trustSignals.foundedYear}. ${siteConfig.about?.tagline ?? `Licensed, insured ${siteConfig.niche} professionals.`}`,
  alternates: {
    canonical: `${siteConfig.siteUrl}/about`,
  },
  openGraph: {
    title: `About ${siteConfig.businessName}`,
    description: siteConfig.about?.tagline ?? `Trusted ${siteConfig.niche} serving ${siteConfig.primaryCity}.`,
    url: `${siteConfig.siteUrl}/about`,
    siteName: siteConfig.businessName,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        // Team photo or owner photo preferred for About page OG
        url: siteConfig.about?.ogImage ?? `${siteConfig.siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `The ${siteConfig.businessName} team`,
      },
    ],
  },
}

// ─── Schema Builders ──────────────────────────────────────────────────────────

// LocalBusiness with more detail — reputation signals
function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': [siteConfig.schemaType, 'LocalBusiness'],
    '@id': `${siteConfig.siteUrl}/#business`,
    name: siteConfig.businessName,
    url: siteConfig.siteUrl,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    foundingDate: siteConfig.trustSignals.foundedYear?.toString(),
    description: siteConfig.about?.tagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.state,
      postalCode: siteConfig.contact.address.zip,
      addressCountry: 'US',
    },
    // Pack 5 adds: aggregateRating, hasCredential, memberOf
  }
}

// Person schema for owner/founder — strengthens E-E-A-T signals
function buildOwnerSchema() {
  // Only emit if owner data is populated in siteConfig
  if (!siteConfig.about?.owner) return null

  const owner = siteConfig.about.owner
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.siteUrl}/#owner`,
    name: owner.name,
    jobTitle: owner.title ?? 'Owner',
    worksFor: {
      '@type': 'LocalBusiness',
      '@id': `${siteConfig.siteUrl}/#business`,
      name: siteConfig.businessName,
    },
    image: owner.photo ? `${siteConfig.siteUrl}${owner.photo}` : undefined,
    // description, knowsAbout added by Pack 5
  }
}

function buildBreadcrumbSchema() {
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
        name: 'About',
        item: `${siteConfig.siteUrl}/about`,
      },
    ],
  }
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function AboutPage() {
  const ownerSchema = buildOwnerSchema()

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
  ]

  return (
    <>
      <JsonLd schema={buildLocalBusinessSchema()} />
      {/* Only emit Person schema if owner data exists in siteConfig */}
      {ownerSchema && <JsonLd schema={ownerSchema} />}
      <JsonLd schema={buildBreadcrumbSchema()} />

      <main id="main-content" tabIndex={-1}>

        {/*
         * SECTION 1: ABOUT HERO
         * ───────────────────────
         * First impression. The hero must communicate:
         *   ✓ Business name (H1 or prominent display)
         *   ✓ Years in business / founding year
         *   ✓ The human face of the business (team photo or owner photo)
         *   ✓ One-line tagline (siteConfig.about.tagline)
         *
         * Photo note: A real team photo converts better than stock photography.
         * If siteConfig.about.teamPhoto is set, use it.
         * If only siteConfig.about.owner.photo is available, use that.
         * Fall back to a service photo if no people photos are provided.
         *
         * Layout: 2-column on desktop — text left, photo right.
         */}
        <AboutHeroSection
          breadcrumbs={breadcrumbItems}
        />

        {/*
         * SECTION 2: ABOUT STORY
         * ────────────────────────
         * The founding story. Why this business exists.
         * Content from siteConfig.about.story (multi-paragraph).
         * Pack 5 writes this copy from the Build Brief's "Client Business Data" section.
         *
         * Must include within this section:
         *   ✓ Year founded
         *   ✓ Why the owner started the business (personal motivation)
         *   ✓ Geographic roots ("born and raised in [City]" if applicable)
         *   ✓ Company mission or values
         *
         * Tone: Personal, warm, credible. Not corporate. Not boastful.
         * Avoid: "We are committed to excellence" generics.
         * Use: Real details, specific claims, personal story beats.
         *
         * Layout: Full-width text with optional supporting image.
         */}
        <AboutStorySection />

        {/*
         * SECTION 3: TEAM
         * ─────────────────
         * Only rendered if siteConfig.team[] has entries.
         * Team cards: photo, name, title, years with company.
         * Shows the humans behind the business — critical for home entry trust.
         * ("Who is coming into my house?" is the visitor's real concern.)
         *
         * If siteConfig.team is empty or undefined, this section is omitted.
         * Do not render empty team sections with placeholder avatars.
         */}
        {siteConfig.team && siteConfig.team.length > 0 && (
          <TeamSection />
        )}

        {/*
         * SECTION 4: CREDENTIALS
         * ────────────────────────
         * Licenses, certifications, associations, awards.
         * From siteConfig.credentials[].
         * Each credential: logo or badge image, name, issuing body, year if relevant.
         *
         * Must include:
         *   ✓ State contractor license number (siteConfig.trustSignals.licenseNumber)
         *   ✓ Insurance carrier confirmation
         *   ✓ Any manufacturer certifications (e.g., Carrier Factory Authorized)
         *   ✓ BBB accreditation if applicable
         *   ✓ Trade association memberships (PHCC, ACCA, NARI, etc.)
         *
         * Layout: Horizontal badge/logo row. Centered. Sufficient whitespace.
         */}
        <CredentialsSection />

        {/*
         * SECTION 5: TESTIMONIALS
         * ─────────────────────────
         * Reviews that emphasize trust and quality of work.
         * No filter — show best all-time reviews here.
         * Minimum 3. Prefer reviews that mention: professionalism, reliability,
         * on-time, clean work, would-hire-again sentiments.
         */}
        <TestimonialsSection limit={3} variant="grid" />

        {/*
         * SECTION 6: FINAL CTA
         * ──────────────────────
         * "Ready to work with us?"
         * After reading the story and seeing the credentials,
         * this CTA converts trust into action.
         * Keep it warm and personal — match the tone of the About page.
         * Headline: "Let's Work Together" or "Ready to Get Started?"
         * NOT the high-urgency emergency language of the homepage CTA.
         */}
        <CtaSection
          headline={siteConfig.about?.ctaHeadline ?? "Ready to Work With Us?"}
          subtext={siteConfig.about?.ctaSubtext ?? `Get in touch with the ${siteConfig.businessName} team today.`}
          primaryLabel="Get a Free Estimate"
          primaryHref="/contact"
          showEmergency={false}
          variant="brand"
        />

      </main>
    </>
  )
}
