const base = (process.env.BASE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);
const siteOrigin = (process.env.SITE_ORIGIN ?? "https://vip-ui.dev").replace(
  /\/$/,
  "",
);

const problems = [];
const warnings = [];
const titles = new Map();
const descriptions = new Map();
const ogImages = new Set();

function decode(value = "") {
  const named = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
  };

  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity) => {
    if (entity.startsWith("#x")) {
      return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
    }
    if (entity.startsWith("#")) {
      return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
    }
    return named[entity] ?? match;
  });
}

function match(html, expression) {
  return html.match(expression)?.[1]?.trim();
}

function meta(html, attribute, key) {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return decode(
    match(
      html,
      new RegExp(
        `<meta[^>]+${attribute}="${escaped}"[^>]+content="([^"]*)"`,
        "i",
      ),
    ),
  );
}

function canonical(html) {
  return decode(match(html, /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i));
}

function normalisePath(pathname) {
  return pathname === "/" ? "/" : pathname.replace(/\/$/, "");
}

async function fetchText(path) {
  const response = await fetch(`${base}${path}`, { redirect: "manual" });
  return { response, text: await response.text() };
}

const sitemap = await fetchText("/sitemap.xml");
if (!sitemap.response.ok) {
  problems.push(`/sitemap.xml returned ${sitemap.response.status}`);
}

const sitemapUrls = [...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (entry) => decode(entry[1]),
);
const uniqueSitemapUrls = new Set(sitemapUrls);

if (sitemapUrls.length === 0) problems.push("sitemap.xml has no URLs");
if (uniqueSitemapUrls.size !== sitemapUrls.length) {
  problems.push("sitemap.xml contains duplicate URLs");
}

const robots = await fetchText("/robots.txt");
if (!robots.response.ok) {
  problems.push(`/robots.txt returned ${robots.response.status}`);
}
for (const rule of [
  "User-Agent: *",
  "Allow: /",
  "Disallow: /r/",
  "Disallow: /og",
  "Disallow: /components/*/markdown",
  "Disallow: /components/*.md",
  `Sitemap: ${siteOrigin}/sitemap.xml`,
]) {
  if (!robots.text.includes(rule))
    problems.push(`robots.txt is missing: ${rule}`);
}

const manifest = await fetchText("/manifest.webmanifest");
if (!manifest.response.ok) {
  problems.push(`/manifest.webmanifest returned ${manifest.response.status}`);
}
try {
  const data = JSON.parse(manifest.text);
  for (const key of [
    "name",
    "short_name",
    "description",
    "start_url",
    "theme_color",
    "background_color",
    "icons",
  ]) {
    if (!data[key]) problems.push(`manifest is missing ${key}`);
  }
} catch {
  problems.push("manifest.webmanifest is not valid JSON");
}

async function auditPage(url) {
  const path = new URL(url).pathname;
  const { response, text: html } = await fetchText(path);
  if (!response.ok) {
    problems.push(`${path} returned ${response.status}`);
    return;
  }

  const title = decode(match(html, /<title>([^<]*)<\/title>/i));
  const description = meta(html, "name", "description");
  const robotsMeta = meta(html, "name", "robots");
  const canonicalUrl = canonical(html);
  const ogImage = meta(html, "property", "og:image");
  const twitterCard = meta(html, "name", "twitter:card");
  const h1 = match(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i)
    ?.replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!title) problems.push(`${path} has no title`);
  if (!description) problems.push(`${path} has no meta description`);
  if (!canonicalUrl) problems.push(`${path} has no canonical URL`);
  if (!ogImage) problems.push(`${path} has no og:image`);
  if (twitterCard !== "summary_large_image") {
    warnings.push(`${path} twitter:card is ${twitterCard ?? "missing"}`);
  }
  if (!h1) warnings.push(`${path} has no h1`);

  if (title) {
    if (title.includes("| vip/ui | vip/ui")) {
      problems.push(`${path} title has a duplicate site suffix`);
    }
    if (title.length > 75)
      warnings.push(`${path} title is ${title.length} characters`);
    if (titles.has(title)) {
      problems.push(
        `${path} duplicates the title of ${titles.get(title)}: ${title}`,
      );
    } else {
      titles.set(title, path);
    }
  }

  if (description) {
    if (description.length < 70) {
      warnings.push(
        `${path} description is only ${description.length} characters`,
      );
    }
    if (description.length > 170) {
      warnings.push(`${path} description is ${description.length} characters`);
    }
    if (descriptions.has(description)) {
      problems.push(
        `${path} duplicates the description of ${descriptions.get(description)}`,
      );
    } else {
      descriptions.set(description, path);
    }
  }

  if (robotsMeta?.includes("noindex")) {
    problems.push(`${path} is in the sitemap but has noindex`);
  }

  if (canonicalUrl) {
    let canonical;
    try {
      canonical = new URL(canonicalUrl);
    } catch {
      problems.push(`${path} has an invalid canonical URL: ${canonicalUrl}`);
    }
    if (canonical) {
      if (canonical.origin !== siteOrigin) {
        problems.push(
          `${path} canonical origin is ${canonical.origin}, expected ${siteOrigin}`,
        );
      }
      if (normalisePath(canonical.pathname) !== normalisePath(path)) {
        problems.push(`${path} canonical points to ${canonical.pathname}`);
      }
    }
  }

  if (ogImage) {
    try {
      const imageUrl = new URL(ogImage);
      ogImages.add(`${imageUrl.pathname}${imageUrl.search}`);
    } catch {
      problems.push(`${path} og:image is not absolute: ${ogImage}`);
    }
  }
}

