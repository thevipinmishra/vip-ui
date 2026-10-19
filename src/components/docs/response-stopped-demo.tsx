"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import {
  Response,
  ResponseActions,
  ResponseContent,
  ResponseNotice,
  type ResponseStatus,
} from "@/components/ui/response";

const TEXT =
  "I can keep going with the rollout plan, but the batch window on the read replica still needs a decision before the migration runs.";
const WORDS = TEXT.split(" ");

export function ResponseStoppedDemo() {
  const [count, setCount] = useState(11);
  const [status, setStatus] = useState<ResponseStatus>("stopped");
  const countRef = useRef(count);
  countRef.current = count;

  useEffect(() => {
    if (status !== "streaming") return;
    const id = window.setInterval(() => {
      if (countRef.current >= WORDS.length) {
        setStatus("complete");
        return;
      }
      setCount((current) => Math.min(WORDS.length, current + 1));
    }, 90);
    return () => window.clearInterval(id);
  }, [status]);

  return (
    <Response status={status} className="w-full max-w-md">
      <ResponseContent>{WORDS.slice(0, count).join(" ")}</ResponseContent>
      <ResponseNotice />
      <ResponseActions>
        {status === "streaming" ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onPress={() => setStatus("stopped")}
          >
            Stop
          </Button>
        ) : (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onPress={() => setStatus("streaming")}
          >
            Continue
          </Button>
        )}
        {status === "stopped" && (
          <CopyButton
            value={WORDS.slice(0, count).join(" ")}
            variant="ghost"
            size="sm"
          />
        )}
      </ResponseActions>
    </Response>
  );
}
