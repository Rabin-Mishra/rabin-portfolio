import { Metadata } from "next";
import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { SanityPost } from "@/lib/types";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { BlogList } from "@/components/blog/BlogList";

export const metadata: Metadata = {
  title: "DevOps & Cloud Blog | Rabin Mishra",
  description: "Read my latest articles, tutorials, and insights on AWS, Docker, Kubernetes, Terraform, and DevOps best practices.",
};

const getAllPostsQuery = `*[_type == "post"] | order(publishedAt desc) {
  "id": _id, title, "slug": slug.current, excerpt, publishedAt, readTime, coverImage, tags,
  category->{title, slug, color}
}`;

export default async function BlogPage() {
  const posts = await client.fetch<SanityPost[]>(getAllPostsQuery);

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 lg:py-24">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-textPrimary">
          Writings & Thoughts
        </h1>
        <p className="text-lg text-textMuted leading-relaxed">
          Deep dives into cloud architecture, automation scripts, CI/CD pipeline setups, and my journey as an IT Engineer.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <Suspense fallback={<div className="h-10 w-full md:w-96 bg-surface animate-pulse rounded-full" />}>
          <CategoryFilter />
        </Suspense>
        <Suspense fallback={<div className="h-10 w-full max-w-sm bg-surface animate-pulse rounded-full" />}>
          <BlogSearch />
        </Suspense>
      </div>
      
      <Suspense fallback={<div className="py-20 text-center animate-pulse">Loading posts...</div>}>
        <BlogList posts={posts} />
      </Suspense>
    </div>
  );
}
