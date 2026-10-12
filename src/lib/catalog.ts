interface CatalogDefinition {
  title: string;
  description: string;
  items: { slug: string; name: string; useFor: string }[];
}

const catalog: CatalogDefinition[] = [
  {
    title: "Actions",
    description: "Triggers, commands, and toggles.",
    items: [
      {
        slug: "button",
        name: "Button",
        useFor: "An action with clear priority.",
      },
      {
        slug: "button-group",
        name: "Button group",
        useFor: "A set of related actions, or a split action with a menu.",
      },
      {
        slug: "menu",
        name: "Menu",
        useFor: "Several actions from one trigger.",
      },
      {
        slug: "context-menu",
        name: "Context menu",
        useFor:
          "Actions for an item, opened by right-click, long press, or keyboard.",
      },
      {
        slug: "toggle-button",
        name: "Toggle button",
        useFor:
          "A button that switches between selected and unselected states.",
      },
      {
        slug: "toggle-button-group",
        name: "Toggle button group",
        useFor: "A set of toggle buttons for one or more choices.",
      },
      {
        slug: "toolbar",
        name: "Toolbar",
        useFor: "A keyboard-navigable group of related controls.",
      },
      {
        slug: "file-trigger",
        name: "File trigger",
        useFor: "A button that opens the file picker.",
      },
      {
        slug: "copy-button",
        name: "Copy button",
        useFor: "A button that copies a value and shows the result.",
      },
      {
        slug: "command-palette",
        name: "Command palette",
        useFor: "A search dialog for commands.",
      },
    ],
  },
  {
    title: "Forms",
    description: "Fields, choices, files, and validation.",
    items: [
      {
        slug: "text-field",
        name: "Text field",
        useFor: "A labeled text input with validation.",
      },
      {
        slug: "password-field",
        name: "Password field",
        useFor: "A password input with a show password control.",
      },
      {
        slug: "password-strength-meter",
        name: "Password strength meter",
        useFor: "A meter that rates a password by length and character mix.",
      },
      {
        slug: "inline-edit",
        name: "Inline edit",
        useFor: "Text that you edit in place, with save error handling.",
      },
      {
        slug: "input-group",
        name: "Input group",
        useFor: "A field with a prefix, suffix, or action.",
      },
      {
        slug: "text-area",
        name: "Text area",
        useFor: "A multiline text input.",
      },
      {
        slug: "number-field",
        name: "Number field",
        useFor: "A number input with increment and decrement buttons.",
      },
      {
        slug: "search-field",
        name: "Search field",
        useFor: "A text input for search queries, with a clear button.",
      },
      {
        slug: "select",
        name: "Select",
        useFor: "One choice from a longer list.",
      },
      {
        slug: "native-select",
        name: "Native select",
        useFor: "One choice from the device's native picker.",
      },
      {
        slug: "combo-box",
        name: "Combo box",
        useFor: "A text input that filters a list of options.",
      },
      {
        slug: "autocomplete",
        name: "Autocomplete",
        useFor: "A list of options that filters as you type.",
      },
      {
        slug: "token-field",
        name: "Token field",
        useFor: "A text input that turns entries into editable tokens.",
      },
      {
        slug: "checkbox",
        name: "Checkbox",
        useFor: "An independent choice in a form.",
      },
      {
        slug: "checkbox-group",
        name: "Checkbox group",
        useFor: "A group of checkboxes for one or more choices.",
      },
      {
        slug: "radio-group",
        name: "Radio group",
        useFor: "One choice from a short visible list.",
      },
      {
        slug: "rating-input",
        name: "Rating input",
        useFor: "A star rating that you set with keyboard or pointer.",
      },
      {
        slug: "switch",
        name: "Switch",
        useFor: "A setting that takes effect immediately.",
      },
      {
        slug: "slider",
        name: "Slider",
        useFor: "A value or range between a minimum and maximum.",
      },
      {
        slug: "drop-zone",
        name: "Drop zone",
        useFor: "An area where you drop files.",
      },
      {
        slug: "attachment",
        name: "Attachment",
        useFor: "A file with its upload state.",
      },
      {
        slug: "form",
        name: "Form",
        useFor: "A group of fields with validation and submission.",
      },
      {
        slug: "fieldset",
        name: "Fieldset",
        useFor: "Related form controls under a legend.",
      },
    ],
  },
  {
    title: "Date & color",
    description: "Structured dates, times, and colors.",
    items: [
      {
        slug: "date-field",
        name: "Date field",
        useFor: "A date input with editable segments.",
      },
      {
        slug: "time-field",
        name: "Time field",
        useFor: "A time input with editable segments.",
      },
      {
        slug: "calendar",
        name: "Calendar",
        useFor: "A month grid for selecting a date.",
      },
      {
        slug: "range-calendar",
        name: "Range calendar",
        useFor: "A month grid for selecting a date range.",
      },
      {
        slug: "date-picker",
        name: "Date picker",
        useFor: "A date input with a calendar popover.",
      },
      {
        slug: "date-range-picker",
        name: "Date range picker",
        useFor: "A date range input with a calendar popover.",
      },
      {
        slug: "color-field",
        name: "Color field",
        useFor: "A text input for a color value.",
      },
      {
        slug: "color-swatch",
        name: "Color swatch",
        useFor: "A sample of a color.",
      },
      {
        slug: "color-swatch-picker",
        name: "Color swatch picker",
        useFor: "A set of color swatches to select from.",
      },
      {
        slug: "color-picker",
        name: "Color picker",
        useFor: "A color area, hue slider, and hex field in a popover.",
      },
    ],
  },
  {
    title: "Overlays",
    description: "Panels and messages above the page.",
    items: [
      {
        slug: "dialog",
        name: "Dialog",
        useFor: "A short focused task above the page.",
      },
      {
        slug: "sheet",
        name: "Sheet",
        useFor: "A swipeable panel that slides from an edge.",
      },
      {
        slug: "popover",
        name: "Popover",
        useFor: "Content in a panel anchored to a trigger.",
      },
      {
        slug: "tooltip",
        name: "Tooltip",
        useFor: "A short hint on hover or focus.",
      },
      {
        slug: "toast",
        name: "Toast",
        useFor: "Feedback after an action.",
      },
    ],
  },
  {
    title: "Navigation",
    description: "Links between pages and views.",
    items: [
      {
        slug: "link",
        name: "Link",
        useFor: "A link to another page or location.",
      },
      {
        slug: "tabs",
        name: "Tabs",
        useFor: "Related panels in one view.",
      },
      {
        slug: "breadcrumbs",
        name: "Breadcrumbs",
        useFor: "A path of links to the current page.",
      },
      {
        slug: "pagination",
        name: "Pagination",
        useFor: "Links between pages of results.",
      },
    ],
  },
  {
    title: "Collections",
    description: "Lists, trees, and tables of items.",
    items: [
      {
        slug: "list-box",
        name: "List box",
        useFor: "A list of options for selection.",
      },
      {
        slug: "grid-list",
        name: "Grid list",
        useFor: "A list of interactive rows.",
      },
      {
        slug: "tree",
        name: "Tree",
        useFor: "Nested items that expand and collapse.",
      },
      {
        slug: "tag-group",
        name: "Tag group",
        useFor: "A group of tags that you can remove.",
      },
      {
        slug: "table",
        name: "Table",
        useFor: "Data in rows and columns.",
      },
      {
        slug: "data-table",
        name: "Data table",
        useFor: "A table with search, filters, sorting, selection, and pages.",
      },
    ],
  },
  {
    title: "Feedback",
    description: "Status, progress, and loading states.",
    items: [
      {
        slug: "alert",
        name: "Alert",
        useFor: "A message beside the content it affects.",
      },
      {
        slug: "badge",
        name: "Badge",
        useFor: "A short label, status, or count.",
      },
      {
        slug: "progress-bar",
        name: "Progress bar",
        useFor: "Task progress in a horizontal bar.",
      },
      {
        slug: "progress-ring",
        name: "Progress ring",
        useFor: "Task progress in a circular indicator.",
      },
      {
        slug: "meter",
        name: "Meter",
        useFor: "A value within a known range.",
      },
      {
        slug: "stepper",
        name: "Stepper",
        useFor: "The current step in a sequence.",
      },
      {
        slug: "spinner",
        name: "Spinner",
        useFor: "An indeterminate loading indicator.",
      },
      {
        slug: "skeleton",
        name: "Skeleton",
        useFor: "A placeholder shape while content loads.",
      },
      {
        slug: "empty-state",
        name: "Empty state",
        useFor: "A message for an empty view, with a next step.",
      },
    ],
  },
  {
    title: "Display & layout",
    description: "Containers, sections, and values.",
    items: [
      {
        slug: "card",
        name: "Card",
        useFor: "A container for related content and actions.",
      },
      {
        slug: "accordion",
        name: "Accordion",
        useFor: "A set of sections that expand and collapse.",
      },
      {
        slug: "disclosure",
        name: "Disclosure",
        useFor: "A section that you show or hide.",
      },
      {
        slug: "separator",
        name: "Separator",
        useFor: "A line between sections of content.",
      },
      {
        slug: "avatar",
        name: "Avatar",
        useFor: "A person's image or initials.",
      },
      {
        slug: "description-list",
        name: "Description list",
        useFor: "Pairs of labels and values.",
      },
      {
        slug: "stat",
        name: "Stat",
        useFor: "A labeled metric with context.",
      },
      {
        slug: "timeline",
        name: "Timeline",
        useFor: "Events in a time-ordered sequence.",
      },
      {
        slug: "kbd-code",
        name: "Kbd & code",
        useFor: "Keyboard shortcuts and inline code.",
      },
    ],
  },
  {
    title: "AI",
    description: "Messages, agent steps, and sources.",
    items: [
      {
        slug: "message",
        name: "Message",
        useFor: "A message in a conversation.",
      },
      {
        slug: "agent-status",
        name: "Agent status",
        useFor: "The state of an agent's current step.",
      },
      {
        slug: "tool-call",
        name: "Tool call",
        useFor: "An expandable tool request and result.",
      },
      {
        slug: "source-link",
        name: "Source link",
        useFor: "A linked source for an answer.",
      },
    ],
  },
  {
    title: "Motion & effects",
    description: "Text and content transitions.",
    items: [
      {
        slug: "text-swap",
        name: "Text swap",
        useFor: "Text that transitions when its value changes.",
      },
      {
        slug: "animated-number",
        name: "Animated number",
        useFor: "A number that animates when its value changes.",
      },
      {
        slug: "text-reveal",
        name: "Text reveal",
        useFor: "Text that appears word by word or character by character.",
      },
      {
        slug: "text-scramble",
        name: "Text scramble",
        useFor: "Text that resolves from scrambled characters.",
      },
      {
        slug: "presence",
        name: "Presence",
        useFor: "Content that animates in and out.",
      },
      {
        slug: "presence-list",
        name: "Presence list",
        useFor: "A list with animated item additions and removals.",
      },
      {
        slug: "stagger-group",
        name: "Stagger group",
        useFor: "Items that enter one after another.",
      },
      {
        slug: "layout-morph",
        name: "Layout morph",
        useFor:
          "A container that resizes to new content without stretching it.",
      },
      {
        slug: "marquee",
        name: "Marquee",
        useFor: "A looping strip of content that you can pause.",
      },
    ],
  },
];

