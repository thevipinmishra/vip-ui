"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Presence } from "@/components/ui/presence";

export function PresenceFocusDemo() {
  const [show, setShow] = useState(true);
  const trigger = useRef<HTMLButtonElement>(null);

  const close = () => {
    trigger.current?.focus();
    setShow(false);
  };

  return (
    <div className="grid w-full max-w-sm justify-items-start gap-3">
      <Button
        ref={trigger}
        size="sm"
        variant="secondary"
        aria-expanded={show}
        aria-controls={show ? "presence-focus-note" : undefined}
        onPress={() => setShow((value) => !value)}
      >
        What&apos;s new
      </Button>
      <Presence
        show={show}
        id="presence-focus-note"
        className="w-full rounded-xl border border-border bg-card p-4 shadow-(--shadow-card)"
      >
        <p className="text-sm font-medium">
          Drag files into the editor to attach them.
        </p>
        <Button className="mt-3" size="sm" variant="ghost" onPress={close}>
          Close
        </Button>
      </Presence>
    </div>
  );
}
