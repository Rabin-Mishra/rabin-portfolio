import { randomUUID } from "node:crypto";
import { createClient } from "@sanity/client";
import dotenv from "dotenv";

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

type PortableTextNode = PortableTextBlock | PortableTextCodeBlock;

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

const LANGUAGE_ALIASES: Record<string, string> = {
  js: "javascript",
  jsx: "jsx",
  ts: "typescript",
  tsx: "tsx",
  py: "python",
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  yml: "yaml",
  md: "markdown",
};

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

function looksLikeMarkdown(markdown: string) {
  return /(^|\n)(#{1,6}\s+|>\s+|[-*+]\s+|\d+\.\s+|```|---+$)/m.test(markdown);
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

function countIndentLevel(line: string) {
  const spaces = line.match(/^\s*/)?.[0].length ?? 0;
  return Math.max(1, Math.floor(spaces / 2) + 1);
}

function normalizeLanguage(language?: string) {
  const normalized = language?.trim().toLowerCase();

  if (!normalized) {
    return "text";
  }

  return LANGUAGE_ALIASES[normalized] ?? normalized;
}

function parseInlineMarkdown(text: string) {
  const markDefs: PortableTextMarkDef[] = [];

  function walk(source: string, activeMarks: string[] = []): PortableTextSpan[] {
    if (!source) {
      return [];
    }

    const candidates = [
      {
        type: "link" as const,
        match: source.match(/\[([^\]]+)\]\(([^)\s]+)\)/),
      },
      {
        type: "code" as const,
        match: source.match(/`([^`]+)`/),
      },
      {
        type: "strong" as const,
        match: source.match(/\*\*([^*]+)\*\*|__([^_]+)__/),
      },
      {
        type: "strike-through" as const,
        match: source.match(/~~([^~]+)~~/),
      },
      {
        type: "em" as const,
        match: source.match(/\*([^*\n]+)\*|_([^_\n]+)_/),
      },
    ]
      .filter(
        (
          candidate
        ): candidate is {
          type: "link" | "code" | "strong" | "strike-through" | "em";
          match: RegExpMatchArray;
        } => Boolean(candidate.match)
      )
      .sort((left, right) => left.match.index! - right.match.index!);

    const next = candidates[0];

    if (!next) {
      return [createSpan(source, activeMarks)];
    }

    const index = next.match.index ?? 0;
    const fullMatch = next.match[0];
    const before = source.slice(0, index);
    const after = source.slice(index + fullMatch.length);
    const spans = before ? [createSpan(before, activeMarks)] : [];

    if (next.type === "link") {
      const textValue = next.match[1];
      const href = next.match[2];
      const markKey = randomUUID();

      markDefs.push({
        _key: markKey,
        _type: "link",
        href,
        blank: /^https?:\/\//.test(href),
      });

      spans.push(...walk(textValue, [...activeMarks, markKey]));
    } else if (next.type === "code") {
      spans.push(createSpan(next.match[1], [...activeMarks, "code"]));
    } else {
      const innerText = next.match[1] || next.match[2] || "";
      spans.push(...walk(innerText, [...activeMarks, next.type]));
    }

    return [...spans, ...walk(after, activeMarks)];
  }

  return {
    children: walk(text),
    markDefs,
  };
}

function createRichBlock(
  text: string,
  style: PortableTextBlock["style"] = "normal",
  options: Pick<PortableTextBlock, "listItem" | "level"> = {}
): PortableTextBlock {
  const { children, markDefs } = parseInlineMarkdown(text);

  return {
    _key: randomUUID(),
    _type: "block",
    style,
    children: children.length > 0 ? children : [createSpan("")],
    markDefs,
    ...options,
  };
}

function markdownToPortableText(markdown: string): PortableTextNode[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: PortableTextNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    const codeFenceMatch = trimmed.match(/^```([\w-]+)?$/);

    if (codeFenceMatch) {
      const language = normalizeLanguage(codeFenceMatch[1]);
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }

      if (index < lines.length) {
        index += 1;
      }

      blocks.push({
        _key: randomUUID(),
        _type: "codeBlock",
        language,
        code: codeLines.join("\n"),
      });

      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);

    if (headingMatch) {
      const headingLevel = headingMatch[1].length;
      const style =
        headingLevel === 1
          ? "h1"
          : headingLevel === 2
            ? "h2"
            : headingLevel === 3
              ? "h3"
              : "h4";

      blocks.push(createRichBlock(headingMatch[2].trim(), style));
      index += 1;
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      index += 1;
      continue;
    }

    if (/^>\s?/.test(trimmed)) {
      const quoteLines: string[] = [];

      while (index < lines.length && /^>\s?/.test(lines[index].trim())) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }

      blocks.push(createRichBlock(quoteLines.join(" "), "blockquote"));
      continue;
    }

    const bulletMatch = line.match(/^(\s*)[-*+]\s+(.+)$/);

    if (bulletMatch) {
      while (index < lines.length) {
        const currentLine = lines[index];
        const currentMatch = currentLine.match(/^(\s*)[-*+]\s+(.+)$/);

        if (!currentMatch) {
          break;
        }

        blocks.push(
          createRichBlock(currentMatch[2].trim(), "normal", {
            listItem: "bullet",
            level: countIndentLevel(currentLine),
          })
        );
        index += 1;
      }

      continue;
    }

    const numberedMatch = line.match(/^(\s*)\d+\.\s+(.+)$/);

    if (numberedMatch) {
      while (index < lines.length) {
        const currentLine = lines[index];
        const currentMatch = currentLine.match(/^(\s*)\d+\.\s+(.+)$/);

        if (!currentMatch) {
          break;
        }

        blocks.push(
          createRichBlock(currentMatch[2].trim(), "normal", {
            listItem: "number",
            level: countIndentLevel(currentLine),
          })
        );
        index += 1;
      }

      continue;
    }

    const paragraphLines: string[] = [];

    while (index < lines.length) {
      const currentLine = lines[index];
      const currentTrimmed = currentLine.trim();

      if (
        !currentTrimmed ||
        /^```/.test(currentTrimmed) ||
        /^(#{1,4})\s+/.test(currentTrimmed) ||
        /^>\s?/.test(currentTrimmed) ||
        /^(\s*)[-*+]\s+/.test(currentLine) ||
        /^(\s*)\d+\.\s+/.test(currentLine) ||
        /^---+$/.test(currentTrimmed)
      ) {
        break;
      }

      paragraphLines.push(currentTrimmed);
      index += 1;
    }

    blocks.push(createRichBlock(paragraphLines.join(" ")));
  }

  return blocks.filter((block) => {
    if (block._type === "codeBlock") {
      return Boolean(block.code.trim());
    }

    return block.children.some((child) => child.text.trim().length > 0);
  });
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
