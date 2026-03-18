/**
 * PACK 4: TestimonialCard Component
 * ===================================
 * Target path: src/components/sections/TestimonialCard.tsx
 *
 * Displays a single customer review with star rating, quoted text, reviewer
 * attribution, platform badge, and dual-mode schema (JSON-LD + inline microdata).
 *
 * VARIANTS:
 *   default    — white bordered card for 2–3 column grids
 *   featured   — prominent card with accent border; used as carousel hero slot
 *                or to highlight a top review in a section opener
 *   compact    — condensed card for sidebars, trust bars, or space-constrained
 *                layouts where the full card would be too heavy
 *
 * SCHEMA (DUAL STRATEGY):
 *   1. JSON-LD block: emitted via <JsonLd> per card (or in parent section for
 *      aggregate rating). Preferred by Google for rich snippet eligibility.
 *   2. Inline microdata: itemscope / itemProp attributes on the elements
 *      themselves. Belt-and-suspenders — reinforces the JSON-LD signal.
 *   Pack 5 decides which strategy; showSchema prop controls JSON-LD emission.
 *   Inline microdata is always present — it's zero-cost HTML attributes.
 *
 * STATES:
 *   loaded     — review data displayed (this component only handles loaded state)
 *   loading    — use <SkeletonTestimonial /> in parent Suspense fallback
 *   empty      — parent TestimonialsSection renders <EmptyState> when no reviews
 *
 * A11Y:
 *   ✓ <article> — self-contained review unit with accessible name from aria-label
 *   ✓ <blockquote> — semantic quoted content (review text)
 *   ✓ <cite> inside figcaption — semantic attribution of the quote
 *   ✓ Stars: visible sr-only text "X out of 5 stars"; visual SVGs are aria-hidden
 *   ✓ Platform badge: aria-label="Verified Google Review" (or Yelp, Facebook, etc.)
 *   ✓ Avatar initials fallback: aria-hidden (decorative), name is in <cite>
 *   ✓ Date: <time dateTime="ISO-8601"> for machine-readable date
 *   ✓ Service link: focus-visible outline, rel for external links
 *   ✓ "See all reviews" link: sr-only "(opens in new tab)" text
 *   ✓ Aggregate rating: aria-label with full description for screen readers
 *
 * TOKEN USAGE:
 *   All colors reference CSS custom properties from Pack 2's tokens.css.
 *   No hardcoded hex values. Rebrand = change tokens.css only.
 *
 * SITECONFIG INTEGRATION:
 *   TestimonialsSection reads from siteConfig.testimonials[].
 *   TestimonialCard accepts a single review as a prop — no direct siteConfig reads.
 *   This makes cards testable and usable in isolation.
 *
 * USAGE:
 *   // Standard grid (TestimonialsSection handles mapping)
 *   <TestimonialsSection limit={3} />
 *
 *   // Featured standalone card (e.g., above contact form)
 *   <TestimonialCard review={featuredReview} variant="featured" />
 *
 *   // Compact sidebar
 *   <TestimonialCard review={review} variant="compact" showSchema={false} />
 */

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/lib/site-config'

// ─── Types ─────────────────────────────────────────────────────────────────────

/** Shape of a single review object in siteConfig.testimonials[] */
export interface ReviewData {
  /** Unique identifier (React key + schema @id) */
  id: string
  /** Reviewer's full name or "First Name L." format */
  author: string
  /** City or neighborhood — "San Jose, CA" or "South Bay Area" */
  city?: string
  /** Star rating 1–5 (integer) */
  rating: 1 | 2 | 3 | 4 | 5
  /** The full review text. Keep under 300 chars for display; Pack 5 truncates. */
  text: string
  /** Service this review pertains to — "HVAC Repair", "Drain Cleaning", etc. */
  service?: string
  /** Slug for linking to the service page — "hvac-repair" */
  serviceSlug?: string
  /** Source platform where the review was originally posted */
  platform?: 'google' | 'yelp' | 'facebook' | 'homeadvisor' | 'thumbtack' | 'direct'
  /** ISO 8601 date: "2024-08-15" — required for schema datePublished */
  date?: string
  /** Human-readable display date: "August 2024" */
  dateDisplay?: string
  /** Whether the review is marked verified on the platform */
  verified?: boolean
  /** Optional reviewer photo URL — use sparingly, initials fallback is preferred */
  avatarUrl?: string
}

