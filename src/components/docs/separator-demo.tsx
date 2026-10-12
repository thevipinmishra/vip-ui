import { Separator } from "@/components/ui/separator";

export function SeparatorDemo() {
  return (
    <div className="w-full max-w-sm rounded-lg bg-card p-5 text-sm ring-1 ring-border">
      <p className="font-medium">Account</p>
      <p className="mt-1 text-muted-foreground">
        Manage your profile and security.
      </p>
      <Separator className="my-4" />
      <p className="font-medium">Notifications</p>
      <p className="mt-1 text-muted-foreground">
        Choose which updates to receive.
      </p>
    </div>
  );
}
