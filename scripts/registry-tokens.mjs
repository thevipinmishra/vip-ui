export const shadcnColors = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "border",
  "input",
  "ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
];

const tailwindAnimations = ["spin", "ping", "pulse", "bounce", "none"];
const tailwindEasings = ["linear", "in", "out", "in-out", "initial"];
const defaultNamespaces = ["radius-", "font-"];
const colorUtilities = [
  "bg",
  "text",
  "border",
  "border-[xytrblse]",
  "divide",
  "outline",
  "ring",
  "ring-offset",
  "inset-ring",
  "shadow",
  "inset-shadow",
  "drop-shadow",
  "text-shadow",
  "fill",
  "stroke",
  "from",
  "via",
  "to",
  "decoration",
  "accent",
  "caret",
  "placeholder",
].join("|");

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function word(pattern) {
  return new RegExp(`(?<![\\w-])${pattern}(?![\\w-])`);
}

function block(source, start) {
  const open = source.indexOf("{", start);
  let depth = 0;
  for (let index = open; index < source.length; index++) {
    if (source[index] === "{") depth++;
    else if (source[index] === "}" && --depth === 0)
      return { open, close: index };
  }
  throw new Error("Unclosed CSS block");
}

export function keyframeBlocks(source) {
  const blocks = new Map();
  for (const match of source.matchAll(/@keyframes\s+([\w-]+)\s*\{/g)) {
    const { open, close } = block(source, match.index);
    blocks.set(match[1], source.slice(open + 1, close));
  }
  return blocks;
}

export function siteTokens(source) {
  const css = source.replace(/\r\n/g, "\n").replace(/\/\*[\s\S]*?\*\//g, "");
  const themeStart = css.indexOf("@theme");
  const theme = themeStart === -1 ? undefined : block(css, themeStart);
  const themeCss = theme ? css.slice(theme.open + 1, theme.close) : "";
  const rest = theme
    ? css.slice(0, themeStart) + css.slice(theme.close + 1)
    : css;
  const declared = (text) =>
    new Set(
      [...text.matchAll(/(?:^|[;{}])\s*--([\w-]+)\s*:/g)].map(
        (match) => match[1],
      ),
    );
  const classes = new Set();
  for (const [, prelude] of rest.matchAll(/([^{};]+)\{/g)) {
    if (prelude.trim().startsWith("@")) continue;
    for (const [, name] of prelude.matchAll(/\.([a-zA-Z_][\w-]*)/g))
      classes.add(name);
  }
  classes.delete("dark");
  return {
    vars: declared(rest),
    theme: declared(themeCss),
    keyframes: new Set(keyframeBlocks(css).keys()),
    utilities: new Set(
      [...css.matchAll(/@utility\s+([\w-]+)/g)].map((match) => match[1]),
    ),
    classes,
  };
}

function cssKeys(css, keys = []) {
  for (const [key, value] of Object.entries(css ?? {})) {
    keys.push(key);
    if (value && typeof value === "object") cssKeys(value, keys);
  }
  return keys;
}

export function tokenProblems(item, site) {
  const problems = [];
  const shippedVars = new Set(Object.keys(item.cssVars?.light ?? {}));
  const shippedTheme = new Map(
    Object.entries(item.cssVars?.theme ?? {}).map(([name, value]) => [
      name.replace(/^--/, ""),
      value,
    ]),
  );
  const shippedCss = cssKeys(item.css);
  const shipsKeyframes = (name) => shippedCss.includes(`@keyframes ${name}`);
  const shipsColor = (name) =>
    shadcnColors.includes(name) ||
    shippedVars.has(name) ||
    shippedTheme.has(`color-${name}`);
  const standardVar = (name) =>
    name === "radius" ||
    shadcnColors.includes(name) ||
    (name.startsWith("color-") && shadcnColors.includes(name.slice(6))) ||
    defaultNamespaces.some((namespace) => name.startsWith(namespace));
  const shipsVar = (name) =>
    shippedVars.has(name) ||
    shippedTheme.has(name) ||
    (name.startsWith("color-") && shippedVars.has(name.slice(6)));

  for (const [name, value] of shippedTheme) {
    if (!name.startsWith("animate-")) continue;
    const keyframes = value.match(/^[\w-]+/)?.[0];
    if (!keyframes || !shipsKeyframes(keyframes))
      problems.push(
        `${item.name} ships --${name} without @keyframes ${keyframes}`,
      );
  }
  for (const name of Object.keys(item.cssVars?.dark ?? {}))
    if (!shippedVars.has(name))
      problems.push(`${item.name} ships --${name} for dark mode only`);
  for (const name of shippedVars)
    if (!Object.hasOwn(item.cssVars?.dark ?? {}, name))
      problems.push(`${item.name} ships --${name} for light mode only`);

  const contents = [
    ...(item.files ?? []).map((file) => [file.target, file.content]),
    ...(item.css ? [["css", JSON.stringify(item.css)]] : []),
  ];
  for (const [label, content] of contents) {
    const report = (text) => problems.push(`${item.name} (${label}): ${text}`);
    for (const name of new Set([...site.vars, ...site.theme])) {
      if (!word(`--${escapeRegExp(name)}`).test(content)) continue;
      if (standardVar(name) || shipsVar(name)) continue;
      if (new RegExp(`--${escapeRegExp(name)}["']?\\s*:`).test(content))
        continue;
      report(`uses --${name}, which the item does not ship`);
    }
    for (const key of site.theme) {
      if (!key.startsWith("color-")) continue;
      const name = key.slice(6);
      const match = content.match(
        word(`(?:${colorUtilities})-${escapeRegExp(name)}`),
      );
      if (match && !shipsColor(name))
        report(`uses ${match[0]}, and no shadcn theme or item ships ${name}`);
    }
    for (const key of site.theme) {
      if (!key.startsWith("breakpoint-")) continue;
      const name = escapeRegExp(key.slice(11));
      const match = content.match(
        new RegExp(`(?<![\\w@-])(?:max-|min-)?${name}:`),
      );
      if (match && !shippedTheme.has(key))
        report(`uses the ${match[0]} variant without shipping --${key}`);
    }
    for (const [, name] of content.matchAll(
      /(?<![\w-])animate-([a-z][\w-]*)(?![\w-])/g,
    )) {
      if (tailwindAnimations.includes(name)) continue;
      if (!shippedTheme.has(`animate-${name}`))
        report(`uses animate-${name} without shipping --animate-${name}`);
    }
    for (const [, name] of content.matchAll(
      /(?<![\w-])ease-([a-z][\w-]*)(?![\w-])/g,
    )) {
      if (tailwindEasings.includes(name)) continue;
      if (!shippedTheme.has(`ease-${name}`))
        report(`uses ease-${name} without shipping --ease-${name}`);
    }
    for (const name of site.keyframes) {
      if (!word(escapeRegExp(name)).test(content)) continue;
      if (shipsKeyframes(name) || content.includes(`@keyframes ${name}`))
        continue;
      report(`uses the keyframes ${name} without shipping them`);
    }
    for (const name of new Set([...site.utilities, ...site.classes])) {
      if (
        !new RegExp(`(?<=["'\`\\s])${escapeRegExp(name)}(?=["'\`\\s])`).test(
          content,
        )
      )
        continue;
      if (
        shippedCss.some(
          (key) =>
            key === `@utility ${name}` ||
            word(`\\.${escapeRegExp(name)}`).test(key),
        )
      )
        continue;
      report(`uses the class ${name}, which only the site stylesheet defines`);
    }
  }
  return problems;
}
