import { buildSetupMarkdown } from "@/lib/setup-markdown";
import { siteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildSetupMarkdown(siteUrl()), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
