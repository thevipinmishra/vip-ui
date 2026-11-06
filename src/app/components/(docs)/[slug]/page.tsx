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
import { BorderBeamColorDemo } from "@/components/docs/border-beam-color-demo";
import { BorderBeamDemo } from "@/components/docs/border-beam-demo";
import { BorderBeamPromptDemo } from "@/components/docs/border-beam-prompt-demo";
import { BreadcrumbsCollapsedDemo } from "@/components/docs/breadcrumbs-collapsed-demo";
import { BreadcrumbsDemo } from "@/components/docs/breadcrumbs-demo";
import { BreadcrumbsFoldersDemo } from "@/components/docs/breadcrumbs-folders-demo";
import { ButtonGroupBasicDemo } from "@/components/docs/button-group-basic-demo";
import { ButtonGroupDemo } from "@/components/docs/button-group-demo";
import { ButtonGroupOrientationsDemo } from "@/components/docs/button-group-orientations-demo";
import { ButtonGroupSizesDemo } from "@/components/docs/button-group-sizes-demo";
import { CalendarControlledDemo } from "@/components/docs/calendar-controlled-demo";
import { CalendarDemo } from "@/components/docs/calendar-demo";
import { CalendarUnavailableDemo } from "@/components/docs/calendar-unavailable-demo";
import { CardActionDemo } from "@/components/docs/card-action-demo";
import { CardBasicDemo } from "@/components/docs/card-basic-demo";
import { CardDemo } from "@/components/docs/card-demo";
import { CardLinkDemo } from "@/components/docs/card-link-demo";
import { CardMediaDemo } from "@/components/docs/card-media-demo";
import { CheckboxGroupDemo } from "@/components/docs/checkbox-group-demo";
import { CheckboxGroupDisabledDemo } from "@/components/docs/checkbox-group-disabled-demo";
import { CheckboxGroupHorizontalDemo } from "@/components/docs/checkbox-group-horizontal-demo";
import { CheckboxGroupLayoutDemo } from "@/components/docs/checkbox-group-layout-demo";
import { CheckboxGroupRequiredDemo } from "@/components/docs/checkbox-group-required-demo";
import { ColorFieldChannelDemo } from "@/components/docs/color-field-channel-demo";
import { ColorFieldControlledDemo } from "@/components/docs/color-field-controlled-demo";
import { ColorFieldDemo } from "@/components/docs/color-field-demo";
import { ColorFieldDisabledDemo } from "@/components/docs/color-field-disabled-demo";
import { ColorFieldSizesDemo } from "@/components/docs/color-field-sizes-demo";
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
import { DataTableFooterDemo } from "@/components/docs/data-table-footer-demo";
import { DataTableResizableDemo } from "@/components/docs/data-table-resizable-demo";
import { DateFieldDemo } from "@/components/docs/date-field-demo";
import { DateFieldDisabledDemo } from "@/components/docs/date-field-disabled-demo";
import { DateFieldLimitsDemo } from "@/components/docs/date-field-limits-demo";
import { DateFieldSizesDemo } from "@/components/docs/date-field-sizes-demo";
import { DateFieldTimeDemo } from "@/components/docs/date-field-time-demo";
import { DatePickerControlledDemo } from "@/components/docs/date-picker-controlled-demo";
import { DatePickerDemo } from "@/components/docs/date-picker-demo";
import { DatePickerDisabledDemo } from "@/components/docs/date-picker-disabled-demo";
import { DatePickerPresetsDemo } from "@/components/docs/date-picker-presets-demo";
import { DatePickerSizesDemo } from "@/components/docs/date-picker-sizes-demo";
import { DatePickerUnavailableDemo } from "@/components/docs/date-picker-unavailable-demo";
import { DateRangePickerDemo } from "@/components/docs/date-range-picker-demo";
import { DateRangePickerDisabledDemo } from "@/components/docs/date-range-picker-disabled-demo";
import { DateRangePickerLimitsDemo } from "@/components/docs/date-range-picker-limits-demo";
import { DateRangePickerPresetsDemo } from "@/components/docs/date-range-picker-presets-demo";
import { DateRangePickerSizesDemo } from "@/components/docs/date-range-picker-sizes-demo";
import { DescriptionListComponentsDemo } from "@/components/docs/description-list-components-demo";
import { DescriptionListDemo } from "@/components/docs/description-list-demo";
import { DisclosureDemo } from "@/components/docs/disclosure-demo";
import { DisclosureDisabledDemo } from "@/components/docs/disclosure-disabled-demo";
import { DisclosureExpandedDemo } from "@/components/docs/disclosure-expanded-demo";
import { DropZoneBasicDemo } from "@/components/docs/drop-zone-basic-demo";
import { DropZoneDemo } from "@/components/docs/drop-zone-demo";
import { EmptyStateDemo } from "@/components/docs/empty-state-demo";
import { EmptyStateNoActionDemo } from "@/components/docs/empty-state-no-action-demo";
import { EmptyStateSearchDemo } from "@/components/docs/empty-state-search-demo";
import { FieldsetDemo } from "@/components/docs/fieldset-demo";
import { FileTriggerBasicDemo } from "@/components/docs/file-trigger-basic-demo";
import { FileTriggerDemo } from "@/components/docs/file-trigger-demo";
import { FormDemo } from "@/components/docs/form-demo";
import { FormServerErrorsDemo } from "@/components/docs/form-server-errors-demo";
import { FormValidationDemo } from "@/components/docs/form-validation-demo";
import { GridListDemo } from "@/components/docs/grid-list-demo";
import { GridListDisabledDemo } from "@/components/docs/grid-list-disabled-demo";
import { GridListSelectionDemo } from "@/components/docs/grid-list-selection-demo";
import { HighlighterDemo } from "@/components/docs/highlighter-demo";
import { HighlighterSequenceDemo } from "@/components/docs/highlighter-sequence-demo";
import { HighlighterVariantsDemo } from "@/components/docs/highlighter-variants-demo";
import { IconSwapDemo } from "@/components/docs/icon-swap-demo";
import { IconSwapLoadingDemo } from "@/components/docs/icon-swap-loading-demo";
import { IconSwapToggleDemo } from "@/components/docs/icon-swap-toggle-demo";
import { InlineEditBasicDemo } from "@/components/docs/inline-edit-basic-demo";
import { InlineEditDemo } from "@/components/docs/inline-edit-demo";
import { InlineEditDisabledDemo } from "@/components/docs/inline-edit-disabled-demo";
import { InlineEditEmptyDemo } from "@/components/docs/inline-edit-empty-demo";
import { KbdCodeDemo } from "@/components/docs/kbd-code-demo";
import { KbdCodeGroupDemo } from "@/components/docs/kbd-code-group-demo";
import { KbdCodeWrapDemo } from "@/components/docs/kbd-code-wrap-demo";
import { LayoutMorphDemo } from "@/components/docs/layout-morph-demo";
import { LayoutMorphViewsDemo } from "@/components/docs/layout-morph-views-demo";
import { LayoutMorphWidthDemo } from "@/components/docs/layout-morph-width-demo";
import { LinkDemo } from "@/components/docs/link-demo";
import { LinkExternalDemo } from "@/components/docs/link-external-demo";
import { ListBoxDemo } from "@/components/docs/list-box-demo";
import { ListBoxDisabledDemo } from "@/components/docs/list-box-disabled-demo";
import { ListBoxMultipleDemo } from "@/components/docs/list-box-multiple-demo";
import { MarqueeDemo } from "@/components/docs/marquee-demo";
import { MarqueeReverseDemo } from "@/components/docs/marquee-reverse-demo";
import { MarqueeSpeedDemo } from "@/components/docs/marquee-speed-demo";
import { MarqueeStaticDemo } from "@/components/docs/marquee-static-demo";
import { MeterBasicDemo } from "@/components/docs/meter-basic-demo";
import { MeterDemo } from "@/components/docs/meter-demo";
import { NumberFieldBasicDemo } from "@/components/docs/number-field-basic-demo";
import { NumberFieldCompositionDemo } from "@/components/docs/number-field-composition-demo";
import { NumberFieldCurrencyDemo } from "@/components/docs/number-field-currency-demo";
import { NumberFieldDemo } from "@/components/docs/number-field-demo";
import { NumberFieldDisabledDemo } from "@/components/docs/number-field-disabled-demo";
import { NumberFieldLimitsDemo } from "@/components/docs/number-field-limits-demo";
import { NumberFieldSizesDemo } from "@/components/docs/number-field-sizes-demo";
import { NumberFieldStackedDemo } from "@/components/docs/number-field-stacked-demo";
import { PaginationBasicDemo } from "@/components/docs/pagination-basic-demo";
import { PaginationDemo } from "@/components/docs/pagination-demo";
import { PaginationEllipsisDemo } from "@/components/docs/pagination-ellipsis-demo";
import { PaginationSizesDemo } from "@/components/docs/pagination-sizes-demo";
import { PopoverDemo } from "@/components/docs/popover-demo";
import { PopoverFormDemo } from "@/components/docs/popover-form-demo";
import { PopoverPlacementDemo } from "@/components/docs/popover-placement-demo";
import { PopoverPreviewDemo } from "@/components/docs/popover-preview-demo";
import { PresenceCollapseDemo } from "@/components/docs/presence-collapse-demo";
import { PresenceDemo } from "@/components/docs/presence-demo";
import { PresenceFocusDemo } from "@/components/docs/presence-focus-demo";
import { PresenceInlineDemo } from "@/components/docs/presence-inline-demo";
import { PresenceListBasicDemo } from "@/components/docs/presence-list-basic-demo";
import { PresenceListDemo } from "@/components/docs/presence-list-demo";
import { PresenceListRemoveDemo } from "@/components/docs/presence-list-remove-demo";
import { ProgressBarBasicDemo } from "@/components/docs/progress-bar-basic-demo";
import { ProgressBarDemo } from "@/components/docs/progress-bar-demo";
import { ProgressRingBasicDemo } from "@/components/docs/progress-ring-basic-demo";
import { ProgressRingDemo } from "@/components/docs/progress-ring-demo";
import { ProgressRingLabelDemo } from "@/components/docs/progress-ring-label-demo";
import { ProgressRingSizesDemo } from "@/components/docs/progress-ring-sizes-demo";
import { ProgressiveBlurCaptionDemo } from "@/components/docs/progressive-blur-caption-demo";
import { ProgressiveBlurDemo } from "@/components/docs/progressive-blur-demo";
import { ProgressiveBlurHeaderDemo } from "@/components/docs/progressive-blur-header-demo";
import { PromptInputAttachmentsDemo } from "@/components/docs/prompt-input-attachments-demo";
import { PromptInputDemo } from "@/components/docs/prompt-input-demo";
import { PromptInputDropDemo } from "@/components/docs/prompt-input-drop-demo";
import { PromptInputKeyboardDemo } from "@/components/docs/prompt-input-keyboard-demo";
import { PromptInputModelDemo } from "@/components/docs/prompt-input-model-demo";
import { PromptInputStopDemo } from "@/components/docs/prompt-input-stop-demo";
import { PromptInputTranscriptDemo } from "@/components/docs/prompt-input-transcript-demo";
import { RangeCalendarControlledDemo } from "@/components/docs/range-calendar-controlled-demo";
import { RangeCalendarDemo } from "@/components/docs/range-calendar-demo";
import { RangeCalendarLimitsDemo } from "@/components/docs/range-calendar-limits-demo";
import { RangeCalendarMonthsDemo } from "@/components/docs/range-calendar-months-demo";
import { RatingInputDemo } from "@/components/docs/rating-input-demo";
import { RatingInputIconDemo } from "@/components/docs/rating-input-icon-demo";
import { RatingInputReadOnlyDemo } from "@/components/docs/rating-input-read-only-demo";
import { RatingInputRequiredDemo } from "@/components/docs/rating-input-required-demo";
import { ReasoningAutoCollapseDemo } from "@/components/docs/reasoning-auto-collapse-demo";
import { ReasoningDemo } from "@/components/docs/reasoning-demo";
import { ReasoningErrorDemo } from "@/components/docs/reasoning-error-demo";
import { ReasoningLongDemo } from "@/components/docs/reasoning-long-demo";
import { ResponseActionsDemo } from "@/components/docs/response-actions-demo";
import { ResponseDemo } from "@/components/docs/response-demo";
import { ResponseErrorDemo } from "@/components/docs/response-error-demo";
import { ResponseSourcesDemo } from "@/components/docs/response-sources-demo";
import { ResponseStoppedDemo } from "@/components/docs/response-stopped-demo";
import { ScrollFadeDemo } from "@/components/docs/scroll-fade-demo";
import { ScrollFadeHorizontalDemo } from "@/components/docs/scroll-fade-horizontal-demo";
import { ScrollFadeSizeDemo } from "@/components/docs/scroll-fade-size-demo";
import { SeparatorDemo } from "@/components/docs/separator-demo";
import { SeparatorVerticalDemo } from "@/components/docs/separator-vertical-demo";
import { SkeletonBasicDemo } from "@/components/docs/skeleton-basic-demo";
import { SkeletonDemo } from "@/components/docs/skeleton-demo";
import { SkeletonLoadingDemo } from "@/components/docs/skeleton-loading-demo";
import { SourceLinkDemo } from "@/components/docs/source-link-demo";
import { SourceLinkListDemo } from "@/components/docs/source-link-list-demo";
import { SpinnerBasicDemo } from "@/components/docs/spinner-basic-demo";
import { SpinnerColorDemo } from "@/components/docs/spinner-color-demo";
import { SpinnerDemo } from "@/components/docs/spinner-demo";
import { SpinnerOverlayDemo } from "@/components/docs/spinner-overlay-demo";
import { SpinnerSizesDemo } from "@/components/docs/spinner-sizes-demo";
import { SpinnerUsageDemo } from "@/components/docs/spinner-usage-demo";
import { SpotlightCardColorDemo } from "@/components/docs/spotlight-card-color-demo";
import { SpotlightCardDemo } from "@/components/docs/spotlight-card-demo";
import { SpotlightCardGridDemo } from "@/components/docs/spotlight-card-grid-demo";
import { StaggerGroupBasicDemo } from "@/components/docs/stagger-group-basic-demo";
import { StaggerGroupDemo } from "@/components/docs/stagger-group-demo";
import { StaggerGroupTimingDemo } from "@/components/docs/stagger-group-timing-demo";
import { StatDemo } from "@/components/docs/stat-demo";
import { StatGroupDemo } from "@/components/docs/stat-group-demo";
import { StatLiveDemo } from "@/components/docs/stat-live-demo";
import { StatTrendDemo } from "@/components/docs/stat-trend-demo";
import { StepperBasicDemo } from "@/components/docs/stepper-basic-demo";
import { StepperDemo } from "@/components/docs/stepper-demo";
import { TableBasicDemo } from "@/components/docs/table-basic-demo";
import { TableDemo } from "@/components/docs/table-demo";
import { TableExpandableDemo } from "@/components/docs/table-expandable-demo";
import { TableFilterDemo } from "@/components/docs/table-filter-demo";
import { TableFooterDemo } from "@/components/docs/table-footer-demo";
import { TableLoadMoreDemo } from "@/components/docs/table-load-more-demo";
import { TableReorderDemo } from "@/components/docs/table-reorder-demo";
import { TableResizableDemo } from "@/components/docs/table-resizable-demo";
import { TableSortingDemo } from "@/components/docs/table-sorting-demo";
import { TagGroupDemo } from "@/components/docs/tag-group-demo";
import { TagGroupLinksDemo } from "@/components/docs/tag-group-links-demo";
import { TagGroupSelectionDemo } from "@/components/docs/tag-group-selection-demo";
import { TagGroupSizesDemo } from "@/components/docs/tag-group-sizes-demo";
import { TextLoopDemo } from "@/components/docs/text-loop-demo";
import { TextLoopPauseDemo } from "@/components/docs/text-loop-pause-demo";
import { TextRevealBasicDemo } from "@/components/docs/text-reveal-basic-demo";
import { TextRevealCharactersDemo } from "@/components/docs/text-reveal-characters-demo";
import { TextRevealDemo } from "@/components/docs/text-reveal-demo";
import { TextScrambleBasicDemo } from "@/components/docs/text-scramble-basic-demo";
import { TextScrambleDemo } from "@/components/docs/text-scramble-demo";
import { TextScrambleDurationDemo } from "@/components/docs/text-scramble-duration-demo";
import { TextShimmerColorDemo } from "@/components/docs/text-shimmer-color-demo";
import { TextShimmerDemo } from "@/components/docs/text-shimmer-demo";
import { TextShimmerStepsDemo } from "@/components/docs/text-shimmer-steps-demo";
import { TextSwapButtonDemo } from "@/components/docs/text-swap-button-demo";
import { TextSwapDemo } from "@/components/docs/text-swap-demo";
import { TextSwapInlineDemo } from "@/components/docs/text-swap-inline-demo";
import { TimeField24HourDemo } from "@/components/docs/time-field-24-hour-demo";
import { TimeFieldDemo } from "@/components/docs/time-field-demo";
import { TimeFieldDisabledDemo } from "@/components/docs/time-field-disabled-demo";
import { TimeFieldLimitsDemo } from "@/components/docs/time-field-limits-demo";
import { TimeFieldSizesDemo } from "@/components/docs/time-field-sizes-demo";
import { TimelineDemo } from "@/components/docs/timeline-demo";
import { TimelineIconsDemo } from "@/components/docs/timeline-icons-demo";
import { TimelineProcessDemo } from "@/components/docs/timeline-process-demo";
import { ToggleButtonDemo } from "@/components/docs/toggle-button-demo";
import { ToggleButtonGroupDemo } from "@/components/docs/toggle-button-group-demo";
import { ToggleButtonGroupEditorDemo } from "@/components/docs/toggle-button-group-editor-demo";
import { ToggleButtonGroupSizesDemo } from "@/components/docs/toggle-button-group-sizes-demo";
import { ToggleButtonIndependentDemo } from "@/components/docs/toggle-button-independent-demo";
import { ToggleButtonSizesDemo } from "@/components/docs/toggle-button-sizes-demo";
import { TokenFieldBasicDemo } from "@/components/docs/token-field-basic-demo";
import { TokenFieldDemo } from "@/components/docs/token-field-demo";
import { TokenFieldDisabledDemo } from "@/components/docs/token-field-disabled-demo";
import { TokenFieldSizesDemo } from "@/components/docs/token-field-sizes-demo";
import { ToolCallDemo } from "@/components/docs/tool-call-demo";
import { ToolCallSequenceDemo } from "@/components/docs/tool-call-sequence-demo";
import { ToolCallStatesDemo } from "@/components/docs/tool-call-states-demo";
import { ToolbarBasicDemo } from "@/components/docs/toolbar-basic-demo";
import { ToolbarDemo } from "@/components/docs/toolbar-demo";
import { ToolbarSizesDemo } from "@/components/docs/toolbar-sizes-demo";
import { ToolbarVerticalDemo } from "@/components/docs/toolbar-vertical-demo";
import { TreeBasicDemo } from "@/components/docs/tree-basic-demo";
import { TreeDemo } from "@/components/docs/tree-demo";
import { TreeDragDemo } from "@/components/docs/tree-drag-demo";
import { TreeSectionsDemo } from "@/components/docs/tree-sections-demo";
import { TreeSelectionDemo } from "@/components/docs/tree-selection-demo";
import { componentDescription } from "@/lib/catalog";
import {
  getComponentPageData,
  getComponentUsage,
} from "@/lib/component-examples";
import { notFoundMetadata, pageMetadata } from "@/lib/seo";

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
  { slug: "scroll-fade", name: "Scroll fade", demo: <ScrollFadeDemo /> },
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
  { slug: "text-loop", name: "Text loop", demo: <TextLoopDemo /> },
  { slug: "icon-swap", name: "Icon swap", demo: <IconSwapDemo /> },
  { slug: "text-reveal", name: "Text reveal", demo: <TextRevealBasicDemo /> },
  { slug: "highlighter", name: "Highlighter", demo: <HighlighterDemo /> },
  {
    slug: "text-scramble",
    name: "Text scramble",
    demo: <TextScrambleBasicDemo />,
  },
  { slug: "text-shimmer", name: "Text shimmer", demo: <TextShimmerDemo /> },
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
  { slug: "prompt-input", name: "Prompt input", demo: <PromptInputDemo /> },
  { slug: "reasoning", name: "Reasoning", demo: <ReasoningDemo /> },
  { slug: "response", name: "Response", demo: <ResponseDemo /> },
  {
    slug: "spotlight-card",
    name: "Spotlight card",
    demo: <SpotlightCardDemo />,
  },
  { slug: "border-beam", name: "Border beam", demo: <BorderBeamDemo /> },
  {
    slug: "progressive-blur",
    name: "Progressive blur",
    demo: <ProgressiveBlurDemo />,
  },
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
  timeline: [
    <TimelineProcessDemo key="preview-1" />,
    <TimelineIconsDemo key="preview-2" />,
  ],
  breadcrumbs: [
    <BreadcrumbsFoldersDemo key="preview-1" />,
    <BreadcrumbsCollapsedDemo key="preview-2" />,
  ],
  "agent-status": [<AgentStatusStatesDemo key="preview-1" />],
  "tool-call": [
    <ToolCallStatesDemo key="preview-1" />,
    <ToolCallSequenceDemo key="preview-2" />,
  ],
  "source-link": [<SourceLinkListDemo key="preview-1" />],
  "animated-number": [
    <AnimatedNumberSlideDemo key="preview-1" />,
    <AnimatedNumberFormatDemo key="preview-2" />,
  ],
  avatar: [
    <AvatarSizesDemo key="preview-1" />,
    <AvatarFallbackDemo key="preview-2" />,
    <AvatarDemo key="preview-3" />,
  ],
  card: [
    <CardActionDemo key="preview-1" />,
    <CardMediaDemo key="preview-2" />,
    <CardLinkDemo key="preview-3" />,
    <CardDemo key="preview-4" />,
  ],
  "description-list": [<DescriptionListComponentsDemo key="preview-1" />],
  "kbd-code": [
    <KbdCodeGroupDemo key="preview-1" />,
    <KbdCodeWrapDemo key="preview-2" />,
  ],
  skeleton: [
    <SkeletonDemo key="preview-1" />,
    <SkeletonLoadingDemo key="preview-2" />,
  ],
  separator: [<SeparatorVerticalDemo key="preview-1" />],
  "scroll-fade": [
    <ScrollFadeHorizontalDemo key="preview-1" />,
    <ScrollFadeSizeDemo key="preview-2" />,
  ],
  "icon-swap": [
    <IconSwapToggleDemo key="preview-1" />,
    <IconSwapLoadingDemo key="preview-2" />,
  ],
  "text-shimmer": [
    <TextShimmerStepsDemo key="preview-1" />,
    <TextShimmerColorDemo key="preview-2" />,
  ],
  stat: [
    <StatTrendDemo key="preview-1" />,
    <StatGroupDemo key="preview-2" />,
    <StatLiveDemo key="preview-3" />,
  ],
  "text-swap": [
    <TextSwapButtonDemo key="preview-1" />,
    <TextSwapInlineDemo key="preview-2" />,
  ],
  "text-reveal": [
    <TextRevealCharactersDemo key="preview-1" />,
    <TextRevealDemo key="preview-2" />,
  ],
  "text-scramble": [
    <TextScrambleDurationDemo key="preview-1" />,
    <TextScrambleDemo key="preview-2" />,
  ],
  presence: [
    <PresenceInlineDemo key="preview-1" />,
    <PresenceFocusDemo key="preview-2" />,
    <PresenceCollapseDemo key="preview-3" />,
  ],
  "stagger-group": [
    <StaggerGroupDemo key="preview-1" />,
    <StaggerGroupTimingDemo key="preview-2" />,
  ],
  "layout-morph": [
    <LayoutMorphViewsDemo key="preview-1" />,
    <LayoutMorphWidthDemo key="preview-2" />,
  ],
  marquee: [
    <MarqueeReverseDemo key="preview-1" />,
    <MarqueeSpeedDemo key="preview-2" />,
    <MarqueeStaticDemo key="preview-3" />,
  ],
  "button-group": [
    <ButtonGroupOrientationsDemo key="preview-1" />,
    <ButtonGroupDemo key="preview-2" />,
    <ButtonGroupSizesDemo key="preview-3" />,
  ],
  calendar: [
    <CalendarUnavailableDemo key="preview-1" />,
    <CalendarControlledDemo key="preview-2" />,
  ],
  "color-field": [
    <ColorFieldChannelDemo key="preview-1" />,
    <ColorFieldDisabledDemo key="preview-2" />,
    <ColorFieldControlledDemo key="preview-3" />,
    <ColorFieldSizesDemo key="preview-4" />,
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
    <DateFieldSizesDemo key="preview-4" />,
  ],
  "checkbox-group": [
    <CheckboxGroupHorizontalDemo key="preview-1" />,
    <CheckboxGroupLayoutDemo key="preview-2" />,
    <CheckboxGroupDisabledDemo key="preview-3" />,
    <CheckboxGroupRequiredDemo key="preview-4" />,
  ],
  "color-swatch": [
    <ColorSwatchDemo key="preview-1" />,
    <ColorSwatchTransparencyDemo key="preview-2" />,
  ],
  "command-palette": [<CommandPaletteDemo shortcut={false} key="preview-1" />],
  "date-picker": [
    <DatePickerUnavailableDemo key="preview-1" />,
    <DatePickerPresetsDemo key="preview-2" />,
    <DatePickerDisabledDemo key="preview-3" />,
    <DatePickerControlledDemo key="preview-4" />,
    <DatePickerSizesDemo key="preview-5" />,
  ],
  "data-table": [
    <DataTableColumnFiltersDemo key="preview-1" />,
    <DataTableResizableDemo key="preview-2" />,
    <DataTableFooterDemo key="preview-3" />,
  ],
  "date-range-picker": [
    <DateRangePickerLimitsDemo key="preview-1" />,
    <DateRangePickerPresetsDemo key="preview-2" />,
    <DateRangePickerDisabledDemo key="preview-3" />,
    <DateRangePickerSizesDemo key="preview-4" />,
  ],
  disclosure: [
    <DisclosureExpandedDemo key="preview-1" />,
    <DisclosureDisabledDemo key="preview-2" />,
  ],
  "drop-zone": [<DropZoneDemo key="preview-1" />],
  "empty-state": [
    <EmptyStateNoActionDemo key="preview-1" />,
    <EmptyStateSearchDemo key="preview-2" />,
  ],
  "file-trigger": [<FileTriggerDemo key="preview-1" />],
  form: [
    <FormValidationDemo key="preview-1" />,
    <FormServerErrorsDemo key="preview-2" />,
  ],
  "grid-list": [
    <GridListSelectionDemo key="preview-1" />,
    <GridListDisabledDemo key="preview-2" />,
  ],
  link: [<LinkExternalDemo key="preview-1" />],
  "list-box": [
    <ListBoxMultipleDemo key="preview-1" />,
    <ListBoxDisabledDemo key="preview-2" />,
  ],
  meter: [<MeterDemo key="preview-1" />],
  "number-field": [
    <NumberFieldLimitsDemo key="preview-1" />,
    <NumberFieldCurrencyDemo key="preview-2" />,
    <NumberFieldStackedDemo key="preview-3" />,
    <NumberFieldCompositionDemo key="preview-4" />,
    <NumberFieldDisabledDemo key="preview-5" />,
    <NumberFieldSizesDemo key="preview-6" />,
  ],
  "inline-edit": [
    <InlineEditDisabledDemo key="preview-1" />,
    <InlineEditEmptyDemo key="preview-2" />,
    <InlineEditDemo key="preview-3" />,
  ],
  "rating-input": [
    <RatingInputIconDemo key="preview-1" />,
    <RatingInputReadOnlyDemo key="preview-2" />,
    <RatingInputRequiredDemo key="preview-3" />,
  ],
  pagination: [
    <PaginationDemo key="preview-1" />,
    <PaginationSizesDemo key="preview-2" />,
    <PaginationEllipsisDemo key="preview-3" />,
  ],
  "tag-group": [
    <TagGroupSelectionDemo key="preview-1" />,
    <TagGroupLinksDemo key="preview-2" />,
    <TagGroupSizesDemo key="preview-3" />,
  ],
  popover: [
    <PopoverPlacementDemo key="preview-1" />,
    <PopoverFormDemo key="preview-2" />,
    <PopoverPreviewDemo key="preview-3" />,
  ],
  "prompt-input": [
    <PromptInputKeyboardDemo key="preview-1" />,
    <PromptInputAttachmentsDemo key="preview-2" />,
    <PromptInputStopDemo key="preview-3" />,
    <PromptInputDropDemo key="preview-4" />,
    <PromptInputModelDemo key="preview-5" />,
    <PromptInputTranscriptDemo key="preview-6" />,
  ],
  reasoning: [
    <ReasoningAutoCollapseDemo key="preview-1" />,
    <ReasoningErrorDemo key="preview-2" />,
    <ReasoningLongDemo key="preview-3" />,
  ],
  response: [
    <ResponseActionsDemo key="preview-1" />,
    <ResponseStoppedDemo key="preview-2" />,
    <ResponseErrorDemo key="preview-3" />,
    <ResponseSourcesDemo key="preview-4" />,
  ],
  "presence-list": [
    <PresenceListRemoveDemo key="preview-1" />,
    <PresenceListDemo key="preview-2" />,
  ],
  "progress-bar": [<ProgressBarDemo key="preview-1" />],
  "progress-ring": [
    <ProgressRingDemo key="preview-1" />,
    <ProgressRingSizesDemo key="preview-2" />,
    <ProgressRingLabelDemo key="preview-3" />,
  ],
  "range-calendar": [
    <RangeCalendarLimitsDemo key="preview-1" />,
    <RangeCalendarControlledDemo key="preview-2" />,
    <RangeCalendarMonthsDemo key="preview-3" />,
  ],
  spinner: [
    <SpinnerDemo key="preview-1" />,
    <SpinnerSizesDemo key="preview-2" />,
    <SpinnerColorDemo key="preview-3" />,
    <SpinnerUsageDemo key="preview-4" />,
    <SpinnerOverlayDemo key="preview-5" />,
  ],
  stepper: [<StepperDemo key="preview-1" />],
  table: [
    <TableDemo key="preview-1" />,
    <TableSortingDemo key="preview-2" />,
    <TableFilterDemo key="preview-3" />,
    <TableResizableDemo key="preview-4" />,
    <TableExpandableDemo key="preview-5" />,
    <TableReorderDemo key="preview-6" />,
    <TableLoadMoreDemo key="preview-7" />,
    <TableFooterDemo key="preview-8" />,
  ],
  "toggle-button": [
    <ToggleButtonIndependentDemo key="preview-1" />,
    <ToggleButtonSizesDemo key="preview-2" />,
  ],
  "toggle-button-group": [
    <ToggleButtonGroupEditorDemo key="preview-1" />,
    <ToggleButtonGroupSizesDemo key="preview-2" />,
  ],
  "token-field": [
    <TokenFieldDisabledDemo key="preview-1" />,
    <TokenFieldDemo key="preview-2" />,
    <TokenFieldSizesDemo key="preview-3" />,
  ],
  toolbar: [
    <ToolbarDemo key="preview-1" />,
    <ToolbarVerticalDemo key="preview-2" />,
    <ToolbarSizesDemo key="preview-3" />,
  ],
  "time-field": [
    <TimeField24HourDemo key="preview-1" />,
    <TimeFieldLimitsDemo key="preview-2" />,
    <TimeFieldDisabledDemo key="preview-3" />,
    <TimeFieldSizesDemo key="preview-4" />,
  ],
  tree: [
    <TreeDemo key="preview-1" />,
    <TreeSelectionDemo key="preview-2" />,
    <TreeSectionsDemo key="preview-3" />,
    <TreeDragDemo key="preview-4" />,
  ],
  "spotlight-card": [
    <SpotlightCardGridDemo key="preview-1" />,
    <SpotlightCardColorDemo key="preview-2" />,
  ],
  "border-beam": [
    <BorderBeamPromptDemo key="preview-1" />,
    <BorderBeamColorDemo key="preview-2" />,
  ],
  "progressive-blur": [
    <ProgressiveBlurHeaderDemo key="preview-1" />,
    <ProgressiveBlurCaptionDemo key="preview-2" />,
  ],
  "text-loop": [<TextLoopPauseDemo key="preview-1" />],
  highlighter: [
    <HighlighterVariantsDemo key="preview-1" />,
    <HighlighterSequenceDemo key="preview-2" />,
  ],
};

