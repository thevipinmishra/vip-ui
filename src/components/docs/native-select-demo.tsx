"use client";

import { useState } from "react";
import { NativeSelect } from "@/components/ui/native-select";

export function NativeSelectDemo() {
  const [region, setRegion] = useState("us");

  return (
    <div className="grid w-full max-w-sm gap-3">
      <NativeSelect
        label="Billing region"
        name="region"
        value={region}
        onChange={(event) => setRegion(event.target.value)}
        description="Your device opens its usual option picker."
      >
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="gb">United Kingdom</option>
      </NativeSelect>
      <output className="text-xs text-muted-foreground">
        Selected:{" "}
        {region === "us"
          ? "United States"
          : region === "ca"
            ? "Canada"
            : "United Kingdom"}
      </output>
    </div>
  );
}
