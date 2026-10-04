"use client";

import type { ReactNode } from "react";
import { CodeFrame } from "./code-frame";

export function PreviewCode({
  code,
  filename,
  preview,
  source,
}: {
  code: string;
  filename: string;
  preview: ReactNode;
  source: ReactNode;
}) {
  return (
    <div
      data-slot="component-preview"
      className="min-w-0 overflow-hidden rounded-xl bg-card text-card-foreground shadow-[var(--shadow-card)] ring-1 ring-border/70"
    >
      <div className="preview-canvas relative flex min-h-72 items-center justify-center bg-muted/40 px-5 py-10 sm:px-10">
        <div className="relative z-10 flex w-full justify-center">
          {preview}
        </div>
      </div>
      <div className="min-w-0 border-t border-border/70">
        <CodeFrame
          code={code}
          filename={filename}
          language="tsx"
          embedded
          previewCode
        >
          {source}
        </CodeFrame>
      </div>
    </div>
  );
}
