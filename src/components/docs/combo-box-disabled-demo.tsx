"use client";

import { ComboBox } from "@/components/ui/combo-box";

export function ComboBoxDisabledDemo() {
  return (
    <div className="w-full max-w-[340px]">
      <ComboBox
        label="Framework"
        defaultValue="next"
        isDisabled
        options={[
          { id: "next", name: "Next.js" },
          { id: "astro", name: "Astro" },
        ]}
      />
    </div>
  );
}
