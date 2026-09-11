// Site Settings
export interface SiteSettings {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
  // Additional office locations shown alongside the primary address (footer, contact panel).
  // The primary `address` above remains the one used in SEO/JSON-LD.
  additionalLocations?: { label: string; phone?: string }[];
  social: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
}

// SEO
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

// Navigation
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Mega Menu
export interface MegaMenuItem {
  label: string;
  href: string;
  description?: string;
}

export interface MegaMenuColumn {
  title: string;
  items: MegaMenuItem[];
}

export interface MegaMenuFeatured {
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface MegaMenuContent {
  columns: MegaMenuColumn[];
  featured?: MegaMenuFeatured;
}

// Hero Section
export interface HeroContent {
  headline: string;
  highlightedText: string;
  cta: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
  backgroundVideo?: string;
}

// Stats
export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

// Services
export interface Service {
  id: string;
  index: string;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  href: string;
}

// Projects
export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  clientType: 'government' | 'commercial' | 'institutional';
  client?: string;
  description?: string;
  location: string;
  scope: string;
  status?: 'completed' | 'running';
  completionPercentage?: number;
  contractValue?: string;
  year?: string;
  highlights: string[];
  faq?: FAQItem[];
  images: {
    thumbnail: string;
    featured: string;
    gallery: string[];
  };
  seo: SEOData;
}

// Locations / Coverage
export interface Location {
  id: string;
  slug: string;
  name: string;
  region: string;
  description: string;
  image: string;
  isHeadquarters?: boolean;
  seo: SEOData;
}

// Blog / Insights / News
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishDate: string;
  author: string;
  category: string;
  image: string;
  seo: SEOData;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  publishDate: string;
  slug: string;
  faq?: FAQItem[];
}

// CTA Section
export interface CTAContent {
  label: string;
  headline: string;
  description: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}

// CTA Popup Card
export interface CTAPopupCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  image: string;
  cta: {
    text: string;
    href: string;
  };
}

// Culture Commitment
export interface CultureCommitment {
  id: string;
  title: string;
  description: string;
  image: string;
  stats?: {
    value: string;
    label: string;
  };
}

// Specialization
export interface Specialization {
  id: string;
  title: string;
  tagline: string;
  description: string;
  bullets?: string[];
  image: string;
  href: string;
}

// Two Column Section (Image + Text)
export interface TwoColumnContent {
  label: string;
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  cta?: {
    text: string;
    href: string;
  };
  secondaryLink?: {
    text: string;
    href: string;
  };
  imagePosition?: 'left' | 'right';
}

// Breadcrumb
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// Page Hero (Inner Pages)
export interface PageHeroContent {
  label: string;
  headline: string;
  description?: string;
  backgroundImage: string;
  breadcrumbs: BreadcrumbItem[];
}

// Section Header (Reusable)
export interface SectionHeaderContent {
  label?: string;
  headline: string;
  description?: string;
}

// Team Member
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

// Timeline Item
export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  image?: string;
}

// Value Item (Mission & Values)
export interface ValueItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

// Service Category (Services Landing)
export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

// Capability (Services Landing)
export interface Capability {
  id: string;
  icon: string;
  title: string;
  description: string;
  href: string;
}

// Province (Coverage)
export interface Province {
  id: string;
  name: string;
  slug: string;
  projectCount: number;
  description: string;
  locations: string[];
}

// Office Location (Contact)
export interface OfficeLocation {
  id: string;
  name: string;
  address: string;
  phone?: string;
  email: string;
  hours?: string;
  mapUrl?: string;
  mapEmbedUrl?: string;
  isHeadquarters?: boolean;
}

// FAQ
export interface FAQItem {
  question: string;
  answer: string;
}

// Service Detail
export interface ServiceDetailContent {
  seo: SEOData;
  hero: PageHeroContent;
  overview: TwoColumnContent;
  deliverables?: string[];
  deliverablesIntro?: string;
  process: ProcessStep[];
  communityImpact?: TwoColumnContent;
  relatedServices: ServiceCategory[];
  cta: CTAContent;
  faq?: FAQItem[];
}

// Process Step
export interface ProcessStep {
  id: string;
  step: string;
  title: string;
  description: string;
}

// Projects Page Content
export interface ProjectsPageContent {
  seo: SEOData;
  hero: PageHeroContent;
  stats: Stat[];
  categories: string[];
  projects: Project[];
  cta: CTAContent;
}

// About Page Content
export interface AboutPageContent {
  seo: SEOData;
  hero: PageHeroContent;
  introduction: TwoColumnContent;
  stats: Stat[];
  values: {
    label: string;
    headline: string;
    items: ValueItem[];
  };
  timeline: {
    label: string;
    headline: string;
    items: TimelineItem[];
  };
  team: {
    label: string;
    headline: string;
    members: TeamMember[];
  };
  culture: CultureCommitment[];
  faq?: FAQItem[];
  cta: CTAContent;
}

// Services Page Content
export interface ServicesPageContent {
  seo: SEOData;
  hero: PageHeroContent;
  philosophy: {
    quote: string;
    description: string;
  };
  specializations: Specialization[];
  categories: {
    label: string;
    headline: string;
    items: ServiceCategory[];
  };
  approach: {
    label: string;
    headline: string;
    steps: ProcessStep[];
  };
  capabilities: {
    label: string;
    headline: string;
    items: Capability[];
  };
  stats: Stat[];
  cta: CTAContent;
}

// Contact Page Content
export interface ContactPageContent {
  seo: SEOData;
  hero: PageHeroContent;
  info: {
    label: string;
    headline: string;
    description: string;
  };
  form: {
    label: string;
    headline: string;
    description: string;
    projectTypes: string[];
  };
  offices: OfficeLocation[];
  cta: CTAContent;
}

// Coverage Page Content
export interface CoveragePageContent {
  seo: SEOData;
  hero: PageHeroContent;
  overview: TwoColumnContent;
  provinces: {
    label: string;
    headline: string;
    items: Province[];
  };
  stats: Stat[];
  cta: CTAContent;
}

// Insights Page Content
export interface InsightsPageContent {
  seo: SEOData;
  hero: PageHeroContent;
  stats: Stat[];
  listing: {
    label: string;
    headline: string;
    categories: string[];
  };
  cta: CTAContent;
}

// Safety Page Content
export interface SafetyPageContent {
  seo: SEOData;
  hero: PageHeroContent;
  introduction: TwoColumnContent;
  values: {
    label: string;
    headline: string;
    items: ValueItem[];
  };
  stats: Stat[];
  cta: CTAContent;
}

// Sustainability Page Content
export interface SustainabilityPageContent {
  seo: SEOData;
  hero: PageHeroContent;
  introduction: TwoColumnContent;
  values: {
    label: string;
    headline: string;
    items: ValueItem[];
  };
  stats: Stat[];
  cta: CTAContent;
}

// Home Page Content
export interface HomePageContent {
  seo: SEOData;
  hero: HeroContent;
  ctaPopup: CTAPopupCard[];
  stats: Stat[];
  news: NewsArticle[];
  services: {
    headline: string;
    description: string;
    items: Service[];
  };
  featuredProjects: {
    headline: string;
    categories: string[];
    projects: Project[];
  };
  coverage: TwoColumnContent;
  culture: CultureCommitment[];
  specializations: Specialization[];
  whyChooseUs: TwoColumnContent;
  cta: CTAContent;
}
