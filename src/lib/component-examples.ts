export interface ComponentExampleMetadata {
  title: string;
  description?: string;
  sourcePath: string;
  prerequisite?: string;
}

export interface ComponentPageData {
  usage: string;
  description: string;
  examples: readonly ComponentExampleMetadata[];
}

export const componentPageData = {
  button: {
    usage: "button-basic-demo.tsx",
    description: "Triggers an action.",
    examples: [
      {
        title: "Variants",
        sourcePath: "button-variants-demo.tsx",
      },
      {
        title: "Sizes",
        sourcePath: "button-sizes-demo.tsx",
      },
      {
        title: "With icon",
        description:
          "Put the icon before or after the label. Set aria-hidden on the icon so the label stays the accessible name.",
        sourcePath: "button-with-icon-demo.tsx",
      },
      {
        title: "Icon buttons",
        description:
          'Set size="icon" and give each button an aria-label. The label replaces the missing visible text.',
        sourcePath: "button-icon-demo.tsx",
      },
      {
        title: "Loading",
        description:
          "Set isPending while a task runs. The button keeps focus and ignores presses until isPending is false. Install Spinner separately.",
        sourcePath: "button-loading-demo.tsx",
      },
      {
        title: "Link",
        description:
          "ButtonLink renders an anchor that looks like a button. To use your router, pass its link component to the as prop. Install Button link separately.",
        sourcePath: "button-link-demo.tsx",
      },
    ],
  },
  select: {
    usage: "select-demo.tsx",
    description: "Selects one option from a list.",
    examples: [
      {
        title: "Described options",
        description:
          "Add a description inside each SelectItem. Set textValue to the option name, so the trigger shows only the name.",
        sourcePath: "select-descriptions-demo.tsx",
      },
      {
        title: "Disabled",
        description:
          "Use isDisabled to keep the current value visible and prevent changes.",
        sourcePath: "select-disabled-demo.tsx",
      },
      {
        title: "Invalid selection",
        description:
          "Use isInvalid while the controlled value is empty. The error clears when an option is selected.",
        sourcePath: "select-invalid-demo.tsx",
      },
    ],
  },
  dialog: {
    usage: "dialog-demo.tsx",
    description: "Shows a focused task above the page.",
    examples: [
      {
        title: "Alert dialog",
        description:
          'Set role="alertdialog" on DialogContent for a confirmation. Outside clicks do not close it. Escape and the buttons do.',
        sourcePath: "dialog-alert-demo.tsx",
      },
      {
        title: "Scrollable content",
        description:
          "Put long content inside DialogContent. The dialog scrolls, and the page behind it does not.",
        sourcePath: "dialog-scrollable-demo.tsx",
      },
      {
        title: "Controlled open state",
        description:
          "Control the dialog with isOpen and onOpenChange. Escape and outside clicks also call onOpenChange.",
        sourcePath: "dialog-controlled-demo.tsx",
      },
    ],
  },
  accordion: {
    usage: "accordion-demo.tsx",
    description: "Displays collapsible sections of related content.",
    examples: [
      {
        title: "Divided",
        description:
          'Set variant="divided" to separate sections with lines instead of cards. Use it inside a container that already has a surface.',
        sourcePath: "accordion-billing-demo.tsx",
      },
      {
        title: "Multiple open sections",
        description:
          "Set allowsMultipleExpanded to keep more than one section open. Use defaultExpandedKeys to open sections on the first render.",
        sourcePath: "accordion-multiple-demo.tsx",
      },
      {
        title: "Disabled section",
        description:
          "Set isDisabled on an AccordionItem. People cannot open or close that section.",
        sourcePath: "accordion-disabled-demo.tsx",
      },
    ],
  },
  alert: {
    usage: "alert-basic-demo.tsx",
    description: "Displays an inline message about a status or event.",
    examples: [
      {
        title: "Variants",
        description:
          'Set variant to "info", "success", "warning", "error", or "neutral". The icon shows the status, so color is not the only signal.',
        sourcePath: "alert-demo.tsx",
      },
      {
        title: "Action",
        description:
          "To add an action, build the alert from its parts. Put the text and the ButtonLink in a flex-wrap row, so the action moves below the text in a narrow alert. Install Button link separately.",
        sourcePath: "alert-action-demo.tsx",
      },
    ],
  },
  "animated-number": {
    usage: "animated-number-basic-demo.tsx",
    description: "Displays a number that animates when its value changes.",
    examples: [
      {
        title: "Digit slide",
        description:
          'Set variant="slide" to move only the digits that change. Digits slide up when the value increases and down when it decreases.',
        sourcePath: "animated-number-slide-demo.tsx",
      },
      {
        title: "Number format",
        description:
          "Set locale and formatOptions to show a currency, a percent, or a unit. The accessible text uses the same format.",
        sourcePath: "animated-number-format-demo.tsx",
      },
    ],
  },
  attachment: {
    usage: "attachment-basic-demo.tsx",
    description: "Displays a file's name, size, preview, and current state.",
    examples: [
      {
        title: "Adding and removing files",
        description:
          "Check the type and size of each file before you add it. Pass onRemove to show a remove button. Install Drop zone and File trigger separately.",
        sourcePath: "attachment-demo.tsx",
      },
    ],
  },
  autocomplete: {
    usage: "autocomplete-demo.tsx",
    description: "Filters a list from a search field as you type.",
    examples: [],
  },
  avatar: {
    usage: "avatar-basic-demo.tsx",
    description: "Displays an image or initials for a person.",
    examples: [
      {
        title: "Sizes",
        description:
          'Set size to "sm", "md", or "lg". The initials scale with the avatar.',
        sourcePath: "avatar-sizes-demo.tsx",
      },
      {
        title: "Fallback",
        description:
          'Avatar shows initials until the image loads, and when the image does not load. The initials come from the first two words of name. Set initials to change them, or set initials="" to show a person icon.',
        sourcePath: "avatar-fallback-demo.tsx",
      },
      {
        title: "Group",
        description:
          "Put avatars in AvatarGroup to overlap them, and give the group an aria-label. For people not shown, add an Avatar with a short count, such as +2, as its initials.",
        sourcePath: "avatar-demo.tsx",
      },
    ],
  },
  badge: {
    usage: "badge-basic-demo.tsx",
    description: "Shows a short label, status, or count.",
    examples: [
      {
        title: "Variants",
        description:
          'Set variant to "neutral", "accent", "success", "warning", "error", or "outline".',
        sourcePath: "badge-variants-demo.tsx",
      },
      {
        title: "Dot",
        description:
          "Set dot to show a status marker before the label. Screen readers do not read the dot, so the label must name the status.",
        sourcePath: "badge-demo.tsx",
      },
    ],
  },
  breadcrumbs: {
    usage: "breadcrumbs-demo.tsx",
    description: "Displays a path of links to the current page.",
    examples: [],
  },
  "button-group": {
    usage: "button-group-basic-demo.tsx",
    description:
      "Joins related buttons into one row or column. Each button stays in the Tab order.",
    examples: [
      {
        title: "Orientations",
        description:
          'The default orientation is a row. Set orientation="vertical" for a column.',
        sourcePath: "button-group-orientations-demo.tsx",
      },
      {
        title: "Split button",
        description:
          "Put a MenuTrigger in the group for more actions. Give the icon button an aria-label. Install Menu separately.",
        sourcePath: "button-group-demo.tsx",
      },
    ],
  },
  calendar: {
    usage: "calendar-demo.tsx",
    description: "Displays a calendar for selecting a date.",
    examples: [
      {
        title: "Unavailable dates",
        description:
          "Use isDateUnavailable to mark dates unavailable. Set minValue and maxValue to limit the selectable range.",
        sourcePath: "calendar-unavailable-demo.tsx",
      },
      {
        title: "Controlled value",
        description:
          "Control the selected date with the value and onChange props.",
        sourcePath: "calendar-controlled-demo.tsx",
      },
    ],
  },
  card: {
    usage: "card-basic-demo.tsx",
    description: "Displays a card with a header, content, and footer.",
    examples: [
      {
        title: "Action",
        description:
          "Put CardAction in CardHeader to show a control beside the title. The action uses up to half the header width.",
        sourcePath: "card-action-demo.tsx",
      },
      {
        title: "Form",
        description:
          "Wrap CardContent and CardFooter in a Form so the footer button submits the fields. Install Form and Text field separately.",
        sourcePath: "card-demo.tsx",
      },
    ],
  },
  checkbox: {
    usage: "checkbox-basic-demo.tsx",
    description: "Selects or clears one option.",
    examples: [
      {
        title: "Description",
        description:
          "Set description to show help below the label. Screen readers announce it after the label.",
        sourcePath: "checkbox-description-demo.tsx",
      },
      {
        title: "Required",
        description:
          "Set isRequired inside a Form. The error shows after the first submit and clears when the box is checked. Set errorMessage to replace the browser message.",
        sourcePath: "checkbox-required-demo.tsx",
      },
      {
        title: "Indeterminate",
        description:
          "Set isIndeterminate when only some child options are selected. Point aria-controls at the options it controls.",
        sourcePath: "checkbox-demo.tsx",
      },
      {
        title: "Disabled",
        description:
          "Use isDisabled to keep the option visible and prevent changes.",
        sourcePath: "checkbox-disabled-demo.tsx",
      },
    ],
  },
  "checkbox-group": {
    usage: "checkbox-group-demo.tsx",
    description: "Groups checkboxes for selecting multiple options.",
    examples: [
      {
        title: "Disabled",
        description: "Set isDisabled on CheckboxGroup to disable every option.",
        sourcePath: "checkbox-group-disabled-demo.tsx",
      },
      {
        title: "Required",
        description:
          "Set isRequired inside a Form to ask for at least one option. The error shows after the first submit.",
        sourcePath: "checkbox-group-required-demo.tsx",
      },
      {
        title: "Custom layout",
        description:
          "Compose CheckboxGroupLabel, CheckboxGroupItems, and CheckboxGroupError to change the layout. Here the options sit in a row.",
        sourcePath: "checkbox-group-layout-demo.tsx",
      },
    ],
  },
  "color-field": {
    usage: "color-field-demo.tsx",
    description: "Accepts a hex color, or one color channel as a number.",
    examples: [
      {
        title: "Single channel",
        description:
          "Set colorSpace and channel to edit one channel as a number.",
        sourcePath: "color-field-channel-demo.tsx",
      },
      {
        title: "Disabled",
        description:
          "Use isDisabled to keep the current value visible and prevent changes.",
        sourcePath: "color-field-disabled-demo.tsx",
      },
      {
        title: "Controlled value",
        description:
          "Control the color with value and onChange. A ColorSwatch shows the current value. Install Color swatch separately.",
        sourcePath: "color-field-controlled-demo.tsx",
      },
    ],
  },
  "color-picker": {
    usage: "color-picker-demo.tsx",
    description:
      "Selects a color with a color area, a hue slider, and a hex field.",
    examples: [
      {
        title: "Controlled value",
        description:
          "Control the color with value and onChange. The trigger swatch, area, hue slider, and hex field stay in sync.",
        sourcePath: "color-picker-controlled-demo.tsx",
      },
    ],
  },
  "color-swatch": {
    usage: "color-swatch-basic-demo.tsx",
    description: "Displays a sample of a color.",
    examples: [
      {
        title: "Named palette",
        description:
          'Set colorName to give each swatch an accessible name. Without it, the swatch uses a generated name, such as "vibrant red".',
        sourcePath: "color-swatch-demo.tsx",
      },
      {
        title: "Transparency",
        description:
          "A checkerboard shows behind a color with an alpha value below 1.",
        sourcePath: "color-swatch-transparency-demo.tsx",
      },
    ],
  },
  "color-swatch-picker": {
    usage: "color-swatch-picker-demo.tsx",
    description: "Selects a color from a set of swatches.",
    examples: [
      {
        title: "Disabled",
        description:
          "Set isDisabled on a ColorSwatchPickerItem to make one color unavailable.",
        sourcePath: "color-swatch-picker-disabled-demo.tsx",
      },
      {
        title: "Controlled value",
        description:
          "Control the selected color with value and onChange. Give each item an aria-label.",
        sourcePath: "color-swatch-picker-controlled-demo.tsx",
      },
    ],
  },
  "combo-box": {
    usage: "combo-box-basic-demo.tsx",
    description: "Selects options from a list that filters as you type.",
    examples: [
      {
        title: "Described options",
        description:
          "Add a description inside each ComboBoxItem. Set textValue to the option name for filtering.",
        sourcePath: "combo-box-demo.tsx",
      },
      {
        title: "Disabled",
        description:
          "Use isDisabled to keep the current value visible and prevent changes.",
        sourcePath: "combo-box-disabled-demo.tsx",
      },
      {
        title: "Multiple selection",
        description:
          'Set selectionMode="multiple". Control the selected array with value and onChange.',
        sourcePath: "combo-box-multiple-demo.tsx",
      },
    ],
  },
  "command-palette": {
    usage: "command-palette-basic-demo.tsx",
    description: "Shows a dialog to search and run commands.",
    examples: [
      {
        title: "Sections and icons",
        description:
          "Put related items in a CommandPaletteSection. When an item has an icon, set textValue so that search can find it.",
        sourcePath: "command-palette-demo.tsx",
      },
    ],
  },
  "context-menu": {
    usage: "context-menu-demo.tsx",
    description:
      "Shows actions for an item, opened by right-click, long press, or keyboard.",
    examples: [
      {
        title: "Grouped actions",
        description:
          "Use ContextMenuSeparator to group actions. Set isDisabled to show an action that is not available.",
        sourcePath: "context-menu-grouped-demo.tsx",
      },
    ],
  },
  "copy-button": {
    usage: "copy-button-demo.tsx",
    description: "Copies a value to the clipboard and shows the result.",
    examples: [
      {
        title: "Custom label and icon button",
        description:
          'Pass a function as children to show a label for each status. Set size="icon" for an icon-only button, and give it an aria-label.',
        sourcePath: "copy-button-share-demo.tsx",
      },
    ],
  },
  "date-field": {
    usage: "date-field-demo.tsx",
    description: "Accepts a date, with one segment for each part.",
    examples: [
      {
        title: "Minimum and maximum",
        description:
          "Set minValue and maxValue to limit the date. A date outside the limits shows an error when the field loses focus.",
        sourcePath: "date-field-limits-demo.tsx",
      },
      {
        title: "Date and time",
        description:
          "Pass a CalendarDateTime value to add time segments. Set granularity to change the smallest segment.",
        sourcePath: "date-field-time-demo.tsx",
      },
      {
        title: "Disabled",
        description:
          "Use isDisabled to keep the current value visible and prevent changes.",
        sourcePath: "date-field-disabled-demo.tsx",
      },
    ],
  },
  "date-picker": {
    usage: "date-picker-demo.tsx",
    description: "Accepts a date that you type or select from a calendar.",
    examples: [
      {
        title: "Unavailable dates",
        description:
          "Use isDateUnavailable to mark dates unavailable. Set minValue and maxValue to limit the selectable range.",
        sourcePath: "date-picker-unavailable-demo.tsx",
      },
      {
        title: "Disabled",
        description:
          "Use isDisabled to keep the current value visible and prevent changes.",
        sourcePath: "date-picker-disabled-demo.tsx",
      },
      {
        title: "Controlled value",
        description:
          "Control the selected date with the value and onChange props.",
        sourcePath: "date-picker-controlled-demo.tsx",
      },
    ],
  },
  "date-range-picker": {
    usage: "date-range-picker-demo.tsx",
    description:
      "Accepts a date range that you type or select from a calendar.",
    examples: [
      {
        title: "Unavailable dates",
        description:
          "Use isDateUnavailable to mark dates unavailable. Set minValue and maxValue to limit the selectable range. A range cannot include an unavailable date unless you set allowsNonContiguousRanges.",
        sourcePath: "date-range-picker-limits-demo.tsx",
      },
      {
        title: "Disabled",
        description:
          "Use isDisabled to keep the current value visible and prevent changes.",
        sourcePath: "date-range-picker-disabled-demo.tsx",
      },
    ],
  },
  "description-list": {
    usage: "description-list-demo.tsx",
    description: "Displays pairs of terms and details.",
    examples: [
      {
        title: "Inline components",
        description:
          "Put a Badge, Link, or other inline component in DescriptionDetail. Long values wrap inside the detail column. Install Badge and Link separately.",
        sourcePath: "description-list-components-demo.tsx",
      },
    ],
  },
  disclosure: {
    usage: "disclosure-demo.tsx",
    description: "Shows or hides a section of content.",
    examples: [
      {
        title: "Expanded by default",
        description:
          "Set defaultExpanded to show the panel on the first render. People can still close it.",
        sourcePath: "disclosure-expanded-demo.tsx",
      },
      {
        title: "Disabled",
        description: "Set isDisabled. People cannot open or close the panel.",
        sourcePath: "disclosure-disabled-demo.tsx",
      },
    ],
  },
  sheet: {
    usage: "sheet-basic-demo.tsx",
    description: "Displays a panel that slides in from the edge of the screen.",
    examples: [
      {
        title: "Snap points",
        description:
          'Set snapPoints to the visible size at each stop. The sheet opens at the first stop. Here, "100%" shows all of the sheet and "40dvh" adds a shorter stop.',
        sourcePath: "sheet-demo.tsx",
      },
      {
        title: "Edge placement",
        description:
          "Set position to choose the edge. To close the sheet, swipe it or drag the handle toward that edge.",
        sourcePath: "sheet-placement-demo.tsx",
      },
      {
        title: "Nested sheets",
        description:
          "Put a SheetTrigger inside a Sheet to open a second sheet on top. Escape and outside clicks close the top sheet first. To close the nested sheet after an action, control its SheetTrigger.",
        sourcePath: "sheet-nested-demo.tsx",
      },
    ],
  },
  "drop-zone": {
    usage: "drop-zone-basic-demo.tsx",
    description: "Accepts files that you drag onto it.",
    examples: [
      {
        title: "Accepted file types",
        description:
          "Use getDropOperation to accept or cancel a drop. Add a FileTrigger so users can also choose files. Install File trigger separately.",
        sourcePath: "drop-zone-demo.tsx",
      },
    ],
  },
  "empty-state": {
    usage: "empty-state-demo.tsx",
    description: "Displays a message when there is no content to show.",
    examples: [
      {
        title: "Without an action",
        description: "Leave out EmptyStateActions when there is no next step.",
        sourcePath: "empty-state-no-action-demo.tsx",
      },
    ],
  },
  fieldset: {
    usage: "fieldset-demo.tsx",
    description: "Groups related form controls under a legend.",
    examples: [],
  },
  "file-trigger": {
    usage: "file-trigger-basic-demo.tsx",
    description: "Opens a file picker from a button or other trigger.",
    examples: [
      {
        title: "Multiple images",
        description:
          "Set allowsMultiple to select more than one file. acceptedFileTypes only filters the picker. Check each file in onSelect.",
        sourcePath: "file-trigger-demo.tsx",
      },
    ],
  },
  form: {
    usage: "form-demo.tsx",
    description: "Groups fields and handles validation and submission.",
    examples: [
      {
        title: "Custom validation",
        description:
          "Pass validate to a field. Return an error message, or null when the value is valid. The error shows or clears when the field loses focus or when you submit.",
        sourcePath: "form-validation-demo.tsx",
      },
      {
        title: "Server errors",
        description:
          'Pass server errors to validationErrors, keyed by field name. Push Save to see the error for "maya". The error clears when you change the value and leave the field.',
        sourcePath: "form-server-errors-demo.tsx",
      },
    ],
  },
  "grid-list": {
    usage: "grid-list-demo.tsx",
    description: "Displays a collection of interactive rows.",
    examples: [
      {
        title: "Unavailable row",
        description:
          "Set isDisabled on a row that users cannot select. Show the reason in the row.",
        sourcePath: "grid-list-disabled-demo.tsx",
      },
    ],
  },
  "input-group": {
    usage: "input-group-basic-demo.tsx",
    description: "Groups an input with related text, icons, or actions.",
    examples: [
      {
        title: "Icon",
        description:
          "Put an icon in InputGroupAddon. Set aria-hidden on the icon so the label stays the accessible name.",
        sourcePath: "input-group-icon-demo.tsx",
      },
      {
        title: "Button",
        description:
          "Put a submit Button in InputGroupAddon. Disable it until the input has a value.",
        sourcePath: "input-group-demo.tsx",
      },
      {
        title: "Text area",
        description:
          'Use InputGroupTextArea in a TextArea. Set align="block-end" on InputGroupAddon to add a row below the text.',
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
          "Set isInvalid on the TextField and add TextFieldError. InputGroup inherits the state.",
        sourcePath: "input-group-invalid-demo.tsx",
      },
    ],
  },
  "kbd-code": {
    usage: "kbd-code-demo.tsx",
    description: "Displays keyboard keys and inline code in text.",
    examples: [
      {
        title: "Key combination",
        description:
          "Put each key in a Kbd, and put the keys of one shortcut in KbdGroup. The outer kbd element marks the keys as one combination.",
        sourcePath: "kbd-code-group-demo.tsx",
      },
      {
        title: "Long code",
        description:
          "InlineCode breaks a long value to fit the line. Each line keeps its padding and rounded corners.",
        sourcePath: "kbd-code-wrap-demo.tsx",
      },
    ],
  },
  link: {
    usage: "link-demo.tsx",
    description: "Displays a link to another page or location.",
    examples: [
      {
        title: "External link",
        description:
          'Set target="_blank" to open the page in a new tab. Add hidden text that tells screen reader users about the new tab.',
        sourcePath: "link-external-demo.tsx",
      },
    ],
  },
  "list-box": {
    usage: "list-box-demo.tsx",
    description: "Displays a list of options for selection.",
    examples: [
      {
        title: "Multiple selection",
        description:
          'Set selectionMode="multiple" to select more than one option. Use defaultSelectedKeys to set the initial selection.',
        sourcePath: "list-box-multiple-demo.tsx",
      },
    ],
  },
  menu: {
    usage: "menu-basic-demo.tsx",
    description: "Opens a list of actions from a trigger.",
    examples: [
      {
        title: "Icons and shortcuts",
        description:
          "Put an icon before the label and a Kbd after it. Kbd only shows the shortcut. Add the key handler yourself.",
        sourcePath: "menu-demo.tsx",
      },
      {
        title: "Nested menu",
        description:
          "Wrap a MenuItem and a MenuPopover in SubmenuTrigger. The submenu opens next to the menu, or below the item on small screens.",
        sourcePath: "menu-nested-demo.tsx",
      },
      {
        title: "Selection",
        description:
          'Set selectionMode to "single" or "multiple". Control the value with selectedKeys and onSelectionChange.',
        sourcePath: "menu-selection-demo.tsx",
      },
    ],
  },
  "agent-status": {
    usage: "agent-status-demo.tsx",
    description: "Shows the current step of an agent and its state.",
    examples: [
      {
        title: "States",
        description:
          'Set state to "thinking", "working", "complete", or "error". Screen readers announce each change.',
        sourcePath: "agent-status-states-demo.tsx",
      },
    ],
  },
  message: {
    usage: "message-basic-demo.tsx",
    description: "Displays a message in a conversation.",
    examples: [
      {
        title: "Sides",
        description:
          'Set side to "incoming", "outgoing", or "system". A system message shows no sender or avatar. Put buttons in actions.',
        sourcePath: "message-demo.tsx",
      },
    ],
  },
  meter: {
    usage: "meter-basic-demo.tsx",
    description: "Displays a value within a known range.",
    examples: [
      {
        title: "Value label",
        description:
          "Set valueLabel to show the reading in your own units. Screen readers read this text as the value.",
        sourcePath: "meter-demo.tsx",
      },
    ],
  },
  "native-select": {
    usage: "native-select-demo.tsx",
    description: "Selects one option with the native HTML select.",
    examples: [
      {
        title: "Groups",
        description:
          "Wrap options in optgroup to group them. Set disabled on an option that is not available.",
        sourcePath: "native-select-groups-demo.tsx",
      },
      {
        title: "Disabled",
        description:
          "Set disabled to keep the current value visible and prevent changes.",
        sourcePath: "native-select-disabled-demo.tsx",
      },
      {
        title: "Invalid selection",
        description:
          "Set error to show a message below the field and mark it invalid. The example checks the value when you submit. Install Form separately.",
        sourcePath: "native-select-invalid-demo.tsx",
      },
    ],
  },
  "number-field": {
    usage: "number-field-basic-demo.tsx",
    description: "Accepts a number, with buttons to increase and decrease it.",
    examples: [
      {
        title: "Minimum and maximum",
        description:
          "Set minValue and maxValue to limit the value. The buttons stop at each limit.",
        sourcePath: "number-field-limits-demo.tsx",
      },
      {
        title: "Currency formatting",
        description:
          "Use formatOptions for currency and step to set the increment.",
        sourcePath: "number-field-currency-demo.tsx",
      },
      {
        title: "Disabled",
        description:
          "Use isDisabled to keep the current value visible and prevent changes.",
        sourcePath: "number-field-disabled-demo.tsx",
      },
    ],
  },
  pagination: {
    usage: "pagination-basic-demo.tsx",
    description: "Displays links between pages of results.",
    examples: [
      {
        title: "URL-synced pages",
        description:
          "Keep the page number in the URL, so that the Back button and shared links work. Set isDisabled on Previous at the first page and on Next at the last page.",
        sourcePath: "pagination-demo.tsx",
      },
    ],
  },
  "inline-edit": {
    usage: "inline-edit-basic-demo.tsx",
    description: "Edits text in place and keeps the draft when saving fails.",
    examples: [
      {
        title: "Disabled",
        description: "Use isDisabled to show the value without an edit action.",
        sourcePath: "inline-edit-disabled-demo.tsx",
      },
      {
        title: "Save error",
        description:
          "Throw an error from onSave to keep the editor open. The error message shows below the field.",
        sourcePath: "inline-edit-demo.tsx",
      },
    ],
  },
  "password-strength-meter": {
    usage: "password-strength-meter-demo.tsx",
    description: "Estimates password strength from length and character mix.",
    examples: [
      {
        title: "With password field",
        description:
          "Pass the field value to password. Install Password field separately.",
        sourcePath: "password-strength-meter-field-demo.tsx",
      },
    ],
  },
  "password-field": {
    usage: "password-field-basic-demo.tsx",
    description: "Accepts a password, with a button to show or hide it.",
    examples: [
      {
        title: "Disabled",
        description:
          "Use isDisabled to prevent input. The reveal button is also disabled.",
        sourcePath: "password-field-disabled-demo.tsx",
      },
      {
        title: "New password",
        description:
          'Set autoComplete="new-password" and minLength. The field shows an error on submit when the password is too short. Install Form separately.',
        sourcePath: "password-field-demo.tsx",
      },
    ],
  },
  popover: {
    usage: "popover-demo.tsx",
    description: "Shows content in a panel next to its trigger.",
    examples: [
      {
        title: "Placement and arrow",
        description:
          "Set placement to top, bottom, left, or right. If there is not sufficient space, the panel moves to the opposite side. Add PopoverArrow to point at the trigger. It follows the side the panel opens on.",
        sourcePath: "popover-placement-demo.tsx",
      },
      {
        title: "Form",
        description:
          'PopoverDialog passes close to a function child. Call it after the form submits. A Button with slot="close" closes the popover without submitting. Send stays disabled until the field has text. Focus moves to the field with autoFocus and returns to the trigger on close. Install Text area separately.',
        sourcePath: "popover-form-demo.tsx",
      },
      {
        title: "Hover preview",
        description:
          "Wrap a link and a Popover in PreviewTrigger from react-aria-components. The preview opens after a delay on hover or keyboard focus, and on long press with touch. Tab moves into the preview. Put content directly in the Popover and label it with aria-labelledby. A PopoverDialog would move focus on hover. Install Avatar and Link separately.",
        sourcePath: "popover-preview-demo.tsx",
      },
    ],
  },
  "presence-list": {
    usage: "presence-list-basic-demo.tsx",
    description:
      "Displays a list that animates items when you add, remove, or move them.",
    examples: [
      {
        title: "Adding and reordering",
        description:
          "Pass items and getKey so rows keep their identity when they enter, leave, or move. The example moves focus before a focused button is removed or disabled.",
        sourcePath: "presence-list-demo.tsx",
      },
    ],
  },
  "progress-bar": {
    usage: "progress-bar-basic-demo.tsx",
    description: "Displays the progress of a task in a horizontal bar.",
    examples: [
      {
        title: "Known and unknown progress",
        description:
          "Set value when you know the progress. Set isIndeterminate when you do not. An indeterminate bar shows no value.",
        sourcePath: "progress-bar-demo.tsx",
      },
    ],
  },
  "progress-ring": {
    usage: "progress-ring-basic-demo.tsx",
    description: "Displays the progress of a task in a circular indicator.",
    examples: [
      {
        title: "Known and unknown progress",
        description:
          "Set value when you know the progress. Set isIndeterminate when you do not. Set showValue={false} to hide the value in the center.",
        sourcePath: "progress-ring-demo.tsx",
      },
    ],
  },
  "rating-input": {
    usage: "rating-input-demo.tsx",
    description: "Selects a star rating with radio controls.",
    examples: [
      {
        title: "Read only",
        description: "Use isReadOnly to show a rating that cannot change.",
        sourcePath: "rating-input-read-only-demo.tsx",
      },
    ],
  },
  "radio-group": {
    usage: "radio-group-demo.tsx",
    description: "Groups radio buttons for selecting one option.",
    examples: [
      {
        title: "Described options",
        description:
          "Set description on each Radio to show help below its label.",
        sourcePath: "radio-group-description-demo.tsx",
      },
      {
        title: "Horizontal",
        description:
          'Set orientation="horizontal" to show the options in a row.',
        sourcePath: "radio-group-horizontal-demo.tsx",
      },
      {
        title: "Card options",
        description:
          'Set variant="card" when each choice needs a label and description. The whole card selects the option. Compose RadioGroupLabel and RadioGroupItems to change the gap.',
        sourcePath: "radio-group-card-demo.tsx",
      },
      {
        title: "Disabled",
        description:
          "Set isDisabled on a Radio to make one option unavailable. Set it on RadioGroup to disable all options.",
        sourcePath: "radio-group-disabled-demo.tsx",
      },
      {
        title: "Required",
        description:
          "Set isRequired inside a Form. The error shows after the first submit and clears when an option is selected.",
        sourcePath: "radio-group-required-demo.tsx",
      },
    ],
  },
  "range-calendar": {
    usage: "range-calendar-demo.tsx",
    description: "Displays a calendar for selecting a date range.",
    examples: [
      {
        title: "Unavailable dates",
        description:
          "Use isDateUnavailable to mark dates unavailable. Set minValue and maxValue to limit the selectable range. A range cannot include an unavailable date unless you set allowsNonContiguousRanges.",
        sourcePath: "range-calendar-limits-demo.tsx",
      },
      {
        title: "Controlled value",
        description:
          "Control the selected range with the value and onChange props.",
        sourcePath: "range-calendar-controlled-demo.tsx",
      },
    ],
  },
  "search-field": {
    usage: "search-field-basic-demo.tsx",
    description: "Accepts a search query, with a button to clear it.",
    examples: [
      {
        title: "Disabled",
        description: "Use isDisabled to prevent input.",
        sourcePath: "search-field-disabled-demo.tsx",
      },
      {
        title: "Filtered results",
        description:
          "Control the query with value and onChange. SearchFieldClear resets the query and the list.",
        sourcePath: "search-field-demo.tsx",
      },
    ],
  },
  separator: {
    usage: "separator-demo.tsx",
    description: "Separates sections of content with a line.",
    examples: [
      {
        title: "Vertical",
        description:
          'Set orientation="vertical" inside a flex row. The line takes the height of the row.',
        sourcePath: "separator-vertical-demo.tsx",
      },
    ],
  },
  skeleton: {
    usage: "skeleton-basic-demo.tsx",
    description: "Displays a placeholder while content loads.",
    examples: [
      {
        title: "Card",
        description:
          "Match each Skeleton to the size and shape of the content it replaces. Skeleton is hidden from screen readers, so put a loading message in an output.",
        sourcePath: "skeleton-demo.tsx",
      },
      {
        title: "Loading state",
        description:
          "Show the content in place of the skeletons when it loads. Keep the same size so the layout does not move. Install Avatar separately.",
        sourcePath: "skeleton-loading-demo.tsx",
      },
    ],
  },
  slider: {
    usage: "slider-demo.tsx",
    description: "Selects a value or range on a track.",
    examples: [
      {
        title: "Range",
        description:
          "Pass an array to defaultValue for two SliderHandles. Give each handle an aria-label.",
        sourcePath: "slider-range-demo.tsx",
      },
      {
        title: "Step",
        description:
          "Set step to change the increment. Use formatOptions to format the value.",
        sourcePath: "slider-step-demo.tsx",
      },
      {
        title: "Disabled",
        description:
          "Use isDisabled to keep the current value visible and prevent changes.",
        sourcePath: "slider-disabled-demo.tsx",
      },
    ],
  },
  spinner: {
    usage: "spinner-basic-demo.tsx",
    description: "Displays an indeterminate loading indicator.",
    examples: [
      {
        title: "Variants",
        description: 'Set variant to "ring", "segments", or "dots".',
        sourcePath: "spinner-demo.tsx",
      },
      {
        title: "Sizes",
        description:
          'Set size to "xs", "sm", "md", "lg", or "xl". The spinner draws with the current text color.',
        sourcePath: "spinner-sizes-demo.tsx",
      },
      {
        title: "Loading in context",
        description:
          'Set isPending on a Button and put a size="sm" Spinner inside it. Set decorative when text next to the spinner names the wait.',
        sourcePath: "spinner-usage-demo.tsx",
      },
    ],
  },
  stat: {
    usage: "stat-demo.tsx",
    description: "Displays a labeled value with supporting details.",
    examples: [
      {
        title: "Trend",
        description:
          "Put a Badge in StatDetail to show the change. Include a plus or minus sign so the direction does not depend on color. Install Badge separately.",
        sourcePath: "stat-trend-demo.tsx",
      },
    ],
  },
  stepper: {
    usage: "stepper-basic-demo.tsx",
    description: "Shows the current and completed steps in a sequence.",
    examples: [
      {
        title: "Controlled step",
        description:
          "Keep currentStep in state and change it from your own buttons.",
        sourcePath: "stepper-demo.tsx",
      },
    ],
  },
  switch: {
    usage: "switch-basic-demo.tsx",
    description: "Turns a setting on or off.",
    examples: [
      {
        title: "Description",
        description:
          "Set description to show help below the label. Screen readers announce it after the label.",
        sourcePath: "switch-description-demo.tsx",
      },
      {
        title: "Disabled",
        description:
          "Use isDisabled for a setting that the user cannot change.",
        sourcePath: "switch-disabled-demo.tsx",
      },
      {
        title: "Custom layout",
        description:
          "Compose SwitchField, SwitchButton, and the other parts to style each piece. Keep SwitchDescription outside SwitchButton so it is read as a description, not as part of the label.",
        sourcePath: "switch-demo.tsx",
      },
    ],
  },
  "data-table": {
    usage: "data-table-demo.tsx",
    description:
      "Displays rows with search, filters, sorting, selection, and pagination.",
    examples: [
      {
        title: "Column filters",
        description:
          "Set filter on a column to add a text or select filter. The column also needs sortValue.",
        sourcePath: "data-table-column-filters-demo.tsx",
      },
    ],
  },
  table: {
    usage: "table-basic-demo.tsx",
    description: "Displays data in rows and columns.",
    examples: [
      {
        title: "Selectable projects",
        description: 'Set selectionMode="single" to select one row.',
        sourcePath: "table-demo.tsx",
      },
      {
        title: "Sortable columns",
        description:
          "Set allowsSorting on each sortable Column. Table does not sort the rows. Sort them in onSortChange and pass sortDescriptor back.",
        sourcePath: "table-sorting-demo.tsx",
      },
      {
        title: "Filter invoices",
        description:
          "Filter the rows with a controlled SearchField and Select. renderEmptyState shows a message when no rows match.",
        sourcePath: "table-filter-demo.tsx",
      },
    ],
  },
  tabs: {
    usage: "tabs-basic-demo.tsx",
    description: "Displays one panel of related content at a time.",
    examples: [
      {
        title: "With icons",
        description:
          "Put an icon before the label in TabsTrigger. Set aria-hidden on the icon so the label stays the tab's name.",
        sourcePath: "tabs-demo.tsx",
      },
      {
        title: "Disabled tab",
        description:
          "Set isDisabled on a TabsTrigger to keep an unavailable tab visible. The arrow keys skip it.",
        sourcePath: "tabs-disabled-demo.tsx",
      },
      {
        title: "Vertical",
        description:
          'Set orientation="vertical" to show the tabs in a column next to the panel. In a narrow space, the panel moves below the tabs. The Up and Down arrow keys move between tabs.',
        sourcePath: "tabs-vertical-demo.tsx",
      },
      {
        title: "Many tabs",
        description:
          "When the tabs do not fit, the list scrolls horizontally. The arrow keys scroll the focused tab into view.",
        sourcePath: "tabs-overflow-demo.tsx",
      },
    ],
  },
  "tag-group": {
    usage: "tag-group-demo.tsx",
    description: "Displays a group of tags that users can remove or select.",
    examples: [],
  },
  "text-area": {
    usage: "text-area-basic-demo.tsx",
    description: "Accepts multiple lines of text.",
    examples: [
      {
        title: "Description",
        description: "Set description to show help below the field.",
        sourcePath: "text-area-description-demo.tsx",
      },
      {
        title: "Disabled",
        description:
          "Use isDisabled to keep the current value visible and prevent changes.",
        sourcePath: "text-area-disabled-demo.tsx",
      },
      {
        title: "Read only",
        description:
          "Use isReadOnly to keep the value selectable but prevent changes.",
        sourcePath: "text-area-read-only-demo.tsx",
      },
      {
        title: "Invalid",
        description:
          "Use isInvalid with TextAreaError to show an error. The error clears when the value is valid.",
        sourcePath: "text-area-invalid-demo.tsx",
      },
    ],
  },
  "text-field": {
    usage: "text-field-basic-demo.tsx",
    description: "Accepts one line of text.",
    examples: [
      {
        title: "Description",
        description: "Set description to show help below the field.",
        sourcePath: "text-field-description-demo.tsx",
      },
      {
        title: "Disabled",
        description:
          "Use isDisabled to keep the current value visible and prevent changes.",
        sourcePath: "text-field-disabled-demo.tsx",
      },
      {
        title: "Read only",
        description:
          "Use isReadOnly to keep the value selectable but prevent changes.",
        sourcePath: "text-field-read-only-demo.tsx",
      },
      {
        title: "Invalid",
        description:
          "Use isInvalid with TextFieldError to show an error. The error clears when the value is valid.",
        sourcePath: "text-field-invalid-demo.tsx",
      },
    ],
  },
  "text-reveal": {
    usage: "text-reveal-basic-demo.tsx",
    description: "Reveals text one word or one character at a time.",
    examples: [
      {
        title: "Characters",
        description:
          'Set split="characters" to reveal one character at a time. A word stays on one line unless it is wider than its container.',
        sourcePath: "text-reveal-characters-demo.tsx",
      },
      {
        title: "Sequence",
        description:
          "Set delay to start one reveal after another. The default trigger starts each reveal when its text comes into view.",
        sourcePath: "text-reveal-demo.tsx",
      },
    ],
  },
  "text-scramble": {
    usage: "text-scramble-basic-demo.tsx",
    description: "Scrambles the characters of text when it changes.",
    examples: [
      {
        title: "Glyphs",
        description:
          "Set glyphs to choose the characters that show during the scramble. Use characters that have the same width in your font.",
        sourcePath: "text-scramble-demo.tsx",
      },
      {
        title: "Duration",
        description:
          "Set duration to the time in seconds that the text takes to resolve. Use a short duration for status labels.",
        sourcePath: "text-scramble-duration-demo.tsx",
      },
    ],
  },
  presence: {
    usage: "presence-demo.tsx",
    description: "Animates content when it is shown or hidden.",
    examples: [
      {
        title: "Inline status",
        description:
          'Set as="span" to show content in a line of text or beside a control. Keep the output element outside Presence, so screen readers announce the change.',
        sourcePath: "presence-inline-demo.tsx",
      },
    ],
  },
  "source-link": {
    usage: "source-link-demo.tsx",
    description: "Links an answer to its source.",
    examples: [
      {
        title: "Source list",
        description:
          "Put several sources in a list. Set index to the citation number in the answer.",
        sourcePath: "source-link-list-demo.tsx",
      },
    ],
  },
  "stagger-group": {
    usage: "stagger-group-basic-demo.tsx",
    description: "Animates a group of items into view one after another.",
    examples: [
      {
        title: "List",
        description:
          'Set as="ul" or as="ol" on StaggerGroup and as="li" on each StaggerItem. The list keeps its semantics.',
        sourcePath: "stagger-group-demo.tsx",
      },
      {
        title: "Timing",
        description:
          "Set stagger to the delay in seconds between items. In a long group the delay gets shorter, so the last item starts within 0.6 seconds.",
        sourcePath: "stagger-group-timing-demo.tsx",
      },
    ],
  },
  "layout-morph": {
    usage: "layout-morph-demo.tsx",
    description: "Animates the height of a container when its content changes.",
    examples: [
      {
        title: "Switching views",
        description:
          "Set contentKey to the selected view. Keep the control outside LayoutMorph, so focus stays on the control. Install Toggle button group separately.",
        sourcePath: "layout-morph-views-demo.tsx",
      },
    ],
  },
  marquee: {
    usage: "marquee-demo.tsx",
    description: "Loops a strip of content with a pause control.",
    examples: [
      {
        title: "Reverse",
        description:
          "Set reverse to move the content toward the end edge. In a right-to-left layout, both directions change sides.",
        sourcePath: "marquee-reverse-demo.tsx",
      },
      {
        title: "Speed and spacing",
        description:
          "Set speed in pixels per second. Set --marquee-gap in className to change the space between items.",
        sourcePath: "marquee-speed-demo.tsx",
      },
    ],
  },
  "text-swap": {
    usage: "text-swap-demo.tsx",
    description: "Displays text that transitions when its value changes.",
    examples: [
      {
        title: "Button label",
        description:
          "Put TextSwap in a Button to change its label after an action. Set a minimum width so the button keeps its size.",
        sourcePath: "text-swap-button-demo.tsx",
      },
    ],
  },
  "tool-call": {
    usage: "tool-call-demo.tsx",
    description:
      "Shows a tool call and its status. Expand it to see the input and output.",
    examples: [
      {
        title: "States",
        description:
          'Set status to "running", "complete", or "error". Screen readers announce each change.',
        sourcePath: "tool-call-states-demo.tsx",
      },
    ],
  },
  "time-field": {
    usage: "time-field-demo.tsx",
    description: "Accepts a time, with one segment for each part.",
    examples: [
      {
        title: "24-hour clock",
        description:
          "Set hourCycle to 24 to use a 24-hour clock in every locale.",
        sourcePath: "time-field-24-hour-demo.tsx",
      },
      {
        title: "Minimum and maximum",
        description:
          "Set minValue and maxValue to limit the time. A time outside the limits shows an error when the field loses focus.",
        sourcePath: "time-field-limits-demo.tsx",
      },
      {
        title: "Disabled",
        description:
          "Use isDisabled to keep the current value visible and prevent changes.",
        sourcePath: "time-field-disabled-demo.tsx",
      },
    ],
  },
  timeline: {
    usage: "timeline-demo.tsx",
    description: "Displays events in a time-ordered sequence.",
    examples: [],
  },
  toast: {
    usage: "toast-demo.tsx",
    description: "Displays a brief notification.",
    examples: [
      {
        title: "Variants",
        description:
          'Set variant to "success", "warning", or "error" in the toast content. The default is "info". Each variant has its own icon.',
        sourcePath: "toast-status-demo.tsx",
      },
      {
        title: "Timeout",
        description:
          "A toast closes after 5 seconds. Set timeout in milliseconds to keep it open longer. Set timeout to 0 to keep it open until the user closes it.",
        sourcePath: "toast-timeout-demo.tsx",
      },
    ],
  },
  "toggle-button": {
    usage: "toggle-button-demo.tsx",
    description: "Turns an option on or off.",
    examples: [
      {
        title: "Independent toggles",
        description:
          "Control each toggle with isSelected and onChange. Give every button a visible label.",
        sourcePath: "toggle-button-independent-demo.tsx",
      },
    ],
  },
  "toggle-button-group": {
    usage: "toggle-button-group-demo.tsx",
    description: "Groups toggle buttons. Users select one option or more.",
    examples: [
      {
        title: "Multiple text styles",
        description:
          'Set selectionMode="multiple" to select more than one option, and control selectedKeys with onSelectionChange.',
        sourcePath: "toggle-button-group-editor-demo.tsx",
      },
    ],
  },
  "token-field": {
    usage: "token-field-basic-demo.tsx",
    description: "Turns typed entries into tokens that you can edit.",
    examples: [
      {
        title: "Disabled",
        description:
          "Use isDisabled to keep the tokens visible and prevent changes.",
        sourcePath: "token-field-disabled-demo.tsx",
      },
      {
        title: "Project tags",
        description:
          "Pass a TagFieldValue as the value and commit the draft with onSubmit. Uncommitted text is not a token.",
        sourcePath: "token-field-demo.tsx",
      },
    ],
  },
  toolbar: {
    usage: "toolbar-basic-demo.tsx",
    description: "Groups related controls. Arrow keys move focus between them.",
    examples: [
      {
        title: "Formatting toolbar",
        description:
          'Set selectionMode="multiple" on ToggleButtonGroup for styles that combine. A Separator divides groups of controls.',
        sourcePath: "toolbar-demo.tsx",
      },
      {
        title: "Vertical toolbar",
        description:
          'Set orientation="vertical". The up and down arrow keys move focus.',
        sourcePath: "toolbar-vertical-demo.tsx",
      },
    ],
  },
  tooltip: {
    usage: "tooltip-demo.tsx",
    description:
      "Displays a short hint when its trigger is hovered or focused.",
    examples: [
      {
        title: "Icon button tooltips",
        description:
          "Give each icon Button an aria-label that matches the tooltip text. The tooltip opens above the trigger. Set placement to change the side.",
        sourcePath: "tooltip-actions-demo.tsx",
      },
    ],
  },
  tree: {
    usage: "tree-basic-demo.tsx",
    description: "Displays nested items that users can expand and select.",
    examples: [
      {
        title: "Custom row content",
        description:
          "Use content to show more details in a row. Typeahead still uses title.",
        sourcePath: "tree-demo.tsx",
      },
    ],
  },
} as const satisfies Record<string, ComponentPageData>;

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
