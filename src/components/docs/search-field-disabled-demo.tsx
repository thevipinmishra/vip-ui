"use client";

import { SearchField } from "@/components/ui/search-field";

export function SearchFieldDisabledDemo() {
  return (
    <SearchField
      label="Search archive"
      placeholder="Project name"
      isDisabled
      className="w-full max-w-xs"
    />
  );
}
