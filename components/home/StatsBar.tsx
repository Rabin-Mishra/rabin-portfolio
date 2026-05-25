"use client";

import { useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { SanityStat } from "@/lib/types";

const DEFAULT_STATS: SanityStat[] = [
  { value: "18", suffix: "+", label: "Certifications" },
  { value: "3", suffix: ".9", label: "GPA" },
  { value: "5", suffix: "+", label: "Projects" },
  { value: "NEC", suffix: "", label: "Registered Eng." }
];

function AnimatedCounter({ value, suffix = "", label }: SanityStat) {
  const numVal = parseFloat(value);
  const isNumeric = !isNaN(numVal) && isFinite(numVal);
  const [count, setCount] = useState(isNumeric ? 0 : numVal);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && isNumeric) {
      let start = 0;
      const duration = 2000;
      const end = numVal;
      const stepTime = Math.abs(Math.floor(duration / Math.max(end, 1)));
      if (start === end) return;
      const timer = setInterval(() => {
        start += 1;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, stepTime > 1 ? stepTime : 1);
      return () => clearInterval(timer);
    }
  }, [isInView, isNumeric, numVal]);

  const displayValue = isNumeric ? count : value;
  const isLongVal = typeof displayValue === "string" && displayValue.length > 3;

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 text-center">
      <span className={`font-extrabold text-textPrimary tracking-tighter mb-2 ${isLongVal ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl"}`}>
        {displayValue}{suffix}
      </span>
      <span className="text-sm md:text-base text-textMuted font-medium tracking-wide uppercase">{label}</span>
    </div>
  );
}

interface StatsBarProps {
  stats?: SanityStat[];
}

export function StatsBar({ stats }: StatsBarProps) {
  const activeStats = stats && stats.length > 0 ? stats : DEFAULT_STATS;

  return (
    <section className="border-t border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border text-textPrimary">
          {activeStats.map((stat, i) => (
            <AnimatedCounter key={i} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
