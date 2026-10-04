import { readFile } from "node:fs/promises";
import path from "node:path";

interface RegistryFile {
  path: string;
  target: string;
  content: string;
}

export interface RegistryItem {
  name: string;
  title?: string;
  description?: string;
  dependencies: string[];
  files: RegistryFile[];
}

export async function readRegistryItem(slug: string): Promise<RegistryItem> {
  if (!/^[a-z]+(?:-[a-z]+)*$/.test(slug))
    throw new Error("Invalid component slug");
  return JSON.parse(
    await readFile(
      path.join(process.cwd(), "public/r", `vip-${slug}.json`),
      "utf8",
    ),
  ) as RegistryItem;
}

/**
 * CLI install URL for a component item. Reads only `NEXT_PUBLIC_REGISTRY_URL`
 * on purpose: incomplete registry configuration must hide the install command
 * rather than assume `NEXT_PUBLIC_SITE_URL` is a registry. The localhost
 * fallback applies to development only.
 */
export function registryUrl(slug: string) {
  const base =
    process.env.NEXT_PUBLIC_REGISTRY_URL ||
    (process.env.NODE_ENV === "development" ? "http://localhost:3000" : null);
  return base ? `${base.replace(/\/$/, "")}/r/vip-${slug}.json` : null;
}
