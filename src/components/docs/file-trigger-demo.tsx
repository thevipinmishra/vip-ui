"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileTrigger } from "@/components/ui/file-trigger";

export function FileTriggerDemo() {
  const [files, setFiles] = useState<string[]>([]);

  return (
    <div className="grid gap-3">
      <p className="text-sm font-medium">Project images</p>
      <p className="text-xs text-muted-foreground">PNG or JPEG files.</p>
      <FileTrigger
        acceptedFileTypes={["image/png", "image/jpeg"]}
        allowsMultiple
        onSelect={(selection) => {
          if (selection) setFiles(Array.from(selection, (file) => file.name));
        }}
      >
        <Button variant="outline">Add images</Button>
      </FileTrigger>
      <output className="text-sm text-muted-foreground">
        {files.length ? files.join(", ") : "No images selected"}
      </output>
    </div>
  );
}
