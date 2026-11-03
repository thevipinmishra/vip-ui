import { NotificationSettings } from "./notification-settings";

export const metadata = {
  title: "Notification settings",
  description: "Notification settings for each event and channel.",
};

export default function NotificationsPage() {
  return (
    <main className="flex min-h-svh items-start justify-center bg-muted/40 p-6 md:p-10">
      <div className="w-full max-w-2xl">
        <NotificationSettings />
      </div>
    </main>
  );
}
