"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Presence } from "@/components/ui/presence";

export function PresenceDemo() {
  const [show, setShow] = useState(true);

  return (
    <div className="grid min-h-28 w-full max-w-sm content-start justify-items-start gap-3">
      <Button
        size="sm"
        variant="secondary"
        aria-expanded={show}
        aria-controls={show ? "presence-preview-note" : undefined}
        onPress={() => setShow((value) => !value)}
      >
        {show ? "Hide release note" : "Show release note"}
      </Button>
      <Presence
        show={show}
        id="presence-preview-note"
        className="w-full rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)]"
      >
        <p className="text-sm font-medium">
          Autosave now runs every 30 seconds.
        </p>
      </Presence>
    </div>
  );
}
