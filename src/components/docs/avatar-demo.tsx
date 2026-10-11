import { Avatar, AvatarGroup } from "@/components/ui/avatar";

export function AvatarDemo() {
  return (
    <AvatarGroup aria-label="Reviewers">
      <Avatar
        name="Maya Chen"
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop"
      />
      <Avatar
        name="Amina Shah"
        className="bg-primary text-primary-foreground"
      />
      <Avatar
        name="Leo Park"
        className="bg-success-subtle text-success-foreground"
      />
      <Avatar
        name="2 more reviewers"
        initials="+2"
        className="bg-muted text-muted-foreground"
      />
    </AvatarGroup>
  );
}
