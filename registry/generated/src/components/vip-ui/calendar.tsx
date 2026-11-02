"use client";

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import {
  useContext,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import { mergeRefs } from "react-aria/mergeRefs";
import {
  Calendar as AriaCalendar,
  CalendarGridBody as AriaCalendarGridBody,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  CalendarCell,
  CalendarGrid,
  type CalendarGridBodyProps,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarHeading,
  type CalendarProps,
  CalendarStateContext,
  composeRenderProps,
  type DateValue,
  RangeCalendarStateContext,
} from "react-aria-components";
import { cn } from "./utils";
import { Button } from "./button";
import { itemHighlightRing, withItemHighlight } from "./item-highlight";

export const calendarStyles = "w-77 max-w-full text-foreground";
export const calendarGridStyles =
  "w-full table-fixed border-separate border-spacing-0 text-center";
export const calendarCells =
  "[role=gridcell] > [role=button]:not([data-unavailable])";

export const calendarHeaderCellStyles =
  "pb-1 text-xs font-medium text-muted-foreground";

export const calendarCellBaseClass =
  "relative grid aspect-square w-full cursor-pointer place-items-center text-sm tabular-nums outline-none transition-colors duration-150 ease-out-quint data-today:after:absolute data-today:after:bottom-1 data-today:after:size-1 data-today:after:rounded-full data-today:after:bg-primary selected:data-today:after:bg-current outside-month:text-muted-foreground/50 unavailable:cursor-not-allowed unavailable:text-muted-foreground unavailable:line-through disabled:cursor-default disabled:text-muted-foreground/50 focus-visible:outline-2 focus-visible:outline-solid focus-visible:z-10 focus-visible:outline-offset-2 focus-visible:outline-ring forced-colors:border-2 forced-colors:border-[Canvas] forced-colors:data-today:after:bg-[CanvasText] forced-colors:outside-month:text-[GrayText] forced-colors:disabled:text-[GrayText]";

export const calendarCellClass = `${calendarCellBaseClass} rounded-md selected:bg-primary selected:text-primary-foreground invalid:selected:bg-destructive invalid:selected:text-destructive-foreground forced-colors:selected:border-[Highlight]`;

export function Calendar<T extends DateValue>({
  className,
  children,
  render,
  ...props
}: CalendarProps<T> & React.RefAttributes<HTMLDivElement>) {
  return (
    <AriaCalendar
      {...props}
      data-slot="calendar"
      render={withItemHighlight(render, { items: calendarCells })}
      className={composeRenderProps(className, (className) =>
        cn(calendarStyles, className),
      )}
    >
      {children ?? (
        <>
          <CalendarHeader />
          <CalendarGrid className={calendarGridStyles} weekdayStyle="short">
            <CalendarGridHeader>
              {(day) => (
                <CalendarHeaderCell className={calendarHeaderCellStyles}>
                  {day}
                </CalendarHeaderCell>
              )}
            </CalendarGridHeader>
            <CalendarGridBody>
              {(date) => (
                <CalendarCell date={date} className={calendarCellClass} />
              )}
            </CalendarGridBody>
          </CalendarGrid>
        </>
      )}
    </AriaCalendar>
  );
}

export function CalendarHeader() {
  return (
    <div
      data-slot="calendar-header"
      className="mb-3 flex items-center justify-between gap-2"
    >
      <Button
        slot="previous"
        aria-label="Previous month"
        variant="ghost"
        iconOnly
      >
        <CaretLeftIcon aria-hidden="true" />
      </Button>
      <CalendarHeading className="min-w-0 text-center text-sm font-semibold [overflow-wrap:anywhere] [text-wrap:balance]" />
      <Button slot="next" aria-label="Next month" variant="ghost" iconOnly>
        <CaretRightIcon aria-hidden="true" />
      </Button>
    </div>
  );
}

export function CalendarGridBody(
  props: CalendarGridBodyProps & React.RefAttributes<HTMLTableSectionElement>,
) {
  const ref = useRef<HTMLTableSectionElement>(null);
  const calendar = useContext(CalendarStateContext);
  const range = useContext(RangeCalendarStateContext);
  const month = (calendar ?? range)?.visibleRange.start;
  const shown = useRef(month);

  useLayoutEffect(() => {
    const from = shown.current;
    shown.current = month;
    const body = ref.current;
    if (!body || !from || !month) return;
    const step = Math.sign(month.compare(from));
    if (!step) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const side = getComputedStyle(body).direction === "rtl" ? -1 : 1;
    body.animate(
      still
        ? { opacity: [0, 1] }
        : {
            opacity: [0, 1],
            transform: [`translateX(${step * side * 0.75}rem)`, "none"],
          },
      { duration: still ? 120 : 260, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
    );
  }, [month]);

  return <AriaCalendarGridBody {...props} ref={mergeRefs(ref, props.ref)} />;
}

const narrowQuery = "(max-width: 639px)";

function subscribeToNarrow(onChange: () => void) {
  const media = window.matchMedia(narrowQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function isNarrowViewport() {
  return window.matchMedia(narrowQuery).matches;
}

export interface CalendarPresetsProps {
  presets: readonly string[];
  selected: string | null;
  onSelect: (preset: string) => void;
  "aria-label"?: string;
  className?: string;
}

export function CalendarPresets({
  presets,
  selected,
  onSelect,
  className,
  ...props
}: CalendarPresetsProps) {
  const narrow = useSyncExternalStore(
    subscribeToNarrow,
    isNarrowViewport,
    () => false,
  );
  return (
    <AriaListBox
      aria-label={props["aria-label"] ?? "Presets"}
      data-slot="calendar-presets"
      orientation={narrow ? "horizontal" : "vertical"}
      selectionMode="single"
      disallowEmptySelection
      selectedKeys={selected === null ? [] : [selected]}
      onSelectionChange={(keys) => {
        if (keys === "all") return;
        const [key] = keys;
        if (key !== undefined) onSelect(String(key));
      }}
      items={presets.map((preset) => ({ id: preset }))}
      render={withItemHighlight(undefined, { ring: true })}
      className={cn(
        "flex shrink-0 gap-1 border-border/70 outline-none max-sm:-mx-3 max-sm:-mt-3 max-sm:mb-3 max-sm:w-0 max-sm:min-w-[calc(100%+1.5rem)] max-sm:overflow-x-auto max-sm:overscroll-x-contain max-sm:border-b max-sm:p-1.5 max-sm:[scrollbar-width:none] sm:-my-3 sm:-ms-3 sm:me-3 sm:w-40 sm:flex-col sm:border-e sm:p-1.5",
        className,
      )}
    >
      {(item) => (
        <AriaListBoxItem
          id={item.id}
          textValue={item.id}
          data-slot="calendar-preset"
          className={cn(
            "flex min-h-11 shrink-0 cursor-pointer items-center rounded-md px-3 text-sm whitespace-nowrap text-foreground outline-none transition-colors duration-150 ease-out-quint selected:bg-accent selected:font-medium selected:text-accent-foreground sm:whitespace-normal",
            itemHighlightRing,
          )}
        >
          {item.id}
        </AriaListBoxItem>
      )}
    </AriaListBox>
  );
}
