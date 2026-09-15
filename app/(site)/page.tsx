import Link from "next/link";
import { Image as ImageIcon, CalendarDays, Mail } from "lucide-react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SignatureMenu from "@/components/SignatureMenu";
import Reviews from "@/components/Reviews";
import Reveal from "@/components/Reveal";
import { getSignatureDishes, getReviews } from "@/lib/queries";

export const revalidate = 60;

const bridgeLinks = [
  { label: "View Gallery", href: "/gallery", icon: ImageIcon },
  { label: "Reserve a Table", href: "/reservation", icon: CalendarDays },
  { label: "Get in Touch", href: "/contact", icon: Mail },
];

export default async function HomePage() {
  const [signatureDishes, reviews] = await Promise.all([
    getSignatureDishes(),
    getReviews(),
  ]);

  return (
    <>
      <Hero />
      <About />
      <SignatureMenu dishes={signatureDishes} />
      <Reviews reviews={reviews} />

      <section className="bg-linen py-20 md:py-28">
        <Reveal className="mx-auto flex max-w-xl flex-col items-center px-6 text-center">
          <p className="text-xs tracking-widest2 text-gold-dark" style={{ color: "#8A6A38" }}>
            Ready to Visit?
          </p>
          <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
            See More of VELORA
          </h2>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 px-6 sm:grid-cols-3">
          {bridgeLinks.map(({ label, href, icon: Icon }, i) => (
            <Reveal key={label} delay={i * 100}>
              <Link
                href={href}
                className="group flex flex-col items-center gap-3 border border-ink/10 px-6 py-10 text-center transition-colors duration-300 hover:border-gold"
              >
                <Icon
                  size={24}
                  className="text-gold transition-transform duration-300 group-hover:scale-110"
                  style={{ color: "#B08B4F" }}
                />
                <span className="translate-y-3 text-sm tracking-wide text-ink opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  {label}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
