import type { Metadata } from 'next';
import { getContactPage } from '@/data/adapters/content.adapter';
import { PageHero } from '@/components/sections/PageHero';
import { ContactInfoSection } from '@/components/sections/contact/ContactInfoSection';
import { ContactFormSection } from '@/components/sections/contact/ContactFormSection';
import { CTASection } from '@/components/sections/CTASection';
import { JsonLd } from '@/components/ui/JsonLd';

export function generateMetadata(): Metadata {
  const { seo } = getContactPage();
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: '/contact/' },
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: [{ url: '/images/hero-construction.jpg', width: 1200, height: 630, alt: 'Contact Khushbu Nirman Sewa' }],
    },
  };
}

export default function ContactPage() {
  const content = getContactPage();
  const hq = content.offices.find((o) => o.isHeadquarters) ?? content.offices[0];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor"],
    "@id": "https://knsewa.com/#organization",
    "name": "Khushbu Nirman Sewa Pvt Ltd",
    "url": "https://knsewa.com",
    "telephone": "021-503204",
    "email": "khushbunirmansewa@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Biratnagar, Morang",
      "addressLocality": "Biratnagar",
      "addressRegion": "Province No. 1",
      "addressCountry": "NP",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 26.4525,
      "longitude": 87.2718,
    },
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "17:00" },
    ],
    "areaServed": { "@type": "Country", "name": "Nepal" },
    "priceRange": "$$",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://knsewa.com/" },
      { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://knsewa.com/contact/" },
    ],
  };

  return (
    <>
      <JsonLd schema={localBusinessSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <PageHero content={content.hero} />
      <ContactFormSection
        label={content.form.label}
        headline={content.form.headline}
        description={content.form.description}
        projectTypes={content.form.projectTypes}
        recipientEmail={hq.email}
      />
      <ContactInfoSection
        label={content.info.label}
        headline={content.info.headline}
        description={content.info.description}
        offices={content.offices}
      />
      <CTASection content={content.cta} />
    </>
  );
}
