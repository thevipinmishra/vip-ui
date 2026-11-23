import { setupDocUrl, setupPrompt } from "./agent-docs";

export const guideMarkdownSlugs = [
  "agents",
  "react-aria",
  "rtl",
  "styling",
] as const;

export type GuideMarkdownSlug = (typeof guideMarkdownSlugs)[number];

function guidePage(site: string, path: string, lines: string[]) {
  return [...lines, "", `Documentation: ${site}${path}`, ""].join("\n");
}

function buildStylingMarkdown(site: string) {
  return guidePage(site, "/components/styling", [
    "# Styling",
    "",
    "vip/ui uses the shadcn theme of the project: CSS variables for color and radius, and Tailwind CSS v4. To change colors everywhere, edit the theme. To change one component, edit its file or pass `className`.",
    "",
    "## Theme",
    "",
    "Set the shadcn tokens, such as `--primary` and `--radius`, in `:root` and `.dark` in the global CSS file. vip/ui also reads these tokens:",
    "",
    "- `--success` and `--warning`, each with `-subtle` and `-foreground`, for status colors.",
    "- `--shadow-card`, `--shadow-float`, and `--shadow-inset` for shadows.",
    "- `--highlight` for the hover highlight in lists and menus.",
    "- `--ease-out-quint` and `--ease-spring` for transitions.",
    "- `--chart-6` for a sixth chart color. Charts use `--foreground` when it is not set.",
    "",
    "The CLI adds only the tokens that a component uses. A manual install adds all of them. A theme item sets the colors on purpose: do not replace the tokens of the project unless the user asks for that theme.",
    "",
    "## Color scales",
    "",
    `vip/ui has five neutral and 13 accent scales, with 12 steps each. A scale sets variables such as \`--blue-1\` to \`--blue-12\` in \`:root\` and \`.dark\`. Add a scale with the CLI from [Installation](${setupDocUrl(site)}), or copy its CSS from [Colors](${site}/colors). To make a theme, map the shadcn tokens to steps:`,
    "",
    "```css",
    ":root {",
    "  --background: var(--gray-2);",
    "  --foreground: var(--gray-12);",
    "  --primary: var(--blue-9);",
    "  --primary-foreground: var(--blue-1);",
    "  --ring: var(--blue-9);",
    "}",
    "```",
    "",
    "Step 11 on step 1 or 2 is at least 4.5:1, and step 12 is at least 7:1. On Yellow in light mode, use step 12 on step 9, not step 9 for text.",
    "",
    "## Dark mode",
    "",
    "Put the `dark` class on `<html>`. Menus, popovers, selects, dialogs, sheets, tooltips, and toasts render in a portal on `document.body`, so they read tokens from the document root. If the tokens are on another element, return it from `getContainer` in `UNSAFE_PortalProvider` from `react-aria`.",
    "",
    "## Change a component",
    "",
    "Each component is a file in the project. Edit that file to change the component everywhere. Recipes such as `buttonStyles` in `button-styles.tsx` hold variants: add a key to the recipe for a new variant. To change one instance, pass `className`. vip/ui merges it after the component classes, so a conflicting utility such as `px-6` replaces the default.",
    "",
    "React Aria sets `data-pressed`, `data-selected`, and other state attributes. The Tailwind plugin adds the matching variants, such as `pressed:` and `selected:`.",
    "",
    "## Component Markdown",
    "",
    `Each page lists the file, props, and source: [Button](${site}/components/button.md), [Card](${site}/components/card.md), [Dialog](${site}/components/dialog.md).`,
  ]);
}

function buildReactAriaMarkdown(site: string) {
  return guidePage(site, "/components/react-aria", [
    "# React Aria",
    "",
    "Interactive vip/ui components wrap React Aria Components. React Aria supplies their behavior, state, and accessibility. vip/ui supplies the styles.",
    "",
    "## Props",
    "",
    `A component accepts the props of the React Aria component that it wraps. The API reference on its Markdown page lists the props that vip/ui adds and links to the React Aria props for the rest. See [Button](${site}/components/button.md) for the layout of a page.`,
    "",
    "## Forms",
    "",
    `The vip/ui [Form](${site}/components/form.md) wraps the React Aria \`Form\` and renders a native \`<form>\` element.`,
    "",
    "- To submit, use `action` or `onSubmit`.",
    "- To read values, use `FormData`, or controlled `value` and `onChange` props.",
    "- To validate, use native constraints such as `isRequired`, or a `validate` function.",
    "- To show server errors, pass `validationErrors` to the form, with the field names as keys.",
    "",
    "Each field shows its error message below the input.",
    "",
    "## Internationalization",
    "",
    "React Aria uses the browser locale by default. Wrap the app in `I18nProvider` to set a different locale. vip/ui does not add the provider.",
    "",
    `- Date, time, number, and calendar components format values for the locale. See [Range calendar](${site}/components/range-calendar.md).`,
    `- Components get the keyboard direction from the locale. See [RTL](${site}/components/rtl.md).`,
    "- `I18nProvider` does not change validation messages. They use the browser language.",
    "",
    "## Contexts and slots",
    "",
    `React Aria sends props to the parts of a component through React context. A [Number field](${site}/components/number-field.md) gives its increment and decrement buttons their \`onPress\` handlers, and slots such as \`slot="increment"\` identify repeated parts. Props that you set on a part override the context props.`,
    "",
    "To replace a part, read the parent context instead of writing the behavior again:",
    "",
    "- `useContextProps` merges your props with the context props and supports `slot`.",
    "- `useSlottedContext` reads the context value without a merge.",
    "- State contexts, such as `DisclosureStateContext`, give the state of the parent.",
  ]);
}

