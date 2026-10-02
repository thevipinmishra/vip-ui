import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { AnimatedNumberDemo } from "@/components/docs/animated-number-demo";
import { AutocompleteDemo } from "@/components/docs/autocomplete-demo";
import { AvatarDemo } from "@/components/docs/avatar-demo";
import { BreadcrumbsDemo } from "@/components/docs/breadcrumbs-demo";
import { ButtonGroupDemo } from "@/components/docs/button-group-demo";
import { CalendarDemo } from "@/components/docs/calendar-demo";
import { CalendarUnavailableDemo } from "@/components/docs/calendar-unavailable-demo";
import { CardDemo } from "@/components/docs/card-demo";
import { CardInvoiceDemo } from "@/components/docs/card-invoice-demo";
import { CheckboxGroupDemo } from "@/components/docs/checkbox-group-demo";
import { ColorFieldDemo } from "@/components/docs/color-field-demo";
import { ColorPickerDemo } from "@/components/docs/color-picker-demo";
import { ColorSwatchDemo } from "@/components/docs/color-swatch-demo";
import { ColorSwatchPickerDemo } from "@/components/docs/color-swatch-picker-demo";
import { CommandPaletteDemo } from "@/components/docs/command-palette-demo";
import { ComponentPage } from "@/components/docs/component-page";
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
import { FieldsetDemo } from "@/components/docs/fieldset-demo";
import { FileTriggerDemo } from "@/components/docs/file-trigger-demo";
import { FormDemo } from "@/components/docs/form-demo";
import { FormValidationDemo } from "@/components/docs/form-validation-demo";
import { GridListDemo } from "@/components/docs/grid-list-demo";
import { KbdCodeDemo } from "@/components/docs/kbd-code-demo";
import { LinkDemo } from "@/components/docs/link-demo";
import { ListBoxDemo } from "@/components/docs/list-box-demo";
import { MeterDemo } from "@/components/docs/meter-demo";
import { NumberFieldDemo } from "@/components/docs/number-field-demo";
import { PaginationDemo } from "@/components/docs/pagination-demo";
import { PopoverDemo } from "@/components/docs/popover-demo";
import { PresenceListDemo } from "@/components/docs/presence-list-demo";
import { PreviewTriggerDemo } from "@/components/docs/preview-trigger-demo";
import { ProgressBarDemo } from "@/components/docs/progress-bar-demo";
import { ProgressRingDemo } from "@/components/docs/progress-ring-demo";
import { RangeCalendarDemo } from "@/components/docs/range-calendar-demo";
import { RangeCalendarLimitsDemo } from "@/components/docs/range-calendar-limits-demo";
import { SeparatorDemo } from "@/components/docs/separator-demo";
import { SkeletonDemo } from "@/components/docs/skeleton-demo";
import { SpinnerDemo } from "@/components/docs/spinner-demo";
import { SpinnerUsageDemo } from "@/components/docs/spinner-usage-demo";
import { StatDemo } from "@/components/docs/stat-demo";
import { StepperDemo } from "@/components/docs/stepper-demo";
import { TableDemo } from "@/components/docs/table-demo";
import { TableFilterDemo } from "@/components/docs/table-filter-demo";
import { TableSortingDemo } from "@/components/docs/table-sorting-demo";
import { TagGroupDemo } from "@/components/docs/tag-group-demo";
import { TextSwapDemo } from "@/components/docs/text-swap-demo";
import { TimeFieldDemo } from "@/components/docs/time-field-demo";
import { TimelineDemo } from "@/components/docs/timeline-demo";
import { ToggleButtonDemo } from "@/components/docs/toggle-button-demo";
import { ToggleButtonGroupDemo } from "@/components/docs/toggle-button-group-demo";
import { TokenFieldDemo } from "@/components/docs/token-field-demo";
import { ToolbarDemo } from "@/components/docs/toolbar-demo";
import { TreeDemo } from "@/components/docs/tree-demo";
import { TypingIndicatorDemo } from "@/components/docs/typing-indicator-demo";

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
    description: "Find and run actions from a searchable keyboard menu.",
    hint: "Open the palette, type a command, and press Enter; Ctrl+K or ⌘K opens it from anywhere.",
    demo: <CommandPaletteDemo />,
  },
  {
    slug: "token-field",
    name: "Token field",
    description: "Enter and edit several tags in one text field.",
    hint: "Type a tag followed by a comma or Enter. Select a tag and delete it with the keyboard.",
    demo: <TokenFieldDemo />,
  },
  {
    slug: "tree",
    name: "Tree",
    description: "Browse and select items in a nested collection.",
    hint: "Use arrow keys to move through files and expand or collapse folders.",
    demo: <TreeDemo />,
  },
  {
    slug: "drop-zone",
    name: "Drop zone",
    description: "Accept files by drag and drop or the file picker.",
    hint: "Drop a PNG, JPEG, or PDF, or use Browse files. This demo does not upload files.",
    demo: <DropZoneDemo />,
  },
  {
    slug: "color-picker",
    name: "Color picker",
    description: "Choose a color with a visual area, hue slider, or hex field.",
    hint: "Drag the color thumb, adjust the hue, or type a hex value. Use arrow keys for fine adjustments.",
    demo: <ColorPickerDemo />,
  },
  {
    slug: "separator",
    name: "Separator",
    description:
      "Divide related groups of content without adding another heading.",
    hint: "A horizontal rule separates account settings from notifications.",
    demo: <SeparatorDemo />,
  },
  {
    slug: "progress-bar",
    name: "Progress bar",
    description:
      "Show how much of a task has finished while it is still running.",
    hint: "Press the button to move the upload forward.",
    demo: <ProgressBarDemo />,
  },
  {
    slug: "progress-ring",
    name: "Progress ring",
    description:
      "Show known or unknown progress in a compact circular indicator.",
    hint: "Advance the upload; the connecting ring keeps running until its status changes.",
    demo: <ProgressRingDemo />,
  },
  {
    slug: "meter",
    name: "Meter",
    description:
      "Show a measured quantity against a known range, such as storage used.",
    hint: "Move the slider to change the storage reading.",
    demo: <MeterDemo />,
  },
  {
    slug: "number-field",
    name: "Number field",
    description: "Enter a precise number or adjust it one step at a time.",
    hint: "Type a number or use the stepper buttons and arrow keys.",
    demo: <NumberFieldDemo />,
  },
  {
    slug: "toggle-button",
    name: "Toggle button",
    description:
      "Switch a persistent action such as pinning an item on or off.",
    hint: "Press the button to pin and unpin the item.",
    demo: <ToggleButtonDemo />,
  },
  {
    slug: "button-group",
    name: "Button group",
    description: "Place related independent actions in a labeled group.",
    hint: "Zoom the preview in or out; each button remains a separate action.",
    demo: <ButtonGroupDemo />,
  },
  {
    slug: "toggle-button-group",
    name: "Toggle button group",
    description: "Choose one or more options in a compact group of buttons.",
    hint: "Switch calendar views, or combine text styles in the second group.",
    demo: <ToggleButtonGroupDemo />,
  },
  {
    slug: "breadcrumbs",
    name: "Breadcrumbs",
    description:
      "Show a page's place in a hierarchy with links back to its ancestors.",
    hint: "Follow an ancestor link to go back up the hierarchy.",
    demo: <BreadcrumbsDemo />,
  },
  {
    slug: "tag-group",
    name: "Tag group",
    description:
      "Display a set of tags that users can navigate and remove with the keyboard.",
    hint: "Remove a topic using its close button or the Delete key.",
    demo: <TagGroupDemo />,
  },
  {
    slug: "list-box",
    name: "List box",
    description:
      "Choose an option from a visible list using pointer or keyboard navigation.",
    hint: "Select a team with click or arrow keys.",
    demo: <ListBoxDemo />,
  },
  {
    slug: "presence-list",
    name: "Presence list",
    description: "Animate items as they join or leave a plain list.",
    hint: "Add and complete tasks to see the list update.",
    demo: <PresenceListDemo />,
  },
  {
    slug: "color-swatch",
    name: "Color swatch",
    description: "Show a color sample alongside a readable name.",
    hint: "Compare the four named colors, including their accessible descriptions.",
    demo: <ColorSwatchDemo />,
  },
  {
    slug: "checkbox-group",
    name: "Checkbox group",
    description: "Select any number of related options in a labeled group.",
    hint: "Choose which email updates to receive.",
    demo: <CheckboxGroupDemo />,
  },
  {
    slug: "disclosure",
    name: "Disclosure",
    description: "Reveal optional details without leaving the current page.",
    hint: "Open and close the details with the trigger.",
    demo: <DisclosureDemo />,
  },
  {
    slug: "popover",
    name: "Popover",
    description: "Show contextual content anchored to a trigger.",
    hint: "Open the project details and dismiss with Escape.",
    demo: <PopoverDemo />,
  },
  {
    slug: "toolbar",
    name: "Toolbar",
    description: "Group related actions with arrow-key navigation.",
    hint: "Toggle a text style, then use Clear to reset the preview.",
    demo: <ToolbarDemo />,
  },
  {
    slug: "grid-list",
    name: "Grid list",
    description: "Navigate and select interactive rows with a keyboard.",
    hint: "Choose a file using click or arrow keys.",
    demo: <GridListDemo />,
  },
  {
    slug: "color-field",
    name: "Color field",
    description: "Edit a color using a text value.",
    hint: "Type a new hex value into the field.",
    demo: <ColorFieldDemo />,
  },
  {
    slug: "form",
    name: "Form",
    description: "Collect and validate related inputs before submission.",
    hint: "Enter an email and submit the invitation.",
    demo: <FormDemo />,
  },
  {
    slug: "fieldset",
    name: "Fieldset",
    description: "Group related form controls under a shared legend.",
    hint: "Choose the updates for a weekly digest.",
    demo: <FieldsetDemo />,
  },
  {
    slug: "link",
    name: "Link",
    description:
      "Navigate to another page with a keyboard-accessible text link.",
    hint: "Follow the link back to the catalog.",
    demo: <LinkDemo />,
  },
  {
    slug: "color-swatch-picker",
    name: "Color swatch picker",
    description: "Choose one color from a visible set of swatches.",
    hint: "Select an accent color with pointer or arrow keys.",
    demo: <ColorSwatchPickerDemo />,
  },
  {
    slug: "date-field",
    name: "Date field",
    description: "Enter a date one segment at a time with the keyboard.",
    hint: "Adjust the delivery date with arrow keys or type into each segment.",
    demo: <DateFieldDemo />,
  },
  {
    slug: "file-trigger",
    name: "File trigger",
    description: "Open the file chooser from an accessible button.",
    hint: "Choose PNG or JPEG images and review their names below the button.",
    demo: <FileTriggerDemo />,
  },
  {
    slug: "calendar",
    name: "Calendar",
    description: "Browse months and choose a single day.",
    hint: "Use the arrow keys to move between days or the buttons to change months.",
    demo: <CalendarDemo />,
  },
  {
    slug: "range-calendar",
    name: "Range calendar",
    description: "Choose a start and end date from a calendar grid.",
    hint: "Select a start date, then select an end date.",
    demo: <RangeCalendarDemo />,
  },
  {
    slug: "date-picker",
    name: "Date picker",
    description: "Type a date or choose one from a calendar popover.",
    hint: "Edit the segments or open the calendar with the button.",
    demo: <DatePickerDemo />,
  },
  {
    slug: "date-range-picker",
    name: "Date range picker",
    description: "Enter two dates or select a range in a popover.",
    hint: "Edit either date or select the start and end in the calendar.",
    demo: <DateRangePickerDemo />,
  },
  {
    slug: "preview-trigger",
    name: "Preview trigger",
    description: "Show an interactive preview on hover, focus, or long press.",
    hint: "Focus or hover the button, then Tab into the preview or press Escape.",
    demo: <PreviewTriggerDemo />,
  },
  {
    slug: "table",
    name: "Table",
    description:
      "Read structured data by row and column, with optional selection.",
    hint: "Use arrow keys to explore rows; select a row with the keyboard or pointer.",
    demo: <TableDemo />,
  },
  {
    slug: "autocomplete",
    name: "Autocomplete",
    description: "Filter a visible collection as you type.",
    hint: "Type a topic to narrow the list; use arrow keys to move through matches.",
    demo: <AutocompleteDemo />,
  },
  {
    slug: "time-field",
    name: "Time field",
    description: "Enter a time with individually editable segments.",
    hint: "Use arrow keys to adjust hours and minutes.",
    demo: <TimeFieldDemo />,
  },
  {
    slug: "card",
    name: "Card",
    description: "Group related content and actions in one section.",
    hint: "A project summary shows the header, content, and footer together.",
    demo: <CardDemo />,
  },
  {
    slug: "avatar",
    name: "Avatar",
    description: "Show a person with an image or named initials fallback.",
    hint: "A group of members shows initials when no images are available.",
    demo: <AvatarDemo />,
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    description: "Reserve the shape of content while it loads.",
    hint: "A project card skeleton has a spoken loading label on its container.",
    demo: <SkeletonDemo />,
  },
  {
    slug: "spinner",
    name: "Spinner",
    description:
      "Show that work is still in progress when the duration is unknown.",
    hint: "Compare loading patterns and finish a simulated assistant response.",
    demo: <SpinnerDemo />,
  },
  {
    slug: "empty-state",
    name: "Empty state",
    description:
      "Explain why a collection is empty and offer a useful next step.",
    hint: "An empty saved list offers a link back to the catalog.",
    demo: <EmptyStateDemo />,
  },
  {
    slug: "pagination",
    name: "Pagination",
    description: "Move between pages of a long collection with ordinary links.",
    hint: "Choose a page or use Previous and Next to change the visible projects.",
    demo: <PaginationDemo />,
  },
  {
    slug: "timeline",
    name: "Timeline",
    description: "Show dated events as an ordered sequence.",
    hint: "Read the project history from the most recent event back.",
    demo: <TimelineDemo />,
  },
  {
    slug: "description-list",
    name: "Description list",
    description: "Pair labels with values in a record or summary.",
    hint: "Read workspace details as terms and their values.",
    demo: <DescriptionListDemo />,
  },
  {
    slug: "kbd-code",
    name: "Kbd & code",
    description: "Distinguish keyboard shortcuts and inline code from prose.",
    hint: "Read a shortcut and an inline attribute in context.",
    demo: <KbdCodeDemo />,
  },
  {
    slug: "stat",
    name: "Stat",
    description: "Show a key value with its label and plain-language context.",
    hint: "Compare project count and storage usage without relying on color.",
    demo: <StatDemo />,
  },
  {
    slug: "animated-number",
    name: "Animated number",
    description:
      "Update a numeric value without animating its accessible text.",
    hint: "Change one task to see only the changed digit slide, or add 54 to update several digits.",
    demo: <AnimatedNumberDemo />,
  },
  {
    slug: "text-swap",
    name: "Text swap",
    description: "Transition a short label when its value changes.",
    hint: "Change the review status to see the label update.",
    demo: <TextSwapDemo />,
  },
  {
    slug: "stepper",
    name: "Stepper",
    description: "Show the current and completed steps in a workflow.",
    hint: "Use Back and Next to move through the setup steps.",
    demo: <StepperDemo />,
  },
  {
    slug: "typing-indicator",
    name: "Typing indicator",
    description: "Show who is composing a message in a conversation.",
    hint: "Stop or restart the typing status.",
    demo: <TypingIndicatorDemo />,
  },
];

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
  "typing-indicator",
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
      preview={entry.demo}
      previewHint={entry.hint}
      previewSourcePath={`src/components/docs/${slug}-demo.tsx`}
      examples={
        slug === "spinner"
          ? [
              {
                title: "In context",
                description:
                  "Use a compact ring in a button, or pair a larger indicator with a spoken status for a waiting screen.",
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
                        : []
      }
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
