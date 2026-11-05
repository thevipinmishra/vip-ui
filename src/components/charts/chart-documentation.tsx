import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import type { ReactNode } from "react";
import { ApiReference } from "@/components/docs/api-reference";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentComposition } from "@/components/docs/component-composition";
import type { CompositionPart } from "@/components/docs/component-compositions";
import { Code, ExternalLink, TextLink } from "@/components/docs/guide";
import { InstallTabs } from "@/components/docs/install-tabs";
import { ManualInstall } from "@/components/docs/manual-install";
import { PackageManagerCommand } from "@/components/docs/package-manager-command";
import { sectionTitleClass } from "@/components/docs/page-header";
import type {
  Chart,
  ChartAction,
  ChartFrame,
  ChartLegendItem,
  ChartTable,
  TooltipChart,
} from "@/components/ui/chart";
import { apiPart } from "@/lib/component-api";
import { registryUrl } from "@/lib/registry-docs";
import { cn } from "@/lib/utils";
import { ChartCoverage } from "./chart-coverage";

const usage = `"use client";

import { barY, defineChart } from "@tanstack/charts";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import {
  Chart,
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartLegend,
  ChartLegendItem,
  ChartTable,
  ChartTitle,
} from "@/components/vip-ui/chart";

const rows = [
  { channel: "Direct", visits: 42 },
  { channel: "Search", visits: 31 },
];

const definition = defineChart({
  marks: [barY(rows, { x: "channel", y: "visits", key: "channel" })],
  scales: {
    x: { scale: scaleBand },
    y: { scale: scaleLinear, grid: true },
  },
});

<ChartFrame>
  <ChartCaption>
    <ChartTitle>Traffic sources</ChartTitle>
    <ChartDescription>Visits in thousands</ChartDescription>
  </ChartCaption>
  <Chart definition={definition} height={220} ariaLabel="Visits by channel" />
  <ChartLegend>
    <ChartLegendItem color="var(--ts-chart-1)">Visits</ChartLegendItem>
  </ChartLegend>
  <ChartTable
    caption="Visits by channel, in thousands"
    columns={["Channel", "Visits"]}
    rows={rows.map((row) => [row.channel, row.visits])}
  />
</ChartFrame>`;

const motionRenderer = `import { motion } from "@tanstack/charts/motion";

const gentle = motion({
  transition: { type: "spring", stiffness: 120, damping: 20 },
});

<Chart definition={definition} renderer={gentle} ariaLabel="Weekly revenue" />`;

const motionOff = `import { svgChartRenderer } from "@tanstack/charts/svg/renderer";

<Chart
  definition={definition}
  renderer={svgChartRenderer}
  ariaLabel="Weekly revenue"
/>`;

const canvas = `import { canvasChartRenderer } from "@tanstack/charts/canvas";

<Chart
  definition={definition}
  renderer={canvasChartRenderer}
  ariaLabel="Large scatterplot"
/>`;

const staticSvg = `import { createChartRuntime, renderChartSvg } from "@tanstack/charts";

const runtime = createChartRuntime();
const scene = runtime.render(definition, { width: 720, height: 320 });
const svg = renderChartSvg(scene, { ariaLabel: "Weekly revenue" });
runtime.destroy();`;

const crosshair = `import { crosshair } from "@tanstack/charts/crosshair";

const definition = defineChart({
  marks: [
    lineY(rows, { x: "date", y: "value" }),
    crosshair({ x: { label: true }, y: false }),
  ],
  scales: {
    x: { scale: scaleUtc },
    y: { scale: scaleLinear },
  },
  focus: "group-x",
});`;

const timeScale = `import { scaleUtc } from "d3-scale";
import { scaleLinear } from "@tanstack/charts/scales/linear";

const definition = defineChart({
  marks: [lineY(rows, { x: "date", y: "value" })],
  scales: {
    x: { scale: scaleUtc, nice: true },
    y: { scale: scaleLinear, nice: true },
  },
});`;

