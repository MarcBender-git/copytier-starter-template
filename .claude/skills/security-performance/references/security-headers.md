# Security Headers Reference

## Why Security Headers Matter for Contractor Sites

Contractor websites are not high-value targets for sophisticated attacks, but they ARE
targets for automated bots that:
- Inject spam links (SEO poisoning)
- Attempt to load malicious iframes
- Steal form data via XSS if a third-party script is compromised
- Conduct credential stuffing against admin panels

Security headers are a zero-cost, CDN-layer defense that blocks entire classes of
attacks before they reach the application.

---

## Header-by-Header Reference

### Content-Security-Policy (CSP)

The most powerful and complex header. Tells the browser exactly which origins are
allowed to execute scripts, load styles, display images, and open connections.

**Contractor site baseline CSP:**

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https://maps.gstatic.com https://maps.googleapis.com https://www.google-analytics.com https://lh3.googleusercontent.com;
  connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com;
  frame-src https://www.google.com/maps/ https://www.google.com/;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
```

**With Supabase:**
```
connect-src 'self' https://[project-ref].supabase.co wss://[project-ref].supabase.co https://www.google-analytics.com;
```

**With booking widget (Jobber, ServiceTitan, etc.):**
```
frame-src https://www.google.com/maps/ https://app.getjobber.com/ https://[client].servicetitan.com/;
script-src 'self' ... https://app.getjobber.com;
```

**With Resend email tracking (if enabled):**
```
img-src 'self' data: ... https://r.resend.com;
```

**Testing CSP without enforcement (report-only mode):**
Use `Content-Security-Policy-Report-Only` header during development to log
violations without blocking anything. Switch to enforcing CSP for production.

```js
// In next.config.js during development
'Content-Security-Policy-Report-Only': cspString + '; report-uri /api/csp-report'
```

**Nonces for inline scripts (if unavoidable):**
Next.js 15 supports automatic nonces via middleware. If a third-party requires
an inline script, add a nonce rather than `'unsafe-inline'`.

```ts
// middleware.ts
import { NextResponse } from 'next/server'
import crypto from 'crypto'

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com;`
  const response = NextResponse.next()
  response.headers.set('Content-Security-Policy', cspHeader)
  response.headers.set('x-nonce', nonce)
  return response
}
```

---

### Strict-Transport-Security (HSTS)

Forces all future connections to use HTTPS, even if the user types `http://`.

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

- `max-age=31536000` — remember for 1 year
- `includeSubDomains` — applies to `www.`, `api.`, etc.
- `preload` — eligible for browser preload lists (requires HTTPS for all subdomains)

**Vercel sets this header automatically.** Add it to `next.config.js` anyway for
defense-in-depth and documentation purposes.

**Warning:** Once set with `preload`, the domain is difficult to downgrade from HTTPS.
This is fine for contractor sites — they should always be HTTPS.

---

### X-Content-Type-Options

```
X-Content-Type-Options: nosniff
```

Prevents browsers from "MIME sniffing" — guessing that a text file might be
executable JavaScript. Without this, an attacker who can upload a text file
(via a compromised plugin or storage bucket) could execute it as a script.

Simple, always-on, no legitimate reason to omit.

---

### X-Frame-Options

```
X-Frame-Options: DENY
```

Prevents the site from being embedded in an `<iframe>` on another domain.
This blocks clickjacking attacks — where the attacker shows the real site in an
invisible overlay and tricks users into clicking buttons.

**DENY vs SAMEORIGIN:**
- `DENY` — no iframes, ever. Correct for contractor sites.
- `SAMEORIGIN` — allows iframes from same domain. Use only if you embed your own
  pages in iframes (uncommon for contractor sites).

**Note:** This is superseded by `frame-ancestors` in CSP. Set both for
compatibility with older browsers.

---

### X-DNS-Prefetch-Control

```
X-DNS-Prefetch-Control: on
```

Allows browsers to pre-resolve DNS for external resources (Google Analytics,
Maps, CDN assets). This improves performance by reducing DNS lookup time.

