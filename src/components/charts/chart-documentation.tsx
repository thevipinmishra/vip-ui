import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { InstallTabs } from "@/components/docs/install-tabs";
import { PackageManagerCommand } from "@/components/docs/package-manager-command";
import { readRegistryItem, registryUrl } from "@/lib/registry-docs";

const usage = `"use client";

import { barY, defineChart } from "@tanstack/charts";
import { Chart } from "@tanstack/charts/react";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import {
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartTitle,
} from "@/components/vip-ui/chart";

const rows = [
  { month: "Jan", signups: 48 },
  { month: "Feb", signups: 62 },
  { month: "Mar", signups: 55 },
];

const definition = defineChart({
  marks: [barY(rows, { x: "month", y: "signups", fill: "var(--ts-chart-1)" })],
  scales: {
    x: { scale: () => scaleBand().padding(0.12) },
    y: { scale: scaleLinear().domain([0, 70]), grid: true },
  },
});

export function SignupsChart() {
  return (
    <ChartFrame>
      <ChartCaption>
        <ChartTitle>New workspace signups</ChartTitle>
        <ChartDescription>January to March 2026</ChartDescription>
      </ChartCaption>
      <Chart
        definition={definition}
        height={260}
        initialWidth={600}
        ariaLabel="Monthly workspace signups, January to March 2026"
      />
      <table className="sr-only">
        <caption>Monthly workspace signups, January to March 2026</caption>
        <thead><tr><th scope="col">Month</th><th scope="col">Signups</th></tr></thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.month}>
              <th scope="row">{row.month}</th>
              <td>{row.signups}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ChartFrame>
  );
}`;

const api = [
  [
    "ChartFrame",
    "HTML attributes",
    "HTMLAttributes<HTMLElement>",
    "—",
    "Accepts children, className, and native HTML attributes.",
  ],
  [
    "ChartCaption",
    "HTML attributes",
    "HTMLAttributes<HTMLElement>",
    "—",
    "Accepts children, className, and native HTML attributes.",
  ],
  [
    "ChartTitle",
    "HTML attributes",
    "HTMLAttributes<HTMLSpanElement>",
    "—",
    "Accepts children, className, and native HTML attributes.",
  ],
  [
    "ChartDescription",
    "HTML attributes",
    "HTMLAttributes<HTMLSpanElement>",
    "—",
    "Accepts children, className, and native HTML attributes.",
  ],
  [
    "ChartFrame",
    "style",
    "CSSProperties",
    "—",
    "Override the chart palette or tooltip variables for this frame.",
  ],
] as const;

