"use client";

import type { ChartPoint, ChartTooltipContent } from "@tanstack/charts";
import { motion } from "@tanstack/charts/motion";
import { createContext, type ReactNode, useContext } from "react";
import { ChartCaption, ChartFrame, ChartTitle } from "@/components/ui/chart";

// One renderer for every gallery chart. Initial SVG is already present in the
// server response; only interaction and subsequent changes need motion.
export const galleryRenderer = motion({
  initial: false,
  transition: { type: "spring", stiffness: 420, damping: 38 },
});

export function valueTooltip(
  title: string,
  label: string,
  value: string,
  color?: string,
): ChartTooltipContent {
  return { title, rows: [{ label, value, color }] };
}

export function groupTooltip<TDatum>(
  title: string,
  points: readonly ChartPoint<TDatum>[],
  value: (datum: TDatum) => string,
  primary?: ChartPoint,
): ChartTooltipContent {
  return {
    title,
    rows: points.map((point) => ({
      label: point.groupLabel,
      value: value(point.datum),
      color: point.color,
      active: point === primary,
    })),
  };
}

type GalleryItem = { name: string; href: string };

const GalleryItemContext = createContext<GalleryItem | null>(null);

export function ChartGalleryItem({
  name,
  href,
  children,
}: GalleryItem & { children: ReactNode }) {
  return (
    <GalleryItemContext value={{ name, href }}>{children}</GalleryItemContext>
  );
}

export function ChartPlot({
  title,
  children,
  columns,
  rows,
  legend,
  controls,
}: {
  title: string;
  children: ReactNode;
  columns: readonly string[];
  rows: readonly (readonly (string | number)[])[];
  legend?: readonly { label: string; color: string }[];
  controls?: ReactNode;
}) {
  const galleryItem = useContext(GalleryItemContext);

  return (
    <ChartFrame className="flex h-full w-full flex-col bg-transparent p-0 pb-4 sm:p-0 sm:pb-5">
      <ChartCaption className="sr-only">
        <ChartTitle>{title}</ChartTitle>
      </ChartCaption>
      {(galleryItem || controls) && (
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 pt-4 sm:px-5 lg:min-h-16">
          {galleryItem && (
            <h3 className="min-w-0 text-base font-semibold leading-6 tracking-[-0.025em]">
              <a
                href={galleryItem.href}
                aria-label={`Link to ${galleryItem.name}`}
                className="rounded-sm hover:text-primary hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring"
              >
                {galleryItem.name}
              </a>
            </h3>
          )}
          {controls && (
            <div className="flex max-w-full flex-wrap items-center gap-2">
              {controls}
            </div>
          )}
        </div>
      )}
      <div className="mt-3 min-w-0 px-4 sm:mt-4 sm:px-5">{children}</div>
      {legend && (
        <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 px-4 text-xs text-muted-foreground sm:px-5">
          {legend.map((item) => (
            <li key={item.label} className="inline-flex items-center gap-2">
              <span
                className="size-2.5 rounded-[3px]"
                style={{ backgroundColor: item.color }}
                aria-hidden="true"
              />
              {item.label}
            </li>
          ))}
        </ul>
      )}
      <div className="sr-only">
        <table>
          <caption>{title}: exact values</caption>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column} scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={String(row[0])}>
                {row.map((value, index) =>
                  index === 0 ? (
                    <th key={columns[index]} scope="row">
                      {value}
                    </th>
                  ) : (
                    <td key={columns[index]}>{value}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartFrame>
  );
}
