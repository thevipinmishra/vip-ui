# Components

Every vip/ui component by category. Install one with `pnpm dlx shadcn@latest add @vip-ui/<name>` and read its docs at `https://vip-ui.dev/components/<name>.md`. `pnpm registry:build` writes this file from `src/lib/catalog.json`.

## Actions

Triggers, commands, and toggles.

- `button`: Triggers an action with primary, secondary, or destructive emphasis.
- `button-group`: Joins related buttons, or a button and its menu, into one row or column.
- `menu`: Opens a list of actions from a trigger.
- `context-menu`: Opens actions for an item on right-click, long press, or keyboard.
- `toggle-button`: Switches a button between selected and unselected states.
- `toggle-button-group`: Groups toggle buttons for one or more choices.
- `toolbar`: Groups related controls in one tab stop, with arrow keys to move focus.
- `file-trigger`: Opens the file picker from a button or other trigger.
- `copy-button`: Copies a value to the clipboard and shows the result.
- `command-palette`: Opens a search dialog to find and run commands.

## Forms

Fields, choices, files, and validation.

- `text-field`: Accepts one line of text, with a label and validation.
- `password-field`: Accepts a password, with a button to show or hide it.
- `otp-input`: Accepts a short code with one box for each character.
- `signature-pad`: Draws a handwritten signature with a mouse, finger, or pen.
- `inline-edit`: Edits text in place and keeps the draft when the save fails.
- `input-group`: Joins an input with a prefix, suffix, or action.
- `text-area`: Accepts multiple lines of text.
- `number-field`: Accepts a number, with buttons to increase and decrease it.
- `search-field`: Accepts a search query, with a button to clear it.
- `select`: Selects one option from a list in a popover.
- `native-select`: Selects one option with the native HTML select element.
- `combo-box`: Selects one or more options from a list that filters as you type.
- `autocomplete`: Filters a menu or list from a search field as you type.
- `token-field`: Turns typed entries into tokens that you can edit and remove.
- `checkbox`: Selects or clears one independent option.
- `checkbox-group`: Groups checkboxes to select one or more options.
- `radio-group`: Selects one option from a short visible list.
- `segmented-control`: Selects one option from a compact set of segments.
- `rating-input`: Sets a star rating with radio controls.
- `switch`: Turns a setting on or off immediately.
- `slider`: Selects a value or range on a track between a minimum and maximum.
- `drop-zone`: Accepts files that you drop onto it or select from a file picker.
- `attachment`: Shows the name, size, preview, and upload state of a file.
- `form`: Groups fields and handles validation and submission.
- `fieldset`: Groups related native form controls under a legend.

## Date & color

Structured dates, times, and colors.

- `date-field`: Accepts a date, with one editable segment for each part.
- `time-field`: Accepts a time, with one editable segment for each part.
- `calendar`: Shows a month grid to select one date.
- `range-calendar`: Shows a month grid to select a start and end date.
- `date-picker`: Accepts a date that you type or select from a calendar popover.
- `date-range-picker`: Accepts a date range that you type or select from a calendar popover.
- `event-calendar`: Shows events on a day or week time grid that you move and resize.
- `color-field`: Accepts a hex color, or one color channel as a number.
- `color-swatch`: Shows a sample of a color.
- `color-swatch-picker`: Selects a color from a set of swatches.
- `color-picker`: Selects a color with a color area, hue slider, and hex field in a popover.
- `color-wheel`: Adjusts the hue of a color on a circular track.

## Overlays

Panels and messages above the page.

- `dialog`: Shows a focused task in a modal above the page.
- `sheet`: Shows a swipeable panel that slides in from the edge of the screen.
- `lightbox`: Shows images full screen, one at a time, from a thumbnail.
- `popover`: Shows content in a panel anchored to its trigger.
- `tour`: Shows a short guide that points at parts of the page, one step at a time.
- `tooltip`: Shows a short hint when you hover over or focus its trigger.
- `toast`: Shows a brief notification after an action.

## Navigation

