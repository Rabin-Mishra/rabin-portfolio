import Image from "next/image";
import Link from "next/link";
import { Github, PlayCircle, ArrowRight } from "lucide-react";
import { SanityProject } from "@/lib/types";
import { urlForImage } from "@/sanity/lib/image";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function ProjectCard({ project }: { project: SanityProject }) {
  const visibleTech = project.techStack?.slice(0, 4) || [];
  const remainingTechCount = (project.techStack?.length || 0) - 4;

  return (
    <Card className="h-full flex flex-col group overflow-hidden bg-background hover:-translate-y-1 transition-transform duration-300 hover:shadow-xl hover:shadow-primary/10 border-border relative">
      {project.featured && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-primary text-white shadow-md border-transparent">
            Featured
          </Badge>
        </div>
      )}
      
      <Link href={`/projects/${project.slug}`} className="aspect-video relative overflow-hidden bg-surface border-b border-border block">
        {project.coverImage ? (
          <Image
            src={urlForImage(project.coverImage).url()}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-mono text-2xl text-textMuted/50 bg-surface-2 font-bold">
            RM
          </div>
        )}
      </Link>
      
      <CardContent className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold mb-2 text-textPrimary hover:text-primary transition-colors line-clamp-2 min-h-[3rem] flex items-center">
          <Link href={`/projects/${project.slug}`}>
            {project.title}
          </Link>
        </h3>
        
        <p className="text-textMuted text-xs mb-4 flex-1 line-clamp-3 leading-relaxed">
          {project.description}
        </p>
        
        {/* Tech Stack truncated */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {visibleTech.map((tech) => (
            <Badge key={tech} variant="outline" className="bg-surface-2 text-[10px] py-0.5 px-2">
              {tech}
            </Badge>
          ))}
          {remainingTechCount > 0 && (
            <Badge variant="outline" className="bg-surface text-[10px] text-textMuted py-0.5 px-2">
              +{remainingTechCount}
            </Badge>
          )}
        </div>

        {/* Buttons Panel */}
        <div className="mt-auto pt-4 border-t border-border flex flex-col gap-3">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-surface hover:bg-surface-2 rounded-full text-textMuted hover:text-primary transition-colors" title="View Code">
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-surface hover:bg-surface-2 rounded-full text-textMuted hover:text-primary transition-colors" title="Live Demo">
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
      </CardContent>
    </Card>
  );
}
