"use client";

import { CopyButton } from "@/components/ui/copy-button";

export function CopyButtonDemo() {
  return (
    <div className="flex w-full max-w-sm flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card p-3">
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">Invoice number</p>
        <code className="break-all font-mono text-sm text-foreground">
          INV-2026-0472
        </code>
      </div>
      <CopyButton value="INV-2026-0472" aria-label="Copy invoice number" />
    </div>
  );
}
