"use client";

import { InlineEdit } from "@/components/ui/inline-edit";

export function InlineEditDisabledDemo() {
  return (
    <InlineEdit
      label="Owner"
      defaultValue="Maya Chen"
      isDisabled
      className="max-w-sm"
    />
  );
}