function buildRtlMarkdown(site: string) {
  return guidePage(site, "/components/rtl", [
    "# RTL",
    "",
    "vip/ui components use logical CSS classes, so a right-to-left document mirrors them with no transform.",
    "",
    "## Logical classes",
    "",
    'Components use logical CSS properties such as `ms-1`, `rounded-s-md`, and `border-e`. Start and end follow the text direction of the element. Set `dir="rtl"` on `<html>` or on a container.',
    "",
    `React Aria gets the keyboard direction from the locale, not from \`dir\`. For the arrow keys in sliders, tabs, and toolbars, set a right-to-left locale with \`I18nProvider\`. See [React Aria](${site}/components/react-aria.md#internationalization).`,
    "",
    "## The CLI rtl option",
    "",
    "With `rtl: true` in `components.json`, or `--rtl` on `shadcn init`, the CLI changes physical classes to logical ones at install time. vip/ui files already use logical classes, so the CLI installs them with no change.",
    "",
    "## Physical classes",
    "",
    `\`ItemHighlight\`, [Slider](${site}/components/slider.md), [Range calendar](${site}/components/range-calendar.md), [Border beam](${site}/components/border-beam.md), and [Highlighter](${site}/components/highlighter.md) set left or right on purpose. They measure pixel offsets to move a layer over an item, so the layer anchors to one physical edge.`,
    "",
    "Do not run `shadcn migrate rtl` on `components/vip-ui`. It rewrites left and right classes, and the layers then move away from their items. Run the migration on shadcn/ui files only.",
  ]);
}

function buildAgentsMarkdown(site: string) {
  return guidePage(site, "/components/agents", [
    "# Agents",
    "",
    "Use vip/ui from a coding agent with a setup prompt, the vip/ui skill, the shadcn MCP server, or the CLI. Each guide, component, and block page has a Markdown copy at the same URL with `.md`. Commands use `npx`; use the package runner of the project in its place.",
    "",
    "## Start with a prompt",
    "",
    "Give the agent this prompt:",
    "",
    "```text",
    setupPrompt(site),
    "```",
    "",
    `The [setup Markdown](${setupDocUrl(site)}) covers the project, the theme, and safe installs. When the project is ready, install items from their Markdown pages, such as [Button](${site}/components/button.md).`,
    "",
    "## Install the skill",
    "",
    "The vip/ui skill tells an agent which components exist and how to set up, install, and use them. The command asks which agents to install the skill for.",
    "",
    "```bash",
    "npx skills add thevipinmishra/vip-ui --skill vip-ui",
    "```",
    "",
    "## Use the MCP server",
    "",
    "The shadcn MCP server reads `registries` from `components.json`. Add vip/ui to search and view items:",
    "",
    "```json",
    "{",
    '  "registries": {',
    `    "@vip-ui": "${site}/r/{name}.json"`,
    "  }",
    "}",
    "```",
    "",
    `[Installation](${setupDocUrl(site)}) has the rest of \`components.json\`. Then add the server to the client and restart it:`,
    "",
    "```bash",
    "npx shadcn@latest mcp init --client claude",
    "```",
    "",
    "Without the entry, the MCP server can return the add command for a name such as `@vip-ui/button`, but it cannot search or view the item.",
    "",
    "## Use the CLI",
    "",
    `\`npx shadcn@latest view @vip-ui/button\` shows the dependencies, files, and source of an item without changing the project. To compare a local file with the registry, see [Update a component](${setupDocUrl(site)}#update).`,
    "",
    "## Machine-readable sources",
    "",
    `- [llms.txt](${site}/llms.txt): the guides, components, and blocks.`,
    `- [installation.md](${setupDocUrl(site)}): the setup steps for agents.`,
    `- [button.md](${site}/components/button.md): a component page with installation, usage, examples, and the API.`,
    `- [registry.json](${site}/r/registry.json): the registry index. Each item is at \`${site}/r/<name>.json\`.`,
  ]);
}

const guideMarkdownBuilders: Record<
  GuideMarkdownSlug,
  (site: string) => string
> = {
  agents: buildAgentsMarkdown,
  "react-aria": buildReactAriaMarkdown,
  rtl: buildRtlMarkdown,
  styling: buildStylingMarkdown,
};

export function isGuideMarkdownSlug(slug: string): slug is GuideMarkdownSlug {
  return Object.hasOwn(guideMarkdownBuilders, slug);
}

export function buildGuideMarkdown(slug: GuideMarkdownSlug, site: string) {
  return guideMarkdownBuilders[slug](site);
}

export function guideMarkdownUrl(site: string, href: string) {
  return `${site}${href}.md`;
}
