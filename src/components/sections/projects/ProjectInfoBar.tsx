'use client';

import React from 'react';
import { StaggerContainer } from '@/components/ui/AnimatedElement';
import type { Project } from '@/types/content';

interface ProjectInfoBarProps {
  project: Project;
}

interface InfoItem {
  label: string;
  value: string;
}

export function ProjectInfoBar({ project }: ProjectInfoBarProps) {
  const items: InfoItem[] = [];

  if (project.client) {
    items.push({ label: 'Client', value: project.client });
  }
  items.push({ label: 'Location', value: project.location });
  items.push({ label: 'Scope', value: project.scope });
  if (project.year) {
    items.push({ label: 'Year', value: project.year });
  }
  if (project.status) {
    items.push({
      label: 'Status',
      value: project.status === 'running'
        ? `In Progress${project.completionPercentage ? ` (${project.completionPercentage}%)` : ''}`
        : 'Completed',
    });
  }
  if (project.contractValue) {
    items.push({ label: 'Contract Value', value: project.contractValue });
  }

  return (
    <section
      style={{
        background: 'var(--color-gray-100)',
        borderTop: '1px solid var(--color-gray-200)',
        borderBottom: '1px solid var(--color-gray-200)',
        padding: 0,
      }}
    >
      <div className="wrapper">
        <StaggerContainer
          stagger={0.08}
          className="project-info-bar"
        >
          {items.map((item) => (
            <div key={item.label} className="project-info-bar-item">
              <p className="project-info-bar-label">{item.label}</p>
              <p className="project-info-bar-value">{item.value}</p>
            </div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
