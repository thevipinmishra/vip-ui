import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  reactAriaPlugin,
  referencedVars,
  setupCss,
} from "./registry-theme.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const uiDirectory = path.join(root, "src/components/ui");
const outputDirectory = path.join(root, "public/r");
const sourceDirectory = path.join(root, "registry/generated");
const libSources = new Map(
  await Promise.all(
    ["utils", "motion"].map(async (name) => [
      name,
      await readFile(path.join(root, `src/lib/${name}.ts`), "utf8"),
    ]),
  ),
);
const packageJson = JSON.parse(
  await readFile(path.join(root, "package.json"), "utf8"),
);
const registryOrigin =
  process.env.NEXT_PUBLIC_REGISTRY_URL || "https://vip-ui.vercel.app";
const descriptions = {
  "agent-status": "Show an agent's current step and outcome.",
  accordion: "Reveal one or more sections of related content.",
  alert: "Show information, success, warning, or error messages.",
  "animated-number":
    "Animate a changing value while keeping its accessible text stable.",
  autocomplete: "Find suggestions as you type in a text field.",
  attachment: "Preview and manage files before or during an upload.",
  avatar: "Show a person with an image or initials.",
  badge: "Label an item with short status or metadata.",
  breadcrumbs: "Link back through a page hierarchy.",
  "button-link":
    "Style a navigation link like a button without tying it to a router.",
  "button-group":
    "Group related actions without turning them into a selection control.",
  "button-styles":
    "Shared variants and sizes used by vip/ui buttons and links.",
  button: "Trigger an action with primary, secondary, or destructive emphasis.",
  calendar: "Choose a date in a keyboard-accessible calendar.",
  card: "Group related content, actions, and metadata.",
  chart: "Frame a TanStack chart with shadcn chart colors and tooltip styles.",
  "checkbox-group": "Select any number of related options in a form.",
  checkbox: "Toggle an independent choice in a form.",
  "collapsible-panel":
    "Animate a disclosure panel while keeping its content accessible.",
  "color-field": "Enter a color using a text value.",
  "color-picker": "Choose a color with visual controls and a hex field.",
  "color-swatch-picker": "Choose from a set of color swatches.",
  "color-swatch": "Show a named color sample.",
  "copy-button": "Copy a value with success and failure feedback.",
  "combo-box": "Filter and select one or several options.",
  "context-menu":
    "Open actions beside an item with pointer, touch, or keyboard.",
  "command-palette": "Find and run actions with keyboard search.",
  "data-table":
    "Search, filter, sort, select, and paginate rows in a client-side table.",
  "date-field": "Enter a date one editable segment at a time.",
  "date-picker": "Choose a single date from a field and calendar.",
  "date-range-picker": "Choose a start and end date from a field and calendar.",
  "date-segment": "Render the editable segments used in date and time fields.",
  "description-list": "Pair labels with related values.",
  dialog: "Show a focused task above the current page.",
  disclosure: "Reveal optional details in place.",
  "drop-zone": "Accept files by drag and drop or file picker.",
  "empty-state": "Explain why a collection is empty and what to do next.",
  fieldset: "Group related native form controls under a legend.",
  "field-styles": "Shared theme-aware styling for text and segmented fields.",
  "file-trigger": "Open a file picker from an accessible trigger.",
  form: "Group fields and handle form validation.",
  "grid-list": "Select and act on rows with keyboard navigation.",
  "input-group": "Combine an input with a prefix, suffix, or action.",
  "inline-edit": "Edit text in place and handle save errors.",
  "kbd-code": "Display keyboard shortcuts and inline code.",
  link: "Navigate with an accessible text link.",
  "list-box": "Select an option from a visible list.",
  "layout-morph": "Resize around changing content without stretching it.",
  menu: "Choose an action from a popover menu.",
  marquee: "Loop a strip of content with a pause control.",
  message: "Display an entry in a conversation.",
  meter: "Display a measured value against a known range.",
  "number-field": "Enter or step through numeric values.",
  "native-select": "Choose an option with the device's native select menu.",
  pagination: "Navigate between pages of results.",
  presence: "Animate conditional content when it enters or leaves.",
  "password-field": "Enter a password and toggle its visibility.",
  "password-strength-meter":
    "Estimate password strength beside any password field.",
  popover: "Show contextual content anchored to a trigger.",
  "presence-list": "Animate additions and removals in a semantic list.",
  "press-button": "Handle press interactions for shared button controls.",
  "preview-trigger": "Open a preview without leaving the current context.",
  "progress-bar": "Show progress for a task with a known completion point.",
  "progress-ring": "Show known or unknown progress in a circular indicator.",
  "radio-group": "Choose one option from a visible set.",
  "rating-input": "Choose a star rating with radio controls.",
  "range-calendar": "Select a start and end date in a calendar.",
  "search-field": "Search with a labeled input and clear control.",
  "source-link": "Link an answer to a named source.",
  select: "Choose one option from a list in a popover.",
  separator: "Divide related groups of content.",
  sheet: "Show a swipeable panel of content from the edge of the screen.",
  skeleton: "Reserve space while content is loading.",
  slider: "Adjust a value by dragging or with the keyboard.",
  spinner: "Indicate that a task is running without a known end time.",
  stat: "Display a labeled value and its context.",
  stepper: "Show the current stage of a multi-step process.",
  "stagger-group": "Sequence the entrance of grouped content.",
  switch: "Turn a setting on or off.",
  table: "Present rows and columns with sortable headers.",
  tabs: "Switch between related content panels.",
  "tag-group": "Navigate and remove tags with the keyboard.",
  "text-area": "Enter a longer answer with a labeled field.",
  "text-field": "Enter and validate a single line of text.",
  "text-swap":
    "Transition short changing labels without duplicating accessible text.",
  "text-reveal": "Reveal text by word or character with staggered movement.",
  "text-scramble": "Resolve changing text from scrambled characters.",
  timeline: "Show dated events in a semantic sequence.",
  "time-field": "Enter a time one editable segment at a time.",
  "tool-call": "Inspect a tool request and result behind a disclosure.",
  toast: "Show feedback after an action without interrupting the page.",
  "toggle-button-group": "Choose one or more persistent actions in a group.",
  "toggle-button": "Turn a persistent action on or off.",
  "token-field": "Enter and edit several tags in one field.",
  toolbar: "Group related actions with arrow-key navigation.",
  tooltip: "Show short supplementary help on hover or focus.",
  tree: "Browse and select items in a nested collection.",
};
const groupItems = {
  "button-group": ["button"],
  "toggle-button-group": ["toggle-button"],
};
export function portableSource(source) {
  return source
    .replace(/\r\n/g, "\n")
    .replace(/from "@\/lib\/(utils|motion)"/g, 'from "./$1"');
}

