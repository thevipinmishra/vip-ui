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
    <div className="w-full max-w-sm space-y-5 rounded-xl bg-card p-5 shadow-[var(--shadow-card)] ring-1 ring-border/70 sm:p-6">
      <div>
        <p className="text-sm font-semibold">Workspace details</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Give your project a name you will recognize.
        </p>
      </div>
      <TextField name="projectName" value={value} onChange={setValue}>
        <TextFieldLabel>Project name</TextFieldLabel>
        <TextFieldInput placeholder="e.g. Studio North" />
        <TextFieldDescription>You can change this later.</TextFieldDescription>
        <TextFieldError />
      </TextField>
      <output className="block text-xs text-muted-foreground">
        {value ? `Preview: ${value}` : "Your project name will appear here."}
      </output>
    </div>
  );
}
