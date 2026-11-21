"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Response,
  ResponseActions,
  ResponseContent,
  ResponseNotice,
} from "@/components/ui/response";

const content = {
  error: "The connection closed before the answer finished.",
  streaming: "Checking the rollout plan.",
  complete: "The rollout can resume once the replica catches up.",
};

export function ResponseErrorDemo() {
  const [status, setStatus] = useState<keyof typeof content>("error");

  useEffect(() => {
    if (status !== "streaming") return;
    const timeout = window.setTimeout(() => setStatus("complete"), 800);
    return () => window.clearTimeout(timeout);
  }, [status]);

  return (
    <Response status={status} className="w-full max-w-md">
      <ResponseContent>{content[status]}</ResponseContent>
      <ResponseNotice />
      <ResponseActions>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          isPending={status === "streaming"}
          onPress={() =>
            setStatus(status === "complete" ? "error" : "streaming")
          }
        >
          {status === "complete" ? "Reset" : "Retry"}
        </Button>
      </ResponseActions>
    </Response>
  );
}
