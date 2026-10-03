import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { AnimatedNumberBasicDemo } from "@/components/docs/animated-number-basic-demo";
import { AnimatedNumberDemo } from "@/components/docs/animated-number-demo";
import { AutocompleteDemo } from "@/components/docs/autocomplete-demo";
import { AvatarBasicDemo } from "@/components/docs/avatar-basic-demo";
import { AvatarDemo } from "@/components/docs/avatar-demo";
import { BreadcrumbsDemo } from "@/components/docs/breadcrumbs-demo";
import { ButtonGroupDemo } from "@/components/docs/button-group-demo";
import { ButtonGroupVerticalDemo } from "@/components/docs/button-group-vertical-demo";
import { CalendarDemo } from "@/components/docs/calendar-demo";
import { CalendarUnavailableDemo } from "@/components/docs/calendar-unavailable-demo";
import { CardDemo } from "@/components/docs/card-demo";
import { CardInvoiceDemo } from "@/components/docs/card-invoice-demo";
import { CheckboxGroupDemo } from "@/components/docs/checkbox-group-demo";
import { CheckboxGroupRequiredDemo } from "@/components/docs/checkbox-group-required-demo";
import { ColorFieldDemo } from "@/components/docs/color-field-demo";
import { ColorPickerDemo } from "@/components/docs/color-picker-demo";
import { ColorSwatchBasicDemo } from "@/components/docs/color-swatch-basic-demo";
import { ColorSwatchDemo } from "@/components/docs/color-swatch-demo";
import { ColorSwatchPickerDemo } from "@/components/docs/color-swatch-picker-demo";
import { CommandPaletteBasicDemo } from "@/components/docs/command-palette-basic-demo";
import { CommandPaletteDemo } from "@/components/docs/command-palette-demo";
import {
  type ComponentExample,
  ComponentPage,
} from "@/components/docs/component-page";
import { DateFieldDemo } from "@/components/docs/date-field-demo";
import { DatePickerControlledDemo } from "@/components/docs/date-picker-controlled-demo";
import { DatePickerDemo } from "@/components/docs/date-picker-demo";
import { DatePickerUnavailableDemo } from "@/components/docs/date-picker-unavailable-demo";
import { DateRangePickerDemo } from "@/components/docs/date-range-picker-demo";
import { DateRangePickerLimitsDemo } from "@/components/docs/date-range-picker-limits-demo";
import { DescriptionListDemo } from "@/components/docs/description-list-demo";
import { DisclosureDemo } from "@/components/docs/disclosure-demo";
import { DropZoneDemo } from "@/components/docs/drop-zone-demo";
import { EmptyStateDemo } from "@/components/docs/empty-state-demo";
import { EmptyStateNoActionDemo } from "@/components/docs/empty-state-no-action-demo";
import { FieldsetDemo } from "@/components/docs/fieldset-demo";
import { FileTriggerBasicDemo } from "@/components/docs/file-trigger-basic-demo";
import { FileTriggerDemo } from "@/components/docs/file-trigger-demo";
import { FormDemo } from "@/components/docs/form-demo";
import { FormValidationDemo } from "@/components/docs/form-validation-demo";
import { GridListDemo } from "@/components/docs/grid-list-demo";
import { GridListDisabledDemo } from "@/components/docs/grid-list-disabled-demo";
import { KbdCodeDemo } from "@/components/docs/kbd-code-demo";
import { LinkDemo } from "@/components/docs/link-demo";
import { ListBoxDemo } from "@/components/docs/list-box-demo";
import { ListBoxMultipleDemo } from "@/components/docs/list-box-multiple-demo";
import { MeterBasicDemo } from "@/components/docs/meter-basic-demo";
import { MeterDemo } from "@/components/docs/meter-demo";
import { NumberFieldDemo } from "@/components/docs/number-field-demo";
import { NumberFieldSeatsDemo } from "@/components/docs/number-field-seats-demo";
import { PaginationDemo } from "@/components/docs/pagination-demo";
import { PopoverDemo } from "@/components/docs/popover-demo";
import { PopoverPlacementDemo } from "@/components/docs/popover-placement-demo";
import { PresenceListBasicDemo } from "@/components/docs/presence-list-basic-demo";
import { PresenceListDemo } from "@/components/docs/presence-list-demo";
import { PreviewTriggerDemo } from "@/components/docs/preview-trigger-demo";
import { ProgressBarBasicDemo } from "@/components/docs/progress-bar-basic-demo";
import { ProgressBarDemo } from "@/components/docs/progress-bar-demo";
import { ProgressRingBasicDemo } from "@/components/docs/progress-ring-basic-demo";
import { ProgressRingDemo } from "@/components/docs/progress-ring-demo";
import { RangeCalendarDemo } from "@/components/docs/range-calendar-demo";
import { RangeCalendarLimitsDemo } from "@/components/docs/range-calendar-limits-demo";
import { SeparatorDemo } from "@/components/docs/separator-demo";
import { SeparatorVerticalDemo } from "@/components/docs/separator-vertical-demo";
import { SkeletonDemo } from "@/components/docs/skeleton-demo";
import { SpinnerBasicDemo } from "@/components/docs/spinner-basic-demo";
import { SpinnerDemo } from "@/components/docs/spinner-demo";
import { SpinnerUsageDemo } from "@/components/docs/spinner-usage-demo";
import { StatDemo } from "@/components/docs/stat-demo";
import { StepperBasicDemo } from "@/components/docs/stepper-basic-demo";
import { StepperDemo } from "@/components/docs/stepper-demo";
import { TableBasicDemo } from "@/components/docs/table-basic-demo";
import { TableDemo } from "@/components/docs/table-demo";
import { TableFilterDemo } from "@/components/docs/table-filter-demo";
import { TableSortingDemo } from "@/components/docs/table-sorting-demo";
import { TagGroupDemo } from "@/components/docs/tag-group-demo";
import { TextSwapDemo } from "@/components/docs/text-swap-demo";
import { TimeFieldDemo } from "@/components/docs/time-field-demo";
import { TimelineDemo } from "@/components/docs/timeline-demo";
import { ToggleButtonDemo } from "@/components/docs/toggle-button-demo";
import { ToggleButtonGroupDemo } from "@/components/docs/toggle-button-group-demo";
import { ToggleButtonGroupEditorDemo } from "@/components/docs/toggle-button-group-editor-demo";
import { ToggleButtonProjectsDemo } from "@/components/docs/toggle-button-projects-demo";
import { TokenFieldBasicDemo } from "@/components/docs/token-field-basic-demo";
import { TokenFieldDemo } from "@/components/docs/token-field-demo";
import { ToolbarBasicDemo } from "@/components/docs/toolbar-basic-demo";
import { ToolbarDemo } from "@/components/docs/toolbar-demo";
import { TreeBasicDemo } from "@/components/docs/tree-basic-demo";
import { TreeDemo } from "@/components/docs/tree-demo";

