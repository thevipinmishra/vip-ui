"use client";

import { CopyButton } from "@/components/ui/copy-button";

const link = "https://example.org/projects/launch/release-notes";

export function CopyButtonLinkDemo() {
  return (
    <div className="grid w-full max-w-md gap-3">
      <p className="text-sm font-medium">Release notes link</p>
      <p className="break-all rounded-md bg-muted px-3 py-2 font-mono text-xs text-muted-foreground">
        {link}
      </p>
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
  );
}
