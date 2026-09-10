'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Specialization } from '@/types/content';
import { SectionHeader } from '@/components/ui/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

interface SpecializationsGridProps {
  specializations: Specialization[];
}

function SpecializationCard({ item }: { item: Specialization }) {
  return (
    <Link
      href={item.href}
      className="group relative aspect-[3/4] lg:aspect-[4/5] rounded-2xl overflow-hidden block"
    >
      {/* Background image */}
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />

      {/* Gradient */}
      <div
        className="absolute inset-0 transition-opacity duration-500 lg:group-hover:opacity-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 55%, transparent 100%)' }}
      />

      {/* Default content — heading only, fades on desktop hover */}
      <div className="absolute bottom-0 left-0 right-0 lg:transition-opacity lg:duration-300 lg:group-hover:opacity-0" style={{ padding: '20px' }}>
        <h3
          className="font-medium text-white text-[1.125rem] lg:text-[1.5rem]"
          style={{ lineHeight: 1.2 }}
        >
          {item.title}
        </h3>
      </div>

      {/* Hover overlay + content — desktop only */}
      <div
        className="hidden lg:flex absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex-col justify-start"
        style={{
          background: 'rgba(0,0,0,0.58)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          padding: '24px',
        }}
      >
        <h3 className="text-white fs-24 font-medium leading-[1.2] mb-3">
          {item.title}
        </h3>
        <p className="text-white/80 text-[14px] leading-[1.6]" style={{ marginBottom: item.bullets?.length ? '14px' : 0 }}>
          {item.description}
        </p>
        {item.bullets && (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '7px' }}>
            {item.bullets.map((b) => (
              <li key={b} className="text-white/75 flex items-center gap-2" style={{ fontSize: '0.8rem', lineHeight: 1.4 }}>
                <span className="w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  );
}

export function SpecializationsGrid({ specializations }: SpecializationsGridProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('.spec-card');

      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-[var(--color-primary)] overflow-hidden"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="wrapper relative">
        <SectionHeader
          label="SPECIALIZATIONS"
          headline="Areas of Expertise"
          variant="dark"
          align="left"
        />

        <div className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {specializations.map((item) => (
            <div key={item.id} className="spec-card">
              <SpecializationCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
