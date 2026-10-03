export const compositions: Record<string, { part: string; purpose: string }[]> =
  {
    accordion: [
      { part: "Accordion", purpose: "Owns the expansion state and layout." },
      { part: "AccordionItem", purpose: "Identifies each section." },
      { part: "AccordionTrigger", purpose: "Opens or closes its section." },
      { part: "AccordionContent", purpose: "Contains the section's answer." },
    ],
    alert: [
      { part: "Alert", purpose: "Sets the message variant." },
      { part: "AlertIcon", purpose: "Shows the variant icon." },
      { part: "AlertTitle", purpose: "Names the message." },
      { part: "AlertDescription", purpose: "Gives the detail or next step." },
    ],
    "button-group": [
      { part: "ButtonGroup", purpose: "Groups independent actions." },
      { part: "Button", purpose: "Performs each action." },
    ],
    select: [
      { part: "Select", purpose: "Owns the value and field state." },
      { part: "SelectLabel", purpose: "Names the field." },
      { part: "SelectTrigger", purpose: "Opens the options." },
      { part: "SelectContent", purpose: "Contains SelectItem options." },
    ],
    dialog: [
      { part: "Dialog", purpose: "Owns the open state." },
      { part: "DialogTrigger", purpose: "Opens the dialog." },
      { part: "DialogContent", purpose: "Contains the modal task." },
      { part: "DialogHeader", purpose: "Groups the title and close control." },
      { part: "DialogTitle", purpose: "Names the modal task." },
      { part: "DialogDescription", purpose: "Explains the task." },
      { part: "DialogFooter", purpose: "Groups the task actions." },
    ],
    menu: [
      { part: "MenuTrigger", purpose: "Connects the button to the menu." },
      { part: "MenuPopover", purpose: "Positions the menu." },
      { part: "MenuContent", purpose: "Owns focus and selection." },
      { part: "MenuItem", purpose: "Runs an action or selects an option." },
    ],
    "search-field": [
      { part: "SearchField", purpose: "Owns the query and submission state." },
      { part: "SearchFieldLabel", purpose: "Names the search." },
      { part: "SearchFieldInput", purpose: "Accepts the query." },
      { part: "SearchFieldClear", purpose: "Resets the query." },
    ],
    "text-field": [
      { part: "TextField", purpose: "Owns the value and validation state." },
      { part: "TextFieldLabel", purpose: "Names the input." },
      { part: "TextFieldInput", purpose: "Accepts the value." },
      { part: "TextFieldError", purpose: "Explains an invalid value." },
    ],
    "text-area": [
      { part: "TextArea", purpose: "Owns the value and validation state." },
      { part: "TextAreaLabel", purpose: "Names the input." },
      { part: "TextAreaInput", purpose: "Accepts multiline text." },
      { part: "TextAreaError", purpose: "Explains an invalid value." },
    ],
    "input-group": [
      {
        part: "TextField or TextArea",
        purpose: "Owns the label and validation state.",
      },
      {
        part: "InputGroup",
        purpose: "Shares a border between the input and addons.",
      },
      { part: "InputGroupInput", purpose: "Accepts a single-line value." },
      {
        part: "InputGroupAddon",
        purpose: "Places text or an action beside the input.",
      },
    ],
    "combo-box": [
      { part: "ComboBox", purpose: "Owns the search and selected value." },
      { part: "ComboBoxLabel", purpose: "Names the field." },
      { part: "ComboBoxInput", purpose: "Filters the choices." },
      { part: "ComboBoxTrigger", purpose: "Opens the choices." },
      { part: "ComboBoxContent", purpose: "Contains ComboBoxItem options." },
    ],
    "checkbox-group": [
      { part: "CheckboxGroup", purpose: "Owns the selected values." },
      { part: "CheckboxGroupLabel", purpose: "Names the group." },
      { part: "CheckboxGroupItems", purpose: "Contains Checkbox choices." },
      { part: "CheckboxGroupError", purpose: "Explains invalid selection." },
    ],
    "radio-group": [
      { part: "RadioGroup", purpose: "Owns the single selected value." },
      { part: "Radio", purpose: "Defines one choice." },
    ],
    tabs: [
      { part: "Tabs", purpose: "Owns the selected panel." },
      { part: "TabsList", purpose: "Groups the tab triggers." },
      { part: "TabsTrigger", purpose: "Selects a panel by value." },
      {
        part: "TabsContent",
        purpose: "Shows the content with the matching value.",
      },
    ],
    drawer: [
      { part: "Drawer", purpose: "Owns the open state." },
      { part: "DrawerTrigger", purpose: "Opens the sheet." },
      { part: "DrawerContent", purpose: "Contains the sheet's task." },
      { part: "DrawerHandle", purpose: "Resizes or dismisses a bottom sheet." },
      { part: "DrawerBody", purpose: "Holds scrollable content." },
      { part: "DrawerClose", purpose: "Dismisses the sheet." },
    ],
    "token-field": [
      { part: "TagFieldValue", purpose: "Tokenizes comma-separated tags." },
      { part: "TokenField", purpose: "Owns the value and editing state." },
      { part: "TokenFieldLabel", purpose: "Names the field." },
      { part: "TokenFieldInput", purpose: "Edits text and tokens." },
    ],
    "tag-group": [
      { part: "TagGroup", purpose: "Owns removal behavior." },
      { part: "TagGroupLabel", purpose: "Names the collection." },
      { part: "TagListView", purpose: "Renders the collection." },
      { part: "Tag", purpose: "Displays a removable item." },
    ],
    "empty-state": [
      { part: "EmptyState", purpose: "Groups the empty message." },
      { part: "EmptyStateTitle", purpose: "Names what is missing." },
      { part: "EmptyStateDescription", purpose: "Explains what to do next." },
      {
        part: "EmptyStateActions",
        purpose: "Holds actions when they are useful.",
      },
    ],
    pagination: [
      { part: "Pagination", purpose: "Names the navigation landmark." },
      { part: "PaginationList", purpose: "Orders the page links." },
      { part: "PaginationLink", purpose: "Navigates to a page URL." },
      { part: "PaginationEllipsis", purpose: "Marks omitted pages." },
    ],
    disclosure: [
      { part: "Disclosure", purpose: "Owns the expanded state." },
      { part: "DisclosureHeader", purpose: "Toggles the panel." },
      { part: "DisclosurePanel", purpose: "Contains the revealed details." },
    ],
    "color-swatch-picker": [
      { part: "ColorSwatchPicker", purpose: "Owns the selected color." },
      { part: "ColorSwatchPickerItem", purpose: "Defines a labeled swatch." },
    ],
    "drop-zone": [
      {
        part: "DropZone",
        purpose: "Receives files and validates the drop operation.",
      },
      { part: "DropZoneLabel", purpose: "Names the target." },
      {
        part: "FileTrigger",
        purpose: "Offers a file picker as an alternative.",
      },
    ],
    fieldset: [
      { part: "Fieldset", purpose: "Groups related native controls." },
      { part: "FieldsetLegend", purpose: "Names the group." },
      { part: "FieldsetDescription", purpose: "Adds shared guidance." },
    ],
  };
