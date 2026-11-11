"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { menuCategories, type MenuCategory, type MenuItem } from "@/lib/types";

type Filter = "All" | MenuCategory;

const filters: Filter[] = ["All", ...menuCategories];
const AUTOPLAY_MS = 4500;

const mod = (a: number, n: number) => ((a % n) + n) % n;

function Counter({ index, total }: { index: number; total: number }) {
  return (
    <span className="font-display text-4xl leading-none text-gold/60 sm:text-5xl">
      {String(index + 1).padStart(2, "0")}
      <span className="text-base text-ink/30 sm:text-lg"> / {String(total).padStart(2, "0")}</span>
    </span>
  );
}

function DishInfo({
  dish,
  index,
  total,
  hideCounter = false,
}: {
  dish: MenuItem;
  index: number;
  total: number;
  hideCounter?: boolean;
}) {
  return (
    <div key={dish.id} className="flex animate-fade-up flex-col items-center" aria-live="polite">
      {!hideCounter && <Counter index={index} total={total} />}
      <p className="mt-4 text-[11px] uppercase tracking-widest2 text-gold-dark">
        {dish.category}
        {dish.signature && <span className="text-gold"> · Chef&apos;s Signature</span>}
      </p>
      <h3 className="mt-2 font-display text-3xl leading-tight text-ink sm:text-4xl">
        {dish.name}
      </h3>
      <span className="mt-4 h-px w-10 bg-gold/50" />
      <p className="mt-3 line-clamp-3 max-w-sm text-sm leading-relaxed text-ink/55">
        {dish.description}
      </p>
      <div className="mt-5 flex items-center justify-center gap-5">
        <span className="font-display text-2xl text-ink">${dish.price}</span>
        <span className="h-px w-8 bg-gold/50" />
        <Link
          href={`/menu/${dish.id}`}
          className="rounded-full border border-ink/80 px-5 py-2 text-[11px] uppercase tracking-widest2 text-ink transition-colors hover:border-gold hover:bg-gold"
        >
          View dish
        </Link>
      </div>
    </div>
  );
}

