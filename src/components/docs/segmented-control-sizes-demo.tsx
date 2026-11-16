import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/ui/segmented-control";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export function SegmentedControlSizesDemo() {
  return (
    <div className="flex flex-col items-start gap-3">
      {sizes.map((size) => (
        <SegmentedControl
          key={size}
          size={size}
          aria-label="Calendar view"
          defaultValue="week"
        >
          <SegmentedControlItem value="day">Day</SegmentedControlItem>
          <SegmentedControlItem value="week">Week</SegmentedControlItem>
          <SegmentedControlItem value="year">Year</SegmentedControlItem>
        </SegmentedControl>
      ))}
    </div>
  );
}
