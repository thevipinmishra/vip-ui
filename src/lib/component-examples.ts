/**
 * Named-example metadata for the flagship component pages.
 *
 * Plain data only: no JSX and no client imports. The HTML pages attach their
 * React previews to these entries, and `/components/<slug>.md` reads the same
 * source files from disk. Sharing one module is what keeps the page and the
 * Markdown export from drifting.
 *
 * Keep example titles stable. `exampleAnchor()` derives the section id, and
 * other pages link to `#example-<slugified title>`.
 */

export interface ComponentExampleMetadata {
  title: string;
  /** Essential facts not already clear from the title and source. */
  description?: string;
  /** Demo file name in `src/components/docs/`. */
  sourcePath: string;
  /** Extra setup the example needs beyond the page's install list. */
  prerequisite?: string;
}

export interface ComponentPageData {
  /** Usage/preview source file name in `src/components/docs/`. */
  usage: string;
  /** Core-component summary for the preview and Markdown export. */
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
        title: "Icon buttons",
        sourcePath: "button-icon-demo.tsx",
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
  // Generated from the page descriptions and named examples. Keep in sync with
  // the page components via withExamplePreviews; the build fails on a count mismatch.
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
        title: "Task counter variants",
        description:
          "Use the variant prop to choose a count or slide animation. Each number updates from its own value.",
        sourcePath: "animated-number-demo.tsx",
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
        title: "Fallbacks and groups",
        description:
          "Set initials when no image is available; Avatar derives them from the name when initials is not set. Group avatars with AvatarGroup and give the group an aria-label.",
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
    usage: "button-group-demo.tsx",
    description:
      "Joins related actions with shared edges while keeping each button independently focusable.",
    examples: [
      {
        title: "Orientations",
        description:
          'Use orientation="vertical" for a column; the default orientation is a row. Each button stays in the Tab order.',
        sourcePath: "button-group-orientations-demo.tsx",
      },
    ],
  },
  calendar: {
    usage: "calendar-demo.tsx",
    description: "Displays a calendar for selecting a date.",
    examples: [
      {
        title: "Unavailable days",
        description:
          "Use isDateUnavailable to mark dates unavailable, and minValue and maxValue to limit the selectable range.",
        sourcePath: "calendar-unavailable-demo.tsx",
      },
    ],
  },
  card: {
    usage: "card-demo.tsx",
    description:
      "Groups related content in a card with header, content, and footer sections.",
    examples: [],
  },
  checkbox: {
    usage: "checkbox-basic-demo.tsx",
    description: "A control for selecting or clearing a single option.",
    examples: [
      {
        title: "Notification preferences",
        description:
          'Set checked to "indeterminate" when only some options in the group are selected. Use isDisabled to keep an option visible but unavailable.',
        sourcePath: "checkbox-demo.tsx",
      },
    ],
  },
  "checkbox-group": {
    usage: "checkbox-group-demo.tsx",
    description: "Groups checkboxes for selecting multiple options.",
    examples: [
      {
        title: "Required choice",
        description:
          "Set isInvalid until at least one option is selected. CheckboxGroupError shows the message beside the choices.",
        sourcePath: "checkbox-group-required-demo.tsx",
      },
    ],
  },
  "color-field": {
    usage: "color-field-demo.tsx",
    description: "A text field for entering a color value.",
    examples: [],
  },
  "color-picker": {
    usage: "color-picker-demo.tsx",
    description: "A control for choosing a color with visual and text inputs.",
    examples: [],
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
    ],
  },
  "color-swatch-picker": {
    usage: "color-swatch-picker-demo.tsx",
    description: "Displays a set of swatches for choosing a color.",
    examples: [],
  },
  "combo-box": {
    usage: "combo-box-basic-demo.tsx",
    description: "A searchable list for choosing an option.",
    examples: [
      {
        title: "Descriptive results",
        description:
          "Put a description inside each ComboBoxItem and set textValue for filtering. Use isDisabled to keep the current value visible and prevent changes.",
        sourcePath: "combo-box-demo.tsx",
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
    examples: [],
  },
  "date-picker": {
    usage: "date-picker-demo.tsx",
    description: "A field for entering a date or choosing one from a calendar.",
    examples: [
      {
        title: "Unavailable dates",
        description:
          "Use isDateUnavailable to mark dates unavailable, and minValue and maxValue to limit the selectable range.",
        sourcePath: "date-picker-unavailable-demo.tsx",
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
        title: "Restricted range",
        description:
          "Use isDateUnavailable to mark dates unavailable, and minValue and maxValue to limit the selectable range.",
        sourcePath: "date-range-picker-limits-demo.tsx",
      },
    ],
  },
  "description-list": {
    usage: "description-list-demo.tsx",
    description: "Displays pairs of terms and descriptions.",
    examples: [],
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
        title: "Validation and field states",
        description:
          "Use validate for errors, isReadOnly to keep a value selectable, and isDisabled to prevent input.",
        sourcePath: "form-validation-demo.tsx",
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
        title: "Search action",
        description:
          "Put a submit Button in InputGroupAddon. Disable it until the input has a value.",
        sourcePath: "input-group-demo.tsx",
      },
      {
        title: "Multiline note",
        description:
          "Use InputGroupTextArea with a bottom row for a live character counter.",
        sourcePath: "input-group-notes-demo.tsx",
      },
      {
        title: "Invalid and disabled",
        description:
          "Set isInvalid or isDisabled on the TextField. InputGroup inherits the state.",
        sourcePath: "input-group-states-demo.tsx",
      },
    ],
  },
  "kbd-code": {
    usage: "kbd-code-demo.tsx",
    description: "Displays keyboard keys and inline code in text.",
    examples: [],
  },
  link: {
    usage: "link-demo.tsx",
    description: "Displays a link to another page or location.",
    examples: [],
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
    usage: "menu-demo.tsx",
    description:
      "Opens a list of actions from a trigger, with icons, shortcuts, and separators.",
    examples: [
      {
        title: "Nested menu",
        description:
          "Use href on a MenuItem for links, including links inside submenus.",
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
        title: "Grouped choices and validation",
        description:
          "Group options with optgroup and disable an unavailable option. Use required with isInvalid to show the error beside the field.",
        sourcePath: "native-select-grouped-demo.tsx",
      },
    ],
  },
  "number-field": {
    usage: "number-field-demo.tsx",
    description: "A field for entering and adjusting numeric values.",
    examples: [
      {
        title: "Currency formatting",
        description:
          "Use formatOptions for currency and step to set the increment.",
        sourcePath: "number-field-currency-demo.tsx",
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
    usage: "inline-edit-demo.tsx",
    description: "Edits text in place and keeps the draft when saving fails.",
    examples: [],
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
        title: "Choose a new password",
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
    examples: [],
  },
  "radio-group": {
    usage: "radio-group-demo.tsx",
    description: "Groups options for choosing one item.",
    examples: [
      {
        title: "Card options",
        description:
          'Set variant="card" when each choice needs a label and description.',
        sourcePath: "radio-group-card-demo.tsx",
      },
    ],
  },
  "range-calendar": {
    usage: "range-calendar-demo.tsx",
    description: "Displays a calendar for selecting a date range.",
    examples: [
      {
        title: "Restricted range",
        description:
          "Use isDateUnavailable to mark dates unavailable, and minValue and maxValue to limit the selectable range.",
        sourcePath: "range-calendar-limits-demo.tsx",
      },
    ],
  },
  "search-field": {
    usage: "search-field-basic-demo.tsx",
    description: "A field for entering a search query.",
    examples: [
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
    usage: "skeleton-demo.tsx",
    description: "Displays a placeholder while content loads.",
    examples: [],
  },
  slider: {
    usage: "slider-demo.tsx",
    description: "Selects a value or range on a track.",
    examples: [
      {
        title: "Range and disabled state",
        description:
          "Pass an array to defaultValue for two SliderHandles. Use isDisabled to keep a value visible when it cannot change.",
        sourcePath: "slider-budget-demo.tsx",
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
          'Put a size="sm" Spinner inside a disabled Button, or pair a larger Spinner with a status message.',
        sourcePath: "spinner-usage-demo.tsx",
      },
    ],
  },
  stat: {
    usage: "stat-demo.tsx",
    description: "Displays a labeled value with supporting details.",
    examples: [],
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
        title: "Account settings",
        description:
          "Control each switch with checked and onCheckedChange. Use isDisabled for a managed setting.",
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
        title: "Field states",
        description:
          "Use isInvalid with TextAreaError for errors, isReadOnly for selectable text, and isDisabled to prevent input.",
        sourcePath: "text-area-demo.tsx",
      },
    ],
  },
  "text-field": {
    usage: "text-field-basic-demo.tsx",
    description: "A field for entering a single line of text.",
    examples: [
      {
        title: "Field states",
        description:
          "Use isInvalid with TextFieldError for errors, isReadOnly for selectable text, and isDisabled to prevent input.",
        sourcePath: "text-field-demo.tsx",
      },
    ],
  },
  "text-reveal": {
    usage: "text-reveal-demo.tsx",
    description: "Reveals text by word or character with staggered movement.",
    examples: [],
  },
  "text-scramble": {
    usage: "text-scramble-demo.tsx",
    description: "Resolves changing text from scrambled characters.",
    examples: [],
  },
  presence: {
    usage: "presence-demo.tsx",
    description:
      "Animates conditional content when it enters or leaves the page.",
    examples: [],
  },
  "source-link": {
    usage: "source-link-demo.tsx",
    description:
      "Links an answer to its source and identifies the source by name.",
    examples: [],
  },
  "stagger-group": {
    usage: "stagger-group-demo.tsx",
    description: "Sequences the entrance of grouped content.",
    examples: [],
  },
  "layout-morph": {
    usage: "layout-morph-demo.tsx",
    description: "Animates height and content when a keyed section changes.",
    examples: [],
  },
  marquee: {
    usage: "marquee-demo.tsx",
    description: "Loops a strip of content with a pause control.",
    examples: [],
  },
  "text-swap": {
    usage: "text-swap-demo.tsx",
    description: "Displays text that transitions when its value changes.",
    examples: [],
  },
  "tool-call": {
    usage: "tool-call-demo.tsx",
    description: "Shows a tool's status with expandable input and output.",
    examples: [{ title: "States", sourcePath: "tool-call-states-demo.tsx" }],
  },
  "time-field": {
    usage: "time-field-demo.tsx",
    description: "A field for entering a time in editable segments.",
    examples: [],
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
          'Use orientation="vertical" for a vertical toolbar. In ToggleButtonGroup, selectionMode sets single or multiple selection.',
        sourcePath: "toolbar-demo.tsx",
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

/** Section id for a named example. Matches `#example-<slugified title>`. */
export function exampleAnchor(title: string) {
  return `example-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-$/, "")}`;
}