export async function ChartDocumentation() {
  const item = await readRegistryItem("chart");
  const cliUrl = registryUrl("chart");
  const packages = item.dependencies.filter((pkg) => pkg !== "cn");

  return (
    <section
      id="documentation"
      aria-labelledby="documentation-title"
      data-toc-skip
      className="scroll-mt-28 pb-28"
    >
      <div className="border-t border-border/70 pt-16">
        <h2
          id="documentation-title"
          className="text-[clamp(2rem,4vw,3.4rem)] font-semibold tracking-[-0.055em]"
        >
          Chart documentation
        </h2>
        <div className="mt-12 max-w-4xl space-y-16">
          <section
            id="installation"
            aria-labelledby="chart-installation"
            className="scroll-mt-28"
          >
            <h3
              id="chart-installation"
              className="mb-6 text-2xl font-semibold tracking-[-0.04em]"
            >
              Install
            </h3>
            <InstallTabs
              cliAvailable={Boolean(cliUrl)}
              cli={
                <div className="space-y-4">
                  <p className="text-[13px] leading-6 text-muted-foreground">
                    Requires TypeScript, Tailwind v4, and shadcn CSS-variable
                    theming. Complete the{" "}
                    <Link
                      href="/components/installation#setup"
                      className="text-primary underline underline-offset-4"
                    >
                      one-time setup
                    </Link>{" "}
                    before running this command.
                  </p>
                  {cliUrl ? (
                    <PackageManagerCommand
                      action="run"
                      args={`shadcn@latest add ${cliUrl}`}
                    />
                  ) : (
                    <p className="text-[13px] leading-6 text-muted-foreground">
                      The CLI command will be available when the registry has a
                      public URL. Use Custom until then.
                    </p>
                  )}
                </div>
              }
              custom={
                <div className="space-y-5">
                  <p className="text-[13px] leading-6 text-muted-foreground">
                    First complete the{" "}
                    <Link
                      href="/components/installation#setup"
                      className="text-primary underline underline-offset-4"
                    >
                      one-time setup
                    </Link>
                    . Install the dependencies, then copy every file below under
                    your components directory. The{" "}
                    <code className="font-mono text-foreground">
                      @components/
                    </code>{" "}
                    placeholder represents your configured components alias.
                    Review existing files before replacing them, and adjust the
                    import in Usage if your alias differs.
                  </p>
                  {packages.length > 0 && (
                    <PackageManagerCommand
                      action="add"
                      args={packages.join(" ")}
                    />
                  )}
                  {item.files.map((file) => (
                    <CodeBlock
                      key={file.target}
                      code={file.content}
                      filename={file.target}
                    />
                  ))}
                </div>
              }
            />
          </section>
          <section
            id="usage"
            aria-labelledby="chart-usage"
            className="scroll-mt-28"
          >
            <h3
              id="chart-usage"
              className="mb-6 text-2xl font-semibold tracking-[-0.04em]"
            >
              Usage
            </h3>
            <p className="mb-5 max-w-2xl text-sm leading-7 text-muted-foreground">
              Compose TanStack marks and scales inside the installed vip/ui
              frame. <code>ChartFrame</code> maps shadcn&apos;s chart palette
              and tooltip styles; <code>Chart</code> comes from TanStack, not
              vip/ui. Keep static definitions outside render, memoize
              definitions that capture changing rows, and supply a specific{" "}
              <code>ariaLabel</code> and a table when exact values matter.
            </p>
            <CodeBlock code={usage} filename="signups-chart.tsx" />
            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">
              Change <code>--chart-1</code> through <code>--chart-5</code> in
              both themes, or set <code>--ts-chart-1</code> on one frame via its{" "}
              <code>style</code> prop. The gallery above shows grouped tooltips,
              polar marks, and keyed motion. Each View code drawer includes the
              shared plot helper and category file. Keep them side by side, then
              import the example you need. Install{" "}
              <Link
                href="/components/button#installation"
                className="text-primary underline underline-offset-4"
              >
                vip/ui Button
              </Link>{" "}
              before copying the Bar category source. The Radar category also
              needs <code>d3-shape</code> and its TypeScript types,{" "}
              <code>@types/d3-shape</code>.
            </p>
          </section>
          <section
            id="api"
            aria-labelledby="chart-api"
            className="scroll-mt-28"
          >
            <h3
              id="chart-api"
              className="mb-6 text-2xl font-semibold tracking-[-0.04em]"
            >
              API reference
            </h3>
            <p className="mb-5 max-w-2xl text-sm leading-7 text-muted-foreground">
              These are vip/ui frame parts. TanStack owns the chart definition,
              renderer, sizing, tooltip, and keyboard behavior. See the{" "}
              <a
                href="https://tanstack.com/charts/latest/docs/framework/react/adapter"
                className="text-primary underline underline-offset-4"
              >
                React adapter
              </a>{" "}
              and{" "}
              <a
                href="https://tanstack.com/charts/latest/docs/reference/chart-definitions"
                className="text-primary underline underline-offset-4"
              >
                definition API
              </a>{" "}
              for their props.
            </p>
            <div className="overflow-x-auto rounded-xl bg-card shadow-[var(--shadow-card)] ring-1 ring-border/70">
              <table className="w-full min-w-[650px] border-collapse text-left text-[12px]">
                <thead className="bg-muted/60 text-muted-foreground">
                  <tr>
                    {(
                      [
                        "Component",
                        "Prop",
                        "Type",
                        "Default",
                        "Description",
                      ] as const
                    ).map((heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="px-4 py-3 font-semibold"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {api.map(
                    ([component, prop, type, defaultValue, description]) => (
                      <tr
                        key={`${component}-${prop}`}
                        className="border-t border-border/70 align-top"
                      >
                        <th
                          scope="row"
                          className="px-4 py-3 font-mono font-medium text-foreground"
                        >
                          {component}
                        </th>
                        <td className="px-4 py-3 font-mono text-foreground">
                          {prop}
                        </td>
                        <td className="px-4 py-3 font-mono text-muted-foreground">
                          {type}
                        </td>
                        <td className="px-4 py-3 font-mono text-muted-foreground">
                          {defaultValue}
                        </td>
                        <td className="px-4 py-3 leading-5 text-muted-foreground">
                          {description}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
