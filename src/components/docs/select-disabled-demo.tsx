"use client";

import { Select } from "@/components/ui/select";

export function SelectDisabledDemo() {
  return (
    <div className="w-full max-w-[340px]">
      <Select
        label="Archived workspace"
        description="This workspace is no longer available."
        isDisabled
        defaultValue="archive"
        options={[{ id: "archive", name: "Archive" }]}
      />
    </div>
  );
}
