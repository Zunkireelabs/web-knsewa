import { SiteSettings, NavItem } from '@/types/content';

export const siteSettings: SiteSettings = {
  name: 'Khushbu Nirman Sewa',
  tagline: 'Building Nepal\'s Future for 30 Years',
  phone: '021-503204',
  email: 'info@knsewa.com',
  address: {
    street: 'Biratnagar, Morang',
    city: 'Biratnagar',
    country: 'Nepal',
  },
  social: {
    facebook: 'https://facebook.com/khushbunirman.sewa.1',
  },
};

export const mainNavigation: NavItem[] = [
  {
    label: 'About Us',
    href: '/about',
  },
  {
    label: 'Services',
    href: '/services',
  },
  {
    label: 'Projects',
    href: '/projects',
  },
  {
    label: 'Insights',
    href: '/insights',
  },
];

export const footerNavigation: NavItem[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];
