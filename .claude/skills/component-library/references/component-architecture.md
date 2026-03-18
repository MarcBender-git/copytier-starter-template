# Component Architecture — File Structure & Conventions

How components are organized, imported, and integrated with shadcn/ui
and the Pack 2 design system. Follow these conventions exactly.

---

## Directory Structure

```
src/
  components/
    ui/                     ← Foundation + layout components (shadcn/ui layer)
      Button.tsx
      Input.tsx
      Select.tsx
      Textarea.tsx
      Checkbox.tsx
      Label.tsx
      Badge.tsx
      Card.tsx
      Accordion.tsx
      Modal.tsx
      Drawer.tsx
      Tooltip.tsx
      Skeleton.tsx
      EmptyState.tsx
      ErrorBoundary.tsx
      Toast.tsx
      index.ts              ← Barrel export for all ui/ components

    layout/                 ← Site-wide layout components
      Header.tsx
      Footer.tsx
      MobileMenu.tsx
      SkipLink.tsx
      Breadcrumbs.tsx
      MobileCallBar.tsx
      index.ts

    sections/               ← Page section components (filled from Pack 3 shells)
      HeroSection.tsx
      PageHeroSection.tsx
      TrustBarSection.tsx
      ServicesGridSection.tsx
      ServiceCard.tsx
      WhyChooseUsSection.tsx
      ProcessSection.tsx
      TestimonialsSection.tsx
      TestimonialCard.tsx
      ServiceAreaSection.tsx
      FAQSection.tsx
      CTASection.tsx
      ServiceBenefitsSection.tsx
      RelatedServicesSection.tsx
      AboutHeroSection.tsx
      AboutStorySection.tsx
      TeamSection.tsx
      CredentialsSection.tsx
      ContactHeroSection.tsx
      ContactFormSection.tsx
      LocalIntroSection.tsx
      NearbyAreasSection.tsx
      index.ts

    forms/                  ← Form components
      ContactForm.tsx
      FormField.tsx
      FormSelect.tsx
      FormTextarea.tsx
      SubmitButton.tsx
      index.ts

    seo/                    ← SEO-specific components
      JsonLd.tsx
      index.ts
```

---

## Barrel Exports

Each directory has an `index.ts` that re-exports everything:

```typescript
// src/components/ui/index.ts
export { Button } from './Button'
export { Input } from './Input'
export { Select } from './Select'
export { Textarea } from './Textarea'
export { Checkbox } from './Checkbox'
export { Label } from './Label'
export { Badge } from './Badge'
export { Card } from './Card'
export { Accordion } from './Accordion'
export { Modal } from './Modal'
export { Drawer } from './Drawer'
export { Tooltip } from './Tooltip'
export { Skeleton, SkeletonCard, SkeletonTestimonial, SkeletonHero } from './Skeleton'
export { EmptyState } from './EmptyState'
export { ErrorBoundary } from './ErrorBoundary'
export { Toast, useToast } from './Toast'
```

Import convention:
```typescript
// ✅ Correct — from barrel
import { Button, Badge, Card } from '@/components/ui'
import { HeroSection, CTASection } from '@/components/sections'
import { ContactForm } from '@/components/forms'

// ❌ Wrong — direct file paths are fragile
import { Button } from '@/components/ui/Button'
```

---

## Server vs Client Components

**Default: Server Component** — no `'use client'` directive needed.

Add `'use client'` ONLY when the component uses:
- `useState`, `useEffect`, `useRef`, `useReducer`
- Browser APIs (`window`, `document`, `localStorage`)
- Event handlers attached directly (`onClick`, `onChange`, `onSubmit`)
- `useFormStatus`, `useActionState`
- Third-party client-only libraries

| Component | Server or Client | Why |
|---|---|---|
| `HeroSection` | Server | Static content, no interactivity |
| `ServicesGridSection` | Server | Reads from siteConfig, renders cards |
| `TestimonialsSection` | Server | Static review data |
| `FAQSection` | Server (with client Accordion) | Parent is Server, Accordion is Client |
| `Accordion` | Client | useState for expand/collapse |
| `ContactForm` | Client | useActionState, event handlers |
| `MobileMenu` | Client | useState for open/close |
| `Modal` | Client | useState, focus management |
| `Toast` | Client | useState, useEffect for timer |
| `ErrorBoundary` | Client | Class component lifecycle methods |
| `MobileCallBar` | Server | Static phone link, no interactivity |

**Pattern:** Push client boundary as deep as possible. A Server section component
can import a Client accordion — only the accordion becomes a client bundle.

```tsx
// ✅ Correct — Server parent, Client child
// FAQSection.tsx (no 'use client')
import { Accordion } from '@/components/ui'

export function FAQSection({ faqs }) {
  return (
    <section>
      <h2>Frequently Asked Questions</h2>
      <Accordion items={faqs} />  {/* Client component */}
    </section>
  )
}

// Accordion.tsx
'use client'
// ... useState for expand state
```

---

## shadcn/ui Integration Rules

shadcn/ui components live in `src/components/ui/` and are installed via CLI.
They're the starting point — we customize them to use our token system.

**Installing a shadcn component:**
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add accordion
npx shadcn-ui@latest add dialog
```

**After installing — always:**
1. Replace hardcoded color values with CSS variable references
2. Adjust size classes to match the 48px touch target minimum
3. Update focus styles to use `var(--color-border-focus)`
4. Remove any `outline-none` without a replacement focus indicator

**What shadcn/ui provides vs. what we build:**
- shadcn/ui: `Button`, `Dialog`, `Accordion`, `Select`, `Checkbox`, `Badge` primitives
- We build on top: `ContactForm`, section components, `MobileMenu`, `CTASection`

**Never install shadcn/ui components and use them unchanged.**
They use the shadcn theme system (hsl CSS variables) which must be mapped to
our three-layer token system from Pack 2.

---

## Token Usage in Components

All styling must reference CSS custom properties or Tailwind classes that map to them.
Never write hex colors or hardcoded spacing values in component files.

```tsx
// ✅ Correct — token references
<div className="bg-[var(--color-surface-alt)] border border-[var(--color-border)]
                text-[var(--color-text)] rounded-[var(--radius-lg)]">

