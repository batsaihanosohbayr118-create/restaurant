"use client";

import { useEffect, useRef, useState } from "react";
import { Clock } from "lucide-react";

interface TimePickerProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
}

const START_MINUTES = 11 * 60; // 11:00 AM
const END_MINUTES = 22 * 60 + 30; // 10:30 PM (last seating before 11 PM close)
const STEP = 30;

const SLOTS = Array.from(
  { length: (END_MINUTES - START_MINUTES) / STEP + 1 },
  (_, i) => START_MINUTES + i * STEP
);

function toValue(minutes: number) {
  const h = String(Math.floor(minutes / 60)).padStart(2, "0");
  const m = String(minutes % 60).padStart(2, "0");
  return `${h}:${m}`;
}

function formatDisplay(value: string) {
  if (!value) return "";
  const [h, m] = value.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return "";
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

export default function TimePicker({
  id,
  name,
  value,
  onChange,
  required,
  className = "",
}: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (open && listRef.current) {
      const selectedEl = listRef.current.querySelector('[data-selected="true"]');
      selectedEl?.scrollIntoView({ block: "center" });
    }
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        id={id}
        aria-required={required}
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between text-left ${className} ${
          value ? "text-ink" : "text-ink/40"
        }`}
      >
        {value ? formatDisplay(value) : "Select a time"}
        <Clock size={16} className="text-gold" style={{ color: "#B08B4F" }} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 w-48 border border-ink/10 bg-linen shadow-lg">
          <div ref={listRef} className="max-h-60 overflow-y-auto py-2">
            {SLOTS.map((minutes) => {
              const slotValue = toValue(minutes);
              const isSelected = slotValue === value;
              return (
                <button
                  type="button"
                  key={minutes}
                  data-selected={isSelected}
                  onClick={() => {
                    onChange(slotValue);
                    setOpen(false);
                  }}
                  className={`block w-full px-5 py-2 text-left text-sm transition-colors duration-200 ${
                    isSelected ? "bg-gold text-ink" : "text-ink/70 hover:bg-gold/15"
                  }`}
                  style={isSelected ? { backgroundColor: "#B08B4F" } : undefined}
                >
                  {formatDisplay(slotValue)}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
