import type {
  BlockSource,
  BlockSourceFile,
} from "@/components/blocks/block-source-types";
import { blocks } from "@/lib/blocks";
import { highlightCode } from "@/lib/highlight";
import {
  readRegistryItem,
  registryNamespace,
  registryUrl,
} from "@/lib/registry-docs";

export const dynamic = "force-static";

export function generateStaticParams() {
  return blocks.map((block) => ({ name: block.name }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;
  if (!blocks.some((block) => block.name === name)) {
    return new Response("Not found", { status: 404 });
  }

  const item = await readRegistryItem(name);
  const entry = item.meta?.entry;
  if (!entry) throw new Error(`Block ${name} has no entry component`);
  const files = item.files
    .filter((file) => file.target.startsWith(`@components/blocks/${name}/`))
    .map(
      (file): BlockSourceFile => ({
        path: file.target.slice(1),
        code: file.content,
        ...highlightCode(
          file.content,
          file.target.endsWith(".ts") ? "ts" : "tsx",
        ),
      }),
    );
  const installUrl = registryUrl(name);
  const source: BlockSource = {
    files,
    command: `npx shadcn@latest add ${installUrl ?? `${registryNamespace}/vip-${name}`}`,
    entry: {
      component: entry.component,
      path: `components/blocks/${name}/${entry.file}`,
    },
  };

  return Response.json(source, {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
  });
}
