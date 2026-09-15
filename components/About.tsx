import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import TypewriterText from "./TypewriterText";

export default function About() {
  return (
    <section id="about" className="bg-linen py-12 md:py-16">
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
            Our Story
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Where Passion Meets Flavor
          </h2>
          <TypewriterText
            className="mt-6 max-w-md space-y-4 text-[15px] leading-relaxed text-ink/70"
            paragraphClassName="text-[15px] leading-relaxed text-ink/70"
            paragraphs={[
              "VELORA began with a simple belief: that a meal can hold a memory. Our kitchen sources from small growers and trusted purveyors, building each plate around ingredients at their peak. Every detail — from the linen on the table to the last note of a dessert wine — is considered with the same care.",
              "Led by a team devoted to precision and warmth in equal measure, we set out to create a room where celebration feels effortless and the ordinary evening becomes something worth remembering.",
            ]}
          />
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-3 border-b border-gold pb-1 text-sm text-ink transition-colors duration-300 hover:text-gold"
          >
            Discover Our Story
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
