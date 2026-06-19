"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ExternalLink, FileDown, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SanityPublication } from "@/lib/types";

export function PublicationsList({ publications }: { publications: SanityPublication[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPubs = publications.filter((pub) => {
    const searchString = `${pub.title} ${pub.authors} ${pub.venue}`.toLowerCase();
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
          placeholder="Search by title, authors, or venue..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-surface border border-border rounded-full text-textPrimary placeholder:text-textMuted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner text-sm"
        />
      </div>

      {/* Grid listing */}
      <AnimatePresence mode="popLayout">
        {filteredPubs.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredPubs.map((pub) => (
              <motion.div variants={item} key={pub._id} layout>
                <Card className="h-full flex flex-col bg-surface hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 relative border-border shadow-sm">
                  <CardContent className="p-6 flex flex-col flex-1 h-full">
                    <div className="flex flex-wrap items-center gap-2.5 text-xs text-textMuted font-mono mb-3">
                      <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-medium truncate max-w-[150px]">
                        {pub.venue}
                      </span>
                      <span>•</span>
                      <span>{pub.publishedDate}</span>
                    </div>

                    <h3 className="text-base font-bold text-textPrimary mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem] flex items-center">
                      {pub.paperUrl ? (
                        <a href={pub.paperUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                          {pub.title}
                        </a>
                      ) : (
                        pub.title
                      )}
                    </h3>

                    <p className="text-xs font-semibold text-textMuted mb-3 italic line-clamp-1">
                      {pub.authors}
                    </p>

                    {pub.abstract && (
                      <div className="text-textMuted text-xs mb-5 leading-relaxed flex-1">
                        <h4 className="font-semibold text-[10px] text-textPrimary uppercase tracking-wider mb-1 font-sans">Abstract</h4>
                        <p className="line-clamp-3">{pub.abstract}</p>
                      </div>
                    )}

                    <div className="mt-auto pt-4 border-t border-border flex flex-wrap items-center gap-2">
                      {pub.paperUrl && (
                        <Button asChild size="sm" variant="outline" className="rounded-full bg-background text-[11px] h-8 px-3">
                          <a href={pub.paperUrl} target="_blank" rel="noopener noreferrer">
                            Publisher Link <ExternalLink className="w-3 h-3 ml-1.5" />
                          </a>
                        </Button>
                      )}
                      {pub.pdfFileUrl && (
                        <Button asChild size="sm" className="rounded-full shadow-md shadow-primary/15 text-[11px] h-8 px-3">
                          <a href={`${pub.pdfFileUrl}?dl=Rabin_Mishra_Publication.pdf`} download rel="noopener noreferrer">
                            Download PDF <FileDown className="w-3 h-3 ml-1.5" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
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
            <BookOpen className="w-12 h-12 text-textMuted/40 mx-auto mb-4" />
            <p className="text-lg font-medium">No publications found matching your search.</p>
            <p className="text-sm mt-1">Try checking for typos or searching a different keyword.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
