"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SanityEducation } from "@/lib/types";

export function EducationTimelineClient({ educations }: { educations: SanityEducation[] }) {
  if (!educations || educations.length === 0) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <p className="text-textMuted text-center">Academic history not found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-primary" />
            Education
          </h2>
        </div>

        <div className="relative border-l border-border ml-4 md:ml-6 space-y-12 pb-4">
          {educations.map((edu, index) => (
            <motion.div
              key={edu._id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 md:pl-10"
            >
              <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1.5 ring-4 ring-background" />
              
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2 text-sm text-textMuted font-mono">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {edu.startDate} – {edu.isCurrent ? "Present" : edu.endDate}
                </span>
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-textPrimary mb-1">
                {edu.institution}
              </h3>
              <p className="text-lg text-primary font-medium mb-3">
                {edu.degree} in {edu.field}
              </p>
              
              {edu.gpa && (
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary" className="border-transparent">GPA: {edu.gpa}</Badge>
                </div>
              )}
              
              {edu.description && (
                <p className="text-textMuted leading-relaxed max-w-3xl whitespace-pre-wrap">
                  {edu.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
