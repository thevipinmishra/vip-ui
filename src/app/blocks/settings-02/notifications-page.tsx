import { NotificationSettings } from "./notification-settings";

export function NotificationsPage() {
  return (
    <main className="flex min-h-svh items-start justify-center bg-muted/40 p-6 md:p-10">
      <div className="w-full max-w-2xl">
        <NotificationSettings />
      </div>
    </main>
  );
}
