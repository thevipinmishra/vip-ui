import { readFile } from "node:fs/promises";
import path from "node:path";
import { getComponent } from "./catalog";
import internalDescriptions from "./internal-descriptions.json";

export interface RegistryFile {
  path: string;
  target: string;
  content: string;
}

export interface RegistryItem {
  name: string;
  title?: string;
  description?: string;
  dependencies: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
}

const sharedFileSlugs = [
  "utils",
  "motion",
  "effect-color",
  "size",
  "button-styles",
  "field-styles",
  "date-segment",
  "collapsible-panel",
  "item-highlight",
] as const satisfies readonly (keyof typeof internalDescriptions)[];

export type SharedFileSlug = (typeof sharedFileSlugs)[number];

export const sharedFiles = Object.fromEntries(
  sharedFileSlugs.map((slug) => [slug, internalDescriptions[slug]]),
) as Record<SharedFileSlug, string>;

export type RequiredFile =
  | { kind: "component"; slug: string; name: string; file: RegistryFile }
  | {
      kind: "shared";
      slug: SharedFileSlug;
      description: string;
      file: RegistryFile;
    };

export interface ManualInstallPlan {
  packages: string[];
  component: RegistryFile;
  requires: RequiredFile[];
}

async function readItemFile(name: string): Promise<RegistryItem> {
  return JSON.parse(
    await readFile(
      path.join(process.cwd(), "public/r", `${name}.json`),
      "utf8",
    ),
  ) as RegistryItem;
}

function packageName(dependency: string) {
  const at = dependency.indexOf("@", 1);
  return at === -1 ? dependency : dependency.slice(0, at);
}

export async function readRegistryItem(slug: string): Promise<RegistryItem> {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
    throw new Error("Invalid component slug");
  const item = await readItemFile(`vip-${slug}`);
  const files = new Map<string, RegistryFile>();
  const packages = new Map<string, string>();
  const devPackages = new Map<string, string>();
  const visited = new Set<string>();
  async function visit(current: RegistryItem) {
    for (const file of current.files)
      if (!files.has(file.target)) files.set(file.target, file);
    for (const dependency of current.dependencies)
      packages.set(packageName(dependency), dependency);
    for (const dependency of current.devDependencies ?? [])
      devPackages.set(packageName(dependency), dependency);
    for (const url of current.registryDependencies ?? []) {
      const name = url.match(/\/r\/(vip-[a-z0-9-]+)\.json$/)?.[1];
      if (!name) throw new Error(`Unknown registry dependency ${url}`);
      if (visited.has(name)) continue;
      visited.add(name);
      await visit(await readItemFile(name));
    }
  }
  visited.add(item.name);
  await visit(item);
  const sorted = (entries: Map<string, string>) =>
    [...entries.keys()].sort().map((name) => entries.get(name) as string);
  return {
    ...item,
    dependencies: sorted(packages),
    ...(devPackages.size > 0 && { devDependencies: sorted(devPackages) }),
    files: [...files.values()],
  };
}

export const registryNamespace = "@vip-ui";

function registryOrigin() {
  const base =
    process.env.NEXT_PUBLIC_REGISTRY_URL ||
    (process.env.NODE_ENV === "development" ? "http://localhost:3000" : null);
  return base ? base.replace(/\/$/, "") : null;
}

export function registryUrl(slug: string) {
  const origin = registryOrigin();
  return origin ? `${origin}/r/vip-${slug}.json` : null;
}

export function registryNamespaceUrl() {
  const origin = registryOrigin();
  return origin ? `${origin}/r/{name}.json` : null;
}

export function fileName(file: RegistryFile) {
  return path.posix.basename(file.target);
}

export function fileSlug(file: RegistryFile) {
  return fileName(file).replace(/\.tsx?$/, "");
}

export function displayPath(file: RegistryFile) {
  return `components/vip-ui/${fileName(file)}`;
}

function isSharedFileSlug(slug: string): slug is SharedFileSlug {
  return Object.hasOwn(sharedFiles, slug);
}

export function manualInstallPlan(
  item: RegistryItem,
  slug: string,
): ManualInstallPlan {
  const component = item.files.find((file) => fileSlug(file) === slug);
  if (!component) throw new Error(`Missing registry source for ${slug}`);
  const components: RequiredFile[] = [];
  const shared: RequiredFile[] = [];
  for (const file of item.files) {
    if (file === component) continue;
    const s = fileSlug(file);
    const catalogComponent = getComponent(s);
    if (catalogComponent) {
      components.push({
        kind: "component",
        slug: s,
        name: catalogComponent.name,
        file,
      });
    } else if (isSharedFileSlug(s)) {
      shared.push({
        kind: "shared",
        slug: s,
        description: sharedFiles[s],
        file,
      });
    } else {
      throw new Error(
        `${s} is required by ${slug} but has no docs page and no sharedFiles entry`,
      );
    }
  }
  return {
    packages: item.dependencies,
    component,
    requires: [...components, ...shared],
  };
}

export async function readSharedFile(
  slug: SharedFileSlug,
): Promise<RegistryFile> {
  for (const extension of ["tsx", "ts"] as const) {
    const name = `${slug}.${extension}`;
    try {
      return {
        path: `registry/generated/src/components/vip-ui/${name}`,
        target: `@components/vip-ui/${name}`,
        content: await readFile(
          path.join(
            process.cwd(),
            "registry/generated/src/components/vip-ui",
            name,
          ),
          "utf8",
        ),
      };
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  }
  throw new Error(`Missing shared file ${slug}`);
}
