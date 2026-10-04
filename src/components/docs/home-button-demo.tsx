"use client";

import { useState } from "react";
import { Check } from "reicon-react";
import { Button } from "@/components/ui/button";

export function HomeButtonDemo() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button onPress={() => setSaved(true)}>
        {saved && <Check size={16} aria-hidden="true" />}
        <span aria-live="polite">{saved ? "Saved" : "Save changes"}</span>
      </Button>
      <Button variant="outline" onPress={() => setSaved(false)}>
        Reset
      </Button>
    </div>
  );
}
