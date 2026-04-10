"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Mail, Terminal } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

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
              <Github className="w-6 h-6" />
            </a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-textMuted hover:text-primary transition-colors hover:scale-110 transform">
              <Linkedin className="w-6 h-6" />
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
