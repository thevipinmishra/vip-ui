import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { CategoryTabs } from "@/components/docs/category-tabs";
import { CodeFrame } from "@/components/docs/code-frame";
import { CodeSnippet } from "@/components/docs/code-snippet";
import { PackageManagerCommand } from "@/components/docs/package-manager-command";
import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/docs/page-header";
import { ButtonLink } from "@/components/ui/button-link";
import { getComponent } from "@/lib/catalog";
import {
  type ChartCategory,
  type ChartExample,
  chartCategories,
} from "./catalog";
import { ChartDocumentation } from "./chart-documentation";
import { ChartNextSteps } from "./chart-next-steps";
import { ChartSourceSheet } from "./chart-source-sheet";

const tabs = chartCategories.map((category, index) => ({
  href: index === 0 ? "/charts" : `/charts?chart=${category.slug}`,
  label: category.label,
}));

const bars = [
  { height: "0.7rem", color: "var(--chart-3)" },
  { height: "1.15rem", color: "var(--chart-2)" },
  { height: "0.9rem", color: "var(--chart-4)" },
  { height: "1.45rem", color: "var(--chart-2)" },
  { height: "1.05rem", color: "var(--chart-5)" },
  { height: "1.3rem", color: "var(--chart-3)" },
];

const typePackages: Record<string, string> = {
  "d3-shape": "@types/d3-shape",
};

export async function ChartGallery({
  initialCategory,
}: {
  initialCategory: string;
}) {
  const category =
    chartCategories.find((item) => item.slug === initialCategory) ??
    chartCategories[0];

  return (
    <>
      <PageHeader className="site-container relative isolate items-center pb-10 pt-12 text-center sm:pb-14 sm:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-28 -z-10 mx-auto h-96 max-w-5xl rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, color-mix(in oklab, var(--chart-2) 18%, transparent) 0%, transparent 70%)",
          }}
        />
        <span
          aria-hidden="true"
          className="flex h-7 items-end gap-1.5 opacity-90"
        >
          {bars.map((bar) => (
            <span
              key={`${bar.height}-${bar.color}`}
              className="w-1.5 rounded-full"
              style={{ height: bar.height, background: bar.color }}
            />
          ))}
        </span>
        <PageHeaderHeading className="max-w-3xl text-[clamp(2.5rem,5vw,4.25rem)]">
          Charts that feel <span className="text-muted-foreground">alive.</span>
        </PageHeaderHeading>
        <PageActions className="mt-2 justify-center">
          <ButtonLink href="#gallery">Browse charts</ButtonLink>
        </PageActions>
      </PageHeader>

      <div className="relative mb-16">
        <CategoryTabs
          label="Chart categories"
          tabs={tabs}
          active={tabs[chartCategories.indexOf(category)].href}
        />
        <div className="site-container">
          <ChartCategoryContent category={category} />
        </div>
      </div>

      <div className="site-container">
        <ChartNextSteps />
        <ChartDocumentation />
      </div>
    </>
  );
}

function ChartCategoryContent({ category }: { category: ChartCategory }) {
  return (
    <section
      id="gallery"
      aria-labelledby="category-title"
      className="scroll-mt-32 pt-10"
    >
      <h2
        id="category-title"
        className="text-center text-[clamp(1.5rem,2.4vw,1.875rem)] font-semibold tracking-[-0.045em] text-balance"
      >
        {category.title}
      </h2>
      <div className="mt-8 grid gap-4 lg:grid-cols-2 lg:gap-5">
        {category.examples.map((example) => (
          <div
            key={example.file}
            id={example.file}
            className="relative z-0 flex min-w-0 scroll-mt-28 flex-col rounded-2xl bg-card shadow-[var(--shadow-card)] ring-1 ring-border/70 transition-[box-shadow] duration-300 ease-out-quint hover:z-10 hover:shadow-[var(--shadow-float)] focus-within:z-10"
          >
            <div className="min-w-0 flex-1 pb-2 *:data-[slot=chart-frame]:bg-transparent">
              {example.preview}
            </div>
            <div className="flex min-h-12 items-center justify-between gap-3 border-t border-border/70 py-1.5 pe-2 ps-4 sm:ps-5">
              <span className="truncate text-[13px] font-medium text-muted-foreground">
                {example.name}
              </span>
              <ChartExampleSource example={example} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

async function ChartExampleSource({ example }: { example: ChartExample }) {
  const source = (
    await readFile(
      path.join(
        process.cwd(),
        "src/components/charts/examples",
        `${example.file}.tsx`,
      ),
      "utf8",
    )
  ).replaceAll('"@/components/ui/', '"@/components/vip-ui/');
  const imports = [...source.matchAll(/from "([^"]+)"/g)].map(
    (match) => match[1],
  );
  const components = imports
    .filter(
      (specifier) =>
        specifier.startsWith("@/components/vip-ui/") &&
        specifier !== "@/components/vip-ui/chart",
    )
    .map((specifier) => specifier.slice("@/components/vip-ui/".length));
  const packages = imports.filter(
    (specifier) =>
      !specifier.startsWith("@/") &&
      !specifier.startsWith("@tanstack/charts") &&
      specifier !== "react",
  );
  const devPackages = packages.flatMap((name) =>
    typePackages[name] ? [typePackages[name]] : [],
  );

  return (
    <ChartSourceSheet title={example.name}>
      {(components.length > 0 || packages.length > 0) && (
        <div className="space-y-3 px-5 pt-1">
          {components.length > 0 && (
            <p className="text-[13px] leading-6 text-muted-foreground">
              Also install{" "}
              {components.map((slug, index) => (
                <span key={slug}>
                  {index > 0 && " and "}
                  <Link
                    href={`/components/${slug}#installation`}
                    className="text-primary underline underline-offset-4"
                  >
                    {getComponent(slug)?.name ?? slug}
                  </Link>
                </span>
              ))}
              .
            </p>
          )}
          {packages.length > 0 && (
            <PackageManagerCommand action="add" args={packages.join(" ")} />
          )}
          {devPackages.length > 0 && (
            <PackageManagerCommand
              action="add-dev"
              args={devPackages.join(" ")}
            />
          )}
        </div>
      )}
      <CodeFrame
        code={source}
        filename={`${example.file}.tsx`}
        embedded
        scrollable
      >
        <CodeSnippet code={source} />
      </CodeFrame>
    </ChartSourceSheet>
  );
}
