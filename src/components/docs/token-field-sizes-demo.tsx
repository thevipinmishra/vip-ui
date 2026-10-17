"use client";

import { useState } from "react";
import type { Size } from "@/components/ui/size";
import { TagFieldValue, TokenField } from "@/components/ui/token-field";

export function TokenFieldSizesDemo() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <ProjectTags size="sm" />
      <ProjectTags size="md" />
      <ProjectTags />
      <ProjectTags size="xl" />
    </div>
  );
}

function ProjectTags({ size }: { size?: Size }) {
  const [value, setValue] = useState(
    () =>
      new TagFieldValue([
        { type: "token", text: "Design" },
        { type: "token", text: "Research" },
      ]),
  );

  return (
    <TokenField
      size={size}
      aria-label="Tags"
      placeholder="Add a tag"
      value={value}
      onChange={setValue}
      onSubmit={() => setValue(value.commit())}
    />
  );
}
