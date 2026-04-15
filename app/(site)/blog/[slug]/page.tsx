import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Clock, Calendar } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { getPostBySlug } from "@/sanity/lib/queries";
import { SanityPost } from "@/lib/types";
import { extractPortableTextHeadings } from "@/lib/portableText";
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
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12 relative">
          <article className="flex-1 max-w-3xl mx-auto lg:mx-0 w-full min-w-0">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-textMuted mb-8 font-medium">
              <Link href="/blog" className="hover:text-primary transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-textPrimary truncate">{post.title}</span>
            </div>

            <header className="mb-10">
              {post.category && (
                <Badge className="bg-primary/10 text-primary border-primary/20 mb-6 px-3 py-1 text-sm font-semibold">
                  {post.category.title}
                </Badge>
              )}

              <h1 className="text-3xl md:text-5xl font-extrabold text-textPrimary tracking-tight mb-6 leading-[1.2]">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-border">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-2 border border-border flex items-center justify-center text-xs font-bold font-mono text-textMuted">
                    RM
                  </div>
                  <div>
                    <div className="text-sm font-bold text-textPrimary">
                      Rabin Mishra
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-textMuted font-medium mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />{" "}
                        {formatDate(post.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime || 5} min
                        read
                      </span>
                    </div>
                  </div>
                </div>

                <ShareButtons url={postUrl} title={post.title} />
              </div>
            </header>

            {post.coverImage && (
              <div className="aspect-[16/9] md:aspect-[2/1] relative overflow-hidden rounded-2xl mb-12 bg-surface border border-border shadow-md">
                <Image
                  src={urlForImage(post.coverImage).url()}
                  alt={post.title || "Post cover"}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            )}

            <PortableTextRenderer value={post.body} />

            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2 pt-8 border-t border-border">
                <span className="text-textMuted font-medium text-sm mr-2 py-1">
                  Tags:
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium text-textMuted bg-surface border border-border px-3 py-1.5 rounded-md hover:text-primary transition-colors cursor-pointer"
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

          <aside className="w-full lg:w-72 shrink-0">
            <TableOfContents headings={headings} />
          </aside>
        </div>
      </div>
    </>
  );
}
