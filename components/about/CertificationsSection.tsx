"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Award } from "lucide-react";
import { CERTIFICATIONS } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const GROUPS = [
  {
    id: "cloud",
    label: "Cloud & AWS",
    match: ["aws", "cloud", "nec", "nepal engineering"],
  },
  {
    id: "linux",
    label: "Linux & DevOps",
    match: ["linux", "bash", "cybersecurity", "devops", "prompt engineering"],
  },
  {
    id: "programming",
    label: "Programming",
    match: ["python", "programming", "javascript", "postgresql", "github bootcamp", "postman"],
  },
  {
    id: "other",
    label: "Other",
    match: ["matlab"],
  },
];

export function CertificationsSection() {
  const [activeTab, setActiveTab] = useState(GROUPS[0].id);

  // Filter logic based on match array checking name or issuer
  const filteredCerts = CERTIFICATIONS.filter((cert) => {
    const group = GROUPS.find((g) => g.id === activeTab);
    if (!group) return false;
    const searchString = `${cert.name} ${cert.issuer}`.toLowerCase();
    return group.match.some((keyword) => searchString.includes(keyword.toLowerCase()));
  });

  return (
    <section className="py-20 bg-surface-2 border-t border-border">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <Award className="w-8 h-8 text-primary" />
            Certifications ({CERTIFICATIONS.length}+)
          </h2>
          <p className="text-textMuted max-w-2xl">
            Continuous learning is part of the job. Validated skills across multiple platforms.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
          {GROUPS.map((group) => (
            <button
              key={group.id}
              onClick={() => setActiveTab(group.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors relative",
                activeTab === group.id
                  ? "text-primary bg-primary/10"
                  : "text-textMuted hover:text-textPrimary hover:bg-surface"
              )}
            >
              <span className="relative z-10">{group.label}</span>
              {activeTab === group.id && (
                <motion.div
                  layoutId="certTab"
                  className="absolute inset-0 rounded-full border border-primary/50"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert, index) => (
              <motion.div
                key={cert.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Card className="h-full flex flex-col bg-background hover:border-primary/30 transition-colors">
                  <CardContent className="p-6 flex flex-col flex-1 h-full">
                    <div className="text-xs text-textMuted font-mono mb-2">
                      {cert.issuedDate}
                    </div>
                    <h3 className="font-bold text-textPrimary text-lg mb-1 leading-tight">
                      {cert.name}
                    </h3>
                    <p className="text-primary text-sm font-medium mb-4">
                      {cert.issuer}
                    </p>
                    
                    <div className="mt-auto pt-4 flex flex-col gap-3">
                      {cert.credentialId && (
                        <div className="text-xs text-textMuted truncate bg-surface-2 p-2 rounded">
                          ID: {cert.credentialId}
                        </div>
                      )}
                      
                      <Button 
                        asChild={!!cert.credentialUrl}
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-2"
                        disabled={!cert.credentialUrl}
                      >
                        {cert.credentialUrl ? (
                          <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                            View Certificate <ExternalLink className="w-3 h-3 ml-2" />
                          </a>
                        ) : (
                          <span>Verifiable on Request</span>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
