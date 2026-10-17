"use client";

import { Select } from "@/components/ui/select";

const options = [
  { id: "newest", name: "Newest first" },
  { id: "oldest", name: "Oldest first" },
  { id: "name", name: "Name" },
];

export function SelectSizesDemo() {
  return (
    <div className="grid w-full max-w-60 gap-3">
      <Select
        size="xs"
        aria-label="Sort"
        defaultValue="newest"
        options={options}
      />
      <Select
        size="sm"
        aria-label="Sort"
        defaultValue="newest"
        options={options}
      />
      <Select
        size="md"
        aria-label="Sort"
        defaultValue="newest"
        options={options}
      />
      <Select aria-label="Sort" defaultValue="newest" options={options} />
    </div>
  );
}
