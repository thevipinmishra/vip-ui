import { installSteps, setupDocUrl } from "@/lib/agent-docs";
import { agentSiteUrl } from "@/lib/site-url";
import { chartUsage } from "../chart-usage";

export const dynamic = "force-static";

export function GET() {
  const site = agentSiteUrl();
  const lines = [
    "# Chart",
    "",
    "Chart puts a frame around a TanStack Charts chart. It adds the vip/ui chart colors and tooltip styles. It does not use the shadcn/ui chart API.",
    "",
    "## Installation",
    "",
    "The chart goes to `components/vip-ui/chart.tsx`. It installs `@tanstack/charts` and the vip/ui `motion` and `utils` files.",
    "",
    `If the project has no \`components/vip-ui\` folder, do the [setup](${setupDocUrl(site)}) first. Also do it if the import alias is missing from the root \`tsconfig.json\` or, outside Next.js, from the bundler config. Then:`,
    "",
    ...installSteps(`${site}/r/chart.json`),
    "",
    "## Usage",
    "",
    "`ChartFrame` sets the series colors and the tooltip styles. `Chart` draws a TanStack definition inside it. The caption, legend, and table are optional.",
    "",
    "```tsx",
    chartUsage.trim(),
    "```",
    "",
    "## Examples",
    "",
    "Each chart example is its own registry item and installs `chart.json` with it. Add one with `npx shadcn@latest add <item-url>`, such as:",
    "",
    "```bash",
    `npx shadcn@latest add ${site}/r/chart-area-default.json`,
    "```",
    "",
    `Example item names start with \`chart-\`, such as \`chart-area-default\`, \`chart-bar-default\`, and \`chart-line-default\`. Browse every example in the [chart gallery](${site}/charts#gallery).`,
    "",
    `Documentation: ${site}/charts`,
  ];

  return new Response(`${lines.join("\n").trimEnd()}\n`, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
