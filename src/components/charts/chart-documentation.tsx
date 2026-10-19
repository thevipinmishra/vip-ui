import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import type { ReactNode } from "react";
import { ApiReference } from "@/components/docs/api-reference";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentComposition } from "@/components/docs/component-composition";
import type { CompositionPart } from "@/components/docs/component-compositions";
import { InstallTabs } from "@/components/docs/install-tabs";
import { ManualInstall } from "@/components/docs/manual-install";
import { PackageManagerCommand } from "@/components/docs/package-manager-command";
import type {
  Chart,
  ChartAction,
  ChartFrame,
  ChartLegendItem,
  ChartTable,
} from "@/components/ui/chart";
import { apiPart } from "@/lib/component-api";
import { registryUrl } from "@/lib/registry-docs";
import { cn } from "@/lib/utils";

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

const linkClass = "text-primary underline underline-offset-4";

const listClass =
  "grid gap-2 text-sm leading-6 text-muted-foreground [&>li]:relative [&>li]:ps-4 [&>li]:before:absolute [&>li]:before:start-0 [&>li]:before:top-2.5 [&>li]:before:size-1.5 [&>li]:before:rounded-full [&>li]:before:bg-border";

export async function ChartDocumentation() {
  const cliUrl = registryUrl("chart");

  return (
    <section
      id="documentation"
      aria-label="Chart documentation"
      data-toc-skip
      className="scroll-mt-28 border-t border-border/70 pb-28 pt-14"
    >
      <div className="max-w-3xl space-y-14">
        <section
          id="installation"
          aria-labelledby="chart-installation"
          className="scroll-mt-28"
        >
          <SectionHeading id="chart-installation">Installation</SectionHeading>
          <InstallTabs
            cliAvailable={Boolean(cliUrl)}
            cli={
              <div className="space-y-4">
                <Note>
                  Complete the{" "}
                  <Link
                    href="/components/installation#setup"
                    className={linkClass}
                  >
                    one-time setup
                  </Link>{" "}
                  first.
                </Note>
                {cliUrl ? (
                  <PackageManagerCommand
                    action="run"
                    args={`shadcn@latest add ${cliUrl}`}
                  />
                ) : (
                  <Note>The CLI needs a public registry URL. Use Manual.</Note>
                )}
              </div>
            }
            custom={<ManualInstall slug="chart" name="Chart" />}
          />
        </section>

        <section
          id="usage"
          aria-labelledby="chart-usage"
          className="scroll-mt-28"
        >
          <SectionHeading id="chart-usage">Usage</SectionHeading>
          <Note className="mb-4">
            Build the definition with{" "}
            <a
              href="https://tanstack.com/charts/latest/docs/framework/react/adapter"
              className={linkClass}
            >
              TanStack Charts
            </a>
            . Show it with Chart, in a ChartFrame.
          </Note>
          <CodeBlock code={usage} filename="traffic-chart.tsx" />
        </section>

        <section
          id="composition"
          aria-labelledby="chart-composition"
          className="scroll-mt-28"
        >
          <SectionHeading id="chart-composition">Composition</SectionHeading>
          <ComponentComposition parts={composition} />
        </section>

        <section
          id="motion"
          aria-labelledby="chart-motion"
          className="scroll-mt-28"
        >
          <SectionHeading id="chart-motion">Motion</SectionHeading>
          <ul className={listClass}>
            <li>
              When a chart scrolls into view, it fades in. Its bar, line, area,
              and arc marks grow from their baseline.
            </li>
            <li>
              A chart that the server renders on screen does not move when the
              page loads. A chart that mounts later, for example after a link,
              grows in.
            </li>
            <li>
              When the data changes, each mark moves to its new value. Give each
              mark a stable <code>key</code>.
            </li>
          </ul>
          <Note className="mb-4 mt-6">
            To change the motion of one chart, give it a renderer.
          </Note>
          <CodeBlock code={motionRenderer} filename="revenue-chart.tsx" />
          <Note className="mb-4 mt-6">
            To stop the motion, use the static SVG renderer.
          </Note>
          <CodeBlock code={motionOff} filename="revenue-chart.tsx" />
        </section>

        <section
          id="theming"
          aria-labelledby="chart-theming"
          className="scroll-mt-28"
        >
          <SectionHeading id="chart-theming">Theming</SectionHeading>
          <Note className="mb-4">
            Charts use the colors <code>--chart-1</code> to{" "}
            <code>--chart-6</code>. Set them for light and dark mode.
          </Note>
          <CodeBlock code={theming} filename="globals.css" language="css" />
          <Note className="mb-4 mt-6">
            To change one chart, set a color on its frame.
          </Note>
          <CodeBlock code={override} filename="chart.tsx" />
        </section>

        <section
          id="accessibility"
          aria-labelledby="chart-accessibility"
          className="scroll-mt-28"
        >
          <SectionHeading id="chart-accessibility">
            Accessibility
          </SectionHeading>
          <ul className={listClass}>
            <li>
              <code>ariaLabel</code> names the chart for screen readers.
            </li>
            <li>
              <code>ChartTable</code> gives screen readers the exact values.
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
        </section>

        <section id="api" aria-labelledby="chart-api" className="scroll-mt-28">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <h2
              id="chart-api"
              className="text-[23px] font-semibold tracking-[-0.045em]"
            >
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
            All parts also accept <code>className</code> and native HTML
            attributes.
          </Note>
          <ApiReference parts={api} slug="chart" />
        </section>
      </div>
    </section>
  );
}

function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="mb-5 text-[23px] font-semibold tracking-[-0.045em]">
      {children}
    </h2>
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
