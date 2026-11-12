"use client";

import { defineChart, link, rect, text } from "@tanstack/charts";
import { d3Curve } from "@tanstack/charts/d3/shape";
import { decorative } from "@tanstack/charts/mark/decorative";
import { sankeyDiagram } from "@tanstack/charts/network/sankey";
import { curveBumpX } from "d3-shape";
import {
  Chart,
  ChartCaption,
  ChartFrame,
  ChartLegend,
  ChartLegendItem,
  ChartTable,
  ChartTitle,
} from "../vip-ui/chart";

const nodes = [
  { id: "visits", label: "Visits", lost: false },
  { id: "signups", label: "Signed up", lost: false },
  { id: "bounced", label: "Left", lost: true },
  { id: "trial", label: "Trial", lost: false },
  { id: "free", label: "Free plan", lost: false },
  { id: "paid", label: "Paid", lost: false },
  { id: "canceled", label: "Canceled", lost: true },
];

const links = [
  { source: "visits", target: "signups", users: 3200 },
  { source: "visits", target: "bounced", users: 6800 },
  { source: "signups", target: "trial", users: 1900 },
  { source: "signups", target: "free", users: 1300 },
  { source: "trial", target: "paid", users: 1100 },
  { source: "trial", target: "canceled", users: 800 },
];

const kept = "var(--ts-chart-1)";
const lost = "var(--ts-chart-5)";
const label = (id: string) => nodes.find((node) => node.id === id)?.label ?? id;

const definition = defineChart({
  marks: [
    decorative(
      sankeyDiagram({
        nodes,
        links,
        nodeKey: "id",
        source: "source",
        target: "target",
        value: "users",
        nodeWidth: 10,
        nodePadding: 14,
        marks: ({ nodes: layoutNodes, links: layoutLinks }) =>
          [
            link(layoutLinks, {
              x1: "x1",
              y1: "y1",
              x2: "x2",
              y2: "y2",
              key: "key",
              curve: d3Curve(curveBumpX),
              stroke: (flow) => (flow.targetNode.data.lost ? lost : kept),
              strokeOpacity: 0.3,
              strokeWidth: (flow) => Math.max(1, flow.width),
              lineCap: "butt",
            }),
            rect(layoutNodes, {
              x1: "x0",
              x2: "x1",
              y1: "y0",
              y2: "y1",
              key: "key",
              color: (node) => (node.data.lost ? "Lost" : "Kept"),
              inset: 0,
              radius: 2,
            }),
            text(layoutNodes, {
              x: (node) => (node.layer === 0 ? node.x1 + 6 : node.x0 - 6),
              y: "y",
              text: (node) =>
                `${node.data.label} ${node.value.toLocaleString("en-US")}`,
              anchor: (node) => (node.layer === 0 ? "start" : "end"),
              key: "key",
              fill: "var(--foreground)",
              fontSize: 11,
              fontWeight: 500,
            }),
          ] as const,
      }),
    ),
  ],
  scales: { x: null, y: null },
  guides: false,
  color: { domain: ["Kept", "Lost"], range: [kept, lost] },
  keyboard: false,
});

export function ChartSankey() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>Signup flow</ChartTitle>
      </ChartCaption>
      <Chart
        definition={definition}
        height={240}
        initialWidth={520}
        ariaLabel="Sankey diagram of 10,000 visits flowing to signups, trials and paid plans"
      />
      <ChartLegend>
        <ChartLegendItem color={kept}>Continued</ChartLegendItem>
        <ChartLegendItem color={lost}>Left</ChartLegendItem>
      </ChartLegend>
      <ChartTable
        caption="Users moving between steps"
        columns={["From", "To", "Users"]}
        rows={links.map((row) => [
          label(row.source),
          label(row.target),
          row.users,
        ])}
      />
    </ChartFrame>
  );
}
