import Link from "next/link";
import { Mail } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { SanitySiteConfig } from "@/lib/types";

// Inline GitHub SVG — avoids missing ./icons/github.js sub-path in lucide-react 0.441.0
const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

// Inline LinkedIn SVG — avoids missing ./icons/linkedin.js sub-path in lucide-react 0.441.0
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

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
                    <GithubIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>GitHub</span>
                  </a>
                </li>
              )}
              {config.linkedinUrl && (
                <li>
                  <a href={config.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-textMuted hover:text-primary transition-colors group w-fit">
                    <LinkedinIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
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
          <p>Built with Next.js &amp; deployed on Vercel</p>
        </div>
      </div>
    </footer>
  );
}
