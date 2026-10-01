import { CodeSnippet } from "./code-snippet";
import {
  type PackageManager,
  PackageManagerTabs,
} from "./package-manager-tabs";

const managers: PackageManager[] = ["npm", "yarn", "pnpm", "bun"];
const installCommand: Record<PackageManager, string> = {
  npm: "npm install",
  yarn: "yarn add",
  pnpm: "pnpm add",
  bun: "bun add",
};
const runCommand: Record<PackageManager, string> = {
  npm: "npx",
  yarn: "yarn dlx",
  pnpm: "pnpm dlx",
  bun: "bunx",
};

export function PackageManagerCommand({
  action,
  args,
}: {
  action: "run" | "add";
  args: string;
}) {
  const commands = Object.fromEntries(
    managers.map((manager) => [
      manager,
      `${(action === "add" ? installCommand : runCommand)[manager]} ${args}`,
    ]),
  ) as Record<PackageManager, string>;

  return (
    <PackageManagerTabs commands={commands}>
      {managers.map((manager) => (
        <CodeSnippet key={manager} code={commands[manager]} language="bash" />
      ))}
    </PackageManagerTabs>
  );
}
