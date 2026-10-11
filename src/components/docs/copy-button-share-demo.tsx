"use client";

import { CopyButton } from "@/components/ui/copy-button";

const link = "https://example.org/releases/v2.6";
const workspaceId = "workspace-aurora-72";

export function CopyButtonShareDemo() {
  return (
    <div className="grid w-full max-w-md gap-4">
      <div className="grid gap-2">
        <p className="break-all font-mono text-xs text-muted-foreground">
          {link}
        </p>
        <div>
          <CopyButton
            value={link}
            aria-label="Copy release link"
            variant="secondary"
            size="sm"
          >
            {(status) =>
              status === "copied"
                ? "Link copied"
                : status === "failed"
                  ? "Try again"
                  : "Copy release link"
            }
          </CopyButton>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-border/70 pt-4">
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
    </div>
  );
}
