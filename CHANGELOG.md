# Changelog

Concise, user-visible changes. Versions track site releases, not a published npm package.

## Unreleased

### Components

- Response shows a streaming answer with status states. The content shows a caret and `aria-busy` while `status="streaming"`, screen readers hear one announcement when the run ends, `ResponseNotice` marks stopped and error runs, and `ResponseActions` and `ResponseFooter` hold buttons and sources.
- Reasoning reveals an agent's thinking in a disclosure. While a run is live, the trigger reads "Thinking for 3s" and counts each second. When the run ends, it reads "Thought for 12s". The time comes from `duration` or the last count. `autoCollapse` closes the panel at the end and reopens it on the next run, and `scrollable` caps the body at 16rem with keyboard scrolling.
- Prompt input sends with Enter and adds a line with Shift+Enter by default, or the reverse with `submitKey="mod+enter"`. While `isPending` is true and `onStop` is set, the submit button becomes Stop. Files dropped on the frame call `onFilesDropped`, and the textarea grows from `minRows` to `maxRows` before scrolling.
- Buttons, toggles, fields, tabs, pagination, and tags share one size scale: `xs` 28px, `sm` 36px, `md` 44px, `lg` 48px, `xl` 56px. A size name gives the same height on every control, so a `sm` field, select, and button line up in a filter bar. Buttons and toggles default to `md` and fields to `lg`, so existing layouts keep their heights.
- Breaking: `size="icon"` is removed. Set `iconOnly` for a square icon button at any size. `size="default"` is now `size="md"`, the default. `node scripts/codemod-size.mjs` migrates both in the `.tsx` files under `src/`. It replaces `size="icon"` with `iconOnly` and removes `size="default"`.
- Icons inside buttons, toggles, tabs, pagination links, and fields take their size from the control. Drop `size={n}` on those icons, or add a `size-*` class to override.
- `Toolbar`, `ButtonGroup`, `ToggleButtonGroup`, `TabsList`, `Pagination`, and `TagGroup` take `size` and pass it to their items. Popovers, dialogs, and sheets that open from them keep the default size.
- On touch screens, `xs` and `sm` buttons, toggles, and pagination links get a 44px-high touch area. Their visible size does not change.
- Avatar adds `xs` (24px) and `xl` (64px). TagGroup takes `xs`, `sm`, or `md`.
- TokenField is 48px high like the other fields. Before, it was 50px. NativeSelect uses `size` for the kit size and no longer passes the HTML `size` attribute.
- Sheets nest. A SheetTrigger inside a Sheet stacks a new sheet on top; the parent scales back, rounds its corners, and follows the nested sheet's swipe. Nested sheets get a lighter backdrop. Tune the effect with `--sheet-stack-scale`, `--sheet-stack-x`, and `--sheet-stack-y`.
- After the handle, arrow keys, or a drag move a sheet, wheel and trackpad scrolling snap to a stop again. Before, Chrome could leave the sheet resting between snap points.
- Below full size, SheetBody doesn't scroll on a sheet with snap points, so swiping or scrolling over the content resizes the sheet first.
- End moves a sheet with `preventDismissal` to its smallest snap point. Before, it did nothing.
- The snap-point announcement and handle label give the share of the screen the sheet covers, for example "60 percent of screen height". Before, the label called this the visible percent.
- Sheet animates in over 320ms and out over 240ms on its own curve instead of the browser's smooth scroll, and skips the off-screen part of the travel, so short sheets start moving immediately.
- A sheet that ends flush with the viewport edge when closed now unmounts. Before, side sheets on phones stayed mounted after closing and kept the page scroll-locked.
- Side and top sheets leave a 3.5rem gutter on small screens, so the backdrop stays visible and can be tapped to close.
- Breaking: CopyButton uses the status `"error"` for a failed copy. The status `"failed"` is removed. In `children(status)` functions and `data-[status=failed]` selectors, replace `"failed"` with `"error"`.
- Breaking: Attachment uses the prop `fileSize` for the file size in bytes. The prop `size` is removed. Replace `size={bytes}` with `fileSize={bytes}`.
- Breaking: Attachment uses the status `"complete"` for a finished upload. The status `"uploaded"` is removed. Replace `status="uploaded"` with `status="complete"`, and `data-[status=uploaded]` with `data-[status=complete]`. The row text still shows "Uploaded".
- Attachment exports the type `AttachmentStatus`.
- `motion.ts` adds `easeSheet`, `springPop`, `loop`, `maxStagger`, and `duration.reveal`. `duration.fast` is 150ms and `duration.slow` is 250ms, so the JS values agree with the CSS classes.
- Components use the motion tokens for loops, reveals, toasts, and the chart fade, in place of their own values. The indeterminate ProgressRing turns in 1.6s, like the ProgressBar and Skeleton sweep.

