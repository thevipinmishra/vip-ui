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
      description:
        "The text to show. Screen readers read it once, as plain text.",
    },
    {
      component: "TextReveal",
      prop: "split",
      type: '"words" | "characters"',
      defaultValue: '"words"',
      description:
        "Reveal by word or by character. Use words for scripts that join letters, such as Arabic.",
    },
    {
      component: "TextReveal",
      prop: "trigger",
      type: '"mount" | "in-view"',
      defaultValue: '"in-view"',
      description:
        "Start on mount, or the first time the text comes into view.",
    },
    {
      component: "TextReveal",
      prop: "stagger",
      type: "number",
      defaultValue: "0.045",
      description:
        "Delay in seconds between units. Long text uses a shorter delay, so the last unit starts within 0.6 seconds of the first.",
    },
    {
      component: "TextReveal",
      prop: "delay",
      type: "number",
      defaultValue: "0",
      description: "Delay in seconds before the first unit starts.",
    },
  ],
  "text-scramble": [
    {
      component: "TextScramble",
      prop: "value",
      type: "string",
      defaultValue: "required",
      description:
        "The text to show. A change starts a scramble. The first value shows without a scramble. Screen readers get the final text at once.",
    },
    {
      component: "TextScramble",
      prop: "duration",
      type: "number",
      defaultValue: "0.7",
      description:
        "Time in seconds to resolve the text. Set 0 to change the text without a scramble.",
    },
    {
      component: "TextScramble",
      prop: "glyphs",
      type: "string",
      defaultValue: "A-Z and 0-9",
      description:
        "Characters that show during the scramble. The default monospace font keeps the width the same.",
    },
  ],
  presence: [
    {
      component: "Presence",
      prop: "show",
      type: "boolean",
      defaultValue: "required",
      description:
        "Shows or hides the content. The content is inert during its exit. Move focus before you hide focused content.",
    },
    {
      component: "Presence",
      prop: "as",
      type: '"div" | "span"',
      defaultValue: '"div"',
      description: "Outer element. A span is inline-block, so it can move.",
    },
    {
      component: "Presence",
      prop: "distance",
      type: "number",
      defaultValue: "8",
      description: "Travel in pixels for the entrance and the exit.",
    },
    {
      component: "Presence",
      prop: "duration",
      type: "number",
      defaultValue: "0.2",
      description: "Entrance time in seconds. The exit takes 70% of this time.",
    },
  ],
  "stagger-group": [
    {
      component: "StaggerGroup",
      prop: "as",
      type: '"div" | "ul" | "ol"',
      defaultValue: '"div"',
      description:
        "Use ul or ol with li StaggerItem children for a semantic list.",
    },
    {
      component: "StaggerGroup",
      prop: "trigger",
      type: '"mount" | "in-view"',
      defaultValue: '"in-view"',
      description:
        "Start the sequence on mount, or the first time the group comes into view.",
    },
    {
      component: "StaggerGroup",
      prop: "stagger",
      type: "number",
      defaultValue: "0.08",
      description:
        "Delay in seconds between StaggerItem children. A long group uses a shorter delay, so the last item starts within 0.6 seconds.",
    },
    {
      component: "StaggerItem",
      prop: "as",
      type: '"div" | "li"',
      defaultValue: '"div"',
      description: "Element that receives the group animation.",
    },
  ],
  "layout-morph": [
    {
      component: "LayoutMorph",
      prop: "contentKey",
      type: "string | number",
      defaultValue: "required",
      description:
        "Change it with the content to crossfade the content and animate the height. Other size changes, such as a window resize, do not animate.",
    },
  ],
  marquee: [
    {
      component: "Marquee",
      prop: "speed",
      type: "number",
      defaultValue: "50",
      description:
        "Movement in pixels per second. Hover, focus, and the built-in button pause it. Set 0 to stop it and wrap the items. Reduced motion does the same.",
    },
    {
      component: "Marquee",
      prop: "reverse",
      type: "boolean",
      defaultValue: "false",
      description:
        "Move the content toward the end edge instead of the start edge.",
    },
    {
      component: "Marquee",
      prop: "--marquee-gap",
      type: "CSS length",
      defaultValue: "1.5rem",
      description: "Space between items. Set it in className.",
    },
    {
      component: "Marquee",
      prop: "children",
      type: "ReactNode",
      defaultValue: "required",
      description:
        "Items to loop. Do not put IDs in them, because the copies repeat them. The copies are inert and hidden from assistive technology. A focused item moves into view.",
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
      description:
        "Receives the selected id in single-selection mode, or an empty string when the selection is cleared.",
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
      description: "Attachment items. Give each one a unique key.",
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
      description: "Image preview URL. Without it, the row shows a file icon.",
    },
    {
      component: "Attachment",
      prop: "status",
      type: '"ready" | "uploading" | "uploaded" | "error"',
      defaultValue: '"ready"',
      description: "Upload state. Your app sets it.",
    },
    {
      component: "Attachment",
      prop: "progress",
      type: "number",
      defaultValue: "—",
      description:
        "Upload percentage from 0 to 100. Without it, the progress bar is indeterminate.",
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
      description: "Marks the select invalid. A value for error does the same.",
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
        "Options for the default layout. Each option has an id, a name, and an optional description.",
    },
    {
      component: "Select",
      prop: "label / description",
      type: "string",
      defaultValue: "—",
      description:
        "Label and help text for the default layout. When you compose the parts, add SelectLabel or pass aria-label.",
    },
    {
      component: "Select",
      prop: "value / defaultValue",
      type: "string",
      defaultValue: "—",
      description:
        "The selected option id, not its name. Sets selectedKey and defaultSelectedKey.",
    },
    {
      component: "Select",
      prop: "onValueChange",
      type: "(value: string) => void",
      defaultValue: "—",
      description:
        "Receives the selected option id, or an empty string when the selection is cleared. onSelectionChange also runs.",
    },
    {
      component: "Select",
      prop: "placeholder",
      type: "string",
      defaultValue: '"Select an option"',
      description: "Text in the trigger when no option is selected.",
    },
  ],
  "agent-status": [
    {
      component: "AgentStatus",
      prop: "state",
      type: '"thinking" | "working" | "complete" | "error"',
      defaultValue: "required",
      description:
        "Sets the icon and the state text. Thinking and working animate unless reduced motion is on.",
    },
    {
      component: "AgentStatus",
      prop: "label",
      type: "string",
      defaultValue: "required",
      description: "The current step. Screen readers announce changes.",
    },
    {
      component: "AgentStatus",
      prop: "detail",
      type: "string",
      defaultValue: "—",
      description: "Text below the label.",
    },
  ],
  message: [
    {
      component: "Message",
      prop: "sender",
      type: "string",
      defaultValue: "required",
      description:
        'The sender name. The default accessible name is "Message from {sender}".',
    },
    {
      component: "Message",
      prop: "side",
      type: '"incoming" | "outgoing" | "system"',
      defaultValue: '"incoming"',
      description: "Sets the alignment and the style.",
    },
    {
      component: "Message",
      prop: "avatar",
      type: "ReactNode",
      defaultValue: "—",
      description: "Shows beside an incoming message.",
    },
    {
      component: "Message",
      prop: "timestamp",
      type: "string",
      defaultValue: "—",
      description: "The visible time.",
    },
    {
      component: "Message",
      prop: "dateTime",
      type: "string",
      defaultValue: "—",
      description:
        "The machine-readable time. Set it to render the timestamp in a time element.",
    },
    {
      component: "Message",
      prop: "status",
      type: "string",
      defaultValue: "—",
      description: 'The delivery status, for example "Sent".',
    },
    {
      component: "Message",
      prop: "actions",
      type: "ReactNode",
      defaultValue: "—",
      description: "Buttons below the message.",
    },
  ],
  "source-link": [
    {
      component: "SourceLink",
      prop: "href",
      type: "string",
      defaultValue: "required",
      description: "The URL of the source.",
    },
    {
      component: "SourceLink",
      prop: "label",
      type: "string",
      defaultValue: "required",
      description: "The title of the page.",
    },
    {
      component: "SourceLink",
      prop: "source",
      type: "string",
      defaultValue: "required",
      description: "The name of the site or document.",
    },
    {
      component: "SourceLink",
      prop: "index",
      type: "number",
      defaultValue: "—",
      description: "The citation number. Shows before the label.",
    },
    {
      component: "SourceLink",
      prop: "description",
      type: "string",
      defaultValue: "—",
      description: "Text below the source.",
    },
  ],
  "tool-call": [
    {
      component: "ToolCallTrigger",
      prop: "name",
      type: "string",
      defaultValue: "required",
      description: "The tool name.",
    },
    {
      component: "ToolCallTrigger",
      prop: "status",
      type: '"running" | "complete" | "error"',
      defaultValue: "required",
      description:
        "Sets the icon and the status text. Running animates unless reduced motion is on. Screen readers announce changes.",
    },
    {
      component: "ToolCallTrigger",
      prop: "summary",
      type: "string",
      defaultValue: "—",
      description: "Short text below the name.",
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
      defaultValue: '— / ""',
      description: "The saved value, controlled or uncontrolled.",
    },
    {
      component: "InlineEdit",
      prop: "onSave",
      type: "(value: string) => void | Promise<void>",
      defaultValue: "undefined",
      description:
        "Called when you save a changed value. If it throws, the editor stays open and shows the error message. When controlled, update value here.",
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
        "The password to rate. The score uses only length and the mix of letters and other characters. It does not measure how easy the password is to guess.",
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
      defaultValue: "icon and status text",
      description:
        'The button content. Pass a function to show content for each status. CopyButtonStatus is "idle", "copied", or "failed".',
    },
    {
      component: "CopyButton",
      prop: "aria-label",
      type: "string",
      defaultValue: 'idle text or "Copy"',
      description:
        "The accessible name. It does not change after a copy. A live region announces the result.",
    },
    {
      component: "CopyButton",
      prop: "variant",
      type: "ButtonVariant",
      defaultValue: '"outline"',
      description: "Uses the Button variants.",
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
        "The text to show. A change animates. The first value shows without animation. Where text cannot wrap, such as in a button, a long value truncates.",
    },
  ],
  stepper: [
    {
      component: "Stepper",
      prop: "steps",
      type: "readonly { label: string; description?: string }[]",
      defaultValue: "required",
      description:
        "Steps in display order. Keep labels short. If the steps do not fit, the list scrolls and keeps the current step in view.",
    },
    {
      component: "Stepper",
      prop: "currentStep",
      type: "number (zero-based)",
      defaultValue: "required",
      description:
        "Index of the current step. Earlier steps show as complete. Set it to steps.length to show all steps as complete.",
    },
  ],
  "animated-number": [
    {
      component: "AnimatedNumber",
      prop: "value",
      type: "number",
      defaultValue: "required",
      description:
        "The number to show. A change animates. Screen readers get the new value at once. A number wider than its container wraps.",
    },
    {
      component: "AnimatedNumber",
      prop: "variant",
      type: '"count" | "slide"',
      defaultValue: '"count"',
      description:
        "count counts to the new value. slide moves only the digits that change.",
    },
    {
      component: "AnimatedNumber",
      prop: "locale",
      type: "string",
      defaultValue: '"en-US"',
      description: "Locale for the number format.",
    },
    {
      component: "AnimatedNumber",
      prop: "formatOptions",
      type: "Intl.NumberFormatOptions",
      defaultValue: "{ maximumFractionDigits: 0 }",
      description:
        "Options for Intl.NumberFormat, such as a currency or a unit.",
    },
  ],
  "progress-ring": [
    {
      component: "ProgressRing",
      prop: "label",
      type: "string",
      defaultValue: "required",
      description: "Shows a visible label below the ring.",
    },
    {
      component: "ProgressRing",
      prop: "size",
      type: '"sm" | "md" | "lg"',
      defaultValue: '"md"',
      description: "Sets the diameter: 40, 64, or 96 pixels.",
    },
    {
      component: "ProgressRing",
      prop: "showValue",
      type: "boolean",
      defaultValue: "true",
      description:
        "Shows the value in the center of the ring. Keep valueLabel short so it fits.",
    },
  ],
  "presence-list": [
    {
      component: "PresenceList",
      prop: "items",
      type: "readonly T[]",
      defaultValue: "required",
      description: "Items to show in the list.",
    },
    {
      component: "PresenceList",
      prop: "getKey",
      type: "(item: T) => string | number",
      defaultValue: "required",
      description:
        "Returns a unique key for an item. Keep the key the same while the item is in the list.",
    },
    {
      component: "PresenceList",
      prop: "children",
      type: "(item: T) => ReactNode",
      defaultValue: "required",
      description:
        "Renders the content of each list item. Move focus before you remove a focused item.",
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
        "Ctrl+K or Command+K opens and closes the palette. Disable it when another palette owns that shortcut.",
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
    {
      component: "CommandPaletteSection",
      prop: "title",
      type: "string",
      defaultValue: "required",
      description:
        "Heading for a group of items. A section with no matching items is hidden.",
    },
    {
      component: "CommandPaletteItem",
      prop: "textValue",
      type: "string",
      defaultValue: "text children",
      description:
        "Text that search matches. Set it when the item has an icon or other elements.",
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
        "Heights are 36px for sm, 44px for default, and 48px for lg. icon is a 44px square. Give icon buttons an aria-label.",
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
      type: '"h1" | "h2" | "h3" | "h4"',
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
      description: "Accessible name. Avatar takes the initials from it.",
    },
    {
      component: "Avatar",
      prop: "src",
      type: "string",
      defaultValue: "undefined",
      description:
        "Image URL. Avatar shows initials if the image is missing or does not load.",
    },
    {
      component: "Avatar",
      prop: "initials",
      type: "string",
      defaultValue: "derived from name",
      description:
        'Replaces the initials from name. Set "" to show a person icon.',
    },
    {
      component: "Avatar",
      prop: "size",
      type: '"sm" | "md" | "lg"',
      defaultValue: '"md"',
      description: "Diameter of the avatar. The initials scale with it.",
    },
  ],
  "empty-state": [
    {
      component: "EmptyStateTitle",
      prop: "as",
      type: '"h2" | "h3" | "h4"',
      defaultValue: '"h3"',
      description: "Heading level for the empty state title.",
    },
  ],
  spinner: [
    {
      component: "Spinner",
      prop: "variant",
      type: '"ring" | "dots" | "segments"',
      defaultValue: '"ring"',
      description: "Sets the animation style.",
    },
    {
      component: "Spinner",
      prop: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      defaultValue: '"md"',
      description: "Sets the size: 14, 16, 24, 40, or 56 pixels.",
    },
    {
      component: "Spinner",
      prop: "decorative",
      type: "boolean",
      defaultValue: "false",
      description:
        "Hides the spinner from screen readers. Use it when text next to the spinner names the wait.",
    },
    {
      component: "Spinner",
      prop: "aria-label",
      type: "string",
      defaultValue: '"Loading"',
      description: "Names the wait for screen readers.",
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
  tree: [
    {
      component: "TreeItem",
      prop: "title",
      type: "string",
      defaultValue: "required",
      description: "The row label. Typeahead uses it unless you set textValue.",
    },
    {
      component: "TreeItem",
      prop: "content",
      type: "ReactNode",
      defaultValue: "title",
      description:
        "Replaces the visible label. Use it to add details, such as a file size.",
    },
    {
      component: "TreeItem",
      prop: "icon",
      type: "ReactNode",
      defaultValue: "folder or file icon",
      description:
        "Replaces the default icon. A row with child items shows a folder. Other rows show a file.",
    },
    {
      component: "TreeItem",
      prop: "children",
      type: "ReactNode",
      defaultValue: "undefined",
      description:
        "Nested TreeItem elements. A row with children shows an expand button.",
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
        "Turns on sorting for the column. Return a string or a number. Column filters use this value too.",
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
        "Shows a search field. Return all the text that search can find in a row.",
    },
    {
      component: "DataTable",
      prop: "pageSize / selectable",
      type: "number / boolean",
      defaultValue: "5 / true",
      description:
        "Rows on each page, and whether rows show selection checkboxes. Select all selects only the rows on the current page.",
    },
    {
      component: "DataTable",
      prop: "selectedKeys / defaultSelectedKeys",
      type: "Iterable<Key>",
      defaultValue: "undefined / empty",
      description:
        "The selected row keys, controlled or initial. The selection stays when the page, search, or filters change.",
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
      component: "Pagination",
      prop: "aria-label",
      type: "string",
      defaultValue: '"Pagination"',
      description:
        "Names the navigation landmark. Change it when a page has more than one pagination.",
    },
    {
      component: "PaginationLink",
      prop: "isCurrent",
      type: "boolean",
      defaultValue: "false",
      description:
        'Shows the link as the current page and sets aria-current="page".',
    },
    {
      component: "PaginationLink",
      prop: "isDisabled",
      type: "boolean",
      defaultValue: "false",
      description:
        "Keeps the link visible but stops navigation. The link leaves the Tab order.",
    },
  ],
  timeline: [
    {
      component: "TimelineItem",
      prop: "status",
      type: '"latest" | "complete"',
      defaultValue: '"complete"',
      description:
        'Marks the newest event. Screen readers announce "Latest" before it.',
    },
    {
      component: "TimelineTitle",
      prop: "as",
      type: '"h2" | "h3" | "h4"',
      defaultValue: '"h3"',
      description: "Heading level for the event title.",
    },
  ],
  accordion: [
    {
      component: "Accordion",
      prop: "variant",
      type: '"card" | "divided"',
      defaultValue: '"card"',
      description: "Shows sections as separate cards, or as rows with lines.",
    },
    {
      component: "AccordionItem",
      prop: "title",
      type: "string",
      defaultValue: "undefined",
      description:
        "Renders an AccordionTrigger with this text. The children go into an AccordionContent.",
    },
  ],
  alert: [
    {
      component: "Alert",
      prop: "title",
      type: "string",
      defaultValue: "undefined",
      description:
        "Shows the variant icon and a heading, with children as the description. Leave it out to build the alert from its parts.",
    },
    {
      component: "Alert",
      prop: "variant",
      type: '"info" | "success" | "warning" | "error" | "neutral"',
      defaultValue: '"info"',
      description: "Sets the colors and the icon.",
    },
    {
      component: "Alert",
      prop: "children",
      type: "ReactNode",
      defaultValue: "undefined",
      description:
        "The alert content. When title is set, children become the description.",
    },
    {
      component: "Alert",
      prop: "role",
      type: '"status" | "alert"',
      defaultValue: "—",
      description:
        'Screen readers do not announce an alert by default. For a message that appears after an action, set "status". For an urgent error, set "alert".',
    },
  ],
  dialog: [
    {
      component: "DialogContent",
      prop: "overlayProps",
      type: "ModalOverlayProps",
      defaultValue: "{ isDismissable: true }",
      description:
        'React Aria ModalOverlay props, such as isDismissable and isKeyboardDismissDisabled. With role="alertdialog", outside clicks never close the dialog.',
    },
    {
      component: "DialogContent",
      prop: "modalProps",
      type: "ModalProps",
      defaultValue: "—",
      description:
        "Props for the panel. To change the width, set className here, for example sm:max-w-lg.",
    },
    {
      component: "DialogClose",
      prop: "children",
      type: "ReactNode",
      defaultValue: "close icon",
      description:
        'Text for the button. Without children, it shows an X icon labeled "Close dialog".',
    },
    {
      component: "DialogClose",
      prop: "variant / size",
      type: "ButtonProps",
      defaultValue: '"ghost" / "icon" (without children)',
      description:
        "Button variant and size. With children, the size is default.",
    },
  ],
  popover: [
    {
      component: "Popover",
      prop: "className",
      type: "string | ((values) => string)",
      defaultValue: "—",
      description:
        "Set a width here, for example w-72. Without a width, the panel grows with its content, up to the viewport width minus 2rem. Use w-(--trigger-width) to match the trigger.",
    },
    {
      component: "Popover",
      prop: "placement",
      type: "Placement",
      defaultValue: '"bottom"',
      description:
        "The side of the trigger, optionally followed by an alignment, for example bottom start. start and end follow the reading direction. If there is not sufficient space, the panel moves to the opposite side.",
    },
    {
      component: "Popover",
      prop: "offset / crossOffset",
      type: "number",
      defaultValue: "8 / 0",
      description:
        "The distance from the trigger, and the shift along the trigger's edge, in pixels.",
    },
    {
      component: "Popover",
      prop: "maxHeight",
      type: "number",
      defaultValue: "—",
      description:
        "Caps the panel height. The panel always fits the viewport and scrolls when its content is taller. A panel with PopoverArrow does not scroll.",
    },
    {
      component: "Popover",
      prop: "triggerRef",
      type: "RefObject<Element | null>",
      defaultValue: "—",
      description:
        "Anchors the panel to a different element than the trigger. Required with isOpen when you use Popover without PopoverTrigger.",
    },
    {
      component: "Popover",
      prop: "data-placement / data-trigger",
      type: "attributes",
      defaultValue: "—",
      description:
        "Set on the panel. data-placement is the side it opened on. data-trigger names the component that opened it, for example DialogTrigger or PreviewTrigger. The panel scales from --trigger-anchor-point.",
    },
    {
      component: "PopoverTrigger",
      prop: "isOpen / onOpenChange",
      type: "boolean / (isOpen: boolean) => void",
      defaultValue: "—",
      description:
        "Controls the open state. Without them, the trigger manages it. The first child opens the popover.",
    },
    {
      component: "PopoverDialog",
      prop: "children",
      type: "ReactNode | ({ close }) => ReactNode",
      defaultValue: "—",
      description:
        'Moves focus into the panel and keeps it there. Name it with PopoverTitle or aria-label. Use the function form to close after an action. A Button with slot="close" inside it closes the popover.',
    },
  ],
  sheet: [
    {
      component: "Sheet",
      prop: "position",
      type: '"bottom" | "top" | "left" | "right" | "start" | "end" | "center"',
      defaultValue: '"bottom"',
      description:
        "The edge the sheet comes from. start and end mirror in right-to-left locales. A bottom sheet is 85% of the viewport height. Set a different height with className.",
    },
    {
      component: "Sheet",
      prop: "swipeDirection",
      type: '"bottom" | "top" | "left" | "right" | "start" | "end" | "vertical" | "horizontal"',
      defaultValue: "same as position",
      description:
        "The direction of a swipe or handle drag that closes the sheet. vertical and horizontal close toward either edge.",
    },
    {
      component: "Sheet",
      prop: "snapPoints",
      type: "Array<number | string>",
      defaultValue: "—",
      description:
        "The visible size at each stop. Numbers are pixels. Strings are CSS lengths, and percentages are relative to the sheet. The sheet opens at the first stop. You can always drag it to full size. Below full size, a swipe on SheetBody resizes the sheet.",
    },
    {
      component: "Sheet",
      prop: "preventDismissal",
      type: "boolean",
      defaultValue: "false",
      description:
        "Stops swipes, Escape, and outside clicks from closing the sheet. Snap points still work.",
    },
    {
      component: "Sheet",
      prop: "--sheet-stack-scale / --sheet-stack-x / --sheet-stack-y",
      type: "CSS custom properties",
      defaultValue:
        "0.94 (0.96 on sides) / ±0.75rem on sides / ±0.5rem on top and bottom",
      description:
        "How a sheet moves back while a nested sheet is open. Set them in className. To keep the sheet in place, set the scale to 1 and the offsets to 0.",
    },
    {
      component: "SheetTrigger",
      prop: "isOpen / defaultOpen / onOpenChange",
      type: "boolean / (isOpen: boolean) => void",
      defaultValue: "uncontrolled",
      description: "Owns the open state. The Button inside it opens the sheet.",
    },
    {
      component: "SheetClose",
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
      description: "Sets the colors.",
    },
    {
      component: "Badge",
      prop: "dot",
      type: "boolean",
      defaultValue: "false",
      description: "Shows a BadgeDot before the label.",
    },
    {
      component: "Badge",
      prop: "children",
      type: "ReactNode",
      defaultValue: "—",
      description:
        "The badge content. Text stays on one line and truncates if space is short.",
    },
  ],
  checkbox: [
    {
      component: "Checkbox",
      prop: "children",
      type: "ReactNode",
      defaultValue: "—",
      description:
        "The label. Without it, pass aria-label so the checkbox has a name.",
    },
    {
      component: "Checkbox",
      prop: "description",
      type: "ReactNode",
      defaultValue: "—",
      description:
        "Help text below the label. Linked with aria-describedby, so it is not part of the name.",
    },
    {
      component: "Checkbox",
      prop: "errorMessage",
      type: "string | ((validation: ValidationResult) => string)",
      defaultValue: "browser message",
      description:
        "Shown below the label when isRequired, validate, or isInvalid makes the checkbox invalid.",
    },
    {
      component: "Checkbox",
      prop: "checked / defaultChecked",
      type: 'boolean | "indeterminate"',
      defaultValue: "—",
      description:
        'Aliases for isSelected and defaultSelected. "indeterminate" sets isIndeterminate. A default indeterminate state clears on the first change.',
    },
    {
      component: "Checkbox",
      prop: "onCheckedChange",
      type: "(checked: boolean) => void",
      defaultValue: "—",
      description: "Alias for onChange. Both run when both are set.",
    },
  ],
  "checkbox-group": [
    {
      component: "CheckboxGroup",
      prop: "label / description",
      type: "ReactNode",
      defaultValue: "—",
      description:
        "Label and help text for the group. Without label, pass aria-label or compose CheckboxGroupLabel.",
    },
    {
      component: "CheckboxGroup",
      prop: "errorMessage",
      type: "string | ((validation: ValidationResult) => string)",
      defaultValue: "browser message",
      description:
        "Shown below the options when the group is invalid. With label, description, or errorMessage, the group adds CheckboxGroupError for you.",
    },
  ],
  autocomplete: [
    {
      component: "Autocomplete",
      prop: "filter",
      type: "(textValue: string, inputValue: string) => boolean",
      defaultValue: "contains",
      description:
        "Decides which items match the input. The default ignores case and accents.",
    },
  ],
  switch: [
    {
      component: "Switch",
      prop: "children",
      type: "ReactNode",
      defaultValue: "—",
      description:
        "The label. Without it, pass aria-label so the switch has a name.",
    },
    {
      component: "Switch",
      prop: "description",
      type: "ReactNode",
      defaultValue: "—",
      description:
        "Help text below the label. Linked with aria-describedby, so it is not part of the name.",
    },
    {
      component: "Switch",
      prop: "errorMessage",
      type: "string | ((validation: ValidationResult) => string)",
      defaultValue: "browser message",
      description:
        "Shown below the label when isRequired, validate, or isInvalid makes the switch invalid.",
    },
    {
      component: "Switch",
      prop: "checked / defaultChecked",
      type: "boolean",
      defaultValue: "—",
      description: "Aliases for isSelected and defaultSelected.",
    },
    {
      component: "Switch",
      prop: "onCheckedChange",
      type: "(checked: boolean) => void",
      defaultValue: "—",
      description: "Alias for onChange. Both run when both are set.",
    },
  ],
  tabs: [
    {
      component: "Tabs",
      prop: "value / defaultValue",
      type: "string",
      defaultValue: "—",
      description:
        "The value of the selected tab. Same as selectedKey and defaultSelectedKey.",
    },
    {
      component: "Tabs",
      prop: "onValueChange",
      type: "(value: string) => void",
      defaultValue: "—",
      description:
        "Gets the value of the selected tab as a string. onSelectionChange also works.",
    },
    {
      component: "TabsTrigger",
      prop: "value",
      type: "string",
      defaultValue: "—",
      description: "Connects the tab to the TabsContent with the same value.",
    },
    {
      component: "TabsContent",
      prop: "value",
      type: "string",
      defaultValue: "—",
      description: "Connects the panel to the TabsTrigger with the same value.",
    },
  ],
  "date-field": [
    {
      component: "DateField",
      prop: "label / description",
      type: "string / string",
      defaultValue: "—",
      description:
        "Label above the field and help text below it. Without a label, pass aria-label.",
    },
  ],
  "time-field": [
    {
      component: "TimeField",
      prop: "label / description",
      type: "string / string",
      defaultValue: "—",
      description:
        "Label above the field and help text below it. Without a label, pass aria-label.",
    },
  ],
  "date-picker": [
    {
      component: "DatePicker",
      prop: "label / description",
      type: "string / string",
      defaultValue: "—",
      description:
        "Label above the field and help text below it. Without a label, pass aria-label.",
    },
  ],
  "date-range-picker": [
    {
      component: "DateRangePicker",
      prop: "label / description",
      type: "string / string",
      defaultValue: "—",
      description:
        "Label above the field and help text below it. Without a label, pass aria-label.",
    },
  ],
  "color-field": [
    {
      component: "ColorField",
      prop: "label / description",
      type: "string / string",
      defaultValue: "—",
      description:
        "Label above the field and help text below it. Without a label, pass aria-label.",
    },
  ],
  "color-picker": [
    {
      component: "ColorPicker",
      prop: "label",
      type: "string",
      defaultValue: '"Choose color"',
      description:
        "Text on the trigger. The popover uses it in its accessible name.",
    },
    {
      component: "ColorPicker",
      prop: "children",
      type: "ReactNode",
      defaultValue: "built-in layout",
      description: "Replaces the default trigger and popover.",
    },
  ],
  "file-trigger": [
    {
      component: "FileTrigger",
      prop: "label",
      type: "string",
      defaultValue: '"Choose files"',
      description:
        "Text for the default outline button. To use a different trigger, pass it as children.",
    },
  ],
  meter: [
    {
      component: "Meter",
      prop: "label",
      type: "string",
      defaultValue: "—",
      description:
        "Shows a visible label above the meter. Without label, pass aria-label.",
    },
  ],
  "progress-bar": [
    {
      component: "ProgressBar",
      prop: "label",
      type: "string",
      defaultValue: "—",
      description:
        "Shows a visible label above the bar. Without label, pass aria-label.",
    },
  ],
  "number-field": [
    {
      component: "NumberField",
      prop: "label / description",
      type: "string / string",
      defaultValue: "—",
      description: "Label above the field and help text below it.",
    },
  ],
  "search-field": [
    {
      component: "SearchField",
      prop: "label / description / placeholder",
      type: "string / string / string",
      defaultValue: "—",
      description:
        "Label, help text, and placeholder for the default layout. The clear button shows when the field has a value.",
    },
  ],
  slider: [
    {
      component: "Slider",
      prop: "label",
      type: "string",
      defaultValue: "—",
      description: "Label above the track, next to the value.",
    },
  ],
  "text-field": [
    {
      component: "TextField",
      prop: "label / description / placeholder",
      type: "string / string / string",
      defaultValue: "—",
      description: "Label, help text, and placeholder for the default layout.",
    },
  ],
  "text-area": [
    {
      component: "TextArea",
      prop: "label / description / placeholder",
      type: "string / string / string",
      defaultValue: "—",
      description: "Label, help text, and placeholder for the default layout.",
    },
    {
      component: "TextArea",
      prop: "rows",
      type: "number",
      defaultValue: "4",
      description: "Number of visible text lines.",
    },
  ],
  "radio-group": [
    {
      component: "RadioGroup",
      prop: "label / description",
      type: "ReactNode",
      defaultValue: "—",
      description:
        "Label and help text for the group. Without label, pass aria-label or compose RadioGroupLabel.",
    },
    {
      component: "RadioGroup",
      prop: "errorMessage",
      type: "string | ((validation: ValidationResult) => string)",
      defaultValue: "browser message",
      description:
        "Shown below the options when the group is invalid. With label, description, or errorMessage, the group adds RadioGroupError for you.",
    },
    {
      component: "RadioGroup",
      prop: "onValueChange",
      type: "(value: string) => void",
      defaultValue: "—",
      description: "Alias for onChange. Both run when both are set.",
    },
    {
      component: "Radio",
      prop: "children",
      type: "ReactNode",
      defaultValue: "—",
      description:
        "The label. Without it, pass aria-label so the option has a name.",
    },
    {
      component: "Radio",
      prop: "description",
      type: "ReactNode",
      defaultValue: "—",
      description:
        "Help text below the label. Linked with aria-describedby, so it is not part of the name.",
    },
    {
      component: "Radio / RadioField",
      prop: "variant",
      type: '"default" | "card"',
      defaultValue: '"default"',
      description:
        "Selects the plain or card appearance. A card selects the option from anywhere inside it.",
    },
  ],
  toast: [
    {
      component: "showToast",
      prop: "message",
      type: "ToastMessage",
      defaultValue: "required",
      description:
        'Title, optional description, and variant: "info", "success", "warning", or "error".',
    },
    {
      component: "showToast",
      prop: "options.timeout",
      type: "number",
      defaultValue: "5000",
      description:
        "Milliseconds before the toast closes. Values under 5000 become 5000. Set 0 to keep the toast open until the user closes it. Hover and focus pause the timer.",
    },
    {
      component: "showToast",
      prop: "options.onClose",
      type: "() => void",
      defaultValue: "—",
      description: "Runs after the toast closes.",
    },
    {
      component: "toastQueue",
      prop: "close",
      type: "(key: string) => void",
      defaultValue: "—",
      description: "Closes the toast with the key that showToast returns.",
    },
  ],
  tooltip: [
    {
      component: "TooltipTrigger",
      prop: "delay",
      type: "number",
      defaultValue: "400",
      description:
        "Milliseconds of hover before the tooltip opens. Keyboard focus opens it at once.",
    },
    {
      component: "TooltipContent",
      prop: "placement",
      type: "Placement",
      defaultValue: '"top"',
      description:
        "The side of the trigger. If there is not sufficient space, the tooltip moves to the opposite side.",
    },
    {
      component: "TooltipContent",
      prop: "offset",
      type: "number",
      defaultValue: "8",
      description: "Distance from the trigger in pixels.",
    },
  ],
  "toggle-button": [
    {
      component: "ToggleButton",
      prop: "variant",
      type: '"default" | "segmented" | "ghost"',
      defaultValue: '"default"',
      description:
        "Sets the surface. Use segmented inside a ToggleButtonGroup. All variants show the selected state.",
    },
  ],
  "token-field": [
    {
      component: "TokenField",
      prop: "label / description / placeholder",
      type: "string / string / string",
      defaultValue: "—",
      description:
        "Label, help text, and placeholder for the default layout. Without label, pass aria-label.",
    },
  ],
};
