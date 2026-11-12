---
name: vip-ui
description: Build UI with vip/ui (vip-ui.dev) React Aria components and blocks. Use when a task mentions vip/ui, the @vip-ui registry, vip-ui.dev, or vip/ui components; when installing or generating components, blocks, or charts with the shadcn CLI from vip/ui; or when migrating shadcn/ui code to vip/ui names and APIs.
---

# vip/ui

vip/ui is a registry of accessible React components on React Aria Components, Tailwind CSS v4, tailwind-variants, and Motion. Items install as source files with the shadcn CLI and stay editable.

Docs: https://vip-ui.dev — every component page has a Markdown copy at `https://vip-ui.dev/components/<name>.md`. Full component list: https://vip-ui.dev/llms.txt.

## Install

Requires shadcn CLI 4.7.0 or later, React 19, TypeScript, Tailwind CSS v4.1+, and a shadcn theme with CSS variables.

Add the namespace to `components.json`, then add items by name:

```json
{
  "registries": {
    "@vip-ui": "https://vip-ui.dev/r/{name}.json"
  }
}
```

```bash
pnpm dlx shadcn@latest add @vip-ui/button
pnpm dlx shadcn@latest add @vip-ui/toast @vip-ui/dialog
```

- Component files land in `components/vip-ui/<name>.tsx`. Import from `@/components/vip-ui/<name>`. Never write files into shadcn's `components/ui/`.
- Blocks land in `components/blocks/<name>/` and render as one component, such as `<Dashboard />`. The block's code panel names the entry component.
- Items print their docs after install; follow reminders such as rendering `<ToastViewport />` once near the app root.
- Preview before installing: `shadcn view @vip-ui/button`, `shadcn add @vip-ui/button --dry-run`, or `--diff` against an installed file.

## Component names

Most names match shadcn/ui. Read [references/name-map.md](references/name-map.md) for the complete map (same name, renamed, not available) and the API differences. Common renames:

| shadcn        | vip/ui                        |
| ------------- | ----------------------------- |
| input         | text-field                    |
| textarea      | text-area                     |
| combobox      | combo-box                     |
| command       | command-palette               |
| dropdown-menu | menu                          |
| sonner        | toast                         |
| drawer        | sheet                         |
| alert-dialog  | dialog (`role="alertdialog"`) |
| collapsible   | disclosure                    |
| toggle        | toggle-button                 |
| toggle-group  | toggle-button-group           |
| breadcrumb    | breadcrumbs                   |
| progress      | progress-bar                  |
| empty         | empty-state                   |
| field         | fieldset                      |
| kbd           | kbd-code                      |

Charts differ: vip/ui frames TanStack Charts with `ChartFrame` and `Chart`. There is no Recharts `ChartContainer`. Copy examples from https://vip-ui.dev/charts instead of porting shadcn chart code.

## Sizes

One size scale gives every control the same height per size name: `xs` 28px, `sm` 36px, `md` 44px, `lg` 48px, `xl` 56px. Buttons and toggles default to `md`, fields to `lg`. Groups (`Toolbar`, `ButtonGroup`, `TabsList`, `TagGroup`) take one `size` and pass it to their items. Do not shrink controls to fake density; use spacing instead. Icons inside controls take their size from the control, so drop explicit `size={n}` on those icons.

## Motion

Tokens live in the installed `motion.ts` (`@/components/vip-ui/motion`). Use its values; do not invent timings. Full tables: [references/motion.md](references/motion.md).

- State motion is CSS on React Aria data attributes: `pressed:`, `selected:`, `hovered:`, `focus-visible:` variants, `duration-150`/`duration-200`, `ease-out-quint`.
- Overlays open and close with CSS on `entering:`/`exiting:`. Do not drive open/close with JS animation.
- Use Motion only for layout (`layoutId`), presence exit, counted values, and gestures. Always gate it: `transitionFor(useReducedMotion(), transition)`.
- Every animation must respect reduced motion. CSS travel gets `motion-safe:`/`motion-reduce:`; short fades and color changes may stay.
- Infinite loops (loaders, marquee) animate one whole `transform` string with an explicit first keyframe, on an HTML element or the root `<svg>` — never `x`/`y`/`rotate`/`scale` and never an SVG child — so the browser runs them on the compositor while the main thread is busy.
- Exits are shorter than entrances (about 0.7×). Lists glint with one shared highlight layer; never add `hover:bg-*` to items of a kit list.

## Colors and tokens

Use theme tokens only: `bg-primary`, `text-muted-foreground`, `border-border`, `bg-accent`, `bg-destructive`, and so on. No raw hex or arbitrary color values. vip/ui adds tokens that a shadcn theme does not have: `--success`/`--warning` (each with `-subtle` and `-foreground`), `--highlight`, `--shadow-card`/`--shadow-float`/`--shadow-inset`, `--ease-out-quint`/`--ease-spring`, `--chart-6`, and the OKLCH color scales (`bg-blue-3` … step 12). Use the CLI add; it writes only the tokens the component uses.

## Composition rules

- Press handlers are `onPress` (not `onClick`); disabled is `isDisabled` (not `disabled`).
- Collection items (`Select`, `ComboBox`, `Menu`, `ListBox`, `Table`, `Tree`) take an `id`; the id is the value. `Select` also accepts `value`/`defaultValue`/`onValueChange`.
- There is no `asChild`. Triggers wrap their content (a `MenuTrigger` holds the button and the popover). Use the React Aria `render` prop to render a component as another element.
- Fields own their parts: `TextFieldLabel`, `TextFieldInput`, `TextFieldDescription`, `TextFieldError`. Compose them instead of adding a separate label component. Wrap fields in `Form` for `isRequired`, `validate`, and server `validationErrors`.
- Keep `data-slot` on every part when you build on the source, and prefer logical direction classes (`ms-1`, `pe-2`, `rounded-s-md`, `text-start`) over physical ones (`ml-1`, `pr-2`, `rounded-l-md`).
- Icons come from `@phosphor-icons/react`.

## Verify

After generating code: install any missing items with the CLI, keep imports pointing at `@/components/vip-ui/`, run the project's type check, and check the keyboard path and reduced-motion behavior for anything animated.
