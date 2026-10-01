"use client";

import { useState } from "react";
import {
  TextArea,
  TextAreaDescription,
  TextAreaError,
  TextAreaInput,
  TextAreaLabel,
} from "@/components/ui/text-area";

export function TextAreaDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="w-full max-w-md space-y-3">
      <TextArea name="description" value={value} onChange={setValue}>
        <TextAreaLabel>Project description</TextAreaLabel>
        <TextAreaInput placeholder="What is this project for?" />
        <TextAreaDescription>
          A short summary helps your team recognize this project.
        </TextAreaDescription>
        <TextAreaError />
      </TextArea>
      <output className="block text-xs text-muted-foreground">
        {value.length} characters
      </output>
    </div>
  );
}
