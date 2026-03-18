# Fonts Directory

## Do Not Self-Host Fonts Here

This directory is intentionally empty. **All fonts are loaded via `next/font/google`** in `src/app/layout.tsx`.

### Why next/font/google Instead of Self-Hosted

1. **Performance** — Next.js automatically optimizes font loading: inline critical CSS, preload hints, `display: swap`, zero layout shift
2. **Privacy** — Fonts are downloaded at build time and served from your own domain — no Google Font CDN requests from the user's browser (GDPR/CCPA safe)
3. **Zero config** — No subsetting, no WOFF2 conversion, no font-face declarations to manage
4. **Automatic CSS variables** — The `variable` option creates a CSS custom property on the `<html>` element that Tailwind references

### Font Loading Pattern

```typescript
// src/app/layout.tsx

import { Oswald, Source_Sans_3 } from 'next/font/google'

const headingFont = Oswald({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const bodyFont = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-body',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
```

### Font Name Conversion

Google Fonts names with spaces use underscores in next/font imports:

| Google Fonts Name | Import Name |
|---|---|
| Source Sans 3 | `Source_Sans_3` |
| DM Sans | `DM_Sans` |
| Plus Jakarta Sans | `Plus_Jakarta_Sans` |
| Barlow Condensed | `Barlow_Condensed` |
| Nunito Sans | `Nunito_Sans` |
| Work Sans | `Work_Sans` |

### When Self-Hosted Fonts Are Needed

Only self-host a font if ALL of the following are true:
1. The font is not on Google Fonts (custom/licensed typeface)
2. The client has provided proper font files and licensing
3. You have explicit instruction to self-host

In that case, place WOFF2 files here and declare them with `next/font/local`:

```typescript
import localFont from 'next/font/local'

const customFont = localFont({
  src: [
    { path: './fonts/CustomFont-Regular.woff2', weight: '400' },
    { path: './fonts/CustomFont-Bold.woff2', weight: '700' },
  ],
  variable: '--font-heading',
  display: 'swap',
})
```

### Approved Fonts (Quick Reference)

See `references/font-pairings.md` for the complete list. Common choices:

| Feel | Heading | Body |
|---|---|---|
| Authoritative | Oswald | Source Sans 3 |
| Authoritative | Barlow Condensed | Lato |
| Friendly | DM Sans | DM Sans |
| Friendly | Plus Jakarta Sans | Plus Jakarta Sans |
| Premium | Playfair Display | Source Sans 3 |
| Modern | Syne | Figtree |

**Banned fonts:** Inter, Roboto, Arial, Helvetica, Space Grotesk, Montserrat, Nunito, Raleway, Poppins, Open Sans.
