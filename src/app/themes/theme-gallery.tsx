import type { ComponentType } from "react";
import { AreaVisits } from "@/components/charts/area-charts";
import { BarOrders } from "@/components/charts/bar-charts";
import { LineResponse } from "@/components/charts/line-charts";
import { PieDonut } from "@/components/charts/pie-charts";
import { AccordionDemo } from "@/components/docs/accordion-demo";
import { AlertBasicDemo } from "@/components/docs/alert-basic-demo";
import { AnimatedNumberBasicDemo } from "@/components/docs/animated-number-basic-demo";
import { AutocompleteDemo } from "@/components/docs/autocomplete-demo";
import { AvatarBasicDemo } from "@/components/docs/avatar-basic-demo";
import { BadgeBasicDemo } from "@/components/docs/badge-basic-demo";
import { BreadcrumbsDemo } from "@/components/docs/breadcrumbs-demo";
import { ButtonGroupDemo } from "@/components/docs/button-group-demo";
import { ButtonVariantsDemo } from "@/components/docs/button-variants-demo";
import { CalendarDemo } from "@/components/docs/calendar-demo";
import { CheckboxBasicDemo } from "@/components/docs/checkbox-basic-demo";
import { CheckboxGroupDemo } from "@/components/docs/checkbox-group-demo";
import { ColorFieldDemo } from "@/components/docs/color-field-demo";
import { ColorPickerDemo } from "@/components/docs/color-picker-demo";
import { ColorSwatchDemo } from "@/components/docs/color-swatch-demo";
import { ComboBoxBasicDemo } from "@/components/docs/combo-box-basic-demo";
import { CommandPaletteDemo } from "@/components/docs/command-palette-demo";
import { DateFieldDemo } from "@/components/docs/date-field-demo";
import { DatePickerDemo } from "@/components/docs/date-picker-demo";
import { DateRangePickerDemo } from "@/components/docs/date-range-picker-demo";
import { DescriptionListDemo } from "@/components/docs/description-list-demo";
import { DialogDemo } from "@/components/docs/dialog-demo";
import { DisclosureDemo } from "@/components/docs/disclosure-demo";
import { DropZoneDemo } from "@/components/docs/drop-zone-demo";
import { EmptyStateDemo } from "@/components/docs/empty-state-demo";
import { FieldsetDemo } from "@/components/docs/fieldset-demo";
import { FileTriggerDemo } from "@/components/docs/file-trigger-demo";
import { FormDemo } from "@/components/docs/form-demo";
import { GridListDemo } from "@/components/docs/grid-list-demo";
import { InputGroupBasicDemo } from "@/components/docs/input-group-basic-demo";
import { KbdCodeDemo } from "@/components/docs/kbd-code-demo";
import { LinkDemo } from "@/components/docs/link-demo";
import { ListBoxDemo } from "@/components/docs/list-box-demo";
import { MenuDemo } from "@/components/docs/menu-demo";
import { MeterDemo } from "@/components/docs/meter-demo";
import { NumberFieldDemo } from "@/components/docs/number-field-demo";
import { PopoverDemo } from "@/components/docs/popover-demo";
import { PresenceListDemo } from "@/components/docs/presence-list-demo";
import { PreviewTriggerDemo } from "@/components/docs/preview-trigger-demo";
import { ProgressBarBasicDemo } from "@/components/docs/progress-bar-basic-demo";
import { ProgressRingBasicDemo } from "@/components/docs/progress-ring-basic-demo";
import { RadioGroupDemo } from "@/components/docs/radio-group-demo";
import { RangeCalendarDemo } from "@/components/docs/range-calendar-demo";
import { SearchFieldBasicDemo } from "@/components/docs/search-field-basic-demo";
import { SelectDemo } from "@/components/docs/select-demo";
import { SeparatorDemo } from "@/components/docs/separator-demo";
import { SheetBasicDemo } from "@/components/docs/sheet-basic-demo";
import { SkeletonDemo } from "@/components/docs/skeleton-demo";
import { SliderDemo } from "@/components/docs/slider-demo";
import { SpinnerBasicDemo } from "@/components/docs/spinner-basic-demo";
import { StatDemo } from "@/components/docs/stat-demo";
import { StepperDemo } from "@/components/docs/stepper-demo";
import { SwitchBasicDemo } from "@/components/docs/switch-basic-demo";
import { TableBasicDemo } from "@/components/docs/table-basic-demo";
import { TabsBasicDemo } from "@/components/docs/tabs-basic-demo";
import { TagGroupDemo } from "@/components/docs/tag-group-demo";
import { TextAreaBasicDemo } from "@/components/docs/text-area-basic-demo";
import { TextFieldBasicDemo } from "@/components/docs/text-field-basic-demo";
import { TextSwapDemo } from "@/components/docs/text-swap-demo";
import { TimeFieldDemo } from "@/components/docs/time-field-demo";
import { TimelineDemo } from "@/components/docs/timeline-demo";
import { ToastDemo } from "@/components/docs/toast-demo";
import { ToggleButtonDemo } from "@/components/docs/toggle-button-demo";
import { ToggleButtonGroupDemo } from "@/components/docs/toggle-button-group-demo";
import { TokenFieldDemo } from "@/components/docs/token-field-demo";
import { ToolbarDemo } from "@/components/docs/toolbar-demo";
import { TooltipDemo } from "@/components/docs/tooltip-demo";
import { TreeDemo } from "@/components/docs/tree-demo";

