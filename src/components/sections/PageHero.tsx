'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GridLines } from '@/components/ui/GridLines';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import type { PageHeroContent, Stat } from '@/types/content';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PageHeroProps {
  content: PageHeroContent;
  stats?: Stat[];
  height?: string;
}

function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const numericValue = parseInt(value, 10);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const counter = { value: 0 };
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(counter, {
          value: numericValue,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => setDisplayValue(Math.round(counter.value)),
        });
      },
      once: true,
    });

    return () => { st.kill(); };
  }, [numericValue, suffix]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {displayValue}{suffix}
    </span>
  );
}

export function PageHero({ content, stats }: PageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const contentEl = contentRef.current;
    if (!section || !image || !contentEl) return;

    // Parallax on background
    gsap.to(image, {
      y: '25%',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    });

    // Content fades out on scroll
    gsap.to(contentEl, {
      y: -80,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: '20% top',
        end: '60% top',
        scrub: 1,
      },
    });

    // Entrance animations
    const tl = gsap.timeline({ delay: 0.15 });

    const label = contentEl.querySelector('.hero-label');
    const headline = contentEl.querySelector('.hero-headline');
    const desc = contentEl.querySelector('.hero-desc');

    if (label) tl.fromTo(label, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
    if (headline) tl.fromTo(headline, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.4');
    if (desc) tl.fromTo(desc, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6');

    const statItems = section.querySelectorAll('.stat-item');
    if (statItems.length > 0) {
      tl.fromTo(statItems, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out' }, '-=0.4');
    }

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === section)
        .forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero-section">
      {/* Background with parallax */}
      <div ref={imageRef} className="hero-bg">
        <Image
          src={content.backgroundImage}
          alt={content.headline}
          fill
          className="object-cover"
          priority
          style={{ objectPosition: 'center 40%' }}
          unoptimized
        />
        <div className="hero-overlay" />
      </div>

      <GridLines variant="light" />

      {/* Breadcrumbs — pinned to top */}
      {content.breadcrumbs && content.breadcrumbs.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 20,
            paddingTop: 'clamp(5rem, 10vw, 8rem)',
          }}
        >
          <div className="wrapper">
            <Breadcrumbs items={content.breadcrumbs} />
          </div>
        </div>
      )}

      {/* Main content — vertically centered */}
      <div
        ref={contentRef}
        className={`wrapper prel w-full${stats ? ' services-hero-wrapper' : ''}`}
        style={{ zIndex: 10 }}
      >
        <div className="hero-content">
          {content.label && (
            <p
              className="hero-label"
              style={{
                fontSize: '0.6875rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.78)',
                marginBottom: '1.25rem',
              }}
            >
              {content.label}
            </p>
          )}

          <h1
            className="hero-headline opacity-0"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: 'var(--color-white)',
              maxWidth: '800px',
              marginBottom: '1.5rem',
            }}
          >
            {content.headline}
          </h1>

          {content.description && (
            <p
              className="hero-desc opacity-0"
              style={{
                fontSize: 'clamp(0.9375rem, 1.2vw, 1.125rem)',
                fontWeight: 400,
                lineHeight: 1.65,
                color: 'rgba(255,255,255,0.85)',
                maxWidth: '520px',
              }}
            >
              {content.description}
            </p>
          )}
        </div>
      </div>

      {/* Stats bar — same as ServicesHero */}
      {stats && stats.length > 0 && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            background: 'rgba(23,23,27,0.6)',
          }}
        >
          <div className="wrapper">
            <div className="stats-bar-grid">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="stat-item"
                  style={{
                    padding: 'clamp(1.25rem, 2vw, 2rem) 0',
                    borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)',
                      fontWeight: 300,
                      lineHeight: 1,
                      color: 'var(--color-white)',
                    }}
                  >
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p
                    style={{
                      fontSize: '0.625rem',
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.7)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      marginTop: '0.5rem',
                      lineHeight: 1.4,
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
