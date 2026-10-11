"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Presence } from "@/components/ui/presence";

export function PresenceDemo() {
  const [show, setShow] = useState(false);

  return (
    <div className="grid min-h-44 w-full max-w-sm content-start justify-items-start gap-4">
      <Button
        size="sm"
        variant="secondary"
        aria-expanded={show}
        aria-controls="presence-note"
        onPress={() => setShow((value) => !value)}
      >
        {show ? "Hide note" : "Show note"}
      </Button>
      <Presence
        show={show}
        id="presence-note"
        className="w-full rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
      >
        <p className="text-lg font-medium tracking-tight">
          Keep the good ideas close.
        </p>
      </Presence>
    </div>
  );
}
