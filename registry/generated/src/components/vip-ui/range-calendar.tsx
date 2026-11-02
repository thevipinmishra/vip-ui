"use client";

import {
  RangeCalendar as AriaRangeCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridHeader,
  CalendarHeaderCell,
  composeRenderProps,
  type DateValue,
  type RangeCalendarProps,
} from "react-aria-components";
import { cn } from "./utils";
import {
  CalendarGridBody,
  CalendarHeader,
  CalendarMonths,
  calendarCellBaseClass,
  calendarCells,
  calendarGridStyles,
  calendarHeaderCellStyles,
  calendarMonthsStyles,
  calendarStyles,
} from "./calendar";
import { withItemHighlight } from "./item-highlight";

const rangeCellClass = cn(
  calendarCellBaseClass,
  "rounded-md selected:rounded-none selected:bg-accent selected:text-accent-foreground selected:[td:first-child_&]:rounded-s-md selected:[td:last-child_&]:rounded-e-md selection-start:rounded-s-md selection-start:bg-primary selection-start:text-primary-foreground selection-end:rounded-e-md selection-end:bg-primary selection-end:text-primary-foreground invalid:selected:bg-destructive/15 invalid:selected:text-destructive invalid:selection-start:bg-destructive invalid:selection-start:text-destructive-foreground invalid:selection-end:bg-destructive invalid:selection-end:text-destructive-foreground forced-colors:selected:border-x-0 forced-colors:selected:border-y-[Highlight] forced-colors:selection-start:border-s-2 forced-colors:selection-start:border-s-[Highlight] forced-colors:selection-end:border-e-2 forced-colors:selection-end:border-e-[Highlight] forced-colors:selected:[td:first-child_&]:border-s-2 forced-colors:selected:[td:first-child_&]:border-s-[Highlight] forced-colors:selected:[td:last-child_&]:border-e-2 forced-colors:selected:[td:last-child_&]:border-e-[Highlight]",
);

export function RangeCalendar<T extends DateValue>({
  className,
  children,
  render,
  ...props
}: RangeCalendarProps<T> & React.RefAttributes<HTMLDivElement>) {
  const months = Math.max(1, props.visibleDuration?.months ?? 1);
  return (
    <AriaRangeCalendar
      {...props}
      data-slot="range-calendar"
      render={withItemHighlight(render, { items: calendarCells })}
      className={composeRenderProps(className, (className) =>
        cn(calendarStyles, months > 1 && calendarMonthsStyles, className),
      )}
    >
      {children ?? (
        <>
          <CalendarHeader />
          <CalendarMonths count={months}>
            {(offset) => (
              <CalendarGrid
                key={offset}
                offset={offset ? { months: offset } : undefined}
                className={calendarGridStyles}
                weekdayStyle="short"
              >
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
            )}
          </CalendarMonths>
        </>
      )}
    </AriaRangeCalendar>
  );
}
