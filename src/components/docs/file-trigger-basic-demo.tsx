"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileTrigger } from "@/components/ui/file-trigger";

export function FileTriggerBasicDemo() {
  const [filename, setFilename] = useState("No file selected");

  return (
    <div className="grid justify-items-start gap-3">
      <FileTrigger
        acceptedFileTypes={["image/png", "image/jpeg"]}
        onSelect={(files) =>
          setFilename(files?.[0]?.name ?? "No file selected")
        }
      >
        <Button variant="outline">Choose image</Button>
      </FileTrigger>
      <output className="text-sm text-muted-foreground">{filename}</output>
    </div>
  );
}
