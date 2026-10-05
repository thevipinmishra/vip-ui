import { Avatar, AvatarGroup } from "@/components/ui/avatar";

export function AvatarDemo() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <div className="grid gap-2 text-center">
        <Avatar name="Maya Chen" initials="MC" />
        <span className="text-xs text-muted-foreground">Initials</span>
      </div>
      <div className="grid gap-2 text-center">
        <Avatar name="Amina Shah" />
        <span className="text-xs text-muted-foreground">
          Automatic initials
        </span>
      </div>
      <div className="grid gap-2 text-center">
        <AvatarGroup aria-label="Reviewers: Maya Chen, Amina Shah, Leo Park">
          <Avatar name="Maya Chen" initials="MC" />
          <Avatar
            name="Amina Shah"
            initials="AS"
            className="bg-primary text-primary-foreground"
          />
          <Avatar
            name="Leo Park"
            initials="LP"
            className="bg-success-subtle text-success-foreground"
          />
        </AvatarGroup>
        <span className="text-xs text-muted-foreground">Group</span>
      </div>
    </div>
  );
}
