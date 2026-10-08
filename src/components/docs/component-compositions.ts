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
          "Owns the expanded state; accepts isExpanded, defaultExpanded, and onExpandedChange.",
        children: [
          {
            part: "ToolCallTrigger",
            purpose: "Names the tool, shows its status, and toggles the panel.",
          },
          {
            part: "ToolCallPanel",
            purpose: "Contains the app-supplied input and result.",
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
                purpose: "Contains the section's answer.",
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
        purpose: "Joins the edges of two or more independent actions.",
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
                ],
              },
              { part: "DialogDescription", purpose: "Explains the task." },
              { part: "DialogFooter", purpose: "Groups the task actions." },
            ],
          },
        ],
      },
    ],
  },
  "context-menu": {
    parts: [
      {
        part: "ContextMenuTrigger",
        purpose:
          "Opens the menu from right-click, long press, or a keyboard shortcut.",
        children: [
          {
            part: "Button",
            purpose: "Provides a focusable target and a primary action.",
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
        purpose: "Owns the label and validation state. Choose one.",
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
          {
            part: "Radio",
            purpose: "Defines one choice. Repeat for each option.",
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
            purpose: "Groups the tab triggers.",
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
  drawer: {
    parts: [
      {
        part: "Drawer",
        purpose: "Owns the open state.",
        children: [
          { part: "DrawerTrigger", purpose: "Opens the sheet." },
          {
            part: "DrawerContent",
            purpose: "Contains the sheet's task.",
            children: [
              {
                part: "DrawerHandle",
                purpose:
                  "Drag or press to resize a bottom drawer or dismiss a top or side drawer. Place it last for top drawers; keyboard activation always works.",
              },
              {
                part: "DrawerHeader",
                purpose: "Groups the sheet's heading and close control.",
                children: [
                  { part: "DrawerTitle", purpose: "Names the sheet." },
                  { part: "DrawerDescription", purpose: "Explains the task." },
                ],
              },
              { part: "DrawerBody", purpose: "Holds scrollable content." },
              {
                part: "DrawerFooter",
                purpose: "Groups the task actions.",
                children: [
                  {
                    part: "DrawerClose",
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
        "Tokenizes comma-separated tags. Pass an instance as the value prop; it is not a JSX child.",
    },
  },
  "tag-group": {
    parts: [
      {
        part: "TagGroup",
        purpose: "Owns removal behavior.",
        children: [
          { part: "TagGroupLabel", purpose: "Names the collection." },
          {
            part: "TagListView",
            purpose: "Renders the collection.",
            children: [
              {
                part: "Tag",
                purpose: "Displays a removable item. Repeat for each tag.",
              },
            ],
          },
        ],
      },
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
                    purpose: "Marks omitted pages instead of a link.",
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
            purpose: "Contains the revealed details.",
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
            purpose: "Offers a file picker as an alternative.",
          },
        ],
      },
    ],
  },
  fieldset: {
    parts: [
      {
        part: "Fieldset",
        purpose: "Groups related native controls.",
        children: [
          { part: "FieldsetLegend", purpose: "Names the group." },
          { part: "FieldsetDescription", purpose: "Adds shared guidance." },
        ],
      },
    ],
  },
};