type Example = { title: string; Demo: ComponentType };

const groups: { title: string; examples: Example[] }[] = [
  {
    title: "Actions",
    examples: [
      { title: "Button", Demo: ButtonVariantsDemo },
      { title: "Button group", Demo: ButtonGroupDemo },
      { title: "Toggle button", Demo: ToggleButtonDemo },
      { title: "Toggle button group", Demo: ToggleButtonGroupDemo },
      { title: "Toolbar", Demo: ToolbarDemo },
      { title: "Link", Demo: LinkDemo },
    ],
  },
  {
    title: "Forms",
    examples: [
      { title: "Text field", Demo: TextFieldBasicDemo },
      { title: "Text area", Demo: TextAreaBasicDemo },
      { title: "Search field", Demo: SearchFieldBasicDemo },
      { title: "Input group", Demo: InputGroupBasicDemo },
      { title: "Number field", Demo: NumberFieldDemo },
      { title: "Select", Demo: SelectDemo },
      { title: "Combo box", Demo: ComboBoxBasicDemo },
      { title: "Autocomplete", Demo: AutocompleteDemo },
      { title: "Token field", Demo: TokenFieldDemo },
      { title: "Checkbox", Demo: CheckboxBasicDemo },
      { title: "Checkbox group", Demo: CheckboxGroupDemo },
      { title: "Radio group", Demo: RadioGroupDemo },
      { title: "Switch", Demo: SwitchBasicDemo },
      { title: "Slider", Demo: SliderDemo },
      { title: "Form", Demo: FormDemo },
      { title: "Fieldset", Demo: FieldsetDemo },
      { title: "File trigger", Demo: FileTriggerDemo },
      { title: "Drop zone", Demo: DropZoneDemo },
    ],
  },
  {
    title: "Color",
    examples: [
      { title: "Color picker", Demo: ColorPickerDemo },
      { title: "Color field", Demo: ColorFieldDemo },
      { title: "Color swatch", Demo: ColorSwatchDemo },
    ],
  },
  {
    title: "Dates",
    examples: [
      { title: "Calendar", Demo: CalendarDemo },
      { title: "Range calendar", Demo: RangeCalendarDemo },
      { title: "Date field", Demo: DateFieldDemo },
      { title: "Time field", Demo: TimeFieldDemo },
      { title: "Date picker", Demo: DatePickerDemo },
      { title: "Date range picker", Demo: DateRangePickerDemo },
    ],
  },
  {
    title: "Overlays",
    examples: [
      { title: "Dialog", Demo: DialogDemo },
      { title: "Sheet", Demo: SheetBasicDemo },
      { title: "Popover", Demo: PopoverDemo },
      { title: "Tooltip", Demo: TooltipDemo },
      { title: "Menu", Demo: MenuDemo },
      { title: "Command palette", Demo: CommandPaletteDemo },
      { title: "Preview trigger", Demo: PreviewTriggerDemo },
      { title: "Toast", Demo: ToastDemo },
    ],
  },
  {
    title: "Data display",
    examples: [
      { title: "Table", Demo: TableBasicDemo },
      { title: "Tree", Demo: TreeDemo },
      { title: "List box", Demo: ListBoxDemo },
      { title: "Grid list", Demo: GridListDemo },
      { title: "Tag group", Demo: TagGroupDemo },
      { title: "Description list", Demo: DescriptionListDemo },
      { title: "Stat", Demo: StatDemo },
      { title: "Avatar", Demo: AvatarBasicDemo },
      { title: "Badge", Demo: BadgeBasicDemo },
      { title: "Timeline", Demo: TimelineDemo },
      { title: "Kbd and code", Demo: KbdCodeDemo },
      { title: "Separator", Demo: SeparatorDemo },
    ],
  },
  {
    title: "Feedback",
    examples: [
      { title: "Alert", Demo: AlertBasicDemo },
      { title: "Progress bar", Demo: ProgressBarBasicDemo },
      { title: "Progress ring", Demo: ProgressRingBasicDemo },
      { title: "Meter", Demo: MeterDemo },
      { title: "Spinner", Demo: SpinnerBasicDemo },
      { title: "Skeleton", Demo: SkeletonDemo },
      { title: "Stepper", Demo: StepperDemo },
      { title: "Empty state", Demo: EmptyStateDemo },
    ],
  },
  {
    title: "Navigation",
    examples: [
      { title: "Tabs", Demo: TabsBasicDemo },
      { title: "Accordion", Demo: AccordionDemo },
      { title: "Disclosure", Demo: DisclosureDemo },
      { title: "Breadcrumbs", Demo: BreadcrumbsDemo },
    ],
  },
  {
    title: "Charts",
    examples: [
      { title: "Bar chart", Demo: BarOrders },
      { title: "Line chart", Demo: LineResponse },
      { title: "Area chart", Demo: AreaVisits },
      { title: "Donut chart", Demo: PieDonut },
    ],
  },
  {
    title: "Motion",
    examples: [
      { title: "Animated number", Demo: AnimatedNumberBasicDemo },
      { title: "Text swap", Demo: TextSwapDemo },
      { title: "Presence list", Demo: PresenceListDemo },
    ],
  },
];

export function ThemeGallery() {
  return (
    <div className="grid gap-14">
      {groups.map((group) => (
        <section
          key={group.title}
          aria-labelledby={`components-${group.title}`}
          className="grid gap-5"
        >
          <h3
            id={`components-${group.title}`}
            className="flex items-baseline gap-3 text-base font-semibold tracking-[-0.02em]"
          >
            {group.title}
            <span className="font-mono text-xs font-normal text-muted-foreground tabular-nums">
              {group.examples.length}
            </span>
          </h3>
          <div className="gap-4 sm:columns-2 xl:columns-3">
            {group.examples.map(({ title, Demo }) => (
              <figure
                key={title}
                className="relative mb-4 break-inside-avoid overflow-hidden rounded-xl bg-card shadow-[var(--shadow-card)] ring-1 ring-border/70"
              >
                <figcaption className="border-b border-border/70 px-4 py-2.5 text-xs font-medium text-muted-foreground">
                  {title}
                </figcaption>
                <div className="flex min-h-32 min-w-0 items-center justify-center overflow-x-auto p-5 [&>*]:min-w-0 [&>*]:max-w-full">
                  <Demo />
                </div>
              </figure>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
