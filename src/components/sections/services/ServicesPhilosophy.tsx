'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServicesPhilosophyProps {
  quote: string;
  description: string;
}

export function ServicesPhilosophy({ quote, description }: ServicesPhilosophyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const quoteEl = quoteRef.current;
    const lineEl = lineRef.current;
    const descEl = descRef.current;
    const imageEl = imageRef.current;
    if (!section || !quoteEl || !lineEl || !descEl) return;

    const ctx = gsap.context(() => {
      // Quote fade up
      gsap.fromTo(
        quoteEl,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
        }
      );

      // Accent line grows
      gsap.fromTo(
        lineEl,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: lineEl,
            start: 'top 85%',
          },
        }
      );

      // Description fades in
      gsap.fromTo(
        descEl,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: descEl,
            start: 'top 85%',
          },
        }
      );

      // Image reveal
      if (imageEl) {
        gsap.fromTo(
          imageEl,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imageEl,
              start: 'top 80%',
            },
          }
        );

        // Subtle parallax on image
        const img = imageEl.querySelector('.parallax-img');
        if (img) {
          gsap.to(img, {
            y: -40,
            ease: 'none',
            scrollTrigger: {
              trigger: imageEl,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          });
        }
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
      style={{ padding: 'clamp(5rem, 8vw, 8rem) 0' }}
    >
      <div className="wrapper">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_42%] gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <div>
            {/* Large editorial quote */}
            <div ref={quoteRef}>
              <blockquote
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.8rem)',
                  fontWeight: 300,
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                  color: 'var(--color-primary)',
                  marginBottom: 'clamp(2rem, 3vw, 3rem)',
                }}
              >
                &ldquo;{quote}&rdquo;
              </blockquote>
            </div>

            {/* Accent divider */}
            <div
              ref={lineRef}
              style={{
                width: 60,
                height: 3,
                background: 'var(--color-accent)',
                marginBottom: 'clamp(1.5rem, 2vw, 2.5rem)',
                transformOrigin: 'left',
              }}
            />

            {/* Supporting description */}
            <p
              ref={descRef}
              style={{
                fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)',
                fontWeight: 400,
                lineHeight: 1.7,
                color: 'var(--color-gray-500)',
                maxWidth: 560,
              }}
            >
              {description}
            </p>
          </div>

          {/* Image */}
          <div
            ref={imageRef}
            style={{ position: 'relative', overflow: 'hidden', borderRadius: 16 }}
            className="aspect-[16/10] sm:aspect-[4/5] lg:aspect-[3/4]"
          >
            <Image
              src="/images/services/commercial.jpg"
              alt="KNSEWA construction expertise"
              fill
              className="object-cover parallax-img"
              sizes="(max-width: 1024px) 100vw, 42vw"
              style={{ transform: 'scale(1.1)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
