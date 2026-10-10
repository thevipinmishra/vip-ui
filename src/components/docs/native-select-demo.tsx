"use client";

import { NativeSelect } from "@/components/ui/native-select";

export function NativeSelectDemo() {
  return (
    <div className="w-full max-w-sm">
      <NativeSelect label="Billing region" name="region" defaultValue="us">
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="gb">United Kingdom</option>
      </NativeSelect>
    </div>
  );
}
