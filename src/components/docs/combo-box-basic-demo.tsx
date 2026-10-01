"use client";

import { ComboBox } from "@/components/ui/combo-box";

export function ComboBoxBasicDemo() {
  return (
    <div className="w-full max-w-[340px]">
      <ComboBox
        label="Framework"
        placeholder="Search frameworks"
        options={[
          { id: "next", name: "Next.js" },
          { id: "astro", name: "Astro" },
          { id: "remix", name: "Remix" },
        ]}
      />
    </div>
  );
}