export default function MenuFilter({ items: menuItems }: { items: MenuItem[] }) {
  const [active, setActive] = useState<Filter>("All");
  // Unbounded step counter so the wheel always turns the short way round.
  const [step, setStep] = useState(0);
  // Extra full turn used for the 360° spin when the category changes.
  const [spin, setSpin] = useState(0);
  const [paused, setPaused] = useState(false);
  const [width, setWidth] = useState(1000);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragX = useRef<number | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: menuItems.length };
    for (const item of menuItems) c[item.category] = (c[item.category] ?? 0) + 1;
    return c;
  }, [menuItems]);

  const items = useMemo(() => {
    const list =
      active === "All" ? menuItems : menuItems.filter((i) => i.category === active);
    return [...list].sort(
      (a, b) => menuCategories.indexOf(a.category) - menuCategories.indexOf(b.category)
    );
  }, [active, menuItems]);

  const n = items.length;
  const angleStep = n > 0 ? 360 / n : 0;
  const current = n > 0 ? mod(step, n) : 0;
  const dish = items[current];

  // Responsive wheel size
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const isSmall = width < 640;
  const plate = isSmall ? 56 : 76;
  const activePlate = isSmall ? 104 : 150;
  const radius = Math.min(width / 2 - plate / 2 - 8, 400);
  const rotation = -step * angleStep + spin;
  // Radius of the inner (filled) disc; show details inside it when roomy enough.
  const innerR = radius - plate * 1.4;
  const inside = innerR >= 220;

  const go = useCallback((delta: number) => setStep((s) => s + delta), []);

  const navBtn =
    "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/20 bg-linen text-ink/70 transition-colors hover:border-gold hover:bg-gold hover:text-ink";
  const prevBtn = (
    <button type="button" onClick={() => go(-1)} aria-label="Previous dish" className={navBtn}>
      <ChevronLeft size={18} />
    </button>
  );
  const nextBtn = (
    <button type="button" onClick={() => go(1)} aria-label="Next dish" className={navBtn}>
      <ChevronRight size={18} />
    </button>
  );

  const select = (j: number) => {
    let d = j - current;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    go(d);
  };

  const changeFilter = (f: Filter) => {
    if (f === active) return;
    setActive(f);
    setStep(0);
    setSpin((s) => s + 360);
  };

  // Autoplay
  useEffect(() => {
    if (paused || n < 2) return;
    const t = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, n, go]);

  return (
    <div>
      {/* Category bar */}
      <div className="mt-8">
        <div
          role="tablist"
          aria-label="Filter menu by category"
          className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] md:flex-wrap md:justify-center [&::-webkit-scrollbar]:hidden"
        >
          {filters.map((filter) => {
            const isActive = active === filter;
            return (
              <button
                key={filter}
                role="tab"
                aria-selected={isActive}
                onClick={() => changeFilter(filter)}
                className={`group flex shrink-0 items-center gap-2 rounded-full border px-5 py-2 text-xs uppercase tracking-[0.18em] transition-all duration-300 ease-signature ${
                  isActive
                    ? "border-ink bg-ink text-linen"
                    : "border-ink/15 bg-linen/70 text-ink/60 backdrop-blur-sm hover:border-gold hover:text-ink"
                }`}
              >
                {filter}
                <span
                  className={`text-[10px] tabular-nums ${
                    isActive ? "text-gold-light" : "text-ink/35 group-hover:text-gold"
                  }`}
                >
                  {counts[filter] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Half-circle wheel */}
      <div
        ref={stageRef}
        className="relative mx-auto mt-8 w-full max-w-3xl select-none outline-none"
        tabIndex={0}
        aria-roledescription="carousel"
        aria-label="Menu wheel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        onPointerDown={(e) => (dragX.current = e.clientX)}
        onPointerUp={(e) => {
          if (dragX.current === null) return;
          const dx = e.clientX - dragX.current;
          dragX.current = null;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        }}
      >
        {n > 0 && (
          <div
            className="relative overflow-hidden"
            style={{ height: radius + activePlate / 2 + 24 }}
          >
            {/* Wheel: centre sits on the bottom edge so only the top half shows */}
            <div
              className="absolute left-1/2"
              style={{
                width: radius * 2,
                height: radius * 2,
                marginLeft: -radius,
                top: activePlate / 2 + 24,
              }}
            >
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border border-ink/10" />
              <div
                className="absolute rounded-full border border-dashed border-gold/40"
                style={{ inset: plate * 0.9 }}
              />
              <div
                className="absolute rounded-full bg-linen-200/50"
                style={{ inset: plate * 1.4 }}
              />

              {/* Rotating plate ring */}
              <div
                className="absolute inset-0 transition-transform duration-[1200ms] ease-signature"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {items.map((item, j) => {
                  const isActive = j === current;
                  const a = ((j * angleStep - 90) * Math.PI) / 180;
                  const size = isActive ? activePlate : plate;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => select(j)}
                      aria-label={item.name}
                      aria-current={isActive}
                      className="absolute"
                      style={{
                        left: radius + radius * Math.cos(a),
                        top: radius + radius * Math.sin(a),
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {/* counter-rotate so food stays upright */}
                      <span
                        className={`relative block overflow-hidden rounded-full bg-linen transition-all duration-[1200ms] ease-signature ${
                          isActive
                            ? "shadow-[0_24px_50px_-18px_rgba(24,22,19,0.6)] ring-4 ring-linen"
                            : "opacity-80 shadow-[0_10px_24px_-12px_rgba(24,22,19,0.5)] ring-2 ring-linen hover:opacity-100"
                        }`}
                        style={{
                          width: size,
                          height: size,
                          transform: `rotate(${-rotation}deg)`,
                        }}
                      >
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          sizes={`${activePlate}px`}
                          className="pointer-events-none object-cover"
                          draggable={false}
                        />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Centre info inside the half circle */}
            {dish && inside && (
              <div
                className="absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center pb-6 text-center"
                style={{ width: innerR * 1.5 }}
              >
                <DishInfo dish={dish} index={current} total={n} />
              </div>
            )}
            {dish && !inside && (
              <div className="absolute inset-x-0 bottom-0 text-center">
                <Counter index={current} total={n} />
              </div>
            )}
            {inside && (
              <>
                <div className="absolute bottom-6 left-0">{prevBtn}</div>
                <div className="absolute bottom-6 right-0">{nextBtn}</div>
              </>
            )}

            {/* Base line of the semicircle */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-ink/15" />
          </div>
        )}

        {/* Details + controls */}
        {dish && !inside && (
          <div className="mt-8 flex items-center justify-between gap-3">
            {prevBtn}
            <div className="flex flex-col items-center text-center">
              <DishInfo dish={dish} index={current} total={n} hideCounter />
            </div>
            {nextBtn}
          </div>
        )}
      </div>

      {n === 0 && (
        <p className="mt-16 text-center text-sm text-ink/50">
          No dishes found in this category yet.
        </p>
      )}

      <p className="mt-16 text-center font-display text-lg italic text-ink/50">
        Good food, good mood.
      </p>
    </div>
  );
}
