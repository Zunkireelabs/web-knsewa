'use client';

import React from 'react';
import Image from 'next/image';
import { GridLines } from '@/components/ui/GridLines';
import { AnimatedElement, StaggerContainer } from '@/components/ui/AnimatedElement';
import type { TeamMember } from '@/types/content';

interface AboutTeamSectionProps {
  label: string;
  headline: string;
  members: TeamMember[];
}

export function AboutTeamSection({ label, headline, members }: AboutTeamSectionProps) {
  const featured = members[0];
  const rest = members.slice(1);

  return (
    <section
      className="about-team-section"
      style={{
        background: 'var(--color-primary)',
        padding: 'clamp(5rem, 9vw, 9rem) 0',
        position: 'relative',
      }}
    >
      <GridLines variant="light" />

      <div className="wrapper prel" style={{ zIndex: 10 }}>
        {/* Header */}
        <div style={{ marginBottom: 'clamp(3rem, 5vw, 4rem)' }}>
          <AnimatedElement>
            <p
              style={{
                fontSize: '0.6875rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'var(--color-accent)',
                marginBottom: '1.25rem',
              }}
            >
              {label}
            </p>
          </AnimatedElement>
          <AnimatedElement delay={0.05}>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)',
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                color: 'var(--color-white)',
              }}
            >
              {headline}
            </h2>
          </AnimatedElement>
          <AnimatedElement delay={0.1}>
            <div
              style={{
                width: '36px',
                height: '2px',
                background: 'var(--color-accent)',
                marginTop: '1.75rem',
              }}
            />
          </AnimatedElement>
        </div>

        {/* Featured + Grid Layout */}
        <div className="about-team-layout">
          {/* Featured Member (MD) */}
          <AnimatedElement direction="left" className="about-team-featured">
            <div className="about-team-featured-card">
              <div className="about-team-featured-img">
                <Image
                  src={featured.image}
                  alt={featured.name}
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'center 15%' }}
                  unoptimized
                />
              </div>
              <div className="about-team-featured-info">
                <span
                  style={{
                    fontSize: '0.625rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: 'var(--color-accent)',
                    display: 'block',
                    marginBottom: '0.5rem',
                  }}
                >
                  {featured.role}
                </span>
                <h3
                  style={{
                    fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)',
                    fontWeight: 500,
                    lineHeight: 1.2,
                    color: 'var(--color-white)',
                  }}
                >
                  {featured.name}
                </h3>
              </div>
            </div>
          </AnimatedElement>

          {/* Rest of team */}
          <StaggerContainer stagger={0.06} className="about-team-grid">
            {rest.map((member, i) => (
              <div key={member.id} className="about-team-card">
                <div className="about-team-card-img">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center 15%' }}
                    unoptimized
                  />
                </div>
                <div className="about-team-card-info">
                  <h3
                    style={{
                      fontSize: 'clamp(0.8125rem, 0.95vw, 0.875rem)',
                      fontWeight: 500,
                      lineHeight: 1.3,
                      color: 'var(--color-white)',
                      marginBottom: '0.15rem',
                    }}
                  >
                    {member.name}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 400,
                      color: 'rgba(255,255,255,0.4)',
                      lineHeight: 1.4,
                    }}
                  >
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
