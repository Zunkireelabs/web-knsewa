import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getAllProjects,
  getProjectBySlug,
  getRelatedProjects,
  getProjectsPage,
} from '@/data/adapters/content.adapter';
import { ProjectHero } from '@/components/sections/projects/ProjectHero';
import { ProjectInfoBar } from '@/components/sections/projects/ProjectInfoBar';
import { ProjectOverview } from '@/components/sections/projects/ProjectOverview';
import { ProjectGallery } from '@/components/sections/projects/ProjectGallery';
import { ProjectNav } from '@/components/sections/projects/ProjectNav';
import { ServiceFAQSection } from '@/components/sections/services/ServiceFAQSection';
import { RelatedSection } from '@/components/sections/RelatedSection';
import { CTASection } from '@/components/sections/CTASection';
import { JsonLd } from '@/components/ui/JsonLd';

export function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: project.seo.title,
    description: project.seo.description,
    alternates: { canonical: `/projects/${slug}/` },
    openGraph: {
      title: project.seo.title,
      description: project.seo.description,
      images: [{ url: `https://knsewa.com${project.images.featured}`, width: 1200, height: 630, alt: project.seo.title }],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  const related = getRelatedProjects(project, 3);
  const { cta } = getProjectsPage();

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.seo.description,
    "creator": { "@id": "https://knsewa.com/#organization" },
    "locationCreated": { "@type": "Place", "name": `${project.location}, Nepal` },
    "image": `https://knsewa.com${project.images.featured}`,
    "url": `https://knsewa.com/projects/${slug}/`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://knsewa.com/" },
      { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://knsewa.com/projects/" },
      { "@type": "ListItem", "position": 3, "name": project.title, "item": `https://knsewa.com/projects/${slug}/` },
    ],
  };

  const faqSchema = project.faq && project.faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": project.faq.map((item) => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": { "@type": "Answer", "text": item.answer },
        })),
      }
    : null;

  return (
    <div className="project-detail-page">
      <JsonLd schema={projectSchema} />
      <JsonLd schema={breadcrumbSchema} />
      {faqSchema && <JsonLd schema={faqSchema} />}
      <ProjectHero project={project} />
      <ProjectInfoBar project={project} />
      <ProjectOverview project={project} />
      {project.images.gallery.length > 0 && (
        <ProjectGallery
          images={project.images.gallery}
          title={project.title}
        />
      )}
      {project.faq && project.faq.length > 0 && (
        <ServiceFAQSection faqs={project.faq} />
      )}
      {related.length > 0 && (
        <RelatedSection
          label="RELATED PROJECTS"
          headline="Similar Projects"
          items={related}
          type="projects"
          seeAllHref="/projects"
          seeAllText="View All Projects"
        />
      )}
      <ProjectNav prev={prevProject} next={nextProject} />
      <CTASection content={cta} />
    </div>
  );
}
