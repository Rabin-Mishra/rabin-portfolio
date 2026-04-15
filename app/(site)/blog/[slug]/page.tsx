import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Clock, Calendar } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { getPostBySlug } from "@/sanity/lib/queries";
import { SanityPost } from "@/lib/types";
import {
  extractPortableTextHeadings,
  extractPortableTextHtmlDocument,
} from "@/lib/portableText";
import { formatDate } from "@/lib/utils";
import { PortableTextRenderer } from "@/components/blog/PortableTextRenderer";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export const revalidate = 3600; // ISR 1 hour

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(`*[_type == "post"].slug.current`);
  return slugs.map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<SanityPost>(getPostBySlug, { slug });
  if (!post) return {};

  return {
    title: `${post.title} | Rabin Mishra Blog`,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await client.fetch<SanityPost>(getPostBySlug, { slug });

  if (!post) {
    notFound();
  }

  const headings = extractPortableTextHeadings(post.body);
  const htmlDocument = extractPortableTextHtmlDocument(post.body);
  const hasTableOfContents = !htmlDocument && headings.length > 0;
  const postUrl = `${SITE_CONFIG.url}/blog/${post.slug}`;

  // JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: "Rabin Mishra",
      url: SITE_CONFIG.url,
    },
    publisher: {
      "@type": "Organization",
      name: "Rabin Mishra",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/icon.png`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-[1500px] px-4 py-10 md:px-8 md:py-14">
        <div
          className={`grid gap-12 ${
            hasTableOfContents
              ? "xl:grid-cols-[minmax(0,1fr)_280px] xl:items-start"
              : ""
          }`}
        >
          <article className="min-w-0">
            <header className="mb-12 overflow-hidden rounded-[34px] border border-border/70 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_34%),linear-gradient(180deg,rgba(248,250,252,0.96),rgba(255,255,255,0.88))] shadow-[0_30px_90px_-60px_rgba(15,23,42,0.45)] dark:bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_34%),linear-gradient(180deg,rgba(17,17,17,0.98),rgba(10,10,10,0.92))]">
              <div className="px-6 py-8 md:px-10 md:py-10">
                <div className="mb-6 flex items-center gap-2 text-sm font-medium text-textMuted">
              <Link href="/blog" className="hover:text-primary transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-textPrimary truncate">{post.title}</span>
                </div>

                {post.category && (
                  <Badge className="mb-6 border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    {post.category.title}
                  </Badge>
                )}

                <h1 className="font-editorial max-w-5xl text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-textPrimary md:text-6xl">
                  {post.title}
                </h1>

                {post.excerpt ? (
                  <p className="mt-6 max-w-3xl text-lg leading-8 text-textMuted md:text-[1.35rem]">
                    {post.excerpt}
                  </p>
                ) : null}

                <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-border/80 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/85 text-sm font-bold text-textMuted shadow-sm">
                      RM
                    </div>
                  <div>
                      <div className="text-sm font-bold text-textPrimary">
                      Rabin Mishra
                    </div>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs font-medium text-textMuted">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                        {formatDate(post.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime || 5} min read
                        </span>
                      </div>
                    </div>
                  </div>

                  <ShareButtons url={postUrl} title={post.title} />
                </div>
              </div>

              {post.coverImage && (
                <div className="relative aspect-[16/9] overflow-hidden border-t border-border bg-surface md:aspect-[2.25/1]">
                <Image
                  src={urlForImage(post.coverImage).url()}
                  alt={post.title || "Post cover"}
                  fill
                  priority
                  className="object-cover"
                />
                </div>
              )}
            </header>

            <div className="w-full">
              <PortableTextRenderer value={post.body} />
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="mx-auto mt-14 flex max-w-[72ch] flex-wrap gap-2 border-t border-border pt-8">
                <span className="mr-2 py-1 text-sm font-medium text-textMuted">
                  Tags:
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="cursor-pointer rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-textMuted transition-colors hover:text-primary"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <AuthorCard />

            {post.category?.id && (
              <RelatedPosts
                categoryId={post.category.id}
                currentPostId={post.id}
              />
            )}
          </article>

          {hasTableOfContents ? (
            <aside className="min-w-0">
              <TableOfContents headings={headings} />
            </aside>
          ) : null}
        </div>
      </div>
    </>
  );
}
