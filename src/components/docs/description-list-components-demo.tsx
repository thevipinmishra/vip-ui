import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "@/components/ui/description-list";
import {
  Disclosure,
  DisclosureHeader,
  DisclosurePanel,
} from "@/components/ui/disclosure";
import { Timeline, TimelineItem, TimelineTime } from "@/components/ui/timeline";

export function DescriptionListComponentsDemo() {
  return (
    <section
      aria-label="Production deployment"
      className="grid w-full max-w-xs gap-4 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-(--shadow-card)"
    >
      <h3 className="text-sm font-semibold">Production deployment</h3>
      <DescriptionList>
        <DescriptionTerm>Status</DescriptionTerm>
        <DescriptionDetail>
          <Badge variant="error" dot>
            Failed health check
          </Badge>
        </DescriptionDetail>
        <DescriptionTerm>Deployment ID</DescriptionTerm>
        <DescriptionDetail className="font-mono text-xs">
          dpl_9f2c4e1a7b3d5f60c8e2a4b6d9f1e3c5
        </DescriptionDetail>
        <DescriptionTerm>Reviewer</DescriptionTerm>
        <DescriptionDetail className="flex items-center gap-2">
          <Avatar name="Amina Shah" size="xs" aria-hidden="true" />
          Amina Shah
        </DescriptionDetail>
      </DescriptionList>
      <Timeline
        aria-label="Deployment history"
        className="border-t border-border pt-4"
      >
        <TimelineItem status="latest">
          <p className="text-sm font-medium">Health check failed</p>
          <TimelineTime dateTime="2025-10-18T14:32:00Z">14:32 UTC</TimelineTime>
          <Disclosure className="mt-2">
            <DisclosureHeader headingLevel={4}>
              Failure details
            </DisclosureHeader>
            <DisclosurePanel>
              The checkout service returned HTTP 503. The previous release is
              still live.
            </DisclosurePanel>
          </Disclosure>
        </TimelineItem>
        <TimelineItem>
          <p className="text-sm font-medium">Build completed</p>
          <TimelineTime dateTime="2025-10-18T14:29:00Z">14:29 UTC</TimelineTime>
        </TimelineItem>
      </Timeline>
    </section>
  );
}
