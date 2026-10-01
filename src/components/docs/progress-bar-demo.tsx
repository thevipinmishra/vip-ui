"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";

export function ProgressBarDemo() {
  const [value, setValue] = useState(40);
  return (
    <div className="grid w-full max-w-sm gap-5">
      <ProgressBar label="Upload" value={value} />
      <Button
        variant="secondary"
        onPress={() =>
          setValue((current) => (current >= 100 ? 0 : current + 20))
        }
      >
        {value >= 100 ? "Restart upload" : "Add 20%"}
      </Button>
    </div>
  );
}
