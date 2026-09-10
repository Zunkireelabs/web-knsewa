'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GridLines } from '@/components/ui/GridLines';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { ArrowRight } from '@/components/ui/Icons';
import type { Service } from '@/types/content';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServicesSectionProps {
  headline: string;
  description: string;
  services: Service[];
}

export function ServicesSection({ headline, description, services }: ServicesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex];
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Animate content change
  useEffect(() => {
    const content = contentRef.current;
    const image = imageRef.current;
    if (!content || !image) return;

    const tl = gsap.timeline();

    // Crossfade content
    tl.to([content, image], {
      opacity: 0,
      duration: 0.2,
      ease: 'power1.inOut',
    });

    tl.to([content, image], {
      opacity: 1,
      duration: 0.35,
      ease: 'power1.inOut',
    });

    return () => {
      tl.kill();
    };
  }, [activeIndex]);

  return (
    <section className="services-section">
      <GridLines variant="gray" />

      <div className="wrapper prel" style={{ zIndex: 10 }}>
        {/* Header */}
        <div className="services-header section-header">
          <AnimatedElement>
            <h2
              className="font-light"
              style={{
                fontSize: 'clamp(2rem, 3vw, 2.8125rem)',
                lineHeight: '1.1',
                letterSpacing: '-0.01em',
                color: 'var(--color-primary)',
              }}
            >
              {headline}
            </h2>
          </AnimatedElement>
          <AnimatedElement delay={0.1}>
            <p
              className="mt-6"
              style={{
                fontSize: 'clamp(1rem, 1.2vw, 1.1875rem)',
                lineHeight: '1.6',
                color: 'var(--color-gray-500)',
              }}
            >
              {description}
            </p>
          </AnimatedElement>
        </div>

        {/* Desktop: Services Grid (nav + detail) */}
        <div className="services-grid services-desktop">
          {/* Left - Service List with Progress Indicator */}
          <nav className="services-nav">
            <AnimatedElement direction="left">
              {services.map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => setActiveIndex(index)}
                  className={`service-nav-item ${activeIndex === index ? 'active' : ''}`}
                >
                  <span className="service-indicator" />
                  <span className="service-index">{service.index}</span>
                  <span className="service-nav-title">{service.shortTitle}</span>
                </button>
              ))}
            </AnimatedElement>
          </nav>

          {/* Right - Active Service Detail */}
          <div className="services-content">
            <div ref={contentRef} className="services-text">
              <p className="section-label" style={{ color: 'var(--color-gray-500)', marginBottom: '1.25rem' }}>
                {activeService.title}
              </p>
              <h3
                className="font-light"
                style={{
                  fontSize: 'clamp(1.75rem, 2.5vw, 2.5rem)',
                  lineHeight: '1.1',
                  letterSpacing: '-0.01em',
                  color: 'var(--color-primary)',
                  marginBottom: '2rem',
                }}
              >
                {activeService.title}
              </h3>
              <p
                style={{
                  fontSize: 'clamp(0.875rem, 1vw, 1rem)',
                  lineHeight: '1.6',
                  color: 'var(--color-gray-500)',
                  marginBottom: '3rem',
                }}
              >
                {activeService.description}
              </p>
              <Link href={activeService.href} className="btn-link group">
                Learn More
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="services-image">
              <div ref={imageRef} className="services-image-wrapper">
                <Image
                  src={activeService.image}
                  alt={activeService.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Horizontal scrollable cards */}
        <div className="services-mobile-scroll">
          {services.map((service) => (
            <Link key={service.id} href={service.href} className="services-mobile-card">
              <div className="services-mobile-card-image">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="services-mobile-card-label">
                <span>{service.shortTitle}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
