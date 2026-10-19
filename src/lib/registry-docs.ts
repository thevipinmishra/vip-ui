import { readFile } from "node:fs/promises";
import path from "node:path";
import { getComponent } from "./catalog";

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
  files: RegistryFile[];
}

export const sharedFiles = {
  utils: "Merges class names.",
  motion: "Sets the easing and springs of animations.",
  size: "Sets the size scale of controls and groups.",
  "button-styles": "Sets the variants and sizes of buttons.",
  "field-styles": "Sets the styles of input fields.",
  "date-segment": "Shows the editable segments of date and time fields.",
  "collapsible-panel": "Animates disclosure panels.",
  "item-highlight": "Moves one highlight to the hovered or focused item.",
} as const satisfies Record<string, string>;

export type SharedFileSlug = keyof typeof sharedFiles;

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

export async function readRegistryItem(slug: string): Promise<RegistryItem> {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
    throw new Error("Invalid component slug");
  return JSON.parse(
    await readFile(
      path.join(process.cwd(), "public/r", `vip-${slug}.json`),
      "utf8",
    ),
  ) as RegistryItem;
}

export function registryUrl(slug: string) {
  const base =
    process.env.NEXT_PUBLIC_REGISTRY_URL ||
    (process.env.NODE_ENV === "development" ? "http://localhost:3000" : null);
  return base ? `${base.replace(/\/$/, "")}/r/vip-${slug}.json` : null;
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
