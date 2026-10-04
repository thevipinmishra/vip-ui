"use client";

import { Check, Copy, Warning } from "reicon-react";
import { CopyButton as SharedCopyButton } from "@/components/ui/copy-button";

export function CopyButton({
  code,
  label = "Copy code",
  text = "Copy",
  iconOnly = false,
}: {
  code: string;
  label?: string;
  text?: string;
  iconOnly?: boolean;
}) {
  return (
    <SharedCopyButton
      value={code}
      aria-label={label}
      variant="outline"
      size={iconOnly ? "icon" : "default"}
    >
      {iconOnly || text === "Copy"
        ? undefined
        : (status) => (
            <>
              {status === "copied" ? (
                <Check size={16} />
              ) : status === "failed" ? (
                <Warning size={16} />
              ) : (
                <Copy size={16} />
              )}
              {status === "copied"
                ? "Copied"
                : status === "failed"
                  ? "Retry"
                  : text}
            </>
          )}
    </SharedCopyButton>
  );
}