export function importsFrom(source) {
  return [...source.matchAll(/\b(?:from|import)\s+["']([^"']+)["']/g)].map(
    (match) => match[1],
  );
}

export function versioned(name) {
  const range =
    packageJson.dependencies?.[name] ?? packageJson.devDependencies?.[name];
  if (!range) throw new Error(`${name} is not in package.json`);
  return `${name}@${/^\d/.test(range) ? `^${range}` : range}`;
}

export function dependencyName(dependency) {
  const at = dependency.indexOf("@", 1);
  return at === -1 ? dependency : dependency.slice(0, at);
}

function styleSetup(contents, dependencies) {
  const setup = {};
  const cssVars = { light: {}, dark: {} };
  for (const content of contents) {
    const vars = referencedVars(content);
    if (!vars) continue;
    Object.assign(cssVars.light, vars.light);
    Object.assign(cssVars.dark, vars.dark);
  }
  if (dependencies.has("react-aria-components")) {
    setup.devDependencies = [versioned(reactAriaPlugin)];
    setup.css = { [`@plugin ${reactAriaPlugin}`]: {} };
  }
  if (Object.keys(cssVars.light).length) setup.cssVars = cssVars;
  return setup;
}

export function packageName(specifier) {
  if (specifier === "motion/react") return "motion";
  if (specifier.startsWith("@"))
    return specifier.split("/").slice(0, 2).join("/");
  return specifier.split("/")[0];
}

