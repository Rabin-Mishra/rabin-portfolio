import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { urlForImage } from "@/sanity/lib/image";
import { Badge } from "@/components/ui/Badge";
import { SanityPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function BlogCard({ post }: { post: SanityPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group rounded-xl border border-border bg-background overflow-hidden flex flex-col hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
      <div className="aspect-video relative overflow-hidden bg-surface border-b border-border">
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
          <div className="absolute top-4 left-4 z-10">
            <Badge className="shadow-lg backdrop-blur-sm bg-background/80 text-primary hover:bg-background/90 border-transparent border">
              {post.category.title}
            </Badge>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs text-textMuted font-medium">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {formatDate(post.publishedAt)}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {post.readTime || 5} min read</span>
        </div>
        <h3 className="text-xl font-bold mb-3 text-textPrimary group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-textMuted text-sm mb-6 flex-1 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags?.slice(0, 3).map((tag) => (
             <span key={tag} className="text-xs text-textMuted bg-surface px-2 py-1 rounded-md">
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="mt-auto text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
          Read Article <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