const entries: {
  slug: string;
  name: string;
  description: string;
  hint: string;
  demo: ReactNode;
}[] = [
  {
    slug: "command-palette",
    name: "Command palette",
    description: "Displays a searchable menu for finding and running commands.",
    hint: "Open the palette, type a command, and press Enter; Ctrl+K or ⌘K opens it from anywhere.",
    demo: <CommandPaletteDemo />,
  },
  {
    slug: "token-field",
    name: "Token field",
    description: "A field for entering and editing multiple text tokens.",
    hint: "Type a tag followed by a comma or Enter. Select a tag and delete it with the keyboard.",
    demo: <TokenFieldDemo />,
  },
  {
    slug: "tree",
    name: "Tree",
    description:
      "Displays hierarchical items that can be expanded and selected.",
    hint: "Use arrow keys to move through files and expand or collapse folders.",
    demo: <TreeDemo />,
  },
  {
    slug: "drop-zone",
    name: "Drop zone",
    description:
      "A target for dropping files or choosing them from a file picker.",
    hint: "Drop a PNG, JPEG, or PDF, or use Browse files. This demo does not upload files.",
    demo: <DropZoneDemo />,
  },
  {
    slug: "color-picker",
    name: "Color picker",
    description: "A control for choosing a color with visual and text inputs.",
    hint: "Drag the color thumb, adjust the hue, or type a hex value. Use arrow keys for fine adjustments.",
    demo: <ColorPickerDemo />,
  },
  {
    slug: "separator",
    name: "Separator",
    description: "Visually separates sections of content.",
    hint: "A horizontal rule separates account settings from notifications.",
    demo: <SeparatorDemo />,
  },
  {
    slug: "progress-bar",
    name: "Progress bar",
    description: "Displays the progress of a task in a horizontal bar.",
    hint: "Press the button to move the upload forward.",
    demo: <ProgressBarDemo />,
  },
  {
    slug: "progress-ring",
    name: "Progress ring",
    description: "Displays the progress of a task in a circular indicator.",
    hint: "Advance the upload; the connecting ring keeps running until its status changes.",
    demo: <ProgressRingDemo />,
  },
  {
    slug: "meter",
    name: "Meter",
    description: "Displays a value within a known range.",
    hint: "Move the slider to change the storage reading.",
    demo: <MeterDemo />,
  },
  {
    slug: "number-field",
    name: "Number field",
    description: "A field for entering and adjusting numeric values.",
    hint: "Type a number or use the stepper buttons and arrow keys.",
    demo: <NumberFieldDemo />,
  },
  {
    slug: "toggle-button",
    name: "Toggle button",
    description:
      "A button that switches between selected and unselected states.",
    hint: "Press the button to pin and unpin the item.",
    demo: <ToggleButtonDemo />,
  },
  {
    slug: "button-group",
    name: "Button group",
    description:
      "Joins related actions with shared edges while keeping each button independently focusable.",
    hint: "Save the draft, or open the icon menu for more actions. Each button has its own Tab stop.",
    demo: <ButtonGroupDemo />,
  },
  {
    slug: "toggle-button-group",
    name: "Toggle button group",
    description: "Groups toggle buttons for selecting one or more options.",
    hint: "Switch between day, week, and month with the arrow keys.",
    demo: <ToggleButtonGroupDemo />,
  },
  {
    slug: "breadcrumbs",
    name: "Breadcrumbs",
    description: "Displays a path of links to the current page.",
    hint: "Follow an ancestor link to go back up the hierarchy.",
    demo: <BreadcrumbsDemo />,
  },
  {
    slug: "tag-group",
    name: "Tag group",
    description: "Displays a collection of tags that can be removed.",
    hint: "Remove a topic using its close button or the Delete key.",
    demo: <TagGroupDemo />,
  },
  {
    slug: "list-box",
    name: "List box",
    description: "Displays a list of options for selection.",
    hint: "Select a team with click or arrow keys.",
    demo: <ListBoxDemo />,
  },
  {
    slug: "presence-list",
    name: "Presence list",
    description: "Displays a list with animated item additions and removals.",
    hint: "Add and complete tasks to see the list update.",
    demo: <PresenceListDemo />,
  },
  {
    slug: "color-swatch",
    name: "Color swatch",
    description: "Displays a sample of a color.",
    hint: "Compare the four named colors, including their accessible descriptions.",
    demo: <ColorSwatchDemo />,
  },
  {
    slug: "checkbox-group",
    name: "Checkbox group",
    description: "Groups checkboxes for selecting multiple options.",
    hint: "Choose which email updates to receive.",
    demo: <CheckboxGroupDemo />,
  },
  {
    slug: "disclosure",
    name: "Disclosure",
    description: "Shows or hides a section of content.",
    hint: "Open and close the details with the trigger.",
    demo: <DisclosureDemo />,
  },
  {
    slug: "popover",
    name: "Popover",
    description: "Displays content in a panel anchored to a trigger.",
    hint: "Open the project details and dismiss with Escape.",
    demo: <PopoverDemo />,
  },
  {
    slug: "toolbar",
    name: "Toolbar",
    description: "Groups related controls in a keyboard-navigable row.",
    hint: "Toggle a text style, then use Clear to reset the preview.",
    demo: <ToolbarDemo />,
  },
  {
    slug: "grid-list",
    name: "Grid list",
    description: "Displays a collection of interactive rows.",
    hint: "Choose a file using click or arrow keys.",
    demo: <GridListDemo />,
  },
  {
    slug: "color-field",
    name: "Color field",
    description: "A text field for entering a color value.",
    hint: "Type a new hex value into the field.",
    demo: <ColorFieldDemo />,
  },
  {
    slug: "form",
    name: "Form",
    description: "Groups fields and handles validation and submission.",
    hint: "Enter an email and submit the invitation.",
    demo: <FormDemo />,
  },
  {
    slug: "fieldset",
    name: "Fieldset",
    description: "Groups related form controls under a legend.",
    hint: "Choose the updates for a weekly digest.",
    demo: <FieldsetDemo />,
  },
  {
    slug: "link",
    name: "Link",
    description: "Displays a link to another page or location.",
    hint: "Follow the link back to the catalog.",
    demo: <LinkDemo />,
  },
  {
    slug: "color-swatch-picker",
    name: "Color swatch picker",
    description: "Displays a set of swatches for choosing a color.",
    hint: "Select an accent color with pointer or arrow keys.",
    demo: <ColorSwatchPickerDemo />,
  },
  {
    slug: "date-field",
    name: "Date field",
    description: "A field for entering a date in editable segments.",
    hint: "Adjust the delivery date with arrow keys or type into each segment.",
    demo: <DateFieldDemo />,
  },
  {
    slug: "file-trigger",
    name: "File trigger",
    description: "Opens a file picker from a button or other trigger.",
    hint: "Choose PNG or JPEG images and review their names below the button.",
    demo: <FileTriggerDemo />,
  },
  {
    slug: "calendar",
    name: "Calendar",
    description: "Displays a calendar for selecting a date.",
    hint: "Use the arrow keys to move between days or the buttons to change months.",
    demo: <CalendarDemo />,
  },
  {
    slug: "range-calendar",
    name: "Range calendar",
    description: "Displays a calendar for selecting a date range.",
    hint: "Select a start date, then select an end date.",
    demo: <RangeCalendarDemo />,
  },
  {
    slug: "date-picker",
    name: "Date picker",
    description: "A field for entering a date or choosing one from a calendar.",
    hint: "Edit the segments or open the calendar with the button.",
    demo: <DatePickerDemo />,
  },
  {
    slug: "date-range-picker",
    name: "Date range picker",
    description: "A field for entering or selecting a date range.",
    hint: "Edit either date or select the start and end in the calendar.",
    demo: <DateRangePickerDemo />,
  },
  {
    slug: "preview-trigger",
    name: "Preview trigger",
    description:
      "Displays a preview when its trigger is hovered, focused, or long-pressed.",
    hint: "Focus or hover the button, then Tab into the preview or press Escape.",
    demo: <PreviewTriggerDemo />,
  },
  {
    slug: "table",
    name: "Table",
    description: "Displays data in rows and columns.",
    hint: "Use arrow keys to explore rows; select a row with the keyboard or pointer.",
    demo: <TableDemo />,
  },
  {
    slug: "autocomplete",
    name: "Autocomplete",
    description: "Filters a list of options as you type.",
    hint: "Type a topic to narrow the list; use arrow keys to move through matches.",
    demo: <AutocompleteDemo />,
  },
  {
    slug: "time-field",
    name: "Time field",
    description: "A field for entering a time in editable segments.",
    hint: "Use arrow keys to adjust hours and minutes.",
    demo: <TimeFieldDemo />,
  },
  {
    slug: "card",
    name: "Card",
    description: "Displays a card with header, content, and footer.",
    hint: "A project summary shows the header, content, and footer together.",
    demo: <CardDemo />,
  },
  {
    slug: "avatar",
    name: "Avatar",
    description: "Displays an image or initials for a person.",
    hint: "A group of members shows initials when no images are available.",
    demo: <AvatarDemo />,
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    description: "Displays a placeholder while content loads.",
    hint: "A project card skeleton has a spoken loading label on its container.",
    demo: <SkeletonDemo />,
  },
  {
    slug: "spinner",
    name: "Spinner",
    description: "Displays an indeterminate loading indicator.",
    hint: "Compare loading patterns and finish a simulated assistant response.",
    demo: <SpinnerDemo />,
  },
  {
    slug: "empty-state",
    name: "Empty state",
    description: "Displays a message when there is no content to show.",
    hint: "An empty saved list offers a link back to the catalog.",
    demo: <EmptyStateDemo />,
  },
  {
    slug: "pagination",
    name: "Pagination",
    description: "Displays links for navigating a paginated collection.",
    hint: "Choose a page or use Previous and Next to change the visible projects.",
    demo: <PaginationDemo />,
  },
  {
    slug: "timeline",
    name: "Timeline",
    description: "Displays events in a time-ordered sequence.",
    hint: "Read the project history from the most recent event back.",
    demo: <TimelineDemo />,
  },
  {
    slug: "description-list",
    name: "Description list",
    description: "Displays pairs of terms and descriptions.",
    hint: "Read workspace details as terms and their values.",
    demo: <DescriptionListDemo />,
  },
  {
    slug: "kbd-code",
    name: "Kbd & code",
    description: "Displays keyboard keys and inline code in text.",
    hint: "Read a shortcut and an inline attribute in context.",
    demo: <KbdCodeDemo />,
  },
  {
    slug: "stat",
    name: "Stat",
    description: "Displays a labeled value with supporting details.",
    hint: "Compare project count and storage usage without relying on color.",
    demo: <StatDemo />,
  },
  {
    slug: "animated-number",
    name: "Animated number",
    description: "Displays a number that animates when its value changes.",
    hint: "Add tasks to see the count animate; compare it with the digit-slide variant below.",
    demo: <AnimatedNumberDemo />,
  },
  {
    slug: "text-swap",
    name: "Text swap",
    description: "Displays text that transitions when its value changes.",
    hint: "Change the review status to see the label update.",
    demo: <TextSwapDemo />,
  },
  {
    slug: "stepper",
    name: "Stepper",
    description: "Displays the current step in a sequence.",
    hint: "Use Back and Next to move through the setup steps.",
    demo: <StepperDemo />,
  },
];

