export interface CompositionPart {
  part: string;
  purpose: string;
  children?: CompositionPart[];
}

export interface Composition {
  parts: CompositionPart[];
  helper?: CompositionPart;
}

export const compositions: Record<string, Composition> = {
  "tool-call": {
    parts: [
      {
        part: "ToolCall",
        purpose:
          "Holds the expanded state. Accepts isExpanded, defaultExpanded, and onExpandedChange.",
        children: [
          {
            part: "ToolCallTrigger",
            purpose:
              "Shows the tool name and status. Opens and closes the panel.",
          },
          {
            part: "ToolCallPanel",
            purpose: "Contains the input and the output.",
          },
        ],
      },
    ],
  },
  "stagger-group": {
    parts: [
      {
        part: "StaggerGroup",
        purpose:
          "Starts the sequence on mount or in view and sets the delay between items.",
        children: [
          {
            part: "StaggerItem",
            purpose: "Fades in and moves up in its turn.",
          },
        ],
      },
    ],
  },
  attachment: {
    parts: [
      {
        part: "AttachmentList",
        purpose:
          "Groups keyed file rows and handles their entrance and exit motion.",
        children: [
          {
            part: "Attachment",
            purpose:
              "Displays one file and the app-supplied status or actions.",
          },
        ],
      },
    ],
  },
  accordion: {
    parts: [
      {
        part: "Accordion",
        purpose: "Owns the expansion state and layout.",
        children: [
          {
            part: "AccordionItem",
            purpose: "Identifies each section. Repeat for each section.",
            children: [
              {
                part: "AccordionTrigger",
                purpose: "Opens or closes its section.",
              },
              {
                part: "AccordionContent",
                purpose: "Holds the section content.",
              },
            ],
          },
        ],
      },
    ],
  },
  alert: {
    parts: [
      {
        part: "Alert",
        purpose: "Sets the message variant.",
        children: [
          { part: "AlertIcon", purpose: "Shows the variant icon." },
          { part: "AlertTitle", purpose: "Names the message." },
          {
            part: "AlertDescription",
            purpose: "Gives the detail or next step.",
          },
        ],
      },
    ],
  },
  "button-group": {
    parts: [
      {
        part: "ButtonGroup",
        purpose: "Joins the edges of two or more related buttons.",
        children: [
          {
            part: "Button",
            purpose:
              "Performs an action. Each button remains separately focusable.",
          },
        ],
      },
    ],
  },
  select: {
    parts: [
      {
        part: "Select",
        purpose: "Owns the value and field state.",
        children: [
          { part: "SelectLabel", purpose: "Names the field." },
          { part: "SelectTrigger", purpose: "Opens the options." },
          {
            part: "SelectDescription",
            purpose: "Adds help below the trigger.",
          },
          { part: "SelectError", purpose: "Explains an invalid selection." },
          {
            part: "SelectContent",
            purpose: "Contains the options.",
            children: [
              {
                part: "SelectItem",
                purpose: "Defines one option. Repeat for each choice.",
              },
            ],
          },
        ],
      },
    ],
  },
  dialog: {
    parts: [
      {
        part: "Dialog",
        purpose: "Owns the open state.",
        children: [
          { part: "DialogTrigger", purpose: "Opens the dialog." },
          {
            part: "DialogContent",
            purpose: "Contains the modal task.",
            children: [
              {
                part: "DialogHeader",
                purpose: "Groups the title and close control.",
                children: [
                  { part: "DialogTitle", purpose: "Names the modal task." },
                  {
                    part: "DialogClose",
                    purpose:
                      "Closes the dialog. Without children, it is an X icon.",
                  },
                ],
              },
              { part: "DialogDescription", purpose: "Explains the task." },
              {
                part: "DialogFooter",
                purpose: "Groups the task actions.",
                children: [
                  {
                    part: "DialogClose",
                    purpose: "Closes the dialog with a text button.",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  popover: {
    parts: [
      {
        part: "DialogTrigger",
        purpose: "Owns the open state. Import it from react-aria-components.",
        children: [
          { part: "Button", purpose: "Opens the popover." },
          {
            part: "Popover",
            purpose: "Shows the panel next to the trigger.",
            children: [
              {
                part: "Dialog",
                purpose:
                  "Holds the content and moves focus into it. Import it from react-aria-components.",
                children: [
                  {
                    part: "Heading",
                    purpose: 'Names the popover. Set slot="title".',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  tooltip: {
    parts: [
      {
        part: "TooltipTrigger",
        purpose: "Opens the tooltip on hover or keyboard focus.",
        children: [
          {
            part: "Button",
            purpose: "The trigger. It must be focusable.",
          },
          { part: "TooltipContent", purpose: "Shows the hint text." },
        ],
      },
    ],
  },
  "context-menu": {
    parts: [
      {
        part: "ContextMenuTrigger",
        purpose:
          "Opens the menu on right-click or long press. On the keyboard, press Shift+F10, or Control+Enter on macOS.",
        children: [
          {
            part: "Button",
            purpose:
              "The item. It must be focusable to open from the keyboard.",
          },
          {
            part: "ContextMenu",
            purpose: "Positions the menu and manages keyboard focus.",
            children: [
              {
                part: "ContextMenuItem",
                purpose: "Runs an action. Repeat for each available action.",
              },
            ],
          },
        ],
      },
    ],
  },
  "command-palette": {
    parts: [
      {
        part: "CommandPalette",
        purpose:
          "Opens the modal search, filters the items, and closes after an action.",
        children: [
          {
            part: "CommandPaletteSection",
            purpose: "Groups related items under a heading.",
            children: [
              {
                part: "CommandPaletteItem",
                purpose: "Runs an action. Repeat for each command.",
              },
            ],
          },
        ],
      },
    ],
  },
  toast: {
    parts: [
      {
        part: "ToastViewport",
        purpose:
          "Shows up to three toasts in the bottom corner, newest at the bottom. Other toasts wait. Render it once in the root layout.",
      },
    ],
    helper: {
      part: "showToast",
      purpose:
        "Adds a toast to the queue and returns its key. Call it from an event handler; it is not a JSX child.",
    },
  },
  menu: {
    parts: [
      {
        part: "MenuTrigger",
        purpose: "Connects the button to the menu.",
        children: [
          { part: "Button", purpose: "Opens the menu." },
          {
            part: "MenuPopover",
            purpose: "Positions the menu.",
            children: [
              {
                part: "MenuContent",
                purpose: "Owns focus and selection.",
                children: [
                  {
                    part: "MenuItem",
                    purpose:
                      "Runs an action or selects an option. Repeat for each action.",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  "search-field": {
    parts: [
      {
        part: "SearchField",
        purpose: "Owns the query and submission state.",
        children: [
          { part: "SearchFieldLabel", purpose: "Names the search." },
          { part: "SearchFieldInput", purpose: "Accepts the query." },
          { part: "SearchFieldClear", purpose: "Resets the query." },
          {
            part: "SearchFieldDescription",
            purpose: "Adds help below the input.",
          },
          { part: "SearchFieldError", purpose: "Explains an invalid query." },
        ],
      },
    ],
  },
  "text-field": {
    parts: [
      {
        part: "TextField",
        purpose: "Owns the value and validation state.",
        children: [
          { part: "TextFieldLabel", purpose: "Names the input." },
          { part: "TextFieldInput", purpose: "Accepts the value." },
          { part: "TextFieldDescription", purpose: "Adds input guidance." },
          { part: "TextFieldError", purpose: "Explains an invalid value." },
        ],
      },
    ],
  },
  "text-area": {
    parts: [
      {
        part: "TextArea",
        purpose: "Owns the value and validation state.",
        children: [
          { part: "TextAreaLabel", purpose: "Names the input." },
          { part: "TextAreaInput", purpose: "Accepts multiline text." },
          { part: "TextAreaDescription", purpose: "Adds input guidance." },
          { part: "TextAreaError", purpose: "Explains an invalid value." },
        ],
      },
    ],
  },
  "input-group": {
    parts: [
      {
        part: "TextField or TextArea",
        purpose:
          "Owns the label and validation state. Choose one and install it separately.",
        children: [
          {
            part: "InputGroup",
            purpose: "Shares a border between the input and addons.",
            children: [
              {
                part: "InputGroupInput",
                purpose: "Accepts a single-line value in TextField.",
              },
              {
                part: "InputGroupTextArea",
                purpose: "Accepts multiline text in TextArea instead.",
              },
              {
                part: "InputGroupAddon",
                purpose: "Places text or an action beside the input.",
              },
            ],
          },
        ],
      },
    ],
  },
  "combo-box": {
    parts: [
      {
        part: "ComboBox",
        purpose: "Owns the search and selected value.",
        children: [
          { part: "ComboBoxLabel", purpose: "Names the field." },
          { part: "ComboBoxInput", purpose: "Filters the choices." },
          { part: "ComboBoxTrigger", purpose: "Opens the choices." },
          {
            part: "ComboBoxTags",
            purpose:
              "Shows removable selections in multiple mode. The default layout includes it.",
          },
          {
            part: "ComboBoxDescription",
            purpose: "Adds help below the input.",
          },
          { part: "ComboBoxError", purpose: "Explains an invalid value." },
          {
            part: "ComboBoxContent",
            purpose: "Contains the options.",
            children: [
              {
                part: "ComboBoxItem",
                purpose: "Defines one option. Repeat for each choice.",
              },
            ],
          },
        ],
      },
    ],
  },
  "checkbox-group": {
    parts: [
      {
        part: "CheckboxGroup",
        purpose: "Owns the selected values.",
        children: [
          { part: "CheckboxGroupLabel", purpose: "Names the group." },
          {
            part: "CheckboxGroupDescription",
            purpose: "Adds help below the label.",
          },
          {
            part: "CheckboxGroupItems",
            purpose: "Contains the choices.",
            children: [
              {
                part: "Checkbox",
                purpose: "Defines one choice. Repeat for each option.",
              },
            ],
          },
          {
            part: "CheckboxGroupError",
            purpose: "Explains invalid selection.",
          },
        ],
      },
    ],
  },
  "radio-group": {
    parts: [
      {
        part: "RadioGroup",
        purpose: "Owns the single selected value.",
        children: [
          { part: "RadioGroupLabel", purpose: "Names the group." },
          {
            part: "RadioGroupDescription",
            purpose: "Adds help below the label.",
          },
          {
            part: "RadioGroupItems",
            purpose: "Contains the choices and follows the orientation.",
            children: [
              {
                part: "Radio",
                purpose: "Defines one choice. Repeat for each option.",
              },
            ],
          },
          {
            part: "RadioGroupError",
            purpose: "Explains invalid selection.",
          },
        ],
      },
    ],
  },
  breadcrumbs: {
    parts: [
      {
        part: "nav",
        purpose:
          "Makes a navigation landmark. Use it when the path is the main navigation of the page.",
        children: [
          {
            part: "Breadcrumbs",
            purpose: "Lists the path from the top level to the current page.",
            children: [
              {
                part: "Breadcrumb",
                purpose:
                  "Links to one level. Repeat for each level. The last one is the current page and shows as text.",
              },
            ],
          },
        ],
      },
    ],
  },
  tabs: {
    parts: [
      {
        part: "Tabs",
        purpose: "Owns the selected panel.",
        children: [
          {
            part: "TabsList",
            purpose: "Groups the tab triggers. Scrolls when they do not fit.",
            children: [
              {
                part: "TabsTrigger",
                purpose: "Selects a panel by value. Repeat for each tab.",
              },
            ],
          },
          {
            part: "TabsContent",
            purpose:
              "Shows the content with the matching value. Repeat for each tab.",
          },
        ],
      },
    ],
  },
  sheet: {
    parts: [
      {
        part: "SheetTrigger",
        purpose: "Owns the open state.",
        children: [
          { part: "Button", purpose: "Opens the sheet." },
          {
            part: "Sheet",
            purpose: "Contains the sheet's task.",
            children: [
              {
                part: "SheetHandle",
                purpose:
                  "Drag or push it to resize or close the sheet. In a top sheet, put it last.",
              },
              {
                part: "SheetHeader",
                purpose: "Groups the sheet's heading and close control.",
                children: [
                  { part: "SheetTitle", purpose: "Names the sheet." },
                  { part: "SheetDescription", purpose: "Explains the task." },
                ],
              },
              {
                part: "SheetBody",
                purpose:
                  "Holds scrollable content. At a partial snap point it lets swipes resize the sheet instead.",
              },
              {
                part: "SheetFooter",
                purpose: "Groups the task actions.",
                children: [
                  {
                    part: "SheetClose",
                    purpose: "Dismisses the sheet. Can also go in the header.",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  "token-field": {
    parts: [
      {
        part: "TokenField",
        purpose: "Owns the value and editing state.",
        children: [
          { part: "TokenFieldLabel", purpose: "Names the field." },
          { part: "TokenFieldInput", purpose: "Edits text and tokens." },
          { part: "TokenFieldDescription", purpose: "Adds input guidance." },
        ],
      },
    ],
    helper: {
      part: "TagFieldValue",
      purpose:
        "Splits text into tags at each comma or line break. Pass an instance to the value prop. It is not a JSX child.",
    },
  },
  "tag-group": {
    parts: [
      {
        part: "TagGroup",
        purpose:
          "Owns selection and removal. Set onRemove to show remove buttons.",
        children: [
          { part: "TagGroupLabel", purpose: "Names the group." },
          {
            part: "TagListView",
            purpose:
              "Contains the tags. renderEmptyState shows a message when there are no tags.",
            children: [
              {
                part: "Tag",
                purpose: "Shows one item on one line. Repeat for each tag.",
              },
            ],
          },
        ],
      },
    ],
  },
  table: {
    parts: [
      {
        part: "Table",
        purpose:
          "Owns selection and sorting. Put it in an element with overflow-x-auto, so that it can scroll on small screens.",
        children: [
          {
            part: "TableHeader",
            purpose: "Contains the column headers.",
            children: [
              {
                part: "Column",
                purpose:
                  "Names one column. Set isRowHeader on the column that names each row.",
              },
            ],
          },
          {
            part: "TableBody",
            purpose:
              "Contains the rows. renderEmptyState shows a message when there are no rows.",
            children: [
              {
                part: "Row",
                purpose: "Defines one row. Repeat for each item.",
                children: [
                  {
                    part: "Cell",
                    purpose:
                      "Shows one value on one line. Add whitespace-normal to let long text wrap.",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  card: {
    parts: [
      {
        part: "Card",
        purpose: "Groups related content and actions.",
        children: [
          {
            part: "CardHeader",
            purpose: "Holds the title, description, and action.",
            children: [
              {
                part: "CardTitle",
                purpose: "Names the card. Set as for the heading level.",
              },
              {
                part: "CardDescription",
                purpose: "Gives short supporting text.",
              },
              {
                part: "CardAction",
                purpose: "Puts an optional control beside the title.",
              },
            ],
          },
          { part: "CardContent", purpose: "Holds the main content." },
          { part: "CardFooter", purpose: "Holds actions or a summary." },
        ],
      },
    ],
  },
  "description-list": {
    parts: [
      {
        part: "DescriptionList",
        purpose: "Puts terms and details in two columns on wider screens.",
        children: [
          { part: "DescriptionTerm", purpose: "Names a value." },
          {
            part: "DescriptionDetail",
            purpose: "Gives the value. Repeat it for more than one value.",
          },
        ],
      },
    ],
  },
  stat: {
    parts: [
      {
        part: "Stat",
        purpose: "Groups one metric on a card surface.",
        children: [
          { part: "StatLabel", purpose: "Names the metric." },
          { part: "StatValue", purpose: "Shows the value." },
          {
            part: "StatDetail",
            purpose: "Gives optional context, such as a change.",
          },
        ],
      },
    ],
  },
  timeline: {
    parts: [
      {
        part: "Timeline",
        purpose: "Orders the events. Give it an aria-label.",
        children: [
          {
            part: "TimelineItem",
            purpose: "Shows one event. Repeat for each event.",
            children: [
              { part: "TimelineTitle", purpose: "Names the event." },
              {
                part: "TimelineTime",
                purpose: "Shows when it happened. Set dateTime.",
              },
              {
                part: "TimelineDescription",
                purpose: "Gives optional detail.",
              },
            ],
          },
        ],
      },
    ],
  },
  "kbd-code": {
    parts: [
      {
        part: "KbdGroup",
        purpose: "Joins the keys of one shortcut.",
        children: [{ part: "Kbd", purpose: "Shows one key." }],
      },
      { part: "InlineCode", purpose: "Shows code inside a sentence." },
    ],
  },
  "empty-state": {
    parts: [
      {
        part: "EmptyState",
        purpose: "Groups the empty message.",
        children: [
          {
            part: "EmptyStateIcon",
            purpose: "Adds an optional decorative icon.",
          },
          { part: "EmptyStateTitle", purpose: "Names what is missing." },
          {
            part: "EmptyStateDescription",
            purpose: "Explains what to do next.",
          },
          {
            part: "EmptyStateActions",
            purpose: "Holds actions when they are useful.",
          },
        ],
      },
    ],
  },
  pagination: {
    parts: [
      {
        part: "Pagination",
        purpose: "Names the navigation landmark.",
        children: [
          {
            part: "PaginationList",
            purpose: "Orders the page links.",
            children: [
              {
                part: "PaginationItem",
                purpose: "Wraps each entry. Repeat for each page or gap.",
                children: [
                  {
                    part: "PaginationLink",
                    purpose: "Navigates to a page URL.",
                  },
                  {
                    part: "PaginationEllipsis",
                    purpose:
                      "Marks a gap in the page numbers. Use it in place of a link.",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  disclosure: {
    parts: [
      {
        part: "Disclosure",
        purpose: "Owns the expanded state.",
        children: [
          { part: "DisclosureHeader", purpose: "Toggles the panel." },
          {
            part: "DisclosurePanel",
            purpose: "Holds the content to show or hide.",
          },
        ],
      },
    ],
  },
  "color-swatch-picker": {
    parts: [
      {
        part: "ColorSwatchPicker",
        purpose: "Owns the selected color.",
        children: [
          {
            part: "ColorSwatchPickerItem",
            purpose: "Defines a labeled swatch. Repeat for each color.",
          },
        ],
      },
    ],
  },
  "drop-zone": {
    parts: [
      {
        part: "DropZone",
        purpose: "Receives files and validates the drop operation.",
        children: [
          { part: "DropZoneLabel", purpose: "Names the target." },
          {
            part: "FileTrigger",
            purpose:
              "Opens a file picker as an alternative. Install File trigger separately.",
          },
        ],
      },
    ],
  },
  slider: {
    parts: [
      {
        part: "Slider",
        purpose: "Owns the value or range.",
        children: [
          { part: "SliderLabel", purpose: "Names the slider." },
          { part: "SliderValue", purpose: "Shows the current value or range." },
          {
            part: "SliderTrack",
            purpose: "Receives presses and drags.",
            children: [
              {
                part: "SliderRail",
                purpose: "Draws the track.",
                children: [
                  { part: "SliderRange", purpose: "Fills the selected part." },
                ],
              },
              {
                part: "SliderHandle",
                purpose: "Moves one value. Add one for each value.",
              },
            ],
          },
        ],
      },
    ],
  },
  switch: {
    parts: [
      {
        part: "Switch",
        purpose: "Owns the on and off state.",
        children: [
          { part: "SwitchLabel", purpose: "Names the setting." },
          { part: "SwitchDescription", purpose: "Adds help below the label." },
          {
            part: "SwitchControl",
            purpose: "Draws the track.",
            children: [
              { part: "SwitchThumb", purpose: "Moves when the state changes." },
            ],
          },
        ],
      },
    ],
  },
  autocomplete: {
    parts: [
      {
        part: "Autocomplete",
        purpose: "Connects the input to the list and filters it.",
        children: [
          {
            part: "SearchField",
            purpose:
              "Accepts the filter text. Install Search field separately.",
          },
          {
            part: "ListBox",
            purpose: "Shows the matching items. Install List box separately.",
          },
        ],
      },
    ],
  },
  form: {
    parts: [
      {
        part: "Form",
        purpose: "Validates its fields when you submit.",
        children: [
          {
            part: "TextField",
            purpose:
              "Adds a named value to the form. Install each field separately.",
          },
          {
            part: "Button",
            purpose: 'Submits the form. Set type="submit".',
          },
        ],
      },
    ],
  },
  fieldset: {
    parts: [
      {
        part: "Fieldset",
        purpose: "Groups related controls.",
        children: [
          { part: "FieldsetLegend", purpose: "Names the group." },
          { part: "FieldsetDescription", purpose: "Adds shared guidance." },
        ],
      },
    ],
  },
};
