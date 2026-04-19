import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "./PortableTextComponents";
import type { PortableTextValue } from "@/lib/portableText";
import { looksLikeMarkdown, markdownToPortableText } from "@/lib/markdown";
import { extractPortableTextHtmlDocument } from "@/lib/portableText";
import { HtmlDocumentEmbed } from "./HtmlDocumentEmbed";

export function PortableTextRenderer({ value }: { value: PortableTextValue }) {
  const htmlDocument = extractPortableTextHtmlDocument(value);

  // HTML embeds get FULL width — no max-w constraint
  if (htmlDocument) {
    return (
      <div className="article-body w-full">
        <HtmlDocumentEmbed html={htmlDocument} title="Embedded HTML article" />
      </div>
    );
  }

  if (typeof value === "string") {
    if (looksLikeMarkdown(value)) {
      return (
        <div className="article-body mx-auto max-w-3xl px-4 sm:px-6 lg:px-0">
          <PortableText
            value={markdownToPortableText(value)}
            components={portableTextComponents}
          />
        </div>
      );
    }

    return (
      <div className="article-body mx-auto max-w-3xl px-4 sm:px-6 lg:px-0">
        <p className="mb-4 whitespace-pre-wrap leading-7 text-textPrimary">
          {value}
        </p>
      </div>
    );
  }

  if (!Array.isArray(value) || value.length === 0) {
    return null;
  }

  return (
    <div className="article-body mx-auto max-w-3xl px-4 sm:px-6 lg:px-0">
      <PortableText value={value} components={portableTextComponents} />
    </div>
  );
}
