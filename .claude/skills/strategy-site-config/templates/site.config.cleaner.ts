/**
 * site.config.cleaner.ts — Niche Template: House Cleaning Service
 * Copytier Website Builder — Pack 1 Template
 *
 * USAGE: Copy this file to the client repo as src/site.config.ts
 * Replace all values marked // REPLACE: with real client data from the Build Brief.
 *
 * Niche: cleaner | Schema: HousekeepingService | License: City Business License (no CSLB)
 * Primary persona: researcher | Color: Light blue / white palette
 * Special: background-check emphasis, eco-friendly flag, recurring plan focus
 */

import type { SiteConfig } from '../references/site-config-interface';

export const siteConfig: SiteConfig = {

  // ─── IDENTITY ──────────────────────────────────────────────────────────────
  niche: 'cleaner',
  schemaType: 'HousekeepingService',
  currentPhase: 'mvp',

  business: {
    name: 'Coastal Shine Cleaning',                                  // REPLACE: client business name
    legalName: 'Coastal Shine Cleaning Services LLC',                // REPLACE: legal entity name
    tagline: 'Long Beach House Cleaning You Can Trust',              // REPLACE: tagline
    description:
      'Coastal Shine Cleaning has provided Long Beach homeowners with reliable, ' +
      'thorough house cleaning since 2015. All team members are background-checked, ' +
      'bonded, and insured. We use eco-friendly cleaning products and offer a ' +
      '24-hour re-clean guarantee — because we\'re only done when you\'re satisfied.',
    ownerName: 'Lisa Tran',               // REPLACE: owner name
    yearEstablished: 2015,                // REPLACE: year established
    employeeCount: '11–20',
    address: {
      street: '3420 E Pacific Coast Hwy', // REPLACE: street address
      city: 'Long Beach',                 // REPLACE: city
      state: 'CA',
      zip: '90804',                       // REPLACE: zip code
      country: 'United States',
    },
    geo: {
      latitude: 33.7701,                  // REPLACE: GPS latitude
      longitude: -118.1937,               // REPLACE: GPS longitude
    },
    hours: {
      regular: 'Mon–Sat 8am–6pm',
      emergency: 'Last-minute cleaning available — call to check availability',
      timezone: 'America/Los_Angeles',
      openingHoursSpec: [
        { dayOfWeek: 'https://schema.org/Monday',    opens: '08:00', closes: '18:00' },
        { dayOfWeek: 'https://schema.org/Tuesday',   opens: '08:00', closes: '18:00' },
        { dayOfWeek: 'https://schema.org/Wednesday', opens: '08:00', closes: '18:00' },
        { dayOfWeek: 'https://schema.org/Thursday',  opens: '08:00', closes: '18:00' },
        { dayOfWeek: 'https://schema.org/Friday',    opens: '08:00', closes: '18:00' },
        { dayOfWeek: 'https://schema.org/Saturday',  opens: '08:00', closes: '18:00' },
      ],
    },
    social: {
      googleBusinessProfile: 'https://g.page/coastal-shine-cleaning-long-beach', // REPLACE: GBP URL
      facebook:  'https://facebook.com/coastalshinecleaning',                      // REPLACE
      yelp:      'https://yelp.com/biz/coastal-shine-cleaning-long-beach',        // REPLACE
      nextdoor:  'https://nextdoor.com/pages/coastal-shine-cleaning',             // REPLACE
      instagram: 'https://instagram.com/coastalshinecleaning',                    // REPLACE
    },
  },

  // ─── VALUE PROPOSITION ────────────────────────────────────────────────────
  valueProposition: {
    headline: 'Long Beach House Cleaning You Can Trust.',     // REPLACE: headline (max 8 words)
    subheadline:
      'Background-checked, eco-friendly cleaning team serving Long Beach — ' +
      'weekly, bi-weekly, and monthly plans with a 24-hour re-clean guarantee.',
    primaryCTA: {
      text: 'Get a Free Quote',
      href: '/contact',
      variant: 'primary',
      icon: 'sparkles',
    },
    secondaryCTA: {
      text: 'Call Us',
      href: 'tel:+15625550163',   // REPLACE: formatted phone for tel: link
      variant: 'outline',
      icon: 'phone',
    },
  },

  // ─── PERSONAS ─────────────────────────────────────────────────────────────
  personas: {
    primary: 'researcher',
    secondary: 'returning',
    nicheExtensions: ['busy-professional', 'new-parent', 'senior-homeowner', 'airbnb-host', 'property-manager'],
  },

  // ─── USER JOURNEYS ────────────────────────────────────────────────────────
  userJourneys: {
    primary: {
      persona: 'researcher',
      steps: [
        {
          action: 'Searches "house cleaning service Long Beach" or "recurring house cleaners near me"',
          need: 'Verify the company is trustworthy — strangers will be in the home',
          siteResponse: 'Hero with background check callout + 4.9★ reviews + bonded & insured badge immediately visible',
        },
        {
          action: 'Reads reviews specifically for reliability, thoroughness, and trustworthiness',
          need: 'Real customer validation — not just "great cleaning" but "I trust them completely"',
          siteResponse: 'Testimonials emphasizing trust, consistency, and going above-and-beyond',
        },
        {
          action: 'Evaluates eco-friendly claims and what products are used',
          need: 'Assurance that cleaning products are safe for children and pets',
          siteResponse: 'Eco-friendly section: products listed, pet-safe and child-safe callout',
        },
        {
          action: 'Wants to understand pricing and what\'s included in each plan',
          need: 'Transparent pricing tiers — what do I get for my money?',
          siteResponse: 'Recurring plans page with clear tier comparison: Weekly / Bi-Weekly / Monthly',
        },
        {
          action: 'Requests a quote or books a cleaning',
          need: 'Easy form with home size info so quote can be accurate',
          siteResponse: 'Contact form with home size selector and service type for faster quoting',
        },
      ],
    },
    secondary: {
      persona: 'returning',
      steps: [
        {
          action: 'Existing weekly/bi-weekly client managing their service online',
          need: 'Easy contact to reschedule, add a deep clean, or refer a friend',
          siteResponse: 'Contact page accessible in under 2 clicks; phone number always visible in header',
        },
        {
          action: 'Existing client referring Coastal Shine to a neighbor or colleague',
          need: 'Clean, professional site they\'re proud to share',
          siteResponse: 'Professional brand, strong reviews, and clear "Get a Free Quote" CTA for referral landing',
        },
        {
          action: 'Seasonal deep clean or move-out cleaning beyond regular service',
          need: 'Know that the company they trust for recurring also handles specialty cleans',
          siteResponse: 'Deep cleaning and move-out pages visible in navigation and service sections',
        },
      ],
    },
  },

  // ─── SUCCESS METRICS ──────────────────────────────────────────────────────
  successMetrics: {
    conversionRateTarget: 5.0,
    monthlyOrganicSessionsTarget: 1000,
    lcpTargetMs: 2000,
    ttfbTargetMs: 400,
    targetReviewRating: 4.9,
    targetReviewCount: 300,
    primaryConversionEvents: ['form_submit', 'phone_call_click', 'recurring_plan_page_view'],
    businessKPIs: [
      'Cost per acquired lead < $30',
      'Recurring plan signup rate > 40% of new clients',
      'Client retention rate > 80% at 6 months',
      'Average monthly recurring revenue per client > $200',
    ],
  },

  // ─── MOSCOW PRIORITY ──────────────────────────────────────────────────────
  featurePriority: {
    mustHave: [
      'Homepage with trust-first hero and recurring plan emphasis',
      'Service pages for all 4 core services',
      'Contact / quote request page with home size field',
      'Recurring plans pricing page',
      'Trust signals: background checks, BBB, bonded & insured',
      'Cookie consent (CCPA)',
      'FAQ page',
      'Privacy and terms pages',
    ],
    shouldHave: [
      'Service area pages for top 5 cities',
      'About page with Lisa\'s story and team photos',
      'Google Reviews widget',
      'Eco-friendly products page or section',
    ],
    couldHave: [
      'Blog: cleaning tips and organization advice',
      'Gift card page for holiday gifting',
      'Seasonal deep clean promotion landing pages',
      'Spanish language support',
    ],
    wontHave: [
      'Online self-scheduling portal (requires integration investment)',
      'E-commerce / product store',
      'Live chat',
      'Careers page (at MVP)',
    ],
  },

  // ─── SERVICES ─────────────────────────────────────────────────────────────
  services: [
    {
      name: 'Standard House Cleaning',
      slug: 'standard-cleaning',
      shortDescription:
        'Regular top-to-bottom house cleaning — dusting, vacuuming, mopping, bathrooms, kitchen, and all living areas. Perfect for weekly or bi-weekly maintenance.',
      icon: 'sparkles',
      isEmergency: false,
      problems: [
        'Not enough time to keep the house consistently clean',
        'Dust and allergen buildup between cleanings',
        'Cleaning feels overwhelming and never fully done',
        'Want to maintain a clean home without spending weekends cleaning',
        'Need reliable cleaning before regular visitors or events',
      ],
      priceRange: '$120–$280/visit (home size dependent)',
      seasonalRelevance: ['all'],
    },
    {
      name: 'Deep Cleaning',
      slug: 'deep-cleaning',
      shortDescription:
        'Comprehensive deep clean covering everything in a standard clean plus baseboards, inside appliances, blinds, ceiling fans, grout scrubbing, and neglected areas.',
      icon: 'spray-can',
      isEmergency: false,
      problems: [
        'Home hasn\'t had a professional cleaning in months or longer',
        'Visible buildup in kitchen appliances, bathroom grout, or fixtures',
        'Preparing a home for a party, family visit, or sale',
        'Post-renovation or post-construction dust and debris cleanup',
        'Spring cleaning — thorough reset of the whole home',
      ],
      priceRange: '$250–$550 (home size dependent)',
      seasonalRelevance: ['spring', 'fall', 'winter', 'summer'],
    },
    {
      name: 'Move-In / Move-Out Cleaning',
      slug: 'move-in-out-cleaning',
      shortDescription:
        'Thorough move-in or move-out cleaning to recover security deposits, prepare for new tenants, or start fresh in a new home — cabinets, appliances, and all.',
      icon: 'truck',
      isEmergency: false,
      problems: [
        'Leaving a rental and need deposit back — landlord requires professional clean',
        'Moving into a new home and want it cleaned before boxes arrive',
        'Landlord or property manager needs unit cleaned between tenants',
        'Buying a home and want it cleaned before moving in',
        'Airbnb or short-term rental needing thorough turnaround clean',
      ],
      priceRange: '$300–$600 (home size and condition)',
      seasonalRelevance: ['all'],
    },
    {
      name: 'Recurring Cleaning Plans',
      slug: 'recurring-plans',
      shortDescription:
        'Weekly, bi-weekly, or monthly cleaning plans with consistent assigned cleaners, priority scheduling, and discounted rates for ongoing customers.',
      icon: 'calendar-check',
      isEmergency: false,
      problems: [
        'Need a cleaning service that\'s reliable every single week',
        'Busy lifestyle with no time for regular cleaning',
        'Want the same familiar cleaners each visit, not random new people',
        'Looking for a cleaning plan with predictable cost',
        'Corporate relocation or new neighborhood — need to establish ongoing cleaning',
      ],
      priceRange: '$99–$240/visit (frequency and home size discounts applied)',
      seasonalRelevance: ['all'],
    },
  ],

  // ─── SERVICE AREAS ────────────────────────────────────────────────────────
  serviceAreas: [
    { name: 'Long Beach',      slug: 'long-beach',      type: 'city',   state: 'CA', isPrimary: true,  coordinates: { latitude: 33.7701, longitude: -118.1937 } },
    { name: 'Lakewood',        slug: 'lakewood',        type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 33.8536, longitude: -118.1339 } },
    { name: 'Signal Hill',     slug: 'signal-hill',     type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 33.8050, longitude: -118.1678 } },
    { name: 'Seal Beach',      slug: 'seal-beach',      type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 33.7414, longitude: -118.1048 } },
    { name: 'Los Alamitos',    slug: 'los-alamitos',    type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 33.7970, longitude: -118.0723 } },
    { name: 'Cerritos',        slug: 'cerritos',        type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 33.8584, longitude: -118.0647 } },
    { name: 'Los Angeles County South', slug: 'la-county-south', type: 'county', state: 'CA', isPrimary: false },
  ],

  // ─── PAGES ────────────────────────────────────────────────────────────────
  pages: [
    {
      title: 'House Cleaning Long Beach CA | Coastal Shine Cleaning',    // REPLACE
      slug: '/',
      type: 'homepage',
      metaDescription:
        'House cleaning service in Long Beach, CA. Background-checked team, eco-friendly products, weekly & bi-weekly plans. 24-hour re-clean guarantee. Coastal Shine Cleaning.',
      h1: 'Long Beach House Cleaning — Trusted, Thorough, Eco-Friendly',
      includeSchema: ['LocalBusiness', 'FAQPage'],
      phase: 'mvp',
      sections: ['Hero', 'TrustStrip', 'Services', 'WhyUs', 'RecurringPlans', 'Testimonials', 'ServiceAreas', 'FAQ', 'FinalCTA'],
    },
    {
      title: 'Standard House Cleaning Long Beach | Coastal Shine',
      slug: 'services/standard-cleaning',
      type: 'service',
      metaDescription:
        'Standard house cleaning in Long Beach, CA. Weekly and bi-weekly service. Background-checked cleaners. Eco-friendly products. Get a free quote from Coastal Shine.',
      h1: 'Standard House Cleaning in Long Beach, CA',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Deep Cleaning Service Long Beach CA | Coastal Shine Cleaning',
      slug: 'services/deep-cleaning',
      type: 'service',
      metaDescription:
        'Deep cleaning service in Long Beach. Inside appliances, baseboards, grout, and every neglected corner. Background-checked team. Get a quote from Coastal Shine.',
      h1: 'Deep Cleaning Services in Long Beach, CA',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Move-In Move-Out Cleaning Long Beach | Coastal Shine',
      slug: 'services/move-in-out-cleaning',
      type: 'service',
      metaDescription:
        'Move-in and move-out cleaning in Long Beach. Get your security deposit back. New home prep. Airbnb turnovers. Thorough clean by background-checked team.',
      h1: 'Move-In / Move-Out Cleaning in Long Beach, CA',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Recurring Cleaning Plans Long Beach | Weekly & Bi-Weekly | Coastal Shine',
      slug: 'services/recurring-plans',
      type: 'service',
      metaDescription:
        'Recurring cleaning plans in Long Beach. Weekly, bi-weekly, and monthly service with the same familiar cleaners. Discounted rates. Get a quote from Coastal Shine.',
      h1: 'Recurring House Cleaning Plans in Long Beach',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Contact Coastal Shine | Free Cleaning Quote Long Beach',
      slug: 'contact',
      type: 'contact',
      metaDescription:
        'Get a free quote from Coastal Shine Cleaning in Long Beach. Background-checked team, eco-friendly products, 24-hour re-clean guarantee. Book online or call.',
      h1: 'Get a Free Cleaning Quote',
      includeSchema: ['LocalBusiness'],
      phase: 'mvp',
    },
    {
      title: 'About Coastal Shine Cleaning | Long Beach Since 2015',
      slug: 'about',
      type: 'about',
      metaDescription:
        'Coastal Shine Cleaning — Long Beach\'s trusted house cleaning service since 2015. Owner Lisa Tran leads a background-checked, eco-certified team.',
      h1: 'About Coastal Shine Cleaning',
      includeSchema: ['LocalBusiness'],
      phase: 'mvp',
    },
    {
      title: 'Cleaning Service FAQ Long Beach | Coastal Shine',
      slug: 'faq',
      type: 'faq',
      metaDescription:
        'House cleaning FAQ for Long Beach homeowners. What\'s included, eco-friendly products, pricing, background checks, scheduling, and re-clean policy.',
      h1: 'House Cleaning FAQ — Long Beach Questions Answered',
      includeSchema: ['FAQPage'],
      phase: 'mvp',
    },
    {
      title: 'House Cleaning in Lakewood CA | Coastal Shine Cleaning',
      slug: 'service-areas/lakewood',
      type: 'service-area',
      metaDescription:
        'House cleaning service in Lakewood, CA. Background-checked team, eco-friendly products, recurring plans. Get a free quote from Coastal Shine Cleaning.',
      h1: 'House Cleaning Services in Lakewood, CA',
      includeSchema: ['LocalBusiness', 'BreadcrumbList'],
      phase: 'phase2',
    },
    {
      title: 'Privacy Policy | Coastal Shine Cleaning',
      slug: 'privacy',
      type: 'privacy',
      metaDescription: 'Privacy policy for Coastal Shine Cleaning. How we collect, use, and protect your personal information.',
      h1: 'Privacy Policy',
      includeSchema: [],
      phase: 'mvp',
    },
    {
      title: 'Thank You | Coastal Shine Cleaning',
      slug: 'thank-you',
      type: 'thank-you',
      metaDescription: 'Thank you for contacting Coastal Shine Cleaning. We\'ll send your quote within 24 hours.',
      h1: 'We Received Your Quote Request',
      includeSchema: [],
      phase: 'mvp',
    },
  ],

  // ─── TRUST SIGNALS ────────────────────────────────────────────────────────
  trustSignals: {
    googleRating: 4.9,                    // REPLACE: actual Google rating
    reviewCount: 256,                     // REPLACE: actual review count
    reviewSource: 'Google',
    licenseNumber: 'LB-2015-04821',       // REPLACE: actual City of Long Beach business license number
    licenseType: 'City of Long Beach Business License',  // Cleaning does not require a CSLB license in CA
    licensedBondedInsured: true,
    yearEstablished: 2015,                // REPLACE: actual year
    certifications: [
      { name: 'ARCSI Member — Association of Residential Cleaning Services International' },
      { name: 'ISSA Certified Cleaning Professional' },
      { name: 'Green Cleaning Certified — Eco-Friendly Products Only' },
      { name: 'All Team Members Background Checked, Bonded & Insured' },
    ],
    guarantees: [
      '24-Hour Re-Clean Guarantee — Not Happy? We Come Back',
      '100% Satisfaction Guaranteed',
      'Background-Checked & Bonded Team — Every Visit',
      'Eco-Friendly Products — Safe for Children & Pets',
      'Consistent Team — Same Cleaners Every Visit',
    ],
    bbbAccredited: true,
    bbbRating: 'A',
  },

  // ─── TESTIMONIALS ─────────────────────────────────────────────────────────
  testimonials: {
    source: 'manual',
    displayCount: 3,
    manual: [
      {
        name: 'Melissa K.',
        location: 'Long Beach, CA',
        rating: 5,
        text: 'I\'ve had Coastal Shine cleaning my home bi-weekly for a year and a half. The same two-person team shows up every time, they know my preferences, and the house is consistently spotless. What I appreciate most is the trust factor — I can leave a key without worry. Lisa runs a professional, reliable operation that\'s hard to find.',
        service: 'Recurring Cleaning Plans',
        date: 'February 2024',
        source: 'Google',
      },
      {
        name: 'James R.',
        location: 'Lakewood, CA',
        rating: 5,
        text: 'Hired Coastal Shine for a deep clean before putting our house on the market. They spent almost 5 hours on the place and it looked better than the day we moved in. The oven, the baseboards, the grout in the master bath — all done meticulously. Our realtor asked who cleaned it. Zero hesitation recommending them.',
        service: 'Deep Cleaning',
        date: 'October 2023',
        source: 'Google',
      },
      {
        name: 'Sarah M.',
        location: 'Seal Beach, CA',
        rating: 5,
        text: 'We used Coastal Shine for a move-out clean on our apartment and got our full security deposit back — which honestly we thought might be a battle. The landlord was impressed and said it was the cleanest turnover they\'d seen. Lisa\'s team is thorough, professional, and uses products that actually smell clean without harsh chemicals. Will use them at our new place.',
        service: 'Move-Out Cleaning',
        date: 'August 2023',
        source: 'Google',
      },
    ],
  },

  // ─── CONTACT ──────────────────────────────────────────────────────────────
  contact: {
    phone: '(562) 555-0163',                      // REPLACE: actual phone number
    phoneFormatted: '+15625550163',                // REPLACE: E.164 phone for tel: links
    email: 'lisa@coastalshinecleaning.com',        // REPLACE: actual email
    address: {
      street: '3420 E Pacific Coast Hwy',
      city: 'Long Beach',
      state: 'CA',
      zip: '90804',
      country: 'United States',
    },
    responseTimePromise: 'We send all quotes within 24 hours. Most bookings can be scheduled within 3–5 business days.',
    formFields: [
      {
        name: 'name',
        label: 'Your Name',
        type: 'text',
        required: true,
        placeholder: 'Jane Smith',
        validation: { minLength: 2, maxLength: 80, message: 'Please enter your name.' },
      },
      {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        required: true,
        placeholder: '(562) 555-0100',
        validation: { pattern: '^[\\d\\s\\-\\(\\)\\+]{7,20}$', message: 'Please enter a valid phone number.' },
      },
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        required: true,
        placeholder: 'you@email.com',
      },
      {
        name: 'service',
        label: 'What type of cleaning do you need?',
        type: 'select',
        required: true,
        options: [
          'Standard Cleaning (One-Time)',
          'Recurring Weekly',
          'Recurring Bi-Weekly',
          'Recurring Monthly',
          'Deep Cleaning',
          'Move-In Cleaning',
          'Move-Out Cleaning',
          'Airbnb / Short-Term Rental Turnover',
          'Other / Not Sure',
        ],
      },
      {
        name: 'homeSize',
        label: 'Home Size',
        type: 'select',
        required: true,
        options: [
          'Studio / 1 Bedroom (under 700 sq ft)',
          '2 Bedroom (700–1,200 sq ft)',
          '3 Bedroom (1,200–1,800 sq ft)',
          '4 Bedroom (1,800–2,500 sq ft)',
          '5+ Bedroom / Large Home (2,500+ sq ft)',
        ],
      },
      {
        name: 'message',
        label: 'Anything else we should know?',
        type: 'textarea',
        required: false,
        placeholder: 'E.g. We have 2 cats. Need extra attention in the master bathroom. Looking to start bi-weekly service.',
        validation: { maxLength: 1000 },
      },
      {
        name: 'honeypot',
        label: 'Leave this blank',
        type: 'hidden',
        required: false,
      },
    ],
    formSuccessMessage: 'Thank you! Lisa will personally review your request and send a quote within 24 hours. We look forward to making your home shine.',
    formErrorMessage: 'Something went wrong. Please call us at (562) 555-0163 or email directly — we\'re here Mon–Sat.',
    showMap: false,   // Cleaning is a mobile service — no storefront needed
  },

  // ─── BRANDING ─────────────────────────────────────────────────────────────
  branding: {
    colors: {
      primary:       '#3B82F6',   // Clear sky blue — clean, fresh, trustworthy
      secondary:     '#60A5FA',   // Soft blue — secondary UI elements
      accent:        '#10B981',   // Fresh green — eco-friendly, clean, healthy
      background:    '#FFFFFF',
      backgroundAlt: '#F0F9FF',   // Very light blue for alternate sections
      text:          '#0F172A',
      textMuted:     '#64748B',
    },
    fonts: {
      heading: 'Poppins',      // Modern, friendly, clean — fits the brand well
      body:    'Nunito Sans',  // Approachable, easy to read
    },
    logo: {
      path:    '/images/logo.svg',  // REPLACE: actual logo path
      altText: 'Coastal Shine Cleaning — Long Beach House Cleaning Service',
      width:   200,
      height:  56,
    },
    imagery: {
      style:            'friendly',
      hasTeamPhotos:    false,      // REPLACE: true if client provides team photos (high trust impact for cleaners)
      hasProjectPhotos: false,      // REPLACE: before/after photos of cleaned rooms
      hasVehiclePhotos: false,      // REPLACE: branded vehicle/supply kit photos
      stockPhotoFallback: 'professional house cleaner cleaning bright modern home long beach california',
    },
  },

  // ─── STACK ────────────────────────────────────────────────────────────────
  stack: {
    platform: 'nextjs',
    nextjs: {
      version:          '14.2.0',
      router:           'app',
      rendering:        'SSG',
      packageManager:   'npm',
      database:         'supabase',
      deployment:       'vercel',
      styling:          'tailwind',
      componentLibrary: 'shadcn',
    },
    domain: 'coastalshinecleaning.com',    // REPLACE: actual domain
    email: {
      provider:            'resend',
      notificationService: 'email',
    },
  },

  // ─── INTEGRATIONS ─────────────────────────────────────────────────────────
  integrations: {
    analytics: {
      ga4:              true,
      ga4MeasurementId: 'G-XXXXXXXXXX',   // REPLACE: actual GA4 measurement ID
      googleTagManager: false,
      searchConsole:    true,
    },
    maps: {
      provider:            'google',
      embedOnContact:      false,   // Mobile cleaning service — no storefront to map
      embedOnServiceAreas: false,
    },
    reviews: {
      source: 'manual',   // Upgrade to 'google-api' in phase2
    },
    booking: {
      provider:      'none',
      embedLocation: 'none',
    },
    chat: {
      provider:  'none',
      loadAsync: true,
    },
    crm: {
      provider: 'none',
    },
    emailMarketing: {
      provider: 'none',
    },
  },

  // ─── FEATURE FLAGS ────────────────────────────────────────────────────────
  features: {
    blog:               false,
    faqPage:            true,
    galleryPage:        false,    // Cleaning before/after are nice but not primary conversion driver
    financingPage:      false,    // Average ticket too low for financing
    careersPage:        false,
    videoTestimonials:  false,
    caseStudies:        false,
    stickyMobileCTA:    true,
    floatingPhoneButton: false,
    emergencyBanner:    false,   // Cleaning is a scheduled service — no emergency messaging
    seasonalHero:       false,
    cookieConsent:      true,    // Required — CCPA California
    recaptcha:          false,   // Using honeypot instead
    darkMode:           false,
    multiLanguage:      false,
    honeypotField:      true,
    rateLimiting:       true,
  },
};
