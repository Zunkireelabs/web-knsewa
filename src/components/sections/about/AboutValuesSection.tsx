'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GridLines } from '@/components/ui/GridLines';
import { AnimatedElement, StaggerContainer } from '@/components/ui/AnimatedElement';
import type { ValueItem } from '@/types/content';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Map each value to a real project image + stat
const valueVisuals: Record<string, { image: string; stat: string; statLabel: string }> = {
  excellence: {
    image: '/images/project-galleries/project-9/top-view.jpg',
    stat: '500+',
    statLabel: 'Projects Delivered',
  },
  integrity: {
    image: '/images/awards/patan-token-distribution.jpg',
    stat: '30+',
    statLabel: 'Years of Trust',
  },
  safety: {
    image: '/images/sliders/slider-3-img.jpg',
    stat: '100%',
    statLabel: 'Safety Commitment',
  },
  innovation: {
    image: '/images/project-galleries/project-1/Deerwalk-img1.jpg',
    stat: '7',
    statLabel: 'Storey Complex',
  },
  community: {
    image: '/images/sliders/1-main.jpg',
    stat: '1,000+',
    statLabel: 'Team Members',
  },
  sustainability: {
    image: '/images/project-galleries/project-3/6.jpg',
    stat: '7',
    statLabel: 'Provinces Served',
  },
};

interface AboutValuesSectionProps {
  label: string;
  headline: string;
  values: ValueItem[];
}

