import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, Globe } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { SanityProject } from "@/lib/types";
import { getProjectBySlug } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await client.fetch<SanityProject | null>(getProjectBySlug, { slug });

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Projects`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await client.fetch<SanityProject | null>(getProjectBySlug, { slug });

  if (!project) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 md:px-8 py-12 lg:py-20 max-w-4xl">
      {/* Back navigation */}
      <div className="mb-8">
        <Link
          href="/projects"
          className="inline-flex items-center text-sm font-medium text-textMuted hover:text-primary transition-colors gap-2 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>
      </div>

      {/* Header details */}
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-textPrimary tracking-tight mb-6">
          {project.title}
        </h1>

        {/* Tech Stack badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack?.map((tech) => (
            <Badge key={tech} variant="outline" className="bg-surface text-sm py-1 px-3">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Action URLs */}
        <div className="flex flex-wrap gap-4">
          {project.githubUrl && (
            <Button asChild size="lg" variant="outline" className="rounded-full bg-background border-border">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" /> Code Repository
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button asChild size="lg" className="rounded-full shadow-lg shadow-primary/25">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <Globe className="w-5 h-5 mr-2" /> Live Project
              </a>
            </Button>
          )}
        </div>
      </header>

      {/* Hero Cover Image */}
      {project.coverImage && (
        <div className="aspect-video relative overflow-hidden rounded-2xl border border-border bg-surface shadow-md mb-12">
          <Image
            src={urlForImage(project.coverImage).url()}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Main content body */}
      <section className="prose max-w-none text-textPrimary leading-relaxed">
        <h2 className="text-2xl font-bold border-b border-border pb-3 mb-6">About this project</h2>
        <div className="text-textMuted text-lg whitespace-pre-wrap leading-8 space-y-6">
          {project.description}
        </div>
      </section>
    </article>
  );
}
