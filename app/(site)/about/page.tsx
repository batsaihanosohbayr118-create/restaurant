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
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Craft & Patience",
    description:
      "From stocks simmered overnight to hand-rolled pasta, our kitchen favors the slow, deliberate technique over the shortcut.",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Warm Hospitality",
    description:
      "Precision in the kitchen means little without warmth in the room. Every guest leaves feeling like they were expected.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop",
  },
];

function Divider({ light = false }: { light?: boolean }) {
  return (
    <div
      className={`mt-5 flex items-center justify-center gap-4 ${
        light ? "text-linen/30" : "text-ink/40"
      }`}
    >
      <span className="h-px w-16 bg-current" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
      <span className="h-px w-16 bg-current" />
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-linen pb-16 pt-32 md:pb-24 md:pt-36">
        <div className="mx-auto max-w-8xl px-6 lg:px-10">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-widest2 text-gold-dark">VELORA</p>
            <h1 className="mt-3 font-display text-5xl tracking-[0.12em] text-ink sm:text-7xl md:text-8xl">
              OUR STORY
            </h1>
            <Divider />
            <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-ink/55">
              A modern dining room built on seasonal sourcing, patient craft and warm
              hospitality.
            </p>
          </div>

          <Reveal className="relative mt-14 md:mt-20">
            <div className="relative h-[42vh] min-h-[280px] overflow-hidden rounded-[2.5rem] shadow-[0_30px_60px_-30px_rgba(24,22,19,0.55)] md:h-[56vh]">
              <Image
                src="/about/dining-room.png"
                alt="VELORA dining room with a candlelit table and chandelier"
                fill
                priority
                sizes="(min-width: 1440px) 1360px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
              <p className="absolute bottom-6 left-6 font-display text-lg italic text-linen/90 md:bottom-10 md:left-10 md:text-2xl">
                “A meal can hold a memory.”
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="bg-linen pb-20 md:pb-32">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[5fr_6fr] lg:gap-20 lg:px-10">
          <Reveal direction="left" className="relative mx-auto w-full max-w-md">
            {/* Arched frame with offset gold outline */}
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-full border border-gold/50" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-linen-200">
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_at_bottom,#DDD1B4_0%,transparent_70%)]" />
              <Image
                src="/chef/chef.png"
                alt="VELORA head chef"
                fill
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="object-contain object-bottom"
              />
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-6 py-3 text-[10px] uppercase tracking-widest2 text-gold-light shadow-lg">
              Head Chef
            </div>
          </Reveal>

          <Reveal delay={120}>
            <span className="font-display text-5xl leading-none text-gold/40">01</span>
            <p className="mt-4 text-[11px] uppercase tracking-widest2 text-gold-dark">
              Where It Began
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
              Where Passion Meets Flavor
            </h2>
            <span className="mt-6 block h-px w-12 bg-gold/60" />
            <TypewriterText
              className="mt-6 max-w-lg space-y-4 text-[15px] leading-relaxed text-ink/65"
              paragraphClassName="text-[15px] leading-relaxed text-ink/65"
              paragraphs={[
                "VELORA began with a simple belief: that a meal can hold a memory. Our kitchen sources from small growers and trusted purveyors, building each plate around ingredients at their peak. Every detail — from the linen on the table to the last note of a dessert wine — is considered with the same care.",
                "Led by a team devoted to precision and warmth in equal measure, we set out to create a room where celebration feels effortless and the ordinary evening becomes something worth remembering. What started as a single dining room has grown into a destination guests return to for anniversaries, quiet Tuesdays, and everything in between.",
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-ink py-20 md:py-28">
        <div className="mx-auto max-w-8xl px-6 lg:px-10">
          <Reveal className="text-center">
            <p className="text-[11px] uppercase tracking-widest2 text-gold">What Guides Us</p>
            <h2 className="mt-3 font-display text-4xl text-linen sm:text-5xl">Our Philosophy</h2>
            <Divider light />
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 100} className="group">
                <div className="h-full overflow-hidden rounded-[2rem] border border-linen/10 bg-ink-800 transition-colors duration-500 hover:border-gold/40">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={pillar.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 30vw, 92vw"
                      className="object-cover opacity-80 transition-transform duration-700 ease-signature group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-800 to-transparent" />
                    <span className="absolute bottom-3 left-6 font-display text-5xl text-gold/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="p-6 pt-4 md:p-8 md:pt-4">
                    <h3 className="font-display text-2xl text-linen">{pillar.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-linen/55">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-linen py-20 md:py-28">
        <Reveal className="mx-auto max-w-4xl px-6">
          <div className="rounded-[2.5rem] border border-ink/10 bg-linen-50 px-6 py-14 text-center shadow-[0_20px_50px_-35px_rgba(24,22,19,0.5)] md:px-16">
            <p className="text-[11px] uppercase tracking-widest2 text-gold-dark">Join Us</p>
            <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
              Come Taste the Story
            </h2>
            <Divider />
            <p className="mt-6 text-sm leading-relaxed text-ink/60">
              A table is waiting for the next chapter — yours.
            </p>
            <Link
              href="/reservation"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 text-xs uppercase tracking-[0.18em] text-linen transition-colors duration-300 hover:bg-gold hover:text-ink"
            >
              Reserve a Table
              <CalendarDays size={15} />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
