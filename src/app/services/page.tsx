import type { Metadata } from 'next';
import { getServicesPage } from '@/data/adapters/content.adapter';
import { JsonLd } from '@/components/ui/JsonLd';

export const metadata: Metadata = {
  title: 'Our Services | Khushbu Nirman Sewa Pvt Ltd',
  description: 'Construction services across Nepal — buildings, roads, bridges, water supply, irrigation, airports, and energy infrastructure. 30 years of expertise.',
  keywords: ['construction services nepal', 'building contractor biratnagar', 'infrastructure development nepal', 'government construction projects', 'commercial construction nepal'],
  alternates: { canonical: '/services/' },
  openGraph: {
    title: 'Construction Services | Khushbu Nirman Sewa',
    description: 'Full-spectrum construction services: commercial buildings, government projects, roads, bridges, water supply, irrigation, airports, and energy — across all 7 provinces.',
    images: [{ url: '/images/services/banner.jpg', width: 1200, height: 630, alt: 'KNSEWA construction services' }],
  },
};
import { ServicesHero } from '@/components/sections/services/ServicesHero';
import { ServicesPhilosophy } from '@/components/sections/services/ServicesPhilosophy';
import { ServiceAccordion } from '@/components/sections/services/ServiceAccordion';
import { SpecializationsGrid } from '@/components/sections/services/SpecializationsGrid';
import { ApproachSection } from '@/components/sections/services/ApproachSection';
import { CapabilitiesGrid } from '@/components/sections/services/CapabilitiesGrid';
import { CTASection } from '@/components/sections/CTASection';

export default function ServicesPage() {
  const content = getServicesPage();

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "KNSEWA Construction Services",
    "description": "Full-spectrum construction services across all 7 provinces of Nepal.",
    "url": "https://knsewa.com/services/",
    "itemListElement": content.categories.items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.title,
      "url": `https://knsewa.com${item.href}/`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://knsewa.com/" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://knsewa.com/services/" },
    ],
  };

  return (
    <>
      <JsonLd schema={servicesSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <ServicesHero content={content.hero} stats={content.stats} />
      <ServicesPhilosophy
        quote={content.philosophy.quote}
        description={content.philosophy.description}
      />
      <ServiceAccordion
        label={content.categories.label}
        headline={content.categories.headline}
        items={content.categories.items}
      />
      <SpecializationsGrid specializations={content.specializations} />
      <ApproachSection
        label={content.approach.label}
        headline={content.approach.headline}
        steps={content.approach.steps}
      />
      <CapabilitiesGrid
        label={content.capabilities.label}
        headline={content.capabilities.headline}
        items={content.capabilities.items}
      />
      <CTASection content={content.cta} />
    </>
  );
}
