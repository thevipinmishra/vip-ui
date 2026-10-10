import type { Metadata } from "next";
import { NotificationSettings } from "./notification-settings";

export const metadata: Metadata = {
  title: "Notification settings",
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
