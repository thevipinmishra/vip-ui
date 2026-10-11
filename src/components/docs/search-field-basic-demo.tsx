"use client";

import { SearchField } from "@/components/ui/search-field";

export function SearchFieldBasicDemo() {
  return (
    <SearchField
      label="Search projects"
      placeholder="Project name"
      className="w-full max-w-xs"
    />
  );
}
