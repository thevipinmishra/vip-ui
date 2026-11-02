import {
  ChatCircleIcon,
  GitMergeIcon,
  RocketLaunchIcon,
} from "@phosphor-icons/react/ssr";
import {
  Timeline,
  TimelineDescription,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline";

export function TimelineIconsDemo() {
  return (
    <Timeline
      aria-label="Release activity"
      className="max-w-md rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)] sm:p-5"
    >
      <TimelineItem status="latest" icon={<RocketLaunchIcon weight="bold" />}>
        <TimelineTitle>Version 2.4 deployed</TimelineTitle>
        <TimelineTime dateTime="2025-10-21T11:05:00Z">
          October 21, 11:05 AM UTC
        </TimelineTime>
      </TimelineItem>
      <TimelineItem icon={<GitMergeIcon weight="bold" />}>
        <TimelineTitle>Pull request merged</TimelineTitle>
        <TimelineTime dateTime="2025-10-20T17:30:00Z">
          October 20, 5:30 PM UTC
        </TimelineTime>
        <TimelineDescription>
          Adds keyboard reordering to tables.
        </TimelineDescription>
      </TimelineItem>
      <TimelineItem icon={<ChatCircleIcon weight="bold" />}>
        <TimelineTitle>Review comment</TimelineTitle>
        <TimelineTime dateTime="2025-10-20T09:15:00Z">
          October 20, 9:15 AM UTC
        </TimelineTime>
      </TimelineItem>
    </Timeline>
  );
}
