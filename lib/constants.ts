import { Certificate, NavItem, Skill } from "./types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const SKILLS: Skill[] = [
  { name: "AWS", icon: "amazonaws", category: "Cloud" },
  { name: "Docker", icon: "docker", category: "DevOps" },
  { name: "Terraform", icon: "terraform", category: "DevOps" },
  { name: "Linux", icon: "linux", category: "OS" },
  { name: "Kubernetes", icon: "kubernetes", category: "DevOps" },
  { name: "GitHub Actions", icon: "githubactions", category: "CI/CD" },
  { name: "Jenkins", icon: "jenkins", category: "CI/CD" },
  { name: "Nginx", icon: "nginx", category: "Web Server" },
  { name: "Git", icon: "git", category: "DevOps" },
  { name: "Python", icon: "python", category: "Programming" },
  { name: "Bash", icon: "gnubash", category: "Programming" },
  { name: "PostgreSQL", icon: "postgresql", category: "Database" },
];

export const SOCIAL_LINKS = {
  github: "https://github.com/Rabin-Mishra",
  linkedin: "https://www.linkedin.com/in/rabin-mishra-3782ba214",
  email: "rabin@rabinmishra.com.np",
};

export const SITE_CONFIG = {
  name: "Rabin Mishra",
  url: "https://rabinmishra.com.np",
  description: "IT Engineer | Aspiring DevOps Engineer",
  author: "Rabin Mishra",
  email: "rabin@rabinmishra.com.np",
};

export const CERTIFICATIONS: Certificate[] = [
  { name: "Certificate for Registered Engineers", issuer: "Nepal Engineering Council", issuedDate: "January 2026", credentialId: "97236", credentialUrl: "" },
  { name: "Introduction To Linux", issuer: "The Linux Foundation", issuedDate: "June 2025", credentialId: "LF9p1v3saheh", credentialUrl: "" },
  { name: "Introduction to Bash", issuer: "Microsoft", issuedDate: "June 2025", credentialId: "", credentialUrl: "" },
  { name: "Introduction to Cybersecurity", issuer: "Cisco", issuedDate: "June 2025", credentialId: "", credentialUrl: "" },
  { name: "Introduction to DevOps and SRE LFS162", issuer: "The Linux Foundation", issuedDate: "June 2025", credentialId: "LF6zac8o5h7f", credentialUrl: "" },
  { name: "Postman API Fundamentals Student Expert", issuer: "Canvas Credentials (Badgr)", issuedDate: "June 2025", credentialId: "6853c0f42a52ac69f4ed67a7", credentialUrl: "" },
  { name: "AWS Cloud Practitioner Essentials", issuer: "Amazon Web Services", issuedDate: "May 2025", credentialId: "TCAA-DIG-100-CECPEB-0104-EN-US", credentialUrl: "" },
  { name: "AWS Educate Introduction to Cloud 101", issuer: "Amazon Web Services", issuedDate: "May 2025", credentialId: "", credentialUrl: "" },
  { name: "Introduction to Cloud Computing", issuer: "Simplilearn", issuedDate: "May 2025", credentialId: "8346980", credentialUrl: "" },
  { name: "Linux Essentials Certification", issuer: "Cisco", issuedDate: "May 2025", credentialId: "", credentialUrl: "" },
  { name: "PostgreSQL: Become an SQL Developer", issuer: "Simplilearn", issuedDate: "May 2025", credentialId: "8344345", credentialUrl: "" },
  { name: "Python", issuer: "Kaggle", issuedDate: "May 2025", credentialId: "", credentialUrl: "" },
  { name: "Intro to Programming", issuer: "Kaggle", issuedDate: "May 2025", credentialId: "", credentialUrl: "" },
  { name: "JavaScript For Beginners", issuer: "Simplilearn", issuedDate: "May 2025", credentialId: "8358025", credentialUrl: "" },
  { name: "Prompt Engineering", issuer: "Infosys Springboard", issuedDate: "May 2025", credentialId: "", credentialUrl: "" },
  { name: "MATLAB Onramp", issuer: "MathWorks", issuedDate: "October 2023", credentialId: "", credentialUrl: "" },
  { name: "Udemy Certified GitHub Bootcamp", issuer: "Udemy", issuedDate: "May 2022", credentialId: "UC-e92c1cfb-63e7-4753-8cd7-11c3ca389c14", credentialUrl: "" },
  { name: "Udemy Certified Data Manipulation in Python", issuer: "Udemy", issuedDate: "May 2022", credentialId: "UC-225bb391-6156-43ba-bc48-2fd83431532e", credentialUrl: "" }
];
