import type { ServiceDetailContent } from '@/types/content';

export const infrastructureServiceContent: ServiceDetailContent = {
  seo: {
    title: 'Infrastructure Development | Khushbu Nirman Sewa',
    description:
      'KNSEWA builds roads, bridges, drainage, water supply, and urban infrastructure across seven provinces of Nepal — engineered for monsoon, traffic, and the next 40 years.',
    keywords: [
      'infrastructure construction nepal',
      'road construction nepal',
      'bridge construction eastern nepal',
      'water supply project nepal',
      'infrastructure contractor biratnagar',
    ],
  },

  hero: {
    label: 'INFRASTRUCTURE DEVELOPMENT',
    headline: 'The Roads, Bridges, and Pipes That Hold a Region Together',
    description:
      'All-weather roads, RCC bridges, drainage, water supply, and urban infrastructure — built across seven provinces to connect communities and keep them connected through every monsoon.',
    backgroundImage: '/images/services/infrastructure.jpg',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'Infrastructure Development' },
    ],
  },

  overview: {
    label: 'WHAT WE BUILD',
    headline: 'Built for monsoon, traffic, and the next 40 years',
    description:
      'Infrastructure is the work nobody sees until it fails — and then everyone sees it. A road that floods in Asar. A bridge that\'s washed out for a month. A water line that runs dry in Chaitra. We build infrastructure that holds up because we\'ve spent 30 years learning what Nepal\'s terrain, monsoon, and traffic actually do to a structure. From the Hetauda–Dhalkebar–Inaruwa 400KV transmission line with Nepal Electricity Authority to the Baikunthe Underground Drinking Water Project in Madi, Chitwan — our infrastructure work shows up in places people depend on. We design for Koshi monsoon volumes, riverbank erosion, freight loads on east–west and feeder roads, and coordinate with road, water, electricity, and irrigation authorities across all seven provinces.',
    image: '/images/coverage-nepal.jpg',
    imageAlt: 'Infrastructure development across Nepal by KNSEWA',
    imagePosition: 'left',
    cta: {
      text: 'View Our Projects',
      href: '/projects',
    },
  },

  deliverablesIntro: 'Seven core infrastructure offerings — from all-weather roads to hydropower civil works.',

  deliverables: [
    'Urban and rural road construction, pavement and bitumen',
    'RCC and steel bridges, box culverts, river crossings',
    'Stormwater drains, sewerage networks, and urban drainage',
    'Water supply pipelines, intake works, overhead reservoirs, household connections',
    'Irrigation canals, headworks, and distribution networks',
    'Hydropower civil works, substation construction, transmission line civil works',
    'Suspension footbridges for hill communities',
  ],

  process: [
    {
      id: 'survey',
      step: '01',
      title: 'Survey, Study & Community Consultation',
      description:
        'Topographic survey, soil and hydrological study, traffic counts where relevant. For projects in inhabited areas, we hold ward-level consultations early — alignment, access during construction, land issues.',
    },
    {
      id: 'design',
      step: '02',
      title: 'Detailed Design & Approvals',
      description:
        'Engineering design coordinated with the client department. Where law requires, we complete Initial Environmental Examination or full EIA, and obtain forestry, land, and utility clearances.',
    },
    {
      id: 'build',
      step: '03',
      title: 'Monsoon-Aware Construction Sequencing',
      description:
        'We plan critical works — bridge piers, drainage inverts, pavement layers — into the dry window. Diversions and traffic management keep daily life moving while we work.',
    },
    {
      id: 'handover',
      step: '04',
      title: 'Commissioning, Handover & Defects Liability',
      description:
        'Final survey, load tests where applicable, joint inspection with the client department. Defects liability period honoured. We hand over a simple-language community brief on what\'s been built and who to call if something breaks.',
    },
  ],

  communityImpact: {
    label: 'LOCAL IMPACT',
    headline: 'Infrastructure that opens up everyday life',
    description:
      'Infrastructure is where the community impact is most direct. A drain that doesn\'t overflow into the bazaar in Sawan. A bridge that lets children in a Morang village reach their school through the rainy season. A water supply line that reaches households that used to walk to a tap. Across our infrastructure projects, we\'ve built work that opened access to schools and health posts for thousands of households, brought drinking water and irrigation to communities across the East, and provided steady wage work to local labour during construction.',
    image: '/images/projects/project-1.jpg',
    imageAlt: 'KNSEWA infrastructure project connecting communities in Eastern Nepal',
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
      id: 'industrial',
      title: 'Industrial Facilities',
      description:
        'Purpose-built factories, warehouses, and logistics facilities for the Sunsari–Morang industrial corridor and beyond.',
      image: '/images/services/industrial.jpg',
      href: '/services/industrial',
    },
  ],

  faq: [
    {
      question: 'What types of infrastructure projects does KNSEWA specialise in?',
      answer: 'We deliver roads, bridges, drinking water supply systems, sewerage treatment plants, hydropower infrastructure, and irrigation projects across Nepal\'s diverse terrain.',
    },
    {
      question: 'How does KNSEWA manage construction during Nepal\'s monsoon season?',
      answer: 'Our teams are trained in monsoon-aware construction planning. We schedule earthworks and foundation work outside peak monsoon months and use drainage systems and protective sheeting to minimise delays.',
    },
    {
      question: 'Can KNSEWA deliver infrastructure projects in remote or hilly areas?',
      answer: 'Yes. We have extensive experience working in Nepal\'s hilly and mountain regions, managing logistics, access roads, and local labour coordination for remote infrastructure projects.',
    },
    {
      question: 'How do you ensure the quality of water supply and sewerage projects?',
      answer: 'All water and sewerage projects are designed and tested to Nepal Drinking Water Quality Standards. We commission each system with full testing before handover to the client or local authority.',
    },
  ],

  cta: {
    label: 'INFRASTRUCTURE ENQUIRY',
    headline: 'Planning a road, bridge, water, or energy project?',
    description:
      'Whether you\'re a federal department, a provincial agency, or a local body — share the project brief and we\'ll respond with our experience on similar work and a pre-bid view.',
    primaryCTA: {
      text: 'Project Enquiry',
      href: '/contact',
    },
    secondaryCTA: {
      text: 'Explore Our Projects',
      href: '/projects',
    },
  },
};
