import { randomUUID } from "node:crypto";
import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import { looksLikeMarkdown, markdownToPortableText } from "../lib/markdown";

dotenv.config({ path: ".env.local" });

type RawBody =
  | string
  | Array<{
      _type?: string;
      style?: string;
      listItem?: string;
      children?: Array<{ _type?: string; text?: string }>;
      markDefs?: unknown[];
    }>
  | null
  | undefined;

type PortableTextSpan = {
  _key: string;
  _type: "span";
  marks: string[];
  text: string;
};

type PortableTextMarkDef = {
  _key: string;
  _type: "link";
  href: string;
  blank?: boolean;
};

type PortableTextBlock = {
  _key: string;
  _type: "block";
  style: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
  children: PortableTextSpan[];
  markDefs: PortableTextMarkDef[];
  listItem?: "bullet" | "number";
  level?: number;
};

type PortableTextCodeBlock = {
  _key: string;
  _type: "codeBlock";
  language: string;
  code: string;
};

type PortableTextTableBlock = {
  _key: string;
  _type: "table";
  rows: Array<{
    _key: string;
    cells: string[];
  }>;
};

type PortableTextNode = PortableTextBlock | PortableTextCodeBlock | PortableTextTableBlock;

interface PostRecord {
  _id: string;
  title: string;
  body?: RawBody;
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "u6l38s23";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_TOKEN;

if (!token) {
  throw new Error(
    "Missing SANITY_API_TOKEN in .env.local. The migration needs write access."
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

function createSpan(text: string, marks: string[] = []): PortableTextSpan {
  return {
    _key: randomUUID(),
    _type: "span",
    marks,
    text,
  };
}

function createBlock(
  text: string,
  style: PortableTextBlock["style"] = "normal",
  options: Pick<PortableTextBlock, "listItem" | "level"> = {}
): PortableTextBlock {
  return {
    _key: randomUUID(),
    _type: "block",
    style,
    markDefs: [],
    children: [createSpan(text)],
    ...options,
  };
}

function bodyToMarkdown(body: RawBody): string {
  if (typeof body === "string") {
    return body.trim();
  }

  if (!Array.isArray(body)) {
    return "";
  }

  return body
    .map((block) =>
      (block.children || [])
        .filter((child) => child._type === "span")
        .map((child) => child.text || "")
        .join("")
    )
    .join("\n\n")
    .trim();
}

function isStructuredPortableText(body: RawBody) {
  return Array.isArray(body)
    ? body.some(
        (block) =>
          block._type !== "block" ||
          block.style !== "normal" ||
          Boolean(block.listItem) ||
          (block.markDefs?.length || 0) > 0
      )
    : false;
}

function shouldMigrate(body: RawBody) {
  const markdown = bodyToMarkdown(body);

  if (!markdown || !looksLikeMarkdown(markdown)) {
    return false;
  }

  if (typeof body === "string") {
    return true;
  }

  return !isStructuredPortableText(body);
}


async function migrateMarkdownPosts() {
  console.log("Starting Markdown -> Portable Text migration...\n");

  const posts = await client.fetch<PostRecord[]>(
    `*[_type == "post" && defined(body)]{ _id, title, body }`
  );

  const candidates = posts.filter((post) => shouldMigrate(post.body));

  if (candidates.length === 0) {
    console.log("No Markdown-style post bodies were found. Nothing to migrate.");
    return;
  }

  console.log(`Found ${candidates.length} post(s) to migrate.\n`);

  for (const post of candidates) {
    const markdown = bodyToMarkdown(post.body);
    const portableText = markdownToPortableText(markdown);

    if (portableText.length === 0) {
      console.log(`Skipping "${post.title}" because no Portable Text blocks were generated.`);
      continue;
    }

    await client.patch(post._id).set({ body: portableText }).commit();
    console.log(`Migrated "${post.title}" (${post._id}).`);
  }

  console.log("\nMigration complete.");
}

migrateMarkdownPosts().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
