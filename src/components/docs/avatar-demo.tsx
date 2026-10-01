import { Avatar, AvatarGroup } from "@/components/ui/avatar";

export function AvatarDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <AvatarGroup aria-label="Project members">
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
      <p className="text-sm text-muted-foreground">
        Amina, Maya, and Leo are on this project.
      </p>
    </div>
  );
}
