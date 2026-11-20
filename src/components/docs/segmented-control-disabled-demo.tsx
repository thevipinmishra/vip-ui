import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/ui/segmented-control";

export function SegmentedControlDisabledDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <div className="grid gap-2">
        <p className="text-sm font-medium">Plan</p>
        <SegmentedControl aria-label="Plan" defaultValue="pro">
          <SegmentedControlItem value="free">Free</SegmentedControlItem>
          <SegmentedControlItem value="pro">Pro</SegmentedControlItem>
          <SegmentedControlItem value="scale" disabled>
            Scale
          </SegmentedControlItem>
        </SegmentedControl>
      </div>
      <div className="grid gap-2">
        <p className="text-sm font-medium">Billing period</p>
        <SegmentedControl
          aria-label="Billing period"
          defaultValue="month"
          disabled
        >
          <SegmentedControlItem value="month">Monthly</SegmentedControlItem>
          <SegmentedControlItem value="year">Yearly</SegmentedControlItem>
        </SegmentedControl>
      </div>
    </div>
  );
}
