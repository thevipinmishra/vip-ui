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
  "The migration touches three parts of the system. The schema change is additive, so old clients keep working, and the read path can stay on the current index while the new filter rolls out.";
const WORDS = TEXT.split(" ");

export function ResponseDemo() {
  const [count, setCount] = useState(WORDS.length);
  const [status, setStatus] = useState<ResponseStatus>("complete");
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

  const start = () => {
    setCount(0);
    setStatus("streaming");
  };

  return (
    <Response status={status} className="w-full max-w-md">
      <ResponseContent>{WORDS.slice(0, count).join(" ")}</ResponseContent>
      <ResponseNotice />
      <ResponseActions>
        {status === "streaming" && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onPress={() => setStatus("stopped")}
          >
            Stop
          </Button>
        )}
        {status !== "streaming" && (
          <CopyButton value={TEXT} variant="ghost" size="sm" />
        )}
        {status === "complete" && (
          <Button type="button" variant="ghost" size="sm" onPress={start}>
            Stream again
          </Button>
        )}
        {status === "stopped" && (
          <Button type="button" variant="ghost" size="sm" onPress={start}>
            Continue
          </Button>
        )}
      </ResponseActions>
    </Response>
  );
}
