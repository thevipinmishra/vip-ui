import type { ReactNode } from "react";
import { type CodeLanguage, CodeSnippet } from "./code-snippet";
import { PreviewTabs } from "./preview-tabs";

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
    <PreviewTabs
      code={code.trim()}
      filename={filename}
      preview={children}
      source={<CodeSnippet code={code} language={language} />}
    />
  );
}
