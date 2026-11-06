import { createHighlighter } from "@tanstack/highlight/core";
import { css } from "@tanstack/highlight/languages/css";
import { json } from "@tanstack/highlight/languages/json";
import { shell } from "@tanstack/highlight/languages/shell";
import { ts } from "@tanstack/highlight/languages/ts";
import { tsx } from "@tanstack/highlight/languages/tsx";

export type CodeLanguage = "tsx" | "ts" | "css" | "bash" | "json";

const highlighter = createHighlighter({
  languages: [css, json, shell, ts, tsx],
});

export function highlightCode(code: string, language: CodeLanguage) {
  const { htmlMarkup } = highlighter.renderCodeBlockData({
    code: code.trim(),
    lang: language,
    lineNumbers: language !== "bash",
  });
  return {
    html: htmlMarkup,
    lineDigits: String(code.trim().split("\n").length).length,
  };
}
