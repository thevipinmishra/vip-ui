import { Avatar } from "@/components/ui/avatar";

export function AvatarFallbackDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar name="Maya Chen" src="/avatars/missing.png" />
      <Avatar name="Amina Shah" />
      <Avatar name="Leonardo da Vinci" initials="LV" />
    </div>
  );
}
