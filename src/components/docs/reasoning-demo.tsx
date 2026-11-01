"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Reasoning,
  ReasoningPanel,
  ReasoningTrigger,
} from "@/components/ui/reasoning";

const THOUGHT = [
  "The user asked which rollout plan to pick, so I should compare both on setup cost, maintenance, and how they behave under load.",
  "The first plan keeps the current index and adds the filter behind a flag, which is cheap to set up and easy to reverse.",
  "The second plan rebuilds the index with the filter baked in, so it reads faster at steady state but the backfill runs for hours.",
  "The load numbers in the issue are modest, so the reversible plan wins on risk.",
  "The cleanup work sits with the flag, which the rollout ticket already covers.",
].join(" ");

function useWordStream(text: string, run: boolean) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  countRef.current = count;

  useEffect(() => {
    if (!run) return;
    setCount(0);
    countRef.current = 0;
    const words = text.split(" ");
    const id = window.setInterval(() => {
      if (countRef.current >= words.length) {
        window.clearInterval(id);
        return;
      }
      countRef.current += 1;
      setCount(countRef.current);
    }, 40);
    return () => window.clearInterval(id);
  }, [run, text]);

  return text.split(" ").slice(0, count).join(" ");
}

export function ReasoningDemo() {
  const [status, setStatus] = useState<"thinking" | "complete">("thinking");
  const thought = useWordStream(THOUGHT, status === "thinking");

  useEffect(() => {
    if (status !== "thinking") return;
    if (thought.length < THOUGHT.length) return;
    const id = window.setTimeout(() => setStatus("complete"), 300);
    return () => window.clearTimeout(id);
  }, [status, thought]);

  return (
    <div className="grid w-full max-w-lg justify-items-start gap-2">
      <Reasoning status={status} className="w-full">
        <ReasoningTrigger />
        <ReasoningPanel scrollable>{thought}</ReasoningPanel>
      </Reasoning>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onPress={() => setStatus("thinking")}
      >
        Run again
      </Button>
    </div>
  );
}
