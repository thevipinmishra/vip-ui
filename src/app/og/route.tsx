import {
  componentOgCard,
  type OgArt,
  ogArts,
  renderOgCard,
  truncateDescription,
} from "@/lib/og";
import { site } from "@/lib/seo";

function text(value: string | null, fallback: string, maxLength: number) {
  return truncateDescription(value?.trim() || fallback, maxLength);
}

function isArt(value: string | null): value is OgArt {
  return ogArts.includes(value as OgArt);
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const component = params.get("component");
  const art = params.get("art");
  const label = params.get("label")?.trim().slice(0, 32);

  const image = component
    ? await componentOgCard(component.slice(0, 64))
    : await renderOgCard({
        title: text(
          params.get("title")?.slice(0, 240) ?? null,
          site.tagline,
          72,
        ),
        description: text(
          params.get("description")?.slice(0, 360) ?? null,
          site.description,
          150,
        ),
        label: label || undefined,
        art: isArt(art) ? art : undefined,
      });

  image.headers.set("X-Robots-Tag", "noindex");
  image.headers.set(
    "Cache-Control",
    "public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400",
  );

  return image;
}