export function generateStaticParams() {
  return entries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/components/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const entry = entries.find((item) => item.slug === slug);
  if (!entry) {
    return notFoundMetadata({
      title: "Component not found",
      description:
        "This address does not match a component in the vip/ui catalog. Browse the catalog to find the right component.",
    });
  }
  return pageMetadata({
    title: entry.name,
    description: `${componentDescription(slug)} See live examples, copy the source, and add it to your project with the shadcn CLI.`,
    path: `/components/${slug}`,
    image: "file",
  });
}

export default async function NewComponentPage({
  params,
}: PageProps<"/components/[slug]">) {
  const { slug } = await params;
  const entry = entries.find((item) => item.slug === slug);
  if (!entry) notFound();
  const pageData = getComponentPageData(slug);
  const usage = getComponentUsage(slug);
  const basic = basicPreviews[slug];
  return (
    <ComponentPage
      name={entry.name}
      description={componentDescription(slug)}
      preview={basic?.demo ?? entry.demo}
      previewSourcePath={`src/components/docs/${basic?.source ?? `${slug}-demo.tsx`}`}
      usage={usage}
      examples={withExamplePreviews(
        pageData?.examples ?? [],
        examplePreviews[slug] ?? [],
      )}
      sourcePath={`src/components/ui/${slug}.tsx`}
    />
  );
}
