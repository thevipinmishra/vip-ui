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
import { ButtonGroupOrientationsDemo } from "@/components/docs/button-group-orientations-demo";
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
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { DateFieldDemo } from "@/components/docs/date-field-demo";
import { DatePickerControlledDemo } from "@/components/docs/date-picker-controlled-demo";
import { DatePickerDemo } from "@/components/docs/date-picker-demo";
import { DatePickerUnavailableDemo } from "@/components/docs/date-picker-unavailable-demo";
import { DateRangePickerDemo } from "@/components/docs/date-range-picker-demo";
import { DateRangePickerLimitsDemo } from "@/components/docs/date-range-picker-limits-demo";
import { DescriptionListDemo } from "@/components/docs/description-list-demo";
import { DisclosureDemo } from "@/components/docs/disclosure-demo";
import { DropZoneBasicDemo } from "@/components/docs/drop-zone-basic-demo";
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
import { LayoutMorphDemo } from "@/components/docs/layout-morph-demo";
import { LinkDemo } from "@/components/docs/link-demo";
import { ListBoxDemo } from "@/components/docs/list-box-demo";
import { ListBoxMultipleDemo } from "@/components/docs/list-box-multiple-demo";
import { MarqueeDemo } from "@/components/docs/marquee-demo";
import { MaskRevealDemo } from "@/components/docs/mask-reveal-demo";
import { MaskRevealDirectionsDemo } from "@/components/docs/mask-reveal-directions-demo";
import { MeterBasicDemo } from "@/components/docs/meter-basic-demo";
import { MeterDemo } from "@/components/docs/meter-demo";
import { NumberFieldDemo } from "@/components/docs/number-field-demo";
import { NumberFieldSeatsDemo } from "@/components/docs/number-field-seats-demo";
import { PaginationBasicDemo } from "@/components/docs/pagination-basic-demo";
import { PaginationDemo } from "@/components/docs/pagination-demo";
import { ParallaxLayerDemo } from "@/components/docs/parallax-layer-demo";
import { PopoverDemo } from "@/components/docs/popover-demo";
import { PopoverPlacementDemo } from "@/components/docs/popover-placement-demo";
import { PresenceDemo } from "@/components/docs/presence-demo";
import { PresenceListBasicDemo } from "@/components/docs/presence-list-basic-demo";
import { PresenceListDemo } from "@/components/docs/presence-list-demo";
import { PreviewTriggerDemo } from "@/components/docs/preview-trigger-demo";
import { ProgressBarBasicDemo } from "@/components/docs/progress-bar-basic-demo";
import { ProgressBarDemo } from "@/components/docs/progress-bar-demo";
import { ProgressRingBasicDemo } from "@/components/docs/progress-ring-basic-demo";
import { ProgressRingDemo } from "@/components/docs/progress-ring-demo";
import { RangeCalendarDemo } from "@/components/docs/range-calendar-demo";
import { RangeCalendarLimitsDemo } from "@/components/docs/range-calendar-limits-demo";
import { ScrollHighlightDemo } from "@/components/docs/scroll-highlight-demo";
import { ScrollProgressDemo } from "@/components/docs/scroll-progress-demo";
import { SeparatorDemo } from "@/components/docs/separator-demo";
import { SkeletonDemo } from "@/components/docs/skeleton-demo";
import { SpinnerBasicDemo } from "@/components/docs/spinner-basic-demo";
import { SpinnerDemo } from "@/components/docs/spinner-demo";
import { SpinnerUsageDemo } from "@/components/docs/spinner-usage-demo";
import { StaggerGroupDemo } from "@/components/docs/stagger-group-demo";
import { StatDemo } from "@/components/docs/stat-demo";
import { StepperBasicDemo } from "@/components/docs/stepper-basic-demo";
import { StepperDemo } from "@/components/docs/stepper-demo";
import { TableBasicDemo } from "@/components/docs/table-basic-demo";
import { TableDemo } from "@/components/docs/table-demo";
import { TableFilterDemo } from "@/components/docs/table-filter-demo";
import { TableSortingDemo } from "@/components/docs/table-sorting-demo";
import { TagGroupDemo } from "@/components/docs/tag-group-demo";
import { TextRevealDemo } from "@/components/docs/text-reveal-demo";
import { TextScrambleDemo } from "@/components/docs/text-scramble-demo";
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
import { getComponentPageData } from "@/lib/component-examples";

