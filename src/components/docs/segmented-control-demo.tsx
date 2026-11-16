import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/ui/segmented-control";

export function SegmentedControlDemo() {
  return (
    <SegmentedControl aria-label="Project view" defaultValue="board">
      <SegmentedControlItem value="board">Board</SegmentedControlItem>
      <SegmentedControlItem value="list">List</SegmentedControlItem>
      <SegmentedControlItem value="timeline">Timeline</SegmentedControlItem>
    </SegmentedControl>
  );
}
