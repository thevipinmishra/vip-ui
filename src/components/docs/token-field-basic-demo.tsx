"use client";

import { useState } from "react";
import { TagFieldValue, TokenField } from "@/components/ui/token-field";

export function TokenFieldBasicDemo() {
  const [value, setValue] = useState(
    () => new TagFieldValue([{ type: "token", text: "Design" }]),
  );

  return (
    <TokenField
      label="Tags"
      placeholder="Add a tag"
      value={value}
      onChange={setValue}
      onSubmit={() => setValue(value.commit())}
      className="w-full max-w-sm"
    />
  );
}
