'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ProcessStep } from '@/types/content';
import { SectionHeader } from '@/components/ui/SectionHeader';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ApproachSectionProps {
  label: string;
  headline: string;
  steps: ProcessStep[];
}

export function ApproachSection({ label, headline, steps }: ApproachSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: section, start: 'top 60%' },
        }
      );

      const cards = section.querySelectorAll('.step-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 60%' },
        }
      );

      const numbers = section.querySelectorAll('.step-number');
      gsap.fromTo(
        numbers,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          delay: 0.3,
          ease: 'back.out(1.7)',
          scrollTrigger: { trigger: section, start: 'top 60%' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-36 bg-[var(--color-primary)] overflow-hidden"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'url(/images/hero-construction.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-[var(--color-primary)]/95" />
      </div>

      <div className="wrapper relative">
        <SectionHeader label={label} headline={headline} align="center" variant="dark" />

        {/* ── Mobile: left dot-and-line timeline (below md) ── */}
        <div className="md:hidden relative mt-12">
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '15px',
            top: '8px',
            bottom: '8px',
            width: '1px',
            background: 'var(--color-accent)',
            opacity: 0.25,
          }} />

          {steps.map((step, i) => (
            <div
              key={step.id}
              className="step-card"
              style={{
                display: 'flex',
                gap: '1.25rem',
                paddingBottom: i < steps.length - 1 ? '2rem' : 0,
                position: 'relative',
              }}
            >
              {/* Dot */}
              <div style={{ flexShrink: 0 }}>
                <div
                  className="step-number"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--color-primary)',
                    border: '1.5px solid var(--color-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 2,
                    boxShadow: '0 0 0 4px var(--color-primary)',
                  }}
                >
                  <span style={{
                    fontSize: '0.625rem',
                    fontWeight: 500,
                    color: 'var(--color-accent)',
                    letterSpacing: '0.05em',
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    {step.step}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ flex: 1, paddingTop: '4px', paddingBottom: '0.25rem' }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  lineHeight: 1.3,
                  color: 'var(--color-white)',
                  marginBottom: '0.5rem',
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  lineHeight: 1.65,
                  color: 'rgba(255,255,255,0.5)',
                }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Desktop: original 4-column grid (md and above) ── */}
        <div className="hidden md:block relative mt-16 lg:mt-24">
          {/* Connecting line */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-[32px] left-[12.5%] right-[12.5%] h-[1px] bg-white/15 origin-left z-0"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {steps.map((step) => (
              <div key={step.id} className="step-card flex flex-col items-center text-center">
                <div className="step-number w-16 h-16 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-primary)] flex items-center justify-center mb-8 relative">
                  <span className="text-[var(--color-accent)] text-[15px] font-medium tracking-[0.05em]">
                    {step.step}
                  </span>
                  <div className="absolute inset-[-6px] rounded-full border border-[var(--color-accent)]/15" />
                </div>
                <h3 className="text-fs-19 lg:text-fs-24 font-medium leading-[1.2] text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-[14px] lg:text-fs-16 leading-[1.7] text-white/50 max-w-[280px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
