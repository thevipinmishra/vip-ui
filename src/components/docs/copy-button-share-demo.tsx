"use client";

import { CopyButton } from "@/components/ui/copy-button";
import { Separator } from "@/components/ui/separator";

const link = "https://example.org/projects/launch/release-notes";
const workspaceId = "workspace-aurora-72";

export function CopyButtonShareDemo() {
  return (
    <div className="grid w-full max-w-md gap-4 rounded-xl bg-card p-5 shadow-[var(--shadow-card)] ring-1 ring-border/70">
      <div className="grid gap-3">
        <div>
          <p className="text-sm font-medium">Release notes</p>
          <p className="mt-1 break-all font-mono text-xs text-muted-foreground">
            {link}
          </p>
        </div>
        <div>
          <CopyButton
            value={link}
            aria-label="Copy release notes link"
            variant="secondary"
            size="sm"
          >
            {(status) =>
              status === "copied"
                ? "Link copied"
                : status === "failed"
                  ? "Try again"
                  : "Copy release notes link"
            }
          </CopyButton>
        </div>
      </div>
      <Separator />
      <div className="flex items-center justify-between gap-3">
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
