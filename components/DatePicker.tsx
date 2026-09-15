"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface DatePickerProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function toDateValue(year: number, month: number, day: number) {
  const mm = String(month + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

function parseValue(value: string): Date | null {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function formatDisplay(value: string) {
  const date = parseValue(value);
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function DatePicker({
  id,
  name,
  value,
  onChange,
  required,
  className = "",
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const selected = parseValue(value);
  const today = new Date();
  const [viewYear, setViewYear] = useState(selected?.getFullYear() ?? today.getFullYear());
  const [viewMonth, setViewMonth] = useState(selected?.getMonth() ?? today.getMonth());
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

  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const startWeekday = firstOfMonth.getDay();
  const cells: (number | null)[] = [
    ...Array.from({ length: startWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const goPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const isSameDay = (day: number, other: Date | null) =>
    !!other &&
    other.getFullYear() === viewYear &&
    other.getMonth() === viewMonth &&
    other.getDate() === day;

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
        {value ? formatDisplay(value) : "Select a date"}
        <Calendar size={16} className="text-gold" style={{ color: "#B08B4F" }} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 w-72 border border-ink/10 bg-linen p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <button
              type="button"
              aria-label="Previous month"
              onClick={goPrevMonth}
              className="p-1.5 text-ink/50 transition-colors duration-300 hover:text-gold"
            >
              <ChevronLeft size={16} />
            </button>
            <p className="font-display text-sm tracking-wide text-ink">
              {firstOfMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
            <button
              type="button"
              aria-label="Next month"
              onClick={goNextMonth}
              className="p-1.5 text-ink/50 transition-colors duration-300 hover:text-gold"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-y-2 text-center">
            {WEEKDAYS.map((day) => (
              <span key={day} className="text-[10px] uppercase tracking-wide text-ink/35">
                {day}
              </span>
            ))}

            {cells.map((day, i) => {
              if (day === null) return <span key={`blank-${i}`} />;
              const isSelected = isSameDay(day, selected);
              const isToday = isSameDay(day, today);
              return (
                <button
                  type="button"
                  key={day}
                  onClick={() => {
                    onChange(toDateValue(viewYear, viewMonth, day));
                    setOpen(false);
                  }}
                  className={`mx-auto flex h-8 w-8 items-center justify-center text-sm transition-colors duration-200 ${
                    isSelected
                      ? "bg-gold text-ink"
                      : isToday
                      ? "border border-gold/60 text-ink"
                      : "text-ink/70 hover:bg-gold/15"
                  }`}
                  style={isSelected ? { backgroundColor: "#B08B4F" } : undefined}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
