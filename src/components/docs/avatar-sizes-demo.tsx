import { Avatar } from "@/components/ui/avatar";

export function AvatarSizesDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar name="Amina Shah" size="sm" />
      <Avatar name="Amina Shah" size="md" />
      <Avatar name="Amina Shah" size="lg" />
    </div>
  );
}
