import type { Metadata } from "next";
import { getHomePage } from "@/data/adapters/content.adapter";
import { HeroSection } from "@/components/sections/HeroSection";

export const metadata: Metadata = {
  title: 'Khushbu Nirman Sewa | Premium Construction Contractor in Nepal',
  description: 'Khushbu Nirman Sewa is a leading construction contractor in Biratnagar, Nepal with 30 years of experience in commercial, government, and industrial construction projects.',
  keywords: [
    'Khushbu Nirman Sewa',
    'khushbu nirman',
    'nirman sewa biratnagar',
    'खुशबु निर्माण सेवा',
    'construction company nepal',
    'biratnagar contractor',
    'commercial construction',
    'government construction',
    'nirman company nepal',
  ],
  alternates: { canonical: '/' },
};
import { StatsSection } from "@/components/sections/StatsSection";
import { NewsInsightsSection } from "@/components/sections/NewsInsightsSection";
import { SpecializationsSection } from "@/components/sections/SpecializationsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { TwoColumnSection } from "@/components/sections/TwoColumnSection";
import { CultureSection } from "@/components/sections/CultureSection";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/ui/JsonLd";

export default function HomePage() {
  const content = getHomePage();

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://knsewa.com/",
    "url": "https://knsewa.com/",
    "name": content.seo.title,
    "description": content.seo.description,
    "isPartOf": { "@id": "https://knsewa.com/#website" },
    "about": { "@id": "https://knsewa.com/#organization" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://knsewa.com/" },
      ],
    },
  };

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Construction Services by Khushbu Nirman Sewa",
    "url": "https://knsewa.com/services/",
    "itemListElement": content.services.items.map((service, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Service",
        "name": service.title,
        "description": service.description,
        "url": `https://knsewa.com${service.href}/`,
        "provider": { "@id": "https://knsewa.com/#organization" },
        "areaServed": { "@type": "Country", "name": "Nepal" },
      },
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Khushbu Nirman Sewa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Khushbu Nirman Sewa (खुशबु निर्माण सेवा) is a leading construction contractor based in Biratnagar, Nepal, with over 30 years of experience in commercial, industrial, and government construction projects across Nepal.",
        },
      },
      {
        "@type": "Question",
        "name": "Where is Khushbu Nirman Sewa located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Khushbu Nirman Sewa is located in Biratnagar, Morang, Nepal. They can be reached at 021-503204 or info@knsewa.com.",
        },
      },
      {
        "@type": "Question",
        "name": "What construction services does Khushbu Nirman Sewa provide?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Khushbu Nirman Sewa provides commercial construction, industrial construction, government/public infrastructure projects, and civil engineering services across Nepal.",
        },
      },
      {
        "@type": "Question",
        "name": "How many years of experience does Khushbu Nirman Sewa have?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Khushbu Nirman Sewa has over 30 years of construction experience, founded in 1995, making them one of the most experienced construction contractors in Biratnagar and the Province No. 1 region of Nepal.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd schema={webPageSchema} />
      <JsonLd schema={servicesSchema} />
      <JsonLd schema={faqSchema} />
      {/* 1. Hero Section (video support) */}
      <HeroSection content={content.hero} />

      {/* 2. Stats Section */}
      <StatsSection stats={content.stats} />

      {/* 4. News & Insights (pinned section) */}
      <NewsInsightsSection articles={content.news} />

      {/* 5. Specializations (horizontal scroll) */}
      <SpecializationsSection specializations={content.specializations} />

      {/* 6. Services Section */}
      <ServicesSection
        headline={content.services.headline}
        description={content.services.description}
        services={content.services.items}
      />

      {/* 6. Featured Projects */}
      <ProjectsSection
        headline={content.featuredProjects.headline}
        categories={content.featuredProjects.categories}
        projects={content.featuredProjects.projects}
        limit={8}
      />

      {/* 7. Location / Coverage (parallax) */}
      <TwoColumnSection content={content.coverage} />

      {/* 8. Culture Slider */}
      <CultureSection commitments={content.culture} />

      {/* 10. Final CTA */}
      <CTASection content={content.cta} />
    </>
  );
}
