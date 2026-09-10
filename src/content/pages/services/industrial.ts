import type { ServiceDetailContent } from '@/types/content';

export const industrialServiceContent: ServiceDetailContent = {
  seo: {
    title: 'Industrial Facilities Construction | Khushbu Nirman Sewa',
    description:
      'KNSEWA builds purpose-built industrial facilities for the Sunsari–Morang corridor — factories, warehouses, logistics yards, and plant expansions designed for efficiency and long operational life.',
    keywords: [
      'industrial construction nepal',
      'factory construction biratnagar',
      'warehouse construction sunsari morang',
      'industrial facility contractor nepal',
      'peb construction nepal',
    ],
  },

  hero: {
    label: 'INDUSTRIAL FACILITIES',
    headline: 'Plants, Warehouses, and Logistics That Run for Decades',
    description:
      'Purpose-built industrial facilities for the Sunsari–Morang corridor and beyond — designed for efficiency, safety, and the kind of long operational life that pays back the investment.',
    backgroundImage: '/images/services/industrial.jpg',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'Industrial Facilities' },
    ],
  },

  overview: {
    label: 'WHAT WE BUILD',
    headline: 'Buildings designed around how the operation actually works',
    description:
      'The Sunsari–Morang industrial corridor — one of Nepal\'s busiest — has been home to many of our industrial projects. An industrial building isn\'t a generic shed — it\'s a working machine. Where does raw material come in? Where does finished product go out? Where do trucks queue, where do workers park, where\'s the substation, where\'s the fire water tank? We answer those questions before drawing a single beam. Our industrial work covers RCC and PEB (pre-engineered) structures, factory and warehouse sheds with crane gantries, MEP and HVAC for clean processes, fire safety to NBC, and yard work including paved roads, drainage, and security. We understand the realities of construction logistics in eastern Nepal — including the monsoon window and the Jogbani–Biratnagar customs flow for imported equipment.',
    image: '/images/projects/industrial-featured.jpg',
    imageAlt: 'Industrial facility construction project by KNSEWA in Sunsari–Morang corridor',
    imagePosition: 'left',
    cta: {
      text: 'View Our Projects',
      href: '/projects',
    },
  },

  deliverablesIntro: 'Six core industrial offerings — from greenfield factories to brownfield plant expansions.',

  deliverables: [
    'Manufacturing plants and factory sheds (RCC or PEB)',
    'Warehouses, cold stores, and distribution centres',
    'Logistics yards, paved truck movement areas, weighbridges',
    'Substations, generator rooms, and utility blocks',
    'Office and admin blocks within industrial estates',
    'Plant expansions, brownfield additions, and shutdown work',
  ],

  process: [
    {
      id: 'process-walk',
      step: '01',
      title: 'Process & Site Walk',
      description:
        'Before we draw anything, we walk the process with you — material flow, headroom, crane load, drainage, power. The facility is designed around the operation.',
    },
    {
      id: 'engineering',
      step: '02',
      title: 'Engineering & Approvals',
      description:
        'Structural, MEP, fire, and EIA where required. We coordinate factory licence, electrical clearance, and local body approvals so construction isn\'t held up by paperwork.',
    },
    {
      id: 'build',
      step: '03',
      title: 'Phased Construction (Operation-Aware)',
      description:
        'Brownfield expansions are sequenced so the existing plant keeps running. We work in shutdown windows, weekends, and night shifts when needed.',
    },
    {
      id: 'commissioning',
      step: '04',
      title: 'Commissioning Support',
      description:
        'We coordinate with your equipment vendors during installation and trial runs. Final handover includes all civil, MEP, fire, and statutory documentation.',
    },
  ],

  communityImpact: {
    label: 'LOCAL IMPACT',
    headline: 'Industrial work that keeps skilled workers close to home',
    description:
      'A working factory in the Sunsari–Morang corridor is jobs — direct manufacturing jobs and indirect work in transport, packaging, supply, and services. When we build an industrial facility well, the multiplier is real: skilled youth from the East find work close to home instead of going abroad. We also build with the surroundings in mind — drainage that doesn\'t flood the neighbour\'s field, dust control on the access road, and worker amenities that meet decent-work standards.',
    image: '/images/team-construction.jpg',
    imageAlt: 'KNSEWA construction team working on industrial project',
    imagePosition: 'right',
  },

  relatedServices: [
    {
      id: 'commercial',
      title: 'Commercial Construction',
      description:
        'Corporate offices, retail complexes, hotels, and mixed-use developments built for daily use and long lifespans across Biratnagar and Nepal.',
      image: '/images/services/commercial.jpg',
      href: '/services/commercial',
    },
    {
      id: 'government',
      title: 'Government & Institutional',
      description:
        'Schools, hospitals, administrative buildings, and public infrastructure delivered for government bodies across all seven provinces.',
      image: '/images/services/government.jpg',
      href: '/services/government',
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure Development',
      description:
        'Roads, bridges, drainage, water supply, and energy infrastructure built to last through every monsoon.',
      image: '/images/services/infrastructure.jpg',
      href: '/services/infrastructure',
    },
  ],

  faq: [
    {
      question: 'What types of industrial facilities does KNSEWA build?',
      answer: 'We build manufacturing plants, warehouses, logistics hubs, processing facilities, and industrial complexes. We specialise in the Sunsari–Morang industrial corridor in eastern Nepal.',
    },
    {
      question: 'How do you manage phased industrial construction?',
      answer: 'We plan industrial projects in phases to allow operations to begin in completed areas while construction continues. Each phase is handed over with full commissioning documentation.',
    },
    {
      question: 'What is KNSEWA\'s experience with large-scale industrial projects?',
      answer: 'We have delivered large-scale industrial infrastructure across Nepal with over 500 completed projects. Our team has deep expertise in structural engineering, MEP coordination, and industrial fit-out.',
    },
    {
      question: 'Do you provide post-construction support for industrial buildings?',
      answer: 'Yes. Our handover package includes as-built drawings, maintenance schedules, and a dedicated support period to ensure your facility operates as designed from day one.',
    },
  ],

  cta: {
    label: 'INDUSTRIAL ENQUIRY',
    headline: 'Planning a new plant or an expansion?',
    description:
      'Tell us about your operation — product, footprint, timeline. Our industrial team will visit your site and come back with a feasibility view and an indicative cost.',
    primaryCTA: {
      text: 'Request a Site Visit',
      href: '/contact',
    },
    secondaryCTA: {
      text: 'See Our Work',
      href: '/projects',
    },
  },
};
