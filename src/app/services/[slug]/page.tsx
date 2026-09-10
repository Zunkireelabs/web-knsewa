import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getServiceBySlug, getAllServiceSlugs, getServicesPage } from '@/data/adapters/content.adapter';
import { PageHero } from '@/components/sections/PageHero';
import { TwoColumnSection } from '@/components/sections/TwoColumnSection';
import { ServiceDeliverablesSection } from '@/components/sections/services/ServiceDeliverablesSection';
import { ApproachSection } from '@/components/sections/services/ApproachSection';
import { RelatedServicesSection } from '@/components/sections/services/RelatedServicesSection';
import { CTASection } from '@/components/sections/CTASection';
import { JsonLd } from '@/components/ui/JsonLd';

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: 'Service Not Found' };

  return {
    title: service.seo.title,
    description: service.seo.description,
    keywords: service.seo.keywords,
    alternates: { canonical: `/services/${slug}/` },
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      images: [{ url: service.hero.backgroundImage, width: 1200, height: 630, alt: service.hero.headline }],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const servicesPage = getServicesPage();

  const faqSchema = service.faq && service.faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": service.faq.map((item) => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": { "@type": "Answer", "text": item.answer },
        })),
      }
    : null;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.seo.title,
    "description": service.seo.description,
    "serviceType": service.hero.headline,
    "image": `https://knsewa.com${service.hero.backgroundImage}`,
    "provider": { "@id": "https://knsewa.com/#organization" },
    "areaServed": { "@type": "Country", "name": "Nepal" },
    "url": `https://knsewa.com/services/${slug}/`,
    ...(service.deliverables && service.deliverables.length > 0 && {
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `${service.hero.headline} Services`,
        "itemListElement": service.deliverables.map((item, i) => ({
          "@type": "Offer",
          "position": i + 1,
          "name": item,
        })),
      },
    }),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://knsewa.com/" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://knsewa.com/services/" },
      { "@type": "ListItem", "position": 3, "name": service.hero.headline, "item": `https://knsewa.com/services/${slug}/` },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How We Approach ${service.hero.headline}`,
    "description": service.seo.description,
    "image": `https://knsewa.com${service.hero.backgroundImage}`,
    "step": service.process.map((s, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": s.title,
      "text": s.description,
    })),
  };

  return (
    <>
      <JsonLd schema={serviceSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={howToSchema} />
      {faqSchema && <JsonLd schema={faqSchema} />}
      <PageHero content={service.hero} stats={servicesPage.stats} />

      <TwoColumnSection content={service.overview} />

      {service.deliverables && service.deliverables.length > 0 && (
        <ServiceDeliverablesSection
          deliverables={service.deliverables}
          intro={service.deliverablesIntro}
        />
      )}

      <ApproachSection
        label="HOW WE WORK"
        headline="Our Process"
        steps={service.process}
      />

      {service.communityImpact && (
        <TwoColumnSection content={service.communityImpact} />
      )}

      {service.relatedServices.length > 0 && (
        <RelatedServicesSection services={service.relatedServices} />
      )}

      <CTASection content={service.cta} />
    </>
  );
}
