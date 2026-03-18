/**
 * site.config.electrician.ts — Niche Template: Electrical Contractor
 * Copytier Website Builder — Pack 1 Template
 *
 * USAGE: Copy this file to the client repo as src/site.config.ts
 * Replace all values marked // REPLACE: with real client data from the Build Brief.
 *
 * Niche: electrician | Schema: Electrician | License: C-10
 * Primary persona: emergency | Color: Dark blue / yellow palette
 * Special: safety messaging emphasis throughout
 */

import type { SiteConfig } from '../references/site-config-interface';

export const siteConfig: SiteConfig = {

  niche: 'electrician',
  schemaType: 'Electrician',
  currentPhase: 'mvp',

  business: {
    name: 'Bright Force Electric',                              // REPLACE
    legalName: 'Bright Force Electric Inc.',                    // REPLACE
    tagline: 'Licensed Electricians Serving the Inland Empire', // REPLACE
    description:
      'Bright Force Electric provides residential and light commercial electrical ' +
      'services throughout the Inland Empire. With 15 years of experience, our ' +
      'C-10 licensed electricians handle everything from panel upgrades and new ' +
      'wiring to outlet repairs and whole-home generators — always with your ' +
      'family\'s safety as our top priority.',
    ownerName: 'James Rivera',   // REPLACE
    yearEstablished: 2009,       // REPLACE
    employeeCount: '6–10',
    address: {
      street: '8275 Limonite Ave', // REPLACE
      suite: 'Unit B',
      city: 'Riverside',           // REPLACE
      state: 'CA',
      zip: '92509',                // REPLACE
      country: 'United States',
    },
    geo: {
      latitude: 33.9425,   // REPLACE
      longitude: -117.4545, // REPLACE
    },
    hours: {
      regular: 'Mon–Fri 7am–6pm, Sat 8am–4pm',
      emergency: '24/7 Emergency Electrical Service',
      timezone: 'America/Los_Angeles',
      openingHoursSpec: [
        { dayOfWeek: 'https://schema.org/Monday',    opens: '07:00', closes: '18:00' },
        { dayOfWeek: 'https://schema.org/Tuesday',   opens: '07:00', closes: '18:00' },
        { dayOfWeek: 'https://schema.org/Wednesday', opens: '07:00', closes: '18:00' },
        { dayOfWeek: 'https://schema.org/Thursday',  opens: '07:00', closes: '18:00' },
        { dayOfWeek: 'https://schema.org/Friday',    opens: '07:00', closes: '18:00' },
        { dayOfWeek: 'https://schema.org/Saturday',  opens: '08:00', closes: '16:00' },
      ],
    },
    social: {
      googleBusinessProfile: 'https://g.page/bright-force-electric-riverside', // REPLACE
      facebook:  'https://facebook.com/brightforceelectric',                    // REPLACE
      yelp:      'https://yelp.com/biz/bright-force-electric-riverside',        // REPLACE
      nextdoor:  'https://nextdoor.com/pages/bright-force-electric',            // REPLACE
      instagram: 'https://instagram.com/brightforceelectric',                   // REPLACE
    },
  },

  valueProposition: {
    headline: 'Inland Empire Electricians. Safe. Licensed. Today.',   // REPLACE
    subheadline:
      'C-10 licensed electricians available 24/7 for electrical emergencies — ' +
      'panel upgrades, wiring, outlets, and lighting done right the first time.',
    primaryCTA: {
      text: 'Call Now — 24/7',
      href: 'tel:+19515550332',   // REPLACE
      variant: 'primary',
      icon: 'phone',
    },
    secondaryCTA: {
      text: 'Get a Free Estimate',
      href: '/contact',
      variant: 'outline',
      icon: 'calendar',
    },
  },

  personas: {
    primary: 'emergency',
    secondary: 'researcher',
    nicheExtensions: ['home-seller', 'remodeler', 'ev-charger-buyer', 'property-manager'],
  },

  userJourneys: {
    primary: {
      persona: 'emergency',
      steps: [
        {
          action: 'Searches "electrician near me emergency" after breaker won\'t reset or sparks from outlet',
          need: 'Immediate safety reassurance and confirmation someone is available NOW',
          siteResponse: 'Hero: "Electrical Emergency? We\'re Available 24/7" + prominent phone number + safety callout',
        },
        {
          action: 'Evaluates: is this an actual emergency or can it wait?',
          need: 'Guidance on what constitutes an electrical emergency',
          siteResponse: 'Emergency banner or callout: "Sparks, burning smell, or no power? Call immediately."',
        },
        {
          action: 'Checks license and insurance — electrical work can be dangerous with unlicensed contractors',
          need: 'Hard proof of C-10 license and insurance',
          siteResponse: 'Trust strip: C-10 License #XXXXXXX · Licensed & Insured · Since 2009 · 4.9★ Google',
        },
        {
          action: 'Calls or fills out emergency form',
          need: 'One tap to call on mobile',
          siteResponse: 'Sticky mobile CTA: "Call Now — 24/7 Emergency" dominates the bottom bar',
        },
      ],
    },
    secondary: {
      persona: 'researcher',
      steps: [
        {
          action: 'Searches "panel upgrade cost Riverside CA" or "electrician for remodel"',
          need: 'Understand scope, cost range, timeline, and whether permits are needed',
          siteResponse: 'Service pages with honest price ranges, permit info, timeline expectations',
        },
        {
          action: 'Compares 2–3 electricians by reviews and credentials',
          need: 'Differentiation — why this company vs. the other two?',
          siteResponse: 'Why Us: 15 years, pull all permits, clean installation, written quotes, background checked',
        },
        {
          action: 'Wants to understand if their panel is truly at capacity or just needs a breaker',
          need: 'Educational content that builds trust without being condescending',
          siteResponse: 'FAQ: "Do I need a full panel upgrade or just a circuit added?" + link to service page',
        },
        {
          action: 'Requests a quote for panel upgrade or wiring project',
          need: 'In-person estimate with written quote',
          siteResponse: 'Contact form with project-type select and "Free Estimate" promise',
        },
      ],
    },
  },

  successMetrics: {
    conversionRateTarget: 4.5,
    monthlyOrganicSessionsTarget: 1800,
    lcpTargetMs: 2000,
    ttfbTargetMs: 400,
    targetReviewRating: 4.9,
    targetReviewCount: 400,
    primaryConversionEvents: ['phone_call_click', 'form_submit', 'emergency_cta_click'],
    businessKPIs: [
      'Cost per acquired lead < $50',
      'Panel upgrade close rate > 55% on in-home estimates',
      'Average job ticket > $800',
      'Permit pull rate = 100%',
    ],
  },

  featurePriority: {
    mustHave: [
      'Homepage with safety-first emergency hero',
      'Service pages for all 5 core services',
      'Contact page with form and map',
      'Sticky mobile click-to-call bar',
      'Emergency electrical warning banner',
      'C-10 license number prominently displayed',
      'Trust signals: license, bond, insurance',
      'Cookie consent (CCPA)',
      'FAQ page with permit and safety FAQs',
      'Privacy and terms pages',
    ],
    shouldHave: [
      'Service area pages for top 5 cities',
      'About page with owner and team',
      'Google Reviews widget',
      'Gallery of panel upgrades and clean installs',
    ],
    couldHave: [
      'EV charger installation landing page',
      'Blog: electrical safety tips',
      'Solar-ready panel page',
      'Spanish language support',
    ],
    wontHave: [
      'DIY electrical guides (liability risk)',
      'E-commerce parts store',
      'Live chat',
    ],
  },

  services: [
    {
      name: 'Electrical Panel Upgrades',
      slug: 'panel-upgrades',
      shortDescription:
        'Upgrade your outdated electrical panel to handle modern power demands — essential for EV chargers, solar, remodels, and homes with Federal Pacific or Zinsco panels.',
      icon: 'zap',
      isEmergency: false,
      problems: [
        'Breakers tripping frequently under normal load',
        'Need to add circuits for EV charger, hot tub, or addition',
        'Home has Federal Pacific, Zinsco, or Pushmatic panel',
        'Planning a major remodel or solar installation',
        '100-amp panel insufficient for modern home needs',
      ],
      priceRange: '$1,800–$4,500',
      seasonalRelevance: ['all'],
    },
    {
      name: 'Outlet & Switch Repair',
      slug: 'outlet-switch-repair',
      shortDescription:
        'Dead outlets, GFCI failures, flickering switches — our electricians diagnose and repair all outlet and switch problems safely and up to code.',
      icon: 'plug',
      isEmergency: true,
      problems: [
        'Outlet stopped working with no obvious cause',
        'GFCI outlet tripping repeatedly or not resetting',
        'Outlet or switch feels warm or makes crackling sound',
        'Need to add outlets for home office or appliances',
        'Two-prong outlets needing GFCI upgrade for safety',
      ],
      priceRange: '$95–$450',
      seasonalRelevance: ['all'],
    },
    {
      name: 'Electrical Wiring',
      slug: 'electrical-wiring',
      shortDescription:
        'New circuit runs, room additions, remodel wiring, and whole-home rewires for older homes with knob-and-tube or aluminum wiring.',
      icon: 'cable',
      isEmergency: false,
      problems: [
        'Adding a room or converting a garage — needs new circuits',
        'Knob-and-tube or aluminum wiring in older home',
        'Not enough outlets in kitchen, office, or bedroom',
        'Running wiring for new appliances (range, dryer, hot tub)',
        'Home inspector flagged wiring issues',
      ],
      priceRange: '$350–$3,500+ (scope-dependent)',
      seasonalRelevance: ['all'],
    },
    {
      name: 'Lighting Installation',
      slug: 'lighting-installation',
      shortDescription:
        'Recessed lighting, ceiling fans, dimmer switches, under-cabinet lighting, and outdoor security lighting — fully permitted and code-compliant.',
      icon: 'lightbulb',
      isEmergency: false,
      problems: [
        'Wanting recessed lighting in living room or kitchen',
        'Ceiling fan replacement or new installation',
        'Outdoor security or landscape lighting',
        'Under-cabinet kitchen lighting upgrade',
        'Dimmer switch installation for ambiance control',
      ],
      priceRange: '$150–$1,200',
      seasonalRelevance: ['all'],
    },
    {
      name: 'Electrical Repair',
      slug: 'electrical-repair',
      shortDescription:
        '24/7 emergency electrical repairs — burning smells, sparking outlets, power outages, and tripped main breakers diagnosed and fixed safely.',
      icon: 'wrench',
      isEmergency: true,
      problems: [
        'Burning smell from outlet, wall, or panel',
        'Sparks from outlet or switch',
        'Partial power loss to one area of the home',
        'Main breaker repeatedly tripping',
        'Circuit breaker that won\'t stay on',
      ],
      priceRange: '$120–$900+ (diagnosis + repair)',
      seasonalRelevance: ['all'],
    },
  ],

  serviceAreas: [
    { name: 'Riverside',       slug: 'riverside',        type: 'city',   state: 'CA', isPrimary: true,  coordinates: { latitude: 33.9533, longitude: -117.3962 } },
    { name: 'Corona',          slug: 'corona',           type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 33.8753, longitude: -117.5664 } },
    { name: 'Moreno Valley',   slug: 'moreno-valley',    type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 33.9425, longitude: -117.2297 } },
    { name: 'Ontario',         slug: 'ontario',          type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 34.0633, longitude: -117.6509 } },
    { name: 'Fontana',         slug: 'fontana',          type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 34.0922, longitude: -117.4350 } },
    { name: 'Rancho Cucamonga', slug: 'rancho-cucamonga', type: 'city',  state: 'CA', isPrimary: false, coordinates: { latitude: 34.1064, longitude: -117.5931 } },
    { name: 'Riverside County', slug: 'riverside-county', type: 'county', state: 'CA', isPrimary: false },
  ],

  pages: [
    {
      title: 'Electrician in Riverside | Bright Force Electric',   // REPLACE
      slug: '/',
      type: 'homepage',
      metaDescription:
        'Licensed electrician in Riverside, CA. Panel upgrades, wiring, outlet repair, 24/7 emergency service. C-10 licensed. Call Bright Force Electric for a free estimate.',
      h1: 'Licensed Electrician in Riverside — Safe, Fast, Permitted',
      includeSchema: ['LocalBusiness', 'FAQPage'],
      phase: 'mvp',
      sections: ['Hero', 'TrustStrip', 'Services', 'SafetyCallout', 'WhyUs', 'Testimonials', 'ServiceAreas', 'FAQ', 'FinalCTA'],
    },
    {
      title: 'Electrical Panel Upgrade Riverside | Bright Force Electric',
      slug: 'services/panel-upgrades',
      type: 'service',
      metaDescription:
        'Electrical panel upgrades in Riverside, CA. 200-amp upgrades, subpanels, permit pulled. Licensed C-10. Free estimate. Call Bright Force Electric today.',
      h1: 'Electrical Panel Upgrades in Riverside, CA',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Outlet & Switch Repair Riverside | Bright Force Electric',
      slug: 'services/outlet-switch-repair',
      type: 'service',
      metaDescription:
        'Outlet and switch repair in Riverside. Dead outlets, GFCI issues, sparking switches. Licensed electrician. Same-day service available. Call Bright Force Electric.',
      h1: 'Outlet & Switch Repair in Riverside, CA',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Electrical Wiring Riverside CA | Rewire & New Circuits | Bright Force',
      slug: 'services/electrical-wiring',
      type: 'service',
      metaDescription:
        'Electrical wiring in Riverside. New circuits, room additions, knob-and-tube rewires. Permits pulled. Licensed C-10 electrician. Free estimate. Bright Force Electric.',
      h1: 'Electrical Wiring Services in Riverside, CA',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Lighting Installation Riverside | Recessed & Outdoor | Bright Force',
      slug: 'services/lighting-installation',
      type: 'service',
      metaDescription:
        'Lighting installation in Riverside. Recessed lighting, ceiling fans, outdoor security lights. Permitted. Licensed C-10 electrician. Call Bright Force Electric.',
      h1: 'Lighting Installation in Riverside, CA',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Emergency Electrician Riverside | 24/7 Electrical Repair | Bright Force',
      slug: 'services/electrical-repair',
      type: 'service',
      metaDescription:
        'Emergency electrician in Riverside available 24/7. Burning smells, sparking outlets, power outages. Licensed C-10. Call Bright Force Electric immediately.',
      h1: '24/7 Emergency Electrical Repair in Riverside, CA',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Contact Bright Force Electric | Free Electrical Estimates',
      slug: 'contact',
      type: 'contact',
      metaDescription:
        'Contact Bright Force Electric in Riverside, CA. Free estimates on panel upgrades, wiring, and lighting. 24/7 emergency service. Call or request online.',
      h1: 'Contact Bright Force Electric',
      includeSchema: ['LocalBusiness'],
      phase: 'mvp',
    },
    {
      title: 'About Bright Force Electric | Riverside Electricians Since 2009',
      slug: 'about',
      type: 'about',
      metaDescription:
        'Bright Force Electric — Riverside\'s trusted C-10 electrician since 2009. Background-checked techs, fully permitted work, 350+ five-star Google reviews.',
      h1: 'About Bright Force Electric',
      includeSchema: ['LocalBusiness'],
      phase: 'mvp',
    },
    {
      title: 'Electrical FAQ Riverside | Bright Force Electric',
      slug: 'faq',
      type: 'faq',
      metaDescription:
        'Electrical FAQ for Riverside homeowners. Panel upgrades, permits, safety hazards, EV chargers, and more — answered by licensed electricians.',
      h1: 'Electrical FAQ — Riverside Homeowners\' Questions Answered',
      includeSchema: ['FAQPage'],
      phase: 'mvp',
    },
    {
      title: 'Electrician in Corona CA | Bright Force Electric',
      slug: 'service-areas/corona',
      type: 'service-area',
      metaDescription:
        'Licensed electrician serving Corona, CA. Panel upgrades, wiring, outlet repair, emergency service. C-10 licensed. Call Bright Force Electric for a free estimate.',
      h1: 'Licensed Electrician in Corona, CA',
      includeSchema: ['LocalBusiness', 'BreadcrumbList'],
      phase: 'phase2',
    },
    {
      title: 'Privacy Policy | Bright Force Electric',
      slug: 'privacy',
      type: 'privacy',
      metaDescription: 'Privacy policy for Bright Force Electric.',
      h1: 'Privacy Policy',
      includeSchema: [],
      phase: 'mvp',
    },
    {
      title: 'Thank You | Bright Force Electric',
      slug: 'thank-you',
      type: 'thank-you',
      metaDescription: 'Thank you for contacting Bright Force Electric. We\'ll be in touch shortly.',
      h1: 'We Received Your Message',
      includeSchema: [],
      phase: 'mvp',
    },
  ],

  trustSignals: {
    googleRating: 4.9,             // REPLACE
    reviewCount: 348,              // REPLACE
    reviewSource: 'Google',
    licenseNumber: '1042567',      // REPLACE: CSLB license number
    licenseType: 'C-10 Electrical Contractor',
    licensedBondedInsured: true,
    yearEstablished: 2009,
    certifications: [
      { name: 'IBEW Member — International Brotherhood of Electrical Workers' },
      { name: 'BBB Accredited Business — A+ Rating' },
      { name: 'CSLB Licensed C-10 Electrical Contractor' },
      { name: 'All Technicians Background Checked & Drug Tested' },
    ],
    guarantees: [
      '100% Satisfaction Guarantee',
      'All Work Fully Permitted & Inspected',
      'Upfront Written Estimates — No Hidden Fees',
      '2-Year Labor Warranty on All Work',
      'Background-Checked Electricians on Every Job',
    ],
    bbbAccredited: true,
    bbbRating: 'A+',
  },

  testimonials: {
    source: 'manual',
    displayCount: 3,
    manual: [
      {
        name: 'Kevin H.',
        location: 'Riverside, CA',
        rating: 5,
        text: 'Called Bright Force after noticing a burning smell near our panel. James came out within 2 hours, found a loose connection in the main breaker, and fixed it on the spot. He also noticed our panel was undersized and walked me through what a 200-amp upgrade would involve without any pressure to commit. Really appreciated the honesty.',
        service: 'Electrical Repair',
        date: 'February 2024',
        source: 'Google',
      },
      {
        name: 'Maria S.',
        location: 'Corona, CA',
        rating: 5,
        text: 'Got three quotes for a 200-amp panel upgrade and EV charger. Bright Force was mid-range on price but by far the most thorough — James explained exactly what needed to happen, pulled all the permits, and the inspector actually complimented the quality of the work. The EV charger has been flawless.',
        service: 'Panel Upgrade',
        date: 'October 2023',
        source: 'Google',
      },
      {
        name: 'Tom & Linda B.',
        location: 'Rancho Cucamonga, CA',
        rating: 5,
        text: 'We had recessed lighting installed in four rooms. The Bright Force crew was clean, fast, and absolutely meticulous about patching the drywall cuts. They matched our existing switches perfectly and the final result looks like it came with the house. Could not be happier.',
        service: 'Lighting Installation',
        date: 'August 2023',
        source: 'Google',
      },
    ],
  },

  contact: {
    phone: '(951) 555-0332',              // REPLACE
    phoneFormatted: '+19515550332',        // REPLACE
    email: 'james@brightforceelectric.com', // REPLACE
    emergencyPhone: '(951) 555-0332',
    address: {
      street: '8275 Limonite Ave',
      suite: 'Unit B',
      city: 'Riverside',
      state: 'CA',
      zip: '92509',
      country: 'United States',
    },
    responseTimePromise: 'We respond to all estimate requests within 4 hours. Emergency calls answered immediately.',
    formFields: [
      {
        name: 'name',
        label: 'Your Name',
        type: 'text',
        required: true,
        placeholder: 'John Smith',
        validation: { minLength: 2, maxLength: 80, message: 'Please enter your name.' },
      },
      {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        required: true,
        placeholder: '(951) 555-0100',
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
        label: 'Type of Work Needed',
        type: 'select',
        required: true,
        options: [
          'Emergency — Burning Smell / Sparks / No Power',
          'Panel Upgrade',
          'New Wiring / Circuit Addition',
          'Outlet or Switch Repair',
          'Lighting Installation',
          'EV Charger Installation',
          'Other / Not Sure',
        ],
      },
      {
        name: 'message',
        label: 'Describe the Work',
        type: 'textarea',
        required: false,
        placeholder: 'E.g. Need a 200-amp panel upgrade and Level 2 EV charger in garage.',
        validation: { maxLength: 1000 },
      },
      {
        name: 'honeypot',
        label: 'Leave this blank',
        type: 'hidden',
        required: false,
      },
    ],
    formSuccessMessage: 'Thank you! We\'ll call you within 4 hours to schedule your free estimate. For emergencies, call (951) 555-0332 immediately.',
    formErrorMessage: 'Something went wrong sending your message. Please call (951) 555-0332 directly — we\'re available 24/7.',
    showMap: true,
  },

  branding: {
    colors: {
      primary:       '#1E3A5F',   // Dark blue — professional, safe, trustworthy
      secondary:     '#2C5282',   // Medium blue
      accent:        '#ECC94B',   // Yellow — electrical brand association, warning energy
      background:    '#FFFFFF',
      backgroundAlt: '#F7FAFC',   // Near-white alternate sections
      text:          '#1A202C',
      textMuted:     '#718096',
    },
    fonts: {
      heading: 'Oswald',         // Strong, industrial — fits electrical/technical trade
      body:    'Source Sans 3',  // Readable, professional
    },
    logo: {
      path:    '/images/logo.svg', // REPLACE
      altText: 'Bright Force Electric — Licensed Electrician Inland Empire',
      width:   220,
      height:  60,
    },
    imagery: {
      style:            'professional',
      hasTeamPhotos:    false, // REPLACE
      hasProjectPhotos: false, // REPLACE
      hasVehiclePhotos: false, // REPLACE
      stockPhotoFallback: 'licensed electrician installing electrical panel residential home California',
    },
  },

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
    domain: 'brightforceelectric.com',  // REPLACE
    email: {
      provider:            'resend',
      notificationService: 'email',
    },
  },

  integrations: {
    analytics: {
      ga4:              true,
      ga4MeasurementId: 'G-XXXXXXXXXX', // REPLACE
      googleTagManager: false,
      searchConsole:    true,
    },
    maps: {
      provider:            'google',
      embedOnContact:      true,
      embedOnServiceAreas: false,
    },
    reviews:  { source: 'manual' },
    booking:  { provider: 'none', embedLocation: 'none' },
    chat:     { provider: 'none', loadAsync: true },
    crm:      { provider: 'none' },
    emailMarketing: { provider: 'none' },
  },

  features: {
    blog:               false,
    faqPage:            true,
    galleryPage:        false,
    financingPage:      false,
    careersPage:        false,
    videoTestimonials:  false,
    caseStudies:        false,
    stickyMobileCTA:    true,
    floatingPhoneButton: false,
    emergencyBanner:    true,    // Critical — electrical emergencies need immediate response
    seasonalHero:       false,
    cookieConsent:      true,
    recaptcha:          false,
    darkMode:           false,
    multiLanguage:      false,
    honeypotField:      true,
    rateLimiting:       true,
  },
};
