"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FolderGit2 } from "lucide-react";
import { SanityProject } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid({ projects }: { projects: SanityProject[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter((project) => {
    const searchString = `${project.title} ${project.description} ${project.techStack?.join(" ")}`.toLowerCase();
    return searchString.includes(searchQuery.toLowerCase());
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto sm:mx-0">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="h-5 w-5 text-textMuted" />
        </span>
        <input
          type="text"
          placeholder="Search projects by title, description, or tech stack..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-surface border border-border rounded-full text-textPrimary placeholder:text-textMuted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner text-sm"
        />
      </div>

      {/* Grid listing */}
      <AnimatePresence mode="popLayout">
        {filteredProjects.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProjects.map((project) => (
              <motion.div variants={item} key={project.id} layout>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="py-20 text-center text-textMuted border border-dashed border-border rounded-2xl bg-surface/30"
          >
            <FolderGit2 className="w-12 h-12 text-textMuted/40 mx-auto mb-4" />
            <p className="text-lg font-medium">No projects found matching your search.</p>
            <p className="text-sm mt-1">Try checking for typos or searching a different technology stack.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
