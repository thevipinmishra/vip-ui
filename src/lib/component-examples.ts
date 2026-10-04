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
  description: string;
  /** Demo file name in `src/components/docs/`. */
  sourcePath: string;
  /** Extra setup the example needs beyond the page's install list. */
  prerequisite?: string;
}

export interface ComponentPageData {
  /** Usage/preview source file name in `src/components/docs/`. */
  usage: string;
  /** Page description shown under the heading and in the Markdown export. */
  description: string;
  examples: readonly ComponentExampleMetadata[];
}

export const componentPageData = {
  button: {
    usage: "button-basic-demo.tsx",
    description:
      "An action with clear priority: default for the primary action, outline or ghost for lower-priority ones, and destructive only for actions that remove data. Keep a completed button disabled so its result stays visible; see Project actions below for the full publish, revision, and archive flow.",
    examples: [
      {
        title: "Variants",
        description:
          "Choose a variant to match the action's priority. Use destructive for actions that remove data.",
        sourcePath: "button-variants-demo.tsx",
      },
      {
        title: "Sizes",
        description:
          "Use size for placement. Give an icon-only button an accessible name.",
        sourcePath: "button-sizes-demo.tsx",
      },
      {
        title: "Project actions",
        description:
          "Publish a draft, save another revision, or archive it. The status and revision update in the project card.",
        sourcePath: "button-demo.tsx",
      },
    ],
  },
  select: {
    usage: "select-demo.tsx",
    description:
      "Pick one option from a list that is too long to show as radio buttons. For a required choice, see the Invalid selection example, where the error stays visible until a workspace is chosen.",
    examples: [
      {
        title: "Described options",
        description:
          "Use when each option needs a supporting detail. The menu shows the name and description; the trigger shows only the selected name.",
        sourcePath: "select-descriptions-demo.tsx",
      },
      {
        title: "Disabled",
        description:
          "Show the existing value when a field can no longer be changed.",
        sourcePath: "select-disabled-demo.tsx",
      },
      {
        title: "Invalid selection",
        description:
          "Mark a required choice invalid until an option is selected. The error clears when the user chooses a workspace.",
        sourcePath: "select-invalid-demo.tsx",
      },
    ],
  },
  dialog: {
    usage: "dialog-demo.tsx",
    description:
      "Ask for one decision above the page, such as confirming a destructive action. Content behind the dialog stays inactive while it is open; the Alert dialog example shows a confirmation that outside clicks cannot dismiss.",
    examples: [
      {
        title: "Alert dialog",
        description:
          "Ask for confirmation before archiving. Outside clicks do not dismiss the alert; Cancel leaves the project unchanged, while confirming updates the status below.",
        sourcePath: "dialog-alert-demo.tsx",
      },
      {
        title: "Scrollable content",
        description:
          "Keep long content inside the dialog. On a short viewport, scroll the checklist while the page underneath remains inactive.",
        sourcePath: "dialog-scrollable-demo.tsx",
      },
      {
        title: "Controlled open state",
        description:
          "Open with the trigger or application state. Close by clicking outside, pressing Escape, or using the button; each updates the controlled value.",
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
        title: "Multiple open items",
        description:
          "Use allowsMultipleExpanded to keep more than one answer open. Both answers start expanded; close one without affecting the other.",
        sourcePath: "accordion-multiple-demo.tsx",
      },
      {
        title: "Disabled item",
        description:
          "Set isDisabled on an AccordionItem when its answer is not available. The other item still opens normally.",
        sourcePath: "accordion-disabled-demo.tsx",
      },
      {
        title: "Divided",
        description:
          'Use variant="divided" for rows separated by a single line, without individual cards. Open either row to see the content expand.',
        sourcePath: "accordion-divided-demo.tsx",
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
          "Change each total separately. Count moves between totals; digit slide rolls the changed places in both directions.",
        sourcePath: "animated-number-demo.tsx",
      },
    ],
  },
  attachment: {
    usage: "attachment-basic-demo.tsx",
    description: "Displays a file's name, size, preview, and current state.",
    examples: [
      {
        title: "Add files to a request",
        description:
          "Drop a PNG, JPEG, or PDF, or browse on a touch device. Remove a file before submitting; selections stay local and no upload is started.",
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
        title: "Assigned reviewers",
        description:
          "Group named fallbacks when several people own the same review.",
        sourcePath: "avatar-demo.tsx",
      },
    ],
  },
  badge: {
    usage: "badge-basic-demo.tsx",
    description: "Displays a badge or a component that looks like a badge.",
    examples: [
      {
        title: "Status variants",
        description:
          "Compare the statuses used across a release workflow, including outline metadata.",
        sourcePath: "badge-demo.tsx",
      },
      {
        title: "Release queue",
        description:
          "Pair each badge with a readable status and keep the record details outside the label.",
        sourcePath: "badge-queue-demo.tsx",
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
        title: "Vertical draft actions",
        description:
          "Stack two actions in a column. Each button stays in the Tab order and changes the draft status.",
        sourcePath: "button-group-vertical-demo.tsx",
      },
    ],
  },
  calendar: {
    usage: "calendar-demo.tsx",
    description: "Displays a calendar for selecting a date.",
    examples: [
      {
        title: "Unavailable days",
        description: "Limit selection to June and make weekends unavailable.",
        sourcePath: "calendar-unavailable-demo.tsx",
      },
    ],
  },
  card: {
    usage: "card-demo.tsx",
    description: "Displays a card with header, content, and footer.",
    examples: [
      {
        title: "Invoice review",
        description:
          "See an itemized total and approve the invoice locally. Compose Card sections with Badge and Button for the status and action.",
        sourcePath: "card-invoice-demo.tsx",
      },
    ],
  },
  checkbox: {
    usage: "checkbox-basic-demo.tsx",
    description: "A control for selecting or clearing a single option.",
    examples: [
      {
        title: "Notification preferences",
        description:
          "Compose labels and descriptions when choices need more context.",
        sourcePath: "checkbox-demo.tsx",
      },
      {
        title: "Indeterminate and disabled",
        description:
          "A mixed state can represent partial selection; disabled choices remain visible but unavailable.",
        sourcePath: "checkbox-states-demo.tsx",
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
          "Mark the group invalid until at least one channel is selected. Keep the error beside the choices so the fix is clear.",
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
          "Pair each sample with a visible name when people need to compare several colors.",
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
          "Filter options with supporting details and show the current selection.",
        sourcePath: "combo-box-demo.tsx",
      },
      {
        title: "Multiple selection",
        description:
          "Filter teams, select more than one, and remove selections from the tags below the input. The array of selected keys is controlled by the app.",
        sourcePath: "combo-box-multiple-demo.tsx",
      },
      {
        title: "Disabled",
        description:
          "Keep the selected value visible when the field cannot be edited.",
        sourcePath: "combo-box-disabled-demo.tsx",
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
          "Keep one palette on the page. Give each action a readable label and show the result after selection.",
        sourcePath: "command-palette-demo.tsx",
      },
    ],
  },
  "context-menu": {
    usage: "context-menu-demo.tsx",
    description: "Actions available beside the item you are working with.",
    examples: [
      {
        title: "Grouped actions",
        description:
          "Compose the popover and menu when you need separators or disabled actions. The trigger keeps the same keyboard and touch behavior.",
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
        title: "Text-only action",
        description:
          "Render each status as text. The button grows or shrinks with the label, and a failed write offers a retry.",
        sourcePath: "copy-button-link-demo.tsx",
      },
      {
        title: "Icon action",
        description:
          "Use the shared icon size for compact actions. Give an icon-only button a specific accessible name; the live region announces the result.",
        sourcePath: "copy-button-icon-demo.tsx",
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
          "Restrict a booking window and exclude weekends and blocked days. Try typing an unavailable date as well as choosing one in the calendar.",
        sourcePath: "date-picker-unavailable-demo.tsx",
      },
      {
        title: "Controlled value",
        description:
          "Keep the selected date in application state and display it elsewhere on the page.",
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
          "Limit the travel window and block dates that cannot be booked.",
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
  drawer: {
    usage: "drawer-basic-demo.tsx",
    description: "Displays a panel that slides in from the edge of the screen.",
    examples: [
      {
        title: "Snap points",
        description:
          "Drag the handle or use Up, Down, Home, and End to resize the order summary.",
        sourcePath: "drawer-demo.tsx",
      },
      {
        title: "Right: project filters",
        description:
          "Filter a project list. Swipe the handle right to dismiss without dragging form controls.",
        sourcePath: "drawer-side-demo.tsx",
      },
      {
        title: "Left: workspace navigation",
        description:
          "Browse collections, then select one or swipe left to close.",
        sourcePath: "drawer-left-demo.tsx",
      },
      {
        title: "Top: quick announcement",
        description: "Write a note, then pull the bottom handle up to dismiss.",
        sourcePath: "drawer-top-demo.tsx",
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
          "Allow only the formats you support, and add a FileTrigger for people who cannot drag files.",
        sourcePath: "drop-zone-demo.tsx",
      },
    ],
  },
  "empty-state": {
    usage: "empty-state-demo.tsx",
    description: "Displays a message when there is no content to show.",
    examples: [
      {
        title: "No matching results",
        description:
          "Omit the action when the user can resolve the empty result by changing an existing search instead.",
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
          "Use allowsMultiple for a batch of files. Restrict accepted types and list the selected filenames before uploading anything.",
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
          "Try submitting an empty or short workspace name. The field reports its error before submission.",
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
          "Keep an unavailable file visible and explain why it cannot be selected.",
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
          "Put a submit action beside the input. Both controls share a focus border, and the result appears below the field.",
        sourcePath: "input-group-demo.tsx",
      },
      {
        title: "Multiline note",
        description:
          "Use InputGroupTextArea with a bottom row for a counter and an action. The field still owns its label and value.",
        sourcePath: "input-group-notes-demo.tsx",
      },
      {
        title: "Invalid and disabled",
        description:
          "The group picks up invalid and disabled states from its React Aria field. Disable independent actions separately.",
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
          "Use multiple selection when people may choose more than one team. Selections remain highlighted while navigating the list.",
        sourcePath: "list-box-multiple-demo.tsx",
      },
    ],
  },
  menu: {
    usage: "menu-demo.tsx",
    description: "Displays a list of actions or choices from a trigger.",
    examples: [
      {
        title: "Nested menu",
        description:
          "Group related actions under a submenu. Open Share with using the pointer or Right Arrow; Left Arrow returns to the parent.",
        sourcePath: "menu-nested-demo.tsx",
      },
      {
        title: "Single selection",
        description:
          'Use selectionMode="single" to keep one view selected when the menu closes. Reopen the menu to change it.',
        sourcePath: "menu-single-selection-demo.tsx",
      },
      {
        title: "Multiple selection",
        description:
          "Keep view options selected across openings. Disabled items remain visible but cannot be chosen.",
        sourcePath: "menu-selection-demo.tsx",
      },
    ],
  },
  message: {
    usage: "message-basic-demo.tsx",
    description:
      "Displays a conversation entry with an author, content, and optional actions.",
    examples: [
      {
        title: "Support conversation",
        description:
          "Add a local note and copy a message. New entries animate in without moving the entire thread; a long URL wraps at phone width. Enter makes a new line, and Send note submits.",
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
          "Connect a value to application state when a measurement changes. The slider only simulates a storage reading in this example.",
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
          "Group teams under their departments, leave a full team disabled, and explain an empty required choice beside the field.",
        sourcePath: "native-select-grouped-demo.tsx",
      },
    ],
  },
  "number-field": {
    usage: "number-field-demo.tsx",
    description: "A field for entering and adjusting numeric values.",
    examples: [
      {
        title: "Team seat estimate",
        description:
          "Adjust seats within a plan limit and see the monthly estimate before saving the new count.",
        sourcePath: "number-field-seats-demo.tsx",
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
          "Keep the current page in the URL so reloads and browser history work, and update the visible rows as the page changes.",
        sourcePath: "pagination-demo.tsx",
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
    description: "Displays content in a panel anchored to a trigger.",
    examples: [
      {
        title: "Placement",
        description:
          "Use placement to put the popover above its trigger. It can flip when there is not enough room.",
        sourcePath: "popover-placement-demo.tsx",
      },
    ],
  },
  "presence-list": {
    usage: "presence-list-basic-demo.tsx",
    description: "Displays a list with animated item additions and removals.",
    examples: [
      {
        title: "Release checklist",
        description:
          "Keep stable task keys while adding and completing rows so each exit follows the right item.",
        sourcePath: "presence-list-demo.tsx",
      },
    ],
  },
  "preview-trigger": {
    usage: "preview-trigger-demo.tsx",
    description:
      "Displays a preview when its trigger is hovered, focused, or long-pressed.",
    examples: [],
  },
  "progress-bar": {
    usage: "progress-bar-basic-demo.tsx",
    description: "Displays the progress of a task in a horizontal bar.",
    examples: [
      {
        title: "Campaign asset upload",
        description:
          "Advance the file upload while preview preparation stays indeterminate until the upload completes.",
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
          "Advance a determinate upload while the connection remains indeterminate.",
        sourcePath: "progress-ring-demo.tsx",
      },
    ],
  },
  "radio-group": {
    usage: "radio-group-demo.tsx",
    description: "Groups options for choosing one item.",
    examples: [
      {
        title: "Card options",
        description: "Use cards when each choice needs supporting context.",
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
          "Choose a range in June while excluding dates that cannot be booked.",
        sourcePath: "range-calendar-limits-demo.tsx",
      },
    ],
  },
  "search-field": {
    usage: "search-field-basic-demo.tsx",
    description: "A field for entering a search query.",
    examples: [
      {
        title: "Filter projects",
        description:
          "Connect a controlled search field to a collection. Type a project or owner to filter, press Enter to submit, or clear the query to see every project again.",
        sourcePath: "search-field-demo.tsx",
      },
    ],
  },
  separator: {
    usage: "separator-demo.tsx",
    description: "Visually separates sections of content.",
    examples: [
      {
        title: "Vertical separator",
        description:
          "Set orientation to vertical between adjacent labels. The parent row supplies the separator's height.",
        sourcePath: "separator-vertical-demo.tsx",
      },
    ],
  },
  skeleton: {
    usage: "skeleton-demo.tsx",
    description: "Displays a placeholder while content loads.",
    examples: [],
  },
  slider: {
    usage: "slider-demo.tsx",
    description: "A control for choosing a value or range on a track.",
    examples: [
      {
        title: "Price range",
        description:
          "Use two thumbs to set a minimum and maximum. The value updates as you move either thumb.",
        sourcePath: "slider-range-demo.tsx",
      },
      {
        title: "Disabled slider",
        description:
          "Keep the current volume visible when it cannot be changed.",
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
          "Compare all seven variants before choosing one for the space available.",
        sourcePath: "spinner-demo.tsx",
      },
      {
        title: "Loading in context",
        description:
          "Use a compact ring in a disabled button, or pair a larger indicator with a spoken status for a waiting screen.",
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
    description: "Displays the current step in a sequence.",
    examples: [
      {
        title: "Setup workflow",
        description:
          "Keep currentStep in application state when Back and Next controls move through the workflow.",
        sourcePath: "stepper-demo.tsx",
      },
    ],
  },
  switch: {
    usage: "switch-basic-demo.tsx",
    description: "A control for turning a setting on or off.",
    examples: [
      {
        title: "Privacy settings",
        description:
          "Compose a group of switches with supporting descriptions and live feedback.",
        sourcePath: "switch-demo.tsx",
      },
      {
        title: "Descriptions and disabled state",
        description:
          "Add context to a setting or show when it is managed elsewhere.",
        sourcePath: "switch-states-demo.tsx",
      },
    ],
  },
  table: {
    usage: "table-basic-demo.tsx",
    description: "Displays data in rows and columns.",
    examples: [
      {
        title: "Selectable projects",
        description:
          "Add single-row selection when the user needs to choose a project. Keep status readable in every row.",
        sourcePath: "table-demo.tsx",
      },
      {
        title: "Sortable columns",
        description:
          "Sort the backlog by project, owner, or open tasks. Column headers announce the direction.",
        sourcePath: "table-sorting-demo.tsx",
      },
      {
        title: "Filter invoices",
        description:
          "Search by invoice number or customer, narrow by status, and try a query with no matches.",
        sourcePath: "table-filter-demo.tsx",
      },
    ],
  },
  tabs: {
    usage: "tabs-basic-demo.tsx",
    description: "Displays related content in switchable panels.",
    examples: [
      {
        title: "Project workspace",
        description:
          "Use separate panels for a summary, activity, and team when each section has more content.",
        sourcePath: "tabs-demo.tsx",
      },
      {
        title: "Unavailable tab",
        description:
          "Keep a destination visible without allowing selection until it becomes available.",
        sourcePath: "tabs-disabled-demo.tsx",
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
        title: "Review thread",
        description:
          "Add a note to a project review with a character limit. The new note appears with the existing discussion.",
        sourcePath: "text-area-demo.tsx",
      },
    ],
  },
  "text-field": {
    usage: "text-field-basic-demo.tsx",
    description: "A field for entering a single line of text.",
    examples: [
      {
        title: "Live project name",
        description:
          "The project list reflects the value as it changes, including an empty-name fallback.",
        sourcePath: "text-field-demo.tsx",
      },
    ],
  },
  "text-swap": {
    usage: "text-swap-demo.tsx",
    description: "Displays text that transitions when its value changes.",
    examples: [],
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
        title: "Upload notifications",
        description:
          "Start, complete, or pause an upload to compare notification states. Mount ToastViewport once for the page.",
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
        title: "Pinned projects",
        description:
          "Pin a project to mark it for quick access. The badge repeats the state without relying on color.",
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
          "Combine formatting options and see the resulting text without leaving the editor.",
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
          "Compose the label, input, and description when tags need context. Count committed tokens without counting unfinished text.",
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
          "Combine text styles in one toolbar and separate Clear from the selection group.",
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
        title: "Review actions",
        description:
          "Keep icon-only buttons named without the tooltip. Hover or focus for extra context, then try the actions.",
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
