/**
 * PACK 4: Button Component
 * ========================
 * Target path: src/components/ui/Button.tsx
 *
 * The foundation interactive element. Every CTA, form submit, navigation action,
 * and trigger in the site uses this component.
 *
 * VARIANTS:
 *   primary   — main conversion action (Get a Free Estimate, Schedule Service)
 *   secondary — supporting action (Learn More, View Services)
 *   emergency — 24/7 urgent actions (Call Now, Emergency Service)
 *   outline   — tertiary action, lower visual weight
 *   ghost     — lowest weight, used in nav and card links
 *
 * SIZES:
 *   sm  — inline actions, card links (min-h: 36px — only in non-primary contexts)
 *   md  — default (min-h: 48px — WCAG 2.5.5 touch target)
 *   lg  — hero CTAs
 *   xl  — standalone CTAs in CTA sections
 *
 * STATES:
 *   default, hover, focus-visible, active, disabled, loading
 *
 * RENDERING:
 *   When `href` is provided → renders as <a> (link semantics)
 *   When `href` is absent   → renders as <button> (button semantics)
 *   Never renders as <div>
 *
 * A11Y:
 *   ✓ type="button" default (prevents accidental form submission)
 *   ✓ aria-disabled on disabled state (not just HTML disabled)
 *   ✓ aria-busy + sr-only loading text during loading state
 *   ✓ All sizes meet 48px touch target minimum (WCAG 2.5.5)
 *   ✓ focus-visible outline (keyboard users only — not on mouse click)
 *   ✓ External links get target="_blank" + rel="noopener noreferrer"
 */

import { type ReactNode, forwardRef } from 'react'
import { cn } from '@/lib/utils'

// ─── Types ─────────────────────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'emergency' | 'outline' | 'ghost'
export type ButtonSize    = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonBaseProps {
  variant?:      ButtonVariant
  size?:         ButtonSize
  isLoading?:    boolean
  loadingText?:  string
  leftIcon?:     ReactNode
  rightIcon?:    ReactNode
  fullWidth?:    boolean
  disabled?:     boolean
  className?:    string
  children:      ReactNode
}

// When href is provided, renders as <a>
interface ButtonAsLink extends ButtonBaseProps {
  href:    string
  type?:   never
  onClick?: never
}

// When href is absent, renders as <button>
interface ButtonAsButton extends ButtonBaseProps {
  href?:    never
  type?:    'button' | 'submit' | 'reset'
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export type ButtonProps = ButtonAsLink | ButtonAsButton

// ─── Style Maps ────────────────────────────────────────────────────────────────

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]',
    'hover:bg-[var(--btn-primary-hover-bg)]',
    'active:bg-[var(--btn-primary-active-bg)]',
    'shadow-sm hover:shadow-md',
  ].join(' '),

  secondary: [
    'bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)]',
    'hover:bg-[var(--btn-secondary-hover-bg)]',
    'active:bg-[var(--btn-secondary-active-bg)]',
    'border border-[var(--btn-secondary-border)]',
  ].join(' '),

  emergency: [
    'bg-[var(--btn-emergency-bg)] text-white',
    'hover:bg-[var(--btn-emergency-hover-bg)]',
    'active:bg-[var(--btn-emergency-active-bg)]',
    // Pulse glow animation on mobile for maximum attention
    'animate-pulse-glow',
    'shadow-sm hover:shadow-md',
    // Override pulse on desktop — too distracting at rest
    'md:animate-none',
  ].join(' '),

  outline: [
    'bg-transparent text-[var(--btn-outline-text)]',
    'border-2 border-[var(--btn-outline-border)]',
    'hover:bg-[var(--btn-outline-hover-bg)]',
    'active:bg-[var(--btn-outline-active-bg)]',
  ].join(' '),

  ghost: [
    'bg-transparent text-[var(--btn-ghost-text)]',
    'hover:bg-[var(--btn-ghost-hover-bg)]',
    'active:bg-[var(--btn-ghost-active-bg)]',
    // No border, no shadow — pure text action
  ].join(' '),
}

