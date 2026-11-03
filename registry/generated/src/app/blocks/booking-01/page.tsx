import { BookingPage } from "./booking-page";

export const metadata = {
  title: "Book a meeting",
  description: "Booking page with a calendar, time slots, and a time zone.",
};

export default function Page() {
  return <BookingPage />;
}
