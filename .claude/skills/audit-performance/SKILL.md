---
name: audit-performance
description: Run a Core Web Vitals and performance audit on the current contractor website. Checks bundle size, image optimization, font loading, render-blocking resources, and caching.
disable-model-invocation: true
---

# Performance Audit

Run a performance audit: $ARGUMENTS

Check:

1. Run pnpm build — must complete with zero errors
2. Check bundle size: no page should exceed 100KB initial JS
3. Verify hero/LCP image has fetchpriority="high" and is NOT lazy-loaded
4. Verify no render-blocking CSS or JS resources
5. Check font loading: next/font with display swap, no external font requests
6. Verify all images use next/image component with proper sizes and formats
7. Check browser console for JavaScript errors (use Playwright)
8. Verify caching headers configured for static assets
9. Count total third-party scripts — fewer is better, each one hurts LCP
10. Verify Tailwind CSS is purged — no unused utilities in production build

Output results as table: Check | Status (PASS/FAIL) | Value | Target | Details

Fix any FAIL items immediately. Recheck after fixes.
