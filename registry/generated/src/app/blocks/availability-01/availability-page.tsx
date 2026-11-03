"use client";

import { CalendarDate } from "@internationalized/date";
import {
  CalendarBlankIcon,
  CheckCircleIcon,
  CheckIcon,
  CopySimpleIcon,
  FirstAidIcon,
  PlusIcon,
  XIcon,
} from "@phosphor-icons/react";
import { useMemo, useRef, useState } from "react";
import type { RangeValue } from "react-aria-components";
import { Alert } from "../../../components/vip-ui/alert";
import { Avatar } from "../../../components/vip-ui/avatar";
import { Badge } from "../../../components/vip-ui/badge";
import { Button } from "../../../components/vip-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/vip-ui/card";
import { DateField } from "../../../components/vip-ui/date-field";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "../../../components/vip-ui/empty-state";
import { Presence } from "../../../components/vip-ui/presence";
import { PresenceList } from "../../../components/vip-ui/presence-list";
import { RangeCalendar } from "../../../components/vip-ui/range-calendar";
import { Separator } from "../../../components/vip-ui/separator";
import { Switch } from "../../../components/vip-ui/switch";
import { TextField } from "../../../components/vip-ui/text-field";
import { TimeField } from "../../../components/vip-ui/time-field";
import { showToast } from "../../../components/vip-ui/toast";
import {
  durationOf,
  formatDateRange,
  formatHours,
  initialBookUntil,
  initialTimeOff,
  minutesOf,
  type TimeOff,
  weekDays,
} from "./data";

interface Snapshot {
  hours: typeof weekDays;
  bookUntil: CalendarDate;
}

