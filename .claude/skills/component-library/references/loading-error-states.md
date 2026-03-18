# Loading, Empty, and Error States

Every component that may be waiting for data or may fail must implement all three.
Never leave a component that renders nothing — always show the appropriate state.

---

## Skeleton Components

Skeletons mimic the shape of loaded content to prevent layout shift.
Use `animate-pulse` for the shimmer effect. Always mark as `aria-busy="true"`.

### SkeletonBase

```tsx
// src/components/ui/Skeleton.tsx
interface SkeletonProps {
  className?: string
  'aria-label'?: string
}

export function Skeleton({ className, 'aria-label': ariaLabel }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded bg-gray-200 ${className}`}
      aria-hidden="true"   // Decorative — outer container has aria-busy
    />
  )
}
```

### SkeletonCard (Service Card shape)

```tsx
export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-gray-100 p-6 space-y-4">
      {/* Icon placeholder */}
      <Skeleton className="h-12 w-12 rounded-lg" />
      {/* Title placeholder */}
      <Skeleton className="h-6 w-3/4" />
      {/* Description lines */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
      {/* CTA link placeholder */}
      <Skeleton className="h-4 w-1/3" />
    </div>
  )
}
```

### SkeletonTestimonial

```tsx
export function SkeletonTestimonial() {
  return (
    <div className="rounded-xl border border-gray-100 p-6 space-y-4">
      {/* Stars */}
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-5 w-5 rounded-full" />
        ))}
      </div>
      {/* Quote text */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      {/* Attribution */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  )
}
```

### SkeletonHero

```tsx
export function SkeletonHero() {
  return (
    <div
      className="min-h-[500px] bg-gray-100 animate-pulse flex items-center"
      aria-busy="true"
      aria-label="Loading hero section"
    >
      <div className="container mx-auto px-4 space-y-6">
        <Skeleton className="h-12 w-2/3 max-w-2xl" />
        <Skeleton className="h-6 w-1/2 max-w-xl" />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-40 rounded-lg" />
          <Skeleton className="h-12 w-40 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
```

### Using Skeletons in Suspense Boundaries

```tsx
// In a page or section component
import { Suspense } from 'react'

<Suspense fallback={
  <div
    aria-busy="true"
    aria-label="Loading services"
    className="grid grid-cols-1 md:grid-cols-3 gap-6"
  >
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
  </div>
}>
  <ServicesGrid />
</Suspense>
```

---

## Empty States

When a component has no data to show, render a clear, actionable message.
Never render an empty container or broken grid.

### EmptyState Component

```tsx
// src/components/ui/EmptyState.tsx
interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {icon && (
        <div
          className="mb-4 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center"
          aria-hidden="true"
        >
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-[var(--color-text)]">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-[var(--color-text-secondary)] max-w-sm">
          {description}
        </p>
      )}
      {action && (
        <div className="mt-6">
          {action.href ? (
            <a
              href={action.href}
              className="btn-primary"
              target={action.href.startsWith('http') ? '_blank' : undefined}
              rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {action.label}
            </a>
          ) : (
            <button type="button" className="btn-primary" onClick={action.onClick}>
              {action.label}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
```

### Pre-built Empty State Presets

```tsx
// When siteConfig.testimonials is empty
export function NoReviewsState() {
  return (
    <EmptyState
      icon={<StarIcon className="h-6 w-6 text-gray-400" />}
      title="Reviews coming soon"
      description="We're proud of our work and our first reviews will be posted shortly."
      action={{
        label: 'See us on Google',
        href: siteConfig.socialLinks?.googleBusiness ?? '#',
      }}
    />
  )
}

// When a service area page has no FAQs
export function NoFaqsState() {
  return (
    <EmptyState
      title="Have questions?"
      description="Call us directly — we're happy to answer anything."
      action={{
        label: `Call ${siteConfig.contact.phone}`,
        href: `tel:${siteConfig.contact.phone}`,
      }}
    />
  )
}
```

### Grid Minimum Items Rule

Never render a grid with fewer items than the minimum for that layout:

```tsx
function ServicesGridSection({ services }: { services: ServiceConfig[] }) {
  // Guard: need at least 2 items for a grid to look intentional
  if (!services || services.length === 0) {
    return <NoServicesState />
  }

  if (services.length === 1) {
    // Single service: centered card layout, not a grid
    return (
      <div className="flex justify-center">
        <ServiceCard service={services[0]} className="max-w-md" />
      </div>
    )
  }

  // 2+ services: grid
  const cols = services.length <= 2 ? 2 : services.length <= 4 ? 2 : 3
  return (
    <ul
      role="list"
      className={`grid grid-cols-1 md:grid-cols-${cols} gap-6`}
    >
      {services.map(service => (
        <li key={service.slug}>
          <ServiceCard service={service} />
        </li>
      ))}
    </ul>
  )
}
```

---

## Error Boundary

Wraps sections to prevent full-page crashes from component errors.

```tsx
// src/components/ui/ErrorBoundary.tsx
'use client'

import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  sectionName?: string   // For logging context
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(
      `[ErrorBoundary] Section "${this.props.sectionName ?? 'unknown'}" crashed:`,
      error,
      info.componentStack
    )
    // Pack 8 hooks this into error monitoring (Vercel, Sentry, etc.)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div
          role="alert"
          className="py-12 px-4 text-center bg-gray-50 rounded-xl border border-gray-200"
        >
          <p className="text-[var(--color-text-secondary)] mb-4">
            This section couldn&apos;t load.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              type="button"
              className="btn-outline"
              onClick={() => this.setState({ hasError: false })}
            >
              Try Again
            </button>
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="btn-primary"
            >
              Call Us Instead
            </a>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
```

Usage — wrap any section that might fail:
```tsx
<ErrorBoundary sectionName="TestimonialsSection">
  <TestimonialsSection />
</ErrorBoundary>
```

---

## Toast Notification System

For non-blocking feedback (form success/error when not using inline states).

```tsx
// src/components/ui/Toast.tsx
'use client'

import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  type: 'success' | 'error' | 'info'
  duration?: number    // ms before auto-dismiss, default: 5000
  onDismiss: () => void
}

export function Toast({ message, type, duration = 5000, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration)
    return () => clearTimeout(timer)
  }, [duration, onDismiss])

  const styles = {
    success: 'bg-green-50 border-green-200 text-green-900',
    error: 'bg-red-50 border-red-200 text-red-900',
    info: 'bg-blue-50 border-blue-200 text-blue-900',
  }

  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      aria-atomic="true"
      className={`
        fixed bottom-4 right-4 z-[9998]
        flex items-start gap-3
        max-w-sm w-full rounded-xl border p-4 shadow-lg
        ${styles[type]}
      `}
    >
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={onDismiss}
        className="flex-shrink-0 rounded p-0.5 hover:bg-black/10
                   focus-visible:outline focus-visible:outline-2"
      >
        <XMarkIcon aria-hidden="true" className="h-4 w-4" />
      </button>
    </div>
  )
}

// Toast state hook
export function useToast() {
  const [toast, setToast] = useState<Omit<ToastProps, 'onDismiss'> | null>(null)

  function showToast(message: string, type: ToastProps['type'] = 'info') {
    setToast({ message, type })
  }

  function dismissToast() {
    setToast(null)
  }

  return { toast, showToast, dismissToast }
}
```

---

## next/navigation Loading UI

For page-level transitions using Next.js loading.tsx:

```tsx
// src/app/loading.tsx — global loading UI
export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      aria-busy="true"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-10 w-10 rounded-full border-4 border-gray-200
                     border-t-[var(--color-primary)] animate-spin"
          aria-hidden="true"
        />
        <p className="text-[var(--color-text-secondary)] text-sm">Loading...</p>
      </div>
    </div>
  )
}
```

```tsx
// src/app/services/[serviceSlug]/loading.tsx — service page loading
export default function ServicePageLoading() {
  return (
    <main aria-busy="true" aria-label="Loading service page">
      <SkeletonHero />
      <div className="container mx-auto px-4 py-16 space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    </main>
  )
}
```
