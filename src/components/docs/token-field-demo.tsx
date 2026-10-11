"use client";

import { useState } from "react";
import {
  TagFieldValue,
  TokenField,
  TokenFieldDescription,
  TokenFieldInput,
  TokenFieldLabel,
} from "@/components/ui/token-field";

export function TokenFieldDemo() {
  const [value, setValue] = useState(
    () =>
      new TagFieldValue([
        { type: "token", text: "Design" },
        { type: "token", text: "Review" },
      ]),
  );
  const tags = value.segments.filter((segment) => segment.type === "token");

  return (
    <div className="grid w-full max-w-sm gap-3">
      <TokenField
        allowsNewlines
        value={value}
        onChange={setValue}
        onSubmit={() => setValue(value.commit())}
      >
        <TokenFieldLabel>Project tags</TokenFieldLabel>
        <TokenFieldInput placeholder="Add a tag" />
        <TokenFieldDescription>
          Type a tag and press comma or Enter. Select a tag to remove it.
        </TokenFieldDescription>
      </TokenField>
      <p className="text-xs text-muted-foreground" aria-live="polite">
        {tags.length} {tags.length === 1 ? "tag" : "tags"} added
      </p>
    </div>
  );
}