const entries: {
  slug: string;
  name: string;
  demo: ReactNode;
}[] = [
  {
    slug: "command-palette",
    name: "Command palette",
    demo: <CommandPaletteDemo />,
  },
  {
    slug: "token-field",
    name: "Token field",
    demo: <TokenFieldDemo />,
  },
  {
    slug: "tree",
    name: "Tree",
    demo: <TreeDemo />,
  },
  {
    slug: "drop-zone",
    name: "Drop zone",
    demo: <DropZoneDemo />,
  },
  {
    slug: "color-picker",
    name: "Color picker",
    demo: <ColorPickerDemo />,
  },
  {
    slug: "separator",
    name: "Separator",
    demo: <SeparatorDemo />,
  },
  {
    slug: "progress-bar",
    name: "Progress bar",
    demo: <ProgressBarDemo />,
  },
  {
    slug: "progress-ring",
    name: "Progress ring",
    demo: <ProgressRingDemo />,
  },
  {
    slug: "meter",
    name: "Meter",
    demo: <MeterDemo />,
  },
  {
    slug: "number-field",
    name: "Number field",
    demo: <NumberFieldDemo />,
  },
  {
    slug: "toggle-button",
    name: "Toggle button",
    demo: <ToggleButtonDemo />,
  },
  {
    slug: "button-group",
    name: "Button group",
    demo: <ButtonGroupDemo />,
  },
  {
    slug: "toggle-button-group",
    name: "Toggle button group",
    demo: <ToggleButtonGroupDemo />,
  },
  {
    slug: "breadcrumbs",
    name: "Breadcrumbs",
    demo: <BreadcrumbsDemo />,
  },
  {
    slug: "tag-group",
    name: "Tag group",
    demo: <TagGroupDemo />,
  },
  {
    slug: "list-box",
    name: "List box",
    demo: <ListBoxDemo />,
  },
  {
    slug: "presence-list",
    name: "Presence list",
    demo: <PresenceListDemo />,
  },
  {
    slug: "color-swatch",
    name: "Color swatch",
    demo: <ColorSwatchDemo />,
  },
  {
    slug: "checkbox-group",
    name: "Checkbox group",
    demo: <CheckboxGroupDemo />,
  },
  {
    slug: "disclosure",
    name: "Disclosure",
    demo: <DisclosureDemo />,
  },
  {
    slug: "popover",
    name: "Popover",
    demo: <PopoverDemo />,
  },
  {
    slug: "toolbar",
    name: "Toolbar",
    demo: <ToolbarDemo />,
  },
  {
    slug: "grid-list",
    name: "Grid list",
    demo: <GridListDemo />,
  },
  {
    slug: "color-field",
    name: "Color field",
    demo: <ColorFieldDemo />,
  },
  {
    slug: "form",
    name: "Form",
    demo: <FormDemo />,
  },
  {
    slug: "fieldset",
    name: "Fieldset",
    demo: <FieldsetDemo />,
  },
  {
    slug: "link",
    name: "Link",
    demo: <LinkDemo />,
  },
  {
    slug: "color-swatch-picker",
    name: "Color swatch picker",
    demo: <ColorSwatchPickerDemo />,
  },
  {
    slug: "date-field",
    name: "Date field",
    demo: <DateFieldDemo />,
  },
  {
    slug: "file-trigger",
    name: "File trigger",
    demo: <FileTriggerDemo />,
  },
  {
    slug: "calendar",
    name: "Calendar",
    demo: <CalendarDemo />,
  },
  {
    slug: "range-calendar",
    name: "Range calendar",
    demo: <RangeCalendarDemo />,
  },
  {
    slug: "date-picker",
    name: "Date picker",
    demo: <DatePickerDemo />,
  },
  {
    slug: "date-range-picker",
    name: "Date range picker",
    demo: <DateRangePickerDemo />,
  },
  {
    slug: "preview-trigger",
    name: "Preview trigger",
    demo: <PreviewTriggerDemo />,
  },
  {
    slug: "table",
    name: "Table",
    demo: <TableDemo />,
  },
  {
    slug: "autocomplete",
    name: "Autocomplete",
    demo: <AutocompleteDemo />,
  },
  {
    slug: "time-field",
    name: "Time field",
    demo: <TimeFieldDemo />,
  },
  {
    slug: "card",
    name: "Card",
    demo: <CardDemo />,
  },
  {
    slug: "avatar",
    name: "Avatar",
    demo: <AvatarDemo />,
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    demo: <SkeletonDemo />,
  },
  {
    slug: "spinner",
    name: "Spinner",
    demo: <SpinnerDemo />,
  },
  {
    slug: "empty-state",
    name: "Empty state",
    demo: <EmptyStateDemo />,
  },
  {
    slug: "pagination",
    name: "Pagination",
    demo: <PaginationDemo />,
  },
  {
    slug: "timeline",
    name: "Timeline",
    demo: <TimelineDemo />,
  },
  {
    slug: "description-list",
    name: "Description list",
    demo: <DescriptionListDemo />,
  },
  {
    slug: "kbd-code",
    name: "Kbd & code",
    demo: <KbdCodeDemo />,
  },
  {
    slug: "stat",
    name: "Stat",
    demo: <StatDemo />,
  },
  {
    slug: "animated-number",
    name: "Animated number",
    demo: <AnimatedNumberDemo />,
  },
  {
    slug: "text-swap",
    name: "Text swap",
    demo: <TextSwapDemo />,
  },
  { slug: "text-reveal", name: "Text reveal", demo: <TextRevealDemo /> },
  { slug: "text-scramble", name: "Text scramble", demo: <TextScrambleDemo /> },
  {
    slug: "scroll-highlight",
    name: "Scroll highlight",
    demo: <ScrollHighlightDemo />,
  },
  {
    slug: "scroll-progress",
    name: "Scroll progress",
    demo: <ScrollProgressDemo />,
  },
  { slug: "presence", name: "Presence", demo: <PresenceDemo /> },
  { slug: "stagger-group", name: "Stagger group", demo: <StaggerGroupDemo /> },
  { slug: "mask-reveal", name: "Mask reveal", demo: <MaskRevealDemo /> },
  { slug: "layout-morph", name: "Layout morph", demo: <LayoutMorphDemo /> },
  {
    slug: "parallax-layer",
    name: "Parallax layer",
    demo: <ParallaxLayerDemo />,
  },
  { slug: "marquee", name: "Marquee", demo: <MarqueeDemo /> },
  {
    slug: "stepper",
    name: "Stepper",
    demo: <StepperDemo />,
  },
];