export function createItem(name, sources) {
  const seen = new Set();
  const dependencies = new Set();
  const files = [];
  const libs = new Set();
  function visit(slug) {
    if (seen.has(slug)) return;
    const source = sources.get(slug);
    if (!source) throw new Error(`${name} imports missing component ${slug}`);
    seen.add(slug);
    for (const specifier of importsFrom(source)) {
      if (specifier.startsWith("./")) {
        visit(specifier.slice(2).replace(/\.tsx$/, ""));
      } else if (libSources.has(specifier.replace(/^@\/lib\//, ""))) {
        libs.add(specifier.replace(/^@\/lib\//, ""));
      } else if (specifier === "react") {
      } else if (
        !specifier.startsWith("@/") &&
        !specifier.startsWith("node:")
      ) {
        dependencies.add(packageName(specifier));
      } else {
        throw new Error(`Unhandled import in ${slug}: ${specifier}`);
      }
    }
    files.push({
      path: `src/components/ui/${slug}.tsx`,
      type: "registry:file",
      target: `@components/vip-ui/${slug}.tsx`,
      content: portableSource(source),
    });
  }
  visit(name);
  for (const item of groupItems[name] ?? []) visit(item);
  if (name === "chart") dependencies.add("@tanstack/charts");
  for (const lib of [...libs].sort().reverse()) {
    const source = libSources.get(lib);
    for (const specifier of importsFrom(source))
      dependencies.add(packageName(specifier));
    files.unshift({
      path: `src/lib/${lib}.ts`,
      type: "registry:file",
      target: `@components/vip-ui/${lib}.ts`,
      content: portableSource(source),
    });
  }
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: `vip-${name}`,
    type: "registry:ui",
    title: name
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" "),
    description:
      descriptions[name] || `A ${name.replaceAll("-", " ")} component.`,
    dependencies: [...dependencies].sort().map(versioned),
    ...styleSetup(
      files.map((file) => file.content),
      dependencies,
    ),
    files,
  };
}

function relativeImport(from, target) {
  const relative = path.posix.relative(path.posix.dirname(from), target);
  return relative.startsWith(".") ? relative : `./${relative}`;
}

function createRouteItem(routeDirectory, sources, routeFiles) {
  const dependencies = new Set();
  const files = [];
  const installed = new Set();
  function install(file) {
    if (installed.has(file.target)) return;
    files.push(file);
    installed.add(file.target);
  }
  for (const [relative, source] of routeFiles) {
    const pathInApp = `${routeDirectory}/${relative}`;
    let content = source.replace(/\r\n/g, "\n");
    for (const specifier of importsFrom(source)) {
      const lib = specifier.replace(/^@\/lib\//, "");
      if (specifier.startsWith("@/components/ui/")) {
        const slug = specifier.slice("@/components/ui/".length);
        const uiItem = createItem(slug, sources);
        for (const file of uiItem.files) install(file);
        for (const dependency of uiItem.dependencies)
          dependencies.add(dependencyName(dependency));
        content = content.replaceAll(
          specifier,
          relativeImport(pathInApp, `src/components/vip-ui/${slug}`),
        );
      } else if (specifier.startsWith("@/lib/") && libSources.has(lib)) {
        const libSource = libSources.get(lib);
        install({
          path: `src/lib/${lib}.ts`,
          type: "registry:file",
          target: `@components/vip-ui/${lib}.ts`,
          content: portableSource(libSource),
        });
        for (const libImport of importsFrom(libSource))
          dependencies.add(packageName(libImport));
        content = content.replaceAll(
          specifier,
          relativeImport(pathInApp, `src/components/vip-ui/${lib}`),
        );
      } else if (
        specifier === "server-only" ||
        (!specifier.startsWith(".") &&
          !specifier.startsWith("@/") &&
          packageJson.dependencies?.[packageName(specifier)] &&
          !["next", "react", "react-dom"].includes(packageName(specifier)))
      ) {
        dependencies.add(packageName(specifier));
      } else if (
        !specifier.startsWith(".") &&
        !specifier.startsWith("next/") &&
        specifier !== "next" &&
        specifier !== "react"
      ) {
        throw new Error(`Unhandled import in ${pathInApp}: ${specifier}`);
      }
    }
    files.push({
      path: pathInApp,
      type:
        relative.endsWith("/page.tsx") || relative === "page.tsx"
          ? "registry:page"
          : "registry:file",
      target: pathInApp,
      content,
    });
  }
  return {
    dependencies: [...dependencies]
      .sort()
      .map((dependency) =>
        dependency === "server-only" ? dependency : versioned(dependency),
      ),
    ...styleSetup(
      files.map((file) => file.content),
      dependencies,
    ),
    files,
  };
}

export function createBlockItem(block, sources, blockFiles) {
  if (!blockFiles.has("page.tsx"))
    throw new Error(`Block ${block.name} has no page.tsx`);
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: `vip-${block.name}`,
    type: "registry:block",
    title: block.name
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" "),
    description: block.description,
    categories: [block.category],
    ...createRouteItem(`src/app/blocks/${block.name}`, sources, blockFiles),
  };
}

export async function readRouteFiles(directory, prefix = "") {
  const files = new Map();
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = `${prefix}${entry.name}`;
    if (entry.isDirectory()) {
      for (const [name, source] of await readRouteFiles(
        path.join(directory, entry.name),
        `${relative}/`,
      )) {
        files.set(name, source);
      }
    } else if (entry.isFile() && /\.(tsx|ts)$/.test(entry.name)) {
      files.set(
        relative,
        await readFile(path.join(directory, entry.name), "utf8"),
      );
    }
  }
  return files;
}

