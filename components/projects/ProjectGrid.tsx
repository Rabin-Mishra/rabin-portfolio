"use client";

import { motion } from "framer-motion";
import { SanityProject } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid({ projects }: { projects: SanityProject[] }) {
  if (!projects.length) {
    return (
      <div className="py-20 text-center text-textMuted">
        <p className="text-xl">No projects found.</p>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {projects.map((project) => (
        <motion.div variants={item} key={project.id}>
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  );
}
