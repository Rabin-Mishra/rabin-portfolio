import type {
  PortableTextBlock,
  PortableTextCodeBlock,
  PortableTextNode,
  PortableTextSpan,
  PortableTextTableBlock,
  PortableTextTableRow,
} from "./portableText";

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

type PortableTextMarkDef = NonNullable<PortableTextBlock["markDefs"]>[number];

function generateKey() {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function createSpan(text: string, marks: string[] = []): PortableTextSpan {
  return {
    _key: generateKey(),
    _type: "span",
    marks,
    text,
  };
}

function createRichBlock(
  text: string,
  style: PortableTextBlock["style"] = "normal",
  options: Pick<PortableTextBlock, "listItem" | "level"> = {}
): PortableTextBlock {
  const { children, markDefs } = parseInlineMarkdown(text);

  return {
    _key: generateKey(),
    _type: "block",
    style,
    children: children.length > 0 ? children : [createSpan("")],
    markDefs,
    ...options,
  };
}

function createCodeBlock(code: string, language?: string): PortableTextCodeBlock {
  return {
    _key: generateKey(),
    _type: "codeBlock",
    language: normalizeLanguage(language),
    code,
  };
}

function createTableBlock(rows: string[][]): PortableTextTableBlock {
  return {
    _key: generateKey(),
    _type: "table",
    rows: rows.map(
      (cells): PortableTextTableRow => ({
        _key: generateKey(),
        cells,
      })
    ),
  };
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
      const markKey = generateKey();

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

function splitTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isMarkdownTableSeparator(line: string) {
  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line.trim());
}

function isMarkdownTableStart(lines: string[], index: number) {
  const current = lines[index]?.trim();
  const next = lines[index + 1]?.trim();

  if (!current || !next || !current.includes("|")) {
    return false;
  }

  return isMarkdownTableSeparator(next);
}

export function looksLikeMarkdown(markdown: string) {
  return /(^|\n)(#{1,6}\s+|>\s+|[-*+]\s+|\d+\.\s+|```|---+$|\|.+\|)|(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/m.test(
    markdown
  );
}

export function markdownToPortableText(markdown: string): PortableTextNode[] {
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
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }

      if (index < lines.length) {
        index += 1;
      }

      blocks.push(createCodeBlock(codeLines.join("\n"), codeFenceMatch[1]));
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

    if (isMarkdownTableStart(lines, index)) {
      const tableRows: string[][] = [];

      tableRows.push(splitTableRow(lines[index]));
      index += 2;

      while (index < lines.length) {
        const currentLine = lines[index].trim();

        if (!currentLine || !currentLine.includes("|")) {
          break;
        }

        tableRows.push(splitTableRow(lines[index]));
        index += 1;
      }

      if (tableRows.length > 1) {
        blocks.push(createTableBlock(tableRows));
      }

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
        /^---+$/.test(currentTrimmed) ||
        isMarkdownTableStart(lines, index)
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
      return Boolean(block.code?.trim());
    }

    if (block._type === "table") {
      return block.rows.length > 1 && block.rows.some((row) => row.cells.some(Boolean));
    }

    if (block._type !== "block") {
      return true;
    }

    return block.children.some((child) => child.text.trim().length > 0);
  });
}
