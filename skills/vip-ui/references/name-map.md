# Component name map

shadcn/ui component names mapped to vip/ui. Registry: `@vip-ui` → `https://vip-ui.dev/r/{name}.json`. Install with `pnpm dlx shadcn@latest add @vip-ui/<name>`.

## Same name

accordion, alert, attachment, avatar, badge, button, button-group, calendar, card, carousel, chart, checkbox, code-block, context-menu, data-table, date-picker, dialog, input-group, message, native-select, pagination, popover, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, spinner, switch, table, tabs, toast, tooltip

Notes on same-name components whose API differs:

- `chart`: frames TanStack Charts (`ChartFrame`, `Chart`, `TooltipChart`), not Recharts. No `ChartContainer`.
- `calendar` stays the month picker. For a day or week time grid with draggable events, use `event-calendar`, which has no shadcn counterpart.
- `carousel`: parts are `Carousel`, `CarouselViewport`, `CarouselSlide`, `CarouselPrevious`, `CarouselNext`, `CarouselIndicators`, `CarouselThumbnails`, `CarouselThumbnail`, and `CarouselStatus`, with `useCarousel()` for the Embla API, the selected index, and the scroll methods. It uses `embla-carousel-react`. `opts` and `plugins` go straight to Embla, so Autoplay, Auto Height, and other plugins work without a wrapper prop, and `setApi` hands you the Embla API. Set `opts.axis` to `"y"` for a vertical row. When a plugin advances slides on a timer, set `aria-live="off"` on the viewport and render a pause control from `useCarousel()`.
- `code-block`: parts are `CodeBlock`, `CodeBlockHeader`, `CodeBlockTitle`, `CodeBlockActions`, `CodeBlockWrap`, `CodeBlockCopy`, and `CodeBlockBody`. The kit has no highlighter; pass your highlighter output as the children of `CodeBlockBody`.
- `table`: parts are `Column`, `Row`, `Cell` (plus `TableHeader`, `TableBody`, `TableFooter`, `ColumnResizer`).
- `tabs`: parts are `TabList`, `Tab`, `TabPanel`.
- `toast`: call `showToast({ title })` from `@/components/vip-ui/toast`; render `<ToastViewport />` once near the app root.
- `sheet`: one component for all edges; `position` is `"bottom"` by default, also `"top"`, `"left"`, `"right"`, with `snapPoints`, `swipeDirection`, and `inset`. It replaces both shadcn `Sheet` and shadcn `Drawer`.
- `dialog`: shadcn part names (`Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogBody`, `DialogFooter`, `DialogClose`). It is React Aria `ModalOverlay`/`Modal`/`Dialog` underneath.
- `data-table`: adds search, filters, sorting, selection, and pagination as one component.
- `sidebar`: parts are `SidebarProvider`, `Sidebar`, `SidebarHeader`, `SidebarContent`, `SidebarGroup`, `SidebarGroupLabel`, `SidebarMenu`, `SidebarItem`, `SidebarFooter`, `SidebarTrigger`, and `SidebarInset`. The collapse state is `isOpen`/`defaultOpen`/`onOpenChange`, not `open`. It is an app shell, not a docs section nav.
- `resizable`: parts are `ResizableGroup`, `ResizablePanel`, `ResizableHandle`, and `ResizableHandleIndicator`, in place of `PanelGroup`, `Panel`, and `PanelResizeHandle`. It uses `@zag-js/splitter`, so drag, keyboard moves, collapse, and the resize-trigger indicator are handled by the machine. Sizes are percentages that sum to 100, and you save the layout yourself through `onLayoutEnd` and `defaultLayout`; there is no `autoSaveId`. Panels take an optional `id`, `order`, `minSize`, `maxSize`, `collapsible`, `collapsedSize`, and `resizeBehavior`. The group also takes `layout`, `onLayoutChange`, `onResizeStart`, `keyboardResizeBy`, `onCollapse`, `onExpand`, and `registry`. A handle takes `isDisabled`. Use `ResizableContext` or `useResizable()` for the splitter api.
- `scroll-area`: `ScrollArea` is the ready-made frame with both scrollbars. Set `orientation` to `"vertical"`, `"horizontal"`, or `"both"`, and set a fixed height in `className` so the content scrolls. For a custom frame, compose `ScrollAreaRoot`, `ScrollAreaViewport`, `ScrollAreaContent`, `ScrollAreaScrollbar`, `ScrollAreaThumb`, and `ScrollAreaCorner`. `useScrollArea()` returns the whole machine api, including `isAtTop`, `isAtBottom`, `hasOverflowX`, `hasOverflowY`, `getScrollProgress`, `getScrollbarState`, `scrollTo`, and `scrollToEdge`; `ScrollAreaContext` gives the same api to a render prop.
- `pagination`: `Pagination` uses `@zag-js/pagination` for the page range, labels, and URLs. Pass `count`, `page`, and `pageSize`, then render `PaginationPages`; the manual `PaginationList`, `PaginationItem`, `PaginationLink`, and `PaginationEllipsis` parts still work without `count`. Add `PaginationFirstTrigger`, `PaginationPrevTrigger`, `PaginationNextTrigger`, and `PaginationLastTrigger` for machine-owned first, previous, next, and last pages. The group takes every machine prop, including `onPageSizeChange`, `type`, `translations`, `dir`, and `ids`. `PaginationContext` exposes `page`, `totalPages`, `pageRange`, `pages`, and `setPage`.

