import type { Metadata } from 'next';
import { getAboutPage } from '@/data/adapters/content.adapter';

export const metadata: Metadata = {
  title: 'About Us | Khushbu Nirman Sewa Pvt Ltd',
  description: 'Khushbu Nirman Sewa Pvt Ltd — 30 years of excellence in Nepal\'s construction industry. Founded 1995 in Biratnagar, delivering buildings, roads, bridges, water supply, and energy projects across all 7 provinces.',
  keywords: ['about knsewa', 'khushbu nirman sewa', 'nepal construction company', 'biratnagar contractor', 'construction company nepal', 'infrastructure nepal'],
  alternates: { canonical: '/about/' },
  openGraph: {
    title: 'About Us | Khushbu Nirman Sewa Pvt Ltd',
    description: '30 years of construction excellence across all 7 provinces of Nepal. Government recognised, 500+ projects, 1,000+ team members.',
    images: [{ url: '/images/team-construction.jpg', width: 1200, height: 630, alt: 'KNSEWA construction team at work' }],
  },
};
import { AboutHero } from '@/components/sections/about/AboutHero';
import { AboutStorySection } from '@/components/sections/about/AboutStorySection';
import { AboutValuesSection } from '@/components/sections/about/AboutValuesSection';
import { AboutMilestonesSection } from '@/components/sections/about/AboutMilestonesSection';
import { AboutTeamSection } from '@/components/sections/about/AboutTeamSection';
import { CultureSection } from '@/components/sections/CultureSection';
import { CTASection } from '@/components/sections/CTASection';
import { JsonLd } from '@/components/ui/JsonLd';

export default function AboutPage() {
  const content = getAboutPage();

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://knsewa.com/about/",
    "url": "https://knsewa.com/about/",
    "name": "About Khushbu Nirman Sewa",
    "description": "30 years of excellence in Nepal's construction industry. Founded 1995 in Biratnagar, delivering buildings, roads, bridges, water supply, and energy projects across all 7 provinces.",
    "about": {
      "@type": "Organization",
      "@id": "https://knsewa.com/#organization",
      "foundingDate": "1995",
      "foundingLocation": "Biratnagar, Morang, Nepal",
      "numberOfEmployees": { "@type": "QuantitativeValue", "value": 1000 },
      "award": [
        "Letter of Appreciation from Prime Minister KP Sharma Oli (2020) — Patan Secondary School, Lalitpur",
        "Recognition from Nepal Electricity Authority — Hetauda-Dhalkebar-Inaruwa 400KV Transmission Line",
      ],
      "member": content.team.members.map((m) => ({
        "@type": "Person",
        "name": m.name,
        "jobTitle": m.role,
        "image": `https://knsewa.com${m.image}`,
        "worksFor": { "@id": "https://knsewa.com/#organization" },
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://knsewa.com/" },
      { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://knsewa.com/about/" },
    ],
  };

  const faqSchema = content.faq && content.faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": content.faq.map((item) => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": { "@type": "Answer", "text": item.answer },
        })),
      }
    : null;

  return (
    <>
      <JsonLd schema={aboutSchema} />
      <JsonLd schema={breadcrumbSchema} />
      {faqSchema && <JsonLd schema={faqSchema} />}
      <AboutHero content={content.hero} stats={content.stats} />
      <AboutStorySection content={content.introduction} />
      <AboutValuesSection
        label={content.values.label}
        headline={content.values.headline}
        values={content.values.items}
      />
      <AboutMilestonesSection
        label={content.timeline.label}
        headline={content.timeline.headline}
        items={content.timeline.items}
      />
      <AboutTeamSection
        label={content.team.label}
        headline={content.team.headline}
        members={content.team.members}
      />
      <CultureSection commitments={content.culture} />
      <CTASection content={content.cta} />
    </>
  );
}
