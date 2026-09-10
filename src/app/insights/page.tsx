import type { Metadata } from 'next';
import { getInsightsPage, getAllInsightsArticles } from '@/data/adapters/content.adapter';
import { JsonLd } from '@/components/ui/JsonLd';

export const metadata: Metadata = {
  title: 'News & Insights | Khushbu Nirman Sewa Pvt Ltd',
  description: 'Latest news, project updates, and insights from Khushbu Nirman Sewa — Nepal\'s leading construction contractor.',
  keywords: ['knsewa news', 'construction awards nepal', 'FCAN award', 'nepal construction insights', 'khushbu nirman sewa awards'],
  alternates: { canonical: '/insights/' },
  openGraph: {
    title: 'News & Insights | Khushbu Nirman Sewa',
    description: 'Latest news, project updates, and construction insights from KNSEWA.',
    images: [{ url: '/images/hero-construction.jpg', width: 1200, height: 630, alt: 'KNSEWA News & Insights' }],
  },
};
import { InsightsHero } from '@/components/sections/insights/InsightsHero';
import { InsightsGrid } from '@/components/sections/insights/InsightsGrid';
import { CTASection } from '@/components/sections/CTASection';

export default function InsightsPage() {
  const content = getInsightsPage();
  const articles = getAllInsightsArticles();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://knsewa.com/" },
      { "@type": "ListItem", "position": 2, "name": "Insights", "item": "https://knsewa.com/insights/" },
    ],
  };

  const insightsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "KNSEWA News & Insights",
    "url": "https://knsewa.com/insights/",
    "itemListElement": articles.map((article, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "NewsArticle",
        "headline": article.title,
        "description": article.excerpt,
        "image": `https://knsewa.com${article.image}`,
        "datePublished": article.publishDate,
        "url": `https://knsewa.com/insights/${article.slug}/`,
        "publisher": { "@id": "https://knsewa.com/#organization" },
        "articleSection": article.category,
      },
    })),
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={insightsSchema} />
      <InsightsHero content={content.hero} stats={content.stats} />
      <InsightsGrid
        label={content.listing.label}
        headline={content.listing.headline}
        categories={content.listing.categories}
        articles={articles}
      />
      <CTASection content={content.cta} />
    </>
  );
}
