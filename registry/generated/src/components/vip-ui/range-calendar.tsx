"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useContext, useLayoutEffect, useRef, useState } from "react";
import {
  RangeCalendar as AriaRangeCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridHeader,
  CalendarHeaderCell,
  composeRenderProps,
  type DateValue,
  type RangeCalendarProps,
  RangeCalendarStateContext,
} from "react-aria-components";
import { duration, easeOut, springLayout, transitionFor } from "./motion";
import { cn } from "./utils";
import {
  CalendarGridBody,
  CalendarGridFrame,
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
  "rounded-md selected:rounded-none selected:bg-accent selected:text-accent-foreground selected:[td:first-child_&]:rounded-s-md selected:[td:last-child_&]:rounded-e-md selection-start:rounded-s-md selection-start:bg-primary selection-start:text-primary-foreground selection-end:rounded-e-md selection-end:bg-primary selection-end:text-primary-foreground invalid:selected:bg-destructive/15 invalid:selected:text-destructive invalid:selection-start:bg-destructive invalid:selection-start:text-background invalid:selection-end:bg-destructive invalid:selection-end:text-background forced-colors:selected:border-x-0 forced-colors:selected:border-y-[Highlight] forced-colors:selection-start:border-s-2 forced-colors:selection-start:border-s-[Highlight] forced-colors:selection-end:border-e-2 forced-colors:selection-end:border-e-[Highlight] forced-colors:selected:[td:first-child_&]:border-s-2 forced-colors:selected:[td:first-child_&]:border-s-[Highlight] forced-colors:selected:[td:last-child_&]:border-e-2 forced-colors:selected:[td:last-child_&]:border-e-[Highlight]",
  "in-data-[range-highlight=ready]:transition-none in-data-[range-highlight=ready]:selected:bg-transparent!",
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
      data-months={months > 1 ? months : undefined}
      render={withItemHighlight(render, { items: calendarCells })}
      className={composeRenderProps(className, (className) =>
        cn(calendarStyles, months > 1 && calendarMonthsStyles, className),
      )}
    >
      {children ?? (
        <CalendarMonths count={months}>
          {(offset) => (
            <CalendarGridFrame>
              <CalendarGrid
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
                    <CalendarCell
                      date={date}
                      data-date={date.toString()}
                      className={rangeCellClass}
                    />
                  )}
                </CalendarGridBody>
              </CalendarGrid>
              <RangeHighlight />
            </CalendarGridFrame>
          )}
        </CalendarMonths>
      )}
    </AriaRangeCalendar>
  );
}

type RangeCell = {
  date: string;
  left: number;
  right: number;
  top: number;
  bottom: number;
  start: boolean;
  end: boolean;
  invalid: boolean;
};

type RangePart = "trail" | "anchor" | "edge" | "start" | "end" | "single";

type RangeBox = {
  key: string;
  part: RangePart;
  kind: "trail" | "start" | "end";
  invalid: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  corners: {
    topLeft: string;
    topRight: string;
    bottomRight: string;
    bottomLeft: string;
  };
};

const cornerRadius = "calc(var(--radius, 0.625rem) * 0.8)";

function roundCorners(left: boolean, right: boolean) {
  return {
    topLeft: left ? cornerRadius : "0px",
    topRight: right ? cornerRadius : "0px",
    bottomRight: right ? cornerRadius : "0px",
    bottomLeft: left ? cornerRadius : "0px",
  };
}

