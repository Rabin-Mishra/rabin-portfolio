import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { SanitySiteConfig } from "@/lib/types";

export function Footer({ config }: { config: SanitySiteConfig }) {
  return (
    <footer className="border-t border-border bg-surface mt-20">
      <div className="container mx-auto px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-blue w-fit">
              RM.
            </Link>
            <p className="text-textMuted max-w-sm">
              {config.shortBio}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-textPrimary">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-textMuted hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-textPrimary">Connect</h3>
            <ul className="flex flex-col gap-3">
              {config.githubUrl && (
                <li>
                  <a href={config.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-textMuted hover:text-primary transition-colors group w-fit">
                    <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>GitHub</span>
                  </a>
                </li>
              )}
              {config.linkedinUrl && (
                <li>
                  <a href={config.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-textMuted hover:text-primary transition-colors group w-fit">
                    <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>LinkedIn</span>
                  </a>
                </li>
              )}
              {config.email && (
                <li>
                  <a href={`mailto:${config.email}`} className="flex items-center gap-2 text-sm text-textMuted hover:text-primary transition-colors group w-fit">
                    <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Email</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-textMuted">
          <p>© {new Date().getFullYear()} {config.ownerName}. All rights reserved.</p>
          <p>Built with Next.js & deployed on Vercel</p>
        </div>
      </div>
    </footer>
  );
}
