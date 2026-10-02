import { Avatar, AvatarGroup } from "@/components/ui/avatar";

export function AvatarDemo() {
  return (
    <div className="flex w-full max-w-sm items-center justify-between gap-4 rounded-xl bg-card p-5 ring-1 ring-border/70">
      <div className="min-w-0">
        <p className="text-sm font-semibold">Autumn campaign</p>
        <p className="mt-1 text-xs text-muted-foreground">
          3 reviewers assigned
        </p>
      </div>
      <AvatarGroup aria-label="Reviewers: Amina Shah, Maya Chen, Leo Park">
        <Avatar
          name="Amina Shah"
          className="bg-primary text-primary-foreground"
        />
        <Avatar name="Maya Chen" initials="MC" />
        <Avatar
          name="Leo Park"
          className="bg-success-subtle text-success-foreground"
        />
      </AvatarGroup>
    </div>
  );
}
