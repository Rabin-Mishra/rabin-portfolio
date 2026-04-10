"use client";

import { useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

function AnimatedCounter({ end, suffix = "", label }: { end: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / end));
      if (start === end) return;
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, stepTime > 1 ? stepTime : 1);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 text-center">
      <span className="text-4xl md:text-5xl font-extrabold text-textPrimary tracking-tighter mb-2">
        {count}{suffix}
      </span>
      <span className="text-sm md:text-base text-textMuted font-medium tracking-wide uppercase">{label}</span>
    </div>
  );
}

export function StatsBar() {
  return (
    <section className="border-t border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border text-textPrimary">
          <AnimatedCounter end={18} suffix="+" label="Certifications" />
          <AnimatedCounter end={3} suffix=".9" label="GPA" />
          <AnimatedCounter end={5} suffix="+" label="Projects" />
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <span className="text-3xl md:text-4xl font-extrabold text-textPrimary tracking-tighter mb-2">
              NEC
            </span>
            <span className="text-sm md:text-base text-textMuted font-medium tracking-wide uppercase">Registered Eng.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
