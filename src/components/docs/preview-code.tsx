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
      className="min-w-0 overflow-hidden rounded-2xl bg-card text-card-foreground shadow-(--shadow-card) ring-1 ring-border/60"
    >
      <div className="preview-canvas relative flex min-h-60 items-center justify-center bg-muted/40 px-4 py-8 sm:px-8">
        <div className="relative z-10 flex w-full justify-center">
          {preview}
        </div>
      </div>
      <div className="min-w-0 border-t border-border/70">
        <CodeFrame code={code} filename={filename} embedded previewCode>
          {source}
        </CodeFrame>
      </div>
    </div>
  );
}
