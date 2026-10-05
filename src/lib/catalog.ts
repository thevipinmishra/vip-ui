/**
 * Single source of truth for component identity, grouping, and order across the
 * docs site: catalog page, sidebar, search, previous/next navigation, and sitemap.
 *
 * Keep this module free of Node-only imports so client components can use it.
 */

interface CatalogDefinition {
  title: string;
  description: string;
  items: { slug: string; name: string; useFor: string }[];
}

const catalog: CatalogDefinition[] = [
  {
    title: "Actions",
    description: "Triggers, commands, and selected actions.",
    items: [
      {
        slug: "button",
        name: "Button",
        useFor: "An action with clear priority.",
      },
      {
        slug: "button-group",
        name: "Button group",
        useFor: "Joining related actions or a split action with a menu.",
      },
      {
        slug: "link",
        name: "Link",
        useFor: "Navigation to another page or location.",
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
          "Actions beside an item, opened by right-click, long press, or keyboard.",
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
        useFor: "Selecting one or more options from a set.",
      },
      {
        slug: "toolbar",
        name: "Toolbar",
        useFor: "Related controls in a keyboard-navigable row.",
      },
      {
        slug: "file-trigger",
        name: "File trigger",
        useFor: "Choosing files from an accessible button.",
      },
      {
        slug: "copy-button",
        name: "Copy button",
        useFor: "Copying a value with success or failure feedback.",
      },
      {
        slug: "command-palette",
        name: "Command palette",
        useFor: "Searching and running actions.",
      },
    ],
  },
  {
    title: "Forms",
    description: "Fields, choices, and validation.",
    items: [
      {
        slug: "text-field",
        name: "Text field",
        useFor: "Labeled text entry and validation.",
      },
      {
        slug: "password-field",
        name: "Password field",
        useFor: "Entering a password with a reveal control.",
      },
      {
        slug: "input-group",
        name: "Input group",
        useFor: "A field with a prefix, suffix, or action.",
      },
      {
        slug: "text-area",
        name: "Text area",
        useFor: "Longer answers with guidance.",
      },
      {
        slug: "number-field",
        name: "Number field",
        useFor: "Entering and adjusting numeric values.",
      },
      {
        slug: "search-field",
        name: "Search field",
        useFor: "Finding items by a typed query.",
      },
      {
        slug: "select",
        name: "Select",
        useFor: "One choice from a longer list.",
      },
      {
        slug: "native-select",
        name: "Native select",
        useFor: "One choice using the device's picker.",
      },
      {
        slug: "combo-box",
        name: "Combo box",
        useFor: "Filtering and selecting one or several options.",
      },
      {
        slug: "autocomplete",
        name: "Autocomplete",
        useFor: "Filtering a list of options as you type.",
      },
      {
        slug: "token-field",
        name: "Token field",
        useFor: "Entering editable tags.",
      },
      {
        slug: "checkbox",
        name: "Checkbox",
        useFor: "Independent choices in a form.",
      },
      {
        slug: "checkbox-group",
        name: "Checkbox group",
        useFor: "Selecting multiple options from a group.",
      },
      {
        slug: "radio-group",
        name: "Radio group",
        useFor: "One choice from a short visible list.",
      },
      {
        slug: "switch",
        name: "Switch",
        useFor: "A setting that takes effect immediately.",
      },
      {
        slug: "slider",
        name: "Slider",
        useFor: "A value within a bounded range.",
      },
      {
        slug: "form",
        name: "Form",
        useFor: "Grouping fields with validation and submission.",
      },
      {
        slug: "fieldset",
        name: "Fieldset",
        useFor: "Grouping related form controls under a legend.",
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
        useFor: "Entering a known date one segment at a time.",
      },
      {
        slug: "time-field",
        name: "Time field",
        useFor: "Entering a time in editable segments.",
      },
      {
        slug: "calendar",
        name: "Calendar",
        useFor: "Selecting a date from a month view.",
      },
      {
        slug: "range-calendar",
        name: "Range calendar",
        useFor: "Selecting a start and end date.",
      },
      {
        slug: "date-picker",
        name: "Date picker",
        useFor: "Entering a date or choosing one from a calendar.",
      },
      {
        slug: "date-range-picker",
        name: "Date range picker",
        useFor: "Entering or selecting a date range.",
      },
      {
        slug: "color-field",
        name: "Color field",
        useFor: "Entering a color value as text.",
      },
      {
        slug: "color-swatch",
        name: "Color swatch",
        useFor: "Showing a sample of a color.",
      },
      {
        slug: "color-swatch-picker",
        name: "Color swatch picker",
        useFor: "Choosing from a set of color swatches.",
      },
      {
        slug: "color-picker",
        name: "Color picker",
        useFor: "Editing a color visually or by hex value.",
      },
    ],
  },
  {
    title: "Display & layout",
    description: "Containers, identities, values, and loading states.",
    items: [
      {
        slug: "card",
        name: "Card",
        useFor: "Grouping related content and actions.",
      },
      {
        slug: "avatar",
        name: "Avatar",
        useFor: "Showing a person with an image or initials.",
      },
      {
        slug: "skeleton",
        name: "Skeleton",
        useFor: "Reserving space while content loads.",
      },
      {
        slug: "spinner",
        name: "Spinner",
        useFor: "An indeterminate loading indicator.",
      },
      {
        slug: "empty-state",
        name: "Empty state",
        useFor: "Explaining an empty collection and its next step.",
      },
      {
        slug: "description-list",
        name: "Description list",
        useFor: "Pairing labels and values.",
      },
      {
        slug: "kbd-code",
        name: "Kbd & code",
        useFor: "Marking up shortcuts and inline code.",
      },
      {
        slug: "stat",
        name: "Stat",
        useFor: "Showing a labeled metric and context.",
      },
      {
        slug: "animated-number",
        name: "Animated number",
        useFor: "A number that animates when its value changes.",
      },
      {
        slug: "text-swap",
        name: "Text swap",
        useFor: "Text that transitions when its value changes.",
      },
    ],
  },
  {
    title: "Content & feedback",
    description: "Information, navigation, and progress.",
    items: [
      {
        slug: "badge",
        name: "Badge",
        useFor: "Brief status or metadata.",
      },
      {
        slug: "alert",
        name: "Alert",
        useFor: "Information beside the task it affects.",
      },
      {
        slug: "message",
        name: "Message",
        useFor: "A readable entry in a conversation.",
      },
      {
        slug: "tabs",
        name: "Tabs",
        useFor: "Related panels in one view.",
      },
      {
        slug: "accordion",
        name: "Accordion",
        useFor: "Details revealed on demand.",
      },
      {
        slug: "disclosure",
        name: "Disclosure",
        useFor: "Showing or hiding a section of content.",
      },
      {
        slug: "dialog",
        name: "Dialog",
        useFor: "A short focused task above the page.",
      },
      {
        slug: "drawer",
        name: "Drawer",
        useFor: "A panel that slides from an edge.",
      },
      {
        slug: "popover",
        name: "Popover",
        useFor: "Content in a panel anchored to a trigger.",
      },
      {
        slug: "tooltip",
        name: "Tooltip",
        useFor: "Brief supplementary help on hover or focus.",
      },
      {
        slug: "toast",
        name: "Toast",
        useFor: "Feedback after an action.",
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
        slug: "timeline",
        name: "Timeline",
        useFor: "Events in a time-ordered sequence.",
      },
      {
        slug: "separator",
        name: "Separator",
        useFor: "Separating sections of content.",
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
      {
        slug: "tag-group",
        name: "Tag group",
        useFor: "A collection of tags that can be removed.",
      },
      {
        slug: "list-box",
        name: "List box",
        useFor: "A list of options for selection.",
      },
      {
        slug: "presence-list",
        name: "Presence list",
        useFor: "A list with animated item additions and removals.",
      },
      {
        slug: "grid-list",
        name: "Grid list",
        useFor: "A collection of interactive rows.",
      },
      {
        slug: "tree",
        name: "Tree",
        useFor: "Hierarchical items that can be expanded.",
      },
      {
        slug: "drop-zone",
        name: "Drop zone",
        useFor: "Adding local files by drag or picker.",
      },
      {
        slug: "attachment",
        name: "Attachment",
        useFor: "Reviewing files and upload states.",
      },
      {
        slug: "table",
        name: "Table",
        useFor: "Data in rows and columns.",
      },
      {
        slug: "preview-trigger",
        name: "Preview trigger",
        useFor: "A preview on hover, focus, or long press.",
      },
    ],
  },
];

/**
 * React Aria APIs for inherited props on wrappers and their composed parts.
 * The URL appears in the component's API reference.
 */
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
  dialog: "https://react-aria.adobe.com/Modal",
  drawer: "https://react-aria.adobe.com/Modal",
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
  "preview-trigger": "https://react-aria.adobe.com/PreviewTrigger",
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

/** Every component in catalog order: the sequence used by the catalog, search, and docs navigation. */
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
