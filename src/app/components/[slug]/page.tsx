import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { AgentStatusDemo } from "@/components/docs/agent-status-demo";
import { AgentStatusStatesDemo } from "@/components/docs/agent-status-states-demo";
import { AnimatedNumberBasicDemo } from "@/components/docs/animated-number-basic-demo";
import { AnimatedNumberFormatDemo } from "@/components/docs/animated-number-format-demo";
import { AnimatedNumberSlideDemo } from "@/components/docs/animated-number-slide-demo";
import { AutocompleteDemo } from "@/components/docs/autocomplete-demo";
import { AvatarBasicDemo } from "@/components/docs/avatar-basic-demo";
import { AvatarDemo } from "@/components/docs/avatar-demo";
import { AvatarFallbackDemo } from "@/components/docs/avatar-fallback-demo";
import { AvatarSizesDemo } from "@/components/docs/avatar-sizes-demo";
import { BreadcrumbsDemo } from "@/components/docs/breadcrumbs-demo";
import { ButtonGroupBasicDemo } from "@/components/docs/button-group-basic-demo";
import { ButtonGroupDemo } from "@/components/docs/button-group-demo";
import { ButtonGroupOrientationsDemo } from "@/components/docs/button-group-orientations-demo";
import { CalendarControlledDemo } from "@/components/docs/calendar-controlled-demo";
import { CalendarDemo } from "@/components/docs/calendar-demo";
import { CalendarUnavailableDemo } from "@/components/docs/calendar-unavailable-demo";
import { CardActionDemo } from "@/components/docs/card-action-demo";
import { CardBasicDemo } from "@/components/docs/card-basic-demo";
import { CardDemo } from "@/components/docs/card-demo";
import { CheckboxGroupDemo } from "@/components/docs/checkbox-group-demo";
import { CheckboxGroupDisabledDemo } from "@/components/docs/checkbox-group-disabled-demo";
import { CheckboxGroupRequiredDemo } from "@/components/docs/checkbox-group-required-demo";
import { ColorFieldChannelDemo } from "@/components/docs/color-field-channel-demo";
import { ColorFieldControlledDemo } from "@/components/docs/color-field-controlled-demo";
import { ColorFieldDemo } from "@/components/docs/color-field-demo";
import { ColorFieldDisabledDemo } from "@/components/docs/color-field-disabled-demo";
import { ColorPickerControlledDemo } from "@/components/docs/color-picker-controlled-demo";
import { ColorPickerDemo } from "@/components/docs/color-picker-demo";
import { ColorSwatchBasicDemo } from "@/components/docs/color-swatch-basic-demo";
import { ColorSwatchDemo } from "@/components/docs/color-swatch-demo";
import { ColorSwatchPickerControlledDemo } from "@/components/docs/color-swatch-picker-controlled-demo";
import { ColorSwatchPickerDemo } from "@/components/docs/color-swatch-picker-demo";
import { ColorSwatchPickerDisabledDemo } from "@/components/docs/color-swatch-picker-disabled-demo";
import { ColorSwatchTransparencyDemo } from "@/components/docs/color-swatch-transparency-demo";
import { CommandPaletteBasicDemo } from "@/components/docs/command-palette-basic-demo";
import { CommandPaletteDemo } from "@/components/docs/command-palette-demo";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { DataTableColumnFiltersDemo } from "@/components/docs/data-table-column-filters-demo";
import { DataTableDemo } from "@/components/docs/data-table-demo";
import { DateFieldDemo } from "@/components/docs/date-field-demo";
import { DateFieldDisabledDemo } from "@/components/docs/date-field-disabled-demo";
import { DateFieldLimitsDemo } from "@/components/docs/date-field-limits-demo";
import { DateFieldTimeDemo } from "@/components/docs/date-field-time-demo";
import { DatePickerControlledDemo } from "@/components/docs/date-picker-controlled-demo";
import { DatePickerDemo } from "@/components/docs/date-picker-demo";
import { DatePickerDisabledDemo } from "@/components/docs/date-picker-disabled-demo";
import { DatePickerUnavailableDemo } from "@/components/docs/date-picker-unavailable-demo";
import { DateRangePickerDemo } from "@/components/docs/date-range-picker-demo";
import { DateRangePickerDisabledDemo } from "@/components/docs/date-range-picker-disabled-demo";
import { DateRangePickerLimitsDemo } from "@/components/docs/date-range-picker-limits-demo";
import { DescriptionListComponentsDemo } from "@/components/docs/description-list-components-demo";
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
import { FormServerErrorsDemo } from "@/components/docs/form-server-errors-demo";
import { FormValidationDemo } from "@/components/docs/form-validation-demo";
import { GridListDemo } from "@/components/docs/grid-list-demo";
import { GridListDisabledDemo } from "@/components/docs/grid-list-disabled-demo";
import { InlineEditBasicDemo } from "@/components/docs/inline-edit-basic-demo";
import { InlineEditDemo } from "@/components/docs/inline-edit-demo";
import { InlineEditDisabledDemo } from "@/components/docs/inline-edit-disabled-demo";
import { KbdCodeDemo } from "@/components/docs/kbd-code-demo";
import { KbdCodeGroupDemo } from "@/components/docs/kbd-code-group-demo";
import { KbdCodeWrapDemo } from "@/components/docs/kbd-code-wrap-demo";
import { LayoutMorphDemo } from "@/components/docs/layout-morph-demo";
import { LayoutMorphViewsDemo } from "@/components/docs/layout-morph-views-demo";
import { LinkDemo } from "@/components/docs/link-demo";
import { LinkExternalDemo } from "@/components/docs/link-external-demo";
import { ListBoxDemo } from "@/components/docs/list-box-demo";
import { ListBoxMultipleDemo } from "@/components/docs/list-box-multiple-demo";
import { MarqueeDemo } from "@/components/docs/marquee-demo";
import { MarqueeReverseDemo } from "@/components/docs/marquee-reverse-demo";
import { MarqueeSpeedDemo } from "@/components/docs/marquee-speed-demo";
import { MeterBasicDemo } from "@/components/docs/meter-basic-demo";
import { MeterDemo } from "@/components/docs/meter-demo";
import { NumberFieldBasicDemo } from "@/components/docs/number-field-basic-demo";
import { NumberFieldCurrencyDemo } from "@/components/docs/number-field-currency-demo";
import { NumberFieldDemo } from "@/components/docs/number-field-demo";
import { NumberFieldDisabledDemo } from "@/components/docs/number-field-disabled-demo";
import { NumberFieldLimitsDemo } from "@/components/docs/number-field-limits-demo";
import { PaginationBasicDemo } from "@/components/docs/pagination-basic-demo";
import { PaginationDemo } from "@/components/docs/pagination-demo";
import { PasswordStrengthMeterDemo } from "@/components/docs/password-strength-meter-demo";
import { PasswordStrengthMeterFieldDemo } from "@/components/docs/password-strength-meter-field-demo";
import { PopoverDemo } from "@/components/docs/popover-demo";
import { PopoverPlacementDemo } from "@/components/docs/popover-placement-demo";
import { PresenceDemo } from "@/components/docs/presence-demo";
import { PresenceInlineDemo } from "@/components/docs/presence-inline-demo";
import { PresenceListBasicDemo } from "@/components/docs/presence-list-basic-demo";
import { PresenceListDemo } from "@/components/docs/presence-list-demo";
import { PreviewTriggerDemo } from "@/components/docs/preview-trigger-demo";
import { ProgressBarBasicDemo } from "@/components/docs/progress-bar-basic-demo";
import { ProgressBarDemo } from "@/components/docs/progress-bar-demo";
import { ProgressRingBasicDemo } from "@/components/docs/progress-ring-basic-demo";
import { ProgressRingDemo } from "@/components/docs/progress-ring-demo";
import { RangeCalendarControlledDemo } from "@/components/docs/range-calendar-controlled-demo";
import { RangeCalendarDemo } from "@/components/docs/range-calendar-demo";
import { RangeCalendarLimitsDemo } from "@/components/docs/range-calendar-limits-demo";
import { RatingInputDemo } from "@/components/docs/rating-input-demo";
import { RatingInputReadOnlyDemo } from "@/components/docs/rating-input-read-only-demo";
import { SeparatorDemo } from "@/components/docs/separator-demo";
import { SkeletonBasicDemo } from "@/components/docs/skeleton-basic-demo";
import { SkeletonDemo } from "@/components/docs/skeleton-demo";
import { SkeletonLoadingDemo } from "@/components/docs/skeleton-loading-demo";
import { SourceLinkDemo } from "@/components/docs/source-link-demo";
import { SpinnerBasicDemo } from "@/components/docs/spinner-basic-demo";
import { SpinnerDemo } from "@/components/docs/spinner-demo";
import { SpinnerUsageDemo } from "@/components/docs/spinner-usage-demo";
import { StaggerGroupBasicDemo } from "@/components/docs/stagger-group-basic-demo";
import { StaggerGroupDemo } from "@/components/docs/stagger-group-demo";
import { StaggerGroupTimingDemo } from "@/components/docs/stagger-group-timing-demo";
import { StatDemo } from "@/components/docs/stat-demo";
import { StatTrendDemo } from "@/components/docs/stat-trend-demo";
import { StepperBasicDemo } from "@/components/docs/stepper-basic-demo";
import { StepperDemo } from "@/components/docs/stepper-demo";
import { TableBasicDemo } from "@/components/docs/table-basic-demo";
import { TableDemo } from "@/components/docs/table-demo";
import { TableFilterDemo } from "@/components/docs/table-filter-demo";
import { TableSortingDemo } from "@/components/docs/table-sorting-demo";
import { TagGroupDemo } from "@/components/docs/tag-group-demo";
import { TextRevealBasicDemo } from "@/components/docs/text-reveal-basic-demo";
import { TextRevealCharactersDemo } from "@/components/docs/text-reveal-characters-demo";
import { TextRevealDemo } from "@/components/docs/text-reveal-demo";
import { TextScrambleBasicDemo } from "@/components/docs/text-scramble-basic-demo";
import { TextScrambleDemo } from "@/components/docs/text-scramble-demo";
import { TextScrambleDurationDemo } from "@/components/docs/text-scramble-duration-demo";
import { TextSwapButtonDemo } from "@/components/docs/text-swap-button-demo";
import { TextSwapDemo } from "@/components/docs/text-swap-demo";
import { TimeField24HourDemo } from "@/components/docs/time-field-24-hour-demo";
import { TimeFieldDemo } from "@/components/docs/time-field-demo";
import { TimeFieldDisabledDemo } from "@/components/docs/time-field-disabled-demo";
import { TimeFieldLimitsDemo } from "@/components/docs/time-field-limits-demo";
import { TimelineDemo } from "@/components/docs/timeline-demo";
import { ToggleButtonDemo } from "@/components/docs/toggle-button-demo";
import { ToggleButtonGroupDemo } from "@/components/docs/toggle-button-group-demo";
import { ToggleButtonGroupEditorDemo } from "@/components/docs/toggle-button-group-editor-demo";
import { ToggleButtonProjectsDemo } from "@/components/docs/toggle-button-projects-demo";
import { TokenFieldBasicDemo } from "@/components/docs/token-field-basic-demo";
import { TokenFieldDemo } from "@/components/docs/token-field-demo";
import { TokenFieldDisabledDemo } from "@/components/docs/token-field-disabled-demo";
import { ToolCallDemo } from "@/components/docs/tool-call-demo";
import { ToolCallStatesDemo } from "@/components/docs/tool-call-states-demo";
import { ToolbarBasicDemo } from "@/components/docs/toolbar-basic-demo";
import { ToolbarDemo } from "@/components/docs/toolbar-demo";
import { ToolbarVerticalDemo } from "@/components/docs/toolbar-vertical-demo";
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
    slug: "password-strength-meter",
    name: "Password strength meter",
    demo: <PasswordStrengthMeterDemo />,
  },
  { slug: "inline-edit", name: "Inline edit", demo: <InlineEditDemo /> },
  { slug: "rating-input", name: "Rating input", demo: <RatingInputDemo /> },
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
    slug: "data-table",
    name: "Data table",
    demo: <DataTableDemo />,
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
    demo: <CardBasicDemo />,
  },
  {
    slug: "avatar",
    name: "Avatar",
    demo: <AvatarDemo />,
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    demo: <SkeletonBasicDemo />,
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
    demo: <AnimatedNumberBasicDemo />,
  },
  {
    slug: "text-swap",
    name: "Text swap",
    demo: <TextSwapDemo />,
  },
  { slug: "text-reveal", name: "Text reveal", demo: <TextRevealBasicDemo /> },
  {
    slug: "text-scramble",
    name: "Text scramble",
    demo: <TextScrambleBasicDemo />,
  },
  { slug: "presence", name: "Presence", demo: <PresenceDemo /> },
  {
    slug: "stagger-group",
    name: "Stagger group",
    demo: <StaggerGroupBasicDemo />,
  },
  { slug: "layout-morph", name: "Layout morph", demo: <LayoutMorphDemo /> },
  { slug: "marquee", name: "Marquee", demo: <MarqueeDemo /> },
  {
    slug: "stepper",
    name: "Stepper",
    demo: <StepperDemo />,
  },
  { slug: "agent-status", name: "Agent status", demo: <AgentStatusDemo /> },
  { slug: "tool-call", name: "Tool call", demo: <ToolCallDemo /> },
  { slug: "source-link", name: "Source link", demo: <SourceLinkDemo /> },
];

