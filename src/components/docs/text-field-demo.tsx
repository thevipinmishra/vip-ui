"use client";

import { useState } from "react";
import {
  TextField,
  TextFieldDescription,
  TextFieldError,
  TextFieldInput,
  TextFieldLabel,
} from "@/components/ui/text-field";

export function TextFieldDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="grid w-full max-w-sm gap-5 rounded-xl bg-card p-5 shadow-[var(--shadow-card)] ring-1 ring-border/70 sm:p-6">
      <TextField name="projectName" value={value} onChange={setValue}>
        <TextFieldLabel>Project name</TextFieldLabel>
        <TextFieldInput placeholder="e.g. Studio North" />
        <TextFieldDescription>
          This name appears in your project list.
        </TextFieldDescription>
        <TextFieldError />
      </TextField>
      <div className="border-t border-border pt-4">
        <p className="text-xs text-muted-foreground">Project list preview</p>
        <div className="mt-3 flex items-center justify-between gap-3 text-sm">
          <output className="min-w-0 truncate font-semibold">
            {value.trim() || "Untitled project"}
          </output>
          <span className="shrink-0 text-xs text-muted-foreground">
            Draft · Maya Chen
          </span>
        </div>
      </div>
    </div>
  );
}
