import {
  Timeline,
  TimelineDescription,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline";

export function TimelineDemo() {
  return (
    <Timeline aria-label="Project activity" className="max-w-md">
      <TimelineItem>
        <TimelineTitle>Design approved</TimelineTitle>
        <TimelineTime dateTime="2025-10-18T14:30:00Z">
          October 18, 2:30 PM UTC
        </TimelineTime>
        <TimelineDescription>
          The team approved the final layouts for the release.
        </TimelineDescription>
      </TimelineItem>
      <TimelineItem>
        <TimelineTitle>Feedback addressed</TimelineTitle>
        <TimelineTime dateTime="2025-10-17T09:00:00Z">
          October 17, 9:00 AM UTC
        </TimelineTime>
        <TimelineDescription>
          Updated navigation and focus states after review.
        </TimelineDescription>
      </TimelineItem>
      <TimelineItem>
        <TimelineTitle>Review requested</TimelineTitle>
        <TimelineTime dateTime="2025-10-15T16:00:00Z">
          October 15, 4:00 PM UTC
        </TimelineTime>
      </TimelineItem>
    </Timeline>
  );
}
