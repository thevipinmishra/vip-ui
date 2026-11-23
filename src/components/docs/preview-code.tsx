"use client";

import type { ReactNode } from "react";
import { CodeFrame } from "./code-frame";
import { CornerBrackets } from "./frame-marks";

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
      className="min-w-0 overflow-hidden rounded-2xl bg-card text-card-foreground shadow-(--shadow-card) ring-1 ring-docs-line"
    >
      <div className="preview-canvas relative flex min-h-64 items-center justify-center px-4 py-10 sm:px-10">
        <CornerBrackets />
        <div className="relative z-10 flex w-full justify-center">
          {preview}
        </div>
      </div>
      <div className="min-w-0 border-t border-docs-line">
        <CodeFrame code={code} filename={filename} embedded previewCode>
          {source}
        </CodeFrame>
      </div>
    </div>
  );
}
