"use client";

import {
  Calendar as AriaCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarHeading,
  type CalendarProps,
  composeRenderProps,
  type DateValue,
} from "react-aria-components";
import { ChevronLeft, ChevronRight } from "reicon-react";
import { cn } from "./utils";
import { Button } from "./button";

export const calendarCellBaseClass =
  "grid size-11 cursor-pointer place-items-center text-sm tabular-nums outline-none hover:bg-muted data-[focused]:bg-muted data-[outside-month]:text-muted-foreground/50 data-[unavailable]:cursor-not-allowed data-[unavailable]:bg-muted data-[unavailable]:text-muted-foreground data-[unavailable]:line-through data-[unavailable]:hover:bg-muted data-[disabled]:cursor-default data-[disabled]:bg-muted data-[disabled]:text-muted-foreground data-[disabled]:opacity-60 data-[focus-visible]:outline-2 data-[focus-visible]:outline-offset-[-2px] data-[focus-visible]:outline-ring";

export const calendarCellClass = `${calendarCellBaseClass} rounded-md data-[selected]:bg-primary data-[selected]:text-primary-foreground`;

export function Calendar<T extends DateValue>({
  className,
  children,
  ...props
}: CalendarProps<T> & React.RefAttributes<HTMLDivElement>) {
  return (
    <AriaCalendar
      {...props}
      data-slot="calendar"
      className={composeRenderProps(className, (className) =>
        cn("w-fit max-w-full text-foreground", className),
      )}
    >
      {children ?? (
        <>
          <div className="mb-3 flex items-center justify-between gap-2">
            <Button
              slot="previous"
              aria-label="Previous month"
              variant="ghost"
              size="icon"
            >
              <ChevronLeft size={17} aria-hidden="true" />
            </Button>
            <CalendarHeading className="text-sm font-semibold" />
            <Button
              slot="next"
              aria-label="Next month"
              variant="ghost"
              size="icon"
            >
              <ChevronRight size={17} aria-hidden="true" />
            </Button>
          </div>
          <CalendarGrid
            className="border-separate border-spacing-0 text-center text-xs"
            weekdayStyle="short"
          >
            {(date) => (
              <CalendarCell date={date} className={calendarCellClass} />
            )}
          </CalendarGrid>
        </>
      )}
    </AriaCalendar>
  );
}
