'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowIcon } from '@/components/ui/Icons';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CTACard {
  id: string;
  icon: string;
  title: string;
  description: string;
  image: string;
  cta: {
    text: string;
    href: string;
  };
}

interface CTAPopupSectionProps {
  cards: CTACard[];
}

export function CTAPopupSection({ cards }: CTAPopupSectionProps) {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cardsEl = cardsRef.current;
    if (!section || !cardsEl) return;

    // Animate cards on scroll
    gsap.fromTo(
      cardsEl.children,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === section)
        .forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-0 bg-[var(--color-primary)]">
      <div
        ref={cardsRef}
        className="flex flex-col lg:flex-row"
      >
        {cards.map((card) => {
          const isActive = activeCard === card.id;

          return (
            <div
              key={card.id}
              className={`cta-popup-card group relative overflow-hidden transition-all duration-500 ease-out ${
                isActive ? 'lg:flex-[2]' : 'lg:flex-1'
              } ${activeCard && !isActive ? 'lg:flex-[0.5]' : ''}`}
              onMouseEnter={() => setActiveCard(card.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className={`object-cover transition-all duration-700 ${
                    isActive ? 'scale-100' : 'scale-110'
                  }`}
                />
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive
                      ? 'bg-gradient-to-t from-black/80 via-black/40 to-transparent'
                      : 'bg-[var(--color-primary)]/90'
                  }`}
                />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-end min-h-[240px] sm:min-h-[320px] lg:min-h-[500px] p-5 sm:p-8 lg:p-12">
                {/* Icon */}
                <div
                  className={`text-4xl mb-4 transition-all duration-500 ${
                    isActive ? 'opacity-0 -translate-y-4' : 'opacity-100'
                  }`}
                >
                  {card.icon}
                </div>

                {/* Title */}
                <h3
                  className={`text-2xl lg:text-3xl font-light text-white mb-4 transition-all duration-500 ${
                    isActive ? '-translate-y-2' : ''
                  }`}
                >
                  {card.title}
                </h3>

                {/* Description — always visible on mobile, hover-only on desktop */}
                <p
                  className={`text-white/80 mb-4 max-w-md text-sm sm:text-base transition-all duration-500 ${
                    isActive ? 'opacity-100 translate-y-0' : 'lg:opacity-0 lg:translate-y-4'
                  }`}
                >
                  {card.description}
                </p>

                {/* CTA Link — always visible on mobile, hover-only on desktop */}
                <Link
                  href={card.cta.href}
                  className={`group/link inline-flex items-center gap-2 text-white font-medium transition-all duration-500 ${
                    isActive ? 'opacity-100 translate-y-0' : 'lg:opacity-0 lg:translate-y-4'
                  }`}
                >
                  {card.cta.text}
                  <ArrowIcon className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// Default content for the CTA Popup Section
export const defaultCTACards: CTACard[] = [
  {
    id: 'project',
    icon: '🏗️',
    title: 'A Project',
    description:
      'From commercial buildings to infrastructure, we bring expertise and innovation to every project. Let us help you build your vision.',
    image: '/images/projects/project-1.jpg',
    cta: {
      text: 'Start Your Project',
      href: '/contact',
    },
  },
  {
    id: 'future',
    icon: '🌱',
    title: 'A Better Future',
    description:
      'We are committed to sustainable construction practices that protect our environment and communities for generations to come.',
    image: '/images/projects/project-3.jpg',
    cta: {
      text: 'Our Sustainability',
      href: '/sustainability',
    },
  },
];
