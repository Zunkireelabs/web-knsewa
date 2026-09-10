'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { GridLines } from '@/components/ui/GridLines';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { ArrowRight } from '@/components/ui/Icons';
import type { Project } from '@/types/content';


interface ProjectsGridProps {
  categories: string[];
  projects: Project[];
}

export function ProjectsGrid({ categories, projects }: ProjectsGridProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(12);
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;


  const handleFilter = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(12);

    requestAnimationFrame(() => {
      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll('.project-card');
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.04,
            ease: 'power3.out',
          }
        );
      }
    });
  };

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--color-white)',
        padding: 'clamp(5rem, 9vw, 8rem) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <GridLines variant="gray" />

      <div className="wrapper prel" style={{ zIndex: 10 }}>
        {/* Header + Filters */}
        <div className="projects-header">
          <div>
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
                Portfolio
              </p>
            </AnimatedElement>
            <AnimatedElement delay={0.05}>
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)',
                  fontWeight: 300,
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                  color: 'var(--color-primary)',
                }}
              >
                All Projects
              </h2>
            </AnimatedElement>
          </div>

          {/* Filter tabs */}
          <AnimatedElement delay={0.1}>
            <div className="projects-filters">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleFilter(cat)}
                  className={`projects-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <span className="projects-filter-count">
                      {cat === 'All' ? projects.length : projects.filter((p) => p.category === cat).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </AnimatedElement>
        </div>

        {/* Grid — uniform 3 columns */}
        <div ref={gridRef} className="projects-grid">
          {visible.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="project-card"
            >
              <div className="project-card-img">
                <Image
                  src={project.images.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="project-card-overlay" />

                {/* Category badge */}
                <span className="project-card-badge">{project.category}</span>

                {/* Status indicator */}
                {project.status && (
                  <span
                    className="project-card-status"
                    style={project.status === 'running' ? { color: '#34d399' } : undefined}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#34d399',
                        display: 'inline-block',
                        marginRight: '0.375rem',
                      }}
                    />
                    {project.status === 'running'
                      ? `In Progress${project.completionPercentage ? ` · ${project.completionPercentage}%` : ''}`
                      : 'Completed'}
                  </span>
                )}

                {/* Progress bar for running projects */}
                {project.status === 'running' && project.completionPercentage && (
                  <div className="project-card-progress">
                    <div
                      className="project-card-progress-fill"
                      style={{ width: `${project.completionPercentage}%` }}
                    />
                  </div>
                )}

                {/* Hover CTA */}
                <div className="project-card-hover-content">
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: 'var(--color-white)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    View Project <ArrowRight width={20} height={8} />
                  </span>
                </div>
              </div>

              {/* Card info */}
              <div className="project-card-info">
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-location">{project.location}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div style={{ textAlign: 'center', marginTop: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
            <button
              onClick={() => setVisibleCount((c) => c + 12)}
              className="btn-primary"
              style={{ padding: '14px 32px', fontSize: '0.875rem' }}
            >
              Load More Projects
              <ArrowRight width={24} height={10} />
            </button>
          </div>
        )}

        {/* Result count */}
        <p
          style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            fontSize: '0.75rem',
            fontWeight: 400,
            color: 'var(--color-gray-400)',
          }}
        >
          Showing {visible.length} of {filtered.length} projects
        </p>
      </div>
    </section>
  );
}
