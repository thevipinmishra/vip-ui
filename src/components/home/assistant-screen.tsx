"use client";

import {
  CheckCircleIcon,
  CloudArrowUpIcon,
  PaperPlaneRightIcon,
  RocketLaunchIcon,
  SparkleIcon,
} from "@phosphor-icons/react";
import { useInView, useReducedMotion } from "motion/react";
import { Fragment, useEffect, useRef, useState } from "react";
import type { DropItem, FileDropItem } from "react-aria-components";
import { AgentStatus } from "@/components/ui/agent-status";
import { Attachment, AttachmentList } from "@/components/ui/attachment";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropZone, DropZoneLabel } from "@/components/ui/drop-zone";
import { FileTrigger } from "@/components/ui/file-trigger";
import { Form } from "@/components/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Message } from "@/components/ui/message";
import { Select } from "@/components/ui/select";
import { SourceLink } from "@/components/ui/source-link";
import { Spinner } from "@/components/ui/spinner";
import { Stepper } from "@/components/ui/stepper";
import { TextField, TextFieldLabel } from "@/components/ui/text-field";
import { TextSwap } from "@/components/ui/text-swap";
import {
  ToolCall,
  ToolCallPanel,
  ToolCallTrigger,
} from "@/components/ui/tool-call";
import { Block, BlockBody, BlockFooter } from "./block";
import { Part } from "./part";
import { Screen, ScreenHeader } from "./screen";

const replies = [
  "Use Dialog for a task that needs a decision now. Use Sheet for a long form at the side of the page.",
  "Use Toast for a short status message. Use Alert for a message that must stay on the page.",
  "Use Select for 10 options or fewer. Use Combo box when people must search a long list.",
];

type Turn = { id: number; question: string; answer?: string };

function ChatCard() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const timer = useRef<number | undefined>(undefined);
  const log = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const working = turns.length > 0 && turns[turns.length - 1].answer == null;

  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    if (turns.length === 0) return;
    log.current?.scrollTo({
      top: log.current.scrollHeight,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [turns, reduceMotion]);

  function send() {
    const question = draft.trim();
    if (!question || working) return;
    const id = turns.length;
    setTurns((current) => [...current, { id, question }]);
    setDraft("");
    timer.current = window.setTimeout(() => {
      setTurns((current) =>
        current.map((turn) =>
          turn.id === id
            ? { ...turn, answer: replies[id % replies.length] }
            : turn,
        ),
      );
    }, 1600);
  }

  const assistant = (
    <Avatar name="Assistant" initials="AI" className="size-8" />
  );

  return (
    <div className="min-w-0 lg:relative">
      <Block
        title="Chat"
        className="lg:absolute lg:inset-0"
        action={
          <Badge variant="accent">
            <SparkleIcon size={13} weight="fill" aria-hidden="true" />
            Beta
          </Badge>
        }
      >
        <div
          ref={log}
          role="log"
          aria-label="Conversation"
          // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard users must be able to scroll the conversation.
          tabIndex={0}
          className="max-h-[28rem] min-h-0 flex-1 overflow-y-auto outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring lg:max-h-none"
        >
          <BlockBody className="gap-3">
            <Part slug="message">
              <Message side="outgoing" sender="You">
                Which component do I use for a settings form?
              </Message>
            </Part>
            <Part slug="tool-call">
              <ToolCall>
                <ToolCallTrigger
                  name="search_docs"
                  status="complete"
                  summary="Read 3 component pages"
                />
                <ToolCallPanel>
                  <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
                    <dt className="text-muted-foreground">Query</dt>
                    <dd className="font-mono">settings form</dd>
                    <dt className="text-muted-foreground">Pages</dt>
                    <dd className="font-mono">switch, checkbox, fieldset</dd>
                  </dl>
                </ToolCallPanel>
              </ToolCall>
            </Part>
            <Message side="incoming" sender="Assistant" avatar={assistant}>
              Use Switch for a setting that applies at once. Use Checkbox when
              people must push Save. Put related controls in a Fieldset.
            </Message>
            <Part slug="source-link">
              <div className="grid gap-2 sm:grid-cols-2">
                <SourceLink
                  href="/components/switch"
                  index={1}
                  label="Switch"
                  source="vip/ui docs"
                  className="p-3"
                />
                <SourceLink
                  href="/components/fieldset"
                  index={2}
                  label="Fieldset"
                  source="vip/ui docs"
                  className="p-3"
                />
              </div>
            </Part>
            {turns.map((turn) => (
              <Fragment key={turn.id}>
                <Message side="outgoing" sender="You">
                  {turn.question}
                </Message>
                {turn.answer ? (
                  <Message
                    side="incoming"
                    sender="Assistant"
                    avatar={assistant}
                  >
                    {turn.answer}
                  </Message>
                ) : (
                  <Part slug="agent-status">
                    <AgentStatus
                      state="working"
                      label="Reading the docs"
                      detail="Searching 96 component pages"
                    />
                  </Part>
                )}
              </Fragment>
            ))}
          </BlockBody>
        </div>
        <BlockFooter className="border-t border-border/70 pt-4">
          <Form
            className="w-full"
            onSubmit={(event) => {
              event.preventDefault();
              send();
            }}
          >
            <Part slug="input-group">
              <TextField
                name="prompt"
                value={draft}
                onChange={setDraft}
                className="w-full"
              >
                <TextFieldLabel className="sr-only">
                  Ask the assistant
                </TextFieldLabel>
                <InputGroup>
                  <InputGroupInput placeholder="Ask about a component" />
                  <InputGroupAddon>
                    <Button
                      type="submit"
                      size="icon"
                      className="size-9"
                      aria-label="Send"
                      isDisabled={!draft.trim() || working}
                    >
                      <PaperPlaneRightIcon size={16} aria-hidden="true" />
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </TextField>
            </Part>
          </Form>
        </BlockFooter>
      </Block>
    </div>
  );
}

