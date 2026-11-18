# Changelog

All notable changes to vip/ui are documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versions track site releases, not a published npm package.

## Unreleased

### Added

#### Components

- Signature pad draws a handwritten signature with a mouse, finger, or pen. `SignaturePad` takes `label`, `description`, `error`, `name`, `paths`, `defaultPaths`, `drawing`, `isDisabled`, `isReadOnly`, `isRequired`, and `isInvalid`, and calls `onValueChange` with a PNG data URL after each stroke. It exports `SignaturePadRoot`, `SignaturePadLabel`, `SignaturePadControl`, `SignaturePadSegment`, `SignaturePadPath`, `SignaturePadGuide`, `SignaturePadClearTrigger`, `SignaturePadHiddenInput`, `SignaturePadDescription`, and `SignaturePadError` for composition. The hidden input submits the signature with a form, and `useSignaturePad` returns the api, data URL, capture, and clear.
- QR code encodes a link or text into a code that a phone can scan. `QrCode` takes `value`, `defaultValue`, `size`, `label`, `overlay`, `download`, `pixelSize`, and `encoding`, and renders dark modules on a white surface with a quiet zone in both themes, so the code scans. `QrCodeRoot`, `QrCodeFrame`, `QrCodePattern`, `QrCodeOverlay`, and `QrCodeDownloadTrigger` compose a custom code, and the trigger writes a PNG, JPEG, or SVG file. An overlay sets the error correction to H, and the download includes it.
- Every Zag component now exposes the full machine API and can be composed from its anatomy parts. Pagination adds `PaginationFirstTrigger`, `PaginationPrevTrigger`, `PaginationNextTrigger`, and `PaginationLastTrigger` and takes every machine prop, including `onPageSizeChange`, `type`, `translations`, `dir`, and `ids`. Marquee adds `MarqueeRoot`, `MarqueeViewport`, `MarqueeContent`, `MarqueeItem`, `MarqueeEdge`, and `MarqueePauseTrigger`, and takes `side`, `delay`, `loopCount`, `spacing`, `pauseOnInteraction`, the paused props, and the loop callbacks. OTP input takes `mask`, `autoSubmit`, `blurOnComplete`, `autoFocus`, `sanitizeValue`, and `onValueInvalid`. Inline edit adds `InlineEditRoot`, `InlineEditArea`, `InlineEditPreview`, `InlineEditInput`, `InlineEditEditTrigger`, `InlineEditControl`, `InlineEditSubmitTrigger`, and `InlineEditCancelTrigger`, and takes the edit state, submit mode, and activation mode. Resizable adds `ResizableHandleIndicator` and `ResizableContext`, plus the resize, collapse, keyboard, and registry props on the group. Scroll area adds `ScrollAreaRoot`, `ScrollAreaViewport`, `ScrollAreaContent`, `ScrollAreaScrollbar`, `ScrollAreaThumb`, and `ScrollAreaCorner`, and its hook returns the whole machine api, including `getScrollProgress` and `getScrollbarState`. Each of the six also renders its machine through a `<PaginationContext>`, `<MarqueeContext>`, `<OtpInputContext>`, `<InlineEditContext>`, `<ResizableContext>`, or `<ScrollAreaContext>` render prop, and exports the matching `use*` hook. Booleans and change callbacks keep the kit names, such as `isDisabled`, `isInvalid`, and `onChange`.
- Event calendar shows events on a day or week time grid that you move and resize. `EventCalendar` owns the visible date and view and takes `events`, `view`, `defaultView`, `defaultDate`, `timeZone`, `step`, `dayStart`, `dayEnd`, `scrollToHour`, `onEventChange`, `onEventAction`, `onSlotAction`, and `renderEvent`; `EventCalendarHeader` holds the title, Today, Previous, Next, and the Day and Week buttons, and `EventCalendarGrid` is the scroll area. A drag starts after 4 px, moves a ghost copy, snaps to `step`, and writes the new range on release; Escape cancels. Alt with the arrow keys moves and resizes a focused event and announces the new time. The current-time line follows today's column once a minute. Set `label` on an event when `renderEvent` shows more than the title and time, so the accessible name includes that content.
- Agent steps shows the steps of an agent run and the status of each step. `AgentSteps` takes `status`, `label`, and `detail`, and renders `AgentStep` children that each take `status`, `title`, and `description`. `autoCollapse` closes the steps when the run ends and opens them when a new run starts.
- Segmented control selects one option from a compact set of segments. It runs on `@zag-js/radio-group`: `SegmentedControl` owns the value and moves the indicator, and `SegmentedControlItem` renders one hidden radio with its label. It takes `value`, `defaultValue`, `onChange`, `size`, `fullWidth`, `orientation`, `name`, `isRequired`, and `isReadOnly`, so it submits and resets with a native form. It follows the writing direction of its parent, and `xs` and `sm` keep the 44px touch area.
- Tour shows a short guide that points at parts of the page, one step at a time. `Tour` owns the open state and the step and takes `steps`, `isOpen`, `defaultOpen`, `onOpenChange`, `step`, `defaultStep`, `onStepChange`, `onComplete`, `onSkip`, and `spotlight`; `TourTarget` wraps the element that a step points at, and `useTour` returns `isOpen`, `step`, `count`, `start`, `stop`, `next`, and `previous`. The popover is non-modal and stays anchored while the page scrolls, Escape skips, and focus returns to the control that started the tour.
- Lightbox shows images full screen, one at a time, from a thumbnail. `Lightbox` owns the open state and the index and takes `isOpen`, `defaultOpen`, `onOpenChange`, `index`, and `onIndexChange`; `LightboxTrigger` sets the zoom origin and returns the focus, `LightboxContent` holds the carousel, count, sides, and close button, and `LightboxImage` takes `src`, `alt`, `width`, `height`, and `caption`. Escape, the close button, a click outside the image, or a swipe down closes it, and focus returns to the trigger of the current image.
- Carousel shows a row of slides that you swipe or move with buttons. `Carousel` takes `opts` and `plugins` and passes both to Embla, so every Embla option and plugin works without a wrapper prop. It also takes `index`, `defaultIndex`, `onIndexChange`, and `setApi`; slides sit in `CarouselViewport`, and `CarouselPrevious`, `CarouselNext`, `CarouselIndicators`, `CarouselThumbnails`, `CarouselThumbnail`, and `CarouselStatus` hold the controls. `useCarousel()` returns the Embla `api` plus the selected index and scroll methods. Set `opts.axis` to `"y"` for a vertical row, and set `aria-live="off"` on the viewport when a plugin advances slides on a timer.
- Resizable splits an area into panels that you resize with a pointer or the keyboard. `ResizableGroup` owns the layout, `ResizablePanel` takes `id`, `defaultSize`, `minSize`, `maxSize`, `collapsible`, and `collapsedSize`, and `ResizableHandle` is a focusable separator: arrows move 1%, Shift moves 10%, Home and End go to the limits, Enter collapses a collapsible panel, and a double-click resets the default layout. Save the layout in `onLayoutEnd`.
- Scroll area scrolls content in a frame with theme scrollbars on every platform. `ScrollArea` takes `orientation` (`"vertical"`, `"horizontal"`, or `"both"`), `dir`, and a height in `className`; the viewport takes focus while content overflows, and the scrollbars support drag, track clicks, and the wheel. `useScrollArea()` returns `isAtTop`, `isAtBottom`, `isAtLeft`, `isAtRight`, `hasOverflowX`, `hasOverflowY`, `scrollTo`, and `scrollToEdge` to a child.
- DataTable adds `renderSelectionActions`. It shows a bar with the selected count and your bulk actions when rows are selected.
- Code block frames a block of code with a header, a copy button, and line numbers. `CodeBlock` owns the code, the wrap state, and the expanded state; `highlight` marks line numbers, `maxLines` collapses long code behind Show more, and `isStreaming` keeps the gutter steady while lines arrive. The kit has no highlighter: pass your highlighter output as the children of `CodeBlockBody`.
- Conversation keeps a transcript at its newest message while it streams. `Conversation` owns the pin state, follows new content while the reader is at the bottom, and releases the pin when the reader scrolls up. It pins again within `threshold` pixels of the bottom. `ConversationJump` shows the count of new messages and moves focus to the scroller when it hides. `ConversationLoadOlder` prepends older messages without moving the view, and `useConversation` returns `isPinned`, `newCount`, and `scrollToLatest` for the send button.
- OTP input accepts a short code with one box for each character. `OtpInput` owns the value, filters it with `pattern` (`"digits"` or `"alphanumeric"`), and calls `onComplete` when the code is full. `OtpInputSlots`, `OtpInputGroup`, `OtpInputSlot`, and `OtpInputSeparator` draw the boxes. Each box is a real input, so paste, autofill, and screen readers work.
- Sidebar frames an app with a navigation column that collapses to an icon rail. `SidebarProvider` owns the collapsed and sheet states, Mod+B toggles them, and below 48rem of container width the sidebar opens in a sheet. `SidebarItem` takes `icon`, `badge`, `isCurrent`, and `tooltip`; `useSidebar` exposes the state to a custom trigger.
- Calendar adds `CalendarMonthPicker` and `CalendarYearPicker`. Put them in `CalendarHeader` to replace the heading with month and year lists. The year list shows 20 years by default; set `visibleYears` to change it.
- DatePicker has composable parts: `DatePickerLabel`, `DatePickerGroup`, `DatePickerInput`, `DatePickerTrigger`, `DatePickerDescription`, `DatePickerError`, and `DatePickerContent`. Put a composed `Calendar` in `DatePickerContent` to add month and year pickers.
- `TooltipChart` renders a React body in the chart tooltip. Pass `renderTooltipBody` to replace the default rows, for example with a close button on a pinned tooltip.
- Response shows a streaming answer with status states. The content shows a caret and `aria-busy` while `status="streaming"`, screen readers hear one announcement when the run ends, `ResponseNotice` marks stopped and error runs, and `ResponseActions` and `ResponseFooter` hold buttons and sources.
- Reasoning reveals an agent's thinking in a disclosure. While a run is live, the trigger reads "Thinking for 3s" and counts each second. When the run ends, it reads "Thought for 12s". `autoCollapse` closes the panel at the end and reopens it on the next run, and `scrollable` caps the body at 16rem with keyboard scrolling.
- Prompt input sends with Enter and adds a line with Shift+Enter by default, or the reverse with `submitKey="mod+enter"`. While `isPending` is true and `onStop` is set, the submit button becomes Stop. Files dropped on the frame call `onFilesDropped`, and the textarea grows from `minRows` to `maxRows` before scrolling.
- `Toolbar`, `ButtonGroup`, `ToggleButtonGroup`, `TabsList`, `Pagination`, and `TagGroup` take `size` and pass it to their items. Popovers, dialogs, and sheets that open from them keep the default size.
- Avatar adds `xs` (24px) and `xl` (64px). TagGroup takes `xs`, `sm`, or `md`.
- On touch screens, `xs` and `sm` buttons, toggles, and pagination links get a 44px-high touch area. Their visible size does not change.
- Sheets nest. A SheetTrigger inside a Sheet stacks a new sheet on top; the parent scales back, rounds its corners, and follows the nested sheet's swipe. Nested sheets get a lighter backdrop. Tune the effect with `--sheet-stack-scale`, `--sheet-stack-x`, and `--sheet-stack-y`.
- Attachment exports the type `AttachmentStatus`.
- `motion.ts` adds `easeSheet`, `springPop`, `loop`, `maxStagger`, and `duration.reveal`.

