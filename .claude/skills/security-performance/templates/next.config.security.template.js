/**
 * next.config.security.template.js
 *
 * Pack 7 — Security Headers Template
 *
 * HOW TO USE:
 * 1. Read the existing next.config.js in the project root
 * 2. Merge the `headers()` function into the existing config
 * 3. Update SUPABASE_PROJECT_REF with the actual project ref
 * 4. Add/remove CSP origins based on which integrations are active
 * 5. Do NOT replace the existing config — extend it
 *
 * IMPORTANT: The `headers()` function must be inside the `nextConfig` object,
 * alongside any existing `images`, `redirects`, or other config keys.
 */

// ─── Supabase project reference ─────────────────────────────────────────────
// Replace with actual project ref from siteConfig.stack.supabaseProjectRef
// or from the Supabase dashboard URL: https://[PROJECT_REF].supabase.co
const SUPABASE_PROJECT_REF = 'abcdefghijklmnop' // REPLACE THIS

// ─── Build CSP string ────────────────────────────────────────────────────────
// Edit each directive based on which integrations are in siteConfig.integrations
const ContentSecurityPolicy = `
  default-src 'self';
  script-src
    'self'
    https://www.googletagmanager.com
    https://www.google-analytics.com
    https://maps.googleapis.com;
  style-src
    'self'
    'unsafe-inline';
  img-src
    'self'
    data:
    blob:
    https://maps.gstatic.com
    https://maps.googleapis.com
    https://www.google-analytics.com
    https://lh3.googleusercontent.com
    https://streetviewpixels-pa.googleapis.com;
  connect-src
    'self'
    https://www.google-analytics.com
    https://analytics.google.com
    https://region1.google-analytics.com
    https://${SUPABASE_PROJECT_REF}.supabase.co
    wss://${SUPABASE_PROJECT_REF}.supabase.co;
  frame-src
    https://www.google.com/maps/;
  font-src
    'self';
  object-src
    'none';
  base-uri
    'self';
  form-action
    'self';
  frame-ancestors
    'none';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, ' ')
  .trim()

// ─── Security headers array ───────────────────────────────────────────────────
const securityHeaders = [
  // Prevent MIME type sniffing
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Prevent clickjacking
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // Enable DNS prefetch for performance
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // Force HTTPS for 1 year, include subdomains, submit to preload list
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  // Control referrer information sent with requests
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Restrict browser API access
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self), payment=()',
  },
  // Content Security Policy
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy,
  },
]

// ─── next.config.js export ───────────────────────────────────────────────────
// MERGE this into your existing next.config.js — do not replace the whole file.
// If next.config.js already has a `headers` function, combine the arrays.

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... your existing config options ...

  // ── Bundle analyzer (development only) ──────────────────────────────────
  // Uncomment when running bundle analysis:
  // Requires: pnpm add -D @next/bundle-analyzer
  // Usage: ANALYZE=true pnpm build

  // ── Image optimization ────────────────────────────────────────────────────
  images: {
    formats: ['image/avif', 'image/webp'],
    // Add any external image domains used on the site:
    // remotePatterns: [
    //   { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    // ],
    deviceSizes: [375, 640, 768, 1024, 1280, 1920],
    imageSizes: [64, 96, 128, 256, 384],
  },

  // ── Compression ───────────────────────────────────────────────────────────
  compress: true,

  // ── PoweredBy header removal ─────────────────────────────────────────────
  poweredByHeader: false,

  // ── Security headers ─────────────────────────────────────────────────────
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        // Long-lived cache for static assets (Next.js content-hashes these)
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache uploaded images for 1 day (not immutable — images can be updated)
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ]
  },

  // ── Redirects (add any needed redirects here) ─────────────────────────────
  async redirects() {
    return [
      // Redirect HTTP to HTTPS (Vercel handles this, but belt-and-suspenders)
      // {
      //   source: '/:path*',
      //   has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
      //   destination: 'https://yourdomain.com/:path*',
      //   permanent: true,
      // },
    ]
  },
}

// ─── Bundle analyzer wrapper (keep at bottom) ────────────────────────────────
// Uncomment to enable bundle analysis:
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })
// module.exports = withBundleAnalyzer(nextConfig)

module.exports = nextConfig

/**
 * INTEGRATION-SPECIFIC CSP ADDITIONS
 * -----------------------------------
 * Uncomment the relevant lines in the CSP string above when these integrations
 * are active on the site:
 *
 * Facebook Pixel:
 *   script-src: + https://connect.facebook.net
 *   img-src: + https://www.facebook.com https://pixel.facebook.com
 *   connect-src: + https://www.facebook.com
 *
 * Jobber booking widget:
 *   script-src: + https://app.getjobber.com
 *   frame-src: + https://app.getjobber.com
 *
 * ServiceTitan scheduler:
 *   frame-src: + https://[client-subdomain].servicetitan.com
 *   script-src: + https://[client-subdomain].servicetitan.com
 *
 * Housecall Pro:
 *   script-src: + https://app.housecallpro.com
 *   frame-src: + https://app.housecallpro.com
 *
 * Hotjar:
 *   script-src: + https://static.hotjar.com https://script.hotjar.com
 *   connect-src: + wss://ws.hotjar.com https://in.hotjar.com
 *   img-src: + https://static.hotjar.com
 *   frame-src: + https://vars.hotjar.com
 *
 * Vercel Analytics:
 *   script-src: + https://va.vercel-scripts.com
 *   connect-src: + https://vitals.vercel-insights.com
 */
