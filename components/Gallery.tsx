"use client";

import { useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/types";
import Lightbox from "./Lightbox";
import Reveal from "./Reveal";

const spans = [
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[4/3]",
  "aspect-square",
];

export default function Gallery({ images: galleryImages }: { images: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-linen pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="text-xs tracking-widest2 text-gold-dark" style={{ color: "#8A6A38" }}>
            Inside VELORA
          </p>
          <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
            A Glimpse of the Experience
          </h2>
        </Reveal>

        <div className="mt-16 columns-2 gap-4 sm:gap-5 md:columns-3">
          {galleryImages.map((image, i) => (
            <button
              key={image.id}
              onClick={() => setOpenIndex(i)}
              className={`group relative mb-4 block w-full overflow-hidden break-inside-avoid sm:mb-5 ${spans[i % spans.length]}`}
              aria-label={`Open image: ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 30vw, 46vw"
                className="object-cover transition-transform duration-700 ease-signature group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/20" />
            </button>
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <Lightbox
          images={galleryImages}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={(i) => setOpenIndex(i)}
        />
      )}
    </section>
  );
}
