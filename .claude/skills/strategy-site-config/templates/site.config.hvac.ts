/**
 * site.config.hvac.ts — Niche Template: HVAC Contractor
 * Copytier Website Builder — Pack 1 Template
 *
 * USAGE: Copy this file to the client repo as src/site.config.ts
 * Replace all values marked // REPLACE: with real client data from the Build Brief.
 *
 * Niche: hvac | Schema: HVACBusiness | License: C-20
 * Primary persona: emergency | Color: Navy/blue palette
 * Special flags: seasonalHero=true, financingPage=true
 */

import type { SiteConfig } from '../references/site-config-interface';

export const siteConfig: SiteConfig = {

  // ─── IDENTITY ──────────────────────────────────────────────────────────────
  niche: 'hvac',
  schemaType: 'HVACBusiness',
  currentPhase: 'mvp',

  business: {
    name: 'Premier Comfort HVAC',                            // REPLACE: client business name
    legalName: 'Premier Comfort Heating & Air Inc.',         // REPLACE: legal entity name
    tagline: 'Sacramento\'s HVAC Experts — Comfort Guaranteed', // REPLACE: tagline
    description:
      'Premier Comfort HVAC has kept Sacramento families and businesses comfortable ' +
      'since 2008. We specialize in AC repair, heating repair, system installation, ' +
      'and duct cleaning — with 24/7 emergency response, NATE-certified technicians, ' +
      'and financing available for system replacements.',
    ownerName: 'David Chen',                                 // REPLACE: owner name
    yearEstablished: 2008,                                   // REPLACE: year
    employeeCount: '11–20',
    address: {
      street: '3350 Watt Ave',                              // REPLACE: address
      suite: 'Suite 12',
      city: 'Sacramento',                                   // REPLACE: city
      state: 'CA',
      zip: '95821',                                         // REPLACE: zip
      country: 'United States',
    },
    geo: {
      latitude: 38.6101,                                    // REPLACE: GPS coords
      longitude: -121.3620,
    },
    hours: {
      regular: 'Mon–Fri 7am–8pm, Sat 8am–5pm',
      emergency: '24/7 Emergency HVAC Service',
      timezone: 'America/Los_Angeles',
      openingHoursSpec: [
        { dayOfWeek: 'https://schema.org/Monday',    opens: '07:00', closes: '20:00' },
        { dayOfWeek: 'https://schema.org/Tuesday',   opens: '07:00', closes: '20:00' },
        { dayOfWeek: 'https://schema.org/Wednesday', opens: '07:00', closes: '20:00' },
        { dayOfWeek: 'https://schema.org/Thursday',  opens: '07:00', closes: '20:00' },
        { dayOfWeek: 'https://schema.org/Friday',    opens: '07:00', closes: '20:00' },
        { dayOfWeek: 'https://schema.org/Saturday',  opens: '08:00', closes: '17:00' },
      ],
    },
    social: {
      googleBusinessProfile: 'https://g.page/premier-comfort-hvac-sacramento', // REPLACE
      facebook:  'https://facebook.com/premiercomforthvac',                     // REPLACE
      yelp:      'https://yelp.com/biz/premier-comfort-hvac-sacramento',        // REPLACE
      nextdoor:  'https://nextdoor.com/pages/premier-comfort-hvac',             // REPLACE
      instagram: 'https://instagram.com/premiercomforthvac',                    // REPLACE
    },
  },

  // ─── VALUE PROPOSITION ────────────────────────────────────────────────────
  valueProposition: {
    headline: 'AC Down? We\'ll Fix It Today.',          // REPLACE: headline
    subheadline:
      'NATE-certified HVAC technicians serving Sacramento 24/7 — emergency repairs, ' +
      'system installations, and 0% financing options available.',
    primaryCTA: {
      text: 'Call Now — 24/7',
      href: 'tel:+19165550217',       // REPLACE: phone
      variant: 'primary',
      icon: 'phone',
    },
    secondaryCTA: {
      text: 'Schedule Service',
      href: '/contact',
      variant: 'outline',
      icon: 'calendar',
    },
  },

  // ─── PERSONAS ─────────────────────────────────────────────────────────────
  personas: {
    primary: 'emergency',
    secondary: 'researcher',
    nicheExtensions: ['property-manager', 'new-homeowner', 'system-upgrade-planner'],
  },

  // ─── USER JOURNEYS ────────────────────────────────────────────────────────
  userJourneys: {
    primary: {
      persona: 'emergency',
      steps: [
        {
          action: 'Searches "AC not working Sacramento" on a 105°F summer afternoon',
          need: 'Immediate confirmation someone is available to come out TODAY',
          siteResponse: 'Hero: "AC Down? We\'ll Fix It Today" + "Same-Day Service Available" badge + phone number',
        },
        {
          action: 'Checks if they work on my AC brand',
          need: 'Brand compatibility reassurance',
          siteResponse: 'Trust strip lists: Carrier, Lennox, Trane, Goodman, York, Rheem — all serviced',
        },
        {
          action: 'Wonders about after-hours cost',
          need: 'Price transparency before calling',
          siteResponse: 'FAQ: "Do you charge extra for same-day service?" — No diagnostic fee on repair jobs',
        },
        {
          action: 'Calls or uses the emergency contact form',
          need: 'Fast, one-tap contact on mobile while standing in hot house',
          siteResponse: 'Sticky mobile CTA: "Call Now" fills entire bottom bar — impossible to miss',
        },
      ],
    },
    secondary: {
      persona: 'researcher',
      steps: [
        {
          action: 'Searches "HVAC installation cost Sacramento" during cooler month',
          need: 'Understand what a replacement system costs and what\'s included',
          siteResponse: 'AC Installation page with honest price range, financing section, brands carried',
        },
        {
          action: 'Wants to know if their old system is worth repairing',
          need: 'Honest guidance on repair vs. replace decision',
          siteResponse: 'FAQ: "Should I repair or replace my AC?" + link to financing page',
        },
        {
          action: 'Evaluates company credentials and reviews',
          need: 'NATE certification, license number, how long in business',
          siteResponse: 'Trust section: NATE badge, C-20 license #, BBB, 400+ Google reviews',
        },
        {
          action: 'Requests quote for new system installation',
          need: 'In-home assessment with no-pressure estimate',
          siteResponse: 'Contact form with "I need a new system" option — leads to free in-home quote',
        },
      ],
    },
  },

  // ─── SUCCESS METRICS ──────────────────────────────────────────────────────
  successMetrics: {
    conversionRateTarget: 4.5,
    monthlyOrganicSessionsTarget: 2500,
    lcpTargetMs: 2000,
    ttfbTargetMs: 400,
    targetReviewRating: 4.8,
    targetReviewCount: 600,
    primaryConversionEvents: ['phone_call_click', 'form_submit', 'financing_page_view'],
    businessKPIs: [
      'Cost per acquired lead < $55',
      'Summer emergency response time < 4 hours',
      'Maintenance agreement upsell rate > 30%',
      'Average install ticket > $4,500',
    ],
  },

  // ─── MOSCOW PRIORITY ──────────────────────────────────────────────────────
  featurePriority: {
    mustHave: [
      'Homepage with seasonal emergency hero',
      'Service pages for all 5 core services',
      'Financing page (0% options are major differentiator)',
      'Contact page with form and map',
      'Sticky mobile click-to-call bar',
      'Emergency availability banner',
      'Trust signals: NATE cert, C-20 license, rating',
      'Seasonal hero switching (summer AC / winter heat)',
      'Cookie consent (CCPA)',
      'FAQ page',
      'Privacy and terms pages',
    ],
    shouldHave: [
      'Service area pages for top 5 cities',
      'About page with team photos',
      'Google Reviews widget',
      'Maintenance plan/agreement page',
      'Gallery of installations',
    ],
    couldHave: [
      'Blog with seasonal HVAC tips',
      'Energy efficiency calculator',
      'Brand comparison page',
      'Spanish language support',
    ],
    wontHave: [
      'Parts store or e-commerce',
      'Customer self-scheduling portal',
      'Live chat (phone conversion preferred)',
    ],
  },

  // ─── SERVICES ─────────────────────────────────────────────────────────────
  services: [
    {
      name: 'AC Repair',
      slug: 'ac-repair',
      shortDescription:
        'Same-day AC repair for all makes and models. Diagnosis included with every repair — our techs arrive stocked with common parts to fix it in one visit.',
      icon: 'wind',
      isEmergency: true,
      problems: [
        'Air conditioner not cooling or blowing warm air',
        'AC unit not turning on at all',
        'AC cycling on and off repeatedly (short cycling)',
        'Strange noises from the indoor or outdoor unit',
        'Ice forming on the refrigerant lines or coil',
      ],
      priceRange: '$89 diagnostic + parts & labor',
      seasonalRelevance: ['spring', 'summer'],
    },
    {
      name: 'Heating Repair',
      slug: 'heating-repair',
      shortDescription:
        'Fast furnace and heat pump repair for Sacramento homes. We service all brands and carry common parts to resolve most heating issues in one visit.',
      icon: 'flame',
      isEmergency: true,
      problems: [
        'Furnace not producing heat or turning on',
        'Heating system cycling on and off',
        'Unusual banging, rattling, or squealing from furnace',
        'Carbon monoxide detector triggered near HVAC',
        'Uneven heating — some rooms much colder than others',
      ],
      priceRange: '$89 diagnostic + parts & labor',
      seasonalRelevance: ['fall', 'winter'],
    },
    {
      name: 'AC Installation',
      slug: 'ac-installation',
      shortDescription:
        'Energy-efficient central AC installation for Sacramento homes. We carry Carrier, Lennox, and Goodman systems with 0% financing options available.',
      icon: 'thermometer-snowflake',
      isEmergency: false,
      problems: [
        'Home has no central air conditioning',
        'Old AC system beyond economical repair (10+ years old)',
        'Upgrading to a higher efficiency SEER system',
        'Adding AC to a new addition or converted space',
        'Replacing builder-grade system with premium option',
      ],
      priceRange: '$3,800–$8,500 (system + installation)',
      seasonalRelevance: ['spring', 'fall'],
    },
    {
      name: 'Furnace Installation',
      slug: 'furnace-installation',
      shortDescription:
        'High-efficiency furnace installation and replacement. We size your system correctly, remove the old unit, and handle all permits — start to finish.',
      icon: 'thermometer-sun',
      isEmergency: false,
      problems: [
        'Furnace over 15 years old and failing frequently',
        'High heating bills from inefficient older system',
        'Furnace producing uneven or inadequate heat',
        'Upgrading to a two-stage or variable-speed system',
        'Converting from electric baseboard to forced air',
      ],
      priceRange: '$2,800–$6,500 (system + installation)',
      seasonalRelevance: ['summer', 'fall'],
    },
    {
      name: 'Duct Cleaning',
      slug: 'duct-cleaning',
      shortDescription:
        'Professional air duct cleaning removes years of dust, allergens, and debris — improving indoor air quality and system efficiency.',
      icon: 'airplay',
      isEmergency: false,
      problems: [
        'Visible dust blowing from vents when system turns on',
        'Family members with allergies or asthma noticing symptoms at home',
        'Musty smell from vents when HVAC runs',
        'Post-renovation cleanup of construction dust in ducts',
        'System not cleaned in 5+ years',
      ],
      priceRange: '$299–$599 (whole home)',
      seasonalRelevance: ['spring', 'fall'],
    },
  ],

  // ─── SERVICE AREAS ────────────────────────────────────────────────────────
  serviceAreas: [
    { name: 'Sacramento',    slug: 'sacramento',    type: 'city',   state: 'CA', isPrimary: true,  coordinates: { latitude: 38.5816, longitude: -121.4944 } },
    { name: 'Elk Grove',     slug: 'elk-grove',     type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 38.4088, longitude: -121.3716 } },
    { name: 'Roseville',     slug: 'roseville',     type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 38.7521, longitude: -121.2880 } },
    { name: 'Folsom',        slug: 'folsom',        type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 38.6779, longitude: -121.1761 } },
    { name: 'Rancho Cordova', slug: 'rancho-cordova', type: 'city', state: 'CA', isPrimary: false, coordinates: { latitude: 38.5891, longitude: -121.3022 } },
    { name: 'Citrus Heights', slug: 'citrus-heights', type: 'city', state: 'CA', isPrimary: false, coordinates: { latitude: 38.7071, longitude: -121.2811 } },
    { name: 'Sacramento County', slug: 'sacramento-county', type: 'county', state: 'CA', isPrimary: false },
  ],

  // ─── PAGES ────────────────────────────────────────────────────────────────
  pages: [
    {
      title: 'HVAC Sacramento | AC Repair & Heating | Premier Comfort',  // REPLACE
      slug: '/',
      type: 'homepage',
      metaDescription:
        'Sacramento HVAC company available 24/7. AC repair, heating repair, installation, duct cleaning. NATE-certified. Financing available. Call Premier Comfort HVAC.',
      h1: 'Sacramento\'s HVAC Experts — Air Conditioning & Heating',
      includeSchema: ['LocalBusiness', 'FAQPage'],
      phase: 'mvp',
      sections: ['Hero', 'TrustStrip', 'Services', 'WhyUs', 'Financing', 'Testimonials', 'ServiceAreas', 'FAQ', 'FinalCTA'],
    },
    {
      title: 'AC Repair Sacramento | Same-Day Service | Premier Comfort HVAC',
      slug: 'services/ac-repair',
      type: 'service',
      metaDescription:
        'AC repair in Sacramento. Same-day service for all brands. NATE-certified technicians. No hidden fees. 24/7 emergency AC repair. Call Premier Comfort HVAC.',
      h1: 'AC Repair in Sacramento — Same-Day Service',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Furnace & Heating Repair Sacramento | Premier Comfort HVAC',
      slug: 'services/heating-repair',
      type: 'service',
      metaDescription:
        'Furnace and heating repair in Sacramento. All brands serviced. Fast response — most repairs done in one visit. NATE-certified. Call Premier Comfort HVAC.',
      h1: 'Heating Repair in Sacramento — Furnace & Heat Pump',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'AC Installation Sacramento | New AC Systems | Premier Comfort',
      slug: 'services/ac-installation',
      type: 'service',
      metaDescription:
        'AC installation in Sacramento. Carrier, Lennox, Goodman systems. 0% financing available. Free in-home estimates. Licensed C-20. Call Premier Comfort HVAC.',
      h1: 'AC Installation in Sacramento — New & Replacement Systems',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Furnace Installation Sacramento | Heating Systems | Premier Comfort',
      slug: 'services/furnace-installation',
      type: 'service',
      metaDescription:
        'Furnace installation in Sacramento. High-efficiency gas and heat pump systems. Financing available. Free estimates. Licensed C-20 HVAC contractor.',
      h1: 'Furnace Installation in Sacramento — New & Replacement',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Duct Cleaning Sacramento | Air Duct Service | Premier Comfort',
      slug: 'services/duct-cleaning',
      type: 'service',
      metaDescription:
        'Air duct cleaning in Sacramento. Remove allergens, dust, and debris from your HVAC system. Improve air quality. Call Premier Comfort for pricing.',
      h1: 'Air Duct Cleaning in Sacramento',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'HVAC Financing Sacramento | 0% Options | Premier Comfort',
      slug: 'financing',
      type: 'financing',
      metaDescription:
        'HVAC financing in Sacramento. 0% interest options for new AC and furnace installations. Apply in minutes. Premier Comfort HVAC. No money down available.',
      h1: 'HVAC Financing — Make Comfort Affordable',
      includeSchema: ['FAQPage'],
      phase: 'mvp',
    },
    {
      title: 'Contact Premier Comfort HVAC Sacramento | Free Estimates',
      slug: 'contact',
      type: 'contact',
      metaDescription:
        'Contact Premier Comfort HVAC in Sacramento. 24/7 emergency service. Free estimates on new systems. NATE-certified technicians. Call or request online.',
      h1: 'Contact Premier Comfort HVAC',
      includeSchema: ['LocalBusiness'],
      phase: 'mvp',
    },
    {
      title: 'About Premier Comfort HVAC | Sacramento HVAC Since 2008',
      slug: 'about',
      type: 'about',
      metaDescription:
        'Premier Comfort HVAC — Sacramento\'s trusted heating and air conditioning company since 2008. NATE-certified team, 400+ five-star reviews, C-20 licensed.',
      h1: 'About Premier Comfort HVAC',
      includeSchema: ['LocalBusiness'],
      phase: 'mvp',
    },
    {
      title: 'HVAC FAQ Sacramento | Premier Comfort Heating & Air',
      slug: 'faq',
      type: 'faq',
      metaDescription:
        'Common HVAC questions answered. AC repair costs, when to replace your system, financing options, maintenance tips. Premier Comfort HVAC Sacramento.',
      h1: 'HVAC Frequently Asked Questions',
      includeSchema: ['FAQPage'],
      phase: 'mvp',
    },
    {
      title: 'HVAC in Elk Grove | Premier Comfort Heating & Air',
      slug: 'service-areas/elk-grove',
      type: 'service-area',
      metaDescription:
        'HVAC service in Elk Grove, CA. AC repair, heating repair, system installation. Same-day service. NATE-certified. Call Premier Comfort HVAC today.',
      h1: 'HVAC Service in Elk Grove, CA',
      includeSchema: ['LocalBusiness', 'BreadcrumbList'],
      phase: 'phase2',
    },
    {
      title: 'Privacy Policy | Premier Comfort HVAC',
      slug: 'privacy',
      type: 'privacy',
      metaDescription: 'Privacy policy for Premier Comfort HVAC. How we collect, use, and protect your personal information.',
      h1: 'Privacy Policy',
      includeSchema: [],
      phase: 'mvp',
    },
    {
      title: 'Thank You | Premier Comfort HVAC',
      slug: 'thank-you',
      type: 'thank-you',
      metaDescription: 'Thank you for contacting Premier Comfort HVAC. We\'ll be in touch within 2 hours.',
      h1: 'We Received Your Message',
      includeSchema: [],
      phase: 'mvp',
    },
  ],

  // ─── TRUST SIGNALS ────────────────────────────────────────────────────────
  trustSignals: {
    googleRating: 4.8,               // REPLACE
    reviewCount: 427,                // REPLACE
    reviewSource: 'Google',
    licenseNumber: '1027341',        // REPLACE: CSLB license number
    licenseType: 'C-20 Warm-Air Heating, Ventilating and Air-Conditioning Contractor',
    licensedBondedInsured: true,
    yearEstablished: 2008,
    certifications: [
      { name: 'NATE Certified — North American Technician Excellence' },
      { name: 'ENERGY STAR® Partner' },
      { name: 'BBB Accredited Business — A+ Rating' },
      { name: 'Carrier Factory Authorized Dealer' },
    ],
    guarantees: [
      '100% Satisfaction Guarantee',
      'Upfront Pricing — No Surprise Fees',
      '2-Year Labor Warranty on All Repairs',
      '10-Year Parts Warranty on New Systems',
      'NATE-Certified Technicians on Every Job',
    ],
    bbbAccredited: true,
    bbbRating: 'A+',
  },

  // ─── TESTIMONIALS ─────────────────────────────────────────────────────────
  testimonials: {
    source: 'manual',
    displayCount: 3,
    manual: [
      {
        name: 'Susan K.',
        location: 'Sacramento, CA',
        rating: 5,
        text: 'Our AC died on the hottest day of the year — 109 degrees outside. Premier Comfort sent a tech within 3 hours. He diagnosed a bad capacitor, had the part on his truck, and had us cooling again in under an hour. The price was reasonable and the tech was incredibly professional. Lifesavers.',
        service: 'AC Repair',
        date: 'July 2024',
        source: 'Google',
      },
      {
        name: 'Marcus W.',
        location: 'Elk Grove, CA',
        rating: 5,
        text: 'Got three quotes for a new Carrier AC system. Premier Comfort was the most thorough — David actually did a Manual J load calculation instead of just eyeballing the size like the other guys. The installation was clean, the crew was respectful, and the 0% financing made a big purchase manageable.',
        service: 'AC Installation',
        date: 'April 2024',
        source: 'Google',
      },
      {
        name: 'Angela R.',
        location: 'Roseville, CA',
        rating: 5,
        text: 'I\'ve been using Premier Comfort for annual maintenance for 4 years now. They always show up on time, they\'re honest about what needs attention versus what can wait, and they never try to upsell me on things I don\'t need. When my furnace finally gave out last winter, replacing it with Premier Comfort was a no-brainer.',
        service: 'Heating Repair',
        date: 'December 2023',
        source: 'Google',
      },
    ],
  },

  // ─── CONTACT ──────────────────────────────────────────────────────────────
  contact: {
    phone: '(916) 555-0217',               // REPLACE
    phoneFormatted: '+19165550217',         // REPLACE
    email: 'service@premiercomforthvac.com', // REPLACE
    emergencyPhone: '(916) 555-0217',
    address: {
      street: '3350 Watt Ave',
      suite: 'Suite 12',
      city: 'Sacramento',
      state: 'CA',
      zip: '95821',
      country: 'United States',
    },
    responseTimePromise: 'We respond to all service requests within 2 hours. Emergency calls answered immediately 24/7.',
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
        placeholder: '(916) 555-0100',
        validation: { pattern: '^[\\d\\s\\-\\(\\)\\+]{7,20}$', message: 'Please enter a valid phone number.' },
      },
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        required: false,
        placeholder: 'you@email.com',
      },
      {
        name: 'service',
        label: 'What do you need?',
        type: 'select',
        required: true,
        options: [
          'Emergency AC or Heating Repair',
          'AC Repair (Non-Emergency)',
          'Heating Repair (Non-Emergency)',
          'New AC System Installation',
          'New Furnace Installation',
          'Duct Cleaning',
          'Maintenance / Tune-Up',
          'Financing Question',
          'Other / Not Sure',
        ],
      },
      {
        name: 'message',
        label: 'Describe the Issue',
        type: 'textarea',
        required: false,
        placeholder: 'E.g. AC is blowing warm air. 2,200 sq ft home. Carrier unit installed in 2012.',
        validation: { maxLength: 1000 },
      },
      {
        name: 'honeypot',
        label: 'Leave this blank',
        type: 'hidden',
        required: false,
      },
    ],
    formSuccessMessage: 'Thank you! We\'ll call you back within 2 hours. For emergencies, call us directly at (916) 555-0217.',
    formErrorMessage: 'Something went wrong. Please call us at (916) 555-0217 — we answer 24/7.',
    showMap: true,
  },

  // ─── BRANDING ─────────────────────────────────────────────────────────────
  branding: {
    colors: {
      primary:       '#0F2D5E',   // Deep navy — professional, trustworthy
      secondary:     '#1A4A8A',   // Medium navy blue
      accent:        '#F59E0B',   // Amber — seasonal warmth, urgency
      background:    '#FFFFFF',
      backgroundAlt: '#EFF6FF',   // Very light blue for alternate sections
      text:          '#111827',
      textMuted:     '#6B7280',
    },
    fonts: {
      heading: 'Barlow',          // Strong, clean — technical authority
      body:    'Lato',            // Friendly and readable
    },
    logo: {
      path:    '/images/logo.svg',  // REPLACE
      altText: 'Premier Comfort HVAC — Sacramento Heating & Air Conditioning',
      width:   240,
      height:  64,
    },
    imagery: {
      style:            'professional',
      hasTeamPhotos:    false,      // REPLACE
      hasProjectPhotos: false,      // REPLACE
      hasVehiclePhotos: false,      // REPLACE
      stockPhotoFallback: 'HVAC technician servicing air conditioning unit Sacramento home',
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
    domain: 'premiercomforthvac.com',   // REPLACE
    email: {
      provider:            'resend',
      notificationService: 'email',
    },
  },

  // ─── INTEGRATIONS ─────────────────────────────────────────────────────────
  integrations: {
    analytics: {
      ga4:              true,
      ga4MeasurementId: 'G-XXXXXXXXXX',  // REPLACE
      googleTagManager: false,
      searchConsole:    true,
    },
    maps: {
      provider:            'google',
      embedOnContact:      true,
      embedOnServiceAreas: false,
    },
    reviews: {
      source: 'manual',
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
    galleryPage:        false,
    financingPage:      true,    // High value for HVAC — system replacements are $4K–$10K
    careersPage:        false,
    videoTestimonials:  false,
    caseStudies:        false,
    stickyMobileCTA:    true,
    floatingPhoneButton: false,
    emergencyBanner:    true,
    seasonalHero:       true,    // Summer = AC focus, Winter = heating focus
    cookieConsent:      true,
    recaptcha:          false,
    darkMode:           false,
    multiLanguage:      false,
    honeypotField:      true,
    rateLimiting:       true,
  },
};
