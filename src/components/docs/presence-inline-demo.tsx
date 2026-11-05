"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Presence } from "@/components/ui/presence";

export function PresenceInlineDemo() {
  const [saved, setSaved] = useState(false);
  const [request, setRequest] = useState(0);

  useEffect(() => {
    if (request === 0) return;
    setSaved(true);
    const timer = window.setTimeout(() => setSaved(false), 2000);
    return () => window.clearTimeout(timer);
  }, [request]);

  return (
    <div className="flex w-full max-w-xs items-center gap-3">
      <Button
        size="sm"
        variant="secondary"
        onPress={() => setRequest((value) => value + 1)}
      >
        Save draft
      </Button>
      <p role="status" className="min-w-0 text-sm text-muted-foreground">
        <Presence as="span" show={saved}>
          Draft saved
        </Presence>
      </p>
    </div>
  );
}