const reactAriaDocs: Record<string, string> = {
  button: "https://react-aria.adobe.com/Button",
  link: "https://react-aria.adobe.com/Link",
  menu: "https://react-aria.adobe.com/Menu",
  "context-menu": "https://react-aria.adobe.com/Menu",
  "toggle-button": "https://react-aria.adobe.com/ToggleButton",
  "toggle-button-group": "https://react-aria.adobe.com/ToggleButtonGroup",
  toolbar: "https://react-aria.adobe.com/Toolbar",
  "file-trigger": "https://react-aria.adobe.com/FileTrigger",
  "copy-button": "https://react-aria.adobe.com/Button",
  "command-palette": "https://react-aria.adobe.com/Menu",
  "text-field": "https://react-aria.adobe.com/TextField",
  "password-field": "https://react-aria.adobe.com/TextField",
  "password-strength-meter": "https://react-aria.adobe.com/Meter",
  "inline-edit": "https://react-aria.adobe.com/TextField",
  "input-group": "https://react-aria.adobe.com/Group",
  "text-area": "https://react-aria.adobe.com/TextField#textarea",
  "number-field": "https://react-aria.adobe.com/NumberField",
  "search-field": "https://react-aria.adobe.com/SearchField",
  select: "https://react-aria.adobe.com/Select",
  "combo-box": "https://react-aria.adobe.com/ComboBox",
  autocomplete: "https://react-aria.adobe.com/Autocomplete",
  "token-field": "https://react-aria.adobe.com/TokenField",
  checkbox: "https://react-aria.adobe.com/Checkbox",
  "checkbox-group": "https://react-aria.adobe.com/CheckboxGroup",
  "radio-group": "https://react-aria.adobe.com/RadioGroup",
  "rating-input": "https://react-aria.adobe.com/RadioGroup",
  switch: "https://react-aria.adobe.com/Switch",
  slider: "https://react-aria.adobe.com/Slider",
  form: "https://react-aria.adobe.com/Form",
  "date-field": "https://react-aria.adobe.com/DateField",
  "time-field": "https://react-aria.adobe.com/TimeField",
  calendar: "https://react-aria.adobe.com/Calendar",
  "range-calendar": "https://react-aria.adobe.com/RangeCalendar",
  "date-picker": "https://react-aria.adobe.com/DatePicker",
  "date-range-picker": "https://react-aria.adobe.com/DateRangePicker",
  "color-field": "https://react-aria.adobe.com/ColorField",
  "color-swatch": "https://react-aria.adobe.com/ColorSwatch",
  "color-swatch-picker": "https://react-aria.adobe.com/ColorSwatchPicker",
  "color-picker": "https://react-aria.adobe.com/ColorPicker",
  tabs: "https://react-aria.adobe.com/Tabs",
  accordion: "https://react-aria.adobe.com/DisclosureGroup",
  disclosure: "https://react-aria.adobe.com/Disclosure",
  "tool-call": "https://react-aria.adobe.com/Disclosure",
  "source-link": "https://react-aria.adobe.com/Link",
  dialog: "https://react-aria.adobe.com/Modal",
  sheet: "https://react-aria.adobe.com/Sheet",
  popover: "https://react-aria.adobe.com/Popover",
  tooltip: "https://react-aria.adobe.com/Tooltip",
  toast: "https://react-aria.adobe.com/Toast",
  "progress-bar": "https://react-aria.adobe.com/ProgressBar",
  "progress-ring": "https://react-aria.adobe.com/ProgressBar",
  meter: "https://react-aria.adobe.com/Meter",
  separator: "https://react-aria.adobe.com/Separator",
  breadcrumbs: "https://react-aria.adobe.com/Breadcrumbs",
  "tag-group": "https://react-aria.adobe.com/TagGroup",
  "list-box": "https://react-aria.adobe.com/ListBox",
  "grid-list": "https://react-aria.adobe.com/GridList",
  tree: "https://react-aria.adobe.com/Tree",
  "drop-zone": "https://react-aria.adobe.com/DropZone",
  table: "https://react-aria.adobe.com/Table",
  "data-table": "https://react-aria.adobe.com/Table",
};

export interface CatalogComponent {
  slug: string;
  name: string;
  group: string;
  useFor: string;
  reactAriaDocsHref?: string;
}

export interface CatalogGroup {
  title: string;
  description: string;
  components: CatalogComponent[];
}

export const catalogGroups: CatalogGroup[] = catalog.map((group) => ({
  title: group.title,
  description: group.description,
  components: group.items.map((item) => ({
    ...item,
    group: group.title,
    reactAriaDocsHref: reactAriaDocs[item.slug],
  })),
}));

export const catalogComponents: CatalogComponent[] = catalogGroups.flatMap(
  (group) => group.components,
);

const componentsBySlug = new Map(
  catalogComponents.map((component) => [component.slug, component]),
);

export function getComponent(slug: string): CatalogComponent | undefined {
  return componentsBySlug.get(slug);
}

export function getNeighbors(slug: string): {
  previous?: CatalogComponent;
  next?: CatalogComponent;
} {
  const index = catalogComponents.findIndex(
    (component) => component.slug === slug,
  );
  if (index < 0) return {};
  return {
    previous: catalogComponents[index - 1],
    next: catalogComponents[index + 1],
  };
}
