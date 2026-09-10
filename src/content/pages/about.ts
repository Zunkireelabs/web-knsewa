import type { AboutPageContent } from '@/types/content';

export const aboutPageContent: AboutPageContent = {
  seo: {
    title: 'About Us | Khushbu Nirman Sewa Pvt Ltd',
    description:
      'Khushbu Nirman Sewa Pvt Ltd — 30 years of excellence in Nepal\'s construction industry. Based in Biratnagar, delivering buildings, roads, bridges, water supply, and energy projects across all 7 provinces.',
    keywords: [
      'about knsewa',
      'khushbu nirman sewa',
      'nepal construction company',
      'biratnagar contractor',
      'construction company nepal',
      'infrastructure nepal',
    ],
  },

  hero: {
    label: 'ABOUT US',
    headline: '30 Years of Excellence in Construction',
    description:
      'We\'re not just constructing structures — we\'re creating a better world. Committed to excellence, with a simple mission: to serve our clients, empower our employees, and enhance our communities.',
    backgroundImage: '/images/team-construction.jpg',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'About Us' },
    ],
  },

  introduction: {
    label: 'Who We Are',
    headline: 'Architects of Excellence Since 1995',
    description:
      'Khushbu Nirman Sewa Pvt Ltd has been at the forefront of Nepal\'s construction industry for over three decades. From our headquarters in Biratnagar to landmark projects spanning all seven provinces, we deliver tailored, creative solutions across building construction, roads, bridges, irrigation, water supply, airports, and energy infrastructure. We partner with government institutions, private enterprises, and communities to deliver high-quality construction services that transform lives and drive economic growth.',
    image: '/images/coverage-nepal.jpg',
    imageAlt: 'Khushbu Nirman Sewa construction team at work',
    cta: {
      text: 'Our Services',
      href: '/services',
    },
    secondaryLink: {
      text: 'View Our Projects',
      href: '/projects',
    },
    imagePosition: 'left',
  },

  stats: [
    { value: '30', label: 'Years of Excellence', suffix: '+' },
    { value: '500', label: 'Projects Completed', suffix: '+' },
    { value: '7', label: 'Provinces Served', suffix: '' },
    { value: '1000', label: 'Team Members', suffix: '+' },
  ],

  values: {
    label: 'Our Values',
    headline: 'The Pillars That Define Us',
    items: [
      {
        id: 'excellence',
        icon: 'excellence',
        title: 'Excellence',
        description:
          'Elevating through experience — our skilled professionals consistently exceed expectations, delivering high-quality construction services with the highest standards in every detail.',
      },
      {
        id: 'integrity',
        icon: 'integrity',
        title: 'Integrity',
        description:
          'The foundation of our work. We uphold the highest ethical standards with transparency, accountability, and honest business practices that have earned trust for over 30 years.',
      },
      {
        id: 'safety',
        icon: 'safety',
        title: 'Safety',
        description:
          'Highly trained teams with current safety protocols. Zero-compromise safety culture across all project sites — every worker, every day, returns home safely.',
      },
      {
        id: 'innovation',
        icon: 'innovation',
        title: 'Innovation',
        description:
          'Redefining design and construction with modern methods and technologies that improve efficiency, reduce waste, and deliver better outcomes for our clients and communities.',
      },
      {
        id: 'community',
        icon: 'community',
        title: 'Collaboration',
        description:
          'Together, we build dreams. We prioritize people — clients, employees, and communities — through open communication, local employment, and skill development that creates lasting value.',
      },
      {
        id: 'sustainability',
        icon: 'sustainability',
        title: 'Sustainability',
        description:
          'Shaping greener tomorrows. Environmental responsibility in every project through sustainable building practices and efficient resource utilization for future generations.',
      },
    ],
  },

  timeline: {
    label: 'Our Journey',
    headline: 'A Legacy Built on Trust',
    items: [
      {
        year: '1995',
        title: 'Company Founded',
        description:
          'Khushbu Nirman Sewa Pvt Ltd was established in Biratnagar, Morang — beginning with residential and commercial construction projects in eastern Nepal.',
      },
      {
        year: '2000',
        title: 'First Government Contract',
        description:
          'Awarded our first major government infrastructure contract, beginning a long-standing partnership with public institutions across Nepal.',
      },
      {
        year: '2005',
        title: 'Expanded to Kathmandu Valley',
        description:
          'Took on institutional projects in the capital region, including the Deerwalk Complex in Sifal, Kathmandu — a Basement + G + 4 educational building.',
      },
      {
        year: '2010',
        title: 'Infrastructure Diversification',
        description:
          'Expanded into large-scale infrastructure — roads, bridges, water supply systems, irrigation, and energy projects serving rural and urban communities.',
      },
      {
        year: '2015',
        title: 'Major Energy Projects',
        description:
          'Partnered with Nepal Electricity Authority on the Hetauda-Dhalkebar-Inaruwa 400KV transmission line project, earning recognition for exceptional management.',
      },
      {
        year: '2020',
        title: 'National Recognition',
        description:
          'Received a Letter of Appreciation from Former PM KP Sharma Oli for the completion of Patan Secondary School at Patandhoka, Lalitpur District.',
      },
      {
        year: '2025',
        title: 'All 7 Provinces',
        description:
          'Operations now span all seven provinces of Nepal with over 500 completed projects — from hospitals and schools to bridges, airports, and water treatment plants.',
      },
    ],
  },

  team: {
    label: 'Our Leadership',
    headline: 'The People Behind Our Success',
    members: [
      {
        id: 'md',
        name: 'Mr. Dipak Poudel',
        role: 'Managing Director',
        image: '/images/team/Dipak_Poudel.jpg',
      },
      {
        id: 'director',
        name: 'Mr. Dushyanta Kumar Poudel',
        role: 'Director',
        image: '/images/team/Dushyanta_Kr_Poudel.jpg',
      },
      {
        id: 'project-coordinator',
        name: 'Mr. Durga Bahadur Basnet',
        role: 'Project Coordinator',
        image: '/images/team/Durga_Bd_Basnet.jpg',
      },
      {
        id: 'chief-accountant',
        name: 'Mr. Sanjiv Bista',
        role: 'Chief Accountant',
        image: '/images/team/Sanjiv_Bista.jpg',
      },
      {
        id: 'project-manager',
        name: 'Er. Pratik Poudel',
        role: 'Project Manager',
        image: '/images/team/Pratik_Poudel.jpg',
      },
      {
        id: 'procurement-manager',
        name: 'Mr. Sandarbha Poudel',
        role: 'Procurement Manager',
        image: '/images/team/Sandarbha_Poudel.jpg',
      },
      {
        id: 'engineer-prabin',
        name: 'Er. Prabin Kumar Chaudhary',
        role: 'Civil Engineer',
        image: '/images/team/Prabin_Kr_Chaudhary.jpg',
      },
      {
        id: 'engineer-pukar',
        name: 'Er. Pukar Adhikari',
        role: 'Civil Engineer',
        image: '/images/team/Pukar_Adhikari.jpg',
      },
      {
        id: 'engineer-prabhat',
        name: 'Er. Prabhat Chaudhary',
        role: 'Civil Engineer',
        image: '/images/team/Prabhat_Chaudhary.jpg',
      },
      {
        id: 'engineer-ajay',
        name: 'Er. Ajay Kumar Chaudhary',
        role: 'Civil Engineer',
        image: '/images/team/Ajay_Kr_Chaudhary.jpg',
      },
      {
        id: 'engineer-amir',
        name: 'Er. Amir Kushma',
        role: 'Civil Engineer',
        image: '/images/team/Amir_kushma.jpg',
      },
      {
        id: 'sub-engineer-rabi',
        name: 'Rabi Kumar Yadav',
        role: 'Civil Sub-Engineer',
        image: '/images/team/Rabi _Kumar_Yadav.jpg',
      },
      {
        id: 'sub-engineer-ajay',
        name: 'Ajay Kumar Majhee',
        role: 'Civil Sub-Engineer',
        image: '/images/team/Ajay_kr_Majhee.jpg',
      },
      {
        id: 'sub-engineer-bhuwan',
        name: 'Bhuwan Biswash (Tharu)',
        role: 'Civil Sub-Engineer',
        image: '/images/team/Bhuwan_Bishwas.jpg',
      },
      {
        id: 'accountant-hari',
        name: 'Hari Prasad Khanal',
        role: 'Accountant',
        image: '/images/team/Hari_Prasad_Khanal.jpg',
      },
      {
        id: 'driver-subodh',
        name: 'Subodh Kumar Shrestha',
        role: 'Driver',
        image: '/images/team/Subhod_Kumar_Shrestha.jpg',
      },
    ],
  },

  culture: [
    {
      id: 'performance',
      title: 'Performance',
      description:
        'With years of experience, our skilled professionals consistently exceed expectations, delivering high-quality construction services across buildings, roads, bridges, irrigation, water supply, airports, and energy infrastructure.',
      image: '/images/commitments/safety-first.jpg',
      stats: {
        value: '500+',
        label: 'Projects delivered across Nepal',
      },
    },
    {
      id: 'leadership',
      title: 'Visionary Leadership',
      description:
        'Our leadership inspires innovation and collaboration across every project. We lead with transparency, integrity, and accountability — setting the standard for construction excellence in Nepal.',
      image: '/images/commitments/innovation-technology.jpg',
      stats: {
        value: '30+',
        label: 'Years of industry leadership',
      },
    },
    {
      id: 'relationships',
      title: 'People First',
      description:
        'We prioritize people — clients, employees, and communities. Through open communication and collaboration, we build lasting relationships and create local jobs that strengthen the communities we serve.',
      image: '/images/commitments/community-impact.jpg',
      stats: {
        value: '1,000+',
        label: 'Team members nationwide',
      },
    },
    {
      id: 'quality',
      title: 'Excellence in Every Detail',
      description:
        'Every project reflects our commitment to quality. From the Patan Secondary School recognized by government leadership to complex hospital and water treatment facilities, we deliver work that earns trust.',
      image: '/images/commitments/uncompromising-quality.jpg',
      stats: {
        value: '7',
        label: 'Provinces with active operations',
      },
    },
  ],

  faq: [
    {
      question: 'How long has Khushbu Nirman Sewa been in business?',
      answer: 'Khushbu Nirman Sewa Pvt Ltd was founded in 1995 in Biratnagar, Morang. With over 30 years of experience, we are one of Nepal\'s most established construction contractors.',
    },
    {
      question: 'Which areas of Nepal does KNSEWA serve?',
      answer: 'We serve all seven provinces of Nepal. Headquartered in Biratnagar, our operations span from eastern Nepal to the Kathmandu Valley and beyond, with 500+ completed projects nationwide.',
    },
    {
      question: 'What types of construction projects does KNSEWA handle?',
      answer: 'KNSEWA delivers a full range of construction services including commercial buildings, government and institutional facilities, roads and bridges, water supply systems, irrigation infrastructure, energy projects (including 400KV transmission lines), and airport construction.',
    },
    {
      question: 'Has KNSEWA received any government recognition?',
      answer: 'Yes. KNSEWA received a Letter of Appreciation from Former Prime Minister KP Sharma Oli for the successful completion of Patan Secondary School at Patandhoka, Lalitpur District in 2020. We also earned recognition from Nepal Electricity Authority for exceptional project management on the Hetauda-Dhalkebar-Inaruwa 400KV transmission line.',
    },
    {
      question: 'How large is the KNSEWA team?',
      answer: 'Our team comprises 1,000+ professionals including civil engineers, sub-engineers, project managers, accountants, and on-site workers — enabling us to run multiple large-scale projects simultaneously across Nepal.',
    },
  ],

  cta: {
    label: 'Start Your Project',
    headline: 'Ready to Build Together?',
    description:
      'Whether you\'re planning a government infrastructure project, commercial development, hospital, school, or industrial facility — our team of experienced professionals is ready to bring your vision to life.',
    primaryCTA: {
      text: 'Contact Us',
      href: '/contact',
    },
    secondaryCTA: {
      text: 'View Our Projects',
      href: '/projects',
    },
  },
};