#### Registry

- Items `utils` and `motion` contain `utils.ts` and `motion.ts`. Item `size` holds the shared size type and group context.
- You can add the `@vip-ui` namespace to `components.json` and add items by name, for example `@vip-ui/button`.
- Ten `theme-<slug>` items and ten color-scale items install the themes and the scales with the CLI. A theme item adds the colors and the Tailwind color mappings, so classes such as `bg-success` work after one command. A scale item adds `--<slug>-1` to `--<slug>-12`, so classes such as `bg-blue-3` work after one command.
- A `base` item sets up a new project with one command: the vip/ui theme, the shadow and easing tokens, and the React Aria Tailwind plugin.
- Nine `font-<slug>` items ship the typography fonts. On Next.js the CLI adds the font import; on other frameworks it adds a Fontsource package and the font variables.
- The 72 chart examples are registry items. One command installs an example with the chart, the components, and the packages it uses, into `components/charts/`.
- Items carry an author and a category. The CLI prints an install note for Chart, Toast, and Typography, and each block says which component to render and where.
- Resizable sits in the Display & layout category with the other frame primitives. App shell holds the app navigation chrome, and Sidebar is its first item.
- Blocks use the new components: Dashboard uses Sidebar, Chat uses Conversation and Agent steps, Agent uses Agent steps, Verify and Security use OTP input, Product and Files use Carousel and Lightbox, Onboarding uses Tour, and AI search uses Code block.
- The registry build stops when a dependency is a bare name, when a dependency URL does not resolve to an item, or when dependencies make a cycle.

