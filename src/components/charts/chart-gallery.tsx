import { readFile } from "node:fs/promises";
import path from "node:path";
import { ArrowRight } from "reicon-react";
import { CodeFrame } from "@/components/docs/code-frame";
import { CodeSnippet } from "@/components/docs/code-snippet";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent } from "@/components/ui/card";
import { chartCategories } from "./catalog";
import { ChartDocumentation } from "./chart-documentation";
import { ChartFilters } from "./chart-filters";
import { ChartGalleryItem } from "./chart-plot";
import { ChartSourceDrawer } from "./chart-source-drawer";

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
      <section
        id="gallery"
        aria-labelledby="charts-title"
        data-toc-skip
        className="scroll-mt-28 pb-16 pt-10 sm:pt-14"
      >
        <h1
          id="charts-title"
          className="text-[clamp(2.5rem,5vw,3.5rem)] font-semibold tracking-[-0.06em]"
        >
          Charts
        </h1>
        <div className="mb-7 mt-4 flex flex-wrap items-center justify-between gap-5">
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            Choose a chart type, then open View code to copy its source files.
            Screen readers can access exact values in a table for each chart.
          </p>
          <ButtonLink href="#installation" variant="outline" size="sm">
            Install charts <ArrowRight size={15} aria-hidden="true" />
          </ButtonLink>
        </div>
        <ChartFilters
          categories={chartCategories.map(({ slug, label }) => ({
            slug,
            label,
          }))}
          active={{
            slug: category.slug,
            label: category.label,
            content: (
              <ChartCategoryContent
                category={category}
                source={installableSource}
                sourcePath={sourcePath}
                shared={installableShared}
              />
            ),
          }}
        />
      </section>
      <ChartDocumentation />
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
    <section aria-labelledby="category-title" className="pt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2
          id="category-title"
          className="text-xl font-semibold tracking-[-0.035em] sm:text-2xl"
        >
          {category.title}
        </h2>
        <ChartSourceDrawer title={category.title}>
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
        </ChartSourceDrawer>
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

/** Stable deep link for one chart example, for example `bar-monthly-orders`. */
function chartExampleAnchor(categorySlug: string, name: string) {
  const exampleSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${categorySlug}-${exampleSlug}`;
}
