# Motion Patterns for Contractor Websites

## Core Principle

Animation on contractor sites has one job: **direct attention toward conversion actions**. Every animation must be justifiable by this test. If an animation cannot be directly tied to guiding the user toward calling or submitting a form, remove it.

**Performance principle:** Only animate `transform` and `opacity`. Animating any other property (width, height, padding, margin, color, background) forces layout recalculation and will hurt Core Web Vitals.

---

## Approved Animation Patterns

### 1. Fade-In on Scroll (Primary Pattern)

The standard entrance animation for all below-the-fold sections. Sections fade in as the user scrolls to them, creating a sense of progressive content reveal.

**Implementation: IntersectionObserver (preferred)**

```typescript
// hooks/useScrollAnimation.ts
import { useEffect, useRef } from 'react'

export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect user motion preferences before setting up observer
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      el.style.opacity = '1'
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('animate-fade-in')
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
```

**CSS setup in globals.css (scroll animation targets start invisible):**

```css
.scroll-animate {
  opacity: 0;
}

.scroll-animate.animate-fade-in {
  animation: fadeIn 350ms ease-out forwards;
}

@media (prefers-reduced-motion: reduce) {
  .scroll-animate {
    opacity: 1 !important;
    animation: none !important;
  }
}
```

**Usage in component:**

```tsx
export function ServiceCard({ ... }) {
  const ref = useScrollAnimation()
  return (
    <div ref={ref} className="scroll-animate">
      ...
    </div>
  )
}
```

### 2. Staggered Children Fade-In

For grids of cards (service cards, team members), stagger the animations by 50-75ms per item.

```css
.stagger-children > *:nth-child(1) { animation-delay: 0ms; }
.stagger-children > *:nth-child(2) { animation-delay: 75ms; }
.stagger-children > *:nth-child(3) { animation-delay: 150ms; }
.stagger-children > *:nth-child(4) { animation-delay: 225ms; }
.stagger-children > *:nth-child(5) { animation-delay: 300ms; }
.stagger-children > *:nth-child(6) { animation-delay: 350ms; }
/* Cap at 350ms total — no stagger beyond 6 items */
```

### 3. Hover State Transitions (Interactive Elements)

All interactive elements must have a 200ms transition on hover. This is the **only** motion for above-the-fold elements.

```css
/* Applied via Tailwind: transition-all duration-200 ease-smooth */
/* Or specific properties: */
.btn-cta {
  transition: background-color 200ms ease, box-shadow 200ms ease, transform 200ms ease;
}
.btn-cta:hover {
  transform: translateY(-1px); /* 1px lift — subtle, not dramatic */
}

.service-card {
  transition: box-shadow 200ms ease, transform 200ms ease;
}
.service-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-card-hover);
}
```

### 4. CTA Pulse (Click-to-Call Button — Mobile Only)

A gentle pulse on the mobile sticky call button draws the eye without being jarring.

```css
/* globals.css */
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0 0 var(--color-accent-shadow); }
  50%       { box-shadow: 0 0 0 8px transparent; }
}

.btn-call-pulse {
  animation: pulseGlow 2.5s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .btn-call-pulse {
    animation: none;
  }
}
```

---

## What NEVER to Animate

| Element | Reason |
|---|---|
| Hero section (entire) | Hero contains the LCP element — animation delays visible content |
| Hero headline or H1 | LCP candidate; any animation tanks LCP score in Core Web Vitals |
| Hero background image | fetchpriority="high" images must not be composited by animations |
| Navigation bar | Users need nav immediately; animation creates perceived lag |
| Any text block over 2 lines | Animating reading content distracts from comprehension |
| Form fields | Animating inputs on focus breaks expected browser behavior |
| Layout properties | width, height, margin, padding force reflow — never animate these |
| Color transitions on text | Background color changes are acceptable; foreground text color changes hurt readability |

---

## Reduced Motion Implementation

**This is mandatory.** California has WCAG compliance requirements for state-funded sites, and many users have vestibular disorders.

```css
/* At the top of your animation declarations in globals.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Ensure scroll-animate elements are visible even without animation */
  .scroll-animate {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

---

## Performance Checklist

Before any animation ships:
- [ ] Only `transform` and `opacity` are animated (no layout properties)
- [ ] `prefers-reduced-motion` override is present
- [ ] Hero section has zero animation applied (static render only)
- [ ] No JavaScript animation libraries (Framer Motion, GSAP) — CSS-only
- [ ] Keyframes defined in `tailwind.config.ts` or `globals.css`, not inline
- [ ] Animation durations ≤ 350ms (except loop animations like pulse)
- [ ] `will-change: transform` only added if you observe compositing issues (not preemptively)