function measureRange(
  container: HTMLElement,
  session: string,
  anchor: string | null,
): RangeBox[] {
  const table = container.querySelector("table");
  if (!table) return [];
  const origin = container.getBoundingClientRect();
  const grid = table.getBoundingClientRect();
  if (!grid.width || !grid.height) return [];

  // Rectangles include ancestor transforms, such as the popover entry scale.
  // Divide by the rendered-to-layout ratio so the overlay lands on the grid.
  const scaleX = container.offsetWidth
    ? origin.width / container.offsetWidth
    : 1;
  const scaleY = container.offsetHeight
    ? origin.height / container.offsetHeight
    : 1;
  const multiMonth = container.closest("[data-months]") !== null;
  const gridKey =
    container.querySelector<HTMLElement>("[role=gridcell] [data-date]")?.dataset
      .date ??
    table.getAttribute("aria-label") ??
    "";
  const prefix = `${session}|${gridKey}|`;

  const rows = new Map<HTMLTableRowElement, RangeCell[]>();
  for (const cell of container.querySelectorAll<HTMLElement>(
    "[role=gridcell] > [data-selected]",
  )) {
    if (multiMonth && cell.hasAttribute("data-outside-month")) continue;
    const row = cell.closest<HTMLTableRowElement>("tr");
    if (!row) continue;
    const rect = cell.getBoundingClientRect();
    const box: RangeCell = {
      date: cell.dataset.date ?? "",
      left: (rect.left - origin.left) / scaleX,
      right: (rect.right - origin.left) / scaleX,
      top: (rect.top - origin.top) / scaleY,
      bottom: (rect.bottom - origin.top) / scaleY,
      start: cell.hasAttribute("data-selection-start"),
      end: cell.hasAttribute("data-selection-end"),
      invalid: cell.hasAttribute("data-invalid"),
    };
    const cells = rows.get(row);
    if (cells) cells.push(box);
    else rows.set(row, [box]);
  }

  let startDate: string | null = null;
  let endDate: string | null = null;
  for (const cells of rows.values()) {
    for (const cell of cells) {
      if (cell.start) startDate = cell.date;
      if (cell.end) endDate = cell.date;
    }
  }

  const preview = anchor !== null;
  const edgeDate =
    preview && startDate && endDate && startDate !== endDate
      ? anchor === startDate
        ? endDate
        : anchor === endDate
          ? startDate
          : null
      : null;
  const direction = preview
    ? startDate && endDate && startDate === endDate
      ? "single"
      : anchor === startDate
        ? "forward"
        : anchor === endDate
          ? "backward"
          : "partial"
    : "range";

  const capPart = (cell: RangeCell) => {
    if (!preview) {
      if (cell.start && cell.end)
        return { part: "single", key: "single" } as const;
      return cell.start
        ? ({ part: "start", key: "start" } as const)
        : ({ part: "end", key: "end" } as const);
    }
    if (cell.date === anchor) return { part: "anchor", key: "anchor" } as const;
    if (edgeDate && cell.date === edgeDate)
      return { part: "edge", key: "edge" } as const;
    if (cell.start && cell.end)
      return { part: "single", key: "single" } as const;
    return cell.start
      ? ({ part: "start", key: "start" } as const)
      : ({ part: "end", key: "end" } as const);
  };

  const gridLeft = (grid.left - origin.left) / scaleX;
  const gridRight = (grid.right - origin.left) / scaleX;
  const boxes: RangeBox[] = [];

  for (const [row, cells] of rows) {
    cells.sort((a, b) => a.left - b.left);
    const runs: RangeCell[][] = [];
    for (const cell of cells) {
      const run = runs.at(-1);
      const previous = run?.at(-1);
      if (
        run &&
        previous &&
        previous.invalid === cell.invalid &&
        cell.left - previous.right <= 2
      ) {
        run.push(cell);
      } else {
        runs.push([cell]);
      }
    }

    for (const [runIndex, run] of runs.entries()) {
      const runLeft = Math.min(...run.map((cell) => cell.left));
      const runRight = Math.max(...run.map((cell) => cell.right));
      const trail = run.filter((cell) => !cell.start && !cell.end);
      if (trail.length) {
        const left = Math.min(...trail.map((cell) => cell.left));
        const right = Math.max(...trail.map((cell) => cell.right));
        const top = Math.min(...trail.map((cell) => cell.top));
        const bottom = Math.max(...trail.map((cell) => cell.bottom));
        boxes.push({
          key: `${prefix}${direction}|trail-${row.rowIndex}-${runIndex}`,
          part: "trail",
          kind: "trail",
          invalid: run[0].invalid,
          x: left,
          y: top,
          width: right - left,
          height: bottom - top,
          corners: roundCorners(left <= gridLeft + 1, right >= gridRight - 1),
        });
      }

      for (const cell of run) {
        if (!cell.start && !cell.end) continue;
        const cap = capPart(cell);
        boxes.push({
          key: `${prefix}${cap.key}`,
          part: cap.part,
          kind: cell.start ? "start" : "end",
          invalid: cell.invalid,
          x: cell.left,
          y: cell.top,
          width: cell.right - cell.left,
          height: cell.bottom - cell.top,
          corners: roundCorners(
            cell.left <= runLeft + 1,
            cell.right >= runRight - 1,
          ),
        });
      }
    }
  }

  return boxes;
}

function RangeHighlight() {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const state = useContext(RangeCalendarStateContext);
  const [boxes, setBoxes] = useState<RangeBox[]>([]);

  const anchor = state?.anchorDate ? state.anchorDate.toString() : null;
  const value = state?.value;
  const session = anchor
    ? `preview:${anchor}`
    : value
      ? `range:${value.start.toString()}:${value.end.toString()}`
      : "empty";

  useLayoutEffect(() => {
    const layer = ref.current;
    const container = layer?.parentElement;
    if (!layer || !container) return;

    let painted = "";
    const sync = () => {
      const next = measureRange(container, session, anchor);
      const signature = JSON.stringify(next);
      if (signature === painted) return;
      painted = signature;
      setBoxes(next);
    };

    container.setAttribute("data-range-highlight", "ready");
    sync();

    const mutations = new MutationObserver(sync);
    mutations.observe(container, {
      attributes: true,
      attributeFilter: [
        "data-selected",
        "data-selection-start",
        "data-selection-end",
        "data-invalid",
        "data-outside-month",
        "data-date",
      ],
      childList: true,
      subtree: true,
    });
    const resize = new ResizeObserver(sync);
    resize.observe(container);

    return () => {
      mutations.disconnect();
      resize.disconnect();
      container.removeAttribute("data-range-highlight");
    };
  }, [anchor, session]);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      data-slot="range-highlight"
      className="pointer-events-none absolute inset-0 -z-10 select-none"
    >
      <AnimatePresence initial={false}>
        {boxes.map((box) => (
          <motion.span
            key={box.key}
            layout={!reduceMotion}
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitionFor(reduceMotion, {
              duration: duration.fast,
              ease: easeOut,
              layout: springLayout,
            })}
            data-kind={box.kind}
            data-part={box.part}
            className={cn(
              "absolute top-0 left-0",
              box.part !== "trail" && "z-10",
              box.kind === "trail"
                ? box.invalid
                  ? "bg-destructive/15"
                  : "bg-accent"
                : box.invalid
                  ? "bg-destructive"
                  : "bg-primary",
            )}
            style={{
              left: box.x,
              top: box.y,
              width: box.width,
              height: box.height,
              borderTopLeftRadius: box.corners.topLeft,
              borderTopRightRadius: box.corners.topRight,
              borderBottomRightRadius: box.corners.bottomRight,
              borderBottomLeftRadius: box.corners.bottomLeft,
            }}
          />
        ))}
      </AnimatePresence>
    </span>
  );
}
