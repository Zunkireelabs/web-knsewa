import { getAllProjects, getAllServiceSlugs, getAllInsightsArticles } from '@/data/adapters/content.adapter';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BASE_URL = 'https://knsewa.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects();
  const serviceSlugs = getAllServiceSlugs();
  const articles = getAllInsightsArticles();

  const staticRoutes = ['', '/about', '/services', '/projects', '/insights', '/contact'].map(
    (route) => ({
      url: `${BASE_URL}${route}/`,
      lastModified: new Date('2026-06-09'),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    })
  );

  const serviceRoutes = serviceSlugs.map((slug) => ({
    url: `${BASE_URL}/services/${slug}/`,
    lastModified: new Date('2026-01-01'),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}/`,
    lastModified: project.year ? new Date(`${project.year}-01-01`) : new Date('2024-01-01'),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  const articleRoutes = articles.map((article) => ({
    url: `${BASE_URL}/insights/${article.slug}/`,
    lastModified: new Date(article.publishDate),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...articleRoutes];
}
