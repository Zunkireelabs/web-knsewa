import type { ServicesPageContent } from '@/types/content';

export const servicesPageContent: ServicesPageContent = {
  seo: {
    title: 'Our Services | Khushbu Nirman Sewa',
    description:
      'Explore KNSEWA\'s comprehensive construction services — from commercial buildings and government infrastructure to water treatment, energy, and bridge construction across Nepal.',
    keywords: [
      'construction services nepal',
      'building contractor biratnagar',
      'infrastructure development nepal',
      'government construction projects',
      'commercial construction nepal',
    ],
  },

  hero: {
    label: 'OUR SERVICES',
    headline: 'Engineering Excellence, Delivered.',
    description:
      'We bring technical knowledge, decades of experience, and unwavering commitment to every project we undertake across Nepal.',
    backgroundImage: '/images/services/banner.jpg',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Services' },
    ],
  },

  philosophy: {
    quote:
      'We don\'t just build structures. We engineer solutions that transform communities and drive national progress.',
    description:
      'For over three decades, our approach has remained the same — listen deeply, plan meticulously, execute flawlessly. Every project, regardless of scale, receives the full weight of our expertise and the personal attention of our senior leadership team.',
  },

  categories: {
    label: 'WHAT WE DO',
    headline: 'Core Services',
    items: [
      {
        id: 'commercial',
        title: 'Commercial Construction',
        description:
          'From corporate headquarters to retail complexes, we deliver commercial spaces that combine functionality with architectural excellence. Our portfolio includes office buildings, shopping centers, hotels, and mixed-use developments that define Nepal\'s urban landscape.',
        image: '/images/services/commercial.jpg',
        href: '/services/commercial',
      },
      {
        id: 'government',
        title: 'Government & Institutional',
        description:
          'Trusted partner for government and institutional projects across all seven provinces. We have successfully delivered schools, hospitals, administrative buildings, and public infrastructure that serve communities and strengthen national development.',
        image: '/images/services/government.jpg',
        href: '/services/government',
      },
      {
        id: 'industrial',
        title: 'Industrial Facilities',
        description:
          'Purpose-built industrial facilities designed for efficiency, safety, and long-term operational excellence. We specialize in manufacturing plants, warehouses, processing facilities, and logistics centers tailored to your operational requirements.',
        image: '/images/services/industrial.jpg',
        href: '/services/industrial',
      },
      {
        id: 'infrastructure',
        title: 'Infrastructure Development',
        description:
          'Essential infrastructure that connects communities and drives economic growth. Our expertise spans roads, bridges, water systems, drainage networks, and urban development projects that form the backbone of Nepal\'s progress.',
        image: '/images/services/infrastructure.jpg',
        href: '/services/infrastructure',
      },
    ],
  },

  specializations: [
    {
      id: 'building',
      title: 'Building',
      tagline: 'Building the Future',
      description: 'We mold spaces that inspire, innovate, and endure.',
      bullets: ['Residential & commercial complexes', 'Institutional & government buildings', 'Earthquake-resistant structures'],
      image: '/images/services/service1.jpg',
      href: '/services/commercial',
    },
    {
      id: 'water-treatment',
      title: 'Water Treatment & Sanitation',
      tagline: 'Sanctuaries of Well-being',
      description: 'Elevating living conditions with advanced water treatment and sanitation systems.',
      bullets: ['Wastewater treatment plants', 'Sewerage & drainage systems', 'Community sanitation infrastructure'],
      image: '/images/services/service2.jpg',
      href: '/services/infrastructure',
    },
    {
      id: 'road-drain',
      title: 'Road and Drain',
      tagline: 'Pathways of Progress',
      description: 'Crafting roads and drains that lead societies towards advancement.',
      bullets: ['Urban & rural road construction', 'Stormwater drain networks', 'Pavement & bitumen works'],
      image: '/images/services/service3.jpg',
      href: '/services/infrastructure',
    },
    {
      id: 'airport',
      title: 'Airport',
      tagline: 'Taking Flight',
      description: 'Building gateways to possibilities with world-class airport construction.',
      bullets: ['Runway & apron construction', 'Terminal & hangar buildings', 'Taxiway & airfield works'],
      image: '/images/services/service4.jpg',
      href: '/services/infrastructure',
    },
    {
      id: 'irrigation',
      title: 'Irrigation',
      tagline: 'Nurturing Growth',
      description: 'Engineering irrigation solutions that nurture landscapes and livelihoods.',
      bullets: ['Canal & headworks construction', 'Distribution network systems', 'Agricultural water management'],
      image: '/images/services/service5.jpg',
      href: '/services/infrastructure',
    },
    {
      id: 'energy',
      title: 'Energy',
      tagline: 'Powering Progress',
      description: 'Energizing growth through cutting-edge energy infrastructure solutions.',
      bullets: ['Hydropower civil works', 'Substation construction', 'Rural electrification infrastructure'],
      image: '/images/services/service6.jpg',
      href: '/services/infrastructure',
    },
    {
      id: 'water-supply',
      title: 'Water Supply',
      tagline: 'Fluid Connections',
      description: 'Ensuring communities thrive with efficient water supply networks.',
      bullets: ['Distribution pipelines', 'Overhead reservoir construction', 'Intake & pump stations'],
      image: '/images/services/service-center.jpg',
      href: '/services/infrastructure',
    },
    {
      id: 'bridge-culvert',
      title: 'Bridge and Culvert',
      tagline: 'Bridges to Unity',
      description: 'Connecting hearts and places through engineered bridges and culverts.',
      bullets: ['RCC & steel bridges', 'Suspension footbridges', 'Box culverts & river crossings'],
      image: '/images/services/infrastructure.jpg',
      href: '/services/infrastructure',
    },
  ],

  approach: {
    label: 'OUR APPROACH',
    headline: 'How We Deliver',
    steps: [
      {
        id: 'consultation',
        step: '01',
        title: 'Consultation',
        description:
          'We begin with deep listening — understanding your vision, requirements, constraints, and timeline to craft a tailored project strategy.',
      },
      {
        id: 'planning',
        step: '02',
        title: 'Planning & Design',
        description:
          'Detailed engineering, cost estimation, and project scheduling. We plan every detail before breaking ground to minimize risk and maximize value.',
      },
      {
        id: 'construction',
        step: '03',
        title: 'Construction',
        description:
          'Expert execution with rigorous quality control, safety protocols, and transparent progress reporting at every milestone.',
      },
      {
        id: 'delivery',
        step: '04',
        title: 'Delivery',
        description:
          'On-time handover with comprehensive documentation, quality certification, and post-completion support to ensure lasting satisfaction.',
      },
    ],
  },

  capabilities: {
    label: 'OUR CAPABILITIES',
    headline: 'Technical Excellence',
    items: [
      {
        id: 'project-management',
        icon: 'project',
        title: 'Project Management',
        description:
          'End-to-end project oversight with dedicated managers, milestone tracking, and stakeholder communication throughout the lifecycle.',
        href: '/services#project-management',
      },
      {
        id: 'quality-assurance',
        icon: 'quality',
        title: 'Quality Assurance',
        description:
          'Multi-stage quality control processes, material testing, and compliance verification that exceed industry standards.',
        href: '/services#quality-assurance',
      },
      {
        id: 'safety-compliance',
        icon: 'safety',
        title: 'Safety Compliance',
        description:
          'Zero-compromise safety culture with comprehensive training, site protocols, and a 99.9% safety record across all projects.',
        href: '/services#safety-compliance',
      },
      {
        id: 'environmental',
        icon: 'sustainability',
        title: 'Environmental Management',
        description:
          'Sustainable construction practices, waste reduction, and environmental impact assessment integrated into every project.',
        href: '/services#environmental',
      },
      {
        id: 'cost-engineering',
        icon: 'cost',
        title: 'Cost Engineering',
        description:
          'Precise budgeting, value engineering, and cost optimization to deliver maximum value within your financial framework.',
        href: '/services#cost-engineering',
      },
      {
        id: 'technical-consultation',
        icon: 'innovation',
        title: 'Technical Consultation',
        description:
          'Expert advisory services covering feasibility studies, structural analysis, and modern construction technology adoption.',
        href: '/services#technical-consultation',
      },
    ],
  },

  stats: [
    { value: '30', label: 'Years of Excellence', suffix: '+' },
    { value: '500', label: 'Projects Completed', suffix: '+' },
    { value: '7', label: 'Provinces Served', suffix: '' },
    { value: '8', label: 'Specializations', suffix: '' },
  ],

  cta: {
    label: 'Start Your Project',
    headline: 'Ready to Build Together?',
    description:
      'From initial consultation to final handover, our team is ready to bring your vision to life with precision, quality, and commitment.',
    primaryCTA: {
      text: 'Request Site Visit',
      href: '/contact',
    },
    secondaryCTA: {
      text: 'Request Quote',
      href: '/contact',
    },
  },
};