Links between pages and views.

- `link`: Navigates to another page or location.
- `tabs`: Shows one panel of related content at a time.
- `breadcrumbs`: Shows the path of links to the current page.
- `pagination`: Shows links between pages of results.

## App shell

The navigation chrome that frames an app.

- `sidebar`: Shows app navigation that collapses to an icon rail.

## Collections

Lists, trees, and tables of items.

- `list-box`: Selects options from a list that stays visible.
- `grid-list`: Shows a list of interactive rows that you can select and act on.
- `carousel`: Shows a row of slides that you swipe or move with buttons.
- `tree`: Shows nested items that you can expand, collapse, and select.
- `tag-group`: Shows a group of tags that you can select or remove.
- `table`: Shows data in rows and columns, with sorting and resizing.
- `data-table`: Shows rows with search, filters, sorting, selection, and pagination.

## Feedback

Messages, status, progress, and loading states.

- `alert`: Shows an inline message about a status or event.
- `badge`: Labels an item with a short status or count.
- `progress-bar`: Shows how much of a task is complete in a horizontal bar.
- `progress-ring`: Shows how much of a task is complete in a ring.
- `meter`: Shows a measured value within a known range.
- `stepper`: Shows the current step and the steps already complete.
- `spinner`: Shows a loading indicator for a task with no known end time.
- `skeleton`: Shows a placeholder shape while content loads.
- `empty-state`: Shows why a view is empty and what to do next.

## Display & layout

Containers, sections, and values.

- `card`: Groups related content and actions in one container.
- `spotlight-card`: Shows a card with a glow and border that follow the pointer.
- `accordion`: Shows a set of sections that expand and collapse.
- `disclosure`: Shows or hides one section of content.
- `separator`: Shows a line between sections of content.
- `scroll-area`: Scrolls content in a frame with scrollbars that match the theme.
- `scroll-fade`: Fades the edges of a scroll area where more content continues.
- `progressive-blur`: Blurs content more and more toward one edge.
- `resizable`: Splits an area into panels that you resize with a pointer or the keyboard.
- `avatar`: Shows an image or initials for a person.
- `qr-code`: Encodes a link or text into a code that a phone can scan.
- `description-list`: Shows pairs of terms and details.
- `stat`: Shows a labeled metric with supporting details.
- `timeline`: Shows events in a time-ordered sequence.
- `kbd-code`: Shows keyboard keys and inline code in text.
- `code-block`: Shows a block of code with a header, copy, and line numbers.

## AI

Conversations, prompts, answers, and agent steps.

- `conversation`: Shows a transcript that stays at the newest message while it streams.
- `message`: Shows a message in a conversation.
- `agent-steps`: Shows the steps of an agent run and the status of each step.
- `tool-call`: Shows a tool call and its status, and expands to show the input and output.
- `prompt-input`: Accepts a prompt to send, with files and actions.
- `reasoning`: Reveals the thinking of an agent and how long it took.
- `response`: Shows a streaming answer with its status and actions.

## Motion & effects

Animated text, content, and surface effects.

- `text-swap`: Swaps text with a short fade when its value changes.
- `text-loop`: Cycles through a list of words on a timer.
- `icon-swap`: Swaps one icon for another with a short scale and blur.
- `animated-number`: Counts to a new number or slides the digits that change.
- `text-reveal`: Reveals text word by word or character by character.
- `highlighter`: Draws a highlight, underline, or circle on a phrase when it comes into view.
- `text-scramble`: Scrambles characters and resolves them into new text when its value changes.
- `text-shimmer`: Moves a soft highlight across text to show that work is in progress.
- `presence`: Animates content in when it appears and out before it unmounts.
- `presence-list`: Animates list items when you add, remove, or move them.
- `stagger-group`: Reveals a group of items one after another when it enters the viewport.
- `layout-morph`: Crossfades new content and animates the container to its new size.
- `marquee`: Loops a row of content with a built-in pause control.
- `border-beam`: Moves a short light around the border of a surface.
