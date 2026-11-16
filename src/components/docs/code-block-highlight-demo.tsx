import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockBody,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/ui/code-block";

const CODE = `import { NextResponse } from "next/server";
import { listProjects } from "@/lib/projects";

export async function GET() {
  const projects = await listProjects();
  const active = projects.filter((project) => project.status === "active");

  return NextResponse.json(active);
}`;

export function CodeBlockHighlightDemo() {
  return (
    <CodeBlock
      code={CODE}
      language="ts"
      highlight={[5, 6]}
      className="w-full max-w-lg"
    >
      <CodeBlockHeader>
        <CodeBlockTitle>route.ts</CodeBlockTitle>
        <CodeBlockActions />
      </CodeBlockHeader>
      <CodeBlockBody />
    </CodeBlock>
  );
}
