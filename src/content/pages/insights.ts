import type { InsightsPageContent, NewsArticle } from '@/types/content';

export const insightsArticles: NewsArticle[] = [
  {
    id: 'award-pm-oli',
    title: 'Honored by Former Prime Minister KP Sharma Oli',
    excerpt:
      'Khushbu Nirman Sewa received a Letter of Appreciation and Token of Love from Former Prime Minister KP Sharma Oli for the successful completion of Patan Secondary School.',
    category: 'Awards',
    image: '/images/awards/patan-token-distribution.jpg',
    publishDate: '2024-01-15',
    slug: 'honored-by-former-pm-kp-sharma-oli',
  },
  {
    id: 'award-patan-school',
    title: 'Letter of Appreciation from Patan Secondary School & JICA',
    excerpt:
      'Recognized for outstanding construction quality and timely delivery of the Patan Secondary School project, funded by JICA.',
    category: 'Awards',
    image: '/images/awards/award-patan-school-1.jpg',
    publishDate: '2024-01-10',
    slug: 'appreciation-patan-secondary-school-jica',
  },
  {
    id: 'award-best-2076',
    title: 'Best Construction Company Award 2076',
    excerpt:
      'Awarded the Class "C" FCAN Excellence Award for Best Construction Company in 2076 BS, recognizing our commitment to quality and professional standards.',
    category: 'Awards',
    image: '/images/awards/best-construction-company-award-2076.jpg',
    publishDate: '2023-12-20',
    slug: 'best-construction-company-award-2076',
  },
  {
    id: 'award-fcan-2076',
    title: 'FCAN Bronze Excellence Award 2076',
    excerpt:
      'Received the Bronze FCAN Excellence Award, Class "C" in 2076 BS for demonstrated excellence in construction practices across Nepal.',
    category: 'Awards',
    image: '/images/awards/fcan-award-2076.jpg',
    publishDate: '2023-11-15',
    slug: 'fcan-bronze-excellence-award-2076',
  },
  {
    id: 'award-fcan-2072',
    title: 'FCAN Bronze Excellence Award 2072',
    excerpt:
      'Recognized with the Bronze FCAN Excellence Award, Class "C" in 2072 BS — a testament to our growing reputation for construction excellence.',
    category: 'Awards',
    image: '/images/awards/fcan-award-2072.jpg',
    publishDate: '2023-10-05',
    slug: 'fcan-bronze-excellence-award-2072',
  },
  {
    id: 'award-member-elected',
    title: 'Elected Member of FCAN Executive Committee 2079',
    excerpt:
      'Khushbu Nirman Sewa was elected to the FCAN Executive Committee in 2079 BS, strengthening our voice in Nepal\'s construction industry leadership.',
    category: 'Awards',
    image: '/images/awards/member-elected-2079.png',
    publishDate: '2023-09-01',
    slug: 'fcan-executive-member-elected-2079',
  },
  {
    id: 'award-manmohan',
    title: 'Token of Love from Manmohan Memorial Polytechnic',
    excerpt:
      'Received a Token of Love from Manmohan Memorial Polytechnic, Budhiganga-4, Morang for our contribution to educational infrastructure development.',
    category: 'Awards',
    image: '/images/awards/token-of-love-manmohan-meomorial.jpg',
    publishDate: '2023-08-10',
    slug: 'token-of-love-manmohan-memorial-polytechnic',
  },
  {
    id: 'award-member-certificate',
    title: 'FCAN Membership & Industry Recognition',
    excerpt:
      'Official membership certification from the Federation of Contractors\' Associations of Nepal, affirming our standing in the national construction sector.',
    category: 'Awards',
    image: '/images/awards/member-certificate.jpg',
    publishDate: '2023-07-20',
    slug: 'fcan-membership-industry-recognition',
  },
  {
    id: 'news-infrastructure-project',
    title: 'Kathmandu Valley Infrastructure Development Project Breaks Ground',
    excerpt:
      'A major milestone as we begin construction on one of the largest infrastructure projects in the valley, connecting communities across the region.',
    category: 'News',
    image: '/images/projects/project-1.jpg',
    publishDate: '2024-01-15',
    slug: 'kathmandu-valley-infrastructure-project',
  },
  {
    id: 'news-sustainable-building',
    title: 'Sustainable Building Practices in Nepal',
    excerpt:
      'How we are incorporating eco-friendly materials and methods in our construction projects to minimize environmental impact.',
    category: 'Sustainability',
    image: '/images/projects/project-2.jpg',
    publishDate: '2024-01-10',
    slug: 'sustainable-building-practices',
  },
  {
    id: 'news-community-development',
    title: 'Community Development Through Construction',
    excerpt:
      'Building schools and healthcare facilities in rural Nepal — our commitment to giving back to the communities we serve.',
    category: 'Community',
    image: '/images/projects/project-1.jpg',
    publishDate: '2023-12-28',
    slug: 'community-development',
  },
  {
    id: 'news-safety-protocols',
    title: 'New Safety Protocols for Construction Sites',
    excerpt:
      'Implementing world-class safety standards across all our project sites, ensuring zero-harm operations for every worker.',
    category: 'Safety',
    image: '/images/projects/project-3.jpg',
    publishDate: '2024-01-05',
    slug: 'new-safety-protocols',
  },
];

export const insightsPageContent: InsightsPageContent = {
  seo: {
    title: 'News & Insights | Khushbu Nirman Sewa',
    description:
      'Latest news, awards, and insights from Khushbu Nirman Sewa — Nepal\'s trusted construction partner for over 30 years.',
    keywords: [
      'knsewa news',
      'construction awards nepal',
      'FCAN award',
      'nepal construction insights',
      'khushbu nirman sewa awards',
    ],
  },

  hero: {
    label: 'NEWS & INSIGHTS',
    headline: 'Awards, News & Industry Insights',
    description:
      'Stay updated with our latest achievements, project milestones, and perspectives on Nepal\'s construction landscape.',
    backgroundImage: '/images/banners/awards-banner.jpg',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Insights' },
    ],
  },

  stats: [
    { value: '30', label: 'Years of Excellence', suffix: '+' },
    { value: '500', label: 'Projects Completed', suffix: '+' },
    { value: '20', label: 'Awards & Recognition', suffix: '+' },
    { value: '7', label: 'Provinces Served', suffix: '' },
  ],

  listing: {
    label: 'LATEST',
    headline: 'All Insights',
    categories: ['All', 'Awards', 'News', 'Sustainability', 'Safety', 'Community'],
  },

  cta: {
    label: 'Get In Touch',
    headline: 'Have a Project in Mind?',
    description:
      'From initial consultation to final handover, our team is ready to bring your vision to life with precision, quality, and commitment.',
    primaryCTA: {
      text: 'Contact Us',
      href: '/contact',
    },
    secondaryCTA: {
      text: 'View Projects',
      href: '/projects',
    },
  },
};
