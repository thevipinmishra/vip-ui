"use client";

import { barY, defineChart, stack } from "@tanstack/charts";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import { useMemo } from "react";
import {
  Chart,
  ChartFrame,
  ChartLegend,
  ChartLegendItem,
  ChartTable,
} from "../../vip-ui/chart";
import {
  formatClock,
  type LogEntry,
  statusClass,
  statusClasses,
  windowMinutes,
} from "./data";

export function LogHistogram({ logs, end }: { logs: LogEntry[]; end: number }) {
  const buckets = useMemo(() => {
    const last = Math.floor(end / 60_000) * 60_000;
    return Array.from({ length: windowMinutes }, (_, index) => {
      const start = last - (windowMinutes - 1 - index) * 60_000;
      const inside = logs.filter(
        (entry) => entry.time >= start && entry.time < start + 60_000,
      );
      return {
        start,
        label: formatClock(start).slice(0, 5),
        success: inside.filter(
          (entry) => statusClass(entry.status) === "success",
        ).length,
        client: inside.filter((entry) => statusClass(entry.status) === "client")
          .length,
        server: inside.filter((entry) => statusClass(entry.status) === "server")
          .length,
      };
    });
  }, [logs, end]);

  const definition = useMemo(() => {
    const rows = buckets.flatMap((bucket) =>
      statusClasses.map((item) => ({
        minute: bucket.label,
        group: item.name,
        count: bucket[item.id],
      })),
    );
    const top = Math.max(
      4,
      ...buckets.map(
        (bucket) => bucket.success + bucket.client + bucket.server,
      ),
    );
    const ticks = buckets
      .filter((_, index) => (windowMinutes - 1 - index) % 5 === 0)
      .map((bucket) => bucket.label);
    return defineChart({
      marks: [
        barY(rows, {
          x: "minute",
          y: "count",
          z: "group",
          color: "group",
          layout: stack(),
          inset: 1,
          radius: { end: 2, stack: "outer" },
        }),
      ],
      scales: {
        x: {
          scale: () => scaleBand().padding(0.2),
          axis: { ticks: { values: ticks }, tickLabels: { fontSize: 12 } },
        },
        y: {
          scale: scaleLinear().domain([0, Math.ceil(top / 2) * 2]),
          grid: true,
          axis: { ticks: { count: 2 }, tickLabels: { fontSize: 12 } },
        },
      },
      color: {
        domain: statusClasses.map((item) => item.name),
        range: statusClasses.map((item) => item.color),
      },
      focus: "group-x",
      tooltip: {
        use: tooltip,
        sort: "color-domain",
        content: (points, { primaryPoint }) => ({
          title: `${points[0].datum.minute} UTC`,
          rows: points.map((point) => ({
            label: point.groupLabel,
            value: `${point.datum.count}`,
            color: point.color,
            active: point === primaryPoint,
          })),
        }),
      },
    });
  }, [buckets]);

  return (
    <ChartFrame variant="card">
      <Chart
        definition={definition}
        height={112}
        initialWidth={1100}
        ariaLabel={`Requests per minute for the last ${windowMinutes} minutes, by status`}
      />
      <ChartLegend className="justify-start text-xs">
        {statusClasses.map((item) => (
          <ChartLegendItem key={item.id} color={item.color}>
            {item.name}
          </ChartLegendItem>
        ))}
      </ChartLegend>
      <ChartTable
        caption="Requests per minute by status"
        columns={["Minute (UTC)", ...statusClasses.map((item) => item.name)]}
        rows={buckets.map((bucket) => [
          bucket.label,
          bucket.success,
          bucket.client,
          bucket.server,
        ])}
      />
    </ChartFrame>
  );
}
