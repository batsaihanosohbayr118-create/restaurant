import Link from "next/link";
import { UtensilsCrossed, Image as ImageIcon, MessageSquareQuote, CalendarCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [menuCount, galleryCount, reviewCount, reservationCount] = await Promise.all([
    prisma.menuItem.count(),
    prisma.galleryImage.count(),
    prisma.review.count(),
    prisma.reservation.count(),
  ]);

  const cards = [
    { label: "Menu Items", value: menuCount, href: "/admin/menu", icon: UtensilsCrossed },
    { label: "Gallery Images", value: galleryCount, href: "/admin/gallery", icon: ImageIcon },
    { label: "Reviews", value: reviewCount, href: "/admin/reviews", icon: MessageSquareQuote },
    { label: "Reservations", value: reservationCount, href: "/admin/reservations", icon: CalendarCheck },
  ];

  return (
    <div>
      <p className="text-xs tracking-widest2 text-gold-dark" style={{ color: "#8A6A38" }}>
        Overview
      </p>
      <h1 className="mt-2 font-display text-3xl text-ink">Dashboard</h1>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {cards.map(({ label, value, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="group flex flex-col gap-4 border border-ink/10 bg-white/40 p-6 transition-colors duration-300 hover:border-gold"
          >
            <Icon size={22} className="text-gold" style={{ color: "#B08B4F" }} />
            <div>
              <p className="font-display text-3xl text-ink">{value}</p>
              <p className="mt-1 text-sm text-ink/50">{label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
