import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reserve a Table", href: "/reservation" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
];

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-linen/10">
      <div className="mx-auto max-w-8xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo/download.png"
                alt="VELORA"
                width={40}
                height={38}
                className="shrink-0 object-contain"
              />
              <span className="font-display text-2xl tracking-[0.15em] text-linen">
                VELORA
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-linen/50">
              A modern fine-dining destination serving carefully crafted
              dishes in an intimate, elegant setting.
            </p>
            <div className="mt-6 flex gap-4">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-linen/50 transition-colors duration-300 hover:text-gold"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest2 text-linen/40">
              Navigate
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-linen/70 transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest2 text-linen/40">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-linen/70">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold/70" />
                <Link href="/contact" className="transition-colors duration-300 hover:text-gold">
                  128 Harborview Lane, San Francisco, CA
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-gold/70" />
                <a href="tel:+14155550198" className="transition-colors duration-300 hover:text-gold">
                  +1 (415) 555-0198
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-gold/70" />
                <a href="mailto:reservations@velora.com" className="transition-colors duration-300 hover:text-gold">
                  reservations@velora.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest2 text-linen/40">
              Hours
            </h3>
            <p className="mt-5 text-sm text-linen/70">Monday – Sunday</p>
            <p className="mt-1 text-sm text-linen/70">11:00 AM – 11:00 PM</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-linen/10 pt-8 sm:flex-row">
          <p className="text-xs text-linen/40">
            © {new Date().getFullYear()} VELORA. All rights reserved.
          </p>
          <p className="text-xs text-linen/40">Crafted with care.</p>
        </div>
      </div>
    </footer>
  );
}
