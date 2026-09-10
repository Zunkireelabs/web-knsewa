'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GridLines } from '@/components/ui/GridLines';
import type { NewsArticle } from '@/types/content';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type CardVariant = 'feature' | 'large' | 'tall' | 'wide' | 'standard';

interface InsightsGridProps {
  label: string;
  headline: string;
  categories: string[];
  articles: NewsArticle[];
}

function variantsFor(count: number): CardVariant[] {
  if (count <= 0) return [];
  if (count === 1) return ['feature'];
  return ['large', ...Array(count - 1).fill('standard')] as CardVariant[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ───────── Card variants ─────────

// Pill label for featured cards — "AWARD" when category is Awards, otherwise the category name.
function pillText(category: string) {
  return category === 'Awards' ? 'Award' : category;
}

// Large / Feature variant — image fills the card, title + date overlaid at bottom on a dark gradient.
function FeaturedCard({
  article,
  onOpen,
}: {
  article: NewsArticle;
  onOpen: (a: NewsArticle) => void;
}) {
  const date = formatDate(article.publishDate);
  return (
    <button
      type="button"
      className="ins-card"
      aria-label={`Open larger view of ${article.title}`}
      onClick={() => onOpen(article)}
      style={{
        all: 'unset',
        position: 'relative',
        display: 'block',
        height: '100%',
        width: '100%',
        cursor: 'pointer',
        borderRadius: 24,
        overflow: 'hidden',
      }}
    >
      <div className="ins-card-media" style={{ position: 'absolute', inset: 0 }}>
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 66vw"
          priority
        />
        <div className="ins-tint" data-cat={article.category} />
        <div className="ins-overlay" />
      </div>

      <span className="ins-featured-tag">{pillText(article.category)}</span>

      <span className="ins-card-expand" aria-hidden>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
      </span>

      <div
        className="ins-card-bottom"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(0.875rem, 1.4vw, 1.25rem)',
          gap: '0.375rem',
          color: 'white',
          pointerEvents: 'none',
        }}
      >
        <h3
          style={{
            fontSize: 'clamp(0.9375rem, 1.15vw, 1.125rem)',
            fontWeight: 500,
            lineHeight: 1.25,
            letterSpacing: '-0.005em',
            color: 'white',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {article.title}
        </h3>
        <span
          style={{
            fontSize: '0.6875rem',
            fontWeight: 500,
            letterSpacing: '0.04em',
            color: 'rgba(255,255,255,0.92)',
          }}
          className="ins-card-meta-light"
        >
          {date}
        </span>
      </div>
    </button>
  );
}

// Non-featured variant: image fills the card, category pill at top-left, title + date overlay at bottom.
function OverlayCard({ article, onOpen }: { article: NewsArticle; onOpen: (a: NewsArticle) => void }) {
  const date = formatDate(article.publishDate);
  return (
    <button
      type="button"
      className="ins-card"
      aria-label={`Open larger view of ${article.title}`}
      onClick={() => onOpen(article)}
      style={{
        all: 'unset',
        position: 'relative',
        display: 'block',
        height: '100%',
        width: '100%',
        cursor: 'pointer',
        borderRadius: 24,
        overflow: 'hidden',
      }}
    >
      <div className="ins-card-media" style={{ position: 'absolute', inset: 0 }}>
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="ins-tint" data-cat={article.category} />
        <div className="ins-overlay" />
      </div>

      <span className="ins-featured-tag">{pillText(article.category)}</span>

      <span className="ins-card-expand" aria-hidden>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
      </span>

      <div
        className="ins-card-bottom"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(0.75rem, 1.1vw, 1rem)',
          gap: '0.25rem',
          color: 'white',
          pointerEvents: 'none',
        }}
      >
        <h3
          style={{
            fontSize: 'clamp(0.875rem, 0.95vw, 0.9375rem)',
            fontWeight: 500,
            lineHeight: 1.25,
            letterSpacing: '-0.005em',
            color: 'white',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {article.title}
        </h3>
        <span
          className="ins-card-meta-light"
          style={{
            fontSize: '0.6875rem',
            fontWeight: 500,
            letterSpacing: '0.04em',
            color: 'rgba(255,255,255,0.92)',
          }}
        >
          {date}
        </span>
      </div>
    </button>
  );
}

function MasonryCard({
  article,
  variant,
  onOpen,
}: {
  article: NewsArticle;
  variant: CardVariant;
  onOpen: (a: NewsArticle) => void;
}) {
  if (variant === 'feature' || variant === 'large') {
    return <FeaturedCard article={article} onOpen={onOpen} />;
  }
  return <OverlayCard article={article} onOpen={onOpen} />;
}

// ───────── Lightbox ─────────

function Lightbox({ article, onClose }: { article: NewsArticle; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const date = formatDate(article.publishDate);

  return (
    <div
      className="ins-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={article.title}
      onClick={onClose}
    >
      <button
        type="button"
        className="ins-lightbox-close"
        onClick={onClose}
        aria-label="Close"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <div
        className="ins-lightbox-stage"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ins-lightbox-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.image}
            alt={article.title}
            className="ins-lightbox-img"
          />
        </div>
        <div className="ins-lightbox-caption">
          <span className="ins-lightbox-cat">{pillText(article.category)}</span>
          <h3>{article.title}</h3>
          <span className="ins-lightbox-date">{date}</span>
          {article.excerpt && <p>{article.excerpt}</p>}
        </div>
      </div>
    </div>
  );
}

// ───────── Section ─────────

export function InsightsGrid({ label, headline, categories, articles }: InsightsGridProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openArticle, setOpenArticle] = useState<NewsArticle | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === 'All'
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll('.insight-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease: 'power3.out' }
    );
  }, [activeCategory]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        section,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 85%' },
        }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="prel"
      style={{
        padding: 'clamp(4rem, 7vw, 7rem) 0',
        background:
          'radial-gradient(1200px 600px at 80% -10%, rgba(11,93,208,0.06), transparent 60%), var(--color-white)',
      }}
    >
      <GridLines variant="gray" />

      <div className="wrapper prel" style={{ zIndex: 10 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(1.75rem, 2.8vw, 2.25rem)',
            marginBottom: 'clamp(2.5rem, 4vw, 3.5rem)',
          }}
          className="lg:flex-row lg:items-end lg:justify-between"
        >
          <div style={{ paddingRight: 'clamp(1.5rem, 4vw, 4rem)', maxWidth: '52ch' }}>
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
              {label}
            </p>
            <h2
              style={{
                fontSize: 'clamp(2rem, 3.4vw, 3.25rem)',
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--color-primary)',
              }}
            >
              {headline}
            </h2>
          </div>

          <div className="ins-filter-bar" role="tablist" aria-label="Filter insights by category">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                data-active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className="ins-filter-pill"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div ref={gridRef}>
          {filtered.length > 0 ? (
            <div className="insights-masonry">
              {(() => {
                const variants = variantsFor(filtered.length);
                return filtered.map((article, index) => {
                  const variant = variants[index] ?? 'standard';
                  return (
                    <div
                      key={article.id}
                      className={`insight-card ins-card-${variant}`}
                    >
                      <MasonryCard article={article} variant={variant} onOpen={setOpenArticle} />
                    </div>
                  );
                });
              })()}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--color-gray-400)', padding: '4rem 0' }}>
              No insights found for this category.
            </p>
          )}
        </div>
      </div>

      {openArticle && (
        <Lightbox article={openArticle} onClose={() => setOpenArticle(null)} />
      )}
    </section>
  );
}
