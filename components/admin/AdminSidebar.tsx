"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Image as ImageIcon,
  MessageSquareQuote,
  CalendarCheck,
  LogOut,
  ExternalLink,
} from "lucide-react";

const links = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Menu", href: "/admin/menu", icon: UtensilsCrossed },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { label: "Reviews", href: "/admin/reviews", icon: MessageSquareQuote },
  { label: "Reservations", href: "/admin/reservations", icon: CalendarCheck },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-svh w-60 shrink-0 flex-col overflow-y-auto border-r border-linen/10 bg-ink">
      <div className="px-6 py-7">
        <Link href="/admin" className="font-display text-xl tracking-[0.15em] text-linen">
          VELORA
        </Link>
        <p className="mt-1 text-[10px] uppercase tracking-widest2 text-gold/70">
          Admin Panel
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {links.map((link) => {
          const active = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-colors duration-200 ${
                active ? "bg-gold/10 text-gold" : "text-linen/70 hover:bg-linen/5 hover:text-linen"
              }`}
            >
              <Icon size={17} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-1 border-t border-linen/10 px-3 py-4">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 text-sm text-linen/70 transition-colors duration-200 hover:bg-linen/5 hover:text-linen"
        >
          <ExternalLink size={17} />
          View Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-3 py-2.5 text-left text-sm text-linen/70 transition-colors duration-200 hover:bg-linen/5 hover:text-linen"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  );
}
