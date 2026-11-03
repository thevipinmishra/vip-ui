import { AnalyticsDashboard } from "./dashboard";

export const metadata = {
  title: "SaaS analytics",
  description: "Analytics dashboard with date ranges, tabs, charts, and a target.",
};

export default function Page() {
  return <AnalyticsDashboard />;
}
