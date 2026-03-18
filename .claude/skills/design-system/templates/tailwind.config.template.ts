/**
 * PACK 2: Tailwind Config Template
 * =================================
 * Starting point for generated tailwind.config.ts.
 * All comments marked [INJECT: ...] indicate where Pack 2 injects values
 * derived from siteConfig.branding. Replace them — never ship placeholder comments.
 *
 * RULES:
 * - Never hardcode hex values here — all colors reference CSS custom properties
 * - Font families reference CSS variables set by next/font/google in layout.tsx
 * - This file EXTENDS Tailwind defaults — do not replace the full theme
 */

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // CONTAINER CONFIGURATION
  // Controls the .container utility class behavior
  // ─────────────────────────────────────────────────────────────────────────
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',    // 16px — mobile horizontal padding
        sm: '1.5rem',       // 24px
        md: '2rem',         // 32px
        lg: '2rem',         // 32px
        xl: '2.5rem',       // 40px
        '2xl': '2.5rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',       // Content max-width — don't go wider for readability
        '2xl': '1200px',
      },
    },

    extend: {

      // ═══════════════════════════════════════════════════════════════════
      // COLORS
      // All values reference CSS custom properties defined in tokens.css.
      // The CSS variables are populated with generated scale values during
      // Pack 2 execution. Do NOT put hex values here.
      // ═══════════════════════════════════════════════════════════════════
      colors: {
        // ── Primary Brand Scale ──────────────────────────────────────────
        // [INJECT: Generated from siteConfig.branding.colors.primary]
        // Example primary: #1D4ED8 (deep blue)
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

        // ── Accent / CTA Scale ───────────────────────────────────────────
        // [INJECT: Generated from siteConfig.branding.colors.accent]
        // Example accent: #F97316 (orange — used for CTAs only)
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

        // ── Neutral Scale ─────────────────────────────────────────────────
        // [INJECT: Generated neutral tinted with primary hue]
        // Used for text, borders, backgrounds, and structural elements
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

        // ── Semantic Shortcuts ─────────────────────────────────────────────
        // Convenience aliases for common semantic token use in component classes
        // Use these in components instead of raw scale values
        'primary':      'var(--color-primary)',
        'accent':       'var(--color-accent)',
        'surface':      'var(--color-surface)',
        'surface-alt':  'var(--color-surface-alt)',
        'border-color': 'var(--color-border)',
        'text-base':    'var(--color-text)',
        'text-muted':   'var(--color-text-muted)',
        'text-inverse': 'var(--color-text-inverse)',
      },

      // ═══════════════════════════════════════════════════════════════════
      // FONT FAMILIES
      // Reference CSS variables injected by next/font/google in layout.tsx.
      // Variables --font-heading and --font-body are set on the <html> element.
      // [INJECT: Font names from siteConfig.branding.fonts.heading / .body]
      // ═══════════════════════════════════════════════════════════════════
      fontFamily: {
        // Heading font — [INJECT: e.g., Oswald, Barlow Condensed, Syne]
        'heading': ['var(--font-heading)', 'system-ui', 'sans-serif'],
        // Body font — [INJECT: e.g., Source Sans 3, DM Sans, Figtree]
        'body':    ['var(--font-body)', 'system-ui', 'sans-serif'],
        // Override Tailwind's default sans to use the brand body font
        'sans':    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },

      // ═══════════════════════════════════════════════════════════════════
      // FONT SIZES — Major Third (1.25×) Modular Scale
      // Base: 16px. Scale multiplier: 1.25.
      // Fluid sizes use CSS clamp() for smooth viewport-responsive scaling.
      // ═══════════════════════════════════════════════════════════════════
      fontSize: {
        'xs':   ['0.75rem',  { lineHeight: '1rem' }],           // 12px
        'sm':   ['0.875rem', { lineHeight: '1.25rem' }],        // 14px
        'base': ['1rem',     { lineHeight: '1.625rem' }],       // 16px
        'lg':   ['1.125rem', { lineHeight: '1.75rem' }],        // 18px
        'xl':   ['1.25rem',  { lineHeight: '1.875rem' }],       // 20px
        '2xl':  ['1.563rem', { lineHeight: '2rem' }],           // 25px — H4
        '3xl':  ['1.953rem', { lineHeight: '2.25rem' }],        // 31px — H3
        '4xl':  ['2.441rem', { lineHeight: '2.75rem' }],        // 39px — H2
        '5xl':  ['3.052rem', { lineHeight: '3.25rem' }],        // 49px — H1 desktop
        '6xl':  ['3.815rem', { lineHeight: '1.1' }],            // 61px — hero desktop
        // Fluid sizes — use these for headlines to prevent viewport awkwardness
        'fluid-hero': ['clamp(2rem, 5vw + 1rem, 3.815rem)',     { lineHeight: '1.1' }],
        'fluid-h1':   ['clamp(1.75rem, 4vw + 0.75rem, 3.052rem)', { lineHeight: '1.15' }],
        'fluid-h2':   ['clamp(1.5rem, 3vw + 0.5rem, 2.441rem)',  { lineHeight: '1.2' }],
        'fluid-h3':   ['clamp(1.25rem, 2.5vw + 0.25rem, 1.953rem)', { lineHeight: '1.25' }],
      },

      // ═══════════════════════════════════════════════════════════════════
      // SPACING — 8pt Grid Extensions
      // Tailwind's default scale is 4px-based; these add key 8pt values
      // not in the default scale (and a few large values for section spacing).
      // ═══════════════════════════════════════════════════════════════════
      spacing: {
        '4.5':  '1.125rem',   // 18px — rare fine-tuning
        '13':   '3.25rem',    // 52px
        '15':   '3.75rem',    // 60px
        '17':   '4.25rem',    // 68px
        '18':   '4.5rem',     // 72px — large button padding
        '22':   '5.5rem',     // 88px
        '26':   '6.5rem',     // 104px
        '30':   '7.5rem',     // 120px — section padding mobile
        '34':   '8.5rem',     // 136px — section padding desktop
        '88':   '22rem',      // Large utility
        '100':  '25rem',
        '112':  '28rem',
        '128':  '32rem',
        '144':  '36rem',
      },

      // ═══════════════════════════════════════════════════════════════════
      // BORDER RADIUS
      // Consistent rounding scale. Contractor sites use moderate rounding —
      // not too sharp (cold), not too round (unprofessional).
      // ═══════════════════════════════════════════════════════════════════
      borderRadius: {
        'none': '0',
        'sm':    '4px',
        DEFAULT: '6px',
        'md':    '8px',
        'lg':   '12px',
        'xl':   '16px',
        '2xl':  '24px',
        '3xl':  '32px',
        'full': '9999px',
      },

      // ═══════════════════════════════════════════════════════════════════
      // BOX SHADOWS — Elevation System
      // Shadows communicate depth without neon glow effects.
      // The 'cta' shadow uses the accent color for a branded glow on CTAs.
      // ═══════════════════════════════════════════════════════════════════
      boxShadow: {
        'sm':         '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'card':       '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
        'card-hover': '0 4px 12px 0 rgb(0 0 0 / 0.12), 0 2px 4px -1px rgb(0 0 0 / 0.08)',
        'md':         '0 4px 12px 0 rgb(0 0 0 / 0.10)',
        'lg':         '0 8px 24px 0 rgb(0 0 0 / 0.12)',
        'nav':        '0 2px 8px 0 rgb(0 0 0 / 0.08)',
        'section':    '0 -1px 0 0 rgb(0 0 0 / 0.06)',
        // CTA button branded shadow — [INJECT: accent RGB values derived from generated scale]
        'cta':        '0 4px 14px 0 var(--color-accent-shadow)',
        'cta-hover':  '0 6px 20px 0 var(--color-accent-shadow)',
        'inner':      'inset 0 2px 4px 0 rgb(0 0 0 / 0.06)',
        'inner-sm':   'inset 0 1px 2px 0 rgb(0 0 0 / 0.04)',
        'focus':      '0 0 0 3px var(--color-primary-100)',
      },

      // ═══════════════════════════════════════════════════════════════════
      // SCREENS — Breakpoints
      // Mobile-first. These match the breakpoints in responsive-patterns.md.
      // ═══════════════════════════════════════════════════════════════════
      screens: {
        'xs':      '375px',     // Smallest mobile (iPhone SE)
        'sm':      '640px',
        'md':      '768px',
        'lg':      '1024px',
        'xl':      '1280px',
        '2xl':     '1536px',
        // Named semantic aliases
        'mobile':  { max: '767px' },    // Targets mobile ONLY (use sparingly)
        'tablet':  '768px',
        'desktop': '1024px',
      },

      // ═══════════════════════════════════════════════════════════════════
      // KEYFRAMES — Animation definitions
      // Triggered by utility classes in globals.css (not applied directly).
      // ALL animations must respect prefers-reduced-motion (enforced in globals.css).
      // NEVER animate hero elements or LCP candidates.
      // ═══════════════════════════════════════════════════════════════════
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
        fadeInRight: {
          '0%':   { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 var(--color-accent-shadow)' },
          '50%':       { boxShadow: '0 0 0 8px transparent' },
        },
      },

      // ═══════════════════════════════════════════════════════════════════
      // ANIMATION UTILITIES
      // These become Tailwind utility classes: animate-fade-in, etc.
      // Max duration: 350ms per SKILL.md constraint.
      // ═══════════════════════════════════════════════════════════════════
      animation: {
        'fade-in':       'fadeIn 350ms ease-out both',
        'fade-in-up':    'fadeInUp 350ms ease-out both',
        'fade-in-left':  'fadeInLeft 350ms ease-out both',
        'fade-in-right': 'fadeInRight 350ms ease-out both',
        'pulse-glow':    'pulseGlow 2.5s ease-in-out infinite',
      },

      // ═══════════════════════════════════════════════════════════════════
      // TRANSITIONS
      // ═══════════════════════════════════════════════════════════════════
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '350': '350ms',
      },
      transitionTimingFunction: {
        'smooth':    'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-sm': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'in-out':    'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      // ═══════════════════════════════════════════════════════════════════
      // LINE HEIGHT
      // ═══════════════════════════════════════════════════════════════════
      lineHeight: {
        'tight':   '1.15',
        'snug':    '1.25',
        'normal':  '1.5',
        'relaxed': '1.625',
        'loose':   '1.75',
      },

      // ═══════════════════════════════════════════════════════════════════
      // LETTER SPACING
      // ═══════════════════════════════════════════════════════════════════
      letterSpacing: {
        'tightest': '-0.05em',
        'tighter':  '-0.025em',
        'tight':    '-0.015em',
        'normal':   '0',
        'wide':     '0.025em',
        'wider':    '0.05em',
        'widest':   '0.15em',  // Use for uppercase labels/badges
      },
    },
  },

  plugins: [
    // Add plugins here if needed in future packs
    // require('@tailwindcss/forms'),    // Added when Pack 4 builds form components
    // require('@tailwindcss/typography'), // Only if blog/content pages needed
  ],
}

export default config
