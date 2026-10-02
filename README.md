# vip/ui

A collection of React components you can copy into your app. Each component page has a live example, usage guidance, installation instructions, source code, and an API reference. Interactive components use React Aria for keyboard and focus behavior. The project uses Tailwind CSS with [Tailwind Variants](https://www.tailwind-variants.org/docs/introduction) for styling and Motion for animated state changes.

## Run locally

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000/components> for the catalog. Run `pnpm lint` and `pnpm build` before shipping changes.

## Components

| Component | Use it for | Docs |
| --- | --- | --- |
| Button | An action with clear priority | `/components/button` |
| Text field | Labeled text entry and validation | `/components/text-field` |
| Input group | A field with a prefix, suffix, or action | `/components/input-group` |
| Select | One choice from a longer list | `/components/select` |
| Checkbox | Independent choices in a form | `/components/checkbox` |
| Switch | A setting that takes effect immediately | `/components/switch` |
| Badge | Brief status or metadata | `/components/badge` |
| Alert | Information beside the task it affects | `/components/alert` |
| Radio group | One choice from a short visible list | `/components/radio-group` |
| Text area | Longer answers with guidance | `/components/text-area` |
| Slider | A value within a bounded range | `/components/slider` |
| Tabs | Related panels in one view | `/components/tabs` |
| Accordion | Details revealed on demand | `/components/accordion` |
| Dialog | A short focused task above the page | `/components/dialog` |
| Search field | Finding items by a typed query | `/components/search-field` |
| Menu | Several actions from one trigger | `/components/menu` |
| Combo box | Filtering and selecting from a longer list | `/components/combo-box` |
| Token field | Entering editable tags | `/components/token-field` |
| Tree | Browsing nested files | `/components/tree` |
| Drop zone | Adding local files by drag or picker | `/components/drop-zone` |
| Color picker | Editing a color visually or by hex value | `/components/color-picker` |
| Command palette | Searching and running actions | `/components/command-palette` |
| Tooltip | Brief supplementary help on hover or focus | `/components/tooltip` |
| Toast | Feedback after an action | `/components/toast` |
| Date field | Entering a known date one segment at a time | `/components/date-field` |
| File trigger | Choosing files from an accessible button | `/components/file-trigger` |
| Card | Grouping related content and actions | `/components/card` |
| Avatar | Showing a person with an image or initials | `/components/avatar` |
| Skeleton | Reserving space while content loads | `/components/skeleton` |
| Empty state | Explaining an empty collection and its next step | `/components/empty-state` |
| Pagination | Linking between pages of results | `/components/pagination` |
| Description list | Pairing labels and values | `/components/description-list` |
| Kbd & code | Marking up shortcuts and inline code | `/components/kbd-code` |
| Stat | Showing a labeled metric and context | `/components/stat` |

## Install a component

Start at `/components/installation`, then open a component page for its install command and source. Components work in React projects using TypeScript, Tailwind CSS v4, and shadcn CSS-variable themes, including Next.js and Vite apps. The CLI needs your project's `components.json`; manual copying does not. Set `tailwind.cssVariables` and `tsx` to `true`, and add the extra CSS from the installation guide once to the stylesheet named by `tailwind.css`. The complete app examples are Next.js App Router blocks, not framework-independent components.

### With the shadcn CLI

On a component page, copy its shadcn command. For example, while running this site locally:

```bash
pnpm dlx shadcn@latest add http://localhost:3000/r/vip-button.json
```

The generated item payloads live at `public/r/`, with a discoverable catalog at `public/r/registry.json`. The CLI installs the component, its npm dependencies (including `tailwind-variants` for styled components), and a local `utils.ts` helper when required under `aliases.components/vip-ui/`. It does not write to `aliases.ui/button.tsx` or your shadcn utility file. The localhost URL above works while this site is running; production commands appear on component pages only when `NEXT_PUBLIC_REGISTRY_URL` is set at build time. See [Registry publishing](docs/registry.md) for URL, namespace, and GitHub instructions.

### Copy manually

On the same component page, open **Custom**. Install the listed packages and copy **every** implementation file into `vip-ui/` under your components directory. The file headers use shadcn's `@components/` target placeholder, which maps to `aliases.components`. Copy the local `utils.ts` too when listed. It wraps `cn` from `tailwind-variants`; component files import it from `./utils`, not from your existing shadcn helper. Install the listed dependencies and keep the relative imports. For conflict rules, recipe examples, and overrides, see [Styling and variants](docs/styling.md). Append the one-time CSS to your existing global stylesheet. Its additional `:root`, `.dark`, and `@theme inline` blocks extend the theme without overwriting the standard shadcn variables.

Charts have their own [gallery and documentation](/charts). Install the `chart.tsx` frame and `@tanstack/charts` there, then use the gallery's View code drawer for examples. `ChartFrame` maps the chart palette to shadcn's `--chart-1` through `--chart-5` variables; override them in both themes to change series colors. Give each TanStack `Chart` an `ariaLabel` and keep a table from the same rows for assistive technology when exact values matter.

Both methods use generated files from the same component sources. The Preview and Code tabs show the demo that renders the preview; the Code tab changes only the component import path to the installed `vip-ui/` directory. The viewer highlights TSX, CSS, and shell commands. Copy captures all lines, even when the display is collapsed.

## Example

```tsx
"use client";

import { useState } from "react";
import {
  Radio,
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioIndicator,
  RadioLabel,
} from "@/components/vip-ui/radio-group";

export function PlanChoice() {
  const [plan, setPlan] = useState("team");

  return (
    <RadioGroup value={plan} onValueChange={setPlan}>
      <RadioGroupLabel>Workspace plan</RadioGroupLabel>
      <RadioGroupDescription>Choose one plan.</RadioGroupDescription>
      <div className="grid gap-2">
        <Radio value="personal"><RadioIndicator /><RadioLabel>Personal</RadioLabel></Radio>
        <Radio value="team"><RadioIndicator /><RadioLabel>Team</RadioLabel></Radio>
      </div>
    </RadioGroup>
  );
}
```

Use a radio group when people need to compare a few choices at once. Use Select when the list is longer. Use Checkbox when more than one option can be selected.

## Install a complete example

Open `/examples` for the repository desk and billing operations. The repository desk has six routes: overview, issues, pull requests, commits, releases, and contributors. The pages read real public data from GitHub's REST API for `shadcn-ui/ui`. Search and date filters apply to the current page of results; pagination and open/closed status load new data. The dashboard is read-only and links to GitHub for actions.

These full-page examples need a Next.js App Router project with TypeScript and Tailwind v4. After the [one-time theme setup](/components/installation), install the repository route tree:

```bash
pnpm dlx shadcn@latest add http://localhost:3000/r/vip-example-repository.json
```

Run the site locally for the command above; use the published registry URL when deployed. The item installs routes under `src/app/examples/repository/` and the required components under `src/components/vip-ui/`. Check for existing files at those paths first. Change `src/app/examples/repository/config.ts` to use another public repository. GitHub allows unauthenticated requests, but shared deployments should set a server-only `GITHUB_TOKEN` for a higher rate limit. Never prefix it with `NEXT_PUBLIC_`. Responses revalidate every five minutes; failures display an error rather than invented data. `pnpm test:registry:cli` tests installing this flow alongside components in a clean shadcn fixture.

The business dashboard at `/examples/business` has seven sections: overview, customers, subscriptions, invoices, payments, reports, and settings. Customer detail pages join invoices and payment attempts to each account. All amounts come from a fixed, fictional September 1, 2026 snapshot in `src/app/examples/business/data.ts`; search, status filters, pagination, and report periods work against those records. The theme setting is stored in the browser. No payment actions are simulated and no API key is needed.

```bash
pnpm dlx shadcn@latest add http://localhost:3000/r/vip-example-business.json
```

This installs `src/app/examples/business/` and its `vip-ui` component dependencies. Check for existing files at those paths before installing.

## Component contract

Each component is useful on its own. The copyable file owns its markup, visual states, and accessible behavior. Compound components export their parts so an app can use the default composition or arrange the same primitives for its own layout.

- `ButtonLink` renders an anchor by default, so it works without Next.js. In a Next.js app, pass `as={Link}` with `Link` from `next/link` if you want Next.js client-side navigation.
- Prefer the component's React Aria callback props, such as `onPress`, `onSelectionChange`, and `onOpenChange`, over mouse-only event handlers.
- Keep a visible label for fields and name icon-only controls with `aria-label`.
- Use controlled props when the application owns the value. Use the matching `default*` prop when it does not.
- Keep essential instructions in the page. Tooltips, toasts, and collapsed content only supplement the task.

## Motion

Motion is the only JavaScript animation library used by this collection; Tailwind handles short state transitions. It adds feedback where it confirms an action or preserves context: button presses, selection indicators, control changes, and overlay entrances. Static components such as badges and alerts do not animate simply because they render.

Animations respect reduced motion through Motion's `useReducedMotion` or Tailwind's `motion-safe:` variant. Reduced motion keeps the final state without positional movement. Motion never carries meaning on its own. Selection, focus, errors, and disabled states remain visible without animation.

When extending a component, keep the transition tied to the state supplied by React Aria. Do not replace a React Aria primitive with a `div`, and do not add CSS keyframes or a second animation package. For overlay content, let React Aria own focus management, dismissal, positioning, and the open state. Motion should only animate the visual layer.

## Documentation structure

Every component page follows the same path:

1. **Examples** show a working, realistic task. The Preview and Code tabs render from the same file.
2. **Usage guidance** explains when to choose the component and the constraints that keep it clear.
3. **Install** has CLI and Custom tabs. Custom includes dependencies and the full source for every required file. Theme token setup lives on the Installation page.
4. **API reference** lists exported parts and the props people will reach for first.

Examples should show meaningful variations together, such as button priority, status intent, disabled controls, or selected options. Add a second example when one task cannot demonstrate an important variant without turning into a prop gallery.

## Project map

| Path | Purpose |
| --- | --- |
| `src/components/ui/` | Canonical component implementations for the site and registry generator |
| `public/r/` | Generated item payloads and the hosted `/r/registry.json` catalog |
| `registry.json`, `registry/generated/` | Generated source registry for GitHub `owner/repo/item` installs |
| `scripts/generate-registry.mjs` | Derives packages, dependent files, and portable data-state styling |
| `src/components/docs/` | Live examples, navigation, and code viewer |
| `src/app/components/` | Catalog and component documentation routes |
| `src/app/examples/repository/` | Installable repository dashboard, data loader, and six routes |
| `src/app/examples/business/` | Installable subscription dashboard with seven sections and customer detail pages |
| `src/app/globals.css` | Semantic colors, dark theme, radii, shadows, and Tailwind mapping |
| `src/components/playground.tsx` | Interactive theme and token preview |
| `src/lib/utils.ts` | Wraps Tailwind Variants' merging `cn`; copied as `vip-ui/utils.ts` when needed |
| `components.json` | CLI aliases and conventions |

The site and distributed files use semantic shadcn roles such as `bg-primary` and `text-foreground`, so components follow the host theme. Styled variants use typed `tv()` recipes and the default Tailwind Variants build merges conflicting Tailwind utilities; static parts use its `cn` via the local helper. Extra status roles and shadows are defined once in `public/r/setup.css`; component styling and animation live in Tailwind classes and Motion, not in shared CSS selectors. Registry state styles use React Aria data attributes and need no extra Tailwind plugin; the site itself uses the React Aria Tailwind plugin. The app bundles Geist Sans and Geist Mono locally through the `geist` package.

Toast uses React Aria's `UNSTABLE_` exports in the installed version. Mount `ToastViewport` once in a client component near the app root, then call `showToast` from client components. Review the Toast API when upgrading React Aria.

`pnpm registry:build` regenerates the static item JSON, source registry, and both catalogs. Do not edit generated files directly. Set a public HTTPS `NEXT_PUBLIC_REGISTRY_URL` before a production build and commit the generated `registry.json` and `registry/generated/` files before publishing GitHub installs. Follow [Registry publishing](docs/registry.md) for validation and health checks. `pnpm test:registry` checks generated entries and dependency closure; `pnpm test:registry:cli` exercises an install in a Next.js fixture with a custom alias, then typechecks it. Run these, `pnpm lint`, and `pnpm build` before publishing. This is a registry of source files, not an npm component package.

## License

MIT. See [LICENSE](LICENSE). The project remains marked `private` in `package.json` because it is not published as an npm package. You can still copy or fork the source under the license.
