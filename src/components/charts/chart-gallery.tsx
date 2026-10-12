import { readFile } from "node:fs/promises";
import path from "node:path";
import { ArrowDownIcon } from "@phosphor-icons/react/ssr";
import { CategoryTabs } from "@/components/docs/category-tabs";
import { CodeFrame } from "@/components/docs/code-frame";
import { CodeSnippet } from "@/components/docs/code-snippet";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/docs/page-header";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent } from "@/components/ui/card";
import { chartCategories } from "./catalog";
import { ChartDocumentation } from "./chart-documentation";
import { ChartGalleryItem } from "./chart-plot";
import { ChartSourceSheet } from "./chart-source-sheet";

const tabs = chartCategories.map((category, index) => ({
  href: index === 0 ? "/charts" : `/charts?chart=${category.slug}`,
  label: category.label,
  count: category.examples.length,
}));

export async function ChartGallery({
  initialCategory,
}: {
  initialCategory: string;
}) {
  const category =
    chartCategories.find((item) => item.slug === initialCategory) ??
    chartCategories[0];
  const sourcePath = `src/components/charts/${category.source}`;
  const [shared, source] = await Promise.all([
    readFile(
      path.join(process.cwd(), "src/components/charts/chart-plot.tsx"),
      "utf8",
    ),
    readFile(path.join(process.cwd(), sourcePath), "utf8"),
  ]);
  const installableShared = shared.replaceAll(
    '"@/components/ui/',
    '"@/components/vip-ui/',
  );
  const installableSource = source.replaceAll(
    '"@/components/ui/',
    '"@/components/vip-ui/',
  );

  return (
    <>
      <PageHeader className="site-container pb-10 pt-10 sm:pt-14">
        <PageHeaderHeading>Charts</PageHeaderHeading>
        <PageHeaderDescription>
          Accessible charts, built with TanStack Charts. Add a chart to your
          app. Change it to suit your data.
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
        <ChartCategoryContent
          category={category}
          source={installableSource}
          sourcePath={sourcePath}
          shared={installableShared}
        />
        <ChartDocumentation />
      </div>
    </>
  );
}

function ChartCategoryContent({
  category,
  source,
  sourcePath,
  shared,
}: {
  category: (typeof chartCategories)[number];
  source: string;
  sourcePath: string;
  shared: string;
}) {
  return (
    <section aria-labelledby="category-title" className="pb-16 pt-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2
          id="category-title"
          className="text-xl font-semibold tracking-[-0.035em] sm:text-2xl"
        >
          {category.title}
        </h2>
        <ChartSourceSheet title={category.title}>
          <CodeFrame
            code={shared}
            filename="src/components/charts/chart-plot.tsx"
            embedded
            scrollable
          >
            <CodeSnippet code={shared} />
          </CodeFrame>
          <CodeFrame code={source} filename={sourcePath} embedded scrollable>
            <CodeSnippet code={source} />
          </CodeFrame>
        </ChartSourceSheet>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {category.examples.map((example) => {
          const anchor = chartExampleAnchor(category.slug, example.name);
          return (
            <Card
              key={example.name}
              id={anchor}
              className="relative z-0 flex min-w-0 scroll-mt-28 flex-col rounded-2xl hover:z-10 focus-within:z-10"
            >
              <CardContent className="min-w-0 flex-1 p-0">
                <ChartGalleryItem name={example.name} href={`#${anchor}`}>
                  {example.preview}
                </ChartGalleryItem>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

function chartExampleAnchor(categorySlug: string, name: string) {
  const exampleSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${categorySlug}-${exampleSlug}`;
}
