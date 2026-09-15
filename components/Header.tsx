"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, LogOut } from "lucide-react";
import AccountMenu from "./AccountMenu";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isLinkActive = (href: string) => pathname === href;
  const isAdmin = session?.user.role === "ADMIN";

  const solid = scrolled || !isHome || mobileOpen;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ease-signature ${
        solid ? "bg-ink/95 backdrop-blur-sm shadow-[0_1px_0_rgba(180,139,79,0.25)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo/download.png"
              alt="VELORA"
              width={52}
              height={49}
              className="shrink-0 object-contain"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`group relative py-1 text-sm transition-colors duration-300 ${
                    active ? "text-gold" : "text-linen/85 hover:text-gold"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 ease-signature group-hover:scale-x-100 ${
                      active ? "scale-x-100" : ""
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-6 md:flex">
            <AccountMenu />
            {!isAdmin && (
              <Link
                href="/reservation"
                className="inline-flex items-center border border-gold px-6 py-2.5 text-sm text-gold hover:bg-gold hover:text-ink transition-colors duration-300"
              >
                Reserve a Table
              </Link>
            )}
          </div>

          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden text-linen p-2"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-signature ${
          mobileOpen ? "max-h-[34rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 bg-ink px-6 pb-6 pt-2">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`border-b border-linen/10 py-3 text-base transition-colors duration-300 last:border-none ${
                  active ? "text-gold" : "text-linen/90"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {session ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 border-b border-linen/10 py-3 text-base text-linen/90"
            >
              <LogOut size={16} />
              Logout ({session.user.name?.split(" ")[0]})
            </button>
          ) : (
            <Link
              href="/login"
              className="border-b border-linen/10 py-3 text-base text-linen/90"
            >
              Login / Register
            </Link>
          )}

          {!isAdmin && (
            <Link
              href="/reservation"
              className="mt-4 inline-flex justify-center border border-gold px-6 py-3 text-sm text-gold"
            >
              Reserve a Table
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
