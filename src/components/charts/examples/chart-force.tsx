"use client";

import { defineChart, dot, link, text } from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
import { forceLayout } from "@tanstack/charts/network/force";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  Chart,
  ChartCaption,
  ChartFrame,
  ChartLegend,
  ChartLegendItem,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";

const tiers = [
  { label: "Edge", color: "var(--ts-chart-1)" },
  { label: "Service", color: "var(--ts-chart-2)" },
  { label: "Data", color: "var(--ts-chart-3)" },
];

const services = [
  { id: "gateway", name: "Gateway", tier: "Edge", rps: 1840 },
  { id: "web", name: "Web", tier: "Edge", rps: 920 },
  { id: "auth", name: "Auth", tier: "Service", rps: 760 },
  { id: "billing", name: "Billing", tier: "Service", rps: 210 },
  { id: "search", name: "Search", tier: "Service", rps: 540 },
  { id: "notify", name: "Notify", tier: "Service", rps: 180 },
  { id: "orders", name: "Orders", tier: "Service", rps: 430 },
  { id: "postgres", name: "Postgres", tier: "Data", rps: 1220 },
  { id: "redis", name: "Redis", tier: "Data", rps: 2410 },
  { id: "queue", name: "Queue", tier: "Data", rps: 390 },
];

const dependencies = [
  { source: "web", target: "gateway" },
  { source: "gateway", target: "auth" },
  { source: "gateway", target: "search" },
  { source: "gateway", target: "orders" },
  { source: "gateway", target: "billing" },
  { source: "auth", target: "redis" },
  { source: "auth", target: "postgres" },
  { source: "orders", target: "postgres" },
  { source: "orders", target: "queue" },
  { source: "billing", target: "postgres" },
  { source: "queue", target: "notify" },
  { source: "search", target: "redis" },
];

const graph = forceLayout(services, dependencies, {
  nodeKey: "id",
  source: "source",
  target: "target",
  iterations: 250,
  domainPadding: 0.18,
  forces: [
    { type: "link", distance: 40 },
    { type: "manyBody", strength: -160 },
    { type: "center", x: 0, y: 0 },
    { type: "collide", radius: 14, strength: 0.9 },
  ],
});

const formatRate = (value: number) => `${value.toLocaleString("en-US")} rps`;

const definition = defineChart({
  marks: [
    decorative(
      link(graph.links, {
        x1: "x1",
        y1: "y1",
        x2: "x2",
        y2: "y2",
        stroke: "var(--muted-foreground)",
        strokeOpacity: 0.4,
        strokeWidth: 1.25,
      }),
    ),
    dot(graph.nodes, {
      x: "x",
      y: "y",
      key: "id",
      color: "tier",
      r: (node) => 4 + Math.sqrt(node.rps) / 9,
      stroke: "var(--card)",
      strokeWidth: 1.5,
    }),
    decorative(
      text(graph.nodes, {
        x: "x",
        y: "y",
        key: "id",
        text: "name",
        dy: -12,
        fill: "var(--foreground)",
        fontSize: 11,
      }),
    ),
  ],
  scales: {
    x: { scale: scaleLinear().domain(graph.xDomain), axis: false },
    y: { scale: scaleLinear().domain(graph.yDomain), axis: false },
  },
  color: {
    domain: tiers.map((tier) => tier.label),
    range: tiers.map((tier) => tier.color),
  },
  tooltip: {
    use: tooltip,
    content: ([point]) => {
      const id = point.datum.id;
      const calls = dependencies.filter((item) => item.source === id).length;
      const callers = dependencies.filter((item) => item.target === id).length;
      return {
        title: point.datum.name,
        rows: [
          { label: "Tier", value: point.datum.tier, color: point.color },
          { label: "Traffic", value: formatRate(point.datum.rps) },
          { label: "Calls", value: `${calls}` },
          { label: "Callers", value: `${callers}` },
        ],
      };
    },
  },
});

export function ChartForce() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Service dependencies</ChartTitle>
      </ChartCaption>
      <Chart
        definition={definition}
        height={280}
        initialWidth={520}
        ariaLabel="Force-directed graph of ten services and twelve dependencies. The gateway calls four services; Postgres has the most callers."
      />
      <ChartLegend>
        {tiers.map((tier) => (
          <ChartLegendItem key={tier.label} color={tier.color}>
            {tier.label}
          </ChartLegendItem>
        ))}
      </ChartLegend>
      <ChartTable
        caption="Service dependencies"
        columns={["Service", "Tier", "Traffic", "Calls"]}
        rows={services.map((service) => [
          service.name,
          service.tier,
          formatRate(service.rps),
          dependencies
            .filter((item) => item.source === service.id)
            .map(
              (item) =>
                services.find((other) => other.id === item.target)?.name ??
                item.target,
            )
            .join(", ") || "—",
        ])}
      />
    </ChartFrame>
  );
}
