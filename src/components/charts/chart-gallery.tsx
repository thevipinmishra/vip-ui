import { readFile } from "node:fs/promises";
import path from "node:path";
import { CodeFrame } from "@/components/docs/code-frame";
import { CodeSnippet } from "@/components/docs/code-snippet";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { chartCategories } from "./catalog";
import { ChartCopyButton } from "./chart-copy-button";
import { ChartDocumentation } from "./chart-documentation";
import { ChartFilters } from "./chart-filters";
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
      <section className="mx-auto max-w-7xl px-5 pb-18 pt-24 text-center sm:px-8 sm:pt-32 lg:pt-36">
        <h1 className="text-[clamp(3.5rem,7vw,6rem)] font-semibold leading-none tracking-[-0.07em] [text-wrap:balance]">
          Charts
        </h1>
        <p className="mx-auto mt-6 max-w-[620px] text-base leading-7 text-muted-foreground sm:text-lg">
          Browse live TanStack chart examples. Open a chart to copy its source.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="#gallery" size="lg">
            Browse charts
          </ButtonLink>
          <ButtonLink href="#documentation" variant="outline" size="lg">
            Chart documentation
          </ButtonLink>
        </div>
      </section>
      <div
        id="gallery"
        className="mx-auto max-w-7xl scroll-mt-28 px-5 pb-28 sm:px-8"
      >
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
      </div>
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
    <section aria-labelledby="category-title" className="pt-10">
      <h2
        id="category-title"
        className="text-[clamp(2rem,4vw,3.4rem)] font-semibold tracking-[-0.055em]"
      >
        {category.title}
      </h2>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {category.examples.map((example) => (
          <Card
            key={example.name}
            className="relative z-0 flex min-w-0 flex-col rounded-[22px] hover:z-10 focus-within:z-10"
          >
            <CardHeader className="flex items-center justify-between gap-3">
              <CardTitle>{example.name}</CardTitle>
              <div className="flex shrink-0 items-center gap-2">
                <ChartCopyButton
                  code={source}
                  label={`Copy ${category.label.toLowerCase()} chart source`}
                />
                <ChartSourceDrawer title={example.name}>
                  <CodeFrame
                    code={shared}
                    filename="src/components/charts/chart-plot.tsx"
                    language="tsx"
                    embedded
                    scrollable
                  >
                    <CodeSnippet code={shared} />
                  </CodeFrame>
                  <CodeFrame
                    code={source}
                    filename={sourcePath}
                    language="tsx"
                    embedded
                    scrollable
                  >
                    <CodeSnippet code={source} />
                  </CodeFrame>
                </ChartSourceDrawer>
              </div>
            </CardHeader>
            <CardContent className="min-w-0 flex-1 pb-6 pt-5">
              {example.preview}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
