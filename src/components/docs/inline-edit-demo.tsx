"use client";

import { useState } from "react";
import { InlineEdit } from "@/components/ui/inline-edit";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function InlineEditDemo() {
  const [title, setTitle] = useState("Field notes");

  return (
    <InlineEdit
      label="Title"
      value={title}
      onSave={async (next) => {
        await wait(700);
        if (next.trim().length < 3) {
          throw new Error("Enter 3 or more characters.");
        }
        setTitle(next.trim());
      }}
      className="max-w-sm"
    />
  );
}
