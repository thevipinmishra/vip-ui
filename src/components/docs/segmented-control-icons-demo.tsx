"use client";

import {
  CalendarDotsIcon,
  ListBulletsIcon,
  SquaresFourIcon,
} from "@phosphor-icons/react";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/ui/segmented-control";

export function SegmentedControlIconsDemo() {
  return (
    <SegmentedControl aria-label="Project view" defaultValue="board">
      <SegmentedControlItem value="board">
        <SquaresFourIcon aria-hidden="true" />
        Board
      </SegmentedControlItem>
      <SegmentedControlItem value="list">
        <ListBulletsIcon aria-hidden="true" />
        List
      </SegmentedControlItem>
      <SegmentedControlItem value="calendar">
        <CalendarDotsIcon aria-hidden="true" />
        Calendar
      </SegmentedControlItem>
    </SegmentedControl>
  );
}
