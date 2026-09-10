'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GridLines } from '@/components/ui/GridLines';
import { ArrowRight } from '@/components/ui/Icons';
import type { PageHeroContent, Stat } from '@/types/content';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServicesHeroProps {
  content: PageHeroContent;
  stats: Stat[];
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
          onUpdate: () => {
            setDisplayValue(Math.round(counter.value));
          },
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

export function ServicesHero({ content, stats }: ServicesHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const contentEl = contentRef.current;
    if (!section || !image || !contentEl) return;

    // Parallax background image
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

    // Content fade on scroll
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
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      contentEl.querySelector('.hero-headline'),
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.3'
    );

    tl.fromTo(
      contentEl.querySelector('.hero-desc'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );

    tl.fromTo(
      contentEl.querySelector('.hero-ctas'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      '-=0.5'
    );

    // Stats bar
    const statItems = section.querySelectorAll('.stat-item');
    tl.fromTo(
      statItems,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out' },
      '-=0.4'
    );

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === section)
        .forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-section"
    >
      {/* Background image with parallax */}
      <div ref={imageRef} className="hero-bg">
        <Image
          src={content.backgroundImage}
          alt={content.headline}
          fill
          className="object-cover"
          priority
          style={{ objectPosition: 'center 40%' }}
        />
        <div className="hero-overlay" />
      </div>

      <GridLines variant="light" />

      {/* Main content - vertically centered like homepage */}
      <div
        ref={contentRef}
        className="wrapper prel w-full services-hero-wrapper"
        style={{ zIndex: 10 }}
      >
        <div className="hero-content">
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
                color: 'rgba(255,255,255,0.6)',
                maxWidth: '520px',
                marginBottom: '2rem',
              }}
            >
              {content.description}
            </p>
          )}

          <div
            className="hero-ctas opacity-0"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              flexWrap: 'nowrap',
            }}
          >
            <Link
              href="/contact"
              className="btn-primary"
              style={{ padding: '13px 28px', fontSize: '0.9rem' }}
            >
              Start Your Project
              <ArrowRight width={24} height={10} />
            </Link>
            <Link href="/projects" className="btn-link white" style={{ fontSize: '0.9rem' }}>
              View Our Projects
              <ArrowRight width={24} height={10} />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats bar pinned at bottom */}
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
    </section>
  );
}
