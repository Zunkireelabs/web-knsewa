'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GridLines } from '@/components/ui/GridLines';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { ArrowRight } from '@/components/ui/Icons';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import type { PageHeroContent, Stat } from '@/types/content';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AboutHeroProps {
  content: PageHeroContent;
  stats: Stat[];
}

function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const numericValue = parseInt(value, 10);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    setDisplayValue('0');

    const counter = { value: 0 };
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 95%',
      onEnter: () => {
        gsap.to(counter, {
          value: numericValue,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            setDisplayValue(String(Math.round(counter.value)));
          },
        });
      },
      once: true,
    });

    return () => { st.kill(); };
  }, [numericValue, suffix]);

  return <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>{displayValue}{suffix}</span>;
}

export function AboutHero({ content, stats }: AboutHeroProps) {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    // Parallax background only
    const st = gsap.to(image, {
      y: '20%',
      ease: 'none',
      scrollTrigger: {
        trigger: image.parentElement,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === image.parentElement)
        .forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      className="page-hero prel"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
        background: 'var(--color-primary)',
      }}
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0" style={{ overflow: 'hidden' }}>
        <div
          ref={imageRef}
          style={{ position: 'absolute', inset: 0, top: '-10%', bottom: '-10%' }}
        >
          <Image
            src={content.backgroundImage}
            alt={content.headline}
            fill
            className="object-cover"
            priority
            style={{ objectPosition: 'center 30%' }}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(23,23,27,0.5) 0%, rgba(23,23,27,0.3) 35%, rgba(23,23,27,0.55) 65%, rgba(23,23,27,0.92) 100%)',
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
        <AnimatedElement>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
              fontWeight: 300,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              color: 'var(--color-white)',
              maxWidth: '720px',
            }}
          >
            {content.headline}
          </h1>
        </AnimatedElement>

        {content.description && (
          <AnimatedElement delay={0.1}>
            <p
              style={{
                fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)',
                fontWeight: 400,
                lineHeight: 1.65,
                color: 'rgba(255,255,255,0.85)',
                maxWidth: '480px',
                marginTop: '1.5rem',
              }}
            >
              {content.description}
            </p>
          </AnimatedElement>
        )}

        <AnimatedElement delay={0.15}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              marginTop: '2.25rem',
              flexWrap: 'wrap',
            }}
          >
            <Link
              href="/projects"
              className="btn-primary"
              style={{ padding: '13px 26px', fontSize: '0.875rem' }}
            >
              View Our Projects
              <ArrowRight width={24} height={10} />
            </Link>
            <Link href="/contact" className="btn-link white" style={{ fontSize: '0.875rem' }}>
              Get in Touch
              <ArrowRight width={24} height={10} />
            </Link>
          </div>
        </AnimatedElement>
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
                style={{
                  padding: 'clamp(1.5rem, 2vw, 2.25rem) 0',
                  textAlign: 'center',
                }}
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
