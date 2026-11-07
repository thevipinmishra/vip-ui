import { blockMetadata } from "@/lib/block-seo";
import { NotificationsPage } from "./notifications-page";

export const metadata = blockMetadata("settings-02");

export default function Page() {
  return <NotificationsPage />;
}
