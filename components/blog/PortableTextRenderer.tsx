import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "./PortableTextComponents";
import type { PortableTextValue } from "@/lib/portableText";
import { looksLikeMarkdown, markdownToPortableText } from "@/lib/markdown";
import { extractPortableTextHtmlDocument } from "@/lib/portableText";
import { HtmlDocumentEmbed } from "./HtmlDocumentEmbed";

export function PortableTextRenderer({ value }: { value: PortableTextValue }) {
  const htmlDocument = extractPortableTextHtmlDocument(value);

  if (htmlDocument) {
    return (
      <div className="article-body">
        <HtmlDocumentEmbed html={htmlDocument} title="Embedded HTML article" />
      </div>
    );
  }

  if (typeof value === "string") {
    if (looksLikeMarkdown(value)) {
      return (
        <div className="article-body">
          <PortableText
            value={markdownToPortableText(value)}
            components={portableTextComponents}
          />
        </div>
      );
    }

    return (
      <div className="article-body">
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
    <div className="article-body">
      <PortableText value={value} components={portableTextComponents} />
    </div>
  );
}