export function AvailabilityPage() {
  const [saved, setSaved] = useState<Snapshot>({
    hours: weekDays,
    bookUntil: initialBookUntil,
  });
  const [hours, setHours] = useState(weekDays);
  const [bookUntil, setBookUntil] = useState<CalendarDate>(initialBookUntil);
  const [timeOff, setTimeOff] = useState<TimeOff[]>(initialTimeOff);
  const [draft, setDraft] = useState<RangeValue<CalendarDate> | null>(null);
  const [note, setNote] = useState("");
  const [timeOffError, setTimeOffError] = useState("");
  const [dirty, setDirty] = useState(false);
  const timeOffHeading = useRef<HTMLHeadingElement>(null);
  const pageHeading = useRef<HTMLHeadingElement>(null);

  const issues = useMemo(() => {
    const list: string[] = [];
    for (const day of hours) {
      if (!day.enabled) continue;
      const sorted = [...day.ranges].sort(
        (a, b) => minutesOf(a.start) - minutesOf(b.start),
      );
      for (let index = 0; index < sorted.length; index++) {
        const range = sorted[index];
        if (durationOf(range) <= 0) {
          list.push(`${day.label}: the end time must be after the start time.`);
        }
        const next = sorted[index + 1];
        if (next && minutesOf(next.start) < minutesOf(range.end)) {
          list.push(`${day.label}: two time ranges overlap.`);
        }
      }
    }
    return list;
  }, [hours]);

  const openDays = hours.filter((day) => day.enabled);
  const weeklyMinutes = openDays.reduce(
    (total, day) =>
      total +
      day.ranges.reduce(
        (sum, range) => sum + Math.max(0, durationOf(range)),
        0,
      ),
    0,
  );

  function changeHours(next: typeof weekDays) {
    setHours(next);
    setDirty(true);
  }

  function updateDay(
    id: string,
    update: (day: (typeof weekDays)[number]) => (typeof weekDays)[number],
  ) {
    changeHours(hours.map((day) => (day.id === id ? update(day) : day)));
  }

  function addRange(id: string) {
    updateDay(id, (day) => ({
      ...day,
      ranges: [
        ...day.ranges,
        {
          id: `${id}-${Date.now()}`,
          start: day.ranges.at(-1)?.end ?? day.ranges[0].start,
          end: day.ranges.at(-1)?.end ?? day.ranges[0].end,
        },
      ],
    }));
    setTimeOffError("");
  }

  function removeRange(dayId: string, rangeId: string) {
    updateDay(dayId, (day) => ({
      ...day,
      ranges: day.ranges.filter((range) => range.id !== rangeId),
    }));
    requestAnimationFrame(() => {
      document.getElementById(`add-hours-${dayId}`)?.focus();
    });
  }

  function copyMonday() {
    const monday = hours.find((day) => day.id === "mon");
    if (!monday?.enabled) return;
    const copies = monday.ranges.map((range) => ({
      ...range,
      id: `copy-${range.id}-${Date.now()}`,
    }));
    changeHours(
      hours.map((day) =>
        ["tue", "wed", "thu", "fri"].includes(day.id)
          ? {
              ...day,
              enabled: true,
              ranges: copies.map((range) => ({ ...range })),
            }
          : day,
      ),
    );
    showToast({ title: "Monday hours copied to the weekdays" });
  }

  function addTimeOff() {
    if (!draft) return;
    const overlap = timeOff.find(
      (entry) =>
        draft.start.compare(entry.end) <= 0 &&
        draft.end.compare(entry.start) >= 0,
    );
    if (overlap) {
      setTimeOffError(
        `These dates overlap with ${formatDateRange(overlap.start, overlap.end)}.`,
      );
      return;
    }
    setTimeOff((current) => [
      ...current,
      {
        id: `off-${Date.now()}`,
        start: draft.start,
        end: draft.end,
        note: note.trim() || "Time off",
      },
    ]);
    setDraft(null);
    setNote("");
    setTimeOffError("");
    showToast({
      title: "Time off added",
      description: `${formatDateRange(draft.start, draft.end)} is now closed.`,
      variant: "success",
    });
  }

  function removeTimeOff(id: string) {
    setTimeOff((current) => current.filter((entry) => entry.id !== id));
    setTimeOffError("");
    showToast({ title: "Time off removed" });
    requestAnimationFrame(() => timeOffHeading.current?.focus());
  }

  function save() {
    if (issues.length > 0) {
      showToast({
        title: "Check your hours",
        description: "Fix the times that are marked in red.",
        variant: "error",
      });
      return;
    }
    setSaved({ hours, bookUntil });
    setDirty(false);
    showToast({
      title: "Availability saved",
      description: `${formatHours(weeklyMinutes)} open each week.`,
      variant: "success",
    });
    requestAnimationFrame(() => pageHeading.current?.focus());
  }

  function discard() {
    setHours(saved.hours);
    setBookUntil(saved.bookUntil);
    setDirty(false);
    setTimeOffError("");
    requestAnimationFrame(() => pageHeading.current?.focus());
  }

  return (
    <div className="min-h-svh bg-background pb-8">
      <header className="sticky top-0 z-20 border-b border-border/70 bg-card/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"
            >
              <FirstAidIcon size={20} weight="fill" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-[-0.02em]">
                Marlow Health
              </p>
              <p className="truncate text-xs text-muted-foreground">
                Booking settings
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Badge variant="outline" className="max-sm:hidden">
              Europe/London
            </Badge>
            <div className="flex items-center gap-2">
              <Avatar name="Ruth Okafor" size="sm" />
              <span className="hidden text-sm font-medium sm:block">
                Dr. Ruth Okafor
              </span>
            </div>
          </div>
        </div>
      </header>

      <Presence show={dirty}>
        <div className="sticky top-16 z-30 border-b border-border/70 bg-popover/95 px-4 py-2.5 shadow-[var(--shadow-card)] backdrop-blur">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-medium">
              You have changes that are not saved.
            </p>
            <div className="flex gap-2 max-sm:ms-auto">
              <Button variant="ghost" size="sm" onPress={discard}>
                Discard
              </Button>
              <Button size="sm" onPress={save}>
                <CheckIcon size={15} aria-hidden="true" />
                Save changes
              </Button>
            </div>
          </div>
        </div>
      </Presence>

      <main className="mx-auto grid max-w-5xl gap-6 px-4 py-8 sm:px-6 lg:py-10">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1
              ref={pageHeading}
              tabIndex={-1}
              className="text-2xl font-semibold tracking-[-0.04em] outline-none"
            >
              Availability
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Set the hours when patients can book a consultation.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {formatHours(weeklyMinutes)}
            </span>{" "}
            open each week
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="grid min-w-0 gap-6">
            <Card>
              <CardHeader className="flex-row flex-wrap items-start justify-between gap-3">
                <CardTitle as="h2">Weekly hours</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onPress={copyMonday}
                  isDisabled={!hours.find((day) => day.id === "mon")?.enabled}
                >
                  <CopySimpleIcon size={16} aria-hidden="true" />
                  Copy Monday
                </Button>
              </CardHeader>
              <CardContent className="grid gap-0 pt-2">
                {issues.length > 0 && (
                  <Alert
                    variant="warning"
                    title="Check these hours"
                    className="mb-4"
                  >
                    <ul className="list-disc ps-4">
                      {issues.map((issue) => (
                        <li key={issue}>{issue}</li>
                      ))}
                    </ul>
                  </Alert>
                )}
                {openDays.length === 0 && (
                  <Alert
                    variant="warning"
                    title="No days are open"
                    className="mb-4"
                  >
                    Patients cannot book a consultation until you open a day.
                  </Alert>
                )}
                <div className="-mx-5 border-t border-border/70 px-5">
                  {hours.map((day) => {
                    const total = day.ranges.reduce(
                      (sum, range) => sum + Math.max(0, durationOf(range)),
                      0,
                    );
                    return (
                      <div
                        key={day.id}
                        className="grid gap-1.5 border-b border-border/70 py-2.5 last:border-b-0"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                          <Switch
                            checked={day.enabled}
                            onCheckedChange={(checked) =>
                              updateDay(day.id, (current) => ({
                                ...current,
                                enabled: checked,
                              }))
                            }
                            className="w-fit"
                          >
                            {day.label}
                          </Switch>
                          <span className="text-xs tabular-nums text-muted-foreground">
                            {day.enabled ? formatHours(total) : "Closed"}
                          </span>
                        </div>
                        {day.enabled && (
                          <div className="grid gap-1.5 ps-0 sm:ps-1">
                            {day.ranges.map((range, index) => (
                              <div
                                key={range.id}
                                className="flex flex-wrap items-center gap-1.5"
                              >
                                <TimeField
                                  aria-label={`${day.label} start time ${index + 1}`}
                                  value={range.start}
                                  onChange={(value) => {
                                    if (!value) return;
                                    updateDay(day.id, (current) => ({
                                      ...current,
                                      ranges: current.ranges.map((item) =>
                                        item.id === range.id
                                          ? { ...item, start: value }
                                          : item,
                                      ),
                                    }));
                                  }}
                                  size="sm"
                                  hourCycle={24}
                                  className="min-w-0 max-w-[7.25rem] grow shrink basis-[5.5rem]"
                                />
                                <span
                                  aria-hidden="true"
                                  className="shrink-0 text-xs text-muted-foreground"
                                >
                                  to
                                </span>
                                <TimeField
                                  aria-label={`${day.label} end time ${index + 1}`}
                                  value={range.end}
                                  onChange={(value) => {
                                    if (!value) return;
                                    updateDay(day.id, (current) => ({
                                      ...current,
                                      ranges: current.ranges.map((item) =>
                                        item.id === range.id
                                          ? { ...item, end: value }
                                          : item,
                                      ),
                                    }));
                                  }}
                                  size="sm"
                                  hourCycle={24}
                                  className="min-w-0 max-w-[7.25rem] grow shrink basis-[5.5rem]"
                                />
                                {day.ranges.length > 1 && (
                                  <Button
                                    variant="ghost"
                                    iconOnly
                                    size="xs"
                                    aria-label={`Remove time range ${index + 1} on ${day.label}`}
                                    onPress={() =>
                                      removeRange(day.id, range.id)
                                    }
                                  >
                                    <XIcon size={14} aria-hidden="true" />
                                  </Button>
                                )}
                              </div>
                            ))}
                            <div>
                              <Button
                                id={`add-hours-${day.id}`}
                                variant="minimal"
                                size="xs"
                                onPress={() => addRange(day.id)}
                                isDisabled={day.ranges.length >= 3}
                              >
                                <PlusIcon size={13} aria-hidden="true" />
                                Add hours
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid min-w-0 gap-6">
            <Card>
              <CardHeader>
                <CardTitle
                  as="h2"
                  ref={timeOffHeading}
                  tabIndex={-1}
                  className="outline-none"
                >
                  Time off
                </CardTitle>
                <CardDescription>
                  Pick the days when the clinic is closed.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-[minmax(0,1fr)] gap-4 md:max-lg:grid-cols-[auto_minmax(0,1fr)] md:max-lg:items-start">
                  <RangeCalendar
                    aria-label="Select time off"
                    value={draft}
                    onChange={(next) => {
                      setDraft(next);
                      setTimeOffError("");
                    }}
                    defaultFocusedValue={new CalendarDate(2026, 10, 19)}
                    minValue={new CalendarDate(2026, 10, 1)}
                    maxValue={new CalendarDate(2027, 1, 31)}
                    className="mx-auto md:max-lg:mx-0"
                  />
                  <div className="grid gap-3">
                    <p className="text-sm text-muted-foreground">
                      {draft
                        ? `${formatDateRange(draft.start, draft.end)} · ${
                            Math.round(
                              (draft.end.toDate("UTC").getTime() -
                                draft.start.toDate("UTC").getTime()) /
                                86_400_000,
                            ) + 1
                          } days`
                        : "Select a start and end date."}
                    </p>
                    <TextField
                      label="Note"
                      size="sm"
                      placeholder="e.g. Public holiday"
                      value={note}
                      onChange={setNote}
                      maxLength={60}
                    />
                    {timeOffError && (
                      <p className="text-xs leading-5 text-destructive">
                        {timeOffError}
                      </p>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onPress={addTimeOff}
                      isDisabled={!draft}
                      className="w-full"
                    >
                      <PlusIcon size={16} aria-hidden="true" />
                      Add time off
                    </Button>
                    <Separator />
                    {timeOff.length === 0 ? (
                      <EmptyState className="gap-2 px-3 py-6">
                        <EmptyStateIcon className="size-10">
                          <CalendarBlankIcon />
                        </EmptyStateIcon>
                        <EmptyStateTitle as="h3" className="text-sm">
                          No time off planned
                        </EmptyStateTitle>
                        <EmptyStateDescription className="text-xs">
                          Bookings stay open every week.
                        </EmptyStateDescription>
                      </EmptyState>
                    ) : (
                      <PresenceList
                        items={timeOff}
                        getKey={(entry) => entry.id}
                        aria-label="Scheduled time off"
                        className="gap-2"
                      >
                        {(entry) => (
                          <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3 ring-1 ring-border/70">
                            <CalendarBlankIcon
                              size={18}
                              aria-hidden="true"
                              className="mt-0.5 shrink-0 text-muted-foreground"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium">
                                {formatDateRange(entry.start, entry.end)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {entry.note}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              iconOnly
                              size="xs"
                              aria-label={`Remove time off from ${formatDateRange(entry.start, entry.end)}`}
                              onPress={() => removeTimeOff(entry.id)}
                            >
                              <XIcon size={14} aria-hidden="true" />
                            </Button>
                          </div>
                        )}
                      </PresenceList>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle as="h2">Booking window</CardTitle>
                <CardDescription>
                  Control how far ahead patients can book.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DateField
                  label="Bookings open until"
                  size="sm"
                  value={bookUntil}
                  onChange={(value) => {
                    if (!value) return;
                    setBookUntil(value);
                    setDirty(true);
                  }}
                  minValue={new CalendarDate(2026, 10, 1)}
                  maxValue={new CalendarDate(2027, 12, 31)}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <CheckCircleIcon
            size={15}
            aria-hidden="true"
            className="text-success"
          />
          Changes apply to new bookings only.
        </p>
      </main>
    </div>
  );
}
