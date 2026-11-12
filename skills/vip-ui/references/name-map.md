# Component name map

shadcn/ui component names mapped to vip/ui. Registry: `@vip-ui` → `https://vip-ui.dev/r/{name}.json`. Install with `pnpm dlx shadcn@latest add @vip-ui/<name>`.

## Same name

accordion, alert, attachment, avatar, badge, button, button-group, calendar, card, chart, checkbox, context-menu, data-table, date-picker, dialog, input-group, message, native-select, pagination, popover, radio-group, select, separator, sheet, skeleton, slider, spinner, switch, table, tabs, toast, tooltip

Notes on same-name components whose API differs:

- `chart`: frames TanStack Charts (`ChartFrame`, `Chart`, `TooltipChart`), not Recharts. No `ChartContainer`.
- `table`: parts are `Column`, `Row`, `Cell` (plus `TableHeader`, `TableBody`, `TableFooter`, `ColumnResizer`).
- `tabs`: parts are `TabList`, `Tab`, `TabPanel`.
- `toast`: call `showToast({ title })` from `@/components/vip-ui/toast`; render `<ToastViewport />` once near the app root.
- `sheet`: one component for all edges; `position` is `"bottom"` by default, also `"top"`, `"left"`, `"right"`, with `snapPoints`, `swipeDirection`, and `inset`. It replaces both shadcn `Sheet` and shadcn `Drawer`.
- `dialog`: shadcn part names (`Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogBody`, `DialogFooter`, `DialogClose`). It is React Aria `ModalOverlay`/`Modal`/`Dialog` underneath.
- `data-table`: adds search, filters, sorting, selection, and pagination as one component.

## Renamed

| shadcn/ui     | vip/ui              |
| ------------- | ------------------- |
| alert-dialog  | dialog              |
| breadcrumb    | breadcrumbs         |
| collapsible   | disclosure          |
| combobox      | combo-box           |
| command       | command-palette     |
| drawer        | sheet               |
| dropdown-menu | menu                |
| empty         | empty-state         |
| field         | fieldset            |
| input         | text-field          |
| kbd           | kbd-code            |
| progress      | progress-bar        |
| sonner        | toast               |
| textarea      | text-area           |
| toggle        | toggle-button       |
| toggle-group  | toggle-button-group |

- `alert-dialog` → `dialog`: set `role="alertdialog"` on `DialogContent`. An outside click then nudges the dialog instead of closing it.
- `command` → `command-palette`: a searchable command dialog driven by `CommandPaletteItem` entries.
- `dropdown-menu` → `menu`: parts are `MenuTrigger`, `MenuPopover`, `MenuContent`, `MenuItem`, `MenuSection`, `MenuSeparator`, plus `SubmenuTrigger`.

## Not available

These shadcn components have no vip/ui counterpart. Do not invent substitutes; use the closest vip/ui component or plain HTML.

aspect-ratio, bubble, carousel, code-block, direction, hover-card, input-otp, item, label, marker, menubar, message-scroller, navigation-menu, questionnaire, resizable, scroll-area, sidebar, trace

- For labels, use the label part of the field (`TextFieldLabel`, `SelectLabel`, …) or `Label` from `react-aria-components`.
- `Typography` (the shadcn Typeset CSS system) corresponds to the vip/ui Typography CSS presets (`typography` class with preset classes), documented at https://vip-ui.dev/components/typography. It is CSS, not a component.

## API differences from shadcn/ui

vip/ui wraps React Aria Components, so:

- Press events are `onPress`, not `onClick`. It covers mouse, touch, keyboard, and screen reader activation.
- Disabled is `isDisabled`, not `disabled`.
- Collection items take an `id`; the id is the value. `Select` also accepts `value`, `defaultValue`, and `onValueChange` next to React Aria `selectedKey` props.
- No `asChild`. Overlays compose: the trigger part holds both the trigger element and the overlay (`MenuTrigger` holds a `Button` and `MenuPopover`). Use the `render` prop to change the rendered element.
- Form validation is React Aria: `isRequired`, a `validate` function, and server `validationErrors`, with each field rendering its own error part. Wrap fields in `Form` (a native `<form>`).
- Icons come from `@phosphor-icons/react`, not Lucide. Installed files keep their Phosphor imports even in a project that uses Lucide.
- Components use shadcn color tokens plus vip/ui extras: `--success` and `--warning` (each with `-subtle` and `-foreground`), `--highlight`, `--shadow-card`, `--shadow-float`, `--shadow-inset`, `--ease-out-quint`, `--ease-spring`, and `--chart-6`.