const basicPreviews: Record<
  string,
  { demo: ReactNode; source: string; hint: string }
> = {
  avatar: {
    demo: <AvatarBasicDemo />,
    source: "avatar-basic-demo.tsx",
    hint: "The name supplies both the accessible label and fallback initials.",
  },
  "command-palette": {
    demo: <CommandPaletteBasicDemo />,
    source: "command-palette-basic-demo.tsx",
    hint: "Open the commands and choose one, or use Ctrl+K or Command+K.",
  },
  "token-field": {
    demo: <TokenFieldBasicDemo />,
    source: "token-field-basic-demo.tsx",
    hint: "Type a tag and press comma or Enter to add it.",
  },
  "presence-list": {
    demo: <PresenceListBasicDemo />,
    source: "presence-list-basic-demo.tsx",
    hint: "Complete the tasks to see them leave; restore them to see them return.",
  },
  toolbar: {
    demo: <ToolbarBasicDemo />,
    source: "toolbar-basic-demo.tsx",
    hint: "Move between formatting choices with the arrow keys.",
  },
  table: {
    demo: <TableBasicDemo />,
    source: "table-basic-demo.tsx",
    hint: "Read the project and owner columns; use arrow keys to move between cells.",
  },
  stepper: {
    demo: <StepperBasicDemo />,
    source: "stepper-basic-demo.tsx",
    hint: "The second step is current; completed and upcoming steps remain visible.",
  },
  "color-swatch": {
    demo: <ColorSwatchBasicDemo />,
    source: "color-swatch-basic-demo.tsx",
    hint: "Give the color an accessible name even when the sample stands alone.",
  },
  "file-trigger": {
    demo: <FileTriggerBasicDemo />,
    source: "file-trigger-basic-demo.tsx",
    hint: "Choose one image to see its filename. The file stays on this device.",
  },
  meter: {
    demo: <MeterBasicDemo />,
    source: "meter-basic-demo.tsx",
    hint: "Use a meter for a measured amount, not for task progress.",
  },
  tree: {
    demo: <TreeBasicDemo />,
    source: "tree-basic-demo.tsx",
    hint: "Expand a folder or select a file with the arrow keys.",
  },
  spinner: {
    demo: <SpinnerBasicDemo />,
    source: "spinner-basic-demo.tsx",
    hint: "Name a standalone loading indicator; use decorative when nearby text already announces the wait.",
  },
  "animated-number": {
    demo: <AnimatedNumberBasicDemo />,
    source: "animated-number-basic-demo.tsx",
    hint: "Add 125 tasks to see the count move across several digits. Assistive technology receives the target value immediately.",
  },
  "progress-bar": {
    demo: <ProgressBarBasicDemo />,
    source: "progress-bar-basic-demo.tsx",
    hint: "Set a label and value when the amount of work is known.",
  },
  "progress-ring": {
    demo: <ProgressRingBasicDemo />,
    source: "progress-ring-basic-demo.tsx",
    hint: "Set a label and value for a task with known progress.",
  },
};

