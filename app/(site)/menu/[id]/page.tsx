import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { getMenuItemById, getRelatedMenuItems } from "@/lib/queries";

export const revalidate = 60;

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const item = await getMenuItemById(params.id);
  if (!item) return { title: "Dish Not Found" };
  return {
    title: item.name,
    description: item.description,
  };
}

export default async function DishPage({ params }: PageProps) {
  const item = await getMenuItemById(params.id);
  if (!item) notFound();

  const related = await getRelatedMenuItems(item.category, item.id);

  return (
    <>
      <section className="bg-linen pt-32 pb-20 md:pb-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm text-ink/50 transition-colors duration-300 hover:text-gold"
          >
            <ArrowLeft size={16} />
            Back to Menu
          </Link>

          <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest2 text-gold-dark" style={{ color: "#8A6A38" }}>
                {item.category}
              </p>
              <div className="mt-4 flex items-start justify-between gap-6">
                <h1 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                  {item.name}
                </h1>
                <span className="whitespace-nowrap font-display text-xl text-gold" style={{ color: "#B08B4F" }}>
                  ${item.price}
                </span>
              </div>

              {item.signature && (
                <span className="mt-4 inline-block border border-gold px-3 py-1 text-xs uppercase tracking-wide text-gold" style={{ color: "#B08B4F", borderColor: "#B08B4F" }}>
                  Chef&apos;s Signature
                </span>
              )}

              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/70">
                {item.description}
              </p>

              <Link
                href="/reservation"
                className="mt-8 inline-flex items-center gap-2 bg-ink px-8 py-3.5 text-sm tracking-wide text-linen transition-colors duration-300 hover:bg-gold hover:text-ink"
              >
                Reserve a Table
                <CalendarDays size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-ink py-20 md:py-28">
          <div className="mx-auto max-w-8xl px-6 lg:px-10">
            <p className="text-xs tracking-widest2 text-gold" style={{ color: "#B08B4F" }}>
              More From {item.category}
            </p>
            <h2 className="mt-4 font-display text-3xl text-linen sm:text-4xl">
              You Might Also Like
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((dish) => (
                <Link key={dish.id} href={`/menu/${dish.id}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 92vw"
                      className="object-cover transition-transform duration-700 ease-signature group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <h3 className="font-display text-xl text-linen">{dish.name}</h3>
                    <span className="font-display text-lg text-gold" style={{ color: "#B08B4F" }}>
                      ${dish.price}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
