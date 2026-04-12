"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Terminal } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

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

const ROLES = [
  "Aspiring DevOps Engineer",
  "Cloud Infrastructure Builder",
  "CI/CD Pipeline Enthusiast",
  "Open Source Advocate",
];

const CODE_LINES = [
  "$ docker build -t my-app .",
  "Sending build context to Docker daemon...",
  "Step 1/10 : FROM node:18-alpine",
  " ---> 2r2q3434v3",
  "Successfully built my-app:latest",
  "$ terraform apply -auto-approve",
  "aws_instance.web: Creating...",
  "aws_instance.web: Creation complete after 32s",
  "Apply complete! Resources: 1 added, 0 changed, 0 destroyed.",
  "$ git push origin main",
  "To https://github.com/Rabin-Mishra/repo.git",
  "   32a938..42b322  main -> main",
];

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let typingSpeed = isDeleting ? 40 : 100;

    if (!isDeleting && displayedText === currentRole) {
      typingSpeed = 2000;
      const timeout = setTimeout(() => setIsDeleting(true), typingSpeed);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedText(currentRole.substring(0, displayedText.length + (isDeleting ? -1 : 1)));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex]);

  // Terminal effect
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine <= CODE_LINES.length) {
        setTerminalLines(CODE_LINES.slice(0, currentLine));
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden py-20 lg:py-0">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.03] pointer-events-none" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-secondary/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          <div>
            <p className="text-textMuted text-lg mb-2 font-mono">Hi, I&apos;m</p>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-textPrimary">
              Rabin Mishra
            </h1>
            <div className="h-10 sm:h-12 flex items-center">
              <span className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                {displayedText}
                <span className="inline-block w-[3px] h-8 ml-1 bg-secondary animate-pulse align-middle" />
              </span>
            </div>
          </div>

          <p className="text-lg text-textMuted max-w-lg leading-relaxed">
            Fresh BE IT graduate from Pokhara University, passionate about automating infrastructure and cloud systems. Based in Kathmandu, Nepal.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Button asChild size="lg" className="rounded-full shadow-lg shadow-primary/25">
              <Link href="/projects">View My Projects →</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full bg-surface/50 backdrop-blur-sm">
              <Link href="/blog">Read My Blog</Link>
            </Button>
          </div>

          <div className="flex items-center gap-5 pt-8">
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-textMuted hover:text-primary transition-colors hover:scale-110 transform">
              <GithubIcon className="w-6 h-6" />
            </a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-textMuted hover:text-primary transition-colors hover:scale-110 transform">
              <LinkedinIcon className="w-6 h-6" />
            </a>
            <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-textMuted hover:text-primary transition-colors hover:scale-110 transform">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden lg:block relative"
        >
          <div className="rounded-xl overflow-hidden border border-border bg-[#0d1117] shadow-2xl backdrop-blur-xl">
            <div className="flex items-center px-4 py-3 bg-[#161b22] border-b border-border">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="mx-auto flex items-center text-xs text-textMuted font-mono">
                <Terminal className="w-3 h-3 mr-2" />
                bash — rabin@ubuntu:~
              </div>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed h-[320px] overflow-hidden text-gray-300">
              {terminalLines.map((line, i) => (
                <div key={i} className={`${line.startsWith('$') ? 'text-primary font-semibold mt-2' : ''} ${line.includes('complete') || line.includes('Successfully') ? 'text-secondary' : ''}`}>
                  {line}
                </div>
              ))}
              <div className="animate-pulse w-2 h-4 bg-gray-400 mt-1 inline-block" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