interface TestimonialCardProps {
  review: ReviewData
  /** Visual layout variant */
  variant?: 'default' | 'featured' | 'compact'
  /** Emit individual Review JSON-LD for this card. Default: true.
   *  Set false when parent TestimonialsSection emits aggregate schema instead. */
  showSchema?: boolean
  /** Render the service tag below the quote. Default: true */
  showService?: boolean
  /** Render the platform badge. Default: true */
  showPlatform?: boolean
  className?: string
}

// ─── StarRating ────────────────────────────────────────────────────────────────

interface StarRatingProps {
  rating: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
}

function StarRating({ rating, max = 5, size = 'md' }: StarRatingProps) {
  const iconSize = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'

  return (
    <div className="flex items-center gap-0.5">
      {/* Screen reader accessible description — precedes visual stars in DOM */}
      <span className="sr-only">{rating} out of {max} stars</span>

      {/* Visual stars — aria-hidden: sr-only text above handles the meaning */}
      <div aria-hidden="true" className="flex gap-0.5">
        {Array.from({ length: max }, (_, i) => (
          <svg
            key={i}
            className={cn(
              iconSize,
              i < rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-200 fill-gray-200'
            )}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    </div>
  )
}

// ─── Reviewer Avatar ───────────────────────────────────────────────────────────

interface ReviewerAvatarProps {
  author: string
  avatarUrl?: string
  size: 'sm' | 'md' | 'lg'
}

function ReviewerAvatar({ author, avatarUrl, size }: ReviewerAvatarProps) {
  const sizeClass = size === 'sm' ? 'h-8 w-8 text-xs' : size === 'lg' ? 'h-12 w-12 text-base' : 'h-10 w-10 text-sm'

  // Derive 1–2 letter initials from name
  const initials = author
    .trim()
    .split(/\s+/)
    .map(word => word[0]?.toUpperCase() ?? '')
    .join('')
    .slice(0, 2)

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt=""          // Decorative — reviewer name is in <cite>, not here
        aria-hidden="true"
        className={cn(sizeClass, 'rounded-full object-cover flex-shrink-0')}
        loading="lazy"
        decoding="async"
      />
    )
  }

  // Initials fallback — purely decorative, name is in <cite>
  return (
    <div
      aria-hidden="true"
      className={cn(
        sizeClass,
        'rounded-full flex-shrink-0 flex items-center justify-center font-semibold',
        'bg-[var(--color-primary-light)] text-[var(--color-primary)]',
        'select-none'
      )}
    >
      {initials}
    </div>
  )
}

// ─── Platform Badges ───────────────────────────────────────────────────────────
// Inline SVG only — no external image dependencies.

type PlatformKey = NonNullable<ReviewData['platform']>

const PLATFORM_CONFIG: Record<PlatformKey, { label: string; nameDisplay: string; icon: ReactNode }> = {
  google: {
    label: 'Verified Google Review',
    nameDisplay: 'Google',
    icon: (
      <svg aria-hidden="true" className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
    ),
  },
  yelp: {
    label: 'Verified Yelp Review',
    nameDisplay: 'Yelp',
    icon: (
      <svg aria-hidden="true" className="h-4 w-4 flex-shrink-0 text-[#FF1A1A]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.073 2c-5.53 0-10.028 4.43-10.028 9.888 0 2.54.987 4.856 2.6 6.588l-.666 3.016a.5.5 0 00.716.547l2.876-1.514A10.03 10.03 0 0012.073 21.9c5.53 0 10.027-4.43 10.027-9.888C22.1 6.43 17.603 2 12.073 2zm-.69 14.16a.88.88 0 01-1.238.127l-2.37-2.015a.88.88 0 01.108-1.4l2.26-1.427a.88.88 0 011.24.58l.11 3.135z" />
      </svg>
    ),
  },
  facebook: {
    label: 'Verified Facebook Review',
    nameDisplay: 'Facebook',
    icon: (
      <svg aria-hidden="true" className="h-4 w-4 flex-shrink-0 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  homeadvisor: {
    label: 'Verified HomeAdvisor Review',
    nameDisplay: 'HomeAdvisor',
    icon: (
      <svg aria-hidden="true" className="h-4 w-4 flex-shrink-0 text-[#F96302]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
  thumbtack: {
    label: 'Verified Thumbtack Review',
    nameDisplay: 'Thumbtack',
    icon: (
      <svg aria-hidden="true" className="h-4 w-4 flex-shrink-0 text-[#009FD9]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-9v4h4l-5 9z" />
      </svg>
    ),
  },
  direct: {
    label: 'Verified Customer',
    nameDisplay: 'Verified',
    icon: (
      <svg aria-hidden="true" className="h-4 w-4 flex-shrink-0 text-green-600" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
      </svg>
    ),
  },
}

// ─── JSON-LD Schema Builder ────────────────────────────────────────────────────

function buildReviewJsonLd(review: ReviewData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    '@id': `${siteConfig.siteUrl}/reviews#${review.id}`,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: String(review.rating),
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Person',
      name: review.author,
    },
    reviewBody: review.text,
    datePublished: review.date ?? new Date().toISOString().split('T')[0],
    itemReviewed: {
      '@type': 'LocalBusiness',
      '@id': `${siteConfig.siteUrl}/#business`,
      name: siteConfig.businessName,
    },
  }
}

// ─── TestimonialCard ──────────────────────────────────────────────────────────

export function TestimonialCard({
  review,
  variant = 'default',
  showSchema = true,
  showService = true,
  showPlatform = true,
  className,
}: TestimonialCardProps) {
  const platformInfo = review.platform ? PLATFORM_CONFIG[review.platform] : null

  // ── Container styles by variant ──────────────────────────────────────────
  const containerStyles = cn(
    'flex flex-col h-full',

    variant === 'default' && [
      'rounded-xl border border-[var(--color-border)]',
      'bg-[var(--color-surface)]',
      'p-6',
      'shadow-sm',
    ],
    variant === 'featured' && [
      'rounded-xl',
      'bg-[var(--color-surface)]',
      'p-8 md:p-10',
      // Left accent border signals "top pick"
      'border border-[var(--color-border)] border-l-4 border-l-[var(--color-primary)]',
      'shadow-md',
    ],
    variant === 'compact' && [
      'rounded-lg border border-[var(--color-border)]',
      'bg-[var(--color-surface)]',
      'p-4',
    ],

    className
  )

  return (
    <>
      {/* ── JSON-LD Review schema ───────────────────────────────────────── */}
      {showSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildReviewJsonLd(review)),
          }}
        />
      )}

      {/*
       * <article> — self-contained content unit; screen readers can navigate
       * directly to it. aria-label provides the accessible name.
       *
       * Inline microdata: itemScope + itemType make this element a Review node.
       * Google parses both JSON-LD (above) and microdata — belt and suspenders.
       */}
      <article
        className={containerStyles}
        aria-label={`${review.rating}-star review by ${review.author}${review.city ? ` from ${review.city}` : ''}`}
        itemScope
        itemType="https://schema.org/Review"
      >
        {/* Schema: reviewed item */}
        <span
          className="sr-only"
          itemProp="itemReviewed"
          itemScope
          itemType="https://schema.org/LocalBusiness"
        >
          <span itemProp="name">{siteConfig.businessName}</span>
        </span>

        {/* ── Header row: stars + platform badge ─────────────────────────── */}
        <div className={cn(
          'flex items-center justify-between',
          variant === 'compact' ? 'mb-3' : 'mb-4'
        )}>
          {/* Star rating with microdata rating node */}
          <div
            itemProp="reviewRating"
            itemScope
            itemType="https://schema.org/Rating"
          >
            {/* Hidden microdata values */}
            <meta itemProp="ratingValue" content={String(review.rating)} />
            <meta itemProp="bestRating" content="5" />
            <meta itemProp="worstRating" content="1" />
            {/* Visible star display */}
            <StarRating
              rating={review.rating}
              size={variant === 'featured' ? 'lg' : variant === 'compact' ? 'sm' : 'md'}
            />
          </div>

          {/* Platform verification badge */}
          {showPlatform && platformInfo && (
            <div
              aria-label={platformInfo.label}
              className="flex items-center gap-1.5"
              title={platformInfo.label}
            >
              {platformInfo.icon}
              {variant !== 'compact' && (
                <span className="text-xs font-medium text-[var(--color-text-muted)]">
                  {platformInfo.nameDisplay}
                </span>
              )}
            </div>
          )}
        </div>

        {/*
         * ── Decorative opening quote mark ─────────────────────────────────
         * Visual only; <blockquote> semantics handle the quotation meaning.
         * Hidden in compact variant to save space.
         */}
        {variant !== 'compact' && (
          <div
            aria-hidden="true"
            className="mb-2 text-4xl leading-none font-serif text-[var(--color-primary)] opacity-20 select-none"
          >
            &ldquo;
          </div>
        )}

        {/*
         * ── Review text ─────────────────────────────────────────────────
         * <blockquote> is the semantically correct element for quoted content.
         * itemProp="reviewBody" connects this to the microdata schema above.
         */}
        <blockquote
          className={cn('flex-1', variant === 'compact' ? 'mb-3' : 'mb-5')}
          itemProp="reviewBody"
        >
          <p className={cn(
            'text-[var(--color-text-secondary)] leading-relaxed',
            variant === 'compact' && 'text-sm',
            variant === 'default' && 'text-base',
            variant === 'featured' && 'text-lg',
          )}>
            {review.text}
          </p>
        </blockquote>

        {/* ── Service tag ────────────────────────────────────────────────── */}
        {showService && review.service && variant !== 'compact' && (
          <div className="mb-4">
            {review.serviceSlug ? (
              <a
                href={`/services/${review.serviceSlug}`}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-3 py-1',
                  'text-xs font-medium',
                  'bg-[var(--color-primary-light)] text-[var(--color-primary)]',
                  'hover:opacity-80 transition-opacity duration-150',
                  'focus-visible:outline focus-visible:outline-2',
                  'focus-visible:outline-[var(--color-border-focus)]',
                )}
              >
                <svg aria-hidden="true" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {review.service}
              </a>
            ) : (
              <span className={cn(
                'inline-flex items-center rounded-full px-3 py-1',
                'text-xs font-medium',
                'bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)]',
              )}>
                {review.service}
              </span>
            )}
          </div>
        )}

        {/* ── Divider ──────────────────────────────────────────────────────── */}
        <hr
          aria-hidden="true"
          className="border-[var(--color-border)] mb-4"
        />

        {/*
         * ── Attribution ───────────────────────────────────────────────────
         * <cite> is the semantic element for the source of a quotation.
         * "not-italic" overrides the browser default italic style for <cite>.
         *
         * itemProp="author" + itemType Person connects to the schema.
         */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <ReviewerAvatar
            author={review.author}
            avatarUrl={review.avatarUrl}
            size={variant === 'featured' ? 'lg' : variant === 'compact' ? 'sm' : 'md'}
          />

          {/* Name + meta */}
          <div
            itemProp="author"
            itemScope
            itemType="https://schema.org/Person"
            className="min-w-0 flex-1"
          >
            <cite
              className="not-italic block font-semibold text-[var(--color-text)] truncate"
              itemProp="name"
            >
              {review.author}
            </cite>

            {/* Location · service · date row */}
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0 mt-0.5">
              {review.city && (
                <span className={cn(
                  'text-[var(--color-text-muted)]',
                  variant === 'compact' ? 'text-xs' : 'text-sm'
                )}>
                  {review.city}
                </span>
              )}

              {/* Separator dots */}
              {review.city && review.service && variant === 'compact' && (
                <span aria-hidden="true" className="text-[var(--color-text-muted)] text-xs">·</span>
              )}

              {review.service && variant === 'compact' && (
                <span className="text-xs text-[var(--color-text-muted)]">{review.service}</span>
              )}

              {(review.city || (review.service && variant === 'compact')) && (review.dateDisplay || review.date) && (
                <span aria-hidden="true" className="text-[var(--color-text-muted)] text-xs">·</span>
              )}

              {(review.dateDisplay || review.date) && (
                <time
                  dateTime={review.date}
                  itemProp="datePublished"
                  className={cn(
                    'text-[var(--color-text-muted)]',
                    variant === 'compact' ? 'text-xs' : 'text-sm'
                  )}
                >
                  {review.dateDisplay ?? review.date}
                </time>
              )}
            </div>
          </div>
        </div>

      </article>
    </>
  )
}

