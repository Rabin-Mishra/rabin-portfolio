"use client";

import { useMemo, useState } from "react";
import { PatchEvent, set, type PortableTextInputProps } from "sanity";
import { looksLikeMarkdown, markdownToPortableText } from "../../lib/markdown";
import type { PortableTextNode } from "../../lib/portableText";

function getPortableTextValue(value: PortableTextInputProps["value"]) {
  return Array.isArray(value) ? (value as PortableTextNode[]) : [];
}

export function MarkdownNoticeInput(props: PortableTextInputProps) {
  const [markdown, setMarkdown] = useState("");
  const [status, setStatus] = useState("");
  const currentValue = getPortableTextValue(props.value);
  const previewBlocks = useMemo(
    () => (markdown.trim() ? markdownToPortableText(markdown.trim()) : []),
    [markdown]
  );

  const applyMarkdown = (mode: "replace" | "append") => {
    const trimmedMarkdown = markdown.trim();

    if (!trimmedMarkdown) {
      setStatus("Paste some Markdown first.");
      return;
    }

    const convertedBlocks = markdownToPortableText(trimmedMarkdown);

    if (!convertedBlocks.length) {
      setStatus("I could not detect any Markdown blocks to convert.");
      return;
    }

    const nextValue =
      mode === "append" && currentValue.length > 0
        ? [...currentValue, ...convertedBlocks]
        : convertedBlocks;

    props.onChange(PatchEvent.from(set(nextValue)));
    setMarkdown("");
    setStatus(
      `Converted ${convertedBlocks.length} block${convertedBlocks.length === 1 ? "" : "s"} and ${
        mode === "append" && currentValue.length > 0 ? "appended them" : "replaced the editor content"
      }.`
    );
  };

  const handleEditorPaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    if (currentValue.length > 0) {
      return;
    }

    const pastedText = event.clipboardData.getData("text/plain").trim();

    if (!pastedText || !looksLikeMarkdown(pastedText)) {
      return;
    }

    const convertedBlocks = markdownToPortableText(pastedText);

    if (!convertedBlocks.length) {
      return;
    }

    event.preventDefault();
    props.onChange(PatchEvent.from(set(convertedBlocks)));
    setStatus(
      `Pasted Markdown was auto-converted into ${convertedBlocks.length} Portable Text block${
        convertedBlocks.length === 1 ? "" : "s"
      }.`
    );
  };

  return (
    <div>
      <div
        style={{
          marginBottom: "0.75rem",
          borderRadius: "0.75rem",
          border: "1px solid #bfdbfe",
          background: "#eff6ff",
          color: "#1d4ed8",
          padding: "0.75rem 1rem",
          fontSize: "0.875rem",
          fontWeight: 600,
        }}
      >
        Paste Markdown from ChatGPT directly into an empty editor to auto-convert it, or use the helper box below.
      </div>

      <div
        style={{
          marginBottom: "1rem",
          borderRadius: "0.75rem",
          border: "1px solid #dbe3f0",
          background: "#ffffff",
          padding: "1rem",
        }}
      >
        <label
          htmlFor="markdown-helper"
          style={{
            display: "block",
            marginBottom: "0.5rem",
            color: "#111827",
            fontSize: "0.875rem",
            fontWeight: 700,
          }}
        >
          Markdown quick paste
        </label>
        <textarea
          id="markdown-helper"
          value={markdown}
          onChange={(event) => setMarkdown(event.currentTarget.value)}
          placeholder="Paste Markdown here if you want to convert it before it enters the editor."
          rows={8}
          style={{
            width: "100%",
            resize: "vertical",
            borderRadius: "0.75rem",
            border: "1px solid #d1d5db",
            padding: "0.875rem 1rem",
            fontSize: "0.875rem",
            lineHeight: 1.6,
          }}
        />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            alignItems: "center",
            marginTop: "0.875rem",
          }}
        >
          <button
            type="button"
            onClick={() => applyMarkdown("replace")}
            disabled={previewBlocks.length === 0}
            style={{
              borderRadius: "999px",
              border: "none",
              background: previewBlocks.length === 0 ? "#cbd5e1" : "#2563eb",
              color: "#ffffff",
              cursor: previewBlocks.length === 0 ? "not-allowed" : "pointer",
              fontSize: "0.875rem",
              fontWeight: 700,
              padding: "0.625rem 1rem",
            }}
          >
            Convert and replace
          </button>
          <button
            type="button"
            onClick={() => applyMarkdown("append")}
            disabled={previewBlocks.length === 0 || currentValue.length === 0}
            style={{
              borderRadius: "999px",
              border: "1px solid #cbd5e1",
              background: "#ffffff",
              color:
                previewBlocks.length === 0 || currentValue.length === 0 ? "#94a3b8" : "#111827",
              cursor:
                previewBlocks.length === 0 || currentValue.length === 0 ? "not-allowed" : "pointer",
              fontSize: "0.875rem",
              fontWeight: 700,
              padding: "0.625rem 1rem",
            }}
          >
            Append below existing content
          </button>
          <span style={{ color: "#475569", fontSize: "0.875rem" }}>
            {previewBlocks.length > 0
              ? `${previewBlocks.length} block${previewBlocks.length === 1 ? "" : "s"} detected`
              : `${currentValue.length} block${currentValue.length === 1 ? "" : "s"} currently in the editor`}
          </span>
        </div>
        {status ? (
          <p
            style={{
              marginTop: "0.75rem",
              color: "#0f172a",
              fontSize: "0.875rem",
            }}
          >
            {status}
          </p>
        ) : null}
      </div>

      <div onPasteCapture={handleEditorPaste}>{props.renderDefault(props)}</div>
    </div>
  );
}
