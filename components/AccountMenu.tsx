"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User, LogOut, ChevronDown, LayoutDashboard } from "lucide-react";

export default function AccountMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  if (status === "loading") {
    return <div className="h-4 w-16" />;
  }

  if (!session) {
    return (
      <Link
        href="/login"
        className="flex items-center gap-2 border border-linen/20 px-4 py-2.5 text-sm text-linen/85 transition-colors duration-300 hover:border-gold hover:text-gold"
      >
        <User size={16} />
        Login
      </Link>
    );
  }

  const isAdmin = session.user.role === "ADMIN";
  const label = isAdmin ? "Admin" : session.user.name?.split(" ")[0] ?? "Account";

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 border border-linen/20 px-4 py-2.5 text-sm text-linen/85 transition-colors duration-300 hover:border-gold hover:text-gold"
      >
        <User size={16} />
        <span>{label}</span>
        <ChevronDown size={14} className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-20 mt-3 w-44 border border-linen/10 bg-ink shadow-lg">
          {session.user.role === "ADMIN" && (
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2 border-b border-linen/10 px-4 py-3 text-left text-sm text-linen/80 transition-colors duration-200 hover:bg-gold/10 hover:text-gold"
            >
              <LayoutDashboard size={15} />
              Admin Panel
            </Link>
          )}
          <button
            onClick={() => {
              setOpen(false);
              signOut({ callbackUrl: "/" });
            }}
            className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-linen/80 transition-colors duration-200 hover:bg-gold/10 hover:text-gold"
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
