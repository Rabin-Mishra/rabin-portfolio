import { codeToHtml } from "shiki";
import { CodeCopyButton } from "./CodeCopyButton";

interface CodeBlockRendererProps {
  code: string;
  language?: string;
}

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

function normalizeLanguage(language?: string) {
  const normalized = language?.trim().toLowerCase();

  if (!normalized) {
    return "text";
  }

  return LANGUAGE_ALIASES[normalized] ?? normalized;
}

async function highlightCode(code: string, language?: string) {
  const normalizedLanguage = normalizeLanguage(language);

  try {
    return await codeToHtml(code, {
      lang: normalizedLanguage,
      themes: {
        light: "github-light",
        dark: "github-dark-default",
      },
    });
  } catch {
    return codeToHtml(code, {
      lang: "text",
      themes: {
        light: "github-light",
        dark: "github-dark-default",
      },
    });
  }
}

export async function CodeBlockRenderer({
  code,
  language,
}: CodeBlockRendererProps) {
  const trimmedCode = code?.trimEnd() ?? "";

  if (!trimmedCode) {
    return null;
  }

  const highlightedCode = await highlightCode(trimmedCode, language);
  const label = normalizeLanguage(language);

  return (
    <div className="not-prose my-8 overflow-hidden rounded-2xl border border-border bg-background shadow-lg">
      <div className="flex items-center justify-between border-b border-border bg-slate-100/90 px-4 py-3 dark:bg-slate-900/90">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600 dark:text-slate-300">
          {label}
        </span>
        <CodeCopyButton code={trimmedCode} />
      </div>
      <div
        className="[&_.shiki]:m-0 [&_.shiki]:overflow-x-auto [&_.shiki]:p-4 [&_.shiki]:text-sm [&_.shiki]:leading-7 [&_.shiki_code]:grid [&_.shiki_code]:min-w-full [&_.line]:min-h-[1.75rem]"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </div>
  );
}
