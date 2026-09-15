import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import Reveal from "@/components/Reveal";
import TypewriterText from "@/components/TypewriterText";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind VELORA — a modern fine-dining destination built on seasonal sourcing, patient craft, and warm hospitality.",
};

const pillars = [
  {
    title: "Seasonal Sourcing",
    description:
      "We build every menu around what small growers and trusted purveyors bring us at their peak, not the other way around.",
  },
  {
    title: "Craft & Patience",
    description:
      "From stocks simmered overnight to hand-rolled pasta, our kitchen favors the slow, deliberate technique over the shortcut.",
  },
  {
    title: "Warm Hospitality",
    description:
      "Precision in the kitchen means little without warmth in the room. Every guest leaves feeling like they were expected.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative flex h-[46vh] min-h-[340px] w-full items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop"
          alt="VELORA dining room with warm ambient lighting"
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
            Our Story
          </h1>
        </div>
      </section>

      <section className="bg-linen py-12 md:py-16">
        <div className="mx-auto grid max-w-8xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
          <Reveal direction="left" className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/chef/chef.png"
                alt="VELORA head chef plating a dish"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-contain"
              />
            </div>
          </Reveal>

          <Reveal delay={120} className="order-1 lg:order-2 lg:pl-6">
            <p className="text-xs tracking-widest2 text-gold-dark" style={{ color: "#8A6A38" }}>
              Where It Began
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
              Where Passion Meets Flavor
            </h2>
            <TypewriterText
              className="mt-6 max-w-md space-y-4 text-[15px] leading-relaxed text-ink/70"
              paragraphClassName="text-[15px] leading-relaxed text-ink/70"
              paragraphs={[
                "VELORA began with a simple belief: that a meal can hold a memory. Our kitchen sources from small growers and trusted purveyors, building each plate around ingredients at their peak. Every detail — from the linen on the table to the last note of a dessert wine — is considered with the same care.",
                "Led by a team devoted to precision and warmth in equal measure, we set out to create a room where celebration feels effortless and the ordinary evening becomes something worth remembering. What started as a single dining room has grown into a destination guests return to for anniversaries, quiet Tuesdays, and everything in between.",
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-20 md:py-28">
        <div className="mx-auto max-w-8xl px-6 lg:px-10">
          <Reveal className="mx-auto max-w-xl text-center">
            <p className="text-xs tracking-widest2 text-gold" style={{ color: "#B08B4F" }}>
              What Guides Us
            </p>
            <h2 className="mt-4 font-display text-4xl text-linen sm:text-5xl">
              Our Philosophy
            </h2>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-3">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 100} className="text-center">
                <span className="font-display text-3xl text-gold" style={{ color: "#B08B4F" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl text-linen">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-linen/60">
                  {pillar.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-linen py-20 md:py-28">
        <Reveal className="mx-auto flex max-w-xl flex-col items-center px-6 text-center">
          <p className="text-xs tracking-widest2 text-gold-dark" style={{ color: "#8A6A38" }}>
            Join Us
          </p>
          <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
            Come Taste the Story
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60">
            A table is waiting for the next chapter — yours.
          </p>
          <Link
            href="/reservation"
            className="mt-8 inline-flex items-center gap-2 bg-ink px-8 py-3.5 text-sm tracking-wide text-linen transition-colors duration-300 hover:bg-gold hover:text-ink"
          >
            Reserve a Table
            <CalendarDays size={16} />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
