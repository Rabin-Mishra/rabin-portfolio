import type { ReactNode } from "react";
import Image from "next/image";
import type { PortableTextReactComponents } from "@portabletext/react";
import { CodeBlockRenderer } from "./CodeBlockRenderer";
import {
  getPortableTextHeadingId,
  type PortableTextCodeBlock,
  type PortableTextImageBlock,
  type PortableTextTableBlock,
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
    <Tag
      id={id || undefined}
      className={`${className} scroll-mt-28 text-textPrimary`}
    >
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
    <div className="not-prose my-10">
      <figure className="mx-auto">
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

function PortableTable({ value }: { value: PortableTextTableBlock }) {
  const rows = value.rows ?? [];

  if (rows.length < 2) {
    return null;
  }

  const [headerRow, ...bodyRows] = rows;

  return (
    <div className="not-prose my-10 overflow-hidden rounded-[28px] border border-border/80 bg-background shadow-[0_24px_80px_-56px_rgba(15,23,42,0.45)]">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left">
          <thead className="bg-surface">
            <tr>
              {headerRow.cells.map((cell, index) => (
                <th
                  key={`${value._key || "table"}-head-${index}`}
                  className="border-b border-border px-5 py-4 text-sm font-semibold text-textPrimary"
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bodyRows.map((row, rowIndex) => (
              <tr
                key={row._key || `${value._key || "table"}-row-${rowIndex}`}
                className="odd:bg-background even:bg-surface/50"
              >
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={`${row._key || rowIndex}-cell-${cellIndex}`}
                    className="border-b border-border px-5 py-4 text-sm leading-7 text-textMuted"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => (
      <p className="mb-7 text-lg leading-[1.8] text-textPrimary/90">
        {children}
      </p>
    ),
    h1: ({ children, value }) => (
      <Heading
        as="h1"
        value={value}
        className="font-editorial mb-8 mt-16 text-4xl font-semibold tracking-[-0.03em] md:text-5xl"
      >
        {children}
      </Heading>
    ),
    h2: ({ children, value }) => (
      <Heading
        as="h2"
        value={value}
        className="font-editorial mb-5 mt-16 text-3xl font-semibold tracking-[-0.03em] md:text-[2.15rem]"
      >
        {children}
      </Heading>
    ),
    h3: ({ children, value }) => (
      <Heading
        as="h3"
        value={value}
        className="font-editorial mb-4 mt-12 text-2xl font-semibold tracking-[-0.02em]"
      >
        {children}
      </Heading>
    ),
    h4: ({ children, value }) => (
      <Heading
        as="h4"
        value={value}
        className="font-editorial mb-3 mt-8 text-xl font-semibold"
      >
        {children}
      </Heading>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 rounded-r-[24px] border-l-4 border-primary/50 bg-surface px-6 py-6 text-lg italic leading-8 text-textMuted shadow-[0_18px_44px_-36px_rgba(15,23,42,0.3)]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-8 list-disc space-y-3 pl-6 text-lg leading-[1.8] text-textPrimary/90 marker:text-primary">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-8 list-decimal space-y-3 pl-6 text-lg leading-[1.8] text-textPrimary/90 marker:font-semibold marker:text-primary">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded-md border border-border bg-surface px-1.5 py-0.5 font-mono text-[0.92em] text-textPrimary">
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
          className="font-semibold text-primary decoration-primary/30 decoration-2 underline-offset-4 transition-colors hover:text-secondary hover:underline"
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
    table: ({ value }) => <PortableTable value={value as PortableTextTableBlock} />,
  },
};
