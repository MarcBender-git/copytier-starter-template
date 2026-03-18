/**
 * site.config.landscaper.ts — Niche Template: Landscaping Contractor
 * Copytier Website Builder — Pack 1 Template
 *
 * USAGE: Copy this file to the client repo as src/site.config.ts
 * Replace all values marked // REPLACE: with real client data from the Build Brief.
 *
 * Niche: landscaper | Schema: LandscapingService | License: C-27
 * Primary persona: researcher | Color: Green palette
 * Special flags: galleryPage=true, seasonalHero=true, gallery emphasis
 */

import type { SiteConfig } from '../references/site-config-interface';

export const siteConfig: SiteConfig = {

  // ─── IDENTITY ──────────────────────────────────────────────────────────────
  niche: 'landscaper',
  schemaType: 'LandscapingService',
  currentPhase: 'mvp',

  business: {
    name: 'Verde Vista Landscaping',                          // REPLACE: client business name
    legalName: 'Verde Vista Landscaping Inc.',               // REPLACE: legal entity name
    tagline: 'Fresno Landscaping — Designed to Impress',     // REPLACE: tagline
    description:
      'Verde Vista Landscaping has transformed Fresno-area outdoor spaces since 2011. ' +
      'We specialize in landscape design and installation, ongoing lawn maintenance, ' +
      'hardscaping, irrigation systems, and tree service — with a C-27 licensed team ' +
      'that brings creativity, craftsmanship, and water-smart practices to every project.',
    ownerName: 'Carlos Mendez',                              // REPLACE: owner name
    yearEstablished: 2011,                                   // REPLACE: year established
    employeeCount: '11–20',
    address: {
      street: '2890 N Palm Ave',                            // REPLACE: street address
      city: 'Fresno',                                       // REPLACE: city
      state: 'CA',
      zip: '93704',                                         // REPLACE: zip code
      country: 'United States',
    },
    geo: {
      latitude: 36.7468,                                    // REPLACE: GPS latitude
      longitude: -119.7726,                                 // REPLACE: GPS longitude
    },
    hours: {
      regular: 'Mon–Sat 7am–5pm',
      emergency: 'Emergency tree removal available — call for after-hours response',
      timezone: 'America/Los_Angeles',
      openingHoursSpec: [
        { dayOfWeek: 'https://schema.org/Monday',    opens: '07:00', closes: '17:00' },
        { dayOfWeek: 'https://schema.org/Tuesday',   opens: '07:00', closes: '17:00' },
        { dayOfWeek: 'https://schema.org/Wednesday', opens: '07:00', closes: '17:00' },
        { dayOfWeek: 'https://schema.org/Thursday',  opens: '07:00', closes: '17:00' },
        { dayOfWeek: 'https://schema.org/Friday',    opens: '07:00', closes: '17:00' },
        { dayOfWeek: 'https://schema.org/Saturday',  opens: '07:00', closes: '14:00' },
      ],
    },
    social: {
      googleBusinessProfile: 'https://g.page/verde-vista-landscaping-fresno', // REPLACE: GBP URL
      facebook:  'https://facebook.com/verdevistafresno',                      // REPLACE
      yelp:      'https://yelp.com/biz/verde-vista-landscaping-fresno',       // REPLACE
      nextdoor:  'https://nextdoor.com/pages/verde-vista-landscaping',        // REPLACE
      instagram: 'https://instagram.com/verdevistafresno',                    // REPLACE
    },
  },

  // ─── VALUE PROPOSITION ────────────────────────────────────────────────────
  valueProposition: {
    headline: 'Fresno Landscaping That Transforms Outdoors.',  // REPLACE: headline (max 8 words)
    subheadline:
      'C-27 licensed landscape designers serving the Fresno area — design-build projects, ' +
      'weekly maintenance, hardscaping, and water-smart irrigation. Free design consultation.',
    primaryCTA: {
      text: 'Get a Free Consultation',
      href: '/contact',
      variant: 'primary',
      icon: 'calendar',
    },
    secondaryCTA: {
      text: 'View Our Work',
      href: '/gallery',
      variant: 'outline',
      icon: 'image',
    },
  },

  // ─── PERSONAS ─────────────────────────────────────────────────────────────
  personas: {
    primary: 'researcher',
    secondary: 'price-comparison',
    nicheExtensions: ['new-homeowner', 'hoa-rep', 'property-manager', 'commercial-property'],
  },

  // ─── USER JOURNEYS ────────────────────────────────────────────────────────
  userJourneys: {
    primary: {
      persona: 'researcher',
      steps: [
        {
          action: 'Searches "landscaping company Fresno" or "landscape design Fresno CA" while planning a backyard project',
          need: 'See the quality of work before calling — portfolios, before/after, real projects',
          siteResponse: 'Hero with gallery preview + "View Our Work" CTA prominently placed above fold',
        },
        {
          action: 'Browses gallery and service pages to understand what\'s possible',
          need: 'Inspiration and scope clarity — what does a full landscape install cost and include?',
          siteResponse: 'Gallery organized by project type with price ranges on service pages',
        },
        {
          action: 'Verifies credentials — C-27 license, years in business, insurance, reviews',
          need: 'Confidence this contractor won\'t disappear mid-project or do inferior work',
          siteResponse: 'Trust strip: C-27 #, Since 2011, 4.9★ Google, CLCA Member, Licensed & Insured',
        },
        {
          action: 'Requests a free design consultation',
          need: 'Low-commitment first step — vision meeting, not a commitment to spend $10K',
          siteResponse: 'Contact form with "Free Consultation" framing + response time promise',
        },
      ],
    },
    secondary: {
      persona: 'price-comparison',
      steps: [
        {
          action: 'Searching for lawn maintenance quotes — already has 1–2 other bids',
          need: 'Transparent pricing and what\'s included in the monthly service',
          siteResponse: 'Lawn maintenance page with clear pricing tiers and included services list',
        },
        {
          action: 'Evaluates value: why pay more than the guy on Craigslist?',
          need: 'Differentiation — licensed, insured, consistent crew, proper equipment',
          siteResponse: 'Why Us section emphasizing license, consistent assigned crew, and 1-year plant guarantee',
        },
        {
          action: 'Checks reviews for reliability and quality',
          need: 'Independent validation from real customers',
          siteResponse: 'Testimonials section with Google review excerpts and link to full profile',
        },
        {
          action: 'Contacts for a quote',
          need: 'Easy form with relevant context fields (property size, service type)',
          siteResponse: 'Contact form includes property type and service needed for accurate quoting',
        },
      ],
    },
  },

  // ─── SUCCESS METRICS ──────────────────────────────────────────────────────
  successMetrics: {
    conversionRateTarget: 3.5,
    monthlyOrganicSessionsTarget: 1200,
    lcpTargetMs: 2000,
    ttfbTargetMs: 400,
    targetReviewRating: 4.9,
    targetReviewCount: 350,
    primaryConversionEvents: ['form_submit', 'phone_call_click', 'gallery_engagement'],
    businessKPIs: [
      'Cost per acquired lead < $65',
      'Design consultation close rate > 40%',
      'Average design-build project value > $5,000',
      'Maintenance contract retention rate > 85%',
    ],
  },

  // ─── MOSCOW PRIORITY ──────────────────────────────────────────────────────
  featurePriority: {
    mustHave: [
      'Homepage with gallery preview and consultation CTA',
      'Service pages for all 5 core services',
      'Project gallery (critical visual proof for this trade)',
      'Contact / free consultation request page',
      'Trust signals: C-27 license, plant guarantee, certifications',
      'Cookie consent (CCPA)',
      'FAQ page',
      'Privacy and terms pages',
    ],
    shouldHave: [
      'Service area pages for top 5 cities',
      'About page with owner bio and crew photos',
      'Google Reviews widget',
      'Seasonal maintenance checklist content',
    ],
    couldHave: [
      'Blog: landscaping tips and plant guides',
      'Project portfolio with detailed case studies',
      'Seasonal promotion landing pages',
      'Spanish language support',
    ],
    wontHave: [
      'E-commerce / plant store',
      'Live chat',
      'Online scheduling portal',
      'DIY calculators',
    ],
  },

  // ─── SERVICES ─────────────────────────────────────────────────────────────
  services: [
    {
      name: 'Landscape Design & Installation',
      slug: 'landscape-design',
      shortDescription:
        'Full-service landscape design and installation — from concept drawings to completed outdoor living spaces. We handle plants, lighting, drainage, and every detail.',
      icon: 'palette',
      isEmergency: false,
      problems: [
        'Empty or bare yard with no curb appeal or usable space',
        'Outdated landscaping that looks tired and neglected',
        'Preparing to sell — need to maximize curb appeal and value',
        'New construction with raw dirt yard needing complete design',
        'Wanting a cohesive outdoor living space for entertaining',
      ],
      priceRange: '$2,500–$25,000+ (scope-dependent)',
      seasonalRelevance: ['spring', 'fall'],
    },
    {
      name: 'Lawn Maintenance',
      slug: 'lawn-maintenance',
      shortDescription:
        'Weekly and bi-weekly lawn care including mowing, edging, trimming, blowing, and seasonal fertilization — consistent crews, consistent results.',
      icon: 'scissors',
      isEmergency: false,
      problems: [
        'Lawn overgrown or uneven with no time to maintain it',
        'Brown, patchy, or weed-filled grass that won\'t respond to DIY',
        'Rental property or HOA requiring maintained appearance',
        'Too busy or physically unable to do regular yard work',
        'Lawn needs consistent professional care after landscaping project',
      ],
      priceRange: '$120–$350/month',
      seasonalRelevance: ['spring', 'summer', 'fall'],
    },
    {
      name: 'Hardscaping',
      slug: 'hardscaping',
      shortDescription:
        'Patios, walkways, retaining walls, and outdoor living areas built with concrete, pavers, natural stone, and block — designed to last and add home value.',
      icon: 'layers',
      isEmergency: false,
      problems: [
        'No patio or outdoor entertaining area in backyard',
        'Cracked or uneven concrete walkways and driveways',
        'Eroding hillside or slope needing retaining walls',
        'Drainage issues causing flooding or standing water',
        'Wanting to add a fire pit, outdoor kitchen, or seating area',
      ],
      priceRange: '$3,000–$20,000+',
      seasonalRelevance: ['spring', 'summer', 'fall'],
    },
    {
      name: 'Irrigation Systems',
      slug: 'irrigation-systems',
      shortDescription:
        'Water-efficient drip and sprinkler system installation, repair, and seasonal adjustments — designed to keep your landscape healthy while reducing water bills.',
      icon: 'droplets',
      isEmergency: false,
      problems: [
        'High water bill from inefficient or leaking sprinkler system',
        'Dry patches or dead zones despite regular watering',
        'Broken sprinkler heads or valves causing flooding',
        'New landscape installation needs irrigation planning',
        'Converting to water-efficient drip irrigation for drought compliance',
      ],
      priceRange: '$1,500–$6,000 (install); $95–$350 (repair)',
      seasonalRelevance: ['spring', 'summer'],
    },
    {
      name: 'Tree Service',
      slug: 'tree-service',
      shortDescription:
        'Tree trimming, shaping, removal, and stump grinding by ISA-certified arborists — keeping your trees healthy and your property safe.',
      icon: 'tree-pine',
      isEmergency: true,
      problems: [
        'Dead or dying tree posing a safety risk to home or property',
        'Overgrown trees blocking light, views, or damaging structures',
        'Storm damage — fallen or cracked branches needing immediate removal',
        'Tree roots damaging foundation, driveway, or sewer lines',
        'Stump removal after previous tree was cut down',
      ],
      priceRange: '$300–$3,500 (species, size, and complexity)',
      seasonalRelevance: ['all'],
    },
  ],

  // ─── SERVICE AREAS ────────────────────────────────────────────────────────
  serviceAreas: [
    { name: 'Fresno',       slug: 'fresno',        type: 'city',   state: 'CA', isPrimary: true,  coordinates: { latitude: 36.7378, longitude: -119.7871 } },
    { name: 'Clovis',       slug: 'clovis',        type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 36.8252, longitude: -119.7029 } },
    { name: 'Madera',       slug: 'madera',        type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 36.9613, longitude: -120.0607 } },
    { name: 'Visalia',      slug: 'visalia',       type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 36.3302, longitude: -119.2921 } },
    { name: 'Tulare',       slug: 'tulare',        type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 36.2077, longitude: -119.3473 } },
    { name: 'Hanford',      slug: 'hanford',       type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 36.3274, longitude: -119.6457 } },
    { name: 'Fresno County', slug: 'fresno-county', type: 'county', state: 'CA', isPrimary: false },
  ],

  // ─── PAGES ────────────────────────────────────────────────────────────────
  pages: [
    {
      title: 'Landscaping Company Fresno CA | Verde Vista Landscaping',    // REPLACE
      slug: '/',
      type: 'homepage',
      metaDescription:
        'Fresno landscaping company. Design & installation, lawn maintenance, hardscaping, irrigation, tree service. C-27 licensed. Free consultation. Verde Vista Landscaping.',
      h1: 'Fresno Landscaping — Design, Build & Maintain',
      includeSchema: ['LocalBusiness', 'FAQPage'],
      phase: 'mvp',
      sections: ['Hero', 'TrustStrip', 'Services', 'Gallery', 'WhyUs', 'Testimonials', 'ServiceAreas', 'FAQ', 'FinalCTA'],
    },
    {
      title: 'Landscape Design Fresno CA | Verde Vista Landscaping',
      slug: 'services/landscape-design',
      type: 'service',
      metaDescription:
        'Landscape design and installation in Fresno, CA. Full-service design-build from concept to completion. C-27 licensed. Free consultation. Verde Vista Landscaping.',
      h1: 'Landscape Design & Installation in Fresno, CA',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Lawn Maintenance Fresno CA | Verde Vista Landscaping',
      slug: 'services/lawn-maintenance',
      type: 'service',
      metaDescription:
        'Lawn maintenance in Fresno, CA. Weekly and bi-weekly mowing, edging, trimming. Consistent crews. Licensed & insured. Call Verde Vista for a free quote.',
      h1: 'Lawn Maintenance Services in Fresno, CA',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Hardscaping Fresno CA | Patios & Retaining Walls | Verde Vista',
      slug: 'services/hardscaping',
      type: 'service',
      metaDescription:
        'Hardscaping in Fresno, CA. Patios, walkways, retaining walls, outdoor living areas. Pavers, concrete, natural stone. Free estimate. Verde Vista Landscaping.',
      h1: 'Hardscaping Services in Fresno, CA',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Irrigation Systems Fresno CA | Install & Repair | Verde Vista',
      slug: 'services/irrigation-systems',
      type: 'service',
      metaDescription:
        'Irrigation system installation and repair in Fresno, CA. Drip and sprinkler systems. Water-efficient solutions. C-27 licensed. Verde Vista Landscaping.',
      h1: 'Irrigation System Installation & Repair in Fresno, CA',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Tree Service Fresno CA | Trimming & Removal | Verde Vista',
      slug: 'services/tree-service',
      type: 'service',
      metaDescription:
        'Tree trimming, removal, and stump grinding in Fresno, CA. ISA-certified arborists. Emergency tree removal available. Free estimate. Verde Vista Landscaping.',
      h1: 'Tree Service in Fresno, CA — Trimming, Removal & More',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Landscaping Gallery | Project Photos | Verde Vista Landscaping',
      slug: 'gallery',
      type: 'gallery',
      metaDescription:
        'View Verde Vista Landscaping project photos from Fresno and surrounding areas. Before and after landscape design, hardscaping, and lawn transformation projects.',
      h1: 'Landscaping Project Gallery',
      includeSchema: [],
      phase: 'mvp',
    },
    {
      title: 'Contact Verde Vista Landscaping | Free Consultation',
      slug: 'contact',
      type: 'contact',
      metaDescription:
        'Contact Verde Vista Landscaping in Fresno, CA. Free design consultation. Quotes for lawn maintenance, hardscaping, irrigation, and tree service. Call or request online.',
      h1: 'Contact Verde Vista Landscaping',
      includeSchema: ['LocalBusiness'],
      phase: 'mvp',
    },
    {
      title: 'About Verde Vista Landscaping | Fresno C-27 Landscaper Since 2011',
      slug: 'about',
      type: 'about',
      metaDescription:
        'Verde Vista Landscaping — Fresno\'s trusted C-27 landscaping contractor since 2011. Owner Carlos Mendez leads a team committed to design excellence and water-smart practices.',
      h1: 'About Verde Vista Landscaping',
      includeSchema: ['LocalBusiness'],
      phase: 'mvp',
    },
    {
      title: 'Landscaping FAQ Fresno | Verde Vista Landscaping',
      slug: 'faq',
      type: 'faq',
      metaDescription:
        'Landscaping FAQ for Fresno homeowners. Project timelines, cost ranges, plant guarantees, water-efficient options, and more. Verde Vista Landscaping.',
      h1: 'Landscaping FAQ — Fresno Homeowners\' Questions Answered',
      includeSchema: ['FAQPage'],
      phase: 'mvp',
    },
    {
      title: 'Landscaping in Clovis CA | Verde Vista Landscaping',
      slug: 'service-areas/clovis',
      type: 'service-area',
      metaDescription:
        'Landscaping services in Clovis, CA. Design & installation, lawn maintenance, hardscaping, tree service. C-27 licensed. Verde Vista Landscaping.',
      h1: 'Landscaping Services in Clovis, CA',
      includeSchema: ['LocalBusiness', 'BreadcrumbList'],
      phase: 'phase2',
    },
    {
      title: 'Privacy Policy | Verde Vista Landscaping',
      slug: 'privacy',
      type: 'privacy',
      metaDescription: 'Privacy policy for Verde Vista Landscaping. How we collect, use, and protect your personal information.',
      h1: 'Privacy Policy',
      includeSchema: [],
      phase: 'mvp',
    },
    {
      title: 'Thank You | Verde Vista Landscaping',
      slug: 'thank-you',
      type: 'thank-you',
      metaDescription: 'Thank you for contacting Verde Vista Landscaping. We\'ll be in touch within 24 hours.',
      h1: 'We Received Your Request',
      includeSchema: [],
      phase: 'mvp',
    },
  ],

  // ─── TRUST SIGNALS ────────────────────────────────────────────────────────
  trustSignals: {
    googleRating: 4.9,              // REPLACE: actual Google rating
    reviewCount: 287,               // REPLACE: actual review count
    reviewSource: 'Google',
    licenseNumber: '1056298',       // REPLACE: actual CSLB C-27 license number
    licenseType: 'C-27 Landscaping Contractor',
    licensedBondedInsured: true,
    yearEstablished: 2011,          // REPLACE: actual year
    certifications: [
      { name: 'CLCA Member — California Landscape Contractors Association' },
      { name: 'California Water Efficient Landscaper Certified' },
      { name: 'ISA Certified Arborist — Tree Service Division' },
      { name: 'BBB Accredited Business — A Rating' },
    ],
    guarantees: [
      '1-Year Plant Guarantee on All Installed Plants',
      '100% Satisfaction Guarantee',
      'Free Design Consultation — No Obligation',
      'Licensed, Bonded & Insured',
      'Water-Smart Design — Drought-Tolerant Options Available',
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
        name: 'Sandra O.',
        location: 'Fresno, CA',
        rating: 5,
        text: 'Carlos and his team completely transformed our backyard from a dirt lot into an outdoor living space we use every weekend. The design process was collaborative — he listened to what we wanted and came back with ideas we hadn\'t even considered. The patio, fire pit area, and drought-tolerant plants look incredible. Best investment we\'ve made in our home.',
        service: 'Landscape Design & Installation',
        date: 'April 2024',
        source: 'Google',
      },
      {
        name: 'Greg T.',
        location: 'Clovis, CA',
        rating: 5,
        text: 'We\'ve had Verde Vista maintaining our lawn for two years. The crew shows up every week without fail, and the lawn has never looked better. After years of fighting brown patches ourselves, having professionals handle it has been a game-changer. Carlos even identified a grub problem early and saved our lawn from serious damage.',
        service: 'Lawn Maintenance',
        date: 'January 2024',
        source: 'Google',
      },
      {
        name: 'Alice & Paul M.',
        location: 'Madera, CA',
        rating: 5,
        text: 'Verde Vista built our backyard patio and retaining wall. The project was quoted accurately, started on time, and finished ahead of schedule. The stonework is absolutely beautiful — neighbors stop to ask who did it. The retaining wall solved our drainage issue completely. We\'ll be calling them again for the front yard.',
        service: 'Hardscaping',
        date: 'October 2023',
        source: 'Google',
      },
    ],
  },

  // ─── CONTACT ──────────────────────────────────────────────────────────────
  contact: {
    phone: '(559) 555-0276',                  // REPLACE: actual phone number
    phoneFormatted: '+15595550276',            // REPLACE: E.164 phone for tel: links
    email: 'carlos@verdevistalandscaping.com', // REPLACE: actual email
    address: {
      street: '2890 N Palm Ave',
      city: 'Fresno',
      state: 'CA',
      zip: '93704',
      country: 'United States',
    },
    responseTimePromise: 'We respond to all consultation requests within 24 hours and schedule within 3–5 business days.',
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
        placeholder: '(559) 555-0100',
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
        label: 'What service are you interested in?',
        type: 'select',
        required: true,
        options: [
          'Landscape Design & Installation',
          'Lawn Maintenance (Weekly/Bi-Weekly)',
          'Hardscaping (Patio, Walkway, Wall)',
          'Irrigation System Install or Repair',
          'Tree Trimming or Removal',
          'Multiple Services',
          'Other / Not Sure',
        ],
      },
      {
        name: 'propertyType',
        label: 'Property Type',
        type: 'select',
        required: false,
        options: [
          'Residential — Single Family',
          'Residential — Condo / Townhome',
          'Commercial / Business',
          'HOA / Community',
          'Rental Property',
        ],
      },
      {
        name: 'message',
        label: 'Tell Us About Your Project',
        type: 'textarea',
        required: false,
        placeholder: 'E.g. We want to add a patio and low-maintenance landscaping to our backyard. About 800 sq ft.',
        validation: { maxLength: 1000 },
      },
      {
        name: 'honeypot',
        label: 'Leave this blank',
        type: 'hidden',
        required: false,
      },
    ],
    formSuccessMessage: 'Thank you! Carlos will personally review your request and reach out within 24 hours to schedule your free consultation.',
    formErrorMessage: 'Something went wrong. Please call us directly at (559) 555-0276 — we\'re available Mon–Sat.',
    showMap: true,
  },

  // ─── BRANDING ─────────────────────────────────────────────────────────────
  branding: {
    colors: {
      primary:       '#2D6A4F',   // Forest green — nature, growth, outdoors
      secondary:     '#52B788',   // Sage green — secondary UI elements
      accent:        '#D4A017',   // Warm gold — warmth, California sun, quality
      background:    '#FFFFFF',
      backgroundAlt: '#F0FAF4',   // Very light green for alternate sections
      text:          '#1B2D23',
      textMuted:     '#52736A',
    },
    fonts: {
      heading: 'Playfair Display',  // Elegant, nature-inspired — premium landscaping feel
      body:    'Nunito Sans',       // Friendly, clean, readable
    },
    logo: {
      path:    '/images/logo.svg',  // REPLACE: actual logo path
      altText: 'Verde Vista Landscaping — Fresno Licensed C-27 Landscaper',
      width:   220,
      height:  60,
    },
    imagery: {
      style:            'professional',
      hasTeamPhotos:    false,         // REPLACE: true if client provides team photos
      hasProjectPhotos: false,         // REPLACE: true if client provides project photos — critical for landscapers
      hasVehiclePhotos: false,         // REPLACE: true if client provides truck/equipment photos
      stockPhotoFallback: 'professional landscaping backyard patio design fresno california',
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
    domain: 'verdevistalandscaping.com',    // REPLACE: actual domain
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
      embedOnContact:      true,
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
    galleryPage:        true,    // Critical for landscapers — visual proof is primary conversion lever
    financingPage:      false,
    careersPage:        false,
    videoTestimonials:  false,
    caseStudies:        false,
    stickyMobileCTA:    true,
    floatingPhoneButton: false,
    emergencyBanner:    false,   // Planned trade — no emergency messaging needed (tree service is the exception but minor)
    seasonalHero:       true,    // Spring = design/install focus, Summer = maintenance focus, Fall = prep/cleanup
    cookieConsent:      true,    // Required — CCPA California
    recaptcha:          false,   // Using honeypot instead
    darkMode:           false,
    multiLanguage:      false,
    honeypotField:      true,
    rateLimiting:       true,
  },
};
