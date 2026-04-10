import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: "u6l38s23",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

const DOCUMENT_TYPES = [
  "post",
  "project",
  "category",
  "author",
  "education",
  "certification",
  "skill",
  "siteConfig",
  "workExperience",
];

async function cleanup() {
  console.log("🧹 Starting Sanity cleanup...\n");

  let totalDeleted = 0;

  for (const type of DOCUMENT_TYPES) {
    // Fetch all documents of this type
    const docs = await client.fetch<Array<{ _id: string }>>(
      `*[_type == $type]{ _id }`,
      { type }
    );

    if (docs.length === 0) {
      console.log(`  [${type}] — 0 documents found, skipping.`);
      continue;
    }

    // Delete each document
    let deletedCount = 0;
    for (const doc of docs) {
      await client.delete(doc._id);
      deletedCount++;
    }

    console.log(`  [${type}] — deleted ${deletedCount} document(s).`);
    totalDeleted += deletedCount;
  }

  console.log(`\n✅ Cleanup complete. Total deleted: ${totalDeleted} document(s).`);
}

cleanup().catch((err) => {
  console.error("❌ Cleanup failed:", err.message ?? err);
  process.exit(1);
});
