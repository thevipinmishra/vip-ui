/** The canonical hostname for the public site. */
export const SITE_DOMAIN = "vip-ui.dev";

const PRODUCTION_ORIGIN = `https://${SITE_DOMAIN}`;

function parseOrigin(value: string | undefined): URL | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);
    return url.protocol === "https:" || url.protocol === "http:" ? url : null;
  } catch {
    return null;
  }
}

/**
 * The site's public origin, used by canonical URLs, Open Graph URLs,
 * robots.txt, the sitemap, and the manifest.
 *
 * Production always resolves to the canonical domain. NEXT_PUBLIC_SITE_URL is
 * an override for self-hosted copies, but a generated deployment host such as
 * vip-ui.vercel.app is never accepted as the public origin.
 */
export function siteUrl(): string {
  const configured = parseOrigin(process.env.NEXT_PUBLIC_SITE_URL);

  if (process.env.NODE_ENV === "development") {
    return configured?.origin ?? "http://localhost:3000";
  }

  if (configured && !configured.hostname.endsWith(".vercel.app")) {
    return configured.origin;
  }

  return PRODUCTION_ORIGIN;
}
