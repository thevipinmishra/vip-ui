---
name: vip-ui
description: Build UI with vip/ui (vip-ui.dev), a shadcn registry of React Aria components, blocks, and charts. Use when a task mentions vip/ui, vip-ui.dev, or the @vip-ui registry; when installing vip/ui items with the shadcn CLI; or when moving shadcn/ui code to vip/ui.
---

# vip/ui

vip/ui is a shadcn registry of React components built on React Aria Components, Tailwind CSS v4, and Motion. Items install as editable source files.

- Component list: [references/components.md](references/components.md), or https://vip-ui.dev/llms.txt for the latest
- Component docs as Markdown: `https://vip-ui.dev/components/<name>.md`
- Chart examples: https://vip-ui.dev/charts

## 1. Set up the project

Requires React 19, TypeScript, Tailwind CSS v4.1+, a shadcn theme with CSS variables, and shadcn CLI 4.7.0+.

Add the namespace to `components.json`:

```json
{
  "registries": {
    "@vip-ui": "https://vip-ui.dev/r/{name}.json"
  }
}
```

## 2. Add items

```bash
pnpm dlx shadcn@latest add @vip-ui/button @vip-ui/dialog
```

- Preview first with `shadcn view @vip-ui/<name>` or `shadcn add @vip-ui/<name> --dry-run`.
- Components go to `components/vip-ui/<name>.tsx`. Import from `@/components/vip-ui/<name>`.
- Blocks go to `components/blocks/<name>/` and render as one component, such as `<Dashboard />`.
- Never write vip/ui files into `components/ui/`.
- Follow the notes the CLI prints after install. For example, render `<ToastViewport />` once near the app root.

## 3. Use vip/ui names

Most names match shadcn/ui. Common renames:

| shadcn           | vip/ui                        |
| ---------------- | ----------------------------- |
| input            | text-field                    |
| textarea         | text-area                     |
| combobox         | combo-box                     |
| command          | command-palette               |
| dropdown-menu    | menu                          |
| sonner           | toast                         |
| drawer           | sheet                         |
| alert-dialog     | dialog (`role="alertdialog"`) |
| collapsible      | disclosure                    |
| toggle           | toggle-button                 |
| toggle-group     | toggle-button-group           |
| breadcrumb       | breadcrumbs                   |
| progress         | progress-bar                  |
| empty            | empty-state                   |
| field            | fieldset                      |
| kbd              | kbd-code                      |
| message-scroller | conversation                  |

For the full map, missing components, and API differences, read [references/name-map.md](references/name-map.md).

Charts use TanStack Charts (`ChartFrame`, `Chart`), not Recharts. Copy from https://vip-ui.dev/charts. Do not port shadcn chart code.

## 4. Write the code

- Use `onPress`, not `onClick`.
- Props keep the names of the wrapped library, with no aliases. React Aria components use `isDisabled` and `onChange`; Zag components (`SegmentedControl`, `InlineEdit`, `SignaturePad`, `ResizableHandle`) use `disabled` and `onValueChange`. See [references/name-map.md](references/name-map.md).
- Collection items (`Select`, `ComboBox`, `Menu`, `ListBox`, `Table`, `Tree`) take an `id`. The id is the value.
- There is no `asChild`. The trigger part holds the trigger and the overlay, for example `MenuTrigger` holds a `Button` and a `MenuPopover`. Use the `render` prop to change the element.
- Build fields from their parts: `TextFieldLabel`, `TextFieldInput`, `TextFieldDescription`, `TextFieldError`. Do not add a separate label component.
- Call `useConversation().scrollToLatest()` when the user sends a message into a `Conversation`.
- Wrap each element that a `Tour` step points at in `TourTarget` with the step id, and start the tour from a button inside `Tour` with `useTour().start()`.
- `EventCalendar` does not own events: update `events` in `onEventChange`, give it an `aria-label`, and set an event `label` when `renderEvent` shows extra content.
- Render code with `CodeBlock` and pass highlighter output as the children of `CodeBlockBody`. The kit has no highlighter.
- Wrap fields in `Form`. Validate with `isRequired`, `validate`, and `validationErrors`.
- Use icons from `@phosphor-icons/react`.
- In a `Button`, `ButtonLink`, or `ToggleButton` with a label, add `data-icon="inline-start"` or `data-icon="inline-end"` to the icon or `Spinner` for correct spacing. Do not add it to `iconOnly` buttons.
- Use logical classes: `ms-1`, `pe-2`, `rounded-s-md`, `text-start`. Keep `data-slot` on every part.

## 5. Sizes and colors

- Sizes: `xs` 28px, `sm` 32px, `md` 40px, `lg` 48px, `xl` 56px. Controls default to `md`. `lg` and `xl` also use 16px text.
- On `TabList`, `SegmentedControl`, and `ToggleButtonGroup`, `size` is the outer height of the frame. A group lines up with a button of the same size.
- Set `size` once on a group (`Toolbar`, `ButtonGroup`, `TabList`, `TagGroup`). Its items follow.
- Use `sm` for controls in dense surfaces: toolbars, filter rows, card headers, and table rows. Keep forms, dialog footers, and page actions on `md`. Use `lg` for hero search and marketing calls to action.
- Do not set `size` on icons inside controls.
- Use theme tokens only, such as `bg-primary`, `text-muted-foreground`, `border-border`. No hex or arbitrary colors.
- vip/ui adds `success`, `warning`, `highlight`, shadow, and ease tokens. The CLI writes the ones a component needs.

## 6. Motion

Use the tokens in `@/components/vip-ui/motion`. Do not invent timings. For the full tables and rules, read [references/motion.md](references/motion.md).

- Animate state with CSS on React Aria variants: `pressed:`, `selected:`, `hovered:`, `focus-visible:`.
- Animate overlays with CSS on `entering:` and `exiting:`. Do not open or close them with JS.
- Use Motion only for layout, exit, counting, and gestures. Wrap the transition in `transitionFor(useReducedMotion(), transition)`.
- Respect reduced motion. Put travel behind `motion-safe:`.
- Before you animate a loop, such as a loader, read the loop rules in the reference.
- Do not add `hover:bg-*` to items in a vip/ui list. The list has its own highlight.

## 7. Check your work

- Install missing items with the CLI.
- Keep imports on `@/components/vip-ui/`.
- Run the type check.
- Test keyboard use and reduced motion.
