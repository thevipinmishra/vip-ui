"use client";

import { NativeSelect } from "@/components/ui/native-select";

export function NativeSelectDisabledDemo() {
  return (
    <div className="w-full max-w-sm">
      <NativeSelect
        label="Billing currency"
        name="currency"
        defaultValue="usd"
        disabled
      >
        <option value="usd">US dollar</option>
        <option value="eur">Euro</option>
      </NativeSelect>
    </div>
  );
}
