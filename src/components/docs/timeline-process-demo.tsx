import {
  Timeline,
  TimelineDescription,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline";

export function TimelineProcessDemo() {
  return (
    <Timeline
      aria-label="Order progress"
      className="max-w-md rounded-xl border border-border bg-card p-4 shadow-(--shadow-card) sm:p-5"
    >
      <TimelineItem>
        <TimelineTitle>Order placed</TimelineTitle>
        <TimelineTime dateTime="2025-11-02T08:12:00Z">
          November 2, 8:12 AM UTC
        </TimelineTime>
      </TimelineItem>
      <TimelineItem>
        <TimelineTitle>Packed</TimelineTitle>
        <TimelineTime dateTime="2025-11-02T15:40:00Z">
          November 2, 3:40 PM UTC
        </TimelineTime>
      </TimelineItem>
      <TimelineItem status="latest">
        <TimelineTitle>In transit</TimelineTitle>
        <TimelineDescription>
          The parcel left the Berlin sorting center.
        </TimelineDescription>
      </TimelineItem>
      <TimelineItem status="upcoming">
        <TimelineTitle>Out for delivery</TimelineTitle>
      </TimelineItem>
      <TimelineItem status="upcoming">
        <TimelineTitle>Delivered</TimelineTitle>
      </TimelineItem>
    </Timeline>
  );
}