## Renamed

| shadcn/ui        | vip/ui              |
| ---------------- | ------------------- |
| alert-dialog     | dialog              |
| breadcrumb       | breadcrumbs         |
| collapsible      | disclosure          |
| combobox         | combo-box           |
| command          | command-palette     |
| drawer           | sheet               |
| dropdown-menu    | menu                |
| empty            | empty-state         |
| field            | fieldset            |
| input            | text-field          |
| input-otp        | otp-input           |
| kbd              | kbd-code            |
| message-scroller | conversation        |
| progress         | progress-bar        |
| sonner           | toast               |
| textarea         | text-area           |
| toggle           | toggle-button       |
| toggle-group     | toggle-button-group |

- `alert-dialog` → `dialog`: set `role="alertdialog"` on `DialogContent`. An outside click then nudges the dialog instead of closing it.
- `command` → `command-palette`: a searchable command dialog driven by `CommandPaletteItem` entries.
- `dropdown-menu` → `menu`: parts are `MenuTrigger`, `MenuPopover`, `MenuContent`, `MenuItem`, `MenuSection`, `MenuSeparator`, plus `SubmenuTrigger`.
- `input-otp` → `otp-input`: parts are `OtpInput`, `OtpInputLabel`, `OtpInputSlots`, `OtpInputGroup`, `OtpInputSlot`, `OtpInputSeparator`, `OtpInputDescription`, and `OtpInputError`. It uses `@zag-js/pin-input`, so each slot is a real input and paste, autofill, backspace, arrow keys, and screen readers work. `pattern` is `"digits"` or `"alphanumeric"`, `onChange` gets the code, and `onComplete` runs when the code is full. The machine props are also available: `mask`, `autoSubmit`, `blurOnComplete`, `autoFocus`, `sanitizeValue`, `onValueInvalid`, `ids`, `form`, and `translations`. Use `OtpInputContext` or `useOtpInput()` for the value, `clearValue`, or `focus`.
- `message-scroller` → `conversation`: parts are `Conversation`, `ConversationContent`, `ConversationEmpty`, `ConversationLoadOlder`, and `ConversationJump`. `Conversation` is only the scroll frame; call `useConversation().scrollToLatest()` when the user sends a message.

## vip/ui only

These components have no shadcn/ui counterpart:

- `agent-steps`: `AgentSteps` takes `status`, `label`, and an optional `detail`, and renders `AgentStep` children with their own `status`. Set `autoCollapse` to close the steps when the run ends and open them when a new run starts.
- `event-calendar`: `EventCalendar` shows a day or week time grid with `EventCalendarHeader` and `EventCalendarGrid`. It does not own events; update `events` in `onEventChange`. Pass `timeZone` and `defaultDate`, and set `dayStart` and `dayEnd` to show part of the day. When `renderEvent` shows more than the title and time, set the event `label` so the accessible name includes that content.
- `lightbox`: parts are `Lightbox`, `LightboxTrigger`, `LightboxContent`, `LightboxImage`, `LightboxCount`, and `LightboxClose`. It uses `Carousel` for the slides; install it separately. Give each trigger an `aria-label`.
- `segmented-control`: parts are `SegmentedControl` and `SegmentedControlItem`. It is a radio group for one compact choice, not a `Tabs` replacement. Use `value`, `defaultValue`, and `onChange` (or `onValueChange`), and `isDisabled` on the control or a segment; set `size` once on the control.
- `tour`: parts are `Tour` and `TourTarget`, with `useTour()` for `start`, `stop`, `next`, and `previous`. Wrap each target in `TourTarget` with the step id and start the tour from a button inside `Tour`.

## Not available

These shadcn components have no vip/ui counterpart. Do not invent substitutes; use the closest vip/ui component or plain HTML.

aspect-ratio, bubble, direction, hover-card, item, label, marker, menubar, navigation-menu, questionnaire, trace

- For labels, use the label part of the field (`TextFieldLabel`, `SelectLabel`, …) or `Label` from `react-aria-components`.
- `Typography` (the shadcn Typeset CSS system) corresponds to the vip/ui Typography CSS presets (`typography` class with preset classes), documented at https://vip-ui.dev/typography. It is CSS, not a component.

## API differences from shadcn/ui

vip/ui wraps React Aria Components, so:

- Press events are `onPress`, not `onClick`. It covers mouse, touch, keyboard, and screen reader activation.
- Disabled is `isDisabled`, not `disabled`.
- Collection items take an `id`; the id is the value. `Select` also accepts `value`, `defaultValue`, and `onValueChange` next to React Aria `selectedKey` props.
- No `asChild`. Overlays compose: the trigger part holds both the trigger element and the overlay (`MenuTrigger` holds a `Button` and `MenuPopover`). Use the `render` prop to change the rendered element.
- Form validation is React Aria: `isRequired`, a `validate` function, and server `validationErrors`, with each field rendering its own error part. Wrap fields in `Form` (a native `<form>`).
- Icons come from `@phosphor-icons/react`, not Lucide. Installed files keep their Phosphor imports even in a project that uses Lucide.
- Components use shadcn color tokens plus vip/ui extras: `--success` and `--warning` (each with `-subtle` and `-foreground`), `--highlight`, `--shadow-card`, `--shadow-float`, `--shadow-inset`, `--ease-out-quint`, `--ease-spring`, and `--chart-6`.
