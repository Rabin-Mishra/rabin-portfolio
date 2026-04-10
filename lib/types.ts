import { PortableTextBlock } from "@portabletext/react";

export interface SanityProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  coverImage: any;
  featured: boolean;
  order: number;
}

export interface SanityPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: any;
  category: SanityCategory;
  tags: string[];
  publishedAt: string;
  body: PortableTextBlock[];
  readTime: number;
  relatedPosts: SanityPost[];
}

export interface SanityCategory {
  id: string;
  title: string;
  slug: string;
  color: string;
}

export interface SanityAuthor {
  id: string;
  name: string;
  image: any;
  bio: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: string;
}

export interface Certificate {
  name: string;
  issuer: string;
  issuedDate: string;
  credentialId?: string;
  credentialUrl?: string;
}
