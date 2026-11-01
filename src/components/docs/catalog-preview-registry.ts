import type { ComponentType } from "react";

export interface CatalogPreviewProps {
  active: boolean;
}

export interface CatalogPreviewEntry {
  load: () => Promise<{ default: ComponentType<CatalogPreviewProps> }>;
  scale?: number;
  width?: string;
}

export const catalogPreviews: Record<string, CatalogPreviewEntry> = {
  button: {
    load: () =>
      import("./button-variants-demo").then((m) => ({
        default: m.ButtonVariantsDemo,
      })),
  },
  "button-group": {
    load: () =>
      import("./button-group-basic-demo").then((m) => ({
        default: m.ButtonGroupBasicDemo,
      })),
  },
  menu: {
    load: () =>
      import("./catalog-preview-overlays").then((m) => ({
        default: m.MenuPreview,
      })),
  },
  "context-menu": {
    scale: 0.74,
    load: () =>
      import("./catalog-preview-overlays").then((m) => ({
        default: m.ContextMenuPreview,
      })),
  },
  "toggle-button": {
    load: () =>
      import("./toggle-button-demo").then((m) => ({
        default: m.ToggleButtonDemo,
      })),
  },
  "toggle-button-group": {
    load: () =>
      import("./toggle-button-group-demo").then((m) => ({
        default: m.ToggleButtonGroupDemo,
      })),
  },
  toolbar: {
    load: () =>
      import("./toolbar-basic-demo").then((m) => ({
        default: m.ToolbarBasicDemo,
      })),
  },
  "file-trigger": {
    load: () =>
      import("./file-trigger-basic-demo").then((m) => ({
        default: m.FileTriggerBasicDemo,
      })),
  },
  "copy-button": {
    load: () =>
      import("./copy-button-demo").then((m) => ({ default: m.CopyButtonDemo })),
  },
  "command-palette": {
    scale: 0.62,
    load: () =>
      import("./catalog-preview-overlays").then((m) => ({
        default: m.CommandPalettePreview,
      })),
  },
  "text-field": {
    load: () =>
      import("./text-field-basic-demo").then((m) => ({
        default: m.TextFieldBasicDemo,
      })),
  },
  "password-field": {
    load: () =>
      import("./password-field-basic-demo").then((m) => ({
        default: m.PasswordFieldBasicDemo,
      })),
  },
  "password-strength-meter": {
    load: () =>
      import("./password-strength-meter-demo").then((m) => ({
        default: m.PasswordStrengthMeterDemo,
      })),
  },
  "inline-edit": {
    load: () =>
      import("./inline-edit-basic-demo").then((m) => ({
        default: m.InlineEditBasicDemo,
      })),
  },
  "input-group": {
    load: () =>
      import("./input-group-basic-demo").then((m) => ({
        default: m.InputGroupBasicDemo,
      })),
  },
  "text-area": {
    scale: 0.72,
    load: () =>
      import("./text-area-basic-demo").then((m) => ({
        default: m.TextAreaBasicDemo,
      })),
  },
  "number-field": {
    load: () =>
      import("./number-field-basic-demo").then((m) => ({
        default: m.NumberFieldBasicDemo,
      })),
  },
  "search-field": {
    load: () =>
      import("./search-field-basic-demo").then((m) => ({
        default: m.SearchFieldBasicDemo,
      })),
  },
  select: {
    load: () =>
      import("./select-demo").then((m) => ({ default: m.SelectDemo })),
  },
  "native-select": {
    load: () =>
      import("./native-select-demo").then((m) => ({
        default: m.NativeSelectDemo,
      })),
  },
  "combo-box": {
    load: () =>
      import("./combo-box-basic-demo").then((m) => ({
        default: m.ComboBoxBasicDemo,
      })),
  },
  autocomplete: {
    scale: 0.6,
    load: () =>
      import("./autocomplete-demo").then((m) => ({
        default: m.AutocompleteDemo,
      })),
  },
  "token-field": {
    load: () =>
      import("./token-field-basic-demo").then((m) => ({
        default: m.TokenFieldBasicDemo,
      })),
  },
  checkbox: {
    load: () =>
      import("./checkbox-basic-demo").then((m) => ({
        default: m.CheckboxBasicDemo,
      })),
  },
  "checkbox-group": {
    scale: 0.66,
    load: () =>
      import("./checkbox-group-demo").then((m) => ({
        default: m.CheckboxGroupDemo,
      })),
  },
  "radio-group": {
    scale: 0.66,
    load: () =>
      import("./radio-group-demo").then((m) => ({ default: m.RadioGroupDemo })),
  },
  "rating-input": {
    load: () =>
      import("./rating-input-demo").then((m) => ({
        default: m.RatingInputDemo,
      })),
  },
  switch: {
    load: () =>
      import("./switch-basic-demo").then((m) => ({
        default: m.SwitchBasicDemo,
      })),
  },
  slider: {
    load: () =>
      import("./slider-demo").then((m) => ({ default: m.SliderDemo })),
  },
  "drop-zone": {
    load: () =>
      import("./drop-zone-basic-demo").then((m) => ({
        default: m.DropZoneBasicDemo,
      })),
  },
  attachment: {
    scale: 0.6,
    load: () =>
      import("./attachment-basic-demo").then((m) => ({
        default: m.AttachmentBasicDemo,
      })),
  },
  form: {
    scale: 0.68,
    load: () => import("./form-demo").then((m) => ({ default: m.FormDemo })),
  },
  fieldset: {
    scale: 0.62,
    load: () =>
      import("./fieldset-demo").then((m) => ({ default: m.FieldsetDemo })),
  },
  "date-field": {
    load: () =>
      import("./date-field-demo").then((m) => ({ default: m.DateFieldDemo })),
  },
  "time-field": {
    load: () =>
      import("./time-field-demo").then((m) => ({ default: m.TimeFieldDemo })),
  },
  calendar: {
    scale: 0.52,
    load: () =>
      import("./calendar-demo").then((m) => ({ default: m.CalendarDemo })),
  },
  "range-calendar": {
    scale: 0.52,
    load: () =>
      import("./range-calendar-demo").then((m) => ({
        default: m.RangeCalendarDemo,
      })),
  },
  "date-picker": {
    load: () =>
      import("./date-picker-demo").then((m) => ({ default: m.DatePickerDemo })),
  },
  "date-range-picker": {
    load: () =>
      import("./date-range-picker-demo").then((m) => ({
        default: m.DateRangePickerDemo,
      })),
  },
  "color-field": {
    load: () =>
      import("./color-field-demo").then((m) => ({ default: m.ColorFieldDemo })),
  },
  "color-swatch": {
    scale: 1.6,
    load: () =>
      import("./color-swatch-basic-demo").then((m) => ({
        default: m.ColorSwatchBasicDemo,
      })),
  },
  "color-swatch-picker": {
    load: () =>
      import("./color-swatch-picker-demo").then((m) => ({
        default: m.ColorSwatchPickerDemo,
      })),
  },
  "color-picker": {
    load: () =>
      import("./color-picker-demo").then((m) => ({
        default: m.ColorPickerDemo,
      })),
  },
  dialog: {
    scale: 0.72,
    load: () =>
      import("./catalog-preview-overlays").then((m) => ({
        default: m.DialogPreview,
      })),
  },
  sheet: {
    scale: 0.72,
    load: () =>
      import("./catalog-preview-overlays").then((m) => ({
        default: m.SheetPreview,
      })),
  },
  popover: {
    load: () =>
      import("./catalog-preview-overlays").then((m) => ({
        default: m.PopoverPreview,
      })),
  },
  tooltip: {
    load: () =>
      import("./catalog-preview-overlays").then((m) => ({
        default: m.TooltipPreview,
      })),
  },
  toast: {
    scale: 0.72,
    load: () =>
      import("./catalog-preview-overlays").then((m) => ({
        default: m.ToastPreview,
      })),
  },
  link: {
    load: () => import("./link-demo").then((m) => ({ default: m.LinkDemo })),
  },
  tabs: {
    load: () =>
      import("./tabs-basic-demo").then((m) => ({ default: m.TabsBasicDemo })),
  },
  breadcrumbs: {
    load: () =>
      import("./breadcrumbs-demo").then((m) => ({
        default: m.BreadcrumbsDemo,
      })),
  },
  pagination: {
    load: () =>
      import("./pagination-basic-demo").then((m) => ({
        default: m.PaginationBasicDemo,
      })),
  },
  "list-box": {
    load: () =>
      import("./list-box-demo").then((m) => ({ default: m.ListBoxDemo })),
  },
  "grid-list": {
    load: () =>
      import("./grid-list-demo").then((m) => ({ default: m.GridListDemo })),
  },
  tree: {
    scale: 0.6,
    load: () =>
      import("./tree-basic-demo").then((m) => ({ default: m.TreeBasicDemo })),
  },
  "tag-group": {
    load: () =>
      import("./tag-group-demo").then((m) => ({ default: m.TagGroupDemo })),
  },
  table: {
    scale: 0.72,
    load: () =>
      import("./table-basic-demo").then((m) => ({ default: m.TableBasicDemo })),
  },
  "data-table": {
    scale: 0.5,
    width: "36rem",
    load: () =>
      import("./data-table-demo").then((m) => ({ default: m.DataTableDemo })),
  },
  alert: {
    load: () =>
      import("./alert-basic-demo").then((m) => ({ default: m.AlertBasicDemo })),
  },
  badge: {
    scale: 1,
    load: () =>
      import("./badge-variants-demo").then((m) => ({
        default: m.BadgeVariantsDemo,
      })),
  },
  "progress-bar": {
    load: () =>
      import("./progress-bar-basic-demo").then((m) => ({
        default: m.ProgressBarBasicDemo,
      })),
  },
  "progress-ring": {
    load: () =>
      import("./progress-ring-basic-demo").then((m) => ({
        default: m.ProgressRingBasicDemo,
      })),
  },
  meter: {
    load: () =>
      import("./meter-basic-demo").then((m) => ({ default: m.MeterBasicDemo })),
  },
  stepper: {
    load: () =>
      import("./stepper-basic-demo").then((m) => ({
        default: m.StepperBasicDemo,
      })),
  },
  spinner: {
    scale: 1.1,
    load: () =>
      import("./spinner-sizes-demo").then((m) => ({
        default: m.SpinnerSizesDemo,
      })),
  },
  skeleton: {
    scale: 0.7,
    load: () =>
      import("./skeleton-demo").then((m) => ({
        default: m.SkeletonDemo,
      })),
  },
  "empty-state": {
    scale: 0.6,
    load: () =>
      import("./empty-state-demo").then((m) => ({ default: m.EmptyStateDemo })),
  },
  card: {
    scale: 0.62,
    load: () =>
      import("./card-basic-demo").then((m) => ({ default: m.CardBasicDemo })),
  },
  accordion: {
    scale: 0.68,
    load: () =>
      import("./accordion-demo").then((m) => ({ default: m.AccordionDemo })),
  },
  disclosure: {
    load: () =>
      import("./disclosure-demo").then((m) => ({ default: m.DisclosureDemo })),
  },
  separator: {
    load: () =>
      import("./separator-demo").then((m) => ({ default: m.SeparatorDemo })),
  },
  avatar: {
    scale: 1,
    load: () =>
      import("./avatar-demo").then((m) => ({
        default: m.AvatarDemo,
      })),
  },
  "description-list": {
    load: () =>
      import("./description-list-demo").then((m) => ({
        default: m.DescriptionListDemo,
      })),
  },
  stat: {
    load: () => import("./stat-demo").then((m) => ({ default: m.StatDemo })),
  },
  timeline: {
    scale: 0.56,
    load: () =>
      import("./timeline-demo").then((m) => ({ default: m.TimelineDemo })),
  },
  "kbd-code": {
    load: () =>
      import("./kbd-code-demo").then((m) => ({ default: m.KbdCodeDemo })),
  },
  message: {
    scale: 0.62,
    load: () =>
      import("./message-basic-demo").then((m) => ({
        default: m.MessageBasicDemo,
      })),
  },
  "agent-status": {
    load: () =>
      import("./agent-status-demo").then((m) => ({
        default: m.AgentStatusDemo,
      })),
  },
  "tool-call": {
    scale: 0.52,
    load: () =>
      import("./tool-call-demo").then((m) => ({ default: m.ToolCallDemo })),
  },
  "source-link": {
    load: () =>
      import("./source-link-demo").then((m) => ({ default: m.SourceLinkDemo })),
  },
  "prompt-input": {
    load: () =>
      import("./prompt-input-demo").then((m) => ({
        default: m.PromptInputDemo,
      })),
  },
  reasoning: {
    scale: 0.52,
    load: () =>
      import("./reasoning-demo").then((m) => ({ default: m.ReasoningDemo })),
  },
  response: {
    scale: 0.58,
    load: () =>
      import("./response-demo").then((m) => ({ default: m.ResponseDemo })),
  },
  "text-swap": {
    load: () =>
      import("./catalog-preview-motion").then((m) => ({
        default: m.TextSwapPreview,
      })),
  },
  "animated-number": {
    load: () =>
      import("./catalog-preview-motion").then((m) => ({
        default: m.AnimatedNumberPreview,
      })),
  },
  "text-reveal": {
    load: () =>
      import("./catalog-preview-motion").then((m) => ({
        default: m.TextRevealPreview,
      })),
  },
  "text-scramble": {
    load: () =>
      import("./catalog-preview-motion").then((m) => ({
        default: m.TextScramblePreview,
      })),
  },
  presence: {
    load: () =>
      import("./catalog-preview-motion").then((m) => ({
        default: m.PresencePreview,
      })),
  },
  "presence-list": {
    scale: 0.7,
    load: () =>
      import("./catalog-preview-motion").then((m) => ({
        default: m.PresenceListPreview,
      })),
  },
  "stagger-group": {
    load: () =>
      import("./catalog-preview-motion").then((m) => ({
        default: m.StaggerGroupPreview,
      })),
  },
  "layout-morph": {
    scale: 0.72,
    load: () =>
      import("./catalog-preview-motion").then((m) => ({
        default: m.LayoutMorphPreview,
      })),
  },
  marquee: {
    width: "24rem",
    load: () =>
      import("./catalog-preview-motion").then((m) => ({
        default: m.MarqueePreview,
      })),
  },
};
