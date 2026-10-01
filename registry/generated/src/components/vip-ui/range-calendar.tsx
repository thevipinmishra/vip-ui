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
import { cn } from "./utils";
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
                  "rounded-md data-[selected]:rounded-none data-[selected]:bg-accent data-[selected]:text-accent-foreground data-[selected]:hover:bg-accent data-[selected]:data-[focused]:bg-accent data-[selected]:[td:first-child_&]:rounded-s-md data-[selected]:[td:last-child_&]:rounded-e-md data-[selection-start]:rounded-s-md data-[selection-start]:bg-primary data-[selection-start]:text-primary-foreground data-[selection-start]:hover:bg-primary data-[selection-start]:data-[focused]:bg-primary data-[selection-end]:rounded-e-md data-[selection-end]:bg-primary data-[selection-end]:text-primary-foreground data-[selection-end]:hover:bg-primary data-[selection-end]:data-[focused]:bg-primary",
                )}
              />
            )}
          </CalendarGrid>
        </>
      )}
    </AriaRangeCalendar>
  );
}