#### Documentation

- Colors page at `/colors` with ten color scales: Gray, Red, Orange, Yellow, Green, Teal, Cyan, Blue, Violet, and Pink. Each scale has 12 OKLCH steps for light and dark mode. The page shows the purpose of each step and the contrast of the text steps. It copies the CSS for one scale or all scales, and a Tailwind `@theme` block that adds classes such as `bg-blue-3`.
- AI and MCP guide at `/components/ai-and-mcp`. It covers the shadcn MCP server setup for the `@vip-ui` namespace, `llms.txt`, the Markdown pages, CLI commands for agents, and a one-command install of the vip/ui agent skill.
- RTL guide at `/components/rtl`. It covers the logical classes, the CLI `rtl` option, and the components that set left or right on purpose.
- Agent skill at `skills/vip-ui/` in the repository. It teaches coding agents the shadcn name map, the size scale, the motion rules, and the color and token rules.
- The charts page has 27 new examples for the TanStack Charts API, and two new tabs: Spatial and Interactive. A coverage table links each API area to its examples.
- Every component page has a Markdown export at `/components/<slug>.md` with the same content as its HTML page: description, installation files, usage source, named examples with source, and API tables. `/llms.txt` describes what each export contains.
- The Installation guide has an Add a theme section and shows how to add the `@vip-ui` namespace. It states that components work in a React 19 app without Next.js, such as a Vite app.
- The Styling guide has a Color scales section with the purpose of each step, the contrast checks, and how to map the shadcn tokens to steps. It explains how overlays in a portal get the theme.
- The pages of sized components have a Sizes example and a `size` row in the API table.
- Component pages show the Zag.js machine or React Aria component that each component uses, and the count of Axe and React Doctor issues.
- The Sheet page has a Nested sheets example and documents the stack variables.
- API tables for Checkbox, Switch, Tabs, Date field, Time field, Date picker, Date range picker, Color field, Color picker, File trigger, Meter, Progress bar, Number field, Search field, Slider, Text field, Text area, Radio group, Toast, Toggle button, and Token field.
- Each card in the component index shows a preview. Motion previews play when you move the pointer over the card. Overlay previews are drawings and do not open.
- The home page shows motion components. They play one time when they come into view, and again on hover or focus.
- Docs section headings show a link on hover. Click it to copy the section URL.
- The search box on the Themes page shows the Ctrl K shortcut. Ctrl K opens site search on all pages except the Command palette page.

