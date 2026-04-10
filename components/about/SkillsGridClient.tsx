"use client";

import { motion } from "framer-motion";
import { Server, Terminal, Network, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { SanitySkill } from "@/lib/types";

// Map groups to lucide icons cleanly
const CATEGORY_MAP: Record<string, { icon: any; color: string }> = {
  "Cloud & Infrastructure": { icon: Server, color: "text-blue-500" },
  "CI/CD & Automation": { icon: Terminal, color: "text-green-500" },
  "OS & Networking": { icon: Network, color: "text-yellow-500" },
  "Dev & Tools": { icon: Wrench, color: "text-purple-500" },
};

export function SkillsGridClient({ skills }: { skills: SanitySkill[] }) {
  if (!skills || skills.length === 0) return null;

  // Group skills by category based on Sanity response
  const groupedSkills = skills.reduce((acc: Record<string, SanitySkill[]>, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section className="py-20 bg-surface border-y border-border">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Technical Prowess</h2>
          <p className="text-textMuted max-w-2xl">
            A comprehensive breakdown of the tools and technologies I use to architect and deploy systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(groupedSkills).map(([categoryName, categorySkills], index) => {
            const mapConfig = CATEGORY_MAP[categoryName] || { icon: Terminal, color: "text-primary" };
            const Icon = mapConfig.icon;

            return (
              <motion.div
                key={categoryName}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:border-primary/30 transition-colors">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className={`p-3 rounded-lg bg-background border border-border ${mapConfig.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">{categoryName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 pt-4">
                      {categorySkills.map((skill) => (
                        <Badge key={skill._id} variant="outline" className="bg-background text-sm py-1.5 px-3">
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
