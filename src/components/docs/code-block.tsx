import { CodeFrame } from "./code-frame";
import { type CodeLanguage, CodeSnippet } from "./code-snippet";

interface CodeBlockProps {
  code: string;
  filename?: string;
  language?: CodeLanguage;
}

export async function CodeBlock({
  code,
  filename,
  language = "tsx",
}: CodeBlockProps) {
  return (
    <CodeFrame
      code={code}
      filename={filename ?? (language === "bash" ? "terminal" : "example.tsx")}
      previewCode
    >
      <CodeSnippet code={code} language={language} />
    </CodeFrame>
  );
}
