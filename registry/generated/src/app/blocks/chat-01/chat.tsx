"use client";

import {
  ArrowClockwiseIcon,
  PaperclipIcon,
  ShareNetworkIcon,
  SparkleIcon,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { AgentStatus } from "../../../components/vip-ui/agent-status";
import { Attachment, AttachmentList } from "../../../components/vip-ui/attachment";
import { Badge } from "../../../components/vip-ui/badge";
import { Button } from "../../../components/vip-ui/button";
import { CopyButton } from "../../../components/vip-ui/copy-button";
import { FileTrigger } from "../../../components/vip-ui/file-trigger";
import { Message } from "../../../components/vip-ui/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextArea,
} from "../../../components/vip-ui/prompt-input";
import {
  Reasoning,
  ReasoningPanel,
  ReasoningTrigger,
} from "../../../components/vip-ui/reasoning";
import {
  Response,
  ResponseActions,
  ResponseContent,
  ResponseFooter,
  ResponseNotice,
} from "../../../components/vip-ui/response";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../../../components/vip-ui/select";
import { Skeleton } from "../../../components/vip-ui/skeleton";
import { SourceLink } from "../../../components/vip-ui/source-link";
import { showToast } from "../../../components/vip-ui/toast";
import {
  ToolCall,
  ToolCallCode,
  ToolCallPanel,
  ToolCallSection,
  ToolCallTrigger,
} from "../../../components/vip-ui/tool-call";
import {
  assistantAvatarLabel,
  type ChatTurn,
  initialTurn,
  modelOptions,
  starterPrompts,
  turnFor,
  turnText,
} from "./data";

interface FileItem {
  id: number;
  name: string;
  size: number;
  status: "uploading" | "complete";
}

const initialFiles: FileItem[] = [
  {
    id: 1,
    name: "activation-week.png",
    size: 184320,
    status: "complete",
  },
];

