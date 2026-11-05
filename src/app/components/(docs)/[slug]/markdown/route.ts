import { access, readFile } from "node:fs/promises";
import path from "node:path";
import {
  catalogDocComponents,
  componentName,
  getComponent,
  getDocGroup,
} from "@/lib/catalog";
import { componentApi } from "@/lib/component-api";
import {
  type ComponentPageData,
  getComponentPageData,
  getComponentUsage,
} from "@/lib/component-examples";
import {
  buildComponentMarkdown,
  buildGroupedComponentMarkdown,
} from "@/lib/component-markdown";
import {
  manualInstallPlan,
  readRegistryItem,
  registryUrl,
} from "@/lib/registry-docs";
import { siteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

const demoDirectory = path.join(process.cwd(), "src/components/docs");

export function generateStaticParams() {
  return catalogDocComponents.map((component) => ({ slug: component.slug }));
}

async function findUsageFile(slug: string): Promise<string | null> {
  for (const filename of [`${slug}-basic-demo.tsx`, `${slug}-demo.tsx`]) {
    try {
      await access(path.join(demoDirectory, filename));
      return filename;
    } catch {}
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
      uses: example.uses?.map(componentName),
    })),
  );
}

async function buildUsage(
  slug: string,
  pageData: ComponentPageData | undefined,
) {
  const pageUsage = getComponentUsage(slug);
  const usageFilename = pageData?.usage ?? (await findUsageFile(slug));
  return pageUsage
    ? {
        code: pageUsage.code,
        filename: pageUsage.filename ?? `${slug}-usage.tsx`,
      }
    : usageFilename
      ? {
          code: await readDemoSource(usageFilename),
          filename: path.basename(usageFilename),
        }
      : undefined;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const component = getComponent(slug);
  if (!component) return new Response("Not found", { status: 404 });

  const group = getDocGroup(slug);
  if (group) {
    const members = await Promise.all(
      group.members.map(async (memberSlug) => {
        const member = getComponent(memberSlug);
        if (!member) {
          throw new Error(
            `The ${group.slug} docs group includes ${memberSlug}, but the catalog has no entry for it.`,
          );
        }
        const pageData = getComponentPageData(memberSlug);
        const registryItem = await readRegistryItem(memberSlug);
        return {
          slug: memberSlug,
          name: member.name,
          description: member.description,
          manual: manualInstallPlan(registryItem, memberSlug),
          cliUrl: registryUrl(memberSlug),
          usage: await buildUsage(memberSlug, pageData),
          api: componentApi[memberSlug],
          examples: pageData ? await buildExamples(pageData) : undefined,
          reactAria: member.reactAria,
        };
      }),
    );
    const markdown = buildGroupedComponentMarkdown({
      slug,
      name: group.name,
      description: group.description,
      site: siteUrl(),
      members,
    });
    return new Response(markdown, {
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    });
  }

  const registryItem = await readRegistryItem(slug);
  const pageData = getComponentPageData(slug);
  const usage = await buildUsage(slug, pageData);

  const markdown = buildComponentMarkdown({
    slug,
    name: component.name,
    description: component.description,
    site: siteUrl(),
    manual: manualInstallPlan(registryItem, slug),
    cliUrl: registryUrl(slug),
    usage,
    api: componentApi[slug],
    examples: pageData ? await buildExamples(pageData) : undefined,
    reactAria: component.reactAria,
  });

  return new Response(markdown, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