### Changed

#### Components

- Marquee runs on `@zag-js/marquee`. The machine owns the loop, the copies that fill the frame, the speed, the reverse direction, and the pause state; the kit keeps the pause button, the focus reveal, and the reduced-motion row. The props do not change.
- Pagination runs on `@zag-js/pagination`. `Pagination` takes `count`, `page`, `defaultPage`, `pageSize`, `defaultPageSize`, `siblingCount`, `boundaryCount`, `getPageUrl`, and `onPageChange`; `PaginationLink` takes `value`; and the new `PaginationPages` renders the pages and ellipses from the machine. The existing parts still work without the machine.
- Inline edit runs on `@zag-js/editable`. The machine owns the preview and edit modes, the draft value, the enter and Escape keys, focus, and the cancel revert; the kit keeps the async save, the error message, the shake, and the saved check.
- **Breaking:** buttons, toggles, fields, tabs, pagination, and tags share one size scale: `xs` 28px, `sm` 36px, `md` 44px, `lg` 48px, `xl` 56px. A size name gives the same height on every control. Buttons and toggles default to `md` and fields to `lg`. `size="default"` is now `size="md"`.
- **Breaking:** CopyButton uses the status `"error"` for a failed copy, in place of `"failed"`.
- **Breaking:** Attachment uses the prop `fileSize` for the file size in bytes, in place of `size`, and the status `"complete"` for a finished upload, in place of `"uploaded"`. The row text still shows "Uploaded".
- Icons inside buttons, toggles, tabs, pagination links, and fields take their size from the control. Add a `size-*` class to override.
- Dialog, Sheet, and Attachment use `sm` for an icon-only close button. The button is 36px, the icon is 16px, and the touch area stays 44px.
- A Tag remove button is 20px, 28px, or 36px by tag size and shows a hover background.
- Close buttons share one press scale and duration.
- TokenField is 48px high like the other fields. NativeSelect uses `size` for the kit size and does not pass the HTML `size` attribute.
- Below full size, SheetBody does not scroll on a sheet with snap points, so swiping or scrolling over the content resizes the sheet first.
- The sheet snap-point announcement and handle label give the share of the screen the sheet covers, for example "60 percent of screen height".
- Sheet animates in over 320ms and out over 240ms on its own curve, and skips the off-screen part of the travel, so short sheets start moving immediately.
- Side and top sheets leave a 3.5rem gutter on small screens, so the backdrop stays visible and can be tapped to close.
- `duration.fast` is 150ms and `duration.slow` is 250ms, so the JS values agree with the CSS classes.
- Components use the motion tokens for loops, reveals, toasts, and the chart fade, in place of their own values. The indeterminate ProgressRing turns in 1.6s, like the ProgressBar and Skeleton sweep.
- Skeleton, Progress bar, Agent status, Border beam, Text shimmer, Meter, Color thumb, Pagination, Password field, and Spotlight card animate with CSS keyframes, CSS transitions, the Web Animations API, or an IntersectionObserver, and do not load the Motion package.
- Dialog and Sheet ship their scroll-edge, sheet backdrop, and sheet stack keyframes in the registry CSS instead of a style tag, so they animate on sites that block inline styles.
- The chart frame styles TanStack `interactiveColorLegend` buttons like the other kit controls.

