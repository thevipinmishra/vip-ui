import { Separator } from "@/components/ui/separator";

export function SeparatorVerticalDemo() {
  return (
    <div className="flex h-5 items-center gap-4 text-sm">
      <span>Profile</span>
      <Separator orientation="vertical" />
      <span>Security</span>
      <Separator orientation="vertical" />
      <span>Billing</span>
    </div>
  );
}
