"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  className?: string;
}

export default function Select({ value, onChange, options, className = "" }: SelectProps) {
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

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between text-left text-ink ${className}`}
      >
        {value}
        <ChevronDown
          size={16}
          className={`text-ink/40 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 w-full border border-ink/10 bg-linen shadow-lg">
          <div className="max-h-60 overflow-y-auto py-1">
            {options.map((option) => {
              const isSelected = option === value;
              return (
                <button
                  type="button"
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className={`block w-full px-4 py-2 text-left text-sm transition-colors duration-200 ${
                    isSelected ? "bg-gold text-ink" : "text-ink/70 hover:bg-gold/15"
                  }`}
                  style={isSelected ? { backgroundColor: "#B08B4F" } : undefined}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
