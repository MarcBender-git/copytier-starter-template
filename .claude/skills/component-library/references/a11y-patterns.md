# Accessibility Patterns — Copy-Paste Reference

WCAG 2.2 AA compliant patterns for every interactive component.
Use these implementations verbatim — do not improvise accessibility code.

---

## Skip Navigation Link

Must be the FIRST focusable element on every page. Visually hidden until focused.

```tsx
// src/components/layout/SkipLink.tsx
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="
        skip-link
        fixed top-[-100%] left-4 z-[9999]
        bg-[var(--color-primary)] text-[var(--color-text-on-primary)]
        px-6 py-3 rounded-md font-semibold
        transition-[top] duration-150
        focus:top-4
      "
    >
      Skip to main content
    </a>
  )
}

// Usage in layout.tsx — must be FIRST child of <body>
<body>
  <SkipLink />
  <Header />
  <main id="main-content" tabIndex={-1}>...</main>
</body>
```

`tabIndex={-1}` on `<main>` allows programmatic focus but keeps it out of Tab order.

---

## Focus Trap (Modal / Drawer)

```typescript
// src/lib/hooks/useFocusTrap.ts
import { useEffect, useRef } from 'react'

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  'details > summary',
].join(', ')

export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const container = containerRef.current
    const focusableElements = Array.from(
      container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
    )

    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    // Focus first element when trap activates
    firstElement.focus()

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        // Shift+Tab: going backward
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        // Tab: going forward
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown)
    return () => container.removeEventListener('keydown', handleKeyDown)
  }, [isActive])

  return containerRef
}
```

Usage:
```tsx
function Modal({ isOpen, onClose, children }) {
  const containerRef = useFocusTrap(isOpen)

  // Return focus to trigger on close
  const triggerRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!isOpen) triggerRef.current?.focus()
  }, [isOpen])

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {children}
    </div>
  )
}
```

---

## Escape Key Handler

Add to any overlay (modal, drawer, dropdown):

```typescript
// src/lib/hooks/useEscapeKey.ts
import { useEffect } from 'react'

export function useEscapeKey(handler: () => void, isActive: boolean) {
  useEffect(() => {
    if (!isActive) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        handler()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handler, isActive])
}
```

---

## Accordion Keyboard Navigation

```tsx
// Arrow key navigation between accordion triggers
function AccordionTrigger({ index, totalItems, onFocusItem, ...props }) {
  function handleKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        onFocusItem(Math.min(index + 1, totalItems - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        onFocusItem(Math.max(index - 1, 0))
        break
      case 'Home':
        e.preventDefault()
        onFocusItem(0)
        break
      case 'End':
        e.preventDefault()
        onFocusItem(totalItems - 1)
        break
    }
  }

  return (
    <button
      aria-expanded={props.isOpen}
      aria-controls={`panel-${props.id}`}
      id={`trigger-${props.id}`}
      onKeyDown={handleKeyDown}
      onClick={props.onToggle}
      className="w-full text-left flex justify-between items-center
                 min-h-[48px] px-4 py-3 font-semibold
                 focus-visible:outline focus-visible:outline-2
                 focus-visible:outline-[var(--color-border-focus)]"
    >
      {props.question}
      <ChevronDownIcon
        aria-hidden="true"
        className={`transition-transform ${props.isOpen ? 'rotate-180' : ''}`}
      />
    </button>
  )
}

function AccordionPanel({ id, isOpen, children }) {
  return (
    <div
      id={`panel-${id}`}
      role="region"
      aria-labelledby={`trigger-${id}`}
      hidden={!isOpen}
    >
      {children}
    </div>
  )
}
```

---

## Live Region Announcements

For dynamic content updates that screen readers must announce:

```tsx
// src/components/ui/LiveRegion.tsx

// Polite: announced after current speech finishes (form field errors, filter results)
export function PoliteAnnouncement({ message }: { message: string }) {
  return (
    <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
      {message}
    </div>
  )
}

// Assertive: interrupts current speech (form submission errors, critical alerts)
export function AssertiveAlert({ message }: { message: string }) {
  return (
    <div role="alert" aria-live="assertive" aria-atomic="true">
      {message}
    </div>
  )
}
```

Usage in TestimonialsCarousel:
```tsx
// Announce slide changes to screen readers
<div
  aria-live="polite"
  aria-atomic="true"
  className="sr-only"
>
  Review {currentIndex + 1} of {total}: {reviews[currentIndex].author}
</div>
```

---

## Form Field Error Pattern

