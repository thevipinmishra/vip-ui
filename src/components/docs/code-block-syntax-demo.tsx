import { createHighlighter } from "@tanstack/highlight/core";
import { tsx } from "@tanstack/highlight/languages/tsx";
import type { ReactNode } from "react";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockBody,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/ui/code-block";

const CODE = `import { useState } from "react";
import { Button } from "@/components/vip-ui/button";

export function PublishButton() {
  const [publishing, setPublishing] = useState(false);

  return (
    <Button
      isPending={publishing}
      onPress={() => {
        setPublishing(true);
        publish().finally(() => setPublishing(false));
      }}
    >
      Publish release
    </Button>
  );
}`;

const highlighter = createHighlighter({ languages: [tsx] });
const tokens = highlighter.tokenize(CODE, { lang: "tsx" }).tokens;

const tokenNodes: ReactNode[] = [];
let offset = 0;
for (const token of tokens) {
  tokenNodes.push(
    <span
      key={offset}
      className={token.className ? `th-${token.className}` : undefined}
    >
      {token.value}
    </span>,
  );
  offset += token.value.length;
}

const styles = `.code-syntax .th-keyword { color: #cf222e; }
.code-syntax .th-string { color: #0a3069; }
.code-syntax .th-function { color: #8250df; }
.code-syntax .th-tag { color: #116329; }
.code-syntax .th-attr { color: #0550ae; }
.code-syntax .th-property { color: #0550ae; }
.code-syntax .th-number { color: #0550ae; }
.code-syntax .th-type { color: #953800; }
.dark .code-syntax .th-keyword { color: #ff7b72; }
.dark .code-syntax .th-string { color: #a5d6ff; }
.dark .code-syntax .th-function { color: #d2a8ff; }
.dark .code-syntax .th-tag { color: #7ee787; }
.dark .code-syntax .th-attr { color: #79c0ff; }
.dark .code-syntax .th-property { color: #79c0ff; }
.dark .code-syntax .th-number { color: #79c0ff; }
.dark .code-syntax .th-type { color: #ffa657; }`;

export function CodeBlockSyntaxDemo() {
  return (
    <>
      <style>{styles}</style>
      <CodeBlock
        code={CODE}
        language="tsx"
        lineNumbers={false}
        className="code-syntax w-full max-w-lg"
      >
        <CodeBlockHeader>
          <CodeBlockTitle>publish-button.tsx</CodeBlockTitle>
          <CodeBlockActions />
        </CodeBlockHeader>
        <CodeBlockBody>{tokenNodes}</CodeBlockBody>
      </CodeBlock>
    </>
  );
}
