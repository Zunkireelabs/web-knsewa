'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowIcon } from '@/components/ui/Icons';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import type { NewsArticle } from '@/types/content';

interface NewsInsightsSectionProps {
  articles: NewsArticle[];
  title?: string;
  subtitle?: string;
}

/**
 * News & Insights Section
 *
 * Layout: Featured article (left, sticky) + 2x3 Grid (right, scrolls)
 *
 * How the sticky scroll works:
 * 1. Flexbox with default align-items: stretch makes both columns same height
 * 2. Right column (grid) is taller, so it determines the container height
 * 3. Left column stretches to match, giving the sticky element room to stick
 * 4. As you scroll, the sticky element stays fixed until parent bottom is reached
 */
export function NewsInsightsSection({
  articles,
  title = 'News & Insights',
}: NewsInsightsSectionProps) {
  const featuredArticle = articles[0];
  const gridArticles = articles.slice(1, 7);

  return (
    <section className="news-insights-section bg-white py-24">
      <div className="wrapper">
        {/* Section Header - 80px margin to content */}
        <div style={{ marginBottom: '80px' }}>
          <AnimatedElement>
            <h2
              className="font-light"
              style={{
                fontSize: 'clamp(2rem, 3vw, 2.8125rem)',
                lineHeight: '1.1',
                letterSpacing: '-0.01em',
                color: 'var(--color-primary)',
              }}
            >
              {title}
            </h2>
          </AnimatedElement>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Column - Featured Article with Sticky */}
          <div className="w-full lg:w-1/2">
            <div className="lg:sticky lg:top-28">
              <FeaturedArticle article={featuredArticle} />
            </div>
          </div>

          {/* Right Column - Grid Articles */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
              {gridArticles.map((article) => (
                <GridArticle key={article.id} article={article} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Featured Article Component
 *
 * Spacing:
 * - Image margin-bottom: 32px (mb-8)
 * - Title margin-bottom: 20px (mb-5)
 */
function FeaturedArticle({ article }: { article: NewsArticle }) {
  return (
    <Link href={`/insights/${article.slug}`} className="group block">
      {/* Image with rounded corners and shadow */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-lg" style={{ marginBottom: '32px' }}>
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Title - Normal weight */}
      <h3
        className="font-normal group-hover:text-[var(--color-accent)] transition-colors"
        style={{
          fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
          lineHeight: '1.25',
          color: 'var(--color-primary)',
          marginBottom: '20px',
        }}
      >
        {article.title}
      </h3>

      {/* READ MORE with accent colored long arrow */}
      <span
        className="inline-flex items-center gap-4 font-medium uppercase tracking-wide text-[var(--color-accent)]"
        style={{ fontSize: '14px', letterSpacing: '0.05em' }}
      >
        Read More
        <svg
          width="40"
          height="12"
          viewBox="0 0 40 12"
          fill="none"
          className="transition-transform group-hover:translate-x-2"
        >
          <path
            d="M0 6H38M38 6L33 1M38 6L33 11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}

/**
 * Grid Article Card Component
 *
 * Spacing:
 * - Image margin-bottom: 24px
 * - Title margin-bottom: 16px
 */
function GridArticle({ article }: { article: NewsArticle }) {
  return (
    <Link href={`/insights/${article.slug}`} className="group block">
      {/* Image with rounded corners */}
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-2xl"
        style={{ marginBottom: '18px' }}
      >
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Title - Normal weight */}
      <h4
        className="font-normal group-hover:text-[var(--color-accent)] transition-colors line-clamp-2"
        style={{
          fontSize: '1.125rem',
          lineHeight: '1.3',
          color: 'var(--color-primary)',
          marginBottom: '12px',
        }}
      >
        {article.title}
      </h4>

      {/* READ MORE with accent colored long arrow */}
      <span
        className="inline-flex items-center gap-3 font-medium uppercase tracking-wide text-[var(--color-accent)]"
        style={{ fontSize: '12px', letterSpacing: '0.05em' }}
      >
        Read More
        <svg
          width="32"
          height="10"
          viewBox="0 0 32 10"
          fill="none"
          className="transition-transform group-hover:translate-x-2"
        >
          <path
            d="M0 5H30M30 5L26 1M30 5L26 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
