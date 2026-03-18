/**
 * site.config.plumber.ts — Niche Template: Plumbing Contractor
 * Copytier Website Builder — Pack 1 Template
 *
 * USAGE: Copy this file to the client repo as src/site.config.ts
 * Replace all values marked // REPLACE: with real client data from the Build Brief.
 *
 * Niche: plumber | Schema: Plumber | License: C-36
 * Primary persona: emergency | Color: Blue palette
 */

import type { SiteConfig } from '../references/site-config-interface';

export const siteConfig: SiteConfig = {

  // ─── IDENTITY ──────────────────────────────────────────────────────────────
  niche: 'plumber',
  schemaType: 'Plumber',
  currentPhase: 'mvp',

  business: {
    name: 'Smith Plumbing & Drain',                    // REPLACE: client business name
    legalName: 'Smith Plumbing & Drain Inc.',          // REPLACE: legal entity name
    tagline: 'San Diego\'s Trusted Plumber Since 2003', // REPLACE: tagline
    description:
      'Smith Plumbing & Drain has served San Diego homeowners and businesses ' +
      'for over 20 years. We specialize in emergency plumbing, drain cleaning, ' +
      'water heater replacement, and sewer line repair — available 24/7 with ' +
      'upfront pricing and no hidden fees.',
    ownerName: 'Mike Smith',                           // REPLACE: owner name
    yearEstablished: 2003,                             // REPLACE: year established
    employeeCount: '6–10',
    address: {
      street: '4821 Mission Gorge Pl',                 // REPLACE: street address
      city: 'San Diego',                               // REPLACE: city
      state: 'CA',
      zip: '92120',                                    // REPLACE: zip code
      country: 'United States',
    },
    geo: {
      latitude: 32.7877,                               // REPLACE: GPS latitude
      longitude: -117.0722,                            // REPLACE: GPS longitude
    },
    hours: {
      regular: 'Mon–Sat 7am–7pm',
      emergency: '24/7 Emergency Service Available',
      timezone: 'America/Los_Angeles',
      openingHoursSpec: [
        { dayOfWeek: 'https://schema.org/Monday',    opens: '07:00', closes: '19:00' },
        { dayOfWeek: 'https://schema.org/Tuesday',   opens: '07:00', closes: '19:00' },
        { dayOfWeek: 'https://schema.org/Wednesday', opens: '07:00', closes: '19:00' },
        { dayOfWeek: 'https://schema.org/Thursday',  opens: '07:00', closes: '19:00' },
        { dayOfWeek: 'https://schema.org/Friday',    opens: '07:00', closes: '19:00' },
        { dayOfWeek: 'https://schema.org/Saturday',  opens: '08:00', closes: '17:00' },
      ],
    },
    social: {
      googleBusinessProfile: 'https://g.page/smith-plumbing-san-diego', // REPLACE: GBP URL
      facebook:  'https://facebook.com/smithplumbingsandiego',           // REPLACE: Facebook URL
      yelp:      'https://yelp.com/biz/smith-plumbing-san-diego',        // REPLACE: Yelp URL
      nextdoor:  'https://nextdoor.com/pages/smith-plumbing-san-diego',  // REPLACE: Nextdoor URL
      instagram: 'https://instagram.com/smithplumbingsd',                // REPLACE: Instagram URL
    },
  },

  // ─── VALUE PROPOSITION ────────────────────────────────────────────────────
  valueProposition: {
    headline: 'San Diego Plumbers. Here in 60 Minutes.',  // REPLACE: headline (max 8 words)
    subheadline:
      'Licensed, bonded & insured plumbers available 24/7 for emergencies — ' +
      'upfront pricing, no hidden fees, same-day service guaranteed.',
    primaryCTA: {
      text: 'Call Now — 24/7',
      href: 'tel:+16195550148',       // REPLACE: formatted phone for tel: link
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

  // ─── PERSONAS ─────────────────────────────────────────────────────────────
  personas: {
    primary: 'emergency',
    secondary: 'researcher',
    nicheExtensions: ['diy-failure', 'property-manager', 'new-homeowner'],
  },

  // ─── USER JOURNEYS ────────────────────────────────────────────────────────
  userJourneys: {
    primary: {
      persona: 'emergency',
      steps: [
        {
          action: 'Searches "emergency plumber San Diego" at 11pm',
          need: 'Immediate reassurance that someone is available right now',
          siteResponse: 'Hero badge "24/7 Emergency — We Answer Every Call" + giant phone number',
        },
        {
          action: 'Scans above the fold for phone number and availability',
          need: 'Visible phone number, availability confirmation, and trust signals in under 3 seconds',
          siteResponse: 'Sticky header with click-to-call, emergency banner, license number visible',
        },
        {
          action: 'Considers: can I trust this company at midnight?',
          need: 'Social proof — real reviews, years in business, license number',
          siteResponse: 'Trust strip: 4.9★ 312 reviews · Licensed C-36 · Since 2003 · BBB A+',
        },
        {
          action: 'Calls or submits the emergency contact form',
          need: 'Friction-free conversion — one tap on mobile',
          siteResponse: 'Sticky mobile CTA bar: "Call Now" + "Text Us" buttons always visible',
        },
      ],
    },
    secondary: {
      persona: 'researcher',
      steps: [
        {
          action: 'Searches "best plumber San Diego reviews" during the day',
          need: 'Understand what makes this company different from other plumbers',
          siteResponse: 'Why Us section: 20 years, upfront pricing, same-day, licensed & insured',
        },
        {
          action: 'Reads service pages for the specific problem they have',
          need: 'Confirm this plumber handles their specific issue (drain, water heater, sewer)',
          siteResponse: 'Dedicated service pages with problem/solution structure and FAQ schema',
        },
        {
          action: 'Checks reviews and credentials before deciding',
          need: 'Independent validation — Google reviews, BBB, license verification',
          siteResponse: 'Testimonial section with Google reviews widget + BBB badge + license display',
        },
        {
          action: 'Requests a quote or books an appointment',
          need: 'Low-pressure way to get a price without committing',
          siteResponse: 'Contact form with "What do you need help with?" select + estimate promise',
        },
      ],
    },
  },

  // ─── SUCCESS METRICS ──────────────────────────────────────────────────────
  successMetrics: {
    conversionRateTarget: 5.0,
    monthlyOrganicSessionsTarget: 2000,
    lcpTargetMs: 2000,
    ttfbTargetMs: 400,
    targetReviewRating: 4.9,
    targetReviewCount: 500,
    primaryConversionEvents: ['phone_call_click', 'form_submit', 'emergency_cta_click'],
    businessKPIs: [
      'Cost per acquired lead < $45',
      'Phone answer rate > 90%',
      'Average job value > $350',
    ],
  },

  // ─── MOSCOW PRIORITY ──────────────────────────────────────────────────────
  featurePriority: {
    mustHave: [
      'Homepage with emergency hero and 24/7 phone number',
      'Service pages for all 5 core services',
      'Contact page with form and map',
      'Sticky mobile click-to-call bar',
      'Emergency availability banner',
      'Trust signals: license, rating, BBB',
      'Cookie consent (CCPA)',
      'Honeypot spam protection',
      'FAQ page',
      'Privacy policy & terms pages',
    ],
    shouldHave: [
      'Service area pages for top 5 cities',
      'About page with owner bio and photos',
      'Google Reviews widget (Elfsight)',
      'Financing page',
      'Before/after gallery',
    ],
    couldHave: [
      'Blog with plumbing tips (seasonal content)',
      'Service area pages for 10+ neighborhoods',
      'Video testimonials',
      'Spanish language support',
    ],
    wontHave: [
      'E-commerce / online payment portal',
      'Customer portal / job tracking',
      'Careers page',
      'Live chat (phone conversion preferred)',
    ],
  },

  // ─── SERVICES ─────────────────────────────────────────────────────────────
  services: [
    {
      name: 'Emergency Plumbing',
      slug: 'emergency-plumbing',
      shortDescription:
        'Burst pipes, flooding, gas leaks — our plumbers are on call 24/7 and typically arrive within 60 minutes anywhere in San Diego.',
      icon: 'alert-circle',
      isEmergency: true,
      problems: [
        'Burst or leaking pipe causing water damage',
        'Sewage backup in toilets, tubs, or floor drains',
        'No hot water in the middle of the night',
        'Gas leak smell (rotten egg odor) in the home',
        'Flooding from overflowing toilet or appliance',
      ],
      priceRange: '$150–$600+ (varies by job)',
      seasonalRelevance: ['all'],
    },
    {
      name: 'Drain Cleaning',
      slug: 'drain-cleaning',
      shortDescription:
        'Slow or clogged drains cleared fast with professional hydro-jetting and drain snaking — kitchen sinks, showers, tubs, and floor drains.',
      icon: 'droplets',
      isEmergency: false,
      problems: [
        'Kitchen sink draining slowly or completely clogged',
        'Shower or tub backing up with standing water',
        'Gurgling sounds from drains after flushing',
        'Multiple fixtures draining slowly at once',
        'Recurring clogs despite DIY attempts',
      ],
      priceRange: '$99–$350',
      seasonalRelevance: ['all'],
    },
    {
      name: 'Water Heater Repair & Replacement',
      slug: 'water-heater',
      shortDescription:
        'Same-day water heater repair and next-day installation for tank and tankless systems — all major brands serviced.',
      icon: 'flame',
      isEmergency: true,
      problems: [
        'No hot water or running out too quickly',
        'Rusty or discolored water from hot taps',
        'Water heater leaking from tank or connections',
        'Popping or rumbling sounds from the unit',
        'Water heater over 10 years old and inefficient',
      ],
      priceRange: '$200–$1,800 (repair vs. replace)',
      seasonalRelevance: ['fall', 'winter'],
    },
    {
      name: 'Sewer Line Repair',
      slug: 'sewer-line-repair',
      shortDescription:
        'Video camera inspection, trenchless sewer repair, and full sewer line replacement for San Diego homes and commercial properties.',
      icon: 'git-commit-horizontal',
      isEmergency: true,
      problems: [
        'Sewage smell in yard or home',
        'Soggy patches in the lawn over the sewer line',
        'Multiple drains backing up simultaneously',
        'Tree root intrusion into sewer pipes',
        'Old clay or cast iron pipes needing replacement',
      ],
      priceRange: '$350–$8,500+ (scope-dependent)',
      seasonalRelevance: ['all'],
    },
    {
      name: 'Leak Detection',
      slug: 'leak-detection',
      shortDescription:
        'Non-invasive electronic leak detection for hidden slab leaks, pipe leaks behind walls, and underground leaks — precise location, minimal damage.',
      icon: 'search',
      isEmergency: false,
      problems: [
        'High water bill with no obvious cause',
        'Warm spots on the floor (possible slab leak)',
        'Sound of running water when all fixtures are off',
        'Damp or discolored walls or ceilings',
        'Mold or mildew smell without visible source',
      ],
      priceRange: '$250–$500 (detection); repair quoted separately',
      seasonalRelevance: ['all'],
    },
  ],

  // ─── SERVICE AREAS ────────────────────────────────────────────────────────
  serviceAreas: [
    { name: 'San Diego',      slug: 'san-diego',      type: 'city',   state: 'CA', isPrimary: true,  coordinates: { latitude: 32.7157, longitude: -117.1611 } },
    { name: 'Chula Vista',    slug: 'chula-vista',    type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 32.6401, longitude: -117.0842 } },
    { name: 'El Cajon',       slug: 'el-cajon',       type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 32.7948, longitude: -116.9625 } },
    { name: 'La Mesa',        slug: 'la-mesa',        type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 32.7678, longitude: -117.0228 } },
    { name: 'Santee',         slug: 'santee',         type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 32.8384, longitude: -116.9739 } },
    { name: 'Spring Valley',  slug: 'spring-valley',  type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 32.7448, longitude: -116.9989 } },
    { name: 'San Diego County', slug: 'san-diego-county', type: 'county', state: 'CA', isPrimary: false },
  ],

  // ─── PAGES ────────────────────────────────────────────────────────────────
  pages: [
    {
      title: 'Plumber in San Diego | Smith Plumbing & Drain',  // REPLACE: company name in title
      slug: '/',
      type: 'homepage',
      metaDescription:
        'Licensed San Diego plumber available 24/7. Emergency plumbing, drain cleaning, water heater repair. Upfront pricing. Call Smith Plumbing & Drain today.',
      h1: 'San Diego\'s Trusted Plumber — Available 24/7',
      includeSchema: ['LocalBusiness', 'FAQPage'],
      phase: 'mvp',
      sections: ['Hero', 'TrustStrip', 'Services', 'WhyUs', 'Testimonials', 'ServiceAreas', 'FAQ', 'FinalCTA'],
    },
    {
      title: 'Emergency Plumber San Diego | 24/7 Service | Smith Plumbing',
      slug: 'services/emergency-plumbing',
      type: 'service',
      metaDescription:
        'Emergency plumber in San Diego available 24/7. Burst pipes, flooding, sewage backups. Licensed C-36. Arrives in 60 min. Call Smith Plumbing now.',
      h1: '24/7 Emergency Plumber in San Diego',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Drain Cleaning San Diego | Fast & Affordable | Smith Plumbing',
      slug: 'services/drain-cleaning',
      type: 'service',
      metaDescription:
        'Drain cleaning in San Diego. Clogged kitchen sinks, showers, tubs — cleared same day. Hydro-jetting available. Call Smith Plumbing for fast service.',
      h1: 'Drain Cleaning Services in San Diego',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Water Heater Repair & Replacement San Diego | Smith Plumbing',
      slug: 'services/water-heater',
      type: 'service',
      metaDescription:
        'Water heater repair and replacement in San Diego. Tank and tankless systems. Same-day service. Licensed C-36 plumber. Get a free quote from Smith Plumbing.',
      h1: 'Water Heater Repair & Replacement in San Diego',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Sewer Line Repair San Diego | Trenchless Options | Smith Plumbing',
      slug: 'services/sewer-line-repair',
      type: 'service',
      metaDescription:
        'Sewer line repair in San Diego. Video camera inspection, trenchless repair, full replacement. Licensed C-36. Free estimate. Call Smith Plumbing today.',
      h1: 'Sewer Line Repair & Replacement in San Diego',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Leak Detection San Diego | Slab & Hidden Leaks | Smith Plumbing',
      slug: 'services/leak-detection',
      type: 'service',
      metaDescription:
        'Electronic leak detection in San Diego. Slab leaks, hidden pipe leaks, high water bills. Non-invasive technology. Call Smith Plumbing for fast diagnosis.',
      h1: 'Leak Detection Services in San Diego',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Contact Smith Plumbing San Diego | Free Estimates',
      slug: 'contact',
      type: 'contact',
      metaDescription:
        'Contact Smith Plumbing & Drain in San Diego. Call for 24/7 emergencies or request a free estimate online. We respond within 2 hours.',
      h1: 'Contact Smith Plumbing & Drain',
      includeSchema: ['LocalBusiness'],
      phase: 'mvp',
    },
    {
      title: 'About Smith Plumbing & Drain | San Diego Plumbers Since 2003',
      slug: 'about',
      type: 'about',
      metaDescription:
        'Meet Mike Smith and the team at Smith Plumbing & Drain. Serving San Diego since 2003. Licensed C-36, BBB A+, 300+ five-star reviews.',
      h1: 'About Smith Plumbing & Drain',
      includeSchema: ['LocalBusiness'],
      phase: 'mvp',
    },
    {
      title: 'Plumbing FAQ San Diego | Smith Plumbing & Drain',
      slug: 'faq',
      type: 'faq',
      metaDescription:
        'Common plumbing questions answered by San Diego\'s licensed plumbers. Water heaters, drain clogs, sewer lines, and more. Smith Plumbing & Drain.',
      h1: 'Frequently Asked Plumbing Questions',
      includeSchema: ['FAQPage'],
      phase: 'mvp',
    },
    {
      title: 'Plumber in Chula Vista | Smith Plumbing & Drain',
      slug: 'service-areas/chula-vista',
      type: 'service-area',
      metaDescription:
        'Licensed plumber serving Chula Vista, CA. Emergency plumbing, drain cleaning, water heater repair. Same-day service. Call Smith Plumbing & Drain.',
      h1: 'Plumber in Chula Vista, CA',
      includeSchema: ['LocalBusiness', 'BreadcrumbList'],
      phase: 'phase2',
    },
    {
      title: 'Privacy Policy | Smith Plumbing & Drain',
      slug: 'privacy',
      type: 'privacy',
      metaDescription: 'Privacy policy for Smith Plumbing & Drain. How we collect, use, and protect your personal information.',
      h1: 'Privacy Policy',
      includeSchema: [],
      phase: 'mvp',
    },
    {
      title: 'Thank You | Smith Plumbing & Drain',
      slug: 'thank-you',
      type: 'thank-you',
      metaDescription: 'Thank you for contacting Smith Plumbing & Drain. We\'ll be in touch within 2 hours.',
      h1: 'We Received Your Message',
      includeSchema: [],
      phase: 'mvp',
    },
  ],

  // ─── TRUST SIGNALS ────────────────────────────────────────────────────────
  trustSignals: {
    googleRating: 4.9,              // REPLACE: actual Google rating
    reviewCount: 312,               // REPLACE: actual review count
    reviewSource: 'Google',
    licenseNumber: '1094872',       // REPLACE: actual CSLB license number
    licenseType: 'C-36 Plumbing Contractor',
    licensedBondedInsured: true,
    yearEstablished: 2003,          // REPLACE: actual year
    certifications: [
      { name: 'PHCC Member — Plumbing-Heating-Cooling Contractors Association' },
      { name: 'BBB Accredited Business' },
      { name: 'Angi Super Service Award 2023' },
    ],
    guarantees: [
      '100% Satisfaction Guarantee',
      'Upfront Pricing — No Surprise Fees',
      '1-Year Warranty on All Labor',
      'Background-Checked Technicians',
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
        name: 'Jennifer M.',
        location: 'San Diego, CA',
        rating: 5,
        text: 'Called Smith Plumbing at 1am for a burst pipe under our kitchen sink. Mike had a tech at our house within 45 minutes. The repair was done by 3am and the price was exactly what they quoted over the phone. Can\'t say enough good things about how professional they were in a stressful situation.',
        service: 'Emergency Plumbing',
        date: 'January 2024',
        source: 'Google',
      },
      {
        name: 'Robert T.',
        location: 'La Mesa, CA',
        rating: 5,
        text: 'Had a slow drain in our master bathroom that two other plumbers couldn\'t fully clear. Smith Plumbing sent out Carlos with a hydro-jet and the drain has been perfect for 6 months now. Fair price, showed up on time, and explained everything he was doing. Highly recommend.',
        service: 'Drain Cleaning',
        date: 'September 2023',
        source: 'Google',
      },
      {
        name: 'Patricia L.',
        location: 'Chula Vista, CA',
        rating: 5,
        text: 'Our water heater died on a Friday afternoon. Smith Plumbing came out same day, diagnosed it as beyond repair, and had a new 50-gallon tank installed by Saturday morning. The price was fair and the crew was respectful of our home. We\'ll use them for all our plumbing needs going forward.',
        service: 'Water Heater Replacement',
        date: 'November 2023',
        source: 'Google',
      },
    ],
  },

  // ─── CONTACT ──────────────────────────────────────────────────────────────
  contact: {
    phone: '(619) 555-0148',                // REPLACE: actual phone number
    phoneFormatted: '+16195550148',          // REPLACE: E.164 phone for tel: links
    email: 'service@smithplumbing.com',      // REPLACE: actual email
    emergencyPhone: '(619) 555-0148',        // REPLACE: emergency line (same or different)
    address: {
      street: '4821 Mission Gorge Pl',
      city: 'San Diego',
      state: 'CA',
      zip: '92120',
      country: 'United States',
    },
    responseTimePromise: 'We respond to all inquiries within 2 hours during business hours.',
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
        placeholder: '(619) 555-0100',
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
        label: 'What do you need help with?',
        type: 'select',
        required: true,
        options: [
          'Emergency Plumbing',
          'Drain Cleaning',
          'Water Heater Repair / Replacement',
          'Sewer Line Repair',
          'Leak Detection',
          'Other / Not Sure',
        ],
      },
      {
        name: 'message',
        label: 'Describe the Problem',
        type: 'textarea',
        required: false,
        placeholder: 'E.g. Kitchen sink completely clogged, tried Drano — didn\'t work.',
        validation: { maxLength: 1000 },
      },
      {
        name: 'honeypot',
        label: 'Leave this blank',
        type: 'hidden',
        required: false,
      },
    ],
    formSuccessMessage: 'Thank you! We\'ll call you back within 2 hours. For emergencies, please call us directly at (619) 555-0148.',
    formErrorMessage: 'Something went wrong. Please call us directly at (619) 555-0148 — we\'re available 24/7.',
    showMap: true,
  },

  // ─── BRANDING ─────────────────────────────────────────────────────────────
  branding: {
    colors: {
      primary:       '#1B4F8A',   // Deep navy blue — trust, reliability
      secondary:     '#2D6FBB',   // Medium blue — secondary UI
      accent:        '#F97316',   // Orange — CTAs, urgency, emergency
      background:    '#FFFFFF',
      backgroundAlt: '#F0F4F8',   // Light blue-gray for alternate sections
      text:          '#1A202C',
      textMuted:     '#64748B',
    },
    fonts: {
      heading: 'Raleway',         // Strong, trustworthy heading font
      body:    'Source Sans 3',   // Highly readable body font
    },
    logo: {
      path:    '/images/logo.svg',  // REPLACE: actual logo path
      altText: 'Smith Plumbing & Drain — San Diego Licensed Plumber',
      width:   220,
      height:  60,
    },
    imagery: {
      style:            'professional',
      hasTeamPhotos:    false,         // REPLACE: true if client provides team photos
      hasProjectPhotos: false,         // REPLACE: true if client provides job photos
      hasVehiclePhotos: false,         // REPLACE: true if client provides van/truck photos
      stockPhotoFallback: 'professional plumber repairing pipes under kitchen sink San Diego',
    },
  },

  // ─── STACK ────────────────────────────────────────────────────────────────
  stack: {
    platform: 'nextjs',
    nextjs: {
      version:              '14.2.0',
      router:               'app',
      rendering:            'SSG',
      packageManager:       'npm',
      database:             'supabase',
      deployment:           'vercel',
      styling:              'tailwind',
      componentLibrary:     'shadcn',
    },
    domain: 'smithplumbingsd.com',    // REPLACE: actual domain
    email: {
      provider:            'resend',
      notificationService: 'email',
    },
  },

  // ─── INTEGRATIONS ─────────────────────────────────────────────────────────
  integrations: {
    analytics: {
      ga4:               true,
      ga4MeasurementId:  'G-XXXXXXXXXX',  // REPLACE: actual GA4 measurement ID
      googleTagManager:  false,
      searchConsole:     true,
    },
    maps: {
      provider:           'google',
      embedOnContact:     true,
      embedOnServiceAreas: false,
    },
    reviews: {
      source: 'manual',  // Upgrade to 'google-api' in phase2
    },
    booking: {
      provider:       'none',
      embedLocation:  'none',
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
    financingPage:      false,
    careersPage:        false,
    videoTestimonials:  false,
    caseStudies:        false,
    stickyMobileCTA:    true,    // Critical for emergency trade
    floatingPhoneButton: false,  // Using sticky bar instead
    emergencyBanner:    true,    // 24/7 availability banner — high value for plumbers
    seasonalHero:       false,
    cookieConsent:      true,    // Required — CCPA California
    recaptcha:          false,   // Using honeypot instead
    darkMode:           false,
    multiLanguage:      false,
    honeypotField:      true,
    rateLimiting:       true,
  },
};
