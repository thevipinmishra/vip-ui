"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Presence } from "@/components/ui/presence";

export function PresenceInlineDemo() {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) return;
    const timer = window.setTimeout(() => setSaved(false), 2000);
    return () => window.clearTimeout(timer);
  }, [saved]);

  return (
    <div className="flex w-full max-w-xs items-center gap-3">
      <Button size="sm" variant="secondary" onPress={() => setSaved(true)}>
        Save draft
      </Button>
      <output className="text-sm text-muted-foreground">
        <Presence as="span" show={saved}>
          Draft saved
        </Presence>
      </output>
    </div>
  );
}
