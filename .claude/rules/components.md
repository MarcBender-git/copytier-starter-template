---
paths:
  - "src/components/**"
---

# Component Architecture Rules

## Props-Driven Design
- Every component pulls defaults from `siteConfig` — colors, copy, phone numbers, service lists
- Accept optional override props so client sites can customize without forking the component
- Type all props with explicit interfaces, never inline object types

## Server vs Client Components
- Server Components by default — most sections are static content
- `'use client'` ONLY for: forms, carousels/sliders, mobile nav toggle, interactive modals, cookie consent
- Never wrap an entire page in `'use client'` — isolate interactivity to the smallest component

## Homepage Section Flow
Render sections in this order: Hero → Services Overview → Social Proof (testimonials) → CTA → FAQ → Final CTA
Each section is a standalone component that works independently.

## Naming & File Structure
- PascalCase component names: `HeroSection.tsx`, `ContactForm.tsx`
- One component per file, file name matches the exported component name
- Colocate component-specific types in the same file unless shared across components

## Design Tokens
- All colors, spacing, border radii from Tailwind theme tokens — NEVER hardcoded hex values
- Reference CSS custom properties defined in `tailwind.config.ts`
- If you need a color not in the theme, add it to the theme first

## Empty States
- When testimonials/services/gallery data is empty: render a styled placeholder with CTA to add content
- Never render blank space or a broken layout when data is missing
- Use `siteConfig` defaults as fallback content

## Error States
- Form validation: inline error messages below each invalid field, red border on the field
- API failures: friendly message ("Something went wrong") + retry button
- Image load failures: branded placeholder with company logo or service icon

## Skeleton Loading
- Every async-loaded section gets a skeleton component matching the shape of real content
- Use shimmer animation (Tailwind `animate-pulse`) on placeholder blocks
- Skeletons must match the dimensions of loaded content to prevent layout shift

## Accessibility
- Every `<img>` must have descriptive `alt` text — not "image" or empty string
- Every button has clear action text: "Get Free Estimate", "Call Now" — never "Click here" or "Submit"
- Interactive elements need `aria-label` when the visual label isn't sufficient
- Color contrast ratio: 4.5:1 minimum for body text, 3:1 for large text
