"use client";

import { defineChart, dot, link, text } from "@tanstack/charts";
import { treeLayout } from "@tanstack/charts/hierarchy/tree";
import { decorative } from "@tanstack/charts/mark/decorative";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import {
  Chart,
  ChartCaption,
  ChartFrame,
  ChartTable,
  ChartTitle,
} from "@/components/ui/chart";

const topics = [
  { path: "Support", tickets: 0 },
  { path: "Support.Billing", tickets: 0 },
  { path: "Support.Billing.Invoices", tickets: 128 },
  { path: "Support.Billing.Refunds", tickets: 64 },
  { path: "Support.Billing.Tax", tickets: 31 },
  { path: "Support.Account", tickets: 0 },
  { path: "Support.Account.Sign-in", tickets: 212 },
  { path: "Support.Account.Roles", tickets: 47 },
  { path: "Support.Product", tickets: 0 },
  { path: "Support.Product.API", tickets: 96 },
  { path: "Support.Product.Exports", tickets: 58 },
  { path: "Support.Product.Webhooks", tickets: 39 },
];

const hierarchy = treeLayout(topics, {
  path: "path",
  delimiter: ".",
  orientation: "left",
  nodeSize: [1, 1],
});

const { nodes, links } = hierarchy;

const total = (id: string) =>
  topics
    .filter((topic) => `/${topic.path.replaceAll(".", "/")}`.startsWith(id))
    .reduce((sum, topic) => sum + topic.tickets, 0);

const xs = nodes.map((node) => node.x);
const ys = nodes.map((node) => node.y);

const definition = defineChart({
  marks: [
    decorative(
      link(links, {
        x1: "x1",
        y1: "y1",
        x2: "x2",
        y2: "y2",
        key: "id",
        stroke: "var(--border)",
        strokeWidth: 1.5,
      }),
    ),
    dot(nodes, {
      x: "x",
      y: "y",
      key: "id",
      r: (node) => (node.internal ? 4 : 3),
      fill: "var(--ts-chart-1)",
      stroke: "var(--card)",
      strokeWidth: 1.5,
    }),
    decorative(
      text(nodes, {
        x: "x",
        y: "y",
        key: "id",
        text: "name",
        anchor: (node) => (node.internal ? "middle" : "start"),
        dx: (node) => (node.internal ? 0 : 8),
        dy: (node) => (node.internal ? -12 : 0),
        fill: "var(--foreground)",
        fontSize: 11,
      }),
    ),
  ],
  scales: {
    x: {
      scale: scaleLinear().domain([Math.min(...xs), Math.max(...xs) + 0.8]),
      axis: false,
    },
    y: {
      scale: scaleLinear().domain([Math.min(...ys), Math.max(...ys)]),
      axis: false,
    },
  },
  margin: { top: 12, right: 16, bottom: 12, left: 24 },
  tooltip: {
    use: tooltip,
    content: ([point]) => ({
      title: point.datum.name,
      rows: [
        {
          label: "Tickets",
          value: total(point.datum.id).toLocaleString("en-US"),
          color: point.color,
        },
        { label: "Depth", value: `${point.datum.depth}` },
      ],
    }),
  },
});

export function ChartTree() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Support taxonomy</ChartTitle>
      </ChartCaption>
      <Chart
        definition={definition}
        height={280}
        initialWidth={520}
        ariaLabel="Tree of support topics: billing, account and product, each with two or three subtopics"
      />
      <ChartTable
        caption="Support topics and ticket counts"
        columns={["Topic", "Parent", "Tickets"]}
        rows={nodes.map((node) => [
          node.name,
          nodes.find((item) => item.id === node.parentId)?.name ?? "—",
          total(node.id),
        ])}
      />
    </ChartFrame>
  );
}
