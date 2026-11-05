import catalog from "./catalog.json";
import docGroupsJson from "./doc-groups.json";

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
  reasoning: "https://react-aria.adobe.com/Disclosure",
  "tool-call": "https://react-aria.adobe.com/Disclosure",
  "source-link": "https://react-aria.adobe.com/Link",
  dialog: "https://react-aria.adobe.com/Modal",
  sheet: "https://react-aria.adobe.com/Sheet",
  popover: "https://react-aria.adobe.com/Popover",
  tooltip: "https://react-aria.adobe.com/Tooltip",
  toast: "https://react-aria.adobe.com/Toast",
  "progress-bar": "https://react-aria.adobe.com/ProgressBar",
  "progress-ring": "https://react-aria.adobe.com/ProgressBar",
  "prompt-input": "https://react-aria.adobe.com/TextField",
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

function reactAriaLink(href: string | undefined) {
  return href ? { name: new URL(href).pathname.slice(1), href } : undefined;
}

export interface DocGroup {
  slug: string;
  name: string;
  description: string;
  members: readonly string[];
}

export const docGroups = docGroupsJson.groups as readonly DocGroup[];

const docGroupByMember = new Map<string, DocGroup>();
for (const group of docGroups) {
  for (const member of group.members) {
    const existing = docGroupByMember.get(member);
    if (existing) {
      throw new Error(
        `${member} belongs to both ${existing.slug} and ${group.slug}`,
      );
    }
    docGroupByMember.set(member, group);
  }
}

export function getDocGroup(slug: string): DocGroup | undefined {
  return docGroupByMember.get(slug);
}

export function canonicalDocSlug(slug: string): string {
  return getDocGroup(slug)?.slug ?? slug;
}

export interface CatalogComponent {
  slug: string;
  name: string;
  group: string;
  description: string;
  reactAria?: { name: string; href: string };
  docSlug: string;
  docName: string;
  docAnchor?: string;
}

export interface CatalogGroup {
  title: string;
  description: string;
  components: CatalogComponent[];
}

export const catalogGroups: CatalogGroup[] = catalog.groups.map((group) => ({
  title: group.title,
  description: group.description,
  components: group.items.map((item) => {
    const docGroup = getDocGroup(item.slug);
    const isCanonical = !docGroup || docGroup.slug === item.slug;
    return {
      ...item,
      group: group.title,
      reactAria: reactAriaLink(reactAriaDocs[item.slug]),
      docSlug: docGroup?.slug ?? item.slug,
      docName: docGroup?.name ?? item.name,
      docAnchor: isCanonical ? undefined : item.slug,
    };
  }),
}));

export const catalogComponents: CatalogComponent[] = catalogGroups.flatMap(
  (group) => group.components,
);

export const catalogDocGroups: CatalogGroup[] = catalogGroups
  .map((group) => ({
    ...group,
    components: group.components.filter(
      (component) => component.docSlug === component.slug,
    ),
  }))
  .filter((group) => group.components.length > 0);

export const catalogDocComponents: CatalogComponent[] =
  catalogDocGroups.flatMap((group) => group.components);

const componentsBySlug = new Map(
  catalogComponents.map((component) => [component.slug, component]),
);

for (const group of docGroups) {
  if (!componentsBySlug.has(group.slug)) {
    throw new Error(`src/lib/doc-groups.json has an unknown ${group.slug}`);
  }
  for (const member of group.members) {
    if (!componentsBySlug.has(member)) {
      throw new Error(
        `src/lib/doc-groups.json has an unknown ${member} in ${group.slug}`,
      );
    }
  }
}

export function getComponent(slug: string): CatalogComponent | undefined {
  return componentsBySlug.get(slug);
}

export function componentHref(slug: string): string {
  const component = componentsBySlug.get(slug);
  if (!component) return `/components/${slug}`;
  return component.docAnchor
    ? `/components/${component.docSlug}#${component.docAnchor}`
    : `/components/${component.docSlug}`;
}

export function componentInstallHref(slug: string): string {
  const component = componentsBySlug.get(slug);
  if (!component) return `/components/${slug}#installation`;
  return getDocGroup(slug)
    ? `/components/${component.docSlug}#${slug}-installation`
    : `/components/${component.docSlug}#installation`;
}

export function componentMarkdownHref(slug: string): string {
  const component = componentsBySlug.get(slug);
  return `/components/${component?.docSlug ?? slug}.md`;
}

export function componentName(slug: string): string {
  const name = componentsBySlug.get(slug)?.name;
  if (name) return name;
  const words = slug.replaceAll("-", " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export function componentDescription(slug: string): string {
  const description = componentsBySlug.get(slug)?.description;
  if (!description) throw new Error(`src/lib/catalog.json has no ${slug}`);
  return description;
}

export function getNeighbors(slug: string): {
  previous?: CatalogComponent;
  next?: CatalogComponent;
} {
  const canonical = canonicalDocSlug(slug);
  const index = catalogDocComponents.findIndex(
    (component) => component.slug === canonical,
  );
  if (index < 0) return {};
  return {
    previous: catalogDocComponents[index - 1],
    next: catalogDocComponents[index + 1],
  };
}
