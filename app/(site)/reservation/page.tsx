import type { Metadata } from "next";
import Reservation from "@/components/Reservation";

export const metadata: Metadata = {
  title: "Reserve a Table",
  description:
    "Book your table at VELORA — pick a date, time, and party size, and we'll confirm shortly.",
};

export default function ReservationPage() {
  return <Reservation />;
}
