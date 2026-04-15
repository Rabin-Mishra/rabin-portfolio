import type { ReactNode } from "react";
import Image from "next/image";
import type { PortableTextReactComponents } from "@portabletext/react";
import { CodeBlockRenderer } from "./CodeBlockRenderer";
import {
  getPortableTextHeadingId,
  type PortableTextCodeBlock,
  type PortableTextImageBlock,
} from "@/lib/portableText";
import { urlForImage } from "@/sanity/lib/image";

function Heading({
  as: Tag,
  className,
  children,
  value,
}: {
  as: "h1" | "h2" | "h3" | "h4";
  className: string;
  children: ReactNode;
  value:
    | {
        children?: unknown[];
      }
    | null
    | undefined;
}) {
  const id = getPortableTextHeadingId(value);

  return (
    <Tag id={id || undefined} className={`${className} scroll-mt-24 text-textPrimary`}>
      {children}
    </Tag>
  );
}

function PortableImage({ value }: { value: PortableTextImageBlock }) {
  const imageUrl =
    value.imageUrl ??
    value.asset?.url ??
    (value.asset?._ref ? urlForImage(value).url() : null);
  const width = value.dimensions?.width ?? 1600;
  const height = value.dimensions?.height ?? 900;
  const alt = value.alt?.trim() || "Blog post image";

  if (!imageUrl) {
    return null;
  }

  return (
    <div className="not-prose my-8">
      <figure className="mx-auto max-w-3xl">
        <Image
          src={imageUrl}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 1280px) 768px, (min-width: 768px) 80vw, 100vw"
          className="h-auto w-full rounded-2xl border border-border object-cover shadow-lg"
        />
        {value.caption ? (
          <figcaption className="mt-3 text-center text-sm italic text-textMuted">
            {value.caption}
          </figcaption>
        ) : null}
      </figure>
    </div>
  );
}

export const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 leading-7 text-textPrimary">{children}</p>
    ),
    h1: ({ children, value }) => (
      <Heading
        as="h1"
        value={value}
        className="mb-4 mt-10 text-3xl font-bold"
      >
        {children}
      </Heading>
    ),
    h2: ({ children, value }) => (
      <Heading
        as="h2"
        value={value}
        className="mb-3 mt-8 border-b border-border pb-2 text-2xl font-semibold"
      >
        {children}
      </Heading>
    ),
    h3: ({ children, value }) => (
      <Heading
        as="h3"
        value={value}
        className="mb-2 mt-6 text-xl font-semibold"
      >
        {children}
      </Heading>
    ),
    h4: ({ children, value }) => (
      <Heading
        as="h4"
        value={value}
        className="mb-2 mt-4 text-lg font-medium"
      >
        {children}
      </Heading>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 rounded-r-xl border-l-4 border-primary bg-surface px-5 py-4 italic text-textMuted">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-1 pl-6 text-textPrimary">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-1 pl-6 text-textPrimary">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-7">{children}</li>,
    number: ({ children }) => <li className="leading-7">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded-md bg-slate-900 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-100 dark:bg-slate-800">
        {children}
      </code>
    ),
    underline: ({ children }) => <span className="underline">{children}</span>,
    "strike-through": ({ children }) => (
      <span className="line-through">{children}</span>
    ),
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const openInNewTab = Boolean(value?.blank);

      return (
        <a
          href={href}
          target={openInNewTab ? "_blank" : undefined}
          rel={openInNewTab ? "noreferrer noopener" : undefined}
          className="font-medium text-primary transition-colors hover:text-secondary hover:underline"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => <PortableImage value={value as PortableTextImageBlock} />,
    codeBlock: ({ value }) => {
      const codeBlock = value as PortableTextCodeBlock;

      return (
        <CodeBlockRenderer
          code={codeBlock.code ?? ""}
          language={codeBlock.language}
        />
      );
    },
  },
};
