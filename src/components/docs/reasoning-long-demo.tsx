import {
  Reasoning,
  ReasoningPanel,
  ReasoningTrigger,
} from "@/components/ui/reasoning";

const PARAGRAPHS = [
  "The request touches three parts of the system. First, the schema change is additive, so old clients keep working. Second, the read path can stay on the current index if the new filter is pushed down.",
  "Next I should check the write path. The new column is nullable, so the migration does not need a backfill. The batch job writes it after the fact.",
  "Finally, the rollout order matters. Deploying the reader first means the writer can land later without a flag.",
  "I also checked the failure modes. If the reader lands first and the column is missing, the query falls back to the old path. The logs record which path answered, so the cutover is observable.",
  "That covers the plan. The remaining risk is the batch window on the read replica, which the maintenance page already explains.",
];

export function ReasoningLongDemo() {
  return (
    <Reasoning
      status="complete"
      duration={24}
      defaultExpanded
      className="w-full max-w-lg"
    >
      <ReasoningTrigger />
      <ReasoningPanel scrollable>
        <div className="grid gap-3">
          {PARAGRAPHS.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </ReasoningPanel>
    </Reasoning>
  );
}
