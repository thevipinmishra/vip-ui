"use client";

import {
  type CalendarDate,
  startOfWeek,
  Time,
  toCalendarDate,
  toCalendarDateTime,
  toTime,
  toZoned,
  type ZonedDateTime,
} from "@internationalized/date";
import {
  CalendarBlankIcon,
  CaretLeftIcon,
  CaretRightIcon,
  ClockIcon,
  FunnelSimpleIcon,
  MapPinIcon,
  PencilSimpleIcon,
  PlusIcon,
  TrashIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { type Selection, useLocale } from "react-aria-components";
import { Avatar, AvatarGroup } from "../../vip-ui/avatar";
import { Button } from "../../vip-ui/button";
import { Calendar } from "../../vip-ui/calendar";
import { Checkbox } from "../../vip-ui/checkbox";
import { CheckboxGroup } from "../../vip-ui/checkbox-group";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../vip-ui/dialog";
import {
  type CalendarEvent,
  EventCalendar,
  EventCalendarGrid,
  EventCalendarHeader,
  type EventCalendarView,
} from "../../vip-ui/event-calendar";
import { Menu, MenuItem, MenuTrigger } from "../../vip-ui/menu";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "../../vip-ui/segmented-control";
import { showToast } from "../../vip-ui/toast";
import { cn } from "../../vip-ui/utils";
import {
  type CalendarId,
  calendars,
  currentUser,
  initialEvents,
  type TeamEvent,
  timeZone,
  todayDate,
} from "./data";
import { type EventDraft, EventEditor } from "./event-editor";

const dayTitle = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});
const monthDay = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});
const longDate = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});
const clock = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone,
});

const swatch = {
  product: "bg-(--chart-2)",
  design: "bg-(--chart-3)",
  customers: "bg-(--chart-4)",
  "time-off": "bg-foreground",
} satisfies Record<CalendarId, string>;

function utc(date: CalendarDate) {
  return date.toDate("UTC");
}

function zoned(date: CalendarDate, time: Time) {
  return toZoned(toCalendarDateTime(date, time), timeZone);
}

function timeRange(event: TeamEvent) {
  return `${clock.format(event.start.toDate())} – ${clock.format(event.end.toDate())}`;
}

function calendarName(id: CalendarId) {
  return calendars.find((calendar) => calendar.id === id)?.name ?? "";
}

function toDraft(event: TeamEvent): EventDraft {
  return {
    id: event.id,
    title: event.title,
    calendar: event.calendar,
    date: toCalendarDate(event.start),
    start: toTime(event.start),
    end: toTime(event.end),
    location: event.location,
    guests: event.guests,
  };
}

function blankDraft(start: ZonedDateTime, end: ZonedDateTime): EventDraft {
  return {
    title: "",
    calendar: "product",
    date: toCalendarDate(start),
    start: toTime(start),
    end: toTime(end),
    location: "",
    guests: [currentUser],
  };
}

