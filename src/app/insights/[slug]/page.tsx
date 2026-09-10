import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllInsightsArticles, getArticleBySlug, getInsightsPage } from '@/data/adapters/content.adapter';
import { JsonLd } from '@/components/ui/JsonLd';
import { GridLines } from '@/components/ui/GridLines';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { CTASection } from '@/components/sections/CTASection';
import { ArticleShareBar } from '@/components/sections/insights/ArticleShareBar';
import type { NewsArticle } from '@/types/content';

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
  const related = getAllInsightsArticles()
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

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

      {/* Article hero — image with title overlaid, matching the project detail hero pattern */}
      <section
        className="page-hero prel"
        style={{
          minHeight: '52vh',
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
        }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            unoptimized
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(23, 23, 27, 0.95) 0%, rgba(23, 23, 27, 0.7) 50%, rgba(23, 23, 27, 0.55) 100%)',
            }}
          />
        </div>

        <GridLines variant="light" />

        <div
          className="wrapper prel w-full"
          style={{ zIndex: 10, paddingBottom: '2.5rem', paddingTop: '8rem' }}
        >
          <AnimatedElement>
            <div style={{ marginBottom: '2rem' }}>
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Insights', href: '/insights/' },
                  { label: article.title },
                ]}
              />
            </div>
          </AnimatedElement>

          <AnimatedElement delay={0.1}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--color-white)',
                  background: 'rgba(11, 93, 208, 0.5)',
                  backdropFilter: 'blur(8px)',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '2px',
                }}
              >
                {article.category}
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                {formatDate(article.publishDate)}
              </span>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={0.2}>
            <h1 className="title fs-45" style={{ color: 'var(--color-white)', maxWidth: '900px' }}>
              {article.title}
            </h1>
          </AnimatedElement>
        </div>
      </section>

      {/* Article body */}
      <article className="wrapper" style={{ padding: 'clamp(3rem, 6vw, 5rem) var(--container-padding)' }}>
        <div className="max-w-[720px] mx-auto">
          <Link
            href="/insights/"
            className="inline-flex items-center gap-2 fs-16 font-medium text-[var(--color-primary)] transition-colors mb-10 hover:text-[var(--color-white)] hover:bg-[var(--color-accent)]"
            style={{
              background: 'var(--color-gray-100)',
              padding: '0.5rem 1rem',
              borderRadius: '999px',
            }}
          >
            ← All Insights
          </Link>

          <div
            style={{
              borderLeft: '3px solid var(--color-accent)',
              paddingLeft: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              margin: '0 0 2.5rem',
            }}
          >
            <p
              className="fs-19 text-[var(--color-primary)]"
              style={{ opacity: 0.85, textAlign: 'left', lineHeight: 1.6, fontWeight: 400 }}
            >
              {article.excerpt}
            </p>
          </div>

          <ArticleShareBar url={`https://knsewa.com/insights/${slug}/`} title={article.title} />
        </div>
      </article>

      {related.length > 0 && <RelatedInsights articles={related} />}

      <CTASection content={cta} />
    </>
  );
}

function RelatedInsights({ articles }: { articles: NewsArticle[] }) {
  return (
    <section
      className="prel"
      style={{ padding: '0 0 clamp(4rem, 7vw, 7rem)' }}
    >
      <div className="wrapper prel">
        <p
          style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: 'var(--color-accent)',
            marginBottom: '0.875rem',
          }}
        >
          More Insights
        </p>

        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}
        >
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/insights/${article.slug}/`}
              className="group relative block overflow-hidden"
              style={{ borderRadius: 20, aspectRatio: '4 / 3' }}
            >
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
                unoptimized
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(23,23,27,0.9) 0%, rgba(23,23,27,0.15) 55%, transparent 100%)',
                }}
              />
              <div className="absolute inset-0 flex flex-col justify-end" style={{ padding: '1.25rem' }}>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'rgba(255,255,255,0.7)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {article.category}
                </span>
                <h3
                  style={{
                    fontSize: '1.0625rem',
                    fontWeight: 500,
                    lineHeight: 1.3,
                    color: 'var(--color-white)',
                  }}
                >
                  {article.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
