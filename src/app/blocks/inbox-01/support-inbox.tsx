"use client";

import {
  ArrowLeftIcon,
  ArrowsClockwiseIcon,
  BellRingingIcon,
  ChatCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  EnvelopeSimpleIcon,
  HeadsetIcon,
  PaperclipIcon,
  UserPlusIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
import { Kbd } from "@/components/ui/kbd-code";
import { Link } from "@/components/ui/link";
import { ListBox, ListBoxItem } from "@/components/ui/list-box";
import {
  Popover,
  PopoverDescription,
  PopoverDialog,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SearchField } from "@/components/ui/search-field";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { TextArea, TextAreaInput } from "@/components/ui/text-area";
import { showToast } from "@/components/ui/toast";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import { Toolbar } from "@/components/ui/toolbar";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  type Conversation,
  formatListTime,
  formatMessageTime,
  formatSnoozeTime,
  initialConversations,
  snoozeOptions,
} from "./data";

type Queue = "all" | "mine" | "unassigned" | "snoozed";

const channelIcons = {
  Email: EnvelopeSimpleIcon,
  Chat: ChatCircleIcon,
  WhatsApp: WhatsappLogoIcon,
};

const priorityVariant = {
  High: "error",
  Normal: "outline",
  Low: "neutral",
} as const;

