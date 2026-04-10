"use client";

import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SanityPost } from "@/lib/types";
import { BlogCard } from "./BlogCard";

export function BlogList({ posts }: { posts: SanityPost[] }) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const category = searchParams.get("category") || "All";

  const filteredPosts = posts.filter((post) => {
    // Search match
    const matchesQuery = 
      !query || 
      post.title.toLowerCase().includes(query) || 
      post.excerpt?.toLowerCase().includes(query) ||
      post.tags?.some(tag => tag.toLowerCase().includes(query));

    // Category match
    const matchesCategory = 
      category === "All" || 
      post.category?.title?.toLowerCase() === category.toLowerCase();

    return matchesQuery && matchesCategory;
  });

  if (!filteredPosts.length) {
    return (
      <div className="py-20 text-center flex flex-col items-center">
        <div className="w-16 h-16 mb-4 text-textMuted opacity-50 flex items-center justify-center text-4xl">
          🔍
        </div>
        <h3 className="text-xl font-bold mb-2">No posts found</h3>
        <p className="text-textMuted">Try adjusting your search query or category filter.</p>
      </div>
    );
  }

  return (
    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence mode="popLayout">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            layout
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
          >
            <BlogCard post={post} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
