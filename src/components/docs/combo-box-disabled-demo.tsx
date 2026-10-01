"use client";

import { ComboBox } from "@/components/ui/combo-box";

export function ComboBoxDisabledDemo() {
  return (
    <div className="w-full max-w-[340px]">
      <ComboBox
        label="Archived framework"
        description="This project is no longer editable."
        defaultValue="next"
        isDisabled
        options={[{ id: "next", name: "Next.js" }]}
      />
    </div>
  );
}
