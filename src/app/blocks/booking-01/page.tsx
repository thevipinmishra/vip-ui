import { blockMetadata } from "@/lib/block-seo";
import { BookingPage } from "./booking-page";

export const metadata = blockMetadata("booking-01");

export default function Page() {
  return <BookingPage />;
}
