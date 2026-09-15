"use client";

import { useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryImage } from "@/lib/types";

interface LightboxProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: LightboxProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, goPrev, goNext]);

  const current = images[index];

  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
      className="fixed inset-0 z-[100] flex animate-fade-in items-center justify-center bg-ink/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        aria-label="Close gallery"
        onClick={onClose}
        className="absolute right-5 top-5 z-10 p-2 text-linen/80 transition-colors hover:text-gold"
      >
        <X size={28} />
      </button>

      <button
        aria-label="Previous image"
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 p-3 text-linen/70 transition-colors hover:text-gold sm:left-6"
      >
        <ChevronLeft size={32} />
      </button>

      <button
        aria-label="Next image"
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 p-3 text-linen/70 transition-colors hover:text-gold sm:right-6"
      >
        <ChevronRight size={32} />
      </button>

      <div
        key={current.id}
        className="relative mx-auto flex h-[78vh] w-[90vw] max-w-4xl animate-scale-in items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={current.src}
          alt={current.alt}
          fill
          sizes="90vw"
          className="object-contain"
          priority
        />
      </div>

      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-wide text-linen/50">
        {index + 1} / {images.length}
      </p>
    </div>,
    document.body
  );
}
