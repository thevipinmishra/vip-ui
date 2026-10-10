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
          "Use ButtonLink for navigation that looks like a button. It renders an anchor. Pass your router's link component to the as prop. Install Button link separately.",
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
          "Add a description inside each SelectItem, and set textValue to keep a readable option name. The trigger shows only the selected value.",
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
          'Set role="alertdialog" for a confirmation that outside clicks cannot dismiss. Close it with a button.',
        sourcePath: "dialog-alert-demo.tsx",
      },
      {
        title: "Scrollable content",
        description:
          "Keep long content inside DialogContent. The dialog scrolls while the page stays inactive.",
        sourcePath: "dialog-scrollable-demo.tsx",
      },
      {
        title: "Controlled open state",
        description:
          "Control the dialog with isOpen and onOpenChange. Every close action updates the same state.",
        sourcePath: "dialog-controlled-demo.tsx",
      },
    ],
  },
  accordion: {
    usage: "accordion-demo.tsx",
    description: "Displays collapsible sections of related content.",
    examples: [
      {
        title: "Divided list",
        description:
          'Use variant="divided" to show dividers, allowsMultipleExpanded to keep several sections open, and isDisabled to keep a section visible but unavailable.',
        sourcePath: "accordion-billing-demo.tsx",
      },
    ],
  },
  alert: {
    usage: "alert-basic-demo.tsx",
    description: "Displays an inline message about a status or event.",
    examples: [
      {
        title: "Action",
        description:
          "Place ButtonLink beside the message for a navigation action. Keep the link outside the title and description so it remains a separate control.",
        sourcePath: "alert-action-demo.tsx",
      },
      {
        title: "Status messages",
        description:
          "Choose a message variant that matches the outcome, and include the next step when attention is needed.",
        sourcePath: "alert-demo.tsx",
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
          "Use getDropOperation for the drop result and acceptedFileTypes for the file picker. Remove a file with onRemove.",
        sourcePath: "attachment-demo.tsx",
      },
    ],
  },
  autocomplete: {
    usage: "autocomplete-demo.tsx",
    description: "Filters a list of options as you type.",
    examples: [],
  },
  avatar: {
    usage: "avatar-basic-demo.tsx",
    description: "Displays an image or initials for a person.",
    examples: [
      {
        title: "Fallback",
        description:
          "Avatar shows initials while the image loads, and when src is missing or does not load. Avatar takes the initials from the first two words of name. Set initials to use different letters.",
        sourcePath: "avatar-fallback-demo.tsx",
      },
      {
        title: "Sizes",
        description:
          'Set size to "sm", "md", or "lg". The initials scale with the avatar.',
        sourcePath: "avatar-sizes-demo.tsx",
      },
      {
        title: "Group",
        description:
          "Put avatars in AvatarGroup to overlap them, and give the group an aria-label. For people not shown, add an Avatar with a count as its initials.",
        sourcePath: "avatar-demo.tsx",
      },
    ],
  },
  badge: {
    usage: "badge-basic-demo.tsx",
    description: "Shows a short label, status, or count.",
    examples: [
      {
        title: "Status variants",
        description:
          "Use the variant prop for status styles and BadgeDot for a status marker.",
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
      "Joins related actions with shared edges while keeping each button independently focusable.",
    examples: [
      {
        title: "Orientations",
        description:
          'The default orientation is a row. Set orientation="vertical" for a column. Each button stays in the Tab order.',
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
    description:
      "Groups related content in a card with header, content, and footer sections.",
    examples: [
      {
        title: "Action",
        description:
          "Put CardAction in CardHeader to show a control beside the title.",
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
    description: "A control for selecting or clearing a single option.",
    examples: [
      {
        title: "Description",
        description: "Set description to show help below the label.",
        sourcePath: "checkbox-description-demo.tsx",
      },
      {
        title: "Disabled",
        description:
          "Use isDisabled to keep the option visible and prevent changes.",
        sourcePath: "checkbox-disabled-demo.tsx",
      },
      {
        title: "Indeterminate",
        description:
          'Set checked to "indeterminate" when only some child options are selected.',
        sourcePath: "checkbox-demo.tsx",
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
        title: "Required choice",
        description:
          "Set isInvalid until at least one option is selected. CheckboxGroupError shows the message below the choices.",
        sourcePath: "checkbox-group-required-demo.tsx",
      },
    ],
  },
  "color-field": {
    usage: "color-field-demo.tsx",
    description: "A text field for entering a color value.",
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
    description: "A control for choosing a color with visual and text inputs.",
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
          "Set color and colorName to pair each swatch with its name.",
        sourcePath: "color-swatch-demo.tsx",
      },
      {
        title: "Transparency",
        description:
          "A color with an alpha value shows a checkerboard behind it.",
        sourcePath: "color-swatch-transparency-demo.tsx",
      },
    ],
  },
  "color-swatch-picker": {
    usage: "color-swatch-picker-demo.tsx",
    description: "Displays a set of swatches for choosing a color.",
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
    description: "A searchable list for choosing an option.",
    examples: [
      {
        title: "Described options",
        description:
          "Put a description inside each ComboBoxItem and set textValue for filtering.",
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
    description: "Displays a searchable menu for finding and running commands.",
    examples: [
      {
        title: "Commands with icons",
        description:
          "Give each CommandPaletteItem an icon and a readable label. The shortcut prop controls the keyboard shortcut that opens the palette.",
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
          "Use a separator to group actions and isDisabled to leave an unavailable option visible.",
        sourcePath: "context-menu-grouped-demo.tsx",
      },
    ],
  },
  "copy-button": {
    usage: "copy-button-demo.tsx",
    description:
      "Copies a value and confirms whether the clipboard write succeeded.",
    examples: [
      {
        title: "Label and icon variants",
        description:
          'Use the status render prop to change the label after a copy. Set size="icon" for an icon-only button.',
        sourcePath: "copy-button-share-demo.tsx",
      },
    ],
  },
  "date-field": {
    usage: "date-field-demo.tsx",
    description: "A field for entering a date in editable segments.",
    examples: [
      {
        title: "Minimum and maximum",
        description:
          "Set minValue and maxValue to limit the date. A date outside the limits is invalid.",
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
    description: "A field for entering a date or choosing one from a calendar.",
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
    description: "A field for entering or selecting a date range.",
    examples: [
      {
        title: "Unavailable dates",
        description:
          "Use isDateUnavailable to mark dates unavailable. Set minValue and maxValue to limit the selectable range.",
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
    description: "Displays pairs of terms and descriptions.",
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
    examples: [],
  },
  sheet: {
    usage: "sheet-basic-demo.tsx",
    description: "Displays a panel that slides in from the edge of the screen.",
    examples: [
      {
        title: "Snap points",
        description:
          'Set snapPoints to the visible amount at each stop; the sheet opens at the first. Here "100%" opens it fully and "40dvh" adds a shorter stop.',
        sourcePath: "sheet-demo.tsx",
      },
      {
        title: "Edge placement",
        description:
          "Use position to choose the edge. Swipe or drag the handle toward that edge to dismiss.",
        sourcePath: "sheet-placement-demo.tsx",
      },
    ],
  },
  "drop-zone": {
    usage: "drop-zone-basic-demo.tsx",
    description:
      "A target for dropping files or choosing them from a file picker.",
    examples: [
      {
        title: "Accepted file types",
        description:
          "Use getDropOperation to accept or cancel a drop. Add a FileTrigger with acceptedFileTypes as the file-picker alternative.",
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
          "Set allowsMultiple for a batch and acceptedFileTypes for the format. onSelect lists the selected file names.",
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
          "Pass validate to a field. Return an error message, or null when the value is valid.",
        sourcePath: "form-validation-demo.tsx",
      },
      {
        title: "Server errors",
        description:
          'Pass server errors to validationErrors, keyed by field name. Submit "maya" to see the error. The error clears when the value changes.',
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
          "Set isDisabled to keep an unavailable row visible. Explain why it cannot be selected.",
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
          "Use InputGroupTextArea with a bottom row for a live character counter.",
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
          'Set selectionMode="multiple" to choose more than one row. defaultSelectedKeys preselects options.',
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
          "Put an icon before the label and a Kbd after it. Use href for an item that opens a page, MenuSeparator to group items, and isDisabled to keep an item visible but unavailable.",
        sourcePath: "menu-demo.tsx",
      },
      {
        title: "Nested menu",
        description:
          "Wrap a MenuItem and a MenuPopover in SubmenuTrigger. The item shows an arrow and opens the submenu beside the menu.",
        sourcePath: "menu-nested-demo.tsx",
      },
      {
        title: "Selection",
        description:
          "Use the selectionMode prop for single and multiple selection.",
        sourcePath: "menu-selection-demo.tsx",
      },
    ],
  },
  "agent-status": {
    usage: "agent-status-demo.tsx",
    description: "Shows an agent's current step with a persistent state cue.",
    examples: [{ title: "States", sourcePath: "agent-status-states-demo.tsx" }],
  },
  message: {
    usage: "message-basic-demo.tsx",
    description:
      "Displays a conversation entry with an author, content, and optional actions.",
    examples: [
      {
        title: "Message states",
        description:
          "Use the side prop for incoming, outgoing, or system. Add avatar, status, and actions per row.",
        sourcePath: "message-demo.tsx",
      },
    ],
  },
  meter: {
    usage: "meter-basic-demo.tsx",
    description: "Displays a value within a known range.",
    examples: [
      {
        title: "Updating a reading",
        description:
          "Control the meter with the value prop. The reading updates when the value changes.",
        sourcePath: "meter-demo.tsx",
      },
    ],
  },
  "native-select": {
    usage: "native-select-demo.tsx",
    description: "Chooses one option with a native HTML select.",
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
          "Set isInvalid and error to show a message below the field. Use required for native form validation.",
        sourcePath: "native-select-invalid-demo.tsx",
      },
    ],
  },
  "number-field": {
    usage: "number-field-basic-demo.tsx",
    description: "A field for entering and adjusting numeric values.",
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
    description: "Displays links for navigating a paginated collection.",
    examples: [
      {
        title: "URL-synced pages",
        description:
          "Keep the page in the URL. Use isCurrent for the active link and isDisabled to keep an unavailable link in place.",
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
          "Install Password field separately to use this composition.",
        sourcePath: "password-strength-meter-field-demo.tsx",
      },
    ],
  },
  "password-field": {
    usage: "password-field-basic-demo.tsx",
    description:
      "Accepts a password with an optional reveal action beside the input.",
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
          "Use new-password autocomplete and native minimum-length validation. The example checks the value but never saves or displays it.",
        sourcePath: "password-field-demo.tsx",
      },
    ],
  },
  popover: {
    usage: "popover-demo.tsx",
    description: "Anchors supporting content beside a trigger.",
    examples: [
      {
        title: "Placement",
        description:
          "Use the placement prop for top, bottom, left, or right. The panel flips when space is tight.",
        sourcePath: "popover-placement-demo.tsx",
      },
    ],
  },
  "presence-list": {
    usage: "presence-list-basic-demo.tsx",
    description: "Displays a list with animated item additions and removals.",
    examples: [
      {
        title: "Adding and reordering",
        description:
          "Pass items and getKey so rows keep their identity when they enter, leave, or reorder.",
        sourcePath: "presence-list-demo.tsx",
      },
    ],
  },
  "preview-trigger": {
    usage: "preview-trigger-demo.tsx",
    description:
      "Shows a file preview when its trigger is hovered, focused, or long-pressed.",
    examples: [],
  },
  "progress-bar": {
    usage: "progress-bar-basic-demo.tsx",
    description: "Displays the progress of a task in a horizontal bar.",
    examples: [
      {
        title: "Determinate and indeterminate",
        description:
          "Use value for determinate progress and isIndeterminate for unknown progress.",
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
          "Use value for known progress, isIndeterminate for unknown progress, and showValue={false} to hide the value.",
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
    description: "Groups options for choosing one item.",
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
          'Set variant="card" when each choice needs a label and description. Use RadioGroupItems to change the gap.',
        sourcePath: "radio-group-card-demo.tsx",
      },
      {
        title: "Disabled",
        description:
          "Set isDisabled on a Radio to make one option unavailable. Set it on RadioGroup to disable all options.",
        sourcePath: "radio-group-disabled-demo.tsx",
      },
      {
        title: "Invalid selection",
        description:
          "Use isInvalid with RadioGroupError while no option is selected. The error clears when an option is selected.",
        sourcePath: "radio-group-invalid-demo.tsx",
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
          "Use isDateUnavailable to mark dates unavailable. Set minValue and maxValue to limit the selectable range.",
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
    description: "A field for entering a search query.",
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
    description: "Visually separates sections of content.",
    examples: [],
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
        title: "Loading patterns",
        description:
          "Use the variant prop to compare all seven styles, and size to fit the space.",
        sourcePath: "spinner-demo.tsx",
      },
      {
        title: "Loading in context",
        description:
          'Set isPending on a Button and put a size="sm" Spinner inside it. Pair a larger Spinner with a status message.',
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
    examples: [{ title: "Controlled step", sourcePath: "stepper-demo.tsx" }],
  },
  switch: {
    usage: "switch-basic-demo.tsx",
    description: "Turns a setting on or off.",
    examples: [
      {
        title: "Description",
        description: "Set description to show help below the label.",
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
          "Compose SwitchLabel, SwitchDescription, SwitchControl, and SwitchThumb for your own layout. Control each switch with checked and onCheckedChange.",
        sourcePath: "switch-demo.tsx",
      },
    ],
  },
  "data-table": {
    usage: "data-table-demo.tsx",
    description: "Searches, filters, sorts, selects, and pages through rows.",
    examples: [
      {
        title: "Column filters",
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
          "Control sorting with sortDescriptor and onSortChange, and set allowsSorting on each Column.",
        sourcePath: "table-sorting-demo.tsx",
      },
      {
        title: "Filter invoices",
        description:
          "Filter rows with a controlled SearchField and Select. renderEmptyState shows the message when nothing matches.",
        sourcePath: "table-filter-demo.tsx",
      },
    ],
  },
  tabs: {
    usage: "tabs-basic-demo.tsx",
    description: "Displays related content in switchable panels.",
    examples: [
      {
        title: "Icons and disabled tabs",
        description:
          "Add icons to tab triggers and keep an unavailable tab visible with isDisabled.",
        sourcePath: "tabs-demo.tsx",
      },
    ],
  },
  "tag-group": {
    usage: "tag-group-demo.tsx",
    description: "Displays a collection of tags that can be removed.",
    examples: [],
  },
  "text-area": {
    usage: "text-area-basic-demo.tsx",
    description: "A field for entering multiline text.",
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
    description: "A field for entering a single line of text.",
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
    description: "Reveals text by word or character with staggered movement.",
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
    description: "Resolves changing text from scrambled characters.",
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
    description:
      "Animates conditional content when it enters or leaves the page.",
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
    description:
      "Links an answer to its source and identifies the source by name.",
    examples: [],
  },
  "stagger-group": {
    usage: "stagger-group-basic-demo.tsx",
    description: "Sequences the entrance of grouped content.",
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
    description: "Animates height and content when a keyed section changes.",
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
    description: "Shows a tool's status with expandable input and output.",
    examples: [{ title: "States", sourcePath: "tool-call-states-demo.tsx" }],
  },
  "time-field": {
    usage: "time-field-demo.tsx",
    description: "A field for entering a time in editable segments.",
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
          "Set minValue and maxValue to limit the time. A time outside the limits is invalid.",
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
        title: "Notification types",
        description:
          "Pass variant for a success or warning toast. Set timeout to change how long a toast stays open.",
        sourcePath: "toast-status-demo.tsx",
      },
    ],
  },
  "toggle-button": {
    usage: "toggle-button-demo.tsx",
    description:
      "A button that switches between selected and unselected states.",
    examples: [
      {
        title: "Independent toggles",
        description:
          "Control each toggle with isSelected and onChange. Give every button a visible label.",
        sourcePath: "toggle-button-projects-demo.tsx",
      },
    ],
  },
  "toggle-button-group": {
    usage: "toggle-button-group-demo.tsx",
    description: "Groups toggle buttons for selecting one or more options.",
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
    description: "A field for entering and editing multiple text tokens.",
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
    description: "Groups related controls in a keyboard-navigable row.",
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
          "Give each icon Button an aria-label. Set placement on TooltipContent for top or bottom.",
        sourcePath: "tooltip-actions-demo.tsx",
      },
    ],
  },
  tree: {
    usage: "tree-basic-demo.tsx",
    description:
      "Displays hierarchical items that can be expanded and selected.",
    examples: [
      {
        title: "Custom row content",
        description:
          "Use content for visible row details while the title remains the text used for keyboard typeahead.",
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