// ✅ Also correct — Tailwind classes that map to tokens in tailwind.config.ts
<div className="bg-surface-alt border border-border text-foreground rounded-lg">

// ❌ Wrong — hardcoded values
<div className="bg-gray-50 border border-gray-200 text-gray-900 rounded-xl">
```

The Tailwind config (from Pack 2) maps semantic class names to token variables:
```typescript
// tailwind.config.ts
colors: {
  'surface-alt': 'var(--color-surface-alt)',
  'border':      'var(--color-border)',
  'foreground':  'var(--color-text)',
  'primary':     'var(--color-primary)',
  // ...
}
```

---

## Props Pattern: siteConfig Defaults

Components should work with zero props by reading from siteConfig directly:

```tsx
// ✅ Pattern: props override siteConfig defaults
interface CTASectionProps {
  headline?: string
  subtext?: string
  primaryLabel?: string
  primaryHref?: string
  showEmergency?: boolean
  variant?: 'default' | 'brand' | 'dark'
}

export function CTASection({
  headline = siteConfig.cta?.headline ?? 'Ready to Get Started?',
  subtext = siteConfig.cta?.subtext ?? `Contact ${siteConfig.businessName} today.`,
  primaryLabel = 'Get a Free Estimate',
  primaryHref = '/contact',
  showEmergency = true,
  variant = 'default',
}: CTASectionProps) {
  // ...
}
```

This means Pack 3's page templates work even before Pack 5 has written copy:
```tsx
// homepage.template.tsx — works with zero props
<CTASection />  // Uses siteConfig.cta defaults
<CTASection    // Override for about page tone
  headline="Let's Work Together"
  showEmergency={false}
  variant="brand"
/>
```

---

## TypeScript Conventions

```typescript
// Always type props with explicit interfaces — never inline types
interface ComponentNameProps {
  requiredProp: string
  optionalProp?: number
  children: React.ReactNode
  className?: string         // Always include className for composability
}

// Named export (not default) for all components except Next.js pages
export function ComponentName({ requiredProp, ...props }: ComponentNameProps) {
  // ...
}

// No 'any' types — use unknown and narrow with type guards
function handleData(data: unknown) {
  if (typeof data === 'string') {
    // now TypeScript knows data is string
  }
}

// Import React types, not runtime React for RSC compatibility
import type { ReactNode, ReactElement } from 'react'
// NOT: import React from 'react'  (not needed in Next.js 13+)
```

---

## cn() Utility for Conditional Classes

Use the `cn()` utility (from shadcn/ui) for conditional class merging:

```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Usage in components:
```tsx
import { cn } from '@/lib/utils'

export function Button({ variant, disabled, className, children }: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles always applied
        'inline-flex items-center justify-center font-semibold rounded-lg transition-colors',
        'min-h-[48px] px-6 focus-visible:outline focus-visible:outline-2',
        // Variant styles
        variant === 'primary' && 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]',
        variant === 'emergency' && 'bg-[var(--btn-emergency-bg)] text-white',
        variant === 'outline' && 'border-2 border-[var(--btn-outline-border)] bg-transparent',
        // State styles
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        // Consumer override (applied last — wins over defaults)
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
```

`twMerge` ensures conflicting Tailwind classes are resolved correctly
(e.g., `bg-blue-500 bg-red-500` → only `bg-red-500` is applied).

---

## MobileCallBar — Always-Visible CTA

The highest-converting mobile element on every contractor site.
Fixed to bottom of viewport on mobile, hidden on desktop.

```tsx
// src/components/layout/MobileCallBar.tsx
// Server Component — no interactivity needed
import { siteConfig } from '@/lib/site-config'

export function MobileCallBar() {
  return (
    <div
      className="
        fixed bottom-0 left-0 right-0 z-50
        bg-[var(--call-bar-bg)] text-[var(--call-bar-text)]
        flex items-center
        h-[var(--call-bar-height)]
        safe-area-inset-bottom
        shadow-[0_-2px_12px_rgba(0,0,0,0.15)]
        lg:hidden
      "
      aria-label="Contact options"
    >
      <a
        href={`tel:${siteConfig.contact.phone}`}
        className="
          flex-1 flex items-center justify-center gap-2
          min-h-full font-semibold text-base
          animate-pulse-glow
          focus-visible:outline focus-visible:outline-2
          focus-visible:outline-white
        "
      >
        <PhoneIcon aria-hidden="true" className="h-5 w-5" />
        <span>Call {siteConfig.contact.phone}</span>
      </a>
      <div
        aria-hidden="true"
        className="w-px h-8 bg-white/30"
      />
      <a
        href="/contact"
        className="
          flex-1 flex items-center justify-center gap-2
          min-h-full font-semibold text-base
          focus-visible:outline focus-visible:outline-2
          focus-visible:outline-white
        "
      >
        <EnvelopeIcon aria-hidden="true" className="h-5 w-5" />
        <span>Get a Quote</span>
      </a>
    </div>
  )
}
```

The `padding-bottom: var(--call-bar-height)` on `<body>` (set in `globals.css`)
ensures page content is never obscured by this fixed bar on mobile.
