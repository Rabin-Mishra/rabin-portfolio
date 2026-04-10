import { Github, Linkedin } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

export function AuthorCard() {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 md:p-8 rounded-xl border border-border bg-surface-2 my-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10 translate-x-10 -translate-y-10" />
      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary/30 shrink-0 bg-background flex items-center justify-center font-bold text-xl text-textMuted shadow-lg">
        RM
      </div>
      <div className="flex-1 text-center sm:text-left">
        <h4 className="text-lg font-bold text-textPrimary mb-1">Rabin Mishra</h4>
        <p className="text-primary text-sm font-medium mb-3">IT Engineer & Aspiring DevOps</p>
        <p className="text-textMuted text-sm leading-relaxed mb-5 max-w-xl">
          Passionate about building resilient cloud infrastructure and deploying reliable CI/CD pipelines. Writing to share learnings from the field and my personal experiences.
        </p>
        <div className="flex items-center justify-center sm:justify-start gap-4">
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="p-2 border border-border rounded-full hover:bg-surface text-textMuted hover:text-textPrimary transition-colors">
            <Github className="w-4 h-4" />
          </a>
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 border border-border rounded-full hover:bg-surface text-textMuted hover:text-primary transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
