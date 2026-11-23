import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { deployOrigin, SITE_DOMAIN } from "@/lib/site-url";

export const dynamic = "force-static";

const registryDir = path.join(process.cwd(), "public", "r");
const productionRegistry = `https://${SITE_DOMAIN}/r/`;

export async function generateStaticParams() {
  if (!deployOrigin()) return [];
  const files = await readdir(registryDir);
  return files
    .filter((file) => file.endsWith(".json"))
    .map((file) => ({ item: file.slice(0, -".json".length) }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ item: string }> },
) {
  const origin = deployOrigin();
  const { item } = await params;
  if (!origin || !/^[a-z0-9-]+$/.test(item)) {
    return new Response("Not found", { status: 404 });
  }

  const json = await readFile(path.join(registryDir, `${item}.json`), "utf8")
    .then((text) => text.replaceAll(productionRegistry, `${origin}/r/`))
    .catch(() => null);
  if (json === null) return new Response("Not found", { status: 404 });

  return new Response(json, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