Set to `off` if privacy is the top concern (DNS prefetch can leak browsing behavior
to ISPs). For contractor sites, `on` is correct — performance > minimal DNS privacy.

---

### Referrer-Policy

```
Referrer-Policy: strict-origin-when-cross-origin
```

Controls what URL is sent in the `Referer` header when a user clicks a link
leaving your site.

- `strict-origin-when-cross-origin` (recommended): Sends full URL within the same
  origin, only the domain when crossing origins, nothing over downgrade to HTTP.
- `no-referrer` — sends nothing. Good for privacy, but breaks some analytics.
- `unsafe-url` — sends full URL everywhere. Leaks sensitive form query params.

`strict-origin-when-cross-origin` is the modern browser default but setting it
explicitly ensures consistent behavior across all browsers.

---

### Permissions-Policy

```
Permissions-Policy: camera=(), microphone=(), geolocation=(self), payment=()
```

Controls which browser APIs the site and embedded third-parties can access.

- `camera=()` — no access (contractor sites don't need camera)
- `microphone=()` — no access
- `geolocation=(self)` — only the site itself can request location (for "near me" features)
- `payment=()` — no Payment Request API (contractors use phone/check, not in-browser payments)
- Omit `interest-cohort=()` — deprecated FLoC directive, no longer relevant

**Do NOT set `geolocation=()` (blocked for self too)** if you use a "Get directions"
button that uses the Geolocation API. Use `geolocation=(self)` instead.

---

## CSP Builder by Integration

Use this table to build the CSP string for the specific integrations on each site.

| Integration | Directives to Add |
|-------------|------------------|
| Google Analytics 4 | `script-src: gtm.com, google-analytics.com` / `connect-src: google-analytics.com, analytics.google.com, region1.google-analytics.com` / `img-src: google-analytics.com` |
| Google Maps Embed | `frame-src: www.google.com/maps/` / `img-src: maps.gstatic.com, maps.googleapis.com` |
| Google Maps JS API | `script-src: maps.googleapis.com` / `img-src: maps.gstatic.com, *.googleapis.com` / `connect-src: maps.googleapis.com` |
| Supabase | `connect-src: [ref].supabase.co, wss://[ref].supabase.co` |
| Resend (email tracking) | `img-src: r.resend.com` |
| Jobber booking | `frame-src: app.getjobber.com` / `script-src: app.getjobber.com` |
| ServiceTitan | `frame-src: [client].servicetitan.com` |
| Housecall Pro | `frame-src: app.housecallpro.com` / `script-src: app.housecallpro.com` |
| Hotjar | `script-src: static.hotjar.com, script.hotjar.com` / `connect-src: vc.hotjar.io, in.hotjar.com` / `img-src: static.hotjar.com` |

---

## Verifying Headers in Production

**Method 1: curl**
```bash
curl -I https://your-preview-url.vercel.app | grep -E "security|content-security|x-content|x-frame|strict-transport|referrer|permissions"
```

**Method 2: securityheaders.com**
Navigate to `https://securityheaders.com/?q=https://your-preview-url.vercel.app&hide=on`
after deploying. Target grade: A or A+.

**Method 3: Browser DevTools**
Open DevTools → Network → click any request → Response Headers tab.

**Expected result:** All seven headers present with correct values. CSP must not
show any violations in the browser console during normal site usage.

---

## Common Header Mistakes

| Mistake | Impact | Fix |
|---------|--------|-----|
| `script-src 'unsafe-inline'` | CSP ineffective against XSS | Remove and use nonces |
| `frame-src *` | Allows any site to be iframed | Enumerate exact booking widget origins |
| Missing `base-uri 'self'` | Base tag injection possible | Always include |
| Missing `form-action 'self'` | Form data can be exfiltrated | Always include |
| `X-Frame-Options: ALLOWALL` | Invalid header, ignored | Use `DENY` |
| HSTS without HTTPS on all subdomains | HSTS breaks non-HTTPS subdomains | Ensure all subdomains use HTTPS before adding `includeSubDomains` |