const basicPreviews: Record<string, { demo: ReactNode; source: string }> = {
  "number-field": {
    demo: <NumberFieldBasicDemo />,
    source: "number-field-basic-demo.tsx",
  },
  "inline-edit": {
    demo: <InlineEditBasicDemo />,
    source: "inline-edit-basic-demo.tsx",
  },
  "button-group": {
    demo: <ButtonGroupBasicDemo />,
    source: "button-group-basic-demo.tsx",
  },
  avatar: {
    demo: <AvatarBasicDemo />,
    source: "avatar-basic-demo.tsx",
  },
  card: {
    demo: <CardBasicDemo />,
    source: "card-basic-demo.tsx",
  },
  skeleton: {
    demo: <SkeletonBasicDemo />,
    source: "skeleton-basic-demo.tsx",
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
  "text-reveal": {
    demo: <TextRevealBasicDemo />,
    source: "text-reveal-basic-demo.tsx",
  },
  "text-scramble": {
    demo: <TextScrambleBasicDemo />,
    source: "text-scramble-basic-demo.tsx",
  },
  "stagger-group": {
    demo: <StaggerGroupBasicDemo />,
    source: "stagger-group-basic-demo.tsx",
  },
};

const examplePreviews: Record<string, ReactNode[]> = {
  "agent-status": [<AgentStatusStatesDemo key="preview-1" />],
  "tool-call": [<ToolCallStatesDemo key="preview-1" />],
  "animated-number": [
    <AnimatedNumberSlideDemo key="preview-1" />,
    <AnimatedNumberFormatDemo key="preview-2" />,
  ],
  avatar: [
    <AvatarFallbackDemo key="preview-1" />,
    <AvatarSizesDemo key="preview-2" />,
    <AvatarDemo key="preview-3" />,
  ],
  card: [<CardActionDemo key="preview-1" />, <CardDemo key="preview-2" />],
  "description-list": [<DescriptionListComponentsDemo key="preview-1" />],
  "kbd-code": [
    <KbdCodeGroupDemo key="preview-1" />,
    <KbdCodeWrapDemo key="preview-2" />,
  ],
  skeleton: [
    <SkeletonDemo key="preview-1" />,
    <SkeletonLoadingDemo key="preview-2" />,
  ],
  stat: [<StatTrendDemo key="preview-1" />],
  "text-swap": [<TextSwapButtonDemo key="preview-1" />],
  "text-reveal": [
    <TextRevealCharactersDemo key="preview-1" />,
    <TextRevealDemo key="preview-2" />,
  ],
  "text-scramble": [
    <TextScrambleDemo key="preview-1" />,
    <TextScrambleDurationDemo key="preview-2" />,
  ],
  presence: [<PresenceInlineDemo key="preview-1" />],
  "stagger-group": [
    <StaggerGroupDemo key="preview-1" />,
    <StaggerGroupTimingDemo key="preview-2" />,
  ],
  "layout-morph": [<LayoutMorphViewsDemo key="preview-1" />],
  marquee: [
    <MarqueeReverseDemo key="preview-1" />,
    <MarqueeSpeedDemo key="preview-2" />,
  ],
  "button-group": [
    <ButtonGroupOrientationsDemo key="preview-1" />,
    <ButtonGroupDemo key="preview-2" />,
  ],
  calendar: [
    <CalendarUnavailableDemo key="preview-1" />,
    <CalendarControlledDemo key="preview-2" />,
  ],
  "color-field": [
    <ColorFieldChannelDemo key="preview-1" />,
    <ColorFieldDisabledDemo key="preview-2" />,
    <ColorFieldControlledDemo key="preview-3" />,
  ],
  "color-picker": [<ColorPickerControlledDemo key="preview-1" />],
  "color-swatch-picker": [
    <ColorSwatchPickerDisabledDemo key="preview-1" />,
    <ColorSwatchPickerControlledDemo key="preview-2" />,
  ],
  "date-field": [
    <DateFieldLimitsDemo key="preview-1" />,
    <DateFieldTimeDemo key="preview-2" />,
    <DateFieldDisabledDemo key="preview-3" />,
  ],
  "checkbox-group": [
    <CheckboxGroupDisabledDemo key="preview-1" />,
    <CheckboxGroupRequiredDemo key="preview-2" />,
  ],
  "color-swatch": [
    <ColorSwatchDemo key="preview-1" />,
    <ColorSwatchTransparencyDemo key="preview-2" />,
  ],
  "command-palette": [<CommandPaletteDemo shortcut={false} key="preview-1" />],
  "date-picker": [
    <DatePickerUnavailableDemo key="preview-1" />,
    <DatePickerDisabledDemo key="preview-2" />,
    <DatePickerControlledDemo key="preview-3" />,
  ],
  "data-table": [<DataTableColumnFiltersDemo key="preview-1" />],
  "password-strength-meter": [
    <PasswordStrengthMeterFieldDemo key="preview-1" />,
  ],
  "date-range-picker": [
    <DateRangePickerLimitsDemo key="preview-1" />,
    <DateRangePickerDisabledDemo key="preview-2" />,
  ],
  "drop-zone": [<DropZoneDemo key="preview-1" />],
  "empty-state": [<EmptyStateNoActionDemo key="preview-1" />],
  "file-trigger": [<FileTriggerDemo key="preview-1" />],
  form: [
    <FormValidationDemo key="preview-1" />,
    <FormServerErrorsDemo key="preview-2" />,
  ],
  "grid-list": [<GridListDisabledDemo key="preview-1" />],
  link: [<LinkExternalDemo key="preview-1" />],
  "list-box": [<ListBoxMultipleDemo key="preview-1" />],
  meter: [<MeterDemo key="preview-1" />],
  "number-field": [
    <NumberFieldLimitsDemo key="preview-1" />,
    <NumberFieldCurrencyDemo key="preview-2" />,
    <NumberFieldDisabledDemo key="preview-3" />,
  ],
  "inline-edit": [
    <InlineEditDisabledDemo key="preview-1" />,
    <InlineEditDemo key="preview-2" />,
  ],
  "rating-input": [<RatingInputReadOnlyDemo key="preview-1" />],
  pagination: [<PaginationDemo key="preview-1" />],
  popover: [<PopoverPlacementDemo key="preview-1" />],
  "presence-list": [<PresenceListDemo key="preview-1" />],
  "progress-bar": [<ProgressBarDemo key="preview-1" />],
  "progress-ring": [<ProgressRingDemo key="preview-1" />],
  "range-calendar": [
    <RangeCalendarLimitsDemo key="preview-1" />,
    <RangeCalendarControlledDemo key="preview-2" />,
  ],
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
  "token-field": [
    <TokenFieldDisabledDemo key="preview-1" />,
    <TokenFieldDemo key="preview-2" />,
  ],
  toolbar: [
    <ToolbarDemo key="preview-1" />,
    <ToolbarVerticalDemo key="preview-2" />,
  ],
  "time-field": [
    <TimeField24HourDemo key="preview-1" />,
    <TimeFieldLimitsDemo key="preview-2" />,
    <TimeFieldDisabledDemo key="preview-3" />,
  ],
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
