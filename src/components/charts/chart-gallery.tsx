import { readFile } from "node:fs/promises";
import path from "node:path";
import { ArrowDownIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { CategoryTabs } from "@/components/docs/category-tabs";
import { CodeFrame } from "@/components/docs/code-frame";
import { CodeSnippet } from "@/components/docs/code-snippet";
import { PackageManagerCommand } from "@/components/docs/package-manager-command";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
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
import { ChartSourceSheet } from "./chart-source-sheet";

const tabs = chartCategories.map((category, index) => ({
  href: index === 0 ? "/charts" : `/charts?chart=${category.slug}`,
  label: category.label,
  count: category.examples.length,
}));

const exampleCount = chartCategories.reduce(
  (sum, category) => sum + category.examples.length,
  0,
);

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
      <PageHeader className="site-container pb-10 pt-10 sm:pt-14">
        <PageHeaderHeading>Charts</PageHeaderHeading>
        <PageHeaderDescription>
          {exampleCount} accessible charts, built with TanStack Charts. Copy a
          chart into your app. Then change the data.
        </PageHeaderDescription>
        <PageActions>
          <ButtonLink href="#installation">
            Install charts
            <ArrowDownIcon size={16} aria-hidden="true" />
          </ButtonLink>
        </PageActions>
      </PageHeader>
      <CategoryTabs
        label="Chart categories"
        tabs={tabs}
        active={tabs[chartCategories.indexOf(category)].href}
      />
      <output className="sr-only">Showing {category.label} charts</output>
      <div className="site-container">
        <ChartCategoryContent category={category} />
        <ChartDocumentation />
      </div>
    </>
  );
}

function ChartCategoryContent({ category }: { category: ChartCategory }) {
  return (
    <section aria-labelledby="category-title" className="pb-16 pt-10">
      <h2
        id="category-title"
        className="text-xl font-semibold tracking-[-0.035em] sm:text-2xl"
      >
        {category.title}
      </h2>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {category.examples.map((example) => (
          <div
            key={example.file}
            id={example.file}
            className="relative z-0 flex min-w-0 scroll-mt-28 flex-col rounded-2xl bg-card shadow-[var(--shadow-card)] ring-1 ring-border/70 hover:z-10 focus-within:z-10"
          >
            <div className="min-w-0 flex-1 *:data-[slot=chart-frame]:bg-transparent">
              {example.preview}
            </div>
            <div className="flex min-h-11 items-center justify-between gap-3 border-t border-border/70 py-1 pe-2 ps-4 sm:ps-6">
              <a
                href={`#${example.file}`}
                className="truncate rounded-sm text-xs text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-solid"
              >
                {example.name}
              </a>
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
        <div className="space-y-3 px-6 pt-1">
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
