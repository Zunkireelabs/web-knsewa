'use client';

import React, { useRef, useEffect, useLayoutEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface Specialization {
  id: string;
  title: string;
  tagline: string;
  description: string;
  bullets?: string[];
  image: string;
  href: string;
}

interface SpecializationsSectionProps {
  specializations: Specialization[];
  title?: string;
}

/**
 * Specializations Section
 *
 * Features:
 * - Horizontal scroll triggered by vertical scroll (GSAP ScrollTrigger)
 * - Shows 4 cards at a time
 * - Section pins while cards scroll horizontally
 * - Card hover effects: light bg, description appears, larger arrow
 */
export function SpecializationsSection({
  specializations,
  title = 'Our Specializations',
}: SpecializationsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    const cardsContainer = cardsContainerRef.current;

    if (!section || !trigger || !cardsContainer) return;

    // Calculate scroll distance (total width - viewport width)
    const totalWidth = cardsContainer.scrollWidth;
    const viewportWidth = trigger.offsetWidth;
    const scrollDistance = totalWidth - viewportWidth;

    // Only apply horizontal scroll on desktop
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const scrollTween = gsap.to(cardsContainer, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        scrollTween.kill();
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger === section) t.kill();
        });
      };
    });

    mmRef.current = mm;
  }, []);

  // useLayoutEffect cleanup runs BEFORE DOM mutations — critical for pin: true
  const mmRef = useRef<gsap.MatchMedia | null>(null);
  useLayoutEffect(() => {
    return () => {
      if (mmRef.current) {
        mmRef.current.revert();
        mmRef.current = null;
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="specializations-section bg-white relative"
    >
      {/* ── Desktop layout: pinned horizontal scroll (1024px+) ── */}
      <div className="hidden lg:flex h-full flex-col">
        <div style={{ marginBottom: '20px', paddingLeft: 'max(2rem, calc((100vw - 1440px) / 2 + 2rem))' }}>
          <h2
            className="font-light text-left"
            style={{
              fontSize: 'clamp(2rem, 3vw, 2.8125rem)',
              lineHeight: '1.1',
              letterSpacing: '-0.01em',
              color: 'var(--color-primary)',
            }}
          >
            {title}
          </h2>
        </div>

        {/* overflow-x:clip clips horizontal scroll without constraining vertical height */}
        <div ref={triggerRef} className="relative" style={{ overflowX: 'clip', overflowY: 'visible' }}>
          <div
            ref={cardsContainerRef}
            className="flex"
            style={{ paddingLeft: 'max(2rem, calc((100vw - 1440px) / 2 + 2rem))', paddingRight: '2rem', gap: '38px' }}
          >
            {specializations.map((spec) => (
              <SpecializationCard key={spec.id} specialization={spec} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile / tablet layout: responsive grid (below 1024px) ── */}
      <div className="lg:hidden" style={{ paddingTop: '2.5rem', paddingBottom: '3rem' }}>
        <div className="wrapper">
          <h2
            className="font-light text-left mb-8"
            style={{
              fontSize: 'clamp(1.75rem, 6vw, 2.5rem)',
              lineHeight: '1.1',
              letterSpacing: '-0.01em',
              color: 'var(--color-primary)',
            }}
          >
            {title}
          </h2>
          <div className="flex flex-col gap-5">
            {specializations.map((spec) => (
              <SpecializationCard key={spec.id} specialization={spec} mobile />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Specialization Card Component
 *
 * Design:
 * - Full background image
 * - Rounded corners
 * - Title label at bottom-left with accent background
 * - White text on accent background
 */
function SpecializationCard({
  specialization,
  mobile = false,
}: {
  specialization: Specialization;
  mobile?: boolean;
}) {
  if (mobile) {
    return (
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ width: '100%', aspectRatio: '3/4' }}
      >
        <Image
          src={specialization.image}
          alt={specialization.title}
          fill
          className="object-cover"
        />
        {/* Always-visible gradient overlay with title + content */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 55%, transparent 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '20px',
          }}
        >
          <h3
            style={{
              fontSize: '1.125rem',
              fontWeight: 500,
              lineHeight: 1.2,
              color: 'var(--color-white)',
              marginBottom: '0.25rem',
            }}
          >
            {specialization.title}
          </h3>
          <p
            style={{
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.4,
              marginBottom: '0.625rem',
            }}
          >
            {specialization.description}
          </p>
          {specialization.bullets && (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {specialization.bullets.map((b) => (
                <li
                  key={b}
                  style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.3 }}
                >
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="group block flex-shrink-0 relative overflow-hidden rounded-2xl cursor-default"
      style={{ width: 'calc(25vw)', minWidth: '300px', maxWidth: '400px', aspectRatio: '3/4' }}
    >
      {/* Background Image */}
      <Image
        src={specialization.image}
        alt={specialization.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Default: gradient + white title */}
      <div className="absolute inset-x-0 bottom-0 transition-opacity duration-300 group-hover:opacity-0"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
          borderBottomLeftRadius: '1rem',
          borderBottomRightRadius: '1rem',
          padding: 'clamp(28px, 6vw, 48px) 24px 24px',
        }}
      >
        <h3
          className="font-normal text-white"
          style={{
            fontSize: 'clamp(1.25rem, 1.8vw, 1.5rem)',
            lineHeight: '1.3',
          }}
        >
          {specialization.title}
        </h3>
      </div>

      {/* Hover: soft blur + dark tint */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-start"
        style={{
          background: 'rgba(0, 0, 0, 0.58)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          padding: '32px 24px',
        }}
      >
        <h3
          className="font-normal text-white"
          style={{
            fontSize: 'clamp(1.25rem, 1.8vw, 1.5rem)',
            lineHeight: '1.3',
            marginBottom: '20px',
          }}
        >
          {specialization.title}
        </h3>
        <p
          className="text-white/80"
          style={{
            fontSize: 'clamp(0.8rem, 1.1vw, 0.9rem)',
            lineHeight: '1.6',
            marginBottom: specialization.bullets?.length ? '14px' : '0',
          }}
        >
          {specialization.description}
        </p>
        {specialization.bullets && (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '7px' }}>
            {specialization.bullets.map((b) => (
              <li
                key={b}
                className="text-white/75 flex items-center gap-2"
                style={{ fontSize: 'clamp(0.75rem, 1vw, 0.8rem)', lineHeight: '1.4' }}
              >
                <span className="w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
