"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";

export function ProgressBarDemo() {
  const [value, setValue] = useState(40);

  return (
    <div className="grid w-full max-w-md gap-5">
      <ProgressBar label="Uploading assets" value={value} />
      <ProgressBar label="Preparing previews" isIndeterminate />
      <div>
        <Button
          variant="secondary"
          size="sm"
          onPress={() =>
            setValue((current) => (current >= 100 ? 0 : current + 20))
          }
        >
          {value >= 100 ? "Restart" : "Advance progress"}
        </Button>
      </div>
    </div>
  );
}
