"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Users } from "lucide-react";

interface GuestsPickerProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  max?: number;
  className?: string;
}

export default function GuestsPicker({
  id,
  name,
  value,
  onChange,
  max = 8,
  className = "",
}: GuestsPickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const options = Array.from({ length: max }, (_, i) => i + 1);
  const label = value === "1" ? "1 Guest" : `${value} Guests`;

  return (
    <div ref={containerRef} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        id={id}
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between text-left text-ink ${className}`}
      >
        <span className="flex items-center gap-2">
          <Users size={15} className="text-gold" style={{ color: "#B08B4F" }} />
          {label}
        </span>
        <ChevronDown
          size={16}
          className={`text-ink/40 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 w-full border border-ink/10 bg-linen shadow-lg">
          <div className="grid grid-cols-4 gap-1 p-3">
            {options.map((n) => {
              const isSelected = String(n) === value;
              return (
                <button
                  type="button"
                  key={n}
                  onClick={() => {
                    onChange(String(n));
                    setOpen(false);
                  }}
                  className={`flex h-10 items-center justify-center text-sm transition-colors duration-200 ${
                    isSelected ? "bg-gold text-ink" : "text-ink/70 hover:bg-gold/15"
                  }`}
                  style={isSelected ? { backgroundColor: "#B08B4F" } : undefined}
                >
                  {n}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
