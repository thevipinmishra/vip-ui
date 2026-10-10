"use client";

import { CheckIcon, CopyIcon, WarningIcon } from "@phosphor-icons/react";
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
                <CheckIcon size={16} />
              ) : status === "failed" ? (
                <WarningIcon size={16} />
              ) : (
                <CopyIcon size={16} />
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
