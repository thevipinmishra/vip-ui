/** vip/ui-specific props shared by component pages and their Markdown exports. */
export interface ApiProp {
  component: string;
  prop: string;
  type: string;
  defaultValue: string;
  description: string;
}

export function groupApiProps(api: readonly ApiProp[]) {
  const groups = new Map<string, ApiProp[]>();
  for (const prop of api) {
    const group = groups.get(prop.component);
    if (group) group.push(prop);
    else groups.set(prop.component, [prop]);
  }
  return Array.from(groups, ([component, props]) => ({ component, props }));
}

export const customComponentApi: Record<string, ApiProp[]> = {
  "text-reveal": [
    {
      component: "TextReveal",
      prop: "text",
      type: "string",
      defaultValue: "required",
      description: "Plain text announced once to assistive technology.",
    },
    {
      component: "TextReveal",
      prop: "split",
      type: '"words" | "characters"',
      defaultValue: '"words"',
      description:
        "Unit used for the masked entrance; characters follow grapheme boundaries.",
    },
    {
      component: "TextReveal",
      prop: "trigger",
      type: '"mount" | "in-view"',
      defaultValue: '"in-view"',
      description:
        "Starts on mount or the first time text enters the viewport.",
    },
    {
      component: "TextReveal",
      prop: "stagger",
      type: "number",
      defaultValue: "0.045",
      description: "Delay in seconds between units.",
    },
  ],
  "text-scramble": [
    {
      component: "TextScramble",
      prop: "value",
      type: "string",
      defaultValue: "required",
      description:
        "Current text; changing it starts a new scramble. Screen readers receive the final text immediately.",
    },
    {
      component: "TextScramble",
      prop: "duration",
      type: "number",
      defaultValue: "0.7",
      description: "Time in seconds to resolve the text.",
    },
    {
      component: "TextScramble",
      prop: "glyphs",
      type: "string",
      defaultValue: "A-Z and 0-9",
      description: "Characters used for the temporary visual scramble.",
    },
  ],
  "scroll-highlight": [
    {
      component: "ScrollHighlight",
      prop: "text",
      type: "string",
      defaultValue: "required",
      description:
        "Words emphasize as the element scrolls; the full text remains readable and is announced once.",
    },
    {
      component: "ScrollHighlight",
      prop: "containerRef",
      type: "RefObject<HTMLElement | null>",
      defaultValue: "viewport",
      description: "Scrollable container to track instead of the page.",
    },
  ],
  "scroll-progress": [
    {
      component: "ScrollProgress",
      prop: "label",
      type: "string",
      defaultValue: "required",
      description: "Visible name for the reading progress bar.",
    },
    {
      component: "ScrollProgress",
      prop: "containerRef",
      type: "RefObject<HTMLElement | null>",
      defaultValue: "viewport",
      description: "Scrollable container to track instead of the page.",
    },
  ],
  presence: [
    {
      component: "Presence",
      prop: "show",
      type: "boolean",
      defaultValue: "required",
      description:
        "Keeps exiting content mounted but inert until the exit ends. Move focus before hiding focused content.",
    },
    {
      component: "Presence",
      prop: "as",
      type: '"div" | "span"',
      defaultValue: '"div"',
      description: "Outer element for the conditional content.",
    },
    {
      component: "Presence",
      prop: "distance / duration",
      type: "number / number",
      defaultValue: "8 / 0.22",
      description:
        "Exit and entrance travel in pixels, and transition time in seconds.",
    },
  ],
  "stagger-group": [
    {
      component: "StaggerGroup",
      prop: "as",
      type: '"div" | "ul"',
      defaultValue: '"div"',
      description: "Use ul with li StaggerItem children for a semantic list.",
    },
    {
      component: "StaggerGroup",
      prop: "trigger",
      type: '"mount" | "in-view"',
      defaultValue: '"in-view"',
      description:
        "Starts the sequence on mount or the first time the group enters view.",
    },
    {
      component: "StaggerGroup",
      prop: "stagger",
      type: "number",
      defaultValue: "0.08",
      description: "Delay in seconds between StaggerItem children.",
    },
    {
      component: "StaggerItem",
      prop: "as",
      type: '"div" | "li"',
      defaultValue: '"div"',
      description: "Element receiving the group animation.",
    },
  ],
  "mask-reveal": [
    {
      component: "MaskReveal",
      prop: "direction",
      type: '"left" | "right" | "up" | "down"',
      defaultValue: '"left"',
      description: "Edge from which content becomes visible.",
    },
    {
      component: "MaskReveal",
      prop: "trigger",
      type: '"mount" | "in-view"',
      defaultValue: '"in-view"',
      description:
        "Starts on mount or the first time content enters view. Hidden content is inert until reveal starts.",
    },
    {
      component: "MaskReveal",
      prop: "duration",
      type: "number",
      defaultValue: "0.65",
      description: "Reveal time in seconds.",
    },
  ],
  "layout-morph": [
    {
      component: "LayoutMorph",
      prop: "contentKey",
      type: "string | number",
      defaultValue: "required",
      description:
        "Change with the content to crossfade it and animate the container height.",
    },
  ],
  "parallax-layer": [
    {
      component: "ParallaxLayer",
      prop: "distance",
      type: "number",
      defaultValue: "32",
      description:
        "Maximum movement in pixels from center; use an outer clipping container when needed.",
    },
    {
      component: "ParallaxLayer",
      prop: "containerRef",
      type: "RefObject<HTMLElement | null>",
      defaultValue: "viewport",
      description: "Scrollable container to track instead of the page.",
    },
  ],
  marquee: [
    {
      component: "Marquee",
      prop: "speed",
      type: "number",
      defaultValue: "50",
      description:
        "Movement in pixels per second. Zero stops movement; hover, focus, and the built-in button pause it.",
    },
    {
      component: "Marquee",
      prop: "children",
      type: "ReactNode",
      defaultValue: "required",
      description:
        "Use presentational content without duplicate IDs. The second copy is inert and hidden from assistive technology.",
    },
  ],
  "combo-box": [
    {
      component: "ComboBox",
      prop: "options",
      type: "ComboBoxOption[]",
      defaultValue: "—",
      description: "Options for the default list layout.",
    },
    {
      component: "ComboBox",
      prop: "label / description",
      type: "string",
      defaultValue: "—",
      description: "Label and help text in the default layout.",
    },
    {
      component: "ComboBox",
      prop: "placeholder",
      type: "string",
      defaultValue: '"Search options"',
      description: "Input placeholder in the default layout.",
    },
    {
      component: "ComboBox",
      prop: "value / defaultValue",
      type: "string",
      defaultValue: "—",
      description: "Selected option id in single-selection mode.",
    },
    {
      component: "ComboBox",
      prop: "onValueChange",
      type: "(value: string) => void",
      defaultValue: "—",
      description: "Receives the selected id in single-selection mode.",
    },
    {
      component: "ComboBoxTags",
      prop: "label",
      type: "string",
      defaultValue: '"Selected options"',
      description: "Accessible name for the selected tags.",
    },
    {
      component: "ComboBoxTags",
      prop: "emptyText",
      type: "string",
      defaultValue: '"No options selected."',
      description: "Text shown when no tags are selected.",
    },
  ],
  attachment: [
    {
      component: "AttachmentList",
      prop: "children",
      type: "ReactNode",
      defaultValue: "required",
      description: "Place keyed Attachment items in this semantic list.",
    },
    {
      component: "Attachment",
      prop: "name",
      type: "string",
      defaultValue: "required",
      description: "Filename shown in the row.",
    },
    {
      component: "Attachment",
      prop: "size",
      type: "number",
      defaultValue: "—",
      description: "File size in bytes.",
    },
    {
      component: "Attachment",
      prop: "previewUrl",
      type: "string",
      defaultValue: "—",
      description: "Image preview URL; otherwise shows a file icon.",
    },
    {
      component: "Attachment",
      prop: "status",
      type: '"ready" | "uploading" | "uploaded" | "error"',
      defaultValue: '"ready"',
      description: "App-provided upload state.",
    },
    {
      component: "Attachment",
      prop: "progress",
      type: "number",
      defaultValue: "—",
      description: "Upload percentage; omitted progress is indeterminate.",
    },
    {
      component: "Attachment",
      prop: "errorMessage",
      type: "string",
      defaultValue: '"Could not upload"',
      description: "Message shown when status is error.",
    },
    {
      component: "Attachment",
      prop: "onRemove",
      type: "() => void",
      defaultValue: "—",
      description: "Shows a remove button and handles its press.",
    },
    {
      component: "Attachment",
      prop: "onRetry",
      type: "() => void",
      defaultValue: "—",
      description: "Shows a retry button when status is error.",
    },
  ],
  "native-select": [
    {
      component: "NativeSelect",
      prop: "label",
      type: "string",
      defaultValue: "required",
      description: "Visible label for the select.",
    },
    {
      component: "NativeSelect",
      prop: "description / error",
      type: "string",
      defaultValue: "—",
      description: "Help and validation text linked to the select.",
    },
    {
      component: "NativeSelect",
      prop: "isInvalid",
      type: "boolean",
      defaultValue: "false",
      description: "Marks the select invalid.",
    },
    {
      component: "NativeSelect",
      prop: "placeholder",
      type: "string",
      defaultValue: "—",
      description: "Adds an empty option.",
    },
    {
      component: "NativeSelect",
      prop: "containerClassName",
      type: "string",
      defaultValue: "—",
      description: "Classes for the outer field layout.",
    },
  ],
  select: [
    {
      component: "Select",
      prop: "options",
      type: "SelectOption[]",
      defaultValue: "—",
      description:
        "Render the default label, trigger, and list from data. Each option has a stable string id, a visible name, and an optional description shown as a second line.",
    },
    {
      component: "Select",
      prop: "label / description",
      type: "string",
      defaultValue: "—",
      description:
        "Visible label and help text in the default layout. Keep a label or supply aria-label when you compose children yourself.",
    },
    {
      component: "Select",
      prop: "value / defaultValue",
      type: "string",
      defaultValue: "—",
      description:
        "Single-selection convenience props. They set React Aria's selectedKey and defaultSelectedKey, so they hold option ids, not displayed names.",
    },
    {
      component: "Select",
      prop: "onValueChange",
      type: "(value: string) => void",
      defaultValue: "—",
      description:
        "Called with the selected option id, or an empty string when the selection is cleared. A supplied React Aria onSelectionChange also runs.",
    },
  ],
  "agent-status": [
    {
      component: "AgentStatus",
      prop: "state",
      type: '"thinking" | "working" | "complete" | "error"',
      defaultValue: "required",
      description:
        "Current state. Thinking and working animate unless motion is reduced.",
    },
    {
      component: "AgentStatus",
      prop: "label",
      type: "string",
      defaultValue: "required",
      description:
        "Visible description of the current step, announced when it changes.",
    },
    {
      component: "AgentStatus",
      prop: "detail",
      type: "string",
      defaultValue: "—",
      description: "Optional visible detail under the step label.",
    },
  ],
  message: [
    {
      component: "Message",
      prop: "sender",
      type: "string",
      defaultValue: "required",
      description: "Author's name and default accessible label.",
    },
    {
      component: "Message",
      prop: "side",
      type: '"incoming" | "outgoing" | "system"',
      defaultValue: '"incoming"',
      description: "Aligns and styles the message.",
    },
    {
      component: "Message",
      prop: "avatar",
      type: "ReactNode",
      defaultValue: "—",
      description: "Shown beside incoming messages.",
    },
    {
      component: "Message",
      prop: "timestamp / dateTime",
      type: "string",
      defaultValue: "—",
      description: "Visible timestamp and its machine-readable value.",
    },
    {
      component: "Message",
      prop: "status",
      type: "string",
      defaultValue: "—",
      description: "Delivery status shown below the message.",
    },
    {
      component: "Message",
      prop: "actions",
      type: "ReactNode",
      defaultValue: "—",
      description: "Actions displayed below the message.",
    },
  ],
  "source-link": [
    {
      component: "SourceLink",
      prop: "label / source",
      type: "string / string",
      defaultValue: "required",
      description: "Visible title and source name for the destination.",
    },
    {
      component: "SourceLink",
      prop: "index / description",
      type: "number / string",
      defaultValue: "—",
      description: "Optional citation number and supporting text.",
    },
  ],
  "tool-call": [
    {
      component: "ToolCallTrigger",
      prop: "name",
      type: "string",
      defaultValue: "required",
      description: "Visible name of the tool that ran.",
    },
    {
      component: "ToolCallTrigger",
      prop: "status",
      type: '"running" | "complete" | "error"',
      defaultValue: "required",
      description:
        "Visible execution state. Running animates unless motion is reduced.",
    },
    {
      component: "ToolCallTrigger",
      prop: "summary",
      type: "string",
      defaultValue: "—",
      description: "Optional short description below the tool name.",
    },
  ],
  "inline-edit": [
    {
      component: "InlineEdit",
      prop: "label",
      type: "string",
      defaultValue: "required",
      description: "Visible label in display and edit modes.",
    },
    {
      component: "InlineEdit",
      prop: "value / defaultValue",
      type: "string",
      defaultValue: "undefined / empty",
      description:
        "Control the displayed value or set its initial local value.",
    },
    {
      component: "InlineEdit",
      prop: "onSave",
      type: "(value: string) => void | Promise<void>",
      defaultValue: "undefined",
      description:
        "Called on Save, not when the value is unchanged. A rejected promise keeps the draft open and shows its error; update value here when controlled.",
    },
    {
      component: "InlineEdit",
      prop: "isDisabled",
      type: "boolean",
      defaultValue: "false",
      description: "Prevents opening the editor.",
    },
  ],
  "password-strength-meter": [
    {
      component: "PasswordStrengthMeter",
      prop: "password",
      type: "string",
      defaultValue: "required",
      description:
        "The password to estimate. Counts length and character mix, not actual resistance to guessing; a unique password matters more than the score.",
    },
  ],
  "password-field": [
    {
      component: "PasswordField",
      prop: "label",
      type: "string",
      defaultValue: "required",
      description: "Visible label for the field.",
    },
    {
      component: "PasswordField",
      prop: "description / placeholder",
      type: "string",
      defaultValue: "—",
      description: "Help text and input placeholder.",
    },
    {
      component: "PasswordField",
      prop: "autoComplete",
      type: "string",
      defaultValue: '"current-password"',
      description: "Use new-password when creating a credential.",
    },
  ],
  "copy-button": [
    {
      component: "CopyButton",
      prop: "value",
      type: "string",
      defaultValue: "required",
      description: "The exact text written to the clipboard.",
    },
    {
      component: "CopyButton",
      prop: "children",
      type: "ReactNode | (status: CopyButtonStatus) => ReactNode",
      defaultValue: "Copy / Copied / Retry",
      description: "Custom content can render from the copy status.",
    },
  ],
  "button-group": [
    {
      component: "ButtonGroup",
      prop: "orientation",
      type: '"horizontal" | "vertical"',
      defaultValue: '"horizontal"',
      description: "Joins buttons in a row or column.",
    },
  ],
  "text-swap": [
    {
      component: "TextSwap",
      prop: "value",
      type: "string",
      defaultValue: "required",
      description:
        "The latest visible and accessible text; changes animate without an initial entrance.",
    },
  ],
  stepper: [
    {
      component: "Stepper",
      prop: "steps",
      type: "readonly { label: string; description?: string }[]",
      defaultValue: "required",
      description:
        "Steps in display order. Keep labels short; descriptions are optional.",
    },
    {
      component: "Stepper",
      prop: "currentStep",
      type: "number (zero-based)",
      defaultValue: "required",
      description: "Index of the current step; earlier steps show as complete.",
    },
  ],
  "animated-number": [
    {
      component: "AnimatedNumber",
      prop: "value",
      type: "number",
      defaultValue: "required",
      description:
        "Target value. The displayed number animates; accessible text uses the target immediately.",
    },
    {
      component: "AnimatedNumber",
      prop: "variant",
      type: '"count" | "slide"',
      defaultValue: '"count"',
      description:
        "Count toward the new value or slide only changed digits up on an increase and down on a decrease.",
    },
    {
      component: "AnimatedNumber",
      prop: "locale",
      type: "string",
      defaultValue: '"en-US"',
      description: "Locale for displayed and accessible numbers.",
    },
    {
      component: "AnimatedNumber",
      prop: "formatOptions",
      type: "Intl.NumberFormatOptions",
      defaultValue: "{ maximumFractionDigits: 0 }",
      description: "Formatting options for both number representations.",
    },
  ],
  "progress-ring": [
    {
      component: "ProgressRing",
      prop: "label",
      type: "string",
      defaultValue: "required",
      description: "Visible name for the React Aria progressbar.",
    },
    {
      component: "ProgressRing",
      prop: "size",
      type: '"sm" | "md" | "lg"',
      defaultValue: '"md"',
      description: "Diameter of the ring.",
    },
    {
      component: "ProgressRing",
      prop: "showValue",
      type: "boolean",
      defaultValue: "true",
      description: "Shows the value in the center of the ring.",
    },
  ],
  "presence-list": [
    {
      component: "PresenceList",
      prop: "items",
      type: "readonly T[]",
      defaultValue: "required",
      description: "Items to render in the list.",
    },
    {
      component: "PresenceList",
      prop: "getKey",
      type: "(item: T) => string | number",
      defaultValue: "required",
      description: "Stable unique key for each item and its exit animation.",
    },
    {
      component: "PresenceList",
      prop: "children",
      type: "(item: T) => ReactNode",
      defaultValue: "required",
      description:
        "Render each item's contents inside a list item. Move focus before removing a focused item.",
    },
  ],
  "input-group": [
    {
      component: "InputGroupAddon",
      prop: "align",
      type: '"inline" | "block-end"',
      defaultValue: '"inline"',
      description:
        "Place text, an icon, or a button beside the input, or in a full-width row below a textarea.",
    },
  ],
  "command-palette": [
    {
      component: "CommandPalette",
      prop: "isOpen",
      type: "boolean",
      defaultValue: "required",
      description: "Controls the dialog's visibility.",
    },
    {
      component: "CommandPalette",
      prop: "onOpenChange",
      type: "(open: boolean) => void",
      defaultValue: "required",
      description: "Receives requests to open or close the dialog.",
    },
    {
      component: "CommandPalette",
      prop: "shortcut",
      type: "boolean",
      defaultValue: "true",
      description:
        "Open with Ctrl+K or Command+K. Disable when another palette owns that shortcut.",
    },
    {
      component: "CommandPalette",
      prop: "title",
      type: "string",
      defaultValue: '"Commands"',
      description: "Accessible dialog name.",
    },
    {
      component: "CommandPalette",
      prop: "placeholder",
      type: "string",
      defaultValue: '"Search commands"',
      description: "Search input placeholder and label.",
    },
    {
      component: "CommandPalette",
      prop: "emptyMessage",
      type: "string",
      defaultValue: '"No matching commands."',
      description: "Text shown when search has no results.",
    },
  ],
  button: [
    {
      component: "Button",
      prop: "variant",
      type: '"default" | "secondary" | "outline" | "ghost" | "minimal" | "destructive"',
      defaultValue: '"default"',
      description:
        "Choose the action's visual priority. Minimal is for a quiet icon action.",
    },
    {
      component: "Button",
      prop: "size",
      type: '"default" | "sm" | "lg" | "icon"',
      defaultValue: '"default"',
      description:
        "Set the button's height and padding. Name icon-only buttons with aria-label.",
    },
    {
      component: "Button",
      prop: "static",
      type: "boolean",
      defaultValue: "false",
      description:
        "Disable press scaling while keeping the button interactive.",
    },
    {
      component: "Button",
      prop: "layout",
      type: 'MotionProps["layout"]',
      defaultValue: "—",
      description:
        "Animate position or size changes when the button moves in the layout. Ignored when reduced motion is requested.",
    },
  ],
  card: [
    {
      component: "CardTitle",
      prop: "as",
      type: '"h2" | "h3" | "h4"',
      defaultValue: '"h3"',
      description: "Heading level for the card title.",
    },
  ],
  avatar: [
    {
      component: "Avatar",
      prop: "name",
      type: "string",
      defaultValue: "required",
      description: "Accessible name and source of the fallback initials.",
    },
    {
      component: "Avatar",
      prop: "src",
      type: "string",
      defaultValue: "undefined",
      description: "Image URL; falls back to initials if missing or broken.",
    },
    {
      component: "Avatar",
      prop: "initials",
      type: "string",
      defaultValue: "derived from name",
      description: "Overrides the displayed initials.",
    },
  ],
  spinner: [
    {
      component: "Spinner",
      prop: "variant",
      type: '"orbit" | "ring" | "pulse" | "dots" | "bars" | "spark" | "segments"',
      defaultValue: '"orbit"',
      description: "Selects the indicator animation.",
    },
    {
      component: "Spinner",
      prop: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      defaultValue: '"md"',
      description: "Set the indicator size.",
    },
    {
      component: "Spinner",
      prop: "decorative",
      type: "boolean",
      defaultValue: "false",
      description:
        "Hide the indicator from assistive technology when adjacent text already reports progress.",
    },
  ],
  "rating-input": [
    {
      component: "RatingInput",
      prop: "label",
      type: "string",
      defaultValue: "required",
      description: "Visible label for the rating group.",
    },
    {
      component: "RatingInput",
      prop: "max",
      type: "number",
      defaultValue: "5",
      description: "Number of stars. Use a positive whole number.",
    },
    {
      component: "RatingInput",
      prop: "value / defaultValue",
      type: "number",
      defaultValue: "undefined / 0",
      description:
        "Selected rating; 0 means no rating. Use a number between 1 and max for a selection.",
    },
    {
      component: "RatingInput",
      prop: "onValueChange",
      type: "(value: number) => void",
      defaultValue: "undefined",
      description: "Called when a star is selected.",
    },
  ],
  "data-table": [
    {
      component: "DataTable",
      prop: "label",
      type: "string",
      defaultValue: "required",
      description: "Names the table and its search and pagination controls.",
    },
    {
      component: "DataTable",
      prop: "rows / columns",
      type: "readonly T[] / readonly DataTableColumn<T>[]",
      defaultValue: "required",
      description:
        "Client-side rows and column definitions. The first column labels each row.",
    },
    {
      component: "DataTableColumn",
      prop: "id / header / cell",
      type: "string / string / (row: T) => ReactNode",
      defaultValue: "required",
      description: "Stable column key, visible header, and cell renderer.",
    },
    {
      component: "DataTableColumn",
      prop: "sortValue",
      type: "(row: T) => string | number",
      defaultValue: "undefined",
      description:
        "Enables sorting for this column; return a comparable value. Column filters use this value too.",
    },
    {
      component: "DataTableColumn",
      prop: "align",
      type: '"start" | "end"',
      defaultValue: '"start"',
      description: "Aligns the header and cells; use end for numbers.",
    },
    {
      component: "DataTableColumn",
      prop: "filter",
      type: "{ type: 'text' } | { type: 'select'; options: SelectOption[] }",
      defaultValue: "undefined",
      description:
        "Adds a text or single-choice filter for a column with sortValue. Filters combine with search before sorting and pagination.",
    },
    {
      component: "DataTable",
      prop: "getRowId",
      type: "(row: T) => Key",
      defaultValue: "required",
      description: "Returns a unique, stable key for each row.",
    },
    {
      component: "DataTable",
      prop: "getSearchText",
      type: "(row: T) => string",
      defaultValue: "undefined",
      description:
        "Enables search across rows; return all text that should be searchable for each row.",
    },
    {
      component: "DataTable",
      prop: "pageSize / selectable",
      type: "number / boolean",
      defaultValue: "5 / true",
      description:
        "Rows per page and whether to show row-selection checkboxes. Select all affects the current page; filters do not clear selections.",
    },
    {
      component: "DataTable",
      prop: "selectedKeys / defaultSelectedKeys",
      type: "Iterable<Key>",
      defaultValue: "undefined / empty",
      description:
        "Control selected row keys or set their initial value. Selections persist across pages and filters.",
    },
    {
      component: "DataTable",
      prop: "onSelectionChange",
      type: "(keys: Set<Key>) => void",
      defaultValue: "undefined",
      description: "Receives selected row keys, including keys on other pages.",
    },
  ],
  pagination: [
    {
      component: "PaginationLink",
      prop: "isCurrent",
      type: "boolean",
      defaultValue: "false",
      description: "Marks the current page with aria-current=page.",
    },
    {
      component: "PaginationLink",
      prop: "isDisabled",
      type: "boolean",
      defaultValue: "false",
      description:
        "Keeps the link in place but removes navigation when unavailable.",
    },
  ],
  timeline: [
    {
      component: "TimelineItem",
      prop: "status",
      type: '"latest" | "complete"',
      defaultValue: '"complete"',
      description: "Marks the newest event separately from earlier events.",
    },
  ],
  accordion: [
    {
      component: "Accordion",
      prop: "variant",
      type: '"card" | "divided"',
      defaultValue: '"card"',
      description:
        "Show separate cards or a flat list with dividers between rows.",
    },
  ],
  alert: [
    {
      component: "Alert",
      prop: "title",
      type: "string",
      defaultValue: "undefined",
      description:
        "Renders an icon, heading, and children as the description when provided. Omit to compose the parts yourself.",
    },
    {
      component: "Alert",
      prop: "variant",
      type: '"info" | "success" | "warning" | "error" | "neutral"',
      defaultValue: '"info"',
      description: "Selects the alert color and icon.",
    },
    {
      component: "Alert",
      prop: "children",
      type: "ReactNode",
      defaultValue: "undefined",
      description:
        "Content of the alert; used as the description when title is set.",
    },
  ],
  dialog: [
    {
      component: "DialogContent",
      prop: "overlayProps",
      type: "ModalOverlayProps",
      defaultValue: "outside press enabled for ordinary dialogs",
      description:
        "Pass React Aria overlay options such as isDismissable and isKeyboardDismissDisabled. Alert dialogs always ignore outside press.",
    },
    {
      component: "DialogClose",
      prop: "children",
      type: "ReactNode",
      defaultValue: "close icon",
      description: "Replace the default icon with a labeled close action.",
    },
    {
      component: "DialogClose",
      prop: "variant / size",
      type: "ButtonProps",
      defaultValue: '"ghost" / "icon"',
      description: "Button appearance; labeled children use the default size.",
    },
  ],
  drawer: [
    {
      component: "DrawerContent",
      prop: "placement",
      type: '"bottom" | "top" | "left" | "right"',
      defaultValue: '"bottom"',
      description:
        "Choose the entry edge and drag direction. Only bottom drawers use snap points; top and side handles swipe toward their edge to dismiss.",
    },
    {
      component: "DrawerContent",
      prop: "snapPoints",
      type: "number[]",
      defaultValue: "[0.85]",
      description:
        "Bottom-only visible viewport fractions in (0, 1]. Invalid values are ignored. The first (smallest) valid point opens initially.",
    },
    {
      component: "DrawerContent",
      prop: "snapPoint / defaultSnapPoint",
      type: "number",
      defaultValue: "first snap point",
      description:
        "Bottom drawer height as a controlled or initial snap point.",
    },
    {
      component: "DrawerContent",
      prop: "onSnapPointChange",
      type: "(point: number) => void",
      defaultValue: "—",
      description: "Receives the new bottom drawer snap point.",
    },
    {
      component: "DrawerContent",
      prop: "overlayProps",
      type: "ModalOverlayProps",
      defaultValue: "isDismissable: true",
      description:
        "Configure outside-click and Escape dismissal. The backdrop dims and softly blurs the page, fading with the visible panel as it moves; reduced motion removes the blur and slide.",
    },
    {
      component: "DrawerClose",
      prop: "variant / size",
      type: "ButtonProps",
      defaultValue: '"ghost" / "icon" (without children)',
      description:
        "Uses the shared Button variants. Choose default for a primary action, outline for a secondary action, or ghost for dismissal.",
    },
  ],
  badge: [
    {
      component: "Badge",
      prop: "variant",
      type: '"neutral" | "accent" | "success" | "warning" | "error" | "outline"',
      defaultValue: '"neutral"',
      description: "Sets the badge color role.",
    },
    {
      component: "Badge",
      prop: "dot",
      type: "boolean",
      defaultValue: "false",
      description: "Adds a BadgeDot before the content.",
    },
  ],
  checkbox: [
    {
      component: "Checkbox",
      prop: "description",
      type: "string",
      defaultValue: "—",
      description:
        "Renders supporting text inside the label, below the control text.",
    },
    {
      component: "Checkbox",
      prop: "checked / defaultChecked",
      type: 'boolean | "indeterminate"',
      defaultValue: "—",
      description:
        'Boolean convenience for isSelected / defaultSelected. Use defaultChecked="indeterminate" for a mixed state.',
    },
    {
      component: "Checkbox",
      prop: "onCheckedChange",
      type: "(checked: boolean) => void",
      defaultValue: "—",
      description:
        "Receives the next checked value. React Aria's onChange stays available.",
    },
  ],
  switch: [
    {
      component: "Switch",
      prop: "description",
      type: "string",
      defaultValue: "—",
      description: "Renders supporting text beside the label.",
    },
    {
      component: "Switch",
      prop: "checked / defaultChecked",
      type: "boolean",
      defaultValue: "—",
      description: "Boolean convenience for isSelected / defaultSelected.",
    },
    {
      component: "Switch",
      prop: "onCheckedChange",
      type: "(checked: boolean) => void",
      defaultValue: "—",
      description: "Receives the next checked value.",
    },
  ],
  tabs: [
    {
      component: "Tabs",
      prop: "value / defaultValue",
      type: "string",
      defaultValue: "—",
      description:
        "Key-based convenience for selectedKey / defaultSelectedKey.",
    },
    {
      component: "Tabs",
      prop: "onValueChange",
      type: "(value: string) => void",
      defaultValue: "—",
      description:
        "Receives the selected tab key. React Aria's onSelectionChange stays available.",
    },
  ],
  "date-field": [
    {
      component: "DateField",
      prop: "label / description",
      type: "string / string",
      defaultValue: "—",
      description:
        "Renders the field label and supporting text. Keep a label or pass aria-label.",
    },
  ],
  "time-field": [
    {
      component: "TimeField",
      prop: "label / description",
      type: "string / string",
      defaultValue: "—",
      description:
        "Renders the field label and supporting text. Keep a label or pass aria-label.",
    },
  ],
  "date-picker": [
    {
      component: "DatePicker",
      prop: "label / description",
      type: "string / string",
      defaultValue: "—",
      description:
        "Renders the field label and supporting text around the date segments and calendar trigger.",
    },
  ],
  "date-range-picker": [
    {
      component: "DateRangePicker",
      prop: "label / description",
      type: "string / string",
      defaultValue: "—",
      description:
        "Renders the field label and supporting text around both date segments and the calendar trigger.",
    },
  ],
  "color-field": [
    {
      component: "ColorField",
      prop: "label / description",
      type: "string / string",
      defaultValue: "—",
      description:
        "Renders the field label and supporting text. Keep a label or pass aria-label.",
    },
  ],
  "color-picker": [
    {
      component: "ColorPicker",
      prop: "label",
      type: "string",
      defaultValue: '"Choose color"',
      description:
        "Names the trigger, area, hue slider, and hex field controls.",
    },
    {
      component: "ColorPicker",
      prop: "children",
      type: "ReactNode",
      defaultValue: "built-in layout",
      description:
        "Replace the default swatch, area, hue, and hex layout when you need a custom arrangement.",
    },
  ],
  "file-trigger": [
    {
      component: "FileTrigger",
      prop: "label",
      type: "string",
      defaultValue: '"Choose files"',
      description:
        "Text for the built-in outline Button. Pass children instead to supply your own trigger; keep an accessible name.",
    },
  ],
  meter: [
    {
      component: "Meter",
      prop: "label",
      type: "string",
      defaultValue: "—",
      description: "Renders a visible label above the meter.",
    },
  ],
  "progress-bar": [
    {
      component: "ProgressBar",
      prop: "label",
      type: "string",
      defaultValue: "—",
      description: "Visible label beside the bar.",
    },
  ],
  "number-field": [
    {
      component: "NumberField",
      prop: "label / description",
      type: "string / string",
      defaultValue: "—",
      description:
        "Renders the field label and supporting text around the input and stepper buttons.",
    },
  ],
  "search-field": [
    {
      component: "SearchField",
      prop: "label / description / placeholder",
      type: "string / string / string",
      defaultValue: "—",
      description:
        "Renders the field label, supporting text, and input placeholder. The clear button is built in.",
    },
  ],
  slider: [
    {
      component: "Slider",
      prop: "label",
      type: "string",
      defaultValue: "—",
      description: "Renders a visible label beside the track and value output.",
    },
  ],
  "text-field": [
    {
      component: "TextField",
      prop: "label / description / placeholder",
      type: "string / string / string",
      defaultValue: "—",
      description:
        "Convenience props for the single-line input's label, supporting text, and placeholder.",
    },
  ],
  "text-area": [
    {
      component: "TextArea",
      prop: "label / description / placeholder",
      type: "string / string / string",
      defaultValue: "—",
      description:
        "Convenience props for the multiline input's label, supporting text, and placeholder.",
    },
    {
      component: "TextArea",
      prop: "rows",
      type: "number",
      defaultValue: "4",
      description: "Sets the visible height of the textarea.",
    },
  ],
  "radio-group": [
    {
      component: "RadioGroup",
      prop: "label / description",
      type: "string / string",
      defaultValue: "—",
      description:
        "Renders the group label and supporting text. Keep a label or pass aria-label.",
    },
    {
      component: "RadioGroup",
      prop: "onValueChange",
      type: "(value: string) => void",
      defaultValue: "—",
      description:
        "Receives the selected value. React Aria's onChange also runs.",
    },
    {
      component: "Radio",
      prop: "label / description",
      type: "string",
      defaultValue: "—",
      description: "Text for the default radio layout.",
    },
    {
      component: "Radio",
      prop: "variant",
      type: '"default" | "card"',
      defaultValue: '"default"',
      description: "Selects the plain or card appearance.",
    },
  ],
  toast: [
    {
      component: "showToast",
      prop: "message",
      type: "ToastMessage",
      defaultValue: "required",
      description: "Title and optional description for the toast.",
    },
    {
      component: "showToast",
      prop: "options",
      type: "ToastOptions",
      defaultValue: "—",
      description:
        "Optional timeout and onClose callback. Timeouts under 5 seconds become 5000 ms; omit timeout for a persistent toast.",
    },
  ],
  "toggle-button": [
    {
      component: "ToggleButton",
      prop: "variant",
      type: '"default" | "segmented" | "ghost"',
      defaultValue: '"default"',
      description:
        "Chooses the button surface. segmented joins a group of options; the selected state stays visible in all three variants.",
    },
  ],
  "token-field": [
    {
      component: "TokenField",
      prop: "label / description / placeholder",
      type: "string / string / string",
      defaultValue: "—",
      description:
        "Convenience props for the token input's label, supporting text, and placeholder. Keep a label or supply aria-label.",
    },
  ],
};
