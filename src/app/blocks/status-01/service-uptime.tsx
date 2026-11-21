"use client";

import { CheckCircleIcon } from "@phosphor-icons/react";
import { barY, defineChart } from "@tanstack/charts";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Chart,
  ChartLegend,
  ChartLegendItem,
  ChartTable,
} from "@/components/ui/chart";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import {
  formatUptime,
  type Service,
  type ServiceDay,
  type ServiceState,
  services,
  stateColors,
  stateLabels,
  uptimeOf,
} from "./data";

type Range = "30" | "90";

const badgeVariants: Record<ServiceState, "success" | "warning" | "error"> = {
  operational: "success",
  degraded: "warning",
  outage: "error",
};

const legend = (Object.keys(stateLabels) as ServiceState[]).map((state) => ({
  label: stateLabels[state],
  color: stateColors[state],
}));

function UptimeBars({
  service,
  days,
}: {
  service: Service;
  days: ServiceDay[];
}) {
  const definition = useMemo(
    () =>
      defineChart({
        guides: false,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        marks: [
          barY(
            days.map((day) => ({ ...day, status: stateLabels[day.state] })),
            {
              x: "date",
              y: () => 1,
              color: "status",
              inset: 1,
              radius: 2,
            },
          ),
        ],
        scales: {
          x: {
            scale: () =>
              scaleBand<string>()
                .domain(days.map((day) => day.date))
                .padding(0.12),
          },
          y: { scale: scaleLinear().domain([0, 1]) },
        },
        color: {
          domain: legend.map((item) => item.label),
          range: legend.map((item) => item.color),
        },
        tooltip: {
          use: tooltip,
          content: ([point]) => ({
            title: point.datum.fullLabel,
            rows: [
              {
                label: stateLabels[point.datum.state],
                value: formatUptime(point.datum.uptime),
                color: point.color,
              },
              { label: point.datum.note, value: "" },
            ],
          }),
        },
      }),
    [days],
  );

  return (
    <Chart
      definition={definition}
      height={32}
      initialWidth={640}
      ariaLabel={`${service.name}, daily uptime for the last ${days.length} days`}
    />
  );
}

export function ServiceUptime() {
  const [range, setRange] = useState<Range>("90");
  const rows = useMemo(
    () =>
      services.map((service) => {
        const days = service.history.slice(-Number(range));
        return {
          service,
          days,
          uptime: uptimeOf(days),
          incidents: days.filter((day) => day.state !== "operational").length,
        };
      }),
    [range],
  );
  const overall =
    rows.reduce((total, row) => total + row.uptime, 0) / rows.length;
  const degraded = services.filter(
    (service) => service.state !== "operational",
  ).length;

  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle as="h2">Services</CardTitle>
        <CardDescription>
          {services.length} services · {degraded} degraded ·{" "}
          {formatUptime(overall)} uptime in the last {range} days
        </CardDescription>
        <CardAction>
          <ToggleButtonGroup
            aria-label="Uptime range"
            size="sm"
            selectionMode="single"
            disallowEmptySelection
            selectedKeys={[range]}
            onSelectionChange={(keys) => {
              const [next] = keys;
              if (next === "30" || next === "90") setRange(next);
            }}
          >
            <ToggleButton id="30" variant="segmented">
              30 days
            </ToggleButton>
            <ToggleButton id="90" variant="segmented">
              90 days
            </ToggleButton>
          </ToggleButtonGroup>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <ul className="divide-y divide-border/70 border-t border-border/70">
          {rows.map(({ service, days, uptime, incidents }) => (
            <li key={service.name} className="grid gap-2.5 px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                <div className="flex min-w-0 items-center gap-2">
                  <p className="truncate text-sm font-medium">{service.name}</p>
                  {service.state === "operational" ? (
                    <CheckCircleIcon
                      size={16}
                      weight="fill"
                      aria-label="Operational"
                      className="shrink-0 text-success"
                    />
                  ) : (
                    <Badge variant={badgeVariants[service.state]}>
                      {stateLabels[service.state]}
                    </Badge>
                  )}
                </div>
                <p className="text-xs tabular-nums text-muted-foreground">
                  {incidents === 0
                    ? "No incidents"
                    : `${incidents} ${incidents === 1 ? "incident" : "incidents"}`}
                  {" · "}
                  <span className="font-medium text-foreground">
                    {formatUptime(uptime)}
                  </span>{" "}
                  uptime
                </p>
              </div>
              <UptimeBars service={service} days={days} />
              <ChartTable
                caption={`${service.name}, daily uptime`}
                columns={["Date", "State", "Uptime", "Note"]}
                rows={days.map((day) => [
                  day.fullLabel,
                  stateLabels[day.state],
                  formatUptime(day.uptime),
                  day.note,
                ])}
              />
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 px-5 py-3 text-xs text-muted-foreground">
          <ChartLegend className="justify-start text-xs">
            {legend.map((item) => (
              <ChartLegendItem key={item.label} color={item.color}>
                {item.label}
              </ChartLegendItem>
            ))}
          </ChartLegend>
          <p className="tabular-nums">{rows[0].days[0].label} – Today</p>
        </div>
      </CardContent>
    </Card>
  );
}