const stages = [{ label: "Build" }, { label: "Check" }, { label: "Release" }];
const stageText = [
  "Building the app",
  "Running 214 checks",
  "Releasing to 3 regions",
  "Live on acme.app",
];

function DeployCard() {
  const [stage, setStage] = useState(stages.length);
  const running = stage < stages.length;

  useEffect(() => {
    if (stage >= stages.length) return;
    const timer = window.setTimeout(() => setStage(stage + 1), 1500);
    return () => window.clearTimeout(timer);
  }, [stage]);

  return (
    <Block
      title="Production"
      action={
        <Badge variant={running ? "accent" : "success"} dot>
          {running ? "Deploying" : "Live"}
        </Badge>
      }
    >
      <BlockBody className="gap-3">
        <Part slug="stepper">
          <Stepper
            steps={stages}
            currentStep={stage}
            aria-label="Deploy progress"
            className="py-1 [&_[data-slot=stepper-step]]:min-w-0"
          />
        </Part>
        <div className="flex min-h-11 items-center gap-2.5 rounded-lg bg-muted/60 px-3 text-sm">
          {running ? (
            <Spinner size="sm" decorative className="text-primary" />
          ) : (
            <CheckCircleIcon
              size={16}
              aria-hidden="true"
              className="shrink-0 text-success"
            />
          )}
          <TextSwap
            value={stageText[stage]}
            aria-live="polite"
            className="min-w-0"
          />
        </div>
      </BlockBody>
      <BlockFooter className="justify-between border-t border-border/70 pt-4">
        <span className="font-mono text-xs text-muted-foreground">
          main · 8c4e21a
        </span>
        <Button size="sm" isDisabled={running} onPress={() => setStage(0)}>
          <RocketLaunchIcon size={16} aria-hidden="true" />
          Deploy
        </Button>
      </BlockFooter>
    </Block>
  );
}

type Upload = {
  id: string;
  name: string;
  size: number;
  status: "uploading" | "uploaded" | "error";
  progress: number;
  error?: string;
  canRetry?: boolean;
};

const acceptedTypes = ["image/png", "image/jpeg", "application/pdf"];
const maxSize = 10 * 1024 * 1024;

const initialUploads: Upload[] = [
  {
    id: "guide",
    name: "brand-guide.pdf",
    size: 2_516_582,
    status: "uploaded",
    progress: 100,
  },
  {
    id: "hero",
    name: "hero-image.png",
    size: 1_887_437,
    status: "uploading",
    progress: 24,
  },
  {
    id: "deck",
    name: "launch-deck.pdf",
    size: 6_920_601,
    status: "error",
    progress: 0,
    error: "Upload stopped.",
    canRetry: true,
  },
];

