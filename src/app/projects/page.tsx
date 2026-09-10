import type { Metadata } from 'next';
import { getProjectsPage, getAllProjects } from '@/data/adapters/content.adapter';
import { JsonLd } from '@/components/ui/JsonLd';

export const metadata: Metadata = {
  title: 'Our Projects | Khushbu Nirman Sewa Pvt Ltd',
  description: '500+ completed construction projects across all 7 provinces of Nepal — hospitals, schools, bridges, water systems, roads, and government buildings.',
  keywords: ['knsewa projects', 'construction projects nepal', 'building projects biratnagar', 'infrastructure nepal', 'government projects nepal'],
  alternates: { canonical: '/projects/' },
  openGraph: {
    title: 'Construction Projects | Khushbu Nirman Sewa',
    description: '500+ projects across Nepal — hospitals, schools, bridges, water systems, roads, airports, and government infrastructure.',
    images: [{ url: '/images/projects/city-center-featured.jpg', width: 1200, height: 630, alt: 'KNSEWA construction projects in Nepal' }],
  },
};
import { ProjectsHero } from '@/components/sections/projects/ProjectsHero';
import { ProjectsShowcase } from '@/components/sections/projects/ProjectsShowcase';
import { ProjectsGrid } from '@/components/sections/projects/ProjectsGrid';
import { CTASection } from '@/components/sections/CTASection';

export default function ProjectsPage() {
  const content = getProjectsPage();
  const projects = getAllProjects();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "KNSEWA Construction Projects",
    "description": "500+ completed construction projects across all 7 provinces of Nepal — hospitals, schools, bridges, water systems, roads, and government buildings.",
    "url": "https://knsewa.com/projects/",
    "provider": { "@id": "https://knsewa.com/#organization" },
    "hasPart": projects.map((p) => ({
      "@type": "CreativeWork",
      "name": p.title,
      "url": `https://knsewa.com/projects/${p.slug}/`,
      "image": `https://knsewa.com${p.images.featured}`,
      "description": p.seo.description,
      "locationCreated": { "@type": "Place", "name": `${p.location}, Nepal` },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://knsewa.com/" },
      { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://knsewa.com/projects/" },
    ],
  };

  return (
    <>
      <JsonLd schema={collectionSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <ProjectsHero content={content.hero} stats={content.stats} />
      <ProjectsShowcase projects={content.projects} />
      <ProjectsGrid
        categories={content.categories}
        projects={content.projects}
      />
      <CTASection content={content.cta} />
    </>
  );
}