const basicPreviews: Record<string, { demo: ReactNode; source: string }> = {
  avatar: {
    demo: <AvatarBasicDemo />,
    source: "avatar-basic-demo.tsx",
  },
  "command-palette": {
    demo: <CommandPaletteBasicDemo />,
    source: "command-palette-basic-demo.tsx",
  },
  "token-field": {
    demo: <TokenFieldBasicDemo />,
    source: "token-field-basic-demo.tsx",
  },
  "presence-list": {
    demo: <PresenceListBasicDemo />,
    source: "presence-list-basic-demo.tsx",
  },
  toolbar: {
    demo: <ToolbarBasicDemo />,
    source: "toolbar-basic-demo.tsx",
  },
  table: {
    demo: <TableBasicDemo />,
    source: "table-basic-demo.tsx",
  },
  stepper: {
    demo: <StepperBasicDemo />,
    source: "stepper-basic-demo.tsx",
  },
  "color-swatch": {
    demo: <ColorSwatchBasicDemo />,
    source: "color-swatch-basic-demo.tsx",
  },
  "file-trigger": {
    demo: <FileTriggerBasicDemo />,
    source: "file-trigger-basic-demo.tsx",
  },
  meter: {
    demo: <MeterBasicDemo />,
    source: "meter-basic-demo.tsx",
  },
  tree: {
    demo: <TreeBasicDemo />,
    source: "tree-basic-demo.tsx",
  },
  spinner: {
    demo: <SpinnerBasicDemo />,
    source: "spinner-basic-demo.tsx",
  },
  "animated-number": {
    demo: <AnimatedNumberBasicDemo />,
    source: "animated-number-basic-demo.tsx",
  },
  "progress-bar": {
    demo: <ProgressBarBasicDemo />,
    source: "progress-bar-basic-demo.tsx",
  },
  "progress-ring": {
    demo: <ProgressRingBasicDemo />,
    source: "progress-ring-basic-demo.tsx",
  },
  "drop-zone": {
    demo: <DropZoneBasicDemo />,
    source: "drop-zone-basic-demo.tsx",
  },
  pagination: {
    demo: <PaginationBasicDemo />,
    source: "pagination-basic-demo.tsx",
  },
};

