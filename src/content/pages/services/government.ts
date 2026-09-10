import type { ServiceDetailContent } from '@/types/content';

export const governmentServiceContent: ServiceDetailContent = {
  seo: {
    title: 'Government & Institutional Construction | Khushbu Nirman Sewa',
    description:
      'KNSEWA delivers schools, hospitals, administrative buildings, and public infrastructure for federal, provincial, and local governments across all seven provinces of Nepal.',
    keywords: [
      'government construction nepal',
      'institutional building contractor',
      'school construction nepal',
      'hospital construction biratnagar',
      'public infrastructure contractor nepal',
    ],
  },

  hero: {
    label: 'GOVERNMENT & INSTITUTIONAL',
    headline: 'Public Work, Public Trust',
    description:
      'Schools, hospitals, administrative buildings, and public infrastructure — delivered for federal, provincial, and local governments across all seven provinces of Nepal.',
    backgroundImage: '/images/services/government.jpg',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'Government & Institutional' },
    ],
  },

  overview: {
    label: 'WHAT WE BUILD',
    headline: 'A contractor that knows the procurement process — and respects it',
    description:
      'A government project is judged twice — once by the engineer who inspects it, and again by the families who use it for the next forty years. We build for both. Government projects don\'t reward shortcuts. They reward contractors who price honestly, document carefully, follow specs, and finish on the schedule they committed to. That\'s the work we\'ve done for the past 30 years. We hold the registration and bonding to bid on federal and provincial tenders, our quality control documentation has cleared technical audits across seven provinces, and we have direct experience with the kind of community coordination that institutional projects in Nepal require — from district consultations to ward-level handovers. The Patan Secondary School at Patandhoka, Lalitpur — for which we received a Letter of Appreciation from Former PM KP Sharma Oli — is one example of how we treat public work.',
    image: '/images/projects/hospital-featured.jpg',
    imageAlt: 'Government institutional construction project by KNSEWA',
    imagePosition: 'left',
    cta: {
      text: 'View Our Projects',
      href: '/projects',
    },
  },

  deliverablesIntro: 'Six core public-sector offerings — from government schools to earthquake-resistant reconstruction.',

  deliverables: [
    'Government schools, secondary and higher secondary',
    'Hospitals and primary health care centres',
    'Provincial and federal administrative buildings',
    'Police, security, and judicial infrastructure',
    'Public auditoriums, libraries, and community halls',
    'Earthquake-resistant retrofits and reconstruction',
  ],

  process: [
    {
      id: 'tender',
      step: '01',
      title: 'Tender & Pre-bid Review',
      description:
        'We study the BOQ and specs in detail, raise pre-bid clarifications where it matters, and submit a bid that holds up under scrutiny — no underquoting to win, then change-ordering to survive.',
    },
    {
      id: 'mobilisation',
      step: '02',
      title: 'Mobilisation & Stakeholder Coordination',
      description:
        'Once awarded, we mobilise quickly. We coordinate with the client engineer, the district administration, the ward office, and the user community before the first shovel.',
    },
    {
      id: 'build',
      step: '03',
      title: 'Build to Spec, Document Everything',
      description:
        'We work to the approved specification. Every material test, every concrete pour log, every measurement book entry is documented and counter-signed.',
    },
    {
      id: 'handover',
      step: '04',
      title: 'Handover, Training & Defects Liability',
      description:
        'Joint final inspection. As-built drawings, O&M manuals, and basic operator training for the user. Defects liability period honoured fully.',
    },
  ],

  communityImpact: {
    label: 'LOCAL IMPACT',
    headline: 'Public buildings that serve for generations',
    description:
      'When a government school or PHC in Morang opens on time and well-built, the impact is direct: students don\'t lose a year, mothers don\'t travel three hours to reach a doctor, ward staff have a real office. Our work on public-sector schools, health posts, and government buildings has put functional public infrastructure into communities across Eastern Nepal — and the same project also puts paid work into the hands of local masons, carpenters, and labourers, often for 18–24 months at a stretch.',
    image: '/images/projects/project-3.jpg',
    imageAlt: 'KNSEWA public infrastructure project serving the community',
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
      question: 'How does KNSEWA handle government tender processes?',
      answer: 'We have 30 years of experience working within Nepal\'s public procurement framework. Our team manages the full tender process including documentation, compliance checks, and submission on your behalf.',
    },
    {
      question: 'What government projects has KNSEWA completed?',
      answer: 'KNSEWA has completed schools, hospitals, administrative buildings, and public infrastructure across Nepal\'s 7 provinces, working with municipalities, district offices, and federal government bodies.',
    },
    {
      question: 'How do you ensure compliance with government construction standards?',
      answer: 'All our government projects comply with Nepal\'s National Building Code and relevant IS/NBC standards. We maintain detailed documentation throughout the build and provide full handover reports.',
    },
    {
      question: 'Can KNSEWA work with international development funding (World Bank, ADB)?',
      answer: 'Yes. We have experience working on projects funded by international development organisations and are familiar with their procurement and reporting requirements.',
    },
  ],

  cta: {
    label: 'TENDER OR PROCUREMENT ENQUIRY',
    headline: 'Working on a tender or a public project?',
    description:
      'Share the tender notice, RFP, or project brief — our pre-bid team will review and respond. We bid honestly and we deliver what we sign for.',
    primaryCTA: {
      text: 'Pre-Bid Enquiry',
      href: '/contact',
    },
    secondaryCTA: {
      text: 'Call 021-503204',
      href: 'tel:021-503204',
    },
  },
};
