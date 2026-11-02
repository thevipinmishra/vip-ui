"use client";

import { InlineEdit } from "@/components/ui/inline-edit";

export function InlineEditEmptyDemo() {
  return (
    <InlineEdit
      label="Description"
      placeholder="Add a description"
      className="max-w-sm"
    />
  );
}
