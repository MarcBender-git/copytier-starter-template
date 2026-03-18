# Tailwind Config Specification

## Architecture Rules

1. **Never hardcode hex values** in `tailwind.config.ts` — all colors reference CSS custom properties
2. The config `extends` Tailwind defaults — never `purge` or replace the full theme
3. All brand colors are accessed as `brand-primary`, `brand-accent`, `brand-neutral` in Tailwind classes
4. Font families reference CSS variables set by `next/font/google` on the `<html>` element
5. Custom animations are defined here but triggered via `globals.css` utility classes

---

## Complete Config Structure

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // --- CONTAINER: override default to add centered padding ---
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',     // 16px mobile
        sm: '1.5rem',        // 24px
        lg: '2rem',          // 32px
        xl: '2.5rem',        // 40px
        '2xl': '2.5rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',        // Max content width
        '2xl': '1200px',     // Cap at 1200px — don't go wider
      },
    },

    extend: {
      // ─────────────────────────────────────────────
      // COLORS — all reference CSS custom properties
      // ─────────────────────────────────────────────
      colors: {
        // Primary brand scale (10 stops)
        'brand-primary': {
          50:  'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
          DEFAULT: 'var(--color-primary)',
        },
        // Accent / CTA scale (10 stops)
        'brand-accent': {
          50:  'var(--color-accent-50)',
          100: 'var(--color-accent-100)',
          200: 'var(--color-accent-200)',
          300: 'var(--color-accent-300)',
          400: 'var(--color-accent-400)',
          500: 'var(--color-accent-500)',
          600: 'var(--color-accent-600)',
          700: 'var(--color-accent-700)',
          800: 'var(--color-accent-800)',
          900: 'var(--color-accent-900)',
          DEFAULT: 'var(--color-accent)',
        },
        // Neutral scale
        'brand-neutral': {
          50:  'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
          DEFAULT: 'var(--color-neutral)',
        },
        // Semantic shortcuts — reference these in components
        primary:    'var(--color-primary)',
        accent:     'var(--color-accent)',
        surface:    'var(--color-surface)',
        'surface-alt': 'var(--color-surface-alt)',
        border:     'var(--color-border)',
        'text-base':   'var(--color-text)',
        'text-muted':  'var(--color-text-muted)',
      },

      // ─────────────────────────────────────────────
      // FONTS — reference CSS variables from next/font
      // ─────────────────────────────────────────────
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
        sans:    ['var(--font-body)', 'system-ui', 'sans-serif'], // Override default sans
      },

      // ─────────────────────────────────────────────
      // FONT SIZES — Major Third 1.25× scale with clamp
      // ─────────────────────────────────────────────
      fontSize: {
        'xs':   ['0.75rem',  { lineHeight: '1rem' }],
        'sm':   ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem',     { lineHeight: '1.625rem' }],
        'lg':   ['1.25rem',  { lineHeight: '1.875rem' }],
        'xl':   ['1.563rem', { lineHeight: '2rem' }],
        '2xl':  ['1.953rem', { lineHeight: '2.25rem' }],
        '3xl':  ['2.441rem', { lineHeight: '2.75rem' }],
        '4xl':  ['3.052rem', { lineHeight: '3.25rem' }],
        '5xl':  ['3.815rem', { lineHeight: '1.15' }],
        // Fluid hero size — prefer using CSS clamp directly for this
        'fluid-hero': ['clamp(2rem, 5vw + 1rem, 3.815rem)', { lineHeight: '1.15' }],
        'fluid-h1':   ['clamp(1.75rem, 4vw + 0.75rem, 3.052rem)', { lineHeight: '1.2' }],
        'fluid-h2':   ['clamp(1.5rem, 3vw + 0.5rem, 2.441rem)', { lineHeight: '1.25' }],
      },

      // ─────────────────────────────────────────────
      // SPACING — 8pt grid (Tailwind default is 4pt, extend with key values)
      // ─────────────────────────────────────────────
      spacing: {
        '18': '4.5rem',   // 72px — occasional use
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
        '34': '8.5rem',   // 136px — section padding desktop
        '88': '22rem',    // Large spacing utility
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
      },

      // ─────────────────────────────────────────────
      // BORDER RADIUS
      // ─────────────────────────────────────────────
      borderRadius: {
        'sm':  '4px',    // Subtle rounding for inputs
        DEFAULT: '6px',  // Standard rounding
        'md':  '8px',    // Cards
        'lg':  '12px',   // Feature cards, prominent elements
        'xl':  '16px',   // Hero badges, trust pills
        '2xl': '24px',   // Rounded sections (use sparingly)
        'full': '9999px', // Pills, badges, circular elements
      },

      // ─────────────────────────────────────────────
      // BOX SHADOWS — elevation system
      // ─────────────────────────────────────────────
      boxShadow: {
        'card':    '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
        'card-hover': '0 4px 12px 0 rgb(0 0 0 / 0.12), 0 2px 4px -1px rgb(0 0 0 / 0.08)',
        'section': '0 -1px 0 0 rgb(0 0 0 / 0.06)',
        'nav':     '0 2px 8px 0 rgb(0 0 0 / 0.08)',
        'cta':     '0 4px 14px 0 var(--color-accent-shadow)',
        'cta-hover': '0 6px 20px 0 var(--color-accent-shadow)',
        'inner-sm': 'inset 0 1px 2px 0 rgb(0 0 0 / 0.05)',
      },

      // ─────────────────────────────────────────────
      // SCREENS — breakpoints (mobile-first)
      // ─────────────────────────────────────────────
      screens: {
        'xs': '375px',   // Smallest supported mobile
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        // Named aliases for semantic use
        'tablet': '768px',
        'desktop': '1024px',
      },

      // ─────────────────────────────────────────────
      // ANIMATION — keyframes defined, triggered by globals.css
      // ─────────────────────────────────────────────
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 var(--color-accent-shadow)' },
          '50%':       { boxShadow: '0 0 0 8px transparent' },
        },
      },
      animation: {
        'fade-in':      'fadeIn 350ms ease-out forwards',
        'fade-in-up':   'fadeInUp 350ms ease-out forwards',
        'fade-in-left': 'fadeInLeft 350ms ease-out forwards',
        'pulse-glow':   'pulseGlow 2s ease-in-out infinite',
      },

      // ─────────────────────────────────────────────
      // TRANSITION TIMING
      // ─────────────────────────────────────────────
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
        '350': '350ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-sm': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}

export default config
```

---

## Usage Examples in Component Classes

```tsx
// CTA Button
<button className="
  bg-brand-accent text-white font-heading font-bold
  px-8 py-4 rounded-xl shadow-cta
  hover:bg-brand-accent-700 hover:shadow-cta-hover
  transition-all duration-200 ease-smooth
  text-lg tracking-wide
">
  Get Free Estimate
</button>

// Section heading
<h2 className="font-heading font-bold text-fluid-h2 text-brand-neutral-900">
  Our Services
</h2>

// Service card
<div className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow duration-200 p-6">
  ...
</div>
```
