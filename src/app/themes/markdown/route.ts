import { agentSiteUrl } from "@/lib/site-url";
import { buildThemeMarkdown } from "@/lib/theme-markdown";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildThemeMarkdown(agentSiteUrl()), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
