import { readBlockRegistryItem } from "@/lib/block-markdown";
import { blocks } from "@/lib/blocks";

export const dynamic = "force-static";

function blockPrefix(name: string) {
  return `@components/blocks/${name}/`;
}

export async function generateStaticParams() {
  const params = await Promise.all(
    blocks.map(async (block) => {
      const item = await readBlockRegistryItem(block.name);
      const prefix = blockPrefix(block.name);
      return item.files.map((file) => {
        if (!file.target.startsWith(prefix))
          throw new Error(
            `Block ${block.name} has the foreign file ${file.target}`,
          );
        return {
          name: block.name,
          file: file.target.slice(prefix.length).split("/"),
        };
      });
    }),
  );
  return params.flat();
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string; file: string[] }> },
) {
  const { name, file } = await params;
  if (!blocks.some((block) => block.name === name)) {
    return new Response("Not found", { status: 404 });
  }

  const relative = file.join("/");
  const item = await readBlockRegistryItem(name);
  const match = item.files.find(
    (candidate) => candidate.target === `${blockPrefix(name)}${relative}`,
  );
  if (!match) return new Response("Not found", { status: 404 });

  return Response.json(
    {
      name,
      type: "registry:file",
      files: [
        {
          path: `components/blocks/${name}/${relative}`,
          target: match.target,
          content: match.content,
        },
      ],
    },
    {
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
    },
  );
}
