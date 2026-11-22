---
name: vip-ui
description: Build UI with vip/ui (vip-ui.dev), a shadcn registry of React Aria components, blocks, and charts. Use when a task mentions vip/ui, vip-ui.dev, or the @vip-ui registry; when installing vip/ui items with the shadcn CLI; or when moving shadcn/ui code to vip/ui.
---

# vip/ui

vip/ui is a shadcn registry of React components built on React Aria Components, Tailwind CSS v4, and Motion. Items install as editable source files.

- Component list: [references/components.md](references/components.md), or https://vip-ui.dev/llms.txt for the latest
- Component docs as Markdown: `https://vip-ui.dev/components/<name>.md`
- Setup for agents: https://vip-ui.dev/components/installation.md
- Chart examples: https://vip-ui.dev/charts

## 1. Set up the project

Requires React 19, TypeScript, Tailwind CSS v4.1+, a shadcn theme with CSS variables, and shadcn CLI 4.7.0+.

Read https://vip-ui.dev/components/installation.md before you change files. It covers the import alias, `components.json`, the theme, and the build.

If the project has its own colors or fonts, keep them. Do not run `init --defaults`. Follow the existing theme steps in that page and add only the tokens that are missing. Do not replace theme values, fonts, or base styles.

## 2. Add items

Use `@vip-ui/<name>`, such as `@vip-ui/button`. You do not need to add the registry to `components.json` first: the CLI finds it in the public registry directory. For a local or preview registry, use its URL instead. Use the package runner of the project in place of `npx`. Install one item at a time with these steps:

1. Preview: `npx shadcn@latest add <item> --dry-run`. Copy the global CSS and each file that shows `overwrite` to a temporary folder.
2. Install with No answers to each overwrite. Do not use `--overwrite`.

   ```bash
   node -e "process.exit(child_process.spawnSync('npx shadcn@latest add <item> --yes',{shell:true,input:'n '.repeat(9e6),stdio:['pipe',1,2]}).status??1)"
   ```

   The command answers No, but the CLI can still change those files.

3. Check that each `create` file exists. The CLI can exit with code 0 and write none of the files. Restore each `overwrite` file that differs from your copy.
4. Clean the CSS. If the project CSS set a variable before the install, delete each new declaration of it. This includes self-references such as `--highlight: var(--highlight)` and values in a new `.dark` block. Delete rules that become empty. If a `dark` variant existed, delete any new one. Keep all other additions.
5. Follow the notes at the end of the `--yes` output. For example, render `<ToastViewport />` once near the app root.
6. Run the project build, then its type check. If `tsconfig.json` has `"files": []`, use `tsc -b`. Both must pass. Do not change the `overwrite` files. Report them as not updated, with any errors.

- Components go to `components/vip-ui/<name>.tsx`. Import from `@/components/vip-ui/<name>`.
- Blocks go to `components/blocks/<name>/` and render as one component, such as `<Dashboard />`.
- Never write vip/ui files into `components/ui/`.

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
- If the CLI adds a variable that your CSS already sets, keep your value and delete the new declaration. This includes self-references, new `.dark` values, and new `dark` variants. Delete rules that become empty.

## 6. Motion

Use the tokens in `@/components/vip-ui/motion`. Do not invent timings. For the full tables and rules, read [references/motion.md](references/motion.md).

- Animate state with CSS on React Aria variants: `pressed:`, `selected:`, `hovered:`, `focus-visible:`.
- Animate overlays with CSS on `entering:` and `exiting:`. Do not open or close them with JS.
- Use Motion only for layout, exit, counting, and gestures. Wrap the transition in `transitionFor(useReducedMotion(), transition)`.
- Respect reduced motion. Put travel behind `motion-safe:`.
- Before you animate a loop, such as a loader, read the loop rules in the reference.
- Do not add `hover:bg-*` to items in a vip/ui list. The list has its own highlight.

## 7. Check your work

- Install missing items with the CLI, following section 2.
- Run the project build, then the type check. If `tsconfig.json` has `"files": []`, use `tsc -b`. Both must pass.
- Do not change the `overwrite` files that the user edited. Report them as not updated, with any errors.
- Keep imports on `@/components/vip-ui/`.
- Test keyboard use and reduced motion.
- End with one short report:
  - **Found:** the framework, the theme, and what was missing. If the project was ready, say "The project was already ready. Setup changed nothing."
  - **Changed:** files and packages. If dark mode followed the OS and now uses `.dark`, say that it no longer follows the OS.
  - **Checks:** the build and type check results, errors, and files that were not updated.
  - **Next:** what the user can ask, such as "Add the vip/ui Button".