```tsx
function FormField({ id, label, error, required, children }) {
  const errorId = `${id}-error`

  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[var(--color-text)]"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-red-500">*</span>
        )}
        {required && <span className="sr-only">(required)</span>}
      </label>

      {/* Clone child to inject accessibility props */}
      {React.cloneElement(children as React.ReactElement, {
        id,
        'aria-describedby': error ? errorId : undefined,
        'aria-invalid': error ? 'true' : undefined,
        'aria-required': required,
      })}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-sm text-red-600 flex items-center gap-1"
        >
          <ExclamationIcon aria-hidden="true" className="h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  )
}
```

---

## Icon Button Pattern

Icon-only buttons MUST have an accessible name:

```tsx
// ✅ Correct
<button
  type="button"
  aria-label="Close dialog"
  onClick={onClose}
  className="min-h-[48px] min-w-[48px] flex items-center justify-center rounded-md
             hover:bg-gray-100 focus-visible:outline focus-visible:outline-2
             focus-visible:outline-[var(--color-border-focus)]"
>
  <XMarkIcon aria-hidden="true" className="h-5 w-5" />
</button>

// ❌ Wrong — no accessible name
<button onClick={onClose}>
  <XMarkIcon className="h-5 w-5" />
</button>
```

---

## Loading State ARIA Pattern

```tsx
// When content is loading, announce to screen readers
<div
  aria-busy="true"
  aria-label="Loading services"
  aria-live="polite"
>
  <SkeletonCard />
  <SkeletonCard />
  <SkeletonCard />
</div>

// When loaded, aria-busy is removed and content is announced
<div
  aria-busy="false"  // or just remove the attribute
>
  {services.map(service => <ServiceCard key={service.slug} {...service} />)}
</div>
```

---

## Navigation ARIA Patterns

```tsx
// Main navigation
<nav aria-label="Main navigation" role="navigation">
  <ul role="list">
    {navLinks.map(link => (
      <li key={link.href}>
        <a
          href={link.href}
          aria-current={isCurrentPage(link.href) ? 'page' : undefined}
          className="..."
        >
          {link.label}
        </a>
      </li>
    ))}
  </ul>
</nav>

// Breadcrumb navigation
<nav aria-label="Breadcrumb">
  <ol role="list" className="flex items-center gap-2">
    {breadcrumbs.map((crumb, i) => (
      <li key={crumb.href} className="flex items-center gap-2">
        {i > 0 && (
          <span aria-hidden="true" className="text-gray-400">/</span>
        )}
        {i === breadcrumbs.length - 1 ? (
          // Current page — not a link
          <span aria-current="page" className="font-medium">
            {crumb.label}
          </span>
        ) : (
          <a href={crumb.href} className="text-[var(--color-text-link)] hover:underline">
            {crumb.label}
          </a>
        )}
      </li>
    ))}
  </ol>
</nav>
```

---

## Star Rating Pattern (Read-only, Decorative)

```tsx
// Visual stars with accessible text description
function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-1">
      {/* Screen reader text */}
      <span className="sr-only">{rating} out of {max} stars</span>

      {/* Visual stars — aria-hidden since sr-only above handles it */}
      <div aria-hidden="true" className="flex gap-0.5">
        {Array.from({ length: max }, (_, i) => (
          <StarIcon
            key={i}
            className={i < rating
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300'
            }
          />
        ))}
      </div>
    </div>
  )
}
```

---

## Mobile Menu Accessibility

```tsx
'use client'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const containerRef = useFocusTrap(isOpen)
  useEscapeKey(() => setIsOpen(false), isOpen)

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Hamburger trigger */}
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={() => setIsOpen(!isOpen)}
        className="min-h-[48px] min-w-[48px] flex items-center justify-center lg:hidden"
      >
        {isOpen ? (
          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
        ) : (
          <Bars3Icon aria-hidden="true" className="h-6 w-6" />
        )}
      </button>

      {/* Menu panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            aria-hidden="true"
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div
            ref={containerRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-y-0 right-0 w-80 max-w-full z-50 bg-white shadow-xl"
          >
            <nav aria-label="Mobile navigation">
              {/* ... nav links ... */}
            </nav>
          </div>
        </>
      )}
    </>
  )
}
```

---

## Contrast Minimum Reference

| Text Type | Minimum Ratio | Tailwind Token |
|---|---|---|
| Normal body text | 4.5:1 | `text-gray-700` on white: 6.3:1 ✓ |
| Large text (18px+ or 14px bold) | 3:1 | `text-gray-600` on white: 4.6:1 ✓ |
| UI components (borders, icons) | 3:1 | `border-gray-300` on white: 2.5:1 ✗ → use `border-gray-400` |
| Placeholder text | 4.5:1 | `placeholder-gray-400` on white: 2.8:1 ✗ → use `placeholder-gray-500` |
| White text on primary blue | 4.5:1 | Check with contrast.tools for your specific primary color |

Never use placeholder color for required contrast — visible label always.
