"use client";

import { CopyButton } from "@/components/ui/copy-button";

const workspaceId = "workspace-aurora-72";

export function CopyButtonIconDemo() {
  return (
    <div className="flex w-full max-w-sm items-center justify-between gap-3 rounded-lg border border-border bg-card p-3">
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">Workspace ID</p>
        <code className="break-all font-mono text-sm text-foreground">
          {workspaceId}
        </code>
      </div>
      <CopyButton
        value={workspaceId}
        aria-label="Copy workspace ID"
        variant="secondary"
        size="icon"
      />
    </div>
  );
}