const sizeStyles: Record<ButtonSize, string> = {
  // sm: Use only in non-critical contexts. Falls below 48px height.
  // Acceptable in card footers and breadcrumbs where space is constrained.
  sm: 'min-h-[36px] px-4 py-2 text-sm gap-1.5',

  // md: Default. Meets WCAG 2.5.5 48px touch target minimum.
  md: 'min-h-[48px] px-6 py-3 text-base gap-2',

  // lg: Hero CTAs, prominent section actions
  lg: 'min-h-[52px] px-8 py-3.5 text-lg gap-2.5',

  // xl: CTA section standalone buttons — maximum visual prominence
  xl: 'min-h-[60px] px-10 py-4 text-xl gap-3',
}

// ─── Spinner ───────────────────────────────────────────────────────────────────

function LoadingSpinner({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn('animate-spin', className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
    >
      <circle
        className="opacity-25"
        cx="12" cy="12" r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

// ─── Button Component ──────────────────────────────────────────────────────────

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  {
    variant    = 'primary',
    size       = 'md',
    isLoading  = false,
    loadingText,
    leftIcon,
    rightIcon,
    fullWidth  = false,
    disabled   = false,
    className,
    children,
    ...props
  },
  ref
) {
  const isDisabled = disabled || isLoading

  const baseStyles = cn(
    // Layout
    'inline-flex items-center justify-center',
    'font-semibold rounded-lg',
    'transition-all duration-150',
    // Focus — keyboard only, not on mouse click
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
    'focus-visible:outline-[var(--color-border-focus)]',
    // Remove default focus ring for mouse users
    'focus:not(:focus-visible):outline-none',
    // Width
    fullWidth && 'w-full',
    // Disabled state
    isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    // Variant
    variantStyles[variant],
    // Size
    sizeStyles[size],
    // Consumer override
    className
  )

  const content = (
    <>
      {/* Loading spinner replaces left icon when loading */}
      {isLoading ? (
        <LoadingSpinner className="flex-shrink-0" />
      ) : leftIcon ? (
        <span aria-hidden="true" className="flex-shrink-0">
          {leftIcon}
        </span>
      ) : null}

      {/* Button text */}
      {isLoading && loadingText ? (
        <>
          {/* Screen reader sees loading text */}
          <span className="sr-only">{loadingText}</span>
          {/* Sighted users see visual loading text */}
          <span aria-hidden="true">{loadingText}</span>
        </>
      ) : (
        <span>{children}</span>
      )}

      {/* Right icon — hidden during loading */}
      {!isLoading && rightIcon && (
        <span aria-hidden="true" className="flex-shrink-0">
          {rightIcon}
        </span>
      )}
    </>
  )

  // ── Render as <a> when href is provided ──────────────────────────────────
  if ('href' in props && props.href) {
    const { href } = props
    const isExternal = href.startsWith('http') || href.startsWith('//')

    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={baseStyles}
        aria-disabled={isDisabled || undefined}
        // External links: open in new tab with security attributes
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        // Tel and mailto links don't need external treatment
        // href="tel:..." and href="mailto:..." handled naturally
      >
        {content}
      </a>
    )
  }

  // ── Render as <button> ───────────────────────────────────────────────────
  const { type = 'button', onClick } = props as ButtonAsButton
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      className={baseStyles}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={isLoading}
      onClick={onClick}
    >
      {content}
    </button>
  )
})

Button.displayName = 'Button'

// ─── Usage Examples ────────────────────────────────────────────────────────────
/*

// Primary CTA — hero section
<Button variant="primary" size="lg">
  Get a Free Estimate
</Button>

// Emergency CTA with phone icon and tel link
<Button
  variant="emergency"
  size="lg"
  href={`tel:${siteConfig.contact.phone}`}
  leftIcon={<PhoneIcon className="h-5 w-5" />}
>
  Call Now — 24/7 Emergency Service
</Button>

// Loading state during form submission (use SubmitButton for forms)
<Button
  variant="primary"
  isLoading={isSubmitting}
  loadingText="Sending your message..."
  type="submit"
>
  Send Message
</Button>

// Outline secondary action
<Button variant="outline" href="/services">
  View All Services
</Button>

// Ghost link in navigation
<Button variant="ghost" size="sm" href="/about">
  About Us
</Button>

// Full-width mobile CTA
<Button variant="primary" size="lg" fullWidth>
  Schedule Service
</Button>

// Disabled state
<Button variant="primary" disabled>
  Unavailable
</Button>

// With right icon (arrow pattern)
<Button
  variant="ghost"
  size="sm"
  rightIcon={<ArrowRightIcon className="h-4 w-4" />}
  href={`/services/${service.slug}`}
>
  Learn More
</Button>

*/
