"use client";

import { useRouter } from "next/navigation";
import { Trash2, Phone, Mail, Calendar, Clock, Users, MessageSquare } from "lucide-react";
import { deleteReservation } from "@/app/actions/admin";
import { useConfirm } from "./ConfirmDialog";

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
  const { confirm, ConfirmDialog } = useConfirm();

  const handleDelete = async (id: string, name: string) => {
    const ok = await confirm({ description: `Delete the reservation for "${name}"? This cannot be undone.` });
    if (!ok) return;
    await deleteReservation(id);
    router.refresh();
  };

  return (
    <div>
      {ConfirmDialog}
      <p className="text-xs tracking-widest2 text-gold-dark" style={{ color: "#8A6A38" }}>
        Manage
      </p>
      <h1 className="mt-2 font-display text-3xl text-ink">Reservations</h1>

      <div className="-mx-4 mt-8 px-4 md:hidden">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {reservations.map((r) => (
            <div
              key={r.id}
              className="flex w-[78%] shrink-0 snap-center flex-col gap-3 border border-ink/10 bg-white/40 p-4 transition-transform duration-300 ease-signature active:scale-[0.98]"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-lg text-ink">{r.name}</p>
                <button onClick={() => handleDelete(r.id, r.name)} className="shrink-0 text-ink/50 hover:text-red-600">
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="flex flex-col gap-1.5 text-sm text-ink/60">
                <div className="flex items-center gap-2">
                  <Phone size={14} className="shrink-0 text-ink/40" />
                  {r.phone}
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="shrink-0 text-ink/40" />
                  <span className="truncate">{r.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="shrink-0 text-ink/40" />
                  {r.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="shrink-0 text-ink/40" />
                  {r.time}
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} className="shrink-0 text-ink/40" />
                  {r.guests} guests
                </div>
                {r.request && (
                  <div className="flex items-start gap-2">
                    <MessageSquare size={14} className="mt-0.5 shrink-0 text-ink/40" />
                    <span>{r.request}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          {reservations.length === 0 && <p className="py-8 text-ink/40">No reservations yet.</p>}
        </div>
      </div>

      <div className="mt-8 hidden overflow-x-auto border border-ink/10 md:block">
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
