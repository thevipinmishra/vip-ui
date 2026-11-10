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

export interface ComponentUsage {
  code: string;
  filename?: string;
  note?: string;
}

type ComponentPageSource = Omit<ComponentPageData, "description">;

const pageSources = {
  button: {
    usage: "button-basic-demo.tsx",
    examples: [
      {
        title: "Variants",
        description: "Set `variant` to change the visual emphasis.",
        sourcePath: "button-variants-demo.tsx",
      },
      {
        title: "Sizes",
        description:
          "Set `size` to change the height, padding, and icon size; small sizes expand the hit area on touch screens.",
        sourcePath: "button-sizes-demo.tsx",
      },
      {
        title: "With icon",
        description:
          "Mark the icon `aria-hidden` so the label stays the accessible name.",
        sourcePath: "button-with-icon-demo.tsx",
      },
      {
        title: "Icon buttons",
        description:
          "Set `iconOnly` for one icon; give the button an `aria-label` and mark the icon `aria-hidden`.",
        sourcePath: "button-icon-demo.tsx",
      },
      {
        title: "Disabled",
        description:
          "Set `isDisabled` to remove the button from the tab order and block presses.",
        sourcePath: "button-disabled-demo.tsx",
      },
      {
        title: "Loading",
        description:
          "While `isPending` is true, the button stays focusable, ignores presses, and announces the pending state.",
        sourcePath: "button-loading-demo.tsx",
        uses: ["spinner"],
      },
      {
        title: "Link",
        description:
          "Use `ButtonLink` for navigation; it renders an anchor, and `as` accepts your router link.",
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
          'Use `variant="divided"` inside a container that already has a surface.',
        sourcePath: "accordion-billing-demo.tsx",
      },
      {
        title: "Multiple open sections",
        description:
          "Set `allowsMultipleExpanded` to keep more than one section open.",
        sourcePath: "accordion-multiple-demo.tsx",
      },
      {
        title: "Disabled section",
        description: "A disabled section cannot be expanded or focused.",
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
        description: "In a narrow alert, the action moves below the text.",
        sourcePath: "alert-action-demo.tsx",
        uses: ["button-link"],
      },
      {
        title: "Dismiss",
        description:
          "Move focus to a nearby control before the alert leaves; otherwise focus is lost.",
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
        sourcePath: "animated-number-slide-demo.tsx",
        uses: ["button"],
      },
      {
        title: "Number format",
        description:
          "Screen readers get the same currency format, not the raw number.",
        sourcePath: "animated-number-format-demo.tsx",
        uses: ["button"],
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
        uses: ["drop-zone"],
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
          'Initials show until the image loads or if it fails; set `initials=""` to show a person icon.',
        sourcePath: "avatar-fallback-demo.tsx",
      },
      {
        title: "Group",
        description:
          "Give `AvatarGroup` an `aria-label`; show the people not shown as a count, such as +2.",
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
    examples: [
      {
        title: "Folder path",
        description:
          "Pass `items` for a path that changes; `onAction` receives the pressed breadcrumb's id.",
        sourcePath: "breadcrumbs-folders-demo.tsx",
        uses: ["button"],
      },
      {
        title: "Collapsed path",
        description:
          "Use `BreadcrumbItem` for a crumb that is not a link, such as a menu of hidden pages.",
        sourcePath: "breadcrumbs-collapsed-demo.tsx",
        uses: ["menu", "button"],
      },
    ],
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
        description: "Give the icon button an `aria-label`.",
        sourcePath: "button-group-demo.tsx",
        uses: ["menu"],
      },
      {
        title: "Sizes",
        description:
          "Set `size` on the group; a size on a button overrides it.",
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
      {
        title: "Month and year pickers",
        description:
          "The year list shows 20 years. Set `visibleYears` to change it.",
        sourcePath: "calendar-pickers-demo.tsx",
      },
    ],
  },
  card: {
    usage: "card-basic-demo.tsx",
    examples: [
      {
        title: "Action",
        description:
          "`CardAction` sits beside the title and takes up to half of the header width.",
        sourcePath: "card-action-demo.tsx",
      },
      {
        title: "Media",
        description:
          "Put `CardMedia` before the header or after the footer so it follows the card corners.",
        sourcePath: "card-media-demo.tsx",
        uses: ["badge"],
      },
      {
        title: "Linked card",
        description:
          "Put `CardLink` in the title to make the whole card a link; give other buttons `relative z-10`.",
        sourcePath: "card-link-demo.tsx",
      },
      {
        title: "Form",
        description:
          "Wrap the content and footer in a `Form` so the footer button submits.",
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
  "color-wheel": {
    usage: "color-wheel-demo.tsx",
    examples: [
      {
        title: "Controlled value",
        description: "Children render in the center of the wheel.",
        sourcePath: "color-wheel-controlled-demo.tsx",
        uses: ["color-swatch"],
      },
      {
        title: "Size",
        description: "innerRadius defaults to 24 pixels less than outerRadius.",
        sourcePath: "color-wheel-size-demo.tsx",
      },
      {
        title: "Disabled",
        sourcePath: "color-wheel-disabled-demo.tsx",
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
        title: "Leading icon",
        sourcePath: "combo-box-icon-demo.tsx",
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
          "When an item has an icon, set `textValue` so search can find it.",
        sourcePath: "command-palette-demo.tsx",
        uses: ["button"],
      },
    ],
  },
  "context-menu": {
    usage: "context-menu-demo.tsx",
    examples: [
      {
        title: "Grouped actions",
        description: "A disabled item is skipped by the arrow keys.",
        sourcePath: "context-menu-grouped-demo.tsx",
        uses: ["button"],
      },
    ],
  },
  "copy-button": {
    usage: "copy-button-demo.tsx",
    examples: [
      {
        title: "Custom label and icon button",
        description:
          "Pass a function as `children` to show a label for each status.",
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
        title: "Month and year pickers",
        description:
          "Compose a `Calendar` with pickers in `DatePickerContent`.",
        sourcePath: "date-picker-pickers-demo.tsx",
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
        title: "Rich values",
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
        description: "Set `defaultExpanded` to show the panel on first render.",
        sourcePath: "disclosure-expanded-demo.tsx",
      },
      {
        title: "Disabled",
        description: "A disabled disclosure cannot be expanded or focused.",
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
          "`acceptedFileTypes` only filters the picker. Check each file in `onSelect`.",
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
        title: "Multiple selection",
        description:
          'Set `selectionMode="multiple"` to select more than one row.',
        sourcePath: "grid-list-selection-demo.tsx",
      },
      {
        title: "Unavailable row",
        description:
          "Set `isDisabled` on a row and show the reason in it. A disabled row cannot be selected.",
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
        description: "Put the keys of one shortcut in `KbdGroup`.",
        sourcePath: "kbd-code-group-demo.tsx",
      },
      {
        title: "Long code",
        description:
          "`InlineCode` wraps a long value and keeps its padding on each line.",
        sourcePath: "kbd-code-wrap-demo.tsx",
      },
    ],
  },
  link: {
    usage: "link-demo.tsx",
    examples: [
      {
        title: "External link",
        description: "Add hidden text that says the link opens in a new tab.",
        sourcePath: "link-external-demo.tsx",
      },
    ],
  },
  "list-box": {
    usage: "list-box-demo.tsx",
    examples: [
      {
        title: "Multiple selection",
        description:
          'Set `selectionMode="multiple"` to select more than one option.',
        sourcePath: "list-box-multiple-demo.tsx",
      },
      {
        title: "Disabled option",
        description:
          "Set `isDisabled` on an option and show the reason in it. A disabled option cannot be selected.",
        sourcePath: "list-box-disabled-demo.tsx",
      },
    ],
  },
  menu: {
    usage: "menu-basic-demo.tsx",
    examples: [
      {
        title: "Icons and shortcuts",
        description:
          "`Kbd` shows the shortcut only. Add the key handler yourself.",
        sourcePath: "menu-demo.tsx",
        uses: ["button", "kbd-code"],
      },
      {
        title: "Selection",
        sourcePath: "menu-selection-demo.tsx",
      },
      {
        title: "Sections",
        description: "Each `MenuSection` can have its own `selectionMode`.",
        sourcePath: "menu-sections-demo.tsx",
      },
      {
        title: "Nested menu",
        description: "On small screens, the submenu opens below the item.",
        sourcePath: "menu-nested-demo.tsx",
      },
      {
        title: "Placement and arrow",
        description:
          "Use `MenuPopover` and `MenuContent` instead of `Menu` to set placement.",
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
        description:
          "Set `valueLabel` to show units; screen readers read the same text.",
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
        title: "Stacked steppers",
        description:
          "Each button is half the field height. On touch screens, use the split layout.",
        sourcePath: "number-field-stacked-demo.tsx",
      },
      {
        title: "Composition",
        description:
          "Set a unit in formatOptions, so screen readers read the unit with the value.",
        sourcePath: "number-field-composition-demo.tsx",
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
          "Keep the page in the URL so Back and shared links work; `RouterProvider` sends link presses to your router.",
        sourcePath: "pagination-demo.tsx",
      },
      {
        title: "Sizes",
        description:
          "`xs` and `sm` expand the hit area to 44px on touch screens.",
        sourcePath: "pagination-sizes-demo.tsx",
      },
      {
        title: "Skipped pages",
        description:
          'Use `PaginationEllipsis` for skipped pages; screen readers hear "More pages".',
        sourcePath: "pagination-ellipsis-demo.tsx",
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
        title: "Removing a row",
        description:
          "Move focus to a neighbor before removing; the exiting row is inert and `aria-hidden`.",
        sourcePath: "presence-list-remove-demo.tsx",
        uses: ["button"],
      },
      {
        title: "Reordering",
        description:
          "At either end the control is disabled; move focus to the button that remains.",
        sourcePath: "presence-list-demo.tsx",
        uses: ["button"],
      },
    ],
  },
  "progress-bar": {
    usage: "progress-bar-basic-demo.tsx",
    examples: [
      {
        title: "Known and unknown progress",
        description:
          "Set `isIndeterminate` when the task has no known end; the bar sweeps without a percentage.",
        sourcePath: "progress-bar-demo.tsx",
      },
    ],
  },
  "progress-ring": {
    usage: "progress-ring-basic-demo.tsx",
    examples: [
      {
        title: "Known and unknown progress",
        description:
          "Set `isIndeterminate` for a wait with no end, and `showValue={false}` to hide the center.",
        sourcePath: "progress-ring-demo.tsx",
      },
      {
        title: "Sizes",
        sourcePath: "progress-ring-sizes-demo.tsx",
      },
      {
        title: "Value label",
        description:
          "Set `valueLabel` to replace the percentage. Screen readers hear the same text.",
        sourcePath: "progress-ring-label-demo.tsx",
      },
    ],
  },
  "prompt-input": {
    usage: "prompt-input-demo.tsx",
    examples: [
      {
        title: "Keyboard",
        description: 'Set `submitKey="mod+enter"` so Enter adds a line.',
        sourcePath: "prompt-input-keyboard-demo.tsx",
        uses: ["kbd-code"],
      },
      {
        title: "Attachments",
        description:
          "Set `onFilesDropped` to accept files dropped on the frame.",
        sourcePath: "prompt-input-attachments-demo.tsx",
        uses: ["attachment", "file-trigger"],
      },
      {
        title: "Footer actions",
        sourcePath: "prompt-input-actions-demo.tsx",
        uses: ["toggle-button", "select"],
      },
      {
        title: "Suggestions",
        description:
          "Set `value` and `onChange` to fill the prompt from outside.",
        sourcePath: "prompt-input-suggestions-demo.tsx",
      },
      {
        title: "Stop while streaming",
        description: "Set `isPending` and `onStop` to change Send to Stop.",
        sourcePath: "prompt-input-stop-demo.tsx",
        uses: ["response"],
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
      {
        title: "Sizes",
        sourcePath: "rating-input-sizes-demo.tsx",
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
          "Use it inside a flex row; the line takes the height of the row.",
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
          "Each `Skeleton` is hidden from screen readers, so put a loading message in an `output`.",
        sourcePath: "skeleton-demo.tsx",
      },
      {
        title: "Loading state",
        description:
          "Keep the same size so the layout does not move when the content arrives.",
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
        description:
          "Each variant animates transform and opacity only, and stops with reduced motion.",
        sourcePath: "spinner-demo.tsx",
      },
      {
        title: "Sizes",
        sourcePath: "spinner-sizes-demo.tsx",
      },
      {
        title: "Color",
        description:
          "Set the text color on the parent; the spinner inherits it.",
        sourcePath: "spinner-color-demo.tsx",
      },
      {
        title: "In a button",
        description:
          "Set `decorative` when adjacent text names the wait. `isPending` keeps focus and ignores presses.",
        sourcePath: "spinner-usage-demo.tsx",
        uses: ["button"],
      },
      {
        title: "Loading overlay",
        description:
          "Set `aria-busy` on the region while it loads, and keep the old content in place.",
        sourcePath: "spinner-overlay-demo.tsx",
        uses: ["button"],
      },
    ],
  },
  stat: {
    usage: "stat-demo.tsx",
    examples: [
      {
        title: "Trend",
        description:
          "Include a plus or minus sign so direction does not depend on color. Set `invert` when a lower value is better.",
        sourcePath: "stat-trend-demo.tsx",
      },
      {
        title: "Group",
        description:
          "`StatGroup` joins stats in one surface; the columns wrap on narrow screens.",
        sourcePath: "stat-group-demo.tsx",
      },
      {
        title: "Live value",
        description:
          "`AnimatedNumber` does not announce updates; wrap the value in a live region when the change matters.",
        sourcePath: "stat-live-demo.tsx",
        uses: ["animated-number"],
      },
    ],
  },
  stepper: {
    usage: "stepper-basic-demo.tsx",
    examples: [
      {
        title: "Controlled step",
        description:
          "Set `currentStep` to a zero-based index; earlier steps show as complete.",
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
        description:
          "Add `filter` to a column to show a filter control. The column also needs `sortValue`.",
        sourcePath: "data-table-column-filters-demo.tsx",
        uses: ["badge"],
      },
      {
        title: "Resizable columns and row actions",
        description:
          "Set `width` and `minWidth` for the starting widths, and `resizable` for the column handles. `onRowAction` runs when a user clicks a row or presses Enter on it.",
        sourcePath: "data-table-resizable-demo.tsx",
      },
      {
        title: "Footer summary",
        description:
          "`renderFooter` replaces the row count and page controls with your own summary.",
        sourcePath: "data-table-footer-demo.tsx",
        uses: ["button"],
      },
    ],
  },
  table: {
    usage: "table-basic-demo.tsx",
    examples: [
      {
        title: "Multiple selection",
        description:
          'Set `selectionMode="multiple"` to add a checkbox column. A disabled row cannot be selected.',
        sourcePath: "table-demo.tsx",
        uses: ["checkbox", "badge"],
      },
      {
        title: "Sortable columns",
        description:
          "Set `allowsSorting` on a column, then sort the rows in `onSortChange`. The table reports the descriptor and does not reorder the rows.",
        sourcePath: "table-sorting-demo.tsx",
      },
      {
        title: "Filtering",
        description: "`renderEmptyState` shows the message when no rows match.",
        sourcePath: "table-filter-demo.tsx",
        uses: ["search-field", "select", "badge"],
      },
      {
        title: "Resizable columns",
        description:
          "Set `allowsResizing` on a column and wrap the table in `TableContainer`. Drag a column edge, or focus the handle and use the arrow keys.",
        sourcePath: "table-resizable-demo.tsx",
      },
      {
        title: "Expandable rows",
        description:
          "Put child rows inside their parent row, and set `treeColumn` to the column that shows the expand button.",
        sourcePath: "table-expandable-demo.tsx",
      },
      {
        title: "Reorder rows",
        description:
          "Pass `dragAndDropHooks` to add a drag handle column. To move a row with the keyboard, press Right Arrow to reach the handle, press Enter, then use the arrow keys.",
        sourcePath: "table-reorder-demo.tsx",
        uses: ["checkbox"],
      },
      {
        title: "Load more",
        description:
          "`TableLoadMoreItem` calls `onLoadMore` when it scrolls into view. The header stays at the top of the container.",
        sourcePath: "table-load-more-demo.tsx",
        uses: ["spinner"],
      },
      {
        title: "Footer",
        description: "`TableFooter` adds a summary row after the rows.",
        sourcePath: "table-footer-demo.tsx",
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
        title: "Controlled selection",
        description:
          "Use `value` and `onValueChange` when the selected tab lives in a parent.",
        sourcePath: "tabs-controlled-demo.tsx",
      },
      {
        title: "Sizes",
        description:
          "`xs` and `sm` shrink the tab below the 44px touch target.",
        sourcePath: "tabs-sizes-demo.tsx",
      },
    ],
  },
  "tag-group": {
    usage: "tag-group-demo.tsx",
    examples: [
      {
        title: "Selection",
        description:
          'Set `selectionMode="multiple"` to use tags as filters; `disabledKeys` blocks a tag.',
        sourcePath: "tag-group-selection-demo.tsx",
      },
      {
        title: "Links",
        description:
          "Set `href` on a tag to render a link with the tag styles.",
        sourcePath: "tag-group-links-demo.tsx",
      },
      {
        title: "Sizes",
        description: "Set `size` on the group; a size on a tag overrides it.",
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
        uses: ["button"],
      },
      {
        title: "Sequence",
        description:
          "`delay` counts from the start, so the title begins before the label finishes.",
        sourcePath: "text-reveal-demo.tsx",
        uses: ["button"],
      },
    ],
  },
  "text-scramble": {
    usage: "text-scramble-basic-demo.tsx",
    examples: [
      {
        title: "Duration",
        sourcePath: "text-scramble-duration-demo.tsx",
        uses: ["button"],
      },
      {
        title: "Glyphs",
        description:
          "Use characters of equal width; a wide glyph shifts the line while the text resolves.",
        sourcePath: "text-scramble-demo.tsx",
        uses: ["button"],
      },
    ],
  },
  presence: {
    usage: "presence-demo.tsx",
    examples: [
      {
        title: "Inline status",
        description:
          "Keep the live region outside `Presence`; a region that mounts with its text is often missed.",
        sourcePath: "presence-inline-demo.tsx",
        uses: ["button"],
      },
      {
        title: "Hiding focused content",
        description:
          "Move focus to the trigger first; the exiting panel is inert and hidden from assistive technology.",
        sourcePath: "presence-focus-demo.tsx",
        uses: ["button"],
      },
      {
        title: "Collapse",
        description:
          "Set `collapse` to animate the height, so the content below moves smoothly. Put padding on a child, not on `Presence`.",
        sourcePath: "presence-collapse-demo.tsx",
        uses: ["alert", "button"],
      },
    ],
  },
  "source-link": {
    usage: "source-link-demo.tsx",
    examples: [
      {
        title: "Source list",
        description: "Set `index` to the citation number in the answer.",
        sourcePath: "source-link-list-demo.tsx",
      },
    ],
  },
  "stagger-group": {
    usage: "stagger-group-basic-demo.tsx",
    examples: [
      {
        title: "Replay on change",
        description:
          'Set `trigger="mount"` with a new `key` so filtering replays the sequence.',
        sourcePath: "stagger-group-demo.tsx",
        uses: ["toggle-button-group"],
      },
      {
        title: "Long groups",
        description:
          "Leave `stagger` at its default; a long group compresses the delay so the last item starts within 0.6 seconds.",
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
          "Keep the control outside `LayoutMorph`, so focus stays on the control.",
        sourcePath: "layout-morph-views-demo.tsx",
        uses: ["toggle-button-group"],
      },
      {
        title: "Width",
        description: "Set `w-fit` on `LayoutMorph` to animate the width.",
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
        sourcePath: "marquee-speed-demo.tsx",
      },
      {
        title: "Static row",
        description:
          "Use `speed={0}` for a short set that should wrap instead of loop.",
        sourcePath: "marquee-static-demo.tsx",
      },
    ],
  },
  "icon-swap": {
    usage: "icon-swap-demo.tsx",
    examples: [
      {
        title: "Toggle button",
        sourcePath: "icon-swap-toggle-demo.tsx",
        uses: ["toggle-button"],
      },
      {
        title: "Loading state",
        description: "Any element can be a child, such as a `Spinner`.",
        sourcePath: "icon-swap-loading-demo.tsx",
        uses: ["button", "spinner"],
      },
    ],
  },
  "text-shimmer": {
    usage: "text-shimmer-demo.tsx",
    examples: [
      {
        title: "Agent steps",
        sourcePath: "text-shimmer-steps-demo.tsx",
        uses: ["button"],
      },
      {
        title: "Color",
        description:
          "Set the text color for the base and `--text-shimmer-highlight` for the highlight.",
        sourcePath: "text-shimmer-color-demo.tsx",
      },
    ],
  },
  "scroll-fade": {
    usage: "scroll-fade-demo.tsx",
    examples: [
      {
        title: "Horizontal",
        sourcePath: "scroll-fade-horizontal-demo.tsx",
        uses: ["tag-group"],
      },
      {
        title: "Fade size",
        description:
          "Use the `--scroll-fade-size` CSS variable to set the length of the fade.",
        sourcePath: "scroll-fade-size-demo.tsx",
      },
    ],
  },
  "text-swap": {
    usage: "text-swap-demo.tsx",
    examples: [
      {
        title: "Button label",
        sourcePath: "text-swap-button-demo.tsx",
        uses: ["button"],
      },
      {
        title: "Inline phrase",
        description:
          "The value is one box and does not wrap with the text around it. Keep it short.",
        sourcePath: "text-swap-inline-demo.tsx",
        uses: ["button"],
      },
    ],
  },
  "text-loop": {
    usage: "text-loop-demo.tsx",
    examples: [
      {
        title: "Pause",
        description:
          "Set `active` to false to stop the loop. Give users a way to pause a loop that runs next to other content.",
        sourcePath: "text-loop-pause-demo.tsx",
        uses: ["toggle-button"],
      },
    ],
  },
  highlighter: {
    usage: "highlighter-demo.tsx",
    examples: [
      {
        title: "Variants",
        sourcePath: "highlighter-variants-demo.tsx",
        uses: ["button"],
      },
      {
        title: "Sequence",
        description:
          "Use `delay` to draw marks one after another. Set `--highlighter-color` to change the color.",
        sourcePath: "highlighter-sequence-demo.tsx",
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
    examples: [
      {
        title: "Process",
        description:
          'Set `status="upcoming"`; the connector is dashed and screen readers read the status first.',
        sourcePath: "timeline-process-demo.tsx",
      },
      {
        title: "Icons",
        sourcePath: "timeline-icons-demo.tsx",
      },
    ],
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
          "Set `iconOnly` for a square toggle, and give it an `aria-label`.",
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
        description:
          "Set `size` on the group; a size on a toggle overrides it.",
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
        description:
          "The toolbar is one tab stop; the arrow keys move focus between controls.",
        sourcePath: "toolbar-demo.tsx",
        uses: ["button", "separator"],
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
        uses: ["button", "separator"],
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
        title: "Custom content",
        description:
          "Set `content` to show more than the label, such as a file size. Typeahead still matches `title`.",
        sourcePath: "tree-demo.tsx",
      },
      {
        title: "Checkbox selection",
        description:
          'Set `selectionMode="multiple"` to add a checkbox to each row; a disabled row cannot be selected.',
        sourcePath: "tree-selection-demo.tsx",
        uses: ["checkbox"],
      },
      {
        title: "Sections",
        description: "`TreeSection` groups rows under a `TreeHeader`.",
        sourcePath: "tree-sections-demo.tsx",
      },
      {
        title: "Drag and drop",
        description:
          "Pass `dragAndDropHooks` to move rows; drop a row on a folder to move it inside. To move a row with the keyboard, press Right Arrow to reach the handle, press Enter, then use the arrow keys.",
        sourcePath: "tree-drag-demo.tsx",
      },
    ],
  },
  "spotlight-card": {
    usage: "spotlight-card-demo.tsx",
    examples: [
      {
        title: "Feature grid",
        description:
          "The light follows the pointer across the grid, so the borders of nearby cards also light up.",
        sourcePath: "spotlight-card-grid-demo.tsx",
      },
      {
        title: "Color and size",
        description:
          "Use the `--spotlight-color` and `--spotlight-size` CSS variables to change the light.",
        sourcePath: "spotlight-card-color-demo.tsx",
      },
    ],
  },
  "border-beam": {
    usage: "border-beam-demo.tsx",
    examples: [
      {
        title: "Active prompt",
        description:
          "Set `active` to show the beam only while work is in progress.",
        sourcePath: "border-beam-prompt-demo.tsx",
        uses: ["prompt-input"],
      },
      {
        title: "Color and width",
        description:
          "Use the `--border-beam-color` and `--border-beam-width` CSS variables. Match the width to the border.",
        sourcePath: "border-beam-color-demo.tsx",
      },
    ],
  },
  "progressive-blur": {
    usage: "progressive-blur-demo.tsx",
    examples: [
      {
        title: "Sticky header",
        description:
          "Put the blur inside the sticky header and extend it below the header.",
        sourcePath: "progressive-blur-header-demo.tsx",
      },
      {
        title: "Caption",
        description: "Increase `blur` to keep text readable on busy media.",
        sourcePath: "progressive-blur-caption-demo.tsx",
      },
    ],
  },
} as const satisfies Record<string, ComponentPageSource>;

const usageSources = {
  alert: {
    code: `import { Alert } from "@/components/vip-ui/alert";

export function PreviewNotice() {
  return (
    <Alert title="Preview mode">
      Changes stay in this workspace until you publish.
    </Alert>
  );
}`,
    filename: "preview-notice.tsx",
  },
  badge: {
    code: `import { Badge } from "@/components/vip-ui/badge";

export function DraftBadge() {
  return <Badge>Draft</Badge>;
}`,
    filename: "draft-badge.tsx",
  },
  "progress-bar": {
    code: `import { ProgressBar } from "@/components/vip-ui/progress-bar";

export function UploadProgress() {
  return <ProgressBar label="Uploading assets" value={40} />;
}`,
    filename: "upload-progress.tsx",
  },
  "progress-ring": {
    code: `import { ProgressRing } from "@/components/vip-ui/progress-ring";

export function UploadRing() {
  return <ProgressRing label="Uploading assets" value={65} />;
}`,
    filename: "upload-ring.tsx",
  },
  meter: {
    code: `import { Meter } from "@/components/vip-ui/meter";

export function StorageMeter() {
  return (
    <Meter label="Storage used" value={65} valueLabel="65 GB of 100 GB" />
  );
}`,
    filename: "storage-meter.tsx",
  },
  stepper: {
    code: `import { Stepper } from "@/components/vip-ui/stepper";

const steps = [
  { label: "Details" },
  { label: "Review" },
  { label: "Complete" },
];

export function SetupProgress() {
  return (
    <Stepper
      steps={steps}
      currentStep={1}
      aria-label="Project setup progress"
    />
  );
}`,
    filename: "setup-progress.tsx",
  },
  spinner: {
    code: `import { Spinner } from "@/components/vip-ui/spinner";

export function WorkspaceLoader() {
  return <Spinner aria-label="Loading workspace" />;
}`,
    filename: "workspace-loader.tsx",
  },
  skeleton: {
    code: `import { Skeleton } from "@/components/vip-ui/skeleton";

export function ProfilePlaceholder() {
  return (
    <output className="flex items-center gap-3">
      <span className="sr-only">Loading profile</span>
      <Skeleton className="size-10 rounded-full" />
      <div className="grid gap-2">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-3 w-20" />
      </div>
    </output>
  );
}`,
    filename: "profile-placeholder.tsx",
  },
  "empty-state": {
    code: `import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateTitle,
} from "@/components/vip-ui/empty-state";

export function NoProjects() {
  return (
    <EmptyState>
      <EmptyStateTitle>No projects yet</EmptyStateTitle>
      <EmptyStateDescription>
        Create a project to start a draft.
      </EmptyStateDescription>
    </EmptyState>
  );
}`,
    filename: "no-projects.tsx",
  },
  button: {
    code: `import { Button } from "@/components/vip-ui/button";

export function SaveButton() {
  return <Button>Save changes</Button>;
}`,
    filename: "save-button.tsx",
  },
  "button-group": {
    code: `import { Button } from "@/components/vip-ui/button";
import { ButtonGroup } from "@/components/vip-ui/button-group";

export function MessageActions() {
  return (
    <ButtonGroup aria-label="Message actions">
      <Button variant="ghost">Archive</Button>
      <Button variant="ghost">Snooze</Button>
    </ButtonGroup>
  );
}`,
    filename: "message-actions.tsx",
  },
  menu: {
    code: `import { Button } from "@/components/vip-ui/button";
import { Menu, MenuItem, MenuTrigger } from "@/components/vip-ui/menu";

export function ProjectMenu() {
  return (
    <MenuTrigger>
      <Button variant="outline">Project actions</Button>
      <Menu aria-label="Project actions">
        <MenuItem>Rename</MenuItem>
        <MenuItem>Duplicate</MenuItem>
      </Menu>
    </MenuTrigger>
  );
}`,
    filename: "project-menu.tsx",
  },
  "context-menu": {
    code: `import { Button } from "@/components/vip-ui/button";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/vip-ui/context-menu";

export function FileActions() {
  return (
    <ContextMenuTrigger>
      <Button variant="outline">brief.pdf</Button>
      <ContextMenu aria-label="File actions">
        <ContextMenuItem>Rename</ContextMenuItem>
        <ContextMenuItem>Copy filename</ContextMenuItem>
      </ContextMenu>
    </ContextMenuTrigger>
  );
}`,
    filename: "file-actions.tsx",
  },
  "toggle-button": {
    code: `import { PushPinIcon } from "@phosphor-icons/react";
import { ToggleButton } from "@/components/vip-ui/toggle-button";

export function PinButton() {
  return (
    <ToggleButton>
      <PushPinIcon aria-hidden="true" />
      Pin to favorites
    </ToggleButton>
  );
}`,
    filename: "pin-button.tsx",
  },
  "toggle-button-group": {
    code: `import { ToggleButton } from "@/components/vip-ui/toggle-button";
import { ToggleButtonGroup } from "@/components/vip-ui/toggle-button-group";

export function CalendarView() {
  return (
    <ToggleButtonGroup
      aria-label="Calendar view"
      selectionMode="single"
      defaultSelectedKeys={["week"]}
      disallowEmptySelection
    >
      <ToggleButton id="day" variant="segmented">
        Day
      </ToggleButton>
      <ToggleButton id="week" variant="segmented">
        Week
      </ToggleButton>
    </ToggleButtonGroup>
  );
}`,
    filename: "calendar-view.tsx",
  },
  toolbar: {
    code: `import { ToggleButton } from "@/components/vip-ui/toggle-button";
import { ToggleButtonGroup } from "@/components/vip-ui/toggle-button-group";
import { Toolbar } from "@/components/vip-ui/toolbar";

export function AlignmentToolbar() {
  return (
    <Toolbar aria-label="Text alignment">
      <ToggleButtonGroup
        aria-label="Alignment"
        selectionMode="single"
        defaultSelectedKeys={["left"]}
        disallowEmptySelection
      >
        <ToggleButton id="left" variant="segmented">
          Left
        </ToggleButton>
        <ToggleButton id="center" variant="segmented">
          Center
        </ToggleButton>
      </ToggleButtonGroup>
    </Toolbar>
  );
}`,
    filename: "alignment-toolbar.tsx",
  },
  "file-trigger": {
    code: `import { Button } from "@/components/vip-ui/button";
import { FileTrigger } from "@/components/vip-ui/file-trigger";

export function UploadButton() {
  return (
    <FileTrigger>
      <Button variant="outline">Choose files</Button>
    </FileTrigger>
  );
}`,
    filename: "upload-button.tsx",
  },
  "copy-button": {
    code: `import { CopyButton } from "@/components/vip-ui/copy-button";

export function CopyReference() {
  return (
    <CopyButton value="REF-2026-0472" aria-label="Copy reference ID" />
  );
}`,
    filename: "copy-reference.tsx",
  },
  "command-palette": {
    code: `"use client";

import { useState } from "react";
import { Button } from "@/components/vip-ui/button";
import {
  CommandPalette,
  CommandPaletteItem,
} from "@/components/vip-ui/command-palette";

export function CommandMenu() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setOpen(true)}>Open commands</Button>
      <CommandPalette isOpen={isOpen} onOpenChange={setOpen}>
        <CommandPaletteItem>New project</CommandPaletteItem>
        <CommandPaletteItem>Settings</CommandPaletteItem>
      </CommandPalette>
    </>
  );
}`,
    filename: "command-menu.tsx",
  },
  card: {
    code: `import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/vip-ui/card";

export function ProjectCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Website refresh</CardTitle>
        <CardDescription>Due October 18</CardDescription>
      </CardHeader>
    </Card>
  );
}`,
    filename: "project-card.tsx",
  },
  accordion: {
    code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/vip-ui/accordion";

export function Faq() {
  return (
    <Accordion>
      <AccordionItem id="invite">
        <AccordionTrigger>How do I invite teammates?</AccordionTrigger>
        <AccordionContent>
          Open project settings and send an invitation by email.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem id="private">
        <AccordionTrigger>Can I keep a project private?</AccordionTrigger>
        <AccordionContent>
          New projects are private until you change access in settings.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
    filename: "faq.tsx",
  },
  disclosure: {
    code: `import {
  Disclosure,
  DisclosureHeader,
  DisclosurePanel,
} from "@/components/vip-ui/disclosure";

export function PlanDetails() {
  return (
    <Disclosure>
      <DisclosureHeader>What is included?</DisclosureHeader>
      <DisclosurePanel>
        Every plan includes project history and team access.
      </DisclosurePanel>
    </Disclosure>
  );
}`,
    filename: "plan-details.tsx",
  },
  separator: {
    code: `import { Separator } from "@/components/vip-ui/separator";

export function AccountSections() {
  return (
    <div>
      <p>Profile and security settings</p>
      <Separator className="my-3" />
      <p>Notification preferences</p>
    </div>
  );
}`,
    filename: "account-sections.tsx",
  },
  avatar: {
    code: `import { Avatar } from "@/components/vip-ui/avatar";

export function MayaAvatar() {
  return (
    <Avatar
      name="Maya Chen"
      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop"
    />
  );
}`,
    filename: "maya-avatar.tsx",
  },
  "description-list": {
    code: `import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "@/components/vip-ui/description-list";

export function WorkspaceDetails() {
  return (
    <DescriptionList>
      <DescriptionTerm>Workspace</DescriptionTerm>
      <DescriptionDetail>Studio North</DescriptionDetail>
      <DescriptionTerm>Owner</DescriptionTerm>
      <DescriptionDetail>Amina Shah</DescriptionDetail>
    </DescriptionList>
  );
}`,
    filename: "workspace-details.tsx",
  },
  stat: {
    code: `import {
  Stat,
  StatDetail,
  StatLabel,
  StatValue,
} from "@/components/vip-ui/stat";

export function ActiveProjects() {
  return (
    <Stat>
      <StatLabel>Active projects</StatLabel>
      <StatValue>24</StatValue>
      <StatDetail>Up 3 from last month</StatDetail>
    </Stat>
  );
}`,
    filename: "active-projects.tsx",
  },
  timeline: {
    code: `import {
  Timeline,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/components/vip-ui/timeline";

export function ProjectActivity() {
  return (
    <Timeline aria-label="Project activity">
      <TimelineItem status="latest">
        <TimelineTitle>Design approved</TimelineTitle>
        <TimelineTime dateTime="2025-10-18T14:30:00Z">
          October 18, 2:30 PM UTC
        </TimelineTime>
      </TimelineItem>
      <TimelineItem>
        <TimelineTitle>Feedback addressed</TimelineTitle>
      </TimelineItem>
    </Timeline>
  );
}`,
    filename: "project-activity.tsx",
  },
  "kbd-code": {
    code: `import { InlineCode, Kbd } from "@/components/vip-ui/kbd-code";

export function ShortcutHint() {
  return (
    <p>
      Press <Kbd>Esc</Kbd> to close the dialog. Set{" "}
      <InlineCode>aria-label</InlineCode> on icon-only controls.
    </p>
  );
}`,
    filename: "shortcut-hint.tsx",
  },
  link: {
    code: `import { Link } from "@/components/vip-ui/link";

export function SetupLink() {
  return <Link href="/components/installation">Read the setup guide</Link>;
}`,
    filename: "setup-link.tsx",
  },
  breadcrumbs: {
    code: `import { Breadcrumb, Breadcrumbs } from "@/components/vip-ui/breadcrumbs";

export function ProjectBreadcrumbs() {
  return (
    <nav aria-label="Breadcrumbs">
      <Breadcrumbs>
        <Breadcrumb href="/">Home</Breadcrumb>
        <Breadcrumb href="/projects">Projects</Breadcrumb>
        <Breadcrumb>Website redesign</Breadcrumb>
      </Breadcrumbs>
    </nav>
  );
}`,
    filename: "project-breadcrumbs.tsx",
  },
  pagination: {
    code: `import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationList,
} from "@/components/vip-ui/pagination";

export function ResultsPagination() {
  return (
    <Pagination>
      <PaginationList>
        <PaginationItem>
          <PaginationLink href="?page=1" isCurrent aria-label="Page 1">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="?page=2" aria-label="Page 2">
            2
          </PaginationLink>
        </PaginationItem>
      </PaginationList>
    </Pagination>
  );
}`,
    filename: "results-pagination.tsx",
  },
  tabs: {
    code: `import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/vip-ui/tabs";

export function ProjectTabs() {
  return (
    <Tabs defaultValue="details">
      <TabsList aria-label="Project">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>
      <TabsContent value="details">Studio North is due October 18.</TabsContent>
      <TabsContent value="activity">No changes yet.</TabsContent>
    </Tabs>
  );
}`,
    filename: "project-tabs.tsx",
  },
  "icon-swap": {
    code: `import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { IconSwap } from "@/components/vip-ui/icon-swap";

export function CopyIndicator({ copied }: { copied: boolean }) {
  return (
    <IconSwap contentKey={copied ? "copied" : "copy"}>
      {copied ? <CheckIcon /> : <CopyIcon />}
    </IconSwap>
  );
}`,
    filename: "copy-indicator.tsx",
  },
  "text-shimmer": {
    code: `import { TextShimmer } from "@/components/vip-ui/text-shimmer";

export function SearchStatus() {
  return <TextShimmer>Searching 24 sources</TextShimmer>;
}`,
    filename: "search-status.tsx",
  },
  "scroll-fade": {
    code: `import { ScrollFade } from "@/components/vip-ui/scroll-fade";

export function ActivityFeed({ items }: { items: string[] }) {
  return (
    <ScrollFade className="h-64" tabIndex={0} aria-label="Activity">
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </ScrollFade>
  );
}`,
    filename: "activity-feed.tsx",
  },
  "text-swap": {
    code: `import { TextSwap } from "@/components/vip-ui/text-swap";

export function PublishStatus({ status }: { status: string }) {
  return <TextSwap value={status} aria-live="polite" />;
}`,
    filename: "publish-status.tsx",
  },
  "text-loop": {
    code: `import { TextLoop } from "@/components/vip-ui/text-loop";

export function Tagline() {
  return (
    <h1>
      Built for <TextLoop values={["designers", "engineers", "founders"]} />
    </h1>
  );
}`,
    filename: "tagline.tsx",
  },
  highlighter: {
    code: `import { Highlighter } from "@/components/vip-ui/highlighter";

export function Lead() {
  return (
    <p>
      Plan the launch and <Highlighter>ship on the same day</Highlighter>.
    </p>
  );
}`,
    filename: "lead.tsx",
  },
  "animated-number": {
    code: `import { AnimatedNumber } from "@/components/vip-ui/animated-number";

export function GuestCount({ count }: { count: number }) {
  return <AnimatedNumber value={count} aria-live="polite" />;
}`,
    filename: "guest-count.tsx",
  },
  "text-reveal": {
    code: `import { TextReveal } from "@/components/vip-ui/text-reveal";

export function Intro() {
  return <TextReveal text="A studio for type, print, and motion." />;
}`,
    filename: "studio-intro.tsx",
  },
  "text-scramble": {
    code: `import { TextScramble } from "@/components/vip-ui/text-scramble";

export function PublishStatus({ status }: { status: string }) {
  return <TextScramble value={status} aria-live="polite" />;
}`,
    filename: "publish-status.tsx",
  },
  presence: {
    code: `import { Presence } from "@/components/vip-ui/presence";

export function SaveStatus({ saved }: { saved: boolean }) {
  return (
    <div role="status">
      <Presence show={saved}>Draft saved</Presence>
    </div>
  );
}`,
    filename: "save-status.tsx",
  },
  "presence-list": {
    code: `import { PresenceList } from "@/components/vip-ui/presence-list";

const steps = [
  { id: "brief", title: "Write the brief" },
  { id: "type", title: "Choose the typefaces" },
];

export function ProjectSteps() {
  return (
    <PresenceList items={steps} getKey={(step) => step.id}>
      {(step) => <span>{step.title}</span>}
    </PresenceList>
  );
}`,
    filename: "project-steps.tsx",
  },
  "stagger-group": {
    code: `import { StaggerGroup, StaggerItem } from "@/components/vip-ui/stagger-group";

const tasks = ["Write the brief", "Choose the typefaces", "Send the proofs"];

export function ProjectTasks() {
  return (
    <StaggerGroup as="ol">
      {tasks.map((task) => (
        <StaggerItem as="li" key={task}>
          {task}
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}`,
    filename: "project-tasks.tsx",
  },
  "layout-morph": {
    code: `import { LayoutMorph } from "@/components/vip-ui/layout-morph";

export function PublishStatus({ published }: { published: boolean }) {
  return (
    <LayoutMorph aria-live="polite" contentKey={published ? "live" : "draft"}>
      {published
        ? "Published. Subscribers get it in the next digest."
        : "Draft saved. Only you can see it."}
    </LayoutMorph>
  );
}`,
    filename: "publish-status.tsx",
  },
  marquee: {
    code: `import { Marquee } from "@/components/vip-ui/marquee";

const clients = ["Atlas", "Beacon", "Cascade", "Drift", "Ember"];

export function ClientStrip() {
  return (
    <Marquee>
      {clients.map((client) => (
        <span key={client} className="whitespace-nowrap">
          {client}
        </span>
      ))}
    </Marquee>
  );
}`,
    filename: "client-strip.tsx",
  },
  "list-box": {
    code: `import { ListBox, ListBoxItem } from "@/components/vip-ui/list-box";

const teams = [
  { id: "design", name: "Design" },
  { id: "engineering", name: "Engineering" },
  { id: "research", name: "Research" },
];

export function TeamPicker() {
  return (
    <ListBox aria-label="Team" items={teams}>
      {(team) => <ListBoxItem id={team.id}>{team.name}</ListBoxItem>}
    </ListBox>
  );
}`,
    filename: "team-picker.tsx",
  },
  "grid-list": {
    code: `import { GridList, GridListItem } from "@/components/vip-ui/grid-list";

const files = [
  { id: "brief", name: "Project brief", type: "PDF" },
  { id: "assets", name: "Brand assets", type: "Folder" },
  { id: "notes", name: "Meeting notes", type: "Text" },
];

export function FileList() {
  return (
    <GridList
      aria-label="Project files"
      items={files}
      selectionMode="single"
    >
      {(file) => (
        <GridListItem id={file.id} textValue={file.name}>
          {file.name}
          <span className="ms-auto text-xs text-muted-foreground">
            {file.type}
          </span>
        </GridListItem>
      )}
    </GridList>
  );
}`,
    filename: "file-list.tsx",
  },
  tree: {
    code: `import { Tree, TreeItem } from "@/components/vip-ui/tree";

export function FileTree() {
  return (
    <Tree aria-label="Project files" defaultExpandedKeys={["design"]}>
      <TreeItem id="design" title="Design">
        <TreeItem id="wireframes" title="Wireframes.fig" />
        <TreeItem id="palette" title="Palette.pdf" />
      </TreeItem>
      <TreeItem id="notes" title="Notes.md" />
    </Tree>
  );
}`,
    filename: "file-tree.tsx",
  },
  "tag-group": {
    code: `import {
  Tag,
  TagGroup,
  TagGroupLabel,
  TagListView,
} from "@/components/vip-ui/tag-group";

const topics = [
  { id: "design", name: "Design" },
  { id: "engineering", name: "Engineering" },
  { id: "research", name: "Research" },
];

export function TopicTags() {
  return (
    <TagGroup>
      <TagGroupLabel>Topics</TagGroupLabel>
      <TagListView items={topics}>
        {(topic) => <Tag id={topic.id}>{topic.name}</Tag>}
      </TagListView>
    </TagGroup>
  );
}`,
    filename: "topic-tags.tsx",
  },
  table: {
    code: `import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@/components/vip-ui/table";

const projects = [
  { id: "north", name: "Studio North", owner: "Maya Chen" },
  { id: "atlas", name: "Atlas", owner: "Sam Rivera" },
];

export function ProjectTable() {
  return (
    <Table aria-label="Projects">
      <TableHeader>
        <Column isRowHeader>Project</Column>
        <Column>Owner</Column>
      </TableHeader>
      <TableBody items={projects}>
        {(project) => (
          <Row id={project.id}>
            <Cell>{project.name}</Cell>
            <Cell>{project.owner}</Cell>
          </Row>
        )}
      </TableBody>
    </Table>
  );
}`,
    filename: "project-table.tsx",
  },
  "data-table": {
    code: `import {
  DataTable,
  type DataTableColumn,
} from "@/components/vip-ui/data-table";

type Project = {
  id: string;
  name: string;
  owner: string;
};

const projects: Project[] = [
  { id: "north", name: "Studio North", owner: "Maya Chen" },
  { id: "atlas", name: "Atlas", owner: "Sam Rivera" },
];

const columns: DataTableColumn<Project>[] = [
  {
    id: "name",
    header: "Project",
    cell: (project) => project.name,
    sortValue: (project) => project.name,
  },
  {
    id: "owner",
    header: "Owner",
    cell: (project) => project.owner,
    sortValue: (project) => project.owner,
  },
];

export function ProjectTable() {
  return (
    <DataTable
      label="Projects"
      rows={projects}
      columns={columns}
      getRowId={(project) => project.id}
    />
  );
}`,
    filename: "project-table.tsx",
  },
  "spotlight-card": {
    code: `import { CardHeader, CardTitle } from "@/components/vip-ui/card";
import { SpotlightCard } from "@/components/vip-ui/spotlight-card";

export function FeatureCard() {
  return (
    <SpotlightCard>
      <CardHeader>
        <CardTitle>Shared inbox</CardTitle>
      </CardHeader>
    </SpotlightCard>
  );
}`,
    filename: "feature-card.tsx",
  },
  "border-beam": {
    code: `import { BorderBeam } from "@/components/vip-ui/border-beam";
import { Card } from "@/components/vip-ui/card";

export function FeaturedPlan() {
  return (
    <Card>
      <p>Pro</p>
      <BorderBeam />
    </Card>
  );
}`,
    filename: "featured-plan.tsx",
    note: "Put the beam inside a positioned element with a border. It takes the radius of that element.",
  },
  "progressive-blur": {
    code: `import type { ReactNode } from "react";
import { ProgressiveBlur } from "@/components/vip-ui/progressive-blur";

export function Feed({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <div className="h-64 overflow-y-auto">{children}</div>
      <ProgressiveBlur side="bottom" />
    </div>
  );
}`,
    filename: "feed.tsx",
  },
} as const satisfies Record<string, ComponentUsage>;

export function getComponentUsage(slug: string): ComponentUsage | undefined {
  return (usageSources as Record<string, ComponentUsage | undefined>)[slug];
}

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
