import Image from "next/image";
import { Github, PlayCircle } from "lucide-react";
import { SanityProject } from "@/lib/types";
import { urlForImage } from "@/sanity/lib/image";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";

export function ProjectCard({ project }: { project: SanityProject }) {
  return (
    <Card className="h-full flex flex-col group overflow-hidden bg-background hover:-translate-y-1 transition-transform duration-300 hover:shadow-xl hover:shadow-primary/10 border-border relative">
      {project.featured && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-primary text-white shadow-md border-transparent">
            Featured
          </Badge>
        </div>
      )}
      
      <div className="aspect-video relative overflow-hidden bg-surface border-b border-border">
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
        
        {/* Overlay Action Buttons */}
        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-surface hover:bg-surface-2 rounded-full text-textPrimary hover:text-primary transition-colors">
              <Github className="w-6 h-6" />
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-primary hover:bg-secondary rounded-full text-white transition-colors shadow-lg shadow-primary/25">
              <PlayCircle className="w-6 h-6" />
            </a>
          )}
        </div>
      </div>
      
      <CardContent className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2 text-textPrimary group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-textMuted text-sm mb-6 flex-1 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border mt-auto">
          {project.techStack?.map((tech) => (
            <Badge key={tech} variant="outline" className="bg-surface-2 text-xs py-0.5">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
