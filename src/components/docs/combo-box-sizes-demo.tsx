"use client";

import { ComboBox } from "@/components/ui/combo-box";

const options = [
  { id: "next", name: "Next.js" },
  { id: "astro", name: "Astro" },
  { id: "remix", name: "Remix" },
];

export function ComboBoxSizesDemo() {
  return (
    <div className="grid w-full max-w-xs gap-3">
      <ComboBox
        size="xs"
        aria-label="Framework"
        placeholder="Search frameworks"
        options={options}
      />
      <ComboBox
        size="sm"
        aria-label="Framework"
        placeholder="Search frameworks"
        options={options}
      />
      <ComboBox
        size="md"
        aria-label="Framework"
        placeholder="Search frameworks"
        options={options}
      />
      <ComboBox
        aria-label="Framework"
        placeholder="Search frameworks"
        options={options}
      />
    </div>
  );
}
