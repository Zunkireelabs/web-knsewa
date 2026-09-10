'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GridLines } from '@/components/ui/GridLines';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceDeliverablesSectionProps {
  deliverables: string[];
  intro?: string;
}

export function ServiceDeliverablesSection({ deliverables, intro }: ServiceDeliverablesSectionProps) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const ctx = gsap.context(() => {
      const items = list.querySelectorAll('.deliverable-row');
      gsap.fromTo(
        items,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: list,
            start: 'top 65%',
          },
        }
      );
    }, list);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="prel"
      style={{
        background: 'var(--color-white)',
        padding: '2rem 0',
      }}
    >
      <GridLines variant="gray" />

      <div className="wrapper prel" style={{ zIndex: 10 }}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-16 md:items-center">

          {/* Left — label + headline + intro, padded to sit inside left grid column */}
          <div
            className="md:col-span-2"
            style={{ maxWidth: '320px', width: '100%' }}
          >
            <SectionHeader
              label="WHAT WE DELIVER"
              headline="Our Services"
              align="left"
            />
            {intro && (
              <p
                style={{
                  marginTop: '1.25rem',
                  fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)',
                  lineHeight: 1.65,
                  color: 'var(--color-gray-500)',
                  maxWidth: '28ch',
                }}
              >
                {intro}
              </p>
            )}
          </div>

          {/* Right — numbered rows shifted to sit inside right grid column */}
          <div
            ref={listRef}
            className="md:col-span-3"
            style={{ margin: '0 auto', maxWidth: '480px', width: '100%' }}
          >
            {deliverables.map((item, i) => (
              <div
                key={i}
                className="deliverable-row"
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '1.5rem',
                  padding: 'clamp(0.875rem, 1.5vw, 1.125rem) 0',
                  borderTop: i > 0 ? '1px solid var(--color-gray-200)' : 'none',
                }}
              >
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    color: 'var(--color-gray-400)',
                    flexShrink: 0,
                    minWidth: '1.75rem',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  style={{
                    fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)',
                    fontWeight: 400,
                    lineHeight: 1.5,
                    color: 'var(--color-primary)',
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
