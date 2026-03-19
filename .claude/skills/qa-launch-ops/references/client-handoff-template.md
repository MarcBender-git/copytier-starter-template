# Client Handoff Document — Specification

## Purpose

The client handoff document is the single piece of paper (or email) that a
contractor needs to run their new website. It must be written for a non-technical
business owner, not a developer. Plain English only. No jargon. No assumed knowledge.

The goal: a contractor who has never owned a website before can read this document
and understand exactly what happens when a lead comes in, what they're responsible
for, and who to call when something goes wrong.

---

## What the Handoff Document Is NOT

- Not a technical specification
- Not a list of all the technologies used
- Not a list of things that could go wrong
- Not longer than 2 pages when printed

---

## Tone and Voice

Write as if you're explaining it over coffee to a plumber who is good at plumbing
but has never thought about websites before. Use "you" and "your website" throughout.
Short sentences. Active voice. Numbered steps for any process.

---

## Required Sections

### Section 1: Welcome + What's Live

A short paragraph celebrating that the site is live. Include:
- The live URL (linked and bolded)
- One sentence on what the site is designed to do (bring you leads)
- The date it launched

### Section 2: How Leads Come In

Explain the two ways a lead arrives:

**Way 1: Contact form submission**
Walk through what happens step by step:
1. Someone fills out the contact form on your website
2. Within 60 seconds, you receive an email at [contractor email]
3. The email includes their name, phone number, email, and what they need
4. The lead is also saved in your leads database (we explain how to access this below)

**Way 2: Phone call**
1. Someone sees your phone number on the site and calls directly
2. No notification needed — your phone rings
3. These are often your hottest leads (they called instead of filling out a form)

### Section 3: How to Respond to Leads (The 30-Minute Rule)

Explain that calling back within 30 minutes increases the chance of booking by 5×.
After 2 hours, most leads have already called someone else.

Include a simple response script:
> "Hi, this is [name] from [company]. I'm returning your inquiry from our website.
> How can I help you today?"

### Section 4: How to View Your Leads in the Database

Simple, numbered steps to access Supabase:
1. Go to: https://supabase.com
2. Click "Sign In"
3. Username: [contractor email or Copytier email — clarify ownership]
4. Navigate to Table Editor → leads
5. Your form submissions appear here in the order they came in

Note: Most leads will be covered by the email notification. The database is
a backup in case an email is missed.

### Section 5: Who Handles What

Two-column table — what the contractor handles vs. what Copytier handles.

**You handle:**
- Responding to leads promptly
- Keeping your phone number and email address working
- Collecting new customer reviews (send them to Marc to add to the site)
- Telling Marc about any business changes (new services, moved locations, etc.)
- Keeping your Google Business Profile updated

**Copytier handles:**
- Monthly security updates
- Fixing technical problems
- Making content changes you request
- Monitoring the site for downtime
- Annual performance review

### Section 6: How to Request Changes

Very simple. If the contractor wants to update anything on the site:
1. Email Marc at [marc@copytier.com]
2. Describe what you want changed
3. Marc will confirm the change within 24 hours
4. Most changes are made within 2–3 business days

Common requests:
- Update phone number or email
- Add a new service
- Add customer reviews/testimonials
- Change a photo
- Update prices (if displayed)

### Section 7: Emergency Contact

If the website is down or the contact form stops working:
- **Call Marc:** [Marc's phone number]
- **Email Marc:** [marc@copytier.com]
- Response during business hours (M–F 9am–5pm PST): within 2 hours
- After-hours issues: Marc monitors alerts and will respond as soon as possible

### Section 8: Your Maintenance Plan

Describe what's included in the monthly maintenance:
- Monthly security monitoring and updates
- Form testing (we submit a test lead each month to verify it's working)
- Uptime monitoring (we're alerted if the site goes down)
- Quarterly performance report

Note anything the client pays for separately (domain renewal, hosting, etc.).

### Section 9: Important Login Credentials (keep this private)

This section should NOT be in the email — it should be in a separate, secure
document or 1Password shared with the client.

Credentials to include:
- Domain registrar (GoDaddy, Namecheap, etc.) — login and password
- Vercel account — invite client as viewer (don't give full access)
- Supabase — invite client as viewer
- Google Analytics — add client as Viewer
- Google Search Console — add client as Full User
- Google Business Profile — confirm client has owner access

### Section 10: Glossary (optional, for less technical clients)

Only include if the client seems unfamiliar with web terminology. Define:
- **Domain name:** Your website address (e.g. joeplumbing.com)
- **Hosting:** The service that keeps your website files online 24/7
- **Contact form:** The form on your website where customers fill in their info
- **Lead:** A potential customer who has shown interest in your services
- **Analytics:** Data about how many people visit your site and what they do there
- **SSL:** The padlock icon in the browser that shows your site is secure

---

## Delivery Instructions

**Format:** PDF (converted from Markdown or Word)
**Delivery:** Email to the contractor within 24 hours of production launch
**Subject line:** "Your New Website is Live — Here's Everything You Need to Know"

**Email body:**
```
Hi [Contractor Name],

Great news — your new website is live at [URL]!

I've attached a quick guide that explains how leads come in, how to respond,
and who to contact if you ever need anything changed.

The most important thing: when a lead fills out the form, you'll get an email
within 60 seconds. Call them back within 30 minutes for the best chance of
booking the job.

You're all set. Let me know if you have any questions.

— Marc Bender, Copytier
[phone] | [email]
```

---

## What to Customize Per Client

Every handoff document is the same structure, but customize:
- [ ] Company name and domain throughout
- [ ] Contractor's email address for lead notifications
- [ ] Contractor's specific services (reference the services pages built)
- [ ] Service area cities (so they know which areas the site covers)
- [ ] Any integrations that are different (e.g. Jobber booking widget — explain how it works)
- [ ] Maintenance plan details (if client is on a different tier)
- [ ] Domain registrar info (who their domain is registered with)
- [ ] Any special notes (e.g. "your previous website has been redirected to this one")
