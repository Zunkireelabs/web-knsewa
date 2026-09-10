'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { ArrowRight, PhoneIcon } from '@/components/ui/Icons';
import type { CTAContent } from '@/types/content';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CTASectionProps {
  content: CTAContent;
}

export function CTASection({ content }: CTASectionProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    // Subtle parallax on background
    gsap.to(image, {
      y: '15%',
      ease: 'none',
      scrollTrigger: {
        trigger: image.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === image.parentElement)
        .forEach((t) => t.kill());
    };
  }, []);

  // Animate the accent line width on scroll
  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    gsap.fromTo(
      line,
      { width: '0%' },
      {
        width: '100%',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: line.parentElement,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section className="cta-section-v2">
      {/* Background image with parallax */}
      <div className="cta-v2-bg">
        <div ref={imageRef} className="cta-v2-bg-inner">
          <Image
            src="/images/banners/about-banner.jpg"
            alt="Construction site"
            fill
            className="object-cover"
            style={{ objectPosition: 'center 60%' }}
            unoptimized
          />
        </div>
        <div className="cta-v2-overlay" />
      </div>

      {/* Content */}
      <div className="wrapper prel" style={{ zIndex: 10 }}>
        <div className="cta-v2-layout">
          {/* Left: main content */}
          <div className="cta-v2-left">
            <AnimatedElement>
              <p className="cta-v2-label">{content.label}</p>
            </AnimatedElement>

            <AnimatedElement delay={0.05}>
              <h2 className="cta-v2-headline">{content.headline}</h2>
            </AnimatedElement>

            <AnimatedElement delay={0.1}>
              <div ref={lineRef} className="cta-v2-accent-line" />
            </AnimatedElement>

            <AnimatedElement delay={0.15}>
              <p className="cta-v2-description">{content.description}</p>
            </AnimatedElement>

            <AnimatedElement delay={0.2}>
              <div className="cta-v2-actions">
                <Link href={content.primaryCTA.href} className="btn-primary">
                  {content.primaryCTA.text}
                  <ArrowRight width={24} height={10} />
                </Link>

                {content.secondaryCTA && (
                  <Link href={content.secondaryCTA.href} className="btn-link white">
                    {content.secondaryCTA.text}
                    <ArrowRight width={24} height={10} />
                  </Link>
                )}
              </div>
            </AnimatedElement>
          </div>

          {/* Right: trust indicators */}
          <div className="cta-v2-right">
            <AnimatedElement delay={0.15} direction="right">
              <div className="cta-v2-trust">
                {/* Phone */}
                <div className="cta-v2-trust-item">
                  <div className="cta-v2-trust-icon">
                    <PhoneIcon width={20} height={20} />
                  </div>
                  <div>
                    <p className="cta-v2-trust-label">Call Us Directly</p>
                    <a href="tel:021-503204" className="cta-v2-trust-value">021-503204</a>
                  </div>
                </div>

                <div className="cta-v2-trust-divider" />

                {/* Stats row */}
                <div className="cta-v2-stats-row">
                  <div className="cta-v2-stat">
                    <span className="cta-v2-stat-value">500+</span>
                    <span className="cta-v2-stat-label">Projects</span>
                  </div>
                  <div className="cta-v2-stat">
                    <span className="cta-v2-stat-value">30+</span>
                    <span className="cta-v2-stat-label">Years</span>
                  </div>
                  <div className="cta-v2-stat">
                    <span className="cta-v2-stat-value">7</span>
                    <span className="cta-v2-stat-label">Provinces</span>
                  </div>
                </div>

                <div className="cta-v2-trust-divider" />

                {/* Email */}
                <div className="cta-v2-trust-item">
                  <div>
                    <p className="cta-v2-trust-label">Email Us</p>
                    <a href="mailto:khushbunirmansewa@gmail.com" className="cta-v2-trust-value">
                      khushbunirmansewa@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </section>
  );
}
