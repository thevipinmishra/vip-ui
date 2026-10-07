"use client";

import { Check, Copy, Warning } from "reicon-react";
import type { ButtonVariant } from "@/components/ui/button-styles";
import { CopyButton as SharedCopyButton } from "@/components/ui/copy-button";

export function CopyButton({
  code,
  label = "Copy code",
  text = "Copy",
  iconOnly = false,
  variant = "outline",
  className,
}: {
  code: string;
  label?: string;
  text?: string;
  iconOnly?: boolean;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <SharedCopyButton
      value={code}
      aria-label={label}
      variant={variant}
      size={iconOnly ? "icon" : "sm"}
      className={className}
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
