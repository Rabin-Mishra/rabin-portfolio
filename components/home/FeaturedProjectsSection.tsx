import Link from "next/link";
import Image from "next/image";
import { Github, ArrowRight } from "lucide-react";
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group rounded-xl border border-border bg-surface overflow-hidden flex flex-col hover:border-primary/50 transition-colors">
              <div className="aspect-video relative overflow-hidden bg-background border-b border-border">
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
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-textMuted text-sm mb-6 flex-1 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack?.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="outline" className="bg-background">
                      {tech}
                    </Badge>
                  ))}
                  {(project.techStack?.length ?? 0) > 4 && (
                    <Badge variant="outline" className="bg-background text-textMuted">
                      +{project.techStack.length - 4}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-textMuted hover:text-textPrimary transition-colors flex items-center gap-2 text-sm font-medium">
                      <Github className="w-4 h-4" /> Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-textMuted hover:text-textPrimary transition-colors flex items-center gap-2 text-sm font-medium">
                      Live <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
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
