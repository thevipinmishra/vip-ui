"use client";

import {
  RangeCalendar as AriaRangeCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarHeading,
  composeRenderProps,
  type DateValue,
  type RangeCalendarProps,
} from "react-aria-components";
import { ChevronLeft, ChevronRight } from "reicon-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { calendarCellBaseClass } from "./calendar";

export function RangeCalendar<T extends DateValue>({
  className,
  children,
  ...props
}: RangeCalendarProps<T> & React.RefAttributes<HTMLDivElement>) {
  return (
    <AriaRangeCalendar
      {...props}
      data-slot="range-calendar"
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
              <CalendarCell
                date={date}
                className={cn(
                  calendarCellBaseClass,
                  "rounded-md selected:rounded-none selected:bg-accent selected:text-accent-foreground selected:hover:bg-accent selected:focus:bg-accent selected:[td:first-child_&]:rounded-s-md selected:[td:last-child_&]:rounded-e-md selection-start:rounded-s-md selection-start:bg-primary selection-start:text-primary-foreground selection-start:hover:bg-primary selection-start:focus:bg-primary selection-end:rounded-e-md selection-end:bg-primary selection-end:text-primary-foreground selection-end:hover:bg-primary selection-end:focus:bg-primary",
                )}
              />
            )}
          </CalendarGrid>
        </>
      )}
    </AriaRangeCalendar>
  );
}
