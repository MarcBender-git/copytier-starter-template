'use client'

/**
 * CookieConsent.template.tsx
 *
 * Pack 7 — CCPA-compliant cookie consent component
 *
 * HOW TO USE:
 * 1. Copy to src/components/layout/CookieConsent.tsx
 * 2. Replace NOTHING — this is ready to use as-is
 * 3. Wire into src/app/layout.tsx (see bottom of this file)
 * 4. Ensure siteConfig.integrations.googleAnalyticsId is set
 * 5. Add "Cookie Preferences" button to Footer (see bottom of this file)
 *
 * WHAT THIS DOES:
 * - Shows consent banner on first visit
 * - Blocks GA4 until user accepts
 * - Persists decision in localStorage for 12 months
 * - Supports re-opening via custom event from footer
 * - Fully accessible (ARIA, keyboard nav, focus management)
 * - No layout shift (fixed positioning)
 */

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'

// ─── Types ────────────────────────────────────────────────────────────────────

type ConsentStatus = 'accepted' | 'declined' | null

interface CookieConsentProps {
  /** GA4 Measurement ID (e.g. "G-XXXXXXXXXX") from siteConfig.integrations.googleAnalyticsId */
  gaId: string
  /** Optional Facebook Pixel ID from siteConfig.integrations.fbPixelId */
  fbPixelId?: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CONSENT_KEY = 'copytier_consent'
const CONSENT_TS_KEY = 'copytier_consent_ts'
const CONSENT_EXPIRY_MS = 365 * 24 * 60 * 60 * 1000 // 12 months
const REOPEN_EVENT = 'copytier:open-consent'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getStoredConsent(): ConsentStatus {
  try {
    const status = localStorage.getItem(CONSENT_KEY) as ConsentStatus | null
    const ts = localStorage.getItem(CONSENT_TS_KEY)
    if (!status || !ts) return null
    // Re-prompt if consent is older than 12 months
    if (Date.now() - parseInt(ts, 10) > CONSENT_EXPIRY_MS) {
      localStorage.removeItem(CONSENT_KEY)
      localStorage.removeItem(CONSENT_TS_KEY)
      return null
    }
    return status
  } catch {
    // localStorage unavailable (SSR, private browsing restrictions)
    return null
  }
}

function storeConsent(status: 'accepted' | 'declined'): void {
  try {
    localStorage.setItem(CONSENT_KEY, status)
    localStorage.setItem(CONSENT_TS_KEY, String(Date.now()))
  } catch {
    // Silently fail — don't block the user
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CookieConsent({ gaId, fbPixelId }: CookieConsentProps) {
  const [consent, setConsent] = useState<ConsentStatus>(null)
  const [showBanner, setShowBanner] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const declineRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<Element | null>(null)

  // ── On mount: read stored consent ──────────────────────────────────────────
  useEffect(() => {
    const stored = getStoredConsent()
    if (stored) {
      setConsent(stored)
      setShowBanner(false)
    } else {
      setShowBanner(true)
    }
  }, [])

  // ── Listen for re-open event from footer ───────────────────────────────────
  useEffect(() => {
    const handler = () => {
      previousFocusRef.current = document.activeElement
      setIsExiting(false)
      setShowBanner(true)
    }
    window.addEventListener(REOPEN_EVENT, handler)
    return () => window.removeEventListener(REOPEN_EVENT, handler)
  }, [])

  // ── Move focus to Decline button when banner opens ─────────────────────────
  useEffect(() => {
    if (showBanner && !isExiting) {
      // Small delay to let the CSS enter animation start
      const timer = setTimeout(() => declineRef.current?.focus(), 50)
      return () => clearTimeout(timer)
    }
  }, [showBanner, isExiting])

  // ── Handle decision ────────────────────────────────────────────────────────
  function handleDecision(decision: 'accepted' | 'declined') {
    storeConsent(decision)
    setConsent(decision)
    // Animate out before hiding
    setIsExiting(true)
    setTimeout(() => {
      setShowBanner(false)
      setIsExiting(false)
      // Return focus to previous element
      if (previousFocusRef.current instanceof HTMLElement) {
        previousFocusRef.current.focus()
      }
    }, 250)
  }

  return (
    <>
      {/* ── Analytics Scripts (only render when accepted) ──────────────────── */}
      {consent === 'accepted' && gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                anonymize_ip: true,
                cookie_flags: 'SameSite=None;Secure'
              });
            `}
          </Script>
        </>
      )}

      {/* ── Facebook Pixel (optional, only when accepted and ID provided) ───── */}
      {consent === 'accepted' && fbPixelId && (
        <Script id="fb-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('dataProcessingOptions', ['LDU'], 1, 1000);
            fbq('init', '${fbPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* ── Consent Banner ─────────────────────────────────────────────────── */}
      {showBanner && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent"
          aria-describedby="consent-description"
          className={[
            // Layout
            'fixed bottom-0 left-0 right-0 z-50',
            // Background & border
            'bg-white border-t border-gray-200',
            // Shadow
            'shadow-[0_-4px_16px_rgba(0,0,0,0.08)]',
            // Animation
            'transition-all duration-300 ease-out',
            isExiting
              ? 'translate-y-full opacity-0'
              : 'translate-y-0 opacity-100',
          ].join(' ')}
        >
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Text */}
              <p
                id="consent-description"
                className="text-sm text-gray-600 leading-relaxed"
              >
                We use cookies to understand how visitors use our site — this
                helps us improve your experience. We do not sell your personal
                information.{' '}
                <Link
                  href="/privacy"
                  className="font-medium text-gray-900 underline underline-offset-2 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  Privacy Policy
                </Link>
              </p>

              {/* Buttons */}
              <div className="flex shrink-0 gap-3">
                {/* Decline — secondary style */}
                <button
                  ref={declineRef}
                  onClick={() => handleDecision('declined')}
                  className={[
                    // Sizing
                    'min-h-[48px] min-w-[100px] px-5 py-2.5',
                    // Style — outlined, equal visual weight to Accept
                    'rounded-md border border-gray-300 bg-white',
                    'text-sm font-semibold text-gray-700',
                    // Hover/focus
                    'hover:bg-gray-50 hover:border-gray-400',
                    'focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2',
                    'transition-colors duration-150',
                    'cursor-pointer',
                  ].join(' ')}
                  aria-label="Decline cookies and analytics tracking"
                >
                  Decline
                </button>

                {/* Accept — primary style */}
                <button
                  onClick={() => handleDecision('accepted')}
                  className={[
                    // Sizing
                    'min-h-[48px] min-w-[100px] px-5 py-2.5',
                    // Style — brand primary background
                    'rounded-md bg-[var(--color-primary)] border border-[var(--color-primary)]',
                    'text-sm font-semibold text-white',
                    // Hover/focus
                    'hover:bg-[var(--color-primary-dark)]',
                    'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2',
                    'transition-colors duration-150',
                    'cursor-pointer',
                  ].join(' ')}
                  aria-label="Accept cookies and analytics tracking"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * WIRE INTO layout.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * import { CookieConsent } from '@/components/layout/CookieConsent'
 * import { siteConfig } from '@/config/site.config'
 *
 * export default function RootLayout({ children }: { children: React.ReactNode }) {
 *   return (
 *     <html lang="en">
 *       <body>
 *         <Header />
 *         <main>{children}</main>
 *         <Footer />
 *         <CookieConsent
 *           gaId={siteConfig.integrations.googleAnalyticsId}
 *           fbPixelId={siteConfig.integrations.fbPixelId}  // optional
 *         />
 *       </body>
 *     </html>
 *   )
 * }
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ADD "Cookie Preferences" LINK TO Footer.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * <button
 *   onClick={() => window.dispatchEvent(new CustomEvent('copytier:open-consent'))}
 *   className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
 * >
 *   Cookie Preferences
 * </button>
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * REMOVE any existing GA4 <Script> tags from layout.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Search layout.tsx for:
 *   - googletagmanager.com
 *   - gtag/js
 *   - dataLayer
 * If found, DELETE those Script tags. GA4 is now managed by CookieConsent only.
 */
