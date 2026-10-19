"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { PromptInput } from "@/components/ui/prompt-input";
import {
  Reasoning,
  ReasoningPanel,
  ReasoningTrigger,
} from "@/components/ui/reasoning";
import {
  Response,
  ResponseActions,
  ResponseContent,
} from "@/components/ui/response";
import { SourceLink } from "@/components/ui/source-link";

type Phase = "idle" | "thinking" | "streaming" | "complete" | "error";

interface Turn {
  prompt: string;
  thought: string;
  answer: string;
  sources: Array<{ label: string; href: string }>;
  fails?: boolean;
}

const TURNS: Turn[] = [
  {
    prompt: "What changed in the rollout plan for billing exports?",
    thought: [
      "The ticket lists two changes, so I should name both and keep the answer short.",
      "The export job writes the settlement column behind the existing flag, so no backfill is required.",
      "The read path can stay on the current index while the new filter rolls out, which keeps the cutover observable from the logs.",
      "The remaining risk is the batch window on the read replica, and the maintenance page already explains it.",
    ].join(" "),
    answer: [
      "Two changes. The export job now writes the settlement column behind the existing billing flag, so no backfill is required.",
      "The read path stays on the current index while the new filter rolls out, which keeps the cutover observable from the logs.",
      "The remaining risk is the batch window on the read replica, which the maintenance page already explains.",
    ].join(" "),
    sources: [
      {
        label: "Billing exports",
        href: "https://vip-ui.vercel.app/components/response",
      },
      {
        label: "Read replicas",
        href: "https://vip-ui.vercel.app/components/source-link",
      },
    ],
  },
  {
    prompt: "Does that hold for the EU tenant?",
    thought: [
      "The EU tenant runs a separate write path, so the flag does not cover it.",
      "Its writes land in the regional queue, and the settlement column is not part of that batch.",
    ].join(" "),
    answer: [
      "Not yet. The flag covers the US queue only.",
      "The EU write path lands in the regional queue, where the settlement column is not part of the batch.",
    ].join(" "),
    sources: [
      {
        label: "Regional queues",
        href: "https://vip-ui.vercel.app/components/response",
      },
    ],
    fails: true,
  },
];

const HINTS: Record<Phase, string> = {
  idle: "The run stopped. Send the prompt again to restart it.",
  thinking:
    "Reasoning streams into the panel, which keeps the newest line in view.",
  streaming: "The answer streams with the caret. Stop ends the run.",
  complete: "Copy, regenerate, or send a follow-up prompt.",
  error: "The run failed. Send the prompt again, or edit it first.",
};

function useWordStream(text: string, run: boolean, interval: number) {
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
    }, interval);
    return () => window.clearInterval(id);
  }, [run, text, interval]);

  return text.split(" ").slice(0, count).join(" ");
}

export function PromptInputTranscriptDemo() {
  const [turn, setTurn] = useState(0);
  const [phase, setPhase] = useState<Phase>("complete");
  const [draft, setDraft] = useState("");
  const current = TURNS[turn];
  const thought = useWordStream(current.thought, phase !== "idle", 22);
  const answer = useWordStream(
    current.answer,
    phase === "streaming" || phase === "complete",
    30,
  );

  useEffect(() => {
    if (phase === "thinking" && thought.length >= current.thought.length) {
      const id = window.setTimeout(() => setPhase("streaming"), 300);
      return () => window.clearTimeout(id);
    }
    if (phase === "streaming" && answer.length >= current.answer.length) {
      const id = window.setTimeout(
        () => setPhase(current.fails ? "error" : "complete"),
        300,
      );
      return () => window.clearTimeout(id);
    }
  }, [phase, thought, answer, current]);

  const submit = (value: string) => {
    const index = TURNS.findIndex((entry) => entry.prompt === value.trim());
    if (index === -1) return;
    setTurn(index);
    setPhase("thinking");
    setDraft("");
  };

  return (
    <div data-testid="transcript-demo" className="grid w-full max-w-xl gap-3">
      <div
        key={turn}
        role="log"
        aria-label="Conversation"
        className="grid max-h-80 min-h-44 content-start gap-2 overflow-y-auto rounded-lg border border-border bg-card p-3 shadow-[var(--shadow-card)]"
      >
        <p className="ms-auto max-w-[85%] rounded-2xl rounded-se-md bg-accent px-3.5 py-2 text-sm leading-6 text-accent-foreground">
          {current.prompt}
        </p>
        <Reasoning
          status={
            phase === "error"
              ? "error"
              : phase === "thinking" || phase === "streaming"
                ? "thinking"
                : "complete"
          }
          className="w-full"
        >
          <ReasoningTrigger />
          <ReasoningPanel scrollable>{thought}</ReasoningPanel>
        </Reasoning>
        <Response
          status={
            phase === "error"
              ? "error"
              : phase === "complete"
                ? "complete"
                : "streaming"
          }
          className="w-full"
        >
          <ResponseContent>{answer}</ResponseContent>
          {phase === "complete" && (
            <>
              <ResponseActions>
                <CopyButton value={current.answer} variant="ghost" size="sm" />
                <Button type="button" variant="ghost" size="sm">
                  Regenerate
                </Button>
              </ResponseActions>
              <div className="grid gap-2">
                {current.sources.map((source, index) => (
                  <SourceLink
                    key={source.label}
                    href={source.href}
                    label={source.label}
                    source="vip/ui"
                    index={index + 1}
                  />
                ))}
              </div>
            </>
          )}
        </Response>
      </div>
      <PromptInput
        label="Message"
        value={draft}
        onChange={setDraft}
        isPending={phase === "thinking" || phase === "streaming"}
        placeholder="Ask a follow-up"
        onSubmit={submit}
        onStop={() => setPhase("idle")}
      />
      <p className="text-xs leading-5 text-muted-foreground">{HINTS[phase]}</p>
    </div>
  );
}