// ─── TestimonialsSection ───────────────────────────────────────────────────────
// Parent section component. Handles layout, data sourcing, empty state,
// aggregate schema, and "See all reviews" link.
// Lives at: src/components/sections/TestimonialsSection.tsx
// Exported here as usage context for TestimonialCard.

interface TestimonialsSectionProps {
  /** Section H2 headline */
  headline?: string
  /** Optional supporting subtext below headline */
  subtext?: string
  /** Max reviews to show. Omit for all. */
  limit?: number
  /** Grid columns layout */
  variant?: 'grid-2' | 'grid-3' | 'single-featured'
  /**
   * Filter to reviews mentioning this string in their service field.
   * Case-insensitive partial match: "HVAC" matches "HVAC Repair".
   */
  filterByService?: string
  /** Show aggregate rating summary below headline. Default: true */
  showAggregate?: boolean
}

export function TestimonialsSection({
  headline = 'What Our Customers Say',
  subtext,
  limit,
  variant = 'grid-3',
  filterByService,
  showAggregate = true,
}: TestimonialsSectionProps) {
  // ── Read reviews from siteConfig ─────────────────────────────────────────
  let reviews: ReviewData[] = (siteConfig.testimonials ?? []) as ReviewData[]

  if (filterByService) {
    reviews = reviews.filter(r =>
      r.service?.toLowerCase().includes(filterByService.toLowerCase())
    )
  }

  if (limit && limit > 0) {
    reviews = reviews.slice(0, limit)
  }

  // ── Grid columns ─────────────────────────────────────────────────────────
  const gridClass =
    variant === 'grid-2' ? 'grid-cols-1 md:grid-cols-2' :
    variant === 'single-featured' ? 'grid-cols-1 max-w-2xl mx-auto' :
    'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'

  // ── Aggregate rating from siteConfig.trustSignals ─────────────────────────
  const aggregateRating = siteConfig.trustSignals?.reviewRating
  const reviewCount = siteConfig.trustSignals?.reviewCount

  // ── Empty state: return null — section is optional on every page ──────────
  if (reviews.length === 0) {
    return null
  }

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="section-padding bg-[var(--color-surface-alt)]"
    >
      <div className="container mx-auto px-4">

        {/* ── Section header ───────────────────────────────────────────── */}
        <div className="text-center mb-12">
          <p className="text-overline">Customer Reviews</p>
          <h2
            id="testimonials-heading"
            className="mt-2 text-3xl font-bold text-[var(--color-text)]"
          >
            {headline}
          </h2>

          {/* Aggregate star rating summary */}
          {showAggregate && aggregateRating && reviewCount && (
            <div
              className="mt-4 flex items-center justify-center gap-2 flex-wrap"
              aria-label={`Average rating: ${aggregateRating} out of 5 stars from ${reviewCount}+ reviews`}
            >
              {/* Visual stars — aria-hidden, aria-label above covers it */}
              <div aria-hidden="true">
                <StarRating rating={Math.round(Number(aggregateRating))} size="lg" />
              </div>
              <span className="font-bold text-lg text-[var(--color-text)]">
                {aggregateRating}
              </span>
              <span className="text-[var(--color-text-muted)] text-sm">
                ({reviewCount}+ reviews)
              </span>
            </div>
          )}

          {subtext && (
            <p className="mt-3 text-intro mx-auto max-w-2xl text-[var(--color-text-secondary)]">
              {subtext}
            </p>
          )}
        </div>

        {/* ── Aggregate Review JSON-LD ─────────────────────────────────── */}
        {/* Emitted once at section level — individual cards also emit per-review JSON-LD */}
        {aggregateRating && reviewCount && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                '@id': `${siteConfig.siteUrl}/#business`,
                name: siteConfig.businessName,
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: String(aggregateRating),
                  reviewCount: String(reviewCount),
                  bestRating: '5',
                  worstRating: '1',
                },
              }),
            }}
          />
        )}

        {/* ── Review grid ─────────────────────────────────────────────── */}
        {/*
         * <ul role="list"> — semantic list of reviews.
         * Resets browser list styles while preserving list semantics for
         * screen readers (some browsers remove list semantics from CSS-reset lists).
         */}
        <ul
          role="list"
          className={cn('grid gap-6', gridClass)}
        >
          {reviews.map(review => (
            <li key={review.id}>
              <TestimonialCard
                review={review}
                variant="default"
                showSchema={true}  // each card emits its own Review JSON-LD
              />
            </li>
          ))}
        </ul>

        {/* ── "See all reviews" link ───────────────────────────────────── */}
        {siteConfig.socialLinks?.googleBusiness && (
          <div className="mt-10 text-center">
            <a
              href={siteConfig.socialLinks.googleBusiness}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-2',
                'font-medium text-[var(--color-text-link)]',
                'hover:text-[var(--color-text-link-hover)] hover:underline',
                'focus-visible:outline focus-visible:outline-2',
                'focus-visible:outline-[var(--color-border-focus)]',
                'transition-colors duration-150'
              )}
            >
              See all reviews on Google
              {/* External link icon */}
              <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {/* Screen reader: announce new tab */}
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </div>
        )}

      </div>
    </section>
  )
}

