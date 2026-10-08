"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Refresh } from "reicon-react";
import { AgentStatus } from "../../../components/vip-ui/agent-status";
import { Button } from "../../../components/vip-ui/button";
import { ButtonLink } from "../../../components/vip-ui/button-link";
import { Message } from "../../../components/vip-ui/message";
import { Presence } from "../../../components/vip-ui/presence";
import { SourceLink } from "../../../components/vip-ui/source-link";
import {
  ToolCall,
  ToolCallPanel,
  ToolCallTrigger,
} from "../../../components/vip-ui/tool-call";

type Stage = "searching" | "reading" | "ready";

export function AgentWorkspace() {
  const [stage, setStage] = useState<Stage>("ready");

  useEffect(() => {
    if (stage === "ready") return;
    const timer = window.setTimeout(
      () => setStage(stage === "searching" ? "reading" : "ready"),
      1600,
    );
    return () => window.clearTimeout(timer);
  }, [stage]);

  return (
    <div className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-8 sm:py-12">
      <main className="mx-auto max-w-3xl">
        <div className="mb-10">
          <ButtonLink as={Link} href="/examples" variant="ghost" size="sm">
            <ArrowLeft size={16} aria-hidden="true" /> Examples
          </ButtonLink>
        </div>
        <h1 className="text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
          Agent response
        </h1>
        <div className="mt-8 grid gap-5">
          <Message sender="You" side="outgoing">
            How can I keep tool details available while an agent writes an
            answer?
          </Message>
          <section
            aria-label="Assistant response"
            className="min-w-0 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)] sm:p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-4">
              <h2 className="text-sm font-semibold">Assistant</h2>
              <Button
                size="sm"
                variant="outline"
                isDisabled={stage !== "ready"}
                onPress={() => setStage("searching")}
              >
                <Refresh size={15} aria-hidden="true" /> Replay run
              </Button>
            </div>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">
              Scripted preview. Replay changes local state; no AI service or web
              search is involved.
            </p>
            <div className="mt-5 grid gap-4">
              <AgentStatus
                state={stage === "ready" ? "complete" : "working"}
                label={
                  stage === "searching"
                    ? "Searching the docs"
                    : stage === "reading"
                      ? "Reading the results"
                      : "Answer ready"
                }
                detail={
                  stage === "ready"
                    ? "Tool details and sources remain available below"
                    : "The current step is shown in the tool list"
                }
              />
              <div className="grid gap-2">
                <ToolCall>
                  <ToolCallTrigger
                    name="search_docs"
                    status={stage === "searching" ? "running" : "complete"}
                    summary="Find disclosure guidance"
                  />
                  <ToolCallPanel>
                    {stage === "searching"
                      ? "Input: disclosure expansion. Waiting for results."
                      : "Input: disclosure expansion. Result: React Aria describes controlled and default expanded state."}
                  </ToolCallPanel>
                </ToolCall>
                <Presence show={stage !== "searching"}>
                  <ToolCall>
                    <ToolCallTrigger
                      name="read_guide"
                      status={stage === "reading" ? "running" : "complete"}
                      summary="Check reduced motion guidance"
                    />
                    <ToolCallPanel>
                      {stage === "reading"
                        ? "Input: Motion accessibility guide. Reading the page."
                        : "Result: Motion recommends keeping useful state changes while reducing movement for people who prefer less motion."}
                    </ToolCallPanel>
                  </ToolCall>
                </Presence>
              </div>
              <Presence show={stage === "ready"}>
                <div className="border-t border-border/70 pt-5">
                  <p className="text-sm leading-7">
                    Show the current step in text, and put each tool call behind
                    a disclosure. People can open the input and result without
                    losing their place in the answer. Keep a visible status cue
                    when motion is reduced, and link the sources beside the
                    answer rather than hiding them in a tooltip.
                  </p>
                  <h3 className="mt-6 text-sm font-semibold">Sources</h3>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <SourceLink
                      href="https://react-aria.adobe.com/Disclosure"
                      index={1}
                      label="Disclosure"
                      source="React Aria documentation"
                      description="Expansion state and accessible content"
                    />
                    <SourceLink
                      href="https://motion.dev/docs/react-accessibility"
                      index={2}
                      label="Accessible animations"
                      source="Motion documentation"
                      description="Reduced-motion preferences"
                    />
                  </div>
                </div>
              </Presence>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
