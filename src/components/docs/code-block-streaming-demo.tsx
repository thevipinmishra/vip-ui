"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockBody,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/ui/code-block";
import {
  Response,
  ResponseActions,
  ResponseContent,
} from "@/components/ui/response";

const CODE = `import { NextResponse } from "next/server";
import { searchProjects } from "@/lib/projects";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";
  const projects = await searchProjects(query);
  const active = projects.filter((project) => project.status === "active");

  return NextResponse.json({
    total: active.length,
    projects: active.slice(0, 20),
  });
}`;

const LINES = CODE.split("\n");

export function CodeBlockStreamingDemo() {
  const [revealed, setRevealed] = useState(1);
  const streaming = revealed < LINES.length;

  useEffect(() => {
    if (!streaming) return;
    const id = window.setInterval(() => {
      setRevealed((current) => Math.min(LINES.length, current + 1));
    }, 400);
    return () => window.clearInterval(id);
  }, [streaming]);

  return (
    <Response
      status={streaming ? "streaming" : "complete"}
      className="w-full max-w-lg"
    >
      <ResponseContent caret={false}>
        <p>Here is the route handler for project search.</p>
        <CodeBlock
          code={LINES.slice(0, revealed).join("\n")}
          language="ts"
          isStreaming={streaming}
          className="mt-3"
        >
          <CodeBlockHeader>
            <CodeBlockTitle>route.ts</CodeBlockTitle>
            <CodeBlockActions />
          </CodeBlockHeader>
          <CodeBlockBody />
        </CodeBlock>
      </ResponseContent>
      <ResponseActions>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onPress={() => setRevealed(1)}
        >
          Stream again
        </Button>
      </ResponseActions>
    </Response>
  );
}
