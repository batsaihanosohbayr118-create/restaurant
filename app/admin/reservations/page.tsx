import ReservationsAdminTable from "@/components/admin/ReservationsAdminTable";
import { getAdminReservations } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminReservationsPage() {
  const reservations = await getAdminReservations();
  return <ReservationsAdminTable reservations={reservations} />;
}
