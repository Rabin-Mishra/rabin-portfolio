import Link from "next/link";
import Image from "next/image";
import { Github, ArrowRight, PlayCircle } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { getFeaturedProjects } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SanityProject } from "@/lib/types";

export async function FeaturedProjectsSection() {
  const projects = await client.fetch<SanityProject[]>(getFeaturedProjects);

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-textMuted max-w-2xl">
              Real-world implementation of cloud platforms, CI/CD, and scalable architectures.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="group rounded-xl border border-border bg-surface overflow-hidden flex flex-col hover:border-primary/50 transition-colors">
              <Link href={`/projects/${project.slug}`} className="aspect-video relative overflow-hidden bg-background border-b border-border block">
                {project.coverImage ? (
                  <Image
                    src={urlForImage(project.coverImage).url()}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-surface-2 text-textMuted font-mono text-2xl font-bold">
                     RM
                  </div>
                )}
              </Link>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold mb-2 hover:text-primary transition-colors line-clamp-2 min-h-[3rem] flex items-center">
                  <Link href={`/projects/${project.slug}`}>
                    {project.title}
                  </Link>
                </h3>
                <p className="text-textMuted text-xs mb-4 flex-1 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.techStack?.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="outline" className="bg-background text-[10px] py-0.5 px-2">
                      {tech}
                    </Badge>
                  ))}
                  {(project.techStack?.length ?? 0) > 4 && (
                    <Badge variant="outline" className="bg-background text-[10px] text-textMuted py-0.5 px-2">
                      +{project.techStack.length - 4}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-background hover:bg-surface border border-border rounded-full text-textMuted hover:text-primary transition-colors" title="View Code">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-background hover:bg-surface border border-border rounded-full text-textMuted hover:text-primary transition-colors" title="Live Demo">
                      <PlayCircle className="w-4 h-4" />
                    </a>
                  )}
                  <span className="flex-1" />
                  <Button asChild size="sm" variant="ghost" className="text-xs text-primary hover:text-secondary group/btn p-0 bg-transparent hover:bg-transparent h-auto">
                    <Link href={`/projects/${project.slug}`} className="flex items-center gap-1">
                      About Project <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link href="/projects">
              View All Projects <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
