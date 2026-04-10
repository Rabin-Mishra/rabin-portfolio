import { groq } from "next-sanity";

export const getAllPosts = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    category->{
      title,
      "slug": slug.current,
      color
    },
    tags,
    publishedAt,
    body,
    readTime
  }
`;

export const getLatestPosts = (limit: number) => groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...${limit}] {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    category->{
      title,
      "slug": slug.current,
      color
    },
    tags,
    publishedAt,
    readTime
  }
`;

export const getPostBySlug = groq`
  *[_type == "post" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    category->{
      title,
      "slug": slug.current,
      color
    },
    tags,
    publishedAt,
    body,
    readTime,
    "relatedPosts": *[_type == "post" && _id != ^._id && category._ref == ^.category._ref] | order(publishedAt desc)[0...3] {
      "id": _id,
      title,
      "slug": slug.current,
      excerpt,
      coverImage,
      publishedAt
    }
  }
`;

export const getAllProjects = groq`
  *[_type == "project"] | order(order asc) {
    "id": _id,
    title,
    "slug": slug.current,
    description,
    techStack,
    githubUrl,
    liveUrl,
    coverImage,
    featured,
    order
  }
`;

export const getFeaturedProjects = groq`
  *[_type == "project" && featured == true] | order(order asc) {
    "id": _id,
    title,
    "slug": slug.current,
    description,
    techStack,
    githubUrl,
    liveUrl,
    coverImage,
    featured,
    order
  }
`;

export const getPostsByCategory = groq`
  *[_type == "post" && category->slug.current == $category] | order(publishedAt desc) {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    category->{
      title,
      "slug": slug.current,
      color
    },
    tags,
    publishedAt,
    readTime
  }
`;

export const getAllCategories = groq`
  *[_type == "category"] {
    "id": _id,
    title,
    "slug": slug.current,
    color
  }
`;
