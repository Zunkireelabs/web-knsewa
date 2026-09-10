'use client';

import React from 'react';
import Image from 'next/image';
import { GridLines } from '@/components/ui/GridLines';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import type { Project } from '@/types/content';

interface ProjectHeroProps {
  project: Project;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section
      className="page-hero prel"
      style={{
        minHeight: '65vh',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={project.images.featured}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(23, 23, 27, 0.95) 0%, rgba(23, 23, 27, 0.7) 50%, rgba(23, 23, 27, 0.55) 100%)',
          }}
        />
      </div>

      <GridLines variant="light" />

      <div
        className="wrapper prel w-full"
        style={{ zIndex: 10, paddingBottom: '2.5rem', paddingTop: '8rem' }}
      >
        {/* Breadcrumbs */}
        <AnimatedElement>
          <div style={{ marginBottom: '2rem' }}>
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Projects', href: '/projects' },
                { label: project.title },
              ]}
            />
          </div>
        </AnimatedElement>

        {/* Category + Status */}
        <AnimatedElement delay={0.1}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span
              style={{
                fontSize: '0.6875rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-white)',
                background: 'rgba(11, 93, 208, 0.5)',
                backdropFilter: 'blur(8px)',
                padding: '0.3rem 0.75rem',
                borderRadius: '2px',
              }}
            >
              {project.category}
            </span>
            {project.status && (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: project.status === 'running' ? '#34d399' : 'var(--color-white)',
                  background: 'rgba(23,23,27,0.55)',
                  backdropFilter: 'blur(8px)',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '2px',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#34d399',
                  }}
                />
                {project.status === 'running' ? 'In Progress' : 'Completed'}
              </span>
            )}
          </div>
        </AnimatedElement>

        {/* Title */}
        <AnimatedElement delay={0.2}>
          <h1
            className="title fs-70"
            style={{ color: 'var(--color-white)', maxWidth: '900px' }}
          >
            {project.title}
          </h1>
        </AnimatedElement>

        {/* Location */}
        <AnimatedElement delay={0.3}>
          <p
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '1rem',
              fontWeight: 400,
              marginTop: '1rem',
            }}
          >
            {project.location}
          </p>
        </AnimatedElement>
      </div>
    </section>
  );
}
