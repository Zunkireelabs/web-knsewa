import type { ServiceDetailContent } from '@/types/content';

export const commercialServiceContent: ServiceDetailContent = {
  seo: {
    title: 'Commercial Construction | Khushbu Nirman Sewa',
    description:
      'KNSEWA delivers commercial buildings built for daily use and long lifespans — offices, retail complexes, hotels, and mixed-use developments across Biratnagar and Nepal.',
    keywords: [
      'commercial construction nepal',
      'office building contractor biratnagar',
      'retail construction nepal',
      'commercial building morang',
      'rcc frame construction biratnagar',
    ],
  },

  hero: {
    label: 'COMMERCIAL CONSTRUCTION',
    headline: 'Commercial Buildings That Earn Their Keep',
    description:
      'From office headquarters in Biratnagar to retail and mixed-use developments across Nepal — we deliver commercial spaces built for daily use, long lifespans, and the realities of doing business here.',
    backgroundImage: '/images/services/commercial.jpg',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'Commercial Construction' },
    ],
  },

  overview: {
    label: 'WHAT WE BUILD',
    headline: 'Built for the people who use them every day',
    description:
      'For 30 years, businesses have come to Khushbu Nirman Sewa when the building has to open on time, run efficiently, and still look the part a decade later. A commercial project isn\'t only a structure — it\'s a place where staff arrive every morning, customers walk in, deliveries roll up, and the lights have to stay on. We plan service routes, parking, loading, ventilation, and fire safety before the foundation is dug. We use earthquake-resistant RCC frame designs that meet Nepal\'s building code, and we specify finishes that hold up to actual foot traffic — not showroom photos. From the seven-storey Deerwalk Complex with double basement in Sifal, Kathmandu, to retail and office work across the Eastern region, we build commercial spaces that earn the trust of the people who run them.',
    image: '/images/projects/city-center-featured.jpg',
    imageAlt: 'Commercial construction project by KNSEWA',
    imagePosition: 'left',
    cta: {
      text: 'View Our Projects',
      href: '/projects',
    },
  },

  deliverablesIntro: 'Six core commercial offerings — from corporate headquarters to bank branch fit-outs.',

  deliverables: [
    'Corporate offices and headquarters',
    'Retail showrooms, shopping complexes, and mixed-use developments',
    'Hotels, banquet halls, and hospitality buildings',
    'Commercial high-rise (RCC frame, basement parking, lift cores)',
    'Branch offices for banks, finance, and insurance',
    'Fit-outs, renovations, and façade upgrades',
  ],

  process: [
    {
      id: 'brief',
      step: '01',
      title: 'Brief & Feasibility',
      description:
        'We sit with you to understand the business — operating hours, foot traffic, future expansion, budget. Then a feasibility check on the site: setbacks, soil, services, drainage, municipal compliance.',
    },
    {
      id: 'design',
      step: '02',
      title: 'Design Coordination',
      description:
        'We work with your architect (or bring one in) on structural, MEP, HVAC, and finishes. Everything is costed and value-engineered before drawings are frozen.',
    },
    {
      id: 'build',
      step: '03',
      title: 'Build with Weekly Transparency',
      description:
        'Site execution under a dedicated project manager. You get weekly progress photos, billing breakdowns, and a single point of contact. Safety audits at every stage.',
    },
    {
      id: 'handover',
      step: '04',
      title: 'Snag, Handover & Support',
      description:
        'Joint snag inspection before handover. Manuals, warranties, and as-built drawings handed over. We\'re on call for the first 12 months — and reachable after that.',
    },
  ],

  communityImpact: {
    label: 'LOCAL IMPACT',
    headline: 'Built by Biratnagar, for Biratnagar',
    description:
      'Most of our commercial projects in the East are built by people from the East. Carpenters, masons, electricians, plumbers — hired locally, paid on time, trained on safety on day one. A commercial building in Biratnagar means months of steady work for tradespeople from Morang and Sunsari, contracts for local material suppliers, and once it opens, jobs for the community. We track this, and we hire local first.',
    image: '/images/team-construction.jpg',
    imageAlt: 'KNSEWA construction team on site in Biratnagar',
    imagePosition: 'right',
  },

  relatedServices: [
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
      question: 'What types of commercial buildings does KNSEWA construct?',
      answer: 'KNSEWA builds offices, retail complexes, hotels, mixed-use developments, and educational institutions across Nepal. With 30 years of experience, we handle projects from design coordination through to handover.',
    },
    {
      question: 'How long does a commercial construction project take?',
      answer: 'Project timelines vary by scale. A standard commercial building typically takes 12–24 months from design to handover. We provide a detailed schedule at the brief and feasibility stage.',
    },
    {
      question: 'Does KNSEWA handle both design and construction?',
      answer: 'Yes. We coordinate with architects and engineers from the design stage and manage the full build process, ensuring your project is delivered on time and within budget.',
    },
    {
      question: 'Which areas of Nepal does KNSEWA serve for commercial projects?',
      answer: 'We serve all 7 provinces of Nepal. Our headquarters is in Biratnagar, Morang, and we have experience delivering commercial projects in Kathmandu, Pokhara, and across the eastern region.',
    },
  ],

  cta: {
    label: 'START A COMMERCIAL PROJECT',
    headline: 'Have a site, a brief, or just a question?',
    description:
      'Send us what you have — sketches, a location, or a few lines about what you\'re planning. Our estimating team will respond within one business day with a preliminary scope.',
    primaryCTA: {
      text: 'Get In Touch',
      href: '/contact',
    },
    secondaryCTA: {
      text: 'View Our Work',
      href: '/projects',
    },
  },
};
