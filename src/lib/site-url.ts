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

/**
 * The origin of the current preview deployment, or null outside a preview.
 *
 * `next.config.ts` sets NEXT_PUBLIC_DEPLOY_ORIGIN to the Vercel URL on a
 * preview and to an empty string everywhere else, so a preview can test the
 * agent flow against itself before a release.
 */
export function deployOrigin(): string | null {
  return parseOrigin(process.env.NEXT_PUBLIC_DEPLOY_ORIGIN)?.origin ?? null;
}

/**
 * The origin for agent-facing URLs: prompts, llms.txt, and Markdown.
 *
 * A preview deploy points at itself. Development points at localhost, whatever
 * NEXT_PUBLIC_SITE_URL says, so no local prompt sends an agent to production.
 * Production falls back to siteUrl().
 */
export function agentSiteUrl(): string {
  return (
    deployOrigin() ??
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : siteUrl())
  );
}
