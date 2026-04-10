import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { getLatestPosts } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SanityPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export async function LatestPostsSection() {
  const posts = await client.fetch<Omit<SanityPost, 'body' | 'relatedPosts'>[]>(getLatestPosts(3));

  return (
    <section className="py-24 bg-surface-2 border-y border-border">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest from the Blog</h2>
            <p className="text-textMuted max-w-2xl">
              Insights, tutorials, and practical guides on DevOps and Cloud.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group rounded-xl border border-border bg-background overflow-hidden flex flex-col hover:border-primary/50 transition-colors shadow-sm">
              <div className="aspect-video relative overflow-hidden bg-surface">
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
                <div className="flex items-center gap-4 text-xs text-textMuted mb-3 font-medium">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {formatDate(post.publishedAt)}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {post.readTime || 5} min read</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-textMuted text-sm mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="rounded-full bg-background border-border">
            <Link href="/blog">
              View All Posts <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
