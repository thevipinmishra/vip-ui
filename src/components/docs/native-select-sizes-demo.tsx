"use client";

import { NativeSelect } from "@/components/ui/native-select";

export function NativeSelectSizesDemo() {
  return (
    <div className="grid w-full max-w-xs gap-5">
      <NativeSelect size="xs" label="Billing region" defaultValue="us">
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="gb">United Kingdom</option>
      </NativeSelect>
      <NativeSelect size="sm" label="Billing region" defaultValue="us">
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="gb">United Kingdom</option>
      </NativeSelect>
      <NativeSelect size="md" label="Billing region" defaultValue="us">
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="gb">United Kingdom</option>
      </NativeSelect>
      <NativeSelect label="Billing region" defaultValue="us">
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="gb">United Kingdom</option>
      </NativeSelect>
    </div>
  );
}