#### Registry

- **Breaking:** item names do not start with `vip-`. The command is `pnpm dlx shadcn@latest add @vip-ui/button`, and item files live at `https://vip-ui.dev/r/<name>.json`.
- **Breaking:** blocks install as React components in `components/blocks/<name>/`, not as Next.js routes in `app/blocks/`. Render the entry component, such as `<Dashboard />`, on any page. Blocks do not need Next.js.
- Each registry item contains only its own file. Items get shared files and other components through `registryDependencies`, with full URLs. When you add a second component, the CLI does not write shared files again.
- Items that load the Tailwind plugin list `tailwindcss-react-aria-components` under `dependencies`.
- Items that use Motion require `motion@^14.10.1`. Chart items require `@tanstack/charts@^1.5.0`.

#### Documentation

- The Themes page has ten themes made from the color scales: Gray, and one theme for each hue on Gray neutrals. A theme sets colors only, not fonts, radius, or shadows. The Tokens tab shows the scale step of each token. Each color pair passes 4.5:1 in light and dark mode. The page shows the install command first.
- The docs sidebar puts the guides in two groups: Get started and Foundations.
- Each component has one description in `src/lib/catalog.json`. The catalog, component pages, Markdown export, `llms.txt`, and registry show the same text.
- The block code panel opens the entry file and shows the component to render.
- Social preview images use the light site theme and the gallery hero layout.
- The site runs on Next.js 16.4.5, which includes the November security fixes.

### Removed

- **Breaking:** Agent status. Use Agent steps to show the steps of an agent run.
- **Breaking:** Source link. Put sources in `ResponseFooter`.
- **Breaking:** `size="icon"`. Set `iconOnly` for a square icon button at any size.
- The six earlier themes: Atelier, Signal, Canopy, Vesper, Marigold, and Graphite.

### Fixed

- After the handle, arrow keys, or a drag move a sheet, wheel and trackpad scrolling snap to a stop again.
- End moves a sheet with `preventDismissal` to its smallest snap point.
- A sheet that ends flush with the viewport edge when closed now unmounts, so the page does not stay scroll-locked.
- The registry `homepage` has no trailing slash when `NEXT_PUBLIC_REGISTRY_URL` ends with one.
- The theme toggle does not cause a hydration error when reduced motion is on.
- Opening the mobile menu does not scroll the page. The menu finishes closing before it navigates.
