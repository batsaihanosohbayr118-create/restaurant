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

export default async function MenuPage() {
  const menuItems = await getMenuItems();

  return (
    <>
      <section className="relative flex h-[46vh] min-h-[340px] w-full items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2000&auto=format&fit=crop"
          alt="Wagyu steak plated with truffle jus at VELORA"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/40" />
        <div className="relative z-10 mx-auto w-full max-w-8xl px-6 pb-16 lg:px-10">
          <p className="text-xs tracking-widest2 text-gold-light" style={{ color: "#D4B788" }}>
            VELORA
          </p>
          <h1 className="mt-4 font-display text-5xl text-linen sm:text-6xl">
            The Full Menu
          </h1>
        </div>
      </section>

      <section className="bg-linen py-20 md:py-28">
        <div className="mx-auto max-w-8xl px-6 lg:px-10">
          <MenuFilter items={menuItems} />
        </div>
      </section>
    </>
  );
}
