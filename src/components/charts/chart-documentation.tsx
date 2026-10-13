import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import type { ReactNode } from "react";
import { CodeBlock } from "@/components/docs/code-block";
import { InstallTabs } from "@/components/docs/install-tabs";
import { PackageManagerCommand } from "@/components/docs/package-manager-command";
import { type ApiProp, groupApiProps } from "@/lib/component-api";
import { readRegistryItem, registryUrl } from "@/lib/registry-docs";
import { cn } from "@/lib/utils";

const usage = `import { Chart } from "@tanstack/charts/react";
import {
  ChartCaption,
  ChartDescription,
  ChartFrame,
  ChartLegend,
  ChartTable,
  ChartTitle,
} from "@/components/vip-ui/chart";

<ChartFrame>
  <ChartCaption>
    <ChartTitle>Traffic sources</ChartTitle>
    <ChartDescription>Visits in thousands</ChartDescription>
  </ChartCaption>
  <Chart definition={definition} height={220} ariaLabel="Visits by channel" />
  <ChartLegend items={[{ label: "Direct", color: "var(--ts-chart-1)" }]} />
  <ChartTable caption="Visits by channel" columns={columns} rows={rows} />
</ChartFrame>`;

const theming = `:root {
  --chart-1: oklch(0.57 0.18 255);
  --chart-2: oklch(0.55 0.12 177);
  --chart-3: oklch(0.64 0.16 65);
  --chart-4: oklch(0.59 0.17 313);
  --chart-5: oklch(0.55 0.14 25);
}

.dark {
  --chart-1: oklch(0.74 0.14 255);
  --chart-2: oklch(0.75 0.12 177);
  --chart-3: oklch(0.78 0.14 75);
  --chart-4: oklch(0.77 0.15 313);
  --chart-5: oklch(0.73 0.14 25);
}`;

const override = `<ChartFrame style={{ "--ts-chart-1": "var(--chart-3)" } as CSSProperties}>`;

const api: ApiProp[] = [
  {
    component: "ChartFrame",
    prop: "style",
    type: "CSSProperties",
    defaultValue: "—",
    description:
      "Set --ts-chart-1 to --ts-chart-6 to change the colors of one chart.",
  },
  {
    component: "ChartAction",
    prop: "children",
    type: "ReactNode",
    defaultValue: "—",
    description:
      "Controls for the chart. They show beside the caption, or below it on narrow screens.",
  },
  {
    component: "ChartLegend",
    prop: "items",
    type: "{ label: string; color: string }[]",
    defaultValue: "required",
    description: "One swatch and label for each series.",
  },
  {
    component: "ChartTable",
    prop: "caption",
    type: "string",
    defaultValue: "required",
    description: "Names the table for screen readers.",
  },
  {
    component: "ChartTable",
    prop: "columns",
    type: "string[]",
    defaultValue: "required",
    description: "Column headings. The first column labels each row.",
  },
  {
    component: "ChartTable",
    prop: "rows",
    type: "(string | number)[][]",
    defaultValue: "required",
    description:
      "The exact values. The table is visible to screen readers only.",
  },
];

const parts = [
  ["ChartFrame", "A figure that sets the chart colors and tooltip styles."],
  ["ChartCaption", "The figure caption. Put the title and description in it."],
  ["ChartTitle", "The chart title."],
  ["ChartDescription", "Units, time range, or other short context."],
  ["ChartAction", "Controls, such as a period toggle."],
  ["ChartLegend", "A list of series and their colors."],
  ["ChartTable", "A data table for screen readers."],
] as const;

const linkClass = "text-primary underline underline-offset-4";

export async function ChartDocumentation() {
  const item = await readRegistryItem("chart");
  const cliUrl = registryUrl("chart");
  const packages = item.dependencies.filter((pkg) => pkg !== "cn");
  const apiGroups = groupApiProps(api);

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
            custom={
              <div className="space-y-4">
                <Note>
                  Complete the{" "}
                  <Link
                    href="/components/installation#setup"
                    className={linkClass}
                  >
                    one-time setup
                  </Link>
                  . Install the packages. Then copy the files.
                </Note>
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
          <SectionHeading id="chart-usage">Usage</SectionHeading>
          <Note className="mb-4">
            Build the chart with TanStack{" "}
            <a
              href="https://tanstack.com/charts/latest/docs/framework/react/adapter"
              className={linkClass}
            >
              Chart
            </a>
            . Put it in a ChartFrame.
          </Note>
          <CodeBlock code={usage} filename="traffic-chart.tsx" />
          <dl className="mt-6 divide-y divide-border/70 rounded-xl border border-border/70 bg-card/50 px-4 sm:px-5">
            {parts.map(([name, description]) => (
              <div
                key={name}
                className="grid gap-x-6 gap-y-1 py-3 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)]"
              >
                <dt className="font-mono text-[13px] font-medium text-foreground">
                  {name}
                </dt>
                <dd className="text-[13px] leading-5 text-muted-foreground">
                  {description}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          id="theming"
          aria-labelledby="chart-theming"
          className="scroll-mt-28"
        >
          <SectionHeading id="chart-theming">Theming</SectionHeading>
          <Note className="mb-4">
            Charts use the shadcn colors <code>--chart-1</code> to{" "}
            <code>--chart-5</code>. Set them for light and dark mode.
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
          <ul className="grid gap-2 text-sm leading-6 text-muted-foreground [&>li]:relative [&>li]:ps-4 [&>li]:before:absolute [&>li]:before:start-0 [&>li]:before:top-2.5 [&>li]:before:size-1.5 [&>li]:before:rounded-full [&>li]:before:bg-border">
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
            <li>Animations stop when reduced motion is on.</li>
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
              className="inline-flex items-center gap-1 rounded-md text-sm font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid"
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
          <div className="space-y-8">
            {apiGroups.map(({ component, props }) => (
              <div key={component}>
                <h3 className="mb-3 text-sm font-semibold text-foreground">
                  {component}
                </h3>
                <dl className="divide-y divide-border/70 rounded-xl border border-border/70 bg-card/50 px-4 sm:px-5">
                  {props.map((prop) => (
                    <div
                      key={prop.prop}
                      className="grid gap-x-6 gap-y-1.5 py-4 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)]"
                    >
                      <dt className="min-w-0 font-mono text-[13px] font-medium text-foreground [overflow-wrap:anywhere]">
                        {prop.prop}
                      </dt>
                      <dd className="min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <code className="font-mono [overflow-wrap:anywhere]">
                            {prop.type}
                          </code>
                          {prop.defaultValue === "required" && (
                            <span>Required</span>
                          )}
                        </div>
                        <p className="mt-1.5 text-[13px] leading-5 text-muted-foreground">
                          {prop.description}
                        </p>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
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
