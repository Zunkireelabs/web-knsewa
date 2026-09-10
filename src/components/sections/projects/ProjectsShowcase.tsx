'use client';

import React, { useEffect, useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from '@/components/ui/Icons';
import type { Project } from '@/types/content';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectsShowcaseProps {
  projects: Project[];
}

export function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const mmRef = useRef<gsap.MatchMedia | null>(null);

  // Pick 4 best projects for showcase (varied categories, with good images)
  const featured = projects.filter((p) =>
    ['project-1', 'project-9', 'project-8', 'project-3', 'project-5', 'project-10'].includes(p.id)
  ).slice(0, 4);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const container = containerRef.current;
    const progress = progressRef.current;
    if (!section || !track || !container) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const totalWidth = track.scrollWidth;
      const viewportWidth = container.offsetWidth;
      const scrollDistance = totalWidth - viewportWidth;

      if (scrollDistance <= 0) return;

      // Horizontal scroll
      const scrollTween = gsap.to(track, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollDistance * 1.2}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Progress bar
      if (progress) {
        gsap.fromTo(
          progress,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${scrollDistance * 1.2}`,
              scrub: 1,
            },
          }
        );
      }

      // Parallax images inside each card (image moves slower)
      const cards = track.querySelectorAll('.showcase-card');
      cards.forEach((card) => {
        const img = card.querySelector('.showcase-card-img-inner');
        if (!img) return;
        gsap.fromTo(img, { x: '-5%' }, {
          x: '5%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${scrollDistance * 1.2}`,
            scrub: 1.5,
          },
        });
      });

      return () => {
        scrollTween.kill();
        ScrollTrigger.getAll()
          .filter((t) => t.trigger === section)
          .forEach((t) => t.kill());
      };
    });

    mm.add('(max-width: 1023px)', () => {
      const mobileTrack = mobileTrackRef.current;
      const mobileContainer = mobileContainerRef.current;
      if (!mobileTrack || !mobileContainer) return;

      const totalWidth = mobileTrack.scrollWidth;
      const viewportWidth = mobileContainer.offsetWidth;
      const scrollDistance = totalWidth - viewportWidth;
      if (scrollDistance <= 0) return;

      const tween = gsap.to(mobileTrack, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.kill();
        ScrollTrigger.getAll()
          .filter((t) => t.trigger === section)
          .forEach((t) => t.kill());
      };
    });

    mmRef.current = mm;
  }, []);

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
      className="showcase-section"
      style={{
        background: 'var(--color-primary)',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Progress bar at top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'rgba(255,255,255,0.06)',
          zIndex: 20,
        }}
      >
        <div
          ref={progressRef}
          style={{
            height: '100%',
            background: 'var(--color-accent)',
            transformOrigin: 'left',
            transform: 'scaleX(0)',
          }}
        />
      </div>

      <div style={{ padding: 'clamp(3rem, 5vw, 5rem) 0' }}>
        {/* Header */}
        <div
          style={{
            paddingLeft: 'max(1rem, calc((100vw - 1440px) / 2 + 2rem))',
            paddingRight: 'max(1rem, 2rem)',
            marginBottom: 'clamp(2rem, 3.5vw, 3rem)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '0.75rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'var(--color-accent)',
                marginBottom: '1rem',
              }}
            >
              Featured Work
            </p>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)',
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                color: 'var(--color-white)',
              }}
            >
              Landmark Projects
            </h2>
          </div>
          <p
            className="showcase-scroll-hint"
            style={{
              fontSize: '0.6875rem',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.2)',
              letterSpacing: '0.05em',
            }}
          >
            Scroll to explore
          </p>
        </div>

        {/* ── Desktop: horizontal GSAP track (1024px+) ── */}
        <div ref={containerRef} className="hidden lg:block" style={{ overflow: 'hidden' }}>
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              gap: 'clamp(1.25rem, 2vw, 2rem)',
              paddingLeft: 'max(2rem, calc((100vw - 1440px) / 2 + 2rem))',
              paddingRight: '6rem',
            }}
          >
            {featured.map((project, i) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="showcase-card"
                style={{
                  flexShrink: 0,
                  width: 'clamp(500px, 45vw, 700px)',
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                }}
              >
                {/* Image with parallax inner */}
                <div
                  style={{
                    position: 'relative',
                    height: 'clamp(320px, 40vh, 480px)',
                    overflow: 'hidden',
                    background: 'var(--color-gray-200)',
                  }}
                >
                  <div
                    className="showcase-card-img-inner"
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: '-10%',
                      width: '120%',
                      willChange: 'transform',
                    }}
                  >
                    <Image
                      src={project.images.featured}
                      alt={project.title}
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
                      background: 'linear-gradient(180deg, transparent 40%, rgba(23,23,27,0.9) 100%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Number */}
                  <span
                    style={{
                      position: 'absolute',
                      top: 'clamp(1rem, 1.5vw, 1.5rem)',
                      left: 'clamp(1rem, 1.5vw, 1.5rem)',
                      fontSize: '0.625rem',
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.3)',
                      letterSpacing: '0.05em',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')} / {String(featured.length).padStart(2, '0')}
                  </span>

                  {/* Category */}
                  <span
                    style={{
                      position: 'absolute',
                      top: 'clamp(1rem, 1.5vw, 1.5rem)',
                      right: 'clamp(1rem, 1.5vw, 1.5rem)',
                      fontSize: '0.5625rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--color-white)',
                      background: 'rgba(11,93,208,0.4)',
                      backdropFilter: 'blur(8px)',
                      padding: '0.3rem 0.625rem',
                      borderRadius: '2px',
                    }}
                  >
                    {project.category}
                  </span>

                  {/* Bottom text overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: 'clamp(1.25rem, 2vw, 2rem)',
                      zIndex: 2,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 'clamp(1.125rem, 1.5vw, 1.5rem)',
                        fontWeight: 500,
                        lineHeight: 1.2,
                        color: 'var(--color-white)',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 400,
                        color: 'rgba(255,255,255,0.4)',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {project.location} {project.client ? `\u2014 ${project.client}` : ''}
                    </p>
                  </div>
                </div>

                {/* Bottom bar with CTA */}
                <div
                  className="showcase-card-bar"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem clamp(1.25rem, 2vw, 2rem)',
                    background: 'rgba(255,255,255,0.03)',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 400,
                      color: 'rgba(255,255,255,0.3)',
                    }}
                  >
                    {project.scope}
                  </span>
                  <span
                    className="showcase-card-cta"
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: 'var(--color-accent)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'gap 0.3s ease',
                    }}
                  >
                    View Details <ArrowRight width={20} height={8} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Mobile/tablet: scroll-driven horizontal translate (below 1024px) ── */}
        <div ref={mobileContainerRef} className="lg:hidden" style={{ overflow: 'hidden' }}>
          <div
            ref={mobileTrackRef}
            style={{
              display: 'flex',
              gap: '1rem',
              paddingLeft: '1.25rem',
              paddingRight: '1.25rem',
              willChange: 'transform',
            }}
          >
            {featured.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="showcase-card"
                style={{
                  flexShrink: 0,
                  width: 'min(80vw, 320px)',
                  scrollSnapAlign: 'start',
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '4/3',
                    overflow: 'hidden',
                    background: 'var(--color-gray-200)',
                  }}
                >
                  <Image
                    src={project.images.featured}
                    alt={project.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 40%, rgba(23,23,27,0.9) 100%)',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--color-white)',
                      background: 'rgba(11,93,208,0.4)',
                      backdropFilter: 'blur(8px)',
                      padding: '0.3rem 0.625rem',
                      borderRadius: '2px',
                    }}
                  >
                    {project.category}
                  </span>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.25rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 500, lineHeight: 1.2, color: 'var(--color-white)', marginBottom: '0.25rem' }}>
                      {project.title}
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                      {project.location}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1.25rem', background: 'rgba(255,255,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>{project.scope}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-accent)', display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
                    View <ArrowRight width={16} height={6} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
