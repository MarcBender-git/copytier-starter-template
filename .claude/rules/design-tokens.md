---
paths:
  - "tailwind.config.ts"
  - "src/styles/**"
---

# Design Token Rules

## Color System — 60-30-10 Rule
- **60%** white/light neutrals — clean, professional background
- **30%** brand primary — headers, sections, key UI elements
- **10%** CTA accent — buttons, links, urgent callouts
- Define all colors as CSS custom properties AND Tailwind theme extensions

## Color Associations by Trade
- **Blue** = trust/reliability → plumbing, HVAC, general contracting
- **Green** = eco/growth → landscaping, solar, energy efficiency
- **Orange/Red** = urgency/energy → emergency services, roofing, fire restoration
- **Dark Navy** = premium/established → high-end remodeling, luxury builds
- Each client's palette is set in `site.config.ts` and flows into Tailwind theme

## Typography
- **Scale**: Major Third ratio (1.25) — each heading level is 1.25x the previous
- **Fonts**: Clean, authoritative typefaces. NEVER use Inter, Arial, Roboto, or system defaults
- Pair a strong heading font with a highly readable body font. 2-3 font families maximum
- Load via `next/font` for zero layout shift

## Font Sizing
- Base body: 16-18px minimum (never smaller for body text)
- Line height: 1.5-1.6 for body, 1.1-1.3 for headings
- Max line length: 65ch for readability
- Fluid typography with `clamp()`: e.g., `clamp(1rem, 0.5rem + 2vw, 2rem)`

## Spacing — 8pt Grid
- All spacing values are multiples of 8: 8, 16, 24, 32, 48, 64, 96px
- 4pt half-step (4, 12, 20px) allowed for fine adjustments only
- Map to Tailwind spacing scale: `space-2` (8px), `space-4` (16px), `space-6` (24px), etc.
- Section padding: minimum 64px (py-16) vertical on desktop, 48px (py-12) on mobile

## Implementation
- All tokens defined as CSS custom properties in `:root` AND as Tailwind theme extensions
- Components NEVER use magic numbers — always reference theme tokens
- Dark mode: not required for contractor sites, but structure tokens to support it if needed later
- Breakpoints: mobile-first — `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`
