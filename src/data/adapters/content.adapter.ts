/**
 * Content Adapter
 *
 * This adapter provides a unified interface for accessing content.
 * Phase 1: Reads from local TypeScript files
 * Phase 2: Will read from Sanity CMS (no page changes required)
 *
 * Note: Page content imports are added as content files are created.
 * Uncomment imports as corresponding content files are built.
 */

import { siteSettings, mainNavigation, footerNavigation } from '@/content/site/settings';
import { homePageContent } from '@/content/pages/home';
import { aboutPageContent } from '@/content/pages/about';
import { servicesPageContent } from '@/content/pages/services';
import { projectsPageContent } from '@/content/pages/projects';
import { insightsPageContent, insightsArticles } from '@/content/pages/insights';
import { contactPageContent } from '@/content/pages/contact';
import { commercialServiceContent } from '@/content/pages/services/commercial';
import { governmentServiceContent } from '@/content/pages/services/government';
import { industrialServiceContent } from '@/content/pages/services/industrial';
import { infrastructureServiceContent } from '@/content/pages/services/infrastructure';
import type {
  SiteSettings,
  NavItem,
  HomePageContent,
  AboutPageContent,
  ServicesPageContent,
  ContactPageContent,
  CoveragePageContent,
  InsightsPageContent,
  SafetyPageContent,
  SustainabilityPageContent,
  ServiceDetailContent,
  ProjectsPageContent,
  Project,
  BlogPost,
  NewsArticle,
  Location,
} from '@/types/content';

// Site Settings
export function getSiteSettings(): SiteSettings {
  return siteSettings;
}

export function getMainNavigation(): NavItem[] {
  return mainNavigation;
}

export function getFooterNavigation(): NavItem[] {
  return footerNavigation;
}

// Pages
export function getHomePage(): HomePageContent {
  return homePageContent;
}

// Stub functions — implementations will be wired up as content files are created.
// Each function follows the same pattern: import content → return typed data.

export function getAboutPage(): AboutPageContent {
  return aboutPageContent;
}

export function getServicesPage(): ServicesPageContent {
  return servicesPageContent;
}

export function getContactPage(): ContactPageContent {
  return contactPageContent;
}

export function getCoveragePage(): CoveragePageContent {
  throw new Error('Coverage page content not yet created.');
}

export function getInsightsPage(): InsightsPageContent {
  return insightsPageContent;
}

export function getAllInsightsArticles(): NewsArticle[] {
  return insightsArticles;
}

export function getSafetyPage(): SafetyPageContent {
  throw new Error('Safety page content not yet created.');
}

export function getSustainabilityPage(): SustainabilityPageContent {
  throw new Error('Sustainability page content not yet created.');
}

// Projects
export function getProjectsPage(): ProjectsPageContent {
  return projectsPageContent;
}

export function getAllProjects(): Project[] {
  return projectsPageContent.projects;
}

export function getProjectBySlug(slug: string): Project | null {
  const projects = getAllProjects();
  return projects.find((p) => p.slug === slug) || null;
}

export function getRelatedProjects(project: Project, limit: number = 3): Project[] {
  const projects = getAllProjects();
  const sameCategory = projects.filter((p) => p.id !== project.id && p.category === project.category);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const others = projects.filter((p) => p.id !== project.id && p.category !== project.category);
  return [...sameCategory, ...others].slice(0, limit);
}

// Articles / Blog
export function getAllArticles(): NewsArticle[] {
  return homePageContent.news;
}

export function getArticleBySlug(slug: string): NewsArticle | null {
  return insightsArticles.find((a) => a.slug === slug) ?? null;
}

// Services Detail
const serviceContentMap: Record<string, ServiceDetailContent> = {
  commercial: commercialServiceContent,
  government: governmentServiceContent,
  industrial: industrialServiceContent,
  infrastructure: infrastructureServiceContent,
};

export function getServiceBySlug(slug: string): ServiceDetailContent | null {
  return serviceContentMap[slug] ?? null;
}

export function getAllServiceSlugs(): string[] {
  return Object.keys(serviceContentMap);
}

// Locations
export function getLocations(): Location[] {
  // Will be implemented when locations content is created
  return [];
}

export function getLocationBySlug(slug: string): Location | null {
  const locs = getLocations();
  return locs.find((l) => l.slug === slug) || null;
}