export function TeamCalendar() {
  const { locale } = useLocale();
  const [events, setEvents] = useState(initialEvents);
  const [date, setDate] = useState(todayDate);
  const [view, setView] = useState<EventCalendarView>("week");
  const [visible, setVisible] = useState<CalendarId[]>(
    calendars.map((calendar) => calendar.id),
  );
  const [detailId, setDetailId] = useState<string | null>(null);
  const [lastDetail, setLastDetail] = useState<TeamEvent | null>(null);
  const [editor, setEditor] = useState<{ key: number; draft: EventDraft }>();
  const [editorOpen, setEditorOpen] = useState(false);

  const shown = events.filter((event) => visible.includes(event.calendar));
  const calendarEvents: CalendarEvent[] = shown.map((event) => ({
    id: event.id,
    title: event.title,
    start: event.start,
    end: event.end,
    isReadOnly: event.isReadOnly,
    color:
      calendars.find((calendar) => calendar.id === event.calendar)?.color ??
      "default",
  }));
  const detail = events.find((event) => event.id === detailId) ?? null;
  const detailShown = detail ?? lastDetail;

  const weekStart = startOfWeek(date, locale);
  const weekEnd = weekStart.add({ days: 6 });
  const title =
    view === "day"
      ? dayTitle.format(utc(date))
      : weekStart.month === weekEnd.month
        ? `${monthDay.format(utc(weekStart))} – ${weekEnd.day}, ${weekEnd.year}`
        : `${monthDay.format(utc(weekStart))} – ${monthDay.format(utc(weekEnd))}, ${weekEnd.year}`;
  const step = view === "day" ? { days: 1 } : { weeks: 1 };
  const labels =
    view === "day"
      ? { previous: "Previous day", next: "Next day" }
      : { previous: "Previous week", next: "Next week" };

  function openDetail(id: string) {
    const event = events.find((item) => item.id === id);
    if (!event) return;
    setLastDetail(event);
    setDetailId(id);
  }

  function openEditor(draft: EventDraft) {
    setEditor((current) => ({ key: (current?.key ?? 0) + 1, draft }));
    setEditorOpen(true);
  }

  function newEvent() {
    const start = zoned(date, new Time(13));
    openEditor(blankDraft(start, start.add({ minutes: 30 })));
  }

  function save(draft: EventDraft) {
    const next: TeamEvent = {
      id: draft.id ?? crypto.randomUUID(),
      title: draft.title,
      calendar: draft.calendar,
      start: zoned(draft.date, draft.start),
      end: zoned(draft.date, draft.end),
      location: draft.location,
      guests: draft.guests,
    };
    setEvents((current) =>
      draft.id
        ? current.map((event) => (event.id === draft.id ? next : event))
        : [...current, next],
    );
    if (!visible.includes(draft.calendar)) {
      setVisible((current) => [...current, draft.calendar]);
    }
    setDate(draft.date);
    setEditorOpen(false);
    showToast({
      title: draft.id ? "Event updated" : "Event added",
      description: `${draft.title} · ${longDate.format(utc(draft.date))}, ${timeRange(next)}`,
      variant: "success",
    });
  }

  function remove(event: TeamEvent) {
    const snapshot = events;
    setEvents((current) => current.filter((item) => item.id !== event.id));
    setDetailId(null);
    showToast({
      title: `${event.title} deleted`,
      description: "Guests get a cancellation email.",
      action: { label: "Undo", onAction: () => setEvents(snapshot) },
    });
  }

  function showCalendars(keys: Selection) {
    setVisible(
      keys === "all"
        ? calendars.map((calendar) => calendar.id)
        : calendars.map((calendar) => calendar.id).filter((id) => keys.has(id)),
    );
  }

  return (
    <div className="min-h-svh bg-background">
      <header className="border-b border-border/70 bg-card">
        <div className="mx-auto flex h-14 max-w-360 items-center gap-2.5 px-4 sm:px-6">
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <CalendarBlankIcon size={17} weight="fill" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold tracking-[-0.02em]">
            Halden
          </span>
          <span aria-hidden="true" className="text-muted-foreground/60">
            /
          </span>
          <span className="text-sm text-muted-foreground">Calendar</span>
          <div className="ms-auto flex items-center gap-2">
            <Button size="sm" onPress={newEvent}>
              <PlusIcon data-icon="inline-start" size={16} aria-hidden="true" />
              New event
            </Button>
            <Avatar name={currentUser} size="sm" />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-360 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[17.25rem_minmax(0,1fr)]">
        <aside
          aria-label="Calendar options"
          className="hidden content-start gap-6 lg:grid"
        >
          <Calendar
            aria-label="Go to date"
            value={date}
            onChange={setDate}
            className="w-full"
          />
          <CheckboxGroup
            label="Calendars"
            value={visible}
            onChange={(value) => setVisible(value as CalendarId[])}
            className="border-t border-border/70 pt-5"
          >
            {calendars.map((calendar) => (
              <Checkbox key={calendar.id} value={calendar.id}>
                <span className="flex items-center gap-2">
                  {calendar.name}
                  <span
                    aria-hidden="true"
                    className={cn("size-2 rounded-full", swatch[calendar.id])}
                  />
                </span>
              </Checkbox>
            ))}
          </CheckboxGroup>
        </aside>

        <EventCalendar
          aria-label="Team calendar"
          events={calendarEvents}
          view={view}
          onViewChange={setView}
          date={date}
          onDateChange={setDate}
          timeZone={timeZone}
          dayStart={7}
          dayEnd={20}
          scrollToHour={9}
          onEventAction={(event) => openDetail(event.id)}
          onSlotAction={(range) =>
            openEditor(blankDraft(range.start, range.start.add({ hours: 1 })))
          }
          onEventChange={(event, range) =>
            setEvents((current) =>
              current.map((item) =>
                item.id === event.id ? { ...item, ...range } : item,
              ),
            )
          }
          className="self-start bg-card"
        >
          <EventCalendarHeader className="gap-y-3 px-3 py-3 sm:px-4">
            <h2
              aria-live="polite"
              className="min-w-0 flex-1 basis-48 truncate text-base font-semibold tracking-[-0.02em]"
            >
              {title}
            </h2>
            <div className="flex flex-wrap items-center gap-1.5">
              <MenuTrigger>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <FunnelSimpleIcon
                    data-icon="inline-start"
                    size={16}
                    aria-hidden="true"
                  />
                  Calendars
                </Button>
                <Menu
                  aria-label="Calendars"
                  selectionMode="multiple"
                  selectedKeys={visible}
                  onSelectionChange={showCalendars}
                  shouldCloseOnSelect={false}
                >
                  {calendars.map((calendar) => (
                    <MenuItem key={calendar.id} id={calendar.id}>
                      {calendar.name}
                    </MenuItem>
                  ))}
                </Menu>
              </MenuTrigger>
              <Button
                variant="outline"
                size="sm"
                onPress={() => setDate(todayDate)}
              >
                Today
              </Button>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  iconOnly
                  aria-label={labels.previous}
                  onPress={() => setDate(date.subtract(step))}
                >
                  <CaretLeftIcon
                    aria-hidden="true"
                    className="rtl:rotate-180"
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconOnly
                  aria-label={labels.next}
                  onPress={() => setDate(date.add(step))}
                >
                  <CaretRightIcon
                    aria-hidden="true"
                    className="rtl:rotate-180"
                  />
                </Button>
              </div>
              <SegmentedControl
                aria-label="Calendar view"
                size="sm"
                value={view}
                onValueChange={(details) => {
                  if (details.value === "day" || details.value === "week") {
                    setView(details.value);
                  }
                }}
              >
                <SegmentedControlItem value="day">Day</SegmentedControlItem>
                <SegmentedControlItem value="week">Week</SegmentedControlItem>
              </SegmentedControl>
            </div>
          </EventCalendarHeader>
          <EventCalendarGrid className="h-[40rem]" />
        </EventCalendar>
      </div>

      <DialogContent
        size="sm"
        overlayProps={{
          isOpen: detail !== null,
          onOpenChange: (open) => {
            if (!open) setDetailId(null);
          },
        }}
      >
        {detailShown && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-2.5 shrink-0 rounded-full",
                    swatch[detailShown.calendar],
                  )}
                />
                {detailShown.title}
              </DialogTitle>
              <DialogClose />
            </DialogHeader>
            <dl className="mt-4 grid gap-3.5 text-sm">
              <div>
                <dt className="sr-only">Time</dt>
                <dd className="flex gap-3">
                  <ClockIcon
                    size={18}
                    className="mt-px shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <span>
                    {longDate.format(utc(toCalendarDate(detailShown.start)))}
                    <span className="block text-muted-foreground">
                      {timeRange(detailShown)} ·{" "}
                      {calendarName(detailShown.calendar)}
                    </span>
                  </span>
                </dd>
              </div>
              {detailShown.location && (
                <div>
                  <dt className="sr-only">Location</dt>
                  <dd className="flex gap-3">
                    <MapPinIcon
                      size={18}
                      className="mt-px shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                    {detailShown.location}
                  </dd>
                </div>
              )}
              <div>
                <dt className="sr-only">Guests</dt>
                <dd className="flex gap-3">
                  <UsersIcon
                    size={18}
                    className="mt-px shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <span className="grid min-w-0 gap-2">
                    {detailShown.guests.length}{" "}
                    {detailShown.guests.length === 1 ? "person" : "people"}
                    <span className="flex min-w-0 items-center gap-2.5">
                      <AvatarGroup>
                        {detailShown.guests.slice(0, 5).map((name) => (
                          <Avatar key={name} name={name} size="xs" />
                        ))}
                      </AvatarGroup>
                      <span className="truncate text-muted-foreground">
                        {detailShown.guests
                          .map((name) => name.split(" ")[0])
                          .join(", ")}
                      </span>
                    </span>
                  </span>
                </dd>
              </div>
            </dl>
            {detailShown.isReadOnly ? (
              <p className="mt-5 border-t border-border/70 pt-4 text-sm text-muted-foreground">
                Only {detailShown.guests[0]} can change this event.
              </p>
            ) : (
              <DialogFooter>
                <Button
                  variant="ghost"
                  onPress={() => remove(detailShown)}
                  className="text-destructive sm:me-auto"
                >
                  <TrashIcon
                    data-icon="inline-start"
                    size={16}
                    aria-hidden="true"
                  />
                  Delete
                </Button>
                <Button
                  variant="outline"
                  onPress={() => {
                    setDetailId(null);
                    openEditor(toDraft(detailShown));
                  }}
                >
                  <PencilSimpleIcon
                    data-icon="inline-start"
                    size={16}
                    aria-hidden="true"
                  />
                  Edit event
                </Button>
              </DialogFooter>
            )}
          </>
        )}
      </DialogContent>

      {editor && (
        <EventEditor
          key={editor.key}
          draft={editor.draft}
          isOpen={editorOpen}
          onOpenChange={setEditorOpen}
          onSave={save}
        />
      )}
    </div>
  );
}
