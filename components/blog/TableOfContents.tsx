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
    <nav className="sticky top-24 hidden lg:block overflow-auto max-h-[calc(100vh-100px)] custom-scrollbar">
      <h3 className="font-bold text-sm text-textPrimary uppercase tracking-wider mb-4 border-b border-border pb-2">
        Table of Contents
      </h3>
      <ul className="space-y-2.5 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn(
              "transition-colors",
              heading.level === 3 ? "ml-4" : "ml-0"
            )}
          >
            <a
              href={`#${heading.id}`}
              className={cn(
                "block hover:text-primary leading-tight",
                activeId === heading.id
                  ? "text-primary font-medium"
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
