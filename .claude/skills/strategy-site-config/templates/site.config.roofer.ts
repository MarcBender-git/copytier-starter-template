/**
 * site.config.roofer.ts — Niche Template: Roofing Contractor
 * Copytier Website Builder — Pack 1 Template
 *
 * USAGE: Copy this file to the client repo as src/site.config.ts
 * Replace all values marked // REPLACE: with real client data from the Build Brief.
 *
 * Niche: roofer | Schema: RoofingContractor | License: C-39
 * Primary persona: researcher | Color: Dark slate / orange palette
 * Special flags: financingPage=true, high-ticket project emphasis
 */

import type { SiteConfig } from '../references/site-config-interface';

export const siteConfig: SiteConfig = {

  niche: 'roofer',
  schemaType: 'RoofingContractor',
  currentPhase: 'mvp',

  business: {
    name: 'Summit Roofing Co.',                               // REPLACE
    legalName: 'Summit Roofing Company Inc.',                 // REPLACE
    tagline: 'Orange County Roofing — Quality Built to Last', // REPLACE
    description:
      'Summit Roofing Co. has protected Orange County homes and commercial ' +
      'buildings since 2001. We specialize in roof repair, full roof replacement, ' +
      'roof inspections, and storm damage restoration — with C-39 licensing, ' +
      'comprehensive warranties, and financing available for full replacements.',
    ownerName: 'Robert Nguyen',    // REPLACE
    yearEstablished: 2001,         // REPLACE
    employeeCount: '11–20',
    address: {
      street: '1450 N Kraemer Blvd', // REPLACE
      city: 'Anaheim',               // REPLACE
      state: 'CA',
      zip: '92806',                  // REPLACE
      country: 'United States',
    },
    geo: {
      latitude: 33.8674,    // REPLACE
      longitude: -117.8126, // REPLACE
    },
    hours: {
      regular: 'Mon–Fri 7am–6pm, Sat 8am–3pm',
      emergency: 'Storm Emergency Response 24/7',
      timezone: 'America/Los_Angeles',
      openingHoursSpec: [
        { dayOfWeek: 'https://schema.org/Monday',    opens: '07:00', closes: '18:00' },
        { dayOfWeek: 'https://schema.org/Tuesday',   opens: '07:00', closes: '18:00' },
        { dayOfWeek: 'https://schema.org/Wednesday', opens: '07:00', closes: '18:00' },
        { dayOfWeek: 'https://schema.org/Thursday',  opens: '07:00', closes: '18:00' },
        { dayOfWeek: 'https://schema.org/Friday',    opens: '07:00', closes: '18:00' },
        { dayOfWeek: 'https://schema.org/Saturday',  opens: '08:00', closes: '15:00' },
      ],
    },
    social: {
      googleBusinessProfile: 'https://g.page/summit-roofing-anaheim', // REPLACE
      facebook:  'https://facebook.com/summitroofingorangecounty',     // REPLACE
      yelp:      'https://yelp.com/biz/summit-roofing-anaheim',        // REPLACE
      nextdoor:  'https://nextdoor.com/pages/summit-roofing-co',       // REPLACE
      instagram: 'https://instagram.com/summitroofingorangecounty',    // REPLACE
      youtube:   'https://youtube.com/@summitroofingorangecounty',     // REPLACE
    },
  },

  valueProposition: {
    headline: 'Orange County Roofing Done Right.',      // REPLACE
    subheadline:
      'C-39 licensed roofers with 23 years serving Orange County — ' +
      'free inspections, lifetime workmanship warranty, and financing available for full replacements.',
    primaryCTA: {
      text: 'Get a Free Roof Inspection',
      href: '/contact',
      variant: 'primary',
      icon: 'search',
    },
    secondaryCTA: {
      text: 'Call Us Now',
      href: 'tel:+17145550489',   // REPLACE
      variant: 'outline',
      icon: 'phone',
    },
  },

  personas: {
    primary: 'researcher',
    secondary: 'emergency',
    nicheExtensions: ['insurance-claimant', 'home-seller', 'hoa-rep', 'property-manager'],
  },

  userJourneys: {
    primary: {
      persona: 'researcher',
      steps: [
        {
          action: 'Searches "roof replacement cost Orange County" after noticing leaks or 20-year-old shingles',
          need: 'Understand realistic cost range before calling anyone',
          siteResponse: 'Roof replacement page with honest cost range ($8K–$22K) and what factors affect price',
        },
        {
          action: 'Wants to verify the company is reputable before inviting them onto the roof',
          need: 'Strong social proof, license verification, photos of real work',
          siteResponse: 'Trust section: C-39 #, 23 years, 500+ reviews, gallery of completed roofs, warranties',
        },
        {
          action: 'Compares 3 roofing companies — concerned about bait-and-switch pricing',
          need: 'Transparency about the estimate process and what\'s included',
          siteResponse: 'FAQ: "What does your free estimate include?" + "What warranties do you offer?"',
        },
        {
          action: 'Schedules a free inspection/estimate',
          need: 'Low-commitment first step — just an assessment, not a commitment',
          siteResponse: 'CTA: "Free Roof Inspection — No Obligation" with calendar booking option',
        },
      ],
    },
    secondary: {
      persona: 'emergency',
      steps: [
        {
          action: 'Searches "emergency roof repair storm damage" after heavy rain causes active leak',
          need: 'Fast response, emergency tarping, stop the water immediately',
          siteResponse: 'Emergency banner: "Storm Damage? We Offer Emergency Tarping & Repairs"',
        },
        {
          action: 'Needs to know if insurance will cover the damage',
          need: 'Guidance on insurance claim process for storm damage',
          siteResponse: 'Storm damage page explains: we document damage, work with your adjuster',
        },
        {
          action: 'Calls for emergency tarping',
          need: 'Someone who answers and can dispatch TODAY',
          siteResponse: 'Sticky mobile CTA + prominent phone number + "storm response team" language',
        },
      ],
    },
  },

  successMetrics: {
    conversionRateTarget: 3.5,
    monthlyOrganicSessionsTarget: 1500,
    lcpTargetMs: 2000,
    ttfbTargetMs: 400,
    targetReviewRating: 4.8,
    targetReviewCount: 500,
    primaryConversionEvents: ['form_submit', 'phone_call_click', 'inspection_request'],
    businessKPIs: [
      'Cost per acquired lead < $75',
      'Estimate-to-close rate > 45%',
      'Average replacement ticket > $14,000',
      'Insurance claim assist rate > 25% of jobs',
    ],
  },

  featurePriority: {
    mustHave: [
      'Homepage with trust-first hero and free inspection CTA',
      'Service pages for all 4 core services',
      'Financing page (replacements are $10K–$20K)',
      'Contact / inspection request page',
      'Gallery of completed roofing projects',
      'Trust signals: C-39 license, years, warranty',
      'Storm damage and insurance claim guidance',
      'Cookie consent (CCPA)',
      'FAQ page',
      'Privacy and terms pages',
    ],
    shouldHave: [
      'Service area pages for top 6 OC cities',
      'About page with crew and equipment photos',
      'Google Reviews widget',
      'Before/after photo gallery by project type',
    ],
    couldHave: [
      'Roofing material comparison page (shingle types)',
      'Blog: roofing maintenance tips',
      'Video testimonials',
      'Solar-ready roof info page',
    ],
    wontHave: [
      'Live online pricing calculator (too variable)',
      'E-commerce / materials store',
      'Live chat',
    ],
  },

  services: [
    {
      name: 'Roof Repair',
      slug: 'roof-repair',
      shortDescription:
        'Fast, lasting roof repairs for leaks, missing shingles, damaged flashing, and storm damage. Same-week appointments with a 2-year repair warranty.',
      icon: 'hammer',
      isEmergency: true,
      problems: [
        'Active roof leak causing water damage inside',
        'Missing or damaged shingles after wind or rain',
        'Flashing failure around chimney, vents, or skylights',
        'Roof is leaking but can\'t afford full replacement yet',
        'Small section of damage from branch or debris impact',
      ],
      priceRange: '$350–$2,500',
      seasonalRelevance: ['fall', 'winter', 'spring'],
    },
    {
      name: 'Roof Replacement',
      slug: 'roof-replacement',
      shortDescription:
        'Complete roof replacement with premium materials — asphalt shingles, tile, and flat roofing systems. Lifetime workmanship warranty and 0% financing available.',
      icon: 'home',
      isEmergency: false,
      problems: [
        'Roof over 20 years old with frequent leaks',
        'Widespread granule loss or blistering shingles',
        'Multiple repairs in the past 3 years',
        'Selling the home and roof is flagged by inspector',
        'Upgrading to tile or premium materials for resale value',
      ],
      priceRange: '$8,500–$22,000+ (size & material dependent)',
      seasonalRelevance: ['spring', 'summer', 'fall'],
    },
    {
      name: 'Roof Inspection',
      slug: 'roof-inspection',
      shortDescription:
        'Thorough roof inspection with photo documentation — for home purchases, insurance renewals, pre-listing inspections, and post-storm assessments.',
      icon: 'search',
      isEmergency: false,
      problems: [
        'Buying a home and need an independent roof assessment',
        'Insurance company requiring a roof certification',
        'Selling the home and want to know the roof condition',
        'After a major storm — want to know if damage occurred',
        'Peace of mind check on a roof over 15 years old',
      ],
      priceRange: 'Free with repair/replacement estimate; $175 standalone',
      seasonalRelevance: ['all'],
    },
    {
      name: 'Storm Damage & Insurance Claims',
      slug: 'storm-damage',
      shortDescription:
        'Emergency tarping, full storm damage documentation, and insurance claim assistance for Orange County homeowners after wind, rain, or hail damage.',
      icon: 'cloud-lightning',
      isEmergency: true,
      problems: [
        'Storm caused active roof leak requiring immediate tarping',
        'Wind removed shingles or damaged ridge cap',
        'Unsure if roof damage qualifies for insurance claim',
        'Insurance adjuster coming and need documentation prepared',
        'Previous claim denied — need second opinion and advocate',
      ],
      priceRange: 'Emergency tarping: $350–$800; Full restoration: insurance-dependent',
      seasonalRelevance: ['fall', 'winter'],
    },
  ],

  serviceAreas: [
    { name: 'Anaheim',          slug: 'anaheim',           type: 'city',   state: 'CA', isPrimary: true,  coordinates: { latitude: 33.8366, longitude: -117.9143 } },
    { name: 'Santa Ana',        slug: 'santa-ana',         type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 33.7455, longitude: -117.8677 } },
    { name: 'Irvine',           slug: 'irvine',            type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 33.6846, longitude: -117.8265 } },
    { name: 'Fullerton',        slug: 'fullerton',         type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 33.8703, longitude: -117.9253 } },
    { name: 'Garden Grove',     slug: 'garden-grove',      type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 33.7743, longitude: -117.9378 } },
    { name: 'Huntington Beach', slug: 'huntington-beach',  type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 33.6603, longitude: -117.9992 } },
    { name: 'Orange County',    slug: 'orange-county',     type: 'county', state: 'CA', isPrimary: false },
  ],

  pages: [
    {
      title: 'Roofing Contractor Orange County | Summit Roofing Co.',    // REPLACE
      slug: '/',
      type: 'homepage',
      metaDescription:
        'Orange County roofing contractor. Roof repair, replacement, inspection, storm damage. C-39 licensed. Free inspections. Financing available. Call Summit Roofing Co.',
      h1: 'Orange County Roofing Contractor — 23 Years of Quality Work',
      includeSchema: ['LocalBusiness', 'FAQPage'],
      phase: 'mvp',
      sections: ['Hero', 'TrustStrip', 'Services', 'WhyUs', 'Gallery', 'Testimonials', 'Financing', 'ServiceAreas', 'FAQ', 'FinalCTA'],
    },
    {
      title: 'Roof Repair Orange County | Summit Roofing Co.',
      slug: 'services/roof-repair',
      type: 'service',
      metaDescription:
        'Roof repair in Orange County. Leaks, missing shingles, flashing damage. Same-week appointments. 2-year warranty. C-39 licensed. Call Summit Roofing Co.',
      h1: 'Roof Repair in Orange County',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Roof Replacement Orange County | Financing Available | Summit Roofing',
      slug: 'services/roof-replacement',
      type: 'service',
      metaDescription:
        'Roof replacement in Orange County. Asphalt, tile, and flat roofing. Lifetime workmanship warranty. 0% financing. Free estimate. Licensed C-39 contractor.',
      h1: 'Roof Replacement in Orange County — Financing Available',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Roof Inspection Orange County | Free with Estimate | Summit Roofing',
      slug: 'services/roof-inspection',
      type: 'service',
      metaDescription:
        'Roof inspection in Orange County. Free with repair or replacement estimate. Standalone inspections for home buyers and sellers. Call Summit Roofing Co.',
      h1: 'Roof Inspection in Orange County',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Storm Damage Roofing Orange County | Insurance Claims | Summit Roofing',
      slug: 'services/storm-damage',
      type: 'service',
      metaDescription:
        'Storm damage roof repair in Orange County. Emergency tarping, damage documentation, insurance claim assistance. C-39 licensed. Call Summit Roofing today.',
      h1: 'Storm Damage Roofing & Insurance Claims in Orange County',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Roofing Financing Orange County | 0% Options | Summit Roofing Co.',
      slug: 'financing',
      type: 'financing',
      metaDescription:
        'Roofing financing in Orange County. 0% interest options for roof replacements. Apply in minutes. No money down available. Summit Roofing Co.',
      h1: 'Roofing Financing — Make a New Roof Affordable',
      includeSchema: ['FAQPage'],
      phase: 'mvp',
    },
    {
      title: 'Contact Summit Roofing Co. | Free Roof Inspections',
      slug: 'contact',
      type: 'contact',
      metaDescription:
        'Contact Summit Roofing Co. in Anaheim, CA. Free roof inspections and estimates. Storm emergency response. C-39 licensed. Call or request online.',
      h1: 'Contact Summit Roofing Co.',
      includeSchema: ['LocalBusiness'],
      phase: 'mvp',
    },
    {
      title: 'About Summit Roofing Co. | Orange County Roofers Since 2001',
      slug: 'about',
      type: 'about',
      metaDescription:
        'Summit Roofing Co. — Orange County\'s trusted roofing contractor since 2001. C-39 licensed, 500+ reviews, lifetime workmanship warranty.',
      h1: 'About Summit Roofing Co.',
      includeSchema: ['LocalBusiness'],
      phase: 'mvp',
    },
    {
      title: 'Roofing FAQ Orange County | Summit Roofing Co.',
      slug: 'faq',
      type: 'faq',
      metaDescription:
        'Roofing FAQ for Orange County homeowners. Replacement cost, material options, insurance claims, warranty coverage. Summit Roofing Co.',
      h1: 'Roofing FAQ — Orange County Homeowners\' Questions Answered',
      includeSchema: ['FAQPage'],
      phase: 'mvp',
    },
    {
      title: 'Roof Gallery | Before & After Projects | Summit Roofing Co.',
      slug: 'gallery',
      type: 'gallery',
      metaDescription:
        'View before and after photos of roofing projects by Summit Roofing Co. in Orange County. Shingle, tile, and flat roof replacements and repairs.',
      h1: 'Roofing Project Gallery',
      includeSchema: [],
      phase: 'mvp',
    },
    {
      title: 'Roofer in Irvine CA | Summit Roofing Co.',
      slug: 'service-areas/irvine',
      type: 'service-area',
      metaDescription:
        'Roofing contractor serving Irvine, CA. Roof repair, replacement, inspection. C-39 licensed. Free estimates. Call Summit Roofing Co. today.',
      h1: 'Roofing Contractor in Irvine, CA',
      includeSchema: ['LocalBusiness', 'BreadcrumbList'],
      phase: 'phase2',
    },
    {
      title: 'Privacy Policy | Summit Roofing Co.',
      slug: 'privacy',
      type: 'privacy',
      metaDescription: 'Privacy policy for Summit Roofing Co.',
      h1: 'Privacy Policy',
      includeSchema: [],
      phase: 'mvp',
    },
    {
      title: 'Thank You | Summit Roofing Co.',
      slug: 'thank-you',
      type: 'thank-you',
      metaDescription: 'Thank you for contacting Summit Roofing Co. We\'ll be in touch shortly.',
      h1: 'We Received Your Request',
      includeSchema: [],
      phase: 'mvp',
    },
  ],

  trustSignals: {
    googleRating: 4.8,              // REPLACE
    reviewCount: 521,               // REPLACE
    reviewSource: 'Google',
    licenseNumber: '1018934',       // REPLACE: CSLB C-39 license number
    licenseType: 'C-39 Roofing Contractor',
    licensedBondedInsured: true,
    yearEstablished: 2001,
    certifications: [
      { name: 'GAF Master Elite® Roofing Contractor' },
      { name: 'Owens Corning Preferred Contractor' },
      { name: 'BBB Accredited Business — A+ Rating' },
      { name: 'RCAW Member — Roofing Contractors Association of California' },
    ],
    guarantees: [
      'Lifetime Workmanship Warranty',
      '100% Satisfaction Guarantee',
      'Free Roof Inspection — No Obligation',
      'We Work With All Major Insurance Companies',
      'Written Quote Before Any Work Begins',
    ],
    bbbAccredited: true,
    bbbRating: 'A+',
  },

  testimonials: {
    source: 'manual',
    displayCount: 3,
    manual: [
      {
        name: 'Dale F.',
        location: 'Anaheim, CA',
        rating: 5,
        text: 'Summit Roofing replaced our entire roof after the El Niño rains caused multiple leaks. Robert\'s team was professional from the free inspection through project completion. They worked directly with my insurance adjuster, documented everything, and the new roof was done in two days. Couldn\'t be more impressed.',
        service: 'Roof Replacement',
        date: 'February 2024',
        source: 'Google',
      },
      {
        name: 'Cindy P.',
        location: 'Irvine, CA',
        rating: 5,
        text: 'I called three roofers for a leak repair. Summit was the only one who got on the roof to assess it before quoting — the other two quoted sight-unseen. They found bad flashing around the chimney that the others missed. $600 repair and no leaks since. Honest, thorough, and fairly priced.',
        service: 'Roof Repair',
        date: 'November 2023',
        source: 'Google',
      },
      {
        name: 'The Hernandez Family',
        location: 'Fullerton, CA',
        rating: 5,
        text: 'Summit gave us a thorough inspection before we bought our home. They found issues the general home inspector missed and gave us a detailed written report that we used to negotiate $8,000 off the purchase price. When we finally needed the roof replaced two years later, we went straight back to Summit.',
        service: 'Roof Inspection',
        date: 'June 2023',
        source: 'Google',
      },
    ],
  },

  contact: {
    phone: '(714) 555-0489',               // REPLACE
    phoneFormatted: '+17145550489',         // REPLACE
    email: 'info@summitroofingorangecounty.com', // REPLACE
    emergencyPhone: '(714) 555-0489',
    address: {
      street: '1450 N Kraemer Blvd',
      city: 'Anaheim',
      state: 'CA',
      zip: '92806',
      country: 'United States',
    },
    responseTimePromise: 'We respond to all inspection requests within 4 hours and schedule within 48 hours.',
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
        placeholder: '(714) 555-0100',
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
          'Emergency — Active Leak or Storm Damage',
          'Roof Repair',
          'Roof Replacement / Full Estimate',
          'Roof Inspection (Pre-Purchase / Insurance)',
          'Storm Damage & Insurance Claim Help',
          'Other / Not Sure',
        ],
      },
      {
        name: 'address',
        label: 'Property Address',
        type: 'text',
        required: false,
        placeholder: '123 Oak Street, Anaheim, CA 92806',
      },
      {
        name: 'message',
        label: 'Additional Details',
        type: 'textarea',
        required: false,
        placeholder: 'E.g. 2,400 sq ft home, 20-year-old shingles, leak above master bedroom.',
        validation: { maxLength: 1000 },
      },
      {
        name: 'honeypot',
        label: 'Leave this blank',
        type: 'hidden',
        required: false,
      },
    ],
    formSuccessMessage: 'Thank you! We\'ll call you within 4 hours to schedule your free roof inspection. For emergencies, call (714) 555-0489 directly.',
    formErrorMessage: 'Something went wrong. Please call (714) 555-0489 or email us — we\'re here Mon–Sat.',
    showMap: true,
  },

  branding: {
    colors: {
      primary:       '#1F2937',   // Dark slate — serious, established, high-quality
      secondary:     '#374151',   // Medium slate
      accent:        '#EA580C',   // Burnt orange — warmth, California, urgency
      background:    '#FFFFFF',
      backgroundAlt: '#F9FAFB',   // Light gray for alternate sections
      text:          '#111827',
      textMuted:     '#6B7280',
    },
    fonts: {
      heading: 'Montserrat',    // Professional and strong — premium contractor feel
      body:    'Open Sans',     // Clean, highly readable
    },
    logo: {
      path:    '/images/logo.svg', // REPLACE
      altText: 'Summit Roofing Co. — Orange County Roofing Contractor',
      width:   200,
      height:  56,
    },
    imagery: {
      style:            'professional',
      hasTeamPhotos:    false, // REPLACE
      hasProjectPhotos: false, // REPLACE — gallery is key for roofers, prioritize getting these
      hasVehiclePhotos: false, // REPLACE
      stockPhotoFallback: 'roofing crew installing asphalt shingles orange county california home',
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
    domain: 'summitroofingorangecounty.com', // REPLACE
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
    galleryPage:        true,    // Critical for roofers — visual proof of work quality
    financingPage:      true,    // High-ticket trade — financing page is a significant conversion lever
    careersPage:        false,
    videoTestimonials:  false,
    caseStudies:        false,
    stickyMobileCTA:    true,
    floatingPhoneButton: false,
    emergencyBanner:    true,    // Storm season emergencies
    seasonalHero:       false,
    cookieConsent:      true,
    recaptcha:          false,
    darkMode:           false,
    multiLanguage:      false,
    honeypotField:      true,
    rateLimiting:       true,
  },
};
