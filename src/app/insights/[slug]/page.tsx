import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllInsightsArticles, getArticleBySlug, getInsightsPage } from '@/data/adapters/content.adapter';
import { JsonLd } from '@/components/ui/JsonLd';
import { CTASection } from '@/components/sections/CTASection';

export function generateStaticParams() {
  return getAllInsightsArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: 'Article Not Found' };

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/insights/${slug}/` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image, width: 1200, height: 630, alt: article.title }],
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const { cta } = getInsightsPage();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "description": article.excerpt,
    "image": `https://knsewa.com${article.image}`,
    "datePublished": article.publishDate,
    "url": `https://knsewa.com/insights/${slug}/`,
    "publisher": { "@id": "https://knsewa.com/#organization" },
    "articleSection": article.category,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://knsewa.com/insights/${slug}/`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://knsewa.com/" },
      { "@type": "ListItem", "position": 2, "name": "Insights", "item": "https://knsewa.com/insights/" },
      { "@type": "ListItem", "position": 3, "name": article.title, "item": `https://knsewa.com/insights/${slug}/` },
    ],
  };

  return (
    <>
      <JsonLd schema={articleSchema} />
      <JsonLd schema={breadcrumbSchema} />

      {/* Article hero image */}
      <div className="relative w-full" style={{ height: 'clamp(280px, 50vw, 560px)' }}>
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Article content */}
      <article className="px-[var(--spacing-page)] py-[var(--spacing-section)]">
        <div className="max-w-[780px] mx-auto">

          {/* Back link */}
          <Link
            href="/insights/"
            className="inline-flex items-center gap-2 text-fs-16 font-medium text-[var(--color-primary)] opacity-60 hover:opacity-100 transition-opacity mb-8"
          >
            ← All Insights
          </Link>

          {/* Category + date */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-fs-12 font-medium tracking-widest uppercase text-[var(--color-accent)]">
              {article.category}
            </span>
            <span className="text-fs-12 text-[var(--color-primary)] opacity-40">
              {formatDate(article.publishDate)}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-fs-45 font-light leading-[1.1] text-[var(--color-primary)] mb-8">
            {article.title}
          </h1>

          {/* Body */}
          <p className="text-fs-19 font-normal leading-relaxed text-[var(--color-primary)] opacity-80">
            {article.excerpt}
          </p>

        </div>
      </article>

      <CTASection content={cta} />
    </>
  );
}
