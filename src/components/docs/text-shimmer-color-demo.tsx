import { TextShimmer } from "@/components/ui/text-shimmer";

export function TextShimmerColorDemo() {
  return (
    <p className="text-3xl font-semibold tracking-[-0.04em]">
      <TextShimmer className="text-foreground/40 [--text-shimmer-highlight:var(--color-primary)]">
        Generating your report
      </TextShimmer>
    </p>
  );
}