const tooltipBody = `import { TooltipChart } from "@/components/vip-ui/chart";

<TooltipChart
  definition={definition}
  ariaLabel="Daily energy use"
  renderTooltipBody={({ defaultBody, pinned, dismiss }) => (
    <EnergyTooltip body={defaultBody} expanded={pinned} onClose={dismiss} />
  )}
/>`;

const composition: CompositionPart[] = [
  {
    part: "ChartFrame",
    note: "Sets the series colors and the tooltip styles.",
    children: [
      {
        part: "ChartCaption",
        optional: true,
        children: [
          { part: "ChartTitle" },
          { part: "ChartValue", optional: true },
          { part: "ChartDescription", optional: true },
        ],
      },
      {
        part: "ChartAction",
        optional: true,
        note: "Shows beside the caption. Moves below it on narrow screens.",
      },
      {
        part: "Chart",
        note: "Owns the motion. Accepts the TanStack core Chart props.",
        children: [
          {
            part: "ChartCenter",
            optional: true,
            note: "Covers the plot and centers its content, such as a donut total.",
          },
        ],
      },
      {
        part: "ChartLegend",
        optional: true,
        children: [{ part: "ChartLegendItem", repeats: true }],
      },
      { part: "ChartTable", note: "Screen readers only." },
    ],
  },
];

const theming = `:root {
  --chart-1: oklch(0.24 0.012 168);
  --chart-2: oklch(0.62 0.11 180);
  --chart-3: oklch(0.63 0.13 75);
  --chart-4: oklch(0.56 0.14 320);
  --chart-5: oklch(0.48 0.13 32);
  --chart-6: oklch(0.43 0.12 280);
}

.dark {
  --chart-1: oklch(0.77 0.01 172);
  --chart-2: oklch(0.63 0.11 180);
  --chart-3: oklch(0.66 0.13 85);
  --chart-4: oklch(0.53 0.15 320);
  --chart-5: oklch(0.56 0.15 27);
  --chart-6: oklch(0.66 0.12 280);
}`;

const override = `<ChartFrame style={{ "--ts-chart-1": "var(--chart-3)" } as CSSProperties}>`;

const api = [
  apiPart<typeof ChartFrame>({
    name: "ChartFrame",
    props: [
      {
        name: "--ts-chart-1",
        type: "color",
        default: "var(--chart-1)",
        description:
          "The color of the first series. --ts-chart-2 to --ts-chart-6 set the other series. Set them in style to change the colors of one chart.",
      },
    ],
  }),
  apiPart<typeof ChartAction>({
    name: "ChartAction",
    props: [
      {
        name: "children",
        type: "ReactNode",
        description: "Controls for the chart, such as a period toggle.",
      },
    ],
  }),
  apiPart<typeof Chart>({
    name: "Chart",
    description:
      "Also accepts the props of the TanStack core Chart, such as definition, ariaLabel, height, and initialWidth.",
    props: [
      {
        name: "renderer",
        type: "ChartRenderer",
        default: "chartMotion",
        description:
          "Draws and animates the chart. chartMotion is a TanStack motion renderer with a spring.",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Content on top of the plot, such as ChartCenter.",
      },
    ],
  }),
  apiPart<typeof TooltipChart>({
    name: "TooltipChart",
    description:
      "Renders chart tooltips with React content. Use renderTooltipBody to replace the pinned tooltip body. Accepts the same props as Chart.",
    props: [
      {
        name: "renderTooltipBody",
        type: "(context) => ReactNode",
        description:
          "Receives points, defaultBody, pinned, and dismiss. Keep controls visible only while pinned.",
      },
    ],
  }),
  apiPart<typeof ChartLegendItem>({
    name: "ChartLegendItem",
    props: [
      {
        name: "color",
        type: "string",
        required: true,
        description: "The series color. Use the same value as the mark.",
      },
      {
        name: "swatch",
        type: '"square" | "line" | "dashed"',
        default: '"square"',
        description:
          "The swatch shape. Use line for a line series and dashed for a dashed line.",
      },
    ],
  }),
  apiPart<typeof ChartTable>({
    name: "ChartTable",
    props: [
      {
        name: "caption",
        type: "string",
        required: true,
        description: "Names the table for screen readers.",
      },
      {
        name: "columns",
        type: "string[]",
        required: true,
        description: "Column headings. The first column labels each row.",
      },
      {
        name: "rows",
        type: "(string | number)[][]",
        required: true,
        description:
          "The exact values. The table is visible to screen readers only.",
      },
    ],
  }),
];

