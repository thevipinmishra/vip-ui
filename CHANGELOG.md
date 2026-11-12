# Changelog

All notable changes to vip/ui are documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versions track site releases, not a published npm package.

## Unreleased

### Added

#### Components

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
- The registry build stops when a dependency is a bare name, when a dependency URL does not resolve to an item, or when dependencies make a cycle.

#### Documentation

- Colors page at `/colors` with ten color scales: Gray, Red, Orange, Yellow, Green, Teal, Cyan, Blue, Violet, and Pink. Each scale has 12 OKLCH steps for light and dark mode. The page shows the purpose of each step and the contrast of the text steps. It copies the CSS for one scale or all scales, and a Tailwind `@theme` block that adds classes such as `bg-blue-3`.
- Motion guide at `/components/motion`. It shows the motion tokens, springs, loops, tuned timings, and the reduced motion rules, with live demos.
- From shadcn/ui guide at `/components/from-shadcn`. It shows how vip/ui installs beside shadcn/ui, maps each shadcn component name to its vip/ui name, and lists the React Aria API differences.
- AI and MCP guide at `/components/ai-and-mcp`. It covers the shadcn MCP server setup for the `@vip-ui` namespace, `llms.txt`, the Markdown pages, CLI commands for agents, and the vip/ui agent skill.
- Updating guide at `/components/updating`. It shows how to compare an installed component with the registry, overwrite it, and keep local edits.
- RTL guide at `/components/rtl`. It covers the logical classes, the CLI `rtl` option, and the components that set left or right on purpose.
- Agent skill at `skills/vip-ui/` in the repository. It teaches coding agents the shadcn name map, the size scale, the motion rules, and the color and token rules.
- The charts page has 27 new examples for the TanStack Charts API, and two new tabs: Spatial and Interactive. A coverage table links each API area to its examples.
- Every component page has a Markdown export at `/components/<slug>.md` with the same content as its HTML page: description, installation files, usage source, named examples with source, and API tables. `/llms.txt` describes what each export contains.
- The Installation guide has an Add a theme section and shows how to add the `@vip-ui` namespace. It states that components work in a React 19 app without Next.js, such as a Vite app.
- The Styling guide has a Color scales section with the purpose of each step, the contrast checks, and how to map the shadcn tokens to steps. It explains how overlays in a portal get the theme.
- The pages of sized components have a Sizes example and a `size` row in the API table.
- The Sheet page has a Nested sheets example and documents the stack variables.
- API tables for Checkbox, Switch, Tabs, Date field, Time field, Date picker, Date range picker, Color field, Color picker, File trigger, Meter, Progress bar, Number field, Search field, Slider, Text field, Text area, Radio group, Toast, Toggle button, and Token field.
- Each card in the component index shows a preview. Motion previews play when you move the pointer over the card. Overlay previews are drawings and do not open.
- The home page shows motion components. They play one time when they come into view, and again on hover or focus.
- Docs section headings show a link on hover. Click it to copy the section URL.
- The search box on the Themes page shows the Ctrl K shortcut. Ctrl K opens site search on all pages except the Command palette page.

### Changed

#### Components

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

- **Breaking:** `size="icon"`. Set `iconOnly` for a square icon button at any size.
- The six earlier themes: Atelier, Signal, Canopy, Vesper, Marigold, and Graphite.

### Fixed

- After the handle, arrow keys, or a drag move a sheet, wheel and trackpad scrolling snap to a stop again.
- End moves a sheet with `preventDismissal` to its smallest snap point.
- A sheet that ends flush with the viewport edge when closed now unmounts, so the page does not stay scroll-locked.
- The registry `homepage` has no trailing slash when `NEXT_PUBLIC_REGISTRY_URL` ends with one.
- The theme toggle does not cause a hydration error when reduced motion is on.
- Opening the mobile menu does not scroll the page. The menu finishes closing before it navigates.
