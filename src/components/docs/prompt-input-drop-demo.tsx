"use client";

import { useState } from "react";
import { PromptInput } from "@/components/ui/prompt-input";

function format(file: File) {
  return `${file.name} · ${Math.max(1, Math.round(file.size / 1024))} KB`;
}

export function PromptInputDropDemo() {
  const [dropped, setDropped] = useState<string[]>([]);
  return (
    <div className="grid w-full max-w-md justify-items-start gap-3">
      <PromptInput
        label="Message"
        placeholder="Drop a file onto this composer"
        onFilesDropped={(files) => setDropped(files.map(format))}
      />
      <ul
        data-testid="dropped"
        className="grid gap-1 text-xs leading-5 text-muted-foreground"
      >
        {dropped.length === 0 ? (
          <li>The frame shows a dashed drop area while a file is over it.</li>
        ) : (
          dropped.map((name) => <li key={name}>{name}</li>)
        )}
      </ul>
    </div>
  );
}
