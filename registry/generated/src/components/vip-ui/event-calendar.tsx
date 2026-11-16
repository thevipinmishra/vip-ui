"use client";

import {
  type CalendarDate,
  CalendarDateTime,
  getLocalTimeZone,
  isSameDay,
  now,
  startOfWeek,
  toCalendarDate,
  today,
  toZoned,
  type ZonedDateTime,
} from "@internationalized/date";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDateFormatter, useLocale, useMove } from "react-aria";
import { cn } from "./utils";
import { Button } from "./button";
import { ToggleButton } from "./toggle-button";
import { ToggleButtonGroup } from "./toggle-button-group";

export const eventCalendarHourHeight = 48;
const minuteHeight = eventCalendarHourHeight / 60;
const minimumEventHeight = 20;

export type EventCalendarView = "day" | "week";

export type EventCalendarColor =
  | "default"
  | "chart-2"
  | "chart-3"
  | "chart-4"
  | "chart-5";

export interface CalendarEvent {
  id: string;
  title: string;
  start: ZonedDateTime;
  end: ZonedDateTime;
  color?: EventCalendarColor;
  isReadOnly?: boolean;
  /** The accessible name, when the rendered event shows more than the title and time. */
  label?: string;
}

export interface CalendarEventRange {
  start: ZonedDateTime;
  end: ZonedDateTime;
}

export interface CalendarDayEvent {
  event: CalendarEvent;
  startMinute: number;
  endMinute: number;
}

export interface CalendarEventLayout extends CalendarDayEvent {
  column: number;
  columns: number;
  top: number;
  height: number;
}

export function layoutDayEvents(
  events: readonly CalendarDayEvent[],
): CalendarEventLayout[] {
  const sorted = [...events].sort((a, b) => {
    if (a.startMinute !== b.startMinute) return a.startMinute - b.startMinute;
    return b.endMinute - b.startMinute - (a.endMinute - a.startMinute);
  });
  const layout: CalendarEventLayout[] = [];
  let cluster: { item: CalendarDayEvent; column: number }[] = [];
  let columnEnds: number[] = [];
  let clusterEnd = Number.NEGATIVE_INFINITY;

  const flush = () => {
    const columns = columnEnds.length;
    for (const entry of cluster) {
      layout.push({
        ...entry.item,
        column: entry.column,
        columns,
        top: entry.item.startMinute * minuteHeight,
        height: Math.max(
          minimumEventHeight,
          (entry.item.endMinute - entry.item.startMinute) * minuteHeight,
        ),
      });
    }
    cluster = [];
    columnEnds = [];
    clusterEnd = Number.NEGATIVE_INFINITY;
  };

  for (const item of sorted) {
    if (item.startMinute >= clusterEnd) flush();
    let column = columnEnds.findIndex((end) => end <= item.startMinute);
    if (column === -1) {
      column = columnEnds.length;
      columnEnds.push(item.endMinute);
    } else {
      columnEnds[column] = item.endMinute;
    }
    cluster.push({ item, column });
    clusterEnd = Math.max(clusterEnd, item.endMinute);
  }
  flush();
  return layout;
}

const eventSurfaceClass =
  "block overflow-hidden rounded-md border-s-2 text-start text-xs";

export const eventCalendarColorStyles = {
  default:
    "border-s-foreground bg-[color-mix(in_oklab,var(--foreground)_6%,var(--card))]",
  "chart-2":
    "border-s-[var(--chart-2)] bg-[color-mix(in_oklab,var(--chart-2)_14%,var(--card))]",
  "chart-3":
    "border-s-[var(--chart-3)] bg-[color-mix(in_oklab,var(--chart-3)_14%,var(--card))]",
  "chart-4":
    "border-s-[var(--chart-4)] bg-[color-mix(in_oklab,var(--chart-4)_14%,var(--card))]",
  "chart-5":
    "border-s-[var(--chart-5)] bg-[color-mix(in_oklab,var(--chart-5)_14%,var(--card))]",
} satisfies Record<EventCalendarColor, string>;

interface EventCalendarContextValue {
  view: EventCalendarView;
  days: CalendarDate[];
  title: string;
  timeZone: string;
  step: number;
  dayStart: number;
  dayEnd: number;
  scrollToHour: number;
  events: CalendarEvent[];
  label: string;
  onEventChange?: (event: CalendarEvent, range: CalendarEventRange) => void;
  onEventAction?: (event: CalendarEvent) => void;
  onSlotAction?: (range: CalendarEventRange) => void;
  renderEvent?: (event: CalendarEvent) => ReactNode;
  goTo: (date: CalendarDate) => void;
  changeView: (view: EventCalendarView) => void;
  eventLabel: (event: CalendarEvent, day: CalendarDate) => string;
  eventTime: (event: CalendarEvent) => string;
  timeLabel: (day: CalendarDate, minutes: number) => string;
  hourLabel: (day: CalendarDate, hour: number) => string;
  timeRange: (
    day: CalendarDate,
    startMinutes: number,
    endMinutes: number,
  ) => string;
  dayLabel: (day: CalendarDate) => string;
  weekday: (day: CalendarDate) => string;
  weekdayShort: (day: CalendarDate) => string;
  announce: (message: string) => void;
}