const listClass =
  "grid gap-2 text-sm leading-6 text-muted-foreground [&>li]:relative [&>li]:ps-4 [&>li]:before:absolute [&>li]:before:start-0 [&>li]:before:top-2.5 [&>li]:before:size-1.5 [&>li]:before:rounded-full [&>li]:before:bg-border";

export async function ChartDocumentation() {
  const cliUrl = registryUrl("chart");

  return (
    <section
      id="documentation"
      aria-label="Chart documentation"
      data-toc-skip
      className="border-t border-border/70 pb-24 pt-12"
    >
      <div className="mx-auto max-w-3xl">
        <div className="space-y-14">
          <DocumentationSection id="installation" title="Installation">
            <Note>
              The CLI adds the chart file, its packages, and the series color
              variables. Complete the{" "}
              <TextLink href="/components/installation#setup">
                one-time setup
              </TextLink>{" "}
              first.
            </Note>
            <InstallTabs
              cliAvailable={Boolean(cliUrl)}
              cli={
                cliUrl ? (
                  <PackageManagerCommand
                    action="run"
                    args={`shadcn@latest add ${cliUrl}`}
                  />
                ) : (
                  <Note>
                    The CLI needs a public registry URL. Use the Manual tab.
                  </Note>
                )
              }
              custom={<ManualInstall slug="chart" name="Chart" />}
            />
          </DocumentationSection>

          <DocumentationSection id="usage" title="Usage">
            <Note>
              Build a definition with{" "}
              <ExternalLink href="https://tanstack.com/charts/latest/docs/framework/react/adapter">
                TanStack Charts
              </ExternalLink>
              , then render it inside a ChartFrame. The frame sets the colors
              and the tooltip styles.
            </Note>
            <CodeBlock code={usage} filename="traffic-chart.tsx" />
          </DocumentationSection>

          <DocumentationSection id="composition" title="Composition">
            <Note>
              ChartFrame is the root. Chart draws the plot. The caption, action,
              legend, and table are optional, so add only the parts that the
              chart needs.
            </Note>
            <ComponentComposition parts={composition} />
          </DocumentationSection>

          <DocumentationSection id="motion" title="Motion">
            <Note>
              Chart animates with a TanStack motion renderer. A chart that
              scrolls into view fades in, and its marks grow from their
              baseline.
            </Note>
            <ul className={listClass}>
              <li>
                When the data changes, each mark moves to its new value. Give
                each mark a stable <Code>key</Code>.
              </li>
              <li>
                A chart that is on screen when the page loads does not move. A
                chart that mounts later, for example after navigation, grows in.
              </li>
            </ul>
            <Note>
              Give one chart a renderer to change its motion. This example uses
              a softer spring.
            </Note>
            <CodeBlock code={motionRenderer} filename="revenue-chart.tsx" />
            <Note>Use the static SVG renderer to turn the motion off.</Note>
            <CodeBlock code={motionOff} filename="revenue-chart.tsx" />
          </DocumentationSection>

          <DocumentationSection id="rendering" title="Rendering">
            <Note>
              Chart uses the SVG renderer with motion by default. Use the canvas
              renderer when a chart has many marks.
            </Note>
            <CodeBlock code={canvas} filename="large-scatterplot.tsx" />
            <Note>
              Use the TanStack runtime to generate SVG without a browser. The
              result works for email, static pages, and image export.
            </Note>
            <CodeBlock code={staticSvg} filename="static-chart.ts" />
          </DocumentationSection>

          <DocumentationSection id="interaction" title="Interaction">
            <Note>
              Add a crosshair for a snapped guide. Use controlled state to add
              zoom, brush, or selection. The gallery has a live example for
              each.
            </Note>
            <CodeBlock code={crosshair} filename="crosshair-chart.tsx" />
            <Note>
              Tooltips can stay inside the chart definition. Use TooltipChart
              when a pinned tooltip needs React controls, nested charts, or a
              portal.
            </Note>
            <CodeBlock code={tooltipBody} filename="energy-tooltip.tsx" />
          </DocumentationSection>

          <DocumentationSection id="scales" title="Scales and data">
            <Note>
              Start with the compact scales for numbers and categories. Use a D3
              scale only when the data needs UTC time, a logarithmic domain, or
              a sequential color ramp.
            </Note>
            <CodeBlock code={timeScale} filename="time-series.ts" />
            <Note>
              TanStack transforms prepare rows before the marks. The gallery
              uses bin, fold, group, rank, normalize, cumulative, rolling
              window, mosaic, waterfall, tree, and force layouts.
            </Note>
          </DocumentationSection>

          <DocumentationSection id="theming" title="Theming">
            <Note>
              Charts read six series colors, <Code>--chart-1</Code> to{" "}
              <Code>--chart-6</Code>. Set them for light and dark mode.
            </Note>
            <CodeBlock code={theming} filename="globals.css" language="css" />
            <Note>Set a color on one frame to change a single chart.</Note>
            <CodeBlock code={override} filename="chart.tsx" />
          </DocumentationSection>

          <DocumentationSection id="accessibility" title="Accessibility">
            <ul className={listClass}>
              <li>
                <Code>ariaLabel</Code> names the chart for screen readers.
              </li>
              <li>
                <Code>ChartTable</Code> gives screen readers the exact values.
              </li>
              <li>
                Press Tab to focus a chart that has tooltips. Use the arrow keys
                to move between points.
              </li>
              <li>Press Enter to pin a tooltip. Press Escape to close it.</li>
              <li>
                When reduced motion is on, charts show at once and do not move.
              </li>
            </ul>
          </DocumentationSection>

          <DocumentationSection id="coverage" title="Coverage">
            <Note>
              The gallery covers the TanStack Charts authoring surface below.
              Each link opens a complete example.
            </Note>
            <ChartCoverage />
          </DocumentationSection>

          <section id="api" aria-labelledby="chart-api" className="scroll-mt-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <h2 id="chart-api" className={cn(sectionTitleClass, "mb-0")}>
                API reference
              </h2>
              <a
                href="https://tanstack.com/charts/latest/docs/reference/chart-definitions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md text-sm font-medium text-primary underline decoration-primary/40 underline-offset-4 transition-[color,background-color,box-shadow] duration-150 ease-out-quint hover:decoration-primary focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:decoration-primary-foreground/40 focus-visible:ring-3 focus-visible:ring-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-transparent"
              >
                TanStack Charts API
                <ArrowUpRightIcon size={16} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
            <Note className="mb-6">
              All parts also accept <Code>className</Code> and native HTML
              attributes.
            </Note>
            <ApiReference parts={api} slug="chart" />
          </section>
        </div>
      </div>
    </section>
  );
}

function DocumentationSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`chart-${id}`} className="scroll-mt-8">
      <h2 id={`chart-${id}`} className={cn("mb-4", sectionTitleClass)}>
        {title}
      </h2>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}

function Note({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "max-w-2xl text-[13px] leading-6 text-muted-foreground",
        className,
      )}
    >
      {children}
    </p>
  );
}
