"use client";

import { CopyButton as SharedCopyButton } from "@/components/ui/copy-button";

export function CopyButton({
  code,
  label = "Copy code",
  text = "Copy",
}: {
  code: string;
  label?: string;
  text?: string;
}) {
  return (
    <SharedCopyButton
      value={code}
      label={label}
      text={text}
      variant="outline"
      size="sm"
    />
  );
}