function UploadCard() {
  const [uploads, setUploads] = useState(initialUploads);
  const body = useRef<HTMLDivElement>(null);
  const picker = useRef<HTMLButtonElement>(null);
  const inView = useInView(body, { amount: 0.4 });
  const uploading = uploads.some((upload) => upload.status === "uploading");

  useEffect(() => {
    if (!uploading || !inView) return;
    const interval = window.setInterval(() => {
      setUploads((current) =>
        current.map((upload) => {
          if (upload.status !== "uploading") return upload;
          const progress = Math.min(100, upload.progress + 7);
          return {
            ...upload,
            progress,
            status: progress === 100 ? "uploaded" : "uploading",
          };
        }),
      );
    }, 240);
    return () => window.clearInterval(interval);
  }, [uploading, inView]);

  function add(files: File[]) {
    setUploads((current) => [
      ...current,
      ...files.map((file): Upload => {
        const valid = acceptedTypes.includes(file.type);
        const small = file.size <= maxSize;
        return {
          id: crypto.randomUUID(),
          name: file.name,
          size: file.size,
          status: valid && small ? "uploading" : "error",
          progress: 0,
          error: !valid
            ? "Use a PNG, JPEG, or PDF file."
            : !small
              ? "The file is larger than 10 MB."
              : undefined,
        };
      }),
    ]);
  }

  return (
    <Block title="Files" description="PNG, JPEG, or PDF. 10 MB or less.">
      <BlockBody ref={body} className="gap-3">
        <Part slug="drop-zone">
          <DropZone
            className="min-h-24 flex-row gap-3 p-4"
            getDropOperation={(types) =>
              acceptedTypes.some((type) => types.has(type)) ? "copy" : "cancel"
            }
            onDrop={async ({ items }) => {
              add(
                await Promise.all(
                  items
                    .filter(
                      (item: DropItem): item is FileDropItem =>
                        item.kind === "file",
                    )
                    .map((item) => item.getFile()),
                ),
              );
            }}
          >
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground"
            >
              <CloudArrowUpIcon size={17} />
            </span>
            <DropZoneLabel>Drop files here</DropZoneLabel>
            <FileTrigger
              acceptedFileTypes={acceptedTypes}
              allowsMultiple
              onSelect={(files) => {
                if (files) add(Array.from(files));
              }}
            >
              <Button ref={picker} variant="outline" size="sm">
                Browse
              </Button>
            </FileTrigger>
          </DropZone>
        </Part>
        <Part slug="attachment">
          <AttachmentList aria-label="Uploads">
            {uploads.map((upload) => (
              <Attachment
                key={upload.id}
                name={upload.name}
                size={upload.size}
                status={upload.status}
                progress={upload.progress}
                errorMessage={upload.error}
                onRetry={
                  upload.canRetry
                    ? () =>
                        setUploads((current) =>
                          current.map((item) =>
                            item.id === upload.id
                              ? {
                                  ...item,
                                  status: "uploading",
                                  progress: 0,
                                  error: undefined,
                                  canRetry: false,
                                }
                              : item,
                          ),
                        )
                    : undefined
                }
                onRemove={() => {
                  picker.current?.focus();
                  setUploads((current) =>
                    current.filter((item) => item.id !== upload.id),
                  );
                }}
              />
            ))}
          </AttachmentList>
        </Part>
      </BlockBody>
    </Block>
  );
}

const models = [
  { id: "fast", name: "Fast" },
  { id: "balanced", name: "Balanced" },
  { id: "deep", name: "Deep" },
];

export function AssistantScreen() {
  return (
    <Screen>
      <ScreenHeader
        title="Assistant"
        detail="Release 2.4"
        actions={
          <Part slug="select" className="w-36">
            <Select
              aria-label="Model"
              defaultValue="balanced"
              options={models}
            />
          </Part>
        }
      />
      <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]">
        <ChatCard />
        <div className="grid min-w-0 content-start gap-4">
          <DeployCard />
          <UploadCard />
        </div>
      </div>
    </Screen>
  );
}
