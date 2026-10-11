"use client";

import { useState } from "react";
import { InlineEdit } from "@/components/ui/inline-edit";

export function InlineEditDemo() {
  const [title, setTitle] = useState("Field notes");

  return (
    <InlineEdit
      label="Title"
      value={title}
      onSave={async (next) => {
        if (next.trim().length < 3) {
          throw new Error("Use at least 3 characters.");
        }
        setTitle(next.trim());
      }}
      className="max-w-sm"
    />
  );
}
