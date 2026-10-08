"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/progress-ring";

export function ProgressRingDemo() {
  const [value, setValue] = useState(40);

  return (
    <div className="grid justify-items-center gap-5">
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
        <ProgressRing label="Uploading" value={value} size="lg" />
        <ProgressRing
          label="Connecting"
          isIndeterminate
          size="lg"
          showValue={false}
        />
      </div>
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
  );
}
