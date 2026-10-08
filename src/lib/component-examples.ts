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
        title: "Project actions",
        description:
          "Publish, save a revision, or archive. The primary action is large, the secondary actions are small, and preview is an icon button. The badge and saved revision update with each action.",
        sourcePath: "button-project-actions-demo.tsx",
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
        title: "Billing questions",
        description:
          "Use a divided list when several answers can stay open. A disabled question stays visible until tax receipts are available.",
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
        title: "Fallbacks and groups",
        description:
          "Provide initials when no image is available. Avatar also derives initials from the name.",
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
        title: "Orientations",
        description:
          "Keep save and discard in a row, and stack review actions in a column. Each button stays in the Tab order.",
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
        description: "Limit selection to June and make weekends unavailable.",
        sourcePath: "calendar-unavailable-demo.tsx",
      },
    ],
  },
  card: {
    usage: "card-demo.tsx",
    description:
      "Groups a project summary, team, and an editable name in a card.",
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
          "A parent checkbox shows a mixed state when only some inbox messages are selected. Disabled choices remain visible but unavailable.",
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
          "Filter options with supporting details and show the current selection. A locked field keeps an archived value visible.",
        sourcePath: "combo-box-demo.tsx",
      },
      {
        title: "Multiple selection",
        description:
          "Filter teams, select more than one, and remove selections from the tags below the input. The array of selected keys is controlled by the app.",
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
        title: "Share a release",
        description:
          "Use a text label when the action needs to be read, and an icon button when the value is already on screen. A failed write offers a retry.",
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
        title: "Edge placement",
        description:
          "Review an order from the bottom, write an announcement from the top, browse collections from the left, and filter projects from the right.",
        sourcePath: "drawer-placement-demo.tsx",
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
    description:
      "Opens project actions from a trigger, including a rename form.",
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
          "Keep one view selected, and keep overlay layers selected across openings. An unavailable layer stays visible but cannot be chosen.",
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
        title: "Support conversation",
        description:
          "Show incoming, outgoing, and system entries in one thread. Add a local note and copy a message. New entries animate in without moving the thread; a long URL wraps at phone width.",
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
          "Keep the page in the URL. Keep Previous and Next in place when unavailable to avoid layout shifts.",
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
    description: "Anchors a share form and the people who already have access.",
    examples: [
      {
        title: "Placement",
        description:
          "Open notes above, details below, the assignee to the left, and sharing to the right. A popover can flip when there is not enough room.",
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
          "Use stable keys so entering, leaving, and reordered rows keep their identity.",
        sourcePath: "presence-list-demo.tsx",
      },
    ],
  },
  "preview-trigger": {
    usage: "preview-trigger-demo.tsx",
    description:
      "Shows a file preview and review note when its trigger is hovered, focused, or long-pressed.",
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
        title: "Campaign budget",
        description:
          "Choose a daily spend range. Boost spend stays visible and disabled until the plan includes it.",
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
          "Keep each switch in application state. A setting managed by the workspace stays on and cannot be changed.",
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
          "Use separate panels for a summary, activity, and team. Keep Billing visible without allowing selection until the project is approved.",
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
  "scroll-highlight": {
    usage: "scroll-highlight-demo.tsx",
    description:
      "Highlights words as text moves through the viewport or a panel.",
    examples: [],
  },
  "scroll-progress": {
    usage: "scroll-progress-demo.tsx",
    description: "Shows reading progress for a page or a scrollable panel.",
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
  "mask-reveal": {
    usage: "mask-reveal-demo.tsx",
    description: "Uncovers content from a chosen edge.",
    examples: [
      {
        title: "Reveal direction",
        description:
          "Replay the same still from the left, right, above, or below. Each button uncovers the card from that edge.",
        sourcePath: "mask-reveal-directions-demo.tsx",
      },
    ],
  },
  "layout-morph": {
    usage: "layout-morph-demo.tsx",
    description: "Animates height and content when a keyed section changes.",
    examples: [],
  },
  "parallax-layer": {
    usage: "parallax-layer-demo.tsx",
    description:
      "Moves a layer by a bounded distance as it scrolls through a page or panel.",
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
          "Publish a release, check for an update, or flag billing. Leave important warnings open until dismissed; mount ToastViewport once near the app root.",
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
          "Format the selection from a horizontal toolbar, and switch between body and quote from a vertical one.",
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
          "Keep icon-only buttons named without the tooltip. Review opens above the button and assignment details open below.",
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
