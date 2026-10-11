"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { TextSwap } from "@/components/ui/text-swap";

export function TextSwapButtonDemo() {
  const [isSaved, setSaved] = useState(false);

  useEffect(() => {
    if (!isSaved) return;
    const timer = window.setTimeout(() => setSaved(false), 2000);
    return () => window.clearTimeout(timer);
  }, [isSaved]);

  return (
    <Button
      variant="secondary"
      className="min-w-32"
      onPress={() => setSaved(true)}
    >
      <TextSwap value={isSaved ? "Saved" : "Save draft"} />
    </Button>
  );
}
