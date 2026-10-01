"use client";

import { Select } from "@/components/ui/select";

export function SelectDemo() {
  return (
    <div className="w-full max-w-[340px]">
      <Select
        label="Workspace"
        placeholder="Choose a workspace"
        options={[
          { id: "personal", name: "Personal" },
          { id: "team", name: "Team" },
        ]}
      />
    </div>
  );
}
