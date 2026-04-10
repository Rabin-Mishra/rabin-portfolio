import { client } from "@/sanity/lib/client";
import { SanityPost } from "@/lib/types";
import { BlogCard } from "./BlogCard";

export async function RelatedPosts({ categoryId, currentPostId }: { categoryId: string, currentPostId: string }) {
  const query = `*[_type == "post" && _id != $currentPostId && category._ref == $categoryId] | order(publishedAt desc)[0...3] {
    "id": _id, title, "slug": slug.current, excerpt, publishedAt, readTime, coverImage, tags,
    category->{title, slug, color}
  }`;
  
  const posts = await client.fetch<SanityPost[]>(query, { currentPostId, categoryId });
  
  if (!posts.length) return null;

  return (
    <div className="mt-16 pt-16 border-t border-border">
      <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => <BlogCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}
