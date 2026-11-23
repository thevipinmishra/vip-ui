import packageJson from "../../package.json";
import { fileSlug, packageName, readRegistryItem } from "./registry-docs";

export interface ExampleDependencies {
  components: string[];
  packages: string[];
}

const componentImport = "@/components/vip-ui/";
const appPackages = new Set(["next", "react", "react-dom"]);
const versions: Record<string, string> = packageJson.dependencies;

function importSources(code: string) {
  const imports = code.replace(/^\s*["']use client["'];?/, "");
  const statement = /\s*import\s(?:[^;"'`]*?\sfrom\s+)?["']([^"']+)["'];?/gy;
  return [...imports.matchAll(statement)].map((match) => match[1]);
}

function versioned(name: string) {
  const range = versions[name];
  if (!range) throw new Error(`${name} is not in package.json`);
  return `${name}@${/^\d/.test(range) ? `^${range}` : range}`;
}

export async function exampleDependencies(
  slug: string,
  code: string,
): Promise<ExampleDependencies> {
  const sources = importSources(code);
  const component = await readRegistryItem(slug);
  const files = new Set(component.files.map(fileSlug));
  const components = new Set(
    sources
      .filter((source) => source.startsWith(componentImport))
      .map((source) => source.slice(componentImport.length))
      .filter((name) => !files.has(name)),
  );
  const items = await Promise.all([...components].map(readRegistryItem));
  const installed = new Set(
    [component, ...items].flatMap((item) => item.dependencies.map(packageName)),
  );
  const packages = new Set(
    sources
      .filter((source) => !/^(?:@\/|\.)/.test(source))
      .map((source) => {
        const [scope, name] = source.split("/");
        return scope.startsWith("@") ? `${scope}/${name}` : scope;
      })
      .filter((name) => !appPackages.has(name) && !installed.has(name)),
  );
  return {
    components: [...components],
    packages: [...packages].map(versioned),
  };
}

export function withoutRepeats(sections: ExampleDependencies[]) {
  const shown = new Set<string>();
  const unseen = (value: string) => {
    if (shown.has(value)) return false;
    shown.add(value);
    return true;
  };
  return sections.map(({ components, packages }) => ({
    components: components.filter(unseen),
    packages: packages.filter(unseen),
  }));
}