export function AssistantChat() {
  const [turns, setTurns] = useState<ChatTurn[]>([initialTurn]);
  const [draft, setDraft] = useState("");
  const [model, setModel] = useState("fast");
  const [files, setFiles] = useState<FileItem[]>(initialFiles);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | null>(null);
  const previousTurns = useRef(
    turns.map((turn) => `${turn.id}:${turn.status}`).join("|"),
  );
  const modelName = modelOptions.find((option) => option.id === model)?.name;

  useEffect(() => {
    const key = turns.map((turn) => `${turn.id}:${turn.status}`).join("|");
    if (key === previousTurns.current) return;
    previousTurns.current = key;
    const element = scrollRef.current;
    element?.scrollTo({ top: element.scrollHeight, behavior: "smooth" });
  }, [turns]);

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    },
    [],
  );

  function finish(id: string) {
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setTurns((current) =>
        current.map((turn) =>
          turn.id === id ? { ...turn, status: "complete" } : turn,
        ),
      );
      timer.current = null;
    }, 1700);
  }

  function send(value: string) {
    const prompt = value.trim();
    if (!prompt || turns.some((turn) => turn.status === "pending")) return;
    const id = crypto.randomUUID();
    const turn = turnFor(
      id,
      prompt,
      files.map((file) => file.name),
    );
    setTurns((current) => [...current, turn]);
    setDraft("");
    setFiles([]);
    finish(id);
  }

  function stop() {
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
    setTurns((current) =>
      current.map((turn) =>
        turn.status === "pending" ? { ...turn, status: "stopped" } : turn,
      ),
    );
  }

  function regenerate(id: string) {
    setTurns((current) =>
      current.map((turn) =>
        turn.id === id ? { ...turn, status: "pending" } : turn,
      ),
    );
    finish(id);
  }

  function addFiles(selected: File[]) {
    const added = selected.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: file.size,
      status: "uploading" as const,
    }));
    setFiles((current) => [...current, ...added]);
    for (const file of added) {
      window.setTimeout(() => {
        setFiles((current) =>
          current.map((item) =>
            item.id === file.id
              ? { ...item, status: "complete" as const }
              : item,
          ),
        );
      }, 900);
    }
  }

  async function share(turn: ChatTurn) {
    try {
      await navigator.clipboard.writeText(
        `https://app.fernway.app/answers/${turn.id}`,
      );
      showToast({ title: "Answer link copied" });
    } catch {
      showToast({
        title: "Copy failed",
        description: "Copy the answer with the Copy button.",
        variant: "error",
      });
    }
  }

  const pending = turns.some((turn) => turn.status === "pending");
  const lastTurn = turns[turns.length - 1];
  const suggestions =
    lastTurn?.status === "complete"
      ? starterPrompts.filter((prompt) => prompt !== lastTurn.prompt)
      : [];

  return (
    <div className="flex h-svh min-h-[34rem] flex-col bg-background text-foreground">
      <header className="shrink-0 border-b border-border/70">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-3 px-4 py-3 sm:px-6">
          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-card)]"
          >
            <SparkleIcon size={18} weight="fill" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-base font-semibold">Ask Fernway</h1>
              <Badge variant="outline" className="min-h-5 py-0 text-[10px]">
                Beta
              </Badge>
            </div>
            <p className="truncate text-xs text-muted-foreground">
              Answers with sources
            </p>
          </div>
        </div>
      </header>

      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
      >
        <div className="mx-auto grid w-full max-w-3xl gap-6 px-4 pt-6 pb-10 sm:px-6">
          <h2 className="sr-only">Conversation</h2>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border/70" />
            <span>Today, Oct 30</span>
            <span className="h-px flex-1 bg-border/70" />
          </div>

          {turns.map((turn) => (
            <section
              key={turn.id}
              aria-label={`Conversation about ${turn.prompt}`}
              className="grid gap-4"
            >
              <Message
                sender="You"
                side="outgoing"
                timestamp={turn.time}
                status={turn.status === "pending" ? "Sending" : "Sent"}
                actions={
                  <CopyButton
                    value={turn.prompt}
                    variant="ghost"
                    iconOnly
                    size="xs"
                    aria-label="Copy your message"
                  />
                }
              >
                {turn.prompt}
                {turn.attachments.length > 0 && (
                  <span className="mt-2 flex flex-wrap gap-1.5">
                    {turn.attachments.map((name) => (
                      <span
                        key={name}
                        className="inline-flex max-w-full items-center gap-1.5 rounded-md bg-background/60 px-2 py-1 text-xs font-medium"
                      >
                        <PaperclipIcon size={12} aria-hidden="true" />
                        <span className="truncate">{name}</span>
                      </span>
                    ))}
                  </span>
                )}
              </Message>

              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground shadow-[var(--shadow-card)]"
                >
                  <SparkleIcon size={15} weight="fill" />
                </span>
                <div className="grid min-w-0 flex-1 gap-3">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Fernway</span>
                    {turn.status === "pending"
                      ? " · Working"
                      : turn.status === "stopped"
                        ? " · Stopped"
                        : ` · Answered in ${turn.duration}s`}
                    {modelName ? ` · ${modelName}` : ""}
                  </p>

                  {turn.status === "pending" ? (
                    <>
                      <AgentStatus
                        state="working"
                        label="Checking product data"
                        detail="Reading activation events from the last 7 days"
                      />
                      <div className="grid gap-2 py-1" aria-hidden="true">
                        <Skeleton className="h-3 w-11/12" />
                        <Skeleton className="h-3 w-4/5" />
                        <Skeleton className="h-3 w-2/3" />
                      </div>
                    </>
                  ) : turn.status === "stopped" ? (
                    <Response status="stopped" className="w-full">
                      <ResponseContent>
                        Stopped before Fernway finished the answer.
                      </ResponseContent>
                      <ResponseNotice />
                      <ResponseActions>
                        <Button
                          variant="ghost"
                          size="sm"
                          onPress={() => regenerate(turn.id)}
                        >
                          <ArrowClockwiseIcon size={16} aria-hidden="true" />
                          Try again
                        </Button>
                      </ResponseActions>
                    </Response>
                  ) : (
                    <>
                      <Reasoning
                        status="complete"
                        duration={turn.duration}
                        className="w-full"
                      >
                        <ReasoningTrigger />
                        <ReasoningPanel>{turn.reasoning}</ReasoningPanel>
                      </Reasoning>

                      <ToolCall className="w-full">
                        <ToolCallTrigger
                          name={turn.tool.name}
                          status="complete"
                          summary={turn.tool.summary}
                        />
                        <ToolCallPanel>
                          <ToolCallSection label="Input">
                            <ToolCallCode>{turn.tool.input}</ToolCallCode>
                          </ToolCallSection>
                          <ToolCallSection label="Output">
                            <ToolCallCode>{turn.tool.output}</ToolCallCode>
                          </ToolCallSection>
                        </ToolCallPanel>
                      </ToolCall>

                      <Response status="complete" className="w-full">
                        <ResponseContent className="grid gap-3">
                          {turn.answer.map((block) => {
                            const key =
                              block.type === "paragraph"
                                ? block.text
                                : block.items.join("|");
                            return block.type === "paragraph" ? (
                              <p key={key}>{block.text}</p>
                            ) : (
                              <ul
                                key={key}
                                className="grid list-disc gap-1.5 ps-5 marker:text-muted-foreground"
                              >
                                {block.items.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                            );
                          })}
                        </ResponseContent>
                        <ResponseActions>
                          <CopyButton
                            value={turnText(turn)}
                            variant="ghost"
                            size="sm"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onPress={() => regenerate(turn.id)}
                          >
                            <ArrowClockwiseIcon size={16} aria-hidden="true" />
                            Regenerate
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onPress={() => void share(turn)}
                          >
                            <ShareNetworkIcon size={16} aria-hidden="true" />
                            Share
                          </Button>
                        </ResponseActions>
                        <ResponseFooter className="grid gap-2 pt-1">
                          <p className="text-xs font-medium text-muted-foreground">
                            Sources
                          </p>
                          {turn.sources.map((source, index) => (
                            <SourceLink
                              key={source.href}
                              href={source.href}
                              label={source.label}
                              source={source.source}
                              description={source.description}
                              index={index + 1}
                              className="gap-2.5 p-2.5"
                            />
                          ))}
                        </ResponseFooter>
                      </Response>
                    </>
                  )}
                </div>
              </div>
            </section>
          ))}

          {lastTurn?.status === "complete" && !pending && (
            <div className="flex flex-wrap items-center gap-2 ps-11">
              <span className="text-xs text-muted-foreground">Follow up</span>
              {suggestions.map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  onPress={() => setDraft(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="relative shrink-0 bg-background before:pointer-events-none before:absolute before:inset-x-0 before:bottom-full before:h-8 before:bg-gradient-to-t before:from-background before:to-transparent">
        <div className="mx-auto w-full max-w-3xl px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6">
          <PromptInput
            label="Message"
            value={draft}
            onChange={setDraft}
            isPending={pending}
            onSubmit={send}
            onStop={stop}
            onFilesDropped={addFiles}
          >
            {files.length > 0 && (
              <AttachmentList className="flex flex-wrap px-3 pt-3">
                {files.map((file) => (
                  <Attachment
                    key={file.id}
                    name={file.name}
                    fileSize={file.size}
                    status={file.status}
                    className="w-full gap-2.5 p-1.5 pe-1 sm:w-72 [&_[data-slot=attachment-details]]:text-[11px] [&_[data-slot=attachment-name]]:truncate [&_[data-slot=attachment-name]]:text-xs [&_[data-slot=attachment-preview]]:size-9"
                    onRemove={() =>
                      setFiles((current) =>
                        current.filter((item) => item.id !== file.id),
                      )
                    }
                  />
                ))}
              </AttachmentList>
            )}
            <PromptInputTextArea placeholder="Ask about activation, revenue, or a customer" />
            <PromptInputFooter>
              <FileTrigger
                allowsMultiple
                onSelect={(selected) => addFiles(Array.from(selected ?? []))}
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  iconOnly
                  aria-label="Attach files"
                >
                  <PaperclipIcon aria-hidden="true" />
                </Button>
              </FileTrigger>
              <Select
                aria-label="Model"
                size="sm"
                value={model}
                onValueChange={setModel}
                className="ms-auto w-auto"
              >
                <SelectTrigger className="border-transparent bg-transparent text-muted-foreground shadow-none hover:border-transparent hover:bg-muted hover:text-foreground" />
                <SelectContent placement="top end" className="w-64">
                  {modelOptions.map((option) => (
                    <SelectItem
                      key={option.id}
                      id={option.id}
                      textValue={option.name}
                    >
                      <span className="min-w-0">
                        <span className="block font-medium">{option.name}</span>
                        <span className="block text-xs text-muted-foreground group-selected/item:text-accent-foreground">
                          {option.description}
                        </span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <PromptInputSubmit />
            </PromptInputFooter>
          </PromptInput>
          <p className="mt-2 text-center text-[11px] leading-4 text-muted-foreground">
            {assistantAvatarLabel} can make mistakes. Check important numbers.
          </p>
        </div>
      </footer>
    </div>
  );
}
