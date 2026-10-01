import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { ChartDemo } from "@/components/docs/chart-demo";
import { ChartLineDemo } from "@/components/docs/chart-line-demo";
import { CodeBlock } from "@/components/docs/code-block";
import { InstallTabs } from "@/components/docs/install-tabs";
import { PackageManagerCommand } from "@/components/docs/package-manager-command";
import { PreviewPanel } from "@/components/docs/preview-panel";
import { readRegistryItem, registryUrl } from "@/lib/registry-docs";

const anatomy = `<ChartFrame>
  <ChartCaption>
    <ChartTitle>New workspace signups</ChartTitle>
    <ChartDescription>Monthly signups, January to June 2026</ChartDescription>
  </ChartCaption>
  <Chart definition={signupsChart} height={260}
    ariaLabel="Monthly workspace signups from January to June 2026" />
  {/* Keep an accessible table from the same rows for exact values. */}
</ChartFrame>`;

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
    "TanStack Chart",
    "definition",
    "ChartDefinition",
    "required",
    "Compose marks, scales, tooltips, and keyboard behavior with TanStack Charts.",
  ],
  [
    "TanStack Chart",
    "ariaLabel",
    "string",
    "required",
    "Name the metric and comparison for assistive technology.",
  ],
] as const;

async function demoSource(filename: string) {
  return (
    await readFile(
      path.join(process.cwd(), "src/components/docs", filename),
      "utf8",
    )
  ).replaceAll("@/components/ui/", "@/components/vip-ui/");
}

export async function ChartDocumentation() {
  const [item, barSource, lineSource] = await Promise.all([
    readRegistryItem("chart"),
    demoSource("chart-demo.tsx"),
    demoSource("chart-line-demo.tsx"),
  ]);
  const cliUrl = registryUrl("chart");
  const packages = item.dependencies.filter((pkg) => pkg !== "cn");

  return (
    <section
      id="documentation"
      aria-labelledby="documentation-title"
      className="mx-auto max-w-7xl scroll-mt-28 px-5 pb-28 sm:px-8"
    >
      <div className="border-t border-border/70 pt-16">
        <h2
          id="documentation-title"
          className="text-[clamp(2rem,4vw,3.4rem)] font-semibold tracking-[-0.055em]"
        >
          Chart documentation
        </h2>
        <div className="mt-12 max-w-4xl space-y-16">
          <section aria-labelledby="documentation-examples">
            <h3
              id="documentation-examples"
              className="mb-6 text-2xl font-semibold tracking-[-0.04em]"
            >
              Examples
            </h3>
            <div className="space-y-8">
              <div>
                <h4 className="mb-4 text-base font-semibold">Bar chart</h4>
                <PreviewPanel
                  code={barSource}
                  filename="src/components/docs/chart-demo.tsx"
                >
                  <ChartDemo />
                </PreviewPanel>
              </div>
              <div>
                <h4 className="mb-4 text-base font-semibold">
                  Trend over time
                </h4>
                <PreviewPanel
                  code={lineSource}
                  filename="src/components/docs/chart-line-demo.tsx"
                >
                  <ChartLineDemo />
                </PreviewPanel>
              </div>
            </div>
          </section>
          <section aria-labelledby="chart-guidance">
            <h3
              id="chart-guidance"
              className="mb-4 text-2xl font-semibold tracking-[-0.04em]"
            >
              Usage guidance
            </h3>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              Define marks, axes, and tooltips with TanStack Charts. ChartFrame
              supplies theme colors and a caption, so it works with different
              chart types. Give each chart a specific ariaLabel and keep an
              accessible table from the same rows when exact values matter.
              Override <code>--chart-1</code> through <code>--chart-5</code> in
              your theme to change the palette.
            </p>
          </section>
          <section
            id="anatomy"
            aria-labelledby="chart-anatomy"
            className="scroll-mt-28"
          >
            <h3
              id="chart-anatomy"
              className="mb-6 text-2xl font-semibold tracking-[-0.04em]"
            >
              Anatomy
            </h3>
            <CodeBlock code={anatomy} filename="chart-anatomy.tsx" />
          </section>
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
