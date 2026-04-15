import { slugify } from "./utils";

export interface PortableTextSpan {
  _key: string;
  _type: "span";
  marks: string[];
  text: string;
}

export interface PortableTextLinkMarkDefinition {
  _key: string;
  _type: "link";
  href: string;
  blank?: boolean;
}

export interface PortableTextBlock {
  _key?: string;
  _type: "block";
  style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
  children: PortableTextSpan[];
  markDefs?: PortableTextLinkMarkDefinition[];
  listItem?: "bullet" | "number";
  level?: number;
}

export interface PortableTextCodeBlock {
  _key?: string;
  _type: "codeBlock";
  language?: string;
  code?: string;
}

export interface PortableTextImageDimensions {
  width?: number;
  height?: number;
  aspectRatio?: number;
}

export interface PortableTextImageBlock {
  _key?: string;
  _type: "image";
  alt?: string;
  caption?: string;
  imageUrl?: string;
  asset?: {
    _ref?: string;
    url?: string;
  };
  dimensions?: PortableTextImageDimensions;
}

export type PortableTextNode =
  | PortableTextBlock
  | PortableTextCodeBlock
  | PortableTextImageBlock;

export type PortableTextValue = PortableTextNode[] | string | null | undefined;

export interface PortableTextHeading {
  text: string;
  id: string;
  level: 2 | 3;
}

type PortableTextBlockLike =
  | {
      children?: unknown[];
    }
  | null
  | undefined;

export function isPortableTextBlock(
  value: PortableTextNode | null | undefined
): value is PortableTextBlock {
  return value?._type === "block";
}

export function getPortableTextBlockText(
  block: PortableTextBlockLike
): string {
  if (!block?.children?.length) {
    return "";
  }

  return block.children
    .map((child) =>
      typeof child === "object" &&
      child !== null &&
      "text" in child &&
      typeof child.text === "string"
        ? child.text
        : ""
    )
    .join("");
}

export function getPortableTextHeadingId(
  block: PortableTextBlockLike
): string {
  return slugify(getPortableTextBlockText(block));
}

function extractMarkdownHeadings(markdown: string): PortableTextHeading[] {
  return markdown
    .split(/\r?\n/)
    .map((line) => line.trim())
    .flatMap((line) => {
      const match = line.match(/^(#{2,3})\s+(.+)$/);

      if (!match) {
        return [];
      }

      const text = match[2].trim();
      const id = slugify(text);

      if (!text || !id) {
        return [];
      }

      return [
        {
          text,
          id,
          level: match[1].length as 2 | 3,
        },
      ];
    });
}

export function extractPortableTextHeadings(
  body: PortableTextValue
): PortableTextHeading[] {
  if (typeof body === "string") {
    return extractMarkdownHeadings(body);
  }

  if (!Array.isArray(body) || body.length === 0) {
    return [];
  }

  const headings = body
    .filter(
      (block): block is PortableTextBlock =>
        isPortableTextBlock(block) &&
        (block.style === "h2" || block.style === "h3")
    )
    .map((heading) => {
      const text = getPortableTextBlockText(heading);
      const id = getPortableTextHeadingId(heading);

      return {
        text,
        id,
        level: heading.style === "h2" ? 2 : 3,
      } satisfies PortableTextHeading;
    })
    .filter((heading) => heading.text && heading.id);

  if (headings.length > 0) {
    return headings;
  }

  const markdownFallback = body
    .filter(isPortableTextBlock)
    .map((block) => getPortableTextBlockText(block))
    .join("\n\n");

  return extractMarkdownHeadings(markdownFallback);
}
