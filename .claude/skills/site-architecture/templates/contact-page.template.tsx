/**
 * PACK 3: Contact Page Template
 * ================================
 * Target path: src/app/contact/page.tsx
 *
 * The contact page has one job: convert a visitor into a lead.
 * Every layout and content decision must serve that goal.
 *
 * CRITICAL LAYOUT RULE:
 * The contact form must be the FIRST interactive element after the H1.
 * Visible above the fold on mobile WITHOUT scrolling.
 * Never push the form below a map, testimonials, or contact info block.
 *
 * SECTION ORDER:
 *   1. ContactHeroSection  — H1, phone large, brief statement
 *   2. ContactFormSection  — the form (FIRST and DOMINANT)
 *   3. ContactInfoSection  — address, hours, alternate contacts
 *   4. ServiceAreaSection  — reinforces we serve their area
 *
 * NOTE: No Final CTA section — the entire page IS the CTA.
 * Do not add a second CTA block at the bottom.
 *
 * SEO:
 *   ✓ generateMetadata with contact-specific title/description
 *   ✓ Canonical = /contact
 *   ✓ LocalBusiness schema with full contact details
 *   ✓ Breadcrumbs
 */

import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import { JsonLd } from '@/components/seo/JsonLd'

// Section components — built by Pack 4
import { ContactHeroSection } from '@/components/sections/ContactHeroSection'
import { ContactFormSection } from '@/components/sections/ContactFormSection'
import { ContactInfoSection } from '@/components/sections/ContactInfoSection'
import { ServiceAreaSection } from '@/components/sections/ServiceAreaSection'

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: `Contact ${siteConfig.businessName} | ${siteConfig.primaryCity} ${siteConfig.niche}`,
  description: `Contact ${siteConfig.businessName}. Call ${siteConfig.contact.phone} or submit an estimate request. Serving ${siteConfig.primaryCity} and surrounding areas. Fast response guaranteed.`,
  alternates: {
    canonical: `${siteConfig.siteUrl}/contact`,
  },
  openGraph: {
    title: `Contact ${siteConfig.businessName}`,
    description: `Call ${siteConfig.contact.phone} or request a free estimate online.`,
    url: `${siteConfig.siteUrl}/contact`,
    siteName: siteConfig.businessName,
    locale: 'en_US',
    type: 'website',
  },
  // Discourage indexing of thank-you parameters
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

// ─── Schema Builder ───────────────────────────────────────────────────────────
// Full LocalBusiness schema with contact details + opening hours.
// This is the most complete version of the schema across the site.
function buildContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': [siteConfig.schemaType, 'LocalBusiness'],
    '@id': `${siteConfig.siteUrl}/#business`,
    name: siteConfig.businessName,
    url: siteConfig.siteUrl,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
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
    // openingHoursSpecification: Pack 5 populates from siteConfig.hours
    // Format: { '@type': 'OpeningHoursSpecification', dayOfWeek: [...], opens: '08:00', closes: '18:00' }
    areaServed: siteConfig.serviceAreas.map((area) => ({
      '@type': 'City',
      name: area.city,
    })),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phone,
      contactType: 'customer service',
      availableLanguage: 'English',
      // areaServed: used for local business, not contact point
    },
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
        name: 'Contact',
        item: `${siteConfig.siteUrl}/contact`,
      },
    ],
  }
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function ContactPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <>
      <JsonLd schema={buildContactPageSchema()} />
      <JsonLd schema={buildBreadcrumbSchema()} />

      <main id="main-content" tabIndex={-1}>

        {/*
         * SECTION 1: CONTACT HERO
         * ─────────────────────────
         * Minimal hero — this page's job is conversion, not inspiration.
         * Above fold on 375px must show:
         *   ✓ "Contact Us" H1 (or equivalent)
         *   ✓ Large phone number as tap-to-call link
         *   ✓ Brief trust statement ("Fast response • Licensed & Insured")
         *
         * Hero is shorter than homepage hero — don't waste vertical space
         * that should be occupied by the form.
         * No hero background image — performance over aesthetics here.
         */}
        <ContactHeroSection
          headline="Contact Us"
          subheadline={`Call ${siteConfig.contact.phone} or fill out the form below — we'll respond within 1 business hour.`}
          breadcrumbs={breadcrumbItems}
        />

        {/*
         * SECTION 2: CONTACT FORM — THE PRIMARY CONVERSION ELEMENT
         * ───────────────────────────────────────────────────────────
         * This section must appear FIRST after the hero. Non-negotiable.
         * The form occupies 7 of 12 columns on desktop; contact info takes 5.
         *
         * Form fields (from Pack 6 — Backend & Integrations):
         *   • Name (required)
         *   • Phone (required, tel input)
         *   • Email (required)
         *   • Service needed (select from siteConfig.services[])
         *   • Message / description (optional textarea)
         *   • Honeypot field (hidden, anti-spam — NEVER CAPTCHA)
         *
         * The form submits to a Server Action defined in Pack 6.
         * On success: show thank-you message inline (no redirect).
         * On error: show field-level error messages inline.
         *
         * Pack 6 wires the Supabase submission and email notification.
         * Pack 4 builds the visual form component.
         * Pack 3 defines the section slot and column layout.
         */}
        <ContactFormSection
          // Services dropdown populated from siteConfig.services[]
          services={siteConfig.services}
          // Pack 6 provides the Server Action for form submission
          // formAction={submitContactForm}  ← added by Pack 6
        />

        {/*
         * SECTION 3: CONTACT INFO
         * ─────────────────────────
         * Secondary contact methods for visitors who won't fill the form.
         * Must include:
         *   • Phone (large, tap-to-call)
         *   • Email
         *   • Physical address (renders as <address> for schema)
         *   • Hours of operation (from siteConfig.hours)
         *   • Embedded map (Google Maps iframe or static map image)
         *
         * The map is decorative — it is NOT the primary conversion mechanism.
         * Keep it visually present but not dominant. The form is dominant.
         *
         * Accessibility: Google Maps iframes need title="[Business] location map"
         */}
        <ContactInfoSection />

        {/*
         * SECTION 4: SERVICE AREA
         * ─────────────────────────
         * Reassures visitors that we serve their area before they leave.
         * Uses the same ServiceAreaSection component as the homepage.
         * Badge variant preferred here — no map (already shown above).
         *
         * This section answers the implicit question:
         * "Do they actually come to my city?"
         */}
        <ServiceAreaSection variant="badges" />

        {/*
         * NO FINAL CTA SECTION
         * ──────────────────────
         * The contact page IS the CTA. Adding a "Contact Us" CTA at the bottom
         * of the contact page is redundant and dilutes the page's singular focus.
         * The footer's phone number and form link are sufficient.
         */}

      </main>
    </>
  )
}
