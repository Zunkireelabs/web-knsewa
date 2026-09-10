'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GridLines } from '@/components/ui/GridLines';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import type { PageHeroContent, Stat } from '@/types/content';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const numericValue = parseInt(value, 10);
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const counter = { value: 0 };
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 95%',
      onEnter: () => {
        gsap.to(counter, {
          value: numericValue,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => setDisplayValue(String(Math.round(counter.value))),
        });
      },
      once: true,
    });
    return () => { st.kill(); };
  }, [numericValue]);

  return <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>{displayValue}{suffix}</span>;
}

interface InsightsHeroProps {
  content: PageHeroContent;
  stats: Stat[];
}

export function InsightsHero({ content, stats }: InsightsHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 1 },
          {
            scale: 1.08,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 2,
            },
          }
        );
      }

      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.hero-word');
        gsap.fromTo(
          words,
          { y: 80, opacity: 0, rotateX: 40 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.08, ease: 'power4.out', delay: 0.2 }
        );
      }

      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
        );
      }

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: 'power3.inOut', delay: 0.6 }
        );
      }

      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.7 }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const words = content.headline.split(' ');

  return (
    <section
      ref={sectionRef}
      className="page-hero prel"
      style={{
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
        background: 'var(--color-primary)',
      }}
    >
      {/* Background with Ken Burns */}
      <div className="absolute inset-0 z-0" style={{ overflow: 'hidden' }}>
        <div
          ref={imageRef}
          style={{ position: 'absolute', inset: 0, top: '-10%', bottom: '-10%', willChange: 'transform' }}
        >
          <Image
            src={content.backgroundImage}
            alt={content.headline}
            fill
            className="object-cover"
            priority
            style={{ objectPosition: 'center 40%' }}
            unoptimized
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(23,23,27,0.5) 0%, rgba(23,23,27,0.15) 30%, rgba(23,23,27,0.45) 60%, rgba(23,23,27,0.95) 100%)',
          }}
        />
      </div>

      <GridLines variant="light" />

      {/* Breadcrumbs */}
      {content.breadcrumbs && content.breadcrumbs.length > 0 && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20, paddingTop: 'clamp(5rem, 10vw, 8rem)' }}>
          <div className="wrapper">
            <Breadcrumbs items={content.breadcrumbs} />
          </div>
        </div>
      )}

      {/* Content */}
      <div
        className="wrapper prel w-full"
        style={{ zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 0, paddingTop: '8rem' }}
      >
        <div
          ref={labelRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.875rem',
            marginBottom: '1.25rem',
            opacity: 0,
          }}
        >
          <span
            style={{
              width: '36px',
              height: '2px',
              background: '#2575e6',
              boxShadow: '0 0 8px rgba(37,117,230,0.55)',
              flexShrink: 0,
            }}
          />
          <p
            style={{
              fontSize: 'clamp(1rem, 1.4vw, 1.375rem)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              color: '#2575e6',
              textShadow: '0 0 12px rgba(255,255,255,0.25), 0 1px 2px rgba(0,0,0,0.4)',
            }}
          >
            {content.label}
          </p>
        </div>

        <h1
          ref={headlineRef}
          style={{
            fontSize: 'clamp(2.75rem, 6vw, 5rem)',
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: 'var(--color-white)',
            maxWidth: '800px',
            perspective: '600px',
          }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="hero-word"
              style={{
                display: 'inline-block',
                marginRight: '0.3em',
                opacity: 0,
                willChange: 'transform, opacity',
              }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Accent line */}
        <div
          ref={lineRef}
          style={{
            width: '64px',
            height: '2px',
            background: 'var(--color-accent)',
            marginTop: '2rem',
            transformOrigin: 'left',
            transform: 'scaleX(0)',
          }}
        />

        {content.description && (
          <p
            ref={descRef}
            style={{
              fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)',
              fontWeight: 400,
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.85)',
              maxWidth: '520px',
              marginTop: '1.5rem',
              opacity: 0,
            }}
          >
            {content.description}
          </p>
        )}
      </div>

      {/* Stats Bar */}
      <div
        className="prel"
        style={{
          zIndex: 10,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          marginTop: 'clamp(3rem, 5vw, 5rem)',
        }}
      >
        <div className="wrapper">
          <div className="about-hero-stats">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="about-hero-stat-item"
                style={{ padding: 'clamp(1.5rem, 2vw, 2.25rem) 0', textAlign: 'center' }}
              >
                <div
                  style={{
                    fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
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
