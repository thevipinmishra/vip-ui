"use client";

import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxCardDemo() {
  return (
    <Checkbox
      variant="card"
      defaultSelected
      description="Keep 30 days of snapshots."
      className="w-full max-w-sm"
    >
      Daily backups
    </Checkbox>
  );
}
