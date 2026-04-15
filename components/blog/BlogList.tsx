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
      <div className="flex flex-col items-center py-20 text-center">
        <div className="w-16 h-16 mb-4 text-textMuted opacity-50 flex items-center justify-center text-4xl">
          🔍
        </div>
        <h3 className="text-xl font-bold mb-2">No posts found</h3>
        <p className="text-textMuted">Try adjusting your search query or category filter.</p>
      </div>
    );
  }

  const [featuredPost, ...remainingPosts] = filteredPosts;

  return (
    <div className="space-y-8 md:space-y-10">
      {featuredPost ? (
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.35 }}
        >
          <BlogCard post={featuredPost} featured />
        </motion.div>
      ) : null}

      {remainingPosts.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {remainingPosts.map((post, index) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28, delay: Math.min(index * 0.04, 0.24) }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </div>
  );
}
