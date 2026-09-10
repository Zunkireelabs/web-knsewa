'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GridLines } from '@/components/ui/GridLines';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { ArrowRight } from '@/components/ui/Icons';
import type { TwoColumnContent } from '@/types/content';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AboutStorySectionProps {
  content: TwoColumnContent;
}

export function AboutStorySection({ content }: AboutStorySectionProps) {
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const imageWrapper = imageWrapperRef.current;
    const imageInner = imageInnerRef.current;
    if (!imageWrapper || !imageInner) return;

    // Parallax
    gsap.set(imageInner, { scale: 1.15 });
    gsap.to(imageInner, {
      y: '15%',
      ease: 'none',
      scrollTrigger: { trigger: imageWrapper, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === imageWrapper)
        .forEach((t) => t.kill());
    };
  }, []);

  // Split description into two readable paragraphs
  const dotIndex = content.description.indexOf('. ', Math.floor(content.description.length * 0.4));
  const para1 = dotIndex > 0 ? content.description.slice(0, dotIndex + 1) : content.description;
  const para2 = dotIndex > 0 ? content.description.slice(dotIndex + 2) : '';

  return (
    <section
      style={{
        background: 'var(--color-white)',
        padding: 'clamp(5rem, 9vw, 9rem) 0',
        position: 'relative',
      }}
    >
      <GridLines variant="gray" />

      <div className="wrapper prel" style={{ zIndex: 10 }}>
        <div className="about-story-grid">
          {/* Image */}
          <div style={{ position: 'relative' }}>
            <div
              ref={imageWrapperRef}
              className="about-story-image"
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              <div
                ref={imageInnerRef}
                style={{ position: 'absolute', inset: 0, top: '-15%', bottom: '-15%' }}
              >
                <Image src={content.image} alt={content.imageAlt} fill className="object-cover" />
              </div>
            </div>

            {/* Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                background: 'var(--color-primary)',
                padding: 'clamp(1rem, 1.5vw, 1.75rem) clamp(1.25rem, 2vw, 2rem)',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 3,
              }}
            >
              <span style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 300, lineHeight: 1, color: 'var(--color-white)' }}>
                30<span style={{ color: 'var(--color-accent)' }}>+</span>
              </span>
              <span style={{ fontSize: '0.625rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.45)', marginTop: '0.25rem' }}>
                Years of<br />Excellence
              </span>
            </div>
          </div>

          {/* Text */}
          <div className="about-story-text">
            <AnimatedElement>
              <p className="section-label" style={{ color: 'var(--color-accent)' }}>
                {content.label}
              </p>
            </AnimatedElement>

            <AnimatedElement delay={0.05}>
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)',
                  fontWeight: 300,
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                  color: 'var(--color-primary)',
                  marginBottom: '1.75rem',
                }}
              >
                {content.headline}
              </h2>
            </AnimatedElement>

            <AnimatedElement delay={0.1}>
              <div style={{ width: '36px', height: '2px', background: 'var(--color-accent)', marginBottom: '1.75rem' }} />
            </AnimatedElement>

            <AnimatedElement delay={0.15}>
              <div>
                <p style={{ fontSize: 'clamp(0.875rem, 0.95vw, 0.9375rem)', fontWeight: 400, lineHeight: 1.75, color: 'var(--color-gray-500)', marginBottom: para2 ? '1.25rem' : 0 }}>
                  {para1}
                </p>
                {para2 && (
                  <p style={{ fontSize: 'clamp(0.875rem, 0.95vw, 0.9375rem)', fontWeight: 400, lineHeight: 1.75, color: 'var(--color-gray-500)' }}>
                    {para2}
                  </p>
                )}
              </div>
            </AnimatedElement>

            {(content.cta || content.secondaryLink) && (
              <AnimatedElement delay={0.2}>
                <div
                  style={{
                    marginTop: '2.25rem',
                    paddingTop: '1.75rem',
                    borderTop: '1px solid var(--color-gray-200)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2rem',
                    flexWrap: 'wrap',
                  }}
                >
                  {content.cta && (
                    <Link href={content.cta.href} className="btn-link">
                      {content.cta.text}
                      <ArrowRight />
                    </Link>
                  )}
                  {content.secondaryLink && (
                    <Link href={content.secondaryLink.href} className="hover-accent" style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--color-gray-400)', textDecoration: 'none', transition: 'color 0.3s ease' }}>
                      {content.secondaryLink.text}
                    </Link>
                  )}
                </div>
              </AnimatedElement>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
