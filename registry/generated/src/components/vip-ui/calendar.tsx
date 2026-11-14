"use client";

import {
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "@phosphor-icons/react";
import {
  type ReactElement,
  type ReactNode,
  type RefObject,
  useContext,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import {
  Calendar as AriaCalendar,
  CalendarGrid as AriaCalendarGrid,
  CalendarGridBody as AriaCalendarGridBody,
  type CalendarGridProps as AriaCalendarGridProps,
  CalendarMonthPicker as AriaCalendarMonthPicker,
  type CalendarMonthPickerProps as AriaCalendarMonthPickerProps,
  CalendarYearPicker as AriaCalendarYearPicker,
  type CalendarYearPickerProps as AriaCalendarYearPickerProps,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  Select as AriaSelect,
  SelectValue as AriaSelectValue,
  CalendarCell,
  type CalendarGridBodyProps,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarHeading,
  type CalendarProps,
  CalendarStateContext,
  composeRenderProps,
  type DateValue,
  type Key,
  RangeCalendarStateContext,
} from "react-aria-components";
import { cn } from "./utils";
import { Button } from "./button";
import { fieldChevronStyles } from "./field-styles";
import { itemHighlightRing, withItemHighlight } from "./item-highlight";
import { SelectContent, SelectItem } from "./select";

export const calendarStyles = "w-77 max-w-full text-foreground";
export const calendarMonthsStyles = "w-auto";
export const calendarGridStyles =
  "w-full table-fixed border-separate border-spacing-0 text-center";
export const calendarCells =
  "[role=gridcell] > [role=button]:not([data-unavailable])";

export const calendarHeaderCellStyles =
  "pb-1 text-xs font-medium text-muted-foreground";

export const calendarCellBaseClass =
  "relative grid in-data-months:outside-month:invisible aspect-square w-full cursor-pointer place-items-center text-sm tabular-nums outline-none transition-colors duration-150 ease-out-quint data-today:after:absolute data-today:after:bottom-1 data-today:after:size-1 data-today:after:rounded-full data-today:after:bg-primary selected:data-today:after:bg-current outside-month:text-muted-foreground/50 unavailable:cursor-not-allowed unavailable:text-muted-foreground unavailable:line-through disabled:cursor-default disabled:text-muted-foreground/50 focus-visible:outline-2 focus-visible:outline-solid focus-visible:z-10 focus-visible:outline-offset-2 focus-visible:outline-ring forced-colors:border-2 forced-colors:border-[Canvas] forced-colors:data-today:after:bg-[CanvasText] forced-colors:outside-month:text-[GrayText] forced-colors:disabled:text-[GrayText]";

export const calendarCellClass = `${calendarCellBaseClass} rounded-md transition-[color,background-color,scale] motion-safe:pressed:scale-90 selected:bg-primary selected:text-primary-foreground invalid:selected:bg-destructive invalid:selected:text-background forced-colors:selected:border-[Highlight]`;

export function Calendar<T extends DateValue>({
  className,
  children,
  render,
  ...props
}: CalendarProps<T> & React.RefAttributes<HTMLDivElement>) {
  const months = Math.max(1, props.visibleDuration?.months ?? 1);
  return (
    <AriaCalendar
      {...props}
      data-slot="calendar"
      data-months={months > 1 ? months : undefined}
      render={withItemHighlight(render, { items: calendarCells })}
      className={composeRenderProps(className, (className) =>
        cn(calendarStyles, months > 1 && calendarMonthsStyles, className),
      )}
    >
      {children ?? (
        <CalendarMonths count={months}>
          {(offset) => (
            <CalendarGrid offset={offset ? { months: offset } : undefined} />
          )}
        </CalendarMonths>
      )}
    </AriaCalendar>
  );
}

export interface CalendarGridProps
  extends Omit<AriaCalendarGridProps, "children"> {
  children?: Extract<
    AriaCalendarGridProps["children"],
    (...args: never[]) => ReactElement
  >;
}

export function CalendarGrid({
  className,
  children,
  weekdayStyle = "short",
  ...props
}: CalendarGridProps & React.RefAttributes<HTMLTableElement>) {
  return (
    <CalendarGridFrame>
      <AriaCalendarGrid
        {...props}
        data-slot="calendar-grid"
        weekdayStyle={weekdayStyle}
        className={cn(calendarGridStyles, className)}
      >
        <CalendarGridHeader>
          {(day) => (
            <CalendarHeaderCell className={calendarHeaderCellStyles}>
              {day}
            </CalendarHeaderCell>
          )}
        </CalendarGridHeader>
        <CalendarGridBody>
          {children ??
            ((date) => (
              <CalendarCell date={date} className={calendarCellClass} />
            ))}
        </CalendarGridBody>
      </AriaCalendarGrid>
    </CalendarGridFrame>
  );
}

export function CalendarMonths({
  count,
  children,
}: {
  count: number;
  children: (offset: number) => ReactNode;
}) {
  if (count <= 1) {
    return (
      <>
        <CalendarHeader />
        {children(0)}
      </>
    );
  }
  return (
    <div data-slot="calendar-months" className="flex flex-wrap gap-x-6 gap-y-4">
      {Array.from({ length: count }, (_, index) => index).map((offset) => (
        <div key={offset} className="w-77 max-w-full">
          <CalendarHeader
            offset={offset}
            previous={offset === 0}
            next={offset === count - 1}
          />
          {children(offset)}
        </div>
      ))}
    </div>
  );
}

export function CalendarGridFrame({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useMonthSlide(ref, 0.75);
  return (
    <div ref={ref} data-slot="calendar-grid-frame" className="relative isolate">
      {children}
    </div>
  );
}

function useMonthSlide(ref: RefObject<HTMLElement | null>, distance: number) {
  const calendar = useContext(CalendarStateContext);
  const range = useContext(RangeCalendarStateContext);
  const month = (calendar ?? range)?.visibleRange.start;
  const shown = useRef(month);

  useLayoutEffect(() => {
    const from = shown.current;
    shown.current = month;
    const node = ref.current;
    if (!node || !from || !month) return;
    const step = Math.sign(month.compare(from));
    if (!step) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const side = getComputedStyle(node).direction === "rtl" ? -1 : 1;
    node.animate(
      still
        ? { opacity: [0, 1] }
        : {
            opacity: [0, 1],
            transform: [`translateX(${step * side * distance}rem)`, "none"],
          },
      { duration: still ? 120 : 260, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
    );
  }, [month, ref, distance]);
}

export interface CalendarHeaderProps {
  offset?: number;
  previous?: boolean;
  next?: boolean;
  children?: ReactNode;
}

export function CalendarHeader({
  offset = 0,
  previous = true,
  next = true,
  children,
}: CalendarHeaderProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useMonthSlide(headingRef, 0.375);
  return (
    <div
      data-slot="calendar-header"
      className="mb-3 flex items-center justify-between gap-2"
    >
      {previous ? (
        <Button
          slot="previous"
          aria-label="Previous month"
          variant="ghost"
          iconOnly
        >
          <CaretLeftIcon aria-hidden="true" className="rtl:rotate-180" />
        </Button>
      ) : (
        <span aria-hidden="true" className="size-11 shrink-0" />
      )}
      {children ? (
        <div
          data-slot="calendar-pickers"
          className="flex min-w-0 flex-1 items-center justify-center gap-1"
        >
          {children}
        </div>
      ) : (
        <CalendarHeading
          ref={headingRef}
          offset={offset ? { months: offset } : undefined}
          className="min-w-0 text-center text-sm font-semibold wrap-anywhere text-balance"
        />
      )}
      {next ? (
        <Button slot="next" aria-label="Next month" variant="ghost" iconOnly>
          <CaretRightIcon aria-hidden="true" className="rtl:rotate-180" />
        </Button>
      ) : (
        <span aria-hidden="true" className="size-11 shrink-0" />
      )}
    </div>
  );
}

interface CalendarPickerItem {
  id: number;
  formatted: string;
}

interface CalendarPickerSelectProps {
  "aria-label": string;
  value: Key;
  onChange: (key: Key | null) => void;
  items: CalendarPickerItem[];
  className?: string;
}

function centerSelectedOption(content: HTMLElement | null) {
  const option = content?.querySelector<HTMLElement>("[aria-selected=true]");
  if (!content || !option) return;
  let top = 0;
  let node: Element | null = option;
  while (node instanceof HTMLElement && node !== content) {
    top += node.offsetTop;
    node = node.offsetParent;
  }
  content.scrollTop = top - (content.clientHeight - option.offsetHeight) / 2;
}

function CalendarPickerSelect({
  items,
  className,
  ...props
}: CalendarPickerSelectProps) {
  const contentRef = useRef<HTMLElement>(null);
  return (
    <AriaSelect
      {...props}
      data-slot="calendar-picker"
      onOpenChange={(open) => {
        if (open)
          requestAnimationFrame(() => centerSelectedOption(contentRef.current));
      }}
      className={cn("min-w-0", className)}
    >
      <Button
        variant="ghost"
        className="group/trigger max-w-full cursor-pointer gap-1 px-2.5 font-semibold"
      >
        <AriaSelectValue className="min-w-0 truncate">
          {({ selectedText }) => selectedText}
        </AriaSelectValue>
        <span aria-hidden="true" className={fieldChevronStyles}>
          <CaretDownIcon className="size-3.5 text-muted-foreground" />
        </span>
      </Button>
      <SelectContent
        ref={contentRef}
        className="w-auto min-w-[max(var(--trigger-width),7rem)]"
      >
        {items.map((item) => (
          <SelectItem key={item.id} id={item.id}>
            {item.formatted}
          </SelectItem>
        ))}
      </SelectContent>
    </AriaSelect>
  );
}

export interface CalendarMonthPickerProps
  extends Omit<AriaCalendarMonthPickerProps, "children"> {
  children?: AriaCalendarMonthPickerProps["children"];
  className?: string;
}

export function CalendarMonthPicker({
  children,
  className,
  ...props
}: CalendarMonthPickerProps) {
  return (
    <AriaCalendarMonthPicker {...props}>
      {children ??
        ((picker) => (
          <CalendarPickerSelect {...picker} className={className} />
        ))}
    </AriaCalendarMonthPicker>
  );
}

export interface CalendarYearPickerProps
  extends Omit<AriaCalendarYearPickerProps, "children"> {
  children?: AriaCalendarYearPickerProps["children"];
  className?: string;
}

export function CalendarYearPicker({
  children,
  className,
  ...props
}: CalendarYearPickerProps) {
  return (
    <AriaCalendarYearPicker {...props}>
      {children ??
        ((picker) => (
          <CalendarYearSelect picker={picker} className={className} />
        ))}
    </AriaCalendarYearPicker>
  );
}

function CalendarYearSelect({
  picker,
  className,
}: {
  picker: Parameters<AriaCalendarYearPickerProps["children"]>[0];
  className?: string;
}) {
  const calendar = useContext(CalendarStateContext);
  const range = useContext(RangeCalendarStateContext);
  const state = calendar ?? range;
  return (
    <CalendarPickerSelect
      {...picker}
      className={className}
      onChange={(key) => {
        const year = key === null ? undefined : picker.items[Number(key)]?.date;
        if (!state || !year) return picker.onChange(key);
        state.setFocusedDate(
          state.focusedDate.set({ era: year.era, year: year.year }),
        );
      }}
    />
  );
}

export function CalendarGridBody(
  props: CalendarGridBodyProps & React.RefAttributes<HTMLTableSectionElement>,
) {
  return <AriaCalendarGridBody {...props} />;
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
        "flex shrink-0 gap-1 border-border/70 outline-none max-sm:-mx-3 max-sm:-mt-3 max-sm:mb-3 max-sm:w-0 max-sm:min-w-[calc(100%+1.5rem)] max-sm:overflow-x-auto max-sm:overscroll-x-contain max-sm:border-b max-sm:p-1.5 max-sm:scrollbar-none sm:-my-3 sm:-ms-3 sm:me-3 sm:w-40 sm:flex-col sm:border-e sm:p-1.5",
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
