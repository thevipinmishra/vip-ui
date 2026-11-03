import { StatusPage } from "./status-page";

export const metadata = {
  title: "Service status",
  description: "Public status page with uptime bars and incident updates.",
};

export default function Page() {
  return <StatusPage />;
}