export function AboutValuesSection({ label, headline, values }: AboutValuesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const prevIndexRef = useRef(0);

  const activeValue = values[activeIndex];
  const visual = valueVisuals[activeValue?.icon] || valueVisuals.excellence;

  // Crossfade image + stat on value change
  const handleValueChange = useCallback((index: number) => {
    if (index === activeIndex) return;
    prevIndexRef.current = activeIndex;

    const container = imageContainerRef.current;
    if (container) {
      const img = container.querySelector('.values-image-active') as HTMLElement;
      const stat = container.querySelector('.values-stat-overlay') as HTMLElement;

      // Fade out current
      if (img) {
        gsap.to(img, { opacity: 0, scale: 1.05, duration: 0.4, ease: 'power2.in' });
      }
      if (stat) {
        gsap.to(stat, { opacity: 0, y: -10, duration: 0.25, ease: 'power2.in' });
      }

      // Set new index after fade out
      setTimeout(() => {
        setActiveIndex(index);

        // Fade in new (after React re-renders with new image)
        requestAnimationFrame(() => {
          const newImg = container.querySelector('.values-image-active') as HTMLElement;
          const newStat = container.querySelector('.values-stat-overlay') as HTMLElement;
          if (newImg) {
            gsap.fromTo(newImg,
              { opacity: 0, scale: 1.08 },
              { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
            );
          }
          if (newStat) {
            gsap.fromTo(newStat,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.15 }
            );
          }
        });
      }, 350);
    } else {
      setActiveIndex(index);
    }
  }, [activeIndex]);

  // Image reveal on section entry
  useEffect(() => {
    const section = sectionRef.current;
    const container = imageContainerRef.current;
    if (!section || !container) return;

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === section)
        .forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--color-primary)',
        padding: 'clamp(5rem, 9vw, 9rem) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <GridLines variant="light" />

      <div className="wrapper prel" style={{ zIndex: 10 }}>
        <div className="values-v2-layout">
          {/* Left — Image panel */}
          <div className="values-v2-image-col">
            <div
              ref={imageContainerRef}
              className="values-v2-image-wrapper"
            >
              {/* Active image */}
              <div className="values-image-active" style={{ position: 'absolute', inset: 0 }}>
                <Image
                  src={visual.image}
                  alt={activeValue?.title || 'Value'}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Gradient overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(23,23,27,0.1) 0%, rgba(23,23,27,0.6) 100%)',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />

              {/* Stat overlay */}
              <div
                className="values-stat-overlay"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 'clamp(1.5rem, 2.5vw, 2.5rem)',
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                    fontWeight: 200,
                    lineHeight: 1,
                    color: 'var(--color-white)',
                    display: 'block',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {visual.stat}
                </span>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'rgba(255,255,255,0.5)',
                    marginTop: '0.375rem',
                    display: 'block',
                  }}
                >
                  {visual.statLabel}
                </span>
              </div>

              {/* Active value number — top left */}
              <div
                style={{
                  position: 'absolute',
                  top: 'clamp(1.25rem, 2vw, 2rem)',
                  left: 'clamp(1.25rem, 2vw, 2rem)',
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    fontSize: '0.625rem',
                    fontWeight: 500,
                    color: 'var(--color-accent)',
                    letterSpacing: '0.1em',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {String(activeIndex + 1).padStart(2, '0')} / {String(values.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Right — Header + Accordion */}
          <div className="values-v2-content-col">
            {/* Header */}
            <div style={{ marginBottom: 'clamp(2rem, 3.5vw, 3rem)' }}>
              <AnimatedElement>
                <p
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    color: 'var(--color-accent)',
                    marginBottom: '1.25rem',
                  }}
                >
                  {label}
                </p>
              </AnimatedElement>
              <AnimatedElement delay={0.05}>
                <h2
                  style={{
                    fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)',
                    fontWeight: 300,
                    lineHeight: 1.1,
                    letterSpacing: '-0.01em',
                    color: 'var(--color-white)',
                  }}
                >
                  {headline}
                </h2>
              </AnimatedElement>
            </div>

            {/* Accordion */}
            <StaggerContainer stagger={0.05}>
              {values.map((value, i) => {
                const isActive = activeIndex === i;
                const num = String(i + 1).padStart(2, '0');
                const itemVisual = valueVisuals[value.icon] || valueVisuals.excellence;

                return (
                  <div
                    key={value.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleValueChange(i)}
                    onKeyDown={(e) => e.key === 'Enter' && handleValueChange(i)}
                    style={{
                      borderTop: '1px solid rgba(255,255,255,0.06)',
                      cursor: 'pointer',
                    }}
                  >
                    {/* Row header */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'clamp(0.875rem, 1.5vw, 1.5rem)',
                        padding: 'clamp(1.125rem, 1.5vw, 1.5rem) 0',
                        transition: 'padding 0.3s ease',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 500,
                          color: isActive ? 'var(--color-accent)' : 'rgba(255,255,255,0.12)',
                          letterSpacing: '0.05em',
                          fontVariantNumeric: 'tabular-nums',
                          transition: 'color 0.3s ease',
                          width: '1.5rem',
                          flexShrink: 0,
                        }}
                      >
                        {num}
                      </span>

                      <h3
                        style={{
                          fontSize: 'clamp(1rem, 1.3vw, 1.25rem)',
                          fontWeight: isActive ? 500 : 400,
                          color: isActive ? 'var(--color-white)' : 'rgba(255,255,255,0.35)',
                          lineHeight: 1.3,
                          transition: 'all 0.3s ease',
                          flex: 1,
                        }}
                      >
                        {value.title}
                      </h3>

                      {/* Stat preview on inactive rows */}
                      {!isActive && (
                        <span
                          style={{
                            fontSize: '0.6875rem',
                            fontWeight: 400,
                            color: 'rgba(255,255,255,0.12)',
                            fontVariantNumeric: 'tabular-nums',
                            transition: 'color 0.3s ease',
                            flexShrink: 0,
                          }}
                        >
                          {itemVisual.stat}
                        </span>
                      )}

                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          border: `1px solid ${isActive ? 'rgba(11,93,208,0.5)' : 'rgba(255,255,255,0.06)'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'all 0.3s ease',
                          background: isActive ? 'rgba(11,93,208,0.12)' : 'transparent',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.875rem',
                            fontWeight: 300,
                            color: isActive ? 'var(--color-accent)' : 'rgba(255,255,255,0.15)',
                            transition: 'all 0.3s ease',
                            transform: isActive ? 'rotate(45deg)' : 'rotate(0)',
                            display: 'inline-block',
                            lineHeight: 1,
                          }}
                        >
                          +
                        </span>
                      </div>
                    </div>

                    {/* Expanded content */}
                    <div
                      style={{
                        maxHeight: isActive ? '400px' : '0',
                        overflow: 'hidden',
                        transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      <div
                        style={{
                          paddingBottom: '1.5rem',
                          paddingLeft: 'calc(1.5rem + clamp(0.875rem, 1.5vw, 1.5rem))',
                        }}
                      >
                        <p
                          style={{
                            fontSize: 'clamp(0.8125rem, 0.95vw, 0.9rem)',
                            fontWeight: 400,
                            lineHeight: 1.75,
                            color: 'rgba(255,255,255,0.4)',
                            maxWidth: '480px',
                            marginBottom: '1rem',
                          }}
                        >
                          {value.description}
                        </p>

                        {/* Inline stat for active value */}
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.5rem 1rem',
                            background: 'rgba(11,93,208,0.06)',
                            borderRadius: '16px',
                            border: '1px solid rgba(11,93,208,0.1)',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '1.25rem',
                              fontWeight: 300,
                              color: 'var(--color-accent)',
                              lineHeight: 1,
                              fontVariantNumeric: 'tabular-nums',
                            }}
                          >
                            {itemVisual.stat}
                          </span>
                          <span
                            style={{
                              fontSize: '0.625rem',
                              fontWeight: 500,
                              color: 'rgba(255,255,255,0.3)',
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em',
                            }}
                          >
                            {itemVisual.statLabel}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