for (let index = 0; index < sitemapUrls.length; index += 8) {
  await Promise.all(sitemapUrls.slice(index, index + 8).map(auditPage));
}

const imagePaths = [...ogImages];
for (let index = 0; index < imagePaths.length; index += 6) {
  await Promise.all(
    imagePaths.slice(index, index + 6).map(async (path) => {
      const response = await fetch(`${base}${path}`);
      if (!response.ok) {
        problems.push(`${path} returned ${response.status}`);
        return;
      }
      if (!response.headers.get("content-type")?.startsWith("image/png")) {
        problems.push(`${path} is not image/png`);
        return;
      }
      const image = Buffer.from(await response.arrayBuffer());
      const width = image.readUInt32BE(16);
      const height = image.readUInt32BE(20);
      if (width !== 1200 || height !== 630) {
        problems.push(`${path} is ${width}x${height}, expected 1200x630`);
      }
    }),
  );
}

for (const path of [
  "/blocks/dashboard-01",
  "/blocks/login-01",
  "/blocks/checkout-01",
]) {
  const { response, text: html } = await fetchText(path);
  if (!response.ok) {
    problems.push(`${path} returned ${response.status}`);
    continue;
  }
  const robotsMeta = meta(html, "name", "robots");
  if (!robotsMeta?.includes("noindex")) {
    problems.push(`${path} should be noindex`);
  }
  if (!robotsMeta?.includes("nofollow")) {
    problems.push(`${path} should be nofollow`);
  }
}

const notFound = await fetchText("/this-page-does-not-exist");
if (notFound.response.status !== 404) {
  problems.push(
    `Unknown URL returned ${notFound.response.status}, expected 404`,
  );
}
if (!meta(notFound.text, "name", "robots")?.includes("noindex")) {
  problems.push("The 404 page should be noindex");
}

const componentNotFound = await fetchText(
  "/components/this-component-does-not-exist",
);
if (componentNotFound.response.status !== 404) {
  problems.push(
    `Unknown component returned ${componentNotFound.response.status}, expected 404`,
  );
}
const componentNotFoundTitle = decode(
  match(componentNotFound.text, /<title>([^<]*)<\/title>/i),
);
if (!componentNotFoundTitle.includes("Component not found")) {
  problems.push(
    `Unknown component title is "${componentNotFoundTitle}", expected "Component not found"`,
  );
}
const componentRobots = meta(componentNotFound.text, "name", "robots");
if (componentRobots && !componentRobots.includes("noindex")) {
  problems.push("The component 404 page should be noindex");
}

for (const [path, expected] of [
  ["/r/vip-button.json", "noindex"],
  ["/components/button/markdown", "noindex"],
  ["/components/button.md", "noindex"],
  ["/llms.txt", "noindex"],
  ["/og?title=Button&description=Test", "noindex"],
]) {
  const { response } = await fetchText(path);
  const tag = response.headers.get("x-robots-tag") ?? "";
  if (!tag.includes(expected)) {
    problems.push(`${path} is missing X-Robots-Tag: ${expected}`);
  }
}

const license = await fetch(`${base}/license`, { redirect: "manual" });
if (![301, 302, 307, 308].includes(license.status)) {
  problems.push(`/license returned ${license.status}, expected a redirect`);
}

console.log(`Checked ${sitemapUrls.length} sitemap URLs against ${base}`);
console.log(
  `${titles.size} unique titles, ${descriptions.size} unique descriptions`,
);

if (warnings.length > 0) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const warning of warnings) console.log(`  - ${warning}`);
}

if (problems.length > 0) {
  console.error(`\n${problems.length} problem(s):`);
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exitCode = 1;
} else {
  console.log("\nNo SEO problems found.");
}
