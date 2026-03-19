/**
 * privacy-policy.template.tsx
 *
 * Pack 7 — Privacy Policy Page Template
 *
 * HOW TO USE:
 * 1. Copy to src/app/privacy/page.tsx
 * 2. Import siteConfig and replace all placeholder values
 * 3. Update the LAST_UPDATED constant to today's date
 * 4. Verify that the third-party list in Section 3 matches the actual integrations
 * 5. Test: pnpm build → verify no TypeScript errors
 *
 * DO NOT publish with placeholder text. Every [BRACKET] value must be real.
 *
 * SUBSTITUTIONS REQUIRED:
 *   [COMPANY_NAME]    → siteConfig.business.name
 *   [CITY]            → siteConfig.business.city
 *   [STATE]           → siteConfig.business.state (always "California" for Copytier)
 *   [PRIVACY_EMAIL]   → siteConfig.contact.email
 *   [PRIVACY_PHONE]   → siteConfig.contact.phone
 *   [LAST_UPDATED]    → today's date in "Month DD, YYYY" format
 */

import type { Metadata } from 'next'
import { siteConfig } from '@/config/site.config'

// ─── Update this date whenever the privacy policy changes ─────────────────────
const LAST_UPDATED = 'March 18, 2026' // UPDATE THIS

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.business.name}`,
  description: `Privacy policy for ${siteConfig.business.name}. Learn how we collect, use, and protect your personal information, and understand your California privacy rights.`,
  robots: {
    index: false,  // noindex — not a ranking page
    follow: false,
  },
}

export default function PrivacyPolicyPage() {
  const { name, city, state } = siteConfig.business
  const { email, phone } = siteConfig.contact

  return (
    <main className="min-h-screen bg-white">
      {/* ── Page Header ──────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-b border-gray-200 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl font-bold text-gray-900 sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-base text-gray-500">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* ── Policy Content ────────────────────────────────────────────────────── */}
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose prose-gray max-w-none prose-headings:font-heading prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700">

          {/* ── Introduction ─────────────────────────────────────────────────── */}
          <p className="text-lg text-gray-700 leading-relaxed">
            {name} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to
            protecting your privacy. This Privacy Policy explains how we collect,
            use, and share information about you when you visit our website or
            contact us for services. We serve customers in {city}, {state} and
            surrounding areas.
          </p>

          {/* ── Section 1: Information We Collect ────────────────────────────── */}
          <h2>1. Information We Collect</h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Information You Provide to Us
          </h3>
          <p>
            When you fill out a contact form or request a quote on our website,
            we collect:
          </p>
          <ul>
            <li>Your name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Service address (if provided)</li>
            <li>Description of your service needs</li>
            <li>Preferred contact method and timing</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Information Collected Automatically
          </h3>
          <p>
            When you visit our website, we and our analytics provider automatically
            collect certain information about your device and browsing activity,
            including:
          </p>
          <ul>
            <li>IP address (anonymized before storage)</li>
            <li>Browser type and version</li>
            <li>Device type and operating system</li>
            <li>Pages you visit and time spent on each page</li>
            <li>Referring website (if any)</li>
            <li>Date and time of your visit</li>
          </ul>
          <p>
            This information is collected using cookies and similar tracking
            technologies only after you consent to their use via the cookie
            consent banner displayed on your first visit.
          </p>

          {/* ── Section 2: How We Use Your Information ───────────────────────── */}
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to your service inquiries and schedule appointments</li>
            <li>Provide you with quotes and estimates</li>
            <li>Send you appointment confirmations and reminders (with your consent)</li>
            <li>Improve our website and understand how visitors use it</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p>
            We do not use your information for automated decision-making or
            profiling that produces legal or similarly significant effects.
          </p>

          {/* ── Section 3: Who We Share Information With ─────────────────────── */}
          <h2>3. Who We Share Your Information With</h2>
          <p>
            We do not sell your personal information. We share information only
            with the following service providers that help us operate our business:
          </p>

          <div className="overflow-x-auto mt-4 mb-6">
            <table className="min-w-full border border-gray-200 rounded-lg text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Provider</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Purpose</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Data Shared</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-gray-700">Google Analytics 4</td>
                  <td className="px-4 py-3 text-gray-700">Website analytics</td>
                  <td className="px-4 py-3 text-gray-700">Anonymized IP, browsing behavior</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">Supabase</td>
                  <td className="px-4 py-3 text-gray-700">Database infrastructure</td>
                  <td className="px-4 py-3 text-gray-700">Form submission data</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">Resend</td>
                  <td className="px-4 py-3 text-gray-700">Email delivery</td>
                  <td className="px-4 py-3 text-gray-700">Name, email, message content</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">Google Maps</td>
                  <td className="px-4 py-3 text-gray-700">Map display on website</td>
                  <td className="px-4 py-3 text-gray-700">IP address (via embed)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">Vercel</td>
                  <td className="px-4 py-3 text-gray-700">Website hosting</td>
                  <td className="px-4 py-3 text-gray-700">Server logs (auto-deleted after 30 days)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Each of these providers processes data only as directed by us and is
            contractually prohibited from using your data for their own purposes.
          </p>

          {/* ── Section 4: How Long We Keep Your Information ─────────────────── */}
          <h2>4. How Long We Keep Your Information</h2>
          <ul>
            <li>
              <strong>Contact form submissions:</strong> Retained for 2 years
              to support warranty claims and service history, then deleted.
            </li>
            <li>
              <strong>Google Analytics data:</strong> Retained for 14 months
              per Google&apos;s data retention settings, then automatically deleted.
            </li>
            <li>
              <strong>Email records:</strong> Retained for 30 days in our email
              provider&apos;s logs, then deleted.
            </li>
            <li>
              <strong>Server logs:</strong> Automatically deleted after 30 days
              by our hosting provider.
            </li>
          </ul>

          {/* ── Section 5: Your California Privacy Rights (CCPA) ─────────────── */}
          <h2>5. Your California Privacy Rights</h2>
          <p>
            If you are a California resident, the California Consumer Privacy Act
            (CCPA) and California Privacy Rights Act (CPRA) give you specific
            rights regarding your personal information:
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Right to Know
          </h3>
          <p>
            You have the right to request that we disclose what personal
            information we have collected about you, the categories of sources
            we collected it from, the business purpose for collecting it, and
            the categories of third parties we shared it with.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Right to Delete
          </h3>
          <p>
            You have the right to request that we delete personal information
            we have collected from you, subject to certain exceptions (such as
            information needed to complete a transaction you requested).
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Right to Correct
          </h3>
          <p>
            You have the right to request that we correct inaccurate personal
            information we hold about you.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Right to Opt Out of Sharing
          </h3>
          <p>
            We share browsing data with Google Analytics for website analytics
            purposes. Under CPRA, you have the right to opt out of this sharing.
            You can exercise this right by clicking &ldquo;Cookie Preferences&rdquo; in
            our website footer and selecting &ldquo;Decline.&rdquo;
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Right to Non-Discrimination
          </h3>
          <p>
            We will not discriminate against you for exercising any of your
            CCPA rights. Exercising these rights will not affect your ability
            to receive quotes or services from us.
          </p>

          {/* ── Section 6: How to Exercise Your Rights ───────────────────────── */}
          <h2>6. How to Exercise Your Rights</h2>
          <p>
            To submit a request to know, delete, or correct your personal
            information, please contact us by:
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{' '}
              <a
                href={`mailto:${email}`}
                className="text-primary hover:underline"
              >
                {email}
              </a>
            </li>
            <li>
              <strong>Phone:</strong>{' '}
              <a
                href={`tel:${phone.replace(/\D/g, '')}`}
                className="text-primary hover:underline"
              >
                {phone}
              </a>
            </li>
          </ul>
          <p>
            We will respond to verified requests within 45 days. We may need to
            verify your identity before processing your request by asking you to
            confirm the name and email address you used when contacting us.
          </p>
          <p>
            You may designate an authorized agent to submit a request on your behalf.
            We will require written authorization from you and may verify your
            identity directly.
          </p>

          {/* ── Section 7: Do Not Sell or Share ──────────────────────────────── */}
          <h2>7. Do Not Sell or Share My Personal Information</h2>
          <p>
            We do not sell your personal information. We share browsing data
            with Google Analytics as described in Section 3 above. To opt out
            of this sharing:
          </p>
          <ol>
            <li>Click &ldquo;Cookie Preferences&rdquo; in the footer of any page on our website.</li>
            <li>Select &ldquo;Decline&rdquo; in the cookie consent panel.</li>
            <li>Google Analytics will no longer receive data from your visits.</li>
          </ol>
          <p>
            Your opt-out preference will be saved for 12 months. After that, we
            will ask for your preference again.
          </p>

          {/* ── Section 8: Cookies ────────────────────────────────────────────── */}
          <h2>8. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar technologies to operate our website and
            understand how it is used. We use two types of cookies:
          </p>
          <ul>
            <li>
              <strong>Strictly necessary cookies:</strong> Required for the
              website to function. These include cookies that remember your
              cookie consent preference. These are set regardless of your choice.
            </li>
            <li>
              <strong>Analytics cookies:</strong> Used by Google Analytics to
              understand how visitors use our site. These are only set after
              you accept cookies via our consent banner.
            </li>
          </ul>
          <p>
            You can manage your cookie preferences at any time via the
            &ldquo;Cookie Preferences&rdquo; link in our footer.
          </p>

          {/* ── Section 9: Changes to This Policy ───────────────────────────── */}
          <h2>9. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices, technology, legal requirements, or other
            factors. When we make material changes, we will update the
            &ldquo;Last updated&rdquo; date at the top of this page.
          </p>
          <p>
            We encourage you to review this Privacy Policy periodically to stay
            informed about how we protect your information. Your continued use of
            our website after any changes constitutes acceptance of the updated policy.
          </p>

          {/* ── Section 10: Contact Us ────────────────────────────────────────── */}
          <h2>10. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our privacy
            practices, please contact us:
          </p>
          <address className="not-italic mt-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <strong className="text-gray-900 text-base">{name}</strong>
            <br />
            <span className="text-gray-600">{city}, {state}</span>
            <br />
            <a
              href={`tel:${phone.replace(/\D/g, '')}`}
              className="text-primary hover:underline mt-2 inline-block"
            >
              {phone}
            </a>
            <br />
            <a
              href={`mailto:${email}`}
              className="text-primary hover:underline"
            >
              {email}
            </a>
          </address>

        </div>
      </article>
    </main>
  )
}
