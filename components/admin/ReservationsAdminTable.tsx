"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteReservation } from "@/app/actions/admin";

interface AdminReservation {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  request: string | null;
  createdAt: string;
}

export default function ReservationsAdminTable({ reservations }: { reservations: AdminReservation[] }) {
  const router = useRouter();

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete the reservation for "${name}"?`)) return;
    await deleteReservation(id);
    router.refresh();
  };

  return (
    <div>
      <p className="text-xs tracking-widest2 text-gold-dark" style={{ color: "#8A6A38" }}>
        Manage
      </p>
      <h1 className="mt-2 font-display text-3xl text-ink">Reservations</h1>

      <div className="mt-8 overflow-x-auto border border-ink/10">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink/10 bg-white/40 text-xs uppercase tracking-wide text-ink/40">
              <th className="px-4 py-3">Guest</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Guests</th>
              <th className="px-4 py-3">Request</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.id} className="border-b border-ink/5 last:border-none hover:bg-white/40">
                <td className="px-4 py-3 text-ink">{r.name}</td>
                <td className="px-4 py-3 text-ink/60">
                  <div>{r.phone}</div>
                  <div className="text-xs">{r.email}</div>
                </td>
                <td className="px-4 py-3 text-ink/60">{r.date}</td>
                <td className="px-4 py-3 text-ink/60">{r.time}</td>
                <td className="px-4 py-3 text-ink/60">{r.guests}</td>
                <td className="max-w-[200px] truncate px-4 py-3 text-ink/60">{r.request || "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end">
                    <button onClick={() => handleDelete(r.id, r.name)} className="text-ink/50 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {reservations.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-ink/40">
                  No reservations yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
