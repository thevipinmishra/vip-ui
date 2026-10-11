import type { ReactNode } from "react";
import { type CodeLanguage, CodeSnippet } from "./code-snippet";
import { PreviewCode } from "./preview-code";

export async function PreviewPanel({
  children,
  code,
  filename = "example.tsx",
  language = "tsx",
}: {
  children: ReactNode;
  code: string;
  filename?: string;
  language?: CodeLanguage;
}) {
  return (
    <PreviewCode
      code={code.trim()}
      filename={filename}
      preview={children}
      source={<CodeSnippet code={code} language={language} />}
    />
  );
}
