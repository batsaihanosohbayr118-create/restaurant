"use client";

import { useRef } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Review } from "@/lib/types";
import Reveal from "./Reveal";
import ReviewForm from "./ReviewForm";

export default function Reviews({ reviews }: { reviews: Review[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    const node = trackRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <Reveal className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
          <div className="text-center sm:text-left">
            <p className="text-xs tracking-widest2 text-gold" style={{ color: "#B08B4F" }}>
              Guest Words
            </p>
            <h2 className="mt-4 font-display text-4xl text-linen sm:text-5xl">
              What Our Guests Say
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              aria-label="Previous reviews"
              onClick={() => scroll(-1)}
              className="p-3 text-linen/70 transition-colors duration-300 hover:text-gold"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              aria-label="Next reviews"
              onClick={() => scroll(1)}
              className="p-3 text-linen/70 transition-colors duration-300 hover:text-gold"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </Reveal>

        <div
          ref={trackRef}
          className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="group flex w-[85%] shrink-0 snap-start flex-col justify-between border border-linen/10 bg-ink-800 p-8 transition-all duration-500 ease-signature hover:-translate-y-2 hover:border-gold/50 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] sm:w-[46%] lg:w-[31%]"
              style={{ backgroundColor: "#211D18" }}
            >
              <div>
                <Quote
                  size={22}
                  className="text-gold/40 transition-all duration-500 group-hover:scale-110 group-hover:text-gold/80"
                />
                <p className="mt-5 text-[15px] leading-relaxed text-linen/80">
                  {review.review}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3">
                {review.avatar ? (
                  <div className="relative h-11 w-11 overflow-hidden rounded-full">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/20 font-display text-gold" style={{ color: "#B08B4F" }}>
                    {review.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-sm text-linen">{review.name}</p>
                  <div className="mt-1 flex gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className={i < review.rating ? "fill-gold text-gold" : "text-linen/20"}
                        style={i < review.rating ? { fill: "#B08B4F", color: "#B08B4F" } : undefined}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ReviewForm />
      </div>
    </section>
  );
}
