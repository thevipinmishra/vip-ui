import { themes } from "@/app/themes/themes";

export function buildThemeMarkdown(site: string) {
  const items = themes.map(
    (theme) => `- ${theme.name}: \`@vip-ui/theme-${theme.slug}\``,
  );
  return [
    "# Themes",
    "",
    "A vip/ui theme is a registry item that sets the shadcn color tokens for light and dark mode. It writes the values to the global CSS of the project and maps them in `@theme inline`.",
    "",
    "## Installation",
    "",
    "Install one theme by name, such as the Blue theme:",
    "",
    "```bash",
    "npx shadcn@latest add @vip-ui/theme-blue",
    "```",
    "",
    `Or use its registry URL: \`${site}/r/theme-blue.json\`. If the CLI asks before an overwrite, answer No. Then run the project build and its type check.`,
    "",
    "The CLI writes the light values to `:root` and the dark values to `.dark`, plus the Tailwind color mappings in `@theme inline`. A theme changes the colors on purpose: keep its declarations, including a new `.dark` block. Do not restore the values that the project had before the install.",
    "",
    "## Available themes",
    "",
    "Add `@vip-ui/` before each name, or use the matching JSON URL:",
    "",
    ...items,
    "",
    "## Manual",
    "",
    `Open ${site}/themes, select the theme, and copy its CSS into the global CSS file after the imports. Put the \`dark\` class on \`<html>\` to use the dark values.`,
    "",
    `Documentation: ${site}/themes`,
    "",
  ].join("\n");
}
