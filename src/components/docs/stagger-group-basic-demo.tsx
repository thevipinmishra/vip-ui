import { StaggerGroup, StaggerItem } from "@/components/ui/stagger-group";

const tasks = ["Write the brief", "Choose the typefaces", "Send the proofs"];

export function StaggerGroupBasicDemo() {
  return (
    <StaggerGroup
      as="ol"
      aria-label="Project tasks"
      className="w-full max-w-sm divide-y divide-border rounded-xl border border-border bg-card shadow-(--shadow-card)"
    >
      {tasks.map((task, index) => (
        <StaggerItem
          as="li"
          key={task}
          className="flex min-w-0 items-center gap-3 px-4 py-3 text-sm"
        >
          <span
            aria-hidden="true"
            className="font-mono text-xs text-muted-foreground"
          >
            0{index + 1}
          </span>
          <span className="min-w-0 wrap-anywhere">{task}</span>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
