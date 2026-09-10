'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GridLines } from '@/components/ui/GridLines';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { ArrowRight } from '@/components/ui/Icons';
import type { Project } from '@/types/content';

interface ProjectsSectionProps {
  headline: string;
  categories: string[];
  projects: Project[];
  limit?: number;
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}

export function ProjectsSection({ headline, categories, projects, limit }: ProjectsSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    let result = projects;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(query));
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    if (limit) {
      result = result.slice(0, limit);
    }

    return result;
  }, [projects, searchQuery, selectedCategories, limit]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  return (
    <section className="projects-section">
      <GridLines variant="gray" />

      <div className="wrapper prel" style={{ zIndex: 10 }}>
        {/* Header */}
        <AnimatedElement>
          <h2 className="title fs-45 mb-12 section-header">{headline}</h2>
        </AnimatedElement>

        {/* Search/Filter Toolbar */}
        <div style={{ position: 'relative', zIndex: 20 }}>
        <AnimatedElement delay={0.1}>
          <div className="projects-toolbar">
            {/* Search (left) */}
            <div className="projects-search">
              <SearchIcon />
              <input
                type="text"
                placeholder="Find A Project"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="projects-search-input"
              />
            </div>

            {/* Vertical divider */}
            <div className="projects-toolbar-divider" />

            {/* Refine (right) */}
            <div className="projects-filter-wrapper">
              <button
                className="projects-filter-toggle"
                onClick={() => setFilterOpen(!filterOpen)}
                aria-expanded={filterOpen}
              >
                <SlidersIcon />
                <span>Refine your search</span>
              </button>

              {filterOpen && (
                <div className="projects-filter-dropdown">
                  {categories.map((category) => (
                    <label key={category} className="projects-filter-option">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </AnimatedElement>
        </div>

        {/* 4-column grid on desktop; auto-scrolling horizontal marquee on mobile */}
        <div className="projects-grid-wrapper">
          <div className="projects-uniform-grid">
            {filteredProjects.map((project, index) => (
              <AnimatedElement key={project.id} delay={index * 0.05}>
                <Link href={`/projects/${project.slug}`} className="project-card">
                  <span className="project-category">{project.category}</span>
                  <div className="project-image">
                    <Image
                      src={project.images.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="project-location">{project.location}</p>
                  <h3 className="project-title">{project.title}</h3>
                </Link>
              </AnimatedElement>
            ))}
            {/* Duplicate set for seamless marquee loop on mobile (hidden on desktop). */}
            {filteredProjects.map((project) => (
              <Link
                key={`dup-${project.id}`}
                href={`/projects/${project.slug}`}
                className="project-card projects-marquee-dup"
                aria-hidden="true"
                tabIndex={-1}
              >
                <span className="project-category">{project.category}</span>
                <div className="project-image">
                  <Image
                    src={project.images.thumbnail}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="project-location">{project.location}</p>
                <h3 className="project-title">{project.title}</h3>
              </Link>
            ))}
          </div>
        </div>

        {filteredProjects.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--color-gray-500)', padding: '3rem 0' }}>
            No projects found matching your criteria.
          </p>
        )}

        {/* See All Projects Link */}
        <AnimatedElement delay={0.4}>
          <div className="projects-see-all">
            <Link href="/projects" className="btn-link">
              See All Projects <ArrowRight />
            </Link>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}
