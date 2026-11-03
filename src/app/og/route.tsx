import { ogChips, ogColors, renderOgCard, truncateDescription } from "@/lib/og";
import { site } from "@/lib/seo";

const accents = {
  teal: ogColors.teal,
  amber: ogColors.amber,
} as const;

function text(
  value: string | null | undefined,
  fallback: string,
  maxLength: number,
) {
  return truncateDescription(value?.trim() || fallback, maxLength);
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const accent = params.get("accent");

  const image = renderOgCard({
    eyebrow: text(params.get("eyebrow")?.slice(0, 80), "vip/ui", 42),
    title: text(params.get("title")?.slice(0, 240), site.tagline, 82),
    description: text(
      params.get("description")?.slice(0, 360),
      site.description,
      180,
    ),
    meta: params.get("meta")?.slice(0, 60) || site.domain,
    snippet: params.get("snippet")?.slice(0, 48) || undefined,
    accent: accent === "amber" ? accents.amber : accents.teal,
    chips: ogChips,
  });

  image.headers.set("X-Robots-Tag", "noindex");
  image.headers.set(
    "Cache-Control",
    "public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400",
  );

  return image;
}
