"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { Message } from "@/components/ui/message";
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
  ResponseFooter,
  ResponseNotice,
} from "@/components/ui/response";
import { SourceLink } from "@/components/ui/source-link";

type Phase = "stopped" | "thinking" | "streaming" | "complete" | "error";

interface Turn {
  prompt: string;
  thought: string;
  answer: string;
  sources: Array<{ label: string; href: string }>;
  failAt?: number;
}

const TURNS: Turn[] = [
  {
    prompt: "How does the composer handle a long prompt?",
    thought: [
      "The question is about Prompt input, so I should check how its textarea sizes itself.",
      "PromptInputTextArea starts at minRows and adds one row for each new line of text.",
      "At maxRows it stops growing and scrolls, so the footer stays in view.",
      "The defaults are one row and eight rows, and both are props.",
    ].join(" "),
    answer: [
      "The textarea grows one row at a time until it reaches maxRows, which is 8 by default.",
      "After that it scrolls, so the footer and the Send button stay in view.",
      "Set minRows to start with a taller box.",
    ].join(" "),
    sources: [
      { label: "Prompt input", href: "/components/prompt-input" },
      { label: "Text area", href: "/components/text-area" },
    ],
  },
  {
    prompt: "Can people attach files?",
    thought: [
      "Prompt input accepts dropped files through onFilesDropped.",
      "The attach button and the file rows come from File trigger and Attachment, which install separately.",
    ].join(" "),
    answer: [
      "Yes. Set onFilesDropped to accept files dropped on the composer.",
      "Put a File trigger button in PromptInputFooter, and show each file with Attachment.",
    ].join(" "),
    sources: [
      { label: "Attachment", href: "/components/attachment" },
      { label: "File trigger", href: "/components/file-trigger" },
    ],
    failAt: 9,
  },
];

function words(text: string) {
  return text.split(" ");
}

export function PromptInputTranscriptDemo() {
  const [turn, setTurn] = useState(0);
  const [run, setRun] = useState(0);
  const [prompt, setPrompt] = useState(TURNS[0].prompt);
  const [phase, setPhase] = useState<Phase>("complete");
  const [thoughtCount, setThoughtCount] = useState(
    words(TURNS[0].thought).length,
  );
  const [answerCount, setAnswerCount] = useState(words(TURNS[0].answer).length);
  const [draft, setDraft] = useState(TURNS[1].prompt);
  const [isRetry, setIsRetry] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const current = TURNS[turn];
  const thoughtWords = words(current.thought);
  const answerWords = words(current.answer);
  const failAt = isRetry ? undefined : current.failAt;
  const answerEnd = failAt ?? answerWords.length;

  useEffect(() => {
    let id: number | undefined;
    if (phase === "thinking") {
      id =
        thoughtCount < thoughtWords.length
          ? window.setTimeout(() => setThoughtCount((count) => count + 1), 60)
          : window.setTimeout(() => setPhase("streaming"), 300);
    } else if (phase === "streaming") {
      id =
        answerCount < answerEnd
          ? window.setTimeout(() => setAnswerCount((count) => count + 1), 30)
          : window.setTimeout(() => {
              setPhase(failAt ? "error" : "complete");
              setDraft(
                (value) => value || TURNS[(turn + 1) % TURNS.length].prompt,
              );
            }, 300);
    }
    return () => window.clearTimeout(id);
  }, [
    phase,
    thoughtCount,
    answerCount,
    thoughtWords.length,
    answerEnd,
    failAt,
    turn,
  ]);

  const start = (index: number, text: string, retry = false) => {
    setTurn(index);
    setIsRetry(retry);
    setPrompt(text);
    setThoughtCount(0);
    setAnswerCount(0);
    setRun((value) => value + 1);
    setPhase("thinking");
  };

  const submit = (value: string) => {
    const text = value.trim();
    const match = TURNS.findIndex((entry) => entry.prompt === text);
    start(match === -1 ? (turn + 1) % TURNS.length : match, text);
    setDraft("");
  };

  const answer = answerWords.slice(0, answerCount).join(" ");

  useEffect(() => {
    const log = logRef.current;
    if (!log || phase !== "streaming" || !answer) return;
    log.scrollTop = log.scrollHeight;
  }, [phase, answer]);

  return (
    <div data-testid="transcript-demo" className="grid w-full max-w-xl gap-3">
      <div
        key={run}
        ref={logRef}
        role="log"
        aria-label="Conversation"
        className="grid max-h-96 min-h-44 content-start gap-3 overflow-y-auto rounded-lg border border-border bg-card p-3 shadow-[var(--shadow-card)]"
      >
        <Message sender="You" side="outgoing">
          {prompt}
        </Message>
        <Reasoning
          status={phase === "thinking" ? "thinking" : "complete"}
          autoCollapse
          className="w-full"
        >
          <ReasoningTrigger />
          <ReasoningPanel scrollable>
            {thoughtWords.slice(0, thoughtCount).join(" ")}
          </ReasoningPanel>
        </Reasoning>
        <Response
          status={
            phase === "thinking" || phase === "streaming" ? "streaming" : phase
          }
          className="w-full"
        >
          <ResponseContent>{answer}</ResponseContent>
          <ResponseNotice />
          {phase === "complete" && (
            <>
              <ResponseActions>
                <CopyButton value={current.answer} variant="ghost" size="sm" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onPress={() => start(turn, prompt, true)}
                >
                  Regenerate
                </Button>
              </ResponseActions>
              <ResponseFooter className="grid gap-2">
                {current.sources.map((source, index) => (
                  <SourceLink
                    key={source.href}
                    href={source.href}
                    label={source.label}
                    source="vip/ui docs"
                    index={index + 1}
                  />
                ))}
              </ResponseFooter>
            </>
          )}
          {phase === "error" && (
            <ResponseActions>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onPress={() => start(turn, prompt, true)}
              >
                Retry
              </Button>
            </ResponseActions>
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
        onStop={() => setPhase("stopped")}
      />
    </div>
  );
}
