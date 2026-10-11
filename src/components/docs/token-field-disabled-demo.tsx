"use client";

import { useState } from "react";
import { TagFieldValue, TokenField } from "@/components/ui/token-field";

export function TokenFieldDisabledDemo() {
  const [value, setValue] = useState(
    () =>
      new TagFieldValue([
        { type: "token", text: "Archived" },
        { type: "token", text: "2025" },
      ]),
  );

  return (
    <TokenField
      label="Tags"
      value={value}
      onChange={setValue}
      isDisabled
      className="w-full max-w-sm"
    />
  );
}
