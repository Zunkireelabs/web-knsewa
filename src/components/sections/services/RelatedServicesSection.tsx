'use client';

import Image from 'next/image';
import Link from 'next/link';
import { GridLines } from '@/components/ui/GridLines';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ArrowRight } from '@/components/ui/Icons';
import { StaggerContainer } from '@/components/ui/AnimatedElement';
import type { ServiceCategory } from '@/types/content';

interface RelatedServicesSectionProps {
  services: ServiceCategory[];
}

export function RelatedServicesSection({ services }: RelatedServicesSectionProps) {
  return (
    <section style={{ background: 'var(--color-white)', padding: 'clamp(4rem, 7vw, 7rem) 0' }}>
      <GridLines variant="gray" />

      <div className="wrapper prel" style={{ zIndex: 10 }}>
        <SectionHeader
          label="OTHER SERVICES"
          headline="Explore What We Do"
          align="left"
        />

        <StaggerContainer
          stagger={0.1}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10"
        >
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              style={{ textDecoration: 'none', display: 'block' }}
              className="group"
            >
              {/* Image */}
              <div
                className="to-be-scaled"
                style={{
                  position: 'relative',
                  aspectRatio: '16/10',
                  overflow: 'hidden',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.25rem',
                }}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text */}
              <h3
                style={{
                  fontSize: 'clamp(1.0625rem, 1.3vw, 1.25rem)',
                  fontWeight: 500,
                  lineHeight: 1.25,
                  color: 'var(--color-primary)',
                  marginBottom: '0.5rem',
                  transition: 'color var(--transition-base)',
                }}
                className="group-hover:text-[var(--color-accent)]"
              >
                {service.title}
              </h3>

              <p
                style={{
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  color: 'var(--color-gray-500)',
                  marginBottom: '1rem',
                }}
              >
                {service.description}
              </p>

              <span
                className="btn-link"
                style={{ fontSize: '0.875rem' }}
              >
                Learn More <ArrowRight width={24} height={10} />
              </span>
            </Link>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
