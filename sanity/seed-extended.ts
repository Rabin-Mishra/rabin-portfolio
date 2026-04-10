import { createClient } from "@sanity/client";
import { CERTIFICATIONS, SKILLS, SITE_CONFIG } from "../lib/constants";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

async function seedExtended() {
  console.log("Seeding extended configuration data...");

  // 1. Site Config (Singleton)
  const siteConfigDoc = {
    _id: "siteConfig",
    _type: "siteConfig",
    ownerName: SITE_CONFIG.name,
    tagline: "Building reliable cloud infrastructure, one pipeline at a time.",
    shortBio: SITE_CONFIG.description,
    email: SITE_CONFIG.email,
    phone: "+977-9824059780",
    location: "Kathmandu, Bāgmatī, Nepal",
    githubUrl: "https://github.com/Rabin-Mishra",
    linkedinUrl: "https://www.linkedin.com/in/rabin-mishra-3782ba214",
    domain: SITE_CONFIG.url,
  };
  console.log("Creating/Updating SiteConfig...");
  await client.createOrReplace(siteConfigDoc);

  // 2. Education
  const educations = [
    {
      _type: "education",
      institution: "Pokhara University",
      degree: "Bachelor of Engineering",
      field: "Information Technology (Computer Science)",
      startDate: "2021-12",
      endDate: "2025-12",
      gpa: 3.9,
      isCurrent: false,
    },
    {
      _type: "education",
      institution: "Kathmandu Model Secondary School",
      degree: "High School Diploma",
      field: "Physical Sciences",
      startDate: "2019-06",
      endDate: "2021-06",
      gpa: 3.85,
      isCurrent: false,
    },
  ];

  console.log(`Creating ${educations.length} Education entries...`);
  for (const edu of educations) {
    await client.create(edu);
  }

  // 3. Certifications
  console.log(`Creating ${CERTIFICATIONS.length} Certificates...`);
  for (const cert of CERTIFICATIONS) {
    let category = "Other";
    if (
      cert.name.includes("AWS") ||
      cert.name.includes("Cloud") ||
      cert.issuer.includes("Amazon")
    ) {
      category = "Cloud & AWS";
    } else if (
      cert.name.includes("Linux") ||
      cert.name.includes("DevOps") ||
      cert.name.includes("Bash")
    ) {
      category = "Linux & DevOps";
    } else if (
      cert.name.includes("Python") ||
      cert.name.includes("JavaScript") ||
      cert.name.includes("MATLAB") ||
      cert.name.includes("Programming")
    ) {
      category = "Programming";
    }

    await client.create({
      _type: "certification",
      name: cert.name,
      issuer: cert.issuer,
      issuedDate: cert.issuedDate,
      credentialId: cert.credentialId || undefined,
      credentialUrl: cert.credentialUrl || undefined,
      category,
    });
  }

  // 4. Skills
  console.log(`Creating ${SKILLS.length} Skills...`);
  for (const skill of SKILLS) {
    let category = "Dev & Tools";
    if (skill.category === "Cloud") category = "Cloud & Infrastructure";
    if (skill.category === "DevOps" || skill.category === "CI/CD")
      category = "CI/CD & Automation";
    if (skill.category === "OS" || skill.category === "Web Server")
      category = "OS & Networking";

    await client.create({
      _type: "skill",
      name: skill.name,
      icon: skill.icon,
      category,
    });
  }

  console.log("Seeding extended configuration complete! 🎉");
}

seedExtended().catch((err) => {
  console.error("Error running seed script:", err);
  process.exit(1);
});
