import type { Metadata } from "next";
import Image from "next/image";
import MenuFilter from "@/components/MenuFilter";
import { getMenuItems } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore VELORA's full menu — starters, mains, pasta, seafood, dessert, and drinks, crafted with seasonal ingredients.",
};

export const revalidate = 60;

// Side photos fade out on every edge so they melt into the linen background.
const softEdge = "radial-gradient(ellipse 50% 50% at 50% 50%, #000 45%, transparent 100%)";

export default async function MenuPage() {
  const menuItems = await getMenuItems();

  return (
    <section className="relative overflow-hidden bg-linen pb-20 pt-32 md:pb-28 md:pt-36">
      {/* Left photo */}
      <div
        className="pointer-events-none absolute left-[-4%] top-[340px] hidden h-[440px] w-[30%] max-w-[520px] lg:block"
        style={{ maskImage: softEdge, WebkitMaskImage: softEdge }}
      >
        <Image
          src="https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1000&auto=format&fit=crop"
          alt=""
          fill
          priority
          sizes="30vw"
          className="object-cover"
        />
      </div>

      {/* Right photo */}
      <div
        className="pointer-events-none absolute right-[-4%] top-[340px] hidden h-[440px] w-[30%] max-w-[520px] lg:block"
        style={{ maskImage: softEdge, WebkitMaskImage: softEdge }}
      >
        <Image
          src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=1000&auto=format&fit=crop"
          alt=""
          fill
          priority
          sizes="30vw"
          className="object-cover"
        />
      </div>

      <div className="relative mx-auto max-w-8xl px-6 lg:px-10">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-widest2 text-gold-dark">VELORA</p>
          <h1 className="mt-3 font-display text-6xl tracking-[0.12em] text-ink sm:text-7xl md:text-8xl">
            MENU
          </h1>
          <div className="mt-5 flex items-center justify-center gap-4 text-ink/40">
            <span className="h-px w-16 bg-current" />
            <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
            <span className="h-px w-16 bg-current" />
          </div>
        </div>

        <MenuFilter items={menuItems} />
      </div>
    </section>
  );
}