// ─── siteConfig Schema (expected shape in site.config.ts) ─────────────────────
/*

// site.config.ts
testimonials: [
  {
    id: 'review-001',
    author: 'Sarah M.',
    city: 'San Jose, CA',
    rating: 5,
    text: 'They arrived within the hour and fixed our emergency leak. Professional, clean, and honest pricing. Highly recommend for any plumbing emergency.',
    service: 'Emergency Plumbing',
    serviceSlug: 'emergency-plumbing',
    platform: 'google',
    date: '2024-09-12',
    dateDisplay: 'September 2024',
    verified: true,
  },
  {
    id: 'review-002',
    author: 'David K.',
    city: 'Cupertino, CA',
    rating: 5,
    text: 'Replaced our water heater same day. The tech explained everything clearly, no surprise charges, and the install was clean and fast.',
    service: 'Water Heater Installation',
    serviceSlug: 'water-heater-installation',
    platform: 'google',
    date: '2024-08-03',
    dateDisplay: 'August 2024',
    verified: true,
  },
],

trustSignals: {
  reviewRating: 4.9,
  reviewCount: 127,
  yearsInBusiness: 18,
  licenseNumber: 'CA #1012345',
},

socialLinks: {
  googleBusiness: 'https://g.page/r/[YOUR_PLACE_ID]/review',
},

*/
