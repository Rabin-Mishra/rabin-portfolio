"use client";

import { motion } from "framer-motion";
import { SKILLS } from "@/lib/constants";

export function TechStackSection() {
  return (
    <section className="py-24 bg-surface border-y border-border">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tools & Technologies</h2>
          <p className="text-textMuted max-w-2xl mx-auto">
            My core arsenal for building, deploying, and managing modern infrastructure.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {SKILLS.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 6) * 0.1 }}
              className="flex flex-col items-center justify-center p-6 bg-background rounded-xl border border-border group hover:border-primary/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 cursor-default"
            >
              <div className="w-12 h-12 mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <img
                  src={skill.iconUrl || `https://cdn.simpleicons.org/${skill.icon}`}
                  alt={skill.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                  loading="lazy"
                />
              </div>
              <span className="font-medium text-sm text-textPrimary text-center">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
