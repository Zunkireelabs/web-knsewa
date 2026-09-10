import type { ContactPageContent } from '@/types/content';

export const contactPageContent: ContactPageContent = {
  seo: {
    title: 'Contact Us | Khushbu Nirman Sewa Pvt Ltd',
    description:
      'Get in touch with Khushbu Nirman Sewa — Nepal\'s trusted construction partner for over 30 years. Headquartered in Biratnagar, Morang. Call 021-503204 or email info@knsewa.com.',
    keywords: [
      'contact knsewa',
      'khushbu nirman sewa contact',
      'biratnagar construction contact',
      'nepal construction contractor',
      'construction company biratnagar',
    ],
  },

  hero: {
    label: 'CONTACT US',
    headline: 'Let\'s Build Something Together',
    description:
      'Whether you\'re planning a government project, commercial development, or community infrastructure — our team is ready to listen, plan, and deliver.',
    backgroundImage: '/images/banners/about-banner.jpg',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Contact' },
    ],
  },

  info: {
    label: 'GET IN TOUCH',
    headline: 'How to Reach Us',
    description:
      'Reach out by phone, email, or visit us at our Biratnagar headquarters. Our team responds to every inquiry — typically within one business day.',
  },

  form: {
    label: 'SEND A MESSAGE',
    headline: 'Tell Us About Your Project',
    description:
      'Share a few details about your project and we\'ll get back to you with next steps. All fields marked with * are required.',
    projectTypes: [
      'Commercial Construction',
      'Government & Institutional',
      'Industrial Facility',
      'Infrastructure (Roads, Bridges, Drains)',
      'Water Supply & Treatment',
      'Energy & Transmission',
      'Other',
    ],
  },

  offices: [
    {
      id: 'biratnagar-hq',
      name: 'Khushbu Nirman Sewa Pvt Ltd — Headquarters',
      address: 'Biratnagar, Morang, Nepal',
      phone: '021-503204',
      email: 'info@knsewa.com',
      hours: 'Open 7 days a week (excluding major holidays)',
      mapUrl: 'https://goo.gl/maps/sg2w3MH4rkkGv8hNA',
      mapEmbedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3565.1!2d87.2718!3d26.4525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBiratnagar%2C%20Nepal!5e0!3m2!1sen!2snp!4v1700000000000',
      isHeadquarters: true,
    },
  ],

  cta: {
    label: 'Start Your Project',
    headline: 'Have Drawings or Specs Ready?',
    description:
      'Send them along with your inquiry — our estimating team can review and respond with a preliminary scope and timeline.',
    primaryCTA: {
      text: 'Email Us Directly',
      href: 'mailto:info@knsewa.com',
    },
    secondaryCTA: {
      text: 'Call 021-503204',
      href: 'tel:021-503204',
    },
  },
};