const featuredExamples: Record<string, ComponentExample[]> = {
  "command-palette": [
    {
      title: "Commands with icons",
      description:
        "Keep one palette on the page. Give each action a readable label and show the result after selection.",
      preview: <CommandPaletteDemo />,
      sourcePath: "src/components/docs/command-palette-demo.tsx",
    },
  ],
  "token-field": [
    {
      title: "Project tags",
      description:
        "Compose the label, input, and description when tags need context. Count committed tokens without counting unfinished text.",
      preview: <TokenFieldDemo />,
      sourcePath: "src/components/docs/token-field-demo.tsx",
    },
  ],
  "presence-list": [
    {
      title: "Release checklist",
      description:
        "Keep stable task keys while adding and completing rows so each exit follows the right item.",
      preview: <PresenceListDemo />,
      sourcePath: "src/components/docs/presence-list-demo.tsx",
    },
  ],
  toolbar: [
    {
      title: "Formatting toolbar",
      description:
        "Combine text styles in one toolbar and separate Clear from the selection group.",
      preview: <ToolbarDemo />,
      sourcePath: "src/components/docs/toolbar-demo.tsx",
    },
  ],
  stepper: [
    {
      title: "Setup workflow",
      description:
        "Keep currentStep in application state when Back and Next controls move through the workflow.",
      preview: <StepperDemo />,
      sourcePath: "src/components/docs/stepper-demo.tsx",
    },
  ],
  "color-swatch": [
    {
      title: "Named palette",
      description:
        "Pair each sample with a visible name when people need to compare several colors.",
      preview: <ColorSwatchDemo />,
      sourcePath: "src/components/docs/color-swatch-demo.tsx",
    },
  ],
  "file-trigger": [
    {
      title: "Multiple images",
      description:
        "Use allowsMultiple for a batch of files. Restrict accepted types and list the selected filenames before uploading anything.",
      preview: <FileTriggerDemo />,
      sourcePath: "src/components/docs/file-trigger-demo.tsx",
    },
  ],
  meter: [
    {
      title: "Updating a reading",
      description:
        "Connect a value to application state when a measurement changes. The slider only simulates a storage reading in this example.",
      preview: <MeterDemo />,
      sourcePath: "src/components/docs/meter-demo.tsx",
    },
  ],
  tree: [
    {
      title: "Custom row content",
      description:
        "Use content for visible row details while the title remains the text used for keyboard typeahead.",
      preview: <TreeDemo />,
      sourcePath: "src/components/docs/tree-demo.tsx",
    },
  ],
  "checkbox-group": [
    {
      title: "Required choice",
      description:
        "Mark the group invalid until at least one channel is selected. Keep the error beside the choices so the fix is clear.",
      preview: <CheckboxGroupRequiredDemo />,
      sourcePath: "src/components/docs/checkbox-group-required-demo.tsx",
    },
  ],
  "list-box": [
    {
      title: "Multiple selection",
      description:
        "Use multiple selection when people may choose more than one team. Selections remain highlighted while navigating the list.",
      preview: <ListBoxMultipleDemo />,
      sourcePath: "src/components/docs/list-box-multiple-demo.tsx",
    },
  ],
  "grid-list": [
    {
      title: "Unavailable row",
      description:
        "Keep an unavailable file visible and explain why it cannot be selected.",
      preview: <GridListDisabledDemo />,
      sourcePath: "src/components/docs/grid-list-disabled-demo.tsx",
    },
  ],
  separator: [
    {
      title: "Vertical separator",
      description:
        "Set orientation to vertical between adjacent labels. The parent row supplies the separator's height.",
      preview: <SeparatorVerticalDemo />,
      sourcePath: "src/components/docs/separator-vertical-demo.tsx",
    },
  ],
  popover: [
    {
      title: "Placement",
      description:
        "Use placement to put the popover above its trigger. It can flip when there is not enough room.",
      preview: <PopoverPlacementDemo />,
      sourcePath: "src/components/docs/popover-placement-demo.tsx",
    },
  ],
  "empty-state": [
    {
      title: "No matching results",
      description:
        "Omit the action when the user can resolve the empty result by changing an existing search instead.",
      preview: <EmptyStateNoActionDemo />,
      sourcePath: "src/components/docs/empty-state-no-action-demo.tsx",
    },
  ],
  table: [
    {
      title: "Selectable projects",
      description:
        "Add single-row selection when the user needs to choose a project. Keep status readable in every row.",
      preview: <TableDemo />,
      sourcePath: "src/components/docs/table-demo.tsx",
    },
  ],
  "button-group": [
    {
      title: "Vertical draft actions",
      description:
        "Stack two actions in a column. Each button stays in the Tab order and changes the draft status.",
      preview: <ButtonGroupVerticalDemo />,
      sourcePath: "src/components/docs/button-group-vertical-demo.tsx",
    },
  ],
  avatar: [
    {
      title: "Assigned reviewers",
      description:
        "Group named fallbacks when several people own the same review.",
      preview: <AvatarDemo />,
      sourcePath: "src/components/docs/avatar-demo.tsx",
    },
  ],
  spinner: [
    {
      title: "Loading patterns",
      description:
        "Compare all seven variants before choosing one for the space available.",
      preview: <SpinnerDemo />,
      sourcePath: "src/components/docs/spinner-demo.tsx",
    },
  ],
  "animated-number": [
    {
      title: "Task counter variants",
      description:
        "Change each total separately. Count moves between totals; digit slide rolls the changed places in both directions.",
      preview: <AnimatedNumberDemo />,
      sourcePath: "src/components/docs/animated-number-demo.tsx",
    },
  ],
  "progress-bar": [
    {
      title: "Campaign asset upload",
      description:
        "Advance the file upload while preview preparation stays indeterminate until the upload completes.",
      preview: <ProgressBarDemo />,
      sourcePath: "src/components/docs/progress-bar-demo.tsx",
    },
  ],
  "progress-ring": [
    {
      title: "Known and unknown progress",
      description:
        "Advance a determinate upload while the connection remains indeterminate.",
      preview: <ProgressRingDemo />,
      sourcePath: "src/components/docs/progress-ring-demo.tsx",
    },
  ],
  "toggle-button": [
    {
      title: "Pinned projects",
      description:
        "Pin a project to mark it for quick access. The badge repeats the state without relying on color.",
      preview: <ToggleButtonProjectsDemo />,
      sourcePath: "src/components/docs/toggle-button-projects-demo.tsx",
    },
  ],
  "number-field": [
    {
      title: "Team seat estimate",
      description:
        "Adjust seats within a plan limit and see the monthly estimate before saving the new count.",
      preview: <NumberFieldSeatsDemo />,
      sourcePath: "src/components/docs/number-field-seats-demo.tsx",
    },
  ],
  "toggle-button-group": [
    {
      title: "Multiple text styles",
      description:
        "Combine formatting options and see the resulting text without leaving the editor.",
      preview: <ToggleButtonGroupEditorDemo />,
      sourcePath: "src/components/docs/toggle-button-group-editor-demo.tsx",
    },
  ],
};

