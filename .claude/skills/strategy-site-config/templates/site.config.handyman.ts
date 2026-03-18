/**
 * site.config.handyman.ts — Niche Template: Handyman Services
 * Copytier Website Builder — Pack 1 Template
 *
 * USAGE: Copy this file to the client repo as src/site.config.ts
 * Replace all values marked // REPLACE: with real client data from the Build Brief.
 *
 * Niche: handyman | Schema: HomeAndConstructionBusiness | License: B-Class General Building
 * Primary persona: researcher | Color: Warm earth palette
 * Special: "One call does it all" messaging, transparent pricing, 9 services
 */

import type { SiteConfig } from '../references/site-config-interface';

export const siteConfig: SiteConfig = {

  // ─── IDENTITY ──────────────────────────────────────────────────────────────
  niche: 'handyman',
  schemaType: 'HomeAndConstructionBusiness',
  currentPhase: 'mvp',

  business: {
    name: 'TrustFix Handyman Services',                           // REPLACE: client business name
    legalName: 'TrustFix Handyman Services LLC',                 // REPLACE: legal entity name
    tagline: 'San Jose\'s Handyman — One Call Does It All',       // REPLACE: tagline
    description:
      'TrustFix Handyman Services has been the go-to repair and maintenance team for ' +
      'San Jose homeowners since 2012. From drywall and door repairs to kitchen updates ' +
      'and furniture assembly — one call handles it all. Flat-rate pricing, background-' +
      'checked technicians, and a 90-day workmanship guarantee on every job.',
    ownerName: 'Brian Park',             // REPLACE: owner name
    yearEstablished: 2012,               // REPLACE: year established
    employeeCount: '6–10',
    address: {
      street: '1672 Meridian Ave',       // REPLACE: street address
      city: 'San Jose',                  // REPLACE: city
      state: 'CA',
      zip: '95125',                      // REPLACE: zip code
      country: 'United States',
    },
    geo: {
      latitude: 37.2924,                 // REPLACE: GPS latitude
      longitude: -121.9109,              // REPLACE: GPS longitude
    },
    hours: {
      regular: 'Mon–Fri 8am–6pm, Sat 9am–4pm',
      emergency: 'After-hours available by appointment — call to arrange',
      timezone: 'America/Los_Angeles',
      openingHoursSpec: [
        { dayOfWeek: 'https://schema.org/Monday',    opens: '08:00', closes: '18:00' },
        { dayOfWeek: 'https://schema.org/Tuesday',   opens: '08:00', closes: '18:00' },
        { dayOfWeek: 'https://schema.org/Wednesday', opens: '08:00', closes: '18:00' },
        { dayOfWeek: 'https://schema.org/Thursday',  opens: '08:00', closes: '18:00' },
        { dayOfWeek: 'https://schema.org/Friday',    opens: '08:00', closes: '18:00' },
        { dayOfWeek: 'https://schema.org/Saturday',  opens: '09:00', closes: '16:00' },
      ],
    },
    social: {
      googleBusinessProfile: 'https://g.page/trustfix-handyman-san-jose', // REPLACE: GBP URL
      facebook:  'https://facebook.com/trustfixhandyman',                  // REPLACE
      yelp:      'https://yelp.com/biz/trustfix-handyman-san-jose',       // REPLACE
      nextdoor:  'https://nextdoor.com/pages/trustfix-handyman',          // REPLACE
      instagram: 'https://instagram.com/trustfixhandyman',                // REPLACE
    },
  },

  // ─── VALUE PROPOSITION ────────────────────────────────────────────────────
  valueProposition: {
    headline: 'San Jose Handyman. One Call Does It All.',      // REPLACE: headline (max 8 words)
    subheadline:
      'Licensed, background-checked handymen serving San Jose — flat-rate pricing, ' +
      '100+ repair types, 90-day workmanship guarantee. No job too small.',
    primaryCTA: {
      text: 'Book a Handyman',
      href: '/contact',
      variant: 'primary',
      icon: 'calendar',
    },
    secondaryCTA: {
      text: 'Call Now',
      href: 'tel:+14085550194',    // REPLACE: formatted phone for tel: link
      variant: 'outline',
      icon: 'phone',
    },
  },

  // ─── PERSONAS ─────────────────────────────────────────────────────────────
  personas: {
    primary: 'researcher',
    secondary: 'returning',
    nicheExtensions: ['new-homeowner', 'busy-professional', 'property-manager', 'senior-homeowner'],
  },

  // ─── USER JOURNEYS ────────────────────────────────────────────────────────
  userJourneys: {
    primary: {
      persona: 'researcher',
      steps: [
        {
          action: 'Searches "handyman San Jose" or "handyman near me" with a list of small repairs piling up',
          need: 'Confirm this handyman can handle THEIR specific repairs — not just one specialty',
          siteResponse: 'Services page with 9 categories + homepage "100+ repair types" messaging',
        },
        {
          action: 'Worried about quality, reliability, and stranger-in-the-house concerns',
          need: 'Trust: background checks, reviews, years in business, license info',
          siteResponse: 'Trust strip: Background Checked · B-License · Since 2012 · 4.8★ 394 Reviews',
        },
        {
          action: 'Wants to know pricing before committing',
          need: 'Flat-rate or at least a price range — no "we quote on-site" mysteries',
          siteResponse: 'Each service page shows price range; homepage highlights flat-rate pricing promise',
        },
        {
          action: 'Books a handyman for a single visit with multiple items',
          need: 'Easy booking with ability to list multiple tasks',
          siteResponse: 'Contact form with "Multiple Repairs" option and message field for task list',
        },
      ],
    },
    secondary: {
      persona: 'returning',
      steps: [
        {
          action: 'Previous customer with new items that need fixing — remembers TrustFix from a great experience',
          need: 'Quick re-booking with same technician if possible',
          siteResponse: 'Contact form with "Returning Customer" option; phone call for fastest re-booking',
        },
        {
          action: 'Refers TrustFix to a neighbor or family member',
          need: 'Easy way to share the business (website URL, phone number)',
          siteResponse: 'Footer and contact page prominently display phone + clean URL for sharing',
        },
        {
          action: 'Becomes a recurring maintenance customer (property manager, HOA)',
          need: 'Reliable scheduling and consistent quality across multiple properties',
          siteResponse: 'Contact form includes "Property Management" option; About page highlights commercial capability',
        },
      ],
    },
  },

  // ─── SUCCESS METRICS ──────────────────────────────────────────────────────
  successMetrics: {
    conversionRateTarget: 4.0,
    monthlyOrganicSessionsTarget: 1800,
    lcpTargetMs: 2000,
    ttfbTargetMs: 400,
    targetReviewRating: 4.8,
    targetReviewCount: 450,
    primaryConversionEvents: ['phone_call_click', 'form_submit', 'service_page_view'],
    businessKPIs: [
      'Cost per acquired lead < $40',
      'Repeat customer rate > 35%',
      'Average job value > $250',
      'Jobs completed per tech per day > 2.5',
    ],
  },

  // ─── MOSCOW PRIORITY ──────────────────────────────────────────────────────
  featurePriority: {
    mustHave: [
      'Homepage with breadth messaging and "one call" positioning',
      'Service pages for all 9 service categories',
      'Contact / booking page with task description field',
      'Transparent pricing on every service page',
      'Trust signals: B-license, background checks, warranty',
      'Cookie consent (CCPA)',
      'FAQ page',
      'Privacy and terms pages',
    ],
    shouldHave: [
      'Service area pages for top 5 cities',
      'About page with Brian\'s story and team',
      'Google Reviews widget',
      'Property management / recurring maintenance section',
    ],
    couldHave: [
      'Blog: home maintenance tips',
      'Seasonal home checklist content',
      'Spanish language support',
    ],
    wontHave: [
      'E-commerce or parts store',
      'Complex online scheduling portal',
      'Live chat',
      'DIY guides (competitor to our service)',
    ],
  },

  // ─── SERVICES ─────────────────────────────────────────────────────────────
  services: [
    {
      name: 'General Home Repairs',
      slug: 'home-repairs',
      shortDescription:
        'Catch-all repair visits for the list of small fixes around the house — caulking, patching, hardware, weatherstripping, and dozens of other tasks in one visit.',
      icon: 'wrench',
      isEmergency: false,
      problems: [
        'Growing list of small repairs with no time to tackle them',
        'Leaky faucet, running toilet, squeaky door — all at once',
        'Rental property needing turn-over repairs between tenants',
        'Holiday prep — hanging items, assembling, fixing before guests arrive',
        'Post-move-in punch list for a new home',
      ],
      priceRange: '$95–$350/visit (flat rate)',
      seasonalRelevance: ['all'],
    },
    {
      name: 'Drywall & Painting',
      slug: 'drywall-painting',
      shortDescription:
        'Hole patching, drywall repair, texture matching, and touch-up painting — repairs that look like they were never there.',
      icon: 'paintbrush',
      isEmergency: false,
      problems: [
        'Holes from door handles, anchors, or furniture damage',
        'Cracks in drywall from settling or moisture',
        'Touch-up painting after repairs or before selling',
        'Water-stained ceiling patches needing repair and repaint',
        'Scuffs and marks on walls throughout the home',
      ],
      priceRange: '$150–$1,500 (size and scope)',
      seasonalRelevance: ['all'],
    },
    {
      name: 'Door & Window Repair',
      slug: 'door-window-repair',
      shortDescription:
        'Sticking doors, broken hardware, faulty locks, drafty windows — fixed properly so they open, close, lock, and seal as designed.',
      icon: 'door-open',
      isEmergency: false,
      problems: [
        'Interior or exterior door sticking, binding, or not latching',
        'Door hardware — handles, locks, deadbolts — broken or misaligned',
        'Screen door damaged or not sliding smoothly',
        'Window that won\'t open, close, or lock properly',
        'Drafty door or window needing weatherstripping replacement',
      ],
      priceRange: '$150–$800',
      seasonalRelevance: ['all'],
    },
    {
      name: 'Furniture Assembly',
      slug: 'furniture-assembly',
      shortDescription:
        'IKEA, Wayfair, Amazon — we assemble all flat-pack and ready-to-assemble furniture quickly and correctly, including TV stands, beds, desks, and shelving.',
      icon: 'package',
      isEmergency: false,
      problems: [
        'IKEA or Wayfair order arrived and needs professional assembly',
        'Office furniture or home gym equipment too complex for DIY',
        'Moving into a new home and need multiple pieces assembled quickly',
        'Previously assembled piece fell apart and needs to be redone right',
        'Large or heavy furniture requiring two people to build safely',
      ],
      priceRange: '$75–$350/item',
      seasonalRelevance: ['all'],
    },
    {
      name: 'Minor Plumbing Fixes',
      slug: 'plumbing-fixes',
      shortDescription:
        'Leaky faucets, running toilets, slow drains, and fixture replacements — small plumbing tasks handled without calling a licensed plumber for a full-service visit.',
      icon: 'droplets',
      isEmergency: false,
      problems: [
        'Dripping faucet in kitchen or bathroom wasting water',
        'Running toilet that won\'t stop after jiggling the handle',
        'Slow drain in sink or shower needing clearing',
        'Replacing a dated faucet, showerhead, or toilet seat',
        'Under-sink pipe dripping from a compression fitting',
      ],
      priceRange: '$95–$400',
      seasonalRelevance: ['all'],
    },
    {
      name: 'Minor Electrical Fixes',
      slug: 'electrical-fixes',
      shortDescription:
        'Outlet replacements, switch swaps, fixture upgrades, ceiling fan installation, and GFCI updates — minor electrical work done safely by licensed technicians.',
      icon: 'lightbulb',
      isEmergency: false,
      problems: [
        'Non-working outlet or switch needing replacement',
        'Ceiling fan replacement or new light fixture installation',
        'Swapping outdated outlets for GFCI-protected versions',
        'Installing a dimmer switch in living room or bedroom',
        'Smart switch or smart plug installation for home automation',
      ],
      priceRange: '$95–$350',
      seasonalRelevance: ['all'],
    },
    {
      name: 'Deck & Fence Repair',
      slug: 'deck-fence-repair',
      shortDescription:
        'Rotted boards, broken rails, leaning fence posts, and loose gates — deck and fence repairs that restore safety, function, and curb appeal.',
      icon: 'fence',
      isEmergency: false,
      problems: [
        'Deck boards rotted, cracked, or pulling up',
        'Fence leaning or posts rotted at ground level',
        'Gate off hinges or not latching properly',
        'Deck railing wobbly or loose — safety concern',
        'Staining or sealing needed before rainy season',
      ],
      priceRange: '$200–$2,000',
      seasonalRelevance: ['spring', 'summer', 'fall'],
    },
    {
      name: 'Kitchen & Bath Updates',
      slug: 'kitchen-bath-updates',
      shortDescription:
        'Faucet replacements, backsplash tile, cabinet hardware, towel bars, mirror hanging, and small upgrades that modernize without a full remodel.',
      icon: 'bath',
      isEmergency: false,
      problems: [
        'Outdated kitchen faucet or cabinet hardware needing refresh',
        'Bathroom accessories — towel bars, toilet paper holders — need replacing',
        'Small tile repairs in kitchen backsplash or bathroom',
        'Installing new vanity mirror or medicine cabinet',
        'Adding under-cabinet lighting or shelving in kitchen',
      ],
      priceRange: '$150–$1,200',
      seasonalRelevance: ['all'],
    },
    {
      name: 'TV Mounting & Smart Home',
      slug: 'tv-mounting-smart-home',
      shortDescription:
        'Wall-mount your TV with clean cable management, and get help with smart home device setup — Nest, Ring, smart switches, and more.',
      icon: 'tv',
      isEmergency: false,
      problems: [
        'New TV needs professional wall mounting on drywall or brick',
        'Existing TV mount needs relocation or upgrade',
        'Cable clutter behind mounted TV or entertainment center',
        'Smart doorbell (Ring, Nest) installation and setup',
        'Smart thermostat, smart locks, or smart lights installation',
      ],
      priceRange: '$100–$350',
      seasonalRelevance: ['all'],
    },
  ],

  // ─── SERVICE AREAS ────────────────────────────────────────────────────────
  serviceAreas: [
    { name: 'San Jose',       slug: 'san-jose',       type: 'city',   state: 'CA', isPrimary: true,  coordinates: { latitude: 37.3382, longitude: -121.8863 } },
    { name: 'Santa Clara',    slug: 'santa-clara',    type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 37.3541, longitude: -121.9552 } },
    { name: 'Sunnyvale',      slug: 'sunnyvale',      type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 37.3688, longitude: -122.0363 } },
    { name: 'Campbell',       slug: 'campbell',       type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 37.2872, longitude: -121.9500 } },
    { name: 'Los Gatos',      slug: 'los-gatos',      type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 37.2358, longitude: -121.9624 } },
    { name: 'Milpitas',       slug: 'milpitas',       type: 'city',   state: 'CA', isPrimary: false, coordinates: { latitude: 37.4323, longitude: -121.8996 } },
    { name: 'Santa Clara County', slug: 'santa-clara-county', type: 'county', state: 'CA', isPrimary: false },
  ],

  // ─── PAGES ────────────────────────────────────────────────────────────────
  pages: [
    {
      title: 'Handyman San Jose | TrustFix — One Call Does It All',    // REPLACE
      slug: '/',
      type: 'homepage',
      metaDescription:
        'San Jose handyman for home repairs, drywall, doors, furniture assembly, minor plumbing & electrical. Flat-rate pricing. Background-checked. Book TrustFix Handyman.',
      h1: 'San Jose Handyman Services — One Call Does It All',
      includeSchema: ['LocalBusiness', 'FAQPage'],
      phase: 'mvp',
      sections: ['Hero', 'TrustStrip', 'Services', 'WhyUs', 'Testimonials', 'ServiceAreas', 'FAQ', 'FinalCTA'],
    },
    {
      title: 'Home Repair Services San Jose | TrustFix Handyman',
      slug: 'services/home-repairs',
      type: 'service',
      metaDescription:
        'General home repair in San Jose. Tackle your whole list in one visit — caulking, hardware, weatherstripping, and more. Flat-rate pricing. Book TrustFix.',
      h1: 'General Home Repair Services in San Jose',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Drywall Repair & Painting San Jose | TrustFix Handyman',
      slug: 'services/drywall-painting',
      type: 'service',
      metaDescription:
        'Drywall repair and painting in San Jose. Hole patching, texture matching, touch-up paint. Invisible repairs guaranteed. Book TrustFix Handyman.',
      h1: 'Drywall Repair & Painting in San Jose',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Door & Window Repair San Jose | TrustFix Handyman',
      slug: 'services/door-window-repair',
      type: 'service',
      metaDescription:
        'Door and window repair in San Jose. Sticking doors, broken hardware, drafty windows fixed right. Flat-rate pricing. Licensed & insured. Book TrustFix.',
      h1: 'Door & Window Repair in San Jose',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Furniture Assembly San Jose | IKEA & More | TrustFix',
      slug: 'services/furniture-assembly',
      type: 'service',
      metaDescription:
        'Furniture assembly in San Jose. IKEA, Wayfair, Amazon flat-pack furniture assembled quickly and correctly. Same-week appointments. Book TrustFix Handyman.',
      h1: 'Furniture Assembly Services in San Jose',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Minor Plumbing Repairs San Jose | TrustFix Handyman',
      slug: 'services/plumbing-fixes',
      type: 'service',
      metaDescription:
        'Minor plumbing repairs in San Jose. Leaky faucets, running toilets, slow drains, fixture replacements. No plumber call-out fee. Book TrustFix Handyman.',
      h1: 'Minor Plumbing Repairs in San Jose',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Minor Electrical Repairs San Jose | TrustFix Handyman',
      slug: 'services/electrical-fixes',
      type: 'service',
      metaDescription:
        'Minor electrical repairs in San Jose. Outlet, switch, fixture, ceiling fan, GFCI replacement. Safe, code-compliant work. Book TrustFix Handyman.',
      h1: 'Minor Electrical Repairs in San Jose',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Deck & Fence Repair San Jose | TrustFix Handyman',
      slug: 'services/deck-fence-repair',
      type: 'service',
      metaDescription:
        'Deck and fence repair in San Jose. Rotted boards, leaning posts, broken gates fixed. Staining and sealing available. Book TrustFix Handyman.',
      h1: 'Deck & Fence Repair in San Jose',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Kitchen & Bath Updates San Jose | TrustFix Handyman',
      slug: 'services/kitchen-bath-updates',
      type: 'service',
      metaDescription:
        'Kitchen and bathroom updates in San Jose. Faucet replacement, tile repair, cabinet hardware, towel bars. Flat-rate pricing. Book TrustFix Handyman.',
      h1: 'Kitchen & Bathroom Updates in San Jose',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'TV Mounting & Smart Home San Jose | TrustFix Handyman',
      slug: 'services/tv-mounting-smart-home',
      type: 'service',
      metaDescription:
        'TV mounting and smart home setup in San Jose. Clean cable management, Ring, Nest, smart switches installed. Book TrustFix Handyman.',
      h1: 'TV Mounting & Smart Home Installation in San Jose',
      includeSchema: ['Service', 'FAQPage', 'BreadcrumbList'],
      phase: 'mvp',
    },
    {
      title: 'Contact TrustFix Handyman | Book a Repair in San Jose',
      slug: 'contact',
      type: 'contact',
      metaDescription:
        'Book TrustFix Handyman in San Jose. List your repairs and we\'ll get it all done in one visit. Flat-rate pricing. Background-checked technicians.',
      h1: 'Book TrustFix Handyman Services',
      includeSchema: ['LocalBusiness'],
      phase: 'mvp',
    },
    {
      title: 'About TrustFix Handyman | San Jose Since 2012',
      slug: 'about',
      type: 'about',
      metaDescription:
        'TrustFix Handyman — San Jose\'s trusted licensed handyman service since 2012. Background-checked technicians, flat-rate pricing, 90-day workmanship guarantee.',
      h1: 'About TrustFix Handyman Services',
      includeSchema: ['LocalBusiness'],
      phase: 'mvp',
    },
    {
      title: 'Handyman FAQ San Jose | TrustFix Handyman Services',
      slug: 'faq',
      type: 'faq',
      metaDescription:
        'Handyman FAQ for San Jose homeowners. What TrustFix can handle, pricing, how to book, what to expect. Get your questions answered.',
      h1: 'Handyman FAQ — San Jose Homeowners\' Questions Answered',
      includeSchema: ['FAQPage'],
      phase: 'mvp',
    },
    {
      title: 'Handyman in Santa Clara CA | TrustFix Handyman',
      slug: 'service-areas/santa-clara',
      type: 'service-area',
      metaDescription:
        'Handyman services in Santa Clara, CA. Home repairs, drywall, furniture assembly, minor plumbing & electrical. Flat-rate pricing. Book TrustFix Handyman.',
      h1: 'Handyman Services in Santa Clara, CA',
      includeSchema: ['LocalBusiness', 'BreadcrumbList'],
      phase: 'phase2',
    },
    {
      title: 'Privacy Policy | TrustFix Handyman Services',
      slug: 'privacy',
      type: 'privacy',
      metaDescription: 'Privacy policy for TrustFix Handyman Services.',
      h1: 'Privacy Policy',
      includeSchema: [],
      phase: 'mvp',
    },
    {
      title: 'Thank You | TrustFix Handyman Services',
      slug: 'thank-you',
      type: 'thank-you',
      metaDescription: 'Thank you for booking TrustFix Handyman. We\'ll confirm your appointment within 4 hours.',
      h1: 'We Received Your Booking Request',
      includeSchema: [],
      phase: 'mvp',
    },
  ],

  // ─── TRUST SIGNALS ────────────────────────────────────────────────────────
  trustSignals: {
    googleRating: 4.8,              // REPLACE: actual Google rating
    reviewCount: 394,               // REPLACE: actual review count
    reviewSource: 'Google',
    licenseNumber: '1073419',       // REPLACE: actual CSLB B-class license number
    licenseType: 'B — General Building Contractor',
    licensedBondedInsured: true,
    yearEstablished: 2012,          // REPLACE: actual year
    certifications: [
      { name: 'CSLB Licensed B-Class General Building Contractor' },
      { name: 'EPA Lead-Safe Certified Renovator (pre-1978 homes)' },
      { name: 'All Technicians Background Checked & Drug Tested' },
      { name: 'BBB Accredited Business — A+ Rating' },
    ],
    guarantees: [
      '"One Call Does It All" — 100+ Repair Types',
      '90-Day Workmanship Guarantee',
      'Flat-Rate Pricing — No Hourly Surprises',
      'Background-Checked & Insured Technicians',
      '100% Satisfaction Guaranteed',
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
        name: 'Rachel N.',
        location: 'San Jose, CA',
        rating: 5,
        text: 'I had a list of about 8 things that needed fixing around the house — holes in the drywall, a door that wouldn\'t latch, a leaky bathroom faucet, and a TV to mount. TrustFix sent Brian out and he knocked through the whole list in about 4 hours. Everything was done well and the price was exactly what was quoted. This is exactly what I needed — one call, one visit, done.',
        service: 'General Home Repairs',
        date: 'March 2024',
        source: 'Google',
      },
      {
        name: 'Tony & Kim H.',
        location: 'Campbell, CA',
        rating: 5,
        text: 'We had our new kitchen faucet replaced, backsplash tile repaired, and new cabinet hardware installed throughout. The technician matched the grout perfectly and the cabinet handles are level and consistent. Our kitchen looks updated without a renovation. Pricing was fair and the quality is excellent. TrustFix is our go-to from now on.',
        service: 'Kitchen & Bath Updates',
        date: 'November 2023',
        source: 'Google',
      },
      {
        name: 'David L.',
        location: 'Santa Clara, CA',
        rating: 5,
        text: 'As a property manager, I need reliable handyman service for my rentals between tenants. TrustFix has been my vendor for 2 years — they respond quickly, the work is solid, and the flat-rate pricing makes it easy to budget. Brian\'s team treats every unit with care regardless of the size of the job. Highly recommend for other property managers.',
        service: 'General Home Repairs',
        date: 'January 2024',
        source: 'Google',
      },
    ],
  },

  // ─── CONTACT ──────────────────────────────────────────────────────────────
  contact: {
    phone: '(408) 555-0194',                  // REPLACE: actual phone number
    phoneFormatted: '+14085550194',            // REPLACE: E.164 phone for tel: links
    email: 'brian@trustfixhandyman.com',       // REPLACE: actual email
    address: {
      street: '1672 Meridian Ave',
      city: 'San Jose',
      state: 'CA',
      zip: '95125',
      country: 'United States',
    },
    responseTimePromise: 'We respond to all booking requests within 4 hours and can typically schedule within 2–3 business days.',
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
        placeholder: '(408) 555-0100',
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
          'General Home Repairs (Punch List)',
          'Drywall & Painting',
          'Door & Window Repair',
          'Furniture Assembly',
          'Minor Plumbing Fixes',
          'Minor Electrical Fixes',
          'Deck & Fence Repair',
          'Kitchen & Bath Updates',
          'TV Mounting & Smart Home',
          'Multiple Repairs (Various)',
          'Property Management / Recurring',
          'Other / Not Sure',
        ],
      },
      {
        name: 'preferredDate',
        label: 'Preferred Date (optional)',
        type: 'text',
        required: false,
        placeholder: 'E.g. Tuesday afternoon, any weekday, ASAP',
      },
      {
        name: 'message',
        label: 'Describe the Work Needed',
        type: 'textarea',
        required: false,
        placeholder: 'E.g. List your repairs: 1) Hole in bedroom wall 2) Door won\'t latch 3) TV to mount in living room.',
        validation: { maxLength: 1500 },
      },
      {
        name: 'honeypot',
        label: 'Leave this blank',
        type: 'hidden',
        required: false,
      },
    ],
    formSuccessMessage: 'Thanks for booking! We\'ll call within 4 hours to confirm your appointment and go over your task list.',
    formErrorMessage: 'Something went wrong. Please call us at (408) 555-0194 — we\'re available Mon–Sat.',
    showMap: false,   // Handymen typically don't need a storefront map
  },

  // ─── BRANDING ─────────────────────────────────────────────────────────────
  branding: {
    colors: {
      primary:       '#5D4037',   // Warm brown — reliable, grounded, hardworking
      secondary:     '#795548',   // Medium brown — secondary UI elements
      accent:        '#F59E0B',   // Amber — warmth, confidence, trustworthy CTA
      background:    '#FFFFFF',
      backgroundAlt: '#FFF8F0',   // Warm off-white for alternate sections
      text:          '#1C1007',
      textMuted:     '#78716C',
    },
    fonts: {
      heading: 'DM Sans',    // Clean, modern, approachable — not stuffy
      body:    'Nunito',     // Friendly and readable
    },
    logo: {
      path:    '/images/logo.svg',  // REPLACE: actual logo path
      altText: 'TrustFix Handyman Services — San Jose Licensed Handyman',
      width:   200,
      height:  56,
    },
    imagery: {
      style:            'friendly',
      hasTeamPhotos:    false,      // REPLACE: true if client provides team photos
      hasProjectPhotos: false,      // REPLACE: true if client provides before/after photos
      hasVehiclePhotos: false,      // REPLACE: true if client provides van/truck photos
      stockPhotoFallback: 'professional handyman repairing home san jose california friendly',
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
    domain: 'trustfixhandyman.com',    // REPLACE: actual domain
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
      embedOnContact:      false,   // No storefront — service-area business
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
    galleryPage:        false,    // Handymen typically don't have strong visual portfolios
    financingPage:      false,    // Average ticket too low to need financing
    careersPage:        false,
    videoTestimonials:  false,
    caseStudies:        false,
    stickyMobileCTA:    true,
    floatingPhoneButton: false,
    emergencyBanner:    false,   // Handyman is a planned/scheduled trade, not emergency
    seasonalHero:       false,
    cookieConsent:      true,    // Required — CCPA California
    recaptcha:          false,   // Using honeypot instead
    darkMode:           false,
    multiLanguage:      false,
    honeypotField:      true,
    rateLimiting:       true,
  },
};
