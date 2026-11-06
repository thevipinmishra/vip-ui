import type { CSSProperties } from "react";
import { type CodeLanguage, highlightCode } from "@/lib/highlight";

export type { CodeLanguage };

export function CodeSnippet({
  code,
  language = "tsx",
}: {
  code: string;
  language?: CodeLanguage;
}) {
  const { html, lineDigits } = highlightCode(code, language);
  return (
    <div
      className="code-block min-w-0 text-code-foreground"
      data-language={language}
      style={{ "--code-line-digits": lineDigits } as CSSProperties}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: highlighter output escapes the source text
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
