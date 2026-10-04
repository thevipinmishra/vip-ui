import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { catalogComponents, getComponent } from "@/lib/catalog";
import { customComponentApi, customGuidance } from "@/lib/component-api";
import {
  type ComponentPageData,
  getComponentPageData,
} from "@/lib/component-examples";
import { buildComponentMarkdown } from "@/lib/component-markdown";
import { readRegistryItem, registryUrl } from "@/lib/registry-docs";
import { siteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

const demoDirectory = path.join(process.cwd(), "src/components/docs");

export function generateStaticParams() {
  return catalogComponents.map((component) => ({ slug: component.slug }));
}

async function findUsageFile(slug: string): Promise<string | null> {
  for (const filename of [`${slug}-basic-demo.tsx`, `${slug}-demo.tsx`]) {
    try {
      await access(path.join(demoDirectory, filename));
      return filename;
    } catch {
      // Try the next candidate.
    }
  }
  return null;
}

async function readDemoSource(filename: string) {
  return (
    await readFile(path.join(demoDirectory, path.basename(filename)), "utf8")
  ).replaceAll("@/components/ui/", "@/components/vip-ui/");
}

async function buildExamples(pageData: ComponentPageData) {
  return Promise.all(
    pageData.examples.map(async (example) => ({
      title: example.title,
      description: example.description,
      code: await readDemoSource(example.sourcePath),
      filename: path.basename(example.sourcePath),
      prerequisite: example.prerequisite,
    })),
  );
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const component = getComponent(slug);
  if (!component) return new Response("Not found", { status: 404 });

  const registryItem = await readRegistryItem(slug);
  const pageData = getComponentPageData(slug);
  const usageFilename = pageData?.usage ?? (await findUsageFile(slug));
  const usage = usageFilename
    ? {
        code: await readDemoSource(usageFilename),
        filename: path.basename(usageFilename),
      }
    : undefined;

  const markdown = buildComponentMarkdown({
    slug,
    name: component.name,
    description:
      pageData?.description ?? registryItem.description ?? component.useFor,
    site: siteUrl(),
    registryItem,
    cliUrl: registryUrl(slug),
    usage,
    guidance: customGuidance[slug],
    api: customComponentApi[slug],
    examples: pageData ? await buildExamples(pageData) : undefined,
    reactAriaDocsHref: component.reactAriaDocsHref,
  });

  return new Response(markdown, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
