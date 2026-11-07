"use client";

import { CalendarDate, parseDate } from "@internationalized/date";
import {
  ArrowBendUpLeftIcon,
  ArrowsClockwiseIcon,
  BellIcon,
  CalendarBlankIcon,
  CaretDownIcon,
  ChatCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  CopySimpleIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyboardIcon,
  TagIcon,
  UserCircleIcon,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import type { Key } from "react-aria-components";
import { Avatar } from "../../vip-ui/avatar";
import { Badge } from "../../vip-ui/badge";
import { Button } from "../../vip-ui/button";
import { ButtonGroup } from "../../vip-ui/button-group";
import { Card, CardContent } from "../../vip-ui/card";
import { ComboBox } from "../../vip-ui/combo-box";
import { DatePicker } from "../../vip-ui/date-picker";
import {
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../vip-ui/dialog";
import { InlineEdit } from "../../vip-ui/inline-edit";
import { Kbd } from "../../vip-ui/kbd-code";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuTrigger,
} from "../../vip-ui/menu";
import { PresenceList } from "../../vip-ui/presence-list";
import { Select } from "../../vip-ui/select";
import { TextArea, TextAreaInput } from "../../vip-ui/text-area";
import {
  Timeline,
  TimelineDescription,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "../../vip-ui/timeline";
import { showToast } from "../../vip-ui/toast";
import {
  TagFieldValue,
  TokenField,
  TokenFieldDescription,
  TokenFieldInput,
  TokenFieldLabel,
} from "../../vip-ui/token-field";
import { Tooltip, TooltipTrigger } from "../../vip-ui/tooltip";
import {
  type ActivityEvent,
  formatActivityTime,
  formatFullDate,
  formatShortDate,
  initialActivity,
  issue,
  type Person,
  people,
  personById,
  type StatusId,
  statusBadge,
  statusOptions,
  viewerSeed,
} from "./data";

const eventIcons = {
  comment: ChatCircleIcon,
  status: ArrowsClockwiseIcon,
  label: TagIcon,
  assign: UserCircleIcon,
  test: CheckCircleIcon,
  due: CalendarBlankIcon,
};

const personOptions = people.map((person) => ({
  id: person.id,
  name: person.name,
  description: `${person.role} · ${person.email}`,
}));

const duePresets = [
  { label: "Tomorrow", value: new CalendarDate(2026, 11, 4) },
  { label: "Next week", value: new CalendarDate(2026, 11, 10) },
  { label: "End of month", value: new CalendarDate(2026, 11, 30) },
];

export function IssueDetail() {
  const [title, setTitle] = useState(issue.title);
  const [status, setStatus] = useState<StatusId>(issue.status);
  const [assignee, setAssignee] = useState(issue.assignee);
  const [due, setDue] = useState<CalendarDate | null>(
    parseDate(issue.due) as CalendarDate,
  );
  const [labels, setLabels] = useState(
    () =>
      new TagFieldValue(
        issue.labels.map((label) => ({ type: "token" as const, text: label })),
      ),
  );
  const [activity, setActivity] = useState<ActivityEvent[]>(initialActivity);
  const [comment, setComment] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [viewers, setViewers] = useState<Person[]>(() =>
    viewerSeed
      .map((id) => people.find((person) => person.id === id))
      .filter((person): person is Person => Boolean(person)),
  );
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const statusName =
    statusOptions.find((option) => option.id === status)?.name ?? "Backlog";
  const watching = viewers.some((person) => person.id === "maya");

  function pushEvent(
    type: ActivityEvent["type"],
    titleText: string,
    body?: string,
  ) {
    setActivity((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        type,
        actor: people[0],
        title: titleText,
        body,
        at: new Date().toISOString(),
        atLabel: "Just now",
      },
    ]);
  }

  function changeStatus(next: StatusId) {
    setStatus(next);
    const nextName =
      statusOptions.find((option) => option.id === next)?.name ?? next;
    pushEvent("status", `Maya Chen moved this issue to ${nextName}.`);
    showToast({
      title: `Status set to ${nextName}`,
      description: "The issue is updated for the whole team.",
      variant: "success",
    });
  }

  function changeAssignee(next: string) {
    const person = personById(next);
    setAssignee(next);
    pushEvent("assign", `Maya Chen assigned this issue to ${person.name}.`);
    showToast({
      title: `Assigned to ${person.name}`,
      description: `${person.role}.`,
      variant: "success",
    });
  }

  function changeDue(next: CalendarDate | null) {
    setDue(next);
    if (!next) {
      pushEvent("due", "Maya Chen removed the due date.");
      showToast({ title: "Due date removed", variant: "success" });
      return;
    }
    const iso = `${next.toString()}T00:00:00Z`;
    pushEvent("due", `Maya Chen set the due date to ${formatFullDate(iso)}.`);
    showToast({
      title: `Due date set to ${formatShortDate(iso)}`,
      variant: "success",
    });
  }

  function submitComment(mode: "comment" | "close" | "review") {
    const body = comment.trim();
    if (!body) return;
    const nextStatus: StatusId | null =
      mode === "close" ? "done" : mode === "review" ? "in-review" : null;
    const newEvents: ActivityEvent[] = [
      {
        id: crypto.randomUUID(),
        type: "comment",
        actor: people[0],
        title: "Maya Chen",
        body,
        at: new Date().toISOString(),
        atLabel: "Just now",
      },
    ];
    if (nextStatus) {
      const nextName =
        statusOptions.find((option) => option.id === nextStatus)?.name ??
        nextStatus;
      newEvents.push({
        id: crypto.randomUUID(),
        type: "status",
        actor: people[0],
        title: `Maya Chen moved this issue to ${nextName}.`,
        at: new Date().toISOString(),
        atLabel: "Just now",
      });
      setStatus(nextStatus);
    }
    setActivity((current) => [...current, ...newEvents]);
    setComment("");
    commentRef.current?.focus();
    showToast({
      title:
        mode === "close"
          ? "Comment added. Issue closed."
          : mode === "review"
            ? "Comment added. Issue in review."
            : "Comment added",
      description: "The team can read your comment now.",
      variant: "success",
    });
  }

  function toggleWatch() {
    if (watching) {
      setViewers((current) => current.filter((person) => person.id !== "maya"));
      showToast({
        title: "You stopped watching",
        description: "You can watch the issue again at any time.",
      });
    } else {
      setViewers((current) => [
        people[0],
        ...current.filter((person) => person.id !== "maya"),
      ]);
      showToast({
        title: "You watch this issue",
        description: "Kestrel sends a message when the issue changes.",
        variant: "success",
      });
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText("https://kestrel.app/issues/KES-482");
      showToast({
        title: "Link copied",
        description: "The issue link is in your clipboard.",
        variant: "success",
      });
    } catch {
      showToast({
        title: "Could not copy the link",
        description: "Allow clipboard access and try again.",
        variant: "error",
      });
    }
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing = Boolean(
        target?.closest("input, textarea, [contenteditable=true]"),
      );
      if (
        (event.metaKey || event.ctrlKey) &&
        event.shiftKey &&
        event.key.toLowerCase() === "c"
      ) {
        event.preventDefault();
        void navigator.clipboard
          .writeText("https://kestrel.app/issues/KES-482")
          .then(() =>
            showToast({
              title: "Link copied",
              description: "The issue link is in your clipboard.",
              variant: "success",
            }),
          )
          .catch(() =>
            showToast({
              title: "Could not copy the link",
              description: "Allow clipboard access and try again.",
              variant: "error",
            }),
          );
        return;
      }
      if (typing || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === "?") {
        event.preventDefault();
        setShortcutsOpen(true);
      }
      if (event.key.toLowerCase() === "c") {
        event.preventDefault();
        commentRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="min-h-svh bg-background">
      <header className="border-b border-border/70 bg-card">
        <div className="mx-auto flex h-14 max-w-[1280px] items-center gap-2.5 px-4 sm:px-6">
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <ChatCircleIcon size={17} weight="fill" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold tracking-[-0.02em]">
            Kestrel
          </span>
          <span aria-hidden="true" className="text-muted-foreground/60">
            /
          </span>
          <span className="text-sm text-muted-foreground">Issues</span>
          <div className="ms-auto flex items-center gap-2">
            <span className="hidden text-xs text-muted-foreground sm:block">
              Kestrel Desk
            </span>
            <Avatar name="Maya Chen" size="sm" />
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1280px] gap-5 px-4 py-6 sm:px-6 md:grid-cols-[minmax(0,1fr)_260px] lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-6 lg:py-8">
        <div className="min-w-0 lg:order-1">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-mono text-xs font-medium text-muted-foreground">
              {issue.key}
            </span>
            <Badge variant={statusBadge[status]} dot>
              {statusName}
            </Badge>
            <span className="text-muted-foreground">
              Opened {formatShortDate(issue.openedAt)} by {issue.reporter}
            </span>
            <div className="ms-auto flex flex-wrap items-center gap-1">
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  iconOnly
                  size="sm"
                  aria-label="Copy issue link"
                  onPress={() => void copyLink()}
                >
                  <CopySimpleIcon size={18} aria-hidden="true" />
                </Button>
                <Tooltip>
                  <span className="block font-medium">Copy link</span>
                  <span className="mt-1 flex items-center justify-center gap-1">
                    <Kbd className="border-background/20 bg-background/10 text-background">
                      Ctrl
                    </Kbd>
                    <Kbd className="border-background/20 bg-background/10 text-background">
                      Shift
                    </Kbd>
                    <Kbd className="border-background/20 bg-background/10 text-background">
                      C
                    </Kbd>
                  </span>
                </Tooltip>
              </TooltipTrigger>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  iconOnly
                  size="sm"
                  aria-label="Keyboard shortcuts"
                  onPress={() => setShortcutsOpen(true)}
                >
                  <KeyboardIcon size={18} aria-hidden="true" />
                </Button>
                <Tooltip>
                  <span className="flex items-center gap-1.5">
                    Shortcuts
                    <Kbd className="border-background/20 bg-background/10 text-background">
                      ?
                    </Kbd>
                  </span>
                </Tooltip>
              </TooltipTrigger>
              <Button
                variant={subscribed ? "outline" : "default"}
                size="sm"
                onPress={() => {
                  const next = !subscribed;
                  setSubscribed(next);
                  showToast({
                    title: next
                      ? "You subscribed to this issue"
                      : "You unsubscribed from this issue",
                    description: next
                      ? "Kestrel sends a message when the issue changes."
                      : "Kestrel stops the issue messages.",
                    variant: "success",
                  });
                }}
              >
                <BellIcon size={16} aria-hidden="true" />
                {subscribed ? "Subscribed" : "Subscribe"}
              </Button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h1 className="sr-only">
                {issue.key}: {title}
              </h1>
              <InlineEdit
                label="Title"
                value={title}
                onSave={(next) => {
                  const trimmed = next.trim();
                  if (!trimmed) throw new Error("Enter a title.");
                  setTitle(trimmed);
                  showToast({
                    title: "Title updated",
                    description: "The new title is visible to the team.",
                    variant: "success",
                  });
                }}
                className="max-w-3xl [&>span:first-child]:hidden [&_[data-slot=inline-edit-trigger]>span:first-child]:whitespace-normal [&_[data-slot=inline-edit-trigger]>span:first-child]:overflow-visible [&_[data-slot=inline-edit-trigger]>span:first-child]:text-xl [&_[data-slot=inline-edit-trigger]>span:first-child]:font-semibold sm:[&_[data-slot=inline-edit-trigger]>span:first-child]:text-2xl"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ClockIcon size={14} aria-hidden="true" />
              Updated{" "}
              {activity.at(-1)?.atLabel ??
                formatActivityTime(activity.at(-1)?.at ?? issue.openedAt)}
            </span>
            <span>{issue.build}</span>
          </div>

          <Card className="mt-5">
            <CardContent className="grid gap-4 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-sm font-semibold">Description</h2>
                <Badge variant="error">Blocker</Badge>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                After the Oct 24 template update, the reply header shows the
                sender name two times. The duplicate appears in the inbox reply
                view only.
              </p>
              <div className="grid gap-2">
                <h3 className="text-sm font-semibold">Steps to reproduce</h3>
                <ol className="ms-4 grid list-decimal gap-1 text-sm leading-6 text-muted-foreground">
                  <li>Open a conversation with one sender.</li>
                  <li>Select Reply.</li>
                  <li>Read the reply header.</li>
                </ol>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-border/70 bg-muted/40 p-3">
                  <p className="text-xs font-semibold text-success-foreground">
                    Expected
                  </p>
                  <p className="mt-1 text-sm">
                    The sender name shows one time.
                  </p>
                </div>
                <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3">
                  <p className="text-xs font-semibold text-destructive">
                    Actual
                  </p>
                  <p className="mt-1 text-sm">
                    The sender name shows two times.
                  </p>
                </div>
              </div>
              <figure className="grid gap-2">
                <div className="rounded-lg border border-border/70 bg-muted/40 p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ArrowBendUpLeftIcon size={14} aria-hidden="true" />
                    Reply to
                  </div>
                  <div className="mt-2 rounded-md bg-card p-3 shadow-[var(--shadow-card)] ring-1 ring-border/60">
                    <p className="text-sm font-semibold">Ruth Okafor</p>
                    <p className="text-sm font-semibold">Ruth Okafor</p>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      Hi team, the export has no rows for October. Can you check
                      the filter?
                    </p>
                  </div>
                </div>
                <figcaption className="text-xs text-muted-foreground">
                  The sender name appears two times.
                </figcaption>
              </figure>
              <p className="text-xs text-muted-foreground">
                Chrome 141 · macOS 15.2
              </p>
            </CardContent>
          </Card>

          <Card className="mt-5">
            <CardContent className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-sm font-semibold">Activity</h2>
                <span className="text-xs text-muted-foreground">
                  {activity.length} updates
                </span>
              </div>
              <Timeline aria-label="Issue activity" className="mt-3">
                {activity.map((event, index) => {
                  const Icon = eventIcons[event.type];
                  return (
                    <TimelineItem
                      key={event.id}
                      status={
                        index === activity.length - 1 ? "latest" : "complete"
                      }
                      icon={<Icon size={14} weight="bold" />}
                      className="pb-4 last:pb-0"
                    >
                      {event.type === "comment" ? (
                        <>
                          <div className="flex flex-wrap items-center gap-2">
                            <Avatar name={event.actor.name} size="xs" />
                            <TimelineTitle className="text-sm">
                              {event.actor.name}
                            </TimelineTitle>
                            <TimelineTime
                              dateTime={event.at}
                              title={formatActivityTime(event.at)}
                              className="mt-0 ms-auto shrink-0"
                            >
                              {event.atLabel ?? formatActivityTime(event.at)}
                            </TimelineTime>
                          </div>
                          {event.body && (
                            <TimelineDescription className="mt-1.5 rounded-md bg-muted/50 px-3 py-2 text-[13px] leading-5 text-foreground">
                              {event.body}
                            </TimelineDescription>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <TimelineTitle className="text-sm font-medium">
                              {event.title}
                            </TimelineTitle>
                            <TimelineTime
                              dateTime={event.at}
                              title={formatActivityTime(event.at)}
                              className="mt-0 shrink-0"
                            >
                              {event.atLabel ?? formatActivityTime(event.at)}
                            </TimelineTime>
                          </div>
                          {event.body && (
                            <TimelineDescription className="text-[13px] leading-5">
                              {event.body}
                            </TimelineDescription>
                          )}
                        </>
                      )}
                    </TimelineItem>
                  );
                })}
              </Timeline>
            </CardContent>
          </Card>

          <Card className="mt-5">
            <CardContent className="p-4 sm:p-5">
              <div className="flex gap-3">
                <Avatar name="Maya Chen" className="hidden sm:grid" />
                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-semibold">Add a comment</h2>
                  <TextArea
                    value={comment}
                    onChange={setComment}
                    size="sm"
                    className="mt-2"
                    aria-label="Comment"
                  >
                    <TextAreaInput
                      ref={commentRef}
                      rows={3}
                      className="min-h-24"
                      placeholder="Write a comment"
                      onKeyDown={(event) => {
                        if (
                          (event.metaKey || event.ctrlKey) &&
                          event.key === "Enter"
                        ) {
                          event.preventDefault();
                          submitComment("comment");
                        }
                      }}
                    />
                  </TextArea>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <p className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                      <Kbd>Ctrl</Kbd>
                      <Kbd>Enter</Kbd>
                      <span>to send</span>
                    </p>
                    <ButtonGroup size="sm">
                      <Button
                        isDisabled={!comment.trim()}
                        onPress={() => submitComment("comment")}
                      >
                        Comment
                      </Button>
                      <MenuTrigger>
                        <Button
                          iconOnly
                          aria-label="More comment options"
                          isDisabled={!comment.trim()}
                        >
                          <CaretDownIcon size={14} aria-hidden="true" />
                        </Button>
                        <MenuPopover placement="top end">
                          <MenuContent
                            aria-label="Comment options"
                            onAction={(key: Key) =>
                              submitComment(
                                key === "close"
                                  ? "close"
                                  : key === "review"
                                    ? "review"
                                    : "comment",
                              )
                            }
                          >
                            <MenuItem id="comment">Comment only</MenuItem>
                            <MenuItem id="review">
                              Comment and set In review
                            </MenuItem>
                            <MenuItem id="close">Comment and close</MenuItem>
                          </MenuContent>
                        </MenuPopover>
                      </MenuTrigger>
                    </ButtonGroup>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <aside className="grid content-start gap-4 lg:order-2">
          <Card>
            <CardContent className="grid gap-3 p-3.5">
              <h2 className="text-sm font-semibold">Properties</h2>
              <Select
                label="Status"
                size="sm"
                options={statusOptions}
                value={status}
                onValueChange={(next) => changeStatus(next as StatusId)}
              />
              <ComboBox
                label="Assignee"
                size="sm"
                options={personOptions}
                value={assignee}
                onValueChange={changeAssignee}
                placeholder="Search people"
              />
              <DatePicker
                label="Due date"
                size="sm"
                value={due}
                onChange={changeDue}
                presets={duePresets}
                description={
                  due && due.toString() < "2026-11-03"
                    ? "Overdue by 3 days."
                    : undefined
                }
              />
              <TokenField
                value={labels}
                onChange={setLabels}
                size="sm"
                placeholder="Add a label"
              >
                <TokenFieldLabel>Labels</TokenFieldLabel>
                <TokenFieldInput placeholder="Add a label" />
                <TokenFieldDescription>
                  Use comma or Enter.
                </TokenFieldDescription>
              </TokenField>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="grid gap-2.5 p-3.5">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold">Viewers</h2>
                <Badge variant="success" dot>
                  {viewers.length} active
                </Badge>
              </div>
              <PresenceList
                items={viewers}
                getKey={(person) => person.id}
                aria-label="People viewing this issue"
              >
                {(person) => (
                  <div className="flex items-center gap-2.5">
                    <Avatar name={person.name} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-1.5 truncate text-sm font-medium">
                        {person.name}
                        {person.id === "maya" && (
                          <Badge variant="accent">You</Badge>
                        )}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {person.role}
                      </p>
                    </div>
                  </div>
                )}
              </PresenceList>
              <Button
                variant="outline"
                size="sm"
                onPress={toggleWatch}
                className="mt-1 w-full"
              >
                {watching ? (
                  <EyeSlashIcon size={16} aria-hidden="true" />
                ) : (
                  <EyeIcon size={16} aria-hidden="true" />
                )}
                {watching ? "Stop watching" : "Watch issue"}
              </Button>
            </CardContent>
          </Card>
        </aside>
      </main>

      <DialogContent
        size="sm"
        overlayProps={{ isOpen: shortcutsOpen, onOpenChange: setShortcutsOpen }}
      >
        <DialogHeader>
          <DialogTitle level={2}>Keyboard shortcuts</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogBody className="mt-4">
          <dl className="grid gap-3">
            {[
              {
                keys: ["C"],
                label: "Focus comment",
              },
              {
                keys: ["Ctrl", "Enter"],
                label: "Send comment",
              },
              {
                keys: ["Ctrl", "Shift", "C"],
                label: "Copy link",
              },
              {
                keys: ["?"],
                label: "Open shortcuts",
              },
              {
                keys: ["Esc"],
                label: "Close dialog",
              },
            ].map((shortcut) => (
              <div
                key={shortcut.label}
                className="flex items-center justify-between gap-3"
              >
                <dt className="text-sm">{shortcut.label}</dt>
                <dd className="flex shrink-0 items-center gap-1">
                  {shortcut.keys.map((key) => (
                    <Kbd key={key}>{key}</Kbd>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </DialogBody>
        <DialogFooter>
          <DialogClose variant="outline" size="sm">
            Done
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </div>
  );
}