const customSlugs = new Set([
  "card",
  "avatar",
  "skeleton",
  "spinner",
  "empty-state",
  "pagination",
  "description-list",
  "kbd-code",
  "stat",
  "command-palette",
  "fieldset",
  "animated-number",
  "progress-ring",
  "presence-list",
  "button-group",
  "timeline",
  "text-swap",
  "stepper",
]);

export function generateStaticParams() {
  return entries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/components/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const entry = entries.find((item) => item.slug === slug);
  return entry
    ? { title: `${entry.name} | vip/ui`, description: entry.description }
    : {};
}

export default async function NewComponentPage({
  params,
}: PageProps<"/components/[slug]">) {
  const { slug } = await params;
  const index = entries.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const entry = entries[index];
  const previous = entries[index - 1];
  const next = entries[index + 1];
  const basic = basicPreviews[slug];
  return (
    <ComponentPage
      name={entry.name}
      description={entry.description}
      reactAriaDocsHref={
        slug === "progress-ring"
          ? "https://react-aria.adobe.com/ProgressBar"
          : customSlugs.has(slug)
            ? undefined
            : `https://react-aria.adobe.com/${slug
                .split("-")
                .map((part) => part[0].toUpperCase() + part.slice(1))
                .join("")}`
      }
      preview={basic?.demo ?? entry.demo}
      previewHint={basic?.hint ?? entry.hint}
      previewSourcePath={`src/components/docs/${basic?.source ?? `${slug}-demo.tsx`}`}
      examples={[
        ...(featuredExamples[slug] ?? []),
        ...(slug === "spinner"
          ? [
              {
                title: "Loading in context",
                description:
                  "Use a compact ring in a disabled button, or pair a larger indicator with a spoken status for a waiting screen.",
                preview: <SpinnerUsageDemo />,
                sourcePath: "src/components/docs/spinner-usage-demo.tsx",
              },
            ]
          : slug === "date-picker"
            ? [
                {
                  title: "Unavailable dates",
                  description:
                    "Restrict a booking window and exclude weekends and blocked days. Try typing an unavailable date as well as choosing one in the calendar.",
                  preview: <DatePickerUnavailableDemo />,
                  sourcePath:
                    "src/components/docs/date-picker-unavailable-demo.tsx",
                },
                {
                  title: "Controlled value",
                  description:
                    "Keep the selected date in application state and display it elsewhere on the page.",
                  preview: <DatePickerControlledDemo />,
                  sourcePath:
                    "src/components/docs/date-picker-controlled-demo.tsx",
                },
              ]
            : slug === "calendar"
              ? [
                  {
                    title: "Unavailable days",
                    description:
                      "Limit selection to June and make weekends unavailable.",
                    preview: <CalendarUnavailableDemo />,
                    sourcePath:
                      "src/components/docs/calendar-unavailable-demo.tsx",
                  },
                ]
              : slug === "date-range-picker"
                ? [
                    {
                      title: "Restricted range",
                      description:
                        "Limit the travel window and block dates that cannot be booked.",
                      preview: <DateRangePickerLimitsDemo />,
                      sourcePath:
                        "src/components/docs/date-range-picker-limits-demo.tsx",
                    },
                  ]
                : slug === "range-calendar"
                  ? [
                      {
                        title: "Restricted range",
                        description:
                          "Choose a range in June while excluding dates that cannot be booked.",
                        preview: <RangeCalendarLimitsDemo />,
                        sourcePath:
                          "src/components/docs/range-calendar-limits-demo.tsx",
                      },
                    ]
                  : slug === "table"
                    ? [
                        {
                          title: "Sortable columns",
                          description:
                            "Sort the backlog by project, owner, or open tasks. Column headers announce the direction.",
                          preview: <TableSortingDemo />,
                          sourcePath:
                            "src/components/docs/table-sorting-demo.tsx",
                        },
                        {
                          title: "Filter invoices",
                          description:
                            "Search by invoice number or customer, narrow by status, and try a query with no matches.",
                          preview: <TableFilterDemo />,
                          sourcePath:
                            "src/components/docs/table-filter-demo.tsx",
                        },
                      ]
                    : slug === "card"
                      ? [
                          {
                            title: "Invoice review",
                            description:
                              "See an itemized total and approve the invoice locally. Compose Card sections with Badge and Button for the status and action.",
                            preview: <CardInvoiceDemo />,
                            sourcePath:
                              "src/components/docs/card-invoice-demo.tsx",
                          },
                        ]
                      : slug === "form"
                        ? [
                            {
                              title: "Custom validation",
                              description:
                                "Try submitting an empty or short workspace name. The field reports its error before submission.",
                              preview: <FormValidationDemo />,
                              sourcePath:
                                "src/components/docs/form-validation-demo.tsx",
                            },
                          ]
                        : []),
      ]}
      sourcePath={`src/components/ui/${slug}.tsx`}
      previous={
        previous
          ? { name: previous.name, href: `/components/${previous.slug}` }
          : { name: "Toast", href: "/components/toast" }
      }
      next={next && { name: next.name, href: `/components/${next.slug}` }}
    />
  );
}
