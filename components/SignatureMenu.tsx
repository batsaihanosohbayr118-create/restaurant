import Image from "next/image";
import Link from "next/link";
import type { MenuItem } from "@/lib/types";
import Reveal from "./Reveal";

export default function SignatureMenu({ dishes: signatureDishes }: { dishes: MenuItem[] }) {
  return (
    <section id="signature-menu" className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="text-xs tracking-widest2 text-gold" style={{ color: "#B08B4F" }}>
            Chef&apos;s Selection
          </p>
          <h2 className="mt-4 font-display text-4xl text-linen sm:text-5xl">
            Our Signature Dishes
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {signatureDishes.map((dish, i) => (
            <Reveal key={dish.id} delay={i * 60} className="group">
              <Link href={`/menu/${dish.id}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 92vw"
                    className="object-cover transition-transform duration-700 ease-signature group-hover:scale-105"
                  />
                  <div className="absolute inset-0 border border-linen/0 transition-colors duration-500 group-hover:border-gold/60" />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl text-linen transition-colors duration-300 group-hover:text-gold">
                      {dish.name}
                    </h3>
                    <p className="mt-1 text-xs uppercase tracking-wide text-gold/70">
                      {dish.category}
                    </p>
                  </div>
                  <span className="font-display text-lg text-gold" style={{ color: "#B08B4F" }}>
                    ${dish.price}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-linen/60">
                  {dish.description}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/menu"
            className="border border-gold px-8 py-3.5 text-sm tracking-wide text-gold transition-colors duration-300 hover:bg-gold hover:text-ink"
          >
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
