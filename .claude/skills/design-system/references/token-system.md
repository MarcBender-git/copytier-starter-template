# CSS Design Token System

## Three-Layer Architecture

The token system creates a stable bridge between brand values and component styles. The three layers have distinct roles:

```
Layer 1 — PRIMITIVE    Raw values. What the color is.
    ↓
Layer 2 — SEMANTIC     Purpose assignment. What the color means.
    ↓
Layer 3 — COMPONENT    Context assignment. What the color does here.
```

**Why three layers?** When a client rebrands, you change only Layer 2 (semantic layer). Primitives accumulate brand values; components stay stable. A rebrand from blue to green requires updating ~8 semantic tokens instead of hunting through 40+ component usages.

---

## Layer 1: Primitive Tokens

Named color values from the generated scales. These never change meaning — they are just named hex values.

```css
:root {
  /* ── Primary scale (generated from siteConfig.branding.colors.primary) ── */
  --color-primary-50:  #EFF4FF;
  --color-primary-100: #DBEAFE;
  --color-primary-200: #BFDBFE;
  --color-primary-300: #93C5FD;
  --color-primary-400: #60A5FA;
  --color-primary-500: #3B82F6;
  --color-primary-600: #1D4ED8;   /* ← base color (600 stop) */
  --color-primary-700: #1D40AF;
  --color-primary-800: #1E3A8A;
  --color-primary-900: #1E3373;

  /* ── Accent scale (generated from siteConfig.branding.colors.accent) ── */
  --color-accent-50:  #FFF7ED;
  --color-accent-100: #FFEDD5;
  --color-accent-200: #FED7AA;
  --color-accent-300: #FDBA74;
  --color-accent-400: #FB923C;
  --color-accent-500: #F97316;    /* ← base accent */
  --color-accent-600: #EA580C;
  --color-accent-700: #C2410C;
  --color-accent-800: #9A3412;
  --color-accent-900: #7C2D12;

  /* ── Neutral scale (tinted neutral derived from primary hue) ── */
  --color-neutral-50:  #F8FAFC;
  --color-neutral-100: #F1F5F9;
  --color-neutral-200: #E2E8F0;
  --color-neutral-300: #CBD5E1;
  --color-neutral-400: #94A3B8;
  --color-neutral-500: #64748B;
  --color-neutral-600: #475569;
  --color-neutral-700: #334155;
  --color-neutral-800: #1E293B;
  --color-neutral-900: #0F172A;

  /* ── Typography scale ── */
  --font-size-xs:   0.75rem;
  --font-size-sm:   0.875rem;
  --font-size-base: 1rem;
  --font-size-lg:   1.25rem;
  --font-size-xl:   1.563rem;
  --font-size-2xl:  1.953rem;
  --font-size-3xl:  2.441rem;
  --font-size-4xl:  3.052rem;
  --font-size-5xl:  3.815rem;

  /* ── Spacing scale (8pt grid) ── */
  --space-1:  0.25rem;   /* 4px */
  --space-2:  0.5rem;    /* 8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-24: 6rem;      /* 96px */
  --space-32: 8rem;      /* 128px */

  /* ── Border radius ── */
  --radius-sm:   4px;
  --radius-base: 6px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-full: 9999px;

  /* ── Shadows ── */
  --shadow-sm:      0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-card:    0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06);
  --shadow-md:      0 4px 12px 0 rgb(0 0 0 / 0.10);
  --shadow-nav:     0 2px 8px 0 rgb(0 0 0 / 0.08);
  --shadow-lg:      0 8px 24px 0 rgb(0 0 0 / 0.12);
}
```

---

## Layer 2: Semantic Tokens

Purpose assignments. These are what components reference. When you rebrand, change these.

