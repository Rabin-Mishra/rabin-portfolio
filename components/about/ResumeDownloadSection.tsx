"use client";

import { motion } from "framer-motion";
import { FileDown, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ResumeDownloadSectionProps {
  resumeUrl?: string;
}

export function ResumeDownloadSection({ resumeUrl }: ResumeDownloadSectionProps) {
  if (!resumeUrl) return null;

  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-8 md:p-12 text-center group hover:border-primary/40 transition-all duration-500">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300">
                <FileText className="w-8 h-8 text-primary" />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-textPrimary mb-3">
                Get My Resume
              </h2>
              <p className="text-textMuted mb-8 max-w-md mx-auto leading-relaxed">
                Download my full resume to learn more about my experience, skills, certifications, and projects.
              </p>

              <Button
                asChild
                size="lg"
                className="rounded-full shadow-lg shadow-primary/25 group/btn"
              >
                <a
                  href={`${resumeUrl}?dl=ResumeRabin.pdf`}
                  download
                  rel="noopener noreferrer"
                >
                  <FileDown className="w-5 h-5 mr-2 group-hover/btn:animate-bounce" />
                  Download Resume (PDF)
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
