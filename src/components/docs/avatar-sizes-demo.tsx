import { Avatar } from "@/components/ui/avatar";

export function AvatarSizesDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar name="Amina Shah" size="xs" />
      <Avatar name="Amina Shah" size="sm" />
      <Avatar name="Amina Shah" size="md" />
      <Avatar name="Amina Shah" size="lg" />
      <Avatar name="Amina Shah" size="xl" />
    </div>
  );
}
