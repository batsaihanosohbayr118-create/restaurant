"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Image as ImageIcon,
  MessageSquareQuote,
  CalendarCheck,
  LogOut,
  ExternalLink,
  Menu,
  X,
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-linen/10 bg-ink px-4 py-4 md:hidden">
        <Link href="/admin" className="flex items-center">
          <Image src="/logo/download.png" alt="VELORA" width={40} height={38} className="shrink-0 object-contain" />
        </Link>
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="p-2 text-linen"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-svh w-64 shrink-0 flex-col overflow-y-auto border-r border-linen/10 bg-ink transition-transform duration-300 ease-signature md:sticky md:top-0 md:w-60 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-7">
          <div>
            <Link href="/admin" className="flex items-center">
              <Image src="/logo/download.png" alt="VELORA" width={48} height={45} className="shrink-0 object-contain" />
            </Link>
            <p className="mt-2 text-[10px] uppercase tracking-widest2 text-gold/70">
              Admin Panel
            </p>
          </div>
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="p-1 text-linen md:hidden"
          >
            <X size={20} />
          </button>
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
    </>
  );
}
