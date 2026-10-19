"use client";

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import {
  Calendar as AriaCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarHeading,
  type CalendarProps,
  composeRenderProps,
  type DateValue,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { withItemHighlight } from "./item-highlight";

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
