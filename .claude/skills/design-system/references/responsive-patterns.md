# Responsive Patterns for Contractor Websites

## Mobile-First Philosophy

Write mobile styles first. Use Tailwind breakpoint prefixes (`sm:`, `md:`, `lg:`, `xl:`) to progressively enhance for larger screens. Never write desktop styles and attempt to undo them for mobile — that creates specificity battles and bloated CSS.

**Design targets:**
- Mobile: 375px (iPhone SE — lowest common denominator)
- Tablet: 768px (iPad portrait)
- Desktop: 1280px (standard laptop/monitor)
- Large: 1440px (iMac / large monitor — test here, don't design here)

---

## Breakpoint Strategy

```
xs (375px+)   — Default styles, write these FIRST
sm (640px+)   — Large phones, landscape phones
md (768px+)   — Tablets
lg (1024px+)  — Small laptops, iPad landscape
xl (1280px+)  — Desktop target
2xl (1536px+) — Large monitors (minor adjustments only)
```

---

## Container Pattern

The `container` class in Tailwind handles centering and max-width. Always wrap page content in a container. Never nest containers.

```tsx
// Standard page section
<section className="py-16 lg:py-24">
  <div className="container">
    {/* Content */}
  </div>
</section>

// Full-bleed background, constrained content
<section className="bg-brand-primary-800 py-16 lg:py-24">
  <div className="container">
    {/* Content */}
  </div>
</section>
```

Container widths (set in `tailwind.config.ts`):
```
Mobile:  100% - 32px padding (16px each side)
sm:      100% - 48px padding
md:      100% - 64px padding
lg:      960px max, centered
xl:      1200px max, centered
```

---

## Fluid Typography with clamp()

Fluid typography scales smoothly between viewport sizes without JavaScript. Use for hero headlines and H1/H2 headings.

```css
/* Standard fluid scale anchors */
.text-fluid-hero { font-size: clamp(2rem,    5vw + 1rem,   3.815rem); }
.text-fluid-h1   { font-size: clamp(1.75rem, 4vw + 0.75rem, 3.052rem); }
.text-fluid-h2   { font-size: clamp(1.5rem,  3vw + 0.5rem,  2.441rem); }
.text-fluid-h3   { font-size: clamp(1.25rem, 2.5vw + 0.25rem, 1.953rem); }
```

**Reading these:** `clamp(minimum, preferred, maximum)`
- `clamp(2rem, 5vw + 1rem, 3.815rem)` = at least 32px, scales with viewport width, never exceeds 61px

Do not apply fluid sizing to body text — it makes body copy uncomfortably large on wide screens. Use a fixed `text-base` (16-18px) for body.

---

## Grid Patterns

### 12-Column Grid (Conceptual)

Use Tailwind grid utilities for layout. Think in 12 columns:

```tsx
// Two-column with sidebar (content = 8 cols, sidebar = 4 cols)
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
  <main className="lg:col-span-8">{/* Main content */}</main>
  <aside className="lg:col-span-4">{/* Sidebar */}</aside>
</div>
```

### Service Cards Grid

```tsx
// 1 column mobile → 2 columns tablet → 3 columns desktop
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
  {services.map(service => <ServiceCard key={service.id} {...service} />)}
</div>
```

### Testimonials Grid

```tsx
// 1 column mobile → 2 columns md → 3 columns xl
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
  {testimonials.map(t => <TestimonialCard key={t.id} {...t} />)}
</div>
```

### Feature Stats Row

```tsx
// 2 columns mobile → 4 columns desktop (trust stats: years, jobs, rating, guarantee)
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
  {stats.map(stat => <StatBlock key={stat.label} {...stat} />)}
</div>
```

---

## Touch Target Sizes

**Minimum touch target: 48px × 48px** (WCAG 2.5.5 — Target Size, AAA). Apply to:

```css
/* globals.css */
/* Touch target enforcement */
.btn, button, a, [role="button"] {
  min-height: 44px;      /* iOS HIG minimum (use 48px when possible) */
  min-width: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Mobile click-to-call — must be at least 48px tall */
.btn-call-mobile {
  min-height: 48px;
  padding: 12px 24px;
}
```

---

## Mobile-Specific Patterns

### Sticky Call Bar (Mobile Only)

Present on all pages. Hidden on desktop.

```tsx
// src/components/layout/StickyCallBar.tsx
<div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-brand-accent shadow-lg">
  <a
    href={`tel:${siteConfig.contact.phone}`}
    className="flex items-center justify-center gap-3 py-4 text-white font-heading font-bold text-lg"
  >
    <PhoneIcon className="w-5 h-5" />
    Call Now: {siteConfig.contact.phone}
  </a>
</div>
```

### Navigation: Mobile Hamburger → Desktop Horizontal

```tsx
<nav>
  {/* Desktop nav — hidden on mobile */}
  <div className="hidden lg:flex items-center gap-8">
    {navLinks.map(link => <NavLink key={link.href} {...link} />)}
  </div>

  {/* Mobile hamburger — hidden on desktop */}
  <button className="lg:hidden" aria-label="Open menu">
    <MenuIcon />
  </button>
</nav>
```

---

## Device Testing Matrix

Test every page at these viewport dimensions before Pack 8:

| Device | Width | Height | Critical Test |
|---|---|---|---|
| iPhone SE | 375px | 667px | CTA visible without scroll, tap targets ≥48px |
| iPhone 14 | 390px | 844px | Standard mobile check |
| iPad Mini | 768px | 1024px | Layout shift at md breakpoint |
| iPad Pro | 1024px | 1366px | Layout shift at lg breakpoint |
| Desktop | 1280px | 800px | Full layout, container max-width |
| Large Monitor | 1440px | 900px | No content stretch beyond container |

Use Playwright MCP for automated screenshots at 375px and 1280px after each major component build.
