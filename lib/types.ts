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

export interface SanityEducation {
  _id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  gpa?: number;
  description?: string;
  institutionLogo?: any;
}

export interface SanityCertification {
  _id: string;
  name: string;
  issuer: string;
  issuedDate: string;
  credentialId?: string;
  credentialUrl?: string;
  category: string;
  certificateImage?: any;
}

export interface SanitySkill {
  _id: string;
  name: string;
  category: string;
  proficiencyLevel?: number;
  icon: string;
}

export interface SanitySiteConfig {
  _id: string;
  ownerName?: string;
  tagline?: string;
  shortBio?: string;
  longBio?: any[];
  email?: string;
  phone?: string;
  location?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  domain?: string;
  metaDescription?: string;
  profileImage?: any;
  ogImage?: any;
  resumeFile?: any;
}

export interface SanityWorkExperience {
  _id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description?: string;
  techUsed?: string[];
}
