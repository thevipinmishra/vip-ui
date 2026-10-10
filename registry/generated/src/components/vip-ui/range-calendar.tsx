"use client";

import {
  RangeCalendar as AriaRangeCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  composeRenderProps,
  type DateValue,
  type RangeCalendarProps,
} from "react-aria-components";
import { cn } from "./utils";
import {
  CalendarHeader,
  calendarCellBaseClass,
  calendarGridStyles,
  calendarHeaderCellStyles,
  calendarStyles,
} from "./calendar";

const rangeCellClass = cn(
  calendarCellBaseClass,
  "rounded-md selected:rounded-none selected:bg-accent selected:text-accent-foreground selected:hover:bg-accent selected:focus:bg-accent selected:[td:first-child_&]:rounded-s-md selected:[td:last-child_&]:rounded-e-md selection-start:rounded-s-md selection-start:bg-primary selection-start:text-primary-foreground selection-start:hover:bg-primary selection-start:focus:bg-primary selection-end:rounded-e-md selection-end:bg-primary selection-end:text-primary-foreground selection-end:hover:bg-primary selection-end:focus:bg-primary invalid:selected:bg-destructive/15 invalid:selected:text-destructive invalid:selected:hover:bg-destructive/15 invalid:selected:focus:bg-destructive/15 invalid:selection-start:bg-destructive invalid:selection-start:text-destructive-foreground invalid:selection-start:hover:bg-destructive invalid:selection-start:focus:bg-destructive invalid:selection-end:bg-destructive invalid:selection-end:text-destructive-foreground invalid:selection-end:hover:bg-destructive invalid:selection-end:focus:bg-destructive",
);

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
                <CalendarCell date={date} className={rangeCellClass} />
              )}
            </CalendarGridBody>
          </CalendarGrid>
        </>
      )}
    </AriaRangeCalendar>
  );
}
