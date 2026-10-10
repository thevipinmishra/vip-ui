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