export function SupportInbox() {
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const [queue, setQueue] = useState<Queue>("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(
    initialConversations[0]?.id ?? null,
  );
  const [mobileDetail, setMobileDetail] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [snoozeOpen, setSnoozeOpen] = useState(false);
  const [reply, setReply] = useState("");
  const replyRef = useRef<HTMLTextAreaElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setInitialLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  const open = conversations.filter(
    (conversation) => conversation.status === "open",
  );
  const mine = open.filter(
    (conversation) => conversation.assignee === "Maya Chen",
  );
  const unassigned = open.filter((conversation) => !conversation.assignee);
  const snoozed = conversations.filter(
    (conversation) => conversation.status === "snoozed",
  );

  const pool =
    queue === "mine"
      ? mine
      : queue === "unassigned"
        ? unassigned
        : queue === "snoozed"
          ? snoozed
          : open;

  const visible = pool
    .filter((conversation) =>
      `${conversation.subject} ${conversation.customer} ${conversation.email} ${conversation.preview}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
    )
    .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));

  const active =
    visible.find((conversation) => conversation.id === selectedId) ??
    visible[0] ??
    null;

  const queues: { id: Queue; label: string; count: number }[] = [
    { id: "all", label: "All", count: open.length },
    { id: "mine", label: "Mine", count: mine.length },
    { id: "unassigned", label: "Unassigned", count: unassigned.length },
    { id: "snoozed", label: "Snoozed", count: snoozed.length },
  ];

  function updateConversation(id: string, patch: Partial<Conversation>) {
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === id ? { ...conversation, ...patch } : conversation,
      ),
    );
  }

  function focusListSearch() {
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    requestAnimationFrame(() =>
      searchRef.current?.querySelector("input")?.focus(),
    );
  }

  function refresh() {
    setRefreshing(true);
    showToast({
      title: "Inbox refreshed",
      description: `${open.length} open ${open.length === 1 ? "conversation" : "conversations"}.`,
    });
    window.setTimeout(() => setRefreshing(false), 750);
  }

  function resolve(conversation: Conversation) {
    const previousStatus = conversation.status;
    updateConversation(conversation.id, {
      status: "resolved",
      unread: false,
      snoozedUntil: undefined,
    });
    setMobileDetail(false);
    focusListSearch();
    showToast({
      title: "Conversation resolved",
      description: `${conversation.customer} gets a closing message.`,
      variant: "success",
      action: {
        label: "Undo",
        onAction: () => {
          updateConversation(conversation.id, {
            status: previousStatus,
            snoozedUntil: conversation.snoozedUntil,
          });
          setSelectedId(conversation.id);
          showToast({ title: "Conversation reopened" });
        },
      },
    });
  }

  function snooze(conversation: Conversation, until: string) {
    updateConversation(conversation.id, {
      status: "snoozed",
      snoozedUntil: until,
      unread: false,
    });
    setSnoozeOpen(false);
    setMobileDetail(false);
    focusListSearch();
    showToast({
      title: "Conversation snoozed",
      description: `It returns ${formatSnoozeTime(until)}.`,
      variant: "success",
      action: {
        label: "Undo",
        onAction: () => {
          updateConversation(conversation.id, {
            status: "open",
            snoozedUntil: undefined,
          });
          setSelectedId(conversation.id);
          showToast({ title: "Conversation restored" });
        },
      },
    });
  }

  function unsnooze(conversation: Conversation) {
    updateConversation(conversation.id, {
      status: "open",
      snoozedUntil: undefined,
    });
    showToast({
      title: "Conversation unsnoozed",
      description: `${conversation.customer} is back in the open queue.`,
      variant: "success",
    });
  }

  function assignToMe(conversation: Conversation) {
    if (conversation.assignee === "Maya Chen") {
      showToast({
        title: "This conversation is yours",
        description: "No change is necessary.",
      });
      return;
    }
    updateConversation(conversation.id, { assignee: "Maya Chen" });
    showToast({
      title: "Assigned to you",
      description: `${conversation.customer} sees your name in the reply.`,
      variant: "success",
    });
  }

  function sendReply() {
    if (!active) return;
    const body = reply.trim();
    if (!body) return;
    const message = {
      id: crypto.randomUUID(),
      from: "agent" as const,
      name: "Maya Chen",
      at: "2026-10-30T11:05:00Z",
      body,
    };
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === active.id
          ? {
              ...conversation,
              status: "open",
              snoozedUntil: undefined,
              unread: false,
              preview: body.split("\n")[0] ?? conversation.preview,
              updatedAt: message.at,
              messages: [...conversation.messages, message],
            }
          : conversation,
      ),
    );
    setReply("");
    replyRef.current?.focus();
    showToast({
      title: "Reply sent",
      description: `${active.customer} receives the message now.`,
      variant: "success",
    });
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (
        target?.closest("input, textarea, [contenteditable=true]") ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      )
        return;
      if (event.key.toLowerCase() === "r") {
        event.preventDefault();
        refresh();
      }
      if (event.key.toLowerCase() === "e" && active) {
        event.preventDefault();
        resolve(active);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const statusLabel = active
    ? active.status === "snoozed"
      ? "Snoozed"
      : active.status === "resolved"
        ? "Resolved"
        : "Open"
    : "";
  const statusVariant =
    active?.status === "snoozed"
      ? "warning"
      : active?.status === "resolved"
        ? "success"
        : "accent";

  return (
    <div className="min-h-svh bg-background">
      <header className="border-b border-border/70 bg-card">
        <div className="mx-auto flex h-14 max-w-360 items-center gap-2.5 px-4 sm:px-6">
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <HeadsetIcon size={17} weight="fill" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold tracking-[-0.02em]">
            Kestrel
          </span>
          <span aria-hidden="true" className="text-muted-foreground/60">
            /
          </span>
          <span className="text-sm text-muted-foreground">Support</span>
          <div className="ms-auto flex items-center gap-2">
            <span className="hidden text-xs text-muted-foreground sm:block">
              Friday, Oct 30
            </span>
            <Avatar name="Maya Chen" size="sm" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-360 px-4 py-5 sm:px-6 lg:py-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-[-0.04em]">Inbox</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Median first reply 14 min
            </p>
          </div>
          <ToggleButtonGroup
            aria-label="Conversation queue"
            size="sm"
            selectionMode="single"
            disallowEmptySelection
            selectedKeys={[queue]}
            onSelectionChange={(keys) => {
              const next = [...keys][0];
              if (
                next === "all" ||
                next === "mine" ||
                next === "unassigned" ||
                next === "snoozed"
              ) {
                setQueue(next);
                setQuery("");
                setMobileDetail(false);
              }
            }}
            className="max-md:grid max-md:w-full max-md:grid-cols-2"
          >
            {queues.map((item) => (
              <ToggleButton
                key={item.id}
                id={item.id}
                variant="segmented"
                className="max-md:flex-1"
              >
                <span>{item.label}</span>
                <span className="text-xs text-muted-foreground">
                  {item.count}
                </span>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>

        <div className="mt-5 grid overflow-hidden rounded-xl border border-border/70 bg-card shadow-(--shadow-card) md:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[380px_minmax(0,1fr)]">
          <section
            aria-label="Conversations"
            className={cn(
              "flex min-w-0 flex-col border-border/70 md:border-e",
              mobileDetail && active && "max-md:hidden",
              !active && !initialLoading && "md:col-span-2 md:border-e-0",
            )}
          >
            <div className="border-b border-border/70 p-3" ref={searchRef}>
              <SearchField
                aria-label="Search conversations"
                placeholder="Search conversations"
                size="sm"
                value={query}
                onChange={(value) => {
                  setQuery(value);
                  setMobileDetail(false);
                }}
              />
            </div>
            <div className="min-w-0 flex-1">
              {initialLoading || refreshing ? (
                <div
                  role="status"
                  aria-label="Loading conversations"
                  className="grid"
                >
                  {["a", "b", "c", "d", "e", "f"].map((key) => (
                    <div
                      key={key}
                      className="flex gap-3 border-b border-border/60 px-3 py-2.5"
                    >
                      <Skeleton className="size-8 shrink-0 rounded-full" />
                      <div className="grid flex-1 gap-2">
                        <Skeleton className="h-3 w-1/2" />
                        <Skeleton className="h-3 w-4/5" />
                        <Skeleton className="h-2.5 w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : visible.length === 0 ? (
                <EmptyState className="m-3 border-0 bg-transparent px-4 py-10">
                  <EmptyStateIcon>
                    <HeadsetIcon size={24} />
                  </EmptyStateIcon>
                  <EmptyStateTitle as="h2">
                    {query
                      ? "No conversations match"
                      : queue === "snoozed"
                        ? "No snoozed conversations"
                        : "This queue is clear"}
                  </EmptyStateTitle>
                  <EmptyStateDescription>
                    {query
                      ? `No conversation contains “${query}”.`
                      : queue === "snoozed"
                        ? "Snooze a conversation to hide it until later."
                        : "All conversations in this queue are resolved."}
                  </EmptyStateDescription>
                  <EmptyStateActions>
                    <Button
                      variant="outline"
                      size="sm"
                      onPress={() => {
                        if (query) {
                          setQuery("");
                        } else {
                          setQueue("all");
                        }
                      }}
                    >
                      {query ? "Clear search" : "View open conversations"}
                    </Button>
                  </EmptyStateActions>
                </EmptyState>
              ) : (
                <div
                  className="min-w-0"
                  onPointerDownCapture={() => setMobileDetail(true)}
                >
                  <ListBox
                    aria-label="Conversations"
                    items={visible}
                    selectionMode="single"
                    selectedKeys={active ? [active.id] : []}
                    onSelectionChange={(keys) => {
                      const next = [...keys][0];
                      if (next) {
                        setSelectedId(String(next));
                        setMobileDetail(true);
                      }
                    }}
                    onAction={(key) => {
                      setSelectedId(String(key));
                      setMobileDetail(true);
                    }}
                    className="max-h-none gap-0 rounded-none border-0 bg-transparent p-0 shadow-none"
                  >
                    {(conversation) => conversationRow(conversation)}
                  </ListBox>
                </div>
              )}
            </div>
            <div className="border-t border-border/70 px-3 py-2 text-[11px] text-muted-foreground">
              {initialLoading || refreshing
                ? "Loading conversations…"
                : `${visible.length} ${visible.length === 1 ? "conversation" : "conversations"}`}
            </div>
          </section>

          <section
            aria-label="Conversation"
            className={cn(
              "min-w-0",
              !mobileDetail && "max-md:hidden",
              !active && !initialLoading && "hidden",
            )}
          >
            {initialLoading ? (
              <div
                className="grid gap-4 p-5"
                role="status"
                aria-label="Loading conversation"
              >
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
                <div className="mt-4 grid gap-4">
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-20 w-5/6" />
                  <Skeleton className="h-24 w-full" />
                </div>
              </div>
            ) : active ? (
              <div className="flex min-h-full flex-col">
                <div className="border-b border-border/70 p-4 sm:p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-2">
                      <Button
                        variant="ghost"
                        iconOnly
                        size="sm"
                        aria-label="Back to conversations"
                        className="-ms-2 md:hidden"
                        onPress={() => setMobileDetail(false)}
                      >
                        <ArrowLeftIcon size={18} aria-hidden="true" />
                      </Button>
                      <div className="min-w-0">
                        <h2 className="text-lg font-semibold tracking-[-0.02em] [overflow-wrap:anywhere]">
                          {active.subject}
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {active.customer} · {active.company}
                        </p>
                        <Link
                          href={`mailto:${active.email}`}
                          className="mt-0.5 block text-xs"
                        >
                          {active.email}
                        </Link>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Badge variant={statusVariant} dot>
                        {statusLabel}
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        {(() => {
                          const ChannelIcon = channelIcons[active.channel];
                          return <ChannelIcon size={12} aria-hidden="true" />;
                        })()}
                        {active.channel}
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-muted-foreground">
                    <span>
                      {active.assignee
                        ? `Assigned to ${active.assignee}`
                        : "Unassigned"}
                    </span>
                    <span>Updated {formatListTime(active.updatedAt)}</span>
                    {active.status === "snoozed" && active.snoozedUntil && (
                      <span>
                        Returns {formatSnoozeTime(active.snoozedUntil)}
                      </span>
                    )}
                  </div>

                  <Toolbar
                    aria-label="Conversation actions"
                    size="sm"
                    className="mt-3 w-full"
                  >
                    <TooltipTrigger>
                      <Button
                        variant="ghost"
                        iconOnly
                        aria-label={
                          refreshing ? "Refreshing inbox" : "Refresh inbox"
                        }
                        onPress={refresh}
                      >
                        {refreshing ? (
                          <Spinner size="sm" decorative />
                        ) : (
                          <ArrowsClockwiseIcon size={17} aria-hidden="true" />
                        )}
                      </Button>
                      <Tooltip>
                        <span className="flex items-center gap-2">
                          Refresh inbox
                          <Kbd className="border-background/20 bg-background/10 text-background">
                            R
                          </Kbd>
                        </span>
                      </Tooltip>
                    </TooltipTrigger>

                    {active.status === "snoozed" ? (
                      <TooltipTrigger>
                        <Button
                          variant="ghost"
                          iconOnly
                          aria-label="Unsnooze conversation"
                          onPress={() => unsnooze(active)}
                        >
                          <BellRingingIcon size={17} aria-hidden="true" />
                        </Button>
                        <Tooltip>Unsnooze conversation</Tooltip>
                      </TooltipTrigger>
                    ) : (
                      <PopoverTrigger
                        isOpen={snoozeOpen}
                        onOpenChange={setSnoozeOpen}
                      >
                        <Button
                          variant="ghost"
                          iconOnly
                          aria-label="Snooze conversation"
                        >
                          <ClockIcon size={17} aria-hidden="true" />
                        </Button>
                        <Popover
                          placement="bottom end"
                          className="w-[min(19rem,calc(100vw-2rem))] p-3"
                        >
                          <PopoverDialog aria-label="Snooze conversation">
                            <PopoverTitle>Snooze conversation</PopoverTitle>
                            <PopoverDescription>
                              Choose when the conversation returns.
                            </PopoverDescription>
                            <div className="mt-3 grid gap-1">
                              {snoozeOptions.map((option) => (
                                <Button
                                  key={option.id}
                                  variant="ghost"
                                  size="sm"
                                  className="h-auto justify-start px-2 py-2 text-left"
                                  onPress={() => snooze(active, option.until)}
                                >
                                  <ClockIcon size={16} aria-hidden="true" />
                                  <span className="grid">
                                    <span className="font-medium">
                                      {option.label}
                                    </span>
                                    <span className="text-xs font-normal text-muted-foreground">
                                      {option.detail}
                                    </span>
                                  </span>
                                </Button>
                              ))}
                            </div>
                          </PopoverDialog>
                        </Popover>
                      </PopoverTrigger>
                    )}

                    <TooltipTrigger>
                      <Button
                        variant="ghost"
                        iconOnly
                        aria-label="Assign to me"
                        onPress={() => assignToMe(active)}
                      >
                        <UserPlusIcon size={17} aria-hidden="true" />
                      </Button>
                      <Tooltip>Assign to me</Tooltip>
                    </TooltipTrigger>

                    <TooltipTrigger>
                      <Button
                        variant="ghost"
                        iconOnly
                        aria-label="Resolve conversation"
                        onPress={() => resolve(active)}
                      >
                        <CheckCircleIcon size={17} aria-hidden="true" />
                      </Button>
                      <Tooltip>
                        <span className="flex items-center gap-2">
                          Resolve conversation
                          <Kbd className="border-background/20 bg-background/10 text-background">
                            E
                          </Kbd>
                        </span>
                      </Tooltip>
                    </TooltipTrigger>
                  </Toolbar>
                </div>

                <div className="grid gap-3.5 p-4 sm:p-5">
                  {active.messages.map((message) => (
                    <article key={message.id} className="flex gap-3">
                      <Avatar name={message.name} size="sm" />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <p className="text-sm font-semibold">
                            {message.name}
                          </p>
                          <Badge
                            variant={
                              message.from === "agent" ? "accent" : "outline"
                            }
                          >
                            {message.from === "agent" ? "Agent" : "Customer"}
                          </Badge>
                          <span className="ms-auto text-xs text-muted-foreground">
                            {formatMessageTime(message.at)}
                          </span>
                        </div>
                        <div
                          className={cn(
                            "mt-1.5 rounded-lg px-3 py-2.5 text-[13px] leading-5 [overflow-wrap:anywhere]",
                            message.from === "agent"
                              ? "bg-accent/60"
                              : "bg-muted/50",
                          )}
                        >
                          <p className="whitespace-pre-line">{message.body}</p>
                          {message.attachment && (
                            <div className="mt-2 flex items-center gap-2 rounded-md bg-card px-2.5 py-2 text-xs ring-1 ring-border/60">
                              <PaperclipIcon
                                size={14}
                                aria-hidden="true"
                                className="shrink-0 text-muted-foreground"
                              />
                              <span className="min-w-0 flex-1 truncate font-medium">
                                {message.attachment.name}
                              </span>
                              <span className="shrink-0 text-muted-foreground">
                                {message.attachment.size}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mt-auto border-t border-border/70 p-4 sm:p-5">
                  <div className="flex gap-3">
                    <Avatar
                      name="Maya Chen"
                      size="sm"
                      className="hidden sm:grid"
                    />
                    <div className="min-w-0 flex-1">
                      <TextArea
                        value={reply}
                        onChange={setReply}
                        size="sm"
                        aria-label="Reply"
                      >
                        <TextAreaInput
                          ref={replyRef}
                          rows={2}
                          className="min-h-20"
                          placeholder={`Reply to ${active.customer}`}
                          onKeyDown={(event) => {
                            if (
                              (event.metaKey || event.ctrlKey) &&
                              event.key === "Enter"
                            ) {
                              event.preventDefault();
                              sendReply();
                            }
                          }}
                        />
                      </TextArea>
                      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                        <p className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                          <Kbd>Ctrl</Kbd>
                          <Kbd>Enter</Kbd>
                          <span>to send</span>
                        </p>
                        <Button
                          size="sm"
                          isDisabled={!reply.trim()}
                          onPress={sendReply}
                        >
                          Send reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </main>
    </div>
  );
}

function conversationRow(conversation: Conversation) {
  const ChannelIcon = channelIcons[conversation.channel];
  return (
    <ListBoxItem
      id={conversation.id}
      textValue={`${conversation.customer} ${conversation.subject}`}
      className={cn(
        "min-h-0 items-start rounded-none border-b border-border/60 px-3 py-2.5 last:border-b-0 [&_[data-slot=selection-mark]]:hidden",
        conversation.unread && "bg-accent/25",
      )}
    >
      <div className="flex w-full min-w-0 gap-2.5">
        <div className="relative shrink-0">
          <Avatar name={conversation.customer} size="sm" />
          {conversation.unread && (
            <span
              aria-hidden="true"
              className="absolute -end-0.5 -top-0.5 size-2.5 rounded-full bg-primary ring-2 ring-card"
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <span className="truncate text-sm font-semibold">
              {conversation.customer}
            </span>
            <ChannelIcon
              size={12}
              aria-hidden="true"
              className="shrink-0 self-center text-muted-foreground"
            />
            <span className="sr-only">{conversation.channel}</span>
            <span className="ms-auto shrink-0 text-[11px] text-muted-foreground">
              {formatListTime(conversation.updatedAt)}
            </span>
          </div>
          <p
            className={cn(
              "mt-0.5 truncate text-sm",
              conversation.unread
                ? "font-medium text-foreground"
                : "text-muted-foreground",
            )}
          >
            {conversation.subject}
          </p>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
              {conversation.preview}
            </span>
            <Badge
              variant={priorityVariant[conversation.priority]}
              className={cn(
                "min-h-5 px-1.5 text-[10px]",
                conversation.priority === "Normal" && "hidden",
              )}
            >
              {conversation.priority}
            </Badge>
          </div>
          {conversation.status === "snoozed" && conversation.snoozedUntil && (
            <p className="mt-1 truncate text-[11px] text-muted-foreground">
              Snoozed until {formatSnoozeTime(conversation.snoozedUntil)}
            </p>
          )}
        </div>
      </div>
    </ListBoxItem>
  );
}
