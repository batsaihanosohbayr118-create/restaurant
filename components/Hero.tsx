"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=2400&auto=format&fit=crop",
    alt: "VELORA dining room at dusk, candlelit tables and warm ambient light",
  },
  {
    src: "https://i.pinimg.com/1200x/96/f2/d9/96f2d9eb973479756b751aab4a49e29a.jpg",
    alt: "VELORA signature dish presentation",
  },
  {
    src: "https://i.pinimg.com/736x/92/eb/89/92eb891ada51f027b82970096a9f588b.jpg",
    alt: "VELORA signature dish presentation",
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden">
      {heroImages.map((image, index) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          fill
          priority={index === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            index === activeIndex
              ? "opacity-100 [animation:hero-zoom_16s_ease-out_forwards]"
              : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <h1 className="font-display text-linen">
          <span
            className="block text-4xl opacity-0 [animation:hero-in_0.9s_ease-out_forwards] [animation-delay:280ms] sm:text-5xl md:text-6xl font-medium"
          >
            Experience
          </span>
          <span
            className="mt-1 block text-5xl italic opacity-0 [animation:hero-in_0.9s_ease-out_forwards] [animation-delay:420ms] sm:text-6xl md:text-7xl font-medium"
          >
            The Art of Taste
          </span>
        </h1>

        <p className="mt-8 max-w-md font-display text-lg italic text-linen/80 opacity-0 [animation:hero-in_0.9s_ease-out_forwards] [animation-delay:600ms] md:text-xl">
          Carefully crafted dishes, beautiful moments, unforgettable flavors.
        </p>

        <div className="mt-12 flex flex-col gap-4 opacity-0 [animation:hero-in_0.9s_ease-out_forwards] [animation-delay:760ms] sm:flex-row">
          <Link
            href="/menu"
            className="group inline-flex items-center justify-center gap-2 bg-gold px-8 py-3.5 text-sm tracking-wide text-ink transition-colors duration-300 hover:bg-linen"
          >
            Explore Menu
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="/reservation"
            className="inline-flex items-center justify-center gap-2 border border-linen/50 px-8 py-3.5 text-sm tracking-wide text-linen transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            Reserve a Table
            <CalendarDays size={16} />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-linen/60 opacity-0 [animation:hero-in_0.9s_ease-out_forwards] [animation-delay:1100ms] sm:flex">
        <span className="h-12 w-px animate-pulse bg-linen/30" />
      </div>
    </section>
  );
}