const EventCalendarContext = createContext<EventCalendarContextValue | null>(
  null,
);

function useEventCalendarContext() {
  const value = useContext(EventCalendarContext);
  if (!value) {
    throw new Error(
      "EventCalendarHeader and EventCalendarGrid must render inside EventCalendar.",
    );
  }
  return value;
}

function useCurrentTime(timeZone: string) {
  const [time, setTime] = useState<ZonedDateTime | null>(null);
  useEffect(() => {
    let timer: number | undefined;
    const tick = () => setTime(now(timeZone));
    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(
        () => {
          tick();
          schedule();
        },
        60_000 - (Date.now() % 60_000) + 20,
      );
    };
    const onVisibilityChange = () => {
      if (document.hidden) {
        window.clearTimeout(timer);
        timer = undefined;
        return;
      }
      tick();
      schedule();
    };
    tick();
    schedule();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [timeZone]);
  return time;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function snap(value: number, step: number) {
  return Math.round(value / step) * step;
}

function atMinute(date: CalendarDate, minutes: number, timeZone: string) {
  const hour = Math.floor(minutes / 60) % 24;
  const minute = Math.round(minutes) % 60;
  return new CalendarDateTime(
    date.year,
    date.month,
    date.day,
    hour,
    minute,
  ).toDate(timeZone);
}

function mergeDayPeriods(start: string, end: string) {
  const match = end.match(/\s?([AP]M)$/i);
  if (match && start.endsWith(match[0])) {
    return `${start.slice(0, -match[0].length)} to ${end}`;
  }
  return `${start} to ${end}`;
}

export interface EventCalendarProps {
  events: CalendarEvent[];
  view?: EventCalendarView;
  defaultView?: EventCalendarView;
  onViewChange?: (view: EventCalendarView) => void;
  date?: CalendarDate;
  defaultDate?: CalendarDate;
  onDateChange?: (date: CalendarDate) => void;
  timeZone?: string;
  step?: number;
  dayStart?: number;
  dayEnd?: number;
  scrollToHour?: number;
  onEventChange?: (event: CalendarEvent, range: CalendarEventRange) => void;
  onEventAction?: (event: CalendarEvent) => void;
  onSlotAction?: (range: CalendarEventRange) => void;
  renderEvent?: (event: CalendarEvent) => ReactNode;
  "aria-label": string;
  className?: string;
  children?: ReactNode;
}

export function EventCalendar({
  events,
  view,
  defaultView = "week",
  onViewChange,
  date,
  defaultDate,
  onDateChange,
  timeZone = getLocalTimeZone(),
  step = 15,
  dayStart = 0,
  dayEnd = 24,
  scrollToHour = 8,
  onEventChange,
  onEventAction,
  onSlotAction,
  renderEvent,
  className,
  children,
  "aria-label": label,
}: EventCalendarProps) {
  const { locale } = useLocale();
  const [innerDate, setInnerDate] = useState<CalendarDate>(
    () => defaultDate ?? today(getLocalTimeZone()),
  );
  const [innerView, setInnerView] = useState<EventCalendarView>(defaultView);
  const [announcement, setAnnouncement] = useState("");
  const open = clamp(Math.round(dayStart), 0, 23);
  const close = clamp(Math.round(dayEnd), open + 1, 24);
  const currentDate = date ?? innerDate;
  const currentView = view ?? innerView;
  const days = useMemo(() => {
    if (currentView === "day") return [currentDate];
    const first = startOfWeek(currentDate, locale);
    return Array.from({ length: 7 }, (_, index) => first.add({ days: index }));
  }, [currentDate, locale, currentView]);

  const weekdayShort = useDateFormatter({ weekday: "short", timeZone });
  const weekdayLong = useDateFormatter({ weekday: "long", timeZone });
  const monthDay = useDateFormatter({
    month: "short",
    day: "numeric",
    timeZone,
  });
  const year = useDateFormatter({ year: "numeric", timeZone });
  const fullDate = useDateFormatter({
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone,
  });
  const time = useDateFormatter({
    hour: "numeric",
    minute: "2-digit",
    timeZone,
  });
  const hour = useDateFormatter({ hour: "numeric", timeZone });

  const title =
    currentView === "day"
      ? fullDate.format(days[0].toDate(timeZone))
      : `${monthDay.format(days[0].toDate(timeZone))} – ${monthDay.format(
          days[days.length - 1].toDate(timeZone),
        )}, ${year.format(days[days.length - 1].toDate(timeZone))}`;

  const dayLabel = (day: CalendarDate) => fullDate.format(day.toDate(timeZone));
  const timeLabel = (day: CalendarDate, minutes: number) =>
    time.format(atMinute(day, minutes, timeZone));
  const timeRange = (
    day: CalendarDate,
    startMinutes: number,
    endMinutes: number,
  ) =>
    mergeDayPeriods(timeLabel(day, startMinutes), timeLabel(day, endMinutes));
  const eventTime = (event: CalendarEvent) => {
    const start = toZoned(event.start, timeZone);
    const end = toZoned(event.end, timeZone);
    return mergeDayPeriods(
      timeLabel(toCalendarDate(start), start.hour * 60 + start.minute),
      timeLabel(toCalendarDate(end), end.hour * 60 + end.minute),
    );
  };

  const context: EventCalendarContextValue = {
    view: currentView,
    days,
    title,
    timeZone,
    step: Math.max(1, Math.round(step)),
    dayStart: open,
    dayEnd: close,
    scrollToHour,
    events,
    label,
    onEventChange,
    onEventAction,
    onSlotAction,
    renderEvent,
    goTo: (next) => {
      if (date === undefined) setInnerDate(next);
      onDateChange?.(next);
    },
    changeView: (next) => {
      if (view === undefined) setInnerView(next);
      onViewChange?.(next);
    },
    eventLabel: (event, day) =>
      `${event.label ?? `${event.title} ${eventTime(event)}`}, ${dayLabel(day)}`,
    eventTime,
    timeLabel,
    hourLabel: (day: CalendarDate, hourOfDay: number) =>
      hour.format(atMinute(day, hourOfDay * 60, timeZone)),
    timeRange,
    dayLabel,
    weekday: (day: CalendarDate) => weekdayLong.format(day.toDate(timeZone)),
    weekdayShort: (day: CalendarDate) =>
      weekdayShort.format(day.toDate(timeZone)),
    announce: setAnnouncement,
  };

  return (
    <EventCalendarContext.Provider value={context}>
      <div
        data-slot="event-calendar"
        data-view={currentView}
        className={cn(
          "relative w-full max-w-full overflow-hidden rounded-xl border border-border/70 bg-card text-foreground [--event-calendar-gutter:4.5rem] [--event-calendar-hour:3rem]",
          className,
        )}
      >
        {children ?? (
          <>
            <EventCalendarHeader />
            <EventCalendarGrid />
          </>
        )}
        <p
          data-slot="event-calendar-status"
          role="status"
          aria-live="polite"
          className="sr-only"
        >
          {announcement}
        </p>
      </div>
    </EventCalendarContext.Provider>
  );
}

export interface EventCalendarHeaderProps {
  children?: ReactNode;
  className?: string;
}

export function EventCalendarHeader({
  children,
  className,
}: EventCalendarHeaderProps) {
  const calendar = useEventCalendarContext();
  const step = calendar.view === "day" ? { days: 1 } : { weeks: 1 };
  const previous = calendar.days[0].subtract(step);
  const next = calendar.days[0].add(step);
  const labels =
    calendar.view === "day"
      ? { previous: "Previous day", next: "Next day" }
      : { previous: "Previous week", next: "Next week" };

  return (
    <div
      data-slot="event-calendar-header"
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-border/70 px-3 py-2.5",
        className,
      )}
    >
      {children ?? (
        <>
          <h2
            data-slot="event-calendar-title"
            aria-live="polite"
            className="min-w-0 flex-1 basis-40 truncate text-sm font-semibold tracking-[-0.01em]"
          >
            {calendar.title}
          </h2>
          <div className="flex flex-wrap items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onPress={() => calendar.goTo(today(calendar.timeZone))}
            >
              Today
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconOnly
              aria-label={labels.previous}
              onPress={() => calendar.goTo(previous)}
            >
              <CaretLeftIcon aria-hidden="true" className="rtl:rotate-180" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconOnly
              aria-label={labels.next}
              onPress={() => calendar.goTo(next)}
            >
              <CaretRightIcon aria-hidden="true" className="rtl:rotate-180" />
            </Button>
            <ToggleButtonGroup
              aria-label="Calendar view"
              size="sm"
              selectionMode="single"
              disallowEmptySelection
              selectedKeys={[calendar.view]}
              onSelectionChange={(keys) => {
                const [key] = keys;
                if (key === "day" || key === "week") calendar.changeView(key);
              }}
            >
              <ToggleButton id="day">Day</ToggleButton>
              <ToggleButton id="week">Week</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </>
      )}
    </div>
  );
}

