export interface ComponentExampleMetadata {
  title: string;
  description?: string;
  sourcePath: string;
  uses?: readonly string[];
}

import { componentDescription } from "./catalog";

export interface ComponentPageData {
  usage: string;
  description: string;
  examples: readonly ComponentExampleMetadata[];
}

type ComponentPageSource = Omit<ComponentPageData, "description">;

const pageSources = {
  button: {
    usage: "button-basic-demo.tsx",
    examples: [
      {
        title: "Variants",
        sourcePath: "button-variants-demo.tsx",
      },
      {
        title: "Sizes",
        description:
          "Use xs in table rows, sm in toolbars, md for most actions, and xl for a main call to action.",
        sourcePath: "button-sizes-demo.tsx",
      },
      {
        title: "With icon",
        description:
          "Set aria-hidden on the icon so the label stays the accessible name.",
        sourcePath: "button-with-icon-demo.tsx",
      },
      {
        title: "Icon buttons",
        description: "Set iconOnly and give each button an aria-label.",
        sourcePath: "button-icon-demo.tsx",
      },
      {
        title: "Loading",
        description:
          "Set isPending while a task runs. The button keeps focus and ignores presses.",
        sourcePath: "button-loading-demo.tsx",
        uses: ["spinner"],
      },
      {
        title: "Link",
        description:
          "To use your router, pass its link component to the as prop.",
        sourcePath: "button-link-demo.tsx",
        uses: ["button-link"],
      },
    ],
  },
  select: {
    usage: "select-demo.tsx",
    examples: [
      {
        title: "Described options",
        description:
          "Set textValue to the option name, so the trigger shows only the name.",
        sourcePath: "select-descriptions-demo.tsx",
      },
      {
        title: "Disabled",
        sourcePath: "select-disabled-demo.tsx",
      },
      {
        title: "Sections",
        sourcePath: "select-sections-demo.tsx",
      },
      {
        title: "Invalid selection",
        description: "Set isInvalid while the controlled value is empty.",
        sourcePath: "select-invalid-demo.tsx",
      },
      {
        title: "Sizes",
        description:
          "The list keeps one row height, so options stay easy to touch.",
        sourcePath: "select-sizes-demo.tsx",
      },
    ],
  },
  dialog: {
    usage: "dialog-demo.tsx",
    examples: [
      {
        title: "Sizes",
        sourcePath: "dialog-sizes-demo.tsx",
      },
      {
        title: "Alert dialog",
        description:
          'Set role="alertdialog" on DialogContent. An outside click nudges the dialog and does not close it.',
        sourcePath: "dialog-alert-demo.tsx",
      },
      {
        title: "Form",
        description:
          "Put the form around DialogBody and DialogFooter, and call close after submit.",
        sourcePath: "dialog-form-demo.tsx",
        uses: ["form", "text-field", "text-area"],
      },
      {
        title: "Scrollable content",
        description:
          "Only DialogBody scrolls. The header and footer stay in view.",
        sourcePath: "dialog-scrollable-demo.tsx",
      },
      {
        title: "Controlled open state",
        description: "Escape and outside clicks also call onOpenChange.",
        sourcePath: "dialog-controlled-demo.tsx",
      },
    ],
  },
  accordion: {
    usage: "accordion-demo.tsx",
    examples: [
      {
        title: "Divided",
        description:
          'Use variant="divided" inside a container that already has a surface.',
        sourcePath: "accordion-billing-demo.tsx",
      },
      {
        title: "Multiple open sections",
        description:
          "Set allowsMultipleExpanded to keep more than one section open.",
        sourcePath: "accordion-multiple-demo.tsx",
      },
      {
        title: "Disabled section",
        sourcePath: "accordion-disabled-demo.tsx",
      },
    ],
  },
  alert: {
    usage: "alert-basic-demo.tsx",
    examples: [
      {
        title: "Variants",
        sourcePath: "alert-demo.tsx",
      },
      {
        title: "Action",
        description: "The action moves below the text in a narrow alert.",
        sourcePath: "alert-action-demo.tsx",
        uses: ["button-link"],
      },
      {
        title: "Dismiss",
        description:
          "Move focus to a nearby control before the alert leaves, so focus is not lost.",
        sourcePath: "alert-dismiss-demo.tsx",
        uses: ["presence"],
      },
    ],
  },
  "animated-number": {
    usage: "animated-number-basic-demo.tsx",
    examples: [
      {
        title: "Digit slide",
        description: 'Set variant="slide" to move only the digits that change.',
        sourcePath: "animated-number-slide-demo.tsx",
      },
      {
        title: "Number format",
        description:
          "Set locale and formatOptions. Screen readers hear the same format.",
        sourcePath: "animated-number-format-demo.tsx",
      },
    ],
  },
  attachment: {
    usage: "attachment-basic-demo.tsx",
    examples: [
      {
        title: "Adding and removing files",
        description: "Check the type and size of each file before you add it.",
        sourcePath: "attachment-demo.tsx",
        uses: ["drop-zone", "file-trigger"],
      },
      {
        title: "Upload states",
        sourcePath: "attachment-upload-demo.tsx",
      },
    ],
  },
  autocomplete: {
    usage: "autocomplete-demo.tsx",
    examples: [],
  },
  avatar: {
    usage: "avatar-basic-demo.tsx",
    examples: [
      {
        title: "Sizes",
        sourcePath: "avatar-sizes-demo.tsx",
      },
      {
        title: "Fallback",
        description:
          'Initials show until the image loads, and if it fails. Set initials="" to show a person icon.',
        sourcePath: "avatar-fallback-demo.tsx",
      },
      {
        title: "Group",
        description:
          "Give AvatarGroup an aria-label. Show the people not shown as a count, such as +2.",
        sourcePath: "avatar-demo.tsx",
      },
    ],
  },
  badge: {
    usage: "badge-basic-demo.tsx",
    examples: [
      {
        title: "Variants",
        sourcePath: "badge-variants-demo.tsx",
      },
      {
        title: "Dot",
        description:
          "Screen readers skip the dot, so the label must name the status.",
        sourcePath: "badge-demo.tsx",
      },
    ],
  },
  breadcrumbs: {
    usage: "breadcrumbs-demo.tsx",
    examples: [],
  },
  "button-group": {
    usage: "button-group-basic-demo.tsx",
    examples: [
      {
        title: "Orientations",
        sourcePath: "button-group-orientations-demo.tsx",
      },
      {
        title: "Split button",
        description: "Give the icon button an aria-label.",
        sourcePath: "button-group-demo.tsx",
        uses: ["menu"],
      },
      {
        title: "Sizes",
        description: "Set size on the group, not on each button.",
        sourcePath: "button-group-sizes-demo.tsx",
      },
    ],
  },
  calendar: {
    usage: "calendar-demo.tsx",
    examples: [
      {
        title: "Unavailable dates",
        description:
          "Set isDateUnavailable, minValue, and maxValue to limit the choices.",
        sourcePath: "calendar-unavailable-demo.tsx",
      },
      {
        title: "Controlled value",
        sourcePath: "calendar-controlled-demo.tsx",
      },
    ],
  },
  card: {
    usage: "card-basic-demo.tsx",
    examples: [
      {
        title: "Action",
        description:
          "CardAction sits beside the title and uses up to half the header width.",
        sourcePath: "card-action-demo.tsx",
      },
      {
        title: "Form",
        description:
          "Wrap the content and footer in a Form so the footer button submits.",
        sourcePath: "card-demo.tsx",
        uses: ["form", "text-field"],
      },
    ],
  },
  checkbox: {
    usage: "checkbox-basic-demo.tsx",
    examples: [
      {
        title: "Description",
        sourcePath: "checkbox-description-demo.tsx",
      },
      {
        title: "Required",
        description: "The error shows after the first submit.",
        sourcePath: "checkbox-required-demo.tsx",
        uses: ["form", "button"],
      },
      {
        title: "Indeterminate",
        description: "Point aria-controls at the child options.",
        sourcePath: "checkbox-demo.tsx",
      },
      {
        title: "Card",
        description: "The whole card toggles the checkbox.",
        sourcePath: "checkbox-card-demo.tsx",
      },
      {
        title: "Disabled",
        sourcePath: "checkbox-disabled-demo.tsx",
      },
    ],
  },
  "checkbox-group": {
    usage: "checkbox-group-demo.tsx",
    examples: [
      {
        title: "Horizontal",
        sourcePath: "checkbox-group-horizontal-demo.tsx",
      },
      {
        title: "Card grid",
        description:
          "Put CheckboxGroupItems between the label and the error to lay out the options.",
        sourcePath: "checkbox-group-layout-demo.tsx",
      },
      {
        title: "Disabled",
        sourcePath: "checkbox-group-disabled-demo.tsx",
      },
      {
        title: "Required",
        description:
          "Asks for at least one option. The error shows after the first submit.",
        sourcePath: "checkbox-group-required-demo.tsx",
        uses: ["form", "button"],
      },
    ],
  },
  "color-field": {
    usage: "color-field-demo.tsx",
    examples: [
      {
        title: "Single channel",
        description:
          "Set colorSpace and channel to edit one channel as a number.",
        sourcePath: "color-field-channel-demo.tsx",
      },
      {
        title: "Disabled",
        sourcePath: "color-field-disabled-demo.tsx",
      },
      {
        title: "Controlled value",
        sourcePath: "color-field-controlled-demo.tsx",
        uses: ["color-swatch"],
      },
      {
        title: "Sizes",
        sourcePath: "color-field-sizes-demo.tsx",
      },
    ],
  },
  "color-picker": {
    usage: "color-picker-demo.tsx",
    examples: [
      {
        title: "Controlled value",
        sourcePath: "color-picker-controlled-demo.tsx",
      },
    ],
  },
  "color-swatch": {
    usage: "color-swatch-basic-demo.tsx",
    examples: [
      {
        title: "Named palette",
        description:
          'Set colorName for the accessible name. Without it, the name is generated, such as "vibrant red".',
        sourcePath: "color-swatch-demo.tsx",
      },
      {
        title: "Transparency",
        sourcePath: "color-swatch-transparency-demo.tsx",
      },
    ],
  },
  "color-swatch-picker": {
    usage: "color-swatch-picker-demo.tsx",
    examples: [
      {
        title: "Disabled",
        sourcePath: "color-swatch-picker-disabled-demo.tsx",
      },
      {
        title: "Controlled value",
        description: "Give each item an aria-label.",
        sourcePath: "color-swatch-picker-controlled-demo.tsx",
      },
    ],
  },
  "combo-box": {
    usage: "combo-box-basic-demo.tsx",
    examples: [
      {
        title: "Described options",
        description: "Set textValue to the option name for filtering.",
        sourcePath: "combo-box-demo.tsx",
      },
      {
        title: "Disabled",
        sourcePath: "combo-box-disabled-demo.tsx",
      },
      {
        title: "Multiple selection",
        sourcePath: "combo-box-multiple-demo.tsx",
      },
      {
        title: "Async loading",
        description:
          "When you set items, the combo box does not filter them. Filter in your load function.",
        sourcePath: "combo-box-async-demo.tsx",
        uses: ["spinner"],
      },
      {
        title: "Sizes",
        description:
          "The list keeps one row height, so options stay easy to touch.",
        sourcePath: "combo-box-sizes-demo.tsx",
      },
    ],
  },
  "command-palette": {
    usage: "command-palette-basic-demo.tsx",
    examples: [
      {
        title: "Sections, icons, and shortcuts",
        description:
          "When an item has an icon, set textValue so search can find it.",
        sourcePath: "command-palette-demo.tsx",
      },
    ],
  },
  "context-menu": {
    usage: "context-menu-demo.tsx",
    examples: [
      {
        title: "Grouped actions",
        sourcePath: "context-menu-grouped-demo.tsx",
      },
    ],
  },
  "copy-button": {
    usage: "copy-button-demo.tsx",
    examples: [
      {
        title: "Custom label and icon button",
        description:
          "Pass a function as children to show a label for each status.",
        sourcePath: "copy-button-share-demo.tsx",
      },
    ],
  },
  "date-field": {
    usage: "date-field-demo.tsx",
    examples: [
      {
        title: "Minimum and maximum",
        description:
          "A date outside the limits shows an error when the field loses focus.",
        sourcePath: "date-field-limits-demo.tsx",
      },
      {
        title: "Date and time",
        description:
          "Pass a CalendarDateTime to add time segments. Set granularity to change the smallest one.",
        sourcePath: "date-field-time-demo.tsx",
      },
      {
        title: "Disabled",
        sourcePath: "date-field-disabled-demo.tsx",
      },
      {
        title: "Sizes",
        sourcePath: "date-field-sizes-demo.tsx",
      },
    ],
  },
  "date-picker": {
    usage: "date-picker-demo.tsx",
    examples: [
      {
        title: "Unavailable dates",
        description:
          "Set isDateUnavailable, minValue, and maxValue to limit the choices.",
        sourcePath: "date-picker-unavailable-demo.tsx",
      },
      {
        title: "Presets",
        sourcePath: "date-picker-presets-demo.tsx",
      },
      {
        title: "Disabled",
        sourcePath: "date-picker-disabled-demo.tsx",
      },
      {
        title: "Controlled value",
        sourcePath: "date-picker-controlled-demo.tsx",
      },
      {
        title: "Sizes",
        sourcePath: "date-picker-sizes-demo.tsx",
      },
    ],
  },
  "date-range-picker": {
    usage: "date-range-picker-demo.tsx",
    examples: [
      {
        title: "Unavailable dates",
        description:
          "A range cannot include an unavailable date unless you set allowsNonContiguousRanges.",
        sourcePath: "date-range-picker-limits-demo.tsx",
      },
      {
        title: "Presets",
        sourcePath: "date-range-picker-presets-demo.tsx",
      },
      {
        title: "Disabled",
        sourcePath: "date-range-picker-disabled-demo.tsx",
      },
      {
        title: "Sizes",
        sourcePath: "date-range-picker-sizes-demo.tsx",
      },
    ],
  },
  "description-list": {
    usage: "description-list-demo.tsx",
    examples: [
      {
        title: "Inline components",
        description: "Long values wrap inside the detail column.",
        sourcePath: "description-list-components-demo.tsx",
        uses: ["badge", "link"],
      },
    ],
  },
  disclosure: {
    usage: "disclosure-demo.tsx",
    examples: [
      {
        title: "Expanded by default",
        sourcePath: "disclosure-expanded-demo.tsx",
      },
      {
        title: "Disabled",
        sourcePath: "disclosure-disabled-demo.tsx",
      },
    ],
  },
  sheet: {
    usage: "sheet-basic-demo.tsx",
    examples: [
      {
        title: "Sizes",
        sourcePath: "sheet-sizes-demo.tsx",
      },
      {
        title: "Inset",
        sourcePath: "sheet-inset-demo.tsx",
      },
      {
        title: "Snap points",
        description:
          "Set snapPoints to the visible size at each stop. The sheet opens at the first stop.",
        sourcePath: "sheet-demo.tsx",
      },
      {
        title: "Edge placement",
        description:
          "Swipe the sheet or drag the handle toward its edge to close it.",
        sourcePath: "sheet-placement-demo.tsx",
        uses: ["checkbox-group"],
      },
      {
        title: "Form",
        description:
          "Put the form around SheetBody and SheetFooter so the footer stays in view.",
        sourcePath: "sheet-form-demo.tsx",
        uses: ["form", "text-field", "text-area", "select", "switch"],
      },
      {
        title: "Nested sheets",
        description: "Escape and outside clicks close the top sheet first.",
        sourcePath: "sheet-nested-demo.tsx",
        uses: ["text-field"],
      },
    ],
  },
  "drop-zone": {
    usage: "drop-zone-basic-demo.tsx",
    examples: [
      {
        title: "Accepted file types",
        description: "Use getDropOperation to accept or cancel a drop.",
        sourcePath: "drop-zone-demo.tsx",
        uses: ["file-trigger"],
      },
    ],
  },
  "empty-state": {
    usage: "empty-state-demo.tsx",
    examples: [
      {
        title: "Without an action",
        sourcePath: "empty-state-no-action-demo.tsx",
      },
      {
        title: "No search results",
        description:
          "After the clear action, move focus back to the search field.",
        sourcePath: "empty-state-search-demo.tsx",
        uses: ["search-field", "button"],
      },
    ],
  },
  fieldset: {
    usage: "fieldset-demo.tsx",
    examples: [],
  },
  "file-trigger": {
    usage: "file-trigger-basic-demo.tsx",
    examples: [
      {
        title: "Multiple images",
        description:
          "acceptedFileTypes only filters the picker. Check each file in onSelect.",
        sourcePath: "file-trigger-demo.tsx",
      },
    ],
  },
  form: {
    usage: "form-demo.tsx",
    examples: [
      {
        title: "Custom validation",
        description:
          "Return an error message from validate, or null when the value is valid.",
        sourcePath: "form-validation-demo.tsx",
      },
      {
        title: "Server errors",
        description:
          'Pass server errors to validationErrors, keyed by field name. Push Save with "maya" to see one.',
        sourcePath: "form-server-errors-demo.tsx",
      },
    ],
  },
  "grid-list": {
    usage: "grid-list-demo.tsx",
    examples: [
      {
        title: "Unavailable row",
        description: "Set isDisabled on the row and show the reason in it.",
        sourcePath: "grid-list-disabled-demo.tsx",
      },
    ],
  },
  "input-group": {
    usage: "input-group-basic-demo.tsx",
    examples: [
      {
        title: "Icon",
        sourcePath: "input-group-icon-demo.tsx",
      },
      {
        title: "Button",
        sourcePath: "input-group-demo.tsx",
      },
      {
        title: "Text area",
        description:
          'Set align="block-end" on InputGroupAddon to add a row below the text.',
        sourcePath: "input-group-notes-demo.tsx",
      },
      {
        title: "Disabled",
        description:
          "Set isDisabled on the TextField. InputGroup inherits the state.",
        sourcePath: "input-group-disabled-demo.tsx",
      },
      {
        title: "Invalid",
        description:
          "Set isInvalid on the TextField. InputGroup inherits the state.",
        sourcePath: "input-group-invalid-demo.tsx",
      },
      {
        title: "Sizes",
        description:
          "Set size on the TextField. The group and its icon use it.",
        sourcePath: "input-group-sizes-demo.tsx",
      },
    ],
  },
  "kbd-code": {
    usage: "kbd-code-demo.tsx",
    examples: [
      {
        title: "Key combination",
        description: "Put the keys of one shortcut in KbdGroup.",
        sourcePath: "kbd-code-group-demo.tsx",
      },
      {
        title: "Long code",
        description:
          "InlineCode wraps a long value and keeps its padding on each line.",
        sourcePath: "kbd-code-wrap-demo.tsx",
      },
    ],
  },
  link: {
    usage: "link-demo.tsx",
    examples: [
      {
        title: "External link",
        description:
          "Add hidden text that tells screen reader users about the new tab.",
        sourcePath: "link-external-demo.tsx",
      },
    ],
  },
  "list-box": {
    usage: "list-box-demo.tsx",
    examples: [
      {
        title: "Multiple selection",
        sourcePath: "list-box-multiple-demo.tsx",
      },
    ],
  },
  menu: {
    usage: "menu-basic-demo.tsx",
    examples: [
      {
        title: "Icons and shortcuts",
        description:
          "Kbd only shows the shortcut. Add the key handler yourself.",
        sourcePath: "menu-demo.tsx",
      },
      {
        title: "Nested menu",
        description: "On small screens, the submenu opens below the item.",
        sourcePath: "menu-nested-demo.tsx",
      },
      {
        title: "Selection",
        sourcePath: "menu-selection-demo.tsx",
      },
      {
        title: "Sections",
        description: "Each MenuSection can have its own selectionMode.",
        sourcePath: "menu-sections-demo.tsx",
      },
      {
        title: "Placement and arrow",
        description:
          "Use MenuPopover and MenuContent instead of Menu to set placement.",
        sourcePath: "menu-placement-demo.tsx",
      },
    ],
  },
  "agent-status": {
    usage: "agent-status-demo.tsx",
    examples: [
      {
        title: "States",
        description: "Screen readers announce each change.",
        sourcePath: "agent-status-states-demo.tsx",
      },
    ],
  },
  message: {
    usage: "message-basic-demo.tsx",
    examples: [
      {
        title: "Sides",
        description: "A system message shows no sender or avatar.",
        sourcePath: "message-demo.tsx",
      },
    ],
  },
  meter: {
    usage: "meter-basic-demo.tsx",
    examples: [
      {
        title: "Value label",
        description: "Screen readers read valueLabel as the value.",
        sourcePath: "meter-demo.tsx",
      },
    ],
  },
  "native-select": {
    usage: "native-select-demo.tsx",
    examples: [
      {
        title: "Groups",
        sourcePath: "native-select-groups-demo.tsx",
      },
      {
        title: "Disabled",
        sourcePath: "native-select-disabled-demo.tsx",
      },
      {
        title: "Invalid selection",
        description: "Set error to show a message below the field.",
        sourcePath: "native-select-invalid-demo.tsx",
        uses: ["form"],
      },
      {
        title: "Sizes",
        description:
          "The browser draws the option list, so its size does not change.",
        sourcePath: "native-select-sizes-demo.tsx",
      },
    ],
  },
  "number-field": {
    usage: "number-field-basic-demo.tsx",
    examples: [
      {
        title: "Minimum and maximum",
        description: "The step buttons stop at each limit.",
        sourcePath: "number-field-limits-demo.tsx",
      },
      {
        title: "Currency formatting",
        sourcePath: "number-field-currency-demo.tsx",
      },
      {
        title: "Disabled",
        sourcePath: "number-field-disabled-demo.tsx",
      },
      {
        title: "Sizes",
        sourcePath: "number-field-sizes-demo.tsx",
      },
    ],
  },
  pagination: {
    usage: "pagination-basic-demo.tsx",
    examples: [
      {
        title: "URL-synced pages",
        description:
          "Keep the page in the URL, so the Back button and shared links work.",
        sourcePath: "pagination-demo.tsx",
      },
      {
        title: "Sizes",
        description: "Use sm or xs below a dense table.",
        sourcePath: "pagination-sizes-demo.tsx",
      },
    ],
  },
  "inline-edit": {
    usage: "inline-edit-basic-demo.tsx",
    examples: [
      {
        title: "Disabled",
        sourcePath: "inline-edit-disabled-demo.tsx",
      },
      {
        title: "Empty value",
        sourcePath: "inline-edit-empty-demo.tsx",
      },
      {
        title: "Save error",
        description:
          "Return a promise from onSave to show progress. Throw to keep the editor open with the message.",
        sourcePath: "inline-edit-demo.tsx",
      },
    ],
  },
  "password-strength-meter": {
    usage: "password-strength-meter-demo.tsx",
    examples: [
      {
        title: "With password field",
        sourcePath: "password-strength-meter-field-demo.tsx",
        uses: ["password-field"],
      },
    ],
  },
  "password-field": {
    usage: "password-field-basic-demo.tsx",
    examples: [
      {
        title: "Disabled",
        sourcePath: "password-field-disabled-demo.tsx",
      },
      {
        title: "New password",
        description: 'Set autoComplete="new-password" and minLength.',
        sourcePath: "password-field-demo.tsx",
        uses: ["form"],
      },
    ],
  },
  popover: {
    usage: "popover-demo.tsx",
    examples: [
      {
        title: "Placement and arrow",
        description:
          'Add start or end to align an edge, such as "bottom start". PopoverArrow follows the side.',
        sourcePath: "popover-placement-demo.tsx",
      },
      {
        title: "Form",
        description:
          "Call close from the PopoverDialog render function after the form submits.",
        sourcePath: "popover-form-demo.tsx",
        uses: ["text-area"],
      },
      {
        title: "Hover preview",
        description:
          "Use PreviewTrigger from react-aria-components with a plain Popover, so hover does not move focus.",
        sourcePath: "popover-preview-demo.tsx",
        uses: ["avatar", "link"],
      },
    ],
  },
  "presence-list": {
    usage: "presence-list-basic-demo.tsx",
    examples: [
      {
        title: "Adding and reordering",
        description:
          "Pass getKey so rows keep their identity when they enter, leave, or move.",
        sourcePath: "presence-list-demo.tsx",
      },
    ],
  },
  "progress-bar": {
    usage: "progress-bar-basic-demo.tsx",
    examples: [
      {
        title: "Known and unknown progress",
        sourcePath: "progress-bar-demo.tsx",
      },
    ],
  },
  "progress-ring": {
    usage: "progress-ring-basic-demo.tsx",
    examples: [
      {
        title: "Known and unknown progress",
        description: "Set showValue={false} to hide the value in the center.",
        sourcePath: "progress-ring-demo.tsx",
      },
      {
        title: "Sizes",
        sourcePath: "progress-ring-sizes-demo.tsx",
      },
      {
        title: "Value label",
        description:
          "Set valueLabel to replace the percentage. Screen readers hear the same text.",
        sourcePath: "progress-ring-label-demo.tsx",
      },
    ],
  },
  "prompt-input": {
    usage: "prompt-input-demo.tsx",
    examples: [
      {
        title: "Keyboard",
        description:
          'Set submitKey="mod+enter" for multi-line input. IME composition never submits.',
        sourcePath: "prompt-input-keyboard-demo.tsx",
      },
      {
        title: "Attachments",
        description: "Set onFilesDropped to accept dropped files.",
        sourcePath: "prompt-input-attachments-demo.tsx",
        uses: ["attachment", "file-trigger"],
      },
      {
        title: "Stop while streaming",
        description: "Set isPending and onStop to change Send to Stop.",
        sourcePath: "prompt-input-stop-demo.tsx",
      },
      {
        title: "Drag and drop",
        description:
          "While a file is over the frame, an overlay shows dropLabel.",
        sourcePath: "prompt-input-drop-demo.tsx",
      },
      {
        title: "Footer actions",
        description: "PromptInputSubmit gets its state from PromptInput.",
        sourcePath: "prompt-input-model-demo.tsx",
        uses: ["select"],
      },
      {
        title: "Full transcript",
        description: "The second prompt fails once to show the error state.",
        sourcePath: "prompt-input-transcript-demo.tsx",
        uses: [
          "message",
          "reasoning",
          "response",
          "copy-button",
          "source-link",
        ],
      },
    ],
  },
  "rating-input": {
    usage: "rating-input-demo.tsx",
    examples: [
      {
        title: "Custom icon",
        sourcePath: "rating-input-icon-demo.tsx",
      },
      {
        title: "Read only",
        sourcePath: "rating-input-read-only-demo.tsx",
      },
      {
        title: "Required",
        description: "The error shows after the first submit.",
        sourcePath: "rating-input-required-demo.tsx",
        uses: ["form", "button"],
      },
    ],
  },
  "radio-group": {
    usage: "radio-group-demo.tsx",
    examples: [
      {
        title: "Described options",
        sourcePath: "radio-group-description-demo.tsx",
      },
      {
        title: "Horizontal",
        sourcePath: "radio-group-horizontal-demo.tsx",
      },
      {
        title: "Card options",
        description:
          "Compose the RadioField parts to put content beside the label.",
        sourcePath: "radio-group-card-demo.tsx",
      },
      {
        title: "Disabled",
        description:
          "Set isDisabled on one Radio, or on RadioGroup for all options.",
        sourcePath: "radio-group-disabled-demo.tsx",
      },
      {
        title: "Required",
        description: "The error shows after the first submit.",
        sourcePath: "radio-group-required-demo.tsx",
        uses: ["form", "button"],
      },
    ],
  },
  "range-calendar": {
    usage: "range-calendar-demo.tsx",
    examples: [
      {
        title: "Unavailable dates",
        description:
          "A range cannot include an unavailable date unless you set allowsNonContiguousRanges.",
        sourcePath: "range-calendar-limits-demo.tsx",
      },
      {
        title: "Controlled value",
        sourcePath: "range-calendar-controlled-demo.tsx",
      },
      {
        title: "Two months",
        description:
          "Set visibleDuration. The months wrap to one column in a narrow space.",
        sourcePath: "range-calendar-months-demo.tsx",
      },
    ],
  },
  reasoning: {
    usage: "reasoning-demo.tsx",
    examples: [
      {
        title: "Auto collapse",
        description:
          "The panel collapses when the run ends and expands for a new run.",
        sourcePath: "reasoning-auto-collapse-demo.tsx",
      },
      {
        title: "Error",
        sourcePath: "reasoning-error-demo.tsx",
      },
      {
        title: "Long reasoning",
        description: "Set scrollable to cap the panel at 16rem.",
        sourcePath: "reasoning-long-demo.tsx",
      },
    ],
  },
  response: {
    usage: "response-demo.tsx",
    examples: [
      {
        title: "Actions",
        sourcePath: "response-actions-demo.tsx",
        uses: ["copy-button"],
      },
      {
        title: "Stopped",
        description:
          "Screen readers hear Response stopped once. Continue resumes the run.",
        sourcePath: "response-stopped-demo.tsx",
      },
      {
        title: "Error",
        sourcePath: "response-error-demo.tsx",
      },
      {
        title: "With reasoning and sources",
        sourcePath: "response-sources-demo.tsx",
        uses: ["reasoning", "source-link"],
      },
    ],
  },
  "search-field": {
    usage: "search-field-basic-demo.tsx",
    examples: [
      {
        title: "Disabled",
        sourcePath: "search-field-disabled-demo.tsx",
      },
      {
        title: "Filtered results",
        description: "SearchFieldClear resets the query and the list.",
        sourcePath: "search-field-demo.tsx",
      },
      {
        title: "Sizes",
        description: "Give each control in a filter bar the same size.",
        sourcePath: "search-field-sizes-demo.tsx",
      },
    ],
  },
  separator: {
    usage: "separator-demo.tsx",
    examples: [
      {
        title: "Vertical",
        description:
          "Use it inside a flex row. The line takes the height of the row.",
        sourcePath: "separator-vertical-demo.tsx",
      },
    ],
  },
  skeleton: {
    usage: "skeleton-basic-demo.tsx",
    examples: [
      {
        title: "Card",
        description:
          "Skeleton is hidden from screen readers, so put a loading message in an output.",
        sourcePath: "skeleton-demo.tsx",
      },
      {
        title: "Loading state",
        description: "Keep the same size so the layout does not move.",
        sourcePath: "skeleton-loading-demo.tsx",
        uses: ["avatar"],
      },
    ],
  },
  slider: {
    usage: "slider-demo.tsx",
    examples: [
      {
        title: "Range",
        description: "Use thumbLabels to give each handle a name.",
        sourcePath: "slider-range-demo.tsx",
      },
      {
        title: "Marks",
        description:
          "Set step to the mark interval so the handle stops on each mark.",
        sourcePath: "slider-step-demo.tsx",
      },
      {
        title: "Vertical",
        sourcePath: "slider-vertical-demo.tsx",
      },
      {
        title: "Custom layout",
        description: "Without a visible label, pass aria-label to Slider.",
        sourcePath: "slider-custom-demo.tsx",
      },
      {
        title: "Disabled",
        sourcePath: "slider-disabled-demo.tsx",
      },
    ],
  },
  spinner: {
    usage: "spinner-basic-demo.tsx",
    examples: [
      {
        title: "Variants",
        description: 'Set variant to "ring", "segments", or "dots".',
        sourcePath: "spinner-demo.tsx",
      },
      {
        title: "Sizes",
        description: "The spinner uses the current text color.",
        sourcePath: "spinner-sizes-demo.tsx",
      },
      {
        title: "Loading in context",
        description:
          "Set decorative when text next to the spinner names the wait.",
        sourcePath: "spinner-usage-demo.tsx",
      },
    ],
  },
  stat: {
    usage: "stat-demo.tsx",
    examples: [
      {
        title: "Trend",
        description:
          "Include a plus or minus sign so the direction does not depend on color.",
        sourcePath: "stat-trend-demo.tsx",
        uses: ["badge"],
      },
    ],
  },
  stepper: {
    usage: "stepper-basic-demo.tsx",
    examples: [
      {
        title: "Controlled step",
        sourcePath: "stepper-demo.tsx",
      },
    ],
  },
  switch: {
    usage: "switch-basic-demo.tsx",
    examples: [
      {
        title: "Description",
        sourcePath: "switch-description-demo.tsx",
      },
      {
        title: "Disabled",
        sourcePath: "switch-disabled-demo.tsx",
      },
      {
        title: "Control first",
        description: "Put SwitchControl before SwitchLabel.",
        sourcePath: "switch-control-first-demo.tsx",
      },
      {
        title: "Custom layout",
        description:
          "Keep SwitchDescription outside SwitchButton so it is read as a description.",
        sourcePath: "switch-demo.tsx",
        uses: ["badge"],
      },
    ],
  },
  "data-table": {
    usage: "data-table-demo.tsx",
    examples: [
      {
        title: "Column filters",
        description: "A filtered column also needs sortValue.",
        sourcePath: "data-table-column-filters-demo.tsx",
      },
    ],
  },
  table: {
    usage: "table-basic-demo.tsx",
    examples: [
      {
        title: "Selectable projects",
        description: 'Set selectionMode="single" to select one row.',
        sourcePath: "table-demo.tsx",
      },
      {
        title: "Sortable columns",
        description: "Table does not sort the rows. Sort them in onSortChange.",
        sourcePath: "table-sorting-demo.tsx",
      },
      {
        title: "Filter invoices",
        description: "renderEmptyState shows a message when no rows match.",
        sourcePath: "table-filter-demo.tsx",
      },
    ],
  },
  tabs: {
    usage: "tabs-basic-demo.tsx",
    examples: [
      {
        title: "With icons",
        sourcePath: "tabs-demo.tsx",
      },
      {
        title: "Disabled tab",
        description: "The arrow keys skip a disabled tab.",
        sourcePath: "tabs-disabled-demo.tsx",
      },
      {
        title: "Vertical",
        description: "In a narrow space, the panel moves below the tabs.",
        sourcePath: "tabs-vertical-demo.tsx",
      },
      {
        title: "Many tabs",
        description: "The list scrolls and keeps the focused tab in view.",
        sourcePath: "tabs-overflow-demo.tsx",
      },
      {
        title: "Sizes",
        sourcePath: "tabs-sizes-demo.tsx",
      },
    ],
  },
  "tag-group": {
    usage: "tag-group-demo.tsx",
    examples: [
      {
        title: "Sizes",
        sourcePath: "tag-group-sizes-demo.tsx",
      },
    ],
  },
  "text-area": {
    usage: "text-area-basic-demo.tsx",
    examples: [
      {
        title: "Description",
        sourcePath: "text-area-description-demo.tsx",
      },
      {
        title: "Disabled",
        sourcePath: "text-area-disabled-demo.tsx",
      },
      {
        title: "Read only",
        sourcePath: "text-area-read-only-demo.tsx",
      },
      {
        title: "Invalid",
        sourcePath: "text-area-invalid-demo.tsx",
      },
      {
        title: "Sizes",
        description:
          "Size changes the padding, radius, and text, not the height.",
        sourcePath: "text-area-sizes-demo.tsx",
      },
    ],
  },
  "text-field": {
    usage: "text-field-basic-demo.tsx",
    examples: [
      {
        title: "Description",
        sourcePath: "text-field-description-demo.tsx",
      },
      {
        title: "Disabled",
        sourcePath: "text-field-disabled-demo.tsx",
      },
      {
        title: "Read only",
        sourcePath: "text-field-read-only-demo.tsx",
      },
      {
        title: "Invalid",
        sourcePath: "text-field-invalid-demo.tsx",
      },
      {
        title: "Sizes",
        description: "Give a button next to the field the same size.",
        sourcePath: "text-field-sizes-demo.tsx",
      },
    ],
  },
  "text-reveal": {
    usage: "text-reveal-basic-demo.tsx",
    examples: [
      {
        title: "Characters",
        description:
          "A word stays on one line unless it is wider than its container.",
        sourcePath: "text-reveal-characters-demo.tsx",
      },
      {
        title: "Sequence",
        description: "Set delay to start one reveal after another.",
        sourcePath: "text-reveal-demo.tsx",
      },
    ],
  },
  "text-scramble": {
    usage: "text-scramble-basic-demo.tsx",
    examples: [
      {
        title: "Glyphs",
        description: "Use characters that have the same width in your font.",
        sourcePath: "text-scramble-demo.tsx",
      },
      {
        title: "Duration",
        description: "Use a short duration for status labels.",
        sourcePath: "text-scramble-duration-demo.tsx",
      },
    ],
  },
  presence: {
    usage: "presence-demo.tsx",
    examples: [
      {
        title: "Inline status",
        description:
          "Keep the output element outside Presence, so screen readers announce the change.",
        sourcePath: "presence-inline-demo.tsx",
      },
    ],
  },
  "source-link": {
    usage: "source-link-demo.tsx",
    examples: [
      {
        title: "Source list",
        description: "Set index to the citation number in the answer.",
        sourcePath: "source-link-list-demo.tsx",
      },
    ],
  },
  "stagger-group": {
    usage: "stagger-group-basic-demo.tsx",
    examples: [
      {
        title: "List",
        sourcePath: "stagger-group-demo.tsx",
      },
      {
        title: "Timing",
        description:
          "In a long group the delay gets shorter, so the last item starts within 0.6 seconds.",
        sourcePath: "stagger-group-timing-demo.tsx",
      },
    ],
  },
  "layout-morph": {
    usage: "layout-morph-demo.tsx",
    examples: [
      {
        title: "Switching views",
        description:
          "Keep the control outside LayoutMorph, so focus stays on the control.",
        sourcePath: "layout-morph-views-demo.tsx",
        uses: ["toggle-button-group"],
      },
      {
        title: "Width",
        description: "Set w-fit on LayoutMorph to animate the width.",
        sourcePath: "layout-morph-width-demo.tsx",
        uses: ["toggle-button-group", "spinner"],
      },
    ],
  },
  marquee: {
    usage: "marquee-demo.tsx",
    examples: [
      {
        title: "Reverse",
        description: "In a right-to-left layout, both directions change sides.",
        sourcePath: "marquee-reverse-demo.tsx",
      },
      {
        title: "Speed and spacing",
        description:
          "Set speed in pixels per second and --marquee-gap for the space between items.",
        sourcePath: "marquee-speed-demo.tsx",
      },
    ],
  },
  "text-swap": {
    usage: "text-swap-demo.tsx",
    examples: [
      {
        title: "Button label",
        description: "Set a minimum width so the button keeps its size.",
        sourcePath: "text-swap-button-demo.tsx",
      },
    ],
  },
  "tool-call": {
    usage: "tool-call-demo.tsx",
    examples: [
      {
        title: "States",
        description: "Screen readers announce each change.",
        sourcePath: "tool-call-states-demo.tsx",
      },
      {
        title: "Sequence",
        sourcePath: "tool-call-sequence-demo.tsx",
      },
    ],
  },
  "time-field": {
    usage: "time-field-demo.tsx",
    examples: [
      {
        title: "24-hour clock",
        sourcePath: "time-field-24-hour-demo.tsx",
      },
      {
        title: "Minimum and maximum",
        description:
          "A time outside the limits shows an error when the field loses focus.",
        sourcePath: "time-field-limits-demo.tsx",
      },
      {
        title: "Disabled",
        sourcePath: "time-field-disabled-demo.tsx",
      },
      {
        title: "Sizes",
        sourcePath: "time-field-sizes-demo.tsx",
      },
    ],
  },
  timeline: {
    usage: "timeline-demo.tsx",
    examples: [],
  },
  toast: {
    usage: "toast-demo.tsx",
    examples: [
      {
        title: "Variants",
        sourcePath: "toast-status-demo.tsx",
      },
      {
        title: "Action",
        description:
          "A toast with an action stays open until the user closes it.",
        sourcePath: "toast-action-demo.tsx",
      },
      {
        title: "Stack",
        description:
          "Hover or focus the stack to expand it. Swipe a toast to close it.",
        sourcePath: "toast-stack-demo.tsx",
      },
      {
        title: "Timeout",
        description:
          "A toast closes after 5 seconds. Set timeout to 0 to keep it open.",
        sourcePath: "toast-timeout-demo.tsx",
      },
    ],
  },
  "toggle-button": {
    usage: "toggle-button-demo.tsx",
    examples: [
      {
        title: "Independent toggles",
        sourcePath: "toggle-button-independent-demo.tsx",
      },
      {
        title: "Sizes",
        description:
          "Set iconOnly for a square toggle, and give it an aria-label.",
        sourcePath: "toggle-button-sizes-demo.tsx",
      },
    ],
  },
  "toggle-button-group": {
    usage: "toggle-button-group-demo.tsx",
    examples: [
      {
        title: "Multiple text styles",
        sourcePath: "toggle-button-group-editor-demo.tsx",
      },
      {
        title: "Sizes",
        sourcePath: "toggle-button-group-sizes-demo.tsx",
      },
    ],
  },
  "token-field": {
    usage: "token-field-basic-demo.tsx",
    examples: [
      {
        title: "Disabled",
        sourcePath: "token-field-disabled-demo.tsx",
      },
      {
        title: "Project tags",
        description:
          "Commit the draft with onSubmit. Uncommitted text is not a token.",
        sourcePath: "token-field-demo.tsx",
      },
      {
        title: "Sizes",
        sourcePath: "token-field-sizes-demo.tsx",
      },
    ],
  },
  toolbar: {
    usage: "toolbar-basic-demo.tsx",
    examples: [
      {
        title: "Formatting toolbar",
        sourcePath: "toolbar-demo.tsx",
      },
      {
        title: "Vertical toolbar",
        description: "The up and down arrow keys move focus.",
        sourcePath: "toolbar-vertical-demo.tsx",
      },
      {
        title: "Sizes",
        description:
          "Popovers that open from the toolbar keep the default size.",
        sourcePath: "toolbar-sizes-demo.tsx",
      },
    ],
  },
  tooltip: {
    usage: "tooltip-demo.tsx",
    examples: [
      {
        title: "Placement and arrow",
        description:
          "If there is no space, the tooltip moves to the opposite side.",
        sourcePath: "tooltip-placement-demo.tsx",
      },
      {
        title: "Icon button tooltips",
        description: "Match each aria-label to the tooltip text.",
        sourcePath: "tooltip-actions-demo.tsx",
      },
    ],
  },
  tree: {
    usage: "tree-basic-demo.tsx",
    examples: [
      {
        title: "Custom row content",
        description: "Typeahead still uses title.",
        sourcePath: "tree-demo.tsx",
      },
    ],
  },
} as const satisfies Record<string, ComponentPageSource>;

function withDescriptions<T extends Record<string, ComponentPageSource>>(
  sources: T,
) {
  return Object.fromEntries(
    Object.entries(sources).map(([slug, page]) => [
      slug,
      { ...page, description: componentDescription(slug) },
    ]),
  ) as { [Slug in keyof T]: T[Slug] & { description: string } };
}

export const componentPageData = withDescriptions(pageSources);

export function getComponentPageData(
  slug: string,
): ComponentPageData | undefined {
  return (componentPageData as Record<string, ComponentPageData | undefined>)[
    slug
  ];
}

export function exampleAnchor(title: string) {
  return `example-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-$/, "")}`;
}
