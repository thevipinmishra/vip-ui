import { buildSetupMarkdown } from "@/lib/setup-markdown";
import { agentSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildSetupMarkdown(agentSiteUrl()), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