interface DragSession {
  kind: DragKind;
  event: CalendarEvent;
  part: CalendarEventLayout;
  originDay: number;
  dayIndex: number;
  startMinute: number;
  endMinute: number;
  pointerStartX: number;
  pointerStartY: number;
  pointerX: number;
  pointerY: number;
  travel: number;
  active: boolean;
  grabOffsetY: number;
  partDuration: number;
  duration: number;
}

type DragKind = "move" | "resize";

interface DragController {
  begin: (
    kind: DragKind,
    event: CalendarEvent,
    part: CalendarEventLayout,
    dayIndex: number,
    clientX: number,
    clientY: number,
  ) => void;
  move: (deltaX: number, deltaY: number) => void;
  end: () => void;
  cancel: () => void;
  suppressClick: () => boolean;
}

export interface EventCalendarGridProps {
  children?: ReactNode;
  className?: string;
}

export function EventCalendarGrid({
  children,
  className,
}: EventCalendarGridProps) {
  const calendar = useEventCalendarContext();
  const gridRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const ghostRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef<DragSession | null>(null);
  const columnRectsRef = useRef<{ left: number; width: number }[]>([]);
  const autoScrollRef = useRef<number | null>(null);
  const suppressClickRef = useRef(0);
  const [drag, setDrag] = useState<{ id: string; kind: DragKind } | null>(null);
  const endDragRef = useRef<(commit: boolean) => void>(() => {});
  const stopAutoScrollRef = useRef<() => void>(() => {});
  const { dayStart, dayEnd, days, timeZone } = calendar;
  const totalHeight = (dayEnd - dayStart) * eventCalendarHourHeight;
  const hours = Array.from(
    { length: dayEnd - dayStart + 1 },
    (_, index) => dayStart + index,
  );
  const halfHours = hours.slice(0, -1);
  const currentTime = useCurrentTime(calendar.timeZone);
  const todayValue = currentTime ? toCalendarDate(currentTime) : null;

  const dayEvents = useMemo(
    () =>
      days.map((day) => {
        const parts: CalendarDayEvent[] = [];
        for (const event of calendar.events) {
          const part = eventPart(
            event,
            day,
            calendar.timeZone,
            dayStart,
            dayEnd,
          );
          if (part) parts.push(part);
        }
        return { day, layout: layoutDayEvents(parts) };
      }),
    [calendar.events, calendar.timeZone, dayEnd, dayStart, days],
  );

  const scrollTo = calendar.scrollToHour;
  useLayoutEffect(() => {
    const node = gridRef.current;
    if (!node) return;
    const header = node.querySelector<HTMLElement>(
      '[data-slot="event-calendar-days"]',
    );
    const offset = header?.offsetHeight ?? 0;
    node.scrollTop = Math.max(
      0,
      (scrollTo - dayStart) * eventCalendarHourHeight - offset,
    );
  }, [dayStart, scrollTo]);

  const updateDrag = () => {
    const session = sessionRef.current;
    const columns = columnsRef.current;
    if (!session || !columns) return;
    const rect = columns.getBoundingClientRect();
    const step = calendar.step;
    const startBound = dayStart * 60;
    const endBound = dayEnd * 60;
    if (session.kind === "move") {
      let start =
        (session.pointerY - rect.top - session.grabOffsetY) / minuteHeight +
        startBound;
      start = snap(start, step);
      start = clamp(start, startBound, endBound - session.partDuration);
      session.startMinute = start - startBound;
      let day = columnRectsRef.current.findIndex(
        (column) =>
          session.pointerX >= column.left &&
          session.pointerX < column.left + column.width,
      );
      if (day < 0) {
        day =
          session.pointerX < (columnRectsRef.current[0]?.left ?? 0)
            ? 0
            : days.length - 1;
      }
      session.dayIndex = day;
      const ghost = ghostRef.current;
      const from = columnRectsRef.current[session.originDay];
      const to = columnRectsRef.current[day];
      if (ghost && from && to) {
        const dx = to.left - from.left;
        const dy =
          (session.startMinute - session.part.startMinute) * minuteHeight;
        ghost.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      }
    } else {
      let end = (session.pointerY - rect.top) / minuteHeight + startBound;
      end = snap(end, step);
      end = clamp(end, session.part.startMinute + startBound + step, endBound);
      session.endMinute = end - startBound;
      const ghost = ghostRef.current;
      if (ghost) {
        ghost.style.height = `${Math.max(
          minimumEventHeight,
          (session.endMinute - session.part.startMinute) * minuteHeight,
        )}px`;
      }
    }
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current !== null) {
      cancelAnimationFrame(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  const startAutoScroll = () => {
    stopAutoScroll();
    const loop = () => {
      const scroller = gridRef.current;
      const session = sessionRef.current;
      if (!scroller || !session) {
        autoScrollRef.current = null;
        return;
      }
      const rect = scroller.getBoundingClientRect();
      const edge = 40;
      let delta = 0;
      if (session.pointerY < rect.top + edge) {
        delta = -Math.ceil(((rect.top + edge - session.pointerY) / edge) * 12);
      } else if (session.pointerY > rect.bottom - edge) {
        delta = Math.ceil(
          ((session.pointerY - (rect.bottom - edge)) / edge) * 12,
        );
      }
      if (delta !== 0) {
        scroller.scrollTop += clamp(delta, -12, 12);
        updateDrag();
      }
      autoScrollRef.current = requestAnimationFrame(loop);
    };
    autoScrollRef.current = requestAnimationFrame(loop);
  };

  const endDrag = (commit: boolean) => {
    const session = sessionRef.current;
    sessionRef.current = null;
    stopAutoScroll();
    if (!session) return;
    setDrag(null);
    if (!session.active || !commit || !calendar.onEventChange) return;
    const timeZone = calendar.timeZone;
    if (session.kind === "move") {
      const dayDelta = session.dayIndex - session.originDay;
      const minuteDelta = session.startMinute - session.part.startMinute;
      if (dayDelta === 0 && minuteDelta === 0) return;
      const start = toZoned(session.event.start, timeZone)
        .add({ days: dayDelta })
        .add({ minutes: minuteDelta });
      calendar.onEventChange(session.event, {
        start,
        end: start.add({ minutes: session.duration }),
      });
    } else {
      const minuteDelta = session.endMinute - session.part.endMinute;
      if (minuteDelta === 0) return;
      calendar.onEventChange(session.event, {
        start: session.event.start,
        end: toZoned(session.event.end, timeZone).add({
          minutes: minuteDelta,
        }),
      });
    }
  };

  const controller: DragController = {
    begin: (kind, event, part, dayIndex, clientX, clientY) => {
      if (event.isReadOnly || !calendar.onEventChange) return;
      const columns = columnsRef.current;
      const scroller = gridRef.current;
      if (!columns || !scroller) return;
      const rect = columns.getBoundingClientRect();
      columnRectsRef.current = days.map((_, index) => {
        const node = sectionsRef.current[index];
        if (!node) return { left: rect.left, width: rect.width / days.length };
        const box = node.getBoundingClientRect();
        return { left: box.left, width: box.width };
      });
      const start = toZoned(event.start, timeZone);
      const end = toZoned(event.end, timeZone);
      sessionRef.current = {
        kind,
        event,
        part,
        originDay: dayIndex,
        dayIndex,
        startMinute: part.startMinute,
        endMinute: part.endMinute,
        pointerStartX: clientX,
        pointerStartY: clientY,
        pointerX: clientX,
        pointerY: clientY,
        travel: 0,
        active: false,
        grabOffsetY: clientY - rect.top - part.top,
        partDuration: part.endMinute - part.startMinute,
        duration: Math.round(
          (toZoned(end, timeZone).toDate().getTime() -
            toZoned(start, timeZone).toDate().getTime()) /
            60_000,
        ),
      };
    },
    move: (deltaX, deltaY) => {
      const session = sessionRef.current;
      if (!session) return;
      session.travel += Math.hypot(deltaX, deltaY);
      session.pointerX += deltaX;
      session.pointerY += deltaY;
      if (!session.active) {
        if (session.travel < 4) return;
        session.active = true;
        suppressClickRef.current = Date.now();
        setDrag({ id: session.event.id, kind: session.kind });
        startAutoScroll();
      }
      updateDrag();
    },
    end: () => endDrag(true),
    cancel: () => endDrag(false),
    suppressClick: () => Date.now() - suppressClickRef.current < 400,
  };

  useLayoutEffect(() => {
    endDragRef.current = endDrag;
    stopAutoScrollRef.current = stopAutoScroll;
  });

  useEffect(() => {
    if (!drag) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      endDragRef.current(false);
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [drag]);

  useEffect(() => () => stopAutoScrollRef.current(), []);

  const applyGhost = (node: HTMLDivElement | null) => {
    ghostRef.current = node;
    if (!node) return;
    const session = sessionRef.current;
    if (!session) return;
    if (session.kind === "resize") {
      node.style.height = `${Math.max(
        minimumEventHeight,
        (session.endMinute - session.part.startMinute) * minuteHeight,
      )}px`;
      return;
    }
    const from = columnRectsRef.current[session.originDay];
    const to = columnRectsRef.current[session.dayIndex];
    const dx = from && to ? to.left - from.left : 0;
    const dy = (session.startMinute - session.part.startMinute) * minuteHeight;
    node.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
  };

  return (
    <section
      data-slot="event-calendar-grid"
      ref={gridRef}
      aria-label={calendar.label}
      className={cn(
        "relative h-96 overflow-auto overscroll-contain",
        className,
      )}
    >
      {children ?? (
        <div
          className={cn(calendar.view === "week" ? "min-w-[34rem]" : "min-w-0")}
        >
          <div
            data-slot="event-calendar-days"
            className="sticky top-0 z-30 flex border-b border-border/70 bg-card"
          >
            <div
              aria-hidden="true"
              className="sticky start-0 z-10 w-(--event-calendar-gutter) shrink-0 bg-card"
            />
            <div
              className="grid flex-1"
              style={{
                gridTemplateColumns: `repeat(${days.length}, minmax(0, 1fr))`,
              }}
            >
              {days.map((day) => {
                const isToday = todayValue ? isSameDay(day, todayValue) : false;
                return (
                  <div
                    key={day.toString()}
                    data-slot="event-calendar-day-label"
                    data-today={isToday || undefined}
                    className="flex min-w-0 flex-col items-center gap-0.5 py-1.5"
                  >
                    <span className="truncate text-xs text-muted-foreground">
                      {calendar.weekdayShort(day)}
                    </span>
                    <span
                      className={cn(
                        "grid size-6 place-items-center rounded-full text-sm font-medium tabular-nums",
                        isToday && "bg-primary text-primary-foreground",
                      )}
                    >
                      {day.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            data-slot="event-calendar-body"
            className="relative flex"
            style={{ height: `${totalHeight}px` }}
          >
            <div
              data-slot="event-calendar-gutter"
              aria-hidden="true"
              className="sticky start-0 z-20 w-(--event-calendar-gutter) shrink-0 bg-card text-xs tabular-nums text-muted-foreground"
            >
              {hours.map((hourOfDay) => (
                <span
                  key={hourOfDay}
                  className="absolute end-2 -translate-y-1/2"
                  style={{
                    top: `${(hourOfDay - dayStart) * eventCalendarHourHeight}px`,
                  }}
                >
                  {calendar.hourLabel(days[0], hourOfDay)}
                </span>
              ))}
            </div>
            <div
              data-slot="event-calendar-columns"
              ref={columnsRef}
              className="relative isolate grid flex-1"
              style={{
                gridTemplateColumns: `repeat(${days.length}, minmax(0, 1fr))`,
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10"
              >
                {hours.map((hour) => (
                  <div
                    key={hour}
                    data-slot="event-calendar-hour-line"
                    className="absolute inset-x-0 border-t border-border/70"
                    style={{
                      top: `${(hour - dayStart) * eventCalendarHourHeight}px`,
                    }}
                  />
                ))}
                {halfHours.map((hour) => (
                  <div
                    key={hour}
                    data-slot="event-calendar-half-hour-line"
                    className="absolute inset-x-0 border-t border-dashed border-border/40"
                    style={{
                      top: `${(hour - dayStart) * eventCalendarHourHeight + eventCalendarHourHeight / 2}px`,
                    }}
                  />
                ))}
              </div>
              {dayEvents.map(({ day, layout }, dayIndex) => {
                const isToday = todayValue ? isSameDay(day, todayValue) : false;
                const nowMinute = currentTime
                  ? currentTime.hour * 60 + currentTime.minute - dayStart * 60
                  : -1;
                return (
                  <section
                    key={day.toString()}
                    data-slot="event-calendar-day"
                    aria-label={calendar.dayLabel(day)}
                    ref={(node) => {
                      sectionsRef.current[dayIndex] = node;
                    }}
                    className="relative min-w-0 border-s border-border/70 first:border-s-0"
                  >
                    {calendar.onSlotAction && (
                      <div
                        data-slot="event-calendar-slots"
                        aria-hidden="true"
                        className="absolute inset-0 cursor-pointer"
                        onClick={(pointer) => {
                          const rect =
                            pointer.currentTarget.getBoundingClientRect();
                          const minutes = clamp(
                            snap(
                              (pointer.clientY - rect.top) / minuteHeight,
                              calendar.step,
                            ),
                            0,
                            (dayEnd - dayStart) * 60 - calendar.step,
                          );
                          const start = toZoned(
                            new CalendarDateTime(
                              day.year,
                              day.month,
                              day.day,
                              dayStart + Math.floor(minutes / 60),
                              minutes % 60,
                            ),
                            timeZone,
                          );
                          calendar.onSlotAction?.({
                            start,
                            end: start.add({ minutes: calendar.step }),
                          });
                        }}
                      />
                    )}
                    {isToday &&
                      nowMinute >= 0 &&
                      nowMinute <= (dayEnd - dayStart) * 60 && (
                        <div
                          data-slot="event-calendar-now"
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-x-0 z-20 h-0.5 bg-foreground transition-[top] duration-500 ease-out-quint motion-reduce:transition-none"
                          style={{ top: `${nowMinute * minuteHeight}px` }}
                        >
                          <span className="absolute -start-1 top-1/2 size-2 -translate-y-1/2 rounded-full bg-foreground" />
                        </div>
                      )}
                    {layout.map((part) => (
                      <CalendarEventPill
                        key={part.event.id}
                        event={part.event}
                        part={part}
                        day={day}
                        dayIndex={dayIndex}
                        controller={controller}
                        isDragging={drag?.id === part.event.id}
                      />
                    ))}
                    {layout
                      .filter((part) => drag?.id === part.event.id)
                      .map((part) => (
                        <div
                          key={`${part.event.id}-ghost`}
                          ref={applyGhost}
                          data-slot="event-calendar-ghost"
                          aria-hidden="true"
                          className={cn(
                            "absolute z-30",
                            eventSurfaceClass,
                            eventCalendarColorStyles[
                              part.event.color ?? "default"
                            ],
                            "pointer-events-none opacity-80 shadow-(--shadow-float)",
                          )}
                          style={{
                            top: `${part.top}px`,
                            height: `${part.height}px`,
                            insetInlineStart: `${(part.column / part.columns) * 100}%`,
                            width: `calc(${100 / part.columns}% - 2px)`,
                          }}
                        >
                          <EventCalendarEventBody
                            event={part.event}
                            time={calendar.eventTime(part.event)}
                            showTime={part.height >= 36}
                            renderEvent={calendar.renderEvent}
                          />
                        </div>
                      ))}
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function EventCalendarEventBody({
  event,
  time,
  showTime,
  renderEvent,
}: {
  event: CalendarEvent;
  time: string;
  showTime: boolean;
  renderEvent?: (event: CalendarEvent) => ReactNode;
}) {
  return (
    <div
      data-slot="event-calendar-event-body"
      aria-hidden="true"
      className="px-2 py-1"
    >
      {renderEvent ? (
        renderEvent(event)
      ) : (
        <>
          <span className="block truncate font-medium">{event.title} </span>
          {showTime && (
            <span
              data-slot="event-calendar-time"
              className="block truncate text-muted-foreground"
            >
              {time}
            </span>
          )}
        </>
      )}
    </div>
  );
}

function CalendarEventPill({
  event,
  part,
  day,
  dayIndex,
  controller,
  isDragging,
}: {
  event: CalendarEvent;
  part: CalendarEventLayout;
  day: CalendarDate;
  dayIndex: number;
  controller: DragController;
  isDragging: boolean;
}) {
  const calendar = useEventCalendarContext();
  const { direction } = useLocale();
  const editable = !event.isReadOnly && Boolean(calendar.onEventChange);
  const move = useMove({
    onMove: (event_) => controller.move(event_.deltaX, event_.deltaY),
    onMoveEnd: () => controller.end(),
  });
  const resize = useMove({
    onMove: (event_) => controller.move(event_.deltaX, event_.deltaY),
    onMoveEnd: () => controller.end(),
  });
  const timeZone = calendar.timeZone;
  const step = calendar.step;
  const startBound = calendar.dayStart * 60;
  const endBound = calendar.dayEnd * 60;

  const commit = (start: ZonedDateTime, end: ZonedDateTime) =>
    calendar.onEventChange?.(event, { start, end });

  const onKeyDown = (keyboard: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!editable || !keyboard.altKey || keyboard.metaKey || keyboard.ctrlKey)
      return;
    const vertical =
      keyboard.key === "ArrowUp" ? -1 : keyboard.key === "ArrowDown" ? 1 : 0;
    const horizontal =
      keyboard.key === "ArrowLeft" ? -1 : keyboard.key === "ArrowRight" ? 1 : 0;
    if (!vertical && !horizontal) return;
    keyboard.preventDefault();
    keyboard.stopPropagation();
    const start = toZoned(event.start, timeZone);
    const dayDelta =
      horizontal === 0 ? 0 : horizontal * (direction === "rtl" ? -1 : 1);
    if (keyboard.shiftKey) {
      if (vertical === 0) return;
      const duration = clamp(
        part.endMinute - part.startMinute + vertical * step,
        step,
        endBound - part.startMinute,
      );
      if (duration === part.endMinute - part.startMinute) return;
      commit(start, start.add({ minutes: duration }));
      calendar.announce(
        `Resized to ${calendar.timeRange(
          day,
          part.startMinute,
          part.startMinute + duration,
        )} on ${calendar.weekday(day)}`,
      );
      return;
    }
    if (dayDelta !== 0) {
      const nextDay = calendar.days[dayIndex + dayDelta] ?? day;
      const moved = start.add({ days: dayDelta });
      commit(moved, moved.add({ minutes: part.endMinute - part.startMinute }));
      calendar.announce(
        `Moved to ${calendar.weekday(nextDay)}, ${calendar.timeRange(
          nextDay,
          part.startMinute,
          part.endMinute,
        )}`,
      );
      return;
    }
    const nextStart = clamp(
      part.startMinute + vertical * step,
      0,
      endBound - startBound - (part.endMinute - part.startMinute),
    );
    if (nextStart === part.startMinute) return;
    const delta = nextStart - part.startMinute;
    const moved = start.add({ minutes: delta });
    commit(moved, moved.add({ minutes: part.endMinute - part.startMinute }));
    calendar.announce(
      `Moved to ${calendar.weekday(day)}, ${calendar.timeRange(
        day,
        nextStart,
        nextStart + (part.endMinute - part.startMinute),
      )}`,
    );
  };

  return (
    <button
      type="button"
      data-slot="event-calendar-event"
      data-event-id={event.id}
      data-color={event.color ?? "default"}
      data-read-only={event.isReadOnly || undefined}
      aria-label={calendar.eventLabel(event, day)}
      className={cn(
        "absolute",
        eventSurfaceClass,
        eventCalendarColorStyles[event.color ?? "default"],
        "outline-offset-4 outline-transparent transition-[opacity,outline-color,outline-offset] duration-150 ease-out-quint focus-visible:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2",
        editable ? "cursor-grab touch-none active:cursor-grabbing" : "",
        isDragging ? "opacity-40" : "",
      )}
      style={{
        top: `${part.top}px`,
        height: `${part.height}px`,
        insetInlineStart: `${(part.column / part.columns) * 100}%`,
        width: `calc(${100 / part.columns}% - 2px)`,
      }}
      onClick={(pointer) => {
        const target = pointer.target as HTMLElement;
        if (target.closest('[data-slot="event-calendar-resize"]')) return;
        if (controller.suppressClick()) return;
        calendar.onEventAction?.(event);
      }}
      onPointerDownCapture={(pointer) => {
        if (!editable || pointer.button !== 0) return;
        const target = pointer.target as HTMLElement;
        if (target.closest('[data-slot="event-calendar-resize"]')) return;
        pointer.currentTarget.focus({ preventScroll: true });
        controller.begin(
          "move",
          event,
          part,
          dayIndex,
          pointer.clientX,
          pointer.clientY,
        );
      }}
      {...(editable ? move.moveProps : {})}
      onKeyDown={onKeyDown}
    >
      <EventCalendarEventBody
        event={event}
        time={calendar.eventTime(event)}
        showTime={part.height >= 36}
        renderEvent={calendar.renderEvent}
      />
      {editable && (
        <span
          data-slot="event-calendar-resize"
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1.5 cursor-ns-resize touch-none"
          onPointerDown={(pointer) => {
            if (pointer.button !== 0) return;
            pointer.stopPropagation();
            controller.begin(
              "resize",
              event,
              part,
              dayIndex,
              pointer.clientX,
              pointer.clientY,
            );
            resize.moveProps.onPointerDown?.(pointer);
          }}
        />
      )}
    </button>
  );
}

function eventPart(
  event: CalendarEvent,
  day: CalendarDate,
  timeZone: string,
  dayStart: number,
  dayEnd: number,
): CalendarDayEvent | null {
  const start = toZoned(event.start, timeZone);
  const end = toZoned(event.end, timeZone);
  const startDate = toCalendarDate(start);
  const endDate = toCalendarDate(end);
  if (day.compare(startDate) < 0 || day.compare(endDate) > 0) return null;
  const startMinute =
    day.compare(startDate) === 0 ? start.hour * 60 + start.minute : 0;
  const endMinute =
    day.compare(endDate) === 0 ? end.hour * 60 + end.minute : 24 * 60;
  const from = Math.max(startMinute, dayStart * 60);
  const to = Math.min(endMinute, dayEnd * 60);
  if (to <= from) return null;
  return {
    event,
    startMinute: from - dayStart * 60,
    endMinute: to - dayStart * 60,
  };
}
