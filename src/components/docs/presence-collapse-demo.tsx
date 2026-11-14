"use client";

import { useRef, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Presence } from "@/components/ui/presence";

export function PresenceCollapseDemo() {
  const [show, setShow] = useState(true);
  const restoreRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="w-full max-w-md">
      <Presence show={show} collapse>
        <div className="pb-3">
          <Alert
            title="Billing paused"
            onDismiss={() => {
              restoreRef.current?.focus();
              setShow(false);
            }}
          >
            Add a card to restart your plan.
          </Alert>
        </div>
      </Presence>
      <div className="grid justify-items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-(--shadow-card)">
        <p className="text-sm">Team plan, 8 seats</p>
        <Button
          ref={restoreRef}
          size="sm"
          variant="secondary"
          isDisabled={show}
          onPress={() => setShow(true)}
        >
          Show notice
        </Button>
      </div>
    </div>
  );
}
