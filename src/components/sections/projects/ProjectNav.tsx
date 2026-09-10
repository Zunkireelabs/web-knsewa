'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import type { Project } from '@/types/content';

interface ProjectNavProps {
  prev: Project | null;
  next: Project | null;
}

export function ProjectNav({ prev, next }: ProjectNavProps) {
  if (!prev && !next) return null;

  return (
    <section
      style={{
        background: 'var(--color-gray-100)',
        borderTop: '1px solid var(--color-gray-200)',
        padding: 0,
      }}
    >
      <div className="wrapper">
        <AnimatedElement>
          <div className="project-nav">
            {/* Previous */}
            <div className="project-nav-side">
              {prev && (
                <Link
                  href={`/projects/${prev.slug}`}
                  className="project-nav-link"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flexShrink: 0 }}
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  <div className="project-nav-thumb">
                    <Image
                      src={prev.images.thumbnail}
                      alt={prev.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="project-nav-label">Previous Project</p>
                    <p className="project-nav-title">{prev.title}</p>
                  </div>
                </Link>
              )}
            </div>

            {/* Divider */}
            <div className="project-nav-divider" />

            {/* Next */}
            <div className="project-nav-side project-nav-side--right">
              {next && (
                <Link
                  href={`/projects/${next.slug}`}
                  className="project-nav-link project-nav-link--right"
                >
                  <div style={{ textAlign: 'right' }}>
                    <p className="project-nav-label">Next Project</p>
                    <p className="project-nav-title">{next.title}</p>
                  </div>
                  <div className="project-nav-thumb">
                    <Image
                      src={next.images.thumbnail}
                      alt={next.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flexShrink: 0 }}
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}
