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
        children: [{ part: "ToolCallTrigger" }, { part: "ToolCallPanel" }],
      },
    ],
  },
  "stagger-group": {
    parts: [
      {
        part: "StaggerGroup",
        children: [{ part: "StaggerItem" }],
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
        children: [
          { part: "AlertIcon" },
          { part: "AlertTitle" },
          { part: "AlertDescription" },
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
            children: [{ part: "SelectItem", repeats: true }],
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
                  {
                    part: "DialogClose",
                    note: "Can also go in DialogFooter as a text button.",
                  },
                ],
              },
              { part: "DialogDescription" },
              { part: "DialogFooter" },
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
        note: "Render it once in the root layout. Shows up to three toasts at a time.",
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
                children: [{ part: "MenuItem", repeats: true }],
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
              { part: "InputGroupAddon" },
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
        note: "Owns the search and selected value.",
        children: [
          { part: "ComboBoxLabel" },
          { part: "ComboBoxInput" },
          { part: "ComboBoxTrigger" },
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
                  { part: "SheetDescription" },
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
        ],
      },
    ],
  },
  table: {
    parts: [
      {
        part: "Table",
        note: "Owns selection and sorting. Put it in an element with overflow-x-auto to let it scroll on small screens.",
        children: [
          {
            part: "TableHeader",
            children: [
              {
                part: "Column",
                repeats: true,
                note: "Set isRowHeader on the column that names each row.",
              },
            ],
          },
          {
            part: "TableBody",
            children: [
              {
                part: "Row",
                repeats: true,
                children: [
                  {
                    part: "Cell",
                    repeats: true,
                    note: "Its text stays on one line. Add whitespace-normal to let it wrap.",
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
        children: [
          {
            part: "CardHeader",
            children: [
              { part: "CardTitle" },
              { part: "CardDescription" },
              { part: "CardAction", optional: true },
            ],
          },
          { part: "CardContent" },
          { part: "CardFooter" },
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
        part: "Stat",
        children: [
          { part: "StatLabel" },
          { part: "StatValue" },
          { part: "StatDetail", optional: true },
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
              { part: "TimelineTime", note: "Set dateTime." },
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
          { part: "EmptyStateIcon", optional: true },
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
          { part: "DropZoneLabel" },
          {
            part: "FileTrigger",
            optional: true,
            note: "Install File trigger separately.",
          },
        ],
      },
    ],
  },
  slider: {
    parts: [
      {
        part: "Slider",
        note: "Owns the value or range.",
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
              { part: "SliderHandle", repeats: true },
            ],
          },
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
