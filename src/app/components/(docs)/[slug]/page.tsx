import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComponentPage } from "@/components/docs/component-page";
import { loadDemo } from "@/components/docs/demo-loader";
import {
  catalogComponents,
  componentDescription,
  componentName,
} from "@/lib/catalog";
import {
  getComponentPageData,
  getComponentUsage,
} from "@/lib/component-examples";
import { notFoundMetadata, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return catalogComponents.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/components/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = getComponentPageData(slug);
  if (!page) {
    return notFoundMetadata({
      title: "Component not found",
      description:
        "This address does not match a component in the vip/ui catalog. Browse the catalog to find the right component.",
    });
  }
  return pageMetadata({
    title: componentName(slug),
    description: `${componentDescription(slug)} ${page.summary ?? "See live examples, copy the source, and add it to your project with the shadcn CLI."}`,
    path: `/components/${slug}`,
    image: "file",
  });
}

export default async function ComponentDocsPage({
  params,
}: PageProps<"/components/[slug]">) {
  const { slug } = await params;
  const page = getComponentPageData(slug);
  if (!page) notFound();
  const [preview, examples] = await Promise.all([
    loadDemo(page.usage),
    Promise.all(
      page.examples.map(async (example) => ({
        ...example,
        preview: await loadDemo(example.sourcePath, example.previewProps),
      })),
    ),
  ]);
  return (
    <ComponentPage
      name={componentName(slug)}
      description={componentDescription(slug)}
      preview={preview}
      previewSourcePath={`src/components/docs/${page.usage}`}
      previewUses={page.previewUses}
      exampleFile={page.exampleFile}
      usage={getComponentUsage(slug)}
      examples={examples}
      sourcePath={`src/components/ui/${slug}.tsx`}
    />
  );
}
