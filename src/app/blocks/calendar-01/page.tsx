import { blockMetadata } from "@/lib/block-seo";
import { TeamCalendar } from "./team-calendar";

export const metadata = blockMetadata("calendar-01");

export default function CalendarBlockPage() {
  return <TeamCalendar />;
}
