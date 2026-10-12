"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileTrigger } from "@/components/ui/file-trigger";

const imageTypes = ["image/png", "image/jpeg"];

export function FileTriggerDemo() {
  const [files, setFiles] = useState<string[]>([]);
  const [skipped, setSkipped] = useState(0);

  return (
    <div className="grid w-full max-w-sm justify-items-start gap-3">
      <div>
        <p className="text-sm font-medium">Project images</p>
        <p className="text-xs text-muted-foreground">PNG or JPEG files.</p>
      </div>
      <FileTrigger
        acceptedFileTypes={imageTypes}
        allowsMultiple
        onSelect={(selection) => {
          if (!selection) return;
          const images = Array.from(selection).filter((file) =>
            imageTypes.includes(file.type),
          );
          setFiles(images.map((file) => file.name));
          setSkipped(selection.length - images.length);
        }}
      >
        <Button variant="outline">Add images</Button>
      </FileTrigger>
      <output className="max-w-full text-sm text-muted-foreground [overflow-wrap:anywhere]">
        {files.length ? files.join(", ") : "No images selected"}
        {skipped > 0 && (
          <span className="block">
            Skipped {skipped} {skipped === 1 ? "file" : "files"} of a different
            type.
          </span>
        )}
      </output>
    </div>
  );
}
