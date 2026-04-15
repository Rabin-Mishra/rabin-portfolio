import type { PortableTextInputProps } from "sanity";

export function MarkdownNoticeInput(props: PortableTextInputProps) {
  return (
    <div>
      <div
        style={{
          marginBottom: "0.75rem",
          borderRadius: "0.5rem",
          border: "1px solid #f59e0b",
          background: "#fffbeb",
          color: "#92400e",
          padding: "0.75rem 1rem",
          fontSize: "0.875rem",
          fontWeight: 600,
        }}
      >
        Do not paste raw Markdown here. Use the toolbar buttons to format
        headings, lists, and code blocks.
      </div>
      {props.renderDefault(props)}
    </div>
  );
}
