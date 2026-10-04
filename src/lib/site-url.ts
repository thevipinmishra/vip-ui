/**
 * Public origin of the deployed docs site.
 *
 * `NEXT_PUBLIC_SITE_URL` is the canonical origin for metadata, the sitemap,
 * robots, llms.txt, and Markdown exports. `NEXT_PUBLIC_REGISTRY_URL` is the
 * origin for registry catalog links and CLI install commands; it is accepted
 * here as a fallback so a deployment that only configures the registry still
 * publishes correct absolute links. Both values are inlined at build time.
 *
 * `http://localhost:3000` is a development-only fallback. A production build
 * without either variable throws instead of publishing localhost URLs.
 */
export function siteUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_REGISTRY_URL ||
    (process.env.NODE_ENV === "development" ? "http://localhost:3000" : null);
  if (!url) {
    throw new Error(
      "Set NEXT_PUBLIC_SITE_URL or NEXT_PUBLIC_REGISTRY_URL to the site's public HTTPS origin before building for production.",
    );
  }
  return url.replace(/\/$/, "");
}
