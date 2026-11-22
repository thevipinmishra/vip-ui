import {
  buildBlockMarkdown,
  readBlockRegistryItem,
} from "@/lib/block-markdown";
import { blocks, findBlock } from "@/lib/blocks";
import { registryUrl } from "@/lib/registry-docs";
import { agentSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export function generateStaticParams() {
  return blocks.map((block) => ({ name: block.name }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;
  const block = findBlock(name);
  if (!block) return new Response("Not found", { status: 404 });

  const item = await readBlockRegistryItem(name);
  const entry = item.meta?.entry;
  if (!entry) throw new Error(`Block ${name} has no entry component`);

  const site = agentSiteUrl();
  const itemUrl = registryUrl(name) ?? `${site}/r/${name}.json`;
  const blockPrefix = `@components/blocks/${name}/`;
  const files = item.files.map((file) => {
    if (!file.target.startsWith(blockPrefix))
      throw new Error(`Block ${name} has the foreign file ${file.target}`);
    const relative = file.target.slice(blockPrefix.length);
    const url = relative
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/");
    return {
      path: `components/blocks/${name}/${relative}`,
      url: `${site}/api/blocks/${name}/files/${url}`,
    };
  });
  const dependencies = {
    components: (item.registryDependencies ?? []).map((url) => {
      const dependency = url.match(/\/r\/([a-z0-9-]+)\.json$/)?.[1];
      if (!dependency) throw new Error(`Unknown registry dependency ${url}`);
      return dependency;
    }),
    packages: item.dependencies,
  };

  const markdown = buildBlockMarkdown({
    name,
    title: block.title,
    description: block.description,
    site,
    itemUrl,
    entry: {
      component: entry.component,
      path: `components/blocks/${name}/${entry.file}`,
    },
    files,
    dependencies,
  });

  return new Response(markdown, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
