import { TextLoop } from "@/components/ui/text-loop";

const roles = ["designers", "engineers", "writers", "founders"];

export function TextLoopDemo() {
  return (
    <p className="text-2xl font-semibold tracking-tight">
      Built for <TextLoop values={roles} className="text-muted-foreground" />
    </p>
  );
}