const examplePreviews: Record<string, ReactNode[]> = {
  "animated-number": [<AnimatedNumberDemo key="preview-1" />],
  avatar: [<AvatarDemo key="preview-1" />],
  "button-group": [<ButtonGroupOrientationsDemo key="preview-1" />],
  calendar: [<CalendarUnavailableDemo key="preview-1" />],
  card: [<CardInvoiceDemo key="preview-1" />],
  "checkbox-group": [<CheckboxGroupRequiredDemo key="preview-1" />],
  "color-swatch": [<ColorSwatchDemo key="preview-1" />],
  "command-palette": [<CommandPaletteDemo shortcut={false} key="preview-1" />],
  "date-picker": [
    <DatePickerUnavailableDemo key="preview-1" />,
    <DatePickerControlledDemo key="preview-2" />,
  ],
  "date-range-picker": [<DateRangePickerLimitsDemo key="preview-1" />],
  "drop-zone": [<DropZoneDemo key="preview-1" />],
  "empty-state": [<EmptyStateNoActionDemo key="preview-1" />],
  "file-trigger": [<FileTriggerDemo key="preview-1" />],
  form: [<FormValidationDemo key="preview-1" />],
  "grid-list": [<GridListDisabledDemo key="preview-1" />],
  "list-box": [<ListBoxMultipleDemo key="preview-1" />],
  meter: [<MeterDemo key="preview-1" />],
  "number-field": [<NumberFieldSeatsDemo key="preview-1" />],
  pagination: [<PaginationDemo key="preview-1" />],
  popover: [<PopoverPlacementDemo key="preview-1" />],
  "presence-list": [<PresenceListDemo key="preview-1" />],
  "progress-bar": [<ProgressBarDemo key="preview-1" />],
  "progress-ring": [<ProgressRingDemo key="preview-1" />],
  "range-calendar": [<RangeCalendarLimitsDemo key="preview-1" />],
  "mask-reveal": [<MaskRevealDirectionsDemo key="preview-1" />],
  spinner: [
    <SpinnerDemo key="preview-1" />,
    <SpinnerUsageDemo key="preview-2" />,
  ],
  stepper: [<StepperDemo key="preview-1" />],
  table: [
    <TableDemo key="preview-1" />,
    <TableSortingDemo key="preview-2" />,
    <TableFilterDemo key="preview-3" />,
  ],
  "toggle-button": [<ToggleButtonProjectsDemo key="preview-1" />],
  "toggle-button-group": [<ToggleButtonGroupEditorDemo key="preview-1" />],
  "token-field": [<TokenFieldDemo key="preview-1" />],
  toolbar: [<ToolbarDemo key="preview-1" />],
  tree: [<TreeDemo key="preview-1" />],
};

export function generateStaticParams() {
  return entries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/components/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const entry = entries.find((item) => item.slug === slug);
  return entry
    ? {
        title: `${entry.name} | vip/ui`,
        description: getComponentPageData(slug)?.description ?? entry.name,
      }
    : {};
}

export default async function NewComponentPage({
  params,
}: PageProps<"/components/[slug]">) {
  const { slug } = await params;
  const entry = entries.find((item) => item.slug === slug);
  if (!entry) notFound();
  const pageData = getComponentPageData(slug);
  const basic = basicPreviews[slug];
  return (
    <ComponentPage
      name={entry.name}
      description={pageData?.description ?? entry.name}
      preview={basic?.demo ?? entry.demo}
      previewSourcePath={`src/components/docs/${basic?.source ?? `${slug}-demo.tsx`}`}
      examples={withExamplePreviews(
        pageData?.examples ?? [],
        examplePreviews[slug] ?? [],
      )}
      sourcePath={`src/components/ui/${slug}.tsx`}
    />
  );
}
