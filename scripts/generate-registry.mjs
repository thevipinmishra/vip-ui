import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const uiDirectory = path.join(root, "src/components/ui");
const outputDirectory = path.join(root, "public/r");
const sourceDirectory = path.join(root, "registry/generated");
const utilsSource = await readFile(path.join(root, "src/lib/utils.ts"), "utf8");
const descriptions = {
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
  "date-field": "Enter a date one editable segment at a time.",
  "date-picker": "Choose a single date from a field and calendar.",
  "date-range-picker": "Choose a start and end date from a field and calendar.",
  "date-segment": "Render the editable segments used in date and time fields.",
  "description-list": "Pair labels with related values.",
  dialog: "Show a focused task above the current page.",
  disclosure: "Reveal optional details in place.",
  drawer: "Show a panel of content from the edge of the screen.",
  "drop-zone": "Accept files by drag and drop or file picker.",
  "empty-state": "Explain why a collection is empty and what to do next.",
  fieldset: "Group related native form controls under a legend.",
  "field-styles": "Shared theme-aware styling for text and segmented fields.",
  "file-trigger": "Open a file picker from an accessible trigger.",
  form: "Group fields and handle form validation.",
  "grid-list": "Select and act on rows with keyboard navigation.",
  "input-group": "Combine an input with a prefix, suffix, or action.",
  "kbd-code": "Display keyboard shortcuts and inline code.",
  link: "Navigate with an accessible text link.",
  "list-box": "Select an option from a visible list.",
  "layout-morph": "Resize around changing content without distorting it.",
  menu: "Choose an action from a popover menu.",
  marquee: "Loop a strip of content with a pause control.",
  "mask-reveal": "Uncover content from an edge on mount or in view.",
  message: "Display an entry in a conversation.",
  meter: "Display a measured value against a known range.",
  "number-field": "Enter or step through numeric values.",
  "native-select": "Choose an option with the device's native select menu.",
  pagination: "Navigate between pages of results.",
  "parallax-layer": "Move a layer as its container scrolls.",
  presence: "Animate conditional content when it enters or leaves.",
  "password-field": "Enter a password and toggle its visibility.",
  popover: "Show contextual content anchored to a trigger.",
  "presence-list": "Animate additions and removals in a semantic list.",
  "press-button": "Handle press interactions for shared button controls.",
  "preview-trigger": "Open a preview without leaving the current context.",
  "progress-bar": "Show progress for a task with a known completion point.",
  "progress-ring": "Show known or unknown progress in a circular indicator.",
  "radio-group": "Choose one option from a visible set.",
  "range-calendar": "Select a start and end date in a calendar.",
  "search-field": "Search with a labeled input and clear control.",
  "scroll-highlight":
    "Emphasize words as a passage scrolls through the viewport or a panel.",
  "scroll-progress": "Show reading progress in a page or scrollable panel.",
  select: "Choose one option from a list in a popover.",
  separator: "Divide related groups of content.",
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
  toast: "Show feedback after an action without interrupting the page.",
  "toggle-button-group": "Choose one or more persistent actions in a group.",
  "toggle-button": "Turn a persistent action on or off.",
  "token-field": "Enter and edit several tags in one field.",
  toolbar: "Group related actions with arrow-key navigation.",
  tooltip: "Show short supplementary help on hover or focus.",
  tree: "Browse and select items in a nested collection.",
};
export function portableSource(source) {
  // React Aria exposes these states as data attributes on its elements.
  // Unlike the site's shorthand variants, these work without a Tailwind plugin.
  // `placeholder:` on native inputs styles ::placeholder, not a React Aria state.
  // React Aria placeholder states use the explicit `data-[placeholder]:` selector.
  const states =
    "selection-start|selection-end|outside-month|focus-visible|unavailable|selected|pressed|invalid|indeterminate|disabled|dragging|empty";
  return source
    .replace(/\r\n/g, "\n")
    .replaceAll('from "@/lib/utils"', 'from "./utils"')
    .replace(
      new RegExp(`group-(${states})(\\/[\\w-]+)?:`, "g"),
      (_, state, group) => `group-data-[${state}]${group ?? ""}:`,
    )
    .replace(
      new RegExp(`(?<![\\w-])(${states}):`, "g"),
      (_, state) => `data-[${state}]:`,
    )
    .replace(/(?<![\w-])focus:/g, "data-[focused]:");
}

