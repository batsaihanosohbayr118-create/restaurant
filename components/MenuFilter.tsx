"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { menuCategories, type MenuCategory, type MenuItem } from "@/lib/types";

type Filter = "All" | MenuCategory;

const filters: Filter[] = ["All", ...menuCategories];

export default function MenuFilter({ items: menuItems }: { items: MenuItem[] }) {
  const [active, setActive] = useState<Filter>("All");

  const filtered = useMemo(
    () =>
      active === "All"
        ? menuItems
        : menuItems.filter((item) => item.category === active),
    [active, menuItems]
  );

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter menu by category"
        className="flex flex-wrap justify-center gap-x-8 gap-y-3 border-b border-ink/10 pb-8"
      >
        {filters.map((filter) => (
          <button
            key={filter}
            role="tab"
            aria-selected={active === filter}
            onClick={() => setActive(filter)}
            className={`relative pb-2 text-sm tracking-wide transition-colors duration-300 ${
              active === filter ? "text-ink" : "text-ink/40 hover:text-ink/70"
            }`}
          >
            {filter}
            <span
              className={`absolute -bottom-[1px] left-0 h-px bg-gold transition-all duration-300 ${
                active === filter ? "w-full" : "w-0"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <Link
            key={item.id}
            href={`/menu/${item.id}`}
            className="group flex gap-5"
          >
            <div className="relative h-24 w-24 shrink-0 overflow-hidden sm:h-28 sm:w-28">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="112px"
                className="object-cover transition-transform duration-500 ease-signature group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg leading-tight text-ink transition-colors duration-300 group-hover:text-gold">
                  {item.name}
                </h3>
                <span className="whitespace-nowrap font-display text-base text-gold" style={{ color: "#B08B4F" }}>
                  ${item.price}
                </span>
              </div>
              <p className="mt-1 text-xs uppercase tracking-wide text-ink/35">
                {item.category}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-sm text-ink/50">
          No dishes found in this category yet.
        </p>
      )}
    </div>
  );
}
