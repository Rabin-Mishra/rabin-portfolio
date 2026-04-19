import { Github, Linkedin, Award } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

export function AuthorCard() {
  return (
    <div className="relative my-14 overflow-hidden rounded-[30px] border border-border/70 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_38%),linear-gradient(180deg,rgba(248,250,252,0.95),rgba(241,245,249,0.92))] p-6 shadow-[0_24px_80px_-56px_rgba(15,23,42,0.45)] dark:bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_38%),linear-gradient(180deg,rgba(17,17,17,0.96),rgba(10,10,10,0.92))] md:p-8">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-primary/20 bg-background text-xl font-bold text-textMuted shadow-lg">
        RM
        </div>
        <div className="flex-1 text-center sm:text-left">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-textMuted">
            About the author
          </p>
          <h4 className="font-editorial text-3xl font-semibold text-textPrimary">
            Rabin Mishra
          </h4>
          <p className="mt-2 text-sm font-medium text-primary">
            IT Engineer and DevOps-focused builder
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-textMuted">
            I write about resilient infrastructure, practical automation, and the lessons that
            come from shipping systems in the real world. The goal is simple: make complex
            implementation details feel approachable and useful.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
            <div className="flex items-center gap-4">
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border bg-background/80 p-2 text-textMuted transition-colors hover:bg-surface hover:text-textPrimary">
                <Github className="w-4 h-4" />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border bg-background/80 p-2 text-textMuted transition-colors hover:bg-surface hover:text-primary">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            
            <a 
              href="https://www.credly.com/users/rabin-mishra/badges#credly" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-medium text-textMuted transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary sm:ml-auto"
            >
              <Award className="h-3.5 w-3.5" />
              <span>Credly Verified</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
