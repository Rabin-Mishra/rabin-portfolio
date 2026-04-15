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
    <div className="mx-auto max-w-[1500px] px-4 py-12 md:px-8 lg:py-20">
      <section className="mb-10 overflow-hidden rounded-[32px] border border-border/70 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_34%),linear-gradient(180deg,rgba(248,250,252,0.9),rgba(255,255,255,0.82))] px-6 py-8 shadow-[0_28px_90px_-60px_rgba(15,23,42,0.45)] dark:bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_34%),linear-gradient(180deg,rgba(17,17,17,0.96),rgba(10,10,10,0.92))] md:px-10 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
          <div className="max-w-4xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-textMuted">
              Publication
            </p>
            <h1 className="font-editorial text-4xl font-semibold tracking-[-0.04em] text-textPrimary md:text-6xl">
              Essays on cloud systems, automation, and the craft behind reliable delivery.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-textMuted md:text-lg">
              Practical DevOps notes, infrastructure breakdowns, and build logs from real projects,
              shaped into articles that are easier to read and revisit.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-2xl border border-border/70 bg-background/80 px-4 py-4 backdrop-blur">
              <div className="text-2xl font-bold text-textPrimary">{posts.length}</div>
              <div className="mt-1 text-sm text-textMuted">Published posts</div>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/80 px-4 py-4 backdrop-blur">
              <div className="text-2xl font-bold text-textPrimary">Medium</div>
              <div className="mt-1 text-sm text-textMuted">Editorial reading feel</div>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/80 px-4 py-4 backdrop-blur">
              <div className="text-2xl font-bold text-textPrimary">Sanity</div>
              <div className="mt-1 text-sm text-textMuted">Markdown-friendly workflow</div>
            </div>
          </div>
        </div>
      </section>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