### Documentation

- New Colors page at `/colors` with ten color scales: Gray, Red, Orange, Yellow, Green, Teal, Cyan, Blue, Violet, and Pink. Each scale has 12 OKLCH steps for light and dark mode. The page shows the purpose of each step and the contrast of the text steps. It copies the CSS for one scale or all scales, and a Tailwind `@theme` block that adds classes such as `bg-blue-3`.
- The Themes page has ten themes made from the color scales: Gray, and one theme for each hue on Gray neutrals. The six earlier themes are removed: Atelier, Signal, Canopy, Vesper, Marigold, and Graphite. A theme sets colors only, not fonts, radius, or shadows. The Tokens tab shows the scale step of each token. Each color pair passes 4.5:1 in light and dark mode.
- The Installation guide has an Add a theme section. The Styling guide has a Color scales section with the purpose of each step, the contrast checks, and how to map the shadcn tokens to steps.

- New Motion guide at `/components/motion`. It shows the motion tokens, springs, loops, tuned timings, and the reduced motion rules, with live demos.
- The home page shows motion components. Text swap, Animated number, Text scramble, and Toggle button group play one time when they come into view, and again on hover or focus.
- Each card in the component index shows a preview. The preview loads when the card is near the screen. Motion previews play when you move the pointer over the card. Overlay previews are drawings and do not open.
- Each component has one description in `src/lib/catalog.json`. The catalog, component pages, Markdown export, `llms.txt`, and registry show the same text.
- The Installation guide shows how to add the `@vip-ui` namespace.
- The search box on the Themes page shows the Ctrl K shortcut. Ctrl K opens site search on all pages except the Command palette page.
- The theme toggle no longer causes a hydration error when reduced motion is on.
- The pages of sized components have a Sizes example and a `size` row in the API table: Button, Button group, Toggle button, Toggle button group, Toolbar, Tabs, Pagination, Tag group, Avatar, Text field, Text area, Search field, Number field, Select, Combo box, Native select, Date field, Time field, Date picker, Date range picker, Color field, Input group, and Token field.
- The Sheet page adds a Nested sheets example and documents the stack variables.
- Every component page has a Markdown export at `/components/<slug>.md` with the same content as its HTML page: description, installation files, usage source, named examples with source, and API tables.
- Added vip/ui-specific API tables for Checkbox, Switch, Tabs, Date field, Time field, Date picker, Date range picker, Color field, Color picker, File trigger, Meter, Progress bar, Number field, Search field, Slider, Text field, Text area, Radio group, Toast, Toggle button, and Token field.
- The Installation guide states that components work in a React 19 app without Next.js, such as a Vite app, and that blocks need Next.js App Router. The Styling guide explains how overlays in a portal get the theme.
- `/llms.txt` describes what each Markdown export contains.
- Opening the mobile menu no longer scrolls the page. The menu finishes closing before it navigates.

### Registry

- Each registry item contains only its own file. Items get shared files and other components through `registryDependencies`, with full URLs. See `docs/registry.md`.
- New items `vip-utils` and `vip-motion` contain `utils.ts` and `motion.ts`. New item `vip-size` holds the shared size type and group context.
- When you add a second component, the CLI does not write shared files again and does not replace them.
- You can add the `@vip-ui` namespace to `components.json` and add items by name, for example `@vip-ui/vip-button`.
- The registry build stops when a dependency is a bare name, when a dependency URL does not resolve to an item, or when dependencies make a cycle.
- The registry `homepage` has no trailing slash when `NEXT_PUBLIC_REGISTRY_URL` ends with one.
- `vip-sheet` and `vip-dashboard-01` carry the Sheet changes above.
