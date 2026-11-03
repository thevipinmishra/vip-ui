import { codeToTokensBase } from "shiki";
import type {
  BlockSource,
  BlockSourceFile,
  BlockSourceToken,
} from "@/components/blocks/block-source-types";
import { blocks } from "@/lib/blocks";
import {
  readRegistryItem,
  registryNamespace,
  registryUrl,
} from "@/lib/registry-docs";

export const dynamic = "force-static";

export function generateStaticParams() {
  return blocks.map((block) => ({ name: block.name }));
}

async function tokenize(
  code: string,
  language: "ts" | "tsx",
): Promise<BlockSourceToken[][]> {
  const source = code.trim();
  const [light, dark] = await Promise.all([
    codeToTokensBase(source, {
      lang: language,
      theme: "github-light-default",
    }),
    codeToTokensBase(source, {
      lang: language,
      theme: "github-dark-default",
    }),
  ]);
  return light.map((line, lineIndex) =>
    line.map((token, tokenIndex) => ({
      content: token.content,
      light: token.color ?? "currentColor",
      dark:
        dark[lineIndex]?.[tokenIndex]?.color ?? token.color ?? "currentColor",
    })),
  );
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
  const files = await Promise.all(
    item.files
      .filter((file) => file.target.startsWith(`src/app/blocks/${name}/`))
      .map(
        async (file): Promise<BlockSourceFile> => ({
          path: file.target,
          code: file.content,
          tokens: await tokenize(
            file.content,
            file.target.endsWith(".ts") ? "ts" : "tsx",
          ),
        }),
      ),
  );
  const installUrl = registryUrl(name);
  const source: BlockSource = {
    files,
    command: `npx shadcn@latest add ${installUrl ?? `${registryNamespace}/${name}`}`,
  };

  return Response.json(source, {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
  });
}
