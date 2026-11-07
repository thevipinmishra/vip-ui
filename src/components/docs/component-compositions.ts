export interface CompositionPart {
  part: string;
  note?: string;
  optional?: true;
  repeats?: true;
  children?: CompositionPart[];
}

export interface Composition {
  parts: CompositionPart[];
  helper?: { part: string; note: string };
}

export const compositions: Record<string, Composition> = {
  "tool-call": {
    parts: [
      {
        part: "ToolCall",
        note: "Owns the expanded state. Accepts isExpanded, defaultExpanded, and onExpandedChange.",
        children: [
          { part: "ToolCallTrigger" },
          {
            part: "ToolCallPanel",
            children: [
              {
                part: "ToolCallSection",
                optional: true,
                repeats: true,
                children: [{ part: "ToolCallCode", optional: true }],
              },
            ],
          },
        ],
      },
    ],
  },
  "prompt-input": {
    parts: [
      {
        part: "PromptInput",
        note: "Owns the draft value, the submit key, and the file drop. Accepts TextField props for the value and validation.",
        children: [
          {
            part: "PromptInputTextArea",
            note: "Grows from minRows to maxRows, then scrolls.",
          },
          {
            part: "PromptInputFooter",
            note: "Put your own controls beside the submit button.",
            children: [{ part: "PromptInputSubmit" }],
          },
        ],
      },
    ],
  },
  reasoning: {
    parts: [
      {
        part: "Reasoning",
        note: "Owns the open state and the duration count. Set status, duration, and autoCollapse on it.",
        children: [
          {
            part: "ReasoningTrigger",
            note: "Shows the state and the duration.",
          },
          {
            part: "ReasoningPanel",
            note: "Set scrollable to cap the body height and scroll it. The newest line stays in view while the run is thinking.",
          },
        ],
      },
    ],
  },
  response: {
    parts: [
      {
        part: "Response",
        note: "Owns the status. Screen readers hear Response complete, stopped, or failed once.",
        children: [
          {
            part: "ResponseContent",
            note: "Shows the caret while streaming and sets aria-busy.",
          },
          {
            part: "ResponseNotice",
            note: "Shows a marker for stopped and error.",
          },
          { part: "ResponseActions", note: "Row of buttons." },
          { part: "ResponseFooter", note: "Row for sources and metadata." },
        ],
      },
    ],
  },
  "stagger-group": {
    parts: [
      {
        part: "StaggerGroup",
        children: [{ part: "StaggerItem", repeats: true }],
      },
    ],
  },
  attachment: {
    parts: [
      {
        part: "AttachmentList",
        note: "Animates rows in and out.",
        children: [{ part: "Attachment", repeats: true }],
      },
    ],
  },
  accordion: {
    parts: [
      {
        part: "Accordion",
        note: "Owns the expanded state.",
        children: [
          {
            part: "AccordionItem",
            repeats: true,
            children: [
              { part: "AccordionTrigger" },
              { part: "AccordionContent" },
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
        note: "Set title to render the icon, title, and description from one component.",
        children: [
          { part: "AlertIcon" },
          { part: "AlertTitle" },
          { part: "AlertDescription" },
          { part: "AlertAction", optional: true },
          { part: "AlertDismiss", optional: true },
        ],
      },
    ],
  },
  "button-group": {
    parts: [
      {
        part: "ButtonGroup",
        children: [{ part: "Button", repeats: true }],
      },
    ],
  },
  select: {
    parts: [
      {
        part: "Select",
        note: "Owns the value and field state.",
        children: [
          { part: "SelectLabel" },
          { part: "SelectTrigger" },
          { part: "SelectDescription" },
          { part: "SelectError" },
          {
            part: "SelectContent",
            children: [
              {
                part: "SelectSection",
                optional: true,
                repeats: true,
                children: [{ part: "SelectItem", repeats: true }],
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
        note: "Owns the open state.",
        children: [
          { part: "DialogTrigger" },
          {
            part: "DialogContent",
            children: [
              {
                part: "DialogHeader",
                children: [
                  { part: "DialogTitle" },
                  { part: "DialogDescription", optional: true },
                  {
                    part: "DialogClose",
                    optional: true,
                    note: "Can also go in DialogFooter as a text button.",
                  },
                ],
              },
              {
                part: "DialogBody",
                optional: true,
                note: "Scrolls when the content does not fit.",
              },
              { part: "DialogFooter", optional: true },
            ],
          },
        ],
      },
    ],
  },
  popover: {
    parts: [
      {
        part: "PopoverTrigger",
        note: "Owns the open state.",
        children: [
          { part: "Button" },
          {
            part: "Popover",
            children: [
              { part: "PopoverArrow", optional: true },
              {
                part: "PopoverDialog",
                children: [
                  { part: "PopoverTitle" },
                  { part: "PopoverDescription", optional: true },
                  {
                    part: "PopoverFooter",
                    optional: true,
                    children: [
                      {
                        part: "Button",
                        note: 'Set slot="close" to close the popover.',
                      },
                    ],
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
        children: [
          { part: "Button", note: "It must be focusable." },
          {
            part: "TooltipContent",
            children: [{ part: "TooltipArrow", optional: true }],
          },
        ],
      },
    ],
  },
  "context-menu": {
    parts: [
      {
        part: "ContextMenuTrigger",
        note: "On the keyboard, press Shift+F10. On macOS, press Control+Enter.",
        children: [
          { part: "Button", note: "It must be focusable." },
          {
            part: "ContextMenu",
            children: [{ part: "ContextMenuItem", repeats: true }],
          },
        ],
      },
    ],
  },
  "command-palette": {
    parts: [
      {
        part: "CommandPalette",
        children: [
          {
            part: "CommandPaletteSection",
            children: [{ part: "CommandPaletteItem", repeats: true }],
          },
        ],
      },
    ],
  },
  toast: {
    parts: [
      {
        part: "ToastViewport",
        note: "Render it once in the root layout. Stacks up to three toasts.",
      },
    ],
    helper: {
      part: "showToast",
      note: "Queues a toast and returns its key. Call it from an event handler.",
    },
  },
  menu: {
    parts: [
      {
        part: "MenuTrigger",
        children: [
          { part: "Button" },
          {
            part: "MenuPopover",
            children: [
              { part: "PopoverArrow", optional: true },
              {
                part: "MenuContent",
                note: "Owns focus and selection.",
                children: [
                  {
                    part: "MenuSection",
                    optional: true,
                    repeats: true,
                    children: [{ part: "MenuItem", repeats: true }],
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
        note: "Owns the query and submission state.",
        children: [
          { part: "SearchFieldLabel" },
          { part: "SearchFieldInput" },
          { part: "SearchFieldClear" },
          { part: "SearchFieldDescription" },
          { part: "SearchFieldError" },
        ],
      },
    ],
  },
  "text-field": {
    parts: [
      {
        part: "TextField",
        note: "Owns the value and validation state.",
        children: [
          { part: "TextFieldLabel" },
          { part: "TextFieldInput" },
          { part: "TextFieldDescription" },
          { part: "TextFieldError" },
        ],
      },
    ],
  },
  "text-area": {
    parts: [
      {
        part: "TextArea",
        note: "Owns the value and validation state.",
        children: [
          { part: "TextAreaLabel" },
          { part: "TextAreaInput" },
          { part: "TextAreaDescription" },
          { part: "TextAreaError" },
        ],
      },
    ],
  },
  "input-group": {
    parts: [
      {
        part: "TextField or TextArea",
        note: "Owns the label and validation state. Install it separately.",
        children: [
          {
            part: "InputGroup",
            children: [
              { part: "InputGroupInput", note: "Use it in TextField." },
              { part: "InputGroupTextArea", note: "Use it in TextArea." },
              {
                part: "InputGroupAddon",
                repeats: true,
                children: [
                  {
                    part: "InputGroupButton",
                    optional: true,
                    note: "Fits inside the field edge at each size.",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  "number-field": {
    parts: [
      {
        part: "NumberField",
        note: "Owns the value, limits, step, and number format.",
        children: [
          { part: "NumberFieldLabel" },
          {
            part: "NumberFieldGroup",
            children: [
              { part: "NumberFieldDecrement", optional: true },
              { part: "NumberFieldInput" },
              { part: "NumberFieldIncrement", optional: true },
              {
                part: "NumberFieldSteppers",
                optional: true,
                note: "Stacks both step buttons. Use it in place of NumberFieldDecrement and NumberFieldIncrement.",
              },
            ],
          },
          { part: "NumberFieldDescription", optional: true },
          { part: "NumberFieldError" },
        ],
      },
    ],
  },
  "combo-box": {
    parts: [
      {
        part: "ComboBox",
        note: "Owns the search and selected value.",
        children: [
          { part: "ComboBoxLabel" },
          {
            part: "ComboBoxControl",
            children: [
              {
                part: "ComboBoxIcon",
                optional: true,
                note: "The input moves its text to make room for the icon.",
              },
              { part: "ComboBoxInput" },
              { part: "ComboBoxTrigger" },
            ],
          },
          {
            part: "ComboBoxTags",
            note: "Use it in multiple selection mode. The default layout includes it.",
          },
          { part: "ComboBoxDescription" },
          { part: "ComboBoxError" },
          {
            part: "ComboBoxContent",
            children: [{ part: "ComboBoxItem", repeats: true }],
          },
        ],
      },
    ],
  },
  checkbox: {
    parts: [
      {
        part: "CheckboxField",
        note: "Owns the checked state and validation.",
        children: [
          {
            part: "CheckboxButton",
            note: "Its text becomes the accessible name.",
            children: [
              { part: "CheckboxIndicator" },
              { part: "CheckboxLabel" },
            ],
          },
          { part: "CheckboxDescription" },
          { part: "CheckboxError" },
        ],
      },
    ],
    helper: {
      part: "Checkbox",
      note: "Renders all of these parts from children, description, and errorMessage. Use the parts only for a custom layout.",
    },
  },
  "checkbox-group": {
    parts: [
      {
        part: "CheckboxGroup",
        note: "Owns the selected values. Lays out its children in a column.",
        children: [
          { part: "CheckboxGroupLabel" },
          { part: "CheckboxGroupDescription" },
          {
            part: "CheckboxGroupItems",
            optional: true,
            note: "Changes the layout of the choices.",
            children: [{ part: "Checkbox", repeats: true }],
          },
          { part: "CheckboxGroupError" },
        ],
      },
    ],
  },
  "radio-group": {
    parts: [
      {
        part: "RadioGroup",
        note: "Owns the selected value. Lays out its children by orientation.",
        children: [
          { part: "RadioGroupLabel" },
          { part: "RadioGroupDescription" },
          {
            part: "RadioGroupItems",
            optional: true,
            note: "Changes the gap between choices.",
            children: [
              {
                part: "RadioField",
                repeats: true,
                children: [
                  {
                    part: "RadioButton",
                    note: "Its text becomes the accessible name.",
                    children: [
                      { part: "RadioIndicator" },
                      { part: "RadioLabel" },
                    ],
                  },
                  { part: "RadioDescription" },
                ],
              },
            ],
          },
          { part: "RadioGroupError" },
        ],
      },
    ],
    helper: {
      part: "Radio",
      note: "Renders RadioField and its parts from children and description. Use the parts only for a custom layout.",
    },
  },
  breadcrumbs: {
    parts: [
      {
        part: "nav",
        optional: true,
        note: "Use it when the path is the main navigation of the page.",
        children: [
          {
            part: "Breadcrumbs",
            children: [
              {
                part: "Breadcrumb",
                repeats: true,
                note: "The last one is the current page. It shows as text.",
              },
              {
                part: "BreadcrumbItem",
                optional: true,
                note: "Holds content that is not a link, such as a menu trigger.",
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
        note: "Owns the selected panel.",
        children: [
          {
            part: "TabsList",
            note: "Scrolls when the tabs do not fit.",
            children: [{ part: "TabsTrigger", repeats: true }],
          },
          { part: "TabsContent", repeats: true },
        ],
      },
    ],
  },
  sheet: {
    parts: [
      {
        part: "SheetTrigger",
        note: "Owns the open state.",
        children: [
          { part: "Button" },
          {
            part: "Sheet",
            children: [
              { part: "SheetHandle", note: "In a top sheet, put it last." },
              {
                part: "SheetHeader",
                children: [
                  { part: "SheetTitle" },
                  { part: "SheetDescription", optional: true },
                ],
              },
              {
                part: "SheetBody",
                note: "Scrolls when the content does not fit.",
              },
              {
                part: "SheetFooter",
                children: [
                  { part: "SheetClose", note: "Can also go in SheetHeader." },
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
        note: "Owns the value and editing state.",
        children: [
          { part: "TokenFieldLabel" },
          { part: "TokenFieldInput" },
          { part: "TokenFieldDescription" },
        ],
      },
    ],
    helper: {
      part: "TagFieldValue",
      note: "Splits text into tags at each comma or line break. Pass an instance to the value prop.",
    },
  },
  "tag-group": {
    parts: [
      {
        part: "TagGroup",
        note: "Owns selection and removal. Set onRemove to show remove buttons.",
        children: [
          { part: "TagGroupLabel" },
          {
            part: "TagListView",
            note: "Set renderEmptyState to show a message when there are no tags.",
            children: [
              {
                part: "Tag",
                repeats: true,
                note: "Its text stays on one line.",
              },
            ],
          },
          { part: "TagGroupDescription", optional: true },
          { part: "TagGroupError", optional: true },
        ],
      },
    ],
  },
  table: {
    parts: [
      {
        part: "TableContainer",
        optional: true,
        note: "Scrolls the table and keeps the header in view. Column resizing needs it.",
        children: [
          {
            part: "Table",
            note: "Owns selection, sorting, expanded rows, and drag and drop.",
            children: [
              {
                part: "TableHeader",
                note: "Adds the select-all and drag columns when the table needs them.",
                children: [
                  {
                    part: "Column",
                    repeats: true,
                    note: "Set isRowHeader on the column that names each row.",
                    children: [{ part: "ColumnResizer", optional: true }],
                  },
                ],
              },
              {
                part: "TableBody",
                children: [
                  {
                    part: "Row",
                    repeats: true,
                    note: "Adds the checkbox and drag handle cells. Put child rows after the cells to make the row expandable.",
                    children: [
                      {
                        part: "Cell",
                        repeats: true,
                        note: "Its text stays on one line. Add whitespace-normal to let it wrap.",
                      },
                    ],
                  },
                  { part: "TableLoadMoreItem", optional: true },
                ],
              },
              {
                part: "TableFooter",
                optional: true,
                children: [{ part: "Row", repeats: true }],
              },
            ],
          },
        ],
      },
    ],
    helper: {
      part: "TableDropIndicator",
      note: "Return it from renderDropIndicator in useDragAndDrop.",
    },
  },
  tree: {
    parts: [
      {
        part: "Tree",
        note: "Owns selection, expanded rows, and drag and drop.",
        children: [
          {
            part: "TreeSection",
            optional: true,
            repeats: true,
            children: [{ part: "TreeHeader" }],
          },
          {
            part: "TreeItem",
            repeats: true,
            note: "Put child TreeItem elements inside it to make it expandable.",
          },
          { part: "TreeLoadMoreItem", optional: true },
        ],
      },
    ],
    helper: {
      part: "TreeDropIndicator",
      note: "Return it from renderDropIndicator in useDragAndDrop.",
    },
  },
  card: {
    parts: [
      {
        part: "Card",
        children: [
          { part: "CardMedia", optional: true },
          {
            part: "CardHeader",
            children: [
              {
                part: "CardTitle",
                children: [
                  {
                    part: "CardLink",
                    optional: true,
                    note: "Makes the whole card open the link.",
                  },
                ],
              },
              { part: "CardDescription", optional: true },
              { part: "CardAction", optional: true },
            ],
          },
          { part: "CardContent", optional: true },
          { part: "CardFooter", optional: true },
        ],
      },
    ],
  },
  "description-list": {
    parts: [
      {
        part: "DescriptionList",
        note: "Puts terms and details in two columns on wider screens.",
        children: [
          { part: "DescriptionTerm" },
          { part: "DescriptionDetail", repeats: true },
        ],
      },
    ],
  },
  stat: {
    parts: [
      {
        part: "StatGroup",
        optional: true,
        children: [
          {
            part: "Stat",
            repeats: true,
            children: [
              { part: "StatIcon", optional: true },
              { part: "StatLabel" },
              { part: "StatValue" },
              {
                part: "StatDetail",
                optional: true,
                children: [{ part: "StatTrend", optional: true }],
              },
            ],
          },
        ],
      },
    ],
  },
  timeline: {
    parts: [
      {
        part: "Timeline",
        note: "Give it an aria-label.",
        children: [
          {
            part: "TimelineItem",
            repeats: true,
            children: [
              { part: "TimelineTitle" },
              {
                part: "TimelineTime",
                optional: true,
                note: "Set dateTime.",
              },
              { part: "TimelineDescription", optional: true },
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
        note: "Joins the keys of one shortcut.",
        children: [{ part: "Kbd", repeats: true }],
      },
      { part: "InlineCode" },
    ],
  },
  "empty-state": {
    parts: [
      {
        part: "EmptyState",
        children: [
          {
            part: "EmptyStateIcon",
            optional: true,
            note: "Hidden from screen readers; the title names the state.",
          },
          { part: "EmptyStateTitle" },
          { part: "EmptyStateDescription" },
          { part: "EmptyStateActions", optional: true },
        ],
      },
    ],
  },
  pagination: {
    parts: [
      {
        part: "Pagination",
        children: [
          {
            part: "PaginationList",
            children: [
              {
                part: "PaginationItem",
                repeats: true,
                children: [
                  { part: "PaginationLink" },
                  {
                    part: "PaginationEllipsis",
                    note: "Use it in place of a link.",
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
        note: "Owns the expanded state.",
        children: [{ part: "DisclosureHeader" }, { part: "DisclosurePanel" }],
      },
    ],
  },
  "color-swatch-picker": {
    parts: [
      {
        part: "ColorSwatchPicker",
        note: "Owns the selected color.",
        children: [{ part: "ColorSwatchPickerItem", repeats: true }],
      },
    ],
  },
  "drop-zone": {
    parts: [
      {
        part: "DropZone",
        children: [
          { part: "DropZoneIcon", optional: true },
          { part: "DropZoneLabel" },
          { part: "DropZoneDescription", optional: true },
          {
            part: "DropZoneTrigger",
            optional: true,
            note: "Opens the file picker. A click anywhere in the zone opens it too.",
          },
        ],
      },
    ],
  },
  slider: {
    parts: [
      {
        part: "Slider",
        note: "Owns the values. Without children, it renders a label, value, and one handle per value.",
        children: [
          { part: "SliderLabel" },
          { part: "SliderValue" },
          {
            part: "SliderTrack",
            children: [
              {
                part: "SliderRail",
                children: [{ part: "SliderRange" }],
              },
              {
                part: "SliderHandle",
                repeats: true,
                note: "One per value. Set index on each.",
              },
            ],
          },
          { part: "SliderMarks", optional: true },
        ],
      },
    ],
  },
  switch: {
    parts: [
      {
        part: "SwitchField",
        note: "Owns the on and off state and validation.",
        children: [
          {
            part: "SwitchButton",
            note: "Its text becomes the accessible name.",
            children: [
              { part: "SwitchLabel" },
              {
                part: "SwitchControl",
                note: "Put it before SwitchLabel to show the control first.",
                children: [{ part: "SwitchThumb" }],
              },
            ],
          },
          { part: "SwitchDescription" },
          { part: "SwitchError" },
        ],
      },
    ],
    helper: {
      part: "Switch",
      note: "Renders all of these parts from children, description, and errorMessage. Use the parts only for a custom layout.",
    },
  },
  autocomplete: {
    parts: [
      {
        part: "Autocomplete",
        children: [
          { part: "SearchField", note: "Install Search field separately." },
          { part: "ListBox", note: "Install List box separately." },
        ],
      },
    ],
  },
  form: {
    parts: [
      {
        part: "Form",
        children: [
          { part: "TextField", note: "Install each field separately." },
          { part: "Button", note: 'Set type="submit".' },
        ],
      },
    ],
  },
  fieldset: {
    parts: [
      {
        part: "Fieldset",
        children: [{ part: "FieldsetLegend" }, { part: "FieldsetDescription" }],
      },
    ],
  },
};
