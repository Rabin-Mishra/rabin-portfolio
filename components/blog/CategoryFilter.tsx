"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "All",
  "DevOps",
  "AWS",
  "Linux",
  "Terraform",
  "Docker",
  "Cloud",
];

export function CategoryFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const activeCategory = searchParams.get("category") || "All";

  const handleSelect = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center overflow-x-auto pb-4 md:pb-0 gap-2 scrollbar-hide">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => handleSelect(cat)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
            activeCategory === cat
              ? "bg-primary text-white"
              : "bg-surface hover:bg-surface-2 text-textMuted hover:text-textPrimary"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
