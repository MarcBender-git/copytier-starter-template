# CCPA Compliance Checklist for California Contractor Sites

## Background: Why CCPA Applies

The California Consumer Privacy Act (CCPA), amended by CPRA 2023, applies to
businesses that collect personal information from California residents. Every
contractor site built by Copytier is for a California contractor whose customers
are California residents. CCPA applies to all Copytier builds.

**Small business threshold:** CCPA primarily targets businesses with >$25M revenue,
>100,000 consumer records, or >50% revenue from selling data. Most contractor clients
don't meet these thresholds — but Google Analytics and the "sharing" of data with
third parties creates an obligation regardless of business size under CPRA's
"sharing for cross-context behavioral advertising" definition.

**Practical stance:** Build every site as if CCPA applies fully. The cost of
compliance is minimal (cookie consent + privacy policy). The cost of non-compliance
is reputational, not just legal.

---

## Personal Information Collected on Contractor Sites

| Data Type | Where Collected | Shared With | CCPA Category |
|-----------|----------------|-------------|---------------|
| Name | Contact form | Supabase, Resend, contractor email | Identifiers |
| Email address | Contact form | Supabase, Resend, contractor email | Identifiers |
| Phone number | Contact form, click-to-call link | Supabase, contractor | Identifiers |
| IP address | Every page load | Google Analytics, Vercel logs | Identifiers |
| Service address | Booking form (if present) | Supabase, contractor | Geolocation |
| Browsing behavior | Every page | Google Analytics | Internet activity |
| Device info | Every page | Google Analytics | Commercial info |

---

## Pre-Launch Compliance Checklist

### Privacy Policy

- [ ] `/privacy` page exists and is accessible without login
- [ ] Privacy policy is linked in footer (visible on all pages)
- [ ] Privacy policy includes all 9 required sections (see SKILL.md)
- [ ] Company name is accurate (matches Google Business Profile)
- [ ] Contact email for privacy requests is accurate and monitored
- [ ] "Last Updated" date is set to the date the site went live
- [ ] Privacy policy describes every third-party data recipient accurately

### Cookie Consent Mechanism

- [ ] Cookie consent banner displays on first visit (test in incognito)
- [ ] Banner appears BEFORE any analytics scripts fire
- [ ] Both "Accept" and "Decline" buttons are present and equal-size
- [ ] No pre-checked boxes or dark patterns
- [ ] Declining consent prevents GA4 and all tracking scripts from loading
- [ ] Accepting consent activates GA4 (verify in Network tab)
- [ ] Consent decision persists across page loads (localStorage check)
- [ ] Consent expires after 12 months (check expiry logic in component)
- [ ] Users can change preference (link in footer: "Cookie Preferences")
- [ ] Cookie consent does not interfere with form submission

### Data Collection Minimization

- [ ] Contact form collects only: name, email, phone, service type, message
- [ ] No unnecessary fields (DOB, SSN, financial info — obviously never)
- [ ] Honeypot field has no visible label, is not collected or stored
- [ ] No third-party chat widgets that collect data without consent
- [ ] No third-party retargeting pixels beyond GA4 (Facebook Pixel requires
      separate disclosure and consent mechanism)

### Third-Party Disclosures

- [ ] Privacy policy lists Google Analytics explicitly
- [ ] Privacy policy lists Supabase (as infrastructure provider)
- [ ] Privacy policy lists Resend (as email delivery provider)
- [ ] Privacy policy lists any booking widget provider (Jobber, ServiceTitan, etc.)
- [ ] Privacy policy links to Google's privacy policy (optional but best practice)

### User Rights Infrastructure

- [ ] Contact email for "right to know" requests is monitored
- [ ] Process exists to delete a user's contact form submission from Supabase
  - Supabase dashboard → `leads` table → filter by email → delete row
- [ ] Process exists to respond to data requests within 45 days (CCPA requirement)

---

## Do Not Sell or Share

**CPRA 2023 introduced "sharing" as distinct from "selling."** Sharing means
disclosing personal information to a third party for cross-context behavioral
advertising. Sending browsing behavior to Google Analytics meets this definition.

**Required:** Contractor sites must either:
1. Obtain consent BEFORE sending data to GA4 (our approach — cookie consent banner), OR
2. Provide a "Do Not Sell or Share My Personal Information" link and honor opt-outs

Our implementation uses approach #1 (consent before tracking) which is more
user-friendly and legally cleaner. The privacy policy should still include a
"Do Not Sell or Share" section explaining that users can opt out by declining
cookies via the consent banner.

---

## Data Retention Obligations

CCPA requires disclosing how long you keep personal information. Our defaults:

| Data Type | Retention Period | Why |
|-----------|-----------------|-----|
| Contact form submissions (Supabase) | 2 years | Reasonable business record |
| Google Analytics data | 14 months | GA4 default setting |
| Resend email logs | 30 days | Resend default |
| Server logs (Vercel) | 30 days | Vercel default |

**Supabase retention:** Set up a scheduled function to delete `leads` rows older
than 2 years, or document the manual deletion process in client handoff docs.

**GA4 retention setting:** In GA4 Admin → Data Settings → Data Retention → set to
14 months (default) rather than "Don't automatically expire."

---

## Facebook Pixel (If Requested by Client)

Some clients request Facebook Pixel for their ad campaigns. Facebook Pixel is
a separate tracking technology from GA4 and requires:

1. A separate disclosure in the privacy policy for Facebook as a data recipient
2. Consent before the pixel fires (same cookie consent gate as GA4)
3. Implementing Facebook's Limited Data Use (LDU) mode for California users

```tsx
// Add Facebook Pixel to consent component alongside GA4
if (consent === 'accepted') {
  // Load FB Pixel with California LDU flag
  fbq('dataProcessingOptions', ['LDU'], 1, 1000) // state=CA, country=US
  fbq('init', process.env.NEXT_PUBLIC_FB_PIXEL_ID)
  fbq('track', 'PageView')
}
```

**If client doesn't run Facebook ads:** Do not add Facebook Pixel — more
data collection = more liability.

---

## CCPA vs GDPR Quick Comparison

| Aspect | CCPA (California) | GDPR (EU) |
|--------|------------------|-----------|
| Applies to | California residents | EU residents |
| Consent required for tracking | Yes (CPRA 2023) | Yes (always) |
| Right to delete | Yes | Yes ("right to erasure") |
| Right to know | Yes | Yes ("right of access") |
| Right to opt out of sale/sharing | Yes | N/A (opt-in required instead) |
| Response time for requests | 45 days | 30 days |
| Contractor sites in scope | All of them | Only if EU visitors likely |

**Our stance on GDPR:** Contractor sites serve local California markets. EU visitors
are unlikely. CCPA compliance is required. GDPR compliance is a bonus if implemented.
The cookie consent banner satisfies both.

---

## Post-Launch Privacy Maintenance

**Monthly:** Check that consent banner still appears on first visit after any
dependency updates. Third-party packages sometimes break localStorage logic.

**Annually (or when anything changes):**
- Update "Last Updated" date on privacy policy
- Re-verify third-party data recipients are still accurate
- Check if any new integrations collect personal data
- Verify user rights contact email still works

**When a user submits a data request:**
1. Receive at the privacy contact email
2. Verify identity (ask for name + email used on the form)
3. Pull their records from Supabase `leads` table
4. Respond with the data within 45 days
5. Delete upon request within 45 days

**When a client adds a new integration:**
Update the privacy policy's third-party list and re-date it. Inform the client
that their privacy policy has been updated.