export function importsFrom(source) {
  return [...source.matchAll(/\bfrom\s+["']([^"']+)["']/g)].map(
    (match) => match[1],
  );
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
  let needsUtils = false;
  function visit(slug) {
    if (seen.has(slug)) return;
    const source = sources.get(slug);
    if (!source) throw new Error(`${name} imports missing component ${slug}`);
    seen.add(slug);
    for (const specifier of importsFrom(source)) {
      if (specifier.startsWith("./")) {
        visit(specifier.slice(2).replace(/\.tsx$/, ""));
      } else if (specifier === "@/lib/utils") {
        needsUtils = true;
      } else if (specifier === "react") {
        // React is a peer dependency of the app.
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
  // ChartFrame styles TanStack Charts; install the renderer with the frame.
  if (name === "chart") dependencies.add("@tanstack/charts");
  if (needsUtils) {
    for (const specifier of importsFrom(utilsSource))
      dependencies.add(packageName(specifier));
    files.unshift({
      path: "src/lib/utils.ts",
      type: "registry:file",
      target: "@components/vip-ui/utils.ts",
      content: utilsSource.replace(/\r\n/g, "\n"),
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
    dependencies: [...dependencies].sort(),
    files,
  };
}

export function createExampleItem(name, sources, exampleFiles) {
  const dependencies = new Set(["server-only"]);
  const files = [];
  const installed = new Set();
  for (const [relative, source] of exampleFiles) {
    const pathInApp = `src/app/examples/${name}/${relative}`;
    let content = source.replace(/\r\n/g, "\n");
    for (const specifier of importsFrom(source)) {
      if (specifier.startsWith("@/components/ui/")) {
        const slug = specifier.slice("@/components/ui/".length);
        const uiItem = createItem(slug, sources);
        for (const file of uiItem.files) {
          if (!installed.has(file.target)) {
            files.push(file);
            installed.add(file.target);
          }
        }
        for (const dependency of uiItem.dependencies)
          dependencies.add(dependency);
        const target = `src/components/vip-ui/${slug}`;
        const relativeImport = path.posix.relative(
          path.posix.dirname(pathInApp),
          target,
        );
        content = content.replaceAll(
          specifier,
          relativeImport.startsWith(".")
            ? relativeImport
            : `./${relativeImport}`,
        );
      } else if (
        ["reicon-react", "react-aria-components"].includes(specifier)
      ) {
        dependencies.add(specifier);
      } else if (
        !specifier.startsWith(".") &&
        !specifier.startsWith("next/") &&
        specifier !== "next" &&
        specifier !== "react" &&
        specifier !== "server-only"
      ) {
        throw new Error(
          `Unhandled import in example ${pathInApp}: ${specifier}`,
        );
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
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: `vip-example-${name}`,
    type: "registry:block",
    title: `${name} example`,
    description: `A Next.js App Router ${name} example built with vip/ui.`,
    dependencies: [...dependencies].sort(),
    files,
  };
}

export async function readExampleFiles(directory, prefix = "") {
  const files = new Map();
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = `${prefix}${entry.name}`;
    if (entry.isDirectory()) {
      for (const [name, source] of await readExampleFiles(
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

function catalogItem(item, sources) {
  return {
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies,
    files: item.files.map(({ content, ...file }) => {
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
  const examplesDirectory = path.join(root, "src/app/examples");
  let exampleCount = 0;
  for (const entry of await readdir(examplesDirectory, {
    withFileTypes: true,
  })) {
    if (!entry.isDirectory()) continue;
    const exampleFiles = await readExampleFiles(
      path.join(examplesDirectory, entry.name),
    );
    if (!exampleFiles.has("layout.tsx") || !exampleFiles.has("page.tsx"))
      continue;
    const item = createExampleItem(entry.name, sources, exampleFiles);
    catalogItems.push(catalogItem(item, registrySources));
    await writeFile(
      path.join(outputDirectory, `${item.name}.json`),
      `${JSON.stringify(item, null, 2)}\n`,
    );
    exampleCount++;
  }
  for (const [filename, content] of registrySources) {
    const destination = path.join(root, filename);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, content);
  }
  const catalog = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "vip-ui",
    homepage: process.env.NEXT_PUBLIC_REGISTRY_URL || "http://localhost:3000",
    items: catalogItems,
  };
  const json = `${JSON.stringify(catalog, null, 2)}\n`;
  await writeFile(path.join(root, "registry.json"), json);
  await writeFile(path.join(outputDirectory, "registry.json"), json);
  console.log(
    `Generated ${sources.size} components and ${exampleCount} examples in public/r`,
  );
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await generate();
}
