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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchField } from "@/components/ui/search-field";

function SearchPreview() {
  return <SearchField label="Search projects" placeholder="Search projects" />;
}

const examples: { title: string; Demo: ComponentType; wide?: boolean }[] = [
  { title: "Buttons", Demo: ButtonVariantsDemo, wide: true },
  { title: "Text field", Demo: TextFieldBasicDemo },
  { title: "Select", Demo: SelectDemo },
  { title: "Dialog", Demo: DialogDemo },
  { title: "Sheet", Demo: SheetBasicDemo },
  { title: "Toast", Demo: ToastDemo },
  { title: "Badge", Demo: BadgeBasicDemo },
  { title: "Bar chart", Demo: BarOrders, wide: true },
  { title: "Line chart", Demo: LineResponse, wide: true },
  { title: "Checkbox", Demo: CheckboxBasicDemo },
  { title: "Switch", Demo: SwitchBasicDemo },
  { title: "Tabs", Demo: TabsBasicDemo },
  { title: "Combo box", Demo: ComboBoxBasicDemo },
  { title: "Text area", Demo: TextAreaBasicDemo },
  { title: "Search field", Demo: SearchPreview },
  { title: "Form", Demo: FormDemo },
  { title: "Menu", Demo: MenuDemo },
  { title: "Popover", Demo: PopoverDemo },
  { title: "Tooltip", Demo: TooltipDemo },
  { title: "Alert", Demo: AlertBasicDemo },
  { title: "Avatar", Demo: AvatarBasicDemo },
  { title: "Area chart", Demo: AreaVisits, wide: true },
  { title: "Donut chart", Demo: PieDonut, wide: true },
  { title: "Accordion", Demo: AccordionDemo },
  { title: "Slider", Demo: SliderDemo },
  { title: "Radio group", Demo: RadioGroupDemo },
  { title: "Date picker", Demo: DatePickerDemo },
  { title: "Table", Demo: TableBasicDemo, wide: true },
  { title: "Progress bar", Demo: ProgressBarBasicDemo },
  { title: "Checkbox group", Demo: CheckboxGroupDemo },
  { title: "Date range picker", Demo: DateRangePickerDemo },
  { title: "Command palette", Demo: CommandPaletteDemo },
  { title: "Button group", Demo: ButtonGroupDemo },
  { title: "Input group", Demo: InputGroupBasicDemo },
  { title: "Number field", Demo: NumberFieldDemo },
  { title: "Toggle button", Demo: ToggleButtonDemo },
  { title: "Toggle button group", Demo: ToggleButtonGroupDemo },
  { title: "Autocomplete", Demo: AutocompleteDemo },
  { title: "Token field", Demo: TokenFieldDemo },
  { title: "Progress ring", Demo: ProgressRingBasicDemo },
  { title: "Skeleton", Demo: SkeletonDemo },
  { title: "Calendar", Demo: CalendarDemo },
  { title: "Tag group", Demo: TagGroupDemo },
  { title: "File trigger", Demo: FileTriggerDemo },
  { title: "Color picker", Demo: ColorPickerDemo },
  { title: "Date field", Demo: DateFieldDemo },
  { title: "Stepper", Demo: StepperDemo },
  { title: "List box", Demo: ListBoxDemo },
  { title: "Grid list", Demo: GridListDemo },
  { title: "Description list", Demo: DescriptionListDemo },
  { title: "Stat", Demo: StatDemo },
  { title: "Color field", Demo: ColorFieldDemo },
  { title: "Color swatch", Demo: ColorSwatchDemo },
  { title: "Time field", Demo: TimeFieldDemo },
  { title: "Range calendar", Demo: RangeCalendarDemo },
  { title: "Tree", Demo: TreeDemo },
  { title: "Drop zone", Demo: DropZoneDemo },
  { title: "Fieldset", Demo: FieldsetDemo },
  { title: "Meter", Demo: MeterDemo },
  { title: "Text swap", Demo: TextSwapDemo },
  { title: "Toolbar", Demo: ToolbarDemo },
  { title: "Timeline", Demo: TimelineDemo },
  { title: "Disclosure", Demo: DisclosureDemo },
  { title: "Animated number", Demo: AnimatedNumberBasicDemo },
  { title: "Presence list", Demo: PresenceListDemo },
  { title: "Spinner", Demo: SpinnerBasicDemo },
  { title: "Breadcrumbs", Demo: BreadcrumbsDemo },
  { title: "Kbd and code", Demo: KbdCodeDemo },
  { title: "Separator", Demo: SeparatorDemo },
  { title: "Link", Demo: LinkDemo },
  { title: "Preview trigger", Demo: PreviewTriggerDemo },
  { title: "Empty state", Demo: EmptyStateDemo },
];

export function ThemeGallery() {
  return (
    <div className="grid min-w-0 grid-cols-1 items-start gap-[var(--theme-space)] md:grid-cols-2">
      {examples.map(({ title, Demo, wide }) => (
        <Card
          key={title}
          className={wide ? "min-w-0 md:col-span-2" : "min-w-0"}
        >
          <CardHeader className="px-5 pt-5">
            <CardTitle as="h3">{title}</CardTitle>
          </CardHeader>
          <CardContent className="min-w-0 overflow-x-auto px-5 pb-5 pt-4">
            <Demo />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