```css
:root {
  /* ── Brand colors ── */
  --color-primary:           var(--color-primary-600);
  --color-primary-hover:     var(--color-primary-700);
  --color-primary-light:     var(--color-primary-100);
  --color-primary-text:      var(--color-primary-900);

  --color-accent:            var(--color-accent-500);
  --color-accent-hover:      var(--color-accent-600);
  --color-accent-light:      var(--color-accent-100);
  --color-accent-shadow:     rgb(249 115 22 / 0.30); /* for glow effects */

  --color-neutral:           var(--color-neutral-700);

  /* ── Text ── */
  --color-text:              var(--color-neutral-900);
  --color-text-secondary:    var(--color-neutral-600);
  --color-text-muted:        var(--color-neutral-400);
  --color-text-inverse:      #FFFFFF;
  --color-text-on-primary:   #FFFFFF;
  --color-text-on-accent:    #FFFFFF;

  /* ── Surfaces ── */
  --color-surface:           var(--color-neutral-50);
  --color-surface-alt:       var(--color-neutral-100);
  --color-surface-dark:      var(--color-neutral-900);
  --color-surface-brand:     var(--color-primary-800);

  /* ── Borders ── */
  --color-border:            var(--color-neutral-200);
  --color-border-strong:     var(--color-neutral-300);
  --color-border-focus:      var(--color-primary-500);

  /* ── Status colors (emergency badge, form validation) ── */
  --color-success:           #15803D;
  --color-success-light:     #DCFCE7;
  --color-warning:           #B45309;
  --color-warning-light:     #FEF3C7;
  --color-error:             #DC2626;
  --color-error-light:       #FEE2E2;

  /* ── Typography ── */
  --font-heading:            /* set by next/font via CSS variable */;
  --font-body:               /* set by next/font via CSS variable */;
  --font-weight-normal:      400;
  --font-weight-medium:      500;
  --font-weight-semibold:    600;
  --font-weight-bold:        700;
  --line-height-tight:       1.15;
  --line-height-snug:        1.25;
  --line-height-normal:      1.5;
  --line-height-relaxed:     1.625;
}
```

---

## Layer 3: Component Tokens

Context-specific assignments. Components consume these — not raw semantic tokens.

```css
:root {
  /* ── Buttons ── */
  --btn-primary-bg:          var(--color-primary);
  --btn-primary-bg-hover:    var(--color-primary-hover);
  --btn-primary-text:        var(--color-text-on-primary);
  --btn-primary-shadow:      var(--shadow-md);

  --btn-cta-bg:              var(--color-accent);
  --btn-cta-bg-hover:        var(--color-accent-hover);
  --btn-cta-text:            var(--color-text-on-accent);
  --btn-cta-shadow:          0 4px 14px 0 var(--color-accent-shadow);

  --btn-outline-border:      var(--color-primary);
  --btn-outline-text:        var(--color-primary);
  --btn-outline-bg-hover:    var(--color-primary-light);

  /* ── Navigation ── */
  --nav-bg:                  #FFFFFF;
  --nav-shadow:              var(--shadow-nav);
  --nav-link-text:           var(--color-neutral-700);
  --nav-link-hover:          var(--color-primary);
  --nav-link-active:         var(--color-primary);
  --nav-cta-bg:              var(--color-accent);
  --nav-cta-text:            var(--color-text-on-accent);
  --nav-height:              72px;
  --nav-height-mobile:       64px;

  /* ── Cards ── */
  --card-bg:                 #FFFFFF;
  --card-border:             var(--color-border);
  --card-shadow:             var(--shadow-card);
  --card-shadow-hover:       var(--shadow-md);
  --card-radius:             var(--radius-lg);
  --card-padding:            var(--space-6);

  /* ── Forms ── */
  --input-bg:                #FFFFFF;
  --input-border:            var(--color-border-strong);
  --input-border-focus:      var(--color-border-focus);
  --input-text:              var(--color-text);
  --input-placeholder:       var(--color-text-muted);
  --input-radius:            var(--radius-sm);
  --input-shadow-focus:      0 0 0 3px var(--color-primary-light);
  --label-text:              var(--color-neutral-700);

  /* ── Trust badges / license pills ── */
  --badge-primary-bg:        var(--color-primary-light);
  --badge-primary-text:      var(--color-primary-text);
  --badge-accent-bg:         var(--color-accent-light);
  --badge-accent-text:       var(--color-accent-600);
  --badge-neutral-bg:        var(--color-neutral-100);
  --badge-neutral-text:      var(--color-neutral-700);
  --badge-radius:            var(--radius-full);

  /* ── Footer ── */
  --footer-bg:               var(--color-surface-dark);
  --footer-text:             var(--color-neutral-300);
  --footer-heading:          #FFFFFF;
  --footer-link:             var(--color-neutral-400);
  --footer-link-hover:       #FFFFFF;
  --footer-border:           var(--color-neutral-700);
}
```

---

## Dark Mode Token Stubs

Include these even if dark mode is not implemented. They future-proof the design system and prevent refactoring later.

```css
@media (prefers-color-scheme: dark) {
  :root {
    /* Override semantic layer for dark mode */
    /* Uncomment and populate when dark mode is required */
    /* --color-surface:         var(--color-neutral-900); */
    /* --color-surface-alt:     var(--color-neutral-800); */
    /* --color-text:            var(--color-neutral-50); */
    /* --color-border:          var(--color-neutral-700); */
    /* --nav-bg:                var(--color-neutral-900); */
    /* --card-bg:               var(--color-neutral-800); */
  }
}
```
