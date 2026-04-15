"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TOCProps {
  headings: { text: string; id: string; level: number }[];
}

export function TableOfContents({ headings }: TOCProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav className="sticky top-28 hidden xl:block max-h-[calc(100vh-7.5rem)] overflow-auto rounded-[28px] border border-border/70 bg-background/95 p-6 shadow-[0_30px_90px_-60px_rgba(15,23,42,0.4)] backdrop-blur custom-scrollbar">
      <div className="mb-5 border-b border-border pb-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-textMuted">
          On This Page
        </p>
        <h3 className="font-editorial text-2xl font-semibold text-textPrimary">
          Table of Contents
        </h3>
      </div>
      <ul className="space-y-1.5 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn("transition-colors", heading.level === 3 ? "ml-4" : "ml-0")}
          >
            <a
              href={`#${heading.id}`}
              className={cn(
                "block rounded-2xl px-3 py-2 leading-relaxed transition-all hover:bg-surface hover:text-textPrimary",
                activeId === heading.id
                  ? "bg-surface font-medium text-primary shadow-inner"
                  : "text-textMuted"
              )}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
