export interface ComponentExampleMetadata {
  title: string;
  description?: string;
  sourcePath: string;
  previewProps?: Readonly<Record<string, unknown>>;
}

import { componentDescription } from "./catalog";

export interface ComponentPageData {
  summary?: string;
  usage: string;
  exampleFile?: string;
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
    summary: "Examples cover icons, loading states, and links.",
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
          'Use `size` to change the button size. The default is `"md"`.',
        sourcePath: "button-sizes-demo.tsx",
      },
      {
        title: "With icon",
        description:
          'Add `data-icon="inline-start"` or `data-icon="inline-end"` to the icon for correct spacing.',
        sourcePath: "button-with-icon-demo.tsx",
      },
      {
        title: "Icon buttons",
        description:
          "Set `iconOnly` for a square button. Give the button an `aria-label` and mark the icon `aria-hidden`.",
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
          "Set `isPending` to block presses while keeping the button focusable.",
        sourcePath: "button-loading-demo.tsx",
      },
      {
        title: "Link",
        description:
          "Install `ButtonLink` with `npx shadcn@latest add @vip-ui/button-link`. Pass `as={Link}` to use Next.js routing.",
        sourcePath: "button-link-demo.tsx",
      },
    ],
  },
  select: {
    summary:
      "Examples cover descriptions, sections, sizes, and invalid or disabled fields.",
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
    summary:
      "Examples cover sizes, alert dialogs, forms, scrolling, and controlled open state.",
    usage: "dialog-demo.tsx",
    examples: [
      {
        title: "Sizes",
        sourcePath: "dialog-sizes-demo.tsx",
      },
      {
        title: "Alert dialog",
        description:
          'Set `role="alertdialog"` on `DialogContent`. An outside click does not close it.',
        sourcePath: "dialog-alert-demo.tsx",
      },
      {
        title: "Form",
        description:
          "Put the form around DialogBody and DialogFooter, and call close after submit.",
        sourcePath: "dialog-form-demo.tsx",
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
    summary:
      "Examples cover divided sections, form validation, and disabled items.",
    usage: "accordion-demo.tsx",
    examples: [
      {
        title: "Divided",
        description:
          'Use `variant="divided"` inside a container that already has a surface.',
        sourcePath: "accordion-billing-demo.tsx",
      },
      {
        title: "Form validation",
        description:
          "Open the section with the first invalid field through `expandedKeys`. Set `allowsMultipleExpanded` to keep the other sections open.",
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
    summary:
      "Examples show every variant, an action, and dismissal that restores focus to the trigger.",
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
      },
      {
        title: "Dismiss",
        description:
          "Move focus to a nearby control before the alert leaves; otherwise focus is lost.",
        sourcePath: "alert-dismiss-demo.tsx",
      },
    ],
  },
  "animated-number": {
    usage: "animated-number-basic-demo.tsx",
    examples: [
      {
        title: "Digit slide",
        sourcePath: "animated-number-slide-demo.tsx",
      },
      {
        title: "Number format",
        description:
          "Screen readers get the same currency format, not the raw number.",
        sourcePath: "animated-number-format-demo.tsx",
      },
    ],
  },
  attachment: {
    summary:
      "Examples cover adding and removing files, each upload state, and the compact size.",
    usage: "attachment-basic-demo.tsx",
    examples: [
      {
        title: "Adding and removing files",
        description: "Check the type and size of each file before you add it.",
        sourcePath: "attachment-demo.tsx",
      },
      {
        title: "Upload states",
        sourcePath: "attachment-upload-demo.tsx",
      },
      {
        title: "Compact",
        description: 'Use `size="sm"` for attachments inside a prompt input.',
        sourcePath: "attachment-compact-demo.tsx",
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
    summary: "Examples show every variant and the dot indicator.",
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
      },
      {
        title: "Collapsed path",
        description:
          "Use `BreadcrumbItem` for a crumb that is not a link, such as a menu of hidden pages.",
        sourcePath: "breadcrumbs-collapsed-demo.tsx",
      },
    ],
  },
  "button-group": {
    usage: "button-group-basic-demo.tsx",
    examples: [
      {
        title: "Orientations",
        description:
          'Buttons sit in a row by default. Set `orientation="vertical"` to stack them.',
        sourcePath: "button-group-orientations-demo.tsx",
      },
      {
        title: "Split button",
        description:
          "Wrap the second button and its menu in `MenuTrigger`. Give the icon button an `aria-label`.",
        sourcePath: "button-group-demo.tsx",
      },
      {
        title: "Sizes",
        description: "Set `size` on the group to size its buttons together.",
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
          "Use `isDateUnavailable` to block weekends. Set `minValue` and `maxValue` to limit selection to June.",
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
      },
      {
        title: "Linked card",
        description:
          "Put `CardLink` in the title to make the card clickable. Give `CardAction` the `relative z-10` classes to keep the menu button above the link.",
        sourcePath: "card-link-demo.tsx",
      },
      {
        title: "Form",
        description:
          "Wrap the content and footer in a `Form` so the footer button submits.",
        sourcePath: "card-demo.tsx",
      },
    ],
  },
  carousel: {
    usage: "carousel-demo.tsx",
    exampleFile: "photo-art.tsx",
    examples: [
      {
        title: "Several slides",
        description:
          "Set a `basis-*` class on each slide to show more than one. Use the `--carousel-gap` CSS variable to change the space between slides.",
        sourcePath: "carousel-several-demo.tsx",
      },
      {
        title: "Thumbnails",
        sourcePath: "carousel-thumbnails-demo.tsx",
      },
      {
        title: "Autoplay",
        description:
          'Pass `Autoplay` in `plugins`, add a pause button, and set `aria-live="off"` on the viewport.',
        sourcePath: "carousel-autoplay-demo.tsx",
      },
      {
        title: "Different widths",
        sourcePath: "carousel-widths-demo.tsx",
      },
      {
        title: "Right to left",
        sourcePath: "carousel-rtl-demo.tsx",
      },
      {
        title: "Vertical",
        description:
          'Set `axis` to `"y"` in `opts` and give the viewport a height.',
        sourcePath: "carousel-vertical-demo.tsx",
      },
    ],
  },
  lightbox: {
    usage: "lightbox-demo.tsx",
    exampleFile: "photo-art.tsx",
    examples: [
      {
        title: "Captions",
        sourcePath: "lightbox-captions-demo.tsx",
      },
      {
        title: "Controlled index",
        description:
          "Bind `index` to keep a page gallery and the lightbox in step.",
        sourcePath: "lightbox-controlled-demo.tsx",
      },
      {
        title: "Single image",
        sourcePath: "lightbox-single-demo.tsx",
      },
    ],
  },
  checkbox: {
    summary:
      "Examples cover descriptions, required and disabled states, indeterminate state, and a card.",
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
      },
    ],
  },
  "color-field": {
    usage: "color-field-demo.tsx",
    examples: [
      {
        title: "Single channel",
        description:
          "Set `colorSpace` and `channel` to edit one channel as a number.",
        sourcePath: "color-field-channel-demo.tsx",
      },
      {
        title: "Disabled",
        sourcePath: "color-field-disabled-demo.tsx",
      },
      {
        title: "Controlled value",
        sourcePath: "color-field-controlled-demo.tsx",
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
        description:
          "Render a swatch inside the wheel to show the current color.",
        sourcePath: "color-wheel-controlled-demo.tsx",
      },
      {
        title: "Size",
        description: "Set `outerRadius` to change the size of the wheel.",
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
          "Set `colorName` to name each swatch for assistive technology.",
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
        description: "Set `isDisabled` on the items that users cannot select.",
        sourcePath: "color-swatch-picker-disabled-demo.tsx",
      },
      {
        title: "Controlled value",
        description:
          "Use `value` and `onChange` to show the selected color name.",
        sourcePath: "color-swatch-picker-controlled-demo.tsx",
      },
    ],
  },
  "combo-box": {
    summary:
      "Examples cover async results, multiple selection, icons, sizes, and disabled fields.",
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
          "When an item has an icon, set `textValue` so search can find it. Add `keywords` to match other words, such as dark mode for Change theme.",
        sourcePath: "command-palette-demo.tsx",
        previewProps: { shortcut: false },
      },
    ],
  },
  "context-menu": {
    summary: "Examples cover grouped actions.",
    usage: "context-menu-demo.tsx",
    examples: [
      {
        title: "Grouped actions",
        description: "A disabled item is skipped by the arrow keys.",
        sourcePath: "context-menu-grouped-demo.tsx",
      },
    ],
  },
  conversation: {
    usage: "conversation-demo.tsx",
    examples: [
      {
        title: "Jump to latest",
        description:
          "Scroll up in the transcript, then select Stream replies. Select Jump to latest to return to the newest message.",
        sourcePath: "conversation-jump-demo.tsx",
      },
      {
        title: "Load older messages",
        sourcePath: "conversation-load-older-demo.tsx",
      },
      {
        title: "Empty",
        sourcePath: "conversation-empty-demo.tsx",
      },
      {
        title: "With prompt input",
        description: "Call `scrollToLatest` when the user sends a message.",
        sourcePath: "conversation-prompt-demo.tsx",
      },
    ],
  },
  "code-block": {
    usage: "code-block-demo.tsx",
    examples: [
      {
        title: "Highlighted lines",
        sourcePath: "code-block-highlight-demo.tsx",
      },
      {
        title: "Collapsed",
        description: "Set `maxLines` to collapse long code.",
        sourcePath: "code-block-collapsed-demo.tsx",
      },
      {
        title: "Wrap",
        sourcePath: "code-block-wrap-demo.tsx",
      },
      {
        title: "Syntax colors",
        description:
          "Pass the output of your highlighter as the children of `CodeBlockBody`.",
        sourcePath: "code-block-syntax-demo.tsx",
      },
      {
        title: "Streaming",
        description: "Set `isStreaming` while the code arrives.",
        sourcePath: "code-block-streaming-demo.tsx",
      },
    ],
  },
  "copy-button": {
    summary: "Examples cover a custom label and an icon-only button.",
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
          "Change the month to May, then leave the field to see the error.",
        sourcePath: "date-field-limits-demo.tsx",
      },
      {
        title: "Date and time",
        description:
          "Pass a `CalendarDateTime` to add time segments. Set `granularity` to choose the smallest unit.",
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
          "Use `isDateUnavailable` to block dates within the window set by `minValue` and `maxValue`.",
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
          "Start a range on June 17 to see how unavailable dates limit the selection. Set `allowsNonContiguousRanges` to let a range span unavailable dates.",
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
  "event-calendar": {
    usage: "event-calendar-demo.tsx",
    examples: [
      {
        title: "Day view",
        sourcePath: "event-calendar-day-demo.tsx",
      },
      {
        title: "Move and resize",
        description: "Update `events` in `onEventChange`.",
        sourcePath: "event-calendar-edit-demo.tsx",
      },
      {
        title: "Keyboard",
        description:
          "Press Alt and an arrow key to move the focused event. Press Alt, Shift, and Up or Down to resize it.",
        sourcePath: "event-calendar-keyboard-demo.tsx",
      },
      {
        title: "Overlapping events",
        sourcePath: "event-calendar-overlap-demo.tsx",
      },
      {
        title: "Working hours",
        description: "Set `dayStart` and `dayEnd` to show part of the day.",
        sourcePath: "event-calendar-hours-demo.tsx",
      },
      {
        title: "Custom event",
        sourcePath: "event-calendar-custom-demo.tsx",
      },
    ],
  },
  "description-list": {
    usage: "description-list-demo.tsx",
    examples: [
      {
        title: "Deployment inspector",
        description: "The metadata stacks inside a narrow panel on any screen.",
        sourcePath: "description-list-components-demo.tsx",
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
    summary:
      "Examples cover sizes, inset panels, snap points, edge placement, and forms.",
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
      },
      {
        title: "Form",
        description:
          "Put the form around SheetBody and SheetFooter so the footer stays in view.",
        sourcePath: "sheet-form-demo.tsx",
      },
      {
        title: "Nested sheets",
        description: "Escape and outside clicks close the top sheet first.",
        sourcePath: "sheet-nested-demo.tsx",
      },
    ],
  },
  sidebar: {
    usage: "sidebar-demo.tsx",
    examples: [
      {
        title: "Collapsed rail",
        description: "Set `defaultOpen` to `false` to start as a rail.",
        sourcePath: "sidebar-rail-demo.tsx",
      },
      {
        title: "Sections and badges",
        sourcePath: "sidebar-sections-demo.tsx",
      },
      {
        title: "Mobile sheet",
        description:
          "Below 48rem of container width, the sidebar opens in a sheet.",
        sourcePath: "sidebar-mobile-demo.tsx",
      },
      {
        title: "Footer card",
        sourcePath: "sidebar-footer-demo.tsx",
      },
      {
        title: "Keyboard shortcut",
        description:
          "Mod+B toggles the sidebar. Set `shortcut` to `false` to turn it off.",
        sourcePath: "sidebar-shortcut-demo.tsx",
      },
    ],
  },
  "drop-zone": {
    usage: "drop-zone-basic-demo.tsx",
    examples: [
      {
        title: "Accepted file types",
        description:
          "Use `getDropOperation` to cancel unsupported drops. Check each file type before adding files from either input.",
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
          "Return an error message from `validate`, or return `null` for a valid value.",
        sourcePath: "form-validation-demo.tsx",
      },
      {
        title: "Server errors",
        description:
          "Pass server errors to `validationErrors` with each field name as a key. Select Save to see a simulated error for `maya`.",
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
    summary:
      "Examples cover icons, buttons, notes, sizes, and disabled or invalid states.",
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
        description: "Set `size` on the TextField.",
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
    summary:
      "Build menus with actions, links, selection, submenus, and items from data.",
    usage: "menu-basic-demo.tsx",
    examples: [
      {
        title: "Submenus",
        description:
          "Place a `MenuItem` and a nested `Menu` inside `SubmenuTrigger`.",
        sourcePath: "menu-nested-demo.tsx",
      },
      {
        title: "Actions, links, and disabled items",
        description:
          "Use `onAction` for commands and `href` for links. Set `isDisabled` to make an item unavailable.",
        sourcePath: "menu-demo.tsx",
      },
      {
        title: "Single and multiple selection",
        description:
          'Set `selectionMode` to `"single"` or `"multiple"`. Use `defaultSelectedKeys` to set the initial selection.',
        sourcePath: "menu-selection-demo.tsx",
      },
      {
        title: "Selection by section",
        description:
          "Set `selectionMode` on each `MenuSection` to give each group its own selection.",
        sourcePath: "menu-sections-demo.tsx",
      },
      {
        title: "Items from data and popover placement",
        description:
          "Pass `items` to `MenuContent` and render a `MenuItem` for each entry. Set `placement` on `MenuPopover` and add a `PopoverArrow`.",
        sourcePath: "menu-placement-demo.tsx",
      },
    ],
  },
  "agent-steps": {
    usage: "agent-steps-demo.tsx",
    examples: [
      {
        title: "Auto collapse",
        description:
          "Use `autoCollapse` to close the steps when the run ends and open them when a new run starts.",
        sourcePath: "agent-steps-auto-collapse-demo.tsx",
      },
      {
        title: "Step content",
        description:
          "Children of `AgentStep` show below its title, for example sources or a `ToolCall`.",
        sourcePath: "agent-steps-content-demo.tsx",
      },
      {
        title: "Stopped and failed",
        sourcePath: "agent-steps-states-demo.tsx",
      },
    ],
  },
  message: {
    summary:
      "Examples cover both sides of a conversation and the system message that has no sender.",
    usage: "message-basic-demo.tsx",
    examples: [
      {
        title: "Sides",
        description:
          "Only an incoming message shows the sender. Actions show on hover or focus.",
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
    summary: "Examples cover groups, sizes, and disabled or invalid fields.",
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
          "Sizes smaller than `lg` expand the hit area to 44px on touch screens.",
        sourcePath: "pagination-sizes-demo.tsx",
      },
      {
        title: "Skipped pages",
        description:
          "Set `count` and `pageSize`; `PaginationPages` adds the pages and the ellipses.",
        sourcePath: "pagination-ellipsis-demo.tsx",
      },
      {
        title: "First and last pages",
        description:
          "Add `PaginationFirstTrigger` and `PaginationLastTrigger` to move to the ends.",
        sourcePath: "pagination-context-demo.tsx",
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
      {
        title: "Composition",
        description:
          "Compose the parts to place the controls. `InlineEditContext` reads the machine state.",
        sourcePath: "inline-edit-composition-demo.tsx",
      },
    ],
  },
  "password-field": {
    summary: "Examples cover disabled fields and a new password.",
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
      },
    ],
  },
  "otp-input": {
    usage: "otp-input-demo.tsx",
    examples: [
      {
        title: "Groups",
        description:
          "Use `OtpInputGroup` and `OtpInputSeparator` to split the code.",
        sourcePath: "otp-input-groups-demo.tsx",
      },
      {
        title: "Invalid",
        sourcePath: "otp-input-invalid-demo.tsx",
      },
      {
        title: "Letters and numbers",
        description: 'Set `pattern` to `"alphanumeric"` for recovery codes.',
        sourcePath: "otp-input-alphanumeric-demo.tsx",
      },
      {
        title: "Length",
        sourcePath: "otp-input-length-demo.tsx",
      },
      {
        title: "Sizes",
        sourcePath: "otp-input-sizes-demo.tsx",
      },
      {
        title: "Disabled",
        sourcePath: "otp-input-disabled-demo.tsx",
      },
      {
        title: "Clear button",
        description:
          "`OtpInputContext` gives the machine to custom UI, such as a clear button.",
        sourcePath: "otp-input-context-demo.tsx",
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
      },
      {
        title: "Hover preview",
        description:
          "Use PreviewTrigger from react-aria-components with a plain Popover, so hover does not move focus.",
        sourcePath: "popover-preview-demo.tsx",
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
      },
      {
        title: "Reordering",
        description:
          "At either end the control is disabled; move focus to the button that remains.",
        sourcePath: "presence-list-demo.tsx",
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
      },
      {
        title: "Attachments",
        description:
          "Set `onFilesDropped` to accept files dropped on the frame.",
        sourcePath: "prompt-input-attachments-demo.tsx",
      },
      {
        title: "Footer actions",
        sourcePath: "prompt-input-actions-demo.tsx",
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
      },
      {
        title: "Full transcript",
        description: "The second prompt fails once to show the error state.",
        sourcePath: "prompt-input-transcript-demo.tsx",
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
      },
      {
        title: "Sizes",
        sourcePath: "rating-input-sizes-demo.tsx",
      },
    ],
  },
  "radio-group": {
    summary:
      "Examples cover described options, horizontal layout, cards, and required or disabled options.",
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
      },
    ],
  },
  "segmented-control": {
    usage: "segmented-control-demo.tsx",
    examples: [
      {
        title: "Controlled",
        sourcePath: "segmented-control-controlled-demo.tsx",
      },
      {
        title: "Icons",
        description:
          "Set `aria-hidden` on each icon so the segment label stays the accessible name.",
        sourcePath: "segmented-control-icons-demo.tsx",
      },
      {
        title: "Sizes",
        description:
          "Set `size` on the control. It sets the outer height, so the control lines up with a button of the same size.",
        sourcePath: "segmented-control-sizes-demo.tsx",
      },
      {
        title: "Vertical",
        sourcePath: "segmented-control-vertical-demo.tsx",
      },
      {
        title: "Disabled",
        sourcePath: "segmented-control-disabled-demo.tsx",
      },
    ],
  },
  "range-calendar": {
    usage: "range-calendar-demo.tsx",
    examples: [
      {
        title: "Unavailable dates",
        description:
          "June 18 and 19 are unavailable. Set `allowsNonContiguousRanges` to let a range span those dates.",
        sourcePath: "range-calendar-limits-demo.tsx",
      },
      {
        title: "Controlled value",
        sourcePath: "range-calendar-controlled-demo.tsx",
      },
      {
        title: "Two months",
        description:
          "Set `visibleDuration` to `{ months: 2 }`. The months stack when space is limited.",
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
  resizable: {
    usage: "resizable-demo.tsx",
    examples: [
      {
        title: "Vertical",
        sourcePath: "resizable-vertical-demo.tsx",
      },
      {
        title: "Nested",
        sourcePath: "resizable-nested-demo.tsx",
      },
      {
        title: "Grip and limits",
        description: "Set `minSize` and `maxSize` on a panel to limit it.",
        sourcePath: "resizable-grip-demo.tsx",
      },
      {
        title: "Collapsible",
        description: "Press Enter on the handle to collapse the panel.",
        sourcePath: "resizable-collapsible-demo.tsx",
      },
      {
        title: "Saved layout",
        description:
          "Save the layout in `onLayoutEnd` and pass it back as `defaultLayout`.",
        sourcePath: "resizable-saved-demo.tsx",
      },
      {
        title: "Chat with a preview",
        sourcePath: "resizable-chat-demo.tsx",
      },
      {
        title: "Live sizes",
        description: "`ResizableContext` gives the splitter api to custom UI.",
        sourcePath: "resizable-context-demo.tsx",
      },
    ],
  },
  response: {
    usage: "response-demo.tsx",
    examples: [
      {
        title: "Actions",
        sourcePath: "response-actions-demo.tsx",
      },
      {
        title: "Stopped",
        description: "Select Continue to resume the response.",
        sourcePath: "response-stopped-demo.tsx",
      },
      {
        title: "Error",
        description:
          "Select Retry to finish the response after a simulated connection error.",
        sourcePath: "response-error-demo.tsx",
      },
      {
        title: "With reasoning",
        sourcePath: "response-reasoning-demo.tsx",
      },
    ],
  },
  "search-field": {
    summary: "Examples cover filtered results, sizes, and disabled fields.",
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
      },
    ],
  },
  slider: {
    summary:
      "Examples cover ranges, marks, vertical layout, custom layouts, and disabled state.",
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
        description: "Without a visible label, pass `aria-label` to Slider.",
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
          'Set `decorative` when adjacent text names the wait. Add `data-icon="inline-start"` for correct spacing.',
        sourcePath: "spinner-usage-demo.tsx",
      },
      {
        title: "Loading overlay",
        description:
          "Set `aria-busy` on the region while it loads, and keep the old content in place.",
        sourcePath: "spinner-overlay-demo.tsx",
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
    summary:
      "Examples cover descriptions, disabled and control-first layouts, and a custom layout.",
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
      },
      {
        title: "Selection actions",
        description: "Return the bulk actions from `renderSelectionActions`.",
        sourcePath: "data-table-selection-actions-demo.tsx",
      },
      {
        title: "Resizable columns and row actions",
        description:
          "Set `width` and `minWidth` for the starting widths, and `resizable` for the column handles. Use `onRowAction` to handle a row press.",
        sourcePath: "data-table-resizable-demo.tsx",
      },
      {
        title: "Footer summary",
        description:
          "`renderFooter` replaces the row count and page controls with your own summary.",
        sourcePath: "data-table-footer-demo.tsx",
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
      },
      {
        title: "Load more",
        description:
          "`TableLoadMoreItem` calls `onLoadMore` when it scrolls into view. The header stays at the top of the container.",
        sourcePath: "table-load-more-demo.tsx",
      },
      {
        title: "Footer",
        description: "`TableFooter` adds a summary row after the rows.",
        sourcePath: "table-footer-demo.tsx",
      },
    ],
  },
  tabs: {
    summary:
      "Examples cover icons, disabled tabs, vertical and overflowing lists, controlled selection, and sizes.",
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
          "Use `selectedKey` and `onSelectionChange` when the selected tab lives in a parent.",
        sourcePath: "tabs-controlled-demo.tsx",
      },
      {
        title: "Sizes",
        description:
          "Set `size` on the tab list. It sets the outer height, so the tab list lines up with a button of the same size.",
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
    summary:
      "Examples cover descriptions, sizes, read-only, disabled, and invalid states.",
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
    summary:
      "Examples cover sizes, descriptions, read-only, disabled, and invalid states.",
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
        description:
          "`delay` counts from the start, so the title begins before the label finishes.",
        sourcePath: "text-reveal-demo.tsx",
      },
    ],
  },
  "text-scramble": {
    usage: "text-scramble-basic-demo.tsx",
    examples: [
      {
        title: "Duration",
        sourcePath: "text-scramble-duration-demo.tsx",
      },
      {
        title: "Glyphs",
        description:
          "Use characters of equal width; a wide glyph shifts the line while the text resolves.",
        sourcePath: "text-scramble-demo.tsx",
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
      },
      {
        title: "Hiding focused content",
        description:
          "Move focus to the trigger first; the exiting panel is inert and hidden from assistive technology.",
        sourcePath: "presence-focus-demo.tsx",
      },
      {
        title: "Collapse",
        description:
          "Set `collapse` to animate the height, so the content below moves smoothly. Put padding on a child, not on `Presence`.",
        sourcePath: "presence-collapse-demo.tsx",
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
      },
      {
        title: "Width",
        description: "Set `w-fit` on `LayoutMorph` to animate the width.",
        sourcePath: "layout-morph-width-demo.tsx",
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
      {
        title: "Composition",
        description:
          "Compose the parts to add edge fades and your own pause button.",
        sourcePath: "marquee-composition-demo.tsx",
      },
    ],
  },
  "icon-swap": {
    usage: "icon-swap-demo.tsx",
    examples: [
      {
        title: "Toggle button",
        sourcePath: "icon-swap-toggle-demo.tsx",
      },
      {
        title: "Loading state",
        description: "Any element can be a child, such as a `Spinner`.",
        sourcePath: "icon-swap-loading-demo.tsx",
      },
    ],
  },
  "text-shimmer": {
    usage: "text-shimmer-demo.tsx",
    examples: [
      {
        title: "Agent steps",
        sourcePath: "text-shimmer-steps-demo.tsx",
      },
      {
        title: "Color",
        description:
          "Set the text color for the base and `--text-shimmer-highlight` for the highlight.",
        sourcePath: "text-shimmer-color-demo.tsx",
      },
    ],
  },
  "scroll-area": {
    usage: "scroll-area-demo.tsx",
    examples: [
      {
        title: "Horizontal",
        description:
          'Set `orientation` to `"horizontal"` to scroll one row sideways.',
        sourcePath: "scroll-area-horizontal-demo.tsx",
      },
      {
        title: "Both axes",
        description:
          'Set `orientation` to `"both"` to show a scrollbar for each axis.',
        sourcePath: "scroll-area-both-demo.tsx",
      },
      {
        title: "Scroll from a control",
        description:
          "Call `useScrollArea` in a child to read the position and scroll.",
        sourcePath: "scroll-area-to-top-demo.tsx",
      },
      {
        title: "Composition",
        description:
          "Compose the parts to place your own controls. `ScrollAreaContext` reads the progress.",
        sourcePath: "scroll-area-context-demo.tsx",
      },
    ],
  },
  "scroll-fade": {
    usage: "scroll-fade-demo.tsx",
    examples: [
      {
        title: "Horizontal",
        sourcePath: "scroll-fade-horizontal-demo.tsx",
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
      },
      {
        title: "Inline phrase",
        description:
          "The value is one box and does not wrap with the text around it. Keep it short.",
        sourcePath: "text-swap-inline-demo.tsx",
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
      },
    ],
  },
  highlighter: {
    usage: "highlighter-demo.tsx",
    examples: [
      {
        title: "Variants",
        sourcePath: "highlighter-variants-demo.tsx",
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
        description: "Enter 8:00 AM, then leave the field to see the error.",
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
    summary:
      "Examples cover status variants, actions, stacking, timeouts, and screen reader announcements.",
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
        title: "Multiple selection",
        description:
          'Set `selectionMode="multiple"` to let users select more than one toggle.',
        sourcePath: "toggle-button-group-editor-demo.tsx",
      },
      {
        title: "Sizes",
        description:
          "Set `size` on the group. It sets the outer height, so the group lines up with a button of the same size.",
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
        title: "Horizontal keyboard navigation",
        description:
          "Press Tab to enter the toolbar. Use Left Arrow and Right Arrow to move between controls.",
        sourcePath: "toolbar-demo.tsx",
      },
      {
        title: "Vertical orientation",
        description:
          'Set `orientation="vertical"` to stack the controls. Use Up Arrow and Down Arrow to move between them.',
        sourcePath: "toolbar-vertical-demo.tsx",
      },
      {
        title: "Shared control size",
        description:
          "Set `size` on the toolbar. Its buttons and toggle groups inherit that size.",
        sourcePath: "toolbar-sizes-demo.tsx",
      },
    ],
  },
  tooltip: {
    summary: "Examples cover placement, arrows, and tooltips on icon buttons.",
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
  tour: {
    usage: "tour-demo.tsx",
    examples: [
      {
        title: "Without spotlight",
        description: "Set `spotlight` to `false` to keep the page usable.",
        sourcePath: "tour-no-spotlight-demo.tsx",
      },
      {
        title: "Controlled step",
        sourcePath: "tour-controlled-demo.tsx",
      },
      {
        title: "Start on first visit",
        description:
          "Start the tour in an effect and save completion in `onComplete`.",
        sourcePath: "tour-first-visit-demo.tsx",
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
  "signature-pad": {
    usage: "signature-pad-demo.tsx",
    examples: [
      {
        title: "Captured image",
        description:
          "`onValueChange` receives a PNG data URL after each stroke ends.",
        sourcePath: "signature-pad-image-demo.tsx",
      },
      {
        title: "Read only",
        description:
          "Pass the paths from `onDrawEnd` to `defaultPaths`. Keep the drawing area's width and height when you display the saved paths.",
        sourcePath: "signature-pad-read-only-demo.tsx",
      },
      {
        title: "Invalid",
        sourcePath: "signature-pad-invalid-demo.tsx",
      },
      {
        title: "Composition",
        sourcePath: "signature-pad-composition-demo.tsx",
      },
    ],
  },
  "qr-code": {
    usage: "qr-code-demo.tsx",
    examples: [
      {
        title: "Logo overlay",
        description:
          "`overlay` defaults to error correction level H. Keep the logo small and check that the code scans.",
        sourcePath: "qr-code-overlay-demo.tsx",
      },
      {
        title: "Download",
        description:
          "The file includes a white background and a four-module quiet zone.",
        sourcePath: "qr-code-download-demo.tsx",
      },
      {
        title: "Dynamic value",
        description:
          "Validate the checkout link before you pass it to `QrCode`.",
        sourcePath: "qr-code-dynamic-demo.tsx",
      },
    ],
  },
} as const satisfies Record<string, ComponentPageSource>;

const usageSources = {
  toast: {
    code: `"use client";

import { Button } from "@/components/vip-ui/button";
import { showToast, ToastViewport } from "@/components/vip-ui/toast";

export function App() {
  return (
    <>
      <Button onPress={() => showToast({ title: "Draft saved" })}>
        Save draft
      </Button>
      <ToastViewport />
    </>
  );
}`,
    filename: "app.tsx",
    note: "Omit `ToastViewport` if your app already renders it.",
  },
  "event-calendar": {
    code: `"use client";

import { CalendarDate, CalendarDateTime, toZoned } from "@internationalized/date";
import {
  type CalendarEvent,
  EventCalendar,
} from "@/components/vip-ui/event-calendar";

const events: CalendarEvent[] = [
  {
    id: "design-review",
    title: "Design review",
    start: toZoned(new CalendarDateTime(2026, 11, 24, 10), "Europe/London"),
    end: toZoned(new CalendarDateTime(2026, 11, 24, 11), "Europe/London"),
    color: "chart-2",
  },
];

export function TeamWeek() {
  return (
    <EventCalendar
      aria-label="Team week"
      events={events}
      defaultDate={new CalendarDate(2026, 11, 24)}
      timeZone="Europe/London"
    />
  );
}`,
    filename: "team-week.tsx",
  },
  "agent-steps": {
    code: `import { AgentStep, AgentSteps } from "@/components/vip-ui/agent-steps";

export function ResearchRun() {
  return (
    <AgentSteps
      status="running"
      label="Checking the documentation"
      detail="Step 2 of 3"
    >
      <AgentStep
        title="Searched the component pages"
        description="Found 3 matches"
      />
      <AgentStep status="running" title="Reading the disclosure guide" />
      <AgentStep status="pending" title="Write the answer" />
    </AgentSteps>
  );
}`,
    filename: "research-run.tsx",
  },
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

export function DocumentationMenu() {
  return (
    <MenuTrigger>
      <Button variant="outline">Open menu</Button>
      <Menu aria-label="Documentation">
        <MenuItem href="/components/button">Button</MenuItem>
        <MenuItem href="/components/popover">Popover</MenuItem>
      </Menu>
    </MenuTrigger>
  );
}`,
    filename: "documentation-menu.tsx",
    note: "Place a trigger button and a `Menu` inside `MenuTrigger`. Give each command or link its own `MenuItem`.",
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
    code: `"use client";

import { PushPinIcon } from "@phosphor-icons/react";
import { ToggleButton } from "@/components/vip-ui/toggle-button";

export function PinButton() {
  return (
    <ToggleButton>
      <PushPinIcon data-icon="inline-start" aria-hidden="true" />
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
  "code-block": {
    code: `import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockBody,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/vip-ui/code-block";

const code = \`import { Button } from "@/components/vip-ui/button";

export function SaveButton() {
  const save = () => saveChanges();
  return <Button onPress={save}>Save changes</Button>;
}\`;

export function Snippet() {
  return (
    <CodeBlock code={code} language="tsx">
      <CodeBlockHeader>
        <CodeBlockTitle>button.tsx</CodeBlockTitle>
        <CodeBlockActions />
      </CodeBlockHeader>
      <CodeBlockBody />
    </CodeBlock>
  );
}`,
    filename: "snippet.tsx",
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
  "otp-input": {
    code: `import {
  OtpInput,
  OtpInputDescription,
  OtpInputLabel,
  OtpInputSlots,
} from "@/components/vip-ui/otp-input";

export function VerificationCode() {
  return (
    <OtpInput>
      <OtpInputLabel>Verification code</OtpInputLabel>
      <OtpInputSlots />
      <OtpInputDescription>
        Enter the code we sent to your phone.
      </OtpInputDescription>
    </OtpInput>
  );
}`,
    filename: "verification-code.tsx",
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
  carousel: {
    code: `import {
  Carousel,
  CarouselIndicators,
  CarouselNext,
  CarouselPrevious,
  CarouselSlide,
  CarouselViewport,
} from "@/components/vip-ui/carousel";

const photos = [
  { src: "/photos/ridge.jpg", alt: "A dark ridge at sunrise." },
  { src: "/photos/tide.jpg", alt: "Tide pools between rocks." },
  { src: "/photos/dunes.jpg", alt: "Ochre dunes after rain." },
];

export function TripPhotos() {
  return (
    <Carousel aria-label="Trip photos">
      <CarouselViewport>
        {photos.map((photo) => (
          <CarouselSlide key={photo.src}>
            <img src={photo.src} alt={photo.alt} className="rounded-xl" />
          </CarouselSlide>
        ))}
      </CarouselViewport>
      <div className="flex items-center justify-between gap-3">
        <CarouselPrevious />
        <CarouselIndicators />
        <CarouselNext />
      </div>
    </Carousel>
  );
}`,
    filename: "trip-photos.tsx",
    note: "Replace the example paths with your own image files. `opts` and `plugins` go straight to Embla. `useCarousel()` returns the Embla `api` and the selected index.",
  },
  lightbox: {
    code: `import { CarouselSlide } from "@/components/vip-ui/carousel";
import {
  Lightbox,
  LightboxContent,
  LightboxImage,
  LightboxTrigger,
} from "@/components/vip-ui/lightbox";

const photos = [
  { src: "/photos/ridge.jpg", alt: "A dark ridge at sunrise." },
  { src: "/photos/tide.jpg", alt: "Tide pools between rocks." },
];

export function TripPhotos() {
  return (
    <Lightbox>
      {photos.map((photo, index) => (
        <LightboxTrigger key={photo.src} index={index} aria-label={\`Open photo \${index + 1}\`}>
          <img src={photo.src} alt="" className="size-full object-cover" />
        </LightboxTrigger>
      ))}
      <LightboxContent>
        {photos.map((photo) => (
          <CarouselSlide key={photo.src}>
            <LightboxImage src={photo.src} alt={photo.alt} />
          </CarouselSlide>
        ))}
      </LightboxContent>
    </Lightbox>
  );
}`,
    filename: "trip-photos.tsx",
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
    code: `"use client";

import {
  Pagination,
  PaginationList,
  PaginationPages,
} from "@/components/vip-ui/pagination";

export function ResultsPagination() {
  return (
    <Pagination
      count={90}
      defaultPage={2}
      pageSize={10}
      getPageUrl={(details) => \`?page=\${details.page}\`}
      aria-label="Results"
    >
      <PaginationList>
        <PaginationPages />
      </PaginationList>
    </Pagination>
  );
}`,
    filename: "results-pagination.tsx",
  },
  "segmented-control": {
    code: `import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/vip-ui/segmented-control";

export function ProjectView() {
  return (
    <SegmentedControl aria-label="Project view" defaultValue="board">
      <SegmentedControlItem value="board">Board</SegmentedControlItem>
      <SegmentedControlItem value="list">List</SegmentedControlItem>
      <SegmentedControlItem value="timeline">
        Timeline
      </SegmentedControlItem>
    </SegmentedControl>
  );
}`,
    filename: "project-view.tsx",
    note: "Set `name` on the control to submit the value with a form. Each segment renders a hidden radio input.",
  },
  tabs: {
    code: `import {
  Tabs,
  TabPanel,
  TabList,
  Tab,
} from "@/components/vip-ui/tabs";

export function ProjectTabs() {
  return (
    <Tabs defaultSelectedKey="details">
      <TabList aria-label="Project">
        <Tab id="details">Details</Tab>
        <Tab id="activity">Activity</Tab>
      </TabList>
      <TabPanel id="details">Studio North is due October 18.</TabPanel>
      <TabPanel id="activity">No changes yet.</TabPanel>
    </Tabs>
  );
}`,
    filename: "project-tabs.tsx",
  },
  "icon-swap": {
    code: `"use client";

import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
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
  "scroll-area": {
    code: `import { ScrollArea } from "@/components/vip-ui/scroll-area";

export function Activity({ items }: { items: string[] }) {
  return (
    <ScrollArea className="h-64" aria-label="Activity">
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </ScrollArea>
  );
}`,
    filename: "activity.tsx",
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
    code: `"use client";

import { PresenceList } from "@/components/vip-ui/presence-list";

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
    code: `"use client";

import { ListBox, ListBoxItem } from "@/components/vip-ui/list-box";

const teams = [
  { id: "design", name: "Design" },
  { id: "engineering", name: "Engineering" },
  { id: "research", name: "Research" },
];

export function TeamPicker() {
  return (
    <ListBox aria-label="Team" items={teams} selectionMode="single">
      {(team) => <ListBoxItem id={team.id}>{team.name}</ListBoxItem>}
    </ListBox>
  );
}`,
    filename: "team-picker.tsx",
  },
  "grid-list": {
    code: `"use client";

import { GridList, GridListItem } from "@/components/vip-ui/grid-list";

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
  tour: {
    code: `"use client";

import { Button } from "@/components/vip-ui/button";
import { SearchField } from "@/components/vip-ui/search-field";
import { Tour, TourTarget, useTour } from "@/components/vip-ui/tour";

const steps = [
  { id: "search", title: "Find any project", description: "Search by name or client." },
  { id: "new", title: "Start a project", description: "Create it and invite the team." },
];

export function Workspace() {
  return (
    <Tour steps={steps}>
      <TourTarget id="search">
        <SearchField aria-label="Search projects" />
      </TourTarget>
      <TourTarget id="new">
        <Button>New project</Button>
      </TourTarget>
      <StartTour />
    </Tour>
  );
}

function StartTour() {
  const tour = useTour();
  return <Button onPress={() => tour.start()}>Start tour</Button>;
}`,
    filename: "workspace.tsx",
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
    code: `"use client";

import {
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
    code: `"use client";

import {
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
  sidebar: {
    code: `"use client";

import { HouseIcon, ReceiptIcon } from "@phosphor-icons/react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarInset,
  SidebarItem,
  SidebarMenu,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/vip-ui/sidebar";

export function AppShell() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu aria-label="Main">
              <SidebarItem
                href="/"
                icon={<HouseIcon aria-hidden="true" />}
                isCurrent
              >
                Overview
              </SidebarItem>
              <SidebarItem
                href="/orders"
                icon={<ReceiptIcon aria-hidden="true" />}
              >
                Orders
              </SidebarItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <SidebarTrigger />
      </SidebarInset>
    </SidebarProvider>
  );
}`,
    filename: "app-shell.tsx",
  },
  conversation: {
    code: `import {
  Conversation,
  ConversationContent,
  ConversationJump,
} from "@/components/vip-ui/conversation";
import { Message } from "@/components/vip-ui/message";
import { Response, ResponseContent } from "@/components/vip-ui/response";

export function Transcript() {
  return (
    <Conversation className="h-96">
      <ConversationContent className="grid gap-4 p-4">
        <Message sender="You" side="outgoing">
          Why did activation drop last week?
        </Message>
        <Response status="complete">
          <ResponseContent>
            Activation fell after v2.14 added the role picker.
          </ResponseContent>
        </Response>
      </ConversationContent>
      <ConversationJump />
    </Conversation>
  );
}`,
    filename: "transcript.tsx",
  },
  "data-table": {
    code: `"use client";

import {
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
    note: "On narrow layouts, the table scrolls horizontally.",
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
  resizable: {
    code: `import {
  ResizableGroup,
  ResizableHandle,
  ResizablePanel,
} from "@/components/vip-ui/resizable";

export function Workspace() {
  return (
    <ResizableGroup className="h-80">
      <ResizablePanel id="brief">
        <div className="p-4">Design brief</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel id="preview">
        <div className="p-4">Preview</div>
      </ResizablePanel>
    </ResizableGroup>
  );
}`,
    filename: "workspace.tsx",
  },
  "signature-pad": {
    code: `import { SignaturePad } from "@/components/vip-ui/signature-pad";

export function ContractSignature() {
  return (
    <SignaturePad
      label="Signature"
      description="Draw your signature above the line."
      name="signature"
    />
  );
}`,
    filename: "contract-signature.tsx",
  },
  "qr-code": {
    code: `import { QrCode } from "@/components/vip-ui/qr-code";

export function InstallLink() {
  return (
    <QrCode value="https://vip-ui.dev" label="QR code for vip-ui.dev" />
  );
}`,
    filename: "install-link.tsx",
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
