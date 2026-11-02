"use client";

import { useRef, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Presence } from "@/components/ui/presence";

export function AlertDismissDemo() {
  const [show, setShow] = useState(true);
  const restoreRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="grid w-full max-w-lg justify-items-start gap-3">
      <Button
        ref={restoreRef}
        variant="outline"
        size="sm"
        onPress={() => setShow(true)}
      >
        Send invite
      </Button>
      <Presence show={show} className="w-full">
        <Alert
          variant="success"
          title="Invite sent"
          onDismiss={() => {
            restoreRef.current?.focus();
            setShow(false);
          }}
        >
          Maya gets an email with a link to join.
        </Alert>
      </Presence>
    </div>
  );
}