const blocksDirectory = path.join(root, "src/app/blocks");

export async function readBlockCatalog() {
  const { blocks } = JSON.parse(
    await readFile(path.join(root, "src/lib/blocks.json"), "utf8"),
  );
  const listed = new Set(blocks.map((block) => block.name));
  for (const entry of await readdir(blocksDirectory, { withFileTypes: true })) {
    if (!entry.isDirectory() || /^[[(]/.test(entry.name)) continue;
    if (!listed.has(entry.name))
      throw new Error(`src/lib/blocks.json does not list block ${entry.name}`);
  }
  return blocks;
}

function catalogItem(item, sources) {
  const { $schema: _schema, files, ...rest } = item;
  return {
    ...rest,
    files: files.map(({ content, ...file }) => {
      const destination = file.target.startsWith("@components/")
        ? `src/components/${file.target.slice("@components/".length)}`
        : file.target;
      const sourcePath = `registry/generated/${destination}`;
      const existing = sources.get(sourcePath);
      if (existing && existing !== content)
        throw new Error(`Conflicting registry source: ${sourcePath}`);
      sources.set(sourcePath, content);
      return { ...file, path: sourcePath };
    }),
  };
}

export async function generate() {
  const sources = new Map();
  for (const filename of await readdir(uiDirectory)) {
    if (filename.endsWith(".tsx")) {
      sources.set(
        filename.slice(0, -4),
        await readFile(path.join(uiDirectory, filename), "utf8"),
      );
    }
  }
  await mkdir(outputDirectory, { recursive: true });
  for (const filename of await readdir(outputDirectory)) {
    if (filename === "registry.json" || /^vip-.*\.json$/.test(filename)) {
      await rm(path.join(outputDirectory, filename));
    }
  }
  await rm(sourceDirectory, { recursive: true, force: true });
  const catalogItems = [];
  const registrySources = new Map();
  for (const name of sources.keys()) {
    const item = createItem(name, sources);
    catalogItems.push(catalogItem(item, registrySources));
    await writeFile(
      path.join(outputDirectory, `vip-${name}.json`),
      `${JSON.stringify(item, null, 2)}\n`,
    );
  }
  const blocks = await readBlockCatalog();
  for (const block of blocks) {
    if (sources.has(block.name))
      throw new Error(`Block ${block.name} has the name of a component`);
    const item = createBlockItem(
      block,
      sources,
      await readRouteFiles(path.join(blocksDirectory, block.name)),
    );
    catalogItems.push(catalogItem(item, registrySources));
    await writeFile(
      path.join(outputDirectory, `${item.name}.json`),
      `${JSON.stringify(item, null, 2)}\n`,
    );
  }
  for (const [filename, content] of registrySources) {
    const destination = path.join(root, filename);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, content);
  }
  const catalog = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "vip-ui",
    homepage: registryOrigin,
    items: catalogItems,
  };
  const json = `${JSON.stringify(catalog, null, 2)}\n`;
  await writeFile(path.join(root, "registry.json"), json);
  await writeFile(path.join(outputDirectory, "registry.json"), json);
  await writeFile(path.join(outputDirectory, "setup.css"), setupCss());
  console.log(
    `Generated ${sources.size} components and ${blocks.length} blocks in public/r`,
  );
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await generate();
}
