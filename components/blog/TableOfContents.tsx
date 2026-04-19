"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TOCProps {
  headings: { text: string; id: string; level: number }[];
}

/** Fixed navbar height + a little breathing room */
const SCROLL_OFFSET = 100;

export function TableOfContents({ headings }: TOCProps) {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  /**
   * Smoothly scroll to a heading while accounting for the fixed navbar.
   * Uses window.scrollTo so we can specify an exact pixel offset.
   */
  const scrollToHeading = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const top =
      el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;

    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
  }, []);

  useEffect(() => {
    // Wait for the DOM to settle (e.g. after hydration / portable‑text render)
    const timer = window.setTimeout(() => {
      // Clean up any previous observer
      observerRef.current?.disconnect();

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          }
        },
        {
          rootMargin: `-${SCROLL_OFFSET}px 0px -75% 0px`,
        }
      );

      observerRef.current = observer;

      headings.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 150);

    return () => {
      window.clearTimeout(timer);
      observerRef.current?.disconnect();
    };
  }, [headings]);

  if (!headings?.length) return null;

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
            className={cn(
              "transition-colors",
              heading.level === 3 ? "ml-4" : "ml-0"
            )}
          >
            <button
              type="button"
              className={cn(
                "block w-full text-left rounded-2xl px-3 py-2 leading-relaxed transition-all hover:bg-surface hover:text-textPrimary",
                activeId === heading.id
                  ? "bg-surface font-medium text-primary shadow-inner"
                  : "text-textMuted"
              )}
              onClick={() => scrollToHeading(heading.id)}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
