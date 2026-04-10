"use client";

import { motion } from "framer-motion";
import { Server, Terminal, Network, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

const SKILL_CATEGORIES = [
  {
    title: "Cloud & Infrastructure",
    icon: Server,
    color: "text-blue-500",
    skills: ["AWS", "Terraform", "Docker", "Kubernetes", "Nginx"],
  },
  {
    title: "CI/CD & Automation",
    icon: Terminal,
    color: "text-green-500",
    skills: ["GitHub Actions", "Jenkins", "Bash scripting"],
  },
  {
    title: "OS & Networking",
    icon: Network,
    color: "text-yellow-500",
    skills: ["Linux (Ubuntu/CentOS)", "TCP/IP basics"],
  },
  {
    title: "Dev & Tools",
    icon: Wrench,
    color: "text-purple-500",
    skills: ["Git", "Python", "PostgreSQL", "Postman", "VS Code"],
  },
];

export function SkillsGrid() {
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
          {SKILL_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:border-primary/30 transition-colors">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className={`p-3 rounded-lg bg-background border border-border ${category.color}`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 pt-4">
                    {category.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="bg-background text-sm py-1.5 px-3">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
