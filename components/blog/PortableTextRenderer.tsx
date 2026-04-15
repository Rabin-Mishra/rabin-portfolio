import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "./PortableTextComponents";
import type { PortableTextValue } from "@/lib/portableText";

export function PortableTextRenderer({ value }: { value: PortableTextValue }) {
  if (typeof value === "string") {
    return (
      <div className="prose prose-neutral dark:prose-invert max-w-none">
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
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <PortableText value={value} components={portableTextComponents} />
    </div>
  );
}
