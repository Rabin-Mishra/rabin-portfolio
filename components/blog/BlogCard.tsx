import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { urlForImage } from "@/sanity/lib/image";
import { Badge } from "@/components/ui/Badge";
import { SanityPost } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

export function BlogCard({
  post,
  featured = false,
}: {
  post: SanityPost;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group overflow-hidden border border-border/80 bg-background transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_24px_90px_-56px_rgba(15,23,42,0.45)]",
        featured
          ? "grid rounded-[32px] lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]"
          : "flex h-full flex-col rounded-[28px]"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-surface",
          featured
            ? "aspect-[16/10] border-b border-border lg:aspect-auto lg:min-h-[420px] lg:border-b-0 lg:border-r"
            : "aspect-[16/10] border-b border-border"
        )}
      >
        {post.coverImage ? (
          <Image
            src={urlForImage(post.coverImage).url()}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface-2 text-textMuted">
            No Cover Image
          </div>
        )}
        {post.category && (
          <div className="absolute left-5 top-5 z-10">
            <Badge className="border border-white/40 bg-background/85 shadow-lg backdrop-blur-sm text-primary hover:bg-background/95">
              {post.category.title}
            </Badge>
          </div>
        )}
      </div>
      <div
        className={cn(
          "flex flex-1 flex-col",
          featured ? "justify-between p-7 md:p-9" : "p-6"
        )}
      >
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-textMuted">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readTime || 5} min read
          </span>
        </div>

        <h3
          className={cn(
            "font-editorial mt-5 text-textPrimary transition-colors group-hover:text-primary",
            featured
              ? "text-3xl font-semibold leading-tight md:text-[2.5rem]"
              : "text-2xl font-semibold leading-snug line-clamp-2"
          )}
        >
          {post.title}
        </h3>

        <p
          className={cn(
            "mt-4 text-textMuted",
            featured
              ? "max-w-2xl text-base leading-8 md:text-lg"
              : "mb-6 flex-1 text-sm leading-7 line-clamp-3"
          )}
        >
          {post.excerpt}
        </p>

        <div className={cn("flex flex-wrap gap-2", featured ? "mt-6" : "mb-6")}>
          {post.tags?.slice(0, featured ? 4 : 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-textMuted"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
          Read Article <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
