'use client';

import React, { useState } from 'react';
import { GridLines } from '@/components/ui/GridLines';
import { AnimatedElement, StaggerContainer } from '@/components/ui/AnimatedElement';
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon, ArrowRight } from '@/components/ui/Icons';
import type { OfficeLocation } from '@/types/content';

interface ContactInfoSectionProps {
  label: string;
  headline: string;
  description: string;
  offices: OfficeLocation[];
}

export function ContactInfoSection({ label, headline, description, offices }: ContactInfoSectionProps) {
  const defaultOffice = offices.find((o) => o.isHeadquarters) ?? offices[0];
  const [activeOfficeId, setActiveOfficeId] = useState(defaultOffice.id);
  const hq = offices.find((o) => o.id === activeOfficeId) ?? defaultOffice;

  return (
    <section
      style={{
        background: 'var(--color-white)',
        padding: 'clamp(5rem, 9vw, 9rem) 0',
        position: 'relative',
      }}
    >
      <GridLines variant="gray" />

      <div className="wrapper prel" style={{ zIndex: 10 }}>
        {/* Two-column layout: text left, cards right */}
        <div className="contact-info-layout">
          {/* Left: heading content */}
          <div className="contact-info-text">
            <AnimatedElement>
              <p className="section-label" style={{ color: 'var(--color-accent)' }}>
                {label}
              </p>
            </AnimatedElement>
            <AnimatedElement delay={0.05}>
              <h2
                className="title"
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.8125rem)',
                  fontWeight: 300,
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                  color: 'var(--color-primary)',
                  marginTop: '1.25rem',
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
                  margin: '1.75rem 0',
                }}
              />
            </AnimatedElement>
            <AnimatedElement delay={0.15}>
              <p
                className="para"
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: 'var(--color-gray-600)',
                  maxWidth: '480px',
                }}
              >
                {description}
              </p>
            </AnimatedElement>
          </div>

          {/* Right: cards stacked vertically */}
          <div style={{ width: '100%', maxWidth: '420px', margin: '0 auto' }}>
            {offices.length > 1 && (
              <div className="office-switcher" role="tablist" aria-label="Select office location">
                {offices.map((office) => (
                  <button
                    key={office.id}
                    type="button"
                    role="tab"
                    aria-selected={office.id === hq.id}
                    data-active={office.id === hq.id}
                    onClick={() => setActiveOfficeId(office.id)}
                    className="office-switcher-tab"
                  >
                    {office.isHeadquarters ? 'Headquarters' : office.address.split(',')[0]}
                  </button>
                ))}
              </div>
            )}

            <StaggerContainer stagger={0.08} className="contact-info-cards">
              {/* Phone Card */}
              {hq.phone && (
                <a href={`tel:${hq.phone}`} className="contact-info-card">
                  <div className="contact-info-icon">
                    <PhoneIcon width={22} height={22} />
                  </div>
                  <div>
                    <p className="contact-info-eyebrow">Call Us</p>
                    <p className="contact-info-value">{hq.phone}</p>
                    <span className="contact-info-link">
                      Tap to call <ArrowRight width={20} height={8} />
                    </span>
                  </div>
                </a>
              )}

            {/* Email Card */}
            <a href={`mailto:${hq.email}`} className="contact-info-card">
              <div className="contact-info-icon">
                <MailIcon width={22} height={22} />
              </div>
              <div>
                <p className="contact-info-eyebrow">Email Us</p>
                <p className="contact-info-value" style={{ wordBreak: 'break-all' }}>{hq.email}</p>
                <span className="contact-info-link">
                  Send email <ArrowRight width={20} height={8} />
                </span>
              </div>
            </a>

            {/* Address Card */}
            <a
              href={hq.mapUrl ?? '#'}
              target={hq.mapUrl ? '_blank' : undefined}
              rel={hq.mapUrl ? 'noopener noreferrer' : undefined}
              className="contact-info-card"
            >
              <div className="contact-info-icon">
                <MapPinIcon width={22} height={22} />
              </div>
              <div>
                <p className="contact-info-eyebrow">Visit Us</p>
                <p className="contact-info-value">{hq.address}</p>
                {hq.mapUrl && (
                  <span className="contact-info-link">
                    Open in Maps <ArrowRight width={20} height={8} />
                  </span>
                )}
              </div>
            </a>

            {/* Hours Card */}
            {hq.hours && (
              <div className="contact-info-card" style={{ cursor: 'default' }}>
                <div className="contact-info-icon">
                  <ClockIcon width={22} height={22} />
                </div>
                <div>
                  <p className="contact-info-eyebrow">Office Hours</p>
                  <p className="contact-info-value">{hq.hours}</p>
                </div>
              </div>
            )}
            </StaggerContainer>
          </div>
        </div>

        {/* Map Embed */}
        {hq.mapEmbedUrl && (
          <AnimatedElement delay={0.2}>
            <div
              style={{
                marginTop: 'clamp(3rem, 5vw, 4rem)',
                width: '100%',
                aspectRatio: '16 / 7',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid var(--color-gray-200)',
              }}
            >
              <iframe
                src={hq.mapEmbedUrl}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${hq.name} location map`}
              />
            </div>
          </AnimatedElement>
        )}
      </div>

      <style jsx>{`
        .office-switcher {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .office-switcher-tab {
          font-size: 0.8125rem;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 999px;
          border: 1px solid var(--color-gray-200);
          background: var(--color-white);
          color: var(--color-gray-600);
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .office-switcher-tab[data-active='true'] {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: var(--color-white);
        }
        .contact-info-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(3rem, 6vw, 6rem);
          align-items: start;
        }
        .contact-info-text {
          position: sticky;
          top: 6rem;
          align-self: start;
        }
        .contact-info-cards {
          display: flex;
          flex-direction: column;
          gap: 0;
          max-width: 420px;
          margin: 0 auto;
          width: 100%;
        }
        @media (max-width: 900px) {
          .contact-info-layout {
            grid-template-columns: 1fr;
          }
          .contact-info-text {
            position: static;
          }
          .contact-info-cards {
            margin: 0;
          }
        }
        .contact-info-card {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 1.25rem;
          padding: 1.5rem 0;
          background: var(--color-white);
          border-bottom: 1px solid var(--color-gray-200);
          transition: color 0.2s ease;
          text-decoration: none;
          color: inherit;
        }
        .contact-info-cards > :first-child {
          border-top: 1px solid var(--color-gray-200);
        }
        a.contact-info-card:hover .contact-info-link {
          color: var(--color-primary);
        }
        .contact-info-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          color: var(--color-accent);
          background: var(--color-gray-100);
        }
        .contact-info-eyebrow {
          font-size: 0.6875rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-gray-500);
          margin-bottom: 0.5rem;
        }
        .contact-info-value {
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.4;
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }
        .contact-info-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--color-accent);
        }
      `}</style>
    </section>
  );
}
