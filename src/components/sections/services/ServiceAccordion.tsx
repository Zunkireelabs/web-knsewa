'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ServiceCategory } from '@/types/content';
import { ArrowRight } from '@/components/ui/Icons';

gsap.registerPlugin(ScrollTrigger);

interface ServiceAccordionProps {
  label: string;
  headline: string;
  items: ServiceCategory[];
}

export function ServiceAccordion({ label, headline, items }: ServiceAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector('.panels-container'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ padding: 'clamp(4rem, 6vw, 6rem) 0', background: 'var(--color-white)' }}
    >
      <div className="wrapper">
        {/* Header row */}
        <div style={{ marginBottom: 'clamp(2rem, 3vw, 3rem)' }}>
          <p
            style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--color-accent)',
              marginBottom: '1rem',
            }}
          >
            {label}
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              color: 'var(--color-primary)',
            }}
          >
            {headline}
          </h2>
        </div>

        {/* ── Desktop: horizontal expanding panels (1024px+) ── */}
        <div
          className="panels-container hidden lg:flex"
          style={{
            gap: 4,
            height: 'clamp(360px, 50vh, 500px)',
            borderRadius: 16,
            overflow: 'hidden',
          }}
        >
          {items.map((item, i) => {
            const isActive = activeIndex === i;
            const number = String(i + 1).padStart(2, '0');

            return (
              <Link
                key={item.id}
                href={item.href}
                className="group"
                onMouseEnter={() => setActiveIndex(i)}
                style={{
                  position: 'relative',
                  flex: isActive ? '3.5' : '1',
                  overflow: 'hidden',
                  transition: 'flex 0.6s cubic-bezier(0.65, 0, 0.35, 1)',
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="50vw"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: isActive
                      ? 'linear-gradient(to top, rgba(23,23,27,0.8) 0%, rgba(23,23,27,0.2) 50%, rgba(23,23,27,0.1) 100%)'
                      : 'rgba(23,23,27,0.55)',
                    transition: 'background 0.5s ease',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: 'clamp(1.25rem, 2vw, 2rem)',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: 'clamp(1rem, 1.5vw, 1.5rem)',
                      left: 'clamp(1rem, 1.5vw, 1.5rem)',
                      fontSize: '0.6875rem',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      color: 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {number}
                  </span>
                  <h3
                    style={{
                      fontSize: isActive ? 'clamp(1.25rem, 1.8vw, 1.5rem)' : 'clamp(0.875rem, 1.2vw, 1.125rem)',
                      fontWeight: 500,
                      lineHeight: 1.25,
                      color: 'white',
                      transition: 'font-size 0.5s ease',
                      writingMode: isActive ? 'horizontal-tb' : 'vertical-rl',
                    }}
                  >
                    {item.title}
                  </h3>
                  <div
                    style={{
                      overflow: 'hidden',
                      maxHeight: isActive ? '200px' : '0',
                      opacity: isActive ? 1 : 0,
                      transition: 'max-height 0.5s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.4s ease',
                      marginTop: isActive ? 'clamp(0.75rem, 1vw, 1rem)' : '0',
                    }}
                  >
                    <p
                      style={{
                        fontSize: 'clamp(0.8125rem, 0.95vw, 0.875rem)',
                        fontWeight: 400,
                        lineHeight: 1.6,
                        color: 'rgba(255,255,255,0.65)',
                        maxWidth: 400,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {item.description}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginTop: 'clamp(0.75rem, 1vw, 1rem)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: 'white',
                      }}
                    >
                      Explore
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight width={20} height={8} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>

      {/* ── Mobile: vertical sticky card stack — overlap from bottom (below 1024px) ── */}
      <div className="lg:hidden" style={{ position: 'relative', padding: '0 1.25rem 3rem' }}>
        {items.map((item, i) => {
          const number = String(i + 1).padStart(2, '0');
          return (
            <Link
              key={item.id}
              href={item.href}
              className="group"
              style={{
                display: 'block',
                position: 'sticky',
                top: `${i * 1.5}rem`,
                zIndex: i + 1,
                height: '72vh',
                borderRadius: 16,
                overflow: 'hidden',
                textDecoration: 'none',
              }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-active:scale-105"
                sizes="100vw"
              />
              {/* Gradient overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(23,23,27,0.85) 0%, rgba(23,23,27,0.2) 60%, rgba(23,23,27,0.1) 100%)',
                }}
              />
              {/* Card content */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  padding: '2rem 1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.6875rem',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    color: 'rgba(255,255,255,0.45)',
                    marginBottom: '0.5rem',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {number}
                </span>
                <h3
                  style={{
                    fontSize: '1.375rem',
                    fontWeight: 500,
                    color: 'white',
                    lineHeight: 1.2,
                    marginBottom: '0.625rem',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.8125rem',
                    lineHeight: 1.55,
                    color: 'rgba(255,255,255,0.55)',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {item.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
